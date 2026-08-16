import React, { useState } from "react";

const questions = [
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
];

function SkillTest({ skill = "Python", onBack }) {
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

    localStorage.setItem(
      "skillTestResult",
      JSON.stringify({
        skill,
        score: finalScore,
        level: getLevel(finalScore),
        verified: true,
        completedAt: new Date().toISOString(),
      })
    );
  };

  const handleRetake = () => {
    setCurrentQuestion(0);
    setSelectedAnswer("");
    setAnswers({});
    setCompleted(false);
    setScore(0);
  };

  // =========================================================
  // DOWNLOAD CERTIFICATE
  // =========================================================

  const downloadCertificate = () => {
    const level = getLevel(score);

    const completedDate =
      new Date().toLocaleDateString();

    const certificateHTML = `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">

<title>${skill} Skill Certificate</title>

<style>

* {
  box-sizing: border-box;
}

body {
  margin: 0;
  padding: 30px;
  background: #f1f5f9;
  font-family: Arial, Helvetica, sans-serif;
}

.certificate {
  width: 900px;
  min-height: 650px;
  margin: 0 auto;
  background: #ffffff;
  border: 12px solid #2563eb;
  padding: 35px;
}

.inner {
  min-height: 560px;
  border: 2px solid #dbeafe;
  padding: 50px;
  text-align: center;
  position: relative;
}

.logo {
  color: #2563eb;
  font-size: 20px;
  font-weight: 800;
  letter-spacing: 3px;
}

.title {
  margin-top: 45px;
  font-size: 42px;
  font-weight: 900;
  color: #111827;
}

.subtitle {
  margin-top: 18px;
  font-size: 17px;
  color: #64748b;
}

.skill {
  margin: 30px 0;
  font-size: 34px;
  font-weight: 900;
  color: #2563eb;
}

.assessment {
  font-size: 18px;
  color: #475569;
}

.score {
  margin-top: 25px;
  font-size: 27px;
  font-weight: 900;
  color: #111827;
}

.level {
  display: inline-block;
  margin-top: 18px;
  padding: 11px 30px;
  border-radius: 30px;
  background: #dbeafe;
  color: #1d4ed8;
  font-size: 18px;
  font-weight: 800;
}

.verified {
  margin-top: 28px;
  padding: 13px;
  border-radius: 10px;
  background: #dcfce7;
  color: #15803d;
  font-size: 18px;
  font-weight: 800;
}

.date {
  margin-top: 35px;
  color: #64748b;
  font-size: 14px;
}

.footer {
  margin-top: 18px;
  color: #94a3b8;
  font-size: 12px;
}

@media print {

  body {
    background: white;
    padding: 0;
  }

  .certificate {
    margin: 0;
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
      This certificate verifies successful completion of the
    </div>

    <div class="skill">
      ${skill} Skill Assessment
    </div>

    <div class="assessment">
      The candidate has successfully completed the skill assessment.
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
      Assessment completed on ${completedDate}
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

      const url =
        window.URL.createObjectURL(blob);

      const link =
        document.createElement("a");

      link.href = url;

      link.download =
        `${skill}-Skill-Certificate-${score}.html`;

      document.body.appendChild(link);

      link.click();

      document.body.removeChild(link);

      setTimeout(() => {
        window.URL.revokeObjectURL(url);
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

  // =========================================================
  // COMPLETED SCREEN
  // =========================================================

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

          {/* SUCCESS ICON */}

          <div
            style={{
              width: "80px",
              height: "80px",
              margin: "0 auto 20px",
              borderRadius: "50%",
              background: "#dcfce7",
              color: "#16a34a",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "38px",
              fontWeight: "900",
            }}
          >
            ✓
          </div>

          {/* TITLE */}

          <h1
            style={{
              color: "#111827",
              margin: "0 0 10px",
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
            Your {skill} assessment result
          </p>

          {/* SCORE */}

          <div
            style={{
              background: "#eff6ff",
              padding: "30px",
              borderRadius: "18px",
              marginBottom: "22px",
            }}
          >

            <div
              style={{
                fontSize: "58px",
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
              padding: "10px 24px",
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

          {/* VERIFIED */}

          <div
            style={{
              background: "#f0fdf4",
              border: "1px solid #bbf7d0",
              color: "#15803d",
              padding: "16px",
              borderRadius: "12px",
              fontWeight: "800",
              marginBottom: "22px",
            }}
          >
            ✓ Skill Assessment Verified
          </div>

          <p
            style={{
              color: "#64748b",
              fontSize: "14px",
              lineHeight: "1.6",
              marginBottom: "25px",
            }}
          >
            Your verified {skill} skill result can be
            used as skill proof in your career profile.
          </p>

          {/* =================================================
              BUTTONS
          ================================================= */}

          <div
            style={{
              display: "flex",
              gap: "12px",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >

            {/* DOWNLOAD BUTTON */}

            <button
              type="button"
              onClick={downloadCertificate}
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                padding: "15px 24px",
                border: "none",
                borderRadius: "12px",
                background:
                  "linear-gradient(135deg, #2563eb, #4f46e5)",
                color: "#ffffff",
                fontWeight: "800",
                cursor: "pointer",
                fontSize: "15px",
                boxShadow:
                  "0 8px 20px rgba(37,99,235,0.25)",
              }}
            >
              📜 Download Certificate
            </button>

            {/* RETAKE */}

            <button
              type="button"
              onClick={handleRetake}
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "15px 24px",
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

          {/* BACK */}

          {onBack && (
            <button
              type="button"
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

  // =========================================================
  // TEST SCREEN
  // =========================================================

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
            gap: "20px",
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
              {skill} Skill Test
            </h1>

            <p
              style={{
                margin: 0,
                color: "#64748b",
              }}
            >
              Prove your {skill} knowledge
            </p>

          </div>

          <div
            style={{
              padding: "10px 14px",
              background: "#eff6ff",
              color: "#2563eb",
              borderRadius: "10px",
              fontWeight: "800",
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

          {question.options.map((option) => (

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

          ))}

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
              width: "100%",
              marginTop: "15px",
              padding: "12px",
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