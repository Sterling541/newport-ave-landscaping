/* ============================================================
   CTA BANNER — Colossal-Inspired Full-Bleed Editorial
   Features:
   - Section number label (05) with thin rule
   - Massive bleed headline that nearly fills the viewport
   - Cinematic full-bleed aerial image
   - Pill CTA buttons
   - Scroll-triggered reveal
   ============================================================ */
import { useEffect, useRef, useState } from "react";

const FACILITY_SHOWROOM =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663503028182/g3pw3MRUapabcDUbhBEFxx/facility-aerial2_d22fc996.webp";

export default function CTABanner() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className="relative overflow-hidden"
      style={{ minHeight: "90vh", display: "flex", flexDirection: "column", justifyContent: "flex-end" }}
    >
      {/* Background image */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url(${FACILITY_SHOWROOM})`,
          backgroundSize: "cover",
          backgroundPosition: "center 40%",
        }}
      />

      {/* Gradient overlay — darker at bottom for text legibility */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(0deg, oklch(0.06 0.012 155 / 0.95) 0%, oklch(0.06 0.012 155 / 0.55) 50%, oklch(0.06 0.012 155 / 0.15) 100%)",
        }}
      />

      {/* Content — pinned to bottom */}
      <div
        className="container relative z-10"
        style={{ paddingBottom: "clamp(3rem, 7vw, 6rem)", paddingTop: "clamp(6rem, 15vw, 12rem)" }}
      >
        {/* Section label */}
        <div
          className="flex items-center gap-4 mb-12"
          style={{
            opacity: visible ? 1 : 0,
            transition: "opacity 0.8s ease",
          }}
        >
          <span className="font-label" style={{ fontSize: "0.65rem", letterSpacing: "0.18em", color: "oklch(0.46 0.20 25)", fontWeight: 700 }}>05</span>
          <span className="flex-1 h-px" style={{ backgroundColor: "oklch(0.30 0.020 155 / 0.6)" }} />
          <span className="font-label" style={{ fontSize: "0.60rem", letterSpacing: "0.18em", color: "oklch(0.65 0.020 155)" }}>GET STARTED</span>
        </div>

        {/* Massive bleed headline */}
        <div
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(40px)",
            transition: "opacity 0.9s ease 0.1s, transform 0.9s ease 0.1s",
          }}
        >
          <h2
            className="font-display font-light"
            style={{
              fontSize: "clamp(3.5rem, 10vw, 10rem)",
              lineHeight: 0.88,
              letterSpacing: "-0.04em",
              color: "oklch(0.97 0 0)",
              marginBottom: "clamp(1.5rem, 3vw, 2.5rem)",
            }}
          >
            Ready to fall
            <br />
            in love with{" "}
            <em
              style={{
                color: "oklch(0.80 0.14 25)",
                fontStyle: "italic",
                fontWeight: 300,
              }}
            >
              your yard?
            </em>
          </h2>
        </div>

        {/* Body + CTAs in two-column */}
        <div
          className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-8 items-end"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(24px)",
            transition: "opacity 0.85s ease 0.28s, transform 0.85s ease 0.28s",
          }}
        >
          <p
            className="font-body"
            style={{
              fontSize: "clamp(1rem, 1.8vw, 1.2rem)",
              color: "oklch(0.82 0.005 0)",
              maxWidth: "520px",
              lineHeight: 1.75,
              fontWeight: 300,
            }}
          >
            From a weekend patio project to a full outdoor transformation,
            our team of 150+ local professionals is ready to make it happen.
            Let's start with a free conversation about your space.
          </p>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={() =>
                document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })
              }
              className="font-label flex items-center gap-2 transition-all duration-250"
              style={{
                backgroundColor: "oklch(0.46 0.20 25)",
                color: "oklch(1 0 0)",
                padding: "0.85rem 2rem",
                borderRadius: "999px",
                border: "none",
                fontSize: "0.65rem",
                letterSpacing: "0.15em",
                whiteSpace: "nowrap",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "oklch(0.38 0.22 25)")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "oklch(0.46 0.20 25)")}
            >
              START YOUR PROJECT +
            </button>
            <a
              href="tel:5416178873"
              className="font-label flex items-center gap-2 transition-all duration-250"
              style={{
                backgroundColor: "transparent",
                color: "oklch(0.97 0 0)",
                padding: "0.85rem 2rem",
                borderRadius: "999px",
                border: "1px solid oklch(0.55 0.010 155)",
                fontSize: "0.65rem",
                letterSpacing: "0.15em",
                whiteSpace: "nowrap",
                textDecoration: "none",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.borderColor = "oklch(0.80 0.14 25)";
                (e.currentTarget as HTMLAnchorElement).style.color = "oklch(0.80 0.14 25)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.borderColor = "oklch(0.55 0.010 155)";
                (e.currentTarget as HTMLAnchorElement).style.color = "oklch(0.97 0 0)";
              }}
            >
              CALL (541) 617-8873 →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
