/* ============================================================
   CTA BANNER — Wild Editorial Full-Bleed
   - Full-viewport-height cinematic photo
   - Massive type that bleeds off the edges
   - "TRANSFORM" printed huge, wraps across multiple lines
   - Red accents only, NO teal
   ============================================================ */
import { useEffect, useRef, useState } from "react";

const HERO_IMG =
  "/manus-storage/GLLPatio2_4916fcde_95c74f23.webp";

export default function CTABanner() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      style={{
        position: "relative",
        height: "90vh",
        minHeight: "600px",
        overflow: "hidden",
        display: "flex",
        alignItems: "flex-end",
      }}
    >
      {/* ── Full-bleed photo ── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `url(${HERO_IMG})`,
          backgroundSize: "cover",
          backgroundPosition: "center 40%",
          filter: "brightness(0.35)",
          transform: visible ? "scale(1.04)" : "scale(1.0)",
          transition: "transform 1.8s ease",
        }}
      />

      {/* ── Dark gradient overlay ── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(0deg, oklch(0 0 0 / 0.90) 0%, oklch(0 0 0 / 0.30) 55%, transparent 100%)",
        }}
      />

      {/* ── Content ── */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          width: "100%",
          padding: "0 clamp(1.5rem, 5vw, 5rem) clamp(3rem, 6vw, 5rem)",
        }}
      >
        {/* Section label */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.75rem",
            marginBottom: "2rem",
            opacity: visible ? 1 : 0,
            transition: "opacity 0.8s ease 0.1s",
          }}
        >
          <span
            style={{
              fontFamily: "'Montserrat', sans-serif",
              fontSize: "0.5rem",
              fontWeight: 700,
              letterSpacing: "0.3em",
              color: "oklch(0.46 0.20 25)",
            }}
          >
            05
          </span>
          <span
            style={{
              width: "2rem",
              height: "1px",
              backgroundColor: "oklch(0.14 0.006 30)",
              display: "block",
            }}
          />
          <span
            style={{
              fontFamily: "'Montserrat', sans-serif",
              fontSize: "0.5rem",
              fontWeight: 600,
              letterSpacing: "0.25em",
              color: "oklch(0.35 0.008 30)",
            }}
          >
            START YOUR PROJECT
          </span>
        </div>

        {/* Massive bleed headline */}
        <div style={{ overflow: "visible", marginLeft: "-0.25rem" }}>
          <h2
            style={{
              fontFamily: "'Montserrat', sans-serif",
              fontSize: "clamp(4rem, 14vw, 15rem)",
              fontWeight: 900,
              lineHeight: 0.85,
              letterSpacing: "-0.05em",
              color: "oklch(0.97 0.012 75)",
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(60px)",
              transition: "opacity 0.9s ease 0.2s, transform 0.9s ease 0.2s",
              whiteSpace: "nowrap",
            }}
          >
            TRANSFORM
          </h2>
          <h2
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: "clamp(3rem, 11vw, 12rem)",
              fontWeight: 300,
              fontStyle: "italic",
              lineHeight: 0.92,
              letterSpacing: "-0.03em",
              color: "oklch(0.72 0.008 30)",
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(60px)",
              transition: "opacity 0.9s ease 0.35s, transform 0.9s ease 0.35s",
            }}
          >
            your outdoor space.
          </h2>
        </div>

        {/* CTA row */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "2rem",
            marginTop: "3rem",
            flexWrap: "wrap",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(24px)",
            transition: "opacity 0.8s ease 0.55s, transform 0.8s ease 0.55s",
          }}
        >
          <button
            onClick={() =>
              document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })
            }
            style={{
              fontFamily: "'Montserrat', sans-serif",
              fontSize: "0.58rem",
              fontWeight: 700,
              letterSpacing: "0.18em",
              color: "oklch(0.97 0.012 75)",
              backgroundColor: "oklch(0.46 0.20 25)",
              border: "none",
              borderRadius: "1.8rem 0.2rem 1.8rem 0.2rem",
              padding: "1rem 2.5rem",
              cursor: "pointer",
              transition: "background-color 0.3s ease, transform 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "oklch(0.38 0.20 25)";
              e.currentTarget.style.transform = "scale(1.04)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "oklch(0.46 0.20 25)";
              e.currentTarget.style.transform = "scale(1)";
            }}
          >
            GET A FREE QUOTE +
          </button>

          <a
            href="tel:5416178873"
            style={{
              fontFamily: "'Montserrat', sans-serif",
              fontSize: "0.58rem",
              fontWeight: 600,
              letterSpacing: "0.12em",
              color: "oklch(0.55 0.008 30)",
              textDecoration: "none",
            }}
          >
            OR CALL (541) 617-8873
          </a>
        </div>

        {/* Urgency + trust strip */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            gap: "1.5rem",
            marginTop: "1.5rem",
            opacity: visible ? 1 : 0,
            transition: "opacity 0.8s ease 0.75s",
          }}
        >
          <span
            style={{
              fontFamily: "'Montserrat', sans-serif",
              fontSize: "0.5rem",
              fontWeight: 600,
              letterSpacing: "0.15em",
              color: "oklch(0.46 0.20 25)",
            }}
          >
            ⚡ BOOKING SPRING — SCHEDULE FILLS FAST
          </span>
          <span style={{ width: "1px", height: "12px", backgroundColor: "oklch(0.30 0.005 0)" }} />
          <span style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "0.48rem", letterSpacing: "0.12em", color: "oklch(0.40 0.005 0)" }}>LICENSED & BONDED</span>
          <span style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "0.48rem", letterSpacing: "0.12em", color: "oklch(0.40 0.005 0)" }}>LCB #9153</span>
          <span style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "0.48rem", letterSpacing: "0.12em", color: "oklch(0.40 0.005 0)" }}>21+ YEARS IN CENTRAL OREGON</span>
          <span style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "0.48rem", letterSpacing: "0.12em", color: "oklch(0.40 0.005 0)" }}>FREE ESTIMATES</span>
        </div>
      </div>
    </section>
  );
}
