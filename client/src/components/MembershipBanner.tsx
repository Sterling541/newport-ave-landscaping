/* ============================================================
   MEMBERSHIP BANNER — Homepage teaser
   Design: Matches MembershipSection — cream bg, brand red card,
   charcoal text, dot pattern, serif display headings.
   ============================================================ */
import { useEffect, useRef, useState } from "react";
import { useLocation } from "wouter";
import { Check, Droplets } from "lucide-react";

const bannerFeatures = [
  "Sprinkler system spring activation",
  "Mid-season inspection & adjustment",
  "Fall winterization / blowout",
  "Priority scheduling — no waiting",
];

export default function MembershipBanner() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [, navigate] = useLocation();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="py-24 relative overflow-hidden" style={{ backgroundColor: "oklch(0.97 0.012 85)" }}>
      {/* Subtle dot pattern */}
      <div
        className="absolute top-0 right-0 w-1/2 h-full opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(oklch(0.22 0.005 0) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      <div className="container relative z-10">
        <div
          ref={ref}
          className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(30px)",
            transition: "opacity 0.8s ease, transform 0.8s ease",
          }}
        >
          {/* Content */}
          <div>
            <div className="font-label mb-4 flex items-center gap-3" style={{ color: "oklch(0.46 0.20 25)" }}>
              <span className="inline-block w-8 h-px" style={{ backgroundColor: "oklch(0.46 0.20 25)" }} />
              Membership Program
            </div>

            <h2
              className="font-display font-light mb-4"
              style={{ fontSize: "clamp(2rem, 4vw, 3.2rem)", color: "oklch(0.22 0.005 0)", lineHeight: 1.1 }}
            >
              Newport Priority
              <br />
              <em style={{ color: "oklch(0.46 0.20 25)", fontStyle: "italic" }}>
                Irrigation Membership
              </em>
            </h2>

            <p className="font-body text-lg leading-relaxed mb-8" style={{ color: "oklch(0.38 0.005 0)" }}>
              Never worry about your sprinklers again. Our Priority Irrigation
              Membership gives you complete peace of mind — from spring
              activation to fall winterization, we handle everything.
            </p>

            <ul className="space-y-3 mb-10">
              {bannerFeatures.map((feature) => (
                <li key={feature} className="flex items-center gap-3">
                  <div
                    className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: "oklch(0.46 0.20 25)" }}
                  >
                    <Check size={12} strokeWidth={2.5} style={{ color: "oklch(1 0 0)" }} />
                  </div>
                  <span className="font-body text-sm" style={{ color: "oklch(0.38 0.005 0)" }}>
                    {feature}
                  </span>
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => { navigate("/membership"); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                className="btn-outline-dark"
              >
                Learn More
              </button>
              <button
                onClick={() => { navigate("/contact"); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                className="btn-red"
              >
                Sign Up Today
              </button>
            </div>
          </div>

          {/* Pricing Card — brand red, exact same style */}
          <div
            className="relative"
            style={{
              backgroundColor: "oklch(0.46 0.20 25)",
              padding: "3rem",
              borderRadius: "1.2rem 0.15rem 1.2rem 0.15rem",
            }}
          >
            {/* Decorative corner */}
            <div
              className="absolute top-0 right-0 w-24 h-24"
              style={{ background: "linear-gradient(225deg, oklch(0.38 0.20 25) 0%, transparent 60%)" }}
            />

            <div
              className="w-16 h-16 flex items-center justify-center mb-6"
              style={{
                backgroundColor: "oklch(1 0 0 / 0.15)",
                color: "oklch(1 0 0)",
                borderRadius: "1.2rem 0.15rem 1.2rem 0.15rem",
              }}
            >
              <Droplets size={28} strokeWidth={1.5} />
            </div>

            <div className="font-label mb-2" style={{ color: "oklch(1 0 0 / 0.70)" }}>
              Priority Irrigation Plan
            </div>

            <div className="font-display font-semibold mb-1" style={{ fontSize: "3rem", color: "oklch(1 0 0)", lineHeight: 1 }}>
              $349
            </div>
            <div className="font-body text-sm mb-6" style={{ color: "oklch(1 0 0 / 0.65)" }}>
              / year
            </div>

            <div className="h-px mb-6" style={{ backgroundColor: "oklch(1 0 0 / 0.20)" }} />

            <div className="space-y-3 mb-8">
              {[
                "Spring system activation",
                "Fall compressed-air blowout",
                "Annual backflow preventer test",
                "Priority scheduling all season",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <Check size={14} style={{ color: "oklch(1 0 0 / 0.80)", flexShrink: 0 }} />
                  <span className="font-body text-sm" style={{ color: "oklch(1 0 0 / 0.85)" }}>
                    {item}
                  </span>
                </div>
              ))}
            </div>

            <button
              onClick={() => { navigate("/membership"); window.scrollTo({ top: 0, behavior: "smooth" }); }}
              className="btn-outline-white w-full text-center"
              style={{ display: "block" }}
            >
              See Full Details
            </button>

            <p className="font-body text-xs mt-4 text-center" style={{ color: "oklch(1 0 0 / 0.55)" }}>
              Ask about our financing options
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
