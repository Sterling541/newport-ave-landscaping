/* ============================================================
   HERO SECTION — Southview-Inspired Full-Bleed Slideshow
   Design: Full-screen photo carousel. Minimal text overlay.
   "DESIGN · BUILD · MAINTAIN" tagline at bottom.
   Single "CONTACT US" CTA. Photography does the talking.
   Auto-advances every 6s. Manual prev/next arrows.
   ============================================================ */
import { useEffect, useState, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Confirmed working CDN URLs
const CONFIRMED_SLIDES = [
  {
    image:
      "https://d2xsxph8kpxj0f.cloudfront.net/310519663503028182/g3pw3MRUapabcDUbhBEFxx/facility-showroom_fd5f40e4.webp",
    caption: "Award-Winning Design",
  },
  {
    image:
      "https://d2xsxph8kpxj0f.cloudfront.net/310519663503028182/g3pw3MRUapabcDUbhBEFxx/facility-aerial2_d22fc996.webp",
    caption: "Central Oregon's Premier Landscaping",
  },
  {
    image:
      "https://d2xsxph8kpxj0f.cloudfront.net/310519663503028182/g3pw3MRUapabcDUbhBEFxx/facility-nursery_c0df8919.webp",
    caption: "Residential · Commercial · HOA",
  },
  {
    image:
      "https://d2xsxph8kpxj0f.cloudfront.net/310519663503028182/g3pw3MRUapabcDUbhBEFxx/facility-aerial_98383b9b.webp",
    caption: "10,000+ Projects Completed",
  },
];

export default function HeroSection() {
  const [current, setCurrent] = useState(0);
  const [transitioning, setTransitioning] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 200);
    return () => clearTimeout(t);
  }, []);

  const goTo = useCallback(
    (index: number) => {
      if (transitioning) return;
      setTransitioning(true);
      setTimeout(() => {
        setCurrent(index);
        setTransitioning(false);
      }, 500);
    },
    [transitioning]
  );

  const next = useCallback(() => {
    goTo((current + 1) % CONFIRMED_SLIDES.length);
  }, [current, goTo]);

  const prev = useCallback(() => {
    goTo((current - 1 + CONFIRMED_SLIDES.length) % CONFIRMED_SLIDES.length);
  }, [current, goTo]);

  // Auto-advance
  useEffect(() => {
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [next]);

  const slide = CONFIRMED_SLIDES[current];

  return (
    <section
      className="relative overflow-hidden"
      style={{ height: "100svh", minHeight: "600px" }}
    >
      {/* ── Background photo ── */}
      <div
        className="absolute inset-0 transition-opacity duration-700"
        style={{
          backgroundImage: `url(${slide.image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: transitioning ? 0 : 1,
        }}
      />

      {/* ── Dark gradient overlay — heavier at bottom for text legibility ── */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, oklch(0 0 0 / 0.20) 0%, oklch(0 0 0 / 0.10) 40%, oklch(0 0 0 / 0.55) 80%, oklch(0 0 0 / 0.75) 100%)",
        }}
      />

      {/* ── Bottom content ── */}
      <div
        className="absolute bottom-0 left-0 right-0 z-10"
        style={{
          padding: "0 0 clamp(2.5rem, 6vw, 5rem)",
          opacity: loaded ? 1 : 0,
          transform: loaded ? "translateY(0)" : "translateY(20px)",
          transition: "opacity 1s ease 0.4s, transform 1s ease 0.4s",
        }}
      >
        <div className="container">
          {/* Caption / eyebrow */}
          <div
            className="font-label mb-4 flex items-center gap-3"
            style={{ color: "oklch(0.72 0.12 25)" }}
          >
            <span
              className="inline-block h-px"
              style={{ width: "32px", backgroundColor: "oklch(0.46 0.20 25)" }}
            />
            {slide.caption}
          </div>

          {/* Main tagline */}
          <h1
            className="font-display font-light text-white mb-8"
            style={{
              fontSize: "clamp(2.8rem, 7vw, 6.5rem)",
              lineHeight: 0.95,
              letterSpacing: "-0.02em",
            }}
          >
            Design{" "}
            <span style={{ color: "oklch(0.75 0.10 25)", fontStyle: "italic" }}>·</span>
            {" "}Build{" "}
            <span style={{ color: "oklch(0.75 0.10 25)", fontStyle: "italic" }}>·</span>
            {" "}Maintain
          </h1>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4 items-center">
            <button
              onClick={() =>
                document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })
              }
              className="btn-red"
            >
              Contact Us
            </button>
            <button
              onClick={() =>
                document.querySelector("#portfolio")?.scrollIntoView({ behavior: "smooth" })
              }
              className="btn-outline-white"
            >
              Our Work
            </button>

            {/* Slide dots */}
            <div className="flex items-center gap-2 ml-auto">
              {CONFIRMED_SLIDES.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  className="transition-all duration-300"
                  style={{
                    width: i === current ? "24px" : "8px",
                    height: "3px",
                    backgroundColor:
                      i === current
                        ? "oklch(0.46 0.20 25)"
                        : "oklch(1 0 0 / 0.40)",
                    border: "none",
                  }}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Prev/Next arrows ── */}
      <button
        onClick={prev}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 flex items-center justify-center transition-all duration-200"
        style={{
          backgroundColor: "oklch(0 0 0 / 0.35)",
          color: "oklch(1 0 0)",
          border: "1px solid oklch(1 0 0 / 0.25)",
        }}
        onMouseEnter={(e) =>
          (e.currentTarget.style.backgroundColor = "oklch(0.46 0.20 25)")
        }
        onMouseLeave={(e) =>
          (e.currentTarget.style.backgroundColor = "oklch(0 0 0 / 0.35)")
        }
        aria-label="Previous slide"
      >
        <ChevronLeft size={18} />
      </button>
      <button
        onClick={next}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 flex items-center justify-center transition-all duration-200"
        style={{
          backgroundColor: "oklch(0 0 0 / 0.35)",
          color: "oklch(1 0 0)",
          border: "1px solid oklch(1 0 0 / 0.25)",
        }}
        onMouseEnter={(e) =>
          (e.currentTarget.style.backgroundColor = "oklch(0.46 0.20 25)")
        }
        onMouseLeave={(e) =>
          (e.currentTarget.style.backgroundColor = "oklch(0 0 0 / 0.35)")
        }
        aria-label="Next slide"
      >
        <ChevronRight size={18} />
      </button>
    </section>
  );
}
