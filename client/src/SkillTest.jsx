import React, { useState } from "react";

const questionBank = {
  Python: [
    {
      question: "Which keyword is used to define a function in Python?",
      options: ["function", "def", "fun", "define"],
      answer: "def",
    },
    {
      question: "Which data type is immutable in Python?",
      options: ["List", "Dictionary", "Set", "Tuple"],
      answer: "Tuple",
    },
    {
      question: "What is the output of len([10, 20, 30])?",
      options: ["2", "3", "4", "10"],
      answer: "3",
    },
    {
      question: "Which symbol is used for comments in Python?",
      options: ["//", "#", "/*", "--"],
      answer: "#",
    },
    {
      question: "Which function is used to get input from the user?",
      options: ["get()", "scan()", "input()", "read()"],
      answer: "input()",
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
      options: ["start()", "main()", "run()", "execute()"],
      answer: "main()",
    },
    {
      question: "Which type of language is Java?",
      options: [
        "Object-oriented",
        "Markup",
        "Query",
        "Assembly",
      ],
      answer: "Object-oriented",
    },
    {
      question: "Which keyword is used for inheritance in Java?",
      options: ["inherits", "extends", "implements", "super"],
      answer: "extends",
    },
    {
      question: "Which symbol ends a Java statement?",
      options: [".", ":", ";", ","],
      answer: ";",
    },
  ],

  React: [
    {
      question: "React is mainly used for building what?",
      options: [
        "Databases",
        "User interfaces",
        "Operating systems",
        "Networks",
      ],
      answer: "User interfaces",
    },
    {
      question: "Which hook is used to manage state in a functional component?",
      options: ["useEffect", "useState", "useRef", "useMemo"],
      answer: "useState",
    },
    {
      question: "Which syntax is commonly used to write HTML-like elements in React?",
      options: ["JDBC", "JSX", "XML", "SQL"],
      answer: "JSX",
    },
    {
      question: "What is used to pass data from parent to child?",
      options: ["Props", "State", "Hooks", "Events"],
      answer: "Props",
    },
    {
      question: "Which hook is commonly used for side effects?",
      options: ["useState", "useEffect", "useContext", "useId"],
      answer: "useEffect",
    },
  ],

  SQL: [
    {
      question: "Which command is used to retrieve data from a database?",
      options: ["GET", "SELECT", "FETCH", "READ"],
      answer: "SELECT",
    },
    {
      question: "Which command is used to add new records?",
      options: ["ADD", "INSERT", "CREATE", "PUSH"],
      answer: "INSERT",
    },
    {
      question: "Which clause is used to filter rows?",
      options: ["ORDER BY", "GROUP BY", "WHERE", "FILTER"],
      answer: "WHERE",
    },
    {
      question: "Which command is used to remove records?",
      options: ["REMOVE", "DELETE", "DROP", "CLEAR"],
      answer: "DELETE",
    },
    {
      question: "Which keyword is used to sort query results?",
      options: ["SORT", "ORDER BY", "ARRANGE", "GROUP"],
      answer: "ORDER BY",
    },
  ],
};

function SkillTest({ skill = "Python", onComplete }) {
  const availableQuestions =
    questionBank[skill] || questionBank.Python;

  const [currentQuestion, setCurrentQuestion] =
    useState(0);

  const [answers, setAnswers] = useState({});

  const [finished, setFinished] = useState(false);

  const [score, setScore] = useState(0);

  const [level, setLevel] = useState("");

  const handleAnswer = (answer) => {
    setAnswers((previous) => ({
      ...previous,
      [currentQuestion]: answer,
    }));
  };

  const calculateResult = () => {
    let correctAnswers = 0;

    availableQuestions.forEach(
      (question, index) => {
        if (
          answers[index] === question.answer
        ) {
          correctAnswers++;
        }
      }
    );

    const percentage = Math.round(
      (correctAnswers /
        availableQuestions.length) *
        100
    );

    let calculatedLevel = "Beginner";

    if (percentage >= 91) {
      calculatedLevel = "Expert";
    } else if (percentage >= 71) {
      calculatedLevel = "Advanced";
    } else if (percentage >= 41) {
      calculatedLevel = "Intermediate";
    }

    setScore(percentage);
    setLevel(calculatedLevel);
    setFinished(true);

    if (onComplete) {
      onComplete({
        skill,
        score: percentage,
        level: calculatedLevel,
      });
    }
  };

  const nextQuestion = () => {
    if (
      currentQuestion <
      availableQuestions.length - 1
    ) {
      setCurrentQuestion(
        currentQuestion + 1
      );
    }
  };

  const previousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(
        currentQuestion - 1
      );
    }
  };

  if (finished) {
    return (
      <div
        style={{
          minHeight: "100vh",
          background:
            "linear-gradient(135deg, #eef2ff, #f8fafc)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "25px",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: "550px",
            background: "#ffffff",
            borderRadius: "22px",
            padding: "40px",
            textAlign: "center",
            boxShadow:
              "0 20px 60px rgba(15,23,42,0.12)",
          }}
        >
          <div
            style={{
              fontSize: "55px",
              marginBottom: "10px",
            }}
          >
            🏆
          </div>

          <h1
            style={{
              marginBottom: "8px",
              color: "#111827",
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

          <div
            style={{
              fontSize: "58px",
              fontWeight: "900",
              color: "#2563eb",
              marginBottom: "5px",
            }}
          >
            {score}%
          </div>

          <p
            style={{
              color: "#64748b",
              marginBottom: "25px",
            }}
          >
            Skill Score
          </p>

          <div
            style={{
              display: "inline-block",
              padding: "10px 22px",
              borderRadius: "30px",
              background: "#eef2ff",
              color: "#4338ca",
              fontWeight: "800",
              fontSize: "18px",
              marginBottom: "25px",
            }}
          >
            {level}
          </div>

          <div
            style={{
              background: "#f8fafc",
              borderRadius: "14px",
              padding: "18px",
              marginBottom: "25px",
            }}
          >
            <div
              style={{
                fontWeight: "800",
                color: "#16a34a",
                fontSize: "18px",
                marginBottom: "6px",
              }}
            >
              ✓ Skill Assessment Completed
            </div>

            <div
              style={{
                color: "#64748b",
                fontSize: "14px",
              }}
            >
              Your verified assessment result
              can be used for your profile.
            </div>
          </div>

          <button
            onClick={() => {
              setCurrentQuestion(0);
              setAnswers({});
              setFinished(false);
              setScore(0);
              setLevel("");
            }}
            style={{
              width: "100%",
              padding: "14px",
              border: "none",
              borderRadius: "12px",
              background:
                "linear-gradient(135deg, #2563eb, #4f46e5)",
              color: "#ffffff",
              fontSize: "16px",
              fontWeight: "800",
              cursor: "pointer",
            }}
          >
            Retake Test
          </button>
        </div>
      </div>
    );
  }

  const question =
    availableQuestions[currentQuestion];

  const selectedAnswer =
    answers[currentQuestion];

  const isLastQuestion =
    currentQuestion ===
    availableQuestions.length - 1;

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
          maxWidth: "750px",
          margin: "0 auto",
        }}
      >
        <div
          style={{
            background: "#ffffff",
            borderRadius: "20px",
            padding: "30px",
            boxShadow:
              "0 20px 60px rgba(15,23,42,0.10)",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "25px",
            }}
          >
            <div>
              <h1
                style={{
                  margin: 0,
                  color: "#111827",
                }}
              >
                {skill} Skill Test
              </h1>

              <p
                style={{
                  color: "#64748b",
                  marginBottom: 0,
                }}
              >
                Test your {skill} knowledge
              </p>
            </div>

            <div
              style={{
                background: "#eef2ff",
                color: "#4338ca",
                padding: "9px 14px",
                borderRadius: "10px",
                fontWeight: "800",
              }}
            >
              {currentQuestion + 1} /{" "}
              {availableQuestions.length}
            </div>
          </div>

          <div
            style={{
              height: "8px",
              background: "#e5e7eb",
              borderRadius: "10px",
              overflow: "hidden",
              marginBottom: "30px",
            }}
          >
            <div
              style={{
                height: "100%",
                width: `${
                  ((currentQuestion + 1) /
                    availableQuestions.length) *
                  100
                }%`,
                background:
                  "linear-gradient(90deg, #2563eb, #4f46e5)",
                transition: "width 0.3s ease",
              }}
            />
          </div>

          <h2
            style={{
              color: "#111827",
              fontSize: "21px",
              lineHeight: "1.5",
              marginBottom: "22px",
            }}
          >
            {question.question}
          </h2>

          <div>
            {question.options.map(
              (option) => {
                const selected =
                  selectedAnswer === option;

                return (
                  <button
                    key={option}
                    onClick={() =>
                      handleAnswer(option)
                    }
                    style={{
                      width: "100%",
                      textAlign: "left",
                      padding: "16px",
                      marginBottom: "12px",
                      borderRadius: "12px",
                      border: selected
                        ? "2px solid #2563eb"
                        : "1px solid #d1d5db",
                      background: selected
                        ? "#eef2ff"
                        : "#ffffff",
                      color: "#111827",
                      cursor: "pointer",
                      fontSize: "15px",
                      fontWeight: selected
                        ? "700"
                        : "500",
                    }}
                  >
                    {selected ? "● " : "○ "}
                    {option}
                  </button>
                );
              }
            )}
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              gap: "12px",
              marginTop: "25px",
            }}
          >
            <button
              onClick={previousQuestion}
              disabled={currentQuestion === 0}
              style={{
                padding: "13px 22px",
                border: "1px solid #d1d5db",
                borderRadius: "11px",
                background: "#ffffff",
                color: "#374151",
                cursor:
                  currentQuestion === 0
                    ? "not-allowed"
                    : "pointer",
                opacity:
                  currentQuestion === 0
                    ? 0.5
                    : 1,
                fontWeight: "700",
              }}
            >
              ← Previous
            </button>

            {!isLastQuestion ? (
              <button
                onClick={nextQuestion}
                disabled={!selectedAnswer}
                style={{
                  padding: "13px 24px",
                  border: "none",
                  borderRadius: "11px",
                  background: !selectedAnswer
                    ? "#94a3b8"
                    : "linear-gradient(135deg, #2563eb, #4f46e5)",
                  color: "#ffffff",
                  cursor: !selectedAnswer
                    ? "not-allowed"
                    : "pointer",
                  fontWeight: "800",
                }}
              >
                Next →
              </button>
            ) : (
              <button
                onClick={calculateResult}
                disabled={!selectedAnswer}
                style={{
                  padding: "13px 24px",
                  border: "none",
                  borderRadius: "11px",
                  background: !selectedAnswer
                    ? "#94a3b8"
                    : "#16a34a",
                  color: "#ffffff",
                  cursor: !selectedAnswer
                    ? "not-allowed"
                    : "pointer",
                  fontWeight: "800",
                }}
              >
                Submit Test ✓
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SkillTest;
