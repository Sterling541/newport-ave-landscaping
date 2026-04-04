/* ============================================================
   HERO SECTION — Editorial Cinematic
   
   Unique elements replacing the diagonal ticker:
   
   1. ANIMATED BOTANICAL DRAWING — a spruce branch SVG that
      draws itself with stroke-dashoffset animation when the
      hero loads. Positioned bottom-right, semi-transparent.
      Feels like a hand-drawn illustration being sketched live.
   
   2. VERTICAL SERVICE SIDEBAR — a slim right-edge panel with
      a vertical list of service names that stagger-fade in.
      Rotated 90deg, reads bottom-to-top. Very editorial.
   
   3. HORIZONTAL RULE + YEAR — a thin line with "EST. 2003"
      that draws in from left. Architectural detail.
   ============================================================ */
import { useState, useEffect, useRef } from "react";

const CDN = "https://d2xsxph8kpxj0f.cloudfront.net/310519663503028182/g3pw3MRUapabcDUbhBEFxx";

const SCENES = [
  {
    img: `${CDN}/NewportAveLandcaping-9_97b731b0.jpg`,
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
    img: `${CDN}/ITP_7558_e52a40c9.jpg`,
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

  // Total approximate path length — used for stroke-dasharray
  const L = 1200;

  return (
    <svg
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

      {/* Main branch stem */}
      <path className="branch-path"
        d="M210 510 C208 440 205 370 210 300 C215 230 212 160 210 90 C209 60 210 30 210 10"
        stroke="oklch(0.92 0.06 25)" strokeWidth="3.5" fill="none" strokeLinecap="round"/>

      {/* Left pinnae — large fronds */}
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

      {/* Right pinnae */}
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

      {/* Needle clusters on each pinna */}
      {[380, 330, 280, 230, 180, 130].map((y, row) => (
        [-1, 1].map((side) => {
          const baseAngle = side > 0 ? -125 : -55;
          const len = 60 + row * 2;
          const rad = (baseAngle * Math.PI) / 180;
          const bx = 210 + Math.cos(rad) * len * 0.6;
          const by = y + Math.sin(rad) * len * 0.6;
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
          filter: "brightness(0.58)",
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

      {/* ── Animated botanical spruce drawing — bottom right ── */}
      <AnimatedSpruceBranch />

      {/* ── Thin horizontal rule + EST year — architectural detail ── */}
      <div
        style={{
          position: "absolute",
          top: "clamp(5.5rem, 10vh, 8rem)",
          left: "clamp(1.5rem, 5vw, 5rem)",
          right: "clamp(1.5rem, 5vw, 5rem)",
          zIndex: 10,
          display: "flex",
          alignItems: "center",
          gap: "1.2rem",
        }}
      >
        {/* Category label */}
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

        {/* Expanding rule line */}
        <div
          style={{
            flex: 1,
            height: "1px",
            background: "linear-gradient(to right, oklch(0.45 0.008 30 / 0.4), transparent)",
          }}
        />

        {/* EST year */}
        <span
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontStyle: "italic",
            fontSize: "0.6rem",
            letterSpacing: "0.2em",
            color: "oklch(0.42 0.008 30)",
          }}
        >
          Est. 2003
        </span>
      </div>

      {/* ── Main headline — bottom left, massive type ── */}
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
              fontSize: "0.5rem",
              fontWeight: 500,
              letterSpacing: "0.16em",
              color: "oklch(0.55 0.008 30)",
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

          {/* Trust badges + urgency */}
          <div
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
                color: "oklch(0.46 0.20 25)",
              }}
            >
              ⚡ BOOKING SPRING — SCHEDULE FILLS FAST
            </span>
            <span style={{ width: "1px", height: "10px", backgroundColor: "oklch(0.35 0.008 30)" }} />
            {["LICENSED & BONDED", "LCB #9153", "21+ YEARS", "FREE ESTIMATES"].map((badge) => (
              <span
                key={badge}
                style={{
                  fontFamily: "'Montserrat', sans-serif",
                  fontSize: "0.44rem",
                  fontWeight: 600,
                  letterSpacing: "0.14em",
                  color: "oklch(0.55 0.008 30)",
                }}
              >
                {badge}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ── Dot progress — right edge ── */}
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
                  ? "oklch(0.92 0.06 25)"
                  : "oklch(0.35 0.008 30)",
              border: "none",
              padding: 0,
              cursor: "pointer",
              transition: "all 0.35s ease",
            }}
          />
        ))}
      </div>

      {/* ── Scene counter — top right ── */}
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
          color: "oklch(0.38 0.008 30)",
        }}
      >
        {String(scene + 1).padStart(2, "0")} / {String(SCENES.length).padStart(2, "0")}
      </div>

      {/* ── Scroll indicator — bottom center ── */}
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
