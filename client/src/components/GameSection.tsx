/* ============================================================
   GAME SECTION — Lawn Mower Dash embed for homepage
   Placed below the contact form, above the footer
   ============================================================ */
import { Link } from "wouter";

export default function GameSection() {
  return (
    <section
      style={{
        backgroundColor: "oklch(0.14 0.02 140)",
        padding: "80px 0 60px",
        borderTop: "4px solid #cc2200",
      }}
    >
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 24px", textAlign: "center" }}>
        {/* Label */}
        <div
          style={{
            display: "inline-block",
            backgroundColor: "#cc2200",
            color: "#fff",
            fontWeight: 700,
            fontSize: 11,
            letterSpacing: "0.18em",
            padding: "4px 14px",
            borderRadius: 4,
            marginBottom: 20,
            textTransform: "uppercase",
          }}
        >
          🎮 Mini Game
        </div>

        {/* Headline */}
        <h2
          style={{
            color: "#fff",
            fontSize: "clamp(28px, 5vw, 48px)",
            fontWeight: 300,
            lineHeight: 1.15,
            marginBottom: 12,
            fontFamily: "var(--font-display, serif)",
          }}
        >
          Lawn Mower Dash
        </h2>

        {/* Tagline */}
        <p
          style={{
            color: "rgba(255,255,255,0.65)",
            fontSize: 16,
            maxWidth: 560,
            margin: "0 auto 32px",
            lineHeight: 1.6,
          }}
        >
          Can you survive one day at Newport Avenue Landscaping and mow your entire route?
          Beat all 4 levels to unlock a{" "}
          <strong style={{ color: "#fbbf24" }}>$100 discount code</strong>.
          Nobody beats Giant Sterling.
        </p>

        {/* Level preview chips */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: 10,
            flexWrap: "wrap",
            marginBottom: 36,
          }}
        >
          {[
            { icon: "🌊", label: "The Neighborhood", color: "#4ade80" },
            { icon: "📋", label: "The HOA Gauntlet", color: "#fbbf24" },
            { icon: "🚧", label: "Construction Site", color: "#f97316" },
            { icon: "☀️", label: "The Drought Zone", color: "#ef4444" },
          ].map((lv) => (
            <div
              key={lv.label}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                padding: "6px 14px",
                borderRadius: 8,
                backgroundColor: `${lv.color}22`,
                border: `1.5px solid ${lv.color}`,
                color: "#fff",
                fontSize: 13,
                fontWeight: 600,
              }}
            >
              <span>{lv.icon}</span>
              <span>{lv.label}</span>
            </div>
          ))}
        </div>

        {/* CTA button */}
        <Link href="/game">
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              backgroundColor: "#cc2200",
              color: "#fff",
              fontWeight: 700,
              fontSize: 18,
              padding: "16px 40px",
              borderRadius: 12,
              border: "2px solid #fbbf24",
              cursor: "pointer",
              letterSpacing: "0.04em",
              textDecoration: "none",
              transition: "transform 0.15s, box-shadow 0.15s",
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLDivElement).style.transform = "translateY(-2px)";
              (e.currentTarget as HTMLDivElement).style.boxShadow = "0 8px 24px rgba(204,34,0,0.4)";
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
              (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
            }}
          >
            ▶&nbsp; PLAY NOW — FREE
          </div>
        </Link>

        {/* Fine print */}
        <p
          style={{
            color: "rgba(255,255,255,0.3)",
            fontSize: 12,
            marginTop: 16,
          }}
        >
          Tap top/bottom to change lanes &nbsp;·&nbsp; Arrow keys on desktop &nbsp;·&nbsp; Works on mobile
        </p>
      </div>
    </section>
  );
}
