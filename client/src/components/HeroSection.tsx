/* ============================================================
   HERO SECTION — Sunlit Craftsman Design
   Full-bleed photography, warm overlay, elegant display type
   Diagonal bottom divider, scroll-triggered animation
   ============================================================ */
import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";

const HERO_IMAGE =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663503028182/g3pw3MRUapabcDUbhBEFxx/hero-main-G8fqyZAnfti5GBXHAqJjh6.webp";

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
          transform: `translateY(${scrollY * 0.3}px)`,
          willChange: "transform",
        }}
      />

      {/* Layered overlays */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.15 0.05 152 / 0.82) 0%, oklch(0.22 0.06 152 / 0.55) 50%, oklch(0.22 0.06 152 / 0.25) 100%)",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to top, oklch(0.15 0.05 152 / 0.6) 0%, transparent 50%)",
        }}
      />

      {/* Content */}
      <div className="container relative z-10 pt-32 pb-20">
        <div className="max-w-3xl">
          {/* Label */}
          <div
            className="font-label mb-6 flex items-center gap-3"
            style={{
              opacity: loaded ? 1 : 0,
              transform: loaded ? "translateY(0)" : "translateY(20px)",
              transition: "opacity 0.8s ease 0.1s, transform 0.8s ease 0.1s",
              color: "oklch(0.68 0.10 42)",
            }}
          >
            <span
              className="inline-block w-8 h-px"
              style={{ backgroundColor: "oklch(0.68 0.10 42)" }}
            />
            Central Oregon's Premier Landscaping
          </div>

          {/* Main headline */}
          <h1
            className="font-display font-light leading-none mb-6"
            style={{
              fontSize: "clamp(3rem, 7vw, 6rem)",
              color: "oklch(0.97 0.012 85)",
              opacity: loaded ? 1 : 0,
              transform: loaded ? "translateY(0)" : "translateY(30px)",
              transition: "opacity 0.9s ease 0.25s, transform 0.9s ease 0.25s",
            }}
          >
            Your Dream
            <br />
            <em style={{ color: "oklch(0.80 0.08 42)", fontStyle: "italic" }}>
              Outdoor Space
            </em>
            <br />
            Comes to Life
          </h1>

          {/* Subtext */}
          <p
            className="font-body text-lg font-light max-w-xl mb-10 leading-relaxed"
            style={{
              color: "oklch(0.88 0.015 85)",
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
              onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })}
              className="btn-terracotta"
            >
              Start Your Project
            </button>
            <button
              onClick={() => document.querySelector("#portfolio")?.scrollIntoView({ behavior: "smooth" })}
              className="btn-outline-cream"
            >
              View Our Work
            </button>
          </div>

          {/* Stats */}
          <div
            className="flex flex-wrap gap-10 mt-14 pt-10"
            style={{
              borderTop: "1px solid oklch(0.97 0.012 85 / 0.2)",
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
                  style={{ fontSize: "2.5rem", color: "oklch(0.68 0.10 42)", lineHeight: 1 }}
                >
                  {stat.value}
                </div>
                <div
                  className="font-label mt-1"
                  style={{ color: "oklch(0.75 0.02 85)" }}
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
        className="absolute bottom-16 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 group"
        style={{ color: "oklch(0.85 0.02 85)" }}
      >
        <span className="font-label" style={{ fontSize: "0.65rem" }}>
          Explore
        </span>
        <ChevronDown
          size={20}
          className="animate-bounce"
          style={{ color: "oklch(0.68 0.10 42)" }}
        />
      </button>
    </section>
  );
}
