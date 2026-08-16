import React, { useState } from "react";
import "./Auth.css";

const SIGNUP_URL =
  "https://ai-resume-analyzer-u2b6.onrender.com/api/signup";

function Signup({ onSignupSuccess }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    if (!name || !email || !password || !confirmPassword) {
      setError("Please fill in all fields.");
      return;
    }

    if (password.length < 6) {
      setError(
        "Password must contain at least 6 characters."
      );
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
          Accept: "application/json",
        },

        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          password,
        }),
      });

      /*
       * Read response as TEXT first.
       * This prevents:
       *
       * Unexpected token '<'
       *
       * when server returns HTML.
       */

      const responseText = await response.text();

      console.log("Signup status:", response.status);
      console.log("Signup response:", responseText);

      let data = null;

      try {
        data = JSON.parse(responseText);
      } catch {
        if (responseText.includes("<!DOCTYPE")) {
          throw new Error(
            "Signup API is not responding. Please check your backend server and /api/signup route."
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
            "Signup failed. Please try again."
        );
      }

      alert(
        data?.message ||
          "Account created successfully! Please sign in."
      );

      onSignupSuccess();

    } catch (err) {
      console.error("Signup error:", err);

      setError(
        err.message ||
          "Signup failed. Please try again."
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

          <img
  src="/shastix-logo.png"
  alt="Shastix Tech"
  className="auth-logo"
/>

          <div className="brand-badge">
            AI POWERED
          </div>

          <h1>
            Your Career.
            <br />
            Powered by AI.
          </h1>

          <p>
            Create your account and unlock intelligent
            resume analysis, ATS scoring, skill verification
            and personalized career recommendations.
          </p>

          <div className="brand-features">

            <div>
              <span>✓</span>
              Smart Resume Analysis
            </div>

            <div>
              <span>✓</span>
              Skill Verification Tests
            </div>

            <div>
              <span>✓</span>
              Resume History
            </div>

          </div>

        </div>


        {/* SIGNUP CARD */}

        <div className="auth-card">

          <div className="auth-card-header">

            <div className="mobile-logo">
              ✦
            </div>

            <span className="auth-eyebrow">
              GET STARTED
            </span>

            <h2>
              Create your account
            </h2>

            <p>
              Start building a stronger career profile today.
            </p>

          </div>


          {/* ERROR */}

          {error && (
            <div className="auth-error">
              ⚠ {error}
            </div>
          )}


          <form onSubmit={handleSubmit}>

            {/* NAME */}

            <div className="auth-field">

              <label>
                Full Name
              </label>

              <div className="input-wrapper">

                <span className="input-icon">
                  👤
                </span>

                <input
                  type="text"
                  placeholder="Your full name"
                  value={name}
                  onChange={(e) =>
                    setName(e.target.value)
                  }
                  autoComplete="name"
                  disabled={loading}
                />

              </div>

            </div>


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
                  placeholder="Minimum 6 characters"
                  value={password}
                  onChange={(e) =>
                    setPassword(e.target.value)
                  }
                  autoComplete="new-password"
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


            {/* CONFIRM PASSWORD */}

            <div className="auth-field">

              <label>
                Confirm Password
              </label>

              <div className="input-wrapper">

                <span className="input-icon">
                  🔐
                </span>

                <input
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  placeholder="Re-enter your password"
                  value={confirmPassword}
                  onChange={(e) =>
                    setConfirmPassword(
                      e.target.value
                    )
                  }
                  autoComplete="new-password"
                  disabled={loading}
                />

              </div>

            </div>


            {/* SIGNUP BUTTON */}

            <button
              type="submit"
              className="auth-submit"
              disabled={loading}
            >

              {loading
                ? "Creating Account..."
                : "Create Account →"}

            </button>

          </form>


          <div className="auth-divider">
            <span>
              Already have an account?
            </span>
          </div>


          <button
            type="button"
            className="auth-secondary"
            onClick={() =>
              onSignupSuccess()
            }
            disabled={loading}
          >
            ← Back to Sign In
          </button>


          <p className="auth-footer-text">
            By creating an account, you can save and
            review your resume analyses.
          </p>

        </div>

      </div>

    </div>
  );
}

export default Signup;