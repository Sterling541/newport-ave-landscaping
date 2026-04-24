/* ============================================================
   EVERYTHING RESIDENTIAL MAINTENANCE PLAN — Dedicated Section
   Full-width, bold, editorial layout for the bundled
   residential maintenance package.
   ============================================================ */
import { useEffect, useRef, useState } from "react";
import { Check, Leaf, Droplets, Wind, Scissors, Sun } from "lucide-react";

const packages = [
  {
    icon: <Scissors size={20} strokeWidth={1.5} />,
    title: "Weekly Lawn Maintenance",
    description:
      "Mowing, edging, blowing, and cleanup every week — so your lawn always looks freshly manicured.",
  },
  {
    icon: <Leaf size={20} strokeWidth={1.5} />,
    title: "Spring & Fall Clean-Ups",
    description:
      "Seasonal deep-cleans that remove debris, cut back perennials, and prep your property for the next season.",
  },
  {
    icon: <Sun size={20} strokeWidth={1.5} />,
    title: "Annual Aeration",
    description:
      "Core aeration every year to break up compaction, improve drainage, and keep your turf thick and healthy.",
  },
  {
    icon: <Wind size={20} strokeWidth={1.5} />,
    title: "Weed Control & Edging",
    description:
      "Crisp edges and weed-free beds every visit — we keep your property looking sharp from curb to back fence.",
  },
  {
    icon: <Droplets size={20} strokeWidth={1.5} />,
    title: "Dedicated Crew — Same Team Every Visit",
    description:
      "You get the same crew every week. They know your property, your preferences, and your standards.",
  },
];

export default function EverythingPlanSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.08 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      style={{
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background photo */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "url('https://d2xsxph8kpxj0f.cloudfront.net/310519663503028182/g3pw3MRUapabcDUbhBEFxx/maintenance-hero-bg_3219f29e.jpeg')",
          backgroundSize: "cover",
          backgroundPosition: "center 40%",
          backgroundRepeat: "no-repeat",
        }}
      />
      {/* Dark overlay so text stays readable */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "linear-gradient(135deg, oklch(0.10 0.015 30 / 0.93) 0%, oklch(0.14 0.012 30 / 0.88) 60%, oklch(0.10 0.015 30 / 0.92) 100%)",
        }}
      />

      {/* Red accent bar at top */}
      <div
        style={{
          height: "5px",
          background:
            "linear-gradient(90deg, oklch(0.46 0.20 25) 0%, oklch(0.38 0.18 25) 100%)",
        }}
      />

      <div className="container relative z-10 py-24" ref={ref}>
        {/* ── Two-column layout: left = headline + price, right = features ── */}
        <div
          className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(32px)",
            transition: "opacity 0.8s ease, transform 0.8s ease",
          }}
        >
          {/* ── LEFT: Headline + Price + CTA ── */}
          <div className="flex flex-col justify-between">
            <div>
              <div
                className="font-label mb-4 flex items-center gap-3"
                style={{ color: "oklch(0.46 0.20 25)" }}
              >
                <span
                  className="inline-block w-8 h-px"
                  style={{ backgroundColor: "oklch(0.46 0.20 25)" }}
                />
                Residential Maintenance
              </div>

              <h2
                className="font-display"
                style={{
                  fontSize: "clamp(2.8rem, 6vw, 5.5rem)",
                  color: "oklch(1 0 0)",
                  lineHeight: 0.95,
                  fontWeight: 700,
                  letterSpacing: "-0.02em",
                }}
              >
                Everything
                <br />
                <span
                  style={{
                    color: "oklch(0.46 0.20 25)",
                  }}
                >
                  Residential
                </span>
                <br />
                <em
                  style={{
                    fontStyle: "italic",
                    fontWeight: 300,
                    color: "oklch(0.85 0.005 0)",
                    fontSize: "0.85em",
                  }}
                >
                  Maintenance Plan
                </em>
              </h2>

              <p
                className="font-body mt-8"
                style={{
                  fontSize: "clamp(1rem, 1.6vw, 1.15rem)",
                  color: "oklch(0.72 0.005 0)",
                  lineHeight: 1.7,
                  maxWidth: "480px",
                }}
              >
                Stop managing multiple contractors. Our Everything Plan bundles
                your weekly lawn care, seasonal cleanups, aeration, and weed
                control into one flat monthly rate — handled by a
                single dedicated crew that knows your property.
              </p>
            </div>

            {/* Price block */}
            <div
              className="mt-10"
              style={{
                borderTop: "1px solid oklch(1 0 0 / 0.12)",
                paddingTop: "2rem",
              }}
            >
              <div
                className="font-display font-bold"
                style={{
                  fontSize: "clamp(3.5rem, 7vw, 6rem)",
                  color: "oklch(1 0 0)",
                  lineHeight: 1,
                }}
              >
                $388
              </div>
              <div
                className="font-body mt-1 mb-8"
                style={{ color: "oklch(0.60 0.005 0)", fontSize: "0.95rem" }}
              >
                / month — based on minimum 1 man hour/week
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() =>
                    document
                      .querySelector("#contact")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                  style={{
                    backgroundColor: "oklch(0.46 0.20 25)",
                    color: "#fff",
                    fontFamily: "'Montserrat', 'Inter', sans-serif",
                    fontWeight: 700,
                    fontSize: "0.75rem",
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    padding: "1rem 2.5rem",
                    borderRadius: "1.8rem 0.2rem 1.8rem 0.2rem",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  Get Started Today
                </button>
                <a
                  href="https://newportavlandscaping.com/irrigation-program-231244" target="_blank" rel="noopener noreferrer"
                  style={{
                    backgroundColor: "transparent",
                    color: "oklch(0.85 0.005 0)",
                    fontFamily: "'Montserrat', 'Inter', sans-serif",
                    fontWeight: 600,
                    fontSize: "0.75rem",
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    padding: "1rem 2rem",
                    borderRadius: "1.8rem 0.2rem 1.8rem 0.2rem",
                    border: "1.5px solid oklch(1 0 0 / 0.25)",
                    cursor: "pointer",
                    display: "inline-block",
                    textDecoration: "none",
                    textAlign: "center",
                  }}
                >
                  Learn More
                </a>
              </div>
            </div>
          </div>

          {/* ── RIGHT: Feature list ── */}
          <div className="flex flex-col justify-center gap-6">
            {packages.map((pkg, i) => (
              <div
                key={pkg.title}
                className="flex gap-5 items-start"
                style={{
                  opacity: visible ? 1 : 0,
                  transform: visible ? "translateX(0)" : "translateX(20px)",
                  transition: `opacity 0.6s ease ${0.1 + i * 0.1}s, transform 0.6s ease ${0.1 + i * 0.1}s`,
                  paddingBottom: "1.5rem",
                  borderBottom:
                    i < packages.length - 1
                      ? "1px solid oklch(1 0 0 / 0.08)"
                      : "none",
                }}
              >
                {/* Icon */}
                <div
                  className="flex-shrink-0 w-10 h-10 flex items-center justify-center"
                  style={{
                    backgroundColor: "oklch(0.46 0.20 25 / 0.18)",
                    color: "oklch(0.70 0.18 25)",
                    borderRadius: "0.6rem 0.1rem 0.6rem 0.1rem",
                  }}
                >
                  {pkg.icon}
                </div>

                {/* Text */}
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Check
                      size={13}
                      strokeWidth={2.5}
                      style={{ color: "oklch(0.46 0.20 25)", flexShrink: 0 }}
                    />
                    <h4
                      className="font-display font-semibold"
                      style={{
                        fontSize: "1rem",
                        color: "oklch(0.95 0.005 0)",
                        lineHeight: 1.2,
                      }}
                    >
                      {pkg.title}
                    </h4>
                  </div>
                  <p
                    className="font-body text-sm"
                    style={{
                      color: "oklch(0.62 0.005 0)",
                      lineHeight: 1.6,
                    }}
                  >
                    {pkg.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
