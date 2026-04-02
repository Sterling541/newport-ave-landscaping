/* ============================================================
   OUR WORK / PORTFOLIO PAGE — Newport Ave Landscaping
   Design: Dark charcoal + cream. Serif display headings.
   Masonry-style portfolio grid using real project images.
   ============================================================ */
import { useEffect, useRef, useState } from "react";
import { Link } from "wouter";

function FadeIn({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.05 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

const projects = [
  {
    title: "Broken Top Water Feature & Sunken Fire Pit",
    category: "Water Features · Fire Features",
    img: "https://newportavelandscaping.com/wp-content/uploads/2022/05/bend-oregon-brokentop-driveway-finished.jpg",
  },
  {
    title: "NW Bend Backyard Landscaping",
    category: "Design & Build · Water Features",
    img: "https://newportavelandscaping.com/wp-content/uploads/2022/05/nw-bend-backyard-install-pondless-water-feature-pathway-with-lighting-1.jpeg",
  },
  {
    title: "East Bend Landscape Install",
    category: "Design & Build · Irrigation",
    img: "https://newportavelandscaping.com/wp-content/uploads/2022/05/east-bend-landscape-install-finished-backyard-aeriel-view2.jpg",
  },
  {
    title: "Paver Patio & Gas Firepit",
    category: "Pavers · Fire Features",
    img: "https://newportavelandscaping.com/wp-content/uploads/2022/05/bend-oregon-paver-patio-gas-firepit-photo-1.jpg",
  },
  {
    title: "Awbrey Butte Xeriscape",
    category: "Xeriscaping · Design & Build",
    img: "https://newportavelandscaping.com/wp-content/uploads/2022/05/awbrey-butte-xeriscape-landscaping-renovation-day-shot.jpg",
  },
  {
    title: "Century Drive Landscape Enhancement",
    category: "Design & Build · Planting",
    img: "https://newportavelandscaping.com/wp-content/uploads/2022/05/century-drive-landscape-enhancement-finished-1.jpg",
  },
  {
    title: "Westside Outdoor Living Space",
    category: "Outdoor Living · Pavers",
    img: "https://newportavelandscaping.com/wp-content/uploads/2022/05/westside-outdoor-living-space-finished-1.jpg",
  },
  {
    title: "Backyard Landscape Renovation",
    category: "Design & Build · Irrigation",
    img: "https://newportavelandscaping.com/wp-content/uploads/2022/05/backyard-landscape-renovation-finished-1.jpg",
  },
  {
    title: "Awbrey Butte Patio Extension & Wall",
    category: "Pavers · Retaining Walls",
    img: "https://newportavelandscaping.com/wp-content/uploads/2022/05/awbrey-butte-patio-extension-wall-finished-1.jpg",
  },
  {
    title: "Awbrey Glenn Flagstone Patio & Walkway",
    category: "Pavers · Walkways",
    img: "https://newportavelandscaping.com/wp-content/uploads/2022/05/awbrey-glenn-flagstone-patio-walkway-finished-1.jpg",
  },
  {
    title: "SW Bend Backyard Landscaping",
    category: "Design & Build · Planting",
    img: "https://newportavelandscaping.com/wp-content/uploads/2022/05/sw-bend-backyard-landscaping-finished-1.jpg",
  },
  {
    title: "NW Bend Landscape Lighting",
    category: "Landscape Lighting",
    img: "https://newportavelandscaping.com/wp-content/uploads/2022/05/nw-bend-landscape-lighting-finished-1.jpg",
  },
  {
    title: "Broken Top Xeriscape",
    category: "Xeriscaping · Design & Build",
    img: "https://newportavelandscaping.com/wp-content/uploads/2022/05/broken-top-xeriscape-finished-1.jpg",
  },
];

const categories = ["All", "Design & Build", "Pavers", "Water Features", "Fire Features", "Xeriscaping", "Outdoor Living", "Landscape Lighting"];

export default function OurWork() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = activeCategory === "All"
    ? projects
    : projects.filter((p) => p.category.includes(activeCategory));

  return (
    <div style={{ backgroundColor: "oklch(0.12 0.005 0)" }}>

      {/* ── Hero ── */}
      <section
        className="relative flex items-end"
        style={{
          height: "clamp(280px, 38vw, 440px)",
          backgroundImage: "url(https://newportavelandscaping.com/wp-content/uploads/2022/05/bend-oregon-brokentop-driveway-finished.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(0deg, oklch(0.10 0.005 0 / 0.95) 0%, oklch(0 0 0 / 0.35) 70%)" }}
        />
        <div className="container relative pb-14 pt-32">
          <div className="font-label mb-3 flex items-center gap-3" style={{ color: "oklch(0.72 0.12 25)" }}>
            <span className="inline-block h-px w-7" style={{ backgroundColor: "oklch(0.46 0.20 25)" }} />
            Portfolio
          </div>
          <h1
            className="font-display font-light text-white"
            style={{ fontSize: "clamp(2.4rem, 6vw, 5rem)", lineHeight: 1.0 }}
          >
            Our Work<br />
            <em style={{ color: "oklch(0.75 0.10 25)" }}>Central Oregon</em>
          </h1>
          <p
            className="font-body mt-4"
            style={{ color: "oklch(0.72 0.008 0)", fontWeight: 300, maxWidth: "520px" }}
          >
            Get your inspiration flowing. Discover what a Central Oregon yard can become.
          </p>
        </div>
      </section>

      {/* ── Category Filter ── */}
      <section className="py-10" style={{ backgroundColor: "oklch(0.15 0.005 0)" }}>
        <div className="container">
          <div className="flex flex-wrap gap-3">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className="font-label px-5 py-2 transition-all duration-200"
                style={{
                  fontSize: "0.68rem",
                  letterSpacing: "0.10em",
                  backgroundColor: activeCategory === cat ? "oklch(0.46 0.20 25)" : "oklch(0.22 0.005 0)",
                  color: activeCategory === cat ? "oklch(1 0 0)" : "oklch(0.65 0.008 0)",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── Portfolio Grid ── */}
      <section className="pb-24 pt-4" style={{ backgroundColor: "oklch(0.12 0.005 0)" }}>
        <div className="container">
          <div
            className="grid gap-4"
            style={{
              gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
            }}
          >
            {filtered.map((project, i) => (
              <FadeIn key={project.title} delay={(i % 6) * 0.06}>
                <div
                  className="group relative overflow-hidden"
                  style={{
                    aspectRatio: i % 5 === 0 ? "16/9" : "4/3",
                    cursor: "default",
                  }}
                >
                  <img
                    src={project.img}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    onError={(e) => {
                      // Fallback to a solid color if image fails
                      (e.target as HTMLImageElement).style.display = "none";
                    }}
                  />
                  {/* Overlay */}
                  <div
                    className="absolute inset-0 flex flex-col justify-end p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ background: "linear-gradient(0deg, oklch(0.10 0.005 0 / 0.92) 0%, transparent 60%)" }}
                  >
                    <div
                      className="font-label mb-1"
                      style={{ color: "oklch(0.72 0.12 25)", fontSize: "0.62rem" }}
                    >
                      {project.category}
                    </div>
                    <div
                      className="font-display font-light text-white"
                      style={{ fontSize: "1.05rem", lineHeight: 1.2 }}
                    >
                      {project.title}
                    </div>
                  </div>
                  {/* Always-visible bottom bar */}
                  <div
                    className="absolute bottom-0 left-0 right-0 p-4 group-hover:opacity-0 transition-opacity duration-300"
                    style={{ background: "linear-gradient(0deg, oklch(0.10 0.005 0 / 0.80) 0%, transparent 100%)" }}
                  >
                    <div
                      className="font-display font-light text-white"
                      style={{ fontSize: "0.9rem", lineHeight: 1.2 }}
                    >
                      {project.title}
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-20">
              <div className="font-display font-light text-white" style={{ fontSize: "1.5rem" }}>
                No projects in this category yet.
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ── Services callout ── */}
      <section className="py-16" style={{ backgroundColor: "oklch(0.15 0.005 0)" }}>
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <FadeIn>
              <div className="font-label mb-3 flex items-center gap-3" style={{ color: "oklch(0.72 0.12 25)" }}>
                <span className="inline-block h-px w-7" style={{ backgroundColor: "oklch(0.46 0.20 25)" }} />
                Residential Services
              </div>
              <div className="font-body" style={{ color: "oklch(0.65 0.008 0)", fontWeight: 300, lineHeight: 1.8, fontSize: "0.9rem" }}>
                Patios · Pavers · Fire Features · Outdoor Kitchens · Sprinkler/Irrigation Systems · Water Features · Snow Removal · Landscape Lighting · Retaining Walls · Landscape Design · Drainage · Xeriscaping
              </div>
            </FadeIn>
            <FadeIn delay={0.1}>
              <div className="font-label mb-3 flex items-center gap-3" style={{ color: "oklch(0.72 0.12 25)" }}>
                <span className="inline-block h-px w-7" style={{ backgroundColor: "oklch(0.46 0.20 25)" }} />
                Commercial Services
              </div>
              <div className="font-body" style={{ color: "oklch(0.65 0.008 0)", fontWeight: 300, lineHeight: 1.8, fontSize: "0.9rem" }}>
                Landscape Maintenance · Landscape Design & Consultation · Water Consultation & Management · Snow & Ice Management
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 text-center" style={{ backgroundColor: "oklch(0.46 0.20 25)" }}>
        <div className="container">
          <FadeIn>
            <h2
              className="font-display font-light text-white mb-4"
              style={{ fontSize: "clamp(1.8rem, 3.5vw, 3rem)" }}
            >
              Ready to Create Your Dream Yard?
            </h2>
            <p
              className="font-body mb-8 mx-auto"
              style={{ color: "oklch(0.92 0.05 25)", fontWeight: 300, maxWidth: "480px" }}
            >
              Let's start a conversation about your outdoor vision. Our award-winning design team is ready.
            </p>
            <Link
              href="/contact"
              className="inline-block font-label px-10 py-4 text-white"
              style={{ backgroundColor: "oklch(0.15 0.005 0)", letterSpacing: "0.12em" }}
            >
              GET A FREE QUOTE
            </Link>
          </FadeIn>
        </div>
      </section>

    </div>
  );
}
