import React, { useState } from "react";
import "./Auth.css";

const SIGNIN_URL ="https://ai-resume-analyzer-u2b6.onrender.com/api/login";

function Signin({ onLoginSuccess, onGoToSignup }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    if (!email || !password) {
      setError("Please enter email and password.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(SIGNIN_URL, {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },

        body: JSON.stringify({
          email: email.trim(),
          password,
        }),
      });

      /*
       * IMPORTANT:
       * First read the response as TEXT.
       * This prevents:
       *
       * Unexpected token '<'
       *
       * when Render returns an HTML page.
       */

      const responseText = await response.text();

      console.log("Signin status:", response.status);
      console.log("Signin response:", responseText);

      let data = null;

      try {
        data = JSON.parse(responseText);
      } catch {
        /*
         * Server returned HTML instead of JSON.
         */

        if (responseText.includes("<!DOCTYPE")) {
          throw new Error(
            "Signin API is not responding. Please check your backend server and /api/signin route."
          );
        }

        throw new Error(
          "Invalid response received from server."
        );
      }

      if (!response.ok) {
        throw new Error(
          data?.message ||
            data?.error ||
            "Invalid email or password."
        );
      }

      const loggedInUser =
        data?.user || data;

      if (!loggedInUser) {
        throw new Error(
          "Login successful, but user information was not returned."
        );
      }

      /*
       * Send logged-in user to App.jsx
       */

      onLoginSuccess(loggedInUser);

    } catch (err) {
      console.error("Login error:", err);

      setError(
        err.message ||
          "Login failed. Please try again."
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">

      <div className="auth-container">

        {/* LEFT SIDE */}

        <div className="auth-brand">

          <div className="brand-logo">
            ✦
          </div>

          <div className="brand-badge">
            AI POWERED
          </div>

          <h1>
            Build a Resume
            <br />
            That Gets Noticed.
          </h1>

          <p>
            Analyze your resume, discover your strengths,
            improve your skills and find better career
            opportunities with AI.
          </p>

          <div className="brand-features">

            <div>
              <span>✓</span>
              AI Resume Analysis
            </div>

            <div>
              <span>✓</span>
              ATS Compatibility Score
            </div>

            <div>
              <span>✓</span>
              Personalized Job Matching
            </div>

          </div>

        </div>


        {/* LOGIN CARD */}

        <div className="auth-card">

          <div className="auth-card-header">

            <div className="mobile-logo">
              ✦
            </div>

            <span className="auth-eyebrow">
              WELCOME BACK
            </span>

            <h2>
              Sign in to your account
            </h2>

            <p>
              Continue your resume improvement journey.
            </p>

          </div>


          {/* ERROR */}

          {error && (
            <div className="auth-error">
              ⚠ {error}
            </div>
          )}


          {/* FORM */}

          <form onSubmit={handleSubmit}>

            {/* EMAIL */}

            <div className="auth-field">

              <label>
                Email Address
              </label>

              <div className="input-wrapper">

                <span className="input-icon">
                  ✉
                </span>

                <input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) =>
                    setEmail(e.target.value)
                  }
                  autoComplete="email"
                  disabled={loading}
                />

              </div>

            </div>


            {/* PASSWORD */}

            <div className="auth-field">

              <label>
                Password
              </label>

              <div className="input-wrapper">

                <span className="input-icon">
                  🔒
                </span>

                <input
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) =>
                    setPassword(e.target.value)
                  }
                  autoComplete="current-password"
                  disabled={loading}
                />

                <button
                  type="button"
                  className="password-toggle"
                  onClick={() =>
                    setShowPassword(
                      !showPassword
                    )
                  }
                  disabled={loading}
                >
                  {showPassword
                    ? "🙈"
                    : "👁"}
                </button>

              </div>

            </div>


            {/* LOGIN BUTTON */}

            <button
              type="submit"
              className="auth-submit"
              disabled={loading}
            >

              {loading
                ? "Signing in..."
                : "Sign In →"}

            </button>

          </form>


          {/* DIVIDER */}

          <div className="auth-divider">
            <span>
              New to AI Resume Analyzer?
            </span>
          </div>


          {/* SIGNUP */}

          <button
            type="button"
            className="auth-secondary"
            onClick={onGoToSignup}
            disabled={loading}
          >
            Create an Account
          </button>


          <p className="auth-footer-text">
            Your resume data is securely processed.
          </p>

        </div>

      </div>

    </div>
  );
}

export default Signin;