/* ============================================================
   SERVICE AREA BAND — Newport Avenue Landscaping
   Multi-column city list on dark background.
   Styled to match reference: bold red label, 6-col grid,
   dark charcoal background, white city names.
   ============================================================ */

// All Central Oregon communities served, sorted alphabetically
const AREAS = [
  "Alfalfa",
  "Bend",
  "Black Butte Ranch",
  "Crooked River Ranch",
  "Eagle Crest",
  "La Pine",
  "Madras",
  "Metolius",
  "Powell Butte",
  "Prineville",
  "Redmond",
  "Sisters",
  "Sunriver",
  "Terrebonne",
  "Three Rivers",
  "Tumalo",
  "Warm Springs",
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
            <span
              key={area}
              className="font-body"
              style={{
                color: "oklch(0.88 0.005 220)",
                fontSize: "0.95rem",
                lineHeight: 1.6,
              }}
            >
              {area}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
