/* ============================================================
   SERVICES SECTION — Colossal-Inspired Editorial
   Features:
   - Section number label (02) with thin rule
   - Massive left-aligned headline with italic accent
   - Large full-bleed photo cards with hover zoom
   - Service grid with staggered scroll reveals
   - Thin horizontal rules as separators
   ============================================================ */
import { useEffect, useRef, useState } from "react";
import { useLocation } from "wouter";
import {
  SprinklersIcon,
  DesignIcon,
  PaversIcon,
  MaintenanceIcon,
  WaterIcon,
  OutdoorIcon,
  CommercialHOAIcon,
  LandscapeArchitectureIcon,
} from "./ServiceIcons";

const featuredServices = [
  {
    title: "Residential Landscaping",
    subtitle: "Design, Build & Maintain",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663503028182/g3pw3MRUapabcDUbhBEFxx/IMG_1336_4fa29027.JPG",
    href: "/services",
    num: "01",
  },
  {
    title: "Commercial Landscape",
    subtitle: "Installation & Maintenance",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663503028182/g3pw3MRUapabcDUbhBEFxx/NewportLandscapingRVParkDay2Photos2_8e8d0bb1.jpg",
    href: "/commercial",
    num: "02",
  },
  {
    title: "Patios & Outdoor Living",
    subtitle: "Hardscape & Fire Features",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663503028182/g3pw3MRUapabcDUbhBEFxx/GLLPatio3_7287b20c.jpg",
    href: "/services/landscape-design",
    num: "03",
  },
];

const services = [
  {
    IconComponent: DesignIcon,
    title: "Custom Design & Build",
    description:
      "Award-winning designers bring your outdoor vision to life. Backed by a team of 150+ professionals.",
    href: "/services/landscape-design",
  },
  {
    IconComponent: SprinklersIcon,
    title: "Sprinklers & Irrigation",
    description:
      "Dedicated full-time team for sprinkler installation, repair, and maintenance.",
    href: "/services/irrigation",
  },
  {
    IconComponent: PaversIcon,
    title: "Pavers & Walkways",
    description:
      "Driveways, walkways, flagstone patios, and decorative paver installations.",
    href: "/services/pavers",
  },
  {
    IconComponent: MaintenanceIcon,
    title: "Residential Maintenance",
    description:
      "Weekly lawn care, spring/fall clean-ups, aeration, and seasonal plans.",
    href: "/services/lawn-service",
  },
  {
    IconComponent: CommercialHOAIcon,
    title: "Commercial & HOA",
    description:
      "Year-round landscape programs for HOA communities, apartments, and government contracts.",
    href: "/commercial",
  },
  {
    IconComponent: LandscapeArchitectureIcon,
    title: "Landscape Architecture",
    description:
      "Full-service landscape architecture and master planning from concept to completion.",
    href: "/services/landscape-design",
  },
  {
    IconComponent: WaterIcon,
    title: "Water Features",
    description:
      "Ponds, streams, koi ponds, and bubbling fountains by Central Oregon's most trusted pond contractors.",
    href: "/services/water-features",
  },
  {
    IconComponent: OutdoorIcon,
    title: "Outdoor Living",
    description:
      "Fire pits, outdoor kitchens, pergolas, and custom living spaces for entertaining.",
    href: "/services/outdoor-living",
  },
];

function ServiceRow({
  service,
  index,
}: {
  service: (typeof services)[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [, navigate] = useLocation();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setTimeout(() => setVisible(true), index * 60);
      },
      { threshold: 0.08 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [index]);

  return (
    <div
      ref={ref}
      className="group flex items-start gap-6 py-7 cursor-pointer transition-all duration-300"
      style={{
        borderBottom: "1px solid oklch(0.88 0.010 85)",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateX(0)" : "translateX(-20px)",
        transition: `opacity 0.6s ease, transform 0.6s ease`,
      }}
      onClick={() => { navigate(service.href); window.scrollTo({ top: 0, behavior: "smooth" }); }}
    >
      {/* Icon */}
      <div
        className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
        style={{ backgroundColor: "oklch(0.76 0.128 184.6)" }}
      >
        <service.IconComponent size={26} />
      </div>
      {/* Text */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-4">
          <h3
            className="font-display transition-colors duration-300"
            style={{
              fontSize: "1.05rem",
              fontWeight: 500,
              color: "oklch(0.20 0.008 0)",
            }}
          >
            {service.title}
          </h3>
          <span
            className="font-label text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex-shrink-0"
            style={{ color: "oklch(0.76 0.128 184.6)" }}
          >
            LEARN MORE →
          </span>
        </div>
        <p
          className="font-body text-sm mt-1"
          style={{ color: "oklch(0.50 0.008 0)", fontWeight: 300, lineHeight: 1.65 }}
        >
          {service.description}
        </p>
      </div>
    </div>
  );
}

export default function ServicesSection() {
  const headerRef = useRef<HTMLDivElement>(null);
  const [headerVisible, setHeaderVisible] = useState(false);
  const [, navigate] = useLocation();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setHeaderVisible(true);
      },
      { threshold: 0.15 }
    );
    if (headerRef.current) observer.observe(headerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* ── Section 02: Featured photo cards ── */}
      <section
        id="services"
        style={{
          backgroundColor: "oklch(0.12 0.012 155)",
          padding: "clamp(4rem, 8vw, 7rem) 0",
        }}
      >
        <div className="container">

          {/* Section label */}
          <div
            ref={headerRef}
            className="flex items-center gap-4 mb-14"
            style={{
              opacity: headerVisible ? 1 : 0,
              transition: "opacity 0.8s ease",
            }}
          >
            <span
              className="font-label"
              style={{ fontSize: "0.65rem", letterSpacing: "0.18em", color: "oklch(0.76 0.128 184.6)", fontWeight: 700 }}
            >
              02
            </span>
            <span className="flex-1 h-px" style={{ backgroundColor: "oklch(0.25 0.015 155)" }} />
            <span
              className="font-label"
              style={{ fontSize: "0.60rem", letterSpacing: "0.18em", color: "oklch(0.55 0.015 155)" }}
            >
              WHAT WE DO
            </span>
          </div>

          {/* Massive headline */}
          <div
            className="mb-14"
            style={{
              opacity: headerVisible ? 1 : 0,
              transform: headerVisible ? "translateY(0)" : "translateY(28px)",
              transition: "opacity 0.85s ease 0.1s, transform 0.85s ease 0.1s",
            }}
          >
            <h2
              className="font-display font-light"
              style={{
                fontSize: "clamp(3rem, 7.5vw, 7rem)",
                lineHeight: 0.92,
                letterSpacing: "-0.035em",
                color: "oklch(0.96 0 0)",
              }}
            >
              Improving Life{" "}
              <em
                style={{
                  color: "oklch(0.76 0.128 184.6)",
                  fontStyle: "italic",
                  fontWeight: 300,
                }}
              >
                Outdoors
              </em>
            </h2>
          </div>

          {/* 3 large photo cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {featuredServices.map((item, i) => (
              <a
                key={item.title}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  navigate(item.href);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="photo-card block group"
                style={{
                  height: "clamp(300px, 35vw, 480px)",
                  opacity: headerVisible ? 1 : 0,
                  transform: headerVisible ? "translateY(0)" : "translateY(40px)",
                  transition: `opacity 0.8s ease ${0.2 + i * 0.12}s, transform 0.8s ease ${0.2 + i * 0.12}s`,
                }}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    transition: "transform 0.7s ease",
                  }}
                  className="group-hover:scale-105"
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(0deg, oklch(0 0 0 / 0.78) 0%, oklch(0 0 0 / 0.10) 55%)",
                  }}
                />
                {/* Number label top-left */}
                <div
                  className="absolute top-5 left-5 font-label"
                  style={{
                    fontSize: "0.60rem",
                    letterSpacing: "0.18em",
                    color: "oklch(0.76 0.128 184.6)",
                  }}
                >
                  {item.num}
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-7">
                  <div
                    className="font-label mb-2"
                    style={{ fontSize: "0.58rem", letterSpacing: "0.15em", color: "oklch(0.76 0.128 184.6)" }}
                  >
                    {item.subtitle}
                  </div>
                  <div
                    className="font-display font-light text-white"
                    style={{ fontSize: "clamp(1.3rem, 2.5vw, 1.8rem)", lineHeight: 1.1 }}
                  >
                    {item.title}
                  </div>
                  <div
                    className="font-label mt-3 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ fontSize: "0.58rem", letterSpacing: "0.15em", color: "oklch(0.76 0.128 184.6)" }}
                  >
                    EXPLORE <span>→</span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── Service list: editorial row layout ── */}
      <section
        style={{
          backgroundColor: "oklch(0.985 0.010 75)",
          padding: "clamp(4rem, 8vw, 7rem) 0",
        }}
      >
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1px_1fr] gap-0">

            {/* Left column */}
            <div className="lg:pr-16">
              <div
                className="font-label mb-3 flex items-center gap-3"
                style={{ color: "oklch(0.76 0.128 184.6)", fontSize: "0.60rem", letterSpacing: "0.18em" }}
              >
                <span className="inline-block h-px w-6" style={{ backgroundColor: "oklch(0.76 0.128 184.6)" }} />
                COMPLETE SERVICES
              </div>
              <h2
                className="font-display font-light mb-12"
                style={{
                  fontSize: "clamp(2rem, 4vw, 3.5rem)",
                  lineHeight: 1.0,
                  letterSpacing: "-0.025em",
                  color: "oklch(0.16 0.010 55)",
                }}
              >
                Everything your{" "}
                <em style={{ color: "oklch(0.76 0.128 184.6)", fontStyle: "italic" }}>
                  property needs.
                </em>
              </h2>
              {services.slice(0, 4).map((s, i) => (
                <ServiceRow key={s.title} service={s} index={i} />
              ))}
            </div>

            {/* Vertical divider */}
            <div className="hidden lg:block" style={{ backgroundColor: "oklch(0.88 0.010 85)" }} />

            {/* Right column */}
            <div className="lg:pl-16 mt-16 lg:mt-0">
              {/* Also available tag */}
              <div
                className="font-label mb-3 flex items-center gap-3"
                style={{ color: "oklch(0.76 0.128 184.6)", fontSize: "0.60rem", letterSpacing: "0.18em" }}
              >
                <span className="inline-block h-px w-6" style={{ backgroundColor: "oklch(0.76 0.128 184.6)" }} />
                ALSO AVAILABLE
              </div>
              <div
                className="flex flex-wrap gap-2 mb-12"
              >
                {[
                  "Snow Removal", "Xeriscaping", "Landscape Lighting",
                  "Retaining Walls", "Drainage Solutions", "Aeration Services",
                  "Sprinkler Activation", "Sprinkler Blowout", "Government Contracts",
                  "Multi-Family Communities", "Apartment Complexes",
                ].map((item) => (
                  <span
                    key={item}
                    className="font-label"
                    style={{
                      fontSize: "0.58rem",
                      letterSpacing: "0.10em",
                      color: "oklch(0.42 0.010 55)",
                      padding: "0.35rem 0.85rem",
                      borderRadius: "999px",
                      border: "1px solid oklch(0.82 0.010 85)",
                    }}
                  >
                    {item}
                  </span>
                ))}
              </div>
              {services.slice(4).map((s, i) => (
                <ServiceRow key={s.title} service={s} index={i + 4} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
