/* ============================================================
   BOTANICAL BAND
   
   A full-width decorative divider band between homepage sections.
   Features a repeating SVG botanical pattern (spruce branches,
   ferns, leaves) on a deep forest green background — inspired by
   Studio Job's insect pattern bands.
   ============================================================ */

export default function BotanicalBand({ label }: { label?: string }) {
  return (
    <div
      style={{
        width: "100%",
        backgroundColor: "oklch(0.22 0.07 155)",
        overflow: "hidden",
        position: "relative",
        height: "88px",
        display: "flex",
        alignItems: "center",
      }}
    >
      {/* SVG botanical pattern — infinite horizontal repeat */}
      <svg
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          opacity: 0.35,
        }}
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <pattern id="botanical" x="0" y="0" width="120" height="88" patternUnits="userSpaceOnUse">
            {/* Spruce branch 1 */}
            <g transform="translate(10,44) rotate(-20)">
              <line x1="0" y1="-18" x2="0" y2="18" stroke="oklch(0.65 0.14 155)" strokeWidth="1.5"/>
              <line x1="0" y1="-12" x2="-8" y2="-16" stroke="oklch(0.60 0.13 155)" strokeWidth="1"/>
              <line x1="0" y1="-12" x2="8" y2="-16" stroke="oklch(0.60 0.13 155)" strokeWidth="1"/>
              <line x1="0" y1="-6" x2="-10" y2="-10" stroke="oklch(0.60 0.13 155)" strokeWidth="1"/>
              <line x1="0" y1="-6" x2="10" y2="-10" stroke="oklch(0.60 0.13 155)" strokeWidth="1"/>
              <line x1="0" y1="0" x2="-12" y2="-4" stroke="oklch(0.60 0.13 155)" strokeWidth="1"/>
              <line x1="0" y1="0" x2="12" y2="-4" stroke="oklch(0.60 0.13 155)" strokeWidth="1"/>
              <line x1="0" y1="6" x2="-10" y2="2" stroke="oklch(0.60 0.13 155)" strokeWidth="1"/>
              <line x1="0" y1="6" x2="10" y2="2" stroke="oklch(0.60 0.13 155)" strokeWidth="1"/>
              <line x1="0" y1="12" x2="-8" y2="8" stroke="oklch(0.60 0.13 155)" strokeWidth="1"/>
              <line x1="0" y1="12" x2="8" y2="8" stroke="oklch(0.60 0.13 155)" strokeWidth="1"/>
            </g>
            {/* Fern frond */}
            <g transform="translate(55,44) rotate(10)">
              <path d="M0,-20 C2,-10 4,0 0,20" stroke="oklch(0.58 0.14 145)" strokeWidth="1.2" fill="none"/>
              <path d="M0,-15 C-6,-18 -12,-15 -14,-10" stroke="oklch(0.55 0.13 145)" strokeWidth="0.9" fill="none"/>
              <path d="M0,-15 C6,-18 12,-15 14,-10" stroke="oklch(0.55 0.13 145)" strokeWidth="0.9" fill="none"/>
              <path d="M0,-8 C-8,-12 -14,-8 -15,-3" stroke="oklch(0.55 0.13 145)" strokeWidth="0.9" fill="none"/>
              <path d="M0,-8 C8,-12 14,-8 15,-3" stroke="oklch(0.55 0.13 145)" strokeWidth="0.9" fill="none"/>
              <path d="M0,0 C-9,-4 -14,0 -14,5" stroke="oklch(0.55 0.13 145)" strokeWidth="0.9" fill="none"/>
              <path d="M0,0 C9,-4 14,0 14,5" stroke="oklch(0.55 0.13 145)" strokeWidth="0.9" fill="none"/>
              <path d="M0,8 C-7,4 -12,8 -11,13" stroke="oklch(0.55 0.13 145)" strokeWidth="0.9" fill="none"/>
              <path d="M0,8 C7,4 12,8 11,13" stroke="oklch(0.55 0.13 145)" strokeWidth="0.9" fill="none"/>
            </g>
            {/* Small leaf cluster */}
            <g transform="translate(95,30) rotate(-35)">
              <ellipse cx="0" cy="-8" rx="4" ry="8" fill="none" stroke="oklch(0.58 0.13 150)" strokeWidth="0.9"/>
              <line x1="0" y1="-16" x2="0" y2="0" stroke="oklch(0.55 0.13 150)" strokeWidth="0.7"/>
            </g>
            <g transform="translate(100,55) rotate(20)">
              <ellipse cx="0" cy="-6" rx="3" ry="6" fill="none" stroke="oklch(0.58 0.13 150)" strokeWidth="0.9"/>
              <line x1="0" y1="-12" x2="0" y2="0" stroke="oklch(0.55 0.13 150)" strokeWidth="0.7"/>
            </g>
            {/* Small dot accent */}
            <circle cx="30" cy="20" r="2" fill="oklch(0.65 0.10 155)" opacity="0.6"/>
            <circle cx="75" cy="65" r="1.5" fill="oklch(0.65 0.10 155)" opacity="0.5"/>
            <circle cx="110" cy="30" r="1.5" fill="oklch(0.65 0.10 155)" opacity="0.5"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#botanical)"/>
      </svg>

      {/* Scrolling label text */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          width: "100%",
          display: "flex",
          alignItems: "center",
          gap: "0",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            display: "flex",
            gap: "0",
            animation: "marquee-scroll 18s linear infinite",
            whiteSpace: "nowrap",
            flexShrink: 0,
          }}
        >
          {Array.from({ length: 8 }).map((_, i) => (
            <span
              key={i}
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontWeight: 600,
                fontStyle: "italic",
                fontSize: "1.05rem",
                letterSpacing: "0.25em",
                color: "oklch(0.88 0.04 75)",
                textTransform: "uppercase",
                padding: "0 2.5rem",
                display: "flex",
                alignItems: "center",
                gap: "2.5rem",
              }}
            >
              {label || "DESIGN"} <span style={{ color: "oklch(0.46 0.20 25)", fontSize: "0.5rem" }}>◆</span> BUILD <span style={{ color: "oklch(0.46 0.20 25)", fontSize: "0.5rem" }}>◆</span> MAINTAIN <span style={{ color: "oklch(0.46 0.20 25)", fontSize: "0.5rem" }}>◆</span> CENTRAL OREGON <span style={{ color: "oklch(0.46 0.20 25)", fontSize: "0.5rem" }}>◆</span> SINCE 2003
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
