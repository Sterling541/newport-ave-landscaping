/* ============================================================
   MEMBERSHIP BANNER — Homepage teaser
   Dark charcoal background, brand red accents, badge, CTA
   ============================================================ */
import { useEffect, useRef, useState } from "react";
import { useLocation } from "wouter";
import { Droplets, CheckCircle } from "lucide-react";

const BADGE_ITEMS = [
  "Spring Activation",
  "Fall Winterization",
  "Annual Backflow Test",
  "Priority Scheduling",
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
    <section
      className="relative overflow-hidden"
      style={{ backgroundColor: "oklch(0.12 0.005 0)" }}
    >
      {/* Subtle diagonal texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage: "repeating-linear-gradient(45deg, oklch(1 0 0) 0px, oklch(1 0 0) 1px, transparent 1px, transparent 20px)",
        }}
      />

      {/* Red accent bar at top */}
      <div style={{ height: "4px", backgroundColor: "oklch(0.46 0.20 25)" }} />

      <div
        ref={ref}
        className="container py-16 relative z-10"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(24px)",
          transition: "opacity 0.8s ease, transform 0.8s ease",
        }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">

          {/* Badge column */}
          <div className="lg:col-span-3 flex justify-center lg:justify-start">
            <div
              className="relative flex flex-col items-center justify-center text-center"
              style={{
                width: "180px",
                height: "180px",
                borderRadius: "50%",
                backgroundColor: "oklch(0.46 0.20 25)",
                boxShadow: "0 0 0 8px oklch(0.46 0.20 25 / 0.18), 0 0 0 16px oklch(0.46 0.20 25 / 0.07)",
                flexShrink: 0,
              }}
            >
              <Droplets size={28} strokeWidth={1.5} style={{ color: "oklch(1 0 0 / 0.75)", marginBottom: "6px" }} />
              <div
                className="font-label text-white"
                style={{ fontSize: "0.55rem", letterSpacing: "0.14em", lineHeight: 1.4, opacity: 0.85 }}
              >
                NEWPORT
              </div>
              <div
                className="font-display font-semibold text-white"
                style={{ fontSize: "1.05rem", lineHeight: 1.1 }}
              >
                Priority
              </div>
              <div
                className="font-display font-light text-white"
                style={{ fontSize: "0.78rem", lineHeight: 1.1, fontStyle: "italic", color: "oklch(1 0 0 / 0.85)" }}
              >
                Irrigation
              </div>
              <div
                className="font-label text-white mt-1"
                style={{ fontSize: "0.52rem", letterSpacing: "0.12em", opacity: 0.75 }}
              >
                MEMBERSHIP
              </div>
            </div>
          </div>

          {/* Copy column */}
          <div className="lg:col-span-6">
            <div className="font-label mb-3 flex items-center gap-3" style={{ color: "oklch(0.72 0.12 25)" }}>
              <span className="inline-block h-px w-7" style={{ backgroundColor: "oklch(0.46 0.20 25)" }} />
              Newport Priority Program
            </div>
            <h2
              className="font-display font-light text-white mb-4"
              style={{ fontSize: "clamp(1.6rem, 3vw, 2.6rem)", lineHeight: 1.1 }}
            >
              Never Worry About<br />
              <em style={{ color: "oklch(0.75 0.10 25)" }}>Your Sprinklers Again</em>
            </h2>
            <p
              className="font-body mb-6"
              style={{ color: "oklch(0.68 0.008 0)", fontWeight: 300, lineHeight: 1.75, maxWidth: "520px" }}
            >
              Our Priority Irrigation Membership covers everything your system needs year-round — spring activation, fall winterization, and annual backflow testing — so you're always first on the schedule and never caught off-guard.
            </p>
            <div className="grid grid-cols-2 gap-2 mb-8">
              {BADGE_ITEMS.map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <CheckCircle size={14} style={{ color: "oklch(0.72 0.12 25)", flexShrink: 0 }} />
                  <span className="font-body text-sm" style={{ color: "oklch(0.72 0.008 0)", fontWeight: 300 }}>
                    {item}
                  </span>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => { navigate("/membership"); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                className="btn-red"
              >
                Learn More
              </button>
              <button
                onClick={() => { navigate("/contact"); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                className="btn-outline-white"
              >
                Sign Up Today
              </button>
            </div>
          </div>

          {/* Pricing callout */}
          <div className="lg:col-span-3">
            <div
              className="p-6 text-center"
              style={{
                backgroundColor: "oklch(0.18 0.005 0)",
                borderRadius: "1.2rem 0.15rem 1.2rem 0.15rem",
                border: "1px solid oklch(0.28 0.005 0)",
              }}
            >
              <div className="font-label mb-2" style={{ color: "oklch(0.60 0.008 0)", fontSize: "0.60rem" }}>
                ANNUAL MEMBERSHIP
              </div>
              <div
                className="font-display font-semibold text-white"
                style={{ fontSize: "2.8rem", lineHeight: 1 }}
              >
                $349
              </div>
              <div className="font-body text-sm mb-4" style={{ color: "oklch(0.55 0.008 0)", fontWeight: 300 }}>
                / year
              </div>
              <div
                className="h-px mb-4"
                style={{ backgroundColor: "oklch(0.25 0.005 0)" }}
              />
              <div className="font-body text-xs" style={{ color: "oklch(0.55 0.008 0)", fontWeight: 300, lineHeight: 1.6 }}>
                Includes spring activation, fall blowout & annual backflow test
              </div>
              <button
                onClick={() => { navigate("/membership"); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                className="font-label text-white w-full mt-5 py-3 transition-opacity hover:opacity-80"
                style={{ backgroundColor: "oklch(0.46 0.20 25)", fontSize: "0.62rem", letterSpacing: "0.10em" }}
              >
                SEE FULL DETAILS
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* Red accent bar at bottom */}
      <div style={{ height: "4px", backgroundColor: "oklch(0.46 0.20 25)" }} />
    </section>
  );
}
