import React, { useState } from "react";

/* =========================================================
   QUESTION BANK
========================================================= */

const skillQuestions = {
  Python: [
    {
      question: "Which keyword is used to define a function in Python?",
      options: ["function", "def", "fun", "define"],
      answer: "def",
    },
    {
      question: "Which of these is a Python list?",
      options: ["(1, 2, 3)", "[1, 2, 3]", "{1, 2, 3}", "<1, 2, 3>"],
      answer: "[1, 2, 3]",
    },
    {
      question: "What is the output of len('Python')?",
      options: ["5", "6", "7", "Error"],
      answer: "6",
    },
    {
      question: "Which symbol is used for comments in Python?",
      options: ["//", "/*", "#", "--"],
      answer: "#",
    },
    {
      question: "Which data type stores True or False?",
      options: ["String", "Integer", "Boolean", "Float"],
      answer: "Boolean",
    },
    {
      question: "Which keyword is used to loop over a sequence?",
      options: ["loop", "for", "repeat", "foreach"],
      answer: "for",
    },
    {
      question: "Which function is used to display output?",
      options: ["echo()", "print()", "display()", "output()"],
      answer: "print()",
    },
    {
      question: "Which operator is used for exponentiation?",
      options: ["^", "**", "//", "%%"],
      answer: "**",
    },
    {
      question: "Which keyword is used to create a class?",
      options: ["object", "class", "struct", "define"],
      answer: "class",
    },
    {
      question: "Which statement is used to handle exceptions?",
      options: ["try-except", "if-error", "catch-error", "error-handle"],
      answer: "try-except",
    },
  ],

  HTML: [
    {
      question: "What does HTML stand for?",
      options: [
        "Hyper Text Markup Language",
        "High Text Machine Language",
        "Hyperlink Text Management Language",
        "Home Tool Markup Language",
      ],
      answer: "Hyper Text Markup Language",
    },
    {
      question: "Which tag is used for the largest heading?",
      options: ["<h6>", "<heading>", "<h1>", "<head>"],
      answer: "<h1>",
    },
    {
      question: "Which tag is used to create a paragraph?",
      options: ["<p>", "<para>", "<text>", "<paragraph>"],
      answer: "<p>",
    },
    {
      question: "Which tag is used to create a hyperlink?",
      options: ["<link>", "<a>", "<href>", "<url>"],
      answer: "<a>",
    },
    {
      question: "Which attribute specifies an image source?",
      options: ["href", "src", "link", "source"],
      answer: "src",
    },
    {
      question: "Which tag is used to display an image?",
      options: ["<image>", "<img>", "<pic>", "<src>"],
      answer: "<img>",
    },
    {
      question: "Which tag creates an unordered list?",
      options: ["<ol>", "<list>", "<ul>", "<li>"],
      answer: "<ul>",
    },
    {
      question: "Which tag creates a table row?",
      options: ["<td>", "<th>", "<tr>", "<row>"],
      answer: "<tr>",
    },
    {
      question: "Which tag is used for a line break?",
      options: ["<break>", "<lb>", "<br>", "<line>"],
      answer: "<br>",
    },
    {
      question: "HTML is mainly used to structure what?",
      options: ["Web pages", "Databases", "Operating systems", "Networks"],
      answer: "Web pages",
    },
  ],

  CSS: [
    {
      question: "What does CSS stand for?",
      options: [
        "Cascading Style Sheets",
        "Computer Style Sheets",
        "Creative Style System",
        "Colorful Style Sheets",
      ],
      answer: "Cascading Style Sheets",
    },
    {
      question: "Which property changes text color?",
      options: ["font-color", "text-color", "color", "foreground"],
      answer: "color",
    },
    {
      question: "Which property changes the background color?",
      options: ["bgcolor", "background-color", "background", "color-bg"],
      answer: "background-color",
    },
    {
      question: "Which symbol represents a class selector?",
      options: ["#", ".", "*", "&"],
      answer: ".",
    },
    {
      question: "Which symbol represents an ID selector?",
      options: [".", "#", "*", "@"],
      answer: "#",
    },
    {
      question: "Which property controls text size?",
      options: ["text-size", "font-size", "size", "font-height"],
      answer: "font-size",
    },
    {
      question: "Which property creates space inside an element?",
      options: ["margin", "padding", "spacing", "inside-space"],
      answer: "padding",
    },
    {
      question: "Which property creates space outside an element?",
      options: ["padding", "margin", "spacing", "outside"],
      answer: "margin",
    },
    {
      question: "Which CSS layout system is useful for one-dimensional layouts?",
      options: ["Grid", "Flexbox", "Float", "Table"],
      answer: "Flexbox",
    },
    {
      question: "Which property makes text bold?",
      options: ["font-style", "font-weight", "text-bold", "bold"],
      answer: "font-weight",
    },
  ],

  JavaScript: [
    {
      question: "Which keyword declares a variable that can be reassigned?",
      options: ["const", "let", "fixed", "varonly"],
      answer: "let",
    },
    {
      question: "Which keyword declares a constant?",
      options: ["constant", "const", "fixed", "static"],
      answer: "const",
    },
    {
      question: "Which method prints output to the browser console?",
      options: ["print()", "console.log()", "echo()", "display()"],
      answer: "console.log()",
    },
    {
      question: "Which symbol is used for strict equality?",
      options: ["=", "==", "===", "!="],
      answer: "===",
    },
    {
      question: "Which data type represents true or false?",
      options: ["String", "Boolean", "Number", "Object"],
      answer: "Boolean",
    },
    {
      question: "Which method adds an item to the end of an array?",
      options: ["add()", "push()", "append()", "insert()"],
      answer: "push()",
    },
    {
      question: "Which function converts JSON text into a JavaScript object?",
      options: [
        "JSON.parse()",
        "JSON.convert()",
        "JSON.object()",
        "JSON.read()",
      ],
      answer: "JSON.parse()",
    },
    {
      question: "Which keyword is used to define a function?",
      options: ["function", "def", "func", "method"],
      answer: "function",
    },
    {
      question: "Which operator is used for addition?",
      options: ["+", "&", ".", "add"],
      answer: "+",
    },
    {
      question: "JavaScript is mainly used to add what to web pages?",
      options: [
        "Interactivity",
        "Database tables",
        "Operating systems",
        "Hardware",
      ],
      answer: "Interactivity",
    },
  ],

  SQL: [
    {
      question: "Which SQL command is used to retrieve data?",
      options: ["GET", "SELECT", "FETCH", "READ"],
      answer: "SELECT",
    },
    {
      question: "Which command adds new data?",
      options: ["ADD", "INSERT", "CREATE", "PUT"],
      answer: "INSERT",
    },
    {
      question: "Which command modifies existing data?",
      options: ["CHANGE", "UPDATE", "MODIFY", "EDIT"],
      answer: "UPDATE",
    },
    {
      question: "Which command removes rows?",
      options: ["REMOVE", "DELETE", "DROP", "CLEAR"],
      answer: "DELETE",
    },
    {
      question: "Which clause filters records?",
      options: ["FILTER", "WHERE", "WHEN", "IF"],
      answer: "WHERE",
    },
    {
      question: "Which clause sorts query results?",
      options: ["SORT BY", "ORDER BY", "GROUP BY", "ARRANGE"],
      answer: "ORDER BY",
    },
    {
      question: "Which function counts rows?",
      options: ["COUNT()", "TOTAL()", "ROWS()", "NUMBER()"],
      answer: "COUNT()",
    },
    {
      question: "Which keyword removes duplicate results?",
      options: ["UNIQUE", "DISTINCT", "ONLY", "DIFFERENT"],
      answer: "DISTINCT",
    },
    {
      question: "Which clause groups rows?",
      options: ["GROUP BY", "ORDER BY", "COLLECT BY", "SORT BY"],
      answer: "GROUP BY",
    },
    {
      question: "Which command creates a database table?",
      options: [
        "MAKE TABLE",
        "CREATE TABLE",
        "NEW TABLE",
        "BUILD TABLE",
      ],
      answer: "CREATE TABLE",
    },
  ],

  Bootstrap: [
    {
      question: "Bootstrap is mainly used for what?",
      options: ["Web UI", "Database", "Operating System", "Compiler"],
      answer: "Web UI",
    },
    {
      question: "Which Bootstrap class creates a container?",
      options: [".box", ".container", ".wrapper", ".main"],
      answer: ".container",
    },
    {
      question: "Which class creates a primary button?",
      options: [
        ".button-primary",
        ".btn-primary",
        ".primary-btn",
        ".btn-blue",
      ],
      answer: ".btn-primary",
    },
    {
      question: "Bootstrap provides which type of grid?",
      options: [
        "12-column grid",
        "10-column grid",
        "8-column grid",
        "16-column grid",
      ],
      answer: "12-column grid",
    },
    {
      question: "Which class makes an image responsive?",
      options: [
        ".responsive",
        ".img-responsive",
        ".img-fluid",
        ".image-fluid",
      ],
      answer: ".img-fluid",
    },
    {
      question: "Bootstrap is based heavily on which CSS technology?",
      options: ["Flexbox", "SVG", "Canvas", "WebGL"],
      answer: "Flexbox",
    },
    {
      question: "Which class creates a card?",
      options: [".box", ".card", ".panel", ".container-card"],
      answer: ".card",
    },
    {
      question: "Which class creates a success button?",
      options: [
        ".btn-success",
        ".success-button",
        ".button-green",
        ".btn-green",
      ],
      answer: ".btn-success",
    },
    {
      question: "Bootstrap helps make websites what?",
      options: ["Responsive", "Offline", "Encrypted", "Executable"],
      answer: "Responsive",
    },
    {
      question: "Which prefix is commonly used for Bootstrap buttons?",
      options: [".button", ".btn", ".b-", ".boot-"],
      answer: ".btn",
    },
  ],

  React: [
    {
      question: "React is mainly used to build what?",
      options: ["User interfaces", "Databases", "Operating systems", "Compilers"],
      answer: "User interfaces",
    },
    {
      question: "Which function is used to create a React component?",
      options: ["function", "component()", "createComponent()", "reactComponent()"],
      answer: "function",
    },
    {
      question: "Which hook is used to manage state?",
      options: ["useState", "useData", "useValue", "useManage"],
      answer: "useState",
    },
    {
      question: "Which hook is used for side effects?",
      options: ["useEffect", "useSide", "useAction", "useEvent"],
      answer: "useEffect",
    },
    {
      question: "What syntax is commonly used to write HTML-like code in React?",
      options: ["JSX", "XML", "HTMLX", "ReactHTML"],
      answer: "JSX",
    },
    {
      question: "How are data passed from parent to child components?",
      options: ["Props", "State", "Hooks", "Events only"],
      answer: "Props",
    },
    {
      question: "Which command commonly starts a React development server?",
      options: ["npm start", "npm run database", "react start", "node react"],
      answer: "npm start",
    },
    {
      question: "What is the purpose of a key when rendering lists?",
      options: [
        "Identify list elements",
        "Style elements",
        "Create CSS",
        "Connect database",
      ],
      answer: "Identify list elements",
    },
    {
      question: "Which library is commonly used for routing in React?",
      options: [
        "React Router",
        "React SQL",
        "React Database",
        "React Server",
      ],
      answer: "React Router",
    },
    {
      question: "React applications are commonly built using which language?",
      options: ["JavaScript", "SQL", "PHP only", "Python only"],
      answer: "JavaScript",
    },
  ],

  Java: [
    {
      question: "Which keyword is used to create a class in Java?",
      options: ["class", "struct", "define", "object"],
      answer: "class",
    },
    {
      question: "Which method is the entry point of a Java application?",
      options: ["start()", "main()", "run()", "execute()"],
      answer: "main()",
    },
    {
      question: "Which keyword is used to inherit a class?",
      options: ["implements", "extends", "inherits", "super"],
      answer: "extends",
    },
    {
      question: "Which keyword is used to create an object?",
      options: ["create", "object", "new", "instance"],
      answer: "new",
    },
    {
      question: "Which data type stores whole numbers?",
      options: ["int", "float", "char", "boolean"],
      answer: "int",
    },
    {
      question: "Which keyword prevents a variable from being changed?",
      options: ["constant", "final", "static", "fixed"],
      answer: "final",
    },
    {
      question: "Which concept allows one class to have many forms?",
      options: ["Polymorphism", "Compilation", "Packaging", "Casting"],
      answer: "Polymorphism",
    },
    {
      question: "Which keyword is used to implement an interface?",
      options: ["extends", "implements", "interface", "inherit"],
      answer: "implements",
    },
    {
      question: "Java source files normally use which extension?",
      options: [".java", ".js", ".classjava", ".jav"],
      answer: ".java",
    },
    {
      question: "Java is mainly known as what type of language?",
      options: [
        "Object-oriented programming language",
        "Markup language",
        "Query language",
        "Styling language",
      ],
      answer: "Object-oriented programming language",
    },
  ],
};

/* =========================================================
   FALLBACK QUESTIONS
========================================================= */

const createFallbackQuestions = (skill) => [
  {
    question: `What is the main purpose of ${skill}?`,
    options: [
      "Building software solutions",
      "Only playing games",
      "Only editing images",
      "Only sending emails",
    ],
    answer: "Building software solutions",
  },
  {
    question: `Which is an important skill when learning ${skill}?`,
    options: [
      "Problem solving",
      "Ignoring errors",
      "Avoiding practice",
      "Never testing code",
    ],
    answer: "Problem solving",
  },
  {
    question: `What should developers do when they find an error in ${skill}?`,
    options: [
      "Debug it",
      "Ignore it",
      "Delete everything",
      "Stop learning",
    ],
    answer: "Debug it",
  },
  {
    question: `Which activity improves ${skill}?`,
    options: [
      "Practice and projects",
      "Avoiding projects",
      "Memorizing without practice",
      "Never using the technology",
    ],
    answer: "Practice and projects",
  },
  {
    question: `What is a good software development practice while using ${skill}?`,
    options: [
      "Testing",
      "Ignoring bugs",
      "Skipping validation",
      "Never reviewing code",
    ],
    answer: "Testing",
  },
  {
    question: `Which skill helps developers understand ${skill} problems?`,
    options: [
      "Logical thinking",
      "Guessing",
      "Ignoring requirements",
      "Avoiding documentation",
    ],
    answer: "Logical thinking",
  },
  {
    question: `What helps demonstrate ${skill} to an employer?`,
    options: [
      "Projects",
      "No practice",
      "Only watching videos",
      "Avoiding implementation",
    ],
    answer: "Projects",
  },
  {
    question: `Why is testing important when working with ${skill}?`,
    options: [
      "To find problems",
      "To remove all code",
      "To avoid users",
      "To stop development",
    ],
    answer: "To find problems",
  },
  {
    question: `What is useful when learning ${skill}?`,
    options: [
      "Hands-on practice",
      "Avoiding examples",
      "Ignoring documentation",
      "Never experimenting",
    ],
    answer: "Hands-on practice",
  },
  {
    question: `Which approach is best for improving ${skill} knowledge?`,
    options: [
      "Practice, projects and testing",
      "Avoiding practice",
      "Never building anything",
      "Ignoring errors",
    ],
    answer: "Practice, projects and testing",
  },
];

/* =========================================================
   SKILL NORMALIZATION
========================================================= */

const normalizeSkillName = (skill) => {
  const value = String(skill || "").trim();

  const aliases = {
    javascript: "JavaScript",
    js: "JavaScript",
    python: "Python",
    html: "HTML",
    css: "CSS",
    sql: "SQL",
    bootstrap: "Bootstrap",
    react: "React",
    "react.js": "React",
    reactjs: "React",
    java: "Java",
  };

  return aliases[value.toLowerCase()] || value;
};

/* =========================================================
   USER ID
========================================================= */

const safeUserId = (user) => {
  if (!user) {
    return "guest";
  }

  return String(
    user.id ||
      user._id ||
      user.email ||
      user.username ||
      "guest"
  )
    .trim()
    .replace(/[^a-zA-Z0-9_-]/g, "_");
};

/* =========================================================
   COMPONENT
========================================================= */

function SkillTest({
  skill = "Python",
  user,
  onBack,
}) {
  const actualSkill = normalizeSkillName(skill);

  const questions =
    skillQuestions[actualSkill] ||
    createFallbackQuestions(actualSkill);

  const userId = safeUserId(user);

  const resultStorageKey =
    `skillTestResult_${userId}_${actualSkill}`;

  const [currentQuestion, setCurrentQuestion] =
    useState(0);

  const [selectedAnswer, setSelectedAnswer] =
    useState("");

  const [answers, setAnswers] =
    useState({});

  const [completed, setCompleted] =
    useState(false);

  const [score, setScore] =
    useState(0);

  const question =
    questions[currentQuestion];

  /* =======================================================
     LEVEL
  ======================================================= */

  const getLevel = (value) => {
    if (value >= 80) {
      return "Advanced";
    }

    if (value >= 60) {
      return "Intermediate";
    }

    return "Beginner";
  };

  /* =======================================================
     FINISH TEST
  ======================================================= */

  const finishTest = (finalAnswers) => {
    let correct = 0;

    questions.forEach(
      (item, index) => {
        if (
          finalAnswers[index] ===
          item.answer
        ) {
          correct++;
        }
      }
    );

    const finalScore =
      Math.round(
        (correct /
          questions.length) *
          100
      );

    const finalLevel =
      getLevel(finalScore);

    const result = {
      skill: actualSkill,
      score: finalScore,
      level: finalLevel,
      verified: true,
      totalQuestions:
        questions.length,
      correctAnswers: correct,
      completedAt:
        new Date().toISOString(),
    };

    setScore(finalScore);
    setCompleted(true);

    localStorage.setItem(
      resultStorageKey,
      JSON.stringify(result)
    );
  };

  /* =======================================================
     NEXT QUESTION
  ======================================================= */

  const handleNext = () => {
    if (!selectedAnswer) {
      return;
    }

    const updatedAnswers = {
      ...answers,
      [currentQuestion]:
        selectedAnswer,
    };

    setAnswers(
      updatedAnswers
    );

    if (
      currentQuestion <
      questions.length - 1
    ) {
      const nextQuestion =
        currentQuestion + 1;

      setCurrentQuestion(
        nextQuestion
      );

      setSelectedAnswer(
        updatedAnswers[
          nextQuestion
        ] || ""
      );

      return;
    }

    finishTest(
      updatedAnswers
    );
  };

  /* =======================================================
     RETAKE TEST
  ======================================================= */

  const handleRetake = () => {
    localStorage.removeItem(
      resultStorageKey
    );

    setCurrentQuestion(0);
    setSelectedAnswer("");
    setAnswers({});
    setCompleted(false);
    setScore(0);
  };

  /* =======================================================
     SAVE CERTIFICATE
  ======================================================= */

  const saveCertificateAsPDF = () => {
    const level =
      getLevel(score);

    const certificateWindow =
      window.open(
        "",
        "_blank"
      );

    if (!certificateWindow) {
      alert(
        "Please allow pop-ups in your browser to save the certificate."
      );

      return;
    }

    const userName =
      user?.name ||
      user?.username ||
      "Candidate";

    certificateWindow.document.write(`
      <!DOCTYPE html>

      <html>

      <head>

        <meta charset="UTF-8" />

        <title>
          ${actualSkill} Skill Certificate
        </title>

        <style>

          * {
            box-sizing: border-box;
          }

          body {
            margin: 0;
            background: #f1f5f9;
            font-family: Arial, sans-serif;
          }

          .certificate {
            width: 900px;
            min-height: 620px;
            margin: 30px auto;
            padding: 45px;
            background: white;
            border: 12px solid #2563eb;
          }

          .inner {
            min-height: 500px;
            border: 2px solid #dbeafe;
            padding: 35px;
            text-align: center;
          }

          .logo {
            color: #2563eb;
            font-size: 22px;
            font-weight: bold;
            letter-spacing: 2px;
          }

          .title {
            margin-top: 35px;
            color: #111827;
            font-size: 42px;
            font-weight: 800;
          }

          .subtitle {
            margin-top: 15px;
            color: #64748b;
            font-size: 18px;
          }

          .candidate {
            margin-top: 25px;
            color: #111827;
            font-size: 22px;
            font-weight: 700;
          }

          .skill {
            margin: 25px 0;
            color: #2563eb;
            font-size: 34px;
            font-weight: 800;
          }

          .score {
            color: #111827;
            font-size: 24px;
            font-weight: bold;
          }

          .level {
            display: inline-block;
            margin-top: 15px;
            padding: 10px 25px;
            border-radius: 30px;
            background: #dbeafe;
            color: #1d4ed8;
            font-weight: bold;
          }

          .verified {
            margin-top: 25px;
            color: #15803d;
            font-size: 18px;
            font-weight: bold;
          }

          .footer {
            margin-top: 35px;
            color: #64748b;
            font-size: 13px;
          }

          .print-button {
            display: block;
            margin: 20px auto;
            padding: 14px 28px;
            border: none;
            border-radius: 10px;
            background: #2563eb;
            color: white;
            font-size: 16px;
            font-weight: bold;
            cursor: pointer;
          }

          @media print {

            body {
              background: white;
            }

            .certificate {
              margin: 0;
              width: 100%;
              border: 12px solid #2563eb;
            }

            .print-button {
              display: none;
            }

          }

        </style>

      </head>

      <body>

        <div class="certificate">

          <div class="inner">

            <div class="logo">
              AI RESUME ANALYZER
            </div>

            <div class="title">
              CERTIFICATE OF SKILL
            </div>

            <div class="subtitle">
              This certificate verifies successful completion of the skill assessment
            </div>

            <div class="candidate">
              ${userName}
            </div>

            <div class="skill">
              ${actualSkill} Skill Assessment
            </div>

            <div class="score">
              Skill Score: ${score} / 100
            </div>

            <div class="level">
              ${level}
            </div>

            <div class="verified">
              ✓ VERIFIED SKILL
            </div>

            <div class="footer">

              Assessment completed on
              ${new Date().toLocaleDateString()}

              <br />

              AI Resume Analyzer • Skill Proof Certificate

            </div>

          </div>

        </div>

        <button
          class="print-button"
          onclick="window.print()"
        >
          Save as PDF
        </button>

      </body>

      </html>
    `);

    certificateWindow.document.close();

    certificateWindow.focus();
  };

  /* =======================================================
     COMPLETED PAGE
  ======================================================= */

  if (completed) {
    const level =
      getLevel(score);

    const levelBackground =
      level === "Advanced"
        ? "#dcfce7"
        : level === "Intermediate"
        ? "#fef3c7"
        : "#fee2e2";

    const levelColor =
      level === "Advanced"
        ? "#15803d"
        : level === "Intermediate"
        ? "#b45309"
        : "#dc2626";

    return (
      <div
        style={{
          minHeight: "100vh",
          background:
            "linear-gradient(135deg,#eef2ff,#f8fafc)",
          padding: "40px 20px",
          fontFamily:
            "Arial, sans-serif",
        }}
      >
        <div
          style={{
            maxWidth: "650px",
            margin: "0 auto",
            background: "#ffffff",
            padding: "45px",
            borderRadius: "24px",
            textAlign: "center",
            boxShadow:
              "0 20px 60px rgba(15,23,42,0.12)",
          }}
        >

          {/* SUCCESS ICON */}

          <div
            style={{
              width: "75px",
              height: "75px",
              margin:
                "0 auto 20px",
              borderRadius: "50%",
              background: "#dcfce7",
              color: "#16a34a",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "35px",
              fontWeight: "bold",
            }}
          >
            ✓
          </div>

          <h1
            style={{
              color: "#111827",
              marginBottom: "10px",
            }}
          >
            Skill Test Completed
          </h1>

          <p
            style={{
              color: "#64748b",
              marginBottom: "30px",
            }}
          >
            Your {actualSkill} assessment result
          </p>

          {/* SCORE CARD */}

          <div
            style={{
              background: "#eff6ff",
              padding: "30px",
              borderRadius: "18px",
              marginBottom: "25px",
            }}
          >

            <div
              style={{
                fontSize: "28px",
                fontWeight: "900",
                color: "#111827",
                marginBottom: "10px",
              }}
            >
              {actualSkill}
            </div>

            <div
              style={{
                fontSize: "52px",
                fontWeight: "900",
                color: "#2563eb",
              }}
            >
              {score}%
            </div>

            <div
              style={{
                color: "#64748b",
                marginTop: "5px",
              }}
            >
              Skill Score
            </div>

          </div>

          {/* LEVEL */}

          <div
            style={{
              display: "inline-block",
              padding:
                "10px 22px",
              borderRadius: "30px",
              background:
                levelBackground,
              color:
                levelColor,
              fontWeight: "800",
              marginBottom: "20px",
            }}
          >
            {level}
          </div>

          {/* VERIFIED */}

          <div
            style={{
              background: "#f0fdf4",
              border:
                "1px solid #bbf7d0",
              color: "#15803d",
              padding: "15px",
              borderRadius: "12px",
              fontWeight: "700",
              marginBottom: "25px",
            }}
          >
            ✓ {actualSkill} Skill Assessment Verified
          </div>

          <p
            style={{
              color: "#64748b",
              fontSize: "14px",
              lineHeight: "1.6",
            }}
          >
            Your verified {actualSkill}
            {" "}
            skill result can be used
            as skill proof in your career
            profile.
          </p>

          {/* ACTION BUTTONS */}

          <div
            style={{
              display: "flex",
              gap: "12px",
              justifyContent:
                "center",
              flexWrap: "wrap",
              marginTop: "25px",
            }}
          >

            <button
              onClick={
                saveCertificateAsPDF
              }
              style={{
                padding:
                  "14px 22px",
                border: "none",
                borderRadius: "12px",
                background:
                  "linear-gradient(135deg,#2563eb,#4f46e5)",
                color: "#ffffff",
                fontWeight: "800",
                cursor: "pointer",
                fontSize: "15px",
              }}
            >
              📄 Save Certificate as PDF
            </button>

            <button
              onClick={handleRetake}
              style={{
                padding:
                  "14px 22px",
                border:
                  "1px solid #d1d5db",
                borderRadius: "12px",
                background: "#ffffff",
                color: "#374151",
                fontWeight: "700",
                cursor: "pointer",
                fontSize: "15px",
              }}
            >
              Retake Test
            </button>

          </div>

          {/* BACK */}

          {onBack && (
            <button
              onClick={onBack}
              style={{
                marginTop: "20px",
                border: "none",
                background:
                  "transparent",
                color: "#2563eb",
                fontWeight: "700",
                cursor: "pointer",
              }}
            >
              ← Back to Skill Proof
            </button>
          )}

        </div>
      </div>
    );
  }

  /* =======================================================
     TEST PAGE
  ======================================================= */

  const progress =
    ((currentQuestion + 1) /
      questions.length) *
    100;

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg,#eef2ff,#f8fafc)",
        padding: "40px 20px",
        fontFamily:
          "Arial, sans-serif",
      }}
    >

      <div
        style={{
          maxWidth: "700px",
          margin: "0 auto",
          background: "#ffffff",
          padding: "40px",
          borderRadius: "24px",
          boxShadow:
            "0 20px 60px rgba(15,23,42,0.12)",
        }}
      >

        {/* HEADER */}

        <div
          style={{
            display: "flex",
            justifyContent:
              "space-between",
            alignItems: "center",
            marginBottom: "30px",
            gap: "15px",
          }}
        >

          <div>

            <span
              style={{
                color: "#2563eb",
                fontSize: "12px",
                fontWeight: "800",
                letterSpacing: "1px",
              }}
            >
              SKILL PROOF
            </span>

            <h1
              style={{
                margin:
                  "8px 0 5px",
                color: "#111827",
              }}
            >
              {actualSkill} Skill Test
            </h1>

            <p
              style={{
                margin: 0,
                color: "#64748b",
              }}
            >
              Prove your {actualSkill}
              {" "}
              knowledge
            </p>

          </div>

          <div
            style={{
              padding:
                "10px 14px",
              background: "#eff6ff",
              color: "#2563eb",
              borderRadius: "10px",
              fontWeight: "800",
              whiteSpace:
                "nowrap",
            }}
          >
            {currentQuestion + 1}
            /
            {questions.length}
          </div>

        </div>

        {/* PROGRESS */}

        <div
          style={{
            height: "8px",
            background: "#e5e7eb",
            borderRadius: "20px",
            marginBottom:
              "35px",
            overflow: "hidden",
          }}
        >

          <div
            style={{
              width:
                `${progress}%`,
              height: "100%",
              background:
                "linear-gradient(90deg,#2563eb,#4f46e5)",
              transition:
                "width 0.3s ease",
            }}
          />

        </div>

        {/* QUESTION */}

        <div
          style={{
            marginBottom: "10px",
            color: "#64748b",
            fontSize: "14px",
            fontWeight: "700",
          }}
        >
          Question {currentQuestion + 1} of {questions.length}
        </div>

        <h2
          style={{
            color: "#111827",
            fontSize: "22px",
            lineHeight: "1.5",
          }}
        >
          {question.question}
        </h2>

        {/* OPTIONS */}

        <div
          style={{
            display: "grid",
            gap: "12px",
            marginTop: "25px",
          }}
        >

          {question.options.map(
            (option) => {

              const isSelected =
                selectedAnswer ===
                option;

              return (
                <button
                  key={option}
                  onClick={() =>
                    setSelectedAnswer(
                      option
                    )
                  }
                  style={{
                    textAlign:
                      "left",
                    padding:
                      "16px",
                    border:
                      isSelected
                        ? "2px solid #2563eb"
                        : "1px solid #dbe1ea",
                    borderRadius:
                      "12px",
                    background:
                      isSelected
                        ? "#eff6ff"
                        : "#ffffff",
                    color:
                      "#111827",
                    fontWeight:
                      isSelected
                        ? "700"
                        : "500",
                    cursor:
                      "pointer",
                    transition:
                      "all 0.2s ease",
                  }}
                >
                  {option}
                </button>
              );
            }
          )}

        </div>

        {/* NEXT */}

        <button
          onClick={handleNext}
          disabled={!selectedAnswer}
          style={{
            width: "100%",
            marginTop: "30px",
            padding: "15px",
            border: "none",
            borderRadius: "12px",
            background:
              selectedAnswer
                ? "linear-gradient(135deg,#2563eb,#4f46e5)"
                : "#cbd5e1",
            color: "#ffffff",
            fontWeight: "800",
            fontSize: "16px",
            cursor:
              selectedAnswer
                ? "pointer"
                : "not-allowed",
          }}
        >
          {currentQuestion ===
          questions.length - 1
            ? "Finish Test ✓"
            : "Next Question →"}
        </button>

        {/* BACK */}

        {onBack && (
          <button
            onClick={onBack}
            style={{
              width: "100%",
              marginTop: "15px",
              padding: "12px",
              border: "none",
              background:
                "transparent",
              color: "#2563eb",
              fontWeight: "700",
              cursor: "pointer",
            }}
          >
            ← Back to Resume
          </button>
        )}

      </div>
    </div>
  );
}

export default SkillTest;