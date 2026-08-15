import React, { useState } from "react";

const SIGNUP_URL = "http://localhost:5000/api/signup";

function Signup({ onSignupSuccess }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    const cleanName = name.trim();
    const cleanEmail = email.trim().toLowerCase();

    // Name validation
    if (!cleanName) {
      setError("Please enter your full name.");
      return;
    }

    if (cleanName.length < 2) {
      setError("Name must contain at least 2 characters.");
      return;
    }

    // Email validation
    if (!cleanEmail) {
      setError("Please enter your email address.");
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(cleanEmail)) {
      setError("Please enter a valid email address.");
      return;
    }

    // Password validation
    if (!password) {
      setError("Please create a password.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    // Confirm password
    if (!confirmPassword) {
      setError("Please confirm your password.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(SIGNUP_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: cleanName,
          email: cleanEmail,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Signup failed."
        );
      }

      setSuccess(
        "Account created successfully! Redirecting to login..."
      );

      // Clear form
      setName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");

      // Go to login after short delay
      setTimeout(() => {
        onSignupSuccess();
      }, 1200);

    } catch (err) {
      console.error(err);

      setError(
        err.message ||
        "Unable to create account. Please try again."
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
          maxWidth: "450px",
          background: "rgba(255,255,255,0.96)",
          padding: "38px",
          borderRadius: "22px",
          border: "1px solid rgba(255,255,255,0.8)",
          boxShadow:
            "0 25px 70px rgba(15,23,42,0.12)",
        }}
      >

        {/* LOGO */}

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
          Create Account
        </h1>

        <p
          style={{
            textAlign: "center",
            color: "#64748b",
            marginBottom: "30px",
            lineHeight: "1.5",
          }}
        >
          Start analyzing your resume with AI
        </p>

        <form onSubmit={handleSignup}>

          {/* NAME */}

          <label
            style={{
              display: "block",
              marginBottom: "8px",
              fontWeight: "700",
              color: "#374151",
            }}
          >
            Full Name
          </label>

          <input
            type="text"
            placeholder="Enter your full name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              setError("");
            }}
            autoComplete="name"
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
              marginBottom: "18px",
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
            placeholder="Minimum 6 characters"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setError("");
            }}
            autoComplete="new-password"
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

          {/* CONFIRM PASSWORD */}

          <label
            style={{
              display: "block",
              marginBottom: "8px",
              fontWeight: "700",
              color: "#374151",
            }}
          >
            Confirm Password
          </label>

          <input
            type="password"
            placeholder="Re-enter your password"
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
              setError("");
            }}
            autoComplete="new-password"
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

              <span>{error}</span>
            </div>
          )}

          {/* SUCCESS */}

          {success && (
            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "8px",
                background: "#f0fdf4",
                color: "#15803d",
                border: "1px solid #bbf7d0",
                padding: "12px 14px",
                borderRadius: "11px",
                marginBottom: "18px",
                fontSize: "14px",
                lineHeight: "1.4",
              }}
            >
              <span>✓</span>

              <span>{success}</span>
            </div>
          )}

          {/* SIGNUP BUTTON */}

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
              color: "#ffffff",
              fontSize: "16px",
              fontWeight: "800",
              cursor: loading
                ? "wait"
                : "pointer",
              boxShadow: loading
                ? "none"
                : "0 10px 25px rgba(37,99,235,0.25)",
            }}
          >
            {loading
              ? "Creating Account..."
              : "Create Account →"}
          </button>

        </form>

        {/* LOGIN */}

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
            Already have an account?
          </span>

          <button
            type="button"
            onClick={onSignupSuccess}
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
            Sign In
          </button>
        </div>

        <p
          style={{
            textAlign: "center",
            marginTop: "20px",
            marginBottom: 0,
            color: "#94a3b8",
            fontSize: "12px",
          }}
        >
          AI Resume Analyzer • Secure Registration
        </p>

      </div>
    </div>
  );
}

export default Signup;