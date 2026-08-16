
const express = require("express");
const cors = require("cors");
const multer = require("multer");
require("dotenv").config();

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const User = require("./models/User");
const Resume = require("./models/Resume");

const { GoogleGenAI } = require("@google/genai");

const fs = require("fs");
const path = require("path");

const app = express();

// =====================================================
// GEMINI
// =====================================================

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

// =====================================================
// MONGODB
// =====================================================

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("MongoDB connected successfully");
  })
  .catch((error) => {
    console.error(
      "MongoDB connection error:",
      error
    );
  });

// =====================================================
// MIDDLEWARE
// =====================================================

app.use(cors());

app.use(
  express.json({
    limit: "10mb",
  })
);

// =====================================================
// UPLOAD FOLDER
// =====================================================

const uploadFolder = path.join(
  __dirname,
  "uploads"
);

if (!fs.existsSync(uploadFolder)) {
  fs.mkdirSync(uploadFolder, {
    recursive: true,
  });
}

// =====================================================
// MULTER
// PDF ONLY + 10 MB LIMIT
// =====================================================

const upload = multer({
  dest: uploadFolder,

  limits: {
    fileSize: 10 * 1024 * 1024,
  },

  fileFilter: (req, file, cb) => {
    const isPDF =
      file.mimetype === "application/pdf" ||
      file.originalname
        .toLowerCase()
        .endsWith(".pdf");

    if (!isPDF) {
      return cb(
        new Error("INVALID_FILE_TYPE")
      );
    }

    cb(null, true);
  },
});

// =====================================================
// PDF TEXT EXTRACTOR
// =====================================================

async function extractPDFText(filePath) {
  try {
    console.log(
      "Reading PDF with PDF.js..."
    );

    if (!fs.existsSync(filePath)) {
      throw new Error(
        "PDF file not found"
      );
    }

    const pdfBuffer =
      fs.readFileSync(filePath);

    if (
      !pdfBuffer ||
      pdfBuffer.length === 0
    ) {
      throw new Error("EMPTY_PDF");
    }

    console.log(
      "PDF size:",
      pdfBuffer.length,
      "bytes"
    );

    const pdfHeader =
      pdfBuffer
        .subarray(0, 5)
        .toString();

    if (pdfHeader !== "%PDF-") {
      throw new Error(
        "INVALID_PDF"
      );
    }

    const pdfjsLib =
      await import(
        "pdfjs-dist/legacy/build/pdf.mjs"
      );

    const loadingTask =
      pdfjsLib.getDocument({
        data: new Uint8Array(
          pdfBuffer
        ),

        useWorkerFetch: false,

        isEvalSupported: false,
      });

    const pdf =
      await loadingTask.promise;

    console.log(
      "PDF pages:",
      pdf.numPages
    );

    if (!pdf.numPages) {
      throw new Error(
        "EMPTY_PDF"
      );
    }

    let fullText = "";

    for (
      let pageNumber = 1;
      pageNumber <= pdf.numPages;
      pageNumber++
    ) {
      try {
        const page =
          await pdf.getPage(
            pageNumber
          );

        const textContent =
          await page.getTextContent();

        const pageText =
          textContent.items
            .map(
              (item) =>
                item.str || ""
            )
            .join(" ");

        fullText +=
          pageText + "\n\n";

        console.log(
          `Page ${pageNumber} extracted`
        );
      } catch (pageError) {
        console.error(
          `Error reading page ${pageNumber}:`,
          pageError.message
        );
      }
    }

    fullText = fullText
      .replace(/\r/g, "")
      .replace(/[ \t]+/g, " ")
      .replace(/\n{3,}/g, "\n\n")
      .trim();

    console.log(
      "Extracted text length:",
      fullText.length
    );

    if (
      !fullText ||
      fullText.length < 10
    ) {
      throw new Error(
        "NO_READABLE_TEXT"
      );
    }

    return {
      text: fullText,
      pages: pdf.numPages,
    };
  } catch (error) {
    console.error(
      "PDF.js extraction error:",
      error.message
    );

    throw error;
  }
}

// =====================================================
// HOME
// =====================================================

app.get("/", (req, res) => {
  res.json({
    message:
      "AI Resume Analyzer backend is running",
  });
});

// =====================================================
// SIGNUP
// =====================================================

app.post(
  "/api/signup",
  async (req, res) => {
    try {
      const {
        name,
        email,
        password,
      } = req.body;

      if (
        !name ||
        !email ||
        !password
      ) {
        return res.status(400).json({
          message:
            "Name, email and password are required",
        });
      }

      if (
        password.length < 6
      ) {
        return res.status(400).json({
          message:
            "Password must be at least 6 characters",
        });
      }

      const cleanEmail =
        email
          .toLowerCase()
          .trim();

      const existingUser =
        await User.findOne({
          email: cleanEmail,
        });

      if (existingUser) {
        return res.status(400).json({
          message:
            "Email already registered",
        });
      }

      const hashedPassword =
        await bcrypt.hash(
          password,
          10
        );

      const user =
        await User.create({
          name: name.trim(),

          email: cleanEmail,

          password:
            hashedPassword,
        });

      res.status(201).json({
        message:
          "Account created successfully",

        userId: user._id,
      });
    } catch (error) {
      console.error(
        "Signup error:",
        error
      );

      res.status(500).json({
        message:
          "Signup failed",
      });
    }
  }
);

// =====================================================
// LOGIN
// =====================================================

app.post(
  "/api/login",
  async (req, res) => {
    try {
      const {
        email,
        password,
      } = req.body;

      if (
        !email ||
        !password
      ) {
        return res.status(400).json({
          message:
            "Email and password are required",
        });
      }

      const cleanEmail =
        email
          .toLowerCase()
          .trim();

      const user =
        await User.findOne({
          email: cleanEmail,
        });

      if (!user) {
        return res.status(401).json({
          message:
            "Invalid email or password",
        });
      }

      const isPasswordCorrect =
        await bcrypt.compare(
          password,
          user.password
        );

      if (!isPasswordCorrect) {
        return res.status(401).json({
          message:
            "Invalid email or password",
        });
      }

      res.json({
        message:
          "Login successful",

        user: {
          id: user._id,
          name: user.name,
          email: user.email,
        },
      });
    } catch (error) {
      console.error(
        "Login error:",
        error
      );

      res.status(500).json({
        message:
          "Login failed",
      });
    }
  }
);

// =====================================================
// AI RESUME-BASED SKILL TEST
// =====================================================

app.post(
  "/api/skill-test",
  async (req, res) => {
    try {
      const {
        skill,
        resumeText,
        count = 10,
      } = req.body;

      // -------------------------------------------------
      // VALIDATION
      // -------------------------------------------------

      if (
        !skill &&
        !resumeText
      ) {
        return res.status(400).json({
          message:
            "Resume text or skill is required",
        });
      }

      const cleanSkill =
        skill
          ? String(skill).trim()
          : "";

      const cleanResume =
        resumeText
          ? String(resumeText).trim()
          : "";

      const questionCount =
        Math.min(
          Math.max(
            Number(count) || 10,
            5
          ),
          15
        );

      console.log(
        "================================="
      );

      console.log(
        "Generating resume-based AI test"
      );

      console.log(
        "Skill:",
        cleanSkill || "Resume Based"
      );

      console.log(
        "Resume available:",
        Boolean(cleanResume)
      );

      console.log(
        "Question count:",
        questionCount
      );

      console.log(
        "================================="
      );

      // -------------------------------------------------
      // RESUME-BASED PROMPT
      // -------------------------------------------------

      const prompt = `

You are a senior technical interviewer and professional hiring manager.

Your task is to create a REALISTIC technical interview assessment based on the candidate's ACTUAL RESUME.

This is NOT a generic quiz.

The questions must be generated by carefully analyzing the candidate's resume.

==================================================
CANDIDATE RESUME
==================================================

${cleanResume || "No resume text was provided."}

==================================================
OPTIONAL TARGET SKILL
==================================================

${cleanSkill || "Use the strongest technical skills found in the resume."}

==================================================
MAIN OBJECTIVE
==================================================

Generate exactly ${questionCount} multiple-choice technical interview questions.

The questions must feel like questions asked in a REAL JOB INTERVIEW.

Do NOT generate extremely easy textbook questions.

Do NOT generate generic questions that could be asked to anyone.

Questions must be connected to the candidate's actual resume.

==================================================
QUESTION DIFFICULTY
==================================================

Use this distribution approximately:

- 20% Easy
- 40% Medium
- 40% Hard

Hard questions are especially important.

Hard questions should test:

- debugging
- architecture
- practical implementation
- optimization
- trade-offs
- real-world scenarios
- security
- scalability
- performance
- database design
- API design
- code behavior
- project decisions
- technology limitations
- problem solving

==================================================
RESUME PERSONALIZATION
==================================================

If the resume contains projects:

Ask questions about those projects.

For example:

- Why was a particular technology used?
- How would you improve the project?
- What happens if the application receives many users?
- How would you debug a failure?
- How would you secure the application?
- How would you optimize performance?
- What database design would be appropriate?
- What alternative technology could be used and why?
- What limitations would the current implementation have?

If the resume contains work experience:

Ask questions related to the candidate's responsibilities.

If the resume contains internships:

Ask realistic questions about technologies mentioned there.

If the resume contains programming languages:

Ask practical programming and debugging questions.

If the resume contains frameworks:

Ask framework-specific practical questions.

If the resume contains databases:

Ask query, indexing, normalization, transaction and performance questions.

If the resume contains frontend technologies:

Ask practical browser, UI, state management, API and performance questions.

If the resume contains backend technologies:

Ask API, authentication, database, error handling, scalability and security questions.

==================================================
IMPORTANT
==================================================

NEVER claim that the candidate used a technology if it is not present in the resume.

NEVER invent a project.

NEVER invent a company.

NEVER invent work experience.

Only use information actually present in the resume.

However, you MAY ask hypothetical questions such as:

"If you had to scale this project to 100,000 users, what would you change?"

These hypothetical questions must be based on technologies or projects actually present in the resume.

==================================================
QUESTION TYPES
==================================================

Use a mixture of:

1. Conceptual questions
2. Practical questions
3. Scenario-based questions
4. Debugging questions
5. Architecture questions
6. Optimization questions
7. Security questions
8. Database questions
9. Project-specific questions
10. Code-behavior questions

Do NOT make every question definition-based.

==================================================
DIFFICULTY REQUIREMENT
==================================================

Easy questions should verify fundamentals.

Medium questions should test practical understanding.

Hard questions should require reasoning.

A hard question should NOT simply be a difficult definition.

Example of BAD question:

"What is React?"

Example of BETTER question:

"Your React application fetches data whenever a component renders, causing repeated API calls. What change would prevent unnecessary requests?"

Example of BAD question:

"What is MongoDB?"

Example of BETTER question:

"Your MongoDB collection grows to millions of documents and a query filtering by userId becomes slow. What would you investigate first?"

==================================================
OPTIONS
==================================================

Every question must have exactly 4 options.

Only ONE option can be correct.

The incorrect options must be plausible.

Do not create obviously silly wrong answers.

Do not make the correct answer significantly longer than all other options.

Randomize the correct answer position.

Do not always put the correct answer in option 1.

==================================================
NO REPETITION
==================================================

Do not repeat questions.

Do not ask the same concept multiple times using slightly different wording.

Each question should test a different aspect.

==================================================
JSON FORMAT
==================================================

Return ONLY valid JSON.

Do not use markdown.

Do not use code fences.

Do not add explanations outside JSON.

Return exactly:

{
  "source": "resume",
  "skill": "detected or selected skill",
  "questions": [
    {
      "question": "Question text",
      "options": [
        "Option 1",
        "Option 2",
        "Option 3",
        "Option 4"
      ],
      "answer": "Correct option",
      "difficulty": "Hard",
      "topic": "Topic tested",
      "resumeReference": "Short explanation of what part of the resume caused this question to be generated"
    }
  ]
}

==================================================
STRICT RULES
==================================================

1. Generate exactly ${questionCount} questions.

2. Every question must be technically meaningful.

3. Every question must be related to the candidate's resume.

4. If a target skill is provided, prioritize that skill.

5. If the target skill is not present in the resume, do NOT pretend the candidate has experience with it.

6. Use the candidate's strongest technical skills.

7. Use projects when available.

8. Use work experience when available.

9. Use internship experience when available.

10. Use education/project technologies when relevant.

11. Do not invent technologies.

12. Do not invent companies.

13. Do not invent project details.

14. Do not repeat questions.

15. Exactly 4 options per question.

16. Exactly one correct answer.

17. The answer must exactly match one of the four options.

18. Mix difficulty levels.

19. At least 3 questions must be Medium or Hard when generating 5 questions.

20. At least 5 questions must be Medium or Hard when generating 10 questions.

21. For 10 questions, try to include at least 3 Hard questions.

22. Prefer practical interview questions over definitions.

23. Include project-based questions whenever the resume contains projects.

24. Include debugging or troubleshooting questions when appropriate.

25. Include performance or optimization questions when appropriate.

26. Include security questions when appropriate.

27. Include architecture/scalability questions when appropriate.

28. Do not ask impossible questions unrelated to the candidate's level.

29. Keep the assessment suitable for a real fresher/junior job interview.

30. Return JSON only.

`;

      // -------------------------------------------------
      // GEMINI
      // -------------------------------------------------

      const response =
        await ai.models.generateContent({
          model:
            "gemini-3.5-flash-lite",

          contents:
            prompt,

          config: {
            responseMimeType:
              "application/json",
          },
        });

      let result =
        response.text;

      if (!result) {
        throw new Error(
          "Gemini returned empty questions"
        );
      }

      result =
        result
          .replace(
            /```json/g,
            ""
          )
          .replace(
            /```/g,
            ""
          )
          .trim();

      // -------------------------------------------------
      // PARSE
      // -------------------------------------------------

      let parsed;

      try {
        parsed =
          JSON.parse(result);
      } catch (parseError) {
        console.error(
          "Skill test JSON parse error:",
          parseError
        );

        console.error(
          "Gemini skill response:",
          result
        );

        return res.status(500).json({
          message:
            "AI returned invalid skill questions",
        });
      }

      // -------------------------------------------------
      // VALIDATE
      // -------------------------------------------------

      if (
        !parsed.questions ||
        !Array.isArray(
          parsed.questions
        )
      ) {
        return res.status(500).json({
          message:
            "AI did not return valid questions",
        });
      }

      if (
        parsed.questions.length <
        questionCount
      ) {
        return res.status(500).json({
          message:
            "AI returned fewer questions than requested",
        });
      }

      const validDifficulties = [
        "Easy",
        "Medium",
        "Hard",
      ];

      const validQuestions =
        parsed.questions
          .slice(
            0,
            questionCount
          )
          .filter(
            (item) => {
              if (
                !item ||
                typeof item.question !==
                  "string"
              ) {
                return false;
              }

              if (
                !Array.isArray(
                  item.options
                ) ||
                item.options.length !== 4
              ) {
                return false;
              }

              if (
                typeof item.answer !==
                "string"
              ) {
                return false;
              }

              if (
                !item.options.includes(
                  item.answer
                )
              ) {
                return false;
              }

              if (
                item.options.filter(
                  (option) =>
                    option ===
                    item.answer
                ).length !== 1
              ) {
                return false;
              }

              if (
                item.difficulty &&
                !validDifficulties.includes(
                  item.difficulty
                )
              ) {
                return false;
              }

              return true;
            }
          )
          .map((item) => ({
            question:
              item.question.trim(),

            options:
              item.options.map(
                (option) =>
                  String(option).trim()
              ),

            answer:
              item.answer.trim(),

            difficulty:
              validDifficulties.includes(
                item.difficulty
              )
                ? item.difficulty
                : "Medium",

            topic:
              item.topic
                ? String(
                    item.topic
                  ).trim()
                : "Technical",

            resumeReference:
              item.resumeReference
                ? String(
                    item.resumeReference
                  ).trim()
                : "Generated from resume content",
          }));

      if (
        validQuestions.length !==
        questionCount
      ) {
        return res.status(500).json({
          message:
            "AI generated invalid question format",
        });
      }

      // -------------------------------------------------
      // DUPLICATE CHECK
      // -------------------------------------------------

      const questionTexts =
        validQuestions.map(
          (item) =>
            item.question
              .toLowerCase()
              .replace(
                /\s+/g,
                " "
              )
              .trim()
        );

      const uniqueQuestions =
        new Set(
          questionTexts
        );

      if (
        uniqueQuestions.size !==
        questionTexts.length
      ) {
        return res.status(500).json({
          message:
            "AI generated duplicate questions",
        });
      }

      // -------------------------------------------------
      // SEND RESULT
      // -------------------------------------------------

      console.log(
        "================================="
      );

      console.log(
        `Generated ${validQuestions.length} resume-based AI questions`
      );

      console.log(
        "================================="
      );

      res.json({
        success: true,

        source:
          cleanResume
            ? "resume"
            : "skill",

        skill:
          cleanSkill ||
          parsed.skill ||
          "Resume Based",

        questions:
          validQuestions,
      });
    } catch (error) {
      console.error(
        "AI skill test error:",
        error
      );

      res.status(500).json({
        message:
          "Failed to generate AI skill test",
      });
    }
  }
);

// =====================================================
// RESUME UPLOAD
// =====================================================

app.post(
  "/api/upload",
  upload.single("resume"),
  async (req, res) => {
    let uploadedPath = null;

    try {
      if (!req.file) {
        return res.status(400).json({
          message:
            "Please upload a resume PDF.",
        });
      }

      uploadedPath =
        req.file.path;

      console.log(
        "================================="
      );

      console.log(
        "Uploaded file:",
        req.file.originalname
      );

      console.log(
        "MIME type:",
        req.file.mimetype
      );

      console.log(
        "File size:",
        req.file.size,
        "bytes"
      );

      console.log(
        "File path:",
        req.file.path
      );

      console.log(
        "================================="
      );

      const hasPDFExtension =
        req.file.originalname
          .toLowerCase()
          .endsWith(".pdf");

      if (!hasPDFExtension) {
        return res.status(400).json({
          message:
            "Only PDF resume files are allowed.",
        });
      }

      if (
        req.file.mimetype !==
        "application/pdf"
      ) {
        return res.status(400).json({
          message:
            "Invalid file type. Please upload a PDF resume.",
        });
      }

      if (
        req.file.size >
        10 * 1024 * 1024
      ) {
        return res.status(400).json({
          message:
            "File is too large. Maximum size is 10 MB.",
        });
      }

      if (
        !fs.existsSync(
          req.file.path
        )
      ) {
        return res.status(400).json({
          message:
            "Uploaded file was not found.",
        });
      }

      if (req.file.size === 0) {
        return res.status(400).json({
          message:
            "The uploaded PDF is empty. Please upload a valid resume.",
        });
      }

      const pdfResult =
        await extractPDFText(
          req.file.path
        );

      const extractedText =
        pdfResult.text;

      if (
        !extractedText ||
        extractedText.trim()
          .length < 10
      ) {
        return res.status(400).json({
          message:
            "This PDF contains no readable text. Please upload a text-based resume instead of a scanned/image-only PDF.",
        });
      }

      console.log(
        "Resume extracted successfully!"
      );

      return res.json({
        message:
          "Resume uploaded successfully",

        filename:
          req.file.originalname,

        text:
          extractedText,

        pages:
          pdfResult.pages,
      });
    } catch (error) {
      console.error(
        "================================="
      );

      console.error(
        "RESUME UPLOAD ERROR"
      );

      console.error(
        error.message
      );

      console.error(
        "================================="
      );

      if (
        error.message ===
        "EMPTY_PDF"
      ) {
        return res.status(400).json({
          message:
            "The uploaded PDF is empty. Please upload a valid resume.",
        });
      }

      if (
        error.message ===
        "INVALID_PDF"
      ) {
        return res.status(400).json({
          message:
            "This file is not a valid PDF. Please upload a genuine PDF resume.",
        });
      }

      if (
        error.message ===
        "NO_READABLE_TEXT"
      ) {
        return res.status(400).json({
          message:
            "This PDF contains no readable text. It may be a scanned or image-only PDF. Please upload a text-based PDF resume.",
        });
      }

      return res.status(400).json({
        message:
          "This PDF could not be read. Please upload a valid text-based PDF resume.",
      });
    } finally {
      if (uploadedPath) {
        try {
          if (
            fs.existsSync(
              uploadedPath
            )
          ) {
            fs.unlinkSync(
              uploadedPath
            );

            console.log(
              "Temporary PDF deleted"
            );
          }
        } catch (deleteError) {
          console.error(
            "Temporary file delete error:",
            deleteError.message
          );
        }
      }
    }
  }
);

// =====================================================
// AI RESUME ANALYSIS
// =====================================================

app.post(
  "/api/analyze",
  async (req, res) => {
    try {
      const {
        resumeText,
        userId,
        fileName,
      } = req.body;

      if (
        !resumeText ||
        !resumeText.trim()
      ) {
        return res.status(400).json({
          message:
            "Resume text is required",
        });
      }

      console.log(
        "Sending resume to Gemini..."
      );

      const prompt = `

Analyze the following resume carefully.

Return ONLY valid JSON.

Do not use markdown.
Do not use code fences.
Do not add any explanation outside the JSON.

Return exactly this structure:

{
  "summary": "Short professional summary",
  "skills": [],
  "experience": [],
  "education": [],
  "strengths": [],
  "weaknesses": [],
  "missingSkills": [],
  "overallScore": 0,
  "atsScore": 0,
  "recommendedJobs": []
}

For experience use:

{
  "title": "",
  "company": "",
  "duration": "",
  "description": ""
}

For education use:

{
  "degree": "",
  "institution": "",
  "duration": "",
  "score": ""
}

For recommendedJobs use:

{
  "title": "",
  "match": 0,
  "reason": ""
}

Rules:

1. overallScore must be between 0 and 100.
2. atsScore must be between 0 and 100.
3. Return exactly 5 recommended jobs.
4. Do not invent experience.
5. Academic projects can be treated as project experience.
6. Keep the analysis realistic.
7. ATS score should consider:
   - keywords
   - technical skills
   - education
   - projects
   - experience
   - resume structure
8. If there is no work experience, return an empty experience array.
9. Do not claim experience that is not present.
10. Recommended jobs must be based only on this resume.
11. Skills must contain only skills actually mentioned or clearly demonstrated in the resume.
12. Strengths and weaknesses should be realistic.
13. Missing skills should be relevant to the candidate's likely target jobs.
14. Do not invent technologies as existing skills.

RESUME:

${resumeText}

`;

      const response =
        await ai.models.generateContent({
          model:
            "gemini-3.5-flash-lite",

          contents:
            prompt,

          config: {
            responseMimeType:
              "application/json",
          },
        });

      let result =
        response.text;

      if (!result) {
        throw new Error(
          "Gemini returned an empty response"
        );
      }

      result =
        result
          .replace(
            /```json/g,
            ""
          )
          .replace(
            /```/g,
            ""
          )
          .trim();

      let parsedAnalysis;

      try {
        parsedAnalysis =
          JSON.parse(result);
      } catch (parseError) {
        console.error(
          "Gemini JSON parse error:",
          parseError
        );

        console.error(
          "Gemini response:",
          result
        );

        return res.status(500).json({
          message:
            "AI returned invalid analysis",
        });
      }

      if (userId) {
        try {
          await Resume.create({
            userId,

            fileName:
              fileName ||
              "Resume.pdf",

            resumeText,

            analysis:
              parsedAnalysis,

            overallScore:
              Number(
                parsedAnalysis
                  .overallScore
              ) || 0,

            atsScore:
              Number(
                parsedAnalysis
                  .atsScore
              ) || 0,
          });

          console.log(
            "Resume analysis saved to MongoDB"
          );
        } catch (saveError) {
          console.error(
            "Resume save error:",
            saveError
          );
        }
      }

      res.json({
        message:
          "Resume analyzed successfully",

        analysis:
          parsedAnalysis,
      });
    } catch (error) {
      console.error(
        "AI analysis error:",
        error
      );

      res.status(500).json({
        message:
          "AI analysis failed",
      });
    }
  }
);

// =====================================================
// RESUME HISTORY
// =====================================================

app.get(
  "/api/resumes/:userId",
  async (req, res) => {
    try {
      const {
        userId,
      } = req.params;

      const resumes =
        await Resume.find({
          userId,
        })
          .sort({
            createdAt: -1,
          })
          .limit(10);

      res.json({
        resumes,
      });
    } catch (error) {
      console.error(
        "Resume history error:",
        error
      );

      res.status(500).json({
        message:
          "Could not load resume history",
      });
    }
  }
);

// =====================================================
// DELETE RESUME HISTORY
// =====================================================

app.delete(
  "/api/resumes/:id",
  async (req, res) => {
    try {
      const {
        id,
      } = req.params;

      if (!id) {
        return res.status(400).json({
          message:
            "Resume ID is required",
        });
      }

      const deletedResume =
        await Resume.findByIdAndDelete(
          id
        );

      if (!deletedResume) {
        return res.status(404).json({
          message:
            "Resume history not found",
        });
      }

      console.log(
        "Resume history deleted:",
        deletedResume.fileName
      );

      res.json({
        message:
          "Resume deleted successfully",
      });
    } catch (error) {
      console.error(
        "Delete resume error:",
        error
      );

      res.status(500).json({
        message:
          "Could not delete resume",
      });
    }
  }
);

// =====================================================
// ERROR HANDLER
// =====================================================

app.use(
  (error, req, res, next) => {
    console.error(
      "Server error:",
      error
    );

    if (
      error.code ===
      "LIMIT_FILE_SIZE"
    ) {
      return res.status(400).json({
        message:
          "File is too large. Maximum size is 10 MB.",
      });
    }

    if (
      error.message ===
      "INVALID_FILE_TYPE"
    ) {
      return res.status(400).json({
        message:
          "Only PDF resume files are allowed.",
      });
    }

    if (
      error instanceof
      multer.MulterError
    ) {
      return res.status(400).json({
        message:
          "Resume upload failed. Please check the file and try again.",
      });
    }

    res.status(500).json({
      message:
        "Something went wrong on the server.",
    });
  }
);

// =====================================================
// SERVER
// =====================================================

const PORT = 5000;

app.listen(
  PORT,
  () => {
    console.log(
      `Server running on http://localhost:${PORT}`
    );
  }
);
