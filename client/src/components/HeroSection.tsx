/* ============================================================
   HERO SECTION — Transformed Header
   Design: Full-bleed facility aerial photo. Large brand logo
   centered over the image as the dominant visual statement.
   Headline + CTAs sit below the logo. Stats bar at bottom.
   Mobile: logo scales down gracefully, text remains readable.
   Tablet: logo at medium size, 2-col stats.
   ============================================================ */
import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";

const HERO_IMAGE =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663503028182/g3pw3MRUapabcDUbhBEFxx/NewportLandscapingFacilityHiResPhotos56_a7221ea8.webp";

// White-background logo for the hero (shows clearly on dark overlay)
const LOGO_WHITE_BG =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663503028182/g3pw3MRUapabcDUbhBEFxx/newport-logo-white_75ad8884.png";

export default function HeroSection() {
  const [loaded, setLoaded] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 150);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToServices = () => {
    document.querySelector("#services")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex flex-col overflow-hidden"
      style={{ clipPath: "polygon(0 0, 100% 0, 100% 93%, 0 100%)", paddingBottom: "7rem" }}
    >
      {/* ── Background photo with parallax ── */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url(${HERO_IMAGE})`,
          backgroundSize: "cover",
          backgroundPosition: "center 30%",
          transform: `translateY(${scrollY * 0.2}px)`,
          willChange: "transform",
        }}
      />

      {/* ── Dark overlay — heavier at top to frame logo, lighter at bottom ── */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, oklch(0.08 0.005 0 / 0.80) 0%, oklch(0.10 0.005 0 / 0.65) 40%, oklch(0.10 0.005 0 / 0.55) 70%, oklch(0.08 0.005 0 / 0.70) 100%)",
        }}
      />

      {/* ── Content column ── */}
      <div className="relative z-10 flex flex-col flex-1">

        {/* ── LARGE LOGO — the hero's visual centerpiece ── */}
        {/* Positioned to sit below the nav bar (top ~90px) and dominate the upper hero */}
        <div
          className="flex justify-center items-center"
          style={{
            paddingTop: "clamp(90px, 14vw, 140px)",
            paddingBottom: "clamp(16px, 3vw, 32px)",
            opacity: loaded ? 1 : 0,
            transform: loaded ? "scale(1) translateY(0)" : "scale(0.92) translateY(-12px)",
            transition: "opacity 1.0s ease 0.1s, transform 1.0s ease 0.1s",
          }}
        >
          {/* White drop shadow to make logo pop off the photo */}
          <img
            src={LOGO_WHITE_BG}
            alt="Newport Avenue Landscaping"
            style={{
              width: "clamp(220px, 38vw, 520px)",
              height: "auto",
              objectFit: "contain",
              filter: "drop-shadow(0 4px 32px oklch(0 0 0 / 0.55))",
            }}
          />
        </div>

        {/* ── Thin red divider line below logo ── */}
        <div
          className="mx-auto"
          style={{
            width: "clamp(60px, 12vw, 120px)",
            height: "3px",
            backgroundColor: "oklch(0.46 0.20 25)",
            opacity: loaded ? 1 : 0,
            transition: "opacity 0.8s ease 0.5s",
            marginBottom: "clamp(20px, 3.5vw, 40px)",
          }}
        />

        {/* ── Headline + subtext + CTAs ── */}
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">

            {/* Eyebrow label */}
            <div
              className="font-label mb-4 flex items-center justify-center gap-3"
              style={{
                color: "oklch(0.85 0.10 25)",
                opacity: loaded ? 1 : 0,
                transform: loaded ? "translateY(0)" : "translateY(16px)",
                transition: "opacity 0.8s ease 0.35s, transform 0.8s ease 0.35s",
              }}
            >
              <span className="inline-block w-6 h-px" style={{ backgroundColor: "oklch(0.46 0.20 25)" }} />
              Central Oregon's Premier Landscaping
              <span className="inline-block w-6 h-px" style={{ backgroundColor: "oklch(0.46 0.20 25)" }} />
            </div>

            {/* Main headline */}
            <h1
              className="font-display font-light leading-none mb-5"
              style={{
                fontSize: "clamp(2.4rem, 6vw, 5.5rem)",
                color: "oklch(1 0 0)",
                opacity: loaded ? 1 : 0,
                transform: loaded ? "translateY(0)" : "translateY(24px)",
                transition: "opacity 0.9s ease 0.5s, transform 0.9s ease 0.5s",
              }}
            >
              Your Dream{" "}
              <em style={{ color: "oklch(0.85 0.10 25)", fontStyle: "italic" }}>
                Outdoor Space
              </em>{" "}
              Comes to Life
            </h1>

            {/* Subtext */}
            <p
              className="font-body text-base font-light mx-auto mb-8 leading-relaxed"
              style={{
                color: "oklch(0.88 0.003 0)",
                maxWidth: "560px",
                opacity: loaded ? 1 : 0,
                transform: loaded ? "translateY(0)" : "translateY(16px)",
                transition: "opacity 0.8s ease 0.65s, transform 0.8s ease 0.65s",
              }}
            >
              For over 21 years, Newport Avenue Landscaping has been transforming
              residential, commercial, and HOA properties across Central Oregon —
              with award-winning design and a 5-year installation warranty.
            </p>

            {/* CTAs */}
            <div
              className="flex flex-wrap gap-4 justify-center"
              style={{
                opacity: loaded ? 1 : 0,
                transform: loaded ? "translateY(0)" : "translateY(16px)",
                transition: "opacity 0.8s ease 0.8s, transform 0.8s ease 0.8s",
              }}
            >
              <button
                onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })}
                className="btn-red"
              >
                Start Your Project
              </button>
              <button
                onClick={() => document.querySelector("#portfolio")?.scrollIntoView({ behavior: "smooth" })}
                className="btn-outline-white"
              >
                View Our Work
              </button>
            </div>
          </div>
        </div>

        {/* ── Stats row ── */}
        <div
          className="container mt-auto pt-12"
          style={{
            opacity: loaded ? 1 : 0,
            transition: "opacity 0.8s ease 1.0s",
          }}
        >
          <div
            className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-8"
            style={{ borderTop: "1px solid oklch(1 0 0 / 0.20)" }}
          >
            {[
              { value: "21+", label: "Years in Business" },
              { value: "5-yr", label: "Installation Warranty" },
              { value: "10,000+", label: "Projects Completed" },
              { value: "A+", label: "Award-Winning Design" },
            ].map((stat) => (
              <div key={stat.label} className="text-center sm:text-left">
                <div
                  className="font-display font-semibold"
                  style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", color: "oklch(0.85 0.10 25)", lineHeight: 1 }}
                >
                  {stat.value}
                </div>
                <div
                  className="font-label mt-1"
                  style={{ color: "oklch(0.78 0.005 0)", fontSize: "0.62rem" }}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Scroll indicator ── */}
      <button
        onClick={scrollToServices}
        className="absolute bottom-14 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1.5"
        style={{ color: "oklch(0.80 0.003 0)" }}
      >
        <span className="font-label" style={{ fontSize: "0.6rem" }}>Explore</span>
        <ChevronDown size={18} className="animate-bounce" style={{ color: "oklch(0.85 0.10 25)" }} />
      </button>
    </section>
  );
}
