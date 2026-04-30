/* ============================================================
   SERVICES SECTION — Wild Editorial Strips
   - Each service = full-height horizontal strip
   - Photo fills the strip, massive ALL CAPS service name overlaid
   - On hover: photo brightens, description slides in from right
   - Red underline appears on hover
   - Section label: 02 / WHAT WE DO
   ============================================================ */
import { useState } from "react";
import { useLocation } from "wouter";

const SERVICES = [
  {
    name: "LANDSCAPE DESIGN",
    sub: "& INSTALLATION",
    desc: "From concept to completion — patios, plantings, water features, and everything in between.",
    img: "https://d2xsxph8kpxj0f.cloudfront.net/310519663503028182/g3pw3MRUapabcDUbhBEFxx/facility-showroom_fd5f40e4.webp",
    href: "/services",
    position: "center 40%",
  },
  {
    name: "OUTDOOR LIVING",
    sub: "FIRE & WATER FEATURES",
    desc: "Fire pits, fireplaces, outdoor kitchens, and water features that transform your backyard.",
    img: "/manus-storage/compressed_fire7_f0b582ff_56d05738_050989df.webp",
    href: "/services/fire-water",
    position: "center 50%",
  },
  {
    name: "MAINTENANCE",
    sub: "YEAR-ROUND CARE",
    desc: "Weekly lawn care, seasonal cleanups, irrigation, and everything your property needs.",
    img: "/manus-storage/compressed_NewportAveLandcaping-9_97b731b0_1204d3ca_c439672c.webp",
    href: "/maintenance",
    position: "center 55%",
  },
  {
    name: "COMMERCIAL",
    sub: "& HOA SERVICES",
    desc: "Large-scale property management for HOAs, commercial properties, and government contracts.",
    img: "/manus-storage/compressed_NewportLandscapingRVParkDay2Photos2_8e8d0bb1_cd405dc0_35d8eb74.webp",
    href: "/commercial",
    position: "center 40%",
  },
];

export default function ServicesSection() {
  const [hovered, setHovered] = useState<number | null>(null);
  const [, navigate] = useLocation();

  return (
    <section
      id="services"
      style={{
        backgroundColor: "oklch(0.08 0.008 30)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* ── Section label ── */}
      <div
        style={{
          padding: "3rem clamp(1.5rem, 5vw, 5rem) 0",
          display: "flex",
          alignItems: "center",
          gap: "0.75rem",
        }}
      >
        <span style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "0.5rem", fontWeight: 700, letterSpacing: "0.3em", color: "oklch(0.70 0.18 25)" }}>
          02
        </span>
        <span style={{ width: "2rem", height: "1px", backgroundColor: "oklch(0.22 0.008 30)", display: "block" }} />
        <span style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "0.5rem", fontWeight: 600, letterSpacing: "0.25em", color: "oklch(0.65 0.008 30)" }}>
          WHAT WE DO
        </span>
        <span style={{ flex: 1, height: "1px", backgroundColor: "oklch(0.16 0.008 30)", display: "block" }} />
      </div>

      {/* ── Massive section headline ── */}
      <div style={{ padding: "2rem clamp(1.5rem, 5vw, 5rem) 3rem", overflow: "hidden" }}>
        <h2
          style={{
            fontFamily: "'Cormorant Garamond', 'Playfair Display', Georgia, serif",
            fontSize: "clamp(3.5rem, 9vw, 9.5rem)",
            fontWeight: 700,
            lineHeight: 0.88,
            letterSpacing: "-0.04em",
            color: "oklch(0.95 0.012 75)",
            whiteSpace: "nowrap",
          }}
        >
          Craft. Care.{" "}
          <em style={{ fontStyle: "italic", fontWeight: 300, color: "oklch(0.65 0.012 75)" }}>
            Results.
          </em>
        </h2>
      </div>

      {/* ── Service strips ── */}
      {SERVICES.map((svc, i) => (
        <div
          key={i}
          onMouseEnter={() => setHovered(i)}
          onMouseLeave={() => setHovered(null)}
          onClick={() => { navigate(svc.href); window.scrollTo({ top: 0, behavior: "smooth" }); }}
          style={{
            display: "block",
            position: "relative",
            height: "clamp(180px, 38vh, 340px)",
            overflow: "hidden",
            borderTop: "1px solid oklch(0.16 0.008 30)",
            cursor: "pointer",
          }}
        >
          {/* Photo */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage: `url(${svc.img})`,
              backgroundSize: "cover",
              backgroundPosition: svc.position,
              filter: hovered === i ? "brightness(0.45)" : "brightness(0.20)",
              transform: hovered === i ? "scale(1.04)" : "scale(1.0)",
              transition: "filter 0.6s ease, transform 0.9s ease",
            }}
          />

          {/* Content */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              padding: "0 clamp(1.5rem, 5vw, 5rem)",
              justifyContent: "space-between",
            }}
          >
            {/* Service name */}
            <div>
              <div
                style={{
                  fontFamily: "'Montserrat', sans-serif",
                  fontSize: "clamp(1.8rem, 5vw, 5rem)",
                  fontWeight: 900,
                  letterSpacing: "-0.03em",
                  color: "oklch(0.97 0.012 75)",
                  lineHeight: 0.9,
                  transform: hovered === i ? "translateX(0.75rem)" : "translateX(0)",
                  transition: "transform 0.5s ease",
                }}
              >
                {svc.name}
              </div>
              <div
                style={{
                  fontFamily: "'Montserrat', sans-serif",
                  fontSize: "clamp(0.75rem, 1.5vw, 1.2rem)",
                  fontWeight: 400,
                  letterSpacing: "0.1em",
                  color: "oklch(0.50 0.008 30)",
                  marginTop: "0.25rem",
                  transform: hovered === i ? "translateX(0.75rem)" : "translateX(0)",
                  transition: "transform 0.5s ease 0.05s",
                }}
              >
                {svc.sub}
              </div>
              {/* Red underline on hover */}
              <div
                style={{
                  height: "2px",
                  backgroundColor: "oklch(0.46 0.20 25)",
                  marginTop: "0.75rem",
                  width: hovered === i ? "100%" : "0%",
                  transition: "width 0.5s ease",
                  boxShadow: hovered === i ? "0 0 12px oklch(0.46 0.20 25 / 0.5)" : "none",
                }}
              />
            </div>

            {/* Description + arrow — visible on hover */}
            <div
              style={{
                maxWidth: "300px",
                opacity: hovered === i ? 1 : 0,
                transform: hovered === i ? "translateX(0)" : "translateX(2rem)",
                transition: "opacity 0.4s ease 0.1s, transform 0.4s ease 0.1s",
                textAlign: "right",
              }}
            >
              <p
                style={{
                  fontFamily: "'Montserrat', sans-serif",
                  fontSize: "0.65rem",
                  fontWeight: 400,
                  lineHeight: 1.8,
                  color: "oklch(0.62 0.008 30)",
                  marginBottom: "1rem",
                }}
              >
                {svc.desc}
              </p>
              <span
                style={{
                  fontFamily: "'Montserrat', sans-serif",
                  fontSize: "0.55rem",
                  fontWeight: 700,
                  letterSpacing: "0.18em",
                  color: "oklch(0.97 0.012 75)",
                }}
              >
                EXPLORE →
              </span>
            </div>
          </div>

          {/* Strip number */}
          <div
            style={{
              position: "absolute",
              top: "1.5rem",
              right: "clamp(1.5rem, 5vw, 5rem)",
              fontFamily: "'Montserrat', sans-serif",
              fontSize: "0.5rem",
              fontWeight: 700,
              letterSpacing: "0.2em",
              color: "oklch(0.65 0.008 30)",
            }}
          >
            {String(i + 1).padStart(2, "0")}
          </div>
        </div>
      ))}

      {/* ── Bottom CTA strip ── */}
      <div
        style={{
          padding: "2.5rem clamp(1.5rem, 5vw, 5rem)",
          borderTop: "1px solid oklch(0.16 0.008 30)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "1rem",
        }}
      >
        <span style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "0.55rem", fontWeight: 600, letterSpacing: "0.18em", color: "oklch(0.65 0.008 30)" }}>
          EVERY PROJECT. EVERY DETAIL. EVERY TIME.
        </span>
        <a
          href="/services"
          onClick={(e) => { e.preventDefault(); navigate("/services"); window.scrollTo({ top: 0, behavior: "smooth" }); }}
          style={{
            fontFamily: "'Montserrat', sans-serif",
            fontSize: "0.55rem",
            fontWeight: 700,
            letterSpacing: "0.18em",
            color: "oklch(0.97 0.012 75)",
            textDecoration: "none",
            display: "inline-flex",
            alignItems: "center",
            gap: "0.75rem",
          }}
        >
          ALL SERVICES
          <span style={{ display: "inline-block", width: "2.5rem", height: "1px", backgroundColor: "oklch(0.46 0.20 25)" }} />
        </a>
      </div>
    </section>
  );
}
