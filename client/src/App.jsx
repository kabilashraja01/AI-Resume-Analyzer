import React, { useEffect, useState } from "react";
import ResumeUpload from "./ResumeUpload";
import Signup from "./Signup";
import Signin from "./Signin";
import "./App.css";

const UPLOAD_URL = "http://localhost:5000/api/upload";
const ANALYZE_URL = "http://localhost:5000/api/analyze";
const HISTORY_URL = "http://localhost:5000/api/resumes";

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
  // RESUME DATA
  // =====================================================

  const [uploadedFileName, setUploadedFileName] = useState(
    () => localStorage.getItem("uploadedFileName") || ""
  );

  const [resumeText, setResumeText] = useState(
    () => localStorage.getItem("resumeText") || ""
  );

  const [analysis, setAnalysis] = useState(() => {
    const savedAnalysis = localStorage.getItem("analysis");

    try {
      return savedAnalysis ? JSON.parse(savedAnalysis) : null;
    } catch {
      return null;
    }
  });

  // =====================================================
  // STATES
  // =====================================================

  const [isUploading, setIsUploading] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const [error, setError] = useState("");

  const [history, setHistory] = useState([]);
  const [isLoadingHistory, setIsLoadingHistory] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  // =====================================================
  // LOAD HISTORY
  // =====================================================

  useEffect(() => {
    if (user?.id) {
      loadHistory();
    }
  }, [user]);

  const loadHistory = async () => {
    if (!user?.id) return;

    setIsLoadingHistory(true);

    try {
      const response = await fetch(
        `${HISTORY_URL}/${user.id}`
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Could not load history"
        );
      }

      setHistory(data.resumes || []);
    } catch (err) {
      console.error("History error:", err);
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

  const handleLoginSuccess = (loggedInUser) => {
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
    // Clear user session
    localStorage.removeItem("user");

    // Clear resume data
    localStorage.removeItem("uploadedFileName");
    localStorage.removeItem("resumeText");
    localStorage.removeItem("analysis");

    // Clear React state
    setUser(null);
    setPage("login");

    setUploadedFileName("");
    setResumeText("");
    setAnalysis(null);
    setHistory([]);
    setError("");
  };

  // =====================================================
  // NEW ANALYSIS
  // =====================================================

  const handleNewAnalysis = () => {
    setUploadedFileName("");
    setResumeText("");
    setAnalysis(null);
    setError("");

    localStorage.removeItem("uploadedFileName");
    localStorage.removeItem("resumeText");
    localStorage.removeItem("analysis");

    setPage("analyzer");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // =====================================================
  // FILE UPLOAD
  // =====================================================

  const handleFileSelect = async (file) => {
    setError("");
    setUploadedFileName("");
    setResumeText("");
    setAnalysis(null);

    localStorage.removeItem("uploadedFileName");
    localStorage.removeItem("resumeText");
    localStorage.removeItem("analysis");

    setIsUploading(true);

    const formData = new FormData();

    formData.append("resume", file);

    try {
      const response = await fetch(
        UPLOAD_URL,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Upload failed"
        );
      }

      const fileName =
        data.filename || file.name;

      const text =
        data.text || "";

      setUploadedFileName(fileName);
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
        err.message || "Upload failed"
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
      const response = await fetch(
        ANALYZE_URL,
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            resumeText,
            userId: user?.id,
            fileName: uploadedFileName,
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

      if (typeof result === "string") {
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

        result = JSON.parse(result);
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
      item.fileName || "Resume.pdf"
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

  const deleteHistory = async (id) => {
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

    if (!confirmed) {
      return;
    }

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

      setHistory((previousHistory) =>
        previousHistory.filter(
          (item) =>
            item._id !== id
        )
      );

      const currentHistoryItem =
        history.find(
          (item) =>
            item._id === id
        );

      if (
        currentHistoryItem &&
        uploadedFileName ===
          currentHistoryItem.fileName
      ) {
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
      }

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
  // SCORES
  // =====================================================

  const score =
    analysis?.overallScore || 0;

  const atsScore =
    analysis?.atsScore || 0;

  // =====================================================
  // SIGNUP PAGE
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
  // LOGIN PAGE
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
  // MAIN APPLICATION
  // =====================================================

  return (
    <div className="app-container">

      {/* =====================================================
          HEADER
      ===================================================== */}

      <header className="hero">

        <div className="hero-badge">
          ✦ AI POWERED
        </div>

        <h1>
          AI Resume Analyzer
        </h1>

        <p>
          Get intelligent insights, skill
          analysis and career recommendations
          from your resume.
        </p>

        {/* USER AREA */}

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
            onClick={() =>
              setPage("history")
            }
          >
            📋 History
          </button>

          <button
            className="header-button new-resume-button"
            onClick={
              handleNewAnalysis
            }
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

      {/* =====================================================
          HISTORY PAGE
      ===================================================== */}

      {page === "history" ? (

        <main className="dashboard">

          <section className="analysis-card">

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
                  setPage(
                    "analyzer"
                  )
                }
                style={{
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
                      marginBottom:
                        "10px",
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
                              flex:
                                "1",
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
                                margin:
                                  "0",
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
                                  isDeleting
                                    ? "not-allowed"
                                    : "pointer",
                                opacity:
                                  isDeleting
                                    ? 0.6
                                    : 1,
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

        /* =====================================================
           ANALYZER PAGE
        ===================================================== */

        <main className="dashboard">

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

              <div className="top-grid">

                <div className="score-card">

                  <div className="score-circle">

                    <div>

                      <strong>
                        {score}
                      </strong>

                      <span>
                        /100
                      </span>

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

                <div className="score-card">

                  <div className="score-circle">

                    <div>

                      <strong>
                        {atsScore}
                      </strong>

                      <span>
                        /100
                      </span>

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

              </div>

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

                  {analysis
                    .recommendedJobs
                    ?.map(
                      (
                        job,
                        index
                      ) => (

                        <div
                          key={
                            index
                          }
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
                                margin:
                                  0,
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
                        key={
                          index
                        }
                      >
                        {skill}
                      </span>

                    )
                  )}

                </div>

              </div>

              <div className="analysis-card">

                <span className="card-label">
                  CAREER
                </span>

                <h3>
                  Experience
                </h3>

                {analysis
                  .experience
                  ?.length ===
                  0 && (
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

                {analysis
                  .experience
                  ?.map(
                    (
                      item,
                      index
                    ) => (

                      <div
                        className="timeline-item"
                        key={
                          index
                        }
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

              <div className="analysis-card">

                <span className="card-label">
                  ACADEMIC BACKGROUND
                </span>

                <h3>
                  Education
                </h3>

                <div className="education-grid">

                  {analysis
                    .education
                    ?.map(
                      (
                        item,
                        index
                      ) => (

                        <div
                          className="education-item"
                          key={
                            index
                          }
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

              <div className="two-column">

                <div className="analysis-card strength-card">

                  <span className="card-label">
                    POSITIVE SIGNALS
                  </span>

                  <h3>
                    Strengths
                  </h3>

                  <ul>

                    {analysis
                      .strengths
                      ?.map(
                        (
                          item,
                          index
                        ) => (

                          <li
                            key={
                              index
                            }
                          >

                            <span>
                              ✓
                            </span>

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

                    {analysis
                      .weaknesses
                      ?.map(
                        (
                          item,
                          index
                        ) => (

                          <li
                            key={
                              index
                            }
                          >

                            <span>
                              !
                            </span>

                            {item}

                          </li>

                        )
                      )}

                  </ul>

                </div>

              </div>

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

                  {analysis
                    .missingSkills
                    ?.map(
                      (
                        item,
                        index
                      ) => (

                        <div
                          className="recommended-item"
                          key={
                            index
                          }
                        >

                          <span>
                            +
                          </span>

                          {
                            item
                          }

                        </div>

                      )
                    )}

                </div>

              </div>

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

      <footer>
        AI Resume Analyzer • Powered by AI
      </footer>

    </div>
  );
}

export default App;