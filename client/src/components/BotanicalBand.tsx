/* ============================================================
   BOTANICAL BAND — Watercolor Outdoor Plant Divider

   Five large watercolor outdoor landscape plant illustrations
   (ornamental grass, blue spruce branch, fern frond, sage shrub,
   blue spruce sapling) with transparent backgrounds that bleed
   above the thin warm rule band — but NOT covering it.
   Plants are shifted down so the band/stripe remains visible.
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
        zIndex: 5,
        pointerEvents: "none",
        userSelect: "none",
        marginTop: "180px",
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
          zIndex: 2,
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
      {/* Plants sit BEHIND the band text (zIndex: 1) so the stripe is always readable */}
      {isA && (
        <>
          {/* FAR LEFT: ornamental grass — bottom anchored to band top */}
          <img
            src={GRASS_URL}
            alt=""
            aria-hidden="true"
            style={{
              position: "absolute",
              left: "clamp(-20px, 2vw, 40px)",
              top: "-200px",
              width: "clamp(380px, 34vw, 575px)",
              height: "auto",
              objectFit: "contain",
              opacity: 0.85,
              transform: "rotate(-6deg)",
              filter: "drop-shadow(0 14px 32px rgba(0,0,0,0.10))",
              pointerEvents: "none",
              zIndex: 1,
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
              top: "-160px",
              width: "clamp(330px, 30vw, 495px)",
              height: "auto",
              objectFit: "contain",
              opacity: 0.80,
              transform: "rotate(4deg)",
              filter: "drop-shadow(0 12px 28px rgba(0,0,0,0.09))",
              pointerEvents: "none",
              zIndex: 1,
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
              top: "-220px",
              width: "clamp(355px, 32vw, 545px)",
              height: "auto",
              objectFit: "contain",
              opacity: 0.85,
              transform: "rotate(-3deg)",
              filter: "drop-shadow(0 16px 36px rgba(0,0,0,0.11))",
              pointerEvents: "none",
              zIndex: 1,
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
              top: "-180px",
              width: "clamp(355px, 32vw, 535px)",
              height: "auto",
              objectFit: "contain",
              opacity: 0.82,
              transform: "rotate(8deg) scaleX(-1)",
              filter: "drop-shadow(0 14px 32px rgba(0,0,0,0.10))",
              pointerEvents: "none",
              zIndex: 1,
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
              top: "-190px",
              width: "clamp(370px, 33vw, 565px)",
              height: "auto",
              objectFit: "contain",
              opacity: 0.85,
              transform: "rotate(12deg)",
              filter: "drop-shadow(0 14px 32px rgba(0,0,0,0.11))",
              pointerEvents: "none",
              zIndex: 1,
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
              top: "-155px",
              width: "clamp(315px, 29vw, 485px)",
              height: "auto",
              objectFit: "contain",
              opacity: 0.80,
              transform: "rotate(-5deg)",
              filter: "drop-shadow(0 12px 28px rgba(0,0,0,0.09))",
              pointerEvents: "none",
              zIndex: 1,
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
              top: "-210px",
              width: "clamp(355px, 32vw, 535px)",
              height: "auto",
              objectFit: "contain",
              opacity: 0.85,
              transform: "rotate(-7deg)",
              filter: "drop-shadow(0 14px 32px rgba(0,0,0,0.10))",
              pointerEvents: "none",
              zIndex: 1,
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
              top: "-170px",
              width: "clamp(345px, 31vw, 525px)",
              height: "auto",
              objectFit: "contain",
              opacity: 0.82,
              transform: "rotate(6deg)",
              filter: "drop-shadow(0 12px 28px rgba(0,0,0,0.09))",
              pointerEvents: "none",
              zIndex: 1,
            }}
          />
        </>
      )}
    </div>
  );
}
