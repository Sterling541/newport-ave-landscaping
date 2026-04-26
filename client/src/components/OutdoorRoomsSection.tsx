/* ============================================================
   OUTDOOR ROOMS — Belgard-Inspired Interactive Section
   
   Hovering a room type on the left swaps the full-bleed
   cinematic photo on the right and updates the description.
   The active room is highlighted with a deep green bar.
   On mobile: stacked with tap-to-expand behavior.
   ============================================================ */
import { useState } from "react";

const CDN = "https://d2xsxph8kpxj0f.cloudfront.net/310519663503028182/g3pw3MRUapabcDUbhBEFxx";

const ROOMS = [
  {
    id: "water",
    label: "Water Features",
    number: "01",
    tagline: "The Sound of Serenity",
    description:
      "Custom ponds, pondless waterfalls, bubbling boulders, and stream beds that bring the sound and movement of water to your backyard. Designed for Central Oregon's climate.",
    img: "/manus-storage/NewportAveLandcaping-9_97b731b0_1204d3ca.webp",
    accent: "oklch(0.46 0.20 25)",
  },
  {
    id: "fire",
    label: "Fire Features",
    number: "02",
    tagline: "Gather Around Something Beautiful",
    description:
      "Gas fire pits, wood-burning fireplaces, and fire tables that extend your outdoor season well into Oregon's cool evenings. Custom stone and paver surrounds included.",
    img: "/manus-storage/fire7_f0b582ff_56d05738.webp",
    accent: "oklch(0.62 0.18 38)",
  },
  {
    id: "kitchen",
    label: "Outdoor Kitchens",
    number: "03",
    tagline: "Cook. Entertain. Live Outside.",
    description:
      "Full outdoor kitchen builds with built-in grills, countertops, refrigeration, and bar seating. Designed around your entertaining style and integrated into your landscape.",
    img: "/manus-storage/outdoor-kitchen-water_90c45e1a_63d85a27.webp",
    accent: "oklch(0.68 0.10 85)",
  },
  {
    id: "patio",
    label: "Paver Patios",
    number: "04",
    tagline: "The Foundation of Outdoor Living",
    description:
      "Belgard, Techo-Bloc, and natural stone paver installations for patios, walkways, driveways, and pool decks. Precision-set for Central Oregon's freeze-thaw cycles.",
    img: "/manus-storage/GLLPatio2_600w_127ef46c.webp",
    accent: "oklch(0.46 0.20 25)",
  },
  {
    id: "lighting",
    label: "Landscape Lighting",
    number: "05",
    tagline: "Your Home After Dark",
    description:
      "Low-voltage LED systems for uplighting, path lighting, water feature illumination, and architectural accents. Smart-home compatible and energy efficient.",
    img: "/manus-storage/3771NESuchyBackyardHiResPhotos11-min-min_32e40dc0_0de28f1b.webp",
    accent: "oklch(0.72 0.14 65)",
  },
];

export default function OutdoorRoomsSection() {
  const [activeId, setActiveId] = useState("water");
  const [fading, setFading] = useState(false);
  const [pendingId, setPendingId] = useState<string | null>(null);

  const active = ROOMS.find((r) => r.id === activeId) ?? ROOMS[0];

  const handleSelect = (id: string) => {
    if (id === activeId || fading) return;
    setFading(true);
    setPendingId(id);
    setTimeout(() => {
      setActiveId(id);
      setFading(false);
      setPendingId(null);
    }, 300);
  };

  return (
    <section
      id="outdoor-rooms"
      style={{
        position: "relative",
        backgroundColor: "oklch(0.97 0.005 90)",
        overflow: "hidden",
      }}
    >
      {/* ── Section header ── */}
      <div
        style={{
          padding: "5rem 2.5rem 0",
          maxWidth: "1400px",
          margin: "0 auto",
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "1rem",
        }}
      >
        <div>
          <p
            style={{
              fontFamily: "'Montserrat', sans-serif",
              fontSize: "0.55rem",
              fontWeight: 700,
              letterSpacing: "0.32em",
              textTransform: "uppercase",
              color: "oklch(0.40 0.008 30)",
              marginBottom: "0.75rem",
            }}
          >
            ◆ &nbsp; Explore Our Work
          </p>
          <h2
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(2.8rem, 6vw, 5.5rem)",
              fontWeight: 700,
              lineHeight: 0.9,
              letterSpacing: "-0.03em",
              color: "oklch(0.14 0.006 30)",
              margin: 0,
            }}
          >
            Outdoor
            <br />
            <em style={{ fontWeight: 300, color: "oklch(0.30 0.008 30)" }}>Rooms</em>
          </h2>
        </div>
        <p
          style={{
            fontFamily: "'Montserrat', sans-serif",
            fontSize: "0.65rem",
            fontWeight: 400,
            lineHeight: 1.8,
            color: "oklch(0.42 0.008 30)",
            maxWidth: "340px",
          }}
        >
          Every great outdoor space starts with a vision. Explore the spaces we build — then let's design yours.
        </p>
      </div>

      {/* ── Main interactive panel ── */}
      <div
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
          padding: "3rem 2.5rem 5rem",
          display: "grid",
          gridTemplateColumns: "340px 1fr",
          gap: "0",
          alignItems: "stretch",
          minHeight: "560px",
        }}
        className="outdoor-rooms-grid"
      >
        {/* Left: room list */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            borderRight: "1.5px solid oklch(0.88 0.006 75)",
            paddingRight: "0",
          }}
        >
          {ROOMS.map((room) => {
            const isActive = room.id === activeId || room.id === pendingId;
            return (
              <button
                key={room.id}
                onClick={() => handleSelect(room.id)}
                onMouseEnter={() => handleSelect(room.id)}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  textAlign: "left",
                  padding: "1.6rem 2rem 1.6rem 0",
                  borderBottom: "1px solid oklch(0.90 0.006 75)",
                  position: "relative",
                  transition: "background-color 0.2s ease",
                  backgroundColor: isActive ? "oklch(0.94 0.006 75)" : "transparent",
                }}
              >
                {/* Active indicator bar */}
                <div
                  style={{
                    position: "absolute",
                    right: "-1.5px",
                    top: 0,
                    bottom: 0,
                    width: "3px",
                    backgroundColor: isActive ? "oklch(0.22 0.008 30)" : "transparent",
                    transition: "background-color 0.2s ease",
                  }}
                />

                <div style={{ display: "flex", alignItems: "flex-start", gap: "1rem" }}>
                  {/* Number */}
                  <span
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontStyle: "italic",
                      fontSize: "0.7rem",
                      color: isActive ? "oklch(0.40 0.008 30)" : "oklch(0.46 0.20 25)",
                      minWidth: "24px",
                      paddingTop: "2px",
                      transition: "color 0.2s ease",
                    }}
                  >
                    {room.number}
                  </span>

                  <div>
                    {/* Label */}
                    <div
                      style={{
                        fontFamily: "'Montserrat', sans-serif",
                        fontSize: "0.72rem",
                        fontWeight: isActive ? 700 : 500,
                        letterSpacing: "0.12em",
                        textTransform: "uppercase",
                        color: isActive ? "oklch(0.14 0.006 30)" : "oklch(0.42 0.008 30)",
                        marginBottom: "0.3rem",
                        transition: "color 0.2s ease, font-weight 0.2s ease",
                      }}
                    >
                      {room.label}
                    </div>

                    {/* Tagline — only shown when active */}
                    <div
                      style={{
                        fontFamily: "'Cormorant Garamond', serif",
                        fontStyle: "italic",
                        fontSize: "0.78rem",
                        color: "oklch(0.38 0.008 30)",
                        maxHeight: isActive ? "2rem" : "0",
                        overflow: "hidden",
                        opacity: isActive ? 1 : 0,
                        transition: "max-height 0.3s ease, opacity 0.3s ease",
                      }}
                    >
                      {room.tagline}
                    </div>
                  </div>
                </div>
              </button>
            );
          })}

          {/* CTA at bottom of list */}
          <div style={{ marginTop: "auto", paddingTop: "2rem" }}>
            <a
              href="/contact"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                fontFamily: "'Montserrat', sans-serif",
                fontSize: "0.58rem",
                fontWeight: 700,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "oklch(0.97 0.01 90)",
                backgroundColor: "oklch(0.22 0.008 30)",
                padding: "0.85rem 1.8rem",
                borderRadius: "1.8rem 0.2rem 1.8rem 0.2rem",
                textDecoration: "none",
                transition: "background-color 0.2s ease, transform 0.15s ease",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "oklch(0.30 0.008 30)";
                (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-1px)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "oklch(0.22 0.008 30)";
                (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(0)";
              }}
            >
              Start Your Project →
            </a>
          </div>
        </div>

        {/* Right: photo + description */}
        <div
          style={{
            position: "relative",
            overflow: "hidden",
            borderRadius: "0 4px 4px 0",
            minHeight: "480px",
          }}
        >
          {/* Photo */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage: `url(${active.img})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              opacity: fading ? 0 : 1,
              transition: "opacity 0.35s ease",
              filter: "brightness(0.72) saturate(0.9)",
            }}
          />

          {/* Dark gradient at bottom */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(to bottom, transparent 30%, oklch(0.08 0.006 30 / 0.85) 100%)",
              pointerEvents: "none",
            }}
          />

          {/* Description overlay */}
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              padding: "2.5rem 3rem",
              opacity: fading ? 0 : 1,
              transition: "opacity 0.35s ease",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                marginBottom: "0.75rem",
              }}
            >
              <span
                style={{
                  display: "inline-block",
                  width: "2rem",
                  height: "2px",
                  backgroundColor: active.accent,
                }}
              />
              <span
                style={{
                  fontFamily: "'Montserrat', sans-serif",
                  fontSize: "0.52rem",
                  fontWeight: 700,
                  letterSpacing: "0.28em",
                  textTransform: "uppercase",
                  color: active.accent,
                }}
              >
                {active.label}
              </span>
            </div>

            <h3
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)",
                fontWeight: 700,
                lineHeight: 1.05,
                color: "oklch(0.97 0.01 75)",
                marginBottom: "1rem",
                letterSpacing: "-0.02em",
              }}
            >
              {active.tagline}
            </h3>

            <p
              style={{
                fontFamily: "'Montserrat', sans-serif",
                fontSize: "0.65rem",
                fontWeight: 400,
                lineHeight: 1.8,
                color: "oklch(0.75 0.005 30)",
                maxWidth: "520px",
              }}
            >
              {active.description}
            </p>
          </div>

          {/* Room number — top right corner */}
          <div
            style={{
              position: "absolute",
              top: "1.5rem",
              right: "1.5rem",
              fontFamily: "'Cormorant Garamond', serif",
              fontStyle: "italic",
              fontSize: "4rem",
              fontWeight: 700,
              color: "oklch(1 0 0 / 0.08)",
              lineHeight: 1,
              userSelect: "none",
              pointerEvents: "none",
            }}
          >
            {active.number}
          </div>
        </div>
      </div>

      {/* Responsive styles */}
      <style>{`
        @media (max-width: 768px) {
          .outdoor-rooms-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
