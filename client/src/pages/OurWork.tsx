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
const SUCHY_PHOTOS = [
  "https://files.manuscdn.com/user_upload_by_module/session_file/310519663503028182/BtVKYdoDFtosJiYr.jpg",
  "https://files.manuscdn.com/user_upload_by_module/session_file/310519663503028182/RZkLIoYMRXODAyCM.jpg",
  "https://files.manuscdn.com/user_upload_by_module/session_file/310519663503028182/FtMttJUoHHZYCbdj.jpg",
  "https://files.manuscdn.com/user_upload_by_module/session_file/310519663503028182/WqyzyvCIFmwwLVwf.jpg",
  "https://files.manuscdn.com/user_upload_by_module/session_file/310519663503028182/BJQnCBIWBSxkYjCM.jpg",
  "https://files.manuscdn.com/user_upload_by_module/session_file/310519663503028182/iHdfAFSCcUmMCmib.jpg",
  "https://files.manuscdn.com/user_upload_by_module/session_file/310519663503028182/psygNYWgbbViJaiG.jpg",
  "https://files.manuscdn.com/user_upload_by_module/session_file/310519663503028182/YQEtbwcOGdASglsf.jpg",
  "https://files.manuscdn.com/user_upload_by_module/session_file/310519663503028182/bbjjzgIJIeHzaqSk.jpg",
];

const HOSMER_PHOTOS = [
  "https://files.manuscdn.com/user_upload_by_module/session_file/310519663503028182/OAhyShvnyMXUNJqn.jpg",
  "https://files.manuscdn.com/user_upload_by_module/session_file/310519663503028182/ydYuxCwLwzvNoXNQ.jpg",
  "https://files.manuscdn.com/user_upload_by_module/session_file/310519663503028182/UWAoTStKXXBmOBMu.jpg",
  "https://files.manuscdn.com/user_upload_by_module/session_file/310519663503028182/XdRaSxrsEsCUxGCF.jpg",
  "https://files.manuscdn.com/user_upload_by_module/session_file/310519663503028182/QfQcioagkxhCEHdy.jpg",
  "https://files.manuscdn.com/user_upload_by_module/session_file/310519663503028182/QuZbCMdvWnmWDtAV.jpg",
  "https://files.manuscdn.com/user_upload_by_module/session_file/310519663503028182/CzvUNmVAPgQRRbCL.jpg",
  "https://files.manuscdn.com/user_upload_by_module/session_file/310519663503028182/lVVEgyfcxeKKnmyY.jpg",
  "https://files.manuscdn.com/user_upload_by_module/session_file/310519663503028182/zCMVyaDdngZZHvwY.jpg",
  "https://files.manuscdn.com/user_upload_by_module/session_file/310519663503028182/oFCNJlnwxjSikzrO.jpg",
  "https://files.manuscdn.com/user_upload_by_module/session_file/310519663503028182/CIvaeoiJEjdrssec.jpg",
  "https://files.manuscdn.com/user_upload_by_module/session_file/310519663503028182/woXXsjlTaYTOCsnM.jpg",
  "https://files.manuscdn.com/user_upload_by_module/session_file/310519663503028182/lqqurINoAUnLOUdf.jpg",
  "https://files.manuscdn.com/user_upload_by_module/session_file/310519663503028182/TBxIerDoaHLuautE.jpg",
  "https://files.manuscdn.com/user_upload_by_module/session_file/310519663503028182/ImggzCVNnPnepqYO.jpg",
  "https://files.manuscdn.com/user_upload_by_module/session_file/310519663503028182/owHRteEIGGvRycKl.jpg",
  "https://files.manuscdn.com/user_upload_by_module/session_file/310519663503028182/KLMrOoOjCHESBbXd.jpg",
];

const MCGRATH_PHOTOS = [
  "https://files.manuscdn.com/user_upload_by_module/session_file/310519663503028182/DsCDLoIMQbfZSjuQ.jpg",
  "https://files.manuscdn.com/user_upload_by_module/session_file/310519663503028182/iLQzysWAIpshLExs.jpg",
  "https://files.manuscdn.com/user_upload_by_module/session_file/310519663503028182/GnijvQODFDMrKxrg.jpg",
  "https://files.manuscdn.com/user_upload_by_module/session_file/310519663503028182/uTOcvbcZVEyEexUs.jpg",
  "https://files.manuscdn.com/user_upload_by_module/session_file/310519663503028182/RDRaedrdxFWkLZJv.jpg",
  "https://files.manuscdn.com/user_upload_by_module/session_file/310519663503028182/retHcMWUuJjuarBk.jpg",
  "https://files.manuscdn.com/user_upload_by_module/session_file/310519663503028182/ambqMQAjmNxaGfTz.jpg",
  "https://files.manuscdn.com/user_upload_by_module/session_file/310519663503028182/znXAXegIgUZJRcee.jpg",
  "https://files.manuscdn.com/user_upload_by_module/session_file/310519663503028182/EyuWkxTqMKjupGHj.jpg",
  "https://files.manuscdn.com/user_upload_by_module/session_file/310519663503028182/YvOMYOfUTJLIYxhZ.jpg",
  "https://files.manuscdn.com/user_upload_by_module/session_file/310519663503028182/PtamSQtLZMVcIwap.jpg",
  "https://files.manuscdn.com/user_upload_by_module/session_file/310519663503028182/fCBGPaTPIXfgNAhf.jpg",
  "https://files.manuscdn.com/user_upload_by_module/session_file/310519663503028182/VErORHNoPueeEPkG.jpg",
  "https://files.manuscdn.com/user_upload_by_module/session_file/310519663503028182/fcRknhIBupDkiSPP.jpg",
  "https://files.manuscdn.com/user_upload_by_module/session_file/310519663503028182/cgCFmZdHHBxadBtL.jpg",
  "https://files.manuscdn.com/user_upload_by_module/session_file/310519663503028182/iIASQJimTxkHYTiX.jpg",
  "https://files.manuscdn.com/user_upload_by_module/session_file/310519663503028182/veogFfZmynMseowj.jpg",
  "https://files.manuscdn.com/user_upload_by_module/session_file/310519663503028182/tHsXSKcevhyhsRjZ.jpg",
  "https://files.manuscdn.com/user_upload_by_module/session_file/310519663503028182/hIxjTkMgIukczrmz.jpg",
  "https://files.manuscdn.com/user_upload_by_module/session_file/310519663503028182/CrNsPnwGSyMrKqea.jpg",
];

// Legacy portfolio from existing site (scraped)
const LEGACY_PROJECTS = [
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
];

const PROJECTS = [
  {
    id: "suchy",
    name: "3771 NE Suchy Backyard",
    location: "Bend, Oregon",
    description: "A complete backyard transformation featuring custom hardscaping, lush plantings, and an outdoor living area designed for Central Oregon's lifestyle.",
    tags: ["Outdoor Living", "Hardscape", "Planting Design"],
    photos: SUCHY_PHOTOS,
  },
  {
    id: "hosmer",
    name: "61826 Hosmer Lake Dr",
    location: "Bend, Oregon",
    description: "Expansive residential landscape installation with natural stone features, irrigated lawn, and seamlessly integrated water-wise plantings.",
    tags: ["Landscape Installation", "Irrigation", "Stone Work"],
    photos: HOSMER_PHOTOS,
  },
  {
    id: "mcgrath",
    name: "64486 McGrath Road",
    location: "Bend, Oregon",
    description: "A large-scale design & build project showcasing paver patios, retaining walls, fire feature, and full irrigation system installation.",
    tags: ["Design & Build", "Pavers", "Fire Feature", "Irrigation"],
    photos: MCGRATH_PHOTOS,
  },
];

interface LightboxState { projectId: string; index: number; isLegacy?: boolean; }

export default function OurWork() {
  const [, navigate] = useLocation();
  const [lightbox, setLightbox] = useState<LightboxState | null>(null);
  const [activeTab, setActiveTab] = useState<"featured" | "legacy">("featured");
  const [activeProject, setActiveProject] = useState<string | null>(null);

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
      <Navbar />

      {/* ── Hero ── */}
      <section
        className="relative flex items-end"
        style={{
          height: "clamp(280px, 38vw, 440px)",
          backgroundImage: `url(${MCGRATH_PHOTOS[4]})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0" style={{ background: "linear-gradient(0deg, oklch(0.10 0.005 0 / 0.95) 0%, oklch(0 0 0 / 0.35) 70%)" }} />
        <div className="container relative pb-14" style={{ paddingTop: "clamp(200px, 22vw, 280px)" }}>
          <div className="font-label mb-3 flex items-center gap-3" style={{ color: "oklch(0.72 0.12 25)" }}>
            <span className="inline-block h-px w-7" style={{ backgroundColor: "oklch(0.46 0.20 25)" }} />
            Portfolio
          </div>
          <h1 className="font-display font-light text-white" style={{ fontSize: "clamp(2.4rem, 6vw, 5rem)", lineHeight: 1.0 }}>
            Our Work<br />
            <em style={{ color: "oklch(0.75 0.10 25)" }}>Central Oregon</em>
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
              backgroundColor: activeTab === "featured" ? "oklch(0.46 0.20 25)" : "transparent",
              color: activeTab === "featured" ? "oklch(1 0 0)" : "oklch(0.65 0.008 0)",
              border: activeTab === "featured" ? "none" : "1.5px solid oklch(0.35 0.005 0)",
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
              backgroundColor: activeTab === "legacy" ? "oklch(0.46 0.20 25)" : "transparent",
              color: activeTab === "legacy" ? "oklch(1 0 0)" : "oklch(0.65 0.008 0)",
              border: activeTab === "legacy" ? "none" : "1.5px solid oklch(0.35 0.005 0)",
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
                  {p.name.split(" ").slice(0, 3).join(" ")}
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
                  <span className="font-label block mb-2" style={{ color: "oklch(0.46 0.20 25)" }}>{project.location}</span>
                  <h2 className="font-display font-light text-white" style={{ fontSize: "clamp(1.8rem, 3vw, 2.6rem)", lineHeight: 1.1 }}>
                    {project.name}
                  </h2>
                  <p className="font-body mt-2 max-w-2xl" style={{ color: "oklch(0.60 0.005 0)", fontSize: "0.95rem" }}>
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {project.tags.map((tag) => (
                      <span key={tag} className="font-label px-3 py-1" style={{ backgroundColor: "oklch(0.46 0.20 25 / 0.18)", color: "oklch(0.72 0.12 25)", borderRadius: "1.2rem 0.15rem 1.2rem 0.15rem", fontSize: "0.58rem" }}>
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

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {project.photos.map((url, idx) => (
                <FadeIn key={idx} delay={idx * 0.03}>
                  <button
                    onClick={() => openLightbox(project.id, idx)}
                    className="photo-card group w-full"
                    style={{
                      aspectRatio: idx === 0 ? "16/9" : "4/3",
                      display: "block",
                      gridColumn: idx === 0 ? "span 2" : undefined,
                    }}
                  >
                    <img
                      src={url}
                      alt={`${project.name} — photo ${idx + 1}`}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center" style={{ backgroundColor: "oklch(0 0 0 / 0.40)" }}>
                      <span className="font-label text-white" style={{ letterSpacing: "0.15em", fontSize: "0.65rem" }}>View</span>
                    </div>
                  </button>
                </FadeIn>
              ))}
            </div>
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
                      <div className="font-label mb-0.5" style={{ color: "oklch(0.72 0.12 25)", fontSize: "0.58rem" }}>{project.category}</div>
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
      <section className="py-20 text-center" style={{ backgroundColor: "oklch(0.46 0.20 25)" }}>
        <div className="container">
          <FadeIn>
            <h2 className="font-display font-light text-white mb-4" style={{ fontSize: "clamp(1.8rem, 3.5vw, 3rem)" }}>
              Ready to Create Your Dream Yard?
            </h2>
            <p className="font-body mb-8 mx-auto" style={{ color: "oklch(0.92 0.05 25)", fontWeight: 300, maxWidth: "480px" }}>
              Let's start a conversation about your outdoor vision. Our award-winning design team is ready.
            </p>
            <Link href="/contact" className="btn-red inline-flex">
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
