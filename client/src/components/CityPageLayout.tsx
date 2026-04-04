/* ============================================================
   CITY PAGE LAYOUT — Newport Avenue Landscaping
   Reusable template for all city/community landing pages.
   SEO-optimized: per-page title, description, canonical URL,
   LocalBusiness + Service + BreadcrumbList + FAQPage schema,
   internal links to service pages and nearby area pages,
   and conversion-focused trust + CTA blocks.
   ============================================================ */
import { useEffect, useRef, useState } from "react";
import { useLocation, Link } from "wouter";
import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TrustBar from "@/components/TrustBar";
import {
  CheckCircle2,
  MapPin,
  Phone,
  ChevronRight,
  Leaf,
  Droplets,
  Wrench,
  Flame,
  Sun,
  Snowflake,
  Star,
} from "lucide-react";

// ── FadeIn helper ────────────────────────────────────────────
function FadeIn({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
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
        transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

// ── Types ─────────────────────────────────────────────────────
export interface CityService {
  icon: "leaf" | "droplets" | "wrench" | "flame" | "sun" | "snowflake";
  name: string;
  description: string;
  href?: string; // internal link to service page
}

export interface NearbyArea {
  label: string;
  href: string; // internal link to that city/service-area page
}

export interface CityPageProps {
  city: string;
  region: string;
  heroImage: string;
  heroPosition?: string;
  tagline: string;
  intro: string;
  communityNote: string;
  services: CityService[];
  whyUs: string[];
  nearbyAreas: NearbyArea[] | string[]; // support both old string[] and new NearbyArea[]
  ctaNote?: string;
  // SEO props
  seoTitle?: string;
  seoDescription?: string;
  canonicalPath?: string; // e.g. "/landscaping/bend"
  faqs?: { question: string; answer: string }[];
}

const ICON_MAP = {
  leaf: Leaf,
  droplets: Droplets,
  wrench: Wrench,
  flame: Flame,
  sun: Sun,
  snowflake: Snowflake,
};

const BASE_URL = "https://newportavelandscaping.com";
const SITE_NAME = "Newport Avenue Landscaping";

// ── Component ─────────────────────────────────────────────────
export default function CityPageLayout(props: CityPageProps) {
  const {
    city,
    region,
    heroImage,
    heroPosition = "center center",
    tagline,
    intro,
    communityNote,
    services,
    whyUs,
    nearbyAreas,
    ctaNote,
    seoTitle,
    seoDescription,
    canonicalPath,
    faqs,
  } = props;

  const [, navigate] = useLocation();

  // Build SEO values
  const pageTitle = seoTitle || `${city} Landscaping Company | ${SITE_NAME}`;
  const pageDesc = seoDescription ||
    `Newport Avenue Landscaping — ${city}'s trusted landscaping company since 2005. Lawn care, irrigation, landscape design, xeriscaping & more in ${city}, ${region}. Licensed & Bonded LCB #9153. Free estimates.`;
  const canonical = canonicalPath ? `${BASE_URL}${canonicalPath}` : undefined;

  // Structured data
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "LandscapeService"],
    "@id": `${BASE_URL}/#business`,
    name: SITE_NAME,
    url: BASE_URL,
    telephone: "+15416178873",
    address: {
      "@type": "PostalAddress",
      streetAddress: "64625 N. HWY 97 #100",
      addressLocality: "Bend",
      addressRegion: "OR",
      postalCode: "97701",
      addressCountry: "US",
    },
    areaServed: { "@type": "City", name: city },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "127",
      bestRating: "5",
    },
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `Landscaping Services in ${city}, Oregon`,
    description: pageDesc,
    url: canonical || `${BASE_URL}/landscaping/${city.toLowerCase().replace(/\s+/g, "-")}`,
    provider: {
      "@type": "LocalBusiness",
      "@id": `${BASE_URL}/#business`,
      name: SITE_NAME,
    },
    areaServed: { "@type": "City", name: city, addressRegion: "OR" },
    serviceType: "Landscaping",
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
      { "@type": "ListItem", position: 2, name: "Service Areas", item: `${BASE_URL}/service-areas` },
      { "@type": "ListItem", position: 3, name: `${city} Landscaping`, item: canonical || `${BASE_URL}/landscaping/${city.toLowerCase()}` },
    ],
  };

  const faqSchema = faqs && faqs.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  } : null;

  // Normalize nearbyAreas to NearbyArea[]
  const normalizedNearby: NearbyArea[] = nearbyAreas.map((a) =>
    typeof a === "string"
      ? { label: a, href: `/service-areas/${a.toLowerCase().replace(/\s+/g, "-")}` }
      : a
  );

  // All service internal links
  const allServiceLinks = [
    { label: "Lawn Care & Maintenance", href: "/services/lawn-service" },
    { label: "Landscape Design", href: "/services/landscape-design" },
    { label: "Irrigation Installation", href: "/services/irrigation" },
    { label: "Sprinkler Repair", href: "/services/sprinkler-repair" },
    { label: "Sprinkler Activation", href: "/services/sprinkler-activation" },
    { label: "Sprinkler Blowout", href: "/services/sprinkler-blowout" },
    { label: "Pavers & Walkways", href: "/services/pavers" },
    { label: "Xeriscaping", href: "/services/xeriscaping" },
    { label: "Water Features", href: "/services/water-features" },
    { label: "Outdoor Living Spaces", href: "/services/outdoor-living" },
    { label: "Fire Pits & Fireplaces", href: "/services/fire-features" },
    { label: "Landscape Lighting", href: "/services/landscape-lighting" },
    { label: "Snow Removal", href: "/services/snow-removal" },
    { label: "Aeration", href: "/services/aeration" },
    { label: "Lawn Fungus Treatment", href: "/services/lawn-fungus" },
    { label: "Commercial Maintenance", href: "/commercial" },
  ];

  return (
    <div className="min-h-screen" style={{ backgroundColor: "oklch(1 0 0)" }}>
      {/* ── SEO HEAD ──────────────────────────────────────── */}
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDesc} />
        {canonical && <link rel="canonical" href={canonical} />}
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDesc} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={heroImage} />
        {canonical && <meta property="og:url" content={canonical} />}
        <meta property="og:site_name" content={SITE_NAME} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDesc} />
        <meta name="twitter:image" content={heroImage} />
        <script type="application/ld+json">{JSON.stringify(localBusinessSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(serviceSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
        {faqSchema && <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>}
      </Helmet>

      <Navbar />

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section
        className="relative flex items-end"
        style={{ minHeight: "clamp(420px, 55vh, 640px)", marginTop: "204px" }}
      >      <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${heroImage})`,
            backgroundSize: "cover",
            backgroundPosition: heroPosition,
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, oklch(0.08 0.005 0 / 0.92) 0%, oklch(0.08 0.005 0 / 0.55) 55%, oklch(0.08 0.005 0 / 0.28) 100%)",
          }}
        />
        <div className="relative z-10 container pb-14 pt-28">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-4">
            <ol className="flex items-center gap-2 flex-wrap" style={{ listStyle: "none", padding: 0, margin: 0 }}>
              <li>
                <Link href="/" style={{ color: "oklch(0.72 0.12 25)", fontSize: "0.65rem", fontFamily: "'Montserrat', sans-serif", letterSpacing: "0.1em", textDecoration: "none" }}>
                  Home
                </Link>
              </li>
              <li style={{ color: "oklch(0.50 0.005 0)", fontSize: "0.65rem" }}>›</li>
              <li>
                <Link href="/service-areas" style={{ color: "oklch(0.72 0.12 25)", fontSize: "0.65rem", fontFamily: "'Montserrat', sans-serif", letterSpacing: "0.1em", textDecoration: "none" }}>
                  Service Areas
                </Link>
              </li>
              <li style={{ color: "oklch(0.50 0.005 0)", fontSize: "0.65rem" }}>›</li>
              <li style={{ color: "oklch(0.85 0.005 0)", fontSize: "0.65rem", fontFamily: "'Montserrat', sans-serif", letterSpacing: "0.1em" }}>
                {city}
              </li>
            </ol>
          </nav>
          <div
            className="font-label mb-3 flex items-center gap-3"
            style={{ color: "oklch(0.72 0.12 25)" }}
          >
            <MapPin size={12} strokeWidth={2} />
            Landscaping in {city}, {region}
          </div>
          <h1
            className="font-display font-light mb-3"
            style={{
              fontSize: "clamp(2rem, 5vw, 3.8rem)",
              color: "oklch(1 0 0)",
              lineHeight: 1.05,
              maxWidth: "680px",
            }}
          >
            {city} Landscaping &amp;{" "}
            <em style={{ color: "oklch(0.72 0.12 25)", fontStyle: "italic" }}>
              {tagline}
            </em>
          </h1>
          <p
            className="font-body mb-8"
            style={{
              color: "oklch(0.85 0.005 0)",
              fontSize: "clamp(0.95rem, 1.5vw, 1.1rem)",
              maxWidth: "560px",
              lineHeight: 1.7,
            }}
          >
            Newport Avenue Landscaping — serving {city} and all of Central
            Oregon since 2005.
          </p>
          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => navigate("/contact")}
              className="btn-pill-copper"
            >
              Get a Free Quote
            </button>
            <a href="tel:5416178873" className="btn-outline-white">
              (541) 617-8873
            </a>
          </div>
        </div>
      </section>

      {/* ── CREDENTIAL BAR ────────────────────────────────── */}
      <div className="py-4" style={{ backgroundColor: "oklch(0.46 0.20 25)" }}>
        <div className="container">
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2">
            {[
              "Serving " + city + " Since 2005",
              "150+ In-House Professionals",
              "Licensed, Bonded & Insured — LCB #9153",
              "Free Estimates",
            ].map((item) => (
              <div
                key={item}
                className="font-label flex items-center gap-2"
                style={{ color: "oklch(1 0 0)", fontSize: "0.63rem" }}
              >
                <CheckCircle2 size={12} strokeWidth={2} />
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
      <TrustBar />
      {/* ── INTRO ────────────────────────────────────────────────── */}
      <section className="py-20" style={{ backgroundColor: "oklch(1 0 0)" }}>
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <FadeIn>
              <div
                className="font-label mb-4 flex items-center gap-3"
                style={{ color: "oklch(0.46 0.20 25)" }}
              >
                <span
                  className="inline-block w-8 h-px"
                  style={{ backgroundColor: "oklch(0.46 0.20 25)" }}
                />
                Landscaping in {city}
              </div>
              <h2
                className="font-display font-light mb-6"
                style={{
                  fontSize: "clamp(1.7rem, 3vw, 2.6rem)",
                  color: "oklch(0.12 0.005 0)",
                  lineHeight: 1.1,
                }}
              >
                {city.endsWith("s") ? city : city + "'s"} Trusted{" "}
                <em
                  style={{ color: "oklch(0.46 0.20 25)", fontStyle: "italic" }}
                >
                  Landscape Partner
                </em>
              </h2>
              <p
                className="font-body mb-5"
                style={{
                  color: "oklch(0.35 0.005 0)",
                  lineHeight: 1.8,
                  fontSize: "1rem",
                }}
              >
                {intro}
              </p>
              <p
                className="font-body"
                style={{
                  color: "oklch(0.45 0.005 0)",
                  lineHeight: 1.8,
                  fontSize: "0.95rem",
                }}
              >
                {communityNote}
              </p>
            </FadeIn>

            <FadeIn delay={0.15}>
              <div
                className="rounded-sm overflow-hidden"
                style={{ border: "1px solid oklch(0.90 0.005 0)" }}
              >
                <div
                  className="p-6"
                  style={{ backgroundColor: "oklch(0.97 0.010 85)" }}
                >
                  <p
                    className="font-label mb-4"
                    style={{
                      color: "oklch(0.46 0.20 25)",
                      fontSize: "0.62rem",
                      letterSpacing: "0.16em",
                    }}
                  >
                    WHY {city.toUpperCase()} CHOOSES NEWPORT AVE
                  </p>
                  <ul className="space-y-3">
                    {whyUs.map((point) => (
                      <li key={point} className="flex items-start gap-3">
                        <CheckCircle2
                          size={15}
                          strokeWidth={2}
                          className="mt-0.5 flex-shrink-0"
                          style={{ color: "oklch(0.46 0.20 25)" }}
                        />
                        <span
                          className="font-body"
                          style={{
                            color: "oklch(0.30 0.005 0)",
                            fontSize: "0.92rem",
                            lineHeight: 1.6,
                          }}
                        >
                          {point}
                        </span>
                      </li>
                    ))}
                  </ul>
                  {/* Star rating trust signal */}
                  <div className="mt-5 pt-5 flex items-center gap-3" style={{ borderTop: "1px solid oklch(0.88 0.005 0)" }}>
                    <div className="flex gap-0.5">
                      {[1,2,3,4,5].map((s) => (
                        <Star key={s} size={13} fill="oklch(0.72 0.18 60)" stroke="none" />
                      ))}
                    </div>
                    <span className="font-label" style={{ fontSize: "0.60rem", color: "oklch(0.45 0.005 0)", letterSpacing: "0.12em" }}>
                      4.9 / 5 — 127+ GOOGLE REVIEWS
                    </span>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── SERVICES GRID ─────────────────────────────────── */}
      <section
        className="py-20"
        style={{ backgroundColor: "oklch(0.97 0.010 85)" }}
      >
        <div className="container">
          <FadeIn>
            <div className="text-center mb-12">
              <div
                className="font-label mb-3 flex items-center justify-center gap-3"
                style={{ color: "oklch(0.46 0.20 25)", fontSize: "0.62rem", letterSpacing: "0.18em" }}
              >
                <span className="inline-block w-8 h-px" style={{ backgroundColor: "oklch(0.46 0.20 25)" }} />
                OUR SERVICES IN {city.toUpperCase()}
                <span className="inline-block w-8 h-px" style={{ backgroundColor: "oklch(0.46 0.20 25)" }} />
              </div>
              <h2
                className="font-display font-light"
                style={{
                  fontSize: "clamp(1.6rem, 3vw, 2.6rem)",
                  color: "oklch(0.12 0.005 0)",
                  lineHeight: 1.1,
                }}
              >
                Complete Landscape Services
                <br />
                <em style={{ color: "oklch(0.46 0.20 25)", fontStyle: "italic" }}>
                  for {city} Properties
                </em>
              </h2>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((svc, i) => {
              const Icon = ICON_MAP[svc.icon];
              const card = (
                <div
                  className="h-full"
                  style={{
                    backgroundColor: "oklch(1 0 0)",
                    border: "1px solid oklch(0.90 0.005 0)",
                    borderRadius: "2px",
                    padding: "28px 24px",
                    transition: "box-shadow 0.2s ease, transform 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 20px oklch(0.18 0.008 30 / 0.10)";
                    (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.boxShadow = "none";
                    (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                  }}
                >
                  <div
                    className="mb-4 flex items-center justify-center"
                    style={{
                      width: "44px",
                      height: "44px",
                      backgroundColor: "oklch(0.96 0.025 25)",
                      borderRadius: "2px",
                    }}
                  >
                    <Icon size={20} strokeWidth={1.5} style={{ color: "oklch(0.46 0.20 25)" }} />
                  </div>
                  <h3
                    className="font-display font-light mb-2"
                    style={{ fontSize: "1.15rem", color: "oklch(0.12 0.005 0)" }}
                  >
                    {svc.name}
                  </h3>
                  <p
                    className="font-body"
                    style={{ color: "oklch(0.45 0.005 0)", fontSize: "0.88rem", lineHeight: 1.7 }}
                  >
                    {svc.description}
                  </p>
                  {svc.href && (
                    <div className="mt-3">
                      <span style={{ color: "oklch(0.46 0.20 25)", fontSize: "0.68rem", fontFamily: "'Montserrat', sans-serif", fontWeight: 600, letterSpacing: "0.1em" }}>
                        Learn more →
                      </span>
                    </div>
                  )}
                </div>
              );
              return (
                <FadeIn key={svc.name} delay={i * 0.07}>
                  {svc.href ? (
                    <Link href={svc.href} style={{ textDecoration: "none", display: "block", height: "100%" }}>
                      {card}
                    </Link>
                  ) : card}
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── ALL SERVICES INTERNAL LINK BLOCK ──────────────── */}
      <section className="py-14" style={{ backgroundColor: "oklch(0.15 0.005 0)" }}>
        <div className="container">
          <FadeIn>
            <div className="font-label mb-6" style={{ color: "oklch(0.72 0.12 25)", fontSize: "0.62rem", letterSpacing: "0.18em" }}>
              FULL SERVICE MENU — {city.toUpperCase()}, OREGON
            </div>
            <div className="flex flex-wrap gap-2">
              {allServiceLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.3rem",
                    padding: "0.5rem 1rem",
                    backgroundColor: "oklch(0.22 0.008 30)",
                    color: "oklch(0.85 0.005 0)",
                    fontFamily: "'Montserrat', sans-serif",
                    fontSize: "0.65rem",
                    fontWeight: 500,
                    letterSpacing: "0.08em",
                    textDecoration: "none",
                    borderRadius: "0.15rem",
                    transition: "background-color 0.2s ease",
                  }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "oklch(0.46 0.20 25)"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "oklch(0.22 0.008 30)"; }}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── FAQ SECTION ───────────────────────────────────── */}
      {faqs && faqs.length > 0 && (
        <section className="py-20" style={{ backgroundColor: "oklch(1 0 0)" }}>
          <div className="container">
            <FadeIn>
              <div className="font-label mb-2" style={{ color: "oklch(0.46 0.20 25)", fontSize: "0.62rem" }}>
                FREQUENTLY ASKED QUESTIONS
              </div>
              <h2 className="font-display font-light mb-10" style={{ fontSize: "clamp(1.5rem, 2.5vw, 2.2rem)", color: "oklch(0.12 0.005 0)" }}>
                {city} Landscaping FAQ
              </h2>
              <div className="space-y-6 max-w-3xl">
                {faqs.map((faq, i) => (
                  <FadeIn key={i} delay={i * 0.05}>
                    <div style={{ borderLeft: "3px solid oklch(0.46 0.20 25)", paddingLeft: "1.25rem" }}>
                      <h3 className="font-body mb-2" style={{ fontWeight: 600, fontSize: "0.95rem", color: "oklch(0.18 0.005 0)" }}>
                        {faq.question}
                      </h3>
                      <p className="font-body" style={{ color: "oklch(0.42 0.005 0)", fontSize: "0.9rem", lineHeight: 1.75 }}>
                        {faq.answer}
                      </p>
                    </div>
                  </FadeIn>
                ))}
              </div>
            </FadeIn>
          </div>
        </section>
      )}

      {/* ── NEARBY AREAS — now with real internal links ───── */}
      <section className="py-14" style={{ backgroundColor: "oklch(0.965 0.008 85)" }}>
        <div className="container">
          <FadeIn>
            <div className="font-label mb-4" style={{ color: "oklch(0.46 0.20 25)", fontSize: "0.60rem", letterSpacing: "0.16em" }}>
              ALSO SERVING NEARBY COMMUNITIES
            </div>
            <div className="flex flex-wrap gap-2">
              {normalizedNearby.map((area) => (
                <Link
                  key={area.label}
                  href={area.href}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.3rem",
                    padding: "0.45rem 1rem",
                    backgroundColor: "oklch(1 0 0)",
                    border: "1px solid oklch(0.85 0.005 0)",
                    color: "oklch(0.30 0.005 0)",
                    fontFamily: "'Montserrat', sans-serif",
                    fontSize: "0.68rem",
                    fontWeight: 500,
                    textDecoration: "none",
                    borderRadius: "0.15rem",
                    transition: "border-color 0.2s ease, color 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.borderColor = "oklch(0.46 0.20 25)";
                    (e.currentTarget as HTMLAnchorElement).style.color = "oklch(0.46 0.20 25)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.borderColor = "oklch(0.85 0.005 0)";
                    (e.currentTarget as HTMLAnchorElement).style.color = "oklch(0.30 0.005 0)";
                  }}
                >
                  <MapPin size={10} strokeWidth={2} />
                  {area.label}
                </Link>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── CTA BANNER ────────────────────────────────────── */}
      <section
        className="py-20"
        style={{ backgroundColor: "oklch(1 0 0)" }}
      >
        <div className="container text-center">
          <FadeIn>
            <div
              className="font-label mb-4 flex items-center justify-center gap-3"
              style={{ color: "oklch(0.46 0.20 25)", fontSize: "0.62rem", letterSpacing: "0.18em" }}
            >
              <span className="inline-block w-8 h-px" style={{ backgroundColor: "oklch(0.46 0.20 25)" }} />
              GET STARTED
              <span className="inline-block w-8 h-px" style={{ backgroundColor: "oklch(0.46 0.20 25)" }} />
            </div>
            <h2
              className="font-display font-light mb-4"
              style={{
                fontSize: "clamp(1.8rem, 3.5vw, 3rem)",
                color: "oklch(0.12 0.005 0)",
                lineHeight: 1.1,
              }}
            >
              Ready to Transform Your{" "}
              <em style={{ color: "oklch(0.46 0.20 25)", fontStyle: "italic" }}>
                {city} Property?
              </em>
            </h2>
            {ctaNote && (
              <p
                className="font-body mb-8 mx-auto"
                style={{
                  color: "oklch(0.45 0.005 0)",
                  maxWidth: "520px",
                  lineHeight: 1.7,
                  fontSize: "1rem",
                }}
              >
                {ctaNote}
              </p>
            )}
            <div className="flex flex-wrap gap-4 justify-center mt-6">
              <button
                onClick={() => navigate("/contact")}
                className="btn-pill-copper"
              >
                Request a Free Quote
                <ChevronRight size={14} className="ml-1" />
              </button>
              <a href="tel:5416178873" className="btn-outline-dark">
                (541) 617-8873
              </a>
            </div>
          </FadeIn>
        </div>
      </section>

      <Footer />
    </div>
  );
}
