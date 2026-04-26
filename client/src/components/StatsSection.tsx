/* ============================================================
   STATS SECTION — Wild Editorial
   - Dark background with warm off-white text
   - Giant stat numbers (20vw+) bleeding off the right edge
   - Asymmetric two-column: editorial text left, giant numbers right
   - Animated count-up on scroll
   - Red section label, no teal here
   ============================================================ */
import { useEffect, useRef, useState } from "react";

const CDN = "https://d2xsxph8kpxj0f.cloudfront.net/310519663503028182/g3pw3MRUapabcDUbhBEFxx";

function useCountUp(target: number, duration = 1800, started = false) {
  // Initialize to target so SSR/raw HTML shows the real number, not 0.
  // Once the IntersectionObserver fires, the animation resets from 0 and counts up.
  const [val, setVal] = useState(target);
  useEffect(() => {
    if (!started) return;
    setVal(0); // reset before animating
    let start: number | null = null;
    const step = (ts: number) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setVal(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [started, target, duration]);
  return val;
}

export default function StatsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  const years = useCountUp(new Date().getFullYear() - 2005, 1600, visible);
  const properties = useCountUp(350, 2000, visible);
  const crew = useCountUp(110, 1800, visible);

  return (
    <section
      ref={sectionRef}
      style={{
        position: "relative",
        backgroundColor: "oklch(0.10 0.008 30)",
        overflow: "hidden",
        paddingTop: "clamp(5rem, 10vw, 9rem)",
        paddingBottom: "0",
      }}
    >
      {/* ── Halftone dot circle — top-right decorative ── */}
      <svg
        style={{
          position: "absolute",
          top: "-80px",
          right: "-80px",
          width: "420px",
          height: "420px",
          pointerEvents: "none",
          opacity: 0.18,
          zIndex: 0,
        }}
        viewBox="0 0 420 420"
        xmlns="http://www.w3.org/2000/svg"
      >
        {Array.from({ length: 18 }, (_, row) =>
          Array.from({ length: 18 }, (_, col) => {
            const cx = 20 + col * 22;
            const cy = 20 + row * 22;
            const dist = Math.sqrt((cx - 210) ** 2 + (cy - 210) ** 2);
            if (dist > 195) return null;
            const r = Math.max(1, 4.5 * (1 - dist / 220));
            return <circle key={`${row}-${col}`} cx={cx} cy={cy} r={r} fill="#c0392b" />;
          })
        )}
      </svg>

      {/* ── Section label ── */}
      <div
        style={{
          position: "absolute",
          top: "2rem",
          left: "clamp(1.5rem, 5vw, 5rem)",
          display: "flex",
          alignItems: "center",
          gap: "0.75rem",
        }}
      >
        <span style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "0.5rem", fontWeight: 700, letterSpacing: "0.3em", color: "oklch(0.70 0.18 25)" }}>
          01
        </span>
        <span style={{ width: "2rem", height: "1px", backgroundColor: "oklch(0.22 0.008 30)", display: "block" }} />
        <span style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "0.5rem", fontWeight: 600, letterSpacing: "0.25em", color: "oklch(0.65 0.008 30)" }}>
          WHO WE ARE
        </span>
      </div>

      {/* ── Two-column layout ── */}
      <div
        className="stats-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "0",
          alignItems: "end",
          padding: "0 clamp(1.5rem, 5vw, 5rem)",
        }}
      >
        {/* LEFT: editorial text */}
        <div
          style={{
            paddingBottom: "5rem",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(40px)",
            transition: "opacity 0.9s ease 0.1s, transform 0.9s ease 0.1s",
          }}
        >
          <h2
            style={{
              fontFamily: "'Cormorant Garamond', 'Playfair Display', Georgia, serif",
              fontSize: "clamp(2.8rem, 5.5vw, 5.5rem)",
              fontWeight: 700,
              lineHeight: 0.90,
              letterSpacing: "-0.03em",
              color: "oklch(0.95 0.012 75)",
              marginBottom: "2rem",
            }}
          >
            Improving Life<br />
            <em style={{ fontStyle: "italic", fontWeight: 300, color: "oklch(0.70 0.012 75)" }}>
              Outdoors.
            </em>
          </h2>

          <p
            style={{
              fontFamily: "'Montserrat', sans-serif",
              fontSize: "0.70rem",
              fontWeight: 400,
              lineHeight: 1.9,
              color: "oklch(0.70 0.008 30)",
              maxWidth: "400px",
              marginBottom: "2.5rem",
            }}
          >
            Newport Avenue Landscaping has been Central Oregon's most trusted
            landscape partner since 2005. From intimate residential gardens to
            large-scale commercial properties, we bring the same obsessive
            attention to detail to every project.
          </p>

          <a
            href="/about"
            style={{
              fontFamily: "'Montserrat', sans-serif",
              fontSize: "0.58rem",
              fontWeight: 700,
              letterSpacing: "0.18em",
              color: "oklch(0.95 0.012 75)",
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "center",
              gap: "0.75rem",
            }}
          >
            OUR STORY
            <span style={{ display: "inline-block", width: "2.5rem", height: "1px", backgroundColor: "oklch(0.46 0.20 25)" }} />
          </a>
        </div>

        {/* RIGHT: giant bleeding numbers */}
        <div
          style={{
            position: "relative",
            overflow: "hidden",
            paddingBottom: "3rem",
          }}
        >
          {/* Stat 1 */}
          <div style={{ position: "relative", marginBottom: "2rem" }}>
            {/* Ghost number — bleeds off right */}
            <div
              style={{
                fontFamily: "'Montserrat', sans-serif",
                fontSize: "clamp(7rem, 20vw, 18rem)",
                fontWeight: 900,
                lineHeight: 0.85,
                letterSpacing: "-0.06em",
                color: "oklch(0.18 0.10 185)",
                position: "absolute",
                right: "-4rem",
                top: "-1rem",
                userSelect: "none",
                pointerEvents: "none",
                opacity: visible ? 1 : 0,
                transition: "opacity 1s ease 0.3s",
              }}
            >
              {years}
            </div>
            <div style={{ position: "relative", zIndex: 2 }}>
              <div style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "0.5rem", fontWeight: 700, letterSpacing: "0.25em", color: "oklch(0.70 0.18 25)", marginBottom: "0.2rem" }}>
                YEARS IN BUSINESS
              </div>
              <div
                style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: "clamp(2rem, 4vw, 3.8rem)",
                fontWeight: 700,
                color: "oklch(0.60 0.14 185)",
                lineHeight: 1,
                opacity: visible ? 1 : 0,
                transition: "opacity 0.8s ease 0.2s",
                }}
              >
                {years}+ Years
              </div>
            </div>
          </div>

          <div style={{ width: "100%", height: "1px", backgroundColor: "oklch(0.18 0.008 30)", marginBottom: "2rem" }} />

          {/* Stat 2 */}
          <div style={{ marginBottom: "2rem" }}>
            <div style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "0.5rem", fontWeight: 700, letterSpacing: "0.25em", color: "oklch(0.70 0.18 25)", marginBottom: "0.2rem" }}>
              PROPERTIES MAINTAINED
            </div>
            <div
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: "clamp(2rem, 4vw, 3.8rem)",
                fontWeight: 700,
                color: "oklch(0.60 0.14 185)",
                lineHeight: 1,
                opacity: visible ? 1 : 0,
                transition: "opacity 0.8s ease 0.35s",
              }}
            >
              {properties}+ Properties
            </div>
          </div>

          <div style={{ width: "100%", height: "1px", backgroundColor: "oklch(0.18 0.008 30)", marginBottom: "2rem" }} />

          {/* Stat 3 */}
          <div>
            <div style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "0.5rem", fontWeight: 700, letterSpacing: "0.25em", color: "oklch(0.70 0.18 25)", marginBottom: "0.2rem" }}>
              CREW MEMBERS
            </div>
            <div
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: "clamp(2rem, 4vw, 3.8rem)",
                fontWeight: 700,
                color: "oklch(0.60 0.14 185)",
                lineHeight: 1,
                opacity: visible ? 1 : 0,
                transition: "opacity 0.8s ease 0.5s",
              }}
            >
              {crew}+ Crew
            </div>
          </div>
        </div>
      </div>

      {/* ── Bottom photo strip with diagonal top cut ── */}
      <div
        style={{
          width: "100%",
          height: "320px",
          position: "relative",
          marginTop: "2rem",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `url(/manus-storage/ITP_7385_f2bbba86_a2ce8acd.webp`,
            backgroundSize: "cover",
            backgroundPosition: "center 60%",
            filter: "brightness(0.50)",
          }}
        />
        {/* Diagonal cut at top */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "100px",
            background: "oklch(0.10 0.008 30)",
            clipPath: "polygon(0 0, 100% 0, 100% 0, 0 100%)",
          }}
        />
        {/* Text overlay */}
        <div
          style={{
            position: "absolute",
            bottom: "2.5rem",
            left: "clamp(1.5rem, 5vw, 5rem)",
            fontFamily: "'Montserrat', sans-serif",
            fontSize: "0.55rem",
            fontWeight: 700,
            letterSpacing: "0.25em",
            color: "oklch(0.97 0.012 75 / 0.6)",
          }}
        >
          CENTRAL OREGON · SINCE 2005
        </div>
      </div>
    </section>
  );
}
