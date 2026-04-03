/* ============================================================
   BOTANICAL BAND — Plan-View Plant Symbols
   
   Dark forest-green band with architectural top-down plant
   symbols that bleed ABOVE the band edge, appearing suspended/
   floating above the surface like a landscape plan collage.
   
   Three plant types (matching site palette):
   1. Shrub — large circle, radiating hatch strokes, + center
   2. Conifer — tighter radiating needles, darker green
   3. Groundcover — small scalloped circle, blue-spruce teal
   ============================================================ */

// ── Plant symbol sub-components ───────────────────────────────

function PlanShrub({
  cx, cy, r, fill, stroke, hatchColor,
}: {
  cx: number; cy: number; r: number;
  fill: string; stroke: string; hatchColor: string;
}) {
  const hatches: React.ReactElement[] = [];
  const count = Math.round(r * 1.8);
  for (let i = 0; i < count; i++) {
    const angle = (i / count) * Math.PI * 2;
    const x1 = cx + Math.cos(angle) * r * 0.82;
    const y1 = cy + Math.sin(angle) * r * 0.82;
    const x2 = cx + Math.cos(angle) * (r + r * 0.28);
    const y2 = cy + Math.sin(angle) * (r + r * 0.28);
    hatches.push(
      <line key={i} x1={x1} y1={y1} x2={x2} y2={y2}
        stroke={hatchColor} strokeWidth="1.1" strokeLinecap="round" opacity="0.85"/>
    );
  }
  return (
    <g>
      <ellipse cx={cx + r * 0.18} cy={cy + r * 0.22} rx={r * 0.92} ry={r * 0.85}
        fill="rgba(0,0,0,0.22)" />
      <circle cx={cx} cy={cy} r={r} fill={fill} stroke={stroke} strokeWidth="1.6"/>
      {hatches}
      <line x1={cx - r * 0.22} y1={cy} x2={cx + r * 0.22} y2={cy}
        stroke={stroke} strokeWidth="1.4" strokeLinecap="round"/>
      <line x1={cx} y1={cy - r * 0.22} x2={cx} y2={cy + r * 0.22}
        stroke={stroke} strokeWidth="1.4" strokeLinecap="round"/>
    </g>
  );
}

function PlanConifer({
  cx, cy, r, fill, stroke, needleColor,
}: {
  cx: number; cy: number; r: number;
  fill: string; stroke: string; needleColor: string;
}) {
  const needles: React.ReactElement[] = [];
  const count = Math.round(r * 2.2);
  for (let i = 0; i < count; i++) {
    const angle = (i / count) * Math.PI * 2;
    const x1 = cx + Math.cos(angle) * r * 0.55;
    const y1 = cy + Math.sin(angle) * r * 0.55;
    const x2 = cx + Math.cos(angle) * (r + r * 0.35);
    const y2 = cy + Math.sin(angle) * (r + r * 0.35);
    needles.push(
      <line key={i} x1={x1} y1={y1} x2={x2} y2={y2}
        stroke={needleColor} strokeWidth="0.9" strokeLinecap="round" opacity="0.9"/>
    );
  }
  return (
    <g>
      <ellipse cx={cx + r * 0.14} cy={cy + r * 0.18} rx={r * 0.88} ry={r * 0.82}
        fill="rgba(0,0,0,0.20)" />
      <circle cx={cx} cy={cy} r={r} fill={fill} stroke={stroke} strokeWidth="1.8"/>
      {needles}
      <circle cx={cx} cy={cy} r={r * 0.55} fill="none" stroke={stroke} strokeWidth="0.8" opacity="0.5"/>
      <line x1={cx - r * 0.2} y1={cy} x2={cx + r * 0.2} y2={cy}
        stroke={stroke} strokeWidth="1.3" strokeLinecap="round"/>
      <line x1={cx} y1={cy - r * 0.2} x2={cx} y2={cy + r * 0.2}
        stroke={stroke} strokeWidth="1.3" strokeLinecap="round"/>
    </g>
  );
}

function PlanGroundcover({
  cx, cy, r, fill, stroke,
}: {
  cx: number; cy: number; r: number;
  fill: string; stroke: string;
}) {
  const scallops = 14;
  let d = "";
  for (let i = 0; i < scallops; i++) {
    const angle = (i / scallops) * Math.PI * 2;
    const nextAngle = ((i + 1) / scallops) * Math.PI * 2;
    const midAngle = (angle + nextAngle) / 2;
    const sx = cx + Math.cos(angle) * r;
    const sy = cy + Math.sin(angle) * r;
    const ex = cx + Math.cos(nextAngle) * r;
    const ey = cy + Math.sin(nextAngle) * r;
    const mx = cx + Math.cos(midAngle) * (r + r * 0.18 * 0.6);
    const my = cy + Math.sin(midAngle) * (r + r * 0.18 * 0.6);
    if (i === 0) d += `M ${sx} ${sy}`;
    d += ` Q ${mx} ${my} ${ex} ${ey}`;
  }
  d += " Z";
  const hatches: React.ReactElement[] = [];
  for (let i = 0; i < 8; i++) {
    const a = (i / 8) * Math.PI * 2;
    hatches.push(
      <line key={i}
        x1={cx + Math.cos(a) * r * 0.55} y1={cy + Math.sin(a) * r * 0.55}
        x2={cx + Math.cos(a) * r * 0.82} y2={cy + Math.sin(a) * r * 0.82}
        stroke={stroke} strokeWidth="0.8" strokeLinecap="round" opacity="0.7"/>
    );
  }
  return (
    <g>
      <ellipse cx={cx + r * 0.12} cy={cy + r * 0.15} rx={r * 0.9} ry={r * 0.85}
        fill="rgba(0,0,0,0.18)" />
      <path d={d} fill={fill} stroke={stroke} strokeWidth="1.4"/>
      {hatches}
      <line x1={cx - r * 0.2} y1={cy} x2={cx + r * 0.2} y2={cy}
        stroke={stroke} strokeWidth="1.1" strokeLinecap="round"/>
      <line x1={cx} y1={cy - r * 0.2} x2={cx} y2={cy + r * 0.2}
        stroke={stroke} strokeWidth="1.1" strokeLinecap="round"/>
    </g>
  );
}

// ── Palette ───────────────────────────────────────────────────
const PAL = {
  lime:  { fill: "oklch(0.52 0.15 140)", stroke: "oklch(0.28 0.10 145)", hatch: "oklch(0.32 0.12 145)" },
  olive: { fill: "oklch(0.36 0.10 145)", stroke: "oklch(0.20 0.08 150)", hatch: "oklch(0.22 0.09 148)" },
  teal:  { fill: "oklch(0.58 0.10 195)", stroke: "oklch(0.30 0.09 200)", hatch: "oklch(0.35 0.10 200)" },
  dark:  { fill: "oklch(0.25 0.09 155)", stroke: "oklch(0.15 0.07 158)", hatch: "oklch(0.18 0.08 155)" },
};

type PalKey = keyof typeof PAL;
type PlantType = "shrub" | "conifer" | "groundcover";

interface PlantDef {
  type: PlantType;
  cx: number;
  cy: number; // negative = bleeds above band top
  r: number;
  variant: PalKey;
}

// ── Two cluster layouts ───────────────────────────────────────
// viewBox is 1200 wide × 160 tall; band occupies y=52..132 (80px)
// Plants with cy < 52 bleed above the band edge

const CLUSTER_A: PlantDef[] = [
  // Left group
  { type: "shrub",       cx: 62,   cy: 38,  r: 52, variant: "lime"  },
  { type: "shrub",       cx: 148,  cy: 28,  r: 44, variant: "lime"  },
  { type: "shrub",       cx: 100,  cy: 72,  r: 38, variant: "lime"  },
  { type: "conifer",     cx: 188,  cy: 50,  r: 34, variant: "olive" },
  { type: "conifer",     cx: 232,  cy: 32,  r: 28, variant: "dark"  },
  { type: "groundcover", cx: 148,  cy: 95,  r: 22, variant: "teal"  },
  // Center group
  { type: "conifer",     cx: 420,  cy: 36,  r: 46, variant: "olive" },
  { type: "conifer",     cx: 492,  cy: 58,  r: 36, variant: "dark"  },
  { type: "groundcover", cx: 380,  cy: 72,  r: 26, variant: "teal"  },
  { type: "groundcover", cx: 534,  cy: 42,  r: 22, variant: "teal"  },
  { type: "shrub",       cx: 458,  cy: 22,  r: 30, variant: "lime"  },
  // Right group
  { type: "shrub",       cx: 950,  cy: 36,  r: 50, variant: "lime"  },
  { type: "shrub",       cx: 1032, cy: 26,  r: 42, variant: "lime"  },
  { type: "conifer",     cx: 1000, cy: 72,  r: 32, variant: "olive" },
  { type: "groundcover", cx: 1082, cy: 52,  r: 24, variant: "teal"  },
  { type: "conifer",     cx: 1104, cy: 32,  r: 28, variant: "dark"  },
  { type: "shrub",       cx: 1148, cy: 60,  r: 36, variant: "lime"  },
];

const CLUSTER_B: PlantDef[] = [
  // Far left
  { type: "conifer",     cx: 40,   cy: 28,  r: 44, variant: "dark"  },
  { type: "shrub",       cx: 112,  cy: 38,  r: 48, variant: "lime"  },
  { type: "groundcover", cx: 78,   cy: 78,  r: 22, variant: "teal"  },
  { type: "groundcover", cx: 162,  cy: 60,  r: 20, variant: "teal"  },
  // Left-center
  { type: "shrub",       cx: 298,  cy: 30,  r: 52, variant: "lime"  },
  { type: "conifer",     cx: 362,  cy: 58,  r: 38, variant: "olive" },
  { type: "shrub",       cx: 340,  cy: 18,  r: 30, variant: "lime"  },
  // Center
  { type: "conifer",     cx: 582,  cy: 34,  r: 42, variant: "olive" },
  { type: "conifer",     cx: 644,  cy: 22,  r: 34, variant: "dark"  },
  { type: "groundcover", cx: 612,  cy: 68,  r: 26, variant: "teal"  },
  // Right
  { type: "shrub",       cx: 870,  cy: 36,  r: 46, variant: "lime"  },
  { type: "shrub",       cx: 942,  cy: 24,  r: 40, variant: "lime"  },
  { type: "conifer",     cx: 910,  cy: 68,  r: 30, variant: "olive" },
  { type: "groundcover", cx: 982,  cy: 48,  r: 24, variant: "teal"  },
  // Far right
  { type: "shrub",       cx: 1112, cy: 32,  r: 50, variant: "lime"  },
  { type: "conifer",     cx: 1162, cy: 58,  r: 36, variant: "dark"  },
];

function renderPlant(p: PlantDef, idx: number) {
  const pal = PAL[p.variant];
  if (p.type === "shrub") {
    return <PlanShrub key={idx} cx={p.cx} cy={p.cy} r={p.r}
      fill={pal.fill} stroke={pal.stroke} hatchColor={pal.hatch}/>;
  }
  if (p.type === "conifer") {
    return <PlanConifer key={idx} cx={p.cx} cy={p.cy} r={p.r}
      fill={pal.fill} stroke={pal.stroke} needleColor={pal.hatch}/>;
  }
  return <PlanGroundcover key={idx} cx={p.cx} cy={p.cy} r={p.r}
    fill={pal.fill} stroke={pal.stroke}/>;
}

// ── Main export ───────────────────────────────────────────────
import React from "react";

export default function BotanicalBand({ label }: { label?: string }) {
  const marqueeText = label
    ? `${label} ◆ BUILD ◆ MAINTAIN ◆ CENTRAL OREGON ◆ SINCE 2003`
    : "DESIGN ◆ BUILD ◆ MAINTAIN ◆ CENTRAL OREGON ◆ SINCE 2003 ◆ 150+ PROFESSIONALS ◆ 10,000+ PROJECTS ◆ BEND · REDMOND · SISTERS";

  const cluster = label ? CLUSTER_B : CLUSTER_A;

  return (
    <div style={{ position: "relative", overflow: "visible" }}>
      {/* ── Plant symbols — overflow above the band ── */}
      <div
        style={{
          position: "absolute",
          // Shift upward so plants bleed above the band's top edge
          top: "-52px",
          left: 0,
          right: 0,
          height: "160px",
          pointerEvents: "none",
          zIndex: 10,
          overflow: "visible",
        }}
      >
        <svg
          viewBox="0 0 1200 160"
          preserveAspectRatio="xMidYMid meet"
          width="100%"
          height="160"
          style={{ overflow: "visible", display: "block" }}
        >
          {/* Render largest (back) to smallest (front) */}
          {[...cluster]
            .sort((a, b) => b.r - a.r)
            .map((p, i) => renderPlant(p, i))}
        </svg>
      </div>

      {/* ── Dark band ── */}
      <div
        style={{
          backgroundColor: "oklch(0.22 0.07 155)",
          borderTop: "1px solid oklch(0.30 0.08 155)",
          borderBottom: "1px solid oklch(0.30 0.08 155)",
          height: "80px",
          display: "flex",
          alignItems: "center",
          overflow: "hidden",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Scrolling marquee */}
        <div
          style={{
            display: "flex",
            whiteSpace: "nowrap",
            animation: "marquee-scroll 28s linear infinite",
          }}
        >
          {[0, 1, 2].map((n) => (
            <span
              key={n}
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontStyle: "italic",
                fontSize: "clamp(13px, 1.4vw, 17px)",
                letterSpacing: "0.18em",
                color: "oklch(0.78 0.06 155)",
                paddingRight: "4rem",
                opacity: 0.85,
              }}
            >
              {marqueeText}&nbsp;&nbsp;&nbsp;&nbsp;
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
