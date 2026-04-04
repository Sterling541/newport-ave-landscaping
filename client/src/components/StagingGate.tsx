import { useState, useEffect } from "react";

const STAGING_KEY = "nal_staging_auth";
const CORRECT_CODE = "8873";

export default function StagingGate({ children }: { children: React.ReactNode }) {
  const [unlocked, setUnlocked] = useState(false);
  const [code, setCode] = useState("");
  const [error, setError] = useState(false);
  const [shake, setShake] = useState(false);

  useEffect(() => {
    // Check if already unlocked in this session
    if (sessionStorage.getItem(STAGING_KEY) === "true") {
      setUnlocked(true);
    }
  }, []);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (code === CORRECT_CODE) {
      sessionStorage.setItem(STAGING_KEY, "true");
      setUnlocked(true);
    } else {
      setError(true);
      setShake(true);
      setCode("");
      setTimeout(() => setShake(false), 600);
    }
  }

  if (unlocked) return <>{children}</>;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 99999,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "oklch(0.12 0.02 145)",
        fontFamily: "'Cormorant Garamond', Georgia, serif",
      }}
    >
      {/* Logo area */}
      <div style={{ marginBottom: "2rem", textAlign: "center" }}>
        <img
          src="https://d2xsxph8kpxj0f.cloudfront.net/310519663503028182/g3pw3MRUapabcDUbhBEFxx/logo-transparent-stacked_ff350b79.png"
          alt="Newport Avenue Landscaping"
          style={{ height: 80, objectFit: "contain" }}
          onError={(e) => {
            (e.target as HTMLImageElement).style.display = "none";
          }}
        />
      </div>

      {/* Card */}
      <div
        style={{
          background: "oklch(0.16 0.02 145)",
          border: "1px solid oklch(0.30 0.06 145)",
          borderRadius: "0.5rem",
          padding: "2.5rem 2rem",
          width: "min(360px, 90vw)",
          textAlign: "center",
          boxShadow: "0 20px 60px oklch(0 0 0 / 0.5)",
        }}
      >
        <p
          style={{
            color: "oklch(0.75 0.04 145)",
            fontSize: "0.7rem",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            marginBottom: "0.5rem",
          }}
        >
          Staging Preview
        </p>
        <h1
          style={{
            color: "oklch(0.95 0.02 80)",
            fontSize: "1.4rem",
            fontWeight: 600,
            marginBottom: "0.25rem",
            letterSpacing: "0.02em",
          }}
        >
          Access Code Required
        </h1>
        <p
          style={{
            color: "oklch(0.60 0.03 145)",
            fontSize: "0.85rem",
            marginBottom: "1.75rem",
            lineHeight: 1.5,
          }}
        >
          This site is under development. Enter your access code to preview.
        </p>

        <form onSubmit={handleSubmit}>
          <div
            style={{
              animation: shake ? "shake 0.5s ease" : "none",
            }}
          >
            <input
              type="password"
              inputMode="numeric"
              placeholder="Enter code"
              value={code}
              onChange={(e) => {
                setCode(e.target.value);
                setError(false);
              }}
              autoFocus
              style={{
                width: "100%",
                padding: "0.75rem 1rem",
                background: "oklch(0.10 0.02 145)",
                border: error
                  ? "1px solid oklch(0.60 0.20 25)"
                  : "1px solid oklch(0.28 0.05 145)",
                borderRadius: "0.3rem",
                color: "oklch(0.95 0.02 80)",
                fontSize: "1.1rem",
                textAlign: "center",
                letterSpacing: "0.3em",
                outline: "none",
                marginBottom: "0.5rem",
                boxSizing: "border-box",
                transition: "border-color 0.2s",
              }}
            />
            {error && (
              <p
                style={{
                  color: "oklch(0.60 0.20 25)",
                  fontSize: "0.78rem",
                  marginBottom: "0.75rem",
                }}
              >
                Incorrect code. Please try again.
              </p>
            )}
          </div>

          <button
            type="submit"
            style={{
              width: "100%",
              padding: "0.75rem",
              background: "oklch(0.46 0.20 25)",
              border: "none",
              borderRadius: "1.8rem 0.2rem 1.8rem 0.2rem",
              color: "oklch(0.97 0.01 80)",
              fontSize: "0.8rem",
              fontWeight: 600,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              cursor: "pointer",
              marginTop: "0.5rem",
              transition: "background 0.2s",
            }}
            onMouseEnter={(e) => {
              (e.target as HTMLButtonElement).style.background = "oklch(0.52 0.22 25)";
            }}
            onMouseLeave={(e) => {
              (e.target as HTMLButtonElement).style.background = "oklch(0.46 0.20 25)";
            }}
          >
            Enter Site
          </button>
        </form>
      </div>

      <p
        style={{
          color: "oklch(0.35 0.03 145)",
          fontSize: "0.7rem",
          marginTop: "2rem",
          letterSpacing: "0.05em",
        }}
      >
        Newport Avenue Landscaping · Bend, Oregon
      </p>

      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20% { transform: translateX(-8px); }
          40% { transform: translateX(8px); }
          60% { transform: translateX(-5px); }
          80% { transform: translateX(5px); }
        }
      `}</style>
    </div>
  );
}
