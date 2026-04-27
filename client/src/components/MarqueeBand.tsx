/* ============================================================
   MARQUEE BAND — Infinite Scroll Text Strip
   Brand red background, white text, teal dot separators
   ============================================================ */

const ITEMS = [
  "DESIGN",
  "·",
  "BUILD",
  "·",
  "MAINTAIN",
  "·",
  "CENTRAL OREGON",
  "·",
  "SINCE 2005",
  "·",
  "150+ PROFESSIONALS",
  "·",
  "BEND · REDMOND · SISTERS",
  "·",
];

export default function MarqueeBand() {
  const text = [...ITEMS, ...ITEMS, ...ITEMS]; // tripled for seamless loop

  return (
    <div
      style={{
        backgroundColor: "oklch(0.46 0.20 25)", // Brand red
        overflow: "hidden",
        padding: "0.85rem 0",
        position: "relative",
        zIndex: 5,
      }}
    >
      <div
        style={{
          display: "flex",
          width: "max-content",
          animation: "marquee-scroll 32s linear infinite",
        }}
      >
        {text.map((item, i) => (
          <span
            key={i}
            style={{
              fontFamily: "'Montserrat', sans-serif",
              fontSize: "0.58rem",
              fontWeight: 700,
              letterSpacing: "0.22em",
              color: item === "·" ? "oklch(0.56 0.18 25)" : "oklch(0.97 0.012 75)",
              marginRight: "1.5rem",
              whiteSpace: "nowrap",
            }}
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
