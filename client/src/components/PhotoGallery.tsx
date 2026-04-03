/* ============================================================
   PHOTO GALLERY SECTION — Newport Ave Landscaping
   Design: Cream background. Masonry-style grid with varied
   card sizes. Click-to-enlarge lightbox. Fade-in on scroll.
   Uses all real Newport Avenue project photos.
   ============================================================ */
import { useEffect, useRef, useState, useCallback } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

const photos = [
  // --- Row 1: Featured hero shots ---
  {
    src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663503028182/g3pw3MRUapabcDUbhBEFxx/NewportAveLandcaping-13_ef32520c.jpg",
    title: "Flagstone Patio & Stream at Sunset",
    category: "Water Features",
    span: "col-span-2 row-span-2",
  },
  {
    src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663503028182/g3pw3MRUapabcDUbhBEFxx/ITP_7404_28389405.jpg",
    title: "Modern Outdoor Living",
    category: "Outdoor Living",
    span: "col-span-1 row-span-1",
  },
  {
    src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663503028182/g3pw3MRUapabcDUbhBEFxx/fire7_f0b582ff.jpg",
    title: "Fire Pit at Dusk",
    category: "Fire Features",
    span: "col-span-1 row-span-1",
  },
  {
    src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663503028182/g3pw3MRUapabcDUbhBEFxx/ITP_7385_f2bbba86.jpg",
    title: "Pool Deck & Composite Decking",
    category: "Hardscape",
    span: "col-span-1 row-span-2",
  },
  {
    src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663503028182/g3pw3MRUapabcDUbhBEFxx/NewportLandscaping-ArchieBriggs-2_41676ecd.jpg",
    title: "Paver Walkway & Front Yard",
    category: "Hardscape",
    span: "col-span-1 row-span-1",
  },
  // --- Row 2 ---
  {
    src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663503028182/g3pw3MRUapabcDUbhBEFxx/NewportAveLandcaping-9_97b731b0.jpg",
    title: "Pond & Patio with Landscape Lighting",
    category: "Water Features",
    span: "col-span-2 row-span-2",
  },
  {
    src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663503028182/g3pw3MRUapabcDUbhBEFxx/fire4_82c70612.jpg",
    title: "Stone Fire Pit & Seating Wall",
    category: "Fire Features",
    span: "col-span-1 row-span-1",
  },
  {
    src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663503028182/g3pw3MRUapabcDUbhBEFxx/ITP_7558_e52a40c9.jpg",
    title: "Outdoor Kitchen & BBQ",
    category: "Outdoor Living",
    span: "col-span-1 row-span-1",
  },
  {
    src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663503028182/g3pw3MRUapabcDUbhBEFxx/GLLPatio10_2ffabcfb.jpg",
    title: "Paver Patio & Fire Feature",
    category: "Hardscape",
    span: "col-span-1 row-span-1",
  },
  {
    src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663503028182/g3pw3MRUapabcDUbhBEFxx/ITP_7447_72a324ef.jpg",
    title: "Tile Walkway & Planters",
    category: "Hardscape",
    span: "col-span-1 row-span-1",
  },
  // --- Row 3 ---
  {
    src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663503028182/g3pw3MRUapabcDUbhBEFxx/NewportAveLandcaping-2_fafb7359.jpg",
    title: "Backyard Patio & Water Feature",
    category: "Landscaping",
    span: "col-span-1 row-span-2",
  },
  {
    src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663503028182/g3pw3MRUapabcDUbhBEFxx/pondless-stream-bend-oregon_ddbe366e.jpg",
    title: "Pondless Stream — Bend, OR",
    category: "Water Features",
    span: "col-span-2 row-span-1",
  },
  {
    src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663503028182/g3pw3MRUapabcDUbhBEFxx/ITP_7287_3749a375.jpg",
    title: "Composite Deck & Turf",
    category: "Outdoor Living",
    span: "col-span-1 row-span-1",
  },
  {
    src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663503028182/g3pw3MRUapabcDUbhBEFxx/NewportAveLandcaping-5_1a063eaa.jpg",
    title: "Rock Garden & Native Plants",
    category: "Landscaping",
    span: "col-span-1 row-span-1",
  },
  {
    src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663503028182/g3pw3MRUapabcDUbhBEFxx/GLLPatio3_7287b20c.jpg",
    title: "Fire Pit at Sunset",
    category: "Hardscape",
    span: "col-span-1 row-span-1",
  },
  // --- Row 4 ---
  {
    src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663503028182/g3pw3MRUapabcDUbhBEFxx/forest-home4_cd8d9af7.jpg",
    title: "Koi Pond & Waterfall at Dusk",
    category: "Water Features",
    span: "col-span-2 row-span-2",
  },
  {
    src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663503028182/g3pw3MRUapabcDUbhBEFxx/outdoor-kitchen-water_90c45e1a.jpg",
    title: "Outdoor Kitchen & Boulder Water Feature",
    category: "Outdoor Living",
    span: "col-span-1 row-span-1",
  },
  {
    src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663503028182/g3pw3MRUapabcDUbhBEFxx/water-feature-sunset_f7b219d3.jpg",
    title: "Pond & Flagstone Path at Sunset",
    category: "Water Features",
    span: "col-span-1 row-span-1",
  },
  {
    src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663503028182/g3pw3MRUapabcDUbhBEFxx/ITP_7315_b6d377b2.jpg",
    title: "Pool & Spa — Outdoor Living",
    category: "Outdoor Living",
    span: "col-span-1 row-span-1",
  },
  {
    src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663503028182/g3pw3MRUapabcDUbhBEFxx/landscaping-native_fa3d1cfe.jpg",
    title: "Native Rock Garden & Plantings",
    category: "Landscaping",
    span: "col-span-1 row-span-1",
  },
  // --- Row 5 ---
  {
    src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663503028182/g3pw3MRUapabcDUbhBEFxx/forest-home3_a0744dff.jpg",
    title: "Forest Stream & Fire Pit Patio",
    category: "Water Features",
    span: "col-span-2 row-span-2",
  },
  {
    src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663503028182/g3pw3MRUapabcDUbhBEFxx/img-2975_daa4e035.jpg",
    title: "Residential Landscaping",
    category: "Landscaping",
    span: "col-span-1 row-span-1",
  },
  {
    src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663503028182/g3pw3MRUapabcDUbhBEFxx/img-2979_757411bc.jpg",
    title: "Landscaping & Planting",
    category: "Landscaping",
    span: "col-span-1 row-span-1",
  },
  {
    src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663503028182/g3pw3MRUapabcDUbhBEFxx/NewportAveLandcaping-14_96d1eb45.jpg",
    title: "Residential Landscaping",
    category: "Landscaping",
    span: "col-span-1 row-span-1",
  },
  {
    src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663503028182/g3pw3MRUapabcDUbhBEFxx/NewportLandscapingRVParkDay2Photos57_ce65cd27.jpg",
    title: "Commercial Tree Planting",
    category: "Commercial",
    span: "col-span-1 row-span-1",
  },
  // --- Row 6 ---
  {
    src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663503028182/g3pw3MRUapabcDUbhBEFxx/NewportAveLandcaping-10_ee1a5c7b.jpg",
    title: "Landscaping & Planting",
    category: "Landscaping",
    span: "col-span-1 row-span-1",
  },
  {
    src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663503028182/g3pw3MRUapabcDUbhBEFxx/ITP_7532_89e9f821.jpg",
    title: "Pool Deck — Evening Lighting",
    category: "Outdoor Living",
    span: "col-span-1 row-span-1",
  },
  {
    src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663503028182/g3pw3MRUapabcDUbhBEFxx/NewportLandscapingRVParkPhotos48_eb8a58d0.jpg",
    title: "Commercial Install",
    category: "Commercial",
    span: "col-span-1 row-span-1",
  },
  {
    src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663503028182/g3pw3MRUapabcDUbhBEFxx/ITP_7407_032aed3b.jpg",
    title: "Concrete Planter & Turf",
    category: "Landscaping",
    span: "col-span-1 row-span-1",
  },
  {
    src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663503028182/g3pw3MRUapabcDUbhBEFxx/crew-concrete.jpg",
    title: "Crew at Work — Concrete & Masonry",
    category: "Behind the Scenes",
    span: "col-span-1 row-span-1",
  },
  {
    src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663503028182/g3pw3MRUapabcDUbhBEFxx/NewportAveLandcaping-3_168c9c48.jpg",
    title: "Residential Landscaping",
    category: "Landscaping",
    span: "col-span-1 row-span-1",
  },
  // --- Powell Butte Loop Project ---
  {
    src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663503028182/g3pw3MRUapabcDUbhBEFxx/powell-butte-1_21624e54.webp",
    title: "Powell Butte — Full Outdoor Living Build",
    category: "Outdoor Living",
    span: "col-span-2 row-span-2",
  },
  {
    src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663503028182/g3pw3MRUapabcDUbhBEFxx/powell-butte-5_060ae194.webp",
    title: "Powell Butte — Outdoor Kitchen",
    category: "Outdoor Living",
    span: "col-span-1 row-span-1",
  },
  {
    src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663503028182/g3pw3MRUapabcDUbhBEFxx/powell-butte-6_66c0faeb.webp",
    title: "Powell Butte — Fire Pit & Seating",
    category: "Fire Features",
    span: "col-span-1 row-span-1",
  },
  {
    src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663503028182/g3pw3MRUapabcDUbhBEFxx/powell-butte-14_fbef73a2.webp",
    title: "Powell Butte — Pool & Spa",
    category: "Outdoor Living",
    span: "col-span-1 row-span-2",
  },
  {
    src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663503028182/g3pw3MRUapabcDUbhBEFxx/powell-butte-3_bfd76730.webp",
    title: "Powell Butte — Composite Deck",
    category: "Hardscape",
    span: "col-span-1 row-span-1",
  },
  {
    src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663503028182/g3pw3MRUapabcDUbhBEFxx/powell-butte-4_adf9848a.webp",
    title: "Powell Butte — Turf & Landscape",
    category: "Landscaping",
    span: "col-span-1 row-span-1",
  },
  {
    src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663503028182/g3pw3MRUapabcDUbhBEFxx/powell-butte-7_b7794905.webp",
    title: "Powell Butte — Evening Lighting",
    category: "Outdoor Living",
    span: "col-span-2 row-span-1",
  },
  {
    src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663503028182/g3pw3MRUapabcDUbhBEFxx/powell-butte-8_46deb546.webp",
    title: "Powell Butte — Pergola & Deck",
    category: "Outdoor Living",
    span: "col-span-1 row-span-1",
  },
  {
    src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663503028182/g3pw3MRUapabcDUbhBEFxx/powell-butte-9_48d92f6d.webp",
    title: "Powell Butte — Paver Patio",
    category: "Hardscape",
    span: "col-span-1 row-span-1",
  },
  {
    src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663503028182/g3pw3MRUapabcDUbhBEFxx/powell-butte-10_e07daf7c.webp",
    title: "Powell Butte — Landscape Lighting",
    category: "Landscaping",
    span: "col-span-1 row-span-1",
  },
  {
    src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663503028182/g3pw3MRUapabcDUbhBEFxx/powell-butte-11_9553a544.webp",
    title: "Powell Butte — Stone Fireplace",
    category: "Fire Features",
    span: "col-span-1 row-span-2",
  },
  {
    src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663503028182/g3pw3MRUapabcDUbhBEFxx/powell-butte-12_1c5b4f2f.webp",
    title: "Powell Butte — Outdoor Dining",
    category: "Outdoor Living",
    span: "col-span-1 row-span-1",
  },
  {
    src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663503028182/g3pw3MRUapabcDUbhBEFxx/powell-butte-13_c5a01571.webp",
    title: "Powell Butte — Raised Planters",
    category: "Landscaping",
    span: "col-span-1 row-span-1",
  },
  {
    src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663503028182/g3pw3MRUapabcDUbhBEFxx/powell-butte-15_517b2e5a.webp",
    title: "Powell Butte — Dusk View",
    category: "Outdoor Living",
    span: "col-span-2 row-span-1",
  },
  {
    src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663503028182/g3pw3MRUapabcDUbhBEFxx/powell-butte-16_ab1065e0.webp",
    title: "Powell Butte — Walkway & Steps",
    category: "Hardscape",
    span: "col-span-1 row-span-1",
  },
  {
    src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663503028182/g3pw3MRUapabcDUbhBEFxx/powell-butte-17_180f7001.webp",
    title: "Powell Butte — Retaining Wall",
    category: "Hardscape",
    span: "col-span-1 row-span-1",
  },
  {
    src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663503028182/g3pw3MRUapabcDUbhBEFxx/powell-butte-18_1e0268bc.webp",
    title: "Powell Butte — Planting Beds",
    category: "Landscaping",
    span: "col-span-1 row-span-1",
  },
  {
    src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663503028182/g3pw3MRUapabcDUbhBEFxx/powell-butte-19_54684fc7.webp",
    title: "Powell Butte — Aerial Overview",
    category: "Outdoor Living",
    span: "col-span-1 row-span-1",
  },
  {
    src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663503028182/g3pw3MRUapabcDUbhBEFxx/powell-butte-20_7895b07f.webp",
    title: "Powell Butte — Spa & Waterfall",
    category: "Water Features",
    span: "col-span-1 row-span-1",
  },
  {
    src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663503028182/g3pw3MRUapabcDUbhBEFxx/powell-butte-31_8548e833.webp",
    title: "Powell Butte — Night Lighting",
    category: "Outdoor Living",
    span: "col-span-1 row-span-1",
  },
  {
    src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663503028182/g3pw3MRUapabcDUbhBEFxx/powell-butte-32_68f01e3c.webp",
    title: "Powell Butte — Kitchen Detail",
    category: "Outdoor Living",
    span: "col-span-1 row-span-1",
  },
  {
    src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663503028182/g3pw3MRUapabcDUbhBEFxx/powell-butte-33_75351121.webp",
    title: "Powell Butte — Finished Project",
    category: "Outdoor Living",
    span: "col-span-2 row-span-1",
  },
  {
    src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663503028182/g3pw3MRUapabcDUbhBEFxx/powell-butte-34_79bdebb8.webp",
    title: "Powell Butte — Landscape Detail",
    category: "Landscaping",
    span: "col-span-1 row-span-1",
  },
];

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
        transform: visible ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 0.65s ease ${delay}s, transform 0.65s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

export default function PhotoGallery() {
  const [lightbox, setLightbox] = useState<number | null>(null);

  const openLightbox = (index: number) => setLightbox(index);
  const closeLightbox = () => setLightbox(null);

  const prev = useCallback(() => {
    if (lightbox === null) return;
    setLightbox((lightbox - 1 + photos.length) % photos.length);
  }, [lightbox]);

  const next = useCallback(() => {
    if (lightbox === null) return;
    setLightbox((lightbox + 1) % photos.length);
  }, [lightbox]);

  useEffect(() => {
    if (lightbox === null) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [lightbox, prev, next]);

  useEffect(() => {
    document.body.style.overflow = lightbox !== null ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [lightbox]);

  return (
    <section className="py-24" style={{ backgroundColor: "oklch(0.97 0.012 85)" }}>
      <div className="container">
        {/* Header */}
        <FadeIn>
          <div className="font-label mb-4 flex items-center gap-3" style={{ color: "oklch(0.46 0.20 25)" }}>
            <span className="inline-block h-px w-7" style={{ backgroundColor: "oklch(0.46 0.20 25)" }} />
            Our Work
          </div>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
            <h2
              className="font-display font-light"
              style={{ fontSize: "clamp(1.8rem, 3.5vw, 3rem)", color: "oklch(0.15 0.005 0)", lineHeight: 1.1 }}
            >
              Project<br />
              <em style={{ color: "oklch(0.46 0.20 25)" }}>Gallery</em>
            </h2>
            <a
              href="/contact"
              className="font-label inline-flex items-center gap-2 transition-opacity hover:opacity-70"
              style={{ color: "oklch(0.46 0.20 25)", fontSize: "0.7rem", letterSpacing: "0.1em" }}
            >
              GET A FREE QUOTE
              <span style={{ display: "inline-block", width: 28, height: 1, backgroundColor: "oklch(0.46 0.20 25)" }} />
            </a>
          </div>
        </FadeIn>

        {/* Masonry Grid */}
        <div
          className="grid gap-3"
          style={{
            gridTemplateColumns: "repeat(4, 1fr)",
            gridAutoRows: "220px",
          }}
        >
          {photos.map((photo, i) => (
            <FadeIn
              key={photo.src}
              delay={i * 0.03}
              className={photo.span}
            >
              <button
                onClick={() => openLightbox(i)}
                className="relative w-full h-full overflow-hidden group block"
                style={{ backgroundColor: "oklch(0.15 0.005 0)" }}
                aria-label={`View ${photo.title}`}
              >
                <img
                  src={photo.src}
                  alt={photo.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div
                  className="absolute inset-0 flex flex-col justify-end p-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background: "linear-gradient(0deg, oklch(0.08 0.005 0 / 0.85) 0%, transparent 60%)",
                  }}
                >
                  <div className="font-label mb-1" style={{ color: "oklch(0.72 0.12 25)", fontSize: "0.6rem" }}>
                    {photo.category}
                  </div>
                  <div className="font-display font-light text-white" style={{ fontSize: "1rem", lineHeight: 1.2 }}>
                    {photo.title}
                  </div>
                </div>
                <div
                  className="absolute inset-0 transition-opacity duration-300 opacity-0 group-hover:opacity-100"
                  style={{ background: "oklch(0.46 0.20 25 / 0.10)" }}
                />
              </button>
            </FadeIn>
          ))}
        </div>

        {/* Mobile responsive */}
        <style>{`
          @media (max-width: 768px) {
            .gallery-grid {
              grid-template-columns: repeat(2, 1fr) !important;
              grid-auto-rows: 160px !important;
            }
            .gallery-grid > * {
              grid-column: span 1 !important;
              grid-row: span 1 !important;
            }
          }
        `}</style>
      </div>

      {/* Lightbox */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{ backgroundColor: "oklch(0.05 0 0 / 0.95)" }}
          onClick={closeLightbox}
        >
          <button
            className="absolute top-5 right-5 z-10 text-white transition-opacity hover:opacity-70"
            onClick={closeLightbox}
            aria-label="Close"
          >
            <X size={28} />
          </button>
          <button
            className="absolute left-4 z-10 text-white transition-opacity hover:opacity-70 p-2"
            onClick={(e) => { e.stopPropagation(); prev(); }}
            aria-label="Previous photo"
          >
            <ChevronLeft size={36} />
          </button>
          <div
            className="relative max-w-5xl w-full mx-16"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={photos[lightbox].src}
              alt={photos[lightbox].title}
              className="w-full max-h-[80vh] object-contain"
              style={{ boxShadow: "0 32px 80px oklch(0 0 0 / 0.6)" }}
            />
            <div className="mt-4 text-center">
              <div className="font-label mb-1" style={{ color: "oklch(0.72 0.12 25)", fontSize: "0.62rem" }}>
                {photos[lightbox].category}
              </div>
              <div className="font-display font-light text-white" style={{ fontSize: "1.1rem" }}>
                {photos[lightbox].title}
              </div>
              <div className="font-label mt-2" style={{ color: "oklch(0.55 0.008 0)", fontSize: "0.6rem" }}>
                {lightbox + 1} / {photos.length}
              </div>
            </div>
          </div>
          <button
            className="absolute right-4 z-10 text-white transition-opacity hover:opacity-70 p-2"
            onClick={(e) => { e.stopPropagation(); next(); }}
            aria-label="Next photo"
          >
            <ChevronRight size={36} />
          </button>
        </div>
      )}
    </section>
  );
}
