/* ============================================================
   RESET PIN PAGE
   Staff users arrive here from the PIN reset email link.
   URL: /admin/reset-pin?token=<hex>
   ============================================================ */
import { useState, useEffect } from "react";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";

export default function AdminResetPin() {
  const [token, setToken] = useState("");
  const [newPin, setNewPin] = useState("");
  const [confirmPin, setConfirmPin] = useState("");
  const [done, setDone] = useState(false);
  const [validationError, setValidationError] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const t = params.get("token") ?? "";
    setToken(t);
  }, []);

  const resetPin = trpc.staff.resetPin.useMutation({
    onSuccess: () => {
      setDone(true);
      toast.success("PIN reset successfully!");
    },
    onError: (e) => {
      toast.error(e.message || "Failed to reset PIN. The link may have expired.");
    },
  });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setValidationError("");
    if (!newPin || newPin.length < 4) {
      setValidationError("PIN must be at least 4 digits.");
      return;
    }
    if (!/^\d+$/.test(newPin)) {
      setValidationError("PIN must contain digits only.");
      return;
    }
    if (newPin !== confirmPin) {
      setValidationError("PINs do not match.");
      return;
    }
    if (!token) {
      setValidationError("Invalid reset link. Please request a new one.");
      return;
    }
    resetPin.mutate({ token, newPin });
  }

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "0.7rem 0.9rem",
    background: "oklch(0.97 0.004 75)",
    border: "1.5px solid oklch(0.88 0.005 75)",
    borderRadius: "0.4rem",
    color: "oklch(0.14 0.005 0)",
    fontSize: "1.2rem",
    letterSpacing: "0.3em",
    textAlign: "center",
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
      {/* Logo */}
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

      <div
        style={{
          background: "oklch(1 0 0)",
          borderRadius: "0.875rem",
          padding: "2.25rem 2.5rem",
          width: "min(380px, 92vw)",
          boxShadow: "0 8px 40px rgba(0,0,0,0.10), 0 1px 4px rgba(0,0,0,0.06)",
        }}
      >
        {done ? (
          <div style={{ textAlign: "center", padding: "1rem 0" }}>
            <div style={{ fontSize: "2.5rem", marginBottom: "0.75rem" }}>✅</div>
            <h1 style={{ fontSize: "1.4rem", fontWeight: 700, color: "oklch(0.14 0.005 0)", marginBottom: "0.5rem", fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
              PIN Reset Successfully
            </h1>
            <p style={{ fontSize: "0.82rem", color: "oklch(0.50 0.005 0)", marginBottom: "1.5rem" }}>
              Your new PIN is active. You can now log in.
            </p>
            <a
              href="/admin/login"
              style={{
                display: "block",
                padding: "0.85rem",
                background: "oklch(0.40 0.15 145)",
                borderRadius: "0.4rem",
                color: "oklch(1 0 0)",
                fontSize: "0.75rem",
                fontWeight: 700,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                textDecoration: "none",
                textAlign: "center",
                fontFamily: "'Montserrat', sans-serif",
              }}
            >
              Go to Login →
            </a>
          </div>
        ) : (
          <>
            <h1 style={{ fontSize: "1.5rem", fontWeight: 700, color: "oklch(0.14 0.005 0)", marginBottom: "0.25rem", fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
              Set New PIN
            </h1>
            <p style={{ fontSize: "0.82rem", color: "oklch(0.50 0.005 0)", marginBottom: "1.75rem" }}>
              Choose a new 4–8 digit PIN for your account.
            </p>

            {!token && (
              <div style={{ padding: "0.75rem 1rem", background: "oklch(0.97 0.05 25)", borderRadius: "0.4rem", marginBottom: "1rem", fontSize: "0.82rem", color: "oklch(0.45 0.18 25)" }}>
                Invalid or missing reset token. Please request a new reset link.
              </div>
            )}

            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div>
                <label htmlFor="new-pin" style={labelStyle}>New PIN</label>
                <input
                  id="new-pin"
                  type="password"
                  inputMode="numeric"
                  autoFocus
                  value={newPin}
                  onChange={(e) => { setNewPin(e.target.value); setValidationError(""); }}
                  placeholder="••••"
                  maxLength={8}
                  style={inputStyle}
                  onFocus={(e) => (e.target.style.borderColor = "oklch(0.50 0.18 25)")}
                  onBlur={(e) => (e.target.style.borderColor = "oklch(0.88 0.005 75)")}
                />
              </div>
              <div>
                <label htmlFor="confirm-pin" style={labelStyle}>Confirm PIN</label>
                <input
                  id="confirm-pin"
                  type="password"
                  inputMode="numeric"
                  value={confirmPin}
                  onChange={(e) => { setConfirmPin(e.target.value); setValidationError(""); }}
                  placeholder="••••"
                  maxLength={8}
                  style={inputStyle}
                  onFocus={(e) => (e.target.style.borderColor = "oklch(0.50 0.18 25)")}
                  onBlur={(e) => (e.target.style.borderColor = "oklch(0.88 0.005 75)")}
                />
              </div>
              {validationError && (
                <p style={{ color: "oklch(0.50 0.20 25)", fontSize: "0.75rem", marginTop: "-0.5rem" }}>
                  {validationError}
                </p>
              )}
              <button
                type="submit"
                disabled={resetPin.isPending || !token}
                style={{
                  width: "100%",
                  padding: "0.85rem",
                  background: (resetPin.isPending || !token) ? "oklch(0.65 0.12 145)" : "oklch(0.40 0.15 145)",
                  border: "none",
                  borderRadius: "0.4rem",
                  color: "oklch(1 0 0)",
                  fontSize: "0.75rem",
                  fontWeight: 700,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  cursor: (resetPin.isPending || !token) ? "not-allowed" : "pointer",
                  fontFamily: "'Montserrat', sans-serif",
                  transition: "background 0.2s",
                  marginTop: "0.25rem",
                }}
              >
                {resetPin.isPending ? "Saving…" : "Set New PIN →"}
              </button>
            </form>
          </>
        )}
      </div>

      <a
        href="/admin/login"
        style={{ marginTop: "1.5rem", fontSize: "0.75rem", color: "oklch(0.55 0.005 0)", textDecoration: "none", letterSpacing: "0.05em" }}
        onMouseEnter={(e) => ((e.target as HTMLAnchorElement).style.color = "oklch(0.30 0.005 0)")}
        onMouseLeave={(e) => ((e.target as HTMLAnchorElement).style.color = "oklch(0.55 0.005 0)")}
      >
        ← Back to login
      </a>
    </div>
  );
}
