import React, { useState } from "react";

/*
  Question bank
  Each skill can have its own questions.
  If a skill does not exist here, Python questions
  will be used as a fallback.
*/

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
      options: ["JSON.parse()", "JSON.convert()", "JSON.object()", "JSON.read()"],
      answer: "JSON.parse()",
    },
    {
      question: "Which symbol is used for strict equality?",
      options: ["=", "==", "===", "!="],
      answer: "===",
    },
    {
      question: "Which function prints output to the browser console?",
      options: ["print()", "console.log()", "display()", "output()"],
      answer: "console.log()",
    },
    {
      question: "Which keyword is used to define an asynchronous function?",
      options: ["async", "await", "promise", "defer"],
      answer: "async",
    },
    {
      question: "Which method adds an item to the end of an array?",
      options: ["push()", "add()", "append()", "insert()"],
      answer: "push()",
    },
    {
      question: "Which language is JavaScript primarily used for?",
      options: ["Web development", "Database only", "Operating systems only", "Networking only"],
      answer: "Web development",
    },
    {
      question: "Which file extension is commonly used for JavaScript?",
      options: [".java", ".js", ".jsxonly", ".script"],
      answer: ".js",
    },
    {
      question: "What does DOM stand for?",
      options: [
        "Document Object Model",
        "Data Object Method",
        "Document Order Model",
        "Digital Object Management",
      ],
      answer: "Document Object Model",
    },
    {
      question: "Which keyword creates a promise-like asynchronous wait?",
      options: ["await", "wait", "pause", "delay"],
      answer: "await",
    },
  ],

  React: [
    {
      question: "React is primarily used to build what?",
      options: ["User interfaces", "Databases", "Operating systems", "Servers only"],
      answer: "User interfaces",
    },
    {
      question: "Which hook is used to manage state in a React component?",
      options: ["useState", "useData", "useValue", "useComponent"],
      answer: "useState",
    },
    {
      question: "Which hook is commonly used for side effects?",
      options: ["useEffect", "useSide", "useAction", "useEvent"],
      answer: "useEffect",
    },
    {
      question: "What is JSX?",
      options: [
        "JavaScript XML syntax",
        "Java syntax",
        "JSON extension",
        "CSS framework",
      ],
      answer: "JavaScript XML syntax",
    },
    {
      question: "How are React components commonly created?",
      options: [
        "Functions",
        "SQL queries",
        "CSS selectors",
        "Database tables",
      ],
      answer: "Functions",
    },
    {
      question: "Which prop is used to uniquely identify items in a list?",
      options: ["key", "idOnly", "unique", "indexOnly"],
      answer: "key",
    },
    {
      question: "What does a React component return?",
      options: ["UI", "Database", "Server", "SQL"],
      answer: "UI",
    },
    {
      question: "Which command commonly starts a Vite React app?",
      options: ["npm run dev", "npm start-only", "react run", "vite start-only"],
      answer: "npm run dev",
    },
    {
      question: "Which library is used for rendering React DOM?",
      options: ["react-dom", "react-render", "dom-react", "render-react"],
      answer: "react-dom",
    },
    {
      question: "Can React state change trigger a re-render?",
      options: ["Yes", "No", "Only in production", "Only with CSS"],
      answer: "Yes",
    },
  ],

  Java: [
    {
      question: "Which keyword is used to define a class in Java?",
      options: ["class", "define", "struct", "object"],
      answer: "class",
    },
    {
      question: "Which method is the entry point of a Java application?",
      options: ["main()", "start()", "run()", "execute()"],
      answer: "main()",
    },
    {
      question: "Which keyword creates an object?",
      options: ["new", "create", "object", "make"],
      answer: "new",
    },
    {
      question: "Which data type stores whole numbers?",
      options: ["int", "float", "char", "boolean"],
      answer: "int",
    },
    {
      question: "Which keyword is used for inheritance?",
      options: ["extends", "inherits", "parent", "superclass"],
      answer: "extends",
    },
    {
      question: "Which keyword prevents inheritance?",
      options: ["final", "stop", "private", "static"],
      answer: "final",
    },
    {
      question: "Which keyword refers to the current object?",
      options: ["this", "self", "current", "object"],
      answer: "this",
    },
    {
      question: "Which keyword handles exceptions?",
      options: ["try", "check", "handle", "exception"],
      answer: "try",
    },
    {
      question: "Which concept allows multiple forms?",
      options: ["Polymorphism", "Inheritance", "Compilation", "Packaging"],
      answer: "Polymorphism",
    },
    {
      question: "Java source files commonly use which extension?",
      options: [".java", ".js", ".classonly", ".jav"],
      answer: ".java",
    },
  ],
};

/*
  Generic fallback questions.
  If resume contains a skill for which we have
  not created a question set yet, these questions
  are shown.
*/

const fallbackQuestions = [
  {
    question: "What is the main purpose of this technology?",
    options: [
      "Software development",
      "Cooking",
      "Video editing only",
      "Hardware repair only",
    ],
    answer: "Software development",
  },
  {
    question: "Which is important when learning a technical skill?",
    options: [
      "Practice",
      "Avoiding practice",
      "Only memorization",
      "Ignoring projects",
    ],
    answer: "Practice",
  },
  {
    question: "Which activity best demonstrates technical knowledge?",
    options: [
      "Building projects",
      "Only reading",
      "Avoiding exercises",
      "Never testing code",
    ],
    answer: "Building projects",
  },
  {
    question: "What helps improve programming skills?",
    options: [
      "Regular coding practice",
      "Never writing code",
      "Only watching videos",
      "Avoiding debugging",
    ],
    answer: "Regular coding practice",
  },
  {
    question: "Which is important in software development?",
    options: [
      "Problem solving",
      "Ignoring errors",
      "Avoiding testing",
      "Never learning",
    ],
    answer: "Problem solving",
  },
  {
    question: "What is a good way to verify a technical skill?",
    options: [
      "Assessment and practical work",
      "Guessing",
      "Ignoring results",
      "Avoiding projects",
    ],
    answer: "Assessment and practical work",
  },
  {
    question: "Which habit helps developers improve?",
    options: [
      "Continuous learning",
      "Stopping learning",
      "Avoiding new concepts",
      "Ignoring feedback",
    ],
    answer: "Continuous learning",
  },
  {
    question: "Which activity is useful for finding coding errors?",
    options: [
      "Debugging",
      "Deleting the project",
      "Ignoring the error",
      "Restarting only",
    ],
    answer: "Debugging",
  },
  {
    question: "Which is useful for building a strong portfolio?",
    options: [
      "Practical projects",
      "No projects",
      "Only certificates",
      "Only theory",
    ],
    answer: "Practical projects",
  },
  {
    question: "What does a skill assessment measure?",
    options: [
      "Knowledge and understanding",
      "Computer speed only",
      "Internet speed",
      "Screen size",
    ],
    answer: "Knowledge and understanding",
  },
];

function SkillTest({ skill, onBack }) {
  /*
    App.jsx sends the selected skill here.
    Example:
    Python
    JavaScript
    React
    Java
  */

  const selectedSkillName = skill || "Python";

  const questions =
    questionBank[selectedSkillName] || fallbackQuestions;

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

      return;
    }

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

    const result = {
      skill: selectedSkillName,
      score: finalScore,
      level: getLevel(finalScore),
      verified: true,
      completedAt: new Date().toISOString(),
    };

    /*
      Save current skill separately.
      This allows different skill tests to have
      different results.
    */

    localStorage.setItem(
      `skillTestResult_${selectedSkillName}`,
      JSON.stringify(result)
    );

    localStorage.setItem(
      "latestSkillTestResult",
      JSON.stringify(result)
    );
  };

  const handleRetake = () => {
    setCurrentQuestion(0);
    setSelectedAnswer("");
    setAnswers({});
    setCompleted(false);
    setScore(0);
  };

  /*
    Download Certificate
    --------------------
    Creates a real downloadable HTML certificate.
    The downloaded file can be opened in Chrome.
  */

  const downloadCertificate = () => {
    const level = getLevel(score);

    const certificateHTML = `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">

<meta name="viewport"
content="width=device-width, initial-scale=1.0">

<title>${selectedSkillName} Skill Certificate</title>

<style>

* {
  box-sizing: border-box;
}

body {
  margin: 0;
  padding: 40px;
  background: #f1f5f9;
  font-family: Arial, Helvetica, sans-serif;
}

.certificate {
  max-width: 950px;
  min-height: 650px;
  margin: 0 auto;
  background: #ffffff;
  border: 12px solid #2563eb;
  padding: 25px;
}

.inner {
  min-height: 570px;
  border: 2px solid #dbeafe;
  padding: 50px;
  text-align: center;
  position: relative;
}

.brand {
  color: #2563eb;
  font-size: 20px;
  font-weight: 900;
  letter-spacing: 3px;
}

.title {
  margin-top: 45px;
  font-size: 44px;
  font-weight: 900;
  color: #111827;
}

.subtitle {
  margin-top: 15px;
  color: #64748b;
  font-size: 18px;
}

.skill {
  margin: 30px 0;
  font-size: 38px;
  font-weight: 900;
  color: #2563eb;
}

.score {
  font-size: 24px;
  font-weight: 800;
  color: #111827;
}

.level {
  display: inline-block;
  margin-top: 18px;
  padding: 12px 28px;
  border-radius: 30px;
  background: #dbeafe;
  color: #1d4ed8;
  font-weight: 900;
  font-size: 18px;
}

.verified {
  margin-top: 28px;
  color: #15803d;
  font-size: 19px;
  font-weight: 900;
}

.date {
  margin-top: 35px;
  color: #64748b;
  font-size: 14px;
}

.footer {
  margin-top: 15px;
  color: #94a3b8;
  font-size: 13px;
}

@media print {

  body {
    background: white;
    padding: 0;
  }

  .certificate {
    margin: 0;
    max-width: none;
  }

}

</style>

</head>

<body>

<div class="certificate">

  <div class="inner">

    <div class="brand">
      AI RESUME ANALYZER
    </div>

    <div class="title">
      CERTIFICATE OF SKILL
    </div>

    <div class="subtitle">
      This certificate verifies successful completion of the
    </div>

    <div class="skill">
      ${selectedSkillName} Skill Assessment
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

    <div class="date">
      Assessment completed on
      ${new Date().toLocaleDateString()}
    </div>

    <div class="footer">
      AI Resume Analyzer • Skill Proof Certificate
    </div>

  </div>

</div>

</body>
</html>
`;

    try {
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
        `${selectedSkillName}-Skill-Certificate-${score}.html`;

      document.body.appendChild(link);

      link.click();

      document.body.removeChild(link);

      setTimeout(() => {
        URL.revokeObjectURL(url);
      }, 1000);

    } catch (error) {
      console.error(
        "Certificate download error:",
        error
      );

      alert(
        "Certificate download failed. Please try again."
      );
    }
  };

  /*
    Completed screen
  */

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
            Your {selectedSkillName} assessment result
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
              border: "1px solid #bbf7d0",
              color: "#15803d",
              padding: "15px",
              borderRadius: "12px",
              fontWeight: "700",
              marginBottom: "25px",
            }}
          >
            ✓ {selectedSkillName} Skill Assessment Verified
          </div>

          <p
            style={{
              color: "#64748b",
              fontSize: "14px",
              lineHeight: "1.6",
            }}
          >
            Your verified {selectedSkillName} skill result
            can be used as skill proof in your career profile.
          </p>

          {/* BUTTONS */}

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
              type="button"
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
              type="button"
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
              type="button"
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
              ← Back to Resume
            </button>
          )}

        </div>

      </div>
    );
  }

  /*
    Test screen
  */

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

        {/* HEADER */}

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
              {selectedSkillName} Skill Test
            </h1>

            <p
              style={{
                margin: 0,
                color: "#64748b",
              }}
            >
              Prove your {selectedSkillName} knowledge
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

        {/* PROGRESS */}

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
              width:
                `${
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

        {/* QUESTION */}

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
            (option) => (
              <button
                type="button"
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
            )
          )}

        </div>

        {/* NEXT */}

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
            ? "Finish Test"
            : "Next Question →"}
        </button>

        {/* BACK */}

        {onBack && (
          <button
            type="button"
            onClick={onBack}
            style={{
              display: "block",
              margin: "20px auto 0",
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