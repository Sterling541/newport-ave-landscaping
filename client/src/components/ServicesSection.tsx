/* ============================================================
   SERVICES SECTION — Southview-Inspired
   Design: Dark charcoal background. "WHAT WE DO" eyebrow label.
   Large bold serif headline. Three featured service photo cards
   (like Southview's Residential / Design-Build / Maintenance cards).
   Below: 4-column service grid on cream background.
   ============================================================ */
import { useEffect, useRef, useState } from "react";
import {
  Droplets,
  Palette,
  Layers,
  Scissors,
  Waves,
  Flame,
  Building2,
  Users,
} from "lucide-react";

// Featured service photo cards (top 3 — Southview style)
const featuredServices = [
  {
    title: "Residential Landscaping",
    subtitle: "Design, Build & Maintain",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
    href: "#contact",
  },
  {
    title: "Commercial Landscape",
    subtitle: "Installation & Maintenance",
    image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&q=80",
    href: "#contact",
  },
  {
    title: "HOA & Community",
    subtitle: "Year-Round Maintenance",
    image: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=800&q=80",
    href: "#contact",
  },
];

// Full service list
const services = [
  {
    icon: Palette,
    title: "Custom Design & Build",
    description:
      "Award-winning designers bring your outdoor vision to life. 5-year installation warranty — the only company in Central Oregon to offer this.",
  },
  {
    icon: Droplets,
    title: "Sprinklers & Irrigation",
    description:
      "Dedicated full-time team for sprinkler installation, repair, and maintenance. Custom systems for residential, commercial, and HOA properties.",
  },
  {
    icon: Building2,
    title: "Commercial Installation",
    description:
      "Large-scale landscape installation for business campuses, retail centers, multi-family developments, and government properties.",
  },
  {
    icon: Users,
    title: "HOA & Community Care",
    description:
      "Comprehensive maintenance programs for HOA communities, apartment complexes, and commercial properties — pristine year-round.",
  },
  {
    icon: Layers,
    title: "Pavers & Walkways",
    description:
      "Driveways, walkways, flagstone patios, and decorative paver installations for homes and commercial properties.",
  },
  {
    icon: Scissors,
    title: "Residential Maintenance",
    description:
      "Weekly lawn care, spring/fall clean-ups, aeration, and seasonal maintenance plans tailored to your property.",
  },
  {
    icon: Waves,
    title: "Water Features",
    description:
      "Ponds, streams, koi ponds, and bubbling fountains — crafted by Central Oregon's most trusted pond contractors.",
  },
  {
    icon: Flame,
    title: "Outdoor Living",
    description:
      "Fire pits, outdoor kitchens, pergolas, and custom living spaces designed for entertaining and relaxation.",
  },
];

function ServiceCard({
  service,
  index,
}: {
  service: (typeof services)[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setTimeout(() => setVisible(true), index * 80);
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [index]);

  const Icon = service.icon;

  return (
    <div
      ref={ref}
      className="group p-7 transition-all duration-300"
      style={{
        backgroundColor: "oklch(1 0 0)",
        borderBottom: "3px solid transparent",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 0.6s ease, transform 0.6s ease, border-color 0.3s ease, box-shadow 0.3s ease`,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderBottomColor = "oklch(0.46 0.20 25)";
        e.currentTarget.style.boxShadow = "0 8px 32px oklch(0 0 0 / 0.10)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderBottomColor = "transparent";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      <div
        className="w-10 h-10 flex items-center justify-center mb-4 transition-colors duration-300"
        style={{
          backgroundColor: "oklch(0.96 0.008 85)",
          color: "oklch(0.46 0.20 25)",
        }}
      >
        <Icon size={18} strokeWidth={1.5} />
      </div>
      <h3
        className="font-display mb-2"
        style={{
          fontSize: "1.15rem",
          fontWeight: 500,
          color: "oklch(0.22 0.008 0)",
        }}
      >
        {service.title}
      </h3>
      <p
        className="font-body text-sm leading-relaxed"
        style={{ color: "oklch(0.50 0.008 0)", fontWeight: 300 }}
      >
        {service.description}
      </p>
    </div>
  );
}

export default function ServicesSection() {
  const headerRef = useRef<HTMLDivElement>(null);
  const [headerVisible, setHeaderVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setHeaderVisible(true);
      },
      { threshold: 0.2 }
    );
    if (headerRef.current) observer.observe(headerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* ── Dark section: featured 3-card row ── */}
      <section
        id="services"
        className="py-20"
        style={{ backgroundColor: "oklch(0.15 0.005 0)" }}
      >
        <div className="container">
          <div
            ref={headerRef}
            className="mb-12"
            style={{
              opacity: headerVisible ? 1 : 0,
              transform: headerVisible ? "translateY(0)" : "translateY(20px)",
              transition: "opacity 0.8s ease, transform 0.8s ease",
            }}
          >
            <div
              className="font-label mb-4 flex items-center gap-3"
              style={{ color: "oklch(0.72 0.12 25)" }}
            >
              <span
                className="inline-block h-px"
                style={{ width: "28px", backgroundColor: "oklch(0.46 0.20 25)" }}
              />
              What We Do
            </div>
            <h2
              className="font-display font-light"
              style={{
                fontSize: "clamp(2rem, 4.5vw, 4rem)",
                color: "oklch(1 0 0)",
                lineHeight: 1.05,
              }}
            >
              Improving Life{" "}
              <em style={{ color: "oklch(0.75 0.10 25)" }}>Outdoors</em>
            </h2>
          </div>

          {/* 3 featured photo cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {featuredServices.map((item, i) => (
              <a
                key={item.title}
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="photo-card block"
                style={{
                  height: "clamp(260px, 30vw, 380px)",
                  opacity: headerVisible ? 1 : 0,
                  transform: headerVisible ? "translateY(0)" : "translateY(30px)",
                  transition: `opacity 0.7s ease ${i * 0.12}s, transform 0.7s ease ${i * 0.12}s`,
                }}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    transition: "transform 0.6s ease",
                  }}
                />
                {/* Overlay */}
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(0deg, oklch(0 0 0 / 0.70) 0%, oklch(0 0 0 / 0.15) 60%)",
                  }}
                />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div
                    className="font-label mb-1"
                    style={{ color: "oklch(0.72 0.12 25)" }}
                  >
                    {item.subtitle}
                  </div>
                  <div
                    className="font-display font-light text-white"
                    style={{ fontSize: "1.4rem" }}
                  >
                    {item.title}
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── Cream section: full service grid ── */}
      <section
        className="py-20"
        style={{ backgroundColor: "oklch(0.97 0.012 85)" }}
      >
        <div className="container">
          <div className="text-center mb-12">
            <div
              className="font-label mb-3 flex items-center justify-center gap-3"
              style={{ color: "oklch(0.46 0.20 25)" }}
            >
              <span className="inline-block h-px w-7" style={{ backgroundColor: "oklch(0.46 0.20 25)" }} />
              Our Services
              <span className="inline-block h-px w-7" style={{ backgroundColor: "oklch(0.46 0.20 25)" }} />
            </div>
            <h2
              className="font-display font-light"
              style={{
                fontSize: "clamp(1.8rem, 3.5vw, 3rem)",
                color: "oklch(0.22 0.008 0)",
                lineHeight: 1.1,
              }}
            >
              Complete Landscaping{" "}
              <em style={{ color: "oklch(0.46 0.20 25)" }}>Services</em>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {services.map((service, index) => (
              <ServiceCard key={service.title} service={service} index={index} />
            ))}
          </div>

          {/* Also available */}
          <div
            className="mt-12 pt-8 text-center"
            style={{ borderTop: "1px solid oklch(0.88 0.010 85)" }}
          >
            <div className="font-label mb-4" style={{ color: "oklch(0.46 0.20 25)" }}>
              Also Available
            </div>
            <div className="flex flex-wrap gap-x-6 gap-y-2 justify-center">
              {[
                "Snow Removal",
                "Xeriscaping",
                "Landscape Lighting",
                "Retaining Walls",
                "Drainage Solutions",
                "Aeration Services",
                "Sprinkler Activation",
                "Sprinkler Blowout",
                "Government Contracts",
                "Multi-Family Communities",
                "Apartment Complex Maintenance",
                "Commercial Property Maintenance",
              ].map((item) => (
                <span
                  key={item}
                  className="font-body text-sm flex items-center gap-2"
                  style={{ color: "oklch(0.45 0.008 0)", fontWeight: 300 }}
                >
                  <span
                    className="inline-block w-1 h-1 rounded-full"
                    style={{ backgroundColor: "oklch(0.46 0.20 25)" }}
                  />
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
