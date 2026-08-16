import React, { useState } from "react";

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

  JavaScript: [
    {
      question: "Which keyword declares a variable that cannot be reassigned?",
      options: ["var", "let", "const", "static"],
      answer: "const",
    },
    {
      question: "Which method converts JSON text into a JavaScript object?",
      options: [
        "JSON.parse()",
        "JSON.stringify()",
        "JSON.object()",
        "JSON.convert()",
      ],
      answer: "JSON.parse()",
    },
    {
      question: "Which symbol is used for strict equality?",
      options: ["=", "==", "===", "!="],
      answer: "===",
    },
    {
      question: "Which function prints output to the browser console?",
      options: ["print()", "console.log()", "echo()", "display()"],
      answer: "console.log()",
    },
    {
      question: "Which keyword is used to define a function?",
      options: ["func", "function", "define", "method"],
      answer: "function",
    },
  ],

  Java: [
    {
      question: "Which keyword is used to create a class in Java?",
      options: ["class", "struct", "object", "define"],
      answer: "class",
    },
    {
      question: "Which method is the entry point of a Java program?",
      options: ["start()", "run()", "main()", "init()"],
      answer: "main()",
    },
    {
      question: "Which keyword is used for inheritance?",
      options: ["inherits", "extends", "implements", "super"],
      answer: "extends",
    },
    {
      question: "Which data type stores whole numbers?",
      options: ["float", "boolean", "int", "char"],
      answer: "int",
    },
    {
      question: "Which keyword creates an object?",
      options: ["object", "create", "new", "instance"],
      answer: "new",
    },
  ],

  React: [
    {
      question: "Which library is React primarily used for?",
      options: [
        "Database management",
        "Building user interfaces",
        "Operating systems",
        "Networking",
      ],
      answer: "Building user interfaces",
    },
    {
      question: "Which hook is used to manage state in a functional component?",
      options: ["useEffect", "useState", "useMemo", "useRef"],
      answer: "useState",
    },
    {
      question: "Which syntax is commonly used to write React components?",
      options: ["JSX", "XML only", "SQL", "PHP"],
      answer: "JSX",
    },
    {
      question: "Which hook is commonly used for side effects?",
      options: ["useState", "useEffect", "useContext", "useReducer"],
      answer: "useEffect",
    },
    {
      question: "What does React use to efficiently update the UI?",
      options: [
        "Virtual DOM",
        "SQL",
        "File System",
        "Compiler only",
      ],
      answer: "Virtual DOM",
    },
  ],

  HTML: [
    {
      question: "What does HTML stand for?",
      options: [
        "Hyper Text Markup Language",
        "High Text Machine Language",
        "Hyper Transfer Markup Language",
        "Home Tool Markup Language",
      ],
      answer: "Hyper Text Markup Language",
    },
    {
      question: "Which tag creates a hyperlink?",
      options: ["<link>", "<a>", "<href>", "<url>"],
      answer: "<a>",
    },
    {
      question: "Which tag creates the largest heading?",
      options: ["<h6>", "<head>", "<h1>", "<heading>"],
      answer: "<h1>",
    },
    {
      question: "Which tag is used to display an image?",
      options: ["<image>", "<img>", "<pic>", "<src>"],
      answer: "<img>",
    },
    {
      question: "Which tag creates a paragraph?",
      options: ["<paragraph>", "<p>", "<para>", "<text>"],
      answer: "<p>",
    },
  ],

  CSS: [
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
      question: "Which property controls the background color?",
      options: ["background-color", "bg", "background-style", "color-bg"],
      answer: "background-color",
    },
    {
      question: "Which CSS property makes text bold?",
      options: ["font-weight", "text-bold", "font-style", "weight"],
      answer: "font-weight",
    },
    {
      question: "Which layout system is commonly used for one-dimensional layouts?",
      options: ["Flexbox", "SQL", "DOM", "AJAX"],
      answer: "Flexbox",
    },
  ],
};

const defaultQuestions = [
  {
    question: "What is the main purpose of a programming language?",
    options: [
      "To communicate instructions to a computer",
      "To design hardware",
      "To create electricity",
      "To browse websites",
    ],
    answer: "To communicate instructions to a computer",
  },
  {
    question: "What is a variable?",
    options: [
      "A storage location for data",
      "A computer screen",
      "A network cable",
      "An operating system",
    ],
    answer: "A storage location for data",
  },
  {
    question: "What is a function?",
    options: [
      "A reusable block of code",
      "A database",
      "A hardware device",
      "A browser",
    ],
    answer: "A reusable block of code",
  },
  {
    question: "What is debugging?",
    options: [
      "Finding and fixing errors",
      "Installing hardware",
      "Deleting an application",
      "Creating a password",
    ],
    answer: "Finding and fixing errors",
  },
  {
    question: "What is an algorithm?",
    options: [
      "A step-by-step procedure to solve a problem",
      "A programming language",
      "A database table",
      "A computer monitor",
    ],
    answer: "A step-by-step procedure to solve a problem",
  },
];

function SkillTest({ skill = "Python", user, onBack }) {
  const normalizedSkill =
    skill && typeof skill === "string" ? skill.trim() : "Python";

  const questions =
    questionBank[normalizedSkill] || defaultQuestions;

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [answers, setAnswers] = useState({});
  const [completed, setCompleted] = useState(false);
  const [score, setScore] = useState(0);

  const question = questions[currentQuestion];

  const getLevel = (value) => {
    if (value >= 80) return "Advanced";
    if (value >= 60) return "Intermediate";
    return "Beginner";
  };

  const getResult = (value) => {
    if (value >= 80) {
      return {
        title: "Excellent Performance",
        description:
          "You demonstrated strong knowledge of this skill.",
      };
    }

    if (value >= 60) {
      return {
        title: "Good Performance",
        description:
          "You have a good foundation, with some areas to improve.",
      };
    }

    return {
      title: "Keep Learning",
      description:
        "Continue practicing this skill and retake the assessment later.",
    };
  };

  const saveResult = (finalScore) => {
    const result = {
      skill: normalizedSkill,
      score: finalScore,
      level: getLevel(finalScore),
      verified: true,
      completedAt: new Date().toISOString(),
      userId: user?.id || null,
      userName: user?.name || "",
      userEmail: user?.email || "",
    };

    localStorage.setItem(
      `skillTestResult_${normalizedSkill}`,
      JSON.stringify(result)
    );

    localStorage.setItem(
      "skillTestResult",
      JSON.stringify(result)
    );
  };

  const handleNext = () => {
    if (!selectedAnswer) return;

    const updatedAnswers = {
      ...answers,
      [currentQuestion]: selectedAnswer,
    };

    setAnswers(updatedAnswers);

    if (currentQuestion < questions.length - 1) {
      const nextQuestion = currentQuestion + 1;

      setCurrentQuestion(nextQuestion);

      setSelectedAnswer(
        updatedAnswers[nextQuestion] || ""
      );
    } else {
      let correct = 0;

      questions.forEach((item, index) => {
        if (updatedAnswers[index] === item.answer) {
          correct++;
        }
      });

      const finalScore = Math.round(
        (correct / questions.length) * 100
      );

      setScore(finalScore);
      setCompleted(true);

      saveResult(finalScore);
    }
  };

  const handleRetake = () => {
    setCurrentQuestion(0);
    setSelectedAnswer("");
    setAnswers({});
    setCompleted(false);
    setScore(0);
  };

  const downloadCertificate = () => {
    const level = getLevel(score);
    const result = getResult(score);

    const studentName =
      user?.name ||
      user?.email ||
      "Candidate";

    const completedDate =
      new Date().toLocaleDateString();

    const certificateHTML = `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />

<meta
  name="viewport"
  content="width=device-width, initial-scale=1.0"
/>

<title>${normalizedSkill} Skill Certificate</title>

<style>

* {
  box-sizing: border-box;
}

body {
  margin: 0;
  padding: 30px;
  background: #eef2f7;
  font-family: Arial, Helvetica, sans-serif;
}

.certificate {
  width: 100%;
  max-width: 1000px;
  min-height: 700px;
  margin: 0 auto;
  background: #ffffff;
  border: 12px solid #2563eb;
  padding: 18px;
}

.inner {
  min-height: 620px;
  border: 2px solid #bfdbfe;
  padding: 55px;
  text-align: center;
  position: relative;
}

.logo {
  font-size: 20px;
  font-weight: 800;
  letter-spacing: 3px;
  color: #2563eb;
}

.title {
  margin-top: 35px;
  font-size: 46px;
  font-weight: 900;
  color: #111827;
  letter-spacing: 1px;
}

.subtitle {
  margin-top: 20px;
  font-size: 18px;
  color: #64748b;
}

.name {
  margin-top: 25px;
  font-size: 30px;
  font-weight: 800;
  color: #111827;
}

.skill {
  margin-top: 25px;
  font-size: 36px;
  font-weight: 900;
  color: #2563eb;
}

.score {
  margin-top: 25px;
  font-size: 24px;
  font-weight: 800;
  color: #111827;
}

.level {
  display: inline-block;
  margin-top: 18px;
  padding: 11px 28px;
  border-radius: 50px;
  background: #dbeafe;
  color: #1d4ed8;
  font-size: 18px;
  font-weight: 800;
}

.verified {
  margin-top: 25px;
  color: #15803d;
  font-size: 18px;
  font-weight: 800;
}

.description {
  max-width: 650px;
  margin: 20px auto 0;
  color: #64748b;
  line-height: 1.6;
}

.footer {
  margin-top: 45px;
  font-size: 13px;
  color: #64748b;
  line-height: 1.8;
}

.badge {
  position: absolute;
  top: 25px;
  right: 25px;
  padding: 8px 14px;
  border-radius: 20px;
  background: #f0fdf4;
  color: #15803d;
  font-size: 11px;
  font-weight: 800;
}

@media print {

  @page {
    size: A4 landscape;
    margin: 0;
  }

  body {
    padding: 0;
    background: white;
  }

  .certificate {
    width: 100%;
    max-width: none;
    min-height: 100vh;
    border-width: 10px;
  }

}

</style>
</head>

<body>

<div class="certificate">

  <div class="inner">

    <div class="badge">
      VERIFIED SKILL
    </div>

    <div class="logo">
      AI RESUME ANALYZER
    </div>

    <div class="title">
      CERTIFICATE OF SKILL
    </div>

    <div class="subtitle">
      This certificate verifies that
    </div>

    <div class="name">
      ${studentName}
    </div>

    <div class="subtitle">
      has successfully completed the
    </div>

    <div class="skill">
      ${normalizedSkill} Skill Assessment
    </div>

    <div class="score">
      Skill Score: ${score} / 100
    </div>

    <div class="level">
      ${level}
    </div>

    <div class="verified">
      ✓ SKILL ASSESSMENT VERIFIED
    </div>

    <div class="description">
      ${result.description}
      This verified assessment can be used as
      skill proof in a career profile.
    </div>

    <div class="footer">
      Assessment completed on ${completedDate}
      <br />
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
        type: "text/html;charset=utf-8",
      }
    );

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;

    link.download =
      `${normalizedSkill.replace(
        /[^a-zA-Z0-9]/g,
        "-"
      )}-Skill-Certificate-${score}.html`;

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

    setTimeout(() => {
      URL.revokeObjectURL(url);
    }, 1000);
  };

  const printCertificate = () => {
    const level = getLevel(score);

    const studentName =
      user?.name ||
      user?.email ||
      "Candidate";

    const completedDate =
      new Date().toLocaleDateString();

    const printWindow = window.open(
      "",
      "_blank",
      "width=1200,height=900"
    );

    if (!printWindow) {
      alert(
        "Popup blocked. Please allow popups for this website and try again."
      );

      return;
    }

    printWindow.document.write(`
<!DOCTYPE html>
<html>
<head>

<title>${normalizedSkill} Skill Certificate</title>

<style>

* {
  box-sizing: border-box;
}

body {
  margin: 0;
  padding: 30px;
  background: #eef2f7;
  font-family: Arial, Helvetica, sans-serif;
}

.certificate {
  width: 100%;
  max-width: 1000px;
  min-height: 700px;
  margin: 0 auto;
  background: white;
  border: 12px solid #2563eb;
  padding: 18px;
}

.inner {
  min-height: 620px;
  border: 2px solid #bfdbfe;
  padding: 55px;
  text-align: center;
}

.logo {
  font-size: 20px;
  font-weight: 800;
  letter-spacing: 3px;
  color: #2563eb;
}

.title {
  margin-top: 35px;
  font-size: 46px;
  font-weight: 900;
  color: #111827;
}

.subtitle {
  margin-top: 20px;
  font-size: 18px;
  color: #64748b;
}

.name {
  margin-top: 25px;
  font-size: 30px;
  font-weight: 800;
  color: #111827;
}

.skill {
  margin-top: 25px;
  font-size: 36px;
  font-weight: 900;
  color: #2563eb;
}

.score {
  margin-top: 25px;
  font-size: 24px;
  font-weight: 800;
  color: #111827;
}

.level {
  display: inline-block;
  margin-top: 18px;
  padding: 11px 28px;
  border-radius: 50px;
  background: #dbeafe;
  color: #1d4ed8;
  font-size: 18px;
  font-weight: 800;
}

.verified {
  margin-top: 25px;
  color: #15803d;
  font-size: 18px;
  font-weight: 800;
}

.footer {
  margin-top: 45px;
  font-size: 13px;
  color: #64748b;
  line-height: 1.8;
}

@page {
  size: A4 landscape;
  margin: 0;
}

@media print {

  body {
    padding: 0;
    background: white;
  }

  .certificate {
    max-width: none;
    width: 100%;
    min-height: 100vh;
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
This certificate verifies that
</div>

<div class="name">
${studentName}
</div>

<div class="subtitle">
has successfully completed the
</div>

<div class="skill">
${normalizedSkill} Skill Assessment
</div>

<div class="score">
Skill Score: ${score} / 100
</div>

<div class="level">
${level}
</div>

<div class="verified">
✓ SKILL ASSESSMENT VERIFIED
</div>

<div class="footer">
Assessment completed on ${completedDate}
<br />
AI Resume Analyzer • Skill Proof Certificate
</div>

</div>

</div>

<script>

window.onload = function() {
  setTimeout(function() {
    window.print();
  }, 500);
};

</script>

</body>
</html>
`);

    printWindow.document.close();
  };

  if (completed) {
    const level = getLevel(score);
    const result = getResult(score);

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
            Your {normalizedSkill} assessment result
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

          <h2
            style={{
              margin: "0 0 12px",
              color: "#111827",
            }}
          >
            {result.title}
          </h2>

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
            ✓ {normalizedSkill} Skill Assessment Verified
          </div>

          <p
            style={{
              color: "#64748b",
              fontSize: "14px",
              lineHeight: "1.6",
              marginBottom: "10px",
            }}
          >
            {result.description}
          </p>

          <p
            style={{
              color: "#64748b",
              fontSize: "14px",
              lineHeight: "1.6",
            }}
          >
            Your verified skill result can be used as
            skill proof in your career profile.
          </p>

          <div
            style={{
              display: "flex",
              gap: "12px",
              justifyContent: "center",
              flexWrap: "wrap",
              marginTop: "28px",
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
              📥 Download Certificate
            </button>

            <button
              onClick={printCertificate}
              style={{
                padding: "14px 22px",
                border: "none",
                borderRadius: "12px",
                background: "#111827",
                color: "#ffffff",
                fontWeight: "800",
                cursor: "pointer",
                fontSize: "15px",
              }}
            >
              🖨️ Save as PDF
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
                marginTop: "22px",
                border: "none",
                background: "transparent",
                color: "#2563eb",
                fontWeight: "700",
                cursor: "pointer",
              }}
            >
              ← Back to Resume Analysis
            </button>
          )}
        </div>
      </div>
    );
  }

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
            gap: "20px",
            marginBottom: "30px",
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
              {normalizedSkill} Skill Test
            </h1>

            <p
              style={{
                margin: 0,
                color: "#64748b",
              }}
            >
              Prove your {normalizedSkill} knowledge
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
              width: `${
                ((currentQuestion + 1) /
                  questions.length) *
                100
              }%`,
              height: "100%",
              background:
                "linear-gradient(90deg, #2563eb, #4f46e5)",
              transition: "width 0.3s ease",
            }}
          />
        </div>

        <div
          style={{
            padding: "12px 15px",
            borderRadius: "12px",
            background: "#f8fafc",
            color: "#64748b",
            fontSize: "13px",
            marginBottom: "22px",
          }}
        >
          Question {currentQuestion + 1} of{" "}
          {questions.length}
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
          {question.options.map((option) => (
            <button
              key={option}
              type="button"
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
                transition: "all 0.2s ease",
              }}
            >
              {option}
            </button>
          ))}
        </div>

        <button
          type="button"
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
          {currentQuestion === questions.length - 1
            ? "Finish Test ✓"
            : "Next Question →"}
        </button>

        {onBack && (
          <button
            type="button"
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
            ← Back to Resume Analysis
          </button>
        )}
      </div>
    </div>
  );
}

export default SkillTest;