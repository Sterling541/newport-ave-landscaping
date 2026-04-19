// PortfolioProjectLayout — shared template for all portfolio project pages
// Design: dark charcoal base, red accents, top-left/bottom-right rounded corners
// Performance: hero eager-loaded with fetchpriority=high, gallery images lazy-loaded with sizes hints
import { useEffect } from "react";
import { Link } from "wouter";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface ProjectImage {
  src: string;
  alt: string;
}

interface ProjectDetail {
  label: string;
  value: string;
}

interface RelatedProject {
  title: string;
  href: string;
  image: string;
}

interface PortfolioProjectLayoutProps {
  title: string;
  subtitle?: string;
  heroImage: string;
  description: string;
  details?: ProjectDetail[];
  images?: ProjectImage[];
  relatedProjects?: RelatedProject[];
  prevProject?: { title: string; href: string };
  nextProject?: { title: string; href: string };
}

export default function PortfolioProjectLayout({
  title,
  subtitle,
  heroImage,
  description,
  details = [],
  images = [],
  relatedProjects = [],
  prevProject,
  nextProject,
}: PortfolioProjectLayoutProps) {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div style={{ backgroundColor: "oklch(0.13 0.005 0)", color: "oklch(0.92 0 0)", minHeight: "100vh" }}>
      <Navbar />
      <div style={{ paddingTop: "160px" }} />

      {/* Hero — eager load with high fetch priority for LCP */}
      <section className="relative" style={{ height: "55vh", minHeight: "380px", overflow: "hidden" }}>
        <img
          src={heroImage}
          alt={title}
          className="w-full h-full object-cover"
          style={{ opacity: 0.7 }}
          loading="eager"
          fetchPriority="high"
          decoding="async"
          width={1200}
          height={660}
        />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to right, oklch(0 0 0 / 0.75) 40%, oklch(0 0 0 / 0.2))" }} />
        <div className="absolute inset-0 flex items-center">
          <div className="container">
            <Link
              href="/our-work"
              className="font-label inline-flex items-center gap-2 mb-5"
              style={{ color: "oklch(0.72 0.12 25)", fontSize: "0.65rem", letterSpacing: "0.14em", textDecoration: "none" }}
            >
              <ArrowLeft size={12} /> BACK TO ALL PROJECTS
            </Link>
            {subtitle && (
              <p className="font-label mb-2" style={{ color: "oklch(0.72 0.12 25)", fontSize: "0.65rem", letterSpacing: "0.18em" }}>{subtitle}</p>
            )}
            <h1 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 700, lineHeight: 1.1, color: "oklch(1 0 0)" }}>{title}</h1>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-20">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Description */}
            <div className="lg:col-span-2">
              <p className="font-label mb-4" style={{ color: "oklch(0.72 0.12 25)", fontSize: "0.65rem", letterSpacing: "0.18em" }}>PROJECT OVERVIEW</p>
              <div style={{ fontFamily: "'Lato', sans-serif", fontSize: "1.05rem", lineHeight: 1.8, color: "oklch(0.78 0 0)" }}>
                {description.split("\n").filter(Boolean).map((p, i) => (
                  <p key={i} className="mb-5">{p}</p>
                ))}
              </div>
            </div>

            {/* Details sidebar */}
            {details.length > 0 && (
              <div>
                <div className="p-8" style={{ backgroundColor: "oklch(0.18 0.005 0)", borderRadius: "1.2rem 0.15rem 1.2rem 0.15rem" }}>
                  <p className="font-label mb-6" style={{ color: "oklch(0.72 0.12 25)", fontSize: "0.65rem", letterSpacing: "0.18em" }}>PROJECT DETAILS</p>
                  <div className="space-y-4">
                    {details.map((d, i) => (
                      <div key={i} style={{ borderBottom: "1px solid oklch(1 0 0 / 0.08)", paddingBottom: "1rem" }}>
                        <p className="font-label mb-1" style={{ color: "oklch(0.55 0 0)", fontSize: "0.6rem", letterSpacing: "0.14em" }}>{d.label}</p>
                        <p style={{ fontFamily: "'Lato', sans-serif", fontSize: "0.9rem", color: "oklch(0.88 0 0)" }}>{d.value}</p>
                      </div>
                    ))}
                  </div>
                  <div className="mt-8">
                    <Link
                      href="/contact"
                      className="btn-red w-full text-center block"
                      style={{ textDecoration: "none" }}
                    >
                      GET A FREE QUOTE
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Photo Gallery — lazy load with sizes hints to avoid layout shift */}
      {images.length > 0 && (
        <section className="pb-20">
          <div className="container">
            <p className="font-label mb-8" style={{ color: "oklch(0.72 0.12 25)", fontSize: "0.65rem", letterSpacing: "0.18em" }}>PROJECT GALLERY</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {images.map((img, i) => (
                <div key={i} className="overflow-hidden" style={{ borderRadius: "1.2rem 0.15rem 1.2rem 0.15rem", aspectRatio: "4/3" }}>
                  <img
                    src={img.src}
                    alt={img.alt}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    loading="lazy"
                    decoding="async"
                    width={800}
                    height={600}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Prev / Next Navigation */}
      {(prevProject || nextProject) && (
        <section className="py-12" style={{ borderTop: "1px solid oklch(1 0 0 / 0.08)" }}>
          <div className="container flex justify-between items-center">
            {prevProject ? (
              <Link
                href={prevProject.href}
                className="inline-flex items-center gap-3 group"
                style={{ textDecoration: "none" }}
              >
                <ArrowLeft size={16} style={{ color: "oklch(0.72 0.12 25)" }} />
                <div>
                  <p className="font-label" style={{ color: "oklch(0.55 0 0)", fontSize: "0.6rem", letterSpacing: "0.14em" }}>PREVIOUS PROJECT</p>
                  <p style={{ fontFamily: "'Lato', sans-serif", fontSize: "0.9rem", color: "oklch(0.88 0 0)" }}>{prevProject.title}</p>
                </div>
              </Link>
            ) : <div />}
            <Link
              href="/our-work"
              className="btn-outline-white px-6 py-3"
              style={{ textDecoration: "none", fontSize: "0.65rem" }}
            >
              ALL PROJECTS
            </Link>
            {nextProject ? (
              <Link
                href={nextProject.href}
                className="inline-flex items-center gap-3 group text-right"
                style={{ textDecoration: "none" }}
              >
                <div>
                  <p className="font-label" style={{ color: "oklch(0.55 0 0)", fontSize: "0.6rem", letterSpacing: "0.14em" }}>NEXT PROJECT</p>
                  <p style={{ fontFamily: "'Lato', sans-serif", fontSize: "0.9rem", color: "oklch(0.88 0 0)" }}>{nextProject.title}</p>
                </div>
                <ArrowRight size={16} style={{ color: "oklch(0.72 0.12 25)" }} />
              </Link>
            ) : <div />}
          </div>
        </section>
      )}

      {/* Related Projects */}
      {relatedProjects.length > 0 && (
        <section className="py-16" style={{ backgroundColor: "oklch(0.16 0.005 0)" }}>
          <div className="container">
            <p className="font-label mb-8" style={{ color: "oklch(0.72 0.12 25)", fontSize: "0.65rem", letterSpacing: "0.18em" }}>MORE PROJECTS</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {relatedProjects.map((p, i) => (
                <Link
                  key={i}
                  href={p.href}
                  style={{ textDecoration: "none", display: "block" }}
                >
                  <div className="overflow-hidden" style={{ borderRadius: "1.2rem 0.15rem 1.2rem 0.15rem", aspectRatio: "4/3", marginBottom: "0.75rem" }}>
                    <img
                      src={p.image}
                      alt={p.title}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                      loading="lazy"
                      decoding="async"
                      width={600}
                      height={450}
                      sizes="(max-width: 640px) 100vw, 33vw"
                    />
                  </div>
                  <p style={{ fontFamily: "'Lato', sans-serif", fontSize: "0.9rem", color: "oklch(0.88 0 0)", fontWeight: 600 }}>{p.title}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
}
