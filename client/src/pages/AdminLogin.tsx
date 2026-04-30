/* ============================================================
   ADMIN LOGIN PAGE
   Email + PIN login for staff users.
   Accessed via the gold star on the front page.
   ============================================================ */
import { useState, useRef } from "react";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";

type View = "login" | "forgot";

export default function AdminLogin() {
  const [view, setView] = useState<View>("login");
  const [email, setEmail] = useState("");
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");
  const [shake, setShake] = useState(false);
  const pinRef = useRef<HTMLInputElement>(null);

  // Forgot PIN state
  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotSent, setForgotSent] = useState(false);

  const login = trpc.staff.login.useMutation({
    onSuccess: () => {
      // Use full page reload (not client-side navigation) so the new
      // staff_session_id cookie is present before myPermissions query runs.
      window.location.href = "/admin/submissions";
    },
    onError: () => {
      setError("Invalid email or PIN — please try again.");
      setShake(true);
      setPin("");
      setTimeout(() => setShake(false), 600);
      pinRef.current?.focus();
    },
  });

  const forgotPin = trpc.staff.forgotPin.useMutation({
    onSuccess: () => {
      setForgotSent(true);
    },
    onError: (e) => {
      toast.error(e.message || "Failed to send reset email. Please try again.");
    },
  });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (!email || !pin) {
      setError("Please enter your email and PIN.");
      return;
    }
    login.mutate({ email: email.trim().toLowerCase(), pin });
  }

  function handleForgotSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!forgotEmail) return;
    forgotPin.mutate({ email: forgotEmail.trim().toLowerCase() });
  }

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "0.7rem 0.9rem",
    background: "oklch(0.97 0.004 75)",
    border: "1.5px solid oklch(0.88 0.005 75)",
    borderRadius: "0.4rem",
    color: "oklch(0.14 0.005 0)",
    fontSize: "0.9rem",
    outline: "none",
    boxSizing: "border-box",
    transition: "border-color 0.2s",
    fontFamily: "'Montserrat', sans-serif",
  };

  const labelStyle: React.CSSProperties = {
    display: "block",
    fontSize: "0.7rem",
    fontWeight: 600,
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    color: "oklch(0.40 0.005 0)",
    marginBottom: "0.4rem",
  };

  const btnStyle: React.CSSProperties = {
    width: "100%",
    padding: "0.85rem",
    background: "oklch(0.40 0.15 145)",
    border: "none",
    borderRadius: "0.4rem",
    color: "oklch(1 0 0)",
    fontSize: "0.75rem",
    fontWeight: 700,
    letterSpacing: "0.12em",
    textTransform: "uppercase",
    cursor: "pointer",
    fontFamily: "'Montserrat', sans-serif",
    transition: "background 0.2s",
    marginTop: "0.25rem",
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "oklch(0.97 0.004 75)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "'Montserrat', sans-serif",
        padding: "1rem",
      }}
    >
      {/* Logo / Brand */}
      <div style={{ textAlign: "center", marginBottom: "2rem" }}>
        <a href="/" style={{ textDecoration: "none" }}>
          <img
            src="https://storage.googleapis.com/flutterflow-io-6f20.appspot.com/projects/newport-ave-landscaping-c9ys8b/assets/ygbqe7hf5lfg/Newport_Ave_Landscaping_Logo_Transparent.png"
            alt="Newport Avenue Landscaping"
            style={{ height: "72px", objectFit: "contain" }}
            onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
          />
        </a>
        <p style={{ marginTop: "0.75rem", fontSize: "0.6rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "oklch(0.50 0.18 25)", fontWeight: 700 }}>
          Team Portal
        </p>
      </div>

      {/* Card */}
      <div
        style={{
          background: "oklch(1 0 0)",
          borderRadius: "0.875rem",
          padding: "2.25rem 2.5rem",
          width: "min(380px, 92vw)",
          boxShadow: "0 8px 40px rgba(0,0,0,0.10), 0 1px 4px rgba(0,0,0,0.06)",
        }}
      >
        {/* ── LOGIN VIEW ── */}
        {view === "login" && (
          <>
            <h1 style={{ fontSize: "1.5rem", fontWeight: 700, color: "oklch(0.14 0.005 0)", marginBottom: "0.25rem", fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
              Staff Login
            </h1>
            <p style={{ fontSize: "0.82rem", color: "oklch(0.50 0.005 0)", marginBottom: "1.75rem" }}>
              Sign in with your work email and PIN.
            </p>

            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div>
                <label htmlFor="email" style={labelStyle}>Work Email</label>
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  autoFocus
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setError(""); }}
                  placeholder="you@newportavelandscaping.com"
                  style={inputStyle}
                  onFocus={(e) => (e.target.style.borderColor = "oklch(0.50 0.18 25)")}
                  onBlur={(e) => (e.target.style.borderColor = "oklch(0.88 0.005 75)")}
                />
              </div>

              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.4rem" }}>
                  <label htmlFor="pin" style={{ ...labelStyle, marginBottom: 0 }}>PIN</label>
                  <button
                    type="button"
                    onClick={() => { setView("forgot"); setForgotEmail(email); }}
                    style={{ background: "none", border: "none", cursor: "pointer", fontSize: "0.7rem", color: "oklch(0.50 0.18 25)", fontFamily: "'Montserrat', sans-serif", padding: 0, letterSpacing: "0.03em" }}
                  >
                    Forgot PIN?
                  </button>
                </div>
                <div style={{ animation: shake ? "adminShake 0.5s ease" : "none" }}>
                  <input
                    id="pin"
                    ref={pinRef}
                    type="password"
                    inputMode="numeric"
                    autoComplete="current-password"
                    value={pin}
                    onChange={(e) => { setPin(e.target.value); setError(""); }}
                    placeholder="••••"
                    maxLength={8}
                    style={{
                      ...inputStyle,
                      border: `1.5px solid ${error ? "oklch(0.55 0.20 25)" : "oklch(0.88 0.005 75)"}`,
                      fontSize: "1.2rem",
                      letterSpacing: "0.3em",
                      textAlign: "center",
                    }}
                    onFocus={(e) => (e.target.style.borderColor = error ? "oklch(0.55 0.20 25)" : "oklch(0.50 0.18 25)")}
                    onBlur={(e) => (e.target.style.borderColor = error ? "oklch(0.55 0.20 25)" : "oklch(0.88 0.005 75)")}
                  />
                </div>
                {error && (
                  <p style={{ color: "oklch(0.50 0.20 25)", fontSize: "0.75rem", marginTop: "0.4rem" }}>
                    {error}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={login.isPending}
                style={{ ...btnStyle, background: login.isPending ? "oklch(0.65 0.12 145)" : "oklch(0.40 0.15 145)", cursor: login.isPending ? "not-allowed" : "pointer" }}
                onMouseEnter={(e) => { if (!login.isPending) (e.target as HTMLButtonElement).style.background = "oklch(0.35 0.15 145)"; }}
                onMouseLeave={(e) => { if (!login.isPending) (e.target as HTMLButtonElement).style.background = "oklch(0.40 0.15 145)"; }}
              >
                {login.isPending ? "Signing in…" : "Sign In →"}
              </button>
            </form>
          </>
        )}

        {/* ── FORGOT PIN VIEW ── */}
        {view === "forgot" && (
          <>
            <button
              type="button"
              onClick={() => { setView("login"); setForgotSent(false); }}
              style={{ background: "none", border: "none", cursor: "pointer", fontSize: "0.75rem", color: "oklch(0.50 0.005 0)", fontFamily: "'Montserrat', sans-serif", padding: 0, marginBottom: "1rem", display: "flex", alignItems: "center", gap: "0.3rem" }}
            >
              ← Back to login
            </button>

            <h1 style={{ fontSize: "1.5rem", fontWeight: 700, color: "oklch(0.14 0.005 0)", marginBottom: "0.25rem", fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
              Reset PIN
            </h1>

            {forgotSent ? (
              <div style={{ textAlign: "center", padding: "1.5rem 0" }}>
                <div style={{ fontSize: "2.5rem", marginBottom: "0.75rem" }}>✉️</div>
                <p style={{ fontSize: "0.9rem", color: "oklch(0.25 0.005 0)", fontWeight: 600, marginBottom: "0.5rem" }}>
                  Check your email
                </p>
                <p style={{ fontSize: "0.82rem", color: "oklch(0.50 0.005 0)", lineHeight: 1.6 }}>
                  If <strong>{forgotEmail}</strong> is registered, you'll receive a PIN reset link within a minute. The link expires in 30 minutes.
                </p>
                <button
                  type="button"
                  onClick={() => { setView("login"); setForgotSent(false); }}
                  style={{ ...btnStyle, marginTop: "1.5rem" }}
                >
                  Back to Login
                </button>
              </div>
            ) : (
              <>
                <p style={{ fontSize: "0.82rem", color: "oklch(0.50 0.005 0)", marginBottom: "1.75rem" }}>
                  Enter your work email and we'll send you a link to reset your PIN.
                </p>
                <form onSubmit={handleForgotSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                  <div>
                    <label htmlFor="forgot-email" style={labelStyle}>Work Email</label>
                    <input
                      id="forgot-email"
                      type="email"
                      autoComplete="email"
                      autoFocus
                      value={forgotEmail}
                      onChange={(e) => setForgotEmail(e.target.value)}
                      placeholder="you@newportavelandscaping.com"
                      style={inputStyle}
                      onFocus={(e) => (e.target.style.borderColor = "oklch(0.50 0.18 25)")}
                      onBlur={(e) => (e.target.style.borderColor = "oklch(0.88 0.005 75)")}
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={forgotPin.isPending || !forgotEmail}
                    style={{ ...btnStyle, background: (forgotPin.isPending || !forgotEmail) ? "oklch(0.65 0.12 145)" : "oklch(0.40 0.15 145)", cursor: (forgotPin.isPending || !forgotEmail) ? "not-allowed" : "pointer" }}
                  >
                    {forgotPin.isPending ? "Sending…" : "Send Reset Link →"}
                  </button>
                </form>
              </>
            )}
          </>
        )}
      </div>

      {/* Back to site */}
      <a
        href="/"
        style={{ marginTop: "1.5rem", fontSize: "0.75rem", color: "oklch(0.55 0.005 0)", textDecoration: "none", letterSpacing: "0.05em" }}
        onMouseEnter={(e) => ((e.target as HTMLAnchorElement).style.color = "oklch(0.30 0.005 0)")}
        onMouseLeave={(e) => ((e.target as HTMLAnchorElement).style.color = "oklch(0.55 0.005 0)")}
      >
        ← Back to site
      </a>

      <style>{`
        @keyframes adminShake {
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
