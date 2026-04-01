/* ============================================================
   CTA BANNER — Sunlit Craftsman Design
   Full-bleed image with warm overlay and call to action
   ============================================================ */
import { useEffect, useRef, useState } from "react";

const OUTDOOR_LIVING =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663503028182/g3pw3MRUapabcDUbhBEFxx/outdoor-living-AuvjXxv4t6LYr7V5Zp3Lby.webp";

export default function CTABanner() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className="relative py-32 overflow-hidden"
    >
      {/* Background */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url(${OUTDOOR_LIVING})`,
          backgroundSize: "cover",
          backgroundPosition: "center 40%",
        }}
      />
      {/* Overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.15 0.05 152 / 0.88) 0%, oklch(0.22 0.06 152 / 0.7) 60%, oklch(0.22 0.06 152 / 0.5) 100%)",
        }}
      />

      {/* Content */}
      <div className="container relative z-10 text-center">
        <div
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(30px)",
            transition: "opacity 0.8s ease, transform 0.8s ease",
          }}
        >
          <div
            className="font-label mb-6 flex items-center justify-center gap-3"
            style={{ color: "oklch(0.68 0.10 42)" }}
          >
            <span
              className="inline-block w-8 h-px"
              style={{ backgroundColor: "oklch(0.68 0.10 42)" }}
            />
            Ask About Our Financing
            <span
              className="inline-block w-8 h-px"
              style={{ backgroundColor: "oklch(0.68 0.10 42)" }}
            />
          </div>

          <h2
            className="font-display font-light mb-6 mx-auto"
            style={{
              fontSize: "clamp(2.2rem, 5vw, 4rem)",
              color: "oklch(0.97 0.012 85)",
              lineHeight: 1.1,
              maxWidth: "700px",
            }}
          >
            Ready to Transform Your
            <br />
            <em style={{ color: "oklch(0.68 0.10 42)", fontStyle: "italic" }}>
              Outdoor Space?
            </em>
          </h2>

          <p
            className="font-body text-lg mb-10 mx-auto"
            style={{
              color: "oklch(0.85 0.02 85)",
              maxWidth: "500px",
              lineHeight: 1.7,
            }}
          >
            Partner with Central Oregon's premier landscaping team. Award-winning
            design, exceptional craftsmanship, and a 5-year warranty you can
            count on.
          </p>

          <div className="flex flex-wrap gap-4 justify-center">
            <button
              onClick={() =>
                document
                  .querySelector("#contact")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="btn-terracotta"
            >
              Start Your Project
            </button>
            <a
              href="tel:5416178873"
              className="btn-outline-cream"
            >
              Call (541) 617-8873
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
