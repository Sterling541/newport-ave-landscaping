/* ============================================================
   HERO SECTION — Captivating Editorial / Colossal-Inspired
   Features:
   - Massive bleed display type that overflows viewport edges
   - Halftone dot texture overlay for editorial depth
   - Cinematic dark treatment with warm golden-hour gradient
   - Pill-shaped CTA buttons with + icon
   - Scroll progress indicator
   - Numbered slide counter (01 / 05)
   - Staggered text reveal on slide change
   ============================================================ */
import { useEffect, useState, useCallback } from "react";

const SLIDES = [
  {
    image:
      "https://d2xsxph8kpxj0f.cloudfront.net/310519663503028182/g3pw3MRUapabcDUbhBEFxx/NewportAveLandcaping-13_ef32520c.jpg",
    eyebrow: "Water Features & Outdoor Living",
    line1: "Where Every",
    line2: "Evening",
    line3: "Feels Like Home.",
    tag: "DESIGN · BUILD · MAINTAIN",
  },
  {
    image:
      "https://d2xsxph8kpxj0f.cloudfront.net/310519663503028182/g3pw3MRUapabcDUbhBEFxx/ITP_7404_28389405.jpg",
    eyebrow: "Patios & Outdoor Living",
    line1: "Your Home",
    line2: "Deserves",
    line3: "This.",
    tag: "HARDSCAPE · PATIOS · PERGOLAS",
  },
  {
    image:
      "https://d2xsxph8kpxj0f.cloudfront.net/310519663503028182/g3pw3MRUapabcDUbhBEFxx/fire4_82c70612.jpg",
    eyebrow: "Fire Features & Hardscape",
    line1: "Gather Around",
    line2: "Something",
    line3: "Beautiful.",
    tag: "FIRE FEATURES · SEATING WALLS",
  },
  {
    image:
      "https://d2xsxph8kpxj0f.cloudfront.net/310519663503028182/g3pw3MRUapabcDUbhBEFxx/NewportAveLandcaping-9_97b731b0.jpg",
    eyebrow: "Serving Central Oregon Since 2003",
    line1: "The Landscape",
    line2: "You've Always",
    line3: "Imagined.",
    tag: "BEND · REDMOND · SISTERS",
  },
  {
    image:
      "https://d2xsxph8kpxj0f.cloudfront.net/310519663503028182/g3pw3MRUapabcDUbhBEFxx/GLLPatio10_2ffabcfb.jpg",
    eyebrow: "Patios & Hardscape",
    line1: "Built for",
    line2: "Central Oregon",
    line3: "Life.",
    tag: "21+ YEARS · 10,000+ PROJECTS",
  },
];

export default function HeroSection() {
  const [current, setCurrent] = useState(0);
  const [transitioning, setTransitioning] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const goTo = useCallback(
    (index: number) => {
      if (transitioning) return;
      setTransitioning(true);
      setTimeout(() => {
        setCurrent(index);
        setTransitioning(false);
      }, 600);
    },
    [transitioning]
  );

  const next = useCallback(() => {
    goTo((current + 1) % SLIDES.length);
  }, [current, goTo]);

  const prev = useCallback(() => {
    goTo((current - 1 + SLIDES.length) % SLIDES.length);
  }, [current, goTo]);

  useEffect(() => {
    const timer = setInterval(next, 7000);
    return () => clearInterval(timer);
  }, [next]);

  const slide = SLIDES[current];
  const parallaxOffset = scrollY * 0.3;

  return (
    <section
      className="relative overflow-hidden"
      style={{ height: "100svh", minHeight: "640px" }}
    >
      {/* ── Background photo with parallax ── */}
      {SLIDES.map((s, i) => (
        <div
          key={i}
          className="absolute inset-0 transition-opacity duration-700"
          style={{
            backgroundImage: `url(${s.image})`,
            backgroundSize: "cover",
            backgroundPosition: `center ${parallaxOffset}px`,
            opacity: i === current ? (transitioning ? 0 : 1) : 0,
          }}
        />
      ))}

      {/* ── Cinematic gradient overlay — dark at bottom, warm tones ── */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, oklch(0.08 0.01 155 / 0.4) 0%, transparent 25%, transparent 45%, oklch(0.06 0.01 155 / 0.6) 70%, oklch(0.04 0.005 155 / 0.92) 100%)",
        }}
      />

      {/* ── Halftone dot texture overlay ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle, oklch(1 0 0 / 0.04) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
          mixBlendMode: "overlay",
        }}
      />

      {/* ── Top bar: section label + slide counter ── */}
      <div
        className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between"
        style={{
          padding: "clamp(1rem, 3vw, 1.75rem) clamp(1.25rem, 4vw, 3rem)",
          opacity: loaded ? 1 : 0,
          transition: "opacity 0.8s ease 0.6s",
        }}
      >
        {/* Section tag */}
        <div
          className="font-label text-xs tracking-widest flex items-center gap-2"
          style={{ color: "oklch(0.75 0.04 55)" }}
        >
          <span
            className="inline-block w-5 h-px"
            style={{ backgroundColor: "oklch(0.55 0.16 25)" }}
          />
          {slide.tag}
        </div>

        {/* Slide counter */}
        <div
          className="font-label text-xs tracking-widest"
          style={{ color: "oklch(0.65 0.04 55)" }}
        >
          <span style={{ color: "oklch(0.55 0.16 25)", fontSize: "1rem", fontWeight: 600 }}>
            {String(current + 1).padStart(2, "0")}
          </span>
          <span className="mx-1" style={{ color: "oklch(0.45 0.02 55)" }}>
            /
          </span>
          {String(SLIDES.length).padStart(2, "0")}
        </div>
      </div>

      {/* ── Massive bleed headline ── */}
      <div
        className="absolute inset-0 z-10 flex flex-col justify-end"
        style={{
          padding: "0 0 clamp(5rem, 12vw, 9rem)",
        }}
      >
        {/* Eyebrow */}
        <div
          className="font-label text-xs tracking-widest mb-4 flex items-center gap-3"
          style={{
            paddingLeft: "clamp(1.25rem, 5vw, 4rem)",
            color: "oklch(0.72 0.12 25)",
            opacity: loaded && !transitioning ? 1 : 0,
            transform: loaded && !transitioning ? "translateY(0)" : "translateY(8px)",
            transition: "opacity 0.6s ease 0.1s, transform 0.6s ease 0.1s",
          }}
        >
          <span
            className="inline-block h-px"
            style={{ width: "28px", backgroundColor: "oklch(0.46 0.20 25)" }}
          />
          {slide.eyebrow}
        </div>

        {/* Line 1 — standard weight */}
        <div
          style={{
            paddingLeft: "clamp(1.25rem, 5vw, 4rem)",
            overflow: "hidden",
            opacity: loaded && !transitioning ? 1 : 0,
            transform: loaded && !transitioning ? "translateY(0)" : "translateY(24px)",
            transition: "opacity 0.7s ease 0.2s, transform 0.7s ease 0.2s",
          }}
        >
          <span
            className="font-display font-light text-white block"
            style={{
              fontSize: "clamp(3.5rem, 9vw, 8.5rem)",
              lineHeight: 0.9,
              letterSpacing: "-0.03em",
            }}
          >
            {slide.line1}
          </span>
        </div>

        {/* Line 2 — italic accent, slightly larger, bleeds right */}
        <div
          style={{
            paddingLeft: "clamp(1.25rem, 5vw, 4rem)",
            overflow: "visible",
            opacity: loaded && !transitioning ? 1 : 0,
            transform: loaded && !transitioning ? "translateY(0)" : "translateY(32px)",
            transition: "opacity 0.7s ease 0.32s, transform 0.7s ease 0.32s",
          }}
        >
          <em
            className="font-display block"
            style={{
              fontSize: "clamp(4rem, 11vw, 10.5rem)",
              lineHeight: 0.88,
              letterSpacing: "-0.04em",
              color: "oklch(0.80 0.14 25)",
              fontStyle: "italic",
              fontWeight: 300,
              whiteSpace: "nowrap",
            }}
          >
            {slide.line2}
          </em>
        </div>

        {/* Line 3 — bold, dark */}
        <div
          style={{
            paddingLeft: "clamp(1.25rem, 5vw, 4rem)",
            overflow: "hidden",
            opacity: loaded && !transitioning ? 1 : 0,
            transform: loaded && !transitioning ? "translateY(0)" : "translateY(40px)",
            transition: "opacity 0.7s ease 0.44s, transform 0.7s ease 0.44s",
          }}
        >
          <span
            className="font-display font-semibold text-white block"
            style={{
              fontSize: "clamp(3.5rem, 9vw, 8.5rem)",
              lineHeight: 0.9,
              letterSpacing: "-0.03em",
            }}
          >
            {slide.line3}
          </span>
        </div>

        {/* ── CTAs ── */}
        <div
          className="flex flex-wrap gap-3 items-center mt-8"
          style={{
            paddingLeft: "clamp(1.25rem, 5vw, 4rem)",
            opacity: loaded && !transitioning ? 1 : 0,
            transform: loaded && !transitioning ? "translateY(0)" : "translateY(16px)",
            transition: "opacity 0.7s ease 0.56s, transform 0.7s ease 0.56s",
          }}
        >
          {/* Primary pill CTA */}
          <button
            onClick={() =>
              document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })
            }
            className="font-label text-xs tracking-widest flex items-center gap-2 transition-all duration-300"
            style={{
              backgroundColor: "oklch(0.46 0.20 25)",
              color: "oklch(1 0 0)",
              padding: "0.75rem 1.75rem",
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
            GET A FREE QUOTE
            <span
              className="inline-flex items-center justify-center rounded-full"
              style={{
                width: "18px",
                height: "18px",
                backgroundColor: "oklch(1 0 0 / 0.2)",
                fontSize: "14px",
                lineHeight: 1,
              }}
            >
              +
            </span>
          </button>

          {/* Secondary pill CTA */}
          <button
            onClick={() =>
              document.querySelector("#portfolio")?.scrollIntoView({ behavior: "smooth" })
            }
            className="font-label text-xs tracking-widest flex items-center gap-2 transition-all duration-300"
            style={{
              backgroundColor: "transparent",
              color: "oklch(0.95 0 0)",
              padding: "0.75rem 1.75rem",
              borderRadius: "999px",
              border: "1px solid oklch(1 0 0 / 0.35)",
              letterSpacing: "0.12em",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "oklch(1 0 0 / 0.1)";
              e.currentTarget.style.borderColor = "oklch(1 0 0 / 0.6)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "transparent";
              e.currentTarget.style.borderColor = "oklch(1 0 0 / 0.35)";
            }}
          >
            OUR WORK
            <span style={{ fontSize: "16px", lineHeight: 1 }}>→</span>
          </button>
        </div>
      </div>

      {/* ── Scroll progress bar at bottom ── */}
      <div
        className="absolute bottom-0 left-0 right-0 z-20 flex gap-1"
        style={{ height: "3px" }}
      >
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className="flex-1 transition-all duration-500"
            style={{
              backgroundColor:
                i === current
                  ? "oklch(0.46 0.20 25)"
                  : "oklch(1 0 0 / 0.20)",
              border: "none",
              cursor: "pointer",
            }}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>

      {/* ── Prev/Next arrows — minimal, editorial ── */}
      <button
        onClick={prev}
        className="absolute left-4 bottom-16 z-20 flex items-center justify-center transition-all duration-200"
        style={{
          width: "40px",
          height: "40px",
          borderRadius: "999px",
          backgroundColor: "oklch(0 0 0 / 0.30)",
          color: "oklch(1 0 0)",
          border: "1px solid oklch(1 0 0 / 0.20)",
          fontSize: "18px",
        }}
        onMouseEnter={(e) =>
          (e.currentTarget.style.backgroundColor = "oklch(0.46 0.20 25)")
        }
        onMouseLeave={(e) =>
          (e.currentTarget.style.backgroundColor = "oklch(0 0 0 / 0.30)")
        }
        aria-label="Previous slide"
      >
        ←
      </button>
      <button
        onClick={next}
        className="absolute z-20 flex items-center justify-center transition-all duration-200"
        style={{
          left: "calc(1rem + 48px)",
          bottom: "1rem",
          width: "40px",
          height: "40px",
          borderRadius: "999px",
          backgroundColor: "oklch(0 0 0 / 0.30)",
          color: "oklch(1 0 0)",
          border: "1px solid oklch(1 0 0 / 0.20)",
          fontSize: "18px",
        }}
        onMouseEnter={(e) =>
          (e.currentTarget.style.backgroundColor = "oklch(0.46 0.20 25)")
        }
        onMouseLeave={(e) =>
          (e.currentTarget.style.backgroundColor = "oklch(0 0 0 / 0.30)")
        }
        aria-label="Next slide"
      >
        →
      </button>
    </section>
  );
}
