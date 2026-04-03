/* ============================================================
   HERO SECTION — Wild Editorial
   - Full-bleed cinematic photo (auto-rotates every 6s)
   - Massive diagonal red slash cutting across the image
   - Oversized headline at bottom-left
   - Teal used ONCE as the category label dash
   - Dot progress indicators (red active)
   - Pill CTAs
   ============================================================ */
import { useState, useEffect, useRef } from "react";

const CDN = "https://d2xsxph8kpxj0f.cloudfront.net/310519663503028182/g3pw3MRUapabcDUbhBEFxx";

const SCENES = [
  {
    img: `${CDN}/NewportAveLandcaping-13_ef32520c.jpg`,
    category: "WATER FEATURES & OUTDOOR LIVING",
    line1: "Where Every",
    line2: "Evening Feels",
    accent: "Like Home.",
    sub: "Central Oregon's premier landscaping company",
  },
  {
    img: `${CDN}/fire7_f0b582ff.jpg`,
    category: "FIRE FEATURES",
    line1: "Gather Around",
    line2: "Something",
    accent: "Beautiful.",
    sub: "Custom fire pits, fireplaces & outdoor kitchens",
  },
  {
    img: `${CDN}/ITP_7404_28389405.jpg`,
    category: "DESIGN & BUILD",
    line1: "Your Vision.",
    line2: "Our Craft.",
    accent: "Built to Last.",
    sub: "Full-service landscape design and installation",
  },
  {
    img: `${CDN}/outdoor-kitchen-water_90c45e1a.jpg`,
    category: "OUTDOOR LIVING",
    line1: "Live Outside",
    line2: "All Year",
    accent: "Long.",
    sub: "Outdoor kitchens, patios & living spaces",
  },
];

export default function HeroSection() {
  const [scene, setScene] = useState(0);
  const [fading, setFading] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const goTo = (i: number) => {
    if (i === scene || fading) return;
    setFading(true);
    setTimeout(() => {
      setScene(i);
      setFading(false);
    }, 450);
  };

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setFading(true);
      setTimeout(() => {
        setScene((s) => (s + 1) % SCENES.length);
        setFading(false);
      }, 450);
    }, 6500);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, []);

  const s = SCENES[scene];

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100vh",
        minHeight: "640px",
        overflow: "hidden",
        backgroundColor: "#080808",
      }}
    >
      {/* ── Full-bleed background photo ── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `url(${s.img})`,
          backgroundSize: "cover",
          backgroundPosition: "center 55%",
          opacity: fading ? 0 : 1,
          transition: "opacity 0.55s ease",
          filter: "brightness(0.60)",
        }}
      />

      {/* ── Gradient: heavy at bottom for text legibility ── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0.08) 0%, rgba(0,0,0,0.05) 35%, rgba(0,0,0,0.82) 100%)",
          pointerEvents: "none",
        }}
      />

      {/* ════════════════════════════════════════════════
          DIAGONAL RED SLASH — the signature element
          A glowing red line that cuts diagonally across
          the entire viewport at ~50% height
          ════════════════════════════════════════════════ */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          overflow: "hidden",
        }}
      >
        {/* Primary slash — 3px glowing red */}
        <div
          style={{
            position: "absolute",
            left: "-5%",
            top: "48%",
            width: "110%",
            height: "3px",
            backgroundColor: "oklch(0.46 0.20 25)",
            transform: "rotate(-3.5deg)",
            boxShadow:
              "0 0 12px oklch(0.46 0.20 25 / 0.8), 0 0 40px oklch(0.46 0.20 25 / 0.4), 0 0 80px oklch(0.46 0.20 25 / 0.2)",
          }}
        />
        {/* Secondary slash — thinner, offset for depth */}
        <div
          style={{
            position: "absolute",
            left: "-5%",
            top: "48%",
            width: "110%",
            height: "1px",
            backgroundColor: "oklch(0.46 0.20 25 / 0.35)",
            transform: "rotate(-3.5deg) translateY(8px)",
          }}
        />
        {/* Red corner accent — top-left triangle */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "0",
            height: "0",
            borderStyle: "solid",
            borderWidth: "120px 120px 0 0",
            borderColor: "oklch(0.46 0.20 25 / 0.12) transparent transparent transparent",
          }}
        />
      </div>

      {/* ════════════════════════════════════════════════
          CATEGORY LABEL — top left, teal accent (ONCE)
          ════════════════════════════════════════════════ */}
      <div
        style={{
          position: "absolute",
          top: "clamp(5.5rem, 10vh, 8rem)",
          left: "clamp(1.5rem, 5vw, 5rem)",
          display: "flex",
          alignItems: "center",
          gap: "0.75rem",
          opacity: fading ? 0 : 1,
          transition: "opacity 0.4s ease 0.2s",
          zIndex: 10,
        }}
      >
        {/* Teal dash — the ONE teal accent in the hero */}
        <span
          style={{
            display: "inline-block",
            width: "2.5rem",
            height: "2px",
            backgroundColor: "oklch(0.76 0.128 184.6)",
          }}
        />
        <span
          style={{
            fontFamily: "'Montserrat', sans-serif",
            fontSize: "0.55rem",
            fontWeight: 700,
            letterSpacing: "0.28em",
            color: "oklch(0.75 0.008 200)",
          }}
        >
          {s.category}
        </span>
      </div>

      {/* ════════════════════════════════════════════════
          MAIN HEADLINE — bottom left, massive type
          ════════════════════════════════════════════════ */}
      <div
        style={{
          position: "absolute",
          bottom: "clamp(5.5rem, 12vh, 9rem)",
          left: "clamp(1.5rem, 5vw, 5rem)",
          right: "clamp(1.5rem, 5vw, 5rem)",
          zIndex: 10,
          opacity: fading ? 0 : 1,
          transition: "opacity 0.45s ease 0.1s",
        }}
      >
        {/* Line 1 — bold */}
        <div
          style={{
            fontFamily: "'Cormorant Garamond', 'Playfair Display', Georgia, serif",
            fontSize: "clamp(3.8rem, 9.5vw, 10.5rem)",
            fontWeight: 700,
            lineHeight: 0.88,
            letterSpacing: "-0.035em",
            color: "oklch(0.97 0.012 75)",
          }}
        >
          {s.line1}
        </div>

        {/* Line 2 — bold */}
        <div
          style={{
            fontFamily: "'Cormorant Garamond', 'Playfair Display', Georgia, serif",
            fontSize: "clamp(3.8rem, 9.5vw, 10.5rem)",
            fontWeight: 700,
            lineHeight: 0.88,
            letterSpacing: "-0.035em",
            color: "oklch(0.97 0.012 75)",
          }}
        >
          {s.line2}
        </div>

        {/* Accent line — italic, lighter weight, slightly smaller */}
        <div
          style={{
            fontFamily: "'Cormorant Garamond', 'Playfair Display', Georgia, serif",
            fontSize: "clamp(3.2rem, 8vw, 9rem)",
            fontWeight: 300,
            fontStyle: "italic",
            lineHeight: 0.95,
            letterSpacing: "-0.01em",
            color: "oklch(0.82 0.012 75)",
            marginBottom: "2.5rem",
          }}
        >
          {s.accent}
        </div>

        {/* Sub text + CTAs */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "2rem",
            flexWrap: "wrap",
          }}
        >
          <p
            style={{
              fontFamily: "'Montserrat', sans-serif",
              fontSize: "0.58rem",
              fontWeight: 500,
              letterSpacing: "0.16em",
              color: "oklch(0.55 0.008 200)",
              textTransform: "uppercase",
              maxWidth: "200px",
              lineHeight: 1.9,
            }}
          >
            {s.sub}
          </p>

          <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
            <button
              onClick={() =>
                document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })
              }
              style={{
                fontFamily: "'Montserrat', sans-serif",
                fontSize: "0.58rem",
                fontWeight: 700,
                letterSpacing: "0.18em",
                color: "oklch(0.10 0.008 200)",
                backgroundColor: "oklch(0.97 0.012 75)",
                border: "none",
                borderRadius: "999px",
                padding: "0.9rem 2.2rem",
                cursor: "pointer",
                transition: "transform 0.2s ease, background-color 0.2s ease",
                whiteSpace: "nowrap",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.transform = "scale(1.04)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.transform = "scale(1)";
              }}
            >
              GET A FREE QUOTE +
            </button>
            <a
              href="/our-work"
              style={{
                fontFamily: "'Montserrat', sans-serif",
                fontSize: "0.58rem",
                fontWeight: 700,
                letterSpacing: "0.18em",
                color: "oklch(0.97 0.012 75)",
                backgroundColor: "transparent",
                border: "1.5px solid oklch(0.97 0.012 75 / 0.45)",
                borderRadius: "999px",
                padding: "0.9rem 2.2rem",
                cursor: "pointer",
                textDecoration: "none",
                transition: "border-color 0.2s ease, transform 0.2s ease",
                whiteSpace: "nowrap",
                display: "inline-block",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "oklch(0.97 0.012 75)";
                (e.currentTarget as HTMLElement).style.transform = "scale(1.04)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "oklch(0.97 0.012 75 / 0.45)";
                (e.currentTarget as HTMLElement).style.transform = "scale(1)";
              }}
            >
              VIEW OUR WORK →
            </a>
          </div>
        </div>
      </div>

      {/* ════════════════════════════════════════════════
          DOT PROGRESS — right edge, red active
          ════════════════════════════════════════════════ */}
      <div
        style={{
          position: "absolute",
          right: "clamp(1rem, 2vw, 1.5rem)",
          top: "50%",
          transform: "translateY(-50%)",
          zIndex: 10,
          display: "flex",
          flexDirection: "column",
          gap: "0.55rem",
        }}
      >
        {SCENES.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            style={{
              width: i === scene ? "6px" : "4px",
              height: i === scene ? "24px" : "4px",
              borderRadius: "999px",
              backgroundColor:
                i === scene
                  ? "oklch(0.46 0.20 25)" // red for active
                  : "oklch(0.35 0.008 200)",
              border: "none",
              padding: 0,
              cursor: "pointer",
              transition: "all 0.35s ease",
            }}
          />
        ))}
      </div>

      {/* ════════════════════════════════════════════════
          SCENE COUNTER — top right
          ════════════════════════════════════════════════ */}
      <div
        style={{
          position: "absolute",
          top: "clamp(5.5rem, 10vh, 8rem)",
          right: "clamp(1.5rem, 5vw, 5rem)",
          zIndex: 10,
          fontFamily: "'Montserrat', sans-serif",
          fontSize: "0.5rem",
          fontWeight: 600,
          letterSpacing: "0.2em",
          color: "oklch(0.38 0.008 200)",
        }}
      >
        {String(scene + 1).padStart(2, "0")} / {String(SCENES.length).padStart(2, "0")}
      </div>

      {/* ════════════════════════════════════════════════
          SCROLL INDICATOR — bottom center
          ════════════════════════════════════════════════ */}
      <div
        style={{
          position: "absolute",
          bottom: "1.5rem",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 10,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "0.4rem",
          opacity: 0.45,
          pointerEvents: "none",
        }}
      >
        <span
          style={{
            fontFamily: "'Montserrat', sans-serif",
            fontSize: "0.45rem",
            fontWeight: 600,
            letterSpacing: "0.3em",
            color: "oklch(0.97 0.012 75)",
          }}
        >
          SCROLL
        </span>
        <div
          style={{
            width: "1px",
            height: "2.5rem",
            background: "linear-gradient(to bottom, oklch(0.97 0.012 75 / 0.5), transparent)",
          }}
        />
      </div>
    </div>
  );
}
