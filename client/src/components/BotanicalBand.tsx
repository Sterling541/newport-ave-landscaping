/* ============================================================
   BOTANICAL BAND — Colossal-Style Floating Illustrations
   
   A dark forest-green divider band with 3–4 large, detailed
   botanical illustrations (fern frond, spruce branch, broad
   tropical leaf, ornamental grass) that bleed above the top
   edge — appearing pasted and suspended above the surface.
   
   Art style: Colossal / Botanical illustration — fine linework,
   muted site-palette colors (deep greens, blue-spruce teal,
   warm cream), subtle drop shadows.
   ============================================================ */
import React from "react";

// ── Botanical SVG illustrations ──────────────────────────────

/** Large fern frond — detailed pinnate leaves */
function FernFrond({ style }: { style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 160 280" xmlns="http://www.w3.org/2000/svg" style={style}>
      <defs>
        <filter id="fShadow" x="-20%" y="-10%" width="140%" height="130%">
          <feDropShadow dx="4" dy="8" stdDeviation="6" floodColor="oklch(0.06 0.04 155)" floodOpacity="0.5" />
        </filter>
      </defs>
      <g filter="url(#fShadow)">
        {/* Central stem */}
        <path d="M80 270 C78 220 76 170 80 120 C84 70 82 30 80 10"
          stroke="oklch(0.28 0.08 155)" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
        {/* Left pinnae */}
        {[
          [240, 38, -55], [210, 46, -58], [178, 54, -60],
          [148, 58, -62], [118, 54, -64], [90, 46, -66],
          [64, 36, -68], [40, 24, -70],
        ].map(([y, len, angle], i) => {
          const rad = (angle * Math.PI) / 180;
          const ex = 80 + Math.cos(rad) * len;
          const ey = y + Math.sin(rad) * len;
          const cx1 = 80 + Math.cos(rad + 0.4) * len * 0.5;
          const cy1 = y + Math.sin(rad + 0.4) * len * 0.5;
          return (
            <g key={`l${i}`}>
              <path d={`M80 ${y} Q${cx1} ${cy1} ${ex} ${ey}`}
                stroke="oklch(0.40 0.10 155)" strokeWidth="1.8" fill="none" strokeLinecap="round"/>
              {[0.3, 0.55, 0.78].map((t, j) => {
                const lx = 80 + Math.cos(rad) * len * t;
                const ly = y + Math.sin(rad) * len * t;
                const lr = (angle - 35) * Math.PI / 180;
                return (
                  <ellipse key={j}
                    cx={lx + Math.cos(lr) * 7} cy={ly + Math.sin(lr) * 7}
                    rx={7} ry={3}
                    transform={`rotate(${angle - 35}, ${lx + Math.cos(lr) * 7}, ${ly + Math.sin(lr) * 7})`}
                    fill="oklch(0.36 0.10 155)" opacity="0.75"/>
                );
              })}
            </g>
          );
        })}
        {/* Right pinnae */}
        {[
          [240, 36, -125], [210, 44, -122], [178, 52, -120],
          [148, 56, -118], [118, 52, -116], [90, 44, -114],
          [64, 34, -112], [40, 22, -110],
        ].map(([y, len, angle], i) => {
          const rad = (angle * Math.PI) / 180;
          const ex = 80 + Math.cos(rad) * len;
          const ey = y + Math.sin(rad) * len;
          const cx1 = 80 + Math.cos(rad - 0.4) * len * 0.5;
          const cy1 = y + Math.sin(rad - 0.4) * len * 0.5;
          return (
            <g key={`r${i}`}>
              <path d={`M80 ${y} Q${cx1} ${cy1} ${ex} ${ey}`}
                stroke="oklch(0.40 0.10 155)" strokeWidth="1.8" fill="none" strokeLinecap="round"/>
              {[0.3, 0.55, 0.78].map((t, j) => {
                const lx = 80 + Math.cos(rad) * len * t;
                const ly = y + Math.sin(rad) * len * t;
                const lr = (angle + 35) * Math.PI / 180;
                return (
                  <ellipse key={j}
                    cx={lx + Math.cos(lr) * 7} cy={ly + Math.sin(lr) * 7}
                    rx={7} ry={3}
                    transform={`rotate(${angle + 35}, ${lx + Math.cos(lr) * 7}, ${ly + Math.sin(lr) * 7})`}
                    fill="oklch(0.36 0.10 155)" opacity="0.75"/>
                );
              })}
            </g>
          );
        })}
        <ellipse cx="80" cy="10" rx="5" ry="8" fill="oklch(0.32 0.10 155)"/>
      </g>
    </svg>
  );
}

/** Spruce branch — horizontal with needle clusters */
function SpruceBranch({ style }: { style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 320 180" xmlns="http://www.w3.org/2000/svg" style={style}>
      <defs>
        <filter id="sShadow" x="-10%" y="-20%" width="120%" height="150%">
          <feDropShadow dx="3" dy="6" stdDeviation="7" floodColor="oklch(0.06 0.04 155)" floodOpacity="0.45" />
        </filter>
      </defs>
      <g filter="url(#sShadow)">
        <path d="M10 100 C60 95 120 88 180 90 C240 92 290 85 310 80"
          stroke="oklch(0.26 0.07 155)" strokeWidth="3" fill="none" strokeLinecap="round"/>
        {[
          [40, 97, -1, 42], [80, 92, 1, 50], [120, 89, -1, 48],
          [160, 90, 1, 52], [200, 91, -1, 46], [245, 87, 1, 44], [285, 82, -1, 38],
        ].map(([x, y, dir, len], i) => {
          const angle = dir > 0 ? -75 : -105;
          const rad = (angle * Math.PI) / 180;
          const ex = x + Math.cos(rad) * len;
          const ey = y + Math.sin(rad) * len;
          return (
            <g key={i}>
              <line x1={x} y1={y} x2={ex} y2={ey}
                stroke="oklch(0.30 0.08 155)" strokeWidth="1.5" strokeLinecap="round"/>
              {[0.25, 0.5, 0.75, 1.0].map((t, j) => {
                const nx = x + Math.cos(rad) * len * t;
                const ny = y + Math.sin(rad) * len * t;
                return (
                  <g key={j}>
                    {[-1, 0, 1].map((k) => {
                      const nAngle = (angle + k * 30) * Math.PI / 180;
                      return (
                        <line key={k} x1={nx} y1={ny}
                          x2={nx + Math.cos(nAngle) * 9} y2={ny + Math.sin(nAngle) * 9}
                          stroke="oklch(0.50 0.12 155)" strokeWidth="1" strokeLinecap="round" opacity="0.85"/>
                      );
                    })}
                    <circle cx={nx} cy={ny} r="1.5" fill="oklch(0.42 0.10 155)" opacity="0.6"/>
                  </g>
                );
              })}
            </g>
          );
        })}
        {[50, 100, 150, 200, 260].map((x, i) => (
          <line key={i} x1={x} y1={93 - i * 0.5} x2={x + 6} y2={91 - i * 0.5}
            stroke="oklch(0.20 0.05 155)" strokeWidth="0.8" opacity="0.5"/>
        ))}
      </g>
    </svg>
  );
}

/** Large tropical broad leaf — Monstera-inspired */
function BroadLeaf({ style }: { style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 200 240" xmlns="http://www.w3.org/2000/svg" style={style}>
      <defs>
        <filter id="bShadow" x="-15%" y="-10%" width="130%" height="130%">
          <feDropShadow dx="5" dy="8" stdDeviation="8" floodColor="oklch(0.06 0.04 155)" floodOpacity="0.48" />
        </filter>
      </defs>
      <g filter="url(#bShadow)">
        <path d="M100 235 C98 200 95 165 100 130" stroke="oklch(0.28 0.08 155)" strokeWidth="3" fill="none" strokeLinecap="round"/>
        <path d="M100 130 C80 115 45 100 20 80 C10 65 15 45 30 35 C50 22 75 28 90 45 C95 52 98 65 100 80 C102 65 105 52 110 45 C125 28 150 22 170 35 C185 45 190 65 180 80 C155 100 120 115 100 130Z"
          fill="oklch(0.30 0.09 155)" opacity="0.88"/>
        <path d="M100 130 L100 40" stroke="oklch(0.46 0.10 155)" strokeWidth="1.5" fill="none" opacity="0.7"/>
        {[
          [115, 62, 90, 138, 90], [100, 42, 72, 158, 72],
          [82, 28, 58, 172, 58], [65, 38, 46, 162, 46], [50, 60, 36, 140, 36],
        ].map(([y, lx, ly, rx, ry], i) => (
          <g key={i}>
            <path d={`M100 ${y} Q${(100 + lx) / 2} ${(y + ly) / 2} ${lx} ${ly}`}
              stroke="oklch(0.46 0.10 155)" strokeWidth="1" fill="none" opacity="0.55"/>
            <path d={`M100 ${y} Q${(100 + rx) / 2} ${(y + ry) / 2} ${rx} ${ry}`}
              stroke="oklch(0.46 0.10 155)" strokeWidth="1" fill="none" opacity="0.55"/>
          </g>
        ))}
        {/* Fenestrations */}
        <path d="M62 88 C58 80 55 70 60 62 C65 54 72 52 78 58"
          stroke="oklch(0.16 0.06 155)" strokeWidth="8" fill="none" strokeLinecap="round" opacity="0.9"/>
        <path d="M138 88 C142 80 145 70 140 62 C135 54 128 52 122 58"
          stroke="oklch(0.16 0.06 155)" strokeWidth="8" fill="none" strokeLinecap="round" opacity="0.9"/>
      </g>
    </svg>
  );
}

/** Ornamental grass clump */
function GrassClump({ style }: { style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 140 220" xmlns="http://www.w3.org/2000/svg" style={style}>
      <defs>
        <filter id="gShadow" x="-20%" y="-5%" width="140%" height="120%">
          <feDropShadow dx="3" dy="6" stdDeviation="5" floodColor="oklch(0.06 0.04 155)" floodOpacity="0.4" />
        </filter>
      </defs>
      <g filter="url(#gShadow)">
        {[
          [70, 210, 30, 140, 10, 60, 15, 10],
          [70, 210, 45, 130, 25, 50, 35, 5],
          [70, 210, 60, 120, 50, 40, 55, 8],
          [70, 210, 70, 115, 68, 35, 68, 5],
          [70, 210, 80, 115, 82, 35, 82, 5],
          [70, 210, 90, 120, 95, 40, 98, 8],
          [70, 210, 100, 130, 110, 50, 112, 5],
          [70, 210, 110, 140, 120, 60, 125, 10],
          [70, 210, 118, 150, 130, 80, 132, 30],
        ].map(([sx, sy, cp1x, cp1y, cp2x, cp2y, ex, ey], i) => (
          <path key={i}
            d={`M${sx} ${sy} C${cp1x} ${cp1y} ${cp2x} ${cp2y} ${ex} ${ey}`}
            stroke={i % 3 === 0 ? "oklch(0.52 0.12 155)" : i % 3 === 1 ? "oklch(0.42 0.10 155)" : "oklch(0.60 0.10 165)"}
            strokeWidth={i === 3 || i === 4 ? "2" : "1.5"}
            fill="none" strokeLinecap="round" opacity="0.85"/>
        ))}
        {[[15, 10], [35, 5], [55, 8], [68, 5], [82, 5], [98, 8], [112, 5], [125, 10]].map(([x, y], i) => (
          <ellipse key={i} cx={x} cy={y} rx="2.5" ry="5" fill="oklch(0.60 0.10 165)" opacity="0.7"/>
        ))}
        <ellipse cx="70" cy="210" rx="28" ry="8" fill="oklch(0.20 0.07 155)" opacity="0.6"/>
      </g>
    </svg>
  );
}

// ── Main component ────────────────────────────────────────────

export default function BotanicalBand({ label }: { label?: string }) {
  const marqueeText = label
    ? `${label}  ◆  BUILD  ◆  MAINTAIN  ◆  CENTRAL OREGON  ◆  SINCE 2003  ◆  `
    : "DESIGN  ◆  BUILD  ◆  MAINTAIN  ◆  CENTRAL OREGON  ◆  SINCE 2003  ◆  150+ PROJECTS  ◆  BEND · REDMOND · SISTERS  ◆  ";

  return (
    <div style={{ position: "relative", overflow: "visible", marginTop: "90px" }}>
      {/* ── Floating botanical illustrations — bleed above band ── */}

      {/* Fern frond — far left */}
      <div style={{
        position: "absolute",
        top: "-115px",
        left: "clamp(1.5rem, 6vw, 7rem)",
        width: "clamp(100px, 11vw, 150px)",
        zIndex: 10,
        pointerEvents: "none",
      }}>
        <FernFrond style={{ width: "100%", height: "auto" }} />
      </div>

      {/* Spruce branch — center-left, wider */}
      <div style={{
        position: "absolute",
        top: "-62px",
        left: "clamp(12rem, 22vw, 28rem)",
        width: "clamp(200px, 24vw, 310px)",
        zIndex: 10,
        pointerEvents: "none",
      }}>
        <SpruceBranch style={{ width: "100%", height: "auto" }} />
      </div>

      {/* Grass clump — center-right */}
      <div style={{
        position: "absolute",
        top: "-100px",
        right: "clamp(12rem, 22vw, 28rem)",
        width: "clamp(80px, 9vw, 120px)",
        zIndex: 10,
        pointerEvents: "none",
      }}>
        <GrassClump style={{ width: "100%", height: "auto" }} />
      </div>

      {/* Broad leaf — far right */}
      <div style={{
        position: "absolute",
        top: "-95px",
        right: "clamp(1.5rem, 6vw, 7rem)",
        width: "clamp(110px, 13vw, 170px)",
        zIndex: 10,
        pointerEvents: "none",
      }}>
        <BroadLeaf style={{ width: "100%", height: "auto" }} />
      </div>

      {/* ── Dark band ── */}
      <div
        style={{
          backgroundColor: "oklch(0.22 0.07 155)",
          borderTop: "1.5px solid oklch(0.30 0.08 155)",
          borderBottom: "1.5px solid oklch(0.30 0.08 155)",
          height: "72px",
          display: "flex",
          alignItems: "center",
          overflow: "hidden",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Optional label tag */}
        {label && (
          <div style={{
            flexShrink: 0,
            padding: "0 1.5rem",
            borderRight: "1px solid oklch(0.30 0.08 155)",
            height: "100%",
            display: "flex",
            alignItems: "center",
          }}>
            <span style={{
              fontFamily: "'Montserrat', sans-serif",
              fontSize: "0.48rem",
              fontWeight: 700,
              letterSpacing: "0.28em",
              textTransform: "uppercase",
              color: "oklch(0.62 0.08 155)",
              whiteSpace: "nowrap",
            }}>
              {label}
            </span>
          </div>
        )}

        {/* Scrolling marquee */}
        <div style={{ display: "flex", overflow: "hidden", flex: 1 }}>
          <div style={{
            display: "flex",
            whiteSpace: "nowrap",
            animation: "marquee-scroll 28s linear infinite",
          }}>
            {[0, 1, 2].map((n) => (
              <span key={n} style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontStyle: "italic",
                fontSize: "clamp(13px, 1.4vw, 18px)",
                letterSpacing: "0.18em",
                color: "oklch(0.75 0.06 155)",
                paddingRight: "4rem",
                opacity: 0.9,
              }}>
                {marqueeText}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
