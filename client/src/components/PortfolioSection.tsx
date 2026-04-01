/* ============================================================
   PORTFOLIO SECTION — Southview-Inspired
   Design: Cream background. "LANDSCAPE DESIGN COLLECTIONS" header.
   3-column photo grid. Category labels in serif italic below each photo.
   Hover: image zooms. Clean, editorial, magazine-quality.
   ============================================================ */
import { useEffect, useRef, useState } from "react";

const FACILITY_AERIAL =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663503028182/g3pw3MRUapabcDUbhBEFxx/facility-aerial_98383b9b.webp";
const FACILITY_NURSERY =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663503028182/g3pw3MRUapabcDUbhBEFxx/facility-nursery_c0df8919.webp";
const FACILITY_SHOWROOM =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663503028182/g3pw3MRUapabcDUbhBEFxx/facility-showroom_fd5f40e4.webp";

const portfolioItems = [
  {
    title: "Custom Residential Design",
    subtitle: "Bend, OR",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
  },
  {
    title: "Commercial Landscape Installation",
    subtitle: "Central Oregon",
    image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&q=80",
  },
  {
    title: "HOA Community Maintenance",
    subtitle: "Redmond, OR",
    image: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=800&q=80",
  },
  {
    title: "Water Feature & Pond",
    subtitle: "Bend, OR",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
  },
  {
    title: "Paver Patio & Walkway",
    subtitle: "Sisters, OR",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
  },
  {
    title: "Outdoor Living Space",
    subtitle: "Sunriver, OR",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80",
  },
  {
    title: "Our Nursery & Plant Yard",
    subtitle: "1020 SE Paiute Way, Bend",
    image: FACILITY_NURSERY,
  },
  {
    title: "Our Campus — Aerial View",
    subtitle: "Bend, Oregon",
    image: FACILITY_AERIAL,
  },
  {
    title: "Design Showroom & Office",
    subtitle: "Visit by Appointment",
    image: FACILITY_SHOWROOM,
  },
];

function PortfolioCard({
  item,
  index,
}: {
  item: (typeof portfolioItems)[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setTimeout(() => setVisible(true), index * 60);
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [index]);

  return (
    <div
      ref={ref}
      className="group cursor-pointer"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(30px)",
        transition: `opacity 0.6s ease, transform 0.6s ease`,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Photo */}
      <div
        className="overflow-hidden"
        style={{ aspectRatio: "4/3" }}
      >
        <img
          src={item.image}
          alt={item.title}
          className="w-full h-full object-cover"
          style={{
            transform: hovered ? "scale(1.05)" : "scale(1)",
            transition: "transform 0.7s ease",
          }}
        />
      </div>

      {/* Label — Southview style: serif italic below photo */}
      <div
        className="pt-3 pb-3 px-1"
        style={{
          borderBottom: "1px solid oklch(0.88 0.010 85)",
        }}
      >
        <div
          className="font-display"
          style={{
            fontSize: "1rem",
            fontStyle: "italic",
            color: hovered ? "oklch(0.46 0.20 25)" : "oklch(0.22 0.008 0)",
            transition: "color 0.3s ease",
            fontWeight: 400,
          }}
        >
          {item.title}
        </div>
        <div
          className="font-label mt-1"
          style={{ color: "oklch(0.60 0.008 0)", fontSize: "0.58rem" }}
        >
          {item.subtitle}
        </div>
      </div>
    </div>
  );
}

export default function PortfolioSection() {
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
    <section
      id="portfolio"
      className="py-20"
      style={{ backgroundColor: "oklch(0.97 0.012 85)" }}
    >
      <div className="container">
        {/* Header — Southview style: centered, serif, all-caps label */}
        <div
          ref={headerRef}
          className="text-center mb-14"
          style={{
            opacity: headerVisible ? 1 : 0,
            transform: headerVisible ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.8s ease, transform 0.8s ease",
          }}
        >
          <div
            className="font-label mb-4"
            style={{ color: "oklch(0.46 0.20 25)" }}
          >
            Landscape Design Collections
          </div>
          <h2
            className="font-display font-light mb-6"
            style={{
              fontSize: "clamp(2rem, 4vw, 3.5rem)",
              color: "oklch(0.22 0.008 0)",
              lineHeight: 1.05,
            }}
          >
            Our Work Across{" "}
            <em style={{ color: "oklch(0.46 0.20 25)" }}>Central Oregon</em>
          </h2>
          <button
            onClick={() =>
              document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })
            }
            className="btn-outline-dark"
          >
            Design-Build Portfolio
          </button>
        </div>

        {/* 3-column photo grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {portfolioItems.map((item, index) => (
            <PortfolioCard key={item.title} item={item} index={index} />
          ))}
        </div>

        {/* CTA */}
        <div
          className="text-center mt-14"
          style={{
            opacity: headerVisible ? 1 : 0,
            transition: "opacity 0.8s ease 0.5s",
          }}
        >
          <p
            className="font-body mb-6"
            style={{ color: "oklch(0.45 0.008 0)", fontWeight: 300 }}
          >
            Ready to transform your outdoor space?
          </p>
          <button
            onClick={() =>
              document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })
            }
            className="btn-red"
          >
            Start Your Project
          </button>
        </div>
      </div>
    </section>
  );
}
