import React, { useEffect, useState } from "react";
import ResumeUpload from "./ResumeUpload";
import Signup from "./Signup";
import Signin from "./Signin";
import SkillTest from "./SkillTest";
import "./App.css";

const UPLOAD_URL =
  "https://ai-resume-analyzer-u2b6.onrender.com/api/upload";

const ANALYZE_URL =
  "https://ai-resume-analyzer-u2b6.onrender.com/api/analyze";

const HISTORY_URL =
  "https://ai-resume-analyzer-u2b6.onrender.com/api/resumes";

/* =========================================================
   SKILL PERFORMANCE GRAPH
========================================================= */

function SkillPerformanceChart({
  skills = [],
  getSkillResultKey,
}) {
  const [hoveredSkill, setHoveredSkill] = useState(null);

  const skillData = skills.map((skill) => {
    let result = null;

    try {
      const key = getSkillResultKey(skill);
      const saved = localStorage.getItem(key);
      result = saved ? JSON.parse(saved) : null;
    } catch {
      result = null;
    }

    const score =
      result &&
      result.verified === true &&
      typeof result.score === "number"
        ? Math.max(0, Math.min(100, Number(result.score)))
        : 0;

    return {
      skill,
      score,
      verified: result?.verified === true,
      level: result?.level || "Not Tested",
    };
  });

  if (!skills.length) {
    return (
      <div
        style={{
          marginTop: "22px",
          padding: "28px",
          borderRadius: "16px",
          background: "#ffffff",
          border: "1px solid #e5e7eb",
          textAlign: "center",
          color: "#64748b",
        }}
      >
        No skills available for the graph.
      </div>
    );
  }

  return (
    <div
      className="analysis-card"
      style={{
        marginTop: "22px",
        background:
          "linear-gradient(135deg, #ffffff, #f8fbff)",
        border: "1px solid #dbeafe",
        overflow: "visible",
      }}
    >
      {/* HEADER */}

      <span className="card-label">
        SKILL PERFORMANCE
      </span>

      <h3
        style={{
          marginBottom: "8px",
        }}
      >
        📊 Skill Performance Graph
      </h3>

      <p
        style={{
          color: "#64748b",
          lineHeight: "1.6",
          marginBottom: "24px",
        }}
      >
        Compare your verified skill performance based on
        the assessments you completed.
      </p>

      {/* LEGEND */}

      <div
        style={{
          display: "flex",
          gap: "18px",
          flexWrap: "wrap",
          marginBottom: "22px",
          fontSize: "12px",
          fontWeight: "700",
          color: "#64748b",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "7px",
          }}
        >
          <span
            style={{
              width: "10px",
              height: "10px",
              borderRadius: "50%",
              background: "#2563eb",
              display: "inline-block",
            }}
          />
          Skill Score
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "7px",
          }}
        >
          <span
            style={{
              width: "10px",
              height: "10px",
              borderRadius: "50%",
              background: "#22c55e",
              display: "inline-block",
            }}
          />
          Verified
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "7px",
          }}
        >
          <span
            style={{
              width: "10px",
              height: "10px",
              borderRadius: "50%",
              background: "#cbd5e1",
              display: "inline-block",
            }}
          />
          Not Tested
        </div>
      </div>

      {/* GRAPH */}

      <div
        style={{
          width: "100%",
          overflowX: "auto",
          overflowY: "visible",
          paddingBottom: "8px",
        }}
      >
        <div
          style={{
            minWidth: "650px",
            width: "100%",
          }}
        >
          {/* SCALE */}

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "180px 1fr 55px",
              gap: "14px",
              alignItems: "end",
              marginBottom: "10px",
            }}
          >
            <div />

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                color: "#94a3b8",
                fontSize: "10px",
                fontWeight: "700",
              }}
            >
              <span>0</span>
              <span>20</span>
              <span>40</span>
              <span>60</span>
              <span>80</span>
              <span>100</span>
            </div>

            <div
              style={{
                textAlign: "right",
                color: "#94a3b8",
                fontSize: "10px",
                fontWeight: "700",
              }}
            >
              SCORE
            </div>
          </div>

          {/* SKILL ROWS */}

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "13px",
            }}
          >
            {skillData.map((item, index) => {
              const isHovered =
                hoveredSkill === index;

              const barBackground =
                item.verified
                  ? "linear-gradient(90deg, #16a34a, #22c55e)"
                  : item.score > 0
                  ? "linear-gradient(90deg, #2563eb, #4f46e5)"
                  : "#cbd5e1";

              return (
                <div
                  key={`${item.skill}-${index}`}
                  style={{
                    display: "grid",
                    gridTemplateColumns:
                      "180px 1fr 55px",
                    gap: "14px",
                    alignItems: "center",
                    position: "relative",
                  }}
                >
                  {/* SKILL NAME */}

                  <div
                    style={{
                      minWidth: 0,
                      paddingRight: "5px",
                    }}
                  >
                    <div
                      style={{
                        fontSize: "13px",
                        fontWeight: "800",
                        color: "#111827",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                      title={item.skill}
                    >
                      {item.skill}
                    </div>

                    <div
                      style={{
                        fontSize: "10px",
                        color: item.verified
                          ? "#15803d"
                          : "#94a3b8",
                        fontWeight: "700",
                        marginTop: "3px",
                      }}
                    >
                      {item.verified
                        ? `✓ ${item.level}`
                        : "Not Tested"}
                    </div>
                  </div>

                  {/* BAR AREA */}

                  <div
                    style={{
                      position: "relative",
                      height: "30px",
                      borderRadius: "8px",
                      background:
                        "repeating-linear-gradient(to right, #f1f5f9 0px, #f1f5f9 1px, transparent 1px, transparent 20%)",
                      border:
                        "1px solid #e2e8f0",
                      cursor: "pointer",
                    }}
                    onMouseEnter={() =>
                      setHoveredSkill(index)
                    }
                    onMouseLeave={() =>
                      setHoveredSkill(null)
                    }
                  >
                    {/* TRACK */}

                    <div
                      style={{
                        position: "absolute",
                        inset: 0,
                        borderRadius: "8px",
                        background:
                          "repeating-linear-gradient(to right, transparent 0%, transparent calc(20% - 1px), rgba(148,163,184,0.18) calc(20% - 1px), rgba(148,163,184,0.18) 20%)",
                        pointerEvents: "none",
                      }}
                    />

                    {/* VALUE BAR */}

                    <div
                      style={{
                        position: "absolute",
                        left: 0,
                        top: 0,
                        bottom: 0,
                        width: `${item.score}%`,
                        minWidth:
                          item.score > 0
                            ? "8px"
                            : "0px",
                        borderRadius: "8px",
                        background:
                          barBackground,
                        transition:
                          "width 0.6s ease",
                        boxShadow:
                          isHovered
                            ? "0 4px 12px rgba(37,99,235,0.25)"
                            : "none",
                      }}
                    />

                    {/* HOVER TOOLTIP */}

                    {isHovered && (
                      <div
                        style={{
                          position: "absolute",
                          left:
                            item.score === 0
                              ? "10px"
                              : `${Math.min(
                                  Math.max(
                                    item.score,
                                    8
                                  ),
                                  88
                                )}%`,
                          top: "-48px",
                          transform:
                            "translateX(-50%)",
                          zIndex: 100,
                          pointerEvents: "none",
                          whiteSpace: "nowrap",
                        }}
                      >
                        <div
                          style={{
                            background: "#111827",
                            color: "#ffffff",
                            padding:
                              "8px 11px",
                            borderRadius: "8px",
                            fontSize: "11px",
                            fontWeight: "700",
                            boxShadow:
                              "0 8px 20px rgba(15,23,42,0.2)",
                          }}
                        >
                          {item.skill}:{" "}
                          {item.score}/100
                          <div
                            style={{
                              fontSize: "10px",
                              color: "#cbd5e1",
                              marginTop: "2px",
                            }}
                          >
                            {item.verified
                              ? `Verified • ${item.level}`
                              : "Complete test to verify"}
                          </div>
                        </div>

                        <div
                          style={{
                            width: 0,
                            height: 0,
                            borderLeft:
                              "5px solid transparent",
                            borderRight:
                              "5px solid transparent",
                            borderTop:
                              "5px solid #111827",
                            margin:
                              "0 auto",
                          }}
                        />
                      </div>
                    )}
                  </div>

                  {/* SCORE */}

                  <div
                    style={{
                      textAlign: "right",
                      fontSize: "13px",
                      fontWeight: "900",
                      color: item.verified
                        ? "#15803d"
                        : item.score > 0
                        ? "#2563eb"
                        : "#94a3b8",
                    }}
                  >
                    {item.score > 0
                      ? `${item.score}%`
                      : "—"}
                  </div>
                </div>
              );
            })}
          </div>

          {/* X AXIS */}

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "180px 1fr 55px",
              gap: "14px",
              marginTop: "12px",
            }}
          >
            <div />

            <div
              style={{
                height: "1px",
                background: "#cbd5e1",
              }}
            />

            <div />
          </div>
        </div>
      </div>

      {/* FOOTER INFO */}

      <div
        style={{
          marginTop: "20px",
          padding: "13px 15px",
          borderRadius: "10px",
          background: "#f8fafc",
          border: "1px solid #e2e8f0",
          fontSize: "12px",
          color: "#64748b",
          lineHeight: "1.5",
        }}
      >
        💡 <strong>Tip:</strong> Complete more skill
        assessments to populate the graph with verified
        scores.
      </div>
    </div>
  );
}

/* =========================================================
   MAIN APP
========================================================= */

function App() {
  // =====================================================
  // USER
  // =====================================================

  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");

    try {
      return savedUser ? JSON.parse(savedUser) : null;
    } catch {
      return null;
    }
  });

  // =====================================================
  // PAGE
  // =====================================================

  const [page, setPage] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? "analyzer" : "login";
  });

  // =====================================================
  // SKILL TEST
  // =====================================================

  const [selectedSkill, setSelectedSkill] =
    useState("");

  const [skillTestResult, setSkillTestResult] =
    useState(null);

  const [skillRefresh, setSkillRefresh] =
    useState(0);

  // =====================================================
  // RESUME
  // =====================================================

  const [uploadedFileName, setUploadedFileName] =
    useState(
      () =>
        localStorage.getItem(
          "uploadedFileName"
        ) || ""
    );

  const [resumeText, setResumeText] =
    useState(
      () =>
        localStorage.getItem("resumeText") || ""
    );

  const [analysis, setAnalysis] = useState(() => {
    const saved =
      localStorage.getItem("analysis");

    try {
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  // =====================================================
  // STATES
  // =====================================================

  const [isUploading, setIsUploading] =
    useState(false);

  const [isAnalyzing, setIsAnalyzing] =
    useState(false);

  const [isDeleting, setIsDeleting] =
    useState(false);

  const [isLoadingHistory, setIsLoadingHistory] =
    useState(false);

  const [error, setError] = useState("");

  const [history, setHistory] = useState([]);

  // =====================================================
  // USER ID
  // =====================================================

  const getUserId = () => {
    if (!user) return "guest";

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

  // =====================================================
  // SKILL RESULT KEY
  // =====================================================

  const getSkillResultKey = (skill) => {
    return `skillTestResult_${getUserId()}_${skill}`;
  };

  // =====================================================
  // GET SKILL RESULTS
  // =====================================================

  const getSkillResults = () => {
    const skills = analysis?.skills || [];

    return skills.map((skill) => {
      try {
        const key =
          getSkillResultKey(skill);

        const saved =
          localStorage.getItem(key);

        return saved
          ? JSON.parse(saved)
          : null;
      } catch {
        return null;
      }
    });
  };

  // =====================================================
  // OVERALL SKILL PROOF
  // =====================================================


// =====================================================
// OVERALL SKILL PROOF
// =====================================================

const getOverallSkillProof = () => {
  const skills = analysis?.skills || [];

  // No skills detected
  if (!skills.length) {
    return {
      percentage: 0,
      verifiedCount: 0,
      totalSkills: 0,
    };
  }

  const results = getSkillResults();

  // Calculate total score of ALL verified skills
  const totalScore = results.reduce(
    (total, result) => {
      if (
        result &&
        result.verified === true &&
        typeof result.score === "number"
      ) {
        return total + Number(result.score);
      }

      // Untested skills = 0
      return total;
    },
    0
  );

  // Count verified skills
  const verifiedCount = results.filter(
    (result) =>
      result &&
      result.verified === true &&
      typeof result.score === "number"
  ).length;

  // Total skills detected from resume
  const totalSkills = skills.length;

  /*
    IMPORTANT:

    Overall Skill Proof is calculated using
    TOTAL DETECTED SKILLS.

    Example:

    Total skills = 10
    Tested skill 1 = 20
    Tested skill 2 = 70

    Calculation:

    (20 + 70) / 10
    = 9%

    NOT:

    (20 + 70) / 2
    = 45%
  */

  const overallPercentage =
    totalScore / totalSkills;

  return {
    percentage: Math.round(overallPercentage),
    verifiedCount,
    totalSkills,
  };
};

  // =====================================================
  // REFRESH SKILL TEST RESULT
  // =====================================================

  const refreshSkillTestResult = () => {
    if (!selectedSkill) {
      setSkillTestResult(null);
      return;
    }

    try {
      const key =
        getSkillResultKey(
          selectedSkill
        );

      const saved =
        localStorage.getItem(key);

      setSkillTestResult(
        saved
          ? JSON.parse(saved)
          : null
      );

      setSkillRefresh(
        (previous) =>
          previous + 1
      );
    } catch {
      setSkillTestResult(null);
    }
  };

  // =====================================================
  // LOAD HISTORY
  // =====================================================

  useEffect(() => {
    if (user?.id || user?._id) {
      loadHistory();
    }
  }, [user]);

  const loadHistory = async () => {
    const currentUserId =
      user?.id || user?._id;

    if (!currentUserId) return;

    setIsLoadingHistory(true);

    try {
      const response = await fetch(
        `${HISTORY_URL}/${currentUserId}`
      );

      const data =
        await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Could not load history"
        );
      }

      setHistory(
        data.resumes || []
      );
    } catch (err) {
      console.error(
        "History error:",
        err
      );
    } finally {
      setIsLoadingHistory(false);
    }
  };

  // =====================================================
  // SIGNUP
  // =====================================================

  const handleSignupSuccess = () => {
    setPage("login");
  };

  // =====================================================
  // LOGIN
  // =====================================================

  const handleLoginSuccess = (
    loggedInUser
  ) => {
    localStorage.setItem(
      "user",
      JSON.stringify(loggedInUser)
    );

    setUser(loggedInUser);
    setPage("analyzer");
  };

  // =====================================================
  // LOGOUT
  // =====================================================

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem(
      "uploadedFileName"
    );
    localStorage.removeItem("resumeText");
    localStorage.removeItem("analysis");

    setUser(null);
    setPage("login");

    setUploadedFileName("");
    setResumeText("");
    setAnalysis(null);
    setHistory([]);
    setSelectedSkill("");
    setSkillTestResult(null);
    setError("");
  };

  // =====================================================
  // NEW ANALYSIS
  // =====================================================

  const handleNewAnalysis = () => {
    setUploadedFileName("");
    setResumeText("");
    setAnalysis(null);
    setSelectedSkill("");
    setSkillTestResult(null);
    setError("");

    localStorage.removeItem(
      "uploadedFileName"
    );

    localStorage.removeItem(
      "resumeText"
    );

    localStorage.removeItem(
      "analysis"
    );

    setPage("analyzer");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // =====================================================
  // UPLOAD
  // =====================================================

  const handleFileSelect = async (
    file
  ) => {
    setError("");
    setUploadedFileName("");
    setResumeText("");
    setAnalysis(null);

    localStorage.removeItem(
      "uploadedFileName"
    );

    localStorage.removeItem(
      "resumeText"
    );

    localStorage.removeItem(
      "analysis"
    );

    setIsUploading(true);

    const formData =
      new FormData();

    formData.append(
      "resume",
      file
    );

    try {
      const response =
        await fetch(
          UPLOAD_URL,
          {
            method: "POST",
            body: formData,
          }
        );

      const data =
        await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Upload failed"
        );
      }

      const fileName =
        data.filename ||
        file.name;

      const text =
        data.text || "";

      setUploadedFileName(
        fileName
      );

      setResumeText(text);

      localStorage.setItem(
        "uploadedFileName",
        fileName
      );

      localStorage.setItem(
        "resumeText",
        text
      );
    } catch (err) {
      console.error(
        "Upload error:",
        err
      );

      setError(
        err.message ||
          "Upload failed"
      );
    } finally {
      setIsUploading(false);
    }
  };

  // =====================================================
  // AI ANALYSIS
  // =====================================================

  const analyzeResume = async () => {
    if (!resumeText) {
      setError(
        "Please upload a resume first."
      );
      return;
    }

    setError("");
    setIsAnalyzing(true);

    try {
      const response =
        await fetch(
          ANALYZE_URL,
          {
            method: "POST",
            headers: {
              "Content-Type":
                "application/json",
            },
            body: JSON.stringify({
              resumeText,
              userId:
                user?.id ||
                user?._id,
              fileName:
                uploadedFileName,
            }),
          }
        );

      const data =
        await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "AI analysis failed"
        );
      }

      let result =
        data.analysis;

      if (
        typeof result ===
        "string"
      ) {
        result = result
          .replace(
            /```json/g,
            ""
          )
          .replace(
            /```/g,
            ""
          )
          .trim();

        result =
          JSON.parse(result);
      }

      setAnalysis(result);

      localStorage.setItem(
        "analysis",
        JSON.stringify(result)
      );

      await loadHistory();
    } catch (err) {
      console.error(
        "Analysis error:",
        err
      );

      setError(
        err.message ||
          "AI analysis failed. Please try again."
      );
    } finally {
      setIsAnalyzing(false);
    }
  };

  // =====================================================
  // VIEW HISTORY
  // =====================================================

  const viewHistory = (item) => {
    if (!item) return;

    setUploadedFileName(
      item.fileName ||
        "Resume.pdf"
    );

    setResumeText(
      item.resumeText || ""
    );

    setAnalysis(
      item.analysis || null
    );

    if (item.fileName) {
      localStorage.setItem(
        "uploadedFileName",
        item.fileName
      );
    }

    if (item.resumeText) {
      localStorage.setItem(
        "resumeText",
        item.resumeText
      );
    }

    if (item.analysis) {
      localStorage.setItem(
        "analysis",
        JSON.stringify(
          item.analysis
        )
      );
    }

    setPage("analyzer");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // =====================================================
  // DELETE HISTORY
  // =====================================================

  const deleteHistory = async (
    id
  ) => {
    if (!id) {
      setError(
        "Resume ID is missing."
      );
      return;
    }

    const confirmed =
      window.confirm(
        "Are you sure you want to delete this resume analysis?"
      );

    if (!confirmed) return;

    setError("");
    setIsDeleting(true);

    try {
      const response =
        await fetch(
          `${HISTORY_URL}/${id}`,
          {
            method: "DELETE",
          }
        );

      const data =
        await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Could not delete resume"
        );
      }

      setHistory(
        (previous) =>
          previous.filter(
            (item) =>
              item._id !== id
          )
      );

      alert(
        "Resume deleted successfully."
      );
    } catch (err) {
      console.error(
        "Delete error:",
        err
      );

      setError(
        err.message ||
          "Could not delete resume"
      );
    } finally {
      setIsDeleting(false);
    }
  };

  // =====================================================
  // SKILL TEST
  // =====================================================

  const openSkillTest = (
    skill
  ) => {
    setSelectedSkill(skill);

    try {
      const key =
        getSkillResultKey(skill);

      const saved =
        localStorage.getItem(key);

      setSkillTestResult(
        saved
          ? JSON.parse(saved)
          : null
      );
    } catch {
      setSkillTestResult(null);
    }

    setPage("skill-test");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const backFromSkillTest =
    () => {
      refreshSkillTestResult();

      setPage("analyzer");

      setTimeout(() => {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      }, 50);
    };

  // =====================================================
  // SCORES
  // =====================================================

  const score =
    analysis?.overallScore || 0;

  const atsScore =
    analysis?.atsScore || 0;

  // =====================================================
  // OVERALL SKILL PROOF
  // =====================================================

  const skillProof =
    getOverallSkillProof();

  const overallSkillProof =
    skillProof.percentage;

  const verifiedSkillCount =
    skillProof.verifiedCount;

  const totalSkillCount =
    skillProof.totalSkills;

  void skillRefresh;
  void skillTestResult;

  // =====================================================
  // SIGNUP
  // =====================================================

  if (page === "signup") {
    return (
      <Signup
        onSignupSuccess={
          handleSignupSuccess
        }
      />
    );
  }

  // =====================================================
  // LOGIN
  // =====================================================

  if (page === "login") {
    return (
      <Signin
        onLoginSuccess={
          handleLoginSuccess
        }
        onGoToSignup={() =>
          setPage("signup")
        }
      />
    );
  }

  // =====================================================
  // SKILL TEST
  // =====================================================

  if (page === "skill-test") {
    return (
      <SkillTest
        skill={selectedSkill}
        user={user}
        onBack={
          backFromSkillTest
        }
      />
    );
  }

  // =====================================================
  // MAIN
  // =====================================================

  return (
    <div className="app-container">

     

      {/* =================================================
          HEADER
      ================================================= */}

   <header className="hero">

  {/* SHASTIX TECH BRAND */}
  <div className="site-brand">
    <img
      src="/shastix-logo.png"
      alt="Shastix Tech"
    />
  </div>

  {/* HERO CONTENT */}
  <div className="hero-content">

    <div className="hero-badge">
      ✦ AI POWERED
    </div>

    <h1>
      AI Resume Analyzer
    </h1>

    <p>
      Get intelligent insights, skill analysis and career
      recommendations from your resume.
    </p>

  </div>

  {/* USER ACTIONS */}
  <div className="user-actions">

    {user && (
      <span className="welcome-user">
        Welcome,{" "}
        <strong>
          {user.name || user.email}
        </strong>
      </span>
    )}

    <button
      className="header-button history-button"
      onClick={() => setPage("history")}
    >
      📋 History
    </button>

    <button
      className="header-button new-resume-button"
      onClick={handleNewAnalysis}
    >
      + New Resume
    </button>

    <button
      type="button"
      className="header-button logout-button"
      onClick={handleLogout}
    >
      Logout
    </button>

  </div>

</header>

      {/* =================================================
          HISTORY
      ================================================= */}

      {page === "history" ? (

        <main className="dashboard">

          <section className="analysis-card">

            <div
              style={{
                display: "flex",
                justifyContent:
                  "space-between",
                alignItems: "center",
                gap: "20px",
                flexWrap: "wrap",
              }}
            >

              <div>

                <span className="eyebrow">
                  RESUME HISTORY
                </span>

                <h2>
                  Previous Analyses
                </h2>

                <p>
                  View or delete your
                  previously analyzed
                  resumes.
                </p>

              </div>

              <button
                onClick={() =>
                  setPage("analyzer")
                }
                style={{
                  padding:
                    "10px 16px",
                  border: "none",
                  borderRadius:
                    "10px",
                  background:
                    "#2563eb",
                  color:
                    "#ffffff",
                  fontWeight:
                    "700",
                  cursor:
                    "pointer",
                }}
              >
                ← Back to Analyzer
              </button>

            </div>

            {error && (
              <div
                className="status error"
                style={{
                  marginTop:
                    "20px",
                }}
              >
                ⚠ {error}
              </div>
            )}

            {isLoadingHistory && (
              <div
                style={{
                  marginTop:
                    "30px",
                  textAlign:
                    "center",
                  color:
                    "#64748b",
                }}
              >
                Loading history...
              </div>
            )}

            {!isLoadingHistory &&
              history.length === 0 && (
                <div
                  style={{
                    marginTop:
                      "30px",
                    padding:
                      "40px",
                    textAlign:
                      "center",
                    background:
                      "#f8fafc",
                    borderRadius:
                      "14px",
                    color:
                      "#64748b",
                  }}
                >

                  <div
                    style={{
                      fontSize:
                        "40px",
                    }}
                  >
                    📄
                  </div>

                  <h3>
                    No resume history
                  </h3>

                  <p>
                    Analyze your first
                    resume to see it
                    here.
                  </p>

                  <button
                    onClick={
                      handleNewAnalysis
                    }
                    style={{
                      marginTop:
                        "10px",
                      padding:
                        "10px 16px",
                      border:
                        "none",
                      borderRadius:
                        "10px",
                      background:
                        "#2563eb",
                      color:
                        "#ffffff",
                      fontWeight:
                        "700",
                      cursor:
                        "pointer",
                    }}
                  >
                    + Analyze Resume
                  </button>

                </div>
              )}

            {!isLoadingHistory &&
              history.length > 0 && (
                <div
                  style={{
                    display:
                      "grid",
                    gap:
                      "15px",
                    marginTop:
                      "30px",
                  }}
                >

                  {history.map(
                    (
                      item,
                      index
                    ) => {

                      const itemScore =
                        item.overallScore ||
                        item.analysis
                          ?.overallScore ||
                        0;

                      const itemATS =
                        item.atsScore ||
                        item.analysis
                          ?.atsScore ||
                        0;

                      const date =
                        item.createdAt
                          ? new Date(
                              item.createdAt
                            ).toLocaleString()
                          : "Date unavailable";

                      return (
                        <div
                          key={
                            item._id ||
                            index
                          }
                          style={{
                            padding:
                              "20px",
                            border:
                              "1px solid #e5eaf2",
                            borderRadius:
                              "14px",
                            background:
                              "#ffffff",
                            display:
                              "flex",
                            justifyContent:
                              "space-between",
                            alignItems:
                              "center",
                            gap:
                              "20px",
                            flexWrap:
                              "wrap",
                          }}
                        >

                          <div
                            style={{
                              flex: "1",
                            }}
                          >

                            <h3
                              style={{
                                margin:
                                  "0 0 7px",
                                color:
                                  "#111827",
                              }}
                            >
                              📄{" "}
                              {
                                item.fileName
                              }
                            </h3>

                            <p
                              style={{
                                margin: 0,
                                color:
                                  "#64748b",
                                fontSize:
                                  "13px",
                              }}
                            >
                              Analyzed on{" "}
                              {date}
                            </p>

                          </div>

                          <div
                            style={{
                              display:
                                "flex",
                              gap:
                                "10px",
                              alignItems:
                                "center",
                              flexWrap:
                                "wrap",
                            }}
                          >

                            <div
                              style={{
                                padding:
                                  "9px 12px",
                                borderRadius:
                                  "10px",
                                background:
                                  "#eff6ff",
                                color:
                                  "#2563eb",
                                fontWeight:
                                  "800",
                              }}
                            >
                              Score{" "}
                              {
                                itemScore
                              }
                            </div>

                            <div
                              style={{
                                padding:
                                  "9px 12px",
                                borderRadius:
                                  "10px",
                                background:
                                  "#f0fdf4",
                                color:
                                  "#16a34a",
                                fontWeight:
                                  "800",
                              }}
                            >
                              ATS{" "}
                              {
                                itemATS
                              }
                            </div>

                            <button
                              onClick={() =>
                                viewHistory(
                                  item
                                )
                              }
                              disabled={
                                isDeleting
                              }
                              style={{
                                padding:
                                  "10px 15px",
                                border:
                                  "none",
                                borderRadius:
                                  "10px",
                                background:
                                  "#111827",
                                color:
                                  "#ffffff",
                                fontWeight:
                                  "700",
                                cursor:
                                  "pointer",
                              }}
                            >
                              👁️ View
                            </button>

                            <button
                              onClick={() =>
                                deleteHistory(
                                  item._id
                                )
                              }
                              disabled={
                                isDeleting
                              }
                              style={{
                                padding:
                                  "10px 15px",
                                border:
                                  "none",
                                borderRadius:
                                  "10px",
                                background:
                                  "#fee2e2",
                                color:
                                  "#dc2626",
                                fontWeight:
                                  "700",
                                cursor:
                                  "pointer",
                              }}
                            >
                              {isDeleting
                                ? "Deleting..."
                                : "🗑️ Delete"}
                            </button>

                          </div>

                        </div>
                      );
                    }
                  )}

                </div>
              )}

          </section>

        </main>

      ) : (

        /* =================================================
           ANALYZER
        ================================================= */

        <main className="dashboard">

          {/* =================================================
              UPLOAD
          ================================================= */}

          <section className="upload-card">

            <div className="section-heading">

              <div>

                <span className="eyebrow">
                  STEP 01
                </span>

                <h2>
                  Upload Your Resume
                </h2>

                <p>
                  Upload your PDF resume
                  to begin the analysis.
                </p>

              </div>

            </div>

            <ResumeUpload
              onFileSelect={
                handleFileSelect
              }
            />

            {isUploading && (
              <div className="status loading">
                <span className="spinner"></span>
                Uploading your resume...
              </div>
            )}

            {uploadedFileName &&
              !isUploading && (
                <div className="status success">
                  ✓ Resume uploaded
                  successfully{" "}
                  <strong>
                    {
                      uploadedFileName
                    }
                  </strong>
                </div>
              )}

            {error && (
              <div className="status error">
                ⚠ {error}
              </div>
            )}

          </section>

          {/* =================================================
              RESUME PREVIEW
          ================================================= */}

          {resumeText && (
            <section className="resume-card">

              <div className="section-heading">

                <div>

                  <span className="eyebrow">
                    STEP 02
                  </span>

                  <h2>
                    Resume Preview
                  </h2>

                  <p>
                    Extracted text from
                    your uploaded resume.
                  </p>

                </div>

                <div className="file-badge">
                  PDF
                </div>

              </div>

              <div className="resume-preview">
                {resumeText}
              </div>

              <button
                className="analyze-button"
                onClick={
                  analyzeResume
                }
                disabled={
                  isAnalyzing
                }
              >

                {isAnalyzing ? (
                  <>
                    <span className="spinner white"></span>
                    Analyzing Resume...
                  </>
                ) : (
                  <>
                    Analyze Resume
                    <span>→</span>
                  </>
                )}

              </button>

            </section>
          )}

          {/* =================================================
              ANALYSIS
          ================================================= */}

          {analysis && (
            <section className="analysis-section">

              <div className="analysis-header">

                <div>

                  <span className="eyebrow">
                    STEP 03
                  </span>

                  <h2>
                    AI Resume Analysis
                  </h2>

                  <p>
                    Professional insights
                    generated from your
                    resume.
                  </p>

                </div>

                <div className="analysis-status">
                  ✓ AI ANALYZED
                </div>

              </div>

              {/* =================================================
                  SCORES
              ================================================= */}

              <div className="top-grid">

                {/* RESUME SCORE */}

                <div className="score-card">

                  <div className="score-circle">
                    <div>
                      <strong>
                        {score}
                      </strong>
                      <span>/100</span>
                    </div>
                  </div>

                  <h3>
                    Resume Score
                  </h3>

                  <p>
                    {score >= 80
                      ? "Excellent resume"
                      : score >= 60
                      ? "Good foundation"
                      : "Needs improvement"}
                  </p>

                </div>

                {/* ATS SCORE */}

                <div className="score-card">

                  <div className="score-circle">
                    <div>
                      <strong>
                        {atsScore}
                      </strong>
                      <span>/100</span>
                    </div>
                  </div>

                  <h3>
                    ATS Score
                  </h3>

                  <p>
                    {atsScore >= 80
                      ? "Excellent ATS compatibility"
                      : atsScore >= 60
                      ? "Good ATS compatibility"
                      : "Needs ATS optimization"}
                  </p>

                </div>

                {/* SKILL PROOF */}

                <div
                  className="score-card"
                  style={{
                    background:
                      "linear-gradient(135deg, #f0fdf4, #ffffff)",
                    border:
                      "1px solid #bbf7d0",
                  }}
                >

                  <div
                    className="score-circle"
                    style={{
                      border:
                        "7px solid #22c55e",
                    }}
                  >

                    <div>

                      <strong
                        style={{
                          color:
                            "#15803d",
                        }}
                      >
                        {
                          overallSkillProof
                        }
                      </strong>

                      <span>
                        %
                      </span>

                    </div>

                  </div>

                  <h3>
                    🏆 Skill Proof
                  </h3>

                  <p>
                    {verifiedSkillCount >
                    0
                      ? `${verifiedSkillCount} of ${totalSkillCount} skills verified`
                      : "No skills verified yet"}
                  </p>

                  <div
                    style={{
                      width:
                        "100%",
                      marginTop:
                        "10px",
                    }}
                  >

                    <div
                      style={{
                        height:
                          "8px",
                        width:
                          "100%",
                        background:
                          "#dcfce7",
                        borderRadius:
                          "20px",
                        overflow:
                          "hidden",
                      }}
                    >

                      <div
                        style={{
                          height:
                            "100%",
                          width: `${overallSkillProof}%`,
                          background:
                            "#22c55e",
                          borderRadius:
                            "20px",
                          transition:
                            "width 0.5s ease",
                        }}
                      />

                    </div>

                  </div>

                </div>

              </div>

              {/* =================================================
                  NEW SKILL GRAPH
              ================================================= */}

              <SkillPerformanceChart
                skills={
                  analysis.skills || []
                }
                getSkillResultKey={
                  getSkillResultKey
                }
              />

              {/* =================================================
                  SKILL PROOF DETAILS
              ================================================= */}

              <div
                className="analysis-card"
                style={{
                  marginTop:
                    "22px",
                  background:
                    "linear-gradient(135deg, #f8fbff, #ffffff)",
                  border:
                    "1px solid #dbeafe",
                }}
              >

                <span className="card-label">
                  SKILL VERIFICATION
                </span>

                <h3>
                  🏆 Skill Proof
                </h3>

                <p
                  style={{
                    color:
                      "#64748b",
                    lineHeight:
                      "1.6",
                    marginBottom:
                      "20px",
                  }}
                >
                  Verify the skills identified from your resume
                  by completing a skill assessment.
                </p>

                {/* OVERALL SUMMARY */}

                <div
                  style={{
                    padding:
                      "20px",
                    marginBottom:
                      "20px",
                    borderRadius:
                      "14px",
                    background:
                      "linear-gradient(135deg, #eff6ff, #f0fdf4)",
                    border:
                      "1px solid #dbeafe",
                  }}
                >

                  <div
                    style={{
                      display:
                        "flex",
                      justifyContent:
                        "space-between",
                      alignItems:
                        "center",
                      gap:
                        "20px",
                      flexWrap:
                        "wrap",
                    }}
                  >

                    <div>

                      <div
                        style={{
                          fontSize:
                            "12px",
                          fontWeight:
                            "800",
                          color:
                            "#64748b",
                          letterSpacing:
                            "0.08em",
                          marginBottom:
                            "6px",
                        }}
                      >
                        OVERALL SKILL PROOF
                      </div>

                      <div
                        style={{
                          fontSize:
                            "42px",
                          fontWeight:
                            "900",
                          color:
                            "#15803d",
                          lineHeight:
                            "1",
                        }}
                      >
                        {
                          overallSkillProof
                        }%
                      </div>

                    </div>

                    <div
                      style={{
                        textAlign:
                          "right",
                      }}
                    >

                      <div
                        style={{
                          fontSize:
                            "15px",
                          fontWeight:
                            "800",
                          color:
                            "#111827",
                        }}
                      >
                        {
                          verifiedSkillCount
                        } /{" "}
                        {
                          totalSkillCount
                        }
                      </div>

                      <div
                        style={{
                          fontSize:
                            "12px",
                          color:
                            "#64748b",
                          marginTop:
                            "4px",
                        }}
                      >
                        Skills Verified
                      </div>

                    </div>

                  </div>

                  <div
                    style={{
                      marginTop:
                        "16px",
                      height:
                        "10px",
                      background:
                        "#dcfce7",
                      borderRadius:
                        "20px",
                      overflow:
                        "hidden",
                    }}
                  >

                    <div
                      style={{
                        height:
                          "100%",
                        width: `${overallSkillProof}%`,
                        background:
                          "linear-gradient(90deg, #16a34a, #22c55e)",
                        borderRadius:
                          "20px",
                        transition:
                          "width 0.5s ease",
                      }}
                    />

                  </div>

                </div>

                {analysis.skills &&
                analysis.skills.length >
                  0 ? (

                  <div
                    style={{
                      display:
                        "grid",
                      gridTemplateColumns:
                        "repeat(auto-fit, minmax(260px, 1fr))",
                      gap:
                        "14px",
                    }}
                  >

                    {analysis.skills.map(
                      (
                        skill,
                        index
                      ) => {

                        let testResult =
                          null;

                        try {

                          const key =
                            getSkillResultKey(
                              skill
                            );

                          const savedResult =
                            localStorage.getItem(
                              key
                            );

                          testResult =
                            savedResult
                              ? JSON.parse(
                                  savedResult
                                )
                              : null;

                        } catch {

                          testResult =
                            null;

                        }

                        return (
                          <div
                            key={index}
                            style={{
                              padding:
                                "18px",
                              border:
                                testResult?.verified
                                  ? "1px solid #bbf7d0"
                                  : "1px solid #e5e7eb",
                              borderRadius:
                                "14px",
                              background:
                                testResult?.verified
                                  ? "#f0fdf4"
                                  : "#ffffff",
                            }}
                          >

                            <div
                              style={{
                                display:
                                  "flex",
                                justifyContent:
                                  "space-between",
                                alignItems:
                                  "center",
                                gap:
                                  "10px",
                                marginBottom:
                                  "12px",
                              }}
                            >

                              <strong
                                style={{
                                  color:
                                    "#111827",
                                  fontSize:
                                    "17px",
                                  minWidth:
                                    0,
                                  overflow:
                                    "hidden",
                                  textOverflow:
                                    "ellipsis",
                                  whiteSpace:
                                    "nowrap",
                                }}
                                title={
                                  skill
                                }
                              >
                                {skill}
                              </strong>

                              {testResult?.verified && (
                                <span
                                  style={{
                                    padding:
                                      "5px 9px",
                                    borderRadius:
                                      "20px",
                                    background:
                                      "#dcfce7",
                                    color:
                                      "#15803d",
                                    fontSize:
                                      "11px",
                                    fontWeight:
                                      "800",
                                    flexShrink:
                                      0,
                                  }}
                                >
                                  ✓ VERIFIED
                                </span>
                              )}

                            </div>

                            {testResult?.verified ? (

                              <>

                                <div
                                  style={{
                                    display:
                                      "flex",
                                    alignItems:
                                      "center",
                                    gap:
                                      "12px",
                                    marginBottom:
                                      "12px",
                                  }}
                                >

                                  <div
                                    style={{
                                      fontSize:
                                        "30px",
                                      fontWeight:
                                        "900",
                                      color:
                                        "#2563eb",
                                    }}
                                  >
                                    {
                                      testResult.score
                                    }%
                                  </div>

                                  <div>

                                    <div
                                      style={{
                                        fontSize:
                                          "12px",
                                        color:
                                          "#64748b",
                                      }}
                                    >
                                      Skill Score
                                    </div>

                                    <div
                                      style={{
                                        fontWeight:
                                          "800",
                                        color:
                                          testResult.level ===
                                          "Advanced"
                                            ? "#15803d"
                                            : testResult.level ===
                                              "Intermediate"
                                            ? "#b45309"
                                            : "#dc2626",
                                      }}
                                    >
                                      {
                                        testResult.level
                                      }
                                    </div>

                                  </div>

                                </div>

                                <div
                                  style={{
                                    background:
                                      "#ffffff",
                                    border:
                                      "1px solid #bbf7d0",
                                    borderRadius:
                                      "10px",
                                    padding:
                                      "10px",
                                    marginBottom:
                                      "12px",
                                    color:
                                      "#15803d",
                                    fontSize:
                                      "13px",
                                    fontWeight:
                                      "700",
                                  }}
                                >
                                  ✓ Skill assessment successfully
                                  completed
                                </div>

                                <button
                                  onClick={() =>
                                    openSkillTest(
                                      skill
                                    )
                                  }
                                  style={{
                                    width:
                                      "100%",
                                    padding:
                                      "10px",
                                    border:
                                      "1px solid #d1d5db",
                                    borderRadius:
                                      "9px",
                                    background:
                                      "#ffffff",
                                    color:
                                      "#374151",
                                    fontWeight:
                                      "700",
                                    cursor:
                                      "pointer",
                                  }}
                                >
                                  Retake Test →
                                </button>

                              </>

                            ) : (

                              <>

                                <div
                                  style={{
                                    marginBottom:
                                      "14px",
                                    fontSize:
                                      "12px",
                                    color:
                                      "#64748b",
                                  }}
                                >
                                  Detected in resume
                                </div>

                                <button
                                  onClick={() =>
                                    openSkillTest(
                                      skill
                                    )
                                  }
                                  style={{
                                    width:
                                      "100%",
                                    padding:
                                      "11px",
                                    border:
                                      "none",
                                    borderRadius:
                                      "9px",
                                    background:
                                      "linear-gradient(135deg, #2563eb, #4f46e5)",
                                    color:
                                      "#ffffff",
                                    fontWeight:
                                      "700",
                                    cursor:
                                      "pointer",
                                  }}
                                >
                                  Take Test →
                                </button>

                              </>

                            )}

                          </div>
                        );
                      }
                    )}

                  </div>

                ) : (

                  <div
                    style={{
                      padding:
                        "18px",
                      borderRadius:
                        "12px",
                      background:
                        "#f8fafc",
                      color:
                        "#64748b",
                    }}
                  >
                    No skills were detected from this resume.
                  </div>

                )}

              </div>

              {/* =================================================
                  SUMMARY
              ================================================= */}

              <div
                className="summary-card"
                style={{
                  marginBottom:
                    "22px",
                }}
              >

                <div className="card-icon">
                  ✦
                </div>

                <h3>
                  Executive Summary
                </h3>

                <p>
                  {analysis.summary ||
                    "No summary available."}
                </p>

              </div>

              {/* =================================================
                  JOBS
              ================================================= */}

              <div className="analysis-card">

                <span className="card-label">
                  CAREER MATCHING
                </span>

                <h3>
                  Recommended Jobs
                </h3>

                <p
                  style={{
                    color:
                      "#64748b",
                  }}
                >
                  Job roles that match
                  your current skills
                  and experience.
                </p>

                <div
                  style={{
                    display:
                      "grid",
                    gap:
                      "12px",
                    marginTop:
                      "20px",
                  }}
                >

                  {analysis.recommendedJobs?.map(
                    (
                      job,
                      index
                    ) => (
                      <div
                        key={index}
                        style={{
                          display:
                            "flex",
                          justifyContent:
                            "space-between",
                          alignItems:
                            "center",
                          gap:
                            "20px",
                          padding:
                            "18px",
                          border:
                            "1px solid #e5eaf2",
                          borderRadius:
                            "14px",
                          background:
                            "#f8fafc",
                        }}
                      >

                        <div>

                          <h4
                            style={{
                              margin:
                                "0 0 6px",
                              color:
                                "#111827",
                              fontSize:
                                "16px",
                            }}
                          >
                            {
                              job.title
                            }
                          </h4>

                          <p
                            style={{
                              margin: 0,
                              color:
                                "#64748b",
                              fontSize:
                                "14px",
                              lineHeight:
                                "1.5",
                            }}
                          >
                            {
                              job.reason
                            }
                          </p>

                        </div>

                        <div
                          style={{
                            minWidth:
                              "65px",
                            textAlign:
                              "center",
                            padding:
                              "8px 10px",
                            borderRadius:
                              "10px",
                            background:
                              "#e8f0ff",
                            color:
                              "#2563eb",
                            fontWeight:
                              "800",
                          }}
                        >
                          {
                            job.match
                          }%
                        </div>

                      </div>
                    )
                  )}

                </div>

              </div>

              {/* =================================================
                  TECHNICAL PROFILE
              ================================================= */}

              <div className="analysis-card">

                <span className="card-label">
                  TECHNICAL PROFILE
                </span>

                <h3>
                  Skills
                </h3>

                <div className="skills-container">

                  {analysis.skills?.map(
                    (
                      skill,
                      index
                    ) => (
                      <span
                        className="skill-tag"
                        key={index}
                      >
                        {skill}
                      </span>
                    )
                  )}

                </div>

              </div>

              {/* =================================================
                  EXPERIENCE
              ================================================= */}

              <div className="analysis-card">

                <span className="card-label">
                  CAREER
                </span>

                <h3>
                  Experience
                </h3>

                {analysis.experience
                  ?.length === 0 && (
                  <p
                    style={{
                      color:
                        "#64748b",
                    }}
                  >
                    No professional
                    experience found
                    in the resume.
                  </p>
                )}

                {analysis.experience?.map(
                  (
                    item,
                    index
                  ) => (

                    <div
                      className="timeline-item"
                      key={index}
                    >

                      <div className="timeline-dot"></div>

                      <div className="timeline-content">

                        <h4>
                          {
                            item.title
                          }
                        </h4>

                        <div className="company">
                          {
                            item.company
                          }
                        </div>

                        <div className="duration">
                          {
                            item.duration
                          }
                        </div>

                        <p>
                          {
                            item.description
                          }
                        </p>

                      </div>

                    </div>

                  )
                )}

              </div>

              {/* =================================================
                  EDUCATION
              ================================================= */}

              <div className="analysis-card">

                <span className="card-label">
                  ACADEMIC BACKGROUND
                </span>

                <h3>
                  Education
                </h3>

                <div className="education-grid">

                  {analysis.education?.map(
                    (
                      item,
                      index
                    ) => (

                      <div
                        className="education-item"
                        key={index}
                      >

                        <div className="education-icon">
                          🎓
                        </div>

                        <div>

                          <h4>
                            {
                              item.degree
                            }
                          </h4>

                          <p>
                            {
                              item.institution
                            }
                          </p>

                          <span>
                            {
                              item.duration
                            }{" "}
                            •{" "}
                            {
                              item.score
                            }
                          </span>

                        </div>

                      </div>

                    )
                  )}

                </div>

              </div>

              {/* =================================================
                  STRENGTHS / WEAKNESSES
              ================================================= */}

              <div className="two-column">

                <div className="analysis-card strength-card">

                  <span className="card-label">
                    POSITIVE SIGNALS
                  </span>

                  <h3>
                    Strengths
                  </h3>

                  <ul>

                    {analysis.strengths?.map(
                      (
                        item,
                        index
                      ) => (

                        <li key={index}>
                          <span>✓</span>
                          {item}
                        </li>

                      )
                    )}

                  </ul>

                </div>

                <div className="analysis-card weakness-card">

                  <span className="card-label">
                    AREAS TO IMPROVE
                  </span>

                  <h3>
                    Weaknesses
                  </h3>

                  <ul>

                    {analysis.weaknesses?.map(
                      (
                        item,
                        index
                      ) => (

                        <li key={index}>
                          <span>!</span>
                          {item}
                        </li>

                      )
                    )}

                  </ul>

                </div>

              </div>

              {/* =================================================
                  MISSING SKILLS
              ================================================= */}

              <div className="analysis-card missing-card">

                <div>

                  <span className="card-label">
                    CAREER GROWTH
                  </span>

                  <h3>
                    Recommended Skills
                  </h3>

                  <p>
                    Adding these skills
                    could improve your
                    career readiness and
                    resume strength.
                  </p>

                </div>

                <div className="recommended-skills">

                  {analysis.missingSkills?.map(
                    (
                      item,
                      index
                    ) => (

                      <div
                        className="recommended-item"
                        key={index}
                      >
                        <span>+</span>
                        {item}
                      </div>

                    )
                  )}

                </div>

              </div>

              {/* =================================================
                  FINAL
              ================================================= */}

              <div className="final-card">

                <div>

                  <span className="card-label">
                    NEXT STEP
                  </span>

                  <h3>
                    Turn your resume into
                    a stronger career
                    profile.
                  </h3>

                  <p>
                    Focus on the missing
                    skills and strengthen
                    your practical project
                    experience.
                  </p>

                </div>

                <div className="final-score">

                  {score}

                  <span>
                    /100
                  </span>

                </div>

              </div>

            </section>
          )}

        </main>
      )}

      {/* =====================================================
          FEATURES SECTION
      ===================================================== */}

      <section className="features-section">

        <div className="features-header">

          <span className="card-label">
            POWERFUL FEATURES
          </span>

          <h2>
            Everything You Need for a Better Resume
          </h2>

          <p>
            AI-powered tools to analyze, improve and optimize your resume
            for better career opportunities.
          </p>

        </div>

        <div className="features-grid">

          <div className="feature-card">

            <span className="feature-number">
              01
            </span>

            <div className="feature-icon">
              📄
            </div>

            <h3>
              Resume Analysis
            </h3>

            <p>
              Upload your resume and get an AI-powered analysis
              of your overall resume quality.
            </p>

            <span className="feature-badge">
              AI POWERED
            </span>

          </div>

          <div className="feature-card purple">

            <span className="feature-number">
              02
            </span>

            <div className="feature-icon">
              🎯
            </div>

            <h3>
              ATS Score
            </h3>

            <p>
              Check how well your resume performs against
              Applicant Tracking Systems.
            </p>

            <span className="feature-badge">
              SMART SCORING
            </span>

          </div>

          <div className="feature-card success">

            <span className="feature-number">
              03
            </span>

            <div className="feature-icon">
              💼
            </div>

            <h3>
              Job Recommendations
            </h3>

            <p>
              Discover suitable job roles based on your
              skills, experience and resume profile.
            </p>

            <span className="feature-badge">
              CAREER MATCH
            </span>

          </div>

          <div className="feature-card warning">

            <span className="feature-number">
              04
            </span>

            <div className="feature-icon">
              ⚡
            </div>

            <h3>
              Missing Skills
            </h3>

            <p>
              Identify important skills missing from your resume
              and get recommendations to improve it.
            </p>

            <span className="feature-badge">
              SKILL GAP
            </span>

          </div>

          <div className="feature-card purple">

            <span className="feature-number">
              05
            </span>

            <div className="feature-icon">
              📊
            </div>

            <h3>
              Resume Score
            </h3>

            <p>
              Get a clear score showing the strengths and
              improvement areas of your resume.
            </p>

            <span className="feature-badge">
              SMART INSIGHTS
            </span>

          </div>

          <div className="feature-card">

            <span className="feature-number">
              06
            </span>

            <div className="feature-icon">
              🕘
            </div>

            <h3>
              Resume History
            </h3>

            <p>
              Save and review your previous resume analyses
              whenever you need them.
            </p>

            <span className="feature-badge">
              SAVED RESULTS
            </span>

          </div>

        </div>

      </section>

      <footer>
        AI Resume Analyzer • Powered by SHASTIX Technologies Pvt. Ltd.
      </footer>

    </div>
  );
}

export default App;
