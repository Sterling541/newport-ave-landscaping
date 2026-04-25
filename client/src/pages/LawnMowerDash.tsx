/* ============================================================
   LAWN MOWER DASH — Radical Overhaul
   Newport Avenue Landscaping
   
   Architecture: Jump/Duck endless runner (Chrome Dino style)
   - 4-layer parallax backgrounds
   - Physics-based jump with double-jump
   - Duck mechanic for high obstacles
   - Animated mower: spinning wheels, blade, dust/grass particles
   - Screen shake, squash/stretch, speed lines
   - Cinematic idle screen with animated mower loop
   - 4 auto-transitioning biomes
   ============================================================ */

import { useEffect, useRef, useState, useCallback } from "react";
import { useLocation } from "wouter";
import { trpc } from "@/lib/trpc";

// ─── CONSTANTS ───────────────────────────────────────────────
const CW = 480;
const CH = 270;
const GROUND_Y = 210;       // y of ground surface
const PLAYER_X = 80;        // fixed x position of mower
const GRAVITY = 0.55;
const JUMP_VY = -11.5;
const DOUBLE_JUMP_VY = -10;
const DUCK_SCALE = 0.55;
const DISCOUNT_CODE = "MOWMONEY100";
const DOUBLE_CODE = "MOWMONEY200";
const LB_KEY = "nal_mower_v7";

// Biome definitions
const BIOMES = [
  {
    name: "Residential Route",
    tagline: "Dodge the toys. Mow the lawn.",
    skyTop: "#1a6b9e", skyBot: "#87ceeb",
    groundTop: "#5aaf3c", groundBot: "#2a7a18",
    horizonColor: "#a8d4a0",
    startDist: 0,
  },
  {
    name: "HOA Gauntlet",
    tagline: "No loud noises past 10.",
    skyTop: "#1a4a7a", skyBot: "#6a9ed8",
    groundTop: "#3a9a28", groundBot: "#1a6a10",
    horizonColor: "#88c888",
    startDist: 1500,
  },
  {
    name: "Construction Site",
    tagline: "Hard hats required.",
    skyTop: "#8a6a30", skyBot: "#c8a870",
    groundTop: "#b88a40", groundBot: "#7a5820",
    horizonColor: "#c8a060",
    startDist: 3500,
  },
  {
    name: "Drought Zone",
    tagline: "Pray for rain.",
    skyTop: "#8a2a0a", skyBot: "#e87030",
    groundTop: "#c89040", groundBot: "#7a5010",
    horizonColor: "#d8a050",
    startDist: 6000,
  },
];

type GameState = "idle" | "playing" | "dead" | "enter_initials" | "won" | "double_or_nothing" | "boss_fight" | "boss_lost";

interface Particle {
  x: number; y: number; vx: number; vy: number;
  life: number; maxLife: number; color: string; size: number; gravity?: number;
}

interface Obstacle {
  x: number; w: number; h: number; type: string;
  y: number; // top of obstacle
  frame: number;
}

interface Coin {
  x: number; y: number; collected: boolean; frame: number;
}

interface Cloud {
  x: number; y: number; w: number; h: number; speed: number;
}

interface BgElement {
  x: number; y: number; type: string; scale: number;
}

interface LeaderEntry { initials: string; score: number; dist: number; }

function loadLB(): LeaderEntry[] {
  try { return JSON.parse(localStorage.getItem(LB_KEY) ?? "[]") || []; } catch { return []; }
}
function saveLB(lb: LeaderEntry[]) {
  try { localStorage.setItem(LB_KEY, JSON.stringify(lb)); } catch {}
}

// ─── DRAW HELPERS ────────────────────────────────────────────
function r(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, c: string) {
  ctx.fillStyle = c; ctx.fillRect(~~x, ~~y, ~~w, ~~h);
}
function rr(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, rad: number, c: string) {
  ctx.fillStyle = c; ctx.beginPath(); ctx.roundRect(~~x, ~~y, ~~w, ~~h, rad); ctx.fill();
}
function circ(ctx: CanvasRenderingContext2D, x: number, y: number, rad: number, c: string) {
  ctx.fillStyle = c; ctx.beginPath(); ctx.arc(x, y, rad, 0, Math.PI * 2); ctx.fill();
}
function txt(ctx: CanvasRenderingContext2D, s: string, x: number, y: number, size: number, c: string, align: CanvasTextAlign = "center", bold = true) {
  ctx.font = `${bold ? "bold " : ""}${size}px 'Courier New', monospace`;
  ctx.textAlign = align; ctx.textBaseline = "middle";
  ctx.fillStyle = "rgba(0,0,0,0.5)"; ctx.fillText(s, x + 1, y + 1);
  ctx.fillStyle = c; ctx.fillText(s, x, y);
}
function txtNoShadow(ctx: CanvasRenderingContext2D, s: string, x: number, y: number, size: number, c: string, align: CanvasTextAlign = "center", bold = true) {
  ctx.font = `${bold ? "bold " : ""}${size}px 'Courier New', monospace`;
  ctx.textAlign = align; ctx.textBaseline = "middle";
  ctx.fillStyle = c; ctx.fillText(s, x, y);
}

// ─── MOWER SPRITE ────────────────────────────────────────────
function drawMower(
  ctx: CanvasRenderingContext2D,
  cx: number, cy: number,
  wheelFrame: number,
  scaleX = 1, scaleY = 1,
  hurt = false,
  ducking = false
) {
  if (hurt && Math.floor(wheelFrame / 3) % 2 === 0) return;

  ctx.save();
  ctx.translate(cx, cy);
  ctx.scale(scaleX, scaleY);

  const duckMod = ducking ? 0.6 : 1;
  const W = 72 * duckMod;
  const H = 44 * duckMod;
  const ox = -W / 2;
  const oy = -H;

  // Ground shadow
  ctx.fillStyle = "rgba(0,0,0,0.25)";
  ctx.beginPath(); ctx.ellipse(0, 2, W * 0.48, 5 * duckMod, 0, 0, Math.PI * 2); ctx.fill();

  // ── REAR LARGE WHEEL ──
  const rWheelX = ox + 12;
  const rWheelY = oy + H - 2;
  const rWheelR = ducking ? 10 : 14;
  circ(ctx, rWheelX, rWheelY, rWheelR, "#1a1a1a");
  circ(ctx, rWheelX, rWheelY, rWheelR - 3, "#2a2a2a");
  circ(ctx, rWheelX, rWheelY, rWheelR - 7, "#444");
  // tire tread
  for (let i = 0; i < 6; i++) {
    const a = (i * 60 + wheelFrame * 5) * Math.PI / 180;
    ctx.strokeStyle = "#333"; ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(rWheelX + Math.cos(a) * (rWheelR - 7), rWheelY + Math.sin(a) * (rWheelR - 7));
    ctx.lineTo(rWheelX + Math.cos(a) * (rWheelR - 2), rWheelY + Math.sin(a) * (rWheelR - 2));
    ctx.stroke();
  }
  circ(ctx, rWheelX, rWheelY, 3, "#666");

  // ── FRONT SMALL WHEEL ──
  const fWheelX = ox + W - 10;
  const fWheelY = oy + H - 2;
  const fWheelR = ducking ? 7 : 9;
  circ(ctx, fWheelX, fWheelY, fWheelR, "#1a1a1a");
  circ(ctx, fWheelX, fWheelY, fWheelR - 2, "#2a2a2a");
  circ(ctx, fWheelX, fWheelY, fWheelR - 4, "#444");
  for (let i = 0; i < 4; i++) {
    const a = (i * 90 + wheelFrame * 6) * Math.PI / 180;
    ctx.strokeStyle = "#333"; ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(fWheelX + Math.cos(a) * (fWheelR - 4), fWheelY + Math.sin(a) * (fWheelR - 4));
    ctx.lineTo(fWheelX + Math.cos(a) * (fWheelR - 1), fWheelY + Math.sin(a) * (fWheelR - 1));
    ctx.stroke();
  }

  // ── MAIN BODY / FRAME ──
  rr(ctx, ox + 6, oy + H * 0.3, W - 12, H * 0.55, 3, "#2a2a2a");

  // ── RED CUTTING DECK ──
  const deckY = oy + H * 0.52;
  const deckH = H * 0.28;
  rr(ctx, ox + 4, deckY, W - 8, deckH, 2, "#cc1111");
  rr(ctx, ox + 4, deckY, W - 8, deckH * 0.4, 2, "#ee2222"); // highlight
  ctx.strokeStyle = "#880000"; ctx.lineWidth = 1.5;
  ctx.beginPath(); ctx.roundRect(ox + 4, deckY, W - 8, deckH, 2); ctx.stroke();

  // Blade spinner
  const bladeA = (wheelFrame * 9) * Math.PI / 180;
  const bladeCX = ox + W * 0.5;
  const bladeCY = deckY + deckH * 0.5;
  ctx.strokeStyle = "rgba(255,255,255,0.25)"; ctx.lineWidth = 1.5;
  for (let i = 0; i < 3; i++) {
    const a = bladeA + i * (Math.PI * 2 / 3);
    ctx.beginPath();
    ctx.moveTo(bladeCX + Math.cos(a) * 3, bladeCY + Math.sin(a) * 3);
    ctx.lineTo(bladeCX + Math.cos(a) * 9, bladeCY + Math.sin(a) * 9);
    ctx.stroke();
  }

  // NAVIGATOR text
  ctx.font = "bold 5px 'Courier New', monospace";
  ctx.textAlign = "center"; ctx.textBaseline = "middle";
  ctx.fillStyle = "rgba(255,255,255,0.8)";
  ctx.fillText("NAVIGATOR", ox + W * 0.52, deckY + deckH * 0.5);

  // ── WHITE HOPPER (grass catcher) ──
  const hopperW = W * 0.36;
  const hopperH = H * 0.62;
  rr(ctx, ox + 2, oy + H * 0.05, hopperW, hopperH, 3, "#e0e0e0");
  rr(ctx, ox + 2, oy + H * 0.05, hopperW, hopperH * 0.25, 3, "#f0f0f0");
  ctx.strokeStyle = "#b0b0b0"; ctx.lineWidth = 1.5;
  ctx.beginPath(); ctx.roundRect(ox + 2, oy + H * 0.05, hopperW, hopperH, 3); ctx.stroke();
  // vent slats
  for (let i = 0; i < 3; i++) {
    r(ctx, ox + 6, oy + H * 0.3 + i * (hopperH * 0.18), hopperW - 8, 2, "#ccc");
  }
  // EXMARK label
  ctx.font = "bold 4px 'Courier New', monospace";
  ctx.textAlign = "center"; ctx.textBaseline = "middle";
  ctx.fillStyle = "#cc1111";
  ctx.fillText("EXMARK", ox + 2 + hopperW / 2, oy + H * 0.05 + hopperH * 0.82);

  if (!ducking) {
    // ── OPERATOR ──
    const opX = ox + W * 0.46;
    const opY = oy + H * 0.04;

    // Seat
    rr(ctx, opX - 2, opY + 22, 18, 7, 2, "#5a3010");

    // Legs (seated)
    r(ctx, opX + 2, opY + 24, 6, 10, "#1a1a4a");
    r(ctx, opX + 8, opY + 24, 6, 10, "#1a1a4a");
    rr(ctx, opX, opY + 32, 8, 4, 1, "#111");
    rr(ctx, opX + 8, opY + 32, 8, 4, 1, "#111");

    // Torso — red NAL shirt
    rr(ctx, opX, opY + 8, 16, 16, 2, "#cc1111");
    r(ctx, opX + 2, opY + 8, 12, 5, "#dd2222");
    ctx.strokeStyle = "#880000"; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.roundRect(opX, opY + 8, 16, 16, 2); ctx.stroke();

    // Arms
    r(ctx, opX - 4, opY + 10, 6, 9, "#cc1111");
    r(ctx, opX + 16, opY + 10, 6, 9, "#cc1111");
    rr(ctx, opX - 5, opY + 17, 7, 5, 2, "#f4c07a");
    rr(ctx, opX + 16, opY + 17, 7, 5, 2, "#f4c07a");

    // Head
    rr(ctx, opX + 2, opY - 2, 12, 12, 2, "#f4c07a");
    ctx.strokeStyle = "#c8843a"; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.roundRect(opX + 2, opY - 2, 12, 12, 2); ctx.stroke();
    // Eyes
    r(ctx, opX + 4, opY + 1, 2, 2, "#111");
    r(ctx, opX + 8, opY + 1, 2, 2, "#111");
    // Smile
    r(ctx, opX + 5, opY + 6, 4, 1, "#c8843a");

    // Cap — red NAL
    rr(ctx, opX + 1, opY - 7, 14, 6, 1, "#cc1111");
    r(ctx, opX + 1, opY - 7, 14, 2, "#ee2222");
    ctx.strokeStyle = "#880000"; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.roundRect(opX + 1, opY - 7, 14, 6, 1); ctx.stroke();
    r(ctx, opX + 11, opY - 5, 7, 3, "#cc1111"); // brim
    ctx.font = "bold 3px 'Courier New', monospace";
    ctx.textAlign = "center"; ctx.textBaseline = "middle";
    ctx.fillStyle = "#fff";
    ctx.fillText("NAL", opX + 8, opY - 4);
  }

  ctx.restore();
}

// ─── OBSTACLE SPRITES ────────────────────────────────────────
function drawObstacle(ctx: CanvasRenderingContext2D, obs: Obstacle) {
  const { x, y, w, h, type, frame } = obs;
  ctx.save();

  switch (type) {
    case "rock": {
      // Chunky rock
      ctx.fillStyle = "#7a7a7a";
      ctx.beginPath();
      ctx.moveTo(x + w * 0.1, y + h);
      ctx.lineTo(x, y + h * 0.6);
      ctx.lineTo(x + w * 0.15, y + h * 0.2);
      ctx.lineTo(x + w * 0.4, y);
      ctx.lineTo(x + w * 0.7, y + h * 0.05);
      ctx.lineTo(x + w, y + h * 0.35);
      ctx.lineTo(x + w * 0.9, y + h);
      ctx.closePath(); ctx.fill();
      ctx.fillStyle = "#9a9a9a";
      ctx.beginPath();
      ctx.moveTo(x + w * 0.2, y + h * 0.25);
      ctx.lineTo(x + w * 0.5, y + h * 0.05);
      ctx.lineTo(x + w * 0.75, y + h * 0.2);
      ctx.lineTo(x + w * 0.55, y + h * 0.5);
      ctx.lineTo(x + w * 0.25, y + h * 0.45);
      ctx.closePath(); ctx.fill();
      ctx.strokeStyle = "#555"; ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(x + w * 0.1, y + h);
      ctx.lineTo(x, y + h * 0.6);
      ctx.lineTo(x + w * 0.15, y + h * 0.2);
      ctx.lineTo(x + w * 0.4, y);
      ctx.lineTo(x + w * 0.7, y + h * 0.05);
      ctx.lineTo(x + w, y + h * 0.35);
      ctx.lineTo(x + w * 0.9, y + h);
      ctx.closePath(); ctx.stroke();
      break;
    }
    case "stump": {
      // Tree stump
      rr(ctx, x + w * 0.15, y, w * 0.7, h * 0.7, 2, "#6b4020");
      ctx.strokeStyle = "#3a1a00"; ctx.lineWidth = 1.5;
      ctx.beginPath(); ctx.roundRect(x + w * 0.15, y, w * 0.7, h * 0.7, 2); ctx.stroke();
      // rings
      ctx.fillStyle = "#7a5030";
      ctx.beginPath(); ctx.ellipse(x + w * 0.5, y, w * 0.35, h * 0.12, 0, 0, Math.PI * 2); ctx.fill();
      ctx.strokeStyle = "#3a1a00"; ctx.lineWidth = 1;
      ctx.beginPath(); ctx.ellipse(x + w * 0.5, y, w * 0.35, h * 0.12, 0, 0, Math.PI * 2); ctx.stroke();
      ctx.beginPath(); ctx.ellipse(x + w * 0.5, y, w * 0.2, h * 0.07, 0, 0, Math.PI * 2); ctx.stroke();
      // roots
      rr(ctx, x, y + h * 0.65, w, h * 0.35, 2, "#8a5a28");
      ctx.strokeStyle = "#3a1a00"; ctx.lineWidth = 1;
      ctx.beginPath(); ctx.roundRect(x, y + h * 0.65, w, h * 0.35, 2); ctx.stroke();
      break;
    }
    case "fire_ants": {
      // Mound
      ctx.fillStyle = "#c8703a";
      ctx.beginPath(); ctx.ellipse(x + w * 0.5, y + h, w * 0.5, h * 0.5, 0, Math.PI, 0); ctx.fill();
      ctx.fillStyle = "#a04c18";
      ctx.beginPath(); ctx.ellipse(x + w * 0.5, y + h, w * 0.35, h * 0.35, 0, Math.PI, 0); ctx.fill();
      // Ants
      for (let i = 0; i < 5; i++) {
        const ax = x + w * 0.2 + i * w * 0.15 + Math.sin(frame * 0.2 + i) * 3;
        const ay = y + h * 0.3 - i * h * 0.08;
        circ(ctx, ax, ay, 2.5, "#111");
        circ(ctx, ax + 4, ay, 1.5, "#111");
        circ(ctx, ax - 4, ay, 1.5, "#111");
      }
      // ! warning
      ctx.font = "bold 12px 'Courier New', monospace";
      ctx.textAlign = "center"; ctx.textBaseline = "middle";
      ctx.fillStyle = "#ff4400";
      ctx.fillText("!", x + w * 0.5, y - 6);
      break;
    }
    case "tricycle": {
      // Frame
      ctx.strokeStyle = "#e84040"; ctx.lineWidth = 3;
      ctx.beginPath(); ctx.moveTo(x + w * 0.35, y + h * 0.3); ctx.lineTo(x + w * 0.65, y + h * 0.3); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(x + w * 0.35, y + h * 0.3); ctx.lineTo(x + w * 0.2, y + h * 0.8); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(x + w * 0.65, y + h * 0.3); ctx.lineTo(x + w * 0.8, y + h * 0.8); ctx.stroke();
      // Wheels
      const wSpin = (frame * 4) * Math.PI / 180;
      [x + w * 0.2, x + w * 0.8].forEach(wx => {
        circ(ctx, wx, y + h * 0.85, w * 0.18, "#111");
        circ(ctx, wx, y + h * 0.85, w * 0.1, "#333");
        ctx.strokeStyle = "#555"; ctx.lineWidth = 1.5;
        for (let i = 0; i < 4; i++) {
          const a = wSpin + i * Math.PI / 2;
          ctx.beginPath();
          ctx.moveTo(wx + Math.cos(a) * w * 0.04, y + h * 0.85 + Math.sin(a) * w * 0.04);
          ctx.lineTo(wx + Math.cos(a) * w * 0.1, y + h * 0.85 + Math.sin(a) * w * 0.1);
          ctx.stroke();
        }
      });
      // Seat
      rr(ctx, x + w * 0.28, y + h * 0.15, w * 0.44, h * 0.18, 2, "#2244cc");
      // Handlebars
      r(ctx, x + w * 0.58, y, w * 0.04, h * 0.32, "#888");
      r(ctx, x + w * 0.48, y, w * 0.2, h * 0.06, "#888");
      break;
    }
    case "hoa_sign": {
      // Post
      r(ctx, x + w * 0.45, y + h * 0.5, w * 0.1, h * 0.5, "#888");
      // Sign board
      rr(ctx, x + w * 0.05, y, w * 0.9, h * 0.52, 3, "#cc1111");
      ctx.strokeStyle = "#880000"; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.roundRect(x + w * 0.05, y, w * 0.9, h * 0.52, 3); ctx.stroke();
      // Text
      ctx.font = "bold 6px 'Courier New', monospace";
      ctx.textAlign = "center"; ctx.textBaseline = "middle";
      ctx.fillStyle = "#fff";
      ctx.fillText("HOA", x + w * 0.5, y + h * 0.15);
      ctx.fillText("VIOLATION", x + w * 0.5, y + h * 0.3);
      ctx.font = "bold 4px 'Courier New', monospace";
      ctx.fillText("NO LOUD NOISES", x + w * 0.5, y + h * 0.44);
      break;
    }
    case "branch": {
      // Hanging branch (high obstacle — duck under)
      r(ctx, x, y, w, h * 0.3, "#5a3010");
      ctx.strokeStyle = "#3a1a00"; ctx.lineWidth = 1.5;
      ctx.strokeRect(x, y, w, h * 0.3);
      // Leaves
      const leafColors = ["#2a7a18", "#3a8a28", "#4a9a38"];
      for (let i = 0; i < 6; i++) {
        const lx = x + w * 0.1 + i * w * 0.14;
        const ly = y + h * 0.3 + Math.sin(frame * 0.05 + i) * 3;
        ctx.fillStyle = leafColors[i % 3];
        ctx.beginPath();
        ctx.ellipse(lx, ly + 6, 6, 9, Math.sin(i) * 0.5, 0, Math.PI * 2);
        ctx.fill();
      }
      // Rope/chain from top
      ctx.strokeStyle = "#888"; ctx.lineWidth = 2; ctx.setLineDash([3, 2]);
      ctx.beginPath(); ctx.moveTo(x + w * 0.5, 0); ctx.lineTo(x + w * 0.5, y); ctx.stroke();
      ctx.setLineDash([]);
      break;
    }
    case "cone": {
      // Traffic cone
      ctx.fillStyle = "#ff6600";
      ctx.beginPath();
      ctx.moveTo(x + w * 0.5, y);
      ctx.lineTo(x + w * 0.1, y + h * 0.85);
      ctx.lineTo(x + w * 0.9, y + h * 0.85);
      ctx.closePath(); ctx.fill();
      ctx.fillStyle = "#fff";
      ctx.beginPath();
      ctx.moveTo(x + w * 0.38, y + h * 0.38);
      ctx.lineTo(x + w * 0.62, y + h * 0.38);
      ctx.lineTo(x + w * 0.68, y + h * 0.55);
      ctx.lineTo(x + w * 0.32, y + h * 0.55);
      ctx.closePath(); ctx.fill();
      rr(ctx, x + w * 0.05, y + h * 0.83, w * 0.9, h * 0.17, 1, "#ff6600");
      ctx.strokeStyle = "#cc4400"; ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(x + w * 0.5, y);
      ctx.lineTo(x + w * 0.1, y + h * 0.85);
      ctx.lineTo(x + w * 0.9, y + h * 0.85);
      ctx.closePath(); ctx.stroke();
      break;
    }
    case "porta_potty": {
      rr(ctx, x + w * 0.1, y, w * 0.8, h, 3, "#4488cc");
      ctx.strokeStyle = "#2255aa"; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.roundRect(x + w * 0.1, y, w * 0.8, h, 3); ctx.stroke();
      rr(ctx, x + w * 0.08, y, w * 0.84, h * 0.12, 2, "#3366bb");
      rr(ctx, x + w * 0.3, y + h * 0.4, w * 0.4, h * 0.6, 2, "#3366bb");
      ctx.strokeStyle = "#2255aa"; ctx.lineWidth = 1.5;
      ctx.beginPath(); ctx.roundRect(x + w * 0.3, y + h * 0.4, w * 0.4, h * 0.6, 2); ctx.stroke();
      r(ctx, x + w * 0.62, y + h * 0.55, w * 0.06, h * 0.15, "#f4c430");
      ctx.font = "bold 4px 'Courier New', monospace";
      ctx.textAlign = "center"; ctx.textBaseline = "middle";
      ctx.fillStyle = "#fff";
      ctx.fillText("OCCUPIED", x + w * 0.5, y + h * 0.25);
      if (frame % 10 < 5) {
        ctx.strokeStyle = "rgba(150,200,50,0.5)"; ctx.lineWidth = 1;
        for (let i = 0; i < 3; i++) {
          ctx.beginPath();
          ctx.moveTo(x + w * 0.3 + i * w * 0.15, y);
          ctx.bezierCurveTo(x + w * 0.25 + i * w * 0.15, y - 8, x + w * 0.35 + i * w * 0.15, y - 14, x + w * 0.3 + i * w * 0.15, y - 20);
          ctx.stroke();
        }
      }
      break;
    }
    case "tumbleweed": {
      const roll = (frame * 6) % 360;
      ctx.save(); ctx.translate(x + w * 0.5, y + h * 0.5); ctx.rotate(roll * Math.PI / 180);
      ctx.strokeStyle = "#8a6020"; ctx.lineWidth = 2;
      for (let i = 0; i < 6; i++) {
        const a = i * 60 * Math.PI / 180;
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.bezierCurveTo(Math.cos(a) * 8, Math.sin(a) * 8, Math.cos(a + 0.5) * w * 0.4, Math.sin(a + 0.5) * h * 0.4, Math.cos(a) * w * 0.45, Math.sin(a) * h * 0.45);
        ctx.stroke();
      }
      ctx.strokeStyle = "#a07830"; ctx.lineWidth = 1.5;
      ctx.beginPath(); ctx.arc(0, 0, w * 0.35, 0, Math.PI * 2); ctx.stroke();
      ctx.beginPath(); ctx.arc(0, 0, w * 0.2, 0, Math.PI * 2); ctx.stroke();
      ctx.restore();
      break;
    }
    case "cracked_earth": {
      rr(ctx, x, y, w, h, 2, "#c8903a");
      ctx.strokeStyle = "#8a5a1a"; ctx.lineWidth = 2;
      [[x + w * 0.2, y + h * 0.1, x + w * 0.4, y + h * 0.6, x + w * 0.3, y + h],
       [x + w * 0.6, y, x + w * 0.75, y + h * 0.5, x + w * 0.65, y + h]].forEach(([x1, y1, x2, y2, x3, y3]) => {
        ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.lineTo(x3, y3); ctx.stroke();
      });
      break;
    }
    case "lumber": {
      for (let i = 0; i < 3; i++) {
        const ly = y + h - (i + 1) * (h / 3);
        rr(ctx, x + i * 2, ly, w - i * 4, h / 3 - 2, 1, i % 2 === 0 ? "#c8a060" : "#b08040");
        ctx.strokeStyle = "#7a5020"; ctx.lineWidth = 1;
        ctx.beginPath(); ctx.roundRect(x + i * 2, ly, w - i * 4, h / 3 - 2, 1); ctx.stroke();
        for (let j = 0; j < 3; j++) r(ctx, x + 8 + j * 10 + i * 2, ly + 2, 2, 4, "rgba(0,0,0,0.15)");
      }
      break;
    }
  }

  ctx.restore();
}

// ─── COIN SPRITE ─────────────────────────────────────────────
function drawCoin(ctx: CanvasRenderingContext2D, coin: Coin) {
  if (coin.collected) return;
  const bob = Math.sin(coin.frame * 0.12) * 2;
  const { x, y } = coin;

  // Glow
  const grd = ctx.createRadialGradient(x, y + bob, 1, x, y + bob, 12);
  grd.addColorStop(0, "rgba(255,220,0,0.5)");
  grd.addColorStop(1, "rgba(255,220,0,0)");
  ctx.fillStyle = grd;
  ctx.beginPath(); ctx.arc(x, y + bob, 12, 0, Math.PI * 2); ctx.fill();

  // Coin body
  circ(ctx, x, y + bob, 7, "#f4c430");
  circ(ctx, x, y + bob, 5, "#ffd700");
  ctx.strokeStyle = "#c8a000"; ctx.lineWidth = 1.5;
  ctx.beginPath(); ctx.arc(x, y + bob, 7, 0, Math.PI * 2); ctx.stroke();

  // $ symbol
  ctx.font = "bold 7px 'Courier New', monospace";
  ctx.textAlign = "center"; ctx.textBaseline = "middle";
  ctx.fillStyle = "#c8a000";
  ctx.fillText("$", x, y + bob);
}

// ─── PARALLAX BACKGROUNDS ────────────────────────────────────
function drawBackground(
  ctx: CanvasRenderingContext2D,
  biomeIdx: number,
  scrollX: number,
  frame: number,
  clouds: Cloud[],
  bgElements: BgElement[]
) {
  const biome = BIOMES[biomeIdx];

  // ── SKY GRADIENT ──
  const skyGrad = ctx.createLinearGradient(0, 0, 0, GROUND_Y);
  skyGrad.addColorStop(0, biome.skyTop);
  skyGrad.addColorStop(1, biome.skyBot);
  ctx.fillStyle = skyGrad; ctx.fillRect(0, 0, CW, GROUND_Y);

  // ── SUN / MOON ──
  if (biomeIdx < 2) {
    // Sun
    const sunX = CW * 0.82;
    const sunY = GROUND_Y * 0.22;
    const sunGrd = ctx.createRadialGradient(sunX, sunY, 2, sunX, sunY, 22);
    sunGrd.addColorStop(0, "rgba(255,240,180,1)");
    sunGrd.addColorStop(0.5, "rgba(255,220,100,0.8)");
    sunGrd.addColorStop(1, "rgba(255,200,50,0)");
    ctx.fillStyle = sunGrd;
    ctx.beginPath(); ctx.arc(sunX, sunY, 22, 0, Math.PI * 2); ctx.fill();
    circ(ctx, sunX, sunY, 12, "#fff8d0");
  } else if (biomeIdx === 3) {
    // Angry sun (drought)
    const sunX = CW * 0.82;
    const sunY = GROUND_Y * 0.25;
    circ(ctx, sunX, sunY, 18, "#ff8800");
    circ(ctx, sunX, sunY, 12, "#ffcc00");
    ctx.strokeStyle = "#ff6600"; ctx.lineWidth = 2;
    for (let i = 0; i < 8; i++) {
      const a = (i * 45 + frame * 0.5) * Math.PI / 180;
      ctx.beginPath();
      ctx.moveTo(sunX + Math.cos(a) * 20, sunY + Math.sin(a) * 20);
      ctx.lineTo(sunX + Math.cos(a) * 28, sunY + Math.sin(a) * 28);
      ctx.stroke();
    }
  }

  // ── CLOUDS (layer 1 — slowest) ──
  ctx.fillStyle = biomeIdx < 2 ? "rgba(255,255,255,0.92)" : "rgba(200,180,140,0.5)";
  clouds.forEach(cloud => {
    ctx.beginPath();
    ctx.ellipse(cloud.x, cloud.y, cloud.w, cloud.h, 0, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath();
    ctx.ellipse(cloud.x - cloud.w * 0.5, cloud.y + cloud.h * 0.3, cloud.w * 0.65, cloud.h * 0.7, 0, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath();
    ctx.ellipse(cloud.x + cloud.w * 0.5, cloud.y + cloud.h * 0.3, cloud.w * 0.65, cloud.h * 0.7, 0, 0, Math.PI * 2); ctx.fill();
  });

  // ── FAR BACKGROUND ELEMENTS (layer 2 — slow) ──
  bgElements.forEach(el => {
    if (el.y > GROUND_Y * 0.6) return; // only far elements here
    ctx.save(); ctx.translate(el.x, el.y); ctx.scale(el.scale, el.scale);
    drawBgElement(ctx, el.type, biomeIdx);
    ctx.restore();
  });

  // ── HORIZON LINE ──
  const horizGrad = ctx.createLinearGradient(0, GROUND_Y - 20, 0, GROUND_Y + 10);
  horizGrad.addColorStop(0, biome.horizonColor);
  horizGrad.addColorStop(1, biome.groundTop);
  ctx.fillStyle = horizGrad; ctx.fillRect(0, GROUND_Y - 20, CW, 30);

  // ── GROUND ──
  const groundGrad = ctx.createLinearGradient(0, GROUND_Y, 0, CH);
  groundGrad.addColorStop(0, biome.groundTop);
  groundGrad.addColorStop(1, biome.groundBot);
  ctx.fillStyle = groundGrad; ctx.fillRect(0, GROUND_Y, CW, CH - GROUND_Y);

  // Ground texture — mow stripes
  for (let i = 0; i < 8; i++) {
    ctx.fillStyle = i % 2 === 0 ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.04)";
    ctx.fillRect(0, GROUND_Y + i * ((CH - GROUND_Y) / 8), CW, (CH - GROUND_Y) / 8);
  }

  // Ground line
  ctx.strokeStyle = "rgba(0,0,0,0.2)"; ctx.lineWidth = 1.5;
  ctx.beginPath(); ctx.moveTo(0, GROUND_Y); ctx.lineTo(CW, GROUND_Y); ctx.stroke();

  // ── MID BACKGROUND ELEMENTS (layer 3 — medium) ──
  bgElements.forEach(el => {
    if (el.y <= GROUND_Y * 0.6 || el.y > GROUND_Y * 0.85) return;
    ctx.save(); ctx.translate(el.x, el.y); ctx.scale(el.scale, el.scale);
    drawBgElement(ctx, el.type, biomeIdx);
    ctx.restore();
  });

  // ── NEAR BACKGROUND ELEMENTS (layer 4 — faster) ──
  bgElements.forEach(el => {
    if (el.y <= GROUND_Y * 0.85) return;
    ctx.save(); ctx.translate(el.x, el.y); ctx.scale(el.scale, el.scale);
    drawBgElement(ctx, el.type, biomeIdx);
    ctx.restore();
  });
}

function drawBgElement(ctx: CanvasRenderingContext2D, type: string, biomeIdx: number) {
  switch (type) {
    case "house": {
      r(ctx, -28, -36, 56, 36, "#f5e6d0");
      ctx.strokeStyle = "#c8a880"; ctx.lineWidth = 1;
      ctx.strokeRect(-28, -36, 56, 36);
      ctx.fillStyle = "#8B4513";
      ctx.beginPath(); ctx.moveTo(-32, -36); ctx.lineTo(0, -56); ctx.lineTo(32, -36); ctx.closePath(); ctx.fill();
      r(ctx, -8, -16, 16, 16, "#8B4513");
      r(ctx, -20, -28, 12, 10, "#87ceeb");
      r(ctx, 8, -28, 12, 10, "#87ceeb");
      ctx.strokeStyle = "#888"; ctx.lineWidth = 0.5;
      ctx.strokeRect(-20, -28, 12, 10); ctx.strokeRect(8, -28, 12, 10);
      break;
    }
    case "tree": {
      r(ctx, -4, -8, 8, 24, "#5a3010");
      ctx.fillStyle = "#2a7a18";
      ctx.beginPath(); ctx.arc(0, -20, 18, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = "#3a8a28";
      ctx.beginPath(); ctx.arc(-6, -26, 12, 0, Math.PI * 2); ctx.fill();
      ctx.beginPath(); ctx.arc(8, -24, 10, 0, Math.PI * 2); ctx.fill();
      break;
    }
    case "dead_tree": {
      r(ctx, -4, -40, 8, 40, "#5a3010");
      ctx.strokeStyle = "#5a3010"; ctx.lineWidth = 3;
      [[-20, -30, 0, -22], [18, -26, 0, -20], [-14, -14, 0, -10], [12, -12, 0, -8]].forEach(([x1, y1, x2, y2]) => {
        ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke();
      });
      break;
    }
    case "fence_post": {
      r(ctx, -3, -18, 6, 18, "#f0f0f0");
      ctx.fillStyle = "#f0f0f0";
      ctx.beginPath(); ctx.moveTo(-3, -18); ctx.lineTo(0, -24); ctx.lineTo(3, -18); ctx.closePath(); ctx.fill();
      break;
    }
    case "fence_rail": {
      r(ctx, -40, -14, 80, 3, "#f0f0f0");
      r(ctx, -40, -7, 80, 3, "#f0f0f0");
      break;
    }
    case "building_frame": {
      ctx.strokeStyle = "#777"; ctx.lineWidth = 3;
      for (let i = 0; i < 3; i++) { ctx.beginPath(); ctx.moveTo(-40 + i * 40, -80); ctx.lineTo(-40 + i * 40, 0); ctx.stroke(); }
      for (let i = 0; i < 4; i++) { ctx.beginPath(); ctx.moveTo(-40, -20 * i); ctx.lineTo(40, -20 * i); ctx.stroke(); }
      break;
    }
    case "cactus": {
      r(ctx, -5, -36, 10, 36, "#3a7a2a");
      r(ctx, -18, -22, 14, 6, "#3a7a2a");
      r(ctx, -18, -28, 6, 12, "#3a7a2a");
      r(ctx, 4, -18, 14, 6, "#3a7a2a");
      r(ctx, 10, -24, 6, 12, "#3a7a2a");
      ctx.strokeStyle = "#2a5a1a"; ctx.lineWidth = 1;
      ctx.strokeRect(-5, -36, 10, 36);
      break;
    }
    case "hoa_house": {
      r(ctx, -30, -38, 60, 38, "#e8dcc8");
      ctx.strokeStyle = "#c8b898"; ctx.lineWidth = 1; ctx.strokeRect(-30, -38, 60, 38);
      ctx.fillStyle = "#6a3a1a";
      ctx.beginPath(); ctx.moveTo(-34, -38); ctx.lineTo(0, -58); ctx.lineTo(34, -38); ctx.closePath(); ctx.fill();
      r(ctx, -10, -18, 20, 18, "#6a3a1a");
      r(ctx, -22, -30, 14, 12, "#87ceeb");
      r(ctx, 8, -30, 14, 12, "#87ceeb");
      // HOA flag
      r(ctx, 26, -52, 2, 18, "#888");
      rr(ctx, 28, -52, 12, 8, 1, "#cc1111");
      break;
    }
  }
}


// ─── HUD ─────────────────────────────────────────────────────
function drawHUD(
  ctx: CanvasRenderingContext2D,
  dist: number, coins: number, lives: number,
  speed: number, lb: LeaderEntry[], frame: number,
  biomeIdx: number, biomeTransition: number
) {
  // Top bar gradient
  const barGrad = ctx.createLinearGradient(0, 0, 0, 28);
  barGrad.addColorStop(0, "rgba(0,0,0,0.82)");
  barGrad.addColorStop(1, "rgba(0,0,0,0.55)");
  ctx.fillStyle = barGrad; ctx.fillRect(0, 0, CW, 28);

  // Biome badge (left)
  const biome = BIOMES[biomeIdx];
  rr(ctx, 4, 4, 6, 20, 2, "#cc1111");
  txtNoShadow(ctx, biome.name.toUpperCase(), 14, 14, 5.5, "#f4c430", "left");

  // Distance (center)
  const distStr = `${dist}ft`;
  ctx.font = "bold 12px 'Courier New', monospace";
  ctx.textAlign = "center"; ctx.textBaseline = "middle";
  ctx.fillStyle = "rgba(0,0,0,0.5)"; ctx.fillText(distStr, CW / 2 + 1, 14 + 1);
  ctx.fillStyle = "#fff"; ctx.fillText(distStr, CW / 2, 14);

  // Speed indicator
  const mph = Math.round(speed * 8);
  ctx.font = "bold 6px 'Courier New', monospace";
  ctx.textAlign = "center"; ctx.textBaseline = "middle";
  ctx.fillStyle = speed > 6 ? "#ff6600" : "#aaa";
  ctx.fillText(`${mph}mph`, CW / 2, 23);

  // Coins (right of center)
  rr(ctx, CW / 2 + 38, 6, 40, 16, 3, "rgba(0,0,0,0.5)");
  circ(ctx, CW / 2 + 48, 14, 5, "#f4c430");
  ctx.font = "bold 5px 'Courier New', monospace";
  ctx.textAlign = "center"; ctx.textBaseline = "middle";
  ctx.fillStyle = "#c8a000"; ctx.fillText("$", CW / 2 + 48, 14);
  ctx.font = "bold 7px 'Courier New', monospace";
  ctx.textAlign = "left"; ctx.textBaseline = "middle";
  ctx.fillStyle = "#f4c430"; ctx.fillText(`${coins}`, CW / 2 + 56, 14);

  // Lives (far right)
  for (let i = 0; i < 3; i++) {
    const hx = CW - 10 - i * 16;
    const hy = 14;
    const filled = i < lives;
    circ(ctx, hx, hy, 6, filled ? "#cc1111" : "rgba(100,0,0,0.4)");
    if (filled) {
      circ(ctx, hx - 2, hy - 2, 2.5, "#ee2222");
    }
  }

  // Biome transition flash
  if (biomeTransition > 0) {
    const alpha = Math.min(biomeTransition / 20, 1) * 0.7;
    ctx.fillStyle = `rgba(255,255,255,${alpha})`;
    ctx.fillRect(0, 0, CW, CH);
    if (biomeTransition > 10) {
      txt(ctx, biome.name.toUpperCase(), CW / 2, CH / 2 - 10, 14, "#f4c430");
      txt(ctx, biome.tagline, CW / 2, CH / 2 + 10, 7, "#fff");
    }
  }

  // Speed milestone flash
  if (frame % 300 < 20 && frame > 60) {
    const a = Math.sin((frame % 300) * Math.PI / 20);
    ctx.fillStyle = `rgba(255,100,0,${a * 0.15})`;
    ctx.fillRect(0, 0, CW, CH);
    if (frame % 300 < 10) {
      txt(ctx, "FASTER!", CW / 2, CH * 0.4, 16, "#ff6600");
    }
  }

  // Leaderboard (top right corner)
  const lbX = CW - 88, lbY = 32;
  rr(ctx, lbX - 2, lbY - 2, 90, 68, 4, "rgba(0,0,0,0.6)");
  ctx.strokeStyle = "rgba(244,196,48,0.35)"; ctx.lineWidth = 1;
  ctx.beginPath(); ctx.roundRect(lbX - 2, lbY - 2, 90, 68, 4); ctx.stroke();
  txtNoShadow(ctx, "TOP 5", lbX + 43, lbY + 7, 6, "#f4c430");
  const top5 = lb.slice(0, 5);
  top5.forEach((e, i) => {
    const ey = lbY + 18 + i * 11;
    const c = i === 0 ? "#f4c430" : "#aaa";
    txtNoShadow(ctx, `${i + 1}.${e.initials}`, lbX + 2, ey, 6, c, "left");
    txtNoShadow(ctx, `${e.dist}`, lbX + 88, ey, 6, c, "right");
  });
  if (top5.length === 0) txtNoShadow(ctx, "BE FIRST!", lbX + 43, lbY + 38, 6, "#555");
}

// ─── IDLE SCREEN ─────────────────────────────────────────────
function drawIdleScreen(
  ctx: CanvasRenderingContext2D,
  lb: LeaderEntry[],
  frame: number,
  idleMowerX: number
) {
  // Rich background
  const skyGrad = ctx.createLinearGradient(0, 0, 0, GROUND_Y);
  skyGrad.addColorStop(0, "#0d2a4a");
  skyGrad.addColorStop(1, "#1a4a7a");
  ctx.fillStyle = skyGrad; ctx.fillRect(0, 0, CW, GROUND_Y);

  // Stars
  for (let i = 0; i < 40; i++) {
    const sx = (i * 137 + 17) % CW;
    const sy = (i * 89 + 23) % (GROUND_Y * 0.7);
    const twinkle = Math.sin(frame * 0.05 + i) * 0.5 + 0.5;
    ctx.fillStyle = `rgba(255,255,255,${0.3 + twinkle * 0.7})`;
    ctx.fillRect(sx, sy, 1.5, 1.5);
  }

  // Moon
  circ(ctx, CW * 0.85, GROUND_Y * 0.2, 18, "#fff8d0");
  circ(ctx, CW * 0.85 + 8, GROUND_Y * 0.2 - 4, 14, "#0d2a4a"); // crescent

  // Silhouette houses
  [40, 140, 260, 370, 450].forEach((hx, i) => {
    const hh = 40 + i * 5;
    ctx.fillStyle = "#0a1a2a";
    ctx.fillRect(hx, GROUND_Y - hh, 50, hh);
    ctx.beginPath(); ctx.moveTo(hx - 4, GROUND_Y - hh); ctx.lineTo(hx + 25, GROUND_Y - hh - 18); ctx.lineTo(hx + 54, GROUND_Y - hh); ctx.closePath(); ctx.fill();
    // Windows (lit)
    if (i % 2 === 0) {
      ctx.fillStyle = "rgba(255,220,100,0.6)";
      ctx.fillRect(hx + 8, GROUND_Y - hh + 10, 10, 8);
      ctx.fillRect(hx + 28, GROUND_Y - hh + 10, 10, 8);
    }
  });

  // Ground
  const groundGrad = ctx.createLinearGradient(0, GROUND_Y, 0, CH);
  groundGrad.addColorStop(0, "#2a5a18");
  groundGrad.addColorStop(1, "#1a3a10");
  ctx.fillStyle = groundGrad; ctx.fillRect(0, GROUND_Y, CW, CH - GROUND_Y);

  // Animated idle mower
  const mowerBob = Math.sin(frame * 0.06) * 2;
  drawMower(ctx, idleMowerX, GROUND_Y + mowerBob, frame, 1, 1, false, false);

  // Dust from idle mower
  if (frame % 3 === 0) {
    // Just visual — handled by particle system
  }

  // ── TITLE CARD ──
  const titleY = 38;
  // Background panel
  ctx.fillStyle = "rgba(0,0,0,0.75)";
  ctx.beginPath(); ctx.roundRect(CW / 2 - 160, titleY - 22, 320, 44, 6); ctx.fill();
  ctx.strokeStyle = "#cc1111"; ctx.lineWidth = 2;
  ctx.beginPath(); ctx.roundRect(CW / 2 - 160, titleY - 22, 320, 44, 6); ctx.stroke();

  // Glow effect
  ctx.shadowColor = "#f4c430"; ctx.shadowBlur = 12;
  const pulse = 1 + Math.sin(frame * 0.04) * 0.015;
  ctx.save(); ctx.translate(CW / 2, titleY); ctx.scale(pulse, pulse);
  ctx.font = "bold 20px 'Courier New', monospace";
  ctx.textAlign = "center"; ctx.textBaseline = "middle";
  ctx.fillStyle = "#f4c430"; ctx.fillText("LAWN MOWER DASH", 0, 0);
  ctx.restore();
  ctx.shadowBlur = 0;

  // Subtitle
  txt(ctx, "NEWPORT AVENUE LANDSCAPING", CW / 2, titleY + 16, 6, "#cc1111");

  // Tagline
  txt(ctx, "Can you survive the full route?", CW / 2, 90, 7, "#ddd");

  // Controls hint
  rr(ctx, CW / 2 - 130, 100, 260, 22, 3, "rgba(0,0,0,0.5)");
  txtNoShadow(ctx, "SPACE / TAP = JUMP  |  ↓ HOLD = DUCK", CW / 2, 111, 6, "#666");

  // Prize box
  rr(ctx, CW / 2 - 130, 128, 260, 36, 5, "rgba(180,14,14,0.2)");
  ctx.strokeStyle = "#cc1111"; ctx.lineWidth = 1.5;
  ctx.beginPath(); ctx.roundRect(CW / 2 - 130, 128, 260, 36, 5); ctx.stroke();
  txt(ctx, "BEAT ALL 4 BIOMES:", CW / 2, 140, 8, "#f4c430");
  txt(ctx, "WIN $100 OFF YOUR SERVICE!", CW / 2, 155, 8, "#cc1111");

  // Leaderboard
  txt(ctx, "HALL OF FAME", CW / 2, 174, 8, "#f4c430");
  const top5 = lb.slice(0, 5);
  if (top5.length === 0) {
    txt(ctx, "No scores yet — be the first!", CW / 2, 190, 7, "#555");
  } else {
    top5.forEach((e, i) => {
      const ey = 186 + i * 11;
      const colors = ["#f4c430", "#c0c0c0", "#cd7f32", "#888", "#888"];
      txt(ctx, `${i + 1}. ${e.initials}`, CW / 2 - 55, ey, 7, colors[i], "left");
      txt(ctx, `${e.dist}ft`, CW / 2 + 15, ey, 7, colors[i], "left");
    });
  }

  // Blink CTA
  if (frame % 44 < 30) {
    const ctaY = CH - 14;
    ctx.font = "bold 9px 'Courier New', monospace";
    ctx.textAlign = "center"; ctx.textBaseline = "middle";
    ctx.fillStyle = "rgba(0,0,0,0.5)"; ctx.fillText("PRESS SPACE OR TAP TO START", CW / 2 + 1, ctaY + 1);
    ctx.fillStyle = "#fff"; ctx.fillText("PRESS SPACE OR TAP TO START", CW / 2, ctaY);
  }
}

// ─── DEATH SCREEN ────────────────────────────────────────────
function drawDeathScreen(
  ctx: CanvasRenderingContext2D,
  dist: number, coins: number,
  lb: LeaderEntry[], rank: number,
  frame: number
) {
  const og = ctx.createLinearGradient(0, 0, 0, CH);
  og.addColorStop(0, "rgba(20,0,0,0.94)");
  og.addColorStop(1, "rgba(8,0,0,0.97)");
  ctx.fillStyle = og; ctx.fillRect(0, 0, CW, CH);

  ctx.strokeStyle = "#cc1111"; ctx.lineWidth = 3;
  ctx.strokeRect(5, 5, CW - 10, CH - 10);
  ctx.strokeStyle = "rgba(244,196,48,0.3)"; ctx.lineWidth = 1;
  ctx.strokeRect(9, 9, CW - 18, CH - 18);

  ctx.shadowColor = "#cc1111"; ctx.shadowBlur = 10;
  txt(ctx, "WIPED OUT!", CW / 2, 28, 18, "#cc1111");
  ctx.shadowBlur = 0;

  const subs = [
    "The HOA wins this round.",
    "That tricycle came outta nowhere.",
    "Shoulda ducked that branch.",
    "Fire ants: 1. You: 0.",
    "The porta-potty had other plans.",
  ];
  txt(ctx, subs[Math.floor(dist / 100) % subs.length], CW / 2, 46, 7, "#666");

  txt(ctx, `Distance: ${dist}ft`, CW / 2, 62, 9, "#fff");
  txt(ctx, `Coins: ${coins}`, CW / 2, 76, 8, "#f4c430");

  txt(ctx, "LEADERBOARD", CW / 2, 94, 9, "#f4c430");
  const top5 = lb.slice(0, 5);
  top5.forEach((e, i) => {
    const ey = 108 + i * 14;
    const isNew = i === rank;
    if (isNew) {
      rr(ctx, CW / 2 - 100, ey - 7, 200, 14, 2, "rgba(200,160,0,0.22)");
    }
    const c = isNew ? "#f4c430" : i === 0 ? "#f4c430" : "#aaa";
    txt(ctx, `${i + 1}. ${e.initials}`, CW / 2 - 60, ey, 8, c, "left");
    txt(ctx, `${e.dist}ft`, CW / 2 + 20, ey, 8, c, "left");
  });

  if (frame % 44 < 30) {
    txt(ctx, "SPACE / TAP TO TRY AGAIN", CW / 2, CH - 12, 8, "#fff");
  }
}

// ─── WIN SCREEN ──────────────────────────────────────────────
function drawWinScreen(ctx: CanvasRenderingContext2D, code: string, isBoss: boolean, frame: number) {
  const og = ctx.createLinearGradient(0, 0, 0, CH);
  og.addColorStop(0, "#082008"); og.addColorStop(1, "#143814");
  ctx.fillStyle = og; ctx.fillRect(0, 0, CW, CH);
  ctx.strokeStyle = "#f4c430"; ctx.lineWidth = 3; ctx.strokeRect(5, 5, CW - 10, CH - 10);

  // Confetti
  for (let i = 0; i < 50; i++) {
    const cx2 = (i * 47 + frame * (2 + i % 3)) % CW;
    const cy2 = (i * 31 + frame * (1 + i % 2)) % CH;
    ctx.fillStyle = ["#cc1111", "#f4c430", "#2a8a2a", "#fff", "#4488ff"][i % 5];
    ctx.save(); ctx.translate(cx2, cy2); ctx.rotate(frame * 0.05 + i);
    ctx.fillRect(-3, -3, 6, 4); ctx.restore();
  }

  ctx.shadowColor = "#f4c430"; ctx.shadowBlur = 12;
  txt(ctx, isBoss ? "YOU BEAT STERLING!" : "ROUTE COMPLETE!", CW / 2, 28, 14, "#f4c430");
  ctx.shadowBlur = 0;

  txt(ctx, isBoss ? "Impossible. Absolutely impossible." : "Sterling is proud. (Yes, really.)", CW / 2, 46, 7, "#aaa");
  txt(ctx, "YOUR DISCOUNT CODE:", CW / 2, 64, 9, "#fff");

  const pulse = 1 + Math.sin(frame * 0.1) * 0.02;
  ctx.save(); ctx.translate(CW / 2, 90); ctx.scale(pulse, pulse);
  rr(ctx, -90, -20, 180, 40, 6, "#cc1111");
  ctx.strokeStyle = "#f4c430"; ctx.lineWidth = 2;
  ctx.beginPath(); ctx.roundRect(-90, -20, 180, 40, 6); ctx.stroke();
  ctx.shadowColor = "#f4c430"; ctx.shadowBlur = 8;
  txtNoShadow(ctx, code, 0, 0, 16, "#fff");
  ctx.shadowBlur = 0; ctx.restore();

  txt(ctx, isBoss ? "$200 OFF any service!" : "$100 OFF any service!", CW / 2, 120, 9, "#f4c430");
  txt(ctx, "(Yes, it's real. We're serious.)", CW / 2, 134, 7, "#888");
  txt(ctx, "Call (541) 617-8873 to redeem", CW / 2, 148, 7, "#fff");
  txt(ctx, "newportavelandscaping.com", CW / 2, 162, 7, "#4488ff");

  if (frame % 44 < 30) txt(ctx, "SPACE / TAP TO PLAY AGAIN", CW / 2, CH - 12, 8, "#888");
}

// ─── DOUBLE OR NOTHING ───────────────────────────────────────
function drawDoubleOrNothing(ctx: CanvasRenderingContext2D, frame: number) {
  ctx.fillStyle = "rgba(0,0,0,0.95)"; ctx.fillRect(0, 0, CW, CH);
  ctx.strokeStyle = "#f4c430"; ctx.lineWidth = 3; ctx.strokeRect(5, 5, CW - 10, CH - 10);

  ctx.shadowColor = "#f4c430"; ctx.shadowBlur = 10;
  txt(ctx, "DOUBLE OR NOTHING?", CW / 2, 26, 13, "#f4c430");
  ctx.shadowBlur = 0;

  txt(ctx, "You earned: $100 off", CW / 2, 44, 9, "#fff");
  txt(ctx, "But do you dare face...", CW / 2, 58, 8, "#aaa");

  ctx.shadowColor = "#cc1111"; ctx.shadowBlur = 8;
  txt(ctx, "GIANT STERLING?", CW / 2, 74, 12, "#cc1111");
  ctx.shadowBlur = 0;

  txt(ctx, "Win: $200 off  |  Lose: Keep $100", CW / 2, 90, 7, "#888");
  txt(ctx, "(1 in 500 chance. He's very large.)", CW / 2, 102, 6, "#555");

  // Buttons
  rr(ctx, 18, 114, CW / 2 - 24, 62, 6, "#8a0000");
  ctx.strokeStyle = "#cc1111"; ctx.lineWidth = 2;
  ctx.beginPath(); ctx.roundRect(18, 114, CW / 2 - 24, 62, 6); ctx.stroke();
  txt(ctx, "FIGHT", CW / 4 + 9, 138, 13, "#fff");
  txt(ctx, "STERLING", CW / 4 + 9, 154, 9, "#fff");
  txt(ctx, "(risk it)", CW / 4 + 9, 168, 7, "#ffaaaa");

  rr(ctx, CW / 2 + 6, 114, CW / 2 - 24, 62, 6, "#0a4a0a");
  ctx.strokeStyle = "#2a8a2a"; ctx.lineWidth = 2;
  ctx.beginPath(); ctx.roundRect(CW / 2 + 6, 114, CW / 2 - 24, 62, 6); ctx.stroke();
  txt(ctx, "TAKE", CW * 3 / 4 - 9, 138, 13, "#fff");
  txt(ctx, "$100 OFF", CW * 3 / 4 - 9, 154, 9, "#fff");
  txt(ctx, "(safe!)", CW * 3 / 4 - 9, 168, 7, "#aaffaa");

  if (frame % 30 < 20) txt(ctx, "TAP LEFT = FIGHT  |  TAP RIGHT = TAKE $100", CW / 2, CH - 12, 7, "#666");
}

// ─── BOSS SCREEN ─────────────────────────────────────────────
function drawBossScreen(ctx: CanvasRenderingContext2D, frame: number) {
  const og = ctx.createLinearGradient(0, 0, 0, CH);
  og.addColorStop(0, "#060000"); og.addColorStop(1, "#180000");
  ctx.fillStyle = og; ctx.fillRect(0, 0, CW, CH);

  if (frame % 40 < 4) { ctx.fillStyle = "rgba(255,180,80,0.12)"; ctx.fillRect(0, 0, CW, CH); }

  const shake = Math.sin(frame * 0.3) * 3;
  const bob = Math.sin(frame * 0.08) * 4;

  // Giant Sterling
  ctx.save(); ctx.translate(CW * 0.62 + shake, CH * 0.08 + bob); ctx.scale(2.8, 2.8);
  r(ctx, -17, 18, 34, 52, "#1a1a3a");
  r(ctx, -4, 20, 8, 32, "#cc1111");
  r(ctx, -2, 20, 4, 10, "#ee2222");
  ctx.fillStyle = "#2a2a4a";
  ctx.beginPath(); ctx.moveTo(-17, 18); ctx.lineTo(-4, 34); ctx.lineTo(-17, 70); ctx.closePath(); ctx.fill();
  ctx.beginPath(); ctx.moveTo(17, 18); ctx.lineTo(4, 34); ctx.lineTo(17, 70); ctx.closePath(); ctx.fill();
  r(ctx, -27, 22, 12, 36, "#1a1a3a"); r(ctx, 15, 22, 12, 36, "#1a1a3a");
  rr(ctx, -29, 56, 14, 10, 2, "#f4c07a"); rr(ctx, 15, 56, 14, 10, 2, "#f4c07a");
  r(ctx, -15, 70, 13, 24, "#1a1a3a"); r(ctx, 2, 70, 13, 24, "#1a1a3a");
  rr(ctx, -17, 92, 15, 6, 2, "#0a0a0a"); rr(ctx, 2, 92, 15, 6, 2, "#0a0a0a");
  rr(ctx, -13, -6, 26, 28, 3, "#f4c07a");
  ctx.strokeStyle = "#c8843a"; ctx.lineWidth = 2;
  ctx.beginPath(); ctx.roundRect(-13, -6, 26, 28, 3); ctx.stroke();
  r(ctx, -13, -10, 26, 8, "#c8c8c8");
  r(ctx, -7, 2, 4, 4, "#111"); r(ctx, 3, 2, 4, 4, "#111");
  r(ctx, -5, 14, 10, 3, "#c8843a");
  ctx.restore();

  // Speech bubble
  const bx = CW * 0.04, by = CH * 0.06, bw = 160, bh = 36;
  rr(ctx, bx, by, bw, bh, 6, "#fffde7");
  ctx.strokeStyle = "#cc1111"; ctx.lineWidth = 2;
  ctx.beginPath(); ctx.roundRect(bx, by, bw, bh, 6); ctx.stroke();
  ctx.fillStyle = "#fffde7";
  ctx.beginPath(); ctx.moveTo(bx + bw * 0.68, by + bh); ctx.lineTo(bx + bw * 0.78, by + bh + 14); ctx.lineTo(bx + bw * 0.83, by + bh); ctx.fill();
  txt(ctx, "YOU'RE FIRED! 🔥", bx + bw / 2, by + 14, 11, "#cc1111");
  txt(ctx, "(and mowed)", bx + bw / 2, by + 28, 7, "#888");

  // Small mower
  ctx.save(); ctx.translate(CW * 0.14, CH * 0.72); ctx.scale(0.48, 0.48);
  drawMower(ctx, 0, 0, frame, 1, 1, false, false);
  ctx.restore();

  ctx.shadowColor = "#cc1111"; ctx.shadowBlur = 6;
  txt(ctx, "BOSS FIGHT!", CW / 2, CH - 28, 12, "#cc1111");
  ctx.shadowBlur = 0;
  if (frame % 30 < 20) txt(ctx, "Deciding your fate...", CW / 2, CH - 12, 8, "#555");
}

// ─── BOSS LOST SCREEN ────────────────────────────────────────
function drawBossLostScreen(ctx: CanvasRenderingContext2D, code: string, frame: number) {
  ctx.fillStyle = "rgba(8,0,0,0.96)"; ctx.fillRect(0, 0, CW, CH);
  ctx.strokeStyle = "#cc1111"; ctx.lineWidth = 3; ctx.strokeRect(5, 5, CW - 10, CH - 10);
  ctx.shadowColor = "#cc1111"; ctx.shadowBlur = 8;
  txt(ctx, "STERLING WINS.", CW / 2, 26, 14, "#cc1111");
  ctx.shadowBlur = 0;
  txt(ctx, "He's very large. It was always unlikely.", CW / 2, 44, 7, "#666");
  txt(ctx, "But you beat the route, so...", CW / 2, 58, 7, "#aaa");
  txt(ctx, "YOUR $100 CODE:", CW / 2, 76, 9, "#fff");

  const pulse = 1 + Math.sin(frame * 0.1) * 0.02;
  ctx.save(); ctx.translate(CW / 2, 100); ctx.scale(pulse, pulse);
  rr(ctx, -90, -20, 180, 40, 6, "#1a5a1a");
  ctx.strokeStyle = "#f4c430"; ctx.lineWidth = 2;
  ctx.beginPath(); ctx.roundRect(-90, -20, 180, 40, 6); ctx.stroke();
  ctx.shadowColor = "#f4c430"; ctx.shadowBlur = 8;
  txtNoShadow(ctx, code, 0, 0, 16, "#fff");
  ctx.shadowBlur = 0; ctx.restore();

  txt(ctx, "$100 OFF any service!", CW / 2, 124, 9, "#f4c430");
  txt(ctx, "Call (541) 617-8873 to redeem", CW / 2, 140, 7, "#fff");
  txt(ctx, "newportavelandscaping.com", CW / 2, 154, 7, "#4488ff");
  if (frame % 44 < 30) txt(ctx, "SPACE / TAP TO PLAY AGAIN", CW / 2, CH - 12, 8, "#888");
}

// ─── MAIN COMPONENT ──────────────────────────────────────────
export default function LawnMowerDash() {
  const [, goTo] = useLocation();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const rafId = useRef(0);

  // ── Game state refs (no re-render needed) ──
  const stateRef = useRef<GameState>("idle");
  const frameRef = useRef(0);

  // Player physics
  const pyRef = useRef(GROUND_Y);           // player y (bottom of mower)
  const pvyRef = useRef(0);                  // vertical velocity
  const onGroundRef = useRef(true);
  const jumpCountRef = useRef(0);            // 0=ground, 1=jumped, 2=double jumped
  const duckingRef = useRef(false);
  const scaleXRef = useRef(1);              // squash/stretch
  const scaleYRef = useRef(1);

  // Game metrics
  const distRef = useRef(0);
  const coinsRef = useRef(0);
  const livesRef = useRef(3);
  const speedRef = useRef(3.2);
  const hurtFrameRef = useRef(0);
  const shakeRef = useRef(0);               // screen shake magnitude

  // Objects
  const obstaclesRef = useRef<Obstacle[]>([]);
  const coinsObjRef = useRef<Coin[]>([]);
  const particlesRef = useRef<Particle[]>([]);
  const cloudsRef = useRef<Cloud[]>([]);
  const bgElementsRef = useRef<BgElement[]>([]);

  // Biome
  const biomeIdxRef = useRef(0);
  const biomeTransitionRef = useRef(0);

  // Spawn
  const spawnTimerRef = useRef(0);
  const coinSpawnTimerRef = useRef(0);
  const bgSpawnTimerRef = useRef(0);

  // Idle mower
  const idleMowerXRef = useRef(-80);

  // Leaderboard
  const lbRef = useRef<LeaderEntry[]>(loadLB());

  // React state (for overlays)
  const [displayState, setDisplayState] = useState<GameState>("idle");
  const [finalDist, setFinalDist] = useState(0);
  const [finalCoins, setFinalCoins] = useState(0);
  const [wonCode, setWonCode] = useState("");
  const [copied, setCopied] = useState(false);
  const [initials, setInitials] = useState(["A", "A", "A"]);
  const [initialsPos, setInitialsPos] = useState(0);
  const [newEntryRank, setNewEntryRank] = useState(-1);
  const sessionId = useRef(`s_${Date.now()}`);
  const deviceType = /Mobi|Android/i.test(navigator.userAgent) ? "mobile" : "desktop";

  const trackEvent = trpc.game.trackEvent.useMutation();

  // ── Canvas resize ──
  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const cw = container.clientWidth;
    const ch = container.clientHeight;
    const scale = Math.min(cw / CW, ch / CH);
    canvas.style.width = `${CW * scale}px`;
    canvas.style.height = `${CH * scale}px`;
  }, []);

  useEffect(() => {
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    return () => window.removeEventListener("resize", resizeCanvas);
  }, [resizeCanvas]);

  // ── Init clouds ──
  const initClouds = useCallback(() => {
    cloudsRef.current = Array.from({ length: 6 }, (_, i) => ({
      x: (i * CW / 5) + Math.random() * 80,
      y: 20 + Math.random() * 50,
      w: 30 + Math.random() * 40,
      h: 12 + Math.random() * 16,
      speed: 0.15 + Math.random() * 0.2,
    }));
  }, []);

  // ── Reset game ──
  const resetGame = useCallback(() => {
    stateRef.current = "playing";
    frameRef.current = 0;
    pyRef.current = GROUND_Y;
    pvyRef.current = 0;
    onGroundRef.current = true;
    jumpCountRef.current = 0;
    duckingRef.current = false;
    scaleXRef.current = 1;
    scaleYRef.current = 1;
    distRef.current = 0;
    coinsRef.current = 0;
    livesRef.current = 3;
    speedRef.current = 3.2;
    hurtFrameRef.current = 0;
    shakeRef.current = 0;
    obstaclesRef.current = [];
    coinsObjRef.current = [];
    particlesRef.current = [];
    bgElementsRef.current = [];
    biomeIdxRef.current = 0;
    biomeTransitionRef.current = 0;
    spawnTimerRef.current = 0;
    coinSpawnTimerRef.current = 0;
    bgSpawnTimerRef.current = 0;
    setFinalDist(0);
    setFinalCoins(0);
    setWonCode("");
    setCopied(false);
    initClouds();
    sessionId.current = `s_${Date.now()}`;
    trackEvent.mutate({ sessionId: sessionId.current, event: "start", level: 1, score: 0, device: deviceType });
  }, [initClouds, trackEvent, deviceType]);

  // ── Jump ──
  const doJump = useCallback(() => {
    if (jumpCountRef.current === 0) {
      pvyRef.current = JUMP_VY;
      jumpCountRef.current = 1;
      onGroundRef.current = false;
      scaleXRef.current = 0.8; scaleYRef.current = 1.25; // stretch up
    } else if (jumpCountRef.current === 1) {
      pvyRef.current = DOUBLE_JUMP_VY;
      jumpCountRef.current = 2;
      scaleXRef.current = 0.85; scaleYRef.current = 1.2;
      // Double jump particles
      for (let i = 0; i < 8; i++) {
        particlesRef.current.push({
          x: PLAYER_X, y: pyRef.current,
          vx: (Math.random() - 0.5) * 3, vy: Math.random() * 2,
          life: 14, maxLife: 14, color: "#f4c430", size: 2 + Math.random() * 2,
        });
      }
    }
  }, []);

  // ── Submit initials ──
  const submitInitials = useCallback(() => {
    const ini = initials.join("");
    const entry: LeaderEntry = { initials: ini, score: 0, dist: distRef.current };
    const lb = loadLB();
    lb.push(entry);
    lb.sort((a, b) => b.dist - a.dist);
    const top10 = lb.slice(0, 10);
    saveLB(top10);
    lbRef.current = top10;
    const rank = top10.findIndex(e => e.initials === ini && e.dist === entry.dist);
    setNewEntryRank(rank);
    trackEvent.mutate({ sessionId: sessionId.current, event: "death", level: biomeIdxRef.current + 1, score: distRef.current, device: deviceType });
    setDisplayState("dead");
  }, [initials, trackEvent, deviceType]);

  // ── GAME LOOP ──
  const gameLoop = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) { rafId.current = requestAnimationFrame(gameLoop); return; }
    const ctx = canvas.getContext("2d");
    if (!ctx) { rafId.current = requestAnimationFrame(gameLoop); return; }

    const state = stateRef.current;
    const frame = frameRef.current;

    // ── IDLE ──
    if (state === "idle") {
      ctx.clearRect(0, 0, CW, CH);
      // Animate idle mower
      idleMowerXRef.current += 1.2;
      if (idleMowerXRef.current > CW + 100) idleMowerXRef.current = -100;
      // Animate clouds
      cloudsRef.current.forEach(c => {
        c.x -= c.speed;
        if (c.x < -80) c.x = CW + 80;
      });
      drawIdleScreen(ctx, lbRef.current, frame, idleMowerXRef.current);
      frameRef.current++;
      rafId.current = requestAnimationFrame(gameLoop);
      return;
    }

    // ── ENTER INITIALS (handled by React overlay) ──
    if (state === "enter_initials") {
      frameRef.current++;
      rafId.current = requestAnimationFrame(gameLoop);
      return;
    }

    // ── DEAD ──
    if (state === "dead") {
      ctx.clearRect(0, 0, CW, CH);
      drawDeathScreen(ctx, finalDist, finalCoins, lbRef.current, newEntryRank, frame);
      frameRef.current++;
      rafId.current = requestAnimationFrame(gameLoop);
      return;
    }

    // ── DOUBLE OR NOTHING ──
    if (state === "double_or_nothing") {
      ctx.clearRect(0, 0, CW, CH);
      drawDoubleOrNothing(ctx, frame);
      frameRef.current++;
      rafId.current = requestAnimationFrame(gameLoop);
      return;
    }

    // ── BOSS FIGHT ──
    if (state === "boss_fight") {
      ctx.clearRect(0, 0, CW, CH);
      drawBossScreen(ctx, frame);
      if (frame > 180) {
        const wins = Math.random() < 0.002;
        if (wins) {
          stateRef.current = "won";
          setWonCode(DOUBLE_CODE);
          setDisplayState("won");
          trackEvent.mutate({ sessionId: sessionId.current, event: "boss_win", level: 4, score: distRef.current, device: deviceType });
        } else {
          stateRef.current = "boss_lost";
          setWonCode(DISCOUNT_CODE);
          setDisplayState("boss_lost");
          trackEvent.mutate({ sessionId: sessionId.current, event: "boss_loss", level: 4, score: distRef.current, device: deviceType });
        }
        frameRef.current = 0;
        return;
      }
      frameRef.current++;
      rafId.current = requestAnimationFrame(gameLoop);
      return;
    }

    // ── WON ──
    if (state === "won") {
      ctx.clearRect(0, 0, CW, CH);
      drawWinScreen(ctx, wonCode || DOUBLE_CODE, wonCode === DOUBLE_CODE, frame);
      frameRef.current++;
      rafId.current = requestAnimationFrame(gameLoop);
      return;
    }

    // ── BOSS LOST ──
    if (state === "boss_lost") {
      ctx.clearRect(0, 0, CW, CH);
      drawBossLostScreen(ctx, wonCode || DISCOUNT_CODE, frame);
      frameRef.current++;
      rafId.current = requestAnimationFrame(gameLoop);
      return;
    }

    if (state !== "playing") {
      rafId.current = requestAnimationFrame(gameLoop);
      return;
    }

    // ════════════════════════════════════════════════
    // PLAYING STATE
    // ════════════════════════════════════════════════

    // Speed ramp
    speedRef.current = Math.min(3.2 + distRef.current * 0.0012, 9.5);
    const speed = speedRef.current;

    // Distance
    distRef.current = Math.floor(frame * speed / 10);

    // Biome check
    const newBiomeIdx = BIOMES.findIndex((b, i) =>
      distRef.current >= b.startDist && (i === BIOMES.length - 1 || distRef.current < BIOMES[i + 1].startDist)
    );
    if (newBiomeIdx !== biomeIdxRef.current) {
      biomeIdxRef.current = newBiomeIdx;
      biomeTransitionRef.current = 60;
    }
    if (biomeTransitionRef.current > 0) biomeTransitionRef.current--;

    // Win condition
    if (distRef.current >= 8000 && state === "playing") {
      stateRef.current = "double_or_nothing";
      setFinalDist(distRef.current);
      setFinalCoins(coinsRef.current);
      setDisplayState("double_or_nothing");
      trackEvent.mutate({ sessionId: sessionId.current, event: "win", level: 4, score: distRef.current, device: deviceType });
      frameRef.current = 0;
      return;
    }

    // ── PHYSICS ──
    if (!onGroundRef.current) {
      pvyRef.current += GRAVITY;
      pyRef.current += pvyRef.current;
      if (pyRef.current >= GROUND_Y) {
        pyRef.current = GROUND_Y;
        pvyRef.current = 0;
        onGroundRef.current = true;
        jumpCountRef.current = 0;
        // Land squash
        scaleXRef.current = 1.3; scaleYRef.current = 0.7;
        // Land dust
        for (let i = 0; i < 6; i++) {
          particlesRef.current.push({
            x: PLAYER_X + (Math.random() - 0.5) * 20,
            y: GROUND_Y,
            vx: (Math.random() - 0.5) * 3,
            vy: -Math.random() * 2,
            life: 12, maxLife: 12, color: "#a8c880", size: 2 + Math.random() * 2,
          });
        }
      }
    }

    // Squash/stretch recovery
    scaleXRef.current += (1 - scaleXRef.current) * 0.18;
    scaleYRef.current += (1 - scaleYRef.current) * 0.18;

    // Hurt timer
    if (hurtFrameRef.current > 0) hurtFrameRef.current--;

    // Screen shake decay
    if (shakeRef.current > 0) shakeRef.current *= 0.8;

    // ── CLOUDS ──
    cloudsRef.current.forEach(c => {
      c.x -= c.speed * (speed * 0.08);
      if (c.x < -80) c.x = CW + 80;
    });

    // ── BACKGROUND ELEMENTS ──
    bgSpawnTimerRef.current++;
    if (bgSpawnTimerRef.current > 60) {
      bgSpawnTimerRef.current = 0;
      const biome = biomeIdxRef.current;
      const farTypes = biome === 0 ? ["house", "tree"] : biome === 1 ? ["hoa_house", "tree"] : biome === 2 ? ["building_frame"] : ["dead_tree", "cactus"];
      const midTypes = biome === 0 ? ["fence_post", "fence_rail", "tree"] : biome === 1 ? ["fence_post", "fence_rail"] : biome === 2 ? ["cone"] : ["cactus"];
      bgElementsRef.current.push(
        { x: CW + 40, y: GROUND_Y * 0.45, type: farTypes[Math.floor(Math.random() * farTypes.length)], scale: 0.7 + Math.random() * 0.3 },
        { x: CW + 20, y: GROUND_Y * 0.75, type: midTypes[Math.floor(Math.random() * midTypes.length)], scale: 0.8 + Math.random() * 0.2 },
      );
    }
    bgElementsRef.current = bgElementsRef.current.map(el => ({
      ...el,
      x: el.x - speed * (el.y < GROUND_Y * 0.6 ? 0.18 : el.y < GROUND_Y * 0.85 ? 0.45 : 0.75),
    })).filter(el => el.x > -100);

    // ── OBSTACLES ──
    const spawnInterval = Math.max(55, 110 - speed * 5);
    spawnTimerRef.current++;
    if (spawnTimerRef.current >= spawnInterval) {
      spawnTimerRef.current = 0;
      const biome = biomeIdxRef.current;
      const lowTypes = biome === 0 ? ["rock", "stump", "fire_ants", "tricycle"] : biome === 1 ? ["hoa_sign", "stump", "fire_ants"] : biome === 2 ? ["cone", "lumber", "porta_potty"] : ["cracked_earth", "tumbleweed", "stump"];
      const highTypes = biome === 0 ? ["branch"] : biome === 1 ? ["branch"] : biome === 2 ? ["branch"] : ["branch"];

      // Decide: low or high obstacle
      const isHigh = Math.random() < 0.28 && distRef.current > 300;
      if (isHigh) {
        const type = highTypes[Math.floor(Math.random() * highTypes.length)];
        // Branch hangs from top — player must duck
        const obsH = 50 + Math.random() * 20;
        obstaclesRef.current.push({ x: CW + 50, y: 0, w: 80, h: obsH, type, frame: 0 });
      } else {
        const type = lowTypes[Math.floor(Math.random() * lowTypes.length)];
        const obsW = 36 + Math.random() * 24;
        const obsH = 28 + Math.random() * 20;
        obstaclesRef.current.push({ x: CW + 50, y: GROUND_Y - obsH, w: obsW, h: obsH, type, frame: 0 });
      }

      // Sometimes double obstacle
      if (Math.random() < 0.2 && distRef.current > 600) {
        const type2 = lowTypes[Math.floor(Math.random() * lowTypes.length)];
        const obsW2 = 32 + Math.random() * 20;
        const obsH2 = 28 + Math.random() * 16;
        obstaclesRef.current.push({ x: CW + 130, y: GROUND_Y - obsH2, w: obsW2, h: obsH2, type: type2, frame: 0 });
      }
    }
    obstaclesRef.current = obstaclesRef.current
      .map(o => ({ ...o, x: o.x - speed, frame: o.frame + 1 }))
      .filter(o => o.x > -100);

    // ── COINS ──
    coinSpawnTimerRef.current++;
    if (coinSpawnTimerRef.current >= 45) {
      coinSpawnTimerRef.current = 0;
      // Spawn coins in arcs
      const arcCount = 3 + Math.floor(Math.random() * 4);
      for (let i = 0; i < arcCount; i++) {
        const arcY = GROUND_Y - 30 - Math.sin(i / (arcCount - 1) * Math.PI) * 60;
        coinsObjRef.current.push({ x: CW + 30 + i * 28, y: arcY, collected: false, frame: i * 5 });
      }
    }
    coinsObjRef.current = coinsObjRef.current
      .map(c => ({ ...c, x: c.x - speed, frame: c.frame + 1 }))
      .filter(c => c.x > -20 && !c.collected);

    // ── WHEEL DUST PARTICLES ──
    if (onGroundRef.current && frame % 3 === 0) {
      particlesRef.current.push({
        x: PLAYER_X - 30,
        y: GROUND_Y,
        vx: -speed * 0.4 - Math.random() * 1.5,
        vy: -Math.random() * 1.5,
        life: 10, maxLife: 10,
        color: biomeIdxRef.current < 2 ? "#a8c880" : biomeIdxRef.current === 2 ? "#c8a060" : "#c8a040",
        size: 2 + Math.random() * 2,
      });
    }

    // ── GRASS PARTICLES FROM BLADE ──
    if (onGroundRef.current && frame % 4 === 0) {
      for (let i = 0; i < 2; i++) {
        particlesRef.current.push({
          x: PLAYER_X + 10 + Math.random() * 10,
          y: GROUND_Y - 5,
          vx: speed * 0.3 + Math.random() * 2,
          vy: -2 - Math.random() * 3,
          life: 12, maxLife: 12,
          color: biomeIdxRef.current < 2 ? "#5aaf3c" : "#a08030",
          size: 1.5 + Math.random() * 1.5,
          gravity: 0.2,
        });
      }
    }

    // ── UPDATE PARTICLES ──
    particlesRef.current = particlesRef.current
      .map(p => ({
        ...p,
        x: p.x + p.vx,
        y: p.y + p.vy,
        vy: p.vy + (p.gravity ?? 0.1),
        life: p.life - 1,
      }))
      .filter(p => p.life > 0);

    // ── COLLISION DETECTION ──
    const mowerLeft = PLAYER_X - 28;
    const mowerRight = PLAYER_X + 28;
    const mowerTop = pyRef.current - (duckingRef.current ? 28 : 44);
    const mowerBottom = pyRef.current;

    for (const obs of obstaclesRef.current) {
      const obsLeft = obs.x;
      const obsRight = obs.x + obs.w;
      const obsTop = obs.y;
      const obsBottom = obs.y + obs.h;

      const hit = mowerRight - 6 > obsLeft + 4 && mowerLeft + 6 < obsRight - 4 &&
        mowerBottom - 4 > obsTop + 4 && mowerTop + 4 < obsBottom - 4;

      if (hit) {
        obstaclesRef.current = obstaclesRef.current.filter(o => o !== obs);
        livesRef.current--;
        hurtFrameRef.current = 50;
        shakeRef.current = 8;
        // Hit particles
        for (let i = 0; i < 16; i++) {
          particlesRef.current.push({
            x: PLAYER_X, y: pyRef.current - 20,
            vx: (Math.random() - 0.5) * 6,
            vy: (Math.random() - 0.5) * 6 - 2,
            life: 22, maxLife: 22,
            color: ["#cc1111", "#f4c430", "#ff6600", "#fff"][i % 4],
            size: 2 + Math.random() * 4,
            gravity: 0.15,
          });
        }
        if (livesRef.current <= 0) {
          setFinalDist(distRef.current);
          setFinalCoins(coinsRef.current);
          stateRef.current = "enter_initials";
          setDisplayState("enter_initials");
          setInitials(["A", "A", "A"]);
          setInitialsPos(0);
          return;
        }
        break;
      }
    }

    // ── COIN COLLECTION ──
    for (const coin of coinsObjRef.current) {
      if (coin.collected) continue;
      const dx = Math.abs(coin.x - PLAYER_X);
      const dy = Math.abs(coin.y - (pyRef.current - 20));
      if (dx < 18 && dy < 18) {
        coin.collected = true;
        coinsRef.current++;
        // Coin particles
        for (let i = 0; i < 6; i++) {
          particlesRef.current.push({
            x: coin.x, y: coin.y,
            vx: (Math.random() - 0.5) * 4,
            vy: -2 - Math.random() * 3,
            life: 14, maxLife: 14,
            color: "#f4c430",
            size: 2 + Math.random() * 2,
          });
        }
      }
    }

    // ── DRAW ──
    ctx.save();
    // Screen shake
    if (shakeRef.current > 0.5) {
      ctx.translate(
        (Math.random() - 0.5) * shakeRef.current,
        (Math.random() - 0.5) * shakeRef.current
      );
    }

    drawBackground(ctx, biomeIdxRef.current, distRef.current, frame, cloudsRef.current, bgElementsRef.current);

    // Coins
    coinsObjRef.current.forEach(c => drawCoin(ctx, c));

    // Obstacles
    obstaclesRef.current.forEach(o => drawObstacle(ctx, o));

    // Particles (behind mower)
    particlesRef.current.forEach(p => {
      ctx.globalAlpha = p.life / p.maxLife;
      circ(ctx, p.x, p.y, p.size, p.color);
    });
    ctx.globalAlpha = 1;

    // Mower
    const hurt = hurtFrameRef.current > 0;
    drawMower(
      ctx,
      PLAYER_X,
      pyRef.current,
      frame,
      scaleXRef.current,
      scaleYRef.current,
      hurt,
      duckingRef.current
    );

    // Speed lines at high speed
    if (speed > 5.5) {
      const lineAlpha = Math.min((speed - 5.5) / 3, 0.5);
      ctx.strokeStyle = `rgba(255,255,255,${lineAlpha})`;
      ctx.lineWidth = 1;
      for (let i = 0; i < 8; i++) {
        const ly = 20 + i * 28 + (frame * speed * 0.5) % 28;
        const llen = 15 + Math.random() * 30;
        ctx.beginPath(); ctx.moveTo(0, ly); ctx.lineTo(llen, ly); ctx.stroke();
      }
    }

    ctx.restore();

    // HUD (no shake)
    drawHUD(ctx, distRef.current, coinsRef.current, livesRef.current, speed, lbRef.current, frame, biomeIdxRef.current, biomeTransitionRef.current);

    frameRef.current++;
    rafId.current = requestAnimationFrame(gameLoop);
  }, [displayState, finalDist, finalCoins, newEntryRank, wonCode, trackEvent, deviceType]);

  // ── Start loop ──
  useEffect(() => {
    initClouds();
    cancelAnimationFrame(rafId.current);
    rafId.current = requestAnimationFrame(gameLoop);
    return () => cancelAnimationFrame(rafId.current);
  }, [displayState, gameLoop, initClouds]);

  // ── Keyboard ──
  useEffect(() => {
    const onDown = (e: KeyboardEvent) => {
      const s = stateRef.current;
      if (e.code === "Space" || e.code === "ArrowUp" || e.code === "KeyW") {
        e.preventDefault();
        if (s === "idle" || s === "dead" || s === "won" || s === "boss_lost") {
          resetGame(); setDisplayState("playing"); return;
        }
        if (s === "playing") doJump();
      }
      if (e.code === "ArrowDown" || e.code === "KeyS") {
        e.preventDefault();
        if (s === "playing") duckingRef.current = true;
      }
    };
    const onUp = (e: KeyboardEvent) => {
      if (e.code === "ArrowDown" || e.code === "KeyS") duckingRef.current = false;
    };
    window.addEventListener("keydown", onDown);
    window.addEventListener("keyup", onUp);
    return () => { window.removeEventListener("keydown", onDown); window.removeEventListener("keyup", onUp); };
  }, [resetGame, doJump]);

  // ── Touch ──
  const touchStartY = useRef(0);
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    e.preventDefault();
    touchStartY.current = e.touches[0].clientY;
    const s = stateRef.current;
    if (s === "idle" || s === "dead" || s === "won" || s === "boss_lost") {
      resetGame(); setDisplayState("playing"); return;
    }
    if (s === "double_or_nothing") {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const relX = (e.touches[0].clientX - rect.left) / rect.width;
      if (relX < 0.5) { stateRef.current = "boss_fight"; setDisplayState("boss_fight"); frameRef.current = 0; }
      else { stateRef.current = "boss_lost"; setWonCode(DISCOUNT_CODE); setDisplayState("boss_lost"); }
      return;
    }
    if (s === "playing") doJump();
  }, [resetGame, doJump]);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    e.preventDefault();
    const dy = e.touches[0].clientY - touchStartY.current;
    if (dy > 20 && stateRef.current === "playing") duckingRef.current = true;
  }, []);

  const handleTouchEnd = useCallback((e: React.TouchEvent) => {
    e.preventDefault();
    duckingRef.current = false;
  }, []);

  const handleClick = useCallback((e: React.MouseEvent) => {
    const s = stateRef.current;
    if (s === "idle" || s === "dead" || s === "won" || s === "boss_lost") {
      resetGame(); setDisplayState("playing"); return;
    }
    if (s === "double_or_nothing") {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const relX = (e.clientX - rect.left) / rect.width;
      if (relX < 0.5) { stateRef.current = "boss_fight"; setDisplayState("boss_fight"); frameRef.current = 0; }
      else { stateRef.current = "boss_lost"; setWonCode(DISCOUNT_CODE); setDisplayState("boss_lost"); }
      return;
    }
    if (s === "playing") doJump();
  }, [resetGame, doJump]);

  const cycleInitial = (pos: number, dir: number) => {
    setInitials(prev => {
      const next = [...prev];
      const code = next[pos].charCodeAt(0) + dir;
      next[pos] = String.fromCharCode(code < 65 ? 90 : code > 90 ? 65 : code);
      return next;
    });
  };

  return (
    <div
      ref={containerRef}
      style={{
        position: "fixed", inset: 0,
        background: "#000",
        display: "flex", alignItems: "center", justifyContent: "center",
        overflow: "hidden",
        userSelect: "none",
        WebkitUserSelect: "none",
      }}
    >
      {/* Back button */}
      <button
        onClick={() => goTo("/")}
        style={{
          position: "absolute", top: 12, left: 12, zIndex: 20,
          background: "rgba(0,0,0,0.75)", border: "1px solid rgba(255,255,255,0.25)",
          color: "#fff", fontFamily: "'Courier New', monospace", fontWeight: 700,
          fontSize: "11px", padding: "6px 14px", borderRadius: "4px",
          cursor: "pointer", letterSpacing: "0.08em",
          transition: "background 0.15s ease",
        }}
        onMouseEnter={e => (e.currentTarget.style.background = "rgba(50,50,50,0.9)")}
        onMouseLeave={e => (e.currentTarget.style.background = "rgba(0,0,0,0.75)")}
      >
        ← BACK
      </button>

      {/* Canvas */}
      <canvas
        ref={canvasRef}
        width={CW}
        height={CH}
        style={{ imageRendering: "pixelated", cursor: "pointer", display: "block" }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onClick={handleClick}
      />

      {/* Initials overlay */}
      {displayState === "enter_initials" && (
        <div style={{
          position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center",
          background: "rgba(0,0,0,0.9)", zIndex: 30,
        }}>
          <div style={{
            background: "#111", border: "2px solid #f4c430", borderRadius: "10px",
            padding: "28px 24px", textAlign: "center", maxWidth: "300px", width: "90%",
          }}>
            <div style={{ fontFamily: "'Courier New',monospace", fontWeight: 700, fontSize: "17px", color: "#f4c430", marginBottom: "4px" }}>
              ENTER YOUR INITIALS
            </div>
            <div style={{ fontFamily: "'Courier New',monospace", fontSize: "12px", color: "#888", marginBottom: "20px" }}>
              Distance: {finalDist}ft · Coins: {finalCoins}
            </div>
            <div style={{ display: "flex", justifyContent: "center", gap: "14px", marginBottom: "22px" }}>
              {[0, 1, 2].map(pos => (
                <div key={pos} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "6px" }}>
                  <button onClick={() => cycleInitial(pos, 1)} style={{ width: "46px", height: "36px", background: "#8a0000", border: "none", color: "#fff", fontFamily: "'Courier New',monospace", fontWeight: 700, fontSize: "18px", borderRadius: "4px", cursor: "pointer" }}>▲</button>
                  <div
                    onClick={() => setInitialsPos(pos)}
                    style={{ width: "46px", height: "46px", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Courier New',monospace", fontWeight: 700, fontSize: "26px", borderRadius: "4px", border: `2px solid ${initialsPos === pos ? "#f4c430" : "#444"}`, background: initialsPos === pos ? "#222" : "#1a1a1a", color: initialsPos === pos ? "#f4c430" : "#fff", cursor: "pointer" }}
                  >
                    {initials[pos]}
                  </div>
                  <button onClick={() => cycleInitial(pos, -1)} style={{ width: "46px", height: "36px", background: "#8a0000", border: "none", color: "#fff", fontFamily: "'Courier New',monospace", fontWeight: 700, fontSize: "18px", borderRadius: "4px", cursor: "pointer" }}>▼</button>
                </div>
              ))}
            </div>
            <button
              onClick={submitInitials}
              style={{ width: "100%", padding: "13px", background: "#cc1111", border: "2px solid #880000", color: "#fff", fontFamily: "'Courier New',monospace", fontWeight: 700, fontSize: "16px", borderRadius: "5px", cursor: "pointer", letterSpacing: "0.1em" }}
            >
              SUBMIT
            </button>
          </div>
        </div>
      )}

      {/* Copy code button */}
      {(displayState === "won" || displayState === "boss_lost") && wonCode && (
        <button
          onClick={() => { navigator.clipboard.writeText(wonCode); setCopied(true); }}
          style={{
            position: "absolute", bottom: "16px", left: "50%", transform: "translateX(-50%)",
            padding: "10px 28px", background: copied ? "#2a7a2a" : "#f4c430",
            border: `2px solid ${copied ? "#1a5a1a" : "#c8a000"}`,
            color: copied ? "#fff" : "#000", fontFamily: "'Courier New',monospace", fontWeight: 700,
            fontSize: "13px", borderRadius: "5px", cursor: "pointer", letterSpacing: "0.1em", zIndex: 20,
          }}
        >
          {copied ? "✓ COPIED!" : "📋 COPY CODE"}
        </button>
      )}

      {/* Mobile duck hint */}
      {displayState === "playing" && (
        <div style={{
          position: "absolute", bottom: "6px", left: "50%", transform: "translateX(-50%)",
          fontFamily: "'Courier New',monospace", fontSize: "9px", color: "rgba(255,255,255,0.35)",
          pointerEvents: "none", letterSpacing: "0.06em", whiteSpace: "nowrap",
        }}>
          TAP = JUMP · SWIPE DOWN = DUCK
        </div>
      )}
    </div>
  );
}
