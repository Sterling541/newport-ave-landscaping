/* ============================================================
   HERO SECTION — Brand Refresh
   Bright, airy hero with lighter overlay, brand red accents
   White text on photo, red CTA button
   ============================================================ */
import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";

const HERO_IMAGE =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663503028182/g3pw3MRUapabcDUbhBEFxx/NewportLandscapingFacilityHiResPhotos56_a7221ea8.webp";

export default function HeroSection() {
  const [loaded, setLoaded] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 100);
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
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ clipPath: "polygon(0 0, 100% 0, 100% 92%, 0 100%)", paddingBottom: "8rem" }}
    >
      {/* Background image with parallax */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url(${HERO_IMAGE})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          transform: `translateY(${scrollY * 0.25}px)`,
          willChange: "transform",
        }}
      />

      {/* Lighter overlay — still readable but brighter feel */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(120deg, oklch(0.10 0.005 0 / 0.72) 0%, oklch(0.15 0.005 0 / 0.45) 55%, oklch(0.15 0.005 0 / 0.20) 100%)",
        }}
      />
      {/* Bottom fade for smooth transition into white section */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to top, oklch(0.10 0.005 0 / 0.50) 0%, transparent 40%)",
        }}
      />

      {/* Content */}
      <div className="container relative z-10 pt-36 pb-20">
        <div className="max-w-3xl">
          {/* Label */}
          <div
            className="font-label mb-6 flex items-center gap-3"
            style={{
              opacity: loaded ? 1 : 0,
              transform: loaded ? "translateY(0)" : "translateY(20px)",
              transition: "opacity 0.8s ease 0.1s, transform 0.8s ease 0.1s",
              color: "oklch(0.85 0.10 25)",
            }}
          >
            <span
              className="inline-block w-8 h-px"
              style={{ backgroundColor: "oklch(0.46 0.20 25)" }}
            />
            Central Oregon's Premier Landscaping
          </div>

          {/* Main headline */}
          <h1
            className="font-display font-light leading-none mb-6"
            style={{
              fontSize: "clamp(3rem, 7vw, 6rem)",
              color: "oklch(1 0 0)",
              opacity: loaded ? 1 : 0,
              transform: loaded ? "translateY(0)" : "translateY(30px)",
              transition: "opacity 0.9s ease 0.25s, transform 0.9s ease 0.25s",
            }}
          >
            Your Dream
            <br />
            <em style={{ color: "oklch(0.85 0.10 25)", fontStyle: "italic" }}>
              Outdoor Space
            </em>
            <br />
            Comes to Life
          </h1>

          {/* Subtext */}
          <p
            className="font-body text-lg font-light max-w-xl mb-10 leading-relaxed"
            style={{
              color: "oklch(0.90 0.003 0)",
              opacity: loaded ? 1 : 0,
              transform: loaded ? "translateY(0)" : "translateY(20px)",
              transition: "opacity 0.8s ease 0.45s, transform 0.8s ease 0.45s",
            }}
          >
            For over 21 years, Newport Avenue Landscaping has been transforming
            outdoor spaces in Bend, Oregon into breathtaking landscapes — with
            award-winning design and a 5-year installation warranty.
          </p>

          {/* CTAs */}
          <div
            className="flex flex-wrap gap-4"
            style={{
              opacity: loaded ? 1 : 0,
              transform: loaded ? "translateY(0)" : "translateY(20px)",
              transition: "opacity 0.8s ease 0.6s, transform 0.8s ease 0.6s",
            }}
          >
            <button
              onClick={() =>
                document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })
              }
              className="btn-red"
            >
              Start Your Project
            </button>
            <button
              onClick={() =>
                document.querySelector("#portfolio")?.scrollIntoView({ behavior: "smooth" })
              }
              className="btn-outline-white"
            >
              View Our Work
            </button>
          </div>

          {/* Stats */}
          <div
            className="grid grid-cols-2 sm:grid-cols-4 gap-6 mt-14 pt-10"
            style={{
              borderTop: "1px solid oklch(1 0 0 / 0.25)",
              opacity: loaded ? 1 : 0,
              transition: "opacity 0.8s ease 0.8s",
            }}
          >
            {[
              { value: "21+", label: "Years in Business" },
              { value: "5-yr", label: "Installation Warranty" },
              { value: "500+", label: "Projects Completed" },
              { value: "A+", label: "Award-Winning Design" },
            ].map((stat) => (
              <div key={stat.label}>
                <div
                  className="font-display font-semibold"
                  style={{ fontSize: "2.5rem", color: "oklch(0.85 0.10 25)", lineHeight: 1 }}
                >
                  {stat.value}
                </div>
                <div
                  className="font-label mt-1"
                  style={{ color: "oklch(0.80 0.005 0)" }}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <button
        onClick={scrollToServices}
        className="absolute bottom-16 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
        style={{ color: "oklch(0.85 0.003 0)" }}
      >
        <span className="font-label" style={{ fontSize: "0.65rem" }}>
          Explore
        </span>
        <ChevronDown
          size={20}
          className="animate-bounce"
          style={{ color: "oklch(0.85 0.10 25)" }}
        />
      </button>
    </section>
  );
}
