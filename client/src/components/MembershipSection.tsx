/* ============================================================
   MEMBERSHIP SECTION — Maintenance Plan Pricing
   Clearly titled "Year-Round Maintenance Plans" so visitors
   understand this is the bundled lawn care pricing card.
   ============================================================ */
import { useEffect, useRef, useState } from "react";
import { Check } from "lucide-react";

const irrigationFeatures = [
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
      { threshold: 0.12 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      className="py-24 relative overflow-hidden"
      style={{ backgroundColor: "oklch(0.98 0.004 80)" }}
    >
      {/* Subtle dot pattern */}
      <div
        className="absolute top-0 right-0 w-1/2 h-full opacity-[0.035] pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(oklch(0.22 0.005 0) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      <div className="container relative z-10">
        {/* ── Section header ── */}
        <div
          ref={ref}
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(24px)",
            transition: "opacity 0.7s ease, transform 0.7s ease",
            marginBottom: "clamp(2.5rem, 5vw, 4rem)",
          }}
        >
          <div
            className="font-label mb-3 flex items-center gap-3"
            style={{ color: "oklch(0.46 0.20 25)" }}
          >
            <span
              className="inline-block w-8 h-px"
              style={{ backgroundColor: "oklch(0.46 0.20 25)" }}
            />
            Maintenance Plans
          </div>
          <h2
            className="font-display font-light"
            style={{
              fontSize: "clamp(2rem, 4.5vw, 3.5rem)",
              color: "oklch(0.22 0.005 0)",
              lineHeight: 1.05,
              maxWidth: "700px",
            }}
          >
            Year-Round Care,{" "}
            <em style={{ color: "oklch(0.46 0.20 25)", fontStyle: "italic" }}>
              One Simple Plan
            </em>
          </h2>
          <p
            className="font-body mt-4"
            style={{
              fontSize: "clamp(0.95rem, 1.5vw, 1.1rem)",
              color: "oklch(0.42 0.005 30)",
              maxWidth: "560px",
              lineHeight: 1.65,
            }}
          >
            Stop juggling contractors. Our bundled maintenance plans cover
            everything your property needs — lawn, irrigation, and seasonal
            care — handled by one dedicated crew, year-round.
          </p>
        </div>

        {/* ── Two-column plan cards ── */}
        <div
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(30px)",
            transition: "opacity 0.8s ease 0.15s, transform 0.8s ease 0.15s",
          }}
        >
          {/* ── Card 1: Priority Irrigation Membership ── */}
          <div
            style={{
              backgroundColor: "oklch(1 0 0)",
              border: "1.5px solid oklch(0.90 0.006 75)",
              padding: "2.5rem",
              borderRadius: "1.2rem 0.15rem 1.2rem 0.15rem",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div
              className="font-label mb-1"
              style={{ color: "oklch(0.46 0.20 25)", fontSize: "0.65rem", letterSpacing: "0.2em" }}
            >
              Most Popular
            </div>
            <h3
              className="font-display font-semibold mb-1"
              style={{ fontSize: "clamp(1.3rem, 2.2vw, 1.7rem)", color: "oklch(0.22 0.005 0)", lineHeight: 1.1 }}
            >
              Priority Irrigation
              <br />
              Membership
            </h3>
            <div
              className="font-display font-bold mt-3 mb-0"
              style={{ fontSize: "2.6rem", color: "oklch(0.46 0.20 25)", lineHeight: 1 }}
            >
              $33
            </div>
            <div
              className="font-body text-sm mb-6"
              style={{ color: "oklch(0.50 0.005 30)" }}
            >
              / month — no contracts
            </div>

            <div
              className="h-px mb-6"
              style={{ backgroundColor: "oklch(0.90 0.006 75)" }}
            />

            <ul className="space-y-3 mb-8 flex-1">
              {irrigationFeatures.map((feature) => (
                <li key={feature} className="flex items-center gap-3">
                  <div
                    className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: "oklch(0.46 0.20 25)" }}
                  >
                    <Check size={11} strokeWidth={2.5} style={{ color: "#fff" }} />
                  </div>
                  <span
                    className="font-body text-sm"
                    style={{ color: "oklch(0.38 0.005 0)" }}
                  >
                    {feature}
                  </span>
                </li>
              ))}
            </ul>

            <button
              onClick={() =>
                window.open("/membership", "_blank", "noopener,noreferrer")
              }
              style={{
                backgroundColor: "oklch(0.46 0.20 25)",
                color: "#fff",
                fontFamily: "'Montserrat', 'Inter', sans-serif",
                fontWeight: 700,
                fontSize: "0.75rem",
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                padding: "0.85rem 2rem",
                borderRadius: "1.8rem 0.2rem 1.8rem 0.2rem",
                border: "none",
                cursor: "pointer",
                width: "100%",
              }}
            >
              Sign Up Today — $33/mo
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}
