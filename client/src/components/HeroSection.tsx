/* ============================================================
   HERO SECTION — Editorial Cinematic
   Mobile-first redesign: clean, bold, inspiring
   ============================================================ */
import { useState, useEffect, useRef } from "react";

const heroStyles = `
  .hero-headline {
    font-size: clamp(2.4rem, 5.5vw, 6rem);
  }
  .hero-accent {
    font-size: clamp(2.2rem, 5vw, 5.5rem);
  }

  /* ── Mobile overrides ── */
  @media (max-width: 640px) {
    .hero-headline {
      font-size: clamp(2.4rem, 10vw, 3.2rem) !important;
      line-height: 0.95 !important;
    }
    .hero-accent {
      font-size: clamp(2.2rem, 9vw, 3rem) !important;
      line-height: 1 !important;
    }
    .hero-category-bar { display: none !important; }
    .hero-scene-counter { display: none !important; }
    .hero-service-list { display: none !important; }
    .hero-spruce { display: none !important; }
    .hero-trust-badges { display: none !important; }
    .hero-cta-row {
      flex-direction: column !important;
      align-items: flex-start !important;
      gap: 0.65rem !important;
    }
    .hero-cta-row a,
    .hero-cta-row button {
      width: 100% !important;
      text-align: center !important;
      justify-content: center !important;
      padding: 1rem 1.5rem !important;
      font-size: 0.62rem !important;
    }
    .hero-sub-text { display: none !important; }
    .hero-content-block {
      bottom: clamp(5.5rem, 12vh, 8rem) !important;
      left: 1.25rem !important;
      right: 1.25rem !important;
    }
    .hero-firewise-banner {
      flex-direction: row !important;
      align-items: center !important;
      gap: 0.6rem !important;
      padding: 0.65rem 0.9rem !important;
      margin-top: 1rem !important;
    }
    .hero-firewise-body { display: none !important; }
    .hero-firewise-title {
      font-size: 0.5rem !important;
      margin: 0 !important;
    }
    .hero-firewise-cta {
      font-size: 0.44rem !important;
      padding: 0.45rem 0.9rem !important;
      white-space: nowrap !important;
      flex-shrink: 0 !important;
    }
    .hero-dots {
      right: 0.5rem !important;
    }
    .hero-scroll-indicator { display: none !important; }
  }

  /* ── Desktop clutter reduction ── */
  @media (min-width: 641px) {
    .hero-service-list { display: none !important; }
    .hero-scene-counter { display: none !important; }
    .hero-category-bar { display: none !important; }
  }
`;

const CDN = "https://d2xsxph8kpxj0f.cloudfront.net/310519663503028182/g3pw3MRUapabcDUbhBEFxx";

const SCENES = [
  {
    img: `/manus-storage/NewportAveLandcaping-9_97b731b0_1204d3ca.webp`,
    category: "WATER FEATURES & OUTDOOR LIVING",
    line1: "Where Every",
    line2: "Evening Feels",
    accent: "Like Home.",
    sub: "Central Oregon's premier landscaping company",
  },
  {
    img: `/manus-storage/fire7_f0b582ff_56d05738.webp`,
    category: "FIRE FEATURES",
    line1: "Gather Around",
    line2: "Something",
    accent: "Beautiful.",
    sub: "Custom fire pits, fireplaces & outdoor kitchens",
  },
  {
    img: `${CDN}/facility-showroom_fd5f40e4.webp`,
    category: "DESIGN & BUILD",
    line1: "Your Vision.",
    line2: "Our Craft.",
    accent: "Built to Last.",
    sub: "Full-service landscape design and installation",
  },
  {
    img: "/manus-storage/outdoor-kitchen-water_90c45e1a_63d85a27.webp",
    category: "OUTDOOR LIVING",
    line1: "Live Outside",
    line2: "All Year",
    accent: "Long.",
    sub: "Outdoor kitchens, patios & living spaces",
  },
];

const SERVICES = [
  "Landscape Design",
  "Water Features",
  "Outdoor Kitchens",
  "Fire Features",
  "Paver Patios",
  "Irrigation",
  "Landscape Lighting",
  "Lawn Care",
  "Snow Removal",
];

/* ── Animated spruce branch SVG ────────────────────────────── */
function AnimatedSpruceBranch() {
  const [drawn, setDrawn] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setDrawn(true), 400);
    return () => clearTimeout(t);
  }, []);

  const L = 1200;

  return (
    <svg
      className="hero-spruce"
      viewBox="0 0 420 520"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        position: "absolute",
        bottom: "-40px",
        right: "-20px",
        width: "clamp(220px, 28vw, 420px)",
        height: "auto",
        pointerEvents: "none",
        zIndex: 6,
        opacity: 0.18,
      }}
    >
      <style>{`
        .branch-path {
          stroke-dasharray: ${L};
          stroke-dashoffset: ${drawn ? 0 : L};
          transition: stroke-dashoffset 3.2s cubic-bezier(0.4, 0, 0.2, 1);
        }
      `}</style>

      <path className="branch-path"
        d="M210 510 C208 440 205 370 210 300 C215 230 212 160 210 90 C209 60 210 30 210 10"
        stroke="oklch(0.92 0.06 25)" strokeWidth="3.5" fill="none" strokeLinecap="round"/>

      {[
        [480, 52, -55], [430, 64, -58], [378, 74, -60],
        [328, 80, -62], [278, 74, -64], [228, 64, -66],
        [178, 50, -68], [128, 34, -70],
      ].map(([y, len, angle], i) => {
        const rad = (angle * Math.PI) / 180;
        const ex = 210 + Math.cos(rad) * len;
        const ey = y + Math.sin(rad) * len;
        const cx1 = 210 + Math.cos(rad + 0.4) * len * 0.5;
        const cy1 = y + Math.sin(rad + 0.4) * len * 0.5;
        const delay = 0.4 + i * 0.18;
        return (
          <path key={`l${i}`} className="branch-path"
            d={`M210 ${y} Q${cx1} ${cy1} ${ex} ${ey}`}
            stroke="oklch(0.56 0.18 25)" strokeWidth="2" fill="none" strokeLinecap="round"
            style={{
              strokeDasharray: len * 2,
              strokeDashoffset: drawn ? 0 : len * 2,
              transition: `stroke-dashoffset 1.8s cubic-bezier(0.4, 0, 0.2, 1) ${delay}s`,
            }}/>
        );
      })}

      {[
        [480, 50, -125], [430, 62, -122], [378, 72, -120],
        [328, 78, -118], [278, 72, -116], [228, 62, -114],
        [178, 48, -112], [128, 32, -110],
      ].map(([y, len, angle], i) => {
        const rad = (angle * Math.PI) / 180;
        const ex = 210 + Math.cos(rad) * len;
        const ey = y + Math.sin(rad) * len;
        const cx1 = 210 + Math.cos(rad - 0.4) * len * 0.5;
        const cy1 = y + Math.sin(rad - 0.4) * len * 0.5;
        const delay = 0.5 + i * 0.18;
        return (
          <path key={`r${i}`} className="branch-path"
            d={`M210 ${y} Q${cx1} ${cy1} ${ex} ${ey}`}
            stroke="oklch(0.56 0.18 25)" strokeWidth="2" fill="none" strokeLinecap="round"
            style={{
              strokeDasharray: len * 2,
              strokeDashoffset: drawn ? 0 : len * 2,
              transition: `stroke-dashoffset 1.8s cubic-bezier(0.4, 0, 0.2, 1) ${delay}s`,
            }}/>
        );
      })}

      {[380, 330, 280, 230, 180, 130].map((y, row) => (
        [-1, 1].map((side) => {
          const baseAngle = side > 0 ? -125 : -55;
          const len = 60 + row * 2;
          const rad = (baseAngle * Math.PI) / 180;
          const delay = 1.2 + row * 0.12;
          return [0.3, 0.6, 0.9].map((t, j) => {
            const nx = 210 + Math.cos(rad) * len * t;
            const ny = y + Math.sin(rad) * len * t;
            const nRad = (baseAngle + side * 25) * Math.PI / 180;
            return (
              <line key={`n${row}${side}${j}`}
                x1={nx} y1={ny}
                x2={nx + Math.cos(nRad) * 12} y2={ny + Math.sin(nRad) * 12}
                stroke="oklch(0.56 0.18 25)" strokeWidth="1.2" strokeLinecap="round"
                style={{
                  strokeDasharray: 14,
                  strokeDashoffset: drawn ? 0 : 14,
                  transition: `stroke-dashoffset 0.8s ease ${delay + j * 0.06}s`,
                  opacity: 0.7,
                }}/>
            );
          });
        })
      ))}
    </svg>
  );
}

/* ── Staggered vertical service list ───────────────────────── */
function VerticalServiceList() {
  const [visible, setVisible] = useState<boolean[]>(SERVICES.map(() => false));

  useEffect(() => {
    SERVICES.forEach((_, i) => {
      setTimeout(() => {
        setVisible((prev) => {
          const next = [...prev];
          next[i] = true;
          return next;
        });
      }, 800 + i * 140);
    });
  }, []);

  return (
    <div
      className="hero-service-list"
      style={{
        position: "absolute",
        right: "0",
        top: "50%",
        transform: "translateY(-50%)",
        zIndex: 8,
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-end",
        gap: "0",
        pointerEvents: "none",
      }}
    >
      {SERVICES.map((svc, i) => (
        <div
          key={svc}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            padding: "0.28rem 1rem 0.28rem 0.75rem",
            opacity: visible[i] ? 1 : 0,
            transform: visible[i] ? "translateX(0)" : "translateX(20px)",
            transition: "opacity 0.5s ease, transform 0.5s ease",
          }}
        >
          <span
            style={{
              display: "inline-block",
              width: "16px",
              height: "1px",
              backgroundColor: "oklch(0.46 0.20 25)",
              flexShrink: 0,
            }}
          />
          <span
            style={{
              fontFamily: "'Montserrat', sans-serif",
              fontSize: "0.42rem",
              fontWeight: 600,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "oklch(0.72 0.005 30)",
              whiteSpace: "nowrap",
            }}
          >
            {svc}
          </span>
        </div>
      ))}
    </div>
  );
}

/* ── Main component ─────────────────────────────────────────── */
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
    const timer = setTimeout(() => {
      SCENES.slice(1).forEach((sc) => {
        const img = new window.Image();
        img.src = sc.img;
      });
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

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
      <style>{heroStyles}</style>

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
          filter: "brightness(0.78)",
        }}
      />

      {/* ── Gradient: heavy at bottom for text legibility ── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.15) 40%, rgba(0,0,0,0.72) 100%)",
          pointerEvents: "none",
        }}
      />
      {/* ── Left-side vignette to protect headline text ── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to right, rgba(0,0,0,0.62) 0%, rgba(0,0,0,0.38) 38%, rgba(0,0,0,0.05) 62%, rgba(0,0,0,0.0) 100%)",
          pointerEvents: "none",
        }}
      />

      {/* ── Animated botanical spruce drawing — bottom right (desktop only) ── */}
      <AnimatedSpruceBranch />

      {/* ── Category bar + EST year — desktop only ── */}
      <div
        className="hero-category-bar"
        style={{
          position: "absolute",
          top: "clamp(16rem, 22vh, 20rem)",
          left: "clamp(1.5rem, 5vw, 5rem)",
          right: "clamp(1.5rem, 5vw, 5rem)",
          zIndex: 10,
          display: "flex",
          alignItems: "center",
          gap: "1.2rem",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.75rem",
            opacity: fading ? 0 : 1,
            transition: "opacity 0.4s ease 0.2s",
          }}
        >
          <span
            style={{
              display: "inline-block",
              width: "2.5rem",
              height: "2px",
              backgroundColor: "oklch(0.56 0.18 25)",
            }}
          />
          <span
            style={{
              fontFamily: "'Montserrat', sans-serif",
              fontSize: "0.55rem",
              fontWeight: 700,
              letterSpacing: "0.28em",
              color: "oklch(0.75 0.008 30)",
            }}
          >
            {s.category}
          </span>
        </div>
        <div
          style={{
            flex: 1,
            height: "1px",
            background: "linear-gradient(to right, oklch(0.45 0.008 30 / 0.4), transparent)",
          }}
        />
        <span
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontStyle: "italic",
            fontSize: "0.6rem",
            letterSpacing: "0.2em",
            color: "oklch(0.72 0.008 30)",
          }}
        >
          Est. 2005
        </span>
      </div>

      {/* ── Vertical service list — desktop only ── */}
      <VerticalServiceList />

      {/* ── Main headline + CTAs ── */}
      <div
        className="hero-content-block"
        style={{
          position: "absolute",
          top: "260px",
          left: "clamp(1.5rem, 5vw, 5rem)",
          right: "clamp(1.5rem, 5vw, 55%)",
          zIndex: 10,
          opacity: fading ? 0 : 1,
          transition: "opacity 0.45s ease 0.1s",
        }}
      >
        <h1
          style={{
            fontFamily: "'Cormorant Garamond', 'Playfair Display', Georgia, serif",
            fontWeight: 700,
            lineHeight: 0.92,
            letterSpacing: "-0.035em",
            color: "oklch(0.97 0.012 75)",
            margin: 0,
            padding: 0,
            textShadow: "0 2px 16px rgba(0,0,0,0.9), 0 1px 6px rgba(0,0,0,0.95)",
          }}
          className="hero-headline"
        >
          {s.line1}
        </h1>

        <div
          className="hero-headline"
          style={{
            fontFamily: "'Cormorant Garamond', 'Playfair Display', Georgia, serif",
            fontWeight: 700,
            lineHeight: 0.92,
            letterSpacing: "-0.035em",
            color: "oklch(0.97 0.012 75)",
            textShadow: "0 2px 16px rgba(0,0,0,0.9), 0 1px 6px rgba(0,0,0,0.95)",
          }}
        >
          {s.line2}
        </div>

        <div
          className="hero-accent"
          style={{
            fontFamily: "'Cormorant Garamond', 'Playfair Display', Georgia, serif",
            fontWeight: 300,
            fontStyle: "italic",
            lineHeight: 0.95,
            letterSpacing: "-0.01em",
            color: "oklch(0.95 0.012 75)",
            marginBottom: "1.4rem",
            textShadow: "0 2px 14px rgba(0,0,0,0.9), 0 1px 6px rgba(0,0,0,0.95)",
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
            className="hero-sub-text"
            style={{
              fontFamily: "'Montserrat', sans-serif",
              fontSize: "0.55rem",
              fontWeight: 600,
              letterSpacing: "0.16em",
              color: "oklch(0.82 0.008 75)",
              textTransform: "uppercase",
              maxWidth: "200px",
              lineHeight: 1.9,
              textShadow: "0 1px 4px rgba(0,0,0,0.6)",
            }}
          >
            {s.sub}
          </p>

          <div className="hero-cta-row" style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
            <button
              onClick={() => { window.location.href = "/quote"; }}
              style={{
                fontFamily: "'Montserrat', sans-serif",
                fontSize: "0.58rem",
                fontWeight: 700,
                letterSpacing: "0.18em",
                color: "oklch(0.10 0.008 30)",
                backgroundColor: "oklch(0.97 0.012 75)",
                border: "none",
                borderRadius: "1.8rem 0.2rem 1.8rem 0.2rem",
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
                borderRadius: "1.8rem 0.2rem 1.8rem 0.2rem",
                padding: "0.9rem 2.2rem",
                cursor: "pointer",
                textDecoration: "none",
                transition: "border-color 0.2s ease, transform 0.2s ease",
                whiteSpace: "nowrap",
                display: "inline-flex",
                alignItems: "center",
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

          {/* Trust badges — desktop only */}
          <div
            className="hero-trust-badges"
            style={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              gap: "1.25rem",
              marginTop: "1.5rem",
            }}
          >
            <span
              style={{
                fontFamily: "'Montserrat', sans-serif",
                fontSize: "0.46rem",
                fontWeight: 700,
                letterSpacing: "0.18em",
                color: "oklch(0.85 0.18 85)",
                textShadow: "0 1px 6px rgba(0,0,0,0.8)",
              }}
            >
              ⚡ BOOKING SPRING — SCHEDULE FILLS FAST
            </span>
            <span style={{ width: "1px", height: "10px", backgroundColor: "oklch(0.65 0.008 30)" }} />
            {["LICENSED & BONDED", "LCB #9153", "21+ YEARS", "FREE ESTIMATES"].map((badge) => (
              <span
                key={badge}
                style={{
                  fontFamily: "'Montserrat', sans-serif",
                  fontSize: "0.44rem",
                  fontWeight: 600,
                  letterSpacing: "0.14em",
                  color: "oklch(0.82 0.008 30)",
                }}
              >
                {badge}
              </span>
            ))}
          </div>

          {/* ── Firewise Assessment CTA ── */}
          <div
            className="hero-firewise-banner"
            style={{
              marginTop: "1.75rem",
              display: "flex",
              alignItems: "center",
              gap: "1rem",
              flexWrap: "wrap",
              background: "oklch(0.18 0.015 25 / 0.75)",
              border: "1px solid oklch(0.55 0.20 25 / 0.6)",
              borderLeft: "3px solid oklch(0.55 0.20 25)",
              borderRadius: "0.25rem",
              padding: "0.75rem 1.25rem",
              backdropFilter: "blur(4px)",
              maxWidth: "560px",
            }}
          >
            <span style={{ fontSize: "1.1rem", flexShrink: 0 }}>🔥</span>
            <div style={{ flex: 1, minWidth: 0 }}>
              <p
                className="hero-firewise-title"
                style={{
                  fontFamily: "'Montserrat', sans-serif",
                  fontSize: "0.52rem",
                  fontWeight: 700,
                  letterSpacing: "0.14em",
                  color: "oklch(0.92 0.06 25)",
                  margin: "0 0 0.2rem",
                  textTransform: "uppercase",
                }}
              >
                NEW — Deschutes County R327 Fire Hardening Now Required
              </p>
              <p
                className="hero-firewise-body"
                style={{
                  fontFamily: "'Montserrat', sans-serif",
                  fontSize: "0.48rem",
                  fontWeight: 400,
                  color: "oklch(0.72 0.012 30)",
                  margin: 0,
                  lineHeight: 1.6,
                }}
              >
                Is your property compliant? We assess, remove hazardous vegetation, and replant with fire-resistant species.
              </p>
            </div>
            <a
              className="hero-firewise-cta"
              href="/services/firewise-landscaping"
              style={{
                fontFamily: "'Montserrat', sans-serif",
                fontSize: "0.48rem",
                fontWeight: 700,
                letterSpacing: "0.14em",
                color: "oklch(0.97 0.01 75)",
                backgroundColor: "oklch(0.55 0.20 25)",
                border: "none",
                borderRadius: "1.8rem 0.2rem 1.8rem 0.2rem",
                padding: "0.6rem 1.4rem",
                cursor: "pointer",
                textDecoration: "none",
                whiteSpace: "nowrap",
                display: "inline-flex",
                alignItems: "center",
                transition: "transform 0.2s ease",
                flexShrink: 0,
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.transform = "scale(1.04)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.transform = "scale(1)"; }}
            >
              GET FIREWISE ASSESSMENT →
            </a>
          </div>
        </div>
      </div>

      {/* ── Dot progress — right edge ── */}
      <div
        className="hero-dots"
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
              width: "44px",
              height: "44px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "none",
              border: "none",
              padding: 0,
              cursor: "pointer",
            }}
            aria-label={`Go to slide ${i + 1}`}
          >
            <span
              style={{
                display: "block",
                width: i === scene ? "6px" : "4px",
                height: i === scene ? "24px" : "4px",
                borderRadius: "999px",
                backgroundColor:
                  i === scene
                    ? "oklch(0.92 0.06 25)"
                    : "oklch(0.65 0.008 30)",
                transition: "all 0.35s ease",
              }}
            />
          </button>
        ))}
      </div>

      {/* ── Scene counter — desktop only ── */}
      <div
        className="hero-scene-counter"
        style={{
          position: "absolute",
          top: "clamp(16rem, 22vh, 20rem)",
          right: "clamp(1.5rem, 5vw, 5rem)",
          zIndex: 10,
          fontFamily: "'Montserrat', sans-serif",
          fontSize: "0.5rem",
          fontWeight: 600,
          letterSpacing: "0.2em",
          color: "oklch(0.75 0.008 30)",
        }}
        aria-label={`Slide ${scene + 1} of ${SCENES.length}`}
      >
        {String(scene + 1).padStart(2, "0")} / {String(SCENES.length).padStart(2, "0")}
      </div>

      {/* ── Scroll indicator — desktop only ── */}
      <div
        className="hero-scroll-indicator"
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
