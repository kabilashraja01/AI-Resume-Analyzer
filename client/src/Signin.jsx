import React, { useState } from "react";

const LOGIN_URL = "https://ai-resume-analyzer-u2b6.onrender.com/api/login";

function Signin({ onLoginSuccess, onGoToSignup }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    setError("");

    const cleanEmail = email.trim().toLowerCase();

    // Empty validation
    if (!cleanEmail || !password) {
      setError("Please enter your email and password.");
      return;
    }

    // Email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(cleanEmail)) {
      setError("Please enter a valid email address.");
      return;
    }

    // Password validation
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(LOGIN_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: cleanEmail,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed.");
      }

      // Save logged-in user
      localStorage.setItem(
        "user",
        JSON.stringify(data.user)
      );

      // Go to Resume Analyzer
      onLoginSuccess(data.user);

    } catch (err) {
      console.error(err);

      setError(
        err.message ||
        "Unable to login. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background:
          "linear-gradient(135deg, #eef2ff, #f8fafc, #e0e7ff)",
        padding: "20px",
        fontFamily: "Arial, sans-serif",
      }}
    >

      <div
        style={{
          width: "100%",
          maxWidth: "430px",
          background: "rgba(255,255,255,0.95)",
          padding: "38px",
          borderRadius: "22px",
          border: "1px solid rgba(255,255,255,0.8)",
          boxShadow:
            "0 25px 70px rgba(15,23,42,0.12)",
        }}
      >

        {/* LOGO / BADGE */}

        <div
          style={{
            width: "58px",
            height: "58px",
            margin: "0 auto 18px",
            borderRadius: "16px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background:
              "linear-gradient(135deg, #2563eb, #4f46e5)",
            color: "#ffffff",
            fontSize: "25px",
            fontWeight: "900",
            boxShadow:
              "0 12px 25px rgba(37,99,235,0.25)",
          }}
        >
          AI
        </div>

        {/* TITLE */}

        <h1
          style={{
            textAlign: "center",
            color: "#111827",
            marginBottom: "8px",
            fontSize: "30px",
          }}
        >
          Welcome Back
        </h1>

        <p
          style={{
            textAlign: "center",
            color: "#64748b",
            marginBottom: "30px",
            lineHeight: "1.5",
          }}
        >
          Sign in to your AI Resume Analyzer
        </p>

        <form onSubmit={handleLogin}>

          {/* EMAIL */}

          <label
            style={{
              display: "block",
              marginBottom: "8px",
              fontWeight: "700",
              color: "#374151",
            }}
          >
            Email Address
          </label>

          <input
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setError("");
            }}
            autoComplete="email"
            style={{
              width: "100%",
              boxSizing: "border-box",
              padding: "14px 15px",
              marginBottom: "20px",
              border: "1px solid #d1d5db",
              borderRadius: "12px",
              fontSize: "15px",
              outline: "none",
              background: "#f8fafc",
            }}
          />

          {/* PASSWORD */}

          <label
            style={{
              display: "block",
              marginBottom: "8px",
              fontWeight: "700",
              color: "#374151",
            }}
          >
            Password
          </label>

          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setError("");
            }}
            autoComplete="current-password"
            style={{
              width: "100%",
              boxSizing: "border-box",
              padding: "14px 15px",
              marginBottom: "18px",
              border: "1px solid #d1d5db",
              borderRadius: "12px",
              fontSize: "15px",
              outline: "none",
              background: "#f8fafc",
            }}
          />

          {/* ERROR */}

          {error && (
            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "8px",
                background: "#fef2f2",
                color: "#dc2626",
                border: "1px solid #fecaca",
                padding: "12px 14px",
                borderRadius: "11px",
                marginBottom: "18px",
                fontSize: "14px",
                lineHeight: "1.4",
              }}
            >
              <span>⚠</span>

              <span>
                {error}
              </span>
            </div>
          )}

          {/* LOGIN BUTTON */}

          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              padding: "14px",
              border: "none",
              borderRadius: "12px",
              background: loading
                ? "#94a3b8"
                : "linear-gradient(135deg, #2563eb, #4f46e5)",
              color: "#fff",
              fontSize: "16px",
              fontWeight: "800",
              cursor: loading
                ? "wait"
                : "pointer",
              boxShadow: loading
                ? "none"
                : "0 10px 25px rgba(37,99,235,0.25)",
              transition: "0.2s",
            }}
          >
            {loading
              ? "Signing In..."
              : "Sign In →"}
          </button>

        </form>

        {/* SIGNUP */}

        <div
          style={{
            textAlign: "center",
            marginTop: "26px",
            paddingTop: "22px",
            borderTop: "1px solid #e5e7eb",
          }}
        >

          <span
            style={{
              color: "#64748b",
              fontSize: "14px",
            }}
          >
            Don't have an account?
          </span>

          <button
            type="button"
            onClick={onGoToSignup}
            style={{
              marginLeft: "7px",
              border: "none",
              background: "none",
              color: "#2563eb",
              fontWeight: "800",
              cursor: "pointer",
              fontSize: "14px",
            }}
          >
            Create Account
          </button>

        </div>

        {/* FOOTER */}

        <p
          style={{
            textAlign: "center",
            marginTop: "20px",
            marginBottom: 0,
            color: "#94a3b8",
            fontSize: "12px",
          }}
        >
          AI Resume Analyzer • Secure Login
        </p>

      </div>
    </div>
  );
}

export default Signin;