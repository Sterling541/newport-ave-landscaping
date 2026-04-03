/* ============================================================
   MEMBERSHIP BANNER — Exact match to original newportavelandscaping.com

   Layout:
   - Full-width banner, ~380px tall
   - Warm golden-hour sprinkler lawn photo as background (bright, NO dark overlay)
   - Large transparent badge centered-left, floating above photo
   - Bold white all-caps headline right: "NEWPORT PRIORITY IRRIGATION MEMBERSHIP:"
   - White subtitle: "Never Worry About Your Sprinklers Again"
   - Single red rounded "SIGN UP TODAY" button
   ============================================================ */
import { useLocation } from "wouter";

const BADGE_URL =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663503028182/g3pw3MRUapabcDUbhBEFxx/priority-badge-original_c531517d.png";

const BG_URL =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663503028182/g3pw3MRUapabcDUbhBEFxx/sprinkler-bg2_c113104f.jpg";

export default function MembershipBanner() {
  const [, navigate] = useLocation();

  return (
    <section
      style={{
        position: "relative",
        width: "100%",
        minHeight: "clamp(280px, 32vw, 420px)",
        overflow: "hidden",
        backgroundColor: "#c8a96e",
      }}
    >
      {/* ── Background: bright warm sprinkler photo, NO dark overlay ── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `url(${BG_URL})`,
          backgroundSize: "cover",
          backgroundPosition: "center 40%",
          backgroundRepeat: "no-repeat",
        }}
      />

      {/* Very subtle vignette only on far edges to keep it bright */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to right, rgba(0,0,0,0.18) 0%, rgba(0,0,0,0) 30%, rgba(0,0,0,0) 60%, rgba(0,0,0,0.22) 100%)",
          pointerEvents: "none",
        }}
      />

      {/* ── Content row ── */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          gap: "clamp(24px, 5vw, 80px)",
          padding: "clamp(24px, 4vw, 48px) clamp(24px, 6vw, 80px)",
          minHeight: "clamp(280px, 32vw, 420px)",
          flexWrap: "wrap",
        }}
      >
        {/* ── LEFT: Large floating badge ── */}
        <div
          style={{
            flexShrink: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            filter: "drop-shadow(0 8px 32px rgba(0,0,0,0.55)) drop-shadow(0 2px 8px rgba(0,0,0,0.40))",
          }}
        >
          <img
            src={BADGE_URL}
            alt="Newport Avenue Priority Irrigation Membership Badge"
            style={{
              width: "clamp(260px, 34vw, 480px)",
              height: "auto",
              display: "block",
            }}
          />
        </div>

        {/* ── RIGHT: Headline + subtitle + CTA ── */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: "clamp(10px, 1.5vw, 18px)",
            maxWidth: "520px",
          }}
        >
          {/* Bold all-caps headline — matches old site exactly */}
          <h2
            style={{
              fontFamily: "'Montserrat', 'Inter', sans-serif",
              fontWeight: 900,
              fontSize: "clamp(1.6rem, 3.8vw, 3rem)",
              lineHeight: 1.05,
              letterSpacing: "0.01em",
              color: "#ffffff",
              textTransform: "uppercase",
              textShadow: "0 2px 12px rgba(0,0,0,0.55), 0 1px 4px rgba(0,0,0,0.40)",
              margin: 0,
            }}
          >
            Become a:<br />
            Priority Irrigation<br />
            Member Today
          </h2>

          {/* Subtitle */}
          <p
            style={{
              fontFamily: "'Montserrat', 'Inter', sans-serif",
              fontWeight: 700,
              fontSize: "clamp(0.95rem, 1.8vw, 1.35rem)",
              color: "#ffffff",
              textShadow: "0 1px 8px rgba(0,0,0,0.55)",
              margin: 0,
              letterSpacing: "0.01em",
            }}
          >
            Never Worry About Your Sprinklers Again
          </p>

          {/* Price callout */}
          <p
            style={{
              fontFamily: "'Montserrat', 'Inter', sans-serif",
              fontWeight: 900,
              fontSize: "clamp(1.1rem, 2.2vw, 1.7rem)",
              color: "#FFD700",
              textShadow: "0 2px 10px rgba(0,0,0,0.6)",
              margin: 0,
              letterSpacing: "0.02em",
            }}
          >
            $33 / month
          </p>

          {/* Red CTA button — matches old site */}
          <button
            onClick={() => {
              navigate("/contact");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            style={{
              marginTop: "clamp(4px, 0.8vw, 10px)",
              backgroundColor: "oklch(0.48 0.22 25)",
              color: "#ffffff",
              fontFamily: "'Montserrat', 'Inter', sans-serif",
              fontWeight: 800,
              fontSize: "clamp(0.75rem, 1.2vw, 0.9rem)",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              padding: "clamp(10px, 1.2vw, 14px) clamp(24px, 3vw, 40px)",
              borderRadius: "999px",
              border: "none",
              cursor: "pointer",
              boxShadow: "0 4px 20px rgba(0,0,0,0.35)",
              transition: "background 0.2s, transform 0.15s",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.backgroundColor = "oklch(0.42 0.22 25)";
              (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-1px)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.backgroundColor = "oklch(0.48 0.22 25)";
              (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)";
            }}
          >
            SIGN UP TODAY
          </button>
        </div>
      </div>
    </section>
  );
}
