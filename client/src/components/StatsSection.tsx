/* ============================================================
   STATS / INTRO SECTION — Colossal-Inspired Editorial Layout
   Features:
   - Section number label (01) with thin rule
   - Massive asymmetric headline — left column dominates
   - Thin vertical divider between columns
   - Stats presented as editorial data points
   - Scroll-triggered reveal with stagger
   ============================================================ */
import { useEffect, useRef, useState } from "react";

export default function StatsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.12 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const fadeUp = (delay: number) => ({
    opacity: visible ? 1 : 0,
    transform: visible ? "translateY(0)" : "translateY(32px)",
    transition: `opacity 0.85s ease ${delay}s, transform 0.85s ease ${delay}s`,
  });

  return (
    <section
      ref={ref}
      style={{
        backgroundColor: "oklch(0.985 0.010 75)",
        padding: "clamp(4rem, 10vw, 8rem) 0",
      }}
    >
      <div className="container">

        {/* ── Section label row ── */}
        <div
          className="flex items-center gap-4 mb-16"
          style={fadeUp(0)}
        >
          <span
            className="font-label"
            style={{
              fontSize: "0.65rem",
              letterSpacing: "0.18em",
              color: "oklch(0.46 0.20 25)",
              fontWeight: 700,
            }}
          >
            01
          </span>
          <span
            className="flex-1 h-px"
            style={{ backgroundColor: "oklch(0.85 0.015 75)" }}
          />
          <span
            className="font-label"
            style={{
              fontSize: "0.60rem",
              letterSpacing: "0.18em",
              color: "oklch(0.58 0.010 55)",
            }}
          >
            WHO WE ARE
          </span>
        </div>

        {/* ── Asymmetric two-column layout ── */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1px_1fr] gap-0 items-start mb-20">

          {/* Left: Massive headline */}
          <div
            className="lg:pr-16"
            style={fadeUp(0.1)}
          >
            <h2
              className="font-display font-light"
              style={{
                fontSize: "clamp(3rem, 7vw, 6.5rem)",
                lineHeight: 0.92,
                letterSpacing: "-0.035em",
                color: "oklch(0.16 0.010 55)",
              }}
            >
              Your yard should feel like{" "}
              <em
                style={{
                  color: "oklch(0.46 0.20 25)",
                  fontStyle: "italic",
                  fontWeight: 300,
                }}
              >
                the best part of your home.
              </em>
            </h2>
          </div>

          {/* Vertical divider */}
          <div
            className="hidden lg:block self-stretch"
            style={{ backgroundColor: "oklch(0.85 0.015 75)" }}
          />

          {/* Right: Body + stats */}
          <div
            className="lg:pl-16 pt-10 lg:pt-0"
            style={fadeUp(0.22)}
          >
            <p
              className="font-body mb-10"
              style={{
                fontSize: "1.05rem",
                color: "oklch(0.38 0.010 55)",
                fontWeight: 300,
                lineHeight: 1.85,
              }}
            >
              We've been transforming Central Oregon properties since 2003 —
              designing, building, and maintaining landscapes that families
              actually live in. Whether it's a backyard retreat, a water feature,
              or a full outdoor kitchen, we bring the same craft and care to
              every single project.
            </p>

            {/* Stats as editorial data points */}
            <div className="grid grid-cols-2 gap-0">
              {[
                { value: "21+", label: "Years in Central Oregon" },
                { value: "10,000+", label: "Projects Completed" },
                { value: "150+", label: "Skilled Team Members" },
                { value: "5 ★", label: "Rated by Happy Clients" },
              ].map((stat, i) => (
                <div
                  key={stat.label}
                  className="py-6"
                  style={{
                    borderTop: "1px solid oklch(0.85 0.015 75)",
                    borderRight: i % 2 === 0 ? "1px solid oklch(0.85 0.015 75)" : "none",
                    paddingLeft: i % 2 === 0 ? "0" : "1.5rem",
                    paddingRight: i % 2 === 0 ? "1.5rem" : "0",
                    opacity: visible ? 1 : 0,
                    transform: visible ? "translateY(0)" : "translateY(16px)",
                    transition: `opacity 0.7s ease ${0.35 + i * 0.08}s, transform 0.7s ease ${0.35 + i * 0.08}s`,
                  }}
                >
                  <div
                    className="font-display"
                    style={{
                      fontSize: "clamp(1.6rem, 3vw, 2.4rem)",
                      color: "oklch(0.46 0.20 25)",
                      fontWeight: 400,
                      lineHeight: 1,
                      marginBottom: "0.35rem",
                    }}
                  >
                    {stat.value}
                  </div>
                  <div
                    className="font-label"
                    style={{
                      fontSize: "0.58rem",
                      letterSpacing: "0.12em",
                      color: "oklch(0.52 0.010 55)",
                    }}
                  >
                    {stat.label.toUpperCase()}
                  </div>
                </div>
              ))}
            </div>

            {/* CTA row */}
            <div className="flex flex-wrap gap-3 mt-10" style={fadeUp(0.55)}>
              <button
                onClick={() =>
                  document.querySelector("#services")?.scrollIntoView({ behavior: "smooth" })
                }
                className="font-label text-xs tracking-widest flex items-center gap-2 transition-all duration-300"
                style={{
                  backgroundColor: "oklch(0.46 0.20 25)",
                  color: "oklch(1 0 0)",
                  padding: "0.7rem 1.6rem",
                  borderRadius: "999px",
                  border: "none",
                  letterSpacing: "0.12em",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor = "oklch(0.38 0.22 25)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = "oklch(0.46 0.20 25)")
                }
              >
                SEE OUR SERVICES
                <span style={{ fontSize: "14px" }}>+</span>
              </button>
              <button
                onClick={() =>
                  document.querySelector("#portfolio")?.scrollIntoView({ behavior: "smooth" })
                }
                className="font-label text-xs tracking-widest flex items-center gap-2 transition-all duration-300"
                style={{
                  backgroundColor: "transparent",
                  color: "oklch(0.25 0.010 55)",
                  padding: "0.7rem 1.6rem",
                  borderRadius: "999px",
                  border: "1px solid oklch(0.75 0.010 55)",
                  letterSpacing: "0.12em",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "oklch(0.46 0.20 25)";
                  e.currentTarget.style.color = "oklch(0.46 0.20 25)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "oklch(0.75 0.010 55)";
                  e.currentTarget.style.color = "oklch(0.25 0.010 55)";
                }}
              >
                VIEW OUR WORK
                <span style={{ fontSize: "14px" }}>→</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
