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
    console.error("MongoDB connection error:", error);
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
        new Error(
          "INVALID_FILE_TYPE"
        )
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

    // -------------------------------------------------
    // CHECK FILE EXISTS
    // -------------------------------------------------

    if (!fs.existsSync(filePath)) {
      throw new Error(
        "PDF file not found"
      );
    }

    // -------------------------------------------------
    // READ PDF
    // -------------------------------------------------

    const pdfBuffer =
      fs.readFileSync(filePath);

    // -------------------------------------------------
    // EMPTY FILE CHECK
    // -------------------------------------------------

    if (
      !pdfBuffer ||
      pdfBuffer.length === 0
    ) {
      throw new Error(
        "EMPTY_PDF"
      );
    }

    console.log(
      "PDF size:",
      pdfBuffer.length,
      "bytes"
    );

    // -------------------------------------------------
    // PDF HEADER CHECK
    // -------------------------------------------------

    const pdfHeader =
      pdfBuffer
        .subarray(0, 5)
        .toString();

    if (pdfHeader !== "%PDF-") {
      throw new Error(
        "INVALID_PDF"
      );
    }

    // -------------------------------------------------
    // PDF.JS
    // -------------------------------------------------

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

    // -------------------------------------------------
    // CHECK PAGE COUNT
    // -------------------------------------------------

    if (!pdf.numPages) {
      throw new Error(
        "EMPTY_PDF"
      );
    }

    // -------------------------------------------------
    // EXTRACT TEXT
    // -------------------------------------------------

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

    // -------------------------------------------------
    // CLEAN TEXT
    // -------------------------------------------------

    fullText = fullText
      .replace(/\r/g, "")
      .replace(/[ \t]+/g, " ")
      .replace(/\n{3,}/g, "\n\n")
      .trim();

    console.log(
      "Extracted text length:",
      fullText.length
    );

    // -------------------------------------------------
    // EMPTY / SCANNED PDF CHECK
    // -------------------------------------------------

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
// RESUME UPLOAD
// =====================================================

app.post(
  "/api/upload",
  upload.single("resume"),
  async (req, res) => {
    let uploadedPath = null;

    try {
      // -------------------------------------------------
      // CHECK FILE
      // -------------------------------------------------

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

      // -------------------------------------------------
      // PDF EXTENSION CHECK
      // -------------------------------------------------

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

      // -------------------------------------------------
      // MIME TYPE CHECK
      // -------------------------------------------------

      if (
        req.file.mimetype !==
        "application/pdf"
      ) {
        return res.status(400).json({
          message:
            "Invalid file type. Please upload a PDF resume.",
        });
      }

      // -------------------------------------------------
      // FILE SIZE CHECK
      // -------------------------------------------------

      if (
        req.file.size >
        10 * 1024 * 1024
      ) {
        return res.status(400).json({
          message:
            "File is too large. Maximum size is 10 MB.",
        });
      }

      // -------------------------------------------------
      // FILE EXISTS
      // -------------------------------------------------

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

      // -------------------------------------------------
      // EMPTY FILE CHECK
      // -------------------------------------------------

      if (req.file.size === 0) {
        return res.status(400).json({
          message:
            "The uploaded PDF is empty. Please upload a valid resume.",
        });
      }

      // -------------------------------------------------
      // EXTRACT PDF TEXT
      // -------------------------------------------------

      const pdfResult =
        await extractPDFText(
          req.file.path
        );

      const extractedText =
        pdfResult.text;

      // -------------------------------------------------
      // TEXT CHECK
      // -------------------------------------------------

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

      // -------------------------------------------------
      // SUCCESS
      // -------------------------------------------------

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

      // -------------------------------------------------
      // CUSTOM ERRORS
      // -------------------------------------------------

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
            "This PDF contains no readable text. It may be a scanned or image-only PDF. Please upload a text-based resume.",
        });
      }

      // -------------------------------------------------
      // GENERAL PDF ERROR
      // -------------------------------------------------

      return res.status(400).json({
        message:
          "This PDF could not be read. Please upload a valid text-based PDF resume.",
      });
    } finally {
      // -------------------------------------------------
      // DELETE TEMP FILE
      // -------------------------------------------------

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

      // -------------------------------------------------
      // CHECK RESUME TEXT
      // -------------------------------------------------

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

      // -------------------------------------------------
      // PROMPT
      // -------------------------------------------------

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

RESUME:

${resumeText}

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

      // -------------------------------------------------
      // PARSE JSON
      // -------------------------------------------------

      let parsedAnalysis;

      try {
        parsedAnalysis =
          JSON.parse(
            result
          );
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

      // -------------------------------------------------
      // SAVE MONGODB
      // -------------------------------------------------

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

      // -------------------------------------------------
      // SEND RESULT
      // -------------------------------------------------

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

    // -------------------------------------------------
    // MULTER FILE SIZE
    // -------------------------------------------------

    if (
      error.code ===
      "LIMIT_FILE_SIZE"
    ) {
      return res.status(400).json({
        message:
          "File is too large. Maximum size is 10 MB.",
      });
    }

    // -------------------------------------------------
    // INVALID FILE TYPE
    // -------------------------------------------------

    if (
      error.message ===
      "INVALID_FILE_TYPE"
    ) {
      return res.status(400).json({
        message:
          "Only PDF resume files are allowed.",
      });
    }

    // -------------------------------------------------
    // MULTER ERROR
    // -------------------------------------------------

    if (
      error instanceof multer.MulterError
    ) {
      return res.status(400).json({
        message:
          "Resume upload failed. Please check the file and try again.",
      });
    }

    // -------------------------------------------------
    // GENERAL ERROR
    // -------------------------------------------------

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