/* ============================================================
   SERVICE PAGE LAYOUT — Reusable template for all service pages
   Design: Dark charcoal + cream. Serif display headings.
   ============================================================ */
import { useEffect, useRef, useState } from "react";
import { Link } from "wouter";
import Navbar from "@/components/Navbar";
import { Helmet } from "react-helmet-async";
import TrustBar from "@/components/TrustBar";

export function FadeIn({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
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

interface ServiceSection {
  heading: string;
  body: string | string[];
  list?: string[];
  accent?: boolean;
}

interface FAQItem {
  question: string;
  answer: string;
}

interface ServicePageProps {
  category: string;
  title: string;
  subtitle?: string;
  heroImage: string;
  heroPosition?: string;
  intro: string;
  sections: ServiceSection[];
  pricing?: { label: string; value: string }[];
  relatedLinks?: { label: string; href: string }[];
  resourceLinks?: { label: string; href: string; description?: string }[];
  faqs?: FAQItem[];
  schemaName?: string;
  schemaDescription?: string;
  schemaUrl?: string;
}

export default function ServicePageLayout({
  category,
  title,
  subtitle,
  heroImage,
  heroPosition = "center",
  intro,
  sections,
  pricing,
  relatedLinks,
  resourceLinks,
  faqs,
  schemaName,
  schemaDescription,
  schemaUrl,
}: ServicePageProps) {
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: schemaName || title,
    description: schemaDescription || intro,
    url: schemaUrl ? `https://newportavelandscaping.com${schemaUrl}` : undefined,
    provider: {
      "@type": "LocalBusiness",
      "@id": "https://newportavelandscaping.com/#business",
      name: "Newport Avenue Landscaping",
      telephone: "+15416178873",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Bend",
        addressRegion: "OR",
        addressCountry: "US",
      },
    },
    areaServed: [
      { "@type": "City", name: "Bend" },
      { "@type": "City", name: "Redmond" },
      { "@type": "City", name: "Sisters" },
      { "@type": "City", name: "Sunriver" },
      { "@type": "City", name: "Tumalo" },
    ],
    serviceType: schemaName || title,
  };

  const faqSchema = faqs && faqs.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  } : null;

  return (
    <div style={{ backgroundColor: "oklch(0.97 0.012 85)" }}>
      <Helmet>
        <title>{(schemaName || title)} in Bend, Oregon | Newport Avenue Landscaping</title>
        <meta name="description" content={(schemaDescription || intro).slice(0, 160)} />
        {schemaUrl && <link rel="canonical" href={`https://newportavelandscaping.com${schemaUrl}`} />}
        <meta property="og:title" content={`${schemaName || title} in Bend, Oregon | Newport Avenue Landscaping`} />
        <meta property="og:description" content={(schemaDescription || intro).slice(0, 160)} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={heroImage} />
        {schemaUrl && <meta property="og:url" content={`https://newportavelandscaping.com${schemaUrl}`} />}
        <meta property="og:site_name" content="Newport Avenue Landscaping" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${schemaName || title} in Bend, Oregon | Newport Avenue Landscaping`} />
        <meta name="twitter:description" content={(schemaDescription || intro).slice(0, 160)} />
        <meta name="twitter:image" content={heroImage} />
        <script type="application/ld+json">{JSON.stringify(serviceSchema)}</script>
        {faqSchema && <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>}
      </Helmet>
      <Navbar />

      {/* ── Hero ── */}
      <section
        className="relative flex items-end"
        style={{
          height: "clamp(280px, 38vw, 460px)",
          backgroundImage: `url(${heroImage})`,
          backgroundSize: "cover",
          backgroundPosition: heroPosition,
        }}
      >
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(0deg, oklch(0.10 0.005 0 / 0.88) 0%, oklch(0 0 0 / 0.25) 65%)" }}
        />
        <div className="container relative pb-14" style={{ paddingTop: "clamp(200px, 22vw, 280px)" }}>
          <div className="font-label mb-3 flex items-center gap-3" style={{ color: "oklch(0.72 0.12 25)" }}>
            <span className="inline-block h-px w-7" style={{ backgroundColor: "oklch(0.46 0.20 25)" }} />
            {category}
          </div>
          <h1
            className="font-display font-light text-white"
            style={{ fontSize: "clamp(2.2rem, 5.5vw, 4.5rem)", lineHeight: 1.0 }}
          >
            {title}
            {subtitle && (
              <>
                <br />
                <em style={{ color: "oklch(0.75 0.10 25)" }}>{subtitle}</em>
              </>
            )}
          </h1>
        </div>
      </section>

      <TrustBar />
      {/* ── Intro ── */}
      <section className="py-16" style={{ backgroundColor: "oklch(1 0 0)" }}>
        <div className="container">
          <FadeIn>
            <p
              className="font-body"
              style={{
                color: "oklch(0.35 0.008 0)",
                lineHeight: 1.85,
                fontWeight: 300,
                fontSize: "1.05rem",
                maxWidth: "760px",
              }}
            >
              {intro}
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ── Pricing callout ── */}
      {pricing && pricing.length > 0 && (
        <section className="py-10" style={{ backgroundColor: "oklch(0.15 0.005 0)" }}>
          <div className="container">
            <div className="flex flex-wrap gap-8">
              {pricing.map((p) => (
                <div key={p.label}>
                  <div className="font-label mb-1" style={{ color: "oklch(0.72 0.12 25)", fontSize: "0.62rem" }}>
                    {p.label}
                  </div>
                  <div className="font-display font-light text-white" style={{ fontSize: "1.5rem" }}>
                    {p.value}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Content Sections ── */}
      <section className="py-20" style={{ backgroundColor: "oklch(0.97 0.012 85)" }}>
        <div className="container">
          <div className="space-y-14">
            {sections.map((sec, i) => (
              <FadeIn key={sec.heading} delay={i * 0.06}>
                <div
                  className={`grid grid-cols-1 lg:grid-cols-5 gap-0 overflow-hidden`}
                  style={{ backgroundColor: "oklch(1 0 0)" }}
                >
                  {/* Accent bar + heading */}
                  <div
                    className="lg:col-span-2 p-8 flex flex-col justify-center"
                    style={{
                      backgroundColor: sec.accent
                        ? "oklch(0.46 0.20 25)"
                        : i % 2 === 0
                        ? "oklch(0.15 0.005 0)"
                        : "oklch(0.20 0.005 0)",
                    }}
                  >
                    <h2
                      className="font-display font-light text-white"
                      style={{ fontSize: "clamp(1.1rem, 2vw, 1.5rem)", lineHeight: 1.2 }}
                    >
                      {sec.heading}
                    </h2>
                  </div>
                  {/* Body */}
                  <div className="lg:col-span-3 p-8">
                    {typeof sec.body === "string" ? (
                      <p
                        className="font-body mb-4"
                        style={{ color: "oklch(0.38 0.008 0)", lineHeight: 1.8, fontWeight: 300 }}
                      >
                        {sec.body}
                      </p>
                    ) : (
                      sec.body.map((para, pi) => (
                        <p
                          key={pi}
                          className="font-body mb-4"
                          style={{ color: "oklch(0.38 0.008 0)", lineHeight: 1.8, fontWeight: 300 }}
                        >
                          {para}
                        </p>
                      ))
                    )}
                    {sec.list && (
                      <ul className="space-y-2 mt-2">
                        {sec.list.map((item) => (
                          <li key={item} className="flex items-start gap-2">
                            <span
                              className="flex-shrink-0 mt-2 w-1.5 h-1.5 rounded-full"
                              style={{ backgroundColor: "oklch(0.46 0.20 25)" }}
                            />
                            <span
                              className="font-body"
                              style={{ color: "oklch(0.38 0.008 0)", fontSize: "0.9rem", fontWeight: 300 }}
                            >
                              {item}
                            </span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 text-center" style={{ backgroundColor: "oklch(0.46 0.20 25)" }}>
        <div className="container">
          <FadeIn>
            <h2
              className="font-display font-light text-white mb-4"
              style={{ fontSize: "clamp(1.6rem, 3vw, 2.8rem)" }}
            >
              Ready to Get Started?
            </h2>
            <p
              className="font-body mb-8 mx-auto"
              style={{ color: "oklch(0.92 0.05 25)", fontWeight: 300, maxWidth: "480px" }}
            >
              Fill out our form and one of our specialists will be in touch to schedule your free consultation.
            </p>
            <Link
              href="/contact"
              className="btn-red"
            >
              GET A FREE QUOTE
            </Link>
          </FadeIn>
        </div>
      </section>

      {/* ── Related Resources ── */}
      {resourceLinks && resourceLinks.length > 0 && (
        <section className="py-16" style={{ backgroundColor: "oklch(0.97 0.012 85)" }}>
          <div className="container">
            <FadeIn>
              <div className="font-label mb-2" style={{ color: "oklch(0.46 0.20 25)", fontSize: "0.62rem" }}>
                HELPFUL RESOURCES
              </div>
              <h2
                className="font-display font-light mb-8"
                style={{ color: "oklch(0.15 0.005 0)", fontSize: "clamp(1.4rem, 2.5vw, 2rem)" }}
              >
                Guides & Cost Estimates
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {resourceLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    style={{
                      display: "block",
                      padding: "1.25rem 1.5rem",
                      backgroundColor: "oklch(1 0 0)",
                      borderLeft: "3px solid oklch(0.46 0.20 25)",
                      textDecoration: "none",
                      transition: "box-shadow 0.2s ease, transform 0.2s ease",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 4px 20px oklch(0.18 0.008 30 / 0.12)";
                      (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-2px)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLAnchorElement).style.boxShadow = "none";
                      (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(0)";
                    }}
                  >
                    <div
                      className="font-body"
                      style={{ color: "oklch(0.22 0.008 30)", fontWeight: 600, fontSize: "0.88rem", marginBottom: link.description ? "0.4rem" : 0 }}
                    >
                      {link.label}
                    </div>
                    {link.description && (
                      <div
                        className="font-body"
                        style={{ color: "oklch(0.50 0.008 30)", fontSize: "0.78rem", fontWeight: 300, lineHeight: 1.5 }}
                      >
                        {link.description}
                      </div>
                    )}
                  </Link>
                ))}
              </div>
            </FadeIn>
          </div>
        </section>
      )}

      {/* ── Service Areas ── */}
      <section className="py-14" style={{ backgroundColor: "oklch(0.97 0.012 85)" }}>
        <div className="container">
          <FadeIn>
            <div className="font-label mb-2" style={{ color: "oklch(0.46 0.20 25)", fontSize: "0.62rem" }}>WE SERVE</div>
            <h2 className="font-display font-light mb-6" style={{ color: "oklch(0.15 0.005 0)", fontSize: "clamp(1.2rem, 2vw, 1.6rem)" }}>
              Central Oregon Service Areas
            </h2>
            <div className="flex flex-wrap gap-2">
              {[
                { label: "Bend", href: "/service-areas" },
                { label: "Redmond", href: "/service-areas/redmond" },
                { label: "Sisters", href: "/service-areas/sisters" },
                { label: "Sunriver", href: "/service-areas/sunriver" },
                { label: "La Pine", href: "/service-areas/la-pine" },
                { label: "Tumalo", href: "/service-areas/tumalo" },
                { label: "Terrebonne", href: "/service-areas/terrebonne" },
                { label: "Madras", href: "/service-areas/madras" },
                { label: "Prineville", href: "/service-areas/prineville" },
                { label: "Crooked River Ranch", href: "/service-areas/crooked-river-ranch" },
                { label: "Culver", href: "/service-areas/culver" },
              ].map((area) => (
                <Link
                  key={area.href}
                  href={area.href}
                  className="font-label px-4 py-2 transition-all"
                  style={{
                    backgroundColor: "oklch(0.22 0.008 30)",
                    color: "oklch(0.92 0.05 25)",
                    fontSize: "0.68rem",
                    letterSpacing: "0.07em",
                    textDecoration: "none",
                    borderRadius: "0.15rem",
                  }}
                >
                  {area.label}
                </Link>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>
      {/* ── Related Services ── */}
      {relatedLinks && relatedLinks.length > 0 && (
        <section className="py-14" style={{ backgroundColor: "oklch(0.15 0.005 0)" }}>
          <div className="container">
            <div className="font-label mb-6" style={{ color: "oklch(0.72 0.12 25)", fontSize: "0.65rem" }}>
              RELATED SERVICES
            </div>
            <div className="flex flex-wrap gap-3">
              {relatedLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="font-label px-5 py-2 text-white transition-opacity hover:opacity-75"
                  style={{ backgroundColor: "oklch(0.25 0.005 0)", fontSize: "0.68rem", letterSpacing: "0.08em", borderRadius: "1.2rem 0.15rem 1.2rem 0.15rem" }}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
