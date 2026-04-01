/* ============================================================
   MEMBERSHIP SECTION — Sunlit Craftsman Design
   Priority Irrigation Membership feature
   Warm terracotta accent, forest green background
   ============================================================ */
import { useEffect, useRef, useState } from "react";
import { Check, Droplets } from "lucide-react";

const membershipFeatures = [
  "Sprinkler system spring activation",
  "Mid-season inspection & adjustment",
  "Fall winterization / blowout",
  "Priority scheduling — no waiting",
  "Dedicated irrigation technician",
  "Annual system health report",
];

export default function MembershipSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      className="py-24 relative overflow-hidden"
      style={{ backgroundColor: "oklch(0.93 0.018 85)" }}
    >
      {/* Decorative background element */}
      <div
        className="absolute top-0 right-0 w-1/2 h-full opacity-5 pointer-events-none"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, oklch(0.22 0.06 152) 0px, oklch(0.22 0.06 152) 1px, transparent 1px, transparent 20px)",
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
            <div
              className="font-label mb-4 flex items-center gap-3"
              style={{ color: "oklch(0.58 0.12 42)" }}
            >
              <span
                className="inline-block w-8 h-px"
                style={{ backgroundColor: "oklch(0.58 0.12 42)" }}
              />
              Membership Program
            </div>

            <h2
              className="font-display font-light mb-4"
              style={{
                fontSize: "clamp(2rem, 4vw, 3.2rem)",
                color: "oklch(0.18 0.04 152)",
                lineHeight: 1.1,
              }}
            >
              Newport Priority
              <br />
              <em style={{ color: "oklch(0.22 0.06 152)", fontStyle: "italic" }}>
                Irrigation Membership
              </em>
            </h2>

            <p
              className="font-body text-lg leading-relaxed mb-8"
              style={{ color: "oklch(0.35 0.04 152)" }}
            >
              Never worry about your sprinklers again. Our Priority Irrigation
              Membership gives you complete peace of mind — from spring
              activation to fall winterization, we handle everything.
            </p>

            <ul className="space-y-3 mb-10">
              {membershipFeatures.map((feature) => (
                <li key={feature} className="flex items-center gap-3">
                  <div
                    className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: "oklch(0.22 0.06 152)" }}
                  >
                    <Check size={12} strokeWidth={2.5} style={{ color: "oklch(0.97 0.012 85)" }} />
                  </div>
                  <span
                    className="font-body text-sm"
                    style={{ color: "oklch(0.35 0.04 152)" }}
                  >
                    {feature}
                  </span>
                </li>
              ))}
            </ul>

            <button
              onClick={() =>
                document
                  .querySelector("#contact")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="btn-forest"
            >
              Sign Up Today
            </button>
          </div>

          {/* Card */}
          <div
            className="relative"
            style={{
              backgroundColor: "oklch(0.22 0.06 152)",
              padding: "3rem",
            }}
          >
            {/* Decorative corner */}
            <div
              className="absolute top-0 right-0 w-24 h-24"
              style={{
                background:
                  "linear-gradient(225deg, oklch(0.58 0.12 42) 0%, transparent 60%)",
              }}
            />

            <div
              className="w-16 h-16 flex items-center justify-center mb-6"
              style={{
                backgroundColor: "oklch(0.58 0.12 42 / 0.2)",
                color: "oklch(0.68 0.10 42)",
              }}
            >
              <Droplets size={28} strokeWidth={1.5} />
            </div>

            <div
              className="font-label mb-2"
              style={{ color: "oklch(0.68 0.10 42)" }}
            >
              Everything Plan
            </div>

            <div
              className="font-display font-semibold mb-1"
              style={{ fontSize: "3rem", color: "oklch(0.97 0.012 85)", lineHeight: 1 }}
            >
              $388
            </div>
            <div
              className="font-body text-sm mb-6"
              style={{ color: "oklch(0.72 0.03 75)" }}
            >
              / Month <span className="text-xs">(based on min. 1 man hour/week)</span>
            </div>

            <div
              className="h-px mb-6"
              style={{ backgroundColor: "oklch(0.97 0.012 85 / 0.15)" }}
            />

            <div className="space-y-3 mb-8">
              {[
                "Weekly lawn maintenance",
                "Spring & fall clean-ups",
                "Annual aeration",
                "Sprinkler winterization",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <Check
                    size={14}
                    style={{ color: "oklch(0.68 0.10 42)", flexShrink: 0 }}
                  />
                  <span
                    className="font-body text-sm"
                    style={{ color: "oklch(0.85 0.02 85)" }}
                  >
                    {item}
                  </span>
                </div>
              ))}
            </div>

            <button
              onClick={() =>
                document
                  .querySelector("#contact")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="btn-terracotta w-full text-center"
            >
              Get Started
            </button>

            <p
              className="font-body text-xs mt-4 text-center"
              style={{ color: "oklch(0.55 0.03 152)" }}
            >
              Ask about our financing options
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
