/* ============================================================
   BOTANICAL BAND — Watercolor Plant Divider

   Large watercolor-style potted plant illustrations that
   bleed dramatically above and below a thin warm rule band.
   Plants float with overflow:visible, no hard crop lines.
   ============================================================ */

const PLANT_1 =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663503028182/g3pw3MRUapabcDUbhBEFxx/plant-watercolor-1-ZFn3XuP7hyP9nuaWiLKXQp.webp";
const PLANT_2 =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663503028182/g3pw3MRUapabcDUbhBEFxx/plant-watercolor-2-F9buvhsRNpgvU7U478oxVi.webp";
const PLANT_3 =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663503028182/g3pw3MRUapabcDUbhBEFxx/plant-watercolor-3-Le2uUdKot7UJDh8HyDf2Sc.webp";

interface BotanicalBandProps {
  label?: string;
  /** Which plant arrangement to use (alternates between bands) */
  variant?: "a" | "b";
}

export default function BotanicalBand({
  label = "CENTRAL OREGON  ◆  SINCE 2003",
  variant = "a",
}: BotanicalBandProps) {
  const isA = variant === "a";

  return (
    <div
      style={{
        position: "relative",
        /* Band itself is 80px; plants bleed ~180px above */
        height: "80px",
        overflow: "visible",
        zIndex: 10,
        pointerEvents: "none",
        userSelect: "none",
        /* Push the band down so plants above it don't overlap the section above */
        marginTop: "160px",
      }}
    >
      {/* ── The thin band rule ── */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "80px",
          backgroundColor: "oklch(0.975 0.008 80)",
          borderTop: "1.5px solid oklch(0.88 0.006 75)",
          borderBottom: "1.5px solid oklch(0.88 0.006 75)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "2rem",
        }}
      >
        <div
          style={{
            width: "clamp(40px, 8vw, 120px)",
            height: "1px",
            backgroundColor: "oklch(0.52 0.12 195)",
            opacity: 0.4,
          }}
        />
        <span
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontStyle: "italic",
            fontSize: "clamp(0.65rem, 1.2vw, 0.85rem)",
            letterSpacing: "0.35em",
            color: "oklch(0.52 0.12 195)",
            textTransform: "uppercase",
            whiteSpace: "nowrap",
          }}
        >
          {label}
        </span>
        <div
          style={{
            width: "clamp(40px, 8vw, 120px)",
            height: "1px",
            backgroundColor: "oklch(0.52 0.12 195)",
            opacity: 0.4,
          }}
        />
      </div>

      {/* ── Plant 1 — left side, bleeds above band ── */}
      <img
        src={isA ? PLANT_1 : PLANT_3}
        alt=""
        aria-hidden="true"
        style={{
          position: "absolute",
          left: "clamp(24px, 6vw, 140px)",
          top: isA ? "-195px" : "-175px",
          width: isA ? "clamp(220px, 20vw, 320px)" : "clamp(240px, 22vw, 360px)",
          height: "auto",
          objectFit: "contain",
          opacity: 0.93,
          transform: isA ? "rotate(-5deg)" : "rotate(4deg)",
          filter: "drop-shadow(0 10px 28px oklch(0.18 0.008 30 / 0.14))",
          pointerEvents: "none",
        }}
      />

      {/* ── Plant 2 — right side, bleeds above band ── */}
      <img
        src={isA ? PLANT_2 : PLANT_1}
        alt=""
        aria-hidden="true"
        style={{
          position: "absolute",
          right: "clamp(24px, 6vw, 140px)",
          top: isA ? "-155px" : "-175px",
          width: isA ? "clamp(180px, 16vw, 260px)" : "clamp(200px, 18vw, 290px)",
          height: "auto",
          objectFit: "contain",
          opacity: 0.88,
          transform: isA ? "rotate(6deg)" : "rotate(-4deg)",
          filter: "drop-shadow(0 10px 28px oklch(0.18 0.008 30 / 0.11))",
          pointerEvents: "none",
        }}
      />

      {/* ── Plant 3 — center, smaller, variant B only ── */}
      {!isA && (
        <img
          src={PLANT_2}
          alt=""
          aria-hidden="true"
          style={{
            position: "absolute",
            left: "50%",
            transform: "translateX(-50%) rotate(-2deg)",
            top: "-120px",
            width: "clamp(150px, 13vw, 210px)",
            height: "auto",
            objectFit: "contain",
            opacity: 0.78,
            filter: "drop-shadow(0 8px 20px oklch(0.18 0.008 30 / 0.09))",
            pointerEvents: "none",
          }}
        />
      )}
    </div>
  );
}
