import React, { useState } from "react";

// =====================================================
// QUESTIONS FOR DIFFERENT SKILLS
// =====================================================

const skillQuestions = {
  python: [
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
      question: "Which keyword is used for a loop over a sequence?",
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

  java: [
    {
      question: "Which keyword is used to create a class in Java?",
      options: ["class", "struct", "define", "object"],
      answer: "class",
    },
    {
      question: "Which method is the entry point of a Java program?",
      options: ["start()", "main()", "run()", "execute()"],
      answer: "main()",
    },
    {
      question: "Which keyword is used for inheritance in Java?",
      options: ["inherits", "extends", "implements", "inherit"],
      answer: "extends",
    },
    {
      question: "Which data type stores whole numbers?",
      options: ["float", "String", "int", "boolean"],
      answer: "int",
    },
    {
      question: "Which symbol ends a Java statement?",
      options: [".", ";", ":", ","],
      answer: ";",
    },
    {
      question: "Which keyword creates an object?",
      options: ["object", "create", "new", "make"],
      answer: "new",
    },
    {
      question: "Which keyword is used to implement an interface?",
      options: ["extends", "interface", "implements", "inherit"],
      answer: "implements",
    },
    {
      question: "Java is mainly which type of language?",
      options: ["Object-oriented", "Markup", "Query", "Assembly"],
      answer: "Object-oriented",
    },
    {
      question: "Which keyword prevents a class from being inherited?",
      options: ["static", "private", "final", "const"],
      answer: "final",
    },
    {
      question: "Which file extension is used for Java source code?",
      options: [".js", ".java", ".class", ".jav"],
      answer: ".java",
    },
  ],

  javascript: [
    {
      question: "Which keyword declares a variable that can be reassigned?",
      options: ["let", "constant", "fixed", "define"],
      answer: "let",
    },
    {
      question: "Which keyword declares a constant?",
      options: ["let", "var", "const", "constant"],
      answer: "const",
    },
    {
      question: "Which symbol is used for single-line comments?",
      options: ["#", "//", "<!--", "/*"],
      answer: "//",
    },
    {
      question: "Which method prints output to the browser console?",
      options: ["print()", "console.log()", "display()", "output()"],
      answer: "console.log()",
    },
    {
      question: "Which operator checks both value and type?",
      options: ["==", "=", "===", "!="],
      answer: "===",
    },
    {
      question: "Which keyword defines a function?",
      options: ["function", "def", "fun", "method"],
      answer: "function",
    },
    {
      question: "Which value represents no value in JavaScript?",
      options: ["empty", "null", "none", "void"],
      answer: "null",
    },
    {
      question: "Which method adds an item to the end of an array?",
      options: ["add()", "push()", "append()", "insert()"],
      answer: "push()",
    },
    {
      question: "Which language is JavaScript primarily used for?",
      options: ["Web development", "Database management", "Operating systems", "Networking only"],
      answer: "Web development",
    },
    {
      question: "What does DOM stand for?",
      options: [
        "Document Object Model",
        "Data Object Management",
        "Document Oriented Method",
        "Digital Object Model",
      ],
      answer: "Document Object Model",
    },
  ],

  react: [
    {
      question: "What is React mainly used for?",
      options: [
        "Building user interfaces",
        "Database management",
        "Operating systems",
        "Networking",
      ],
      answer: "Building user interfaces",
    },
    {
      question: "Which library is React?",
      options: ["JavaScript UI library", "Database", "CSS framework", "Operating system"],
      answer: "JavaScript UI library",
    },
    {
      question: "Which hook is used to manage state?",
      options: ["useState", "useData", "useValue", "useManage"],
      answer: "useState",
    },
    {
      question: "Which hook is commonly used for side effects?",
      options: ["useEffect", "useSide", "useAction", "useEvent"],
      answer: "useEffect",
    },
    {
      question: "What syntax is commonly used to write HTML-like code in React?",
      options: ["XML", "JSX", "JHTML", "ReactHTML"],
      answer: "JSX",
    },
    {
      question: "React components should normally return what?",
      options: ["UI/JSX", "SQL", "CSS only", "JSON only"],
      answer: "UI/JSX",
    },
    {
      question: "Props are mainly used to do what?",
      options: [
        "Pass data to components",
        "Create databases",
        "Style the browser",
        "Install packages",
      ],
      answer: "Pass data to components",
    },
    {
      question: "Which command commonly creates a React project with Vite?",
      options: ["npm create vite", "react start", "create-react-only", "npm react-new"],
      answer: "npm create vite",
    },
    {
      question: "What is a component in React?",
      options: [
        "Reusable UI building block",
        "Database table",
        "CSS property",
        "Server",
      ],
      answer: "Reusable UI building block",
    },
    {
      question: "Which file commonly contains a React component?",
      options: [".jsx", ".sql", ".java", ".php"],
      answer: ".jsx",
    },
  ],

  sql: [
    {
      question: "Which command is used to retrieve data?",
      options: ["GET", "SELECT", "FETCHALL", "READ"],
      answer: "SELECT",
    },
    {
      question: "Which command adds new records?",
      options: ["ADD", "INSERT", "CREATE", "PUT"],
      answer: "INSERT",
    },
    {
      question: "Which command modifies existing records?",
      options: ["CHANGE", "UPDATE", "MODIFY", "ALTER"],
      answer: "UPDATE",
    },
    {
      question: "Which command removes records?",
      options: ["REMOVE", "DELETE", "DROP", "CLEAR"],
      answer: "DELETE",
    },
    {
      question: "Which clause filters records?",
      options: ["FILTER", "WHERE", "WHEN", "CHECK"],
      answer: "WHERE",
    },
    {
      question: "Which keyword sorts query results?",
      options: ["SORT", "ORDER BY", "ARRANGE", "GROUP"],
      answer: "ORDER BY",
    },
    {
      question: "Which keyword removes duplicate results?",
      options: ["UNIQUE", "DISTINCT", "ONLY", "SINGLE"],
      answer: "DISTINCT",
    },
    {
      question: "Which command creates a table?",
      options: ["MAKE TABLE", "CREATE TABLE", "NEW TABLE", "ADD TABLE"],
      answer: "CREATE TABLE",
    },
    {
      question: "Which function counts rows?",
      options: ["TOTAL()", "COUNT()", "NUMBER()", "ROWS()"],
      answer: "COUNT()",
    },
    {
      question: "Which key uniquely identifies a row?",
      options: ["Foreign key", "Primary key", "Unique row", "Index key"],
      answer: "Primary key",
    },
  ],

  html: [
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
      question: "Which tag creates a heading?",
      options: ["<head>", "<h1>", "<heading>", "<title>"],
      answer: "<h1>",
    },
    {
      question: "Which tag creates a paragraph?",
      options: ["<para>", "<p>", "<text>", "<paragraph>"],
      answer: "<p>",
    },
    {
      question: "Which tag creates a hyperlink?",
      options: ["<link>", "<a>", "<href>", "<url>"],
      answer: "<a>",
    },
    {
      question: "Which tag displays an image?",
      options: ["<image>", "<img>", "<picture>", "<src>"],
      answer: "<img>",
    },
    {
      question: "Which tag creates an unordered list?",
      options: ["<ol>", "<list>", "<ul>", "<li>"],
      answer: "<ul>",
    },
    {
      question: "Which attribute provides alternative image text?",
      options: ["src", "alt", "title", "text"],
      answer: "alt",
    },
    {
      question: "Which tag creates a form?",
      options: ["<input>", "<form>", "<field>", "<data>"],
      answer: "<form>",
    },
    {
      question: "HTML is a...",
      options: ["Programming language", "Markup language", "Database", "Operating system"],
      answer: "Markup language",
    },
    {
      question: "Which tag creates a line break?",
      options: ["<break>", "<br>", "<lb>", "<newline>"],
      answer: "<br>",
    },
  ],

  css: [
    {
      question: "What does CSS stand for?",
      options: [
        "Cascading Style Sheets",
        "Computer Style System",
        "Creative Style Syntax",
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
      question: "Which property changes background color?",
      options: ["background-color", "bgcolor", "background", "color-bg"],
      answer: "background-color",
    },
    {
      question: "Which property changes font size?",
      options: ["font-size", "text-size", "size", "font-height"],
      answer: "font-size",
    },
    {
      question: "Which symbol selects a class?",
      options: ["#", ".", "*", "$"],
      answer: ".",
    },
    {
      question: "Which symbol selects an ID?",
      options: [".", "#", "*", "@"],
      answer: "#",
    },
    {
      question: "Which property controls spacing inside an element?",
      options: ["margin", "padding", "spacing", "inside"],
      answer: "padding",
    },
    {
      question: "Which property controls spacing outside an element?",
      options: ["padding", "margin", "outside", "space"],
      answer: "margin",
    },
    {
      question: "Which CSS layout system is useful for one-dimensional layouts?",
      options: ["Flexbox", "SQL", "DOM", "GridSQL"],
      answer: "Flexbox",
    },
    {
      question: "Which property makes text bold?",
      options: ["font-weight", "text-bold", "bold", "font-style"],
      answer: "font-weight",
    },
  ],
};

// =====================================================
// NORMALIZE SKILL NAME
// =====================================================

const normalizeSkill = (skill) => {
  const value = String(skill || "")
    .trim()
    .toLowerCase();

  if (value.includes("python")) return "python";
  if (value.includes("java") && !value.includes("javascript"))
    return "java";
  if (value.includes("javascript") || value === "js")
    return "javascript";
  if (value.includes("react")) return "react";
  if (value.includes("sql") || value.includes("mysql"))
    return "sql";
  if (value.includes("html")) return "html";
  if (value.includes("css")) return "css";

  return null;
};

// =====================================================
// DISPLAY NAME
// =====================================================

const getSkillDisplayName = (skillKey) => {
  const names = {
    python: "Python",
    java: "Java",
    javascript: "JavaScript",
    react: "React",
    sql: "SQL",
    html: "HTML",
    css: "CSS",
  };

  return names[skillKey] || skillKey;
};

// =====================================================
// COMPONENT
// =====================================================

function SkillTest({ skill, user, onBack }) {
  const skillKey = normalizeSkill(skill);

  const questions = skillQuestions[skillKey] || [];

  const displaySkill = getSkillDisplayName(
    skillKey || skill || "Skill"
  );

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

  // =====================================================
  // LEVEL
  // =====================================================

  const getLevel = (value) => {
    if (value >= 80) return "Advanced";
    if (value >= 60) return "Intermediate";
    return "Beginner";
  };

  // =====================================================
  // NEXT
  // =====================================================

  const handleNext = () => {
    if (!selectedAnswer) return;

    const updatedAnswers = {
      ...answers,
      [currentQuestion]: selectedAnswer,
    };

    setAnswers(updatedAnswers);

    if (
      currentQuestion <
      questions.length - 1
    ) {
      const nextQuestion =
        currentQuestion + 1;

      setCurrentQuestion(nextQuestion);

      setSelectedAnswer(
        updatedAnswers[nextQuestion] || ""
      );

      return;
    }

    // ===================================================
    // CALCULATE SCORE
    // ===================================================

    let correct = 0;

    questions.forEach(
      (item, index) => {
        if (
          updatedAnswers[index] ===
          item.answer
        ) {
          correct++;
        }
      }
    );

    const finalScore = Math.round(
      (correct / questions.length) *
        100
    );

    setScore(finalScore);
    setCompleted(true);

    // ===================================================
    // SAVE RESULT
    // ===================================================

    const result = {
      skill: displaySkill,
      score: finalScore,
      level: getLevel(finalScore),
      verified: true,
      userId: user?.id || null,
      completedAt:
        new Date().toISOString(),
    };

    localStorage.setItem(
      `skillTestResult_${skillKey}`,
      JSON.stringify(result)
    );

    // Keep latest result also
    localStorage.setItem(
      "skillTestResult",
      JSON.stringify(result)
    );
  };

  // =====================================================
  // RETAKE
  // =====================================================

  const handleRetake = () => {
    setCurrentQuestion(0);
    setSelectedAnswer("");
    setAnswers({});
    setCompleted(false);
    setScore(0);
  };

  // =====================================================
  // DOWNLOAD CERTIFICATE
  // =====================================================

  const downloadCertificate = () => {
    const level = getLevel(score);

    const certificateHTML = `
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>${displaySkill} Skill Certificate</title>

<style>

body {
  margin: 0;
  font-family: Arial, sans-serif;
  background: #f1f5f9;
}

.certificate {
  width: 900px;
  min-height: 620px;
  margin: 40px auto;
  background: white;
  border: 12px solid #2563eb;
  box-sizing: border-box;
  padding: 50px;
  text-align: center;
}

.inner {
  border: 2px solid #dbeafe;
  min-height: 500px;
  padding: 35px;
  box-sizing: border-box;
}

.logo {
  font-size: 22px;
  font-weight: bold;
  color: #2563eb;
  letter-spacing: 2px;
}

.title {
  font-size: 42px;
  font-weight: 800;
  color: #111827;
  margin-top: 35px;
}

.subtitle {
  color: #64748b;
  font-size: 18px;
  margin-top: 15px;
}

.skill {
  font-size: 34px;
  font-weight: 800;
  color: #2563eb;
  margin: 25px 0;
}

.score {
  font-size: 24px;
  font-weight: bold;
  color: #111827;
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
  font-weight: bold;
  font-size: 18px;
}

.footer {
  margin-top: 35px;
  color: #64748b;
  font-size: 13px;
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
This certificate verifies successful completion of the
</div>

<div class="skill">
${displaySkill} Skill Assessment
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
Assessment completed on ${new Date().toLocaleDateString()}
<br/>
AI Resume Analyzer • Skill Proof Certificate
</div>

</div>

</div>

</body>
</html>
`;

    const blob = new Blob(
      [certificateHTML],
      {
        type: "text/html",
      }
    );

    const url =
      URL.createObjectURL(blob);

    const link =
      document.createElement("a");

    link.href = url;

    link.download =
      `${displaySkill}-Skill-Certificate-${score}.html`;

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

    setTimeout(() => {
      URL.revokeObjectURL(url);
    }, 1000);
  };

  // =====================================================
  // UNSUPPORTED SKILL
  // =====================================================

  if (!skillKey || questions.length === 0) {
    return (
      <div
        style={{
          minHeight: "100vh",
          background:
            "linear-gradient(135deg, #eef2ff, #f8fafc)",
          padding: "40px 20px",
          fontFamily: "Arial, sans-serif",
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
          <div style={{ fontSize: "50px" }}>
            🧪
          </div>

          <h1>
            Skill Test Coming Soon
          </h1>

          <p
            style={{
              color: "#64748b",
              lineHeight: "1.6",
            }}
          >
            We detected{" "}
            <strong>{skill}</strong>{" "}
            from your resume, but a
            dedicated assessment for this
            skill is not available yet.
          </p>

          <button
            onClick={onBack}
            style={{
              marginTop: "20px",
              padding: "13px 22px",
              border: "none",
              borderRadius: "12px",
              background:
                "linear-gradient(135deg, #2563eb, #4f46e5)",
              color: "#ffffff",
              fontWeight: "800",
              cursor: "pointer",
            }}
          >
            ← Back to Resume
          </button>
        </div>
      </div>
    );
  }

  // =====================================================
  // COMPLETED
  // =====================================================

  if (completed) {
    const level = getLevel(score);

    return (
      <div
        style={{
          minHeight: "100vh",
          background:
            "linear-gradient(135deg, #eef2ff, #f8fafc)",
          padding: "40px 20px",
          fontFamily: "Arial, sans-serif",
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
          <div
            style={{
              width: "75px",
              height: "75px",
              margin: "0 auto 20px",
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
            Your {displaySkill} assessment
            result
          </p>

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

          <div
            style={{
              display: "inline-block",
              padding: "10px 22px",
              borderRadius: "30px",
              background:
                level === "Advanced"
                  ? "#dcfce7"
                  : level === "Intermediate"
                  ? "#fef3c7"
                  : "#fee2e2",
              color:
                level === "Advanced"
                  ? "#15803d"
                  : level === "Intermediate"
                  ? "#b45309"
                  : "#dc2626",
              fontWeight: "800",
              marginBottom: "20px",
            }}
          >
            {level}
          </div>

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
            ✓ Skill Assessment Verified
          </div>

          <p
            style={{
              color: "#64748b",
              fontSize: "14px",
              lineHeight: "1.6",
            }}
          >
            Your verified {displaySkill} skill
            result can be used as skill proof
            in your career profile.
          </p>

          <div
            style={{
              display: "flex",
              gap: "12px",
              justifyContent: "center",
              flexWrap: "wrap",
              marginTop: "25px",
            }}
          >
            <button
              onClick={
                downloadCertificate
              }
              style={{
                padding: "14px 22px",
                border: "none",
                borderRadius: "12px",
                background:
                  "linear-gradient(135deg, #2563eb, #4f46e5)",
                color: "#ffffff",
                fontWeight: "800",
                cursor: "pointer",
                fontSize: "15px",
              }}
            >
              📜 Download Certificate
            </button>

            <button
              onClick={handleRetake}
              style={{
                padding: "14px 22px",
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
              ← Back to Resume
            </button>
          )}
        </div>
      </div>
    );
  }

  // =====================================================
  // TEST PAGE
  // =====================================================

  const question =
    questions[currentQuestion];

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg, #eef2ff, #f8fafc)",
        padding: "40px 20px",
        fontFamily: "Arial, sans-serif",
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
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
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
                margin: "8px 0 5px",
                color: "#111827",
              }}
            >
              {displaySkill} Skill Test
            </h1>

            <p
              style={{
                margin: 0,
                color: "#64748b",
              }}
            >
              Prove your {displaySkill} knowledge
            </p>
          </div>

          <div
            style={{
              padding: "10px 14px",
              background: "#eff6ff",
              color: "#2563eb",
              borderRadius: "10px",
              fontWeight: "800",
              whiteSpace: "nowrap",
            }}
          >
            {currentQuestion + 1}/
            {questions.length}
          </div>
        </div>

        <div
          style={{
            height: "8px",
            background: "#e5e7eb",
            borderRadius: "20px",
            marginBottom: "35px",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              width: `${
                ((currentQuestion + 1) /
                  questions.length) *
                100
              }%`,
              height: "100%",
              background:
                "linear-gradient(90deg, #2563eb, #4f46e5)",
            }}
          />
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

        <div
          style={{
            display: "grid",
            gap: "12px",
            marginTop: "25px",
          }}
        >
          {question.options.map(
            (option) => (
              <button
                key={option}
                onClick={() =>
                  setSelectedAnswer(
                    option
                  )
                }
                style={{
                  textAlign: "left",
                  padding: "16px",
                  borderRadius: "12px",
                  border:
                    selectedAnswer ===
                    option
                      ? "2px solid #2563eb"
                      : "1px solid #dbe1ea",
                  background:
                    selectedAnswer ===
                    option
                      ? "#eff6ff"
                      : "#ffffff",
                  color: "#111827",
                  fontWeight:
                    selectedAnswer ===
                    option
                      ? "700"
                      : "500",
                  cursor: "pointer",
                }}
              >
                {option}
              </button>
            )
          )}
        </div>

        <button
          onClick={handleNext}
          disabled={!selectedAnswer}
          style={{
            width: "100%",
            marginTop: "30px",
            padding: "15px",
            border: "none",
            borderRadius: "12px",
            background: selectedAnswer
              ? "linear-gradient(135deg, #2563eb, #4f46e5)"
              : "#cbd5e1",
            color: "#ffffff",
            fontWeight: "800",
            fontSize: "16px",
            cursor: selectedAnswer
              ? "pointer"
              : "not-allowed",
          }}
        >
          {currentQuestion ===
          questions.length - 1
            ? "Finish Test"
            : "Next Question →"}
        </button>

        {onBack && (
          <button
            onClick={onBack}
            style={{
              width: "100%",
              marginTop: "15px",
              padding: "12px",
              border: "none",
              background: "transparent",
              color: "#64748b",
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