/* ============================================================
   OUR WORK — Newport Avenue Landscaping
   Real project galleries with lightbox viewer
   Three projects: Suchy Backyard, Hosmer Lake Dr, McGrath Road
   ============================================================ */
import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "wouter";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import SEO from "@/components/SEO";

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

// ── Project photo CDN URLs ──────────────────────────────────
const CDN = "https://d2xsxph8kpxj0f.cloudfront.net/310519663503028182/g3pw3MRUapabcDUbhBEFxx";

const SUCHY_PHOTOS = [
  `${CDN}/BtVKYdoDFtosJiYr_2e1e8b4f.webp`,
  `${CDN}/RZkLIoYMRXODAyCM_86aa0642.webp`,
  `${CDN}/FtMttJUoHHZYCbdj_1df0a5ce.webp`,
  `${CDN}/WqyzyvCIFmwwLVwf_ef803b8e.webp`,
  `${CDN}/BJQnCBIWBSxkYjCM_2d5b2d9c.webp`,
  `${CDN}/iHdfAFSCcUmMCmib_64d5d2e5.webp`,
  `${CDN}/psygNYWgbbViJaiG_89ebe8fb.webp`,
  `${CDN}/YQEtbwcOGdASglsf_53e63ef7.webp`,
  `${CDN}/bbjjzgIJIeHzaqSk_8be34248.webp`,
];

const HOSMER_PHOTOS = [
  `${CDN}/OAhyShvnyMXUNJqn_48bbbd7f.webp`,
  `${CDN}/ydYuxCwLwzvNoXNQ_3efeb5bf.webp`,
  `${CDN}/UWAoTStKXXBmOBMu_b0d59ac5.webp`,
  `${CDN}/XdRaSxrsEsCUxGCF_5ab35a5d.webp`,
  `${CDN}/QfQcioagkxhCEHdy_d82c4087.webp`,
  `${CDN}/QuZbCMdvWnmWDtAV_0d002a48.webp`,
  `${CDN}/CzvUNmVAPgQRRbCL_a1b2c3d4.webp`,
  `${CDN}/lVVEgyfcxeKKnmyY_2a04bfb2.webp`,
  `${CDN}/zCMVyaDdngZZHvwY_66d79f05.webp`,
  `${CDN}/oFCNJlnwxjSikzrO_14283c30.webp`,
  `${CDN}/CIvaeoiJEjdrssec_e7b2c3a1.webp`,
  `${CDN}/woXXsjlTaYTOCsnM_2e95a253.webp`,
  `${CDN}/lqqurINoAUnLOUdf_2f92d950.webp`,
  `${CDN}/TBxIerDoaHLuautE_76db8efa.webp`,
  `${CDN}/ImggzCVNnPnepqYO_4a2ec446.webp`,
  `${CDN}/owHRteEIGGvRycKl_a2397b3c.webp`,
  `${CDN}/KLMrOoOjCHESBbXd_ce79ee9e.webp`,
];

const MCGRATH_PHOTOS = [
  `${CDN}/DsCDLoIMQbfZSjuQ_b5c6d7e8.webp`,
  `${CDN}/iLQzysWAIpshLExs_cd686ebc.webp`,
  `${CDN}/GnijvQODFDMrKxrg_bdc4efee.webp`,
  `${CDN}/uTOcvbcZVEyEexUs_42a3a31f.webp`,
  `${CDN}/RDRaedrdxFWkLZJv_d329d41b.webp`,
  `${CDN}/retHcMWUuJjuarBk_5cb6b5e7.webp`,
  `${CDN}/ambqMQAjmNxaGfTz_ddd94228.webp`,
  `${CDN}/znXAXegIgUZJRcee_2ed965e4.webp`,
  `${CDN}/EyuWkxTqMKjupGHj_c9d0e1f2.webp`,
  `${CDN}/YvOMYOfUTJLIYxhZ_1a5428d7.webp`,
  `${CDN}/PtamSQtLZMVcIwap_033c59df.webp`,
  `${CDN}/fCBGPaTPIXfgNAhf_92fdbfd4.webp`,
  `${CDN}/VErORHNoPueeEPkG_77c55752.webp`,
  `${CDN}/fcRknhIBupDkiSPP_b43c1c38.webp`,
  `${CDN}/cgCFmZdHHBxadBtL_a351e89a.webp`,
  `${CDN}/iIASQJimTxkHYTiX_097a34ca.webp`,
  `${CDN}/veogFfZmynMseowj_8f8ae20b.webp`,
  `${CDN}/tHsXSKcevhyhsRjZ_a22ce559.webp`,
  `${CDN}/hIxjTkMgIukczrmz_89b818ae.webp`,
  `${CDN}/CrNsPnwGSyMrKqea_c9d4e5f2.webp`,
];

// Awbrey Butte — luxury outdoor living using GLL Patio CDN images
const AWBREY_PHOTOS = [
  `${CDN}/GLLPatio1_90e2e0c4.jpg`,
  `${CDN}/GLLPatio2_4916fcde.jpg`,
  `${CDN}/GLLPatio9_9e7ea695.jpg`,
  `${CDN}/GLLPatio10_2ffabcfb.jpg`,
];

// Legacy portfolio from existing site (scraped)
const LEGACY_PROJECTS = [
  { title: "Bend Full Yard Transformation", category: "Design & Build · Xeriscape · Pavers", img: `${CDN}/proj-bend-after-backyard1_c8556c78.jpg`, href: "/portfolio/bend-full-yard-transformation" },
  { title: "Broken Top Water Feature & Sunken Fire Pit", category: "Water Features · Fire Features", img: "https://newportavelandscaping.com/wp-content/uploads/2022/05/Brokentop-Water-Feature-and-Sunken-Fire-Pit-After-Picture.jpg", href: "/portfolio/broken-top-water-feature" },
  { title: "NW Bend Backyard Landscaping", category: "Design & Build · Water Features", img: "https://newportavelandscaping.com/wp-content/uploads/2022/05/NW-Bend-Backyard-After-Picture.jpg", href: "/portfolio/nw-bend-backyard" },
  { title: "East Bend Landscape Install", category: "Design & Build · Irrigation", img: "https://newportavelandscaping.com/wp-content/uploads/2022/05/east-bend-landscape-install-finished-backyard-aeriel-view2-1.jpg", href: "/portfolio/east-bend-landscape" },
  { title: "Paver Patio & Gas Firepit", category: "Pavers · Fire Features", img: "https://newportavelandscaping.com/wp-content/uploads/2022/05/bend-oregon-paver-patio-gas-firepit-photo-2.jpg", href: "/portfolio/paver-patio-firepit" },
  { title: "Awbrey Butte Xeriscape", category: "Xeriscaping · Design & Build", img: "https://newportavelandscaping.com/wp-content/uploads/2022/05/awbrey-butte-xeriscape-landscaping-renovation-day-shot.jpg", href: "/portfolio/awbrey-butte-xeriscape" },
  { title: "Century Drive Landscape Enhancement", category: "Design & Build · Planting", img: "https://newportavelandscaping.com/wp-content/uploads/2022/05/century-drive-bend-oregon-stream-pondless-water-feature-enhancement-front-view.jpg", href: "/portfolio/century-drive" },
  { title: "Broken Top Xeriscape", category: "Xeriscaping · Design & Build", img: "https://newportavelandscaping.com/wp-content/uploads/2022/05/Bend-OR-Brokentop-Xeriscape-After-Picture.jpg", href: "/portfolio/broken-top-xeriscape" },
  { title: "Awbrey Glenn Flagstone Patio & Walkway", category: "Pavers · Walkways", img: "https://newportavelandscaping.com/wp-content/uploads/2022/05/awbrey-glen-flagstone-front-walkway-after-photo-1.jpg", href: "/portfolio/awbrey-glenn-flagstone" },
  { title: "SW Bend Backyard Landscaping", category: "Outdoor Living · Design & Build", img: "https://newportavelandscaping.com/wp-content/uploads/2022/05/south-west-bend-oregon-campground-backyard-full-view-2.jpg", href: "/portfolio/sw-bend-backyard" },
  { title: "Backyard Landscape Renovation", category: "Full Renovation · Design & Build", img: "https://newportavelandscaping.com/wp-content/uploads/2022/05/south-east-bend-oregon-backyard-landscape-renovation-after-photo-1-2-768x512.jpg", href: "/portfolio/backyard-renovation" },
  { title: "Awbrey Butte Patio Extension & Wall", category: "Pavers · Retaining Walls · Outdoor Living", img: "https://newportavelandscaping.com/wp-content/uploads/2022/09/awbrey-butte-freestanding-wall-pavers-patio-extension.jpg", href: "/portfolio/awbrey-butte-patio" },
  { title: "NW Bend Landscape Lighting", category: "Landscape Lighting · Water Features", img: "https://newportavelandscaping.com/wp-content/uploads/2022/05/nw-bend-landscape-lighting-photo-1.jpg", href: "/portfolio/nw-bend-lighting" },
  { title: "Westside Outdoor Living Space", category: "Outdoor Living · Water Features · Fire Features", img: "https://newportavelandscaping.com/wp-content/uploads/2022/05/Bend-Oregon-Westside-Outdoor-Before-Picture.jpg", href: "/portfolio/westside-outdoor-living" },
];

const PROJECTS = [
  {
    id: "suchy",
    name: "Petrosa Neighborhood Backyard",
    location: "Bend, Oregon",
    description: "A complete backyard transformation featuring custom hardscaping, lush plantings, and an outdoor living area designed for Central Oregon's lifestyle.",
    tags: ["Outdoor Living", "Hardscape", "Planting Design"],
    photos: SUCHY_PHOTOS,
  },
  {
    id: "hosmer",
    name: "Westgate Neighborhood Landscape",
    location: "Bend, Oregon",
    description: "Expansive residential landscape installation with natural stone features, irrigated lawn, and seamlessly integrated water-wise plantings.",
    tags: ["Landscape Installation", "Irrigation", "Stone Work"],
    photos: HOSMER_PHOTOS,
  },
  {
    id: "mcgrath",
    name: "East Bend Design & Build",
    location: "Bend, Oregon",
    description: "A large-scale design & build project in East Bend showcasing paver patios, retaining walls, fire feature, and full irrigation system installation.",
    tags: ["Design & Build", "Pavers", "Fire Feature", "Irrigation"],
    photos: MCGRATH_PHOTOS,
  },
  {
    id: "awbrey",
    name: "Awbrey Butte Outdoor Living",
    location: "Bend, Oregon",
    description: "A luxury outdoor living transformation in Awbrey Butte — one of Bend's most prestigious neighborhoods. Custom patio design, premium hardscape, and integrated plantings that complement the elevated terrain and mountain views.",
    tags: ["Outdoor Living", "Luxury Residential", "Hardscape", "Awbrey Butte"],
    photos: AWBREY_PHOTOS,
  },
];

interface LightboxState { projectId: string; index: number; isLegacy?: boolean; }

export default function OurWork() {
  const [, navigate] = useLocation();
  const [lightbox, setLightbox] = useState<LightboxState | null>(null);
  const [activeTab, setActiveTab] = useState<"featured" | "legacy">("featured");
  const [activeProject, setActiveProject] = useState<string | null>(null);
  const [expandedProjects, setExpandedProjects] = useState<Set<string>>(new Set());

  const toggleExpand = (id: string) => {
    setExpandedProjects((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  };

  const openLightbox = (projectId: string, index: number, isLegacy = false) => {
    setLightbox({ projectId, index, isLegacy });
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    setLightbox(null);
    document.body.style.overflow = "";
  };

  const navigateLightbox = (dir: 1 | -1) => {
    if (!lightbox) return;
    if (lightbox.isLegacy) {
      const newIndex = (lightbox.index + dir + LEGACY_PROJECTS.length) % LEGACY_PROJECTS.length;
      setLightbox({ ...lightbox, index: newIndex });
    } else {
      const project = PROJECTS.find((p) => p.id === lightbox.projectId)!;
      const newIndex = (lightbox.index + dir + project.photos.length) % project.photos.length;
      setLightbox({ ...lightbox, index: newIndex });
    }
  };

  const currentLightboxPhoto = lightbox
    ? lightbox.isLegacy
      ? LEGACY_PROJECTS[lightbox.index]?.img
      : PROJECTS.find((p) => p.id === lightbox.projectId)?.photos[lightbox.index]
    : null;

  const displayedProjects = activeProject
    ? PROJECTS.filter((p) => p.id === activeProject)
    : PROJECTS;

  return (
     <div style={{ backgroundColor: "oklch(0.12 0.005 0)" }}>
      <SEO
        title="Our Work | Landscaping Portfolio Bend Oregon | Newport Avenue"
        description="Browse Newport Avenue Landscaping's project portfolio — paver patios, custom backyard designs, water features & commercial installs in Bend, OR. Real photos from real Central Oregon projects."
        canonical="/our-work"
      />
      <Navbar />
      {/* ── Hero ── */}
      <section
        className="relative flex items-end"
        style={{
          height: "clamp(280px, 38vw, 440px)", marginTop: "204px",
          backgroundImage: `url(${MCGRATH_PHOTOS[4]})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0" style={{ background: "linear-gradient(0deg, oklch(0.10 0.005 0 / 0.95) 0%, oklch(0 0 0 / 0.35) 70%)" }} />
        <div className="container relative pb-14" style={{ paddingTop: "clamp(200px, 22vw, 280px)" }}>
          <div className="font-label mb-3 flex items-center gap-3" style={{ color: "oklch(0.72 0.14 240)" }}>
            <span className="inline-block h-px w-7" style={{ backgroundColor: "oklch(0.65 0.16 240)" }} />
            Portfolio
          </div>
          <h1 className="font-display font-light text-white" style={{ fontSize: "clamp(2.4rem, 6vw, 5rem)", lineHeight: 1.0 }}>
            Our Work<br />
            <em style={{ color: "oklch(0.72 0.14 240)" }}>Central Oregon</em>
          </h1>
          <p className="font-body mt-4" style={{ color: "oklch(0.72 0.008 0)", fontWeight: 300, maxWidth: "520px" }}>
            Real projects. Real craftsmanship. Browse our portfolio of residential and commercial landscaping work across Central Oregon.
          </p>
        </div>
      </section>

      {/* ── Tab switcher ── */}
      <section className="py-8 border-b" style={{ borderColor: "oklch(0.22 0.005 0)", backgroundColor: "oklch(0.15 0.005 0)" }}>
        <div className="container flex flex-wrap items-center gap-4">
          <button
            onClick={() => setActiveTab("featured")}
            className="font-nav px-6 py-2.5 transition-all duration-200"
            style={{
              borderRadius: "1.2rem 0.15rem 1.2rem 0.15rem",
              backgroundColor: activeTab === "featured" ? "oklch(0.38 0.14 240)" : "transparent",
              color: activeTab === "featured" ? "oklch(1 0 0)" : "oklch(0.65 0.008 0)",
              border: activeTab === "featured" ? "1.5px solid oklch(0.55 0.16 240)" : "1.5px solid oklch(0.35 0.005 0)",
              fontSize: "0.65rem",
            }}
          >
            Featured Projects
          </button>
          <button
            onClick={() => setActiveTab("legacy")}
            className="font-nav px-6 py-2.5 transition-all duration-200"
            style={{
              borderRadius: "1.2rem 0.15rem 1.2rem 0.15rem",
              backgroundColor: activeTab === "legacy" ? "oklch(0.38 0.14 240)" : "transparent",
              color: activeTab === "legacy" ? "oklch(1 0 0)" : "oklch(0.65 0.008 0)",
              border: activeTab === "legacy" ? "1.5px solid oklch(0.55 0.16 240)" : "1.5px solid oklch(0.35 0.005 0)",
              fontSize: "0.65rem",
            }}
          >
            More Projects
          </button>

          {activeTab === "featured" && (
            <div className="flex flex-wrap gap-2 ml-4">
              <button
                onClick={() => setActiveProject(null)}
                className="font-nav px-4 py-1.5 transition-all duration-200"
                style={{
                  borderRadius: "1.2rem 0.15rem 1.2rem 0.15rem",
                  backgroundColor: !activeProject ? "oklch(0.22 0.005 0)" : "transparent",
                  color: !activeProject ? "oklch(0.90 0.003 0)" : "oklch(0.55 0.005 0)",
                  border: "1px solid oklch(0.28 0.005 0)",
                  fontSize: "0.60rem",
                }}
              >
                All
              </button>
              {PROJECTS.map((p) => (
                <button
                  key={p.id}
                  onClick={() => setActiveProject(p.id === activeProject ? null : p.id)}
                  className="font-nav px-4 py-1.5 transition-all duration-200"
                  style={{
                    borderRadius: "1.2rem 0.15rem 1.2rem 0.15rem",
                    backgroundColor: activeProject === p.id ? "oklch(0.22 0.005 0)" : "transparent",
                    color: activeProject === p.id ? "oklch(0.90 0.003 0)" : "oklch(0.55 0.005 0)",
                    border: "1px solid oklch(0.28 0.005 0)",
                    fontSize: "0.60rem",
                  }}
                >
                  {p.name}
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── Featured Project Galleries ── */}
      {activeTab === "featured" && displayedProjects.map((project, pi) => (
        <section key={project.id} className="py-16" style={{ backgroundColor: pi % 2 === 0 ? "oklch(0.12 0.005 0)" : "oklch(0.15 0.005 0)" }}>
          <div className="container">
            <FadeIn>
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
                <div>
                  <span className="font-label block mb-2" style={{ color: "oklch(0.65 0.16 240)" }}>{project.location}</span>
                  <h2 className="font-display font-light text-white" style={{ fontSize: "clamp(1.8rem, 3vw, 2.6rem)", lineHeight: 1.1 }}>
                    {project.name}
                  </h2>
                  <p className="font-body mt-2 max-w-2xl" style={{ color: "oklch(0.60 0.005 0)", fontSize: "0.95rem" }}>
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {project.tags.map((tag) => (
                      <span key={tag} className="font-label px-3 py-1" style={{ backgroundColor: "oklch(0.38 0.14 240 / 0.22)", color: "oklch(0.72 0.14 240)", borderRadius: "1.2rem 0.15rem 1.2rem 0.15rem", fontSize: "0.58rem", border: "1px solid oklch(0.55 0.16 240 / 0.30)" }}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="font-label shrink-0" style={{ color: "oklch(0.45 0.005 0)", fontSize: "0.65rem" }}>
                  {project.photos.length} photos
                </div>
              </div>
            </FadeIn>

            {(() => {
              const isExpanded = expandedProjects.has(project.id);
              const visiblePhotos = isExpanded ? project.photos : project.photos.slice(0, 4);
              return (
                <>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                    {visiblePhotos.map((url, idx) => (
                      <FadeIn key={idx} delay={idx * 0.03} className={idx === 0 ? "col-span-2" : ""}>
                        <button
                          onClick={() => openLightbox(project.id, idx)}
                          className="photo-card group w-full"
                          style={{
                            aspectRatio: idx === 0 ? "16/9" : "4/3",
                            display: "block",
                          }}
                        >
                          <img
                            src={url}
                            alt={`${project.name} — photo ${idx + 1}`}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            loading="lazy"
                          />
                          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center" style={{ backgroundColor: "oklch(0.22 0.10 240 / 0.55)" }}>
                            <span className="font-label text-white" style={{ letterSpacing: "0.15em", fontSize: "0.65rem" }}>View</span>
                          </div>
                        </button>
                      </FadeIn>
                    ))}
                  </div>
                  {project.photos.length > 4 && (
                    <div className="text-center mt-6">
                      <button
                        onClick={() => toggleExpand(project.id)}
                        className="font-label transition-all duration-200"
                        style={{
                          padding: "0.6rem 1.8rem",
                          border: "1.5px solid oklch(0.55 0.16 240 / 0.50)",
                          borderRadius: "12px 0 12px 0",
                          color: "oklch(0.72 0.14 240)",
                          backgroundColor: "transparent",
                          fontSize: "0.62rem",
                          letterSpacing: "0.12em",
                          cursor: "pointer",
                        }}
                      >
                        {isExpanded ? `SHOW LESS` : `VIEW ALL ${project.photos.length} PHOTOS`}
                      </button>
                    </div>
                  )}
                </>
              );
            })()}
          </div>
        </section>
      ))}

      {/* ── Legacy Portfolio Grid ── */}
      {activeTab === "legacy" && (
        <section className="py-16" style={{ backgroundColor: "oklch(0.12 0.005 0)" }}>
          <div className="container">
            <FadeIn>
              <h2 className="font-display font-light text-white mb-2" style={{ fontSize: "clamp(1.8rem, 3vw, 2.6rem)" }}>
                More Projects
              </h2>
              <p className="font-body mb-10" style={{ color: "oklch(0.55 0.005 0)", fontSize: "0.95rem" }}>
                A selection of additional residential and commercial projects across Central Oregon.
              </p>
            </FadeIn>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {LEGACY_PROJECTS.map((project, i) => (
                <FadeIn key={project.title} delay={i * 0.05}>
                  <button
                    onClick={() => project.href ? (navigate(project.href), window.scrollTo({ top: 0, behavior: "smooth" })) : openLightbox("legacy", i, true)}
                    className="photo-card group w-full"
                    style={{ aspectRatio: "4/3", display: "block" }}
                  >
                    <img
                      src={project.img}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                      onError={(e) => { (e.target as HTMLImageElement).style.opacity = "0.3"; }}
                    />
                    <div className="absolute bottom-0 left-0 right-0 p-4" style={{ background: "linear-gradient(0deg, oklch(0.10 0.005 0 / 0.88) 0%, transparent 100%)" }}>
                      <div className="font-label mb-0.5" style={{ color: "oklch(0.72 0.14 240)", fontSize: "0.58rem" }}>{project.category}</div>
                      <div className="font-display font-light text-white" style={{ fontSize: "0.9rem", lineHeight: 1.2 }}>{project.title}</div>
                    </div>
                  </button>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── CTA ── */}
      <section className="py-20 text-center" style={{ background: "linear-gradient(135deg, oklch(0.16 0.08 240) 0%, oklch(0.26 0.10 240) 50%, oklch(0.20 0.07 240) 100%)" }}>
        <div className="container">
          <FadeIn>
            <div className="font-label mb-4 flex items-center justify-center gap-3" style={{ color: "oklch(0.65 0.16 240)" }}>
              <span className="inline-block h-px w-8" style={{ backgroundColor: "oklch(0.65 0.16 240)" }} />
              START YOUR PROJECT
              <span className="inline-block h-px w-8" style={{ backgroundColor: "oklch(0.65 0.16 240)" }} />
            </div>
            <h2 className="font-display font-light text-white mb-4" style={{ fontSize: "clamp(1.8rem, 3.5vw, 3rem)" }}>
              Ready to Create Your Dream Yard?
            </h2>
            <p className="font-body mb-8 mx-auto" style={{ color: "oklch(0.80 0.06 240)", fontWeight: 300, maxWidth: "480px" }}>
              Let's start a conversation about your outdoor vision. Our award-winning design team is ready.
            </p>
            <Link href="/contact"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                fontFamily: "'Montserrat', sans-serif",
                fontSize: "0.72rem",
                fontWeight: 700,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "oklch(0.12 0.06 240)",
                backgroundColor: "oklch(0.65 0.16 240)",
                padding: "0.85rem 2.2rem",
                borderRadius: "1.8rem 0.2rem 1.8rem 0.2rem",
                textDecoration: "none",
              }}
            >
              Get a Free Quote
            </Link>
          </FadeIn>
        </div>
      </section>

      <Footer />

      {/* ── Lightbox ── */}
      {lightbox && currentLightboxPhoto && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{ backgroundColor: "oklch(0 0 0 / 0.92)" }}
          onClick={closeLightbox}
        >
          <button onClick={closeLightbox} className="absolute top-5 right-5 text-white p-2 hover:opacity-70 transition-opacity z-10" aria-label="Close">
            <X size={28} />
          </button>
          <button onClick={(e) => { e.stopPropagation(); navigateLightbox(-1); }} className="absolute left-4 text-white p-3 hover:opacity-70 transition-opacity z-10" aria-label="Previous">
            <ChevronLeft size={36} />
          </button>
          <img
            src={currentLightboxPhoto}
            alt="Project photo"
            className="max-h-[88vh] max-w-[90vw] object-contain"
            onClick={(e) => e.stopPropagation()}
            style={{ borderRadius: "1.2rem 0.15rem 1.2rem 0.15rem" }}
          />
          <button onClick={(e) => { e.stopPropagation(); navigateLightbox(1); }} className="absolute right-4 text-white p-3 hover:opacity-70 transition-opacity z-10" aria-label="Next">
            <ChevronRight size={36} />
          </button>
          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 font-label text-white" style={{ letterSpacing: "0.12em", fontSize: "0.65rem" }}>
            {lightbox.index + 1} / {lightbox.isLegacy ? LEGACY_PROJECTS.length : PROJECTS.find((p) => p.id === lightbox.projectId)?.photos.length}
          </div>
        </div>
      )}
    </div>
  );
}
