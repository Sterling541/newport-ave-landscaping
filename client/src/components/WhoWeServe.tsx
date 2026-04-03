/* ============================================================
   WHO WE SERVE — Dual-Audience Trust Band
   Addresses Residential, Commercial, and HOA clients clearly
   Each card has a background photo with dark overlay
   ============================================================ */
import { useEffect, useRef, useState } from "react";
import { Home, Building2, Trees } from "lucide-react";

const segments = [
  {
    icon: Home,
    label: "High-End Residential",
    headline: "Your Home, Elevated.",
    body: "From luxury outdoor living rooms and custom water features to full estate landscaping — we design and build spaces that reflect your lifestyle and increase your property's value.",
    proof: "Broken Top · Awbrey Butte · NW Crossing",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663503028182/g3pw3MRUapabcDUbhBEFxx/NewportAveLandcaping-13_ef32520c.jpg",
  },
  {
    icon: Building2,
    label: "Commercial Properties",
    headline: "Scale Without Compromise.",
    body: "We are Central Oregon's leading commercial landscape contractor. Retail centers, office parks, mixed-use developments, and government facilities — managed by dedicated account teams with full in-house crews.",
    proof: "Government Contracts · Retail Centers · Office Parks",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663503028182/g3pw3MRUapabcDUbhBEFxx/NewportLandscapingRVParkDay2Photos57_ce65cd27.jpg",
  },
  {
    icon: Trees,
    label: "HOA Communities",
    headline: "Community Pride, Year-Round.",
    body: "Newport Avenue manages more HOA landscape maintenance contracts in Central Oregon than any other firm. Reliable, consistent, and always on schedule — so your community always looks its best.",
    proof: "200+ HOA Communities Served · Irrigation · Snow",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663503028182/g3pw3MRUapabcDUbhBEFxx/NewportAveLandcaping-9_97b731b0.jpg",
  },
];

export default function WhoWeServe() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      className="py-24"
      style={{ backgroundColor: "oklch(0.965 0.008 85)" }}
    >
      <div className="container" ref={ref}>
        {/* Header */}
        <div
          className="text-center mb-16"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(24px)",
            transition: "opacity 0.7s ease, transform 0.7s ease",
          }}
        >
          <div
            className="font-label mb-4 flex items-center justify-center gap-3"
            style={{ color: "oklch(0.46 0.20 25)" }}
          >
            <span
              className="inline-block w-8 h-px"
              style={{ backgroundColor: "oklch(0.46 0.20 25)" }}
            />
            Who We Serve
            <span
              className="inline-block w-8 h-px"
              style={{ backgroundColor: "oklch(0.46 0.20 25)" }}
            />
          </div>
          <h2
            className="font-display font-light"
            style={{
              fontSize: "clamp(2rem, 4vw, 3rem)",
                color: "oklch(0.18 0.008 0)",
                lineHeight: 1.1,
            }}
          >
            One Firm.{" "}
            <em style={{ color: "oklch(0.46 0.20 25)", fontStyle: "italic" }}>
              Every Client Type.
            </em>
          </h2>
          <p
            className="font-body mt-4 mx-auto"
            style={{
              color: "oklch(0.40 0.005 0)",
              maxWidth: "520px",
              lineHeight: 1.7,
            }}
          >
            Whether you're a homeowner, a property manager, or an HOA board
            member — Newport Avenue Landscaping has the team, the equipment,
            and the experience to handle your project at any scale.
          </p>
        </div>

        {/* Cards */}
        <div
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
          style={{ backgroundColor: "transparent" }}
        >
          {segments.map((seg, i) => {
            const Icon = seg.icon;
            return (
              <div
                key={seg.label}
                className="relative overflow-hidden"
                style={{
                  minHeight: "480px",
                  opacity: visible ? 1 : 0,
                  transform: visible ? "translateY(0)" : "translateY(32px)",
                  transition: `opacity 0.7s ease ${i * 0.15}s, transform 0.7s ease ${i * 0.15}s`,
                }}
              >
                {/* Background photo */}
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundImage: `url(${seg.image})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                />
                {/* Dark gradient overlay */}
                <div
                  className="absolute inset-0"
                  style={{
                    background: "linear-gradient(to top, oklch(0.05 0.005 0 / 0.95) 40%, oklch(0.05 0.005 0 / 0.65) 100%)",
                  }}
                />
                {/* Content */}
                <div className="relative z-10 p-10 flex flex-col h-full" style={{ minHeight: "480px" }}>
                  {/* Icon */}
                  <div
                    className="w-12 h-12 flex items-center justify-center mb-6"
                    style={{
                      backgroundColor: "oklch(0.46 0.20 25 / 0.20)",
                      color: "oklch(0.70 0.10 25)",
                    }}
                  >
                    <Icon size={22} strokeWidth={1.5} />
                  </div>

                  {/* Label */}
                  <div
                    className="font-label mb-3"
                    style={{ color: "oklch(0.70 0.10 25)", fontSize: "0.65rem" }}
                  >
                    {seg.label}
                  </div>

                  {/* Headline */}
                  <h3
                    className="font-display font-light mb-4"
                    style={{
                      fontSize: "clamp(1.4rem, 2.5vw, 1.9rem)",
                      color: "oklch(0.97 0 0)",
                      lineHeight: 1.15,
                    }}
                  >
                    {seg.headline}
                  </h3>

                  {/* Body */}
                  <p
                    className="font-body leading-relaxed mb-6 flex-1"
                    style={{ color: "oklch(0.80 0.005 0)", fontSize: "0.9rem" }}
                  >
                    {seg.body}
                  </p>

                  {/* Proof line */}
                  <div
                    className="font-label pt-5 border-t"
                    style={{
                      color: "oklch(0.60 0.005 0)",
                      fontSize: "0.6rem",
                      borderColor: "oklch(0.30 0.005 0)",
                      letterSpacing: "0.08em",
                    }}
                  >
                    {seg.proof}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA strip */}
        <div
          className="mt-px p-8 flex flex-col sm:flex-row items-center justify-between gap-6"
          style={{
            backgroundColor: "oklch(0.46 0.20 25)",
            opacity: visible ? 1 : 0,
            transition: "opacity 0.7s ease 0.5s",
          }}
        >
          <p
            className="font-body font-semibold text-white text-center sm:text-left"
            style={{ fontSize: "1.05rem" }}
          >
            Ready to work with Central Oregon's most qualified landscape firm?
          </p>
          <div className="flex gap-3 flex-shrink-0 flex-wrap justify-center">
            <a
              href="/commercial"
              style={{
                whiteSpace: "nowrap",
                padding: "0.6rem 1.4rem",
                backgroundColor: "oklch(0.14 0.005 0)",
                color: "white",
                fontSize: "0.75rem",
                letterSpacing: "0.1em",
                fontWeight: 600,
                textDecoration: "none",
              }}
            >
              COMMERCIAL SERVICES
            </a>
            <a
              href="/contact"
              style={{
                whiteSpace: "nowrap",
                padding: "0.6rem 1.4rem",
                border: "1px solid white",
                color: "white",
                fontSize: "0.75rem",
                letterSpacing: "0.1em",
                fontWeight: 600,
                textDecoration: "none",
              }}
            >
              GET A FREE QUOTE
            </a>
            <a
              href="tel:5416178873"
              style={{
                whiteSpace: "nowrap",
                padding: "0.6rem 1.4rem",
                backgroundColor: "oklch(0.14 0.005 0)",
                color: "white",
                fontSize: "0.75rem",
                letterSpacing: "0.1em",
                fontWeight: 600,
                textDecoration: "none",
              }}
            >
              (541) 617-8873
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
