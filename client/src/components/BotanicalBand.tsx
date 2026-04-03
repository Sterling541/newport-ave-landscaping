/* ============================================================
   BOTANICAL BAND — Watercolor Outdoor Plant Divider

   Large watercolor outdoor landscape plant illustrations
   (ornamental grass, blue spruce branch, fern frond) that
   bleed dramatically above a thin warm rule band.
   No pots, no backgrounds — loose painterly style.
   ============================================================ */

// Outdoor watercolor landscape plant illustrations
const GRASS_URL =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663503028182/g3pw3MRUapabcDUbhBEFxx/plant-outdoor-1-KW2XRPueAXVPDCpgEKYpjG.webp";
const SPRUCE_URL =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663503028182/g3pw3MRUapabcDUbhBEFxx/plant-outdoor-2-d2nDHBqYQpjzfVBriUJKGe.webp";
const FERN_URL =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663503028182/g3pw3MRUapabcDUbhBEFxx/plant-outdoor-3-NXSVjdJG3BcCKapdSQGk5P.webp";

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
        height: "80px",
        overflow: "visible",
        zIndex: 10,
        pointerEvents: "none",
        userSelect: "none",
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

      {/* ── Variant A: grass left, fern right, small spruce far right ── */}
      {isA && (
        <>
          {/* LEFT: ornamental grass */}
          <img
            src={GRASS_URL}
            alt=""
            aria-hidden="true"
            style={{
              position: "absolute",
              left: "clamp(24px, 6vw, 140px)",
              top: "-195px",
              width: "clamp(220px, 20vw, 320px)",
              height: "auto",
              objectFit: "contain",
              opacity: 0.92,
              transform: "rotate(-5deg)",
              filter: "drop-shadow(0 10px 28px rgba(0,0,0,0.12))",
              pointerEvents: "none",
            }}
          />
          {/* RIGHT: fern frond */}
          <img
            src={FERN_URL}
            alt=""
            aria-hidden="true"
            style={{
              position: "absolute",
              right: "clamp(80px, 10vw, 200px)",
              top: "-170px",
              width: "clamp(180px, 17vw, 270px)",
              height: "auto",
              objectFit: "contain",
              opacity: 0.88,
              transform: "rotate(7deg) scaleX(-1)",
              filter: "drop-shadow(0 10px 28px rgba(0,0,0,0.10))",
              pointerEvents: "none",
            }}
          />
          {/* FAR RIGHT: blue spruce sprig */}
          <img
            src={SPRUCE_URL}
            alt=""
            aria-hidden="true"
            style={{
              position: "absolute",
              right: "clamp(-10px, 1vw, 20px)",
              top: "-130px",
              width: "clamp(110px, 12vw, 190px)",
              height: "auto",
              objectFit: "contain",
              opacity: 0.78,
              transform: "rotate(-12deg)",
              filter: "drop-shadow(0 6px 16px rgba(0,0,0,0.08))",
              pointerEvents: "none",
            }}
          />
        </>
      )}

      {/* ── Variant B: spruce left, grass center, fern right ── */}
      {!isA && (
        <>
          {/* LEFT: blue spruce branch */}
          <img
            src={SPRUCE_URL}
            alt=""
            aria-hidden="true"
            style={{
              position: "absolute",
              left: "clamp(-10px, 1.5vw, 30px)",
              top: "-175px",
              width: "clamp(200px, 20vw, 310px)",
              height: "auto",
              objectFit: "contain",
              opacity: 0.90,
              transform: "rotate(10deg)",
              filter: "drop-shadow(0 10px 28px rgba(0,0,0,0.12))",
              pointerEvents: "none",
            }}
          />
          {/* CENTER: ornamental grass */}
          <img
            src={GRASS_URL}
            alt=""
            aria-hidden="true"
            style={{
              position: "absolute",
              left: "50%",
              top: "-150px",
              width: "clamp(150px, 14vw, 230px)",
              height: "auto",
              objectFit: "contain",
              opacity: 0.78,
              transform: "translateX(-50%) rotate(-4deg)",
              filter: "drop-shadow(0 8px 20px rgba(0,0,0,0.09))",
              pointerEvents: "none",
            }}
          />
          {/* RIGHT: fern frond */}
          <img
            src={FERN_URL}
            alt=""
            aria-hidden="true"
            style={{
              position: "absolute",
              right: "clamp(-10px, 1.5vw, 30px)",
              top: "-185px",
              width: "clamp(200px, 19vw, 300px)",
              height: "auto",
              objectFit: "contain",
              opacity: 0.90,
              transform: "rotate(-8deg)",
              filter: "drop-shadow(0 10px 28px rgba(0,0,0,0.12))",
              pointerEvents: "none",
            }}
          />
        </>
      )}
    </div>
  );
}
