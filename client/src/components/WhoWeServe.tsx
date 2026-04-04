/* ============================================================
   WHO WE SERVE — Editorial Split-Panel Layout
   "One Firm. Every Client Type."
   Dark numbered cards with right-side project photo accent
   ============================================================ */
import { useEffect, useRef, useState } from "react";

const CDN = "https://d2xsxph8kpxj0f.cloudfront.net/310519663503028182/g3pw3MRUapabcDUbhBEFxx";

const segments = [
  {
    number: "01",
    label: "High-End Residential",
    headline: "Your Home, Elevated.",
    body: "From luxury outdoor living rooms and custom water features to full estate landscaping — we design and build spaces that reflect your lifestyle and increase your property's value.",
    proof: "Broken Top · Awbrey Butte · NW Crossing",
    accent: "oklch(0.56 0.18 25)",
    tag: "Homeowners",
    photo: `${CDN}/GLLPatio1_90e2e0c4.jpg`,
    photoAlt: "Luxury outdoor patio and landscaping by Newport Avenue Landscaping — Bend, Oregon",
  },
  {
    number: "02",
    label: "Commercial Properties",
    headline: "Scale Without Compromise.",
    body: "We are Central Oregon's leading commercial landscape contractor. Retail centers, office parks, mixed-use developments, and government facilities — managed by dedicated account teams with full in-house crews.",
    proof: "Government Contracts · Retail Centers · Office Parks",
    accent: "oklch(0.68 0.14 28)",
    tag: "Property Managers",
    photo: `${CDN}/DiscoveryWestPlazaHiResPhotos55_79ba9dd5.jpg`,
    photoAlt: "Discovery West Plaza commercial landscape installation by Newport Avenue Landscaping",
    photoLabel: "Discovery West Plaza",
    stats: [
      { value: "50+", label: "Commercial Clients" },
      { value: "21", label: "Years in Business" },
      { value: "LCB #9153", label: "Licensed & Bonded" },
    ],
  },
  {
    number: "03",
    label: "HOA Communities",
    headline: "Community Pride, Year-Round.",
    body: "Newport Avenue manages more HOA landscape maintenance contracts in Central Oregon than any other firm. Reliable, consistent, and always on schedule — so your community always looks its best.",
    proof: "200+ HOA Communities Served · Irrigation · Snow",
    accent: "oklch(0.72 0.10 60)",
    tag: "HOA Boards",
    photo: `${CDN}/powell-butte-1_21624e54.webp`,
    photoAlt: "Manicured HOA community landscape in Bend, Oregon by Newport Avenue Landscaping",
  },
];

export default function WhoWeServe() {
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
    <section
      className="py-24"
      style={{ backgroundColor: "oklch(0.11 0.008 0)" }}
    >
      <div className="container" ref={ref}>

        {/* ── Header ──────────────────────────────────────── */}
        <div
          className="mb-16"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(24px)",
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

        {/* ── Cards ───────────────────────────────────────── */}
        <div className="flex flex-col gap-px" style={{ backgroundColor: "oklch(0.22 0.005 0)" }}>
          {segments.map((seg, i) => (
            <div
              key={seg.label}
              className="grid grid-cols-1 lg:grid-cols-5"
              style={{
                backgroundColor: "oklch(0.14 0.006 0)",
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(36px)",
                transition: `opacity 0.7s ease ${i * 0.15}s, transform 0.7s ease ${i * 0.15}s`,
              }}
            >
              {/* ── Text panel (3 cols) ── */}
              <div
                className="lg:col-span-3 flex flex-col"
                style={{ padding: "clamp(2rem, 3.5vw, 3.2rem)" }}
              >
                {/* Number + tag row */}
                <div className="flex items-start justify-between mb-8">
                  <span
                    className="font-display"
                    style={{
                      fontSize: "clamp(3.5rem, 6vw, 5.5rem)",
                      color: "oklch(0.20 0.005 0)",
                      lineHeight: 1,
                      fontWeight: 300,
                      userSelect: "none",
                      letterSpacing: "-0.02em",
                    }}
                  >
                    {seg.number}
                  </span>
                  <span
                    className="font-label px-3 py-1 rounded-full mt-2"
                    style={{
                      backgroundColor: `${seg.accent}22`,
                      color: seg.accent,
                      border: `1px solid ${seg.accent}55`,
                      letterSpacing: "0.1em",
                      fontSize: "0.58rem",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {seg.tag}
                  </span>
                </div>

                {/* Label */}
                <p
                  className="font-label mb-3"
                  style={{ color: "oklch(0.50 0.005 0)", fontSize: "0.62rem", letterSpacing: "0.14em" }}
                >
                  {seg.label.toUpperCase()}
                </p>

                {/* Headline */}
                <h3
                  className="font-display font-light mb-5"
                  style={{
                    fontSize: "clamp(1.6rem, 2.8vw, 2.2rem)",
                    color: "oklch(0.97 0 0)",
                    lineHeight: 1.1,
                  }}
                >
                  {seg.headline}
                </h3>

                {/* Accent divider */}
                <div
                  className="mb-6"
                  style={{ width: "2.5rem", height: "2px", backgroundColor: seg.accent }}
                />

                {/* Body */}
                <p
                  className="font-body flex-1"
                  style={{ color: "oklch(0.65 0.005 0)", lineHeight: 1.78, fontSize: "0.9rem" }}
                >
                  {seg.body}
                </p>

                {/* Proof line */}
                <div
                  className="font-label mt-8 pt-5"
                  style={{
                    color: "oklch(0.40 0.005 0)",
                    fontSize: "0.58rem",
                    letterSpacing: "0.1em",
                    borderTop: "1px solid oklch(0.22 0.005 0)",
                  }}
                >
                  {seg.proof}
                </div>
              </div>

              {/* ── Photo panel (2 cols) ── */}
              <div
                className="lg:col-span-2 relative overflow-hidden"
                style={{ minHeight: "clamp(260px, 32vw, 480px)" }}
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
                    objectPosition: "center 40%",
                    filter: "brightness(0.88) saturate(1.08)",
                  }}
                />
                {/* Subtle left-edge gradient to blend into text panel */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: "linear-gradient(to right, oklch(0.14 0.006 0) 0%, transparent 30%)",
                    pointerEvents: "none",
                  }}
                />
                {/* Project name badge — shown only when photoLabel exists */}
                {(seg as any).photoLabel && (
                  <div
                    style={{
                      position: "absolute",
                      bottom: "1rem",
                      right: "1rem",
                      backgroundColor: "oklch(0.10 0.005 0 / 0.82)",
                      backdropFilter: "blur(6px)",
                      border: "1px solid oklch(0.30 0.005 0)",
                      padding: "0.35rem 0.75rem",
                      display: "flex",
                      alignItems: "center",
                      gap: "0.4rem",
                    }}
                  >
                    <span
                      style={{
                        width: "5px",
                        height: "5px",
                        borderRadius: "50%",
                        backgroundColor: seg.accent,
                        flexShrink: 0,
                      }}
                    />
                    <span
                      className="font-label"
                      style={{
                        color: "oklch(0.80 0.005 0)",
                        fontSize: "0.56rem",
                        letterSpacing: "0.12em",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {(seg as any).photoLabel.toUpperCase()}
                    </span>
                  </div>
                )}
                {/* Stats overlay — shown only when stats exist */}
                {(seg as any).stats && (
                  <div
                    style={{
                      position: "absolute",
                      top: "1rem",
                      right: "1rem",
                      display: "flex",
                      flexDirection: "column",
                      gap: "0.5rem",
                    }}
                  >
                    {(seg as any).stats.map((s: any) => (
                      <div
                        key={s.label}
                        style={{
                          backgroundColor: "oklch(0.10 0.005 0 / 0.82)",
                          backdropFilter: "blur(6px)",
                          border: `1px solid ${seg.accent}44`,
                          padding: "0.4rem 0.7rem",
                          textAlign: "right",
                        }}
                      >
                        <div
                          className="font-display"
                          style={{ color: seg.accent, fontSize: "1rem", fontWeight: 600, lineHeight: 1.1 }}
                        >
                          {s.value}
                        </div>
                        <div
                          className="font-label"
                          style={{ color: "oklch(0.55 0.005 0)", fontSize: "0.5rem", letterSpacing: "0.1em" }}
                        >
                          {s.label.toUpperCase()}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                {/* Accent color bottom strip */}
                <div
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: "3px",
                    backgroundColor: seg.accent,
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* ── Bottom CTA strip ────────────────────────────── */}
        <div
          className="mt-px p-8 flex flex-col sm:flex-row items-center justify-between gap-6"
          style={{
            backgroundColor: "oklch(0.56 0.18 25)",
            opacity: visible ? 1 : 0,
            transition: "opacity 0.7s ease 0.6s",
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
                padding: "0.6rem 1.4rem",
                backgroundColor: "oklch(0.14 0.005 0)",
                color: "white",
                fontSize: "0.75rem",
                letterSpacing: "0.1em",
                fontWeight: 600,
                textDecoration: "none",
              }}
            >
              COMMERCIAL SERVICES
            </a>
            <a
              href="/contact"
              style={{
                whiteSpace: "nowrap",
                padding: "0.6rem 1.4rem",
                border: "1px solid white",
                color: "white",
                fontSize: "0.75rem",
                letterSpacing: "0.1em",
                fontWeight: 600,
                textDecoration: "none",
              }}
            >
              GET A FREE QUOTE
            </a>
            <a
              href="tel:5416178873"
              style={{
                whiteSpace: "nowrap",
                padding: "0.6rem 1.4rem",
                backgroundColor: "oklch(0.14 0.005 0)",
                color: "white",
                fontSize: "0.75rem",
                letterSpacing: "0.1em",
                fontWeight: 600,
                textDecoration: "none",
              }}
            >
              (541) 617-8873
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
