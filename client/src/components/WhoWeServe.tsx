/* ============================================================
   WHO WE SERVE — Full-Bleed Image Panels
   "One Firm. Every Client Type."
   Each segment is a full-bleed hero panel with overlaid copy,
   bold stats, and a direct CTA — built to convert at a glance.
   ============================================================ */
import { useEffect, useRef, useState } from "react";

const CDN = "https://d2xsxph8kpxj0f.cloudfront.net/310519663503028182/g3pw3MRUapabcDUbhBEFxx";

const segments = [
  {
    id: "residential",
    tag: "Homeowners",
    label: "High-End Residential",
    headline: "Your Home,\nElevated.",
    body: "From luxury outdoor living rooms and custom water features to full estate landscaping — we design and build spaces that reflect your lifestyle and dramatically increase your property's value.",
    bullets: [
      "Custom design & build — no cookie-cutter packages",
      "Water features, fire pits & outdoor kitchens",
      "Full irrigation, lighting & planting design",
      "Serving Broken Top, Awbrey Butte, NW Crossing & more",
    ],
    cta: { label: "VIEW RESIDENTIAL SERVICES", href: "/services" },
    cta2: { label: "GET A FREE ESTIMATE", href: "/contact" },
    photo: `${CDN}/GLLPatio1_90e2e0c4.jpg`,
    photoAlt: "Luxury outdoor patio and landscaping by Newport Avenue Landscaping — Bend, Oregon",
    accentColor: "oklch(0.56 0.18 25)",
    gradientFrom: "oklch(0.08 0.008 25)",
    stats: null,
    photoLabel: "Broken Top Residence",
  },
  {
    id: "commercial",
    tag: "Property Managers",
    label: "Commercial Properties",
    headline: "Scale Without\nCompromise.",
    body: "Central Oregon's leading commercial landscape contractor. We manage retail centers, office parks, mixed-use developments, and government facilities — with dedicated account teams and full in-house crews.",
    bullets: [
      "Dedicated commercial account managers",
      "Full in-house crews — no subcontracting",
      "Government, retail & mixed-use experience",
      "Respond within one business day, guaranteed",
    ],
    cta: { label: "REQUEST A COMMERCIAL BID", href: "/commercial" },
    cta2: { label: "(541) 617-8873", href: "tel:5416178873" },
    photo: `${CDN}/DiscoveryWestPlazaHiResPhotos55_79ba9dd5.jpg`,
    photoAlt: "Discovery West Plaza commercial landscape installation by Newport Avenue Landscaping",
    accentColor: "oklch(0.42 0.14 240)",
    gradientFrom: "oklch(0.08 0.012 240)",
    stats: [
      { value: "50+", label: "Commercial Clients" },
      { value: "21", label: "Years in Business" },
      { value: "LCB #9153", label: "Licensed & Bonded" },
    ],
    photoLabel: "Discovery West Plaza",
  },
  {
    id: "hoa",
    tag: "HOA Boards",
    label: "HOA Communities",
    headline: "Community Pride,\nYear-Round.",
    body: "Newport Avenue manages more HOA landscape maintenance contracts in Central Oregon than any other firm. Reliable, consistent, and always on schedule — so your community always looks its best, every season.",
    bullets: [
      "More HOA contracts than any firm in Central Oregon",
      "Year-round maintenance — including snow removal",
      "Irrigation management & seasonal color programs",
      "Transparent reporting for board meetings",
    ],
    cta: { label: "HOA LANDSCAPE MANAGEMENT", href: "/commercial#hoa" },
    cta2: { label: "GET A FREE QUOTE", href: "/contact" },
    photo: `${CDN}/powell-butte-33_75351121.webp`,
    photoAlt: "Manicured HOA community landscape in Bend, Oregon by Newport Avenue Landscaping",
    accentColor: "oklch(0.55 0.12 145)",
    gradientFrom: "oklch(0.08 0.012 145)",
    stats: [
      { value: "200+", label: "HOA Communities Served" },
      { value: "4 Seasons", label: "Year-Round Service" },
    ],
    photoLabel: "Powell Butte Community",
  },
];

function FadeIn({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.06 }
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
        transition: `opacity 0.75s ease ${delay}s, transform 0.75s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

export default function WhoWeServe() {
  const headerRef = useRef<HTMLDivElement>(null);
  const [headerVisible, setHeaderVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setHeaderVisible(true); },
      { threshold: 0.06 }
    );
    if (headerRef.current) observer.observe(headerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      style={{ backgroundColor: "oklch(0.10 0.008 0)", position: "relative", zIndex: 20 }}
    >
      {/* ── Section Header ───────────────────────────────────── */}
      <div
        className="container py-16"
        ref={headerRef}
        style={{
          opacity: headerVisible ? 1 : 0,
          transform: headerVisible ? "translateY(0)" : "translateY(24px)",
          transition: "opacity 0.7s ease, transform 0.7s ease",
        }}
      >
        <div
          className="font-label mb-5 flex items-center gap-3"
          style={{ color: "oklch(0.56 0.18 25)", fontSize: "0.65rem", letterSpacing: "0.18em" }}
        >
          <span className="inline-block w-8 h-px" style={{ backgroundColor: "oklch(0.56 0.18 25)" }} />
          WHO WE SERVE
        </div>
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
          <h2
            className="font-display font-light"
            style={{
              fontSize: "clamp(2.2rem, 5vw, 3.8rem)",
              color: "oklch(0.97 0 0)",
              lineHeight: 1.05,
              maxWidth: "600px",
            }}
          >
            One Firm.{" "}
            <em style={{ color: "oklch(0.72 0.16 28)", fontStyle: "italic" }}>
              Every Client Type.
            </em>
          </h2>
          <p
            className="font-body lg:max-w-xs"
            style={{ color: "oklch(0.62 0.005 0)", lineHeight: 1.7, fontSize: "0.92rem" }}
          >
            Whether you are a homeowner, a property manager, or an HOA board
            member — Newport Avenue has the team, the equipment, and the
            experience to handle your project at any scale.
          </p>
        </div>
      </div>

      {/* ── Full-Bleed Panels ─────────────────────────────────── */}
      {segments.map((seg, i) => (
        <FadeIn key={seg.id} delay={i * 0.1}>
          <div
            className="relative overflow-hidden"
            style={{ minHeight: "clamp(520px, 60vw, 720px)" }}
          >
            {/* Background photo */}
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
                filter: "brightness(0.55) saturate(1.1)",
              }}
            />

            {/* Dark gradient overlay — stronger on left for text readability */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: i % 2 === 0
                  ? `linear-gradient(to right, ${seg.gradientFrom} 0%, ${seg.gradientFrom} 40%, oklch(0.10 0.005 0 / 0.65) 70%, transparent 100%)`
                  : `linear-gradient(to left, ${seg.gradientFrom} 0%, ${seg.gradientFrom} 40%, oklch(0.10 0.005 0 / 0.65) 70%, transparent 100%)`,
                pointerEvents: "none",
              }}
            />
            {/* Bottom gradient for text safety */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "linear-gradient(to top, oklch(0.08 0.005 0 / 0.80) 0%, transparent 50%)",
                pointerEvents: "none",
              }}
            />

            {/* Accent color top strip */}
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "3px", backgroundColor: seg.accentColor }} />

            {/* Content */}
            <div
              className="container relative h-full flex items-center"
              style={{ paddingTop: "4rem", paddingBottom: "4rem" }}
            >
              <div
                className="flex flex-col"
                style={{
                  maxWidth: "600px",
                  marginLeft: i % 2 === 0 ? "0" : "auto",
                  marginRight: i % 2 === 0 ? "auto" : "0",
                }}
              >
                {/* Large dominant segment label */}
                <div className="mb-5">
                  <div
                    className="font-display font-light"
                    style={{
                      fontSize: "clamp(3rem, 7vw, 6rem)",
                      color: seg.accentColor,
                      lineHeight: 0.9,
                      letterSpacing: "-0.02em",
                      textTransform: "uppercase",
                    }}
                  >
                    {seg.tag}
                  </div>
                  <div
                    className="font-label mt-2"
                    style={{ color: "oklch(0.60 0.005 0)", fontSize: "0.62rem", letterSpacing: "0.18em" }}
                  >
                    {seg.label.toUpperCase()}
                  </div>
                </div>

                {/* Headline */}
                <h3
                  className="font-display font-light mb-4"
                  style={{
                    fontSize: "clamp(2.2rem, 4.5vw, 3.6rem)",
                    color: "oklch(1 0 0)",
                    lineHeight: 1.05,
                    whiteSpace: "pre-line",
                  }}
                >
                  {seg.headline}
                </h3>

                {/* Accent divider */}
                <div className="mb-5" style={{ width: "3rem", height: "2px", backgroundColor: seg.accentColor }} />

                {/* Body */}
                <p
                  className="font-body mb-6"
                  style={{ color: "oklch(0.82 0.005 0)", lineHeight: 1.75, fontSize: "0.95rem" }}
                >
                  {seg.body}
                </p>

                {/* Bullet points */}
                <ul className="mb-8 flex flex-col gap-2">
                  {seg.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-2.5">
                      <span
                        style={{
                          width: "5px",
                          height: "5px",
                          borderRadius: "50%",
                          backgroundColor: seg.accentColor,
                          flexShrink: 0,
                          marginTop: "0.45rem",
                        }}
                      />
                      <span
                        className="font-body"
                        style={{ color: "oklch(0.78 0.005 0)", fontSize: "0.88rem", lineHeight: 1.5 }}
                      >
                        {b}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* Stats row (if present) */}
                {seg.stats && (
                  <div className="flex flex-wrap gap-4 mb-8">
                    {seg.stats.map((s) => (
                      <div
                        key={s.label}
                        style={{
                          backgroundColor: "oklch(0.08 0.005 0 / 0.75)",
                          backdropFilter: "blur(8px)",
                          border: `1px solid ${seg.accentColor}44`,
                          padding: "0.6rem 1rem",
                          minWidth: "100px",
                        }}
                      >
                        <div
                          className="font-display"
                          style={{ color: seg.accentColor, fontSize: "1.4rem", fontWeight: 600, lineHeight: 1.1 }}
                        >
                          {s.value}
                        </div>
                        <div
                          className="font-label"
                          style={{ color: "oklch(0.60 0.005 0)", fontSize: "0.52rem", letterSpacing: "0.1em", marginTop: "2px" }}
                        >
                          {s.label.toUpperCase()}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* CTA buttons */}
                <div className="flex flex-wrap gap-3">
                  <a
                    href={seg.cta.href}
                    className="font-label transition-all duration-200"
                    style={{
                      padding: "0.75rem 1.6rem",
                      backgroundColor: seg.accentColor,
                      color: "oklch(1 0 0)",
                      fontSize: "0.62rem",
                      letterSpacing: "0.12em",
                      textDecoration: "none",
                      borderRadius: "12px 0 12px 0",
                      border: `1.5px solid ${seg.accentColor}`,
                      display: "inline-block",
                    }}
                  >
                    {seg.cta.label}
                  </a>
                  <a
                    href={seg.cta2.href}
                    className="font-label transition-all duration-200"
                    style={{
                      padding: "0.75rem 1.6rem",
                      backgroundColor: "oklch(1 0 0)",
                      color: "oklch(0.25 0.10 25)",
                      fontSize: "0.62rem",
                      letterSpacing: "0.12em",
                      textDecoration: "none",
                      borderRadius: "12px 0 12px 0",
                      border: "1.5px solid oklch(0.56 0.18 25)",
                      display: "inline-block",
                    }}
                  >
                    {seg.cta2.label}
                  </a>
                </div>
              </div>
            </div>

            {/* Photo label badge */}
            {seg.photoLabel && (
              <div
                style={{
                  position: "absolute",
                  bottom: "1.5rem",
                  right: "1.5rem",
                  backgroundColor: "oklch(0.08 0.005 0 / 0.82)",
                  backdropFilter: "blur(6px)",
                  border: `1px solid ${seg.accentColor}44`,
                  padding: "0.4rem 0.85rem",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.4rem",
                }}
              >
                <span style={{ width: "5px", height: "5px", borderRadius: "50%", backgroundColor: seg.accentColor, flexShrink: 0 }} />
                <span
                  className="font-label"
                  style={{ color: "oklch(0.75 0.005 0)", fontSize: "0.54rem", letterSpacing: "0.12em", whiteSpace: "nowrap" }}
                >
                  {seg.photoLabel.toUpperCase()}
                </span>
              </div>
            )}
          </div>
        </FadeIn>
      ))}

      {/* ── Bottom CTA strip ────────────────────────────────── */}
      <FadeIn delay={0.3}>
        <div
          className="flex flex-col sm:flex-row items-center justify-between gap-6"
          style={{
            backgroundColor: "oklch(0.56 0.18 25)",
            padding: "2rem clamp(1.5rem, 5vw, 4rem)",
          }}
        >
          <p
            className="font-body font-semibold text-white text-center sm:text-left"
            style={{ fontSize: "1.05rem" }}
          >
            Ready to work with Central Oregon's most qualified landscape firm?
          </p>
          <div className="flex gap-3 flex-shrink-0 flex-wrap justify-center">
            <a
              href="/commercial"
              style={{
                whiteSpace: "nowrap",
                padding: "0.65rem 1.5rem",
                backgroundColor: "oklch(0.14 0.005 0)",
                color: "white",
                fontSize: "0.68rem",
                letterSpacing: "0.1em",
                fontWeight: 600,
                textDecoration: "none",
                borderRadius: "12px 0 12px 0",
                border: "1.5px solid oklch(0.56 0.18 25 / 0.5)",
              }}
            >
              COMMERCIAL SERVICES
            </a>
            <a
              href="/contact"
              style={{
                whiteSpace: "nowrap",
                padding: "0.65rem 1.5rem",
                backgroundColor: "oklch(1 0 0)",
                color: "oklch(0.25 0.10 25)",
                fontSize: "0.68rem",
                letterSpacing: "0.1em",
                fontWeight: 600,
                textDecoration: "none",
                borderRadius: "12px 0 12px 0",
                border: "1.5px solid oklch(0.56 0.18 25)",
              }}
            >
              GET A FREE QUOTE
            </a>
            <a
              href="tel:5416178873"
              style={{
                whiteSpace: "nowrap",
                padding: "0.65rem 1.5rem",
                backgroundColor: "transparent",
                color: "white",
                fontSize: "0.68rem",
                letterSpacing: "0.1em",
                fontWeight: 600,
                textDecoration: "none",
                borderRadius: "12px 0 12px 0",
                border: "1.5px solid oklch(1 0 0 / 0.5)",
              }}
            >
              (541) 617-8873
            </a>
          </div>
        </div>
      </FadeIn>
    </section>
  );
}
