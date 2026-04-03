/* ============================================================
   ABOUT SECTION — Brand Refresh
   White background, brand red accents, charcoal text
   Real facility photo integrated
   ============================================================ */
import { useEffect, useRef, useState } from "react";
import { Award, Shield, Clock, Star } from "lucide-react";

// Real Newport Ave facility photo
const FACILITY_IMAGE =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663503028182/g3pw3MRUapabcDUbhBEFxx/NewportLandscapingRVParkDay2Photos57_ce65cd27.jpg";

const highlights = [
  {
    icon: Award,
    title: "Award-Winning Design",
    desc: "Regional recognition for exceptional residential design-builds — from xeriscape to luxury outdoor living.",
  },
  {
    icon: Shield,
    title: "#1 Commercial & HOA Contractor",
    desc: "The most trusted commercial landscape contractor in Central Oregon — HOA communities, commercial properties, and government contracts.",
  },
  {
    icon: Clock,
    title: "150+ Professionals On Staff",
    desc: "In-house crews, designers, and project managers — no subcontractors, full accountability on every job.",
  },
  {
    icon: Star,
    title: "Licensed, Bonded & Insured",
    desc: "LCB #9153 All Phase — fully licensed with the Oregon Landscape Contractors Board for 21+ years.",
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
      style={{ backgroundColor: "oklch(1 0 0)" }}
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
                src={FACILITY_IMAGE}
                alt="Newport Avenue Landscaping facility in Bend, Oregon"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Floating badge — brand red */}
            <div
              className="absolute -bottom-6 -right-6 p-6 shadow-xl"
              style={{ backgroundColor: "oklch(0.46 0.20 25)", maxWidth: "200px" }}
            >
              <div
                className="font-display font-semibold mb-1"
                style={{ fontSize: "2.5rem", color: "oklch(1 0 0)", lineHeight: 1 }}
              >
                21+
              </div>
              <div
                className="font-label"
                style={{ color: "oklch(1 0 0 / 0.80)", fontSize: "0.65rem" }}
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
              style={{ color: "oklch(0.46 0.20 25)" }}
            >
              <span
                className="inline-block w-8 h-px"
                style={{ backgroundColor: "oklch(0.46 0.20 25)" }}
              />
              About Newport Avenue Landscaping
            </div>

            <h2
              className="font-display font-light mb-6"
              style={{
                fontSize: "clamp(2rem, 4vw, 3.2rem)",
                color: "oklch(0.22 0.005 0)",
                lineHeight: 1.1,
              }}
            >
              Central Oregon's
              <br />
              <em style={{ color: "oklch(0.46 0.20 25)", fontStyle: "italic" }}>
                Premier Landscaping
              </em>
              <br />
              Experts
            </h2>

            <p
              className="font-body leading-relaxed mb-4"
              style={{ color: "oklch(0.38 0.005 0)" }}
            >
              Newport Avenue Landscaping is Central Oregon's largest full-service
              landscape firm — handling everything from award-winning high-end
              residential design-builds to large-scale commercial developments,
              HOA community maintenance, and government contracts.
            </p>
            <p
              className="font-body leading-relaxed mb-8"
              style={{ color: "oklch(0.38 0.005 0)" }}
            >
              With 150+ professionals, in-house designers, and 21+ years of
              experience, we bring the same standard of craftsmanship and
              accountability to every project — whether it's a private estate in
              Broken Top or a 200-unit HOA community in NW Bend.
            </p>

            {/* Highlights grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-8">
              {highlights.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.title} className="flex gap-4">
                    <div
                      className="w-10 h-10 flex-shrink-0 flex items-center justify-center"
                      style={{
                        backgroundColor: "oklch(0.96 0.03 25)",
                        color: "oklch(0.46 0.20 25)",
                      }}
                    >
                      <Icon size={18} strokeWidth={1.5} />
                    </div>
                    <div>
                      <div
                        className="font-body font-semibold text-sm mb-1"
                        style={{ color: "oklch(0.22 0.005 0)" }}
                      >
                        {item.title}
                      </div>
                      <div
                        className="font-body text-xs leading-relaxed"
                        style={{ color: "oklch(0.50 0.005 0)" }}
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
              style={{ borderColor: "oklch(0.46 0.20 25)", backgroundColor: "oklch(0.985 0.003 0)", padding: "1rem 1.25rem" }}
            >
              <p
                className="font-display italic text-lg mb-2"
                style={{ color: "oklch(0.22 0.005 0)" }}
              >
                "It was an awesome experience start to finish. I can't recommend
                you guys enough. We love our yard and now spend more time outside
                than in it seems."
              </p>
              <cite
                className="font-label not-italic"
                style={{ color: "oklch(0.46 0.20 25)", fontSize: "0.7rem" }}
              >
                Mark M. — Broken Top
              </cite>
            </blockquote>

            <div className="flex gap-4 flex-wrap">
              <button
                onClick={() =>
                  document
                    .querySelector("#contact")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="btn-red"
              >
                Start Your Project
              </button>
              <button
                onClick={() =>
                  document
                    .querySelector("#portfolio")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="btn-outline-dark"
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
