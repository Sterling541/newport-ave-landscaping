/* ============================================================
   EDITORIAL INTRO — Colossal-Inspired Section 01
   Features:
   - "SECTION 01" label pill with horizontal rule
   - Halftone dot circle graphic (left side)
   - Massive stacked headline that bleeds right
   - Two-column split: bold statement left, body + stats right
   - Thin vertical rule between columns
   - Animated counter stats
   - Scroll-triggered reveal
   ============================================================ */
import { useEffect, useRef, useState } from "react";

function useCountUp(target: number, duration = 1800, start = false) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setValue(Math.floor(progress * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [start, target, duration]);
  return value;
}

export default function StatsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.12 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const years = useCountUp(21, 1400, visible);
  const projects = useCountUp(10000, 2000, visible);
  const team = useCountUp(150, 1600, visible);

  return (
    <section
      ref={ref}
      style={{
        backgroundColor: "oklch(0.10 0.008 200)",
        paddingTop: "clamp(8rem, 14vw, 13rem)", // Extra top padding to clear the hero photo bleed
        paddingBottom: "clamp(5rem, 10vw, 9rem)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* ── Halftone dot circle — left decorative ── */}
      <div
        style={{
          position: "absolute",
          left: "-120px",
          top: "50%",
          transform: "translateY(-50%)",
          width: "500px",
          height: "500px",
          borderRadius: "50%",
          backgroundImage: "radial-gradient(circle, oklch(0.46 0.20 25 / 0.30) 1.5px, transparent 1.5px)",
          backgroundSize: "16px 16px",
          pointerEvents: "none",
          opacity: visible ? 1 : 0,
          transition: "opacity 1.2s ease",
        }}
      />

      <div className="container" style={{ position: "relative", zIndex: 1 }}>
        {/* ── Section label ── */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "1rem",
            marginBottom: "3rem",
            opacity: visible ? 1 : 0,
            transition: "opacity 0.8s ease",
          }}
        >
          <span
            style={{
              fontFamily: "'Montserrat', sans-serif",
              fontSize: "0.58rem",
              fontWeight: 700,
              letterSpacing: "0.22em",
              color: "oklch(0.76 0.128 184.6)",
            }}
          >
            01
          </span>
          <span
            style={{
              flex: 1,
              height: "1px",
              backgroundColor: "oklch(0.22 0.008 200)",
            }}
          />
          <span
            style={{
              fontFamily: "'Montserrat', sans-serif",
              fontSize: "0.58rem",
              fontWeight: 600,
              letterSpacing: "0.22em",
              color: "oklch(0.40 0.008 200)",
            }}
          >
            WHO WE ARE
          </span>
        </div>

        {/* ── Two-column editorial split ── */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1px 1fr",
            gap: "0 3rem",
            alignItems: "start",
          }}
        >
          {/* LEFT: Massive bleed headline */}
          <div
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(40px)",
              transition: "opacity 0.9s ease 0.1s, transform 0.9s ease 0.1s",
            }}
          >
            <h2
              style={{
                fontFamily: "'Cormorant Garamond', 'Playfair Display', Georgia, serif",
                fontSize: "clamp(3rem, 6.5vw, 7rem)",
                fontWeight: 700,
                lineHeight: 0.88,
                letterSpacing: "-0.04em",
                color: "oklch(0.97 0.012 75)",
                marginBottom: "0.5rem",
              }}
            >
              Your yard
              <br />
              should feel like
              <br />
              <em
                style={{
                  fontStyle: "italic",
                  fontWeight: 300,
                  color: "oklch(0.76 0.128 184.6)",
                  letterSpacing: "0.01em",
                }}
              >
                the best part
                <br />
                of your home.
              </em>
            </h2>
          </div>

          {/* Vertical rule */}
          <div style={{ backgroundColor: "oklch(0.22 0.008 200)", alignSelf: "stretch" }} />

          {/* RIGHT: Body + stats */}
          <div
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(40px)",
              transition: "opacity 0.9s ease 0.25s, transform 0.9s ease 0.25s",
              paddingTop: "0.5rem",
            }}
          >
            <p
              style={{
                fontFamily: "'Source Serif 4', Georgia, serif",
                fontSize: "clamp(1rem, 1.5vw, 1.1rem)",
                lineHeight: 1.85,
                color: "oklch(0.58 0.008 200)",
                fontWeight: 300,
                marginBottom: "3rem",
                maxWidth: "480px",
              }}
            >
              We've been transforming Central Oregon properties since 2003 —
              designing, building, and maintaining landscapes that families
              actually live in. Whether it's a backyard retreat, a water feature,
              or a full outdoor kitchen, we bring the same craft and care to every
              single project.
            </p>

            {/* Stats grid */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "0",
                marginBottom: "3rem",
              }}
            >
              {[
                { value: `${years}+`, label: "Years in Central Oregon" },
                { value: `${projects.toLocaleString()}+`, label: "Projects Completed" },
                { value: `${team}+`, label: "Skilled Team Members" },
                { value: "5 ★", label: "Rated by Happy Clients" },
              ].map((stat, i) => (
                <div
                  key={i}
                  style={{
                    padding: "1.5rem 0",
                    borderTop: "1px solid oklch(0.22 0.008 200)",
                    borderRight: i % 2 === 0 ? "1px solid oklch(0.22 0.008 200)" : "none",
                    paddingLeft: i % 2 === 0 ? "0" : "1.5rem",
                    paddingRight: i % 2 === 0 ? "1.5rem" : "0",
                    opacity: visible ? 1 : 0,
                    transform: visible ? "translateY(0)" : "translateY(16px)",
                    transition: `opacity 0.7s ease ${0.35 + i * 0.08}s, transform 0.7s ease ${0.35 + i * 0.08}s`,
                  }}
                >
                  <div
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: "clamp(2rem, 3.5vw, 3rem)",
                      fontWeight: 700,
                      lineHeight: 1,
                      color: "oklch(0.76 0.128 184.6)",
                      letterSpacing: "-0.02em",
                      marginBottom: "0.4rem",
                    }}
                  >
                    {stat.value}
                  </div>
                  <div
                    style={{
                      fontFamily: "'Montserrat', sans-serif",
                      fontSize: "0.55rem",
                      fontWeight: 600,
                      letterSpacing: "0.18em",
                      textTransform: "uppercase",
                      color: "oklch(0.38 0.008 200)",
                    }}
                  >
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
              <button
                className="btn-pill-copper"
                onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })}
              >
                GET A FREE QUOTE +
              </button>
              <a href="/our-work" className="btn-pill-outline">
                VIEW OUR WORK →
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
