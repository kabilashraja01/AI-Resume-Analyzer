
import React, { useState } from "react";

const LOGIN_URL = "http://localhost:5000/api/login";

function Login({ onLoginSuccess, onGoToSignup }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    setError("");

    if (!email || !password) {
      setError("Please enter email and password.");
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
          email,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      // Save logged-in user
      localStorage.setItem(
        "user",
        JSON.stringify(data.user)
      );

      // Move to Resume Analyzer
      if (onLoginSuccess) {
        onLoginSuccess(data.user);
      }
    } catch (err) {
      console.error(err);
      setError(err.message || "Login failed");
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
        background: "#f4f7fb",
        padding: "20px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "430px",
          background: "#ffffff",
          padding: "35px",
          borderRadius: "18px",
          boxShadow: "0 10px 35px rgba(0,0,0,0.08)",
        }}
      >
        <div
          style={{
            textAlign: "center",
            marginBottom: "30px",
          }}
        >
          <div
            style={{
              display: "inline-block",
              padding: "7px 14px",
              borderRadius: "20px",
              background: "#e8f0ff",
              color: "#2563eb",
              fontSize: "12px",
              fontWeight: "700",
              letterSpacing: "1px",
            }}
          >
            AI POWERED
          </div>

          <h1
            style={{
              marginTop: "18px",
              marginBottom: "8px",
              color: "#111827",
            }}
          >
            Welcome Back
          </h1>

          <p
            style={{
              color: "#64748b",
              margin: 0,
            }}
          >
            Sign in to your AI Resume Analyzer account
          </p>
        </div>

        <form onSubmit={handleLogin}>

          {/* EMAIL */}

          <label
            style={{
              display: "block",
              marginBottom: "8px",
              color: "#374151",
              fontWeight: "600",
            }}
          >
            Email Address
          </label>

          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              width: "100%",
              boxSizing: "border-box",
              padding: "13px 14px",
              marginBottom: "20px",
              border: "1px solid #d1d5db",
              borderRadius: "10px",
              fontSize: "15px",
              outline: "none",
            }}
          />

          {/* PASSWORD */}

          <label
            style={{
              display: "block",
              marginBottom: "8px",
              color: "#374151",
              fontWeight: "600",
            }}
          >
            Password
          </label>

          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              width: "100%",
              boxSizing: "border-box",
              padding: "13px 14px",
              marginBottom: "20px",
              border: "1px solid #d1d5db",
              borderRadius: "10px",
              fontSize: "15px",
              outline: "none",
            }}
          />

          {/* ERROR */}

          {error && (
            <div
              style={{
                background: "#fef2f2",
                color: "#dc2626",
                padding: "12px",
                borderRadius: "10px",
                marginBottom: "18px",
                fontSize: "14px",
              }}
            >
              ⚠ {error}
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
              borderRadius: "10px",
              background: loading ? "#9ca3af" : "#2563eb",
              color: "#ffffff",
              fontSize: "16px",
              fontWeight: "700",
              cursor: loading ? "wait" : "pointer",
            }}
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </form>

        {/* SIGNUP */}

        <div
          style={{
            textAlign: "center",
            marginTop: "25px",
            paddingTop: "20px",
            borderTop: "1px solid #e5e7eb",
          }}
        >
          <span style={{ color: "#64748b" }}>
            New to AI Resume Analyzer?
          </span>

          <button
            type="button"
            onClick={onGoToSignup}
            style={{
              marginLeft: "6px",
              border: "none",
              background: "none",
              color: "#2563eb",
              fontWeight: "700",
              cursor: "pointer",
            }}
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;

