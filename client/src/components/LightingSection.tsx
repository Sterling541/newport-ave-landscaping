/* ============================================================
   LANDSCAPE LIGHTING SECTION — Natural Glow Reveal
   
   Philosophy: Less is more. Real landscape lighting is subtle —
   a warm bloom around a fixture, a soft upward wash on bark,
   a gentle shimmer in water. Not theatrical stage lighting.
   
   - One soft uplight on the main tree (left-center)
   - One accent bloom on the right boulder cluster
   - Gentle water shimmer in the pond
   - Warm ambient overlay that builds slowly
   - Huge editorial title always visible
   - Illumination starts immediately when section enters viewport
   - No black gap after section
   ============================================================ */
import { useEffect, useRef, useState } from "react";

const FOREST_HOME_4 =
  "/manus-storage/forest-home4_9324e5db_31f1b27d.webp";

export default function LightingSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const section = sectionRef.current;
      if (!section) return;
      const rect = section.getBoundingClientRect();
      const vh = window.innerHeight;
      const sectionH = section.offsetHeight;
      // Animate over first 60% of scroll range, starting when top enters viewport
      const scrollRange = sectionH * 0.60;
      if (!scrollRange || scrollRange <= 0) return; // guard against division by zero
      const scrolled = vh - rect.top;
      const raw = scrolled / scrollRange;
      const clamped = Math.max(0, Math.min(1, raw));
      if (!isNaN(clamped)) setProgress(clamped);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Smooth ease-in-out
  const ease = (t: number) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
  const p = ease(Math.max(0, Math.min(1, progress)));

  // Photo: starts very dark, lifts to natural dusk exposure
  const brightness = 0.10 + p * 0.72;
  const saturation = 0.30 + p * 0.85;

  // Vignette fades as scene brightens
  const vignetteOp = Math.max(0, 0.92 - p * 0.80);

  // Warm overlay — very gentle, peaks at 0.28 opacity
  const warmOp = p * 0.28;

  // Subtitle fades in after 45% progress
  const subtitleOp = p > 0.45 ? Math.min(1, (p - 0.45) / 0.35) : 0;
  const subtitleY  = p > 0.45 ? Math.max(0, (1 - (p - 0.45) / 0.35) * 24) : 24;

  // Scroll hint fades out early
  const scrollHintOp = p < 0.10 ? 1 : Math.max(0, 1 - (p - 0.10) / 0.14);

  // Individual light intensities — staggered, gentle
  const treeUplight = Math.max(0, Math.min(1, p * 1.3));
  const boulderBloom = Math.max(0, Math.min(1, (p - 0.12) * 1.4));
  const waterGlow   = Math.max(0, Math.min(1, (p - 0.08) * 1.5));

  return (
    <div
      ref={sectionRef}
      style={{
        height: "140vh",
        position: "relative",
        backgroundColor: "transparent",
      }}
    >
      {/* Sticky viewport */}
      <div
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          overflow: "hidden",
        }}
      >
        {/* ── Background Photo ── */}
        <img
          src={FOREST_HOME_4}
          alt="Landscape lighting at dusk — pond, boulders, warm uplights"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center 38%",
            filter: `brightness(${brightness}) saturate(${saturation})`,
            transition: "filter 0.06s linear",
          }}
        />

        {/* ── Vignette ── */}
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          background: "radial-gradient(ellipse at center, transparent 20%, oklch(0.03 0.010 30) 80%)",
          opacity: vignetteOp,
          transition: "opacity 0.06s linear",
        }}/>

        {/* ── Warm amber ambient overlay — very subtle ── */}
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          background: "radial-gradient(ellipse 80% 60% at 45% 70%, oklch(0.72 0.16 62) 0%, oklch(0.55 0.12 55) 45%, transparent 80%)",
          opacity: warmOp,
          mixBlendMode: "soft-light",
          transition: "opacity 0.06s linear",
        }}/>

        {/* ── SVG light effects ── */}
        <svg
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}
          viewBox="0 0 1440 900"
          preserveAspectRatio="xMidYMid slice"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Soft uplight — wide, diffuse, natural */}
            <radialGradient id="coneL" cx="50%" cy="100%" r="100%" fx="50%" fy="100%">
              <stop offset="0%"   stopColor="oklch(0.88 0.16 68)" stopOpacity="0.55"/>
              <stop offset="35%"  stopColor="oklch(0.75 0.13 64)" stopOpacity="0.25"/>
              <stop offset="70%"  stopColor="oklch(0.60 0.10 60)" stopOpacity="0.08"/>
              <stop offset="100%" stopColor="oklch(0.45 0.07 55)" stopOpacity="0"/>
            </radialGradient>

            {/* Boulder accent — small, warm pool */}
            <radialGradient id="boulderGrad" cx="50%" cy="50%" r="50%">
              <stop offset="0%"   stopColor="oklch(0.85 0.15 66)" stopOpacity="0.50"/>
              <stop offset="50%"  stopColor="oklch(0.70 0.12 62)" stopOpacity="0.22"/>
              <stop offset="100%" stopColor="oklch(0.55 0.09 58)" stopOpacity="0"/>
            </radialGradient>

            {/* Water reflection — horizontal shimmer */}
            <radialGradient id="waterGlow" cx="50%" cy="20%" r="80%" fx="50%" fy="20%">
              <stop offset="0%"   stopColor="oklch(0.82 0.14 66)" stopOpacity="0.45"/>
              <stop offset="50%"  stopColor="oklch(0.68 0.11 62)" stopOpacity="0.18"/>
              <stop offset="100%" stopColor="oklch(0.52 0.08 58)" stopOpacity="0"/>
            </radialGradient>

            {/* Heavy blur for soft glow */}
            <filter id="blurHeavy"><feGaussianBlur stdDeviation="28"/></filter>
            <filter id="blurMed">  <feGaussianBlur stdDeviation="14"/></filter>
            <filter id="blurLight"><feGaussianBlur stdDeviation="6"/></filter>
          </defs>

          {/* ── MAIN TREE UPLIGHT — left-center, the hero light ── */}
          <g opacity={treeUplight} style={{ transition: "opacity 0.06s linear" }}>
            {/* Wide soft bloom — the ambient spill */}
            <path d="M 320 900 L 0 200 L 640 200 Z"
              fill="url(#coneL)" filter="url(#blurHeavy)" opacity="0.6"/>
            {/* Tighter core wash — slightly brighter center */}
            <path d="M 320 900 L 240 350 L 400 350 Z"
              fill="oklch(0.90 0.14 70)" filter="url(#blurMed)" opacity="0.22"/>
            {/* Ground fixture — small warm pool at base */}
            <ellipse cx="320" cy="885" rx="48" ry="14"
              fill="oklch(0.88 0.18 70)" filter="url(#blurMed)" opacity="0.65"/>
            {/* Fixture point — tiny bright dot */}
            <circle cx="320" cy="883" r="5"
              fill="oklch(0.96 0.14 78)" opacity="0.90"/>
          </g>

          {/* ── BOULDER ACCENT — right side, smaller ── */}
          <g opacity={boulderBloom} style={{ transition: "opacity 0.06s linear" }}>
            {/* Soft pool around boulders */}
            <ellipse cx="1050" cy="720" rx="180" ry="120"
              fill="url(#boulderGrad)" filter="url(#blurHeavy)" opacity="0.70"/>
            {/* Small fixture glow */}
            <ellipse cx="1050" cy="875" rx="36" ry="11"
              fill="oklch(0.85 0.16 68)" filter="url(#blurMed)" opacity="0.55"/>
            <circle cx="1050" cy="873" r="4"
              fill="oklch(0.96 0.14 78)" opacity="0.85"/>
          </g>

          {/* ── WATER REFLECTION — pond center ── */}
          <g opacity={waterGlow} style={{ transition: "opacity 0.06s linear" }}>
            {/* Main water glow — wide, low */}
            <ellipse cx="680" cy="790" rx="260" ry="65"
              fill="url(#waterGlow)" filter="url(#blurHeavy)" opacity="0.80"/>
            {/* Subtle shimmer streaks — just 3, very faint */}
            <rect x="620" y="740" width="4" height="65" rx="2"
              fill="oklch(0.88 0.15 68)" filter="url(#blurLight)" opacity="0.28"/>
            <rect x="680" y="730" width="3" height="75" rx="1.5"
              fill="oklch(0.90 0.14 70)" filter="url(#blurLight)" opacity="0.22"/>
            <rect x="740" y="745" width="4" height="60" rx="2"
              fill="oklch(0.88 0.15 68)" filter="url(#blurLight)" opacity="0.25"/>
          </g>
        </svg>

        {/* ── HUGE SECTION TITLE ── */}
        <div style={{
          position: "absolute",
          top: 0, left: 0, right: 0, bottom: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          pointerEvents: "none",
          zIndex: 10,
          padding: "0 2rem",
        }}>
          {/* Section label */}
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: "0.75rem",
            marginBottom: "1.5rem",
          }}>
            <span style={{
              display: "inline-block",
              width: "2.5rem",
              height: "1px",
              backgroundColor: "oklch(0.65 0.14 68)",
            }}/>
            <span style={{
              fontFamily: "'Montserrat', sans-serif",
              fontSize: "0.5rem",
              fontWeight: 700,
              letterSpacing: "0.3em",
              color: "oklch(0.60 0.10 68)",
              textTransform: "uppercase",
            }}>
              04 — After Dark
            </span>
            <span style={{
              display: "inline-block",
              width: "2.5rem",
              height: "1px",
              backgroundColor: "oklch(0.65 0.14 68)",
            }}/>
          </div>

          {/* Big title */}
          <h2 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontWeight: 700,
            fontSize: "clamp(3.5rem, 11vw, 10rem)",
            lineHeight: 0.88,
            color: "oklch(0.97 0.02 75)",
            textTransform: "uppercase",
            letterSpacing: "-0.02em",
            textAlign: "center",
            textShadow: `0 0 ${50 * p}px oklch(0.78 0.16 66 / ${p * 0.45}), 0 4px 40px rgba(0,0,0,0.6)`,
            marginBottom: "0.5rem",
          }}>
            Landscape<br />
            <em style={{ fontStyle: "italic", fontWeight: 400, color: "oklch(0.82 0.16 66)" }}>
              Lighting
            </em>
          </h2>

          {/* Subtitle + CTA — fade in at 45% */}
          <div style={{
            opacity: subtitleOp,
            transform: `translateY(${subtitleY}px)`,
            transition: "opacity 0.06s linear, transform 0.06s linear",
            textAlign: "center",
            pointerEvents: subtitleOp > 0.5 ? "auto" : "none",
          }}>
            <p style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontWeight: 400,
              fontSize: "clamp(1rem, 2vw, 1.3rem)",
              lineHeight: 1.65,
              color: "oklch(0.78 0.04 75)",
              maxWidth: "500px",
              margin: "0 auto 2rem",
            }}>
              Transform your property after dark. Uplighting trees, illuminating
              pathways, and creating drama around water features.
            </p>

            <a
              href="/services/landscape-lighting"
              style={{
                display: "inline-flex",
                alignItems: "center",
                fontFamily: "'Montserrat', sans-serif",
                fontWeight: 700,
                fontSize: "0.58rem",
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "oklch(0.06 0.006 30)",
                backgroundColor: "oklch(0.80 0.14 66)",
                padding: "0.9rem 2.5rem",
                textDecoration: "none",
                borderRadius: "1.8rem 0.2rem 1.8rem 0.2rem",
                transition: "background-color 0.2s ease, transform 0.2s ease",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "oklch(0.90 0.16 70)";
                (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "oklch(0.80 0.14 66)";
                (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(0)";
              }}
            >
              Explore Lighting Services
            </a>
          </div>
        </div>

        {/* ── Scroll hint ── */}
        <div style={{
          position: "absolute",
          bottom: "2rem",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "0.5rem",
          opacity: scrollHintOp,
          transition: "opacity 0.12s linear",
          pointerEvents: "none",
          zIndex: 20,
        }}>
          <span style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontStyle: "italic",
            fontSize: "0.72rem",
            letterSpacing: "0.2em",
            color: "oklch(0.55 0.04 75)",
            textTransform: "uppercase",
          }}>
            Scroll to illuminate
          </span>
          <svg width="20" height="30" viewBox="0 0 20 30" fill="none">
            <rect x="8" y="0" width="4" height="20" rx="2" fill="oklch(0.55 0.04 75)" opacity="0.4"/>
            <circle cx="10" cy="6" r="3" fill="oklch(0.80 0.14 66)" opacity="0.8">
              <animate attributeName="cy" values="4;16;4" dur="1.8s" repeatCount="indefinite"/>
            </circle>
          </svg>
        </div>

        {/* ── Vertical section label — right edge ── */}
        <div style={{
          position: "absolute",
          right: "1.5rem",
          top: "50%",
          transform: "translateY(-50%) rotate(90deg)",
          transformOrigin: "center center",
          pointerEvents: "none",
          zIndex: 10,
        }}>
          <span style={{
            fontFamily: "'Montserrat', sans-serif",
            fontSize: "0.42rem",
            fontWeight: 600,
            letterSpacing: "0.3em",
            color: "oklch(0.40 0.04 75)",
            textTransform: "uppercase",
            whiteSpace: "nowrap",
          }}>
            Landscape Lighting — Newport Avenue
          </span>
        </div>
      </div>
    </div>
  );
}
