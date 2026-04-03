/* ============================================================
   LANDSCAPE LIGHTING SECTION
   
   Scroll-triggered cinematic reveal: as the user scrolls through
   this section, two SVG uplight cones sweep upward from the
   bottom corners, illuminating the dusk landscape photo with
   warm amber light. The headline and subtext fade in at the
   midpoint of the scroll journey.
   
   The effect uses IntersectionObserver + scroll position to
   calculate a 0–1 progress value that drives:
   - Uplight cone opacity and scale
   - Warm radial gradient overlay intensity
   - Text opacity and translateY
   - A subtle vignette that lifts as the lights come on
   ============================================================ */
import { useEffect, useRef, useState } from "react";

const FOREST_HOME_4 =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663503028182/g3pw3MRUapabcDUbhBEFxx/forest-home4_9324e5db.jpg";

export default function LightingSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0); // 0 = dark, 1 = fully lit

  useEffect(() => {
    const handleScroll = () => {
      const section = sectionRef.current;
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const sectionHeight = section.offsetHeight;
      const viewportHeight = window.innerHeight;

      // Progress: 0 when section top hits viewport bottom, 1 when section bottom hits viewport top
      // We want the animation to happen while the section is in view
      const scrolled = -rect.top; // how far we've scrolled into the section
      const scrollRange = sectionHeight - viewportHeight;

      if (scrollRange <= 0) {
        setProgress(0.5);
        return;
      }

      const raw = scrolled / scrollRange;
      setProgress(Math.max(0, Math.min(1, raw)));
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // initial call

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Derived animation values
  const lightIntensity = Math.pow(progress, 0.6); // ease-in curve
  const textOpacity = progress > 0.35 ? Math.min(1, (progress - 0.35) / 0.3) : 0;
  const textY = progress > 0.35 ? Math.max(0, (1 - (progress - 0.35) / 0.3) * 30) : 30;
  const vignetteOpacity = Math.max(0, 0.85 - lightIntensity * 0.7);
  const warmOverlayOpacity = lightIntensity * 0.45;
  const leftConeOpacity = lightIntensity;
  const rightConeOpacity = lightIntensity * 0.85;
  const leftConeScale = 0.4 + lightIntensity * 0.6;
  const rightConeScale = 0.3 + lightIntensity * 0.7;

  return (
    /* Tall section — gives scroll room for the animation */
    <div
      ref={sectionRef}
      style={{
        height: "250vh",
        position: "relative",
        backgroundColor: "oklch(0.06 0.02 155)",
      }}
    >
      {/* Sticky viewport — stays fixed while parent scrolls */}
      <div
        ref={stickyRef}
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
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
            objectPosition: "center 40%",
            filter: `brightness(${0.15 + lightIntensity * 0.75}) saturate(${0.3 + lightIntensity * 0.9})`,
            transition: "filter 0.05s linear",
          }}
        />

        {/* ── Dark vignette overlay (fades as lights come on) ── */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "radial-gradient(ellipse at center, transparent 20%, oklch(0.04 0.01 155) 80%)",
            opacity: vignetteOpacity,
            pointerEvents: "none",
            transition: "opacity 0.05s linear",
          }}
        />

        {/* ── Warm amber overlay (intensifies as lights come on) ── */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse 80% 60% at 70% 60%, oklch(0.72 0.15 65) 0%, transparent 70%)",
            opacity: warmOverlayOpacity,
            mixBlendMode: "soft-light",
            pointerEvents: "none",
            transition: "opacity 0.05s linear",
          }}
        />

        {/* ── Left Uplight Cone ── */}
        <svg
          style={{
            position: "absolute",
            bottom: 0,
            left: "8%",
            width: "280px",
            height: "420px",
            opacity: leftConeOpacity,
            transform: `scaleY(${leftConeScale})`,
            transformOrigin: "bottom center",
            pointerEvents: "none",
            transition: "opacity 0.05s linear, transform 0.05s linear",
          }}
          viewBox="0 0 280 420"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <radialGradient id="leftCone" cx="50%" cy="100%" r="100%" fx="50%" fy="100%">
              <stop offset="0%" stopColor="oklch(0.88 0.18 75)" stopOpacity="0.95"/>
              <stop offset="30%" stopColor="oklch(0.78 0.16 70)" stopOpacity="0.6"/>
              <stop offset="65%" stopColor="oklch(0.65 0.14 65)" stopOpacity="0.25"/>
              <stop offset="100%" stopColor="oklch(0.50 0.10 60)" stopOpacity="0"/>
            </radialGradient>
            <filter id="leftBlur">
              <feGaussianBlur stdDeviation="12"/>
            </filter>
          </defs>
          {/* Soft glow base */}
          <ellipse cx="140" cy="400" rx="90" ry="30" fill="oklch(0.88 0.18 75)" opacity="0.7" filter="url(#leftBlur)"/>
          {/* Main cone */}
          <path
            d="M 140 420 L 10 0 L 270 0 Z"
            fill="url(#leftCone)"
            filter="url(#leftBlur)"
          />
          {/* Bright center beam */}
          <path
            d="M 140 420 L 110 0 L 170 0 Z"
            fill="oklch(0.95 0.12 80)"
            opacity="0.35"
            filter="url(#leftBlur)"
          />
          {/* Uplight fixture dot */}
          <circle cx="140" cy="415" r="6" fill="oklch(0.95 0.15 80)" opacity="0.9"/>
          <circle cx="140" cy="415" r="12" fill="oklch(0.88 0.18 75)" opacity="0.4" filter="url(#leftBlur)"/>
        </svg>

        {/* ── Right Uplight Cone ── */}
        <svg
          style={{
            position: "absolute",
            bottom: 0,
            right: "12%",
            width: "220px",
            height: "360px",
            opacity: rightConeOpacity,
            transform: `scaleY(${rightConeScale})`,
            transformOrigin: "bottom center",
            pointerEvents: "none",
            transition: "opacity 0.05s linear, transform 0.05s linear",
          }}
          viewBox="0 0 220 360"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <radialGradient id="rightCone" cx="50%" cy="100%" r="100%" fx="50%" fy="100%">
              <stop offset="0%" stopColor="oklch(0.85 0.16 72)" stopOpacity="0.9"/>
              <stop offset="35%" stopColor="oklch(0.75 0.14 68)" stopOpacity="0.5"/>
              <stop offset="70%" stopColor="oklch(0.60 0.12 63)" stopOpacity="0.2"/>
              <stop offset="100%" stopColor="oklch(0.45 0.08 58)" stopOpacity="0"/>
            </radialGradient>
            <filter id="rightBlur">
              <feGaussianBlur stdDeviation="10"/>
            </filter>
          </defs>
          <ellipse cx="110" cy="345" rx="70" ry="22" fill="oklch(0.85 0.16 72)" opacity="0.65" filter="url(#rightBlur)"/>
          <path
            d="M 110 360 L 5 0 L 215 0 Z"
            fill="url(#rightCone)"
            filter="url(#rightBlur)"
          />
          <path
            d="M 110 360 L 85 0 L 135 0 Z"
            fill="oklch(0.92 0.10 78)"
            opacity="0.3"
            filter="url(#rightBlur)"
          />
          <circle cx="110" cy="355" r="5" fill="oklch(0.95 0.15 80)" opacity="0.9"/>
          <circle cx="110" cy="355" r="10" fill="oklch(0.85 0.16 72)" opacity="0.35" filter="url(#rightBlur)"/>
        </svg>

        {/* ── Text Overlay ── */}
        <div
          style={{
            position: "relative",
            zIndex: 10,
            textAlign: "center",
            padding: "0 2rem",
            opacity: textOpacity,
            transform: `translateY(${textY}px)`,
            transition: "opacity 0.05s linear, transform 0.05s linear",
            maxWidth: "900px",
          }}
        >
          {/* Section label */}
          <p
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontWeight: 400,
              fontStyle: "italic",
              fontSize: "clamp(0.8rem, 1.5vw, 1rem)",
              letterSpacing: "0.35em",
              color: "oklch(0.72 0.15 65)",
              textTransform: "uppercase",
              marginBottom: "1.2rem",
            }}
          >
            Landscape Lighting
          </p>

          {/* Main headline */}
          <h2
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontWeight: 700,
              fontSize: "clamp(2.8rem, 8vw, 7rem)",
              lineHeight: 0.92,
              color: "oklch(0.97 0.01 75)",
              textTransform: "uppercase",
              letterSpacing: "-0.02em",
              marginBottom: "1.5rem",
            }}
          >
            See Your Home<br />
            <em
              style={{
                fontStyle: "italic",
                fontWeight: 400,
                color: "oklch(0.82 0.16 68)",
              }}
            >
              in a New Light
            </em>
          </h2>

          {/* Subtext */}
          <p
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontWeight: 400,
              fontSize: "clamp(1rem, 2vw, 1.35rem)",
              lineHeight: 1.6,
              color: "oklch(0.80 0.04 75)",
              maxWidth: "560px",
              margin: "0 auto 2.5rem",
            }}
          >
            Transform your property after dark. Our landscape lighting designs
            extend your outdoor living into the evening — uplighting trees,
            illuminating pathways, and creating drama around water features.
          </p>

          {/* CTA */}
          <a
            href="/services/landscape-lighting"
            style={{
              display: "inline-block",
              fontFamily: "'Cormorant Garamond', serif",
              fontWeight: 600,
              fontSize: "0.9rem",
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

        {/* ── Scroll progress indicator ── */}
        <div
          style={{
            position: "absolute",
            bottom: "2rem",
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "0.5rem",
            opacity: progress < 0.15 ? 1 : Math.max(0, 1 - (progress - 0.15) / 0.15),
            transition: "opacity 0.1s linear",
          }}
        >
          <span
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontStyle: "italic",
              fontSize: "0.75rem",
              letterSpacing: "0.2em",
              color: "oklch(0.65 0.04 75)",
              textTransform: "uppercase",
            }}
          >
            Scroll to illuminate
          </span>
          <svg width="20" height="30" viewBox="0 0 20 30" fill="none">
            <rect x="8" y="0" width="4" height="20" rx="2" fill="oklch(0.65 0.04 75)" opacity="0.4"/>
            <circle cx="10" cy="6" r="3" fill="oklch(0.82 0.16 68)" opacity="0.8">
              <animate attributeName="cy" values="4;16;4" dur="1.8s" repeatCount="indefinite"/>
            </circle>
          </svg>
        </div>

        {/* ── Section number label ── */}
        <div
          style={{
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
          }}
        >
          04 — Landscape Lighting
        </div>
      </div>
    </div>
  );
}
