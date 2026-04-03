/* ============================================================
   LANDSCAPE LIGHTING SECTION — Full Scene Reveal
   
   Scroll-triggered cinematic reveal:
   - Illumination starts as soon as the section enters the viewport
   - Tree uplights sweep up from multiple positions
   - Water reflection shimmer in the pond
   - Warm amber overlay intensifies
   - Huge "LANDSCAPE LIGHTING" title always visible
   - Subtitle and CTA fade in mid-scroll
   - No black gap — section bg matches photo darkness
   ============================================================ */
import { useEffect, useRef, useState } from "react";

const FOREST_HOME_4 =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663503028182/g3pw3MRUapabcDUbhBEFxx/forest-home4_9324e5db.jpg";

export default function LightingSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0); // 0 = dark, 1 = fully lit

  useEffect(() => {
    const handleScroll = () => {
      const section = sectionRef.current;
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const vh = window.innerHeight;
      const sectionH = section.offsetHeight;

      // Start animating as soon as the section top enters the viewport (rect.top < vh)
      // Finish when the section has scrolled 60% through (so it's lit well before leaving)
      const scrollRange = sectionH * 0.65; // animate over first 65% of scroll range
      const scrolled = vh - rect.top; // positive once section enters viewport

      const raw = scrolled / scrollRange;
      setProgress(Math.max(0, Math.min(1, raw)));
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ── Derived animation values ──────────────────────────────
  const ease = (t: number) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t; // ease in-out
  const p = ease(Math.max(0, Math.min(1, progress)));

  const brightness    = 0.12 + p * 0.82;
  const saturation    = 0.25 + p * 1.1;
  const vignetteOp    = Math.max(0, 0.9 - p * 0.75);
  const warmOp        = p * 0.55;
  const subtitleOp    = p > 0.4 ? Math.min(1, (p - 0.4) / 0.35) : 0;
  const subtitleY     = p > 0.4 ? Math.max(0, (1 - (p - 0.4) / 0.35) * 28) : 28;
  const scrollHintOp  = p < 0.12 ? 1 : Math.max(0, 1 - (p - 0.12) / 0.12);

  // Individual light intensities (staggered)
  const leftTree   = Math.max(0, Math.min(1, p * 1.4));
  const rightTree  = Math.max(0, Math.min(1, (p - 0.08) * 1.4));
  const centerTree = Math.max(0, Math.min(1, (p - 0.15) * 1.5));
  const waterGlow  = Math.max(0, Math.min(1, (p - 0.05) * 1.6));

  return (
    <div
      ref={sectionRef}
      style={{
        height: "220vh",
        position: "relative",
        // Match the near-black photo color — no black gap
        backgroundColor: "oklch(0.08 0.02 200)",
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
            transition: "filter 0.04s linear",
          }}
        />

        {/* ── Dark vignette ── */}
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          background: "radial-gradient(ellipse at center, transparent 25%, oklch(0.03 0.01 200) 85%)",
          opacity: vignetteOp,
          transition: "opacity 0.04s linear",
        }}/>

        {/* ── Warm amber scene overlay ── */}
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          background: "radial-gradient(ellipse 90% 70% at 55% 65%, oklch(0.75 0.18 65) 0%, oklch(0.55 0.14 55) 40%, transparent 75%)",
          opacity: warmOp,
          mixBlendMode: "soft-light",
          transition: "opacity 0.04s linear",
        }}/>

        {/* ── SVG: All light effects in one layer ── */}
        <svg
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}
          viewBox="0 0 1440 900"
          preserveAspectRatio="xMidYMid slice"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Uplight cone gradient */}
            <radialGradient id="coneL" cx="50%" cy="100%" r="100%" fx="50%" fy="100%">
              <stop offset="0%"   stopColor="oklch(0.92 0.20 72)" stopOpacity="0.95"/>
              <stop offset="25%"  stopColor="oklch(0.80 0.18 68)" stopOpacity="0.65"/>
              <stop offset="60%"  stopColor="oklch(0.65 0.14 62)" stopOpacity="0.28"/>
              <stop offset="100%" stopColor="oklch(0.50 0.10 58)" stopOpacity="0"/>
            </radialGradient>
            <radialGradient id="coneR" cx="50%" cy="100%" r="100%" fx="50%" fy="100%">
              <stop offset="0%"   stopColor="oklch(0.88 0.18 70)" stopOpacity="0.90"/>
              <stop offset="30%"  stopColor="oklch(0.76 0.16 66)" stopOpacity="0.55"/>
              <stop offset="65%"  stopColor="oklch(0.60 0.12 60)" stopOpacity="0.22"/>
              <stop offset="100%" stopColor="oklch(0.45 0.08 55)" stopOpacity="0"/>
            </radialGradient>
            <radialGradient id="coneC" cx="50%" cy="100%" r="100%" fx="50%" fy="100%">
              <stop offset="0%"   stopColor="oklch(0.90 0.19 71)" stopOpacity="0.88"/>
              <stop offset="28%"  stopColor="oklch(0.78 0.17 67)" stopOpacity="0.52"/>
              <stop offset="62%"  stopColor="oklch(0.62 0.13 61)" stopOpacity="0.20"/>
              <stop offset="100%" stopColor="oklch(0.48 0.09 56)" stopOpacity="0"/>
            </radialGradient>
            {/* Water reflection gradient */}
            <radialGradient id="waterGlow" cx="50%" cy="0%" r="100%" fx="50%" fy="0%">
              <stop offset="0%"   stopColor="oklch(0.88 0.18 70)" stopOpacity="0.75"/>
              <stop offset="40%"  stopColor="oklch(0.72 0.15 65)" stopOpacity="0.40"/>
              <stop offset="100%" stopColor="oklch(0.55 0.10 60)" stopOpacity="0"/>
            </radialGradient>
            {/* Blur filters */}
            <filter id="blurSoft"><feGaussianBlur stdDeviation="18"/></filter>
            <filter id="blurMed"> <feGaussianBlur stdDeviation="10"/></filter>
            <filter id="blurHard"><feGaussianBlur stdDeviation="5"/></filter>
          </defs>

          {/* ── LEFT TREE UPLIGHT ── */}
          <g opacity={leftTree} style={{ transition: "opacity 0.04s linear" }}>
            {/* Wide soft cone */}
            <path d="M 200 900 L -80 100 L 480 100 Z"
              fill="url(#coneL)" filter="url(#blurSoft)" opacity="0.7"/>
            {/* Tighter bright core */}
            <path d="M 200 900 L 140 100 L 260 100 Z"
              fill="oklch(0.95 0.14 78)" filter="url(#blurMed)" opacity="0.45"/>
            {/* Ground fixture glow */}
            <ellipse cx="200" cy="890" rx="55" ry="18"
              fill="oklch(0.90 0.20 74)" filter="url(#blurSoft)" opacity="0.8"/>
            <circle cx="200" cy="888" r="7"
              fill="oklch(0.98 0.16 82)" opacity="0.95"/>
          </g>

          {/* ── RIGHT TREE UPLIGHT ── */}
          <g opacity={rightTree} style={{ transition: "opacity 0.04s linear" }}>
            <path d="M 1180 900 L 920 80 L 1440 80 Z"
              fill="url(#coneR)" filter="url(#blurSoft)" opacity="0.65"/>
            <path d="M 1180 900 L 1120 80 L 1240 80 Z"
              fill="oklch(0.93 0.13 76)" filter="url(#blurMed)" opacity="0.40"/>
            <ellipse cx="1180" cy="890" rx="50" ry="16"
              fill="oklch(0.88 0.18 72)" filter="url(#blurSoft)" opacity="0.75"/>
            <circle cx="1180" cy="888" r="6"
              fill="oklch(0.98 0.16 82)" opacity="0.95"/>
          </g>

          {/* ── CENTER-LEFT TREE UPLIGHT (smaller, accent) ── */}
          <g opacity={centerTree} style={{ transition: "opacity 0.04s linear" }}>
            <path d="M 520 900 L 340 200 L 700 200 Z"
              fill="url(#coneC)" filter="url(#blurSoft)" opacity="0.55"/>
            <path d="M 520 900 L 475 200 L 565 200 Z"
              fill="oklch(0.94 0.12 77)" filter="url(#blurMed)" opacity="0.35"/>
            <ellipse cx="520" cy="890" rx="40" ry="14"
              fill="oklch(0.88 0.18 72)" filter="url(#blurSoft)" opacity="0.70"/>
            <circle cx="520" cy="888" r="5"
              fill="oklch(0.98 0.16 82)" opacity="0.90"/>
          </g>

          {/* ── WATER REFLECTION — pond in lower-center ── */}
          <g opacity={waterGlow} style={{ transition: "opacity 0.04s linear" }}>
            {/* Main water glow pool */}
            <ellipse cx="680" cy="780" rx="280" ry="80"
              fill="url(#waterGlow)" filter="url(#blurSoft)" opacity="0.85"/>
            {/* Shimmer streaks — vertical light columns reflecting in water */}
            <rect x="590" y="720" width="6" height="80" rx="3"
              fill="oklch(0.92 0.18 72)" filter="url(#blurHard)" opacity="0.55"/>
            <rect x="640" y="700" width="4" height="100" rx="2"
              fill="oklch(0.95 0.16 75)" filter="url(#blurHard)" opacity="0.45"/>
            <rect x="700" y="710" width="5" height="90" rx="2"
              fill="oklch(0.92 0.18 72)" filter="url(#blurHard)" opacity="0.50"/>
            <rect x="755" y="725" width="4" height="75" rx="2"
              fill="oklch(0.90 0.15 70)" filter="url(#blurHard)" opacity="0.40"/>
            <rect x="800" y="715" width="6" height="85" rx="3"
              fill="oklch(0.92 0.18 72)" filter="url(#blurHard)" opacity="0.45"/>
            {/* Soft wide reflection base */}
            <ellipse cx="700" cy="800" rx="200" ry="40"
              fill="oklch(0.78 0.16 68)" filter="url(#blurSoft)" opacity="0.30"/>
          </g>

          {/* ── PATHWAY LIGHT — small ground dot center-right ── */}
          <g opacity={Math.max(0, Math.min(1, (p - 0.2) * 2))} style={{ transition: "opacity 0.04s linear" }}>
            <ellipse cx="900" cy="870" rx="60" ry="20"
              fill="oklch(0.85 0.16 70)" filter="url(#blurSoft)" opacity="0.60"/>
            <circle cx="900" cy="868" r="5"
              fill="oklch(0.98 0.16 82)" opacity="0.90"/>
          </g>
        </svg>

        {/* ── HUGE SECTION TITLE — always visible, fades in with photo ── */}
        <div style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          pointerEvents: "none",
          zIndex: 10,
          padding: "0 2rem",
        }}>
          {/* Big always-on title */}
          <h2 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontWeight: 700,
            fontSize: "clamp(3.5rem, 11vw, 10rem)",
            lineHeight: 0.88,
            color: "oklch(0.97 0.02 75)",
            textTransform: "uppercase",
            letterSpacing: "-0.02em",
            textAlign: "center",
            textShadow: `0 0 ${60 * p}px oklch(0.80 0.18 68 / ${p * 0.6}), 0 4px 40px rgba(0,0,0,0.7)`,
            opacity: 0.2 + p * 0.8,
            transition: "opacity 0.04s linear, text-shadow 0.04s linear",
            marginBottom: "0.5rem",
          }}>
            Landscape<br />
            <em style={{ fontStyle: "italic", fontWeight: 400, color: "oklch(0.85 0.18 68)" }}>
              Lighting
            </em>
          </h2>

          {/* Subtitle + CTA — fade in at 40% progress */}
          <div style={{
            opacity: subtitleOp,
            transform: `translateY(${subtitleY}px)`,
            transition: "opacity 0.04s linear, transform 0.04s linear",
            textAlign: "center",
            pointerEvents: subtitleOp > 0.5 ? "auto" : "none",
          }}>
            <p style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontWeight: 400,
              fontSize: "clamp(1rem, 2vw, 1.35rem)",
              lineHeight: 1.65,
              color: "oklch(0.82 0.05 75)",
              maxWidth: "540px",
              margin: "0 auto 2.2rem",
            }}>
              Transform your property after dark. Uplighting trees, illuminating
              pathways, and creating drama around water features — we design
              lighting that makes your home unforgettable.
            </p>

            <a
              href="/services/landscape-lighting"
              style={{
                display: "inline-block",
                fontFamily: "'Cormorant Garamond', serif",
                fontWeight: 600,
                fontSize: "0.88rem",
                letterSpacing: "0.25em",
                textTransform: "uppercase",
                color: "oklch(0.06 0.02 155)",
                backgroundColor: "oklch(0.82 0.16 68)",
                padding: "0.9rem 2.5rem",
                textDecoration: "none",
                transition: "background-color 0.2s ease, transform 0.2s ease",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "oklch(0.92 0.18 72)";
                (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "oklch(0.82 0.16 68)";
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
          transition: "opacity 0.1s linear",
          pointerEvents: "none",
          zIndex: 20,
        }}>
          <span style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontStyle: "italic",
            fontSize: "0.75rem",
            letterSpacing: "0.2em",
            color: "oklch(0.65 0.04 75)",
            textTransform: "uppercase",
          }}>
            Scroll to illuminate
          </span>
          <svg width="20" height="30" viewBox="0 0 20 30" fill="none">
            <rect x="8" y="0" width="4" height="20" rx="2" fill="oklch(0.65 0.04 75)" opacity="0.4"/>
            <circle cx="10" cy="6" r="3" fill="oklch(0.82 0.16 68)" opacity="0.8">
              <animate attributeName="cy" values="4;16;4" dur="1.8s" repeatCount="indefinite"/>
            </circle>
          </svg>
        </div>

        {/* ── Section label ── */}
        <div style={{
          position: "absolute",
          top: "50%",
          right: "2rem",
          transform: "translateY(-50%) rotate(90deg)",
          transformOrigin: "center center",
          fontFamily: "'Cormorant Garamond', serif",
          fontWeight: 400,
          fontStyle: "italic",
          fontSize: "0.7rem",
          letterSpacing: "0.4em",
          color: "oklch(0.50 0.06 75)",
          textTransform: "uppercase",
          whiteSpace: "nowrap",
          pointerEvents: "none",
          zIndex: 20,
        }}>
          04 — Landscape Lighting
        </div>
      </div>
    </div>
  );
}
