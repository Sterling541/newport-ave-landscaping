/* ============================================================
   PORTFOLIO SECTION — Southview-Inspired
   Design: Cream background. "LANDSCAPE DESIGN COLLECTIONS" header.
   3-column photo grid. Category labels in serif italic below each photo.
   Hover: image zooms. Clean, editorial, magazine-quality.
   ============================================================ */
import { useEffect, useRef, useState } from "react";
import { useLocation } from "wouter";

const FACILITY_AERIAL =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663503028182/g3pw3MRUapabcDUbhBEFxx/facility-aerial_98383b9b.webp";
const FACILITY_NURSERY =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663503028182/g3pw3MRUapabcDUbhBEFxx/facility-nursery_c0df8919.webp";
const FACILITY_SHOWROOM =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663503028182/g3pw3MRUapabcDUbhBEFxx/facility-showroom_fd5f40e4.webp";

const portfolioItems = [
  {
    title: "Paver Patio & Fire Feature",
    subtitle: "Bend, OR",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663503028182/g3pw3MRUapabcDUbhBEFxx/GLLPatio10_2ffabcfb.jpg",
  },
  {
    title: "Outdoor Living Space",
    subtitle: "Bend, OR",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663503028182/g3pw3MRUapabcDUbhBEFxx/GLLPatio3_7287b20c.jpg",
  },
  {
    title: "Commercial Landscape Installation",
    subtitle: "Central Oregon",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663503028182/g3pw3MRUapabcDUbhBEFxx/NewportLandscapingRVParkDay2Photos57_ce65cd27.jpg",
  },
  {
    title: "Elevated Patio & Stone Wall",
    subtitle: "Bend, OR",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663503028182/g3pw3MRUapabcDUbhBEFxx/GLLPatio9_9e7ea695.jpg",
  },
  {
    title: "Patio & Outdoor Dining",
    subtitle: "Bend, OR",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663503028182/g3pw3MRUapabcDUbhBEFxx/GLLPatio1_90e2e0c4.jpg",
  },
  {
    title: "Paver Patio & Cable Railing",
    subtitle: "Bend, OR",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663503028182/g3pw3MRUapabcDUbhBEFxx/GLLPatio2_4916fcde.jpg",
  },
  {
    title: "Tree Planting & Installation",
    subtitle: "Central Oregon",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663503028182/g3pw3MRUapabcDUbhBEFxx/NewportLandscapingRVParkPhotos48_eb8a58d0.jpg",
  },
  {
    title: "Residential Landscaping",
    subtitle: "Bend, OR",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663503028182/g3pw3MRUapabcDUbhBEFxx/IMG_1336_4fa29027.JPG",
  },
  {
    title: "Our Nursery & Plant Yard",
    subtitle: "64625 N. HWY 97, Bend",
    image: FACILITY_NURSERY,
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
            color: hovered ? "oklch(0.76 0.128 184.6)" : "oklch(0.22 0.008 0)",
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
  const [, navigate] = useLocation();

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
      style={{ backgroundColor: "oklch(0.97 0.010 140)" }}
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
            style={{ color: "oklch(0.76 0.128 184.6)" }}
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
            <em style={{ color: "oklch(0.76 0.128 184.6)" }}>Central Oregon</em>
          </h2>
          <button
            onClick={() => { navigate("/our-work"); window.scrollTo({ top: 0, behavior: "smooth" }); }}
            className="btn-outline-dark"
          >
            View Full Portfolio
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
            onClick={() => { navigate("/contact"); window.scrollTo({ top: 0, behavior: "smooth" }); }}
            className="btn-red"
          >
            Start Your Project
          </button>
        </div>
      </div>
    </section>
  );
}
