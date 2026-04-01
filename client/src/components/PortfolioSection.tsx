/* ============================================================
   PORTFOLIO SECTION — Brand Refresh
   Light gray background, brand red accents, real facility photos
   ============================================================ */
import { useEffect, useRef, useState } from "react";

const WATER_FEATURE =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663503028182/g3pw3MRUapabcDUbhBEFxx/water-feature-9xHShKKvZVEUGyYW39Yoig.webp";
const OUTDOOR_LIVING =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663503028182/g3pw3MRUapabcDUbhBEFxx/outdoor-living-AuvjXxv4t6LYr7V5Zp3Lby.webp";
const HERO_MAIN =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663503028182/g3pw3MRUapabcDUbhBEFxx/hero-main-G8fqyZAnfti5GBXHAqJjh6.webp";
const HERO_SERVICES =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663503028182/g3pw3MRUapabcDUbhBEFxx/hero-services-JzKxhcNzPjF9WTtBX8Sc9c.webp";
// Real facility photos
const FACILITY_AERIAL =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663503028182/g3pw3MRUapabcDUbhBEFxx/NewportLandscapingFacilityHiResPhotos33(2)_f88fff50.webp";
const FACILITY_NURSERY =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663503028182/g3pw3MRUapabcDUbhBEFxx/NewportLandscapingFacilityHiResPhotos27(1)_99973c3e.webp";

const portfolioItems = [
  {
    title: "Backyard Landscape Renovation",
    category: "Design & Build",
    image: HERO_MAIN,
    size: "large",
  },
  {
    title: "Broken Top Water Feature",
    category: "Water Features",
    image: WATER_FEATURE,
    size: "medium",
  },
  {
    title: "Paver Patio & Gas Firepit",
    category: "Outdoor Living",
    image: OUTDOOR_LIVING,
    size: "medium",
  },
  {
    title: "NW Bend Backyard Landscaping",
    category: "Design & Build",
    image: HERO_SERVICES,
    size: "medium",
  },
  {
    title: "Our Nursery & Plant Yard",
    category: "Facility",
    image: FACILITY_NURSERY,
    size: "medium",
  },
  {
    title: "Aerial View — Our Campus",
    category: "Facility",
    image: FACILITY_AERIAL,
    size: "medium",
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
        if (entry.isIntersecting) {
          setTimeout(() => setVisible(true), index * 80);
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [index]);

  return (
    <div
      ref={ref}
      className="relative overflow-hidden group cursor-pointer"
      style={{
        aspectRatio: item.size === "large" ? "16/10" : "4/3",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(30px)",
        transition: `opacity 0.7s ease, transform 0.7s ease`,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image */}
      <img
        src={item.image}
        alt={item.title}
        className="w-full h-full object-cover transition-transform duration-700"
        style={{ transform: hovered ? "scale(1.08)" : "scale(1)" }}
      />

      {/* Overlay */}
      <div
        className="absolute inset-0 flex flex-col justify-end p-6 transition-opacity duration-400"
        style={{
          background:
            "linear-gradient(to top, oklch(0.10 0.005 0 / 0.88) 0%, oklch(0.10 0.005 0 / 0.25) 60%, transparent 100%)",
          opacity: hovered ? 1 : 0.75,
        }}
      >
        <div
          className="font-label mb-2"
          style={{ color: "oklch(0.85 0.10 25)", fontSize: "0.65rem" }}
        >
          {item.category}
        </div>
        <h3
          className="font-display font-medium"
          style={{ color: "oklch(1 0 0)", fontSize: "1.2rem" }}
        >
          {item.title}
        </h3>
      </div>
    </div>
  );
}

export default function PortfolioSection() {
  const titleRef = useRef<HTMLDivElement>(null);
  const [titleVisible, setTitleVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setTitleVisible(true);
      },
      { threshold: 0.2 }
    );
    if (titleRef.current) observer.observe(titleRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="portfolio"
      className="py-24"
      style={{ backgroundColor: "oklch(0.96 0.003 0)" }}
    >
      <div className="container">
        {/* Header */}
        <div
          ref={titleRef}
          className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6"
          style={{
            opacity: titleVisible ? 1 : 0,
            transform: titleVisible ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.7s ease, transform 0.7s ease",
          }}
        >
          <div>
            <div
              className="font-label mb-4 flex items-center gap-3"
              style={{ color: "oklch(0.46 0.20 25)" }}
            >
              <span
                className="inline-block w-8 h-px"
                style={{ backgroundColor: "oklch(0.46 0.20 25)" }}
              />
              Our Work
            </div>
            <h2
              className="font-display font-light"
              style={{
                fontSize: "clamp(2rem, 4vw, 3.5rem)",
                color: "oklch(0.22 0.005 0)",
                lineHeight: 1.1,
              }}
            >
              Find Inspiration in
              <br />
              <em style={{ color: "oklch(0.46 0.20 25)", fontStyle: "italic" }}>
                Central Oregon Yards
              </em>
            </h2>
          </div>
          <p
            className="font-body max-w-sm"
            style={{ color: "oklch(0.50 0.005 0)" }}
          >
            Discover what's possible for your outdoor space. Every project is
            custom-designed to reflect your unique vision.
          </p>
        </div>

        {/* Portfolio grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Large featured item */}
          <div className="lg:col-span-2">
            <PortfolioCard item={portfolioItems[0]} index={0} />
          </div>
          {/* Right column stack */}
          <div className="flex flex-col gap-4">
            <PortfolioCard item={portfolioItems[1]} index={1} />
            <PortfolioCard item={portfolioItems[2]} index={2} />
          </div>
          {/* Bottom row */}
          {portfolioItems.slice(3).map((item, i) => (
            <PortfolioCard key={item.title} item={item} index={i + 3} />
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <button
            onClick={() =>
              document
                .querySelector("#contact")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="btn-red"
          >
            Start Your Transformation
          </button>
        </div>
      </div>
    </section>
  );
}
