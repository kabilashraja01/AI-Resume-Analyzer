import React, { useState } from "react";

/* =========================================================
   QUESTION BANK
========================================================= */

const questionBank = {
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
      question: "Which tag is used to create a hyperlink?",
      options: ["<link>", "<a>", "<href>", "<url>"],
      answer: "<a>",
    },
    {
      question: "Which tag is used to display an image?",
      options: ["<image>", "<img>", "<picture>", "<src>"],
      answer: "<img>",
    },
    {
      question: "Which tag creates a paragraph?",
      options: ["<p>", "<para>", "<text>", "<paragraph>"],
      answer: "<p>",
    },
    {
      question: "Which attribute specifies an image source?",
      options: ["href", "src", "link", "source"],
      answer: "src",
    },
    {
      question: "Which tag creates an unordered list?",
      options: ["<ol>", "<ul>", "<list>", "<li>"],
      answer: "<ul>",
    },
    {
      question: "Which tag is used to create a table row?",
      options: ["<td>", "<tr>", "<th>", "<row>"],
      answer: "<tr>",
    },
    {
      question: "Which HTML element is used for a form?",
      options: ["<input>", "<form>", "<field>", "<data>"],
      answer: "<form>",
    },
    {
      question: "Which declaration defines an HTML5 document?",
      options: ["<html5>", "<doctype>", "<!DOCTYPE html>", "<html version='5'>"],
      answer: "<!DOCTYPE html>",
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
      options: ["background-color", "bgcolor", "background", "color"],
      answer: "background-color",
    },
    {
      question: "Which symbol selects a class in CSS?",
      options: ["#", ".", "*", "&"],
      answer: ".",
    },
    {
      question: "Which symbol selects an ID in CSS?",
      options: [".", "#", "@", "*"],
      answer: "#",
    },
    {
      question: "Which property makes text bold?",
      options: ["font-style", "font-weight", "text-bold", "bold"],
      answer: "font-weight",
    },
    {
      question: "Which CSS property controls spacing inside an element?",
      options: ["margin", "padding", "spacing", "border"],
      answer: "padding",
    },
    {
      question: "Which property controls spacing outside an element?",
      options: ["padding", "margin", "space", "outside"],
      answer: "margin",
    },
    {
      question: "Which CSS layout system is useful for one-dimensional layouts?",
      options: ["Flexbox", "Table", "Float", "Position"],
      answer: "Flexbox",
    },
    {
      question: "Which property is used to change font size?",
      options: ["font-size", "text-size", "size", "font"],
      answer: "font-size",
    },
  ],

  JavaScript: [
    {
      question: "Which keyword declares a block-scoped variable?",
      options: ["var", "let", "define", "variable"],
      answer: "let",
    },
    {
      question: "Which keyword declares a constant?",
      options: ["constant", "const", "fixed", "static"],
      answer: "const",
    },
    {
      question: "Which method prints output to the console?",
      options: ["print()", "console.log()", "output()", "display()"],
      answer: "console.log()",
    },
    {
      question: "Which symbol is used for strict equality?",
      options: ["=", "==", "===", "!="],
      answer: "===",
    },
    {
      question: "Which method adds an item to the end of an array?",
      options: ["push()", "add()", "append()", "insert()"],
      answer: "push()",
    },
    {
      question: "Which keyword is used to define a function?",
      options: ["function", "def", "fun", "method"],
      answer: "function",
    },
    {
      question: "Which method converts JSON text into an object?",
      options: [
        "JSON.parse()",
        "JSON.convert()",
        "JSON.object()",
        "JSON.decode()",
      ],
      answer: "JSON.parse()",
    },
    {
      question: "Which event occurs when a user clicks an element?",
      options: ["onhover", "onclick", "onpress", "onselect"],
      answer: "onclick",
    },
    {
      question: "Which value represents absence of a value?",
      options: ["empty", "null", "void", "none"],
      answer: "null",
    },
    {
      question: "Which method removes the last item from an array?",
      options: ["remove()", "delete()", "pop()", "last()"],
      answer: "pop()",
    },
  ],

  SQL: [
    {
      question: "Which command is used to retrieve data?",
      options: ["GET", "SELECT", "FETCH", "READ"],
      answer: "SELECT",
    },
    {
      question: "Which command adds new data to a table?",
      options: ["ADD", "INSERT", "CREATE", "APPEND"],
      answer: "INSERT",
    },
    {
      question: "Which command modifies existing data?",
      options: ["CHANGE", "UPDATE", "MODIFY", "ALTER"],
      answer: "UPDATE",
    },
    {
      question: "Which command removes rows from a table?",
      options: ["REMOVE", "DELETE", "DROP", "CLEAR"],
      answer: "DELETE",
    },
    {
      question: "Which clause filters records?",
      options: ["FILTER", "WHERE", "HAVING", "SEARCH"],
      answer: "WHERE",
    },
    {
      question: "Which keyword sorts query results?",
      options: ["SORT BY", "ORDER BY", "GROUP BY", "ARRANGE"],
      answer: "ORDER BY",
    },
    {
      question: "Which function counts rows?",
      options: ["COUNT()", "TOTAL()", "NUMBER()", "ROWS()"],
      answer: "COUNT()",
    },
    {
      question: "Which command creates a table?",
      options: ["MAKE TABLE", "CREATE TABLE", "NEW TABLE", "BUILD TABLE"],
      answer: "CREATE TABLE",
    },
    {
      question: "Which key uniquely identifies a row?",
      options: ["Foreign Key", "Primary Key", "Unique Row", "Main Key"],
      answer: "Primary Key",
    },
    {
      question: "Which clause groups rows?",
      options: ["GROUP BY", "ORDER BY", "COLLECT BY", "MERGE BY"],
      answer: "GROUP BY",
    },
  ],

  Bootstrap: [
    {
      question: "Bootstrap is primarily used for what?",
      options: [
        "Database management",
        "Web interface design",
        "Server hosting",
        "Programming logic",
      ],
      answer: "Web interface design",
    },
    {
      question: "Which Bootstrap class creates a responsive container?",
      options: [".container", ".box", ".wrapper", ".responsive"],
      answer: ".container",
    },
    {
      question: "Which class creates a primary button?",
      options: [".button-primary", ".btn-primary", ".primary-btn", ".btn-blue"],
      answer: ".btn-primary",
    },
    {
      question: "Which class creates a Bootstrap row?",
      options: [".line", ".row", ".grid-row", ".horizontal"],
      answer: ".row",
    },
    {
      question: "Which class creates columns?",
      options: [".column", ".col", ".grid", ".cell"],
      answer: ".col",
    },
    {
      question: "Bootstrap is based on which layout system?",
      options: ["12-column grid", "10-column grid", "8-column grid", "5-column grid"],
      answer: "12-column grid",
    },
    {
      question: "Which class makes an image responsive?",
      options: [".responsive-img", ".img-responsive", ".img-fluid", ".fluid-image"],
      answer: ".img-fluid",
    },
    {
      question: "Which class adds margin?",
      options: [".m-3", ".margin-3", ".space-3", ".mg-3"],
      answer: ".m-3",
    },
    {
      question: "Bootstrap provides ready-made what?",
      options: ["Components", "Databases", "Servers", "Compilers"],
      answer: "Components",
    },
    {
      question: "Which Bootstrap class creates a navigation bar?",
      options: [".navigation", ".navbar", ".nav-bar", ".menu"],
      answer: ".navbar",
    },
  ],
};

/* =========================================================
   FALLBACK QUESTIONS
========================================================= */

const createFallbackQuestions = (skill) => [
  {
    question: `Which statement best describes ${skill}?`,
    options: [
      `${skill} is a technology or professional skill`,
      `${skill} is only a database`,
      `${skill} is only an operating system`,
      `${skill} is a hardware component`,
    ],
    answer: `${skill} is a technology or professional skill`,
  },
  {
    question: `Why is ${skill} useful in a professional environment?`,
    options: [
      "It can be used to solve practical problems",
      "It is only used for gaming",
      "It cannot be used in projects",
      "It is unrelated to technology",
    ],
    answer: "It can be used to solve practical problems",
  },
  {
    question: `What is a good way to improve ${skill}?`,
    options: [
      "Practice projects and real-world tasks",
      "Never practice",
      "Only memorize the name",
      "Avoid using documentation",
    ],
    answer: "Practice projects and real-world tasks",
  },
  {
    question: `How can ${skill} be demonstrated to an employer?`,
    options: [
      "Projects and practical work",
      "Only by mentioning it",
      "By avoiding projects",
      "By deleting it from the resume",
    ],
    answer: "Projects and practical work",
  },
  {
    question: `What should a beginner do when learning ${skill}?`,
    options: [
      "Learn fundamentals and practice",
      "Skip fundamentals",
      "Avoid examples",
      "Only read the skill name",
    ],
    answer: "Learn fundamentals and practice",
  },
  {
    question: `Which approach is useful for becoming better at ${skill}?`,
    options: [
      "Build practical projects",
      "Never use it",
      "Avoid feedback",
      "Only watch unrelated videos",
    ],
    answer: "Build practical projects",
  },
  {
    question: `How should ${skill} be used in a project?`,
    options: [
      "According to the project's requirements",
      "Without understanding the requirement",
      "Only for decoration",
      "Never with other technologies",
    ],
    answer: "According to the project's requirements",
  },
  {
    question: `What is important when working with ${skill}?`,
    options: [
      "Understanding concepts and applying them",
      "Only memorizing definitions",
      "Ignoring errors",
      "Avoiding practice",
    ],
    answer: "Understanding concepts and applying them",
  },
  {
    question: `How can ${skill} knowledge become stronger?`,
    options: [
      "Regular practice and projects",
      "Avoiding practical work",
      "Never reviewing mistakes",
      "Only reading the resume",
    ],
    answer: "Regular practice and projects",
  },
  {
    question: `What is the best proof of ${skill} knowledge?`,
    options: [
      "Practical assessment and projects",
      "Only claiming the skill",
      "Only writing the skill name",
      "No evidence is needed",
    ],
    answer: "Practical assessment and projects",
  },
];

/* =========================================================
   COMPONENT
========================================================= */

function SkillTest({ skill, onBack }) {
  const selectedSkill = skill || "Skill";

  const normalizedSkill =
    Object.keys(questionBank).find(
      (item) =>
        item.toLowerCase() === selectedSkill.toLowerCase()
    ) || selectedSkill;

  const questions =
    questionBank[normalizedSkill] ||
    createFallbackQuestions(selectedSkill);

  const storageKey = `skillTestResult_${selectedSkill}`;

  const [currentQuestion, setCurrentQuestion] =
    useState(0);

  const [selectedAnswer, setSelectedAnswer] =
    useState("");

  const [answers, setAnswers] = useState({});

  const [completed, setCompleted] =
    useState(false);

  const [score, setScore] = useState(0);

  const getLevel = (value) => {
    if (value >= 80) return "Advanced";
    if (value >= 60) return "Intermediate";
    return "Beginner";
  };

  /* =====================================================
     FINISH TEST
  ===================================================== */

  const finishTest = (updatedAnswers) => {
    let correct = 0;

    questions.forEach((item, index) => {
      if (
        updatedAnswers[index] ===
        item.answer
      ) {
        correct++;
      }
    });

    const finalScore = Math.round(
      (correct / questions.length) * 100
    );

    const result = {
      skill: selectedSkill,
      score: finalScore,
      level: getLevel(finalScore),
      verified: true,
      completedAt:
        new Date().toISOString(),
    };

    setScore(finalScore);
    setCompleted(true);

    /*
      Each skill gets its own result.
      Example:
      skillTestResult_Python
      skillTestResult_HTML
      skillTestResult_SQL
    */

    localStorage.setItem(
      storageKey,
      JSON.stringify(result)
    );
  };

  /* =====================================================
     NEXT QUESTION
  ===================================================== */

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

      setCurrentQuestion(
        nextQuestion
      );

      setSelectedAnswer(
        updatedAnswers[nextQuestion] || ""
      );
    } else {
      finishTest(updatedAnswers);
    }
  };

  /* =====================================================
     RETAKE
  ===================================================== */

  const handleRetake = () => {
    setCurrentQuestion(0);
    setSelectedAnswer("");
    setAnswers({});
    setCompleted(false);
    setScore(0);

    localStorage.removeItem(
      storageKey
    );
  };

  /* =====================================================
     CERTIFICATE DOWNLOAD
  ===================================================== */

  const downloadCertificate = () => {
    const level = getLevel(score);

    const certificateHTML = `
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>${selectedSkill} Skill Certificate</title>

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
${selectedSkill} Skill Assessment
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
      `${selectedSkill}-Skill-Certificate-${score}.html`;

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

    setTimeout(() => {
      URL.revokeObjectURL(url);
    }, 1000);
  };

  /* =====================================================
     COMPLETED PAGE
  ===================================================== */

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
            Your {selectedSkill} assessment result
          </p>

          <div
            style={{
              background: "#eff6ff",
              padding: "30px",
              borderRadius: "18px",
              marginBottom: "20px",
            }}
          >
            <div
              style={{
                fontSize: "28px",
                fontWeight: "900",
                color: "#111827",
                marginBottom: "12px",
              }}
            >
              {selectedSkill}
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
              border: "1px solid #bbf7d0",
              color: "#15803d",
              padding: "15px",
              borderRadius: "12px",
              fontWeight: "700",
              marginBottom: "25px",
            }}
          >
            ✓ {selectedSkill} Skill Assessment Verified
          </div>

          <p
            style={{
              color: "#64748b",
              fontSize: "14px",
              lineHeight: "1.6",
            }}
          >
            Your verified {selectedSkill} skill result
            can be used as skill proof in your career
            profile.
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
              onClick={downloadCertificate}
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
                border: "1px solid #d1d5db",
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
                background: "transparent",
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

  /* =====================================================
     TEST PAGE
  ===================================================== */

  const progress =
    ((currentQuestion + 1) /
      questions.length) *
    100;

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
              {selectedSkill} Skill Test
            </h1>

            <p
              style={{
                margin: 0,
                color: "#64748b",
              }}
            >
              Prove your {selectedSkill} knowledge
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
            {currentQuestion + 1}/{questions.length}
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
              width: `${progress}%`,
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
          {questionBank[normalizedSkill]
            ? questions[currentQuestion].question
            : questions[currentQuestion].question}
        </h2>

        <div
          style={{
            display: "grid",
            gap: "12px",
            marginTop: "25px",
          }}
        >
          {questions[
            currentQuestion
          ].options.map((option) => (
            <button
              key={option}
              onClick={() =>
                setSelectedAnswer(option)
              }
              style={{
                textAlign: "left",
                padding: "16px",
                borderRadius: "12px",
                border:
                  selectedAnswer === option
                    ? "2px solid #2563eb"
                    : "1px solid #dbe1ea",
                background:
                  selectedAnswer === option
                    ? "#eff6ff"
                    : "#ffffff",
                color: "#111827",
                fontWeight:
                  selectedAnswer === option
                    ? "700"
                    : "500",
                cursor: "pointer",
              }}
            >
              {option}
            </button>
          ))}
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
              display: "block",
              margin: "20px auto 0",
              border: "none",
              background: "transparent",
              color: "#2563eb",
              fontWeight: "700",
              cursor: "pointer",
            }}
          >
            ← Back
          </button>
        )}
      </div>
    </div>
  );
}

export default SkillTest;