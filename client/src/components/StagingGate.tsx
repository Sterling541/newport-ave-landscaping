import { useState, useEffect } from "react";

const STAGING_KEY = "nal_staging_auth";
const CORRECT_CODE = "4132";

export default function StagingGate({ children }: { children: React.ReactNode }) {
  const [unlocked, setUnlocked] = useState(false);
  const [code, setCode] = useState("");
  const [error, setError] = useState(false);
  const [shake, setShake] = useState(false);

  useEffect(() => {
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
        background: "oklch(0.98 0.005 75)",
        fontFamily: "'Cormorant Garamond', Georgia, serif",
      }}
    >
      {/* Subtle top accent bar */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "4px",
          background: "oklch(0.50 0.18 25)",
        }}
      />

      {/* Logo */}
      <div style={{ marginBottom: "2.5rem", textAlign: "center" }}>
        <img
          src="https://d2xsxph8kpxj0f.cloudfront.net/310519663503028182/g3pw3MRUapabcDUbhBEFxx/logo-transparent-stacked_ff350b79.png"
          alt="Newport Avenue Landscaping"
          style={{ height: 90, objectFit: "contain" }}
          onError={(e) => {
            (e.target as HTMLImageElement).style.display = "none";
          }}
        />
      </div>

      {/* Card */}
      <div
        style={{
          background: "oklch(1 0 0)",
          border: "1px solid oklch(0.90 0.005 75)",
          borderRadius: "0.75rem",
          padding: "2.75rem 2.25rem",
          width: "min(400px, 92vw)",
          textAlign: "center",
          boxShadow: "0 8px 40px oklch(0 0 0 / 0.08)",
        }}
      >
        {/* Label */}
        <p
          style={{
            color: "oklch(0.50 0.18 25)",
            fontSize: "0.65rem",
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            marginBottom: "0.6rem",
            fontFamily: "'Montserrat', sans-serif",
          }}
        >
          Preview Access
        </p>

        {/* Heading */}
        <h1
          style={{
            color: "oklch(0.14 0.005 0)",
            fontSize: "1.6rem",
            fontWeight: 600,
            marginBottom: "0.5rem",
            letterSpacing: "0.01em",
          }}
        >
          Welcome Back
        </h1>

        {/* Accent rule */}
        <div
          style={{
            width: "2.5rem",
            height: "2px",
            background: "oklch(0.50 0.18 25)",
            margin: "0 auto 1.25rem",
          }}
        />

        <p
          style={{
            color: "oklch(0.50 0.005 0)",
            fontSize: "0.88rem",
            marginBottom: "1.75rem",
            lineHeight: 1.6,
          }}
        >
          Enter your preview code to explore the new Newport Avenue Landscaping website.
        </p>

        <form onSubmit={handleSubmit}>
          <div style={{ animation: shake ? "shake 0.5s ease" : "none" }}>
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
                padding: "0.8rem 1rem",
                background: "oklch(0.97 0.004 75)",
                border: error
                  ? "1.5px solid oklch(0.55 0.20 25)"
                  : "1.5px solid oklch(0.88 0.005 75)",
                borderRadius: "0.4rem",
                color: "oklch(0.14 0.005 0)",
                fontSize: "1.15rem",
                textAlign: "center",
                letterSpacing: "0.35em",
                outline: "none",
                marginBottom: "0.5rem",
                boxSizing: "border-box",
                transition: "border-color 0.2s",
              }}
              onFocus={(e) => {
                if (!error) e.target.style.borderColor = "oklch(0.50 0.18 25)";
              }}
              onBlur={(e) => {
                if (!error) e.target.style.borderColor = "oklch(0.88 0.005 75)";
              }}
            />
            {error && (
              <p
                style={{
                  color: "oklch(0.50 0.20 25)",
                  fontSize: "0.78rem",
                  marginBottom: "0.75rem",
                }}
              >
                Incorrect code — please try again.
              </p>
            )}
          </div>

          <button
            type="submit"
            style={{
              width: "100%",
              padding: "0.85rem",
              background: "oklch(0.50 0.18 25)",
              border: "none",
              borderRadius: "0.4rem",
              color: "oklch(1 0 0)",
              fontSize: "0.78rem",
              fontWeight: 700,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              cursor: "pointer",
              marginTop: "0.5rem",
              transition: "background 0.2s",
              fontFamily: "'Montserrat', sans-serif",
            }}
            onMouseEnter={(e) => {
              (e.target as HTMLButtonElement).style.background = "oklch(0.44 0.20 25)";
            }}
            onMouseLeave={(e) => {
              (e.target as HTMLButtonElement).style.background = "oklch(0.50 0.18 25)";
            }}
          >
            Enter Site →
          </button>
        </form>

        {/* Team admin link */}
        <div style={{ marginTop: "1.5rem", borderTop: "1px solid oklch(0.92 0.005 75)", paddingTop: "1.25rem" }}>
          <a
            href="/admin/submissions"
            style={{
              color: "oklch(0.50 0.18 25)",
              fontSize: "0.75rem",
              fontFamily: "'Montserrat', sans-serif",
              letterSpacing: "0.08em",
              textDecoration: "none",
              opacity: 0.7,
              transition: "opacity 0.2s",
            }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.opacity = "1")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.opacity = "0.7")}
          >
            Team Access →
          </a>
        </div>
      </div>

      {/* Footer note */}
      <p
        style={{
          color: "oklch(0.65 0.005 0)",
          fontSize: "0.68rem",
          marginTop: "2rem",
          letterSpacing: "0.06em",
        }}
      >
        Newport Avenue Landscaping · Bend, Oregon
      </p>

      {/* Secret admin star — bottom-left corner */}
      <a
        href="/admin/submissions"
        style={{
          position: "absolute",
          bottom: "16px",
          left: "20px",
          color: "oklch(0.72 0.18 85)",
          opacity: 0.3,
          fontSize: "18px",
          lineHeight: 1,
          textDecoration: "none",
          transition: "opacity 0.2s",
          cursor: "pointer",
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          minWidth: "44px",
          minHeight: "44px",
          WebkitTapHighlightColor: "transparent",
          touchAction: "manipulation",
        }}
        onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.opacity = "1")}
        onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.opacity = "0.3")}
      >
        ★
      </a>

      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20%       { transform: translateX(-8px); }
          40%       { transform: translateX(8px); }
          60%       { transform: translateX(-5px); }
          80%       { transform: translateX(5px); }
        }
      `}</style>
    </div>
  );
}
