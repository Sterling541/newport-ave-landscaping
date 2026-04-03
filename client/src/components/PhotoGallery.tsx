/* ============================================================
   PHOTO GALLERY SECTION — Newport Ave Landscaping
   Design: Cream background. Masonry-style grid with varied
   card sizes. Click-to-enlarge lightbox. Fade-in on scroll.
   Uses all real Newport Avenue project photos.
   ============================================================ */
import { useEffect, useRef, useState, useCallback } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

const photos = [
  {
    src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663503028182/g3pw3MRUapabcDUbhBEFxx/GLLPatio10_2ffabcfb.jpg",
    title: "Paver Patio & Fire Feature",
    category: "Hardscape",
    span: "col-span-2 row-span-2", // large featured
  },
  {
    src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663503028182/g3pw3MRUapabcDUbhBEFxx/GLLPatio3_7287b20c.jpg",
    title: "Fire Pit at Sunset",
    category: "Hardscape",
    span: "col-span-1 row-span-1",
  },
  {
    src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663503028182/g3pw3MRUapabcDUbhBEFxx/GLLPatio2_4916fcde.jpg",
    title: "Outdoor Living & Golf Views",
    category: "Patios",
    span: "col-span-1 row-span-1",
  },
  {
    src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663503028182/g3pw3MRUapabcDUbhBEFxx/GLLPatio9_9e7ea695.jpg",
    title: "Multi-Level Patio",
    category: "Hardscape",
    span: "col-span-1 row-span-2",
  },
  {
    src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663503028182/g3pw3MRUapabcDUbhBEFxx/GLLPatio1_90e2e0c4.jpg",
    title: "Elevated Patio & Dining",
    category: "Patios",
    span: "col-span-1 row-span-1",
  },
  {
    src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663503028182/g3pw3MRUapabcDUbhBEFxx/GLLPatioM_939b3a04.jpg",
    title: "Patio Overview",
    category: "Hardscape",
    span: "col-span-1 row-span-1",
  },
  {
    src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663503028182/g3pw3MRUapabcDUbhBEFxx/NewportLandscapingRVParkDay2Photos57_ce65cd27.jpg",
    title: "Commercial Tree Planting",
    category: "Commercial",
    span: "col-span-2 row-span-1",
  },
  {
    src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663503028182/g3pw3MRUapabcDUbhBEFxx/NewportLandscapingRVParkDay2Photos2_8e8d0bb1.jpg",
    title: "Crew at Work",
    category: "Commercial",
    span: "col-span-1 row-span-1",
  },
  {
    src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663503028182/g3pw3MRUapabcDUbhBEFxx/NewportLandscapingRVParkPhotos48_eb8a58d0.jpg",
    title: "Tree Installation",
    category: "Commercial",
    span: "col-span-1 row-span-1",
  },
  {
    src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663503028182/g3pw3MRUapabcDUbhBEFxx/NewportLandscapingRVParkPhotos18_e9e57912.jpg",
    title: "Irrigation & Planting",
    category: "Commercial",
    span: "col-span-1 row-span-1",
  },
  {
    src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663503028182/g3pw3MRUapabcDUbhBEFxx/IMG_1336_4fa29027.JPG",
    title: "Residential Landscaping",
    category: "Landscaping",
    span: "col-span-1 row-span-2",
  },
  {
    src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663503028182/g3pw3MRUapabcDUbhBEFxx/DWinstall3_9346a59a.jpg",
    title: "Large-Scale Install",
    category: "Commercial",
    span: "col-span-2 row-span-1",
  },
];

function FadeIn({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.08 }
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

  // Keyboard navigation
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

  // Lock body scroll when lightbox is open
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
              href="/our-work"
              className="font-label inline-flex items-center gap-2 transition-opacity hover:opacity-70"
              style={{ color: "oklch(0.46 0.20 25)", fontSize: "0.7rem", letterSpacing: "0.1em" }}
            >
              VIEW ALL PROJECTS
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
              delay={i * 0.04}
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
                {/* Overlay on hover */}
                <div
                  className="absolute inset-0 flex flex-col justify-end p-5 transition-opacity duration-300"
                  style={{
                    background: "linear-gradient(0deg, oklch(0.08 0.005 0 / 0.85) 0%, transparent 60%)",
                    opacity: 0,
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
                  onMouseLeave={(e) => (e.currentTarget.style.opacity = "0")}
                >
                  <div className="font-label mb-1" style={{ color: "oklch(0.72 0.12 25)", fontSize: "0.6rem" }}>
                    {photo.category}
                  </div>
                  <div className="font-display font-light text-white" style={{ fontSize: "1rem", lineHeight: 1.2 }}>
                    {photo.title}
                  </div>
                </div>
                {/* Always-visible subtle overlay for hover effect */}
                <div
                  className="absolute inset-0 transition-opacity duration-300 opacity-0 group-hover:opacity-100"
                  style={{ background: "oklch(0.46 0.20 25 / 0.12)" }}
                />
              </button>
            </FadeIn>
          ))}
        </div>

        {/* Mobile: simple 2-col grid fallback */}
        <style>{`
          @media (max-width: 768px) {
            .gallery-grid {
              grid-template-columns: repeat(2, 1fr) !important;
              grid-auto-rows: 180px !important;
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
          {/* Close button */}
          <button
            className="absolute top-5 right-5 z-10 text-white transition-opacity hover:opacity-70"
            onClick={closeLightbox}
            aria-label="Close"
          >
            <X size={28} />
          </button>

          {/* Prev */}
          <button
            className="absolute left-4 z-10 text-white transition-opacity hover:opacity-70 p-2"
            onClick={(e) => { e.stopPropagation(); prev(); }}
            aria-label="Previous photo"
          >
            <ChevronLeft size={36} />
          </button>

          {/* Image */}
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

          {/* Next */}
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
