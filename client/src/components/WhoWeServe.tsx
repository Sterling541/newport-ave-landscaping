/* ============================================================
   WHO WE SERVE — Clean Bright Tabbed Section
   White background, pill tabs, photo + content split card.
   Same great content, completely reinvented visual treatment.
   ============================================================ */
import { useEffect, useRef, useState } from "react";
import { useLocation } from "wouter";

const CDN = "https://d2xsxph8kpxj0f.cloudfront.net/310519663503028182/g3pw3MRUapabcDUbhBEFxx";

const segments = [
  {
    id: "residential",
    tab: "Homeowners",
    label: "HIGH-END RESIDENTIAL",
    headline: "Your Home, Elevated.",
    body: "From luxury outdoor living rooms and custom water features to full estate landscaping — we design and build spaces that reflect your lifestyle and dramatically increase your property's value.",
    bullets: [
      "Custom design & build — no cookie-cutter packages",
      "Water features, fire pits & outdoor kitchens",
      "Full irrigation, lighting & planting design",
      "Serving Broken Top, Awbrey Butte, NW Crossing & more",
    ],
    cta: { label: "View Residential Services", href: "/services" },
    cta2: { label: "Get a Free Estimate", href: "/contact" },
    photo: `${CDN}/GLLPatio1_90e2e0c4.jpg`,
    photoAlt: "Luxury outdoor patio and landscaping by Newport Avenue Landscaping — Bend, Oregon",
    accent: "oklch(0.50 0.18 25)",
    accentBg: "oklch(0.97 0.012 25)",
    stats: null,
  },
  {
    id: "commercial",
    tab: "Commercial",
    label: "COMMERCIAL PROPERTIES",
    headline: "Scale Without Compromise.",
    body: "Central Oregon's leading commercial landscape contractor. We manage retail centers, office parks, mixed-use developments, and government facilities — with dedicated account teams and full in-house crews.",
    bullets: [
      "Dedicated commercial account managers",
      "Full in-house crews — no subcontracting",
      "Government, retail & mixed-use experience",
      "Respond within one business day, guaranteed",
    ],
    cta: { label: "Request a Commercial Bid", href: "/commercial" },
    cta2: { label: "(541) 617-8873", href: "tel:5416178873" },
    photo: `${CDN}/DiscoveryWestPlazaHiResPhotos55_79ba9dd5.jpg`,
    photoAlt: "Discovery West Plaza commercial landscape installation by Newport Avenue Landscaping",
    accent: "oklch(0.42 0.14 240)",
    accentBg: "oklch(0.97 0.008 240)",
    stats: [
      { value: "50+", label: "Commercial Clients" },
      { value: "21 Yrs", label: "In Business" },
      { value: "LCB #9153", label: "Licensed & Bonded" },
    ],
  },
  {
    id: "hoa",
    tab: "HOA Communities",
    label: "HOA & COMMUNITY MANAGEMENT",
    headline: "Community Pride, Year-Round.",
    body: "Newport Avenue manages more HOA landscape maintenance contracts in Central Oregon than any other firm. Reliable, consistent, and always on schedule — so your community always looks its best, every season.",
    bullets: [
      "More HOA contracts than any firm in Central Oregon",
      "Year-round maintenance — including snow removal",
      "Irrigation management & seasonal color programs",
      "Transparent reporting for board meetings",
    ],
    cta: { label: "HOA Landscape Management", href: "/commercial#hoa" },
    cta2: { label: "Get a Free Quote", href: "/contact" },
    photo: "https://d2xsxph8kpxj0f.cloudfront.net/310519663503028182/g3pw3MRUapabcDUbhBEFxx/hoa-central-oregon-aerial-FqxDA5HTtAdmvC4C8zTkoF.webp",
    photoAlt: "Aerial drone view of a Central Oregon HOA neighborhood with ponderosa pines and Cascade Mountains — managed by Newport Avenue Landscaping",
    accent: "oklch(0.42 0.14 145)",
    accentBg: "oklch(0.97 0.010 145)",
    stats: [
      { value: "200+", label: "HOA Communities" },
      { value: "4 Seasons", label: "Year-Round Service" },
    ],
  },
];

export default function WhoWeServe() {
  const [active, setActive] = useState(0);
  const [, navigate] = useLocation();
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.05 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const seg = segments[active];

  return (
    <section
      ref={sectionRef}
      style={{
        backgroundColor: "oklch(1 0 0)",
        position: "relative",
        zIndex: 20,
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(32px)",
        transition: "opacity 0.8s ease, transform 0.8s ease",
      }}
    >
      {/* Top red accent line */}
      <div style={{ height: "3px", backgroundColor: "oklch(0.50 0.18 25)" }} />

      <div className="container py-16 lg:py-20">

        {/* ── Section header ── */}
        <div className="mb-10">
          <div
            className="font-label mb-3 flex items-center gap-3"
            style={{ color: "oklch(0.50 0.18 25)", fontSize: "0.65rem", letterSpacing: "0.18em" }}
          >
            <span className="inline-block w-8 h-px" style={{ backgroundColor: "oklch(0.50 0.18 25)" }} />
            WHO WE SERVE
          </div>
          <h2
            className="font-display font-light"
            style={{
              fontSize: "clamp(2rem, 4.5vw, 3.2rem)",
              color: "oklch(0.12 0.005 0)",
              lineHeight: 1.1,
            }}
          >
            One Firm.{" "}
            <em style={{ color: "oklch(0.50 0.18 25)", fontStyle: "italic" }}>
              Every Client Type.
            </em>
          </h2>
        </div>

        {/* ── Pill tabs ── */}
        <div className="flex flex-wrap gap-2 mb-10">
          {segments.map((s, i) => (
            <button
              key={s.id}
              onClick={() => setActive(i)}
              style={{
                padding: "0.55rem 1.4rem",
                borderRadius: "999px",
                fontSize: "0.78rem",
                fontWeight: 600,
                letterSpacing: "0.04em",
                fontFamily: "var(--font-label, sans-serif)",
                border: active === i ? "2px solid oklch(0.50 0.18 25)" : "2px solid oklch(0.88 0.005 0)",
                backgroundColor: active === i ? "oklch(0.50 0.18 25)" : "oklch(1 0 0)",
                color: active === i ? "oklch(1 0 0)" : "oklch(0.35 0.005 0)",
                cursor: "pointer",
                transition: "all 0.2s ease",
              }}
            >
              {s.tab}
            </button>
          ))}
        </div>

        {/* ── Content card ── */}
        <div
          key={seg.id}
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "0",
            borderRadius: "1rem",
            overflow: "hidden",
            boxShadow: "0 4px 40px oklch(0 0 0 / 0.08)",
            border: "1px solid oklch(0.92 0.005 0)",
            animation: "fadeSlideIn 0.35s ease",
          }}
          className="flex flex-col lg:grid"
        >
          {/* Photo side */}
          <div
            style={{
              position: "relative",
              minHeight: "360px",
              overflow: "hidden",
            }}
          >
            <img
              src={seg.photo}
              alt={seg.photoAlt}
              loading="lazy"
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "center 35%",
              }}
            />
            {/* Subtle bottom gradient for label */}
            <div
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                height: "80px",
                background: "linear-gradient(to top, oklch(0 0 0 / 0.45), transparent)",
              }}
            />
          </div>

          {/* Text side */}
          <div
            style={{
              backgroundColor: "oklch(0.99 0.003 75)",
              padding: "clamp(2rem, 4vw, 3rem)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            {/* Label */}
            <div
              className="font-label mb-3"
              style={{ color: seg.accent, fontSize: "0.62rem", letterSpacing: "0.18em" }}
            >
              {seg.label}
            </div>

            {/* Headline */}
            <h3
              className="font-display font-light mb-4"
              style={{
                fontSize: "clamp(1.6rem, 3vw, 2.4rem)",
                color: "oklch(0.12 0.005 0)",
                lineHeight: 1.1,
              }}
            >
              {seg.headline}
            </h3>

            {/* Accent rule */}
            <div
              style={{
                width: "3rem",
                height: "2px",
                backgroundColor: seg.accent,
                marginBottom: "1.25rem",
              }}
            />

            {/* Body */}
            <p
              className="font-body mb-5"
              style={{ color: "oklch(0.38 0.005 0)", lineHeight: 1.75, fontSize: "0.95rem" }}
            >
              {seg.body}
            </p>

            {/* Bullets */}
            <ul className="mb-6 space-y-2">
              {seg.bullets.map((b) => (
                <li
                  key={b}
                  className="flex items-start gap-2 font-body"
                  style={{ color: "oklch(0.30 0.005 0)", fontSize: "0.88rem", lineHeight: 1.5 }}
                >
                  <span
                    style={{
                      display: "inline-block",
                      width: "6px",
                      height: "6px",
                      borderRadius: "50%",
                      backgroundColor: seg.accent,
                      marginTop: "0.45rem",
                      flexShrink: 0,
                    }}
                  />
                  {b}
                </li>
              ))}
            </ul>

            {/* Stats row */}
            {seg.stats && (
              <div className="flex flex-wrap gap-6 mb-6 pt-4" style={{ borderTop: "1px solid oklch(0.92 0.005 0)" }}>
                {seg.stats.map((st) => (
                  <div key={st.label}>
                    <div
                      className="font-display"
                      style={{ fontSize: "1.4rem", color: seg.accent, fontWeight: 700, lineHeight: 1 }}
                    >
                      {st.value}
                    </div>
                    <div
                      className="font-label"
                      style={{ fontSize: "0.58rem", letterSpacing: "0.14em", color: "oklch(0.55 0.005 0)", marginTop: "0.2rem" }}
                    >
                      {st.label.toUpperCase()}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* CTAs */}
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => navigate(seg.cta.href)}
                style={{
                  padding: "0.7rem 1.6rem",
                  backgroundColor: seg.accent,
                  color: "oklch(1 0 0)",
                  fontSize: "0.72rem",
                  fontWeight: 700,
                  letterSpacing: "0.08em",
                  fontFamily: "var(--font-label, sans-serif)",
                  border: "none",
                  borderRadius: "0.25rem",
                  cursor: "pointer",
                  transition: "opacity 0.2s",
                }}
                onMouseEnter={e => (e.currentTarget.style.opacity = "0.85")}
                onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
              >
                {seg.cta.label.toUpperCase()}
              </button>
              <button
                onClick={() => {
                  if (seg.cta2.href.startsWith("tel:")) {
                    window.location.href = seg.cta2.href;
                  } else {
                    navigate(seg.cta2.href);
                  }
                }}
                style={{
                  padding: "0.7rem 1.6rem",
                  backgroundColor: "transparent",
                  color: "oklch(0.25 0.005 0)",
                  fontSize: "0.72rem",
                  fontWeight: 700,
                  letterSpacing: "0.08em",
                  fontFamily: "var(--font-label, sans-serif)",
                  border: "2px solid oklch(0.82 0.005 0)",
                  borderRadius: "0.25rem",
                  cursor: "pointer",
                  transition: "border-color 0.2s",
                }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = seg.accent)}
                onMouseLeave={e => (e.currentTarget.style.borderColor = "oklch(0.82 0.005 0)")}
              >
                {seg.cta2.label.toUpperCase()}
              </button>
            </div>
          </div>
        </div>

      </div>

      <style>{`
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}
