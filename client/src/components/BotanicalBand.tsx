/* ============================================================
   BOTANICAL BAND — Watercolor Outdoor Plant Divider

   Five large watercolor outdoor landscape plant illustrations
   (ornamental grass, blue spruce branch, fern frond, sage shrub,
   blue spruce sapling) with transparent backgrounds that bleed
   dramatically above and below the thin warm rule band.
   ============================================================ */

// Transparent outdoor watercolor landscape plant illustrations
const GRASS_URL =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663503028182/g3pw3MRUapabcDUbhBEFxx/plant-outdoor-1-nobg_a59ef7c7.png";
const SPRUCE_BRANCH_URL =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663503028182/g3pw3MRUapabcDUbhBEFxx/plant-outdoor-2-nobg_0eb4c196.png";
const FERN_URL =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663503028182/g3pw3MRUapabcDUbhBEFxx/plant-outdoor-3-nobg_38f096e3.png";
const SHRUB_URL =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663503028182/g3pw3MRUapabcDUbhBEFxx/plant-outdoor-4-nobg_be827cae.png";
const SPRUCE_TREE_URL =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663503028182/g3pw3MRUapabcDUbhBEFxx/plant-outdoor-5-nobg_c86c3b82.png";

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
        marginTop: "220px",
        marginBottom: "60px",
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

      {/* ── Variant A: grass far-left, shrub left, spruce-tree center-right, fern right ── */}
      {isA && (
        <>
          {/* FAR LEFT: ornamental grass — tall, bleeds above */}
          <img
            src={GRASS_URL}
            alt=""
            aria-hidden="true"
            style={{
              position: "absolute",
              left: "clamp(-20px, 2vw, 40px)",
              top: "-310px",
              width: "clamp(280px, 26vw, 420px)",
              height: "auto",
              objectFit: "contain",
              opacity: 0.95,
              transform: "rotate(-6deg)",
              filter: "drop-shadow(0 14px 32px rgba(0,0,0,0.10))",
              pointerEvents: "none",
            }}
          />
          {/* LEFT-CENTER: teal sage shrub */}
          <img
            src={SHRUB_URL}
            alt=""
            aria-hidden="true"
            style={{
              position: "absolute",
              left: "clamp(200px, 18vw, 340px)",
              top: "-260px",
              width: "clamp(240px, 22vw, 360px)",
              height: "auto",
              objectFit: "contain",
              opacity: 0.88,
              transform: "rotate(4deg)",
              filter: "drop-shadow(0 12px 28px rgba(0,0,0,0.09))",
              pointerEvents: "none",
            }}
          />
          {/* CENTER-RIGHT: blue spruce sapling */}
          <img
            src={SPRUCE_TREE_URL}
            alt=""
            aria-hidden="true"
            style={{
              position: "absolute",
              right: "clamp(240px, 22vw, 400px)",
              top: "-340px",
              width: "clamp(260px, 24vw, 400px)",
              height: "auto",
              objectFit: "contain",
              opacity: 0.92,
              transform: "rotate(-3deg)",
              filter: "drop-shadow(0 16px 36px rgba(0,0,0,0.11))",
              pointerEvents: "none",
            }}
          />
          {/* FAR RIGHT: fern frond */}
          <img
            src={FERN_URL}
            alt=""
            aria-hidden="true"
            style={{
              position: "absolute",
              right: "clamp(-20px, 2vw, 40px)",
              top: "-280px",
              width: "clamp(260px, 24vw, 390px)",
              height: "auto",
              objectFit: "contain",
              opacity: 0.90,
              transform: "rotate(8deg) scaleX(-1)",
              filter: "drop-shadow(0 14px 32px rgba(0,0,0,0.10))",
              pointerEvents: "none",
            }}
          />
        </>
      )}

      {/* ── Variant B: spruce-branch far-left, fern left-center, grass right-center, shrub far-right ── */}
      {!isA && (
        <>
          {/* FAR LEFT: blue spruce branch */}
          <img
            src={SPRUCE_BRANCH_URL}
            alt=""
            aria-hidden="true"
            style={{
              position: "absolute",
              left: "clamp(-30px, 1vw, 20px)",
              top: "-290px",
              width: "clamp(270px, 25vw, 410px)",
              height: "auto",
              objectFit: "contain",
              opacity: 0.92,
              transform: "rotate(12deg)",
              filter: "drop-shadow(0 14px 32px rgba(0,0,0,0.11))",
              pointerEvents: "none",
            }}
          />
          {/* LEFT-CENTER: fern frond */}
          <img
            src={FERN_URL}
            alt=""
            aria-hidden="true"
            style={{
              position: "absolute",
              left: "clamp(180px, 16vw, 320px)",
              top: "-250px",
              width: "clamp(230px, 21vw, 350px)",
              height: "auto",
              objectFit: "contain",
              opacity: 0.85,
              transform: "rotate(-5deg)",
              filter: "drop-shadow(0 12px 28px rgba(0,0,0,0.09))",
              pointerEvents: "none",
            }}
          />
          {/* RIGHT-CENTER: ornamental grass */}
          <img
            src={GRASS_URL}
            alt=""
            aria-hidden="true"
            style={{
              position: "absolute",
              right: "clamp(200px, 19vw, 360px)",
              top: "-320px",
              width: "clamp(260px, 24vw, 390px)",
              height: "auto",
              objectFit: "contain",
              opacity: 0.90,
              transform: "rotate(-7deg)",
              filter: "drop-shadow(0 14px 32px rgba(0,0,0,0.10))",
              pointerEvents: "none",
            }}
          />
          {/* FAR RIGHT: teal sage shrub */}
          <img
            src={SHRUB_URL}
            alt=""
            aria-hidden="true"
            style={{
              position: "absolute",
              right: "clamp(-30px, 1vw, 20px)",
              top: "-270px",
              width: "clamp(250px, 23vw, 380px)",
              height: "auto",
              objectFit: "contain",
              opacity: 0.88,
              transform: "rotate(6deg)",
              filter: "drop-shadow(0 12px 28px rgba(0,0,0,0.09))",
              pointerEvents: "none",
            }}
          />
        </>
      )}
    </div>
  );
}
