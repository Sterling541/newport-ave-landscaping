/* ============================================================
   ABOUT SECTION — Sunlit Craftsman Design
   Split layout: image left, content right
   Warm forest green background, terracotta accents
   ============================================================ */
import { useEffect, useRef, useState } from "react";
import { Award, Shield, Clock, Star } from "lucide-react";

const SERVICES_IMAGE =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663503028182/g3pw3MRUapabcDUbhBEFxx/hero-services-JzKxhcNzPjF9WTtBX8Sc9c.webp";

const highlights = [
  {
    icon: Award,
    title: "Award-Winning Design",
    desc: "Our landscape design team has earned regional recognition for exceptional outdoor transformations.",
  },
  {
    icon: Shield,
    title: "5-Year Warranty",
    desc: "The only company in Central Oregon offering a full 5-year warranty on all landscape installations.",
  },
  {
    icon: Clock,
    title: "21+ Years Experience",
    desc: "Over two decades serving Bend and Central Oregon homeowners and businesses.",
  },
  {
    icon: Star,
    title: "Licensed & Insured",
    desc: "LCB #9153 — All Phase license with the Oregon Landscape Contractors Board.",
  },
];

export default function AboutSection() {
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
      id="about"
      className="py-24 overflow-hidden"
      style={{ backgroundColor: "oklch(0.93 0.018 85)" }}
    >
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center" ref={ref}>
          {/* Image side */}
          <div
            className="relative"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateX(0)" : "translateX(-40px)",
              transition: "opacity 0.9s ease, transform 0.9s ease",
            }}
          >
            {/* Main image */}
            <div className="relative overflow-hidden" style={{ aspectRatio: "4/5" }}>
              <img
                src={SERVICES_IMAGE}
                alt="Newport Ave Landscaping team at work"
                className="w-full h-full object-cover"
              />
              {/* Decorative border */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  border: "2px solid oklch(0.58 0.12 42 / 0.4)",
                  transform: "translate(12px, 12px)",
                }}
              />
            </div>

            {/* Floating badge */}
            <div
              className="absolute -bottom-6 -right-6 p-6 shadow-xl"
              style={{ backgroundColor: "oklch(0.22 0.06 152)", maxWidth: "200px" }}
            >
              <div
                className="font-display font-semibold mb-1"
                style={{ fontSize: "2.5rem", color: "oklch(0.68 0.10 42)", lineHeight: 1 }}
              >
                21+
              </div>
              <div
                className="font-label"
                style={{ color: "oklch(0.85 0.02 85)", fontSize: "0.65rem" }}
              >
                Years Serving Central Oregon
              </div>
            </div>
          </div>

          {/* Content side */}
          <div
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateX(0)" : "translateX(40px)",
              transition: "opacity 0.9s ease 0.2s, transform 0.9s ease 0.2s",
            }}
          >
            <div
              className="font-label mb-4 flex items-center gap-3"
              style={{ color: "oklch(0.58 0.12 42)" }}
            >
              <span
                className="inline-block w-8 h-px"
                style={{ backgroundColor: "oklch(0.58 0.12 42)" }}
              />
              About Newport Ave
            </div>

            <h2
              className="font-display font-light mb-6"
              style={{
                fontSize: "clamp(2rem, 4vw, 3.2rem)",
                color: "oklch(0.18 0.04 152)",
                lineHeight: 1.1,
              }}
            >
              Central Oregon's
              <br />
              <em style={{ color: "oklch(0.22 0.06 152)", fontStyle: "italic" }}>
                Premier Landscaping
              </em>
              <br />
              Experts
            </h2>

            <p
              className="font-body leading-relaxed mb-4"
              style={{ color: "oklch(0.35 0.04 152)" }}
            >
              Located in beautiful Bend, Oregon, Newport Avenue Landscaping is
              proud to be the premier landscaping company in Central Oregon. Our
              team of experienced professionals are passionate about creating
              stunning outdoor spaces that enhance your home's beauty and add
              value and functionality.
            </p>
            <p
              className="font-body leading-relaxed mb-8"
              style={{ color: "oklch(0.35 0.04 152)" }}
            >
              With our award-winning designs and exceptional craftsmanship, we
              have become the go-to landscaping company for homeowners and
              businesses alike. No job is too big or small — from small
              residential projects to large commercial developments and
              government contracts.
            </p>

            {/* Highlights grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-8">
              {highlights.map((item, i) => {
                const Icon = item.icon;
                return (
                  <div key={item.title} className="flex gap-4">
                    <div
                      className="w-10 h-10 flex-shrink-0 flex items-center justify-center"
                      style={{
                        backgroundColor: "oklch(0.22 0.06 152 / 0.08)",
                        color: "oklch(0.22 0.06 152)",
                      }}
                    >
                      <Icon size={18} strokeWidth={1.5} />
                    </div>
                    <div>
                      <div
                        className="font-body font-semibold text-sm mb-1"
                        style={{ color: "oklch(0.18 0.04 152)" }}
                      >
                        {item.title}
                      </div>
                      <div
                        className="font-body text-xs leading-relaxed"
                        style={{ color: "oklch(0.45 0.04 152)" }}
                      >
                        {item.desc}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Quote */}
            <blockquote
              className="border-l-4 pl-5 py-2 mb-8"
              style={{ borderColor: "oklch(0.58 0.12 42)" }}
            >
              <p
                className="font-display italic text-lg mb-2"
                style={{ color: "oklch(0.22 0.06 152)" }}
              >
                "It was an awesome experience start to finish. I can't recommend
                you guys enough. We love our yard and now spend more time outside
                than in it seems."
              </p>
              <cite
                className="font-label not-italic"
                style={{ color: "oklch(0.58 0.12 42)", fontSize: "0.7rem" }}
              >
                Mark M. — Broken Top
              </cite>
            </blockquote>

            <div className="flex gap-4">
              <button
                onClick={() =>
                  document
                    .querySelector("#contact")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="btn-forest"
              >
                Start Your Project
              </button>
              <button
                onClick={() =>
                  document
                    .querySelector("#portfolio")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="btn-outline-cream"
                style={{
                  color: "oklch(0.22 0.06 152)",
                  borderColor: "oklch(0.22 0.06 152)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.backgroundColor = "oklch(0.22 0.06 152)";
                  (e.currentTarget as HTMLButtonElement).style.color = "oklch(0.97 0.012 85)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.backgroundColor = "transparent";
                  (e.currentTarget as HTMLButtonElement).style.color = "oklch(0.22 0.06 152)";
                }}
              >
                Our Portfolio
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
