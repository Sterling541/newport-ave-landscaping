/* ============================================================
   SERVICE AREA BAND — Newport Avenue Landscaping
   Multi-column city list on dark background.
   Styled to match reference: bold red label, 6-col grid,
   dark charcoal background, white city names.
   ============================================================ */

// All Central Oregon communities served, sorted alphabetically
// Cities with dedicated landing pages get a href; others are plain text
const AREAS: { name: string; href?: string }[] = [
  { name: "Alfalfa" },
  { name: "Bend", href: "/landscaping/bend" },
  { name: "Black Butte Ranch" },
  { name: "Crooked River Ranch" },
  { name: "Eagle Crest" },
  { name: "La Pine", href: "/landscaping/la-pine" },
  { name: "Madras", href: "/landscaping/madras" },
  { name: "Metolius" },
  { name: "Powell Butte" },
  { name: "Prineville", href: "/landscaping/prineville" },
  { name: "Redmond", href: "/landscaping/redmond" },
  { name: "Sisters", href: "/landscaping/sisters" },
  { name: "Sunriver", href: "/landscaping/sunriver" },
  { name: "Terrebonne" },
  { name: "Three Rivers" },
  { name: "Tumalo", href: "/landscaping/tumalo" },
  { name: "Warm Springs" },
];

export default function ServiceAreaBand() {
  return (
    <section
      style={{
        backgroundColor: "oklch(0.22 0.025 220)",
        padding: "56px 0 64px",
      }}
    >
      <div className="container">
        {/* Label */}
        <p
          className="font-label mb-8"
          style={{
            color: "oklch(0.62 0.18 25)",
            fontSize: "0.65rem",
            letterSpacing: "0.18em",
            fontWeight: 700,
          }}
        >
          SOME OF THE CITIES WE SERVE IN CENTRAL OREGON — OREGON
        </p>

        {/* City grid — 6 columns on large, 3 on medium, 2 on small */}
        <div
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-x-6 gap-y-3"
        >
          {AREAS.map((area) => (
            area.href ? (
              <a
                key={area.name}
                href={area.href}
                className="font-body"
                style={{
                  color: "oklch(0.88 0.005 220)",
                  fontSize: "0.95rem",
                  lineHeight: 1.6,
                  textDecoration: "none",
                  borderBottom: "1px solid oklch(0.46 0.20 25 / 0.5)",
                  transition: "color 0.2s",
                }}
                onMouseEnter={e => (e.currentTarget.style.color = "oklch(0.72 0.12 25)")}
                onMouseLeave={e => (e.currentTarget.style.color = "oklch(0.88 0.005 220)")}
              >
                {area.name}
              </a>
            ) : (
              <span
                key={area.name}
                className="font-body"
                style={{
                  color: "oklch(0.88 0.005 220)",
                  fontSize: "0.95rem",
                  lineHeight: 1.6,
                }}
              >
                {area.name}
              </span>
            )
          ))}

        </div>
      </div>
    </section>
  );
}
