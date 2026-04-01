/* ============================================================
   STATS / INTRO SECTION — Southview-Inspired
   Design: White background. Centered phone number large serif.
   Brief company description. Two CTA buttons (Residential | Commercial).
   Clean, minimal, lots of whitespace — like Southview's post-hero section.
   ============================================================ */
import { useEffect, useRef, useState } from "react";
import { Phone } from "lucide-react";

export default function StatsSection() {
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
      className="py-20"
      style={{ backgroundColor: "oklch(1 0 0)" }}
    >
      <div className="container">
        <div
          className="max-w-2xl mx-auto text-center"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(24px)",
            transition: "opacity 0.8s ease, transform 0.8s ease",
          }}
        >
          {/* Large phone number — Southview style */}
          <a
            href="tel:5416178873"
            className="font-display flex items-center justify-center gap-3 mb-6 group"
            style={{
              fontSize: "clamp(1.6rem, 4vw, 2.8rem)",
              color: "oklch(0.46 0.20 25)",
              fontWeight: 400,
              letterSpacing: "0.02em",
              textDecoration: "none",
            }}
          >
            <Phone size={24} strokeWidth={1.5} />
            Call (541) 617-8873
          </a>

          {/* Description */}
          <p
            className="font-body mb-10 leading-relaxed"
            style={{
              fontSize: "1.05rem",
              color: "oklch(0.42 0.008 0)",
              fontWeight: 300,
            }}
          >
            Newport Avenue Landscaping is a Bend, Oregon landscaping firm with a
            reputation for excellence. We provide homeowners, commercial clients,
            and HOA communities with landscape design, construction, and
            maintenance services — backed by a 5-year installation warranty.
          </p>

          {/* Two CTA buttons */}
          <div className="flex flex-wrap gap-4 justify-center">
            <button
              onClick={() =>
                document.querySelector("#services")?.scrollIntoView({ behavior: "smooth" })
              }
              className="btn-outline-dark"
            >
              Residential Landscaping
            </button>
            <button
              onClick={() =>
                document.querySelector("#services")?.scrollIntoView({ behavior: "smooth" })
              }
              className="btn-outline-dark"
            >
              Commercial Landscaping
            </button>
          </div>
        </div>

        {/* Stats row */}
        <div
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 pt-12"
          style={{
            borderTop: "1px solid oklch(0.88 0.010 85)",
            opacity: visible ? 1 : 0,
            transition: "opacity 0.8s ease 0.3s",
          }}
        >
          {[
            { value: "21+", label: "Years in Business" },
            { value: "10,000+", label: "Projects Completed" },
            { value: "5-Year", label: "Installation Warranty" },
            { value: "Res · Com · HOA", label: "All Client Types" },
          ].map((stat, i) => (
            <div key={stat.label} className="text-center">
              <div
                className="font-display"
                style={{
                  fontSize: "clamp(1.6rem, 3vw, 2.4rem)",
                  color: "oklch(0.46 0.20 25)",
                  fontWeight: 400,
                  lineHeight: 1,
                  transitionDelay: `${i * 0.1}s`,
                }}
              >
                {stat.value}
              </div>
              <div
                className="font-label mt-2"
                style={{ color: "oklch(0.55 0.008 0)" }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
