import { useEffect, useRef, useState, useCallback } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { trpc } from "@/lib/trpc";

// ============================================================
// CONSTANTS
// ============================================================
const W = 480;
const H = 270;
const LANE_COUNT = 3;
const LANE_H = H / LANE_COUNT;
const LANE_CENTERS = [LANE_H * 0.5, LANE_H * 1.5, LANE_H * 2.5];
const PLAYER_X = 80;
const PLAYER_W = 96;
const PLAYER_H = 52;
const OBS_W = 52;
const OBS_H = 52;
const COLL_W = 28;
const COLL_H = 28;
const DISCOUNT_CODE = "MOWMONEY100";
const DOUBLE_CODE = "MOWMONEY200";
const HIGH_SCORE_KEY = "nal_mower_hs_v5";
const LEADERBOARD_KEY = "nal_mower_lb_v5";

type GameState =
  | "idle" | "playing" | "level_complete" | "dead"
  | "enter_initials" | "celebration" | "double_or_nothing"
  | "boss_fight" | "won" | "boss_lost";

interface LeaderEntry { initials: string; score: number; level: number; }

function loadLB(): LeaderEntry[] {
  try { return JSON.parse(localStorage.getItem(LEADERBOARD_KEY) ?? "[]") || []; } catch { return []; }
}
function saveLB(lb: LeaderEntry[]) {
  try { localStorage.setItem(LEADERBOARD_KEY, JSON.stringify(lb)); } catch {}
}

const LEVELS = [
  {
    id: 1, name: "Residential Route",
    tagline: "Dodge the toys. Mow the lawn.",
    obstacleTypes: ["tricycle","soccer_ball","garden_hose","sprinkler","sandbox","lawn_chair"],
    collectibleType: "leaf_bag",
    bgColor: "#5aaf3c", skyColor: "#87ceeb",
    baseSpeed: 2.2, speedPerSec: 0.04,
    spawnInterval: 90, duration: 1800,
  },
  {
    id: 2, name: "HOA Gauntlet",
    tagline: "No loud noises past 10.",
    obstacleTypes: ["hoa_rep","violation_sign","measuring_tape","angry_neighbor"],
    collectibleType: "leaf_bag",
    bgColor: "#4a9e30", skyColor: "#b8d4f0",
    baseSpeed: 2.8, speedPerSec: 0.05,
    spawnInterval: 80, duration: 1800,
  },
  {
    id: 3, name: "Construction Site",
    tagline: "Hard hats required. Complaints not.",
    obstacleTypes: ["lumber_pile","porta_potty","hard_hat","cone_row","mud_puddle"],
    collectibleType: "leaf_bag",
    bgColor: "#c8a060", skyColor: "#d4c4a0",
    baseSpeed: 3.2, speedPerSec: 0.06,
    spawnInterval: 75, duration: 1800,
  },
  {
    id: 4, name: "Drought Zone",
    tagline: "Central Oregon summer. Pray for rain.",
    obstacleTypes: ["fire_ants","dead_stump","cracked_earth","sprinkler_head","tumbleweed"],
    collectibleType: "leaf_bag",
    bgColor: "#c4a050", skyColor: "#e8c880",
    baseSpeed: 3.6, speedPerSec: 0.07,
    spawnInterval: 68, duration: 1800,
  },
];

interface Obstacle { x: number; lane: number; type: string; }
interface Collectible { x: number; lane: number; }
interface BgElement { x: number; type: string; y?: number; }

// ============================================================
// DRAWING HELPERS
// ============================================================
function px(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, color: string) {
  ctx.fillStyle = color;
  ctx.fillRect(Math.round(x), Math.round(y), Math.round(w), Math.round(h));
}

function outline(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, color: string, thickness = 2) {
  ctx.strokeStyle = color;
  ctx.lineWidth = thickness;
  ctx.strokeRect(Math.round(x) + 0.5, Math.round(y) + 0.5, Math.round(w) - 1, Math.round(h) - 1);
}

function text(ctx: CanvasRenderingContext2D, str: string, x: number, y: number, size: number, color: string, align: CanvasTextAlign = "center", shadow = true) {
  ctx.font = `bold ${size}px 'Courier New', monospace`;
  ctx.textAlign = align;
  ctx.textBaseline = "middle";
  if (shadow) {
    ctx.fillStyle = "rgba(0,0,0,0.6)";
    ctx.fillText(str, x + 1, y + 1);
  }
  ctx.fillStyle = color;
  ctx.fillText(str, x, y);
}

// ============================================================
// SPRITE DRAWING
// ============================================================

function drawMower(ctx: CanvasRenderingContext2D, cx: number, cy: number, frame: number) {
  const x = cx - PLAYER_W / 2;
  const y = cy - PLAYER_H / 2;

  // Shadow
  ctx.fillStyle = "rgba(0,0,0,0.25)";
  ctx.beginPath();
  ctx.ellipse(cx, cy + PLAYER_H / 2 + 3, PLAYER_W * 0.45, 6, 0, 0, Math.PI * 2);
  ctx.fill();

  // Rear wheels (left side of sprite = back of mower)
  px(ctx, x + 2, y + PLAYER_H - 16, 18, 18, "#1a1a1a");
  px(ctx, x + 6, y + PLAYER_H - 12, 10, 10, "#555");
  px(ctx, x + 10, y + PLAYER_H - 8, 2, 2, "#888");

  // Front wheels
  px(ctx, x + PLAYER_W - 20, y + PLAYER_H - 12, 14, 14, "#1a1a1a");
  px(ctx, x + PLAYER_W - 17, y + PLAYER_H - 9, 8, 8, "#555");

  // Red cutting deck (bottom platform)
  px(ctx, x + 14, y + PLAYER_H - 18, PLAYER_W - 28, 14, "#cc1111");
  px(ctx, x + 14, y + PLAYER_H - 20, PLAYER_W - 28, 4, "#ee2222");
  outline(ctx, x + 14, y + PLAYER_H - 18, PLAYER_W - 28, 14, "#880000", 2);

  // NAVIGATOR text on deck
  ctx.font = "bold 5px 'Courier New', monospace";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillStyle = "#ffffff";
  ctx.fillText("NAVIGATOR", cx, y + PLAYER_H - 11);

  // White hopper/catcher (large box on back/left)
  px(ctx, x + 2, y + 6, 32, 30, "#e8e8e8");
  px(ctx, x + 2, y + 6, 32, 6, "#f5f5f5");
  outline(ctx, x + 2, y + 6, 32, 30, "#999", 2);
  // Hopper vent lines
  for (let i = 0; i < 3; i++) {
    px(ctx, x + 6, y + 14 + i * 7, 24, 2, "#ccc");
  }
  // Hopper label
  ctx.font = "bold 4px 'Courier New', monospace";
  ctx.textAlign = "center";
  ctx.fillStyle = "#666";
  ctx.fillText("EXMARK", x + 18, y + 36);

  // Operator seat area
  px(ctx, x + 38, y + PLAYER_H - 32, 20, 12, "#8B4513");
  outline(ctx, x + 38, y + PLAYER_H - 32, 20, 12, "#5c2d0a", 1);

  // Operator body (red NAL shirt)
  const bx = x + 42;
  const by = y + 8;
  // Torso
  px(ctx, bx, by + 10, 18, 18, "#cc1111");
  px(ctx, bx + 2, by + 10, 14, 4, "#dd2222"); // highlight
  outline(ctx, bx, by + 10, 18, 18, "#880000", 1);
  // Arms
  px(ctx, bx - 4, by + 12, 6, 10, "#cc1111");
  px(ctx, bx + 18, by + 12, 6, 10, "#cc1111");
  // Hands on controls
  px(ctx, bx - 4, by + 20, 6, 5, "#f4c07a");
  px(ctx, bx + 18, by + 20, 6, 5, "#f4c07a");
  // Legs (seated - bent)
  px(ctx, bx + 2, by + 28, 8, 8, "#2a2a5a");
  px(ctx, bx + 10, by + 28, 8, 8, "#2a2a5a");
  // Boots
  px(ctx, bx + 2, by + 34, 8, 5, "#1a1a1a");
  px(ctx, bx + 10, by + 34, 8, 5, "#1a1a1a");
  // Head
  px(ctx, bx + 3, by, 12, 12, "#f4c07a");
  outline(ctx, bx + 3, by, 12, 12, "#c8843a", 1);
  // Eyes
  px(ctx, bx + 5, by + 4, 2, 2, "#1a1a1a");
  px(ctx, bx + 10, by + 4, 2, 2, "#1a1a1a");
  // Smile
  px(ctx, bx + 6, by + 8, 5, 1, "#c8843a");
  // Cap (red NAL cap)
  px(ctx, bx + 2, by - 4, 14, 6, "#cc1111");
  px(ctx, bx + 2, by - 4, 14, 2, "#ee2222");
  outline(ctx, bx + 2, by - 4, 14, 6, "#880000", 1);
  // Cap brim
  px(ctx, bx + 12, by - 2, 8, 3, "#cc1111");
  // NAL on cap
  ctx.font = "bold 4px 'Courier New', monospace";
  ctx.textAlign = "center";
  ctx.fillStyle = "#ffffff";
  ctx.fillText("NAL", bx + 9, by - 1);

  // Speed lines when moving
  if (frame % 4 < 2) {
    ctx.strokeStyle = "rgba(255,255,255,0.4)";
    ctx.lineWidth = 1;
    for (let i = 0; i < 3; i++) {
      const ly = y + 10 + i * 14;
      ctx.beginPath();
      ctx.moveTo(x - 8, ly);
      ctx.lineTo(x - 20, ly);
      ctx.stroke();
    }
  }
}

function drawObstacle(ctx: CanvasRenderingContext2D, type: string, cx: number, cy: number, frame: number) {
  const x = cx - OBS_W / 2;
  const y = cy - OBS_H / 2;

  ctx.save();

  switch (type) {
    case "tricycle": {
      // Body
      px(ctx, x + 8, y + 18, 36, 18, "#e84040");
      outline(ctx, x + 8, y + 18, 36, 18, "#990000", 2);
      // Wheels
      ctx.fillStyle = "#1a1a1a";
      ctx.beginPath(); ctx.arc(x + 16, y + 40, 10, 0, Math.PI * 2); ctx.fill();
      ctx.beginPath(); ctx.arc(x + 38, y + 40, 8, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = "#555";
      ctx.beginPath(); ctx.arc(x + 16, y + 40, 5, 0, Math.PI * 2); ctx.fill();
      ctx.beginPath(); ctx.arc(x + 38, y + 40, 4, 0, Math.PI * 2); ctx.fill();
      // Handlebars
      px(ctx, x + 28, y + 10, 4, 12, "#888");
      px(ctx, x + 22, y + 10, 16, 4, "#888");
      // Seat
      px(ctx, x + 18, y + 14, 16, 6, "#2244cc");
      break;
    }
    case "soccer_ball": {
      const r = 22;
      ctx.fillStyle = "#ffffff";
      ctx.beginPath(); ctx.arc(cx, cy + 4, r, 0, Math.PI * 2); ctx.fill();
      ctx.strokeStyle = "#1a1a1a"; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.arc(cx, cy + 4, r, 0, Math.PI * 2); ctx.stroke();
      // Pentagon patches
      ctx.fillStyle = "#1a1a1a";
      const patches = [[0,-14],[12,8],[-12,8],[0,4]];
      patches.forEach(([px2, py2]) => {
        ctx.beginPath();
        for (let i = 0; i < 5; i++) {
          const a = (i * 72 - 90) * Math.PI / 180;
          const px3 = cx + px2 + Math.cos(a) * 6;
          const py3 = cy + 4 + py2 + Math.sin(a) * 6;
          if (i === 0) ctx.moveTo(px3, py3); else ctx.lineTo(px3, py3);
        }
        ctx.closePath(); ctx.fill();
      });
      // Shadow
      ctx.fillStyle = "rgba(0,0,0,0.2)";
      ctx.beginPath(); ctx.ellipse(cx, cy + 28, 18, 5, 0, 0, Math.PI * 2); ctx.fill();
      break;
    }
    case "garden_hose": {
      ctx.strokeStyle = "#228b22"; ctx.lineWidth = 5;
      ctx.lineCap = "round";
      ctx.beginPath();
      ctx.moveTo(x + 8, y + 44);
      ctx.bezierCurveTo(x + 8, y + 10, x + 44, y + 10, x + 44, y + 44);
      ctx.bezierCurveTo(x + 44, y + 26, x + 26, y + 26, x + 26, y + 44);
      ctx.stroke();
      // Nozzle
      px(ctx, x + 22, y + 40, 8, 12, "#888");
      outline(ctx, x + 22, y + 40, 8, 12, "#555", 1);
      // Water spray
      if (frame % 6 < 3) {
        ctx.strokeStyle = "#4488ff"; ctx.lineWidth = 2;
        for (let i = 0; i < 3; i++) {
          ctx.beginPath();
          ctx.moveTo(x + 26, y + 38);
          ctx.lineTo(x + 26 + (i - 1) * 8, y + 28);
          ctx.stroke();
        }
      }
      break;
    }
    case "sprinkler": {
      // Spike
      px(ctx, x + 22, y + 30, 8, 22, "#888");
      // Head
      px(ctx, x + 14, y + 22, 24, 10, "#aaa");
      outline(ctx, x + 14, y + 22, 24, 10, "#666", 2);
      // Rotating arm
      const angle = (frame * 3) * Math.PI / 180;
      ctx.strokeStyle = "#888"; ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(cx, y + 27);
      ctx.lineTo(cx + Math.cos(angle) * 16, y + 27 + Math.sin(angle) * 4);
      ctx.stroke();
      // Water
      if (frame % 4 < 2) {
        ctx.strokeStyle = "#4488ff"; ctx.lineWidth = 1;
        for (let i = 0; i < 4; i++) {
          ctx.beginPath();
          ctx.moveTo(cx + Math.cos(angle) * 16, y + 27);
          ctx.lineTo(cx + Math.cos(angle) * 16 + Math.cos(angle + 0.5 + i * 0.3) * 10, y + 27 - 8 - i * 3);
          ctx.stroke();
        }
      }
      break;
    }
    case "sandbox": {
      // Box
      px(ctx, x + 4, y + 20, 44, 28, "#f4d03f");
      outline(ctx, x + 4, y + 20, 44, 28, "#c9a227", 3);
      // Sand texture
      px(ctx, x + 8, y + 24, 36, 20, "#f9e07a");
      // Toys in sand
      px(ctx, x + 12, y + 28, 10, 8, "#e84040"); // bucket
      px(ctx, x + 30, y + 30, 12, 4, "#2244cc"); // shovel
      // Walls
      px(ctx, x + 4, y + 20, 44, 5, "#c9a227");
      px(ctx, x + 4, y + 43, 44, 5, "#c9a227");
      break;
    }
    case "lawn_chair": {
      // Legs
      px(ctx, x + 8, y + 28, 4, 24, "#888");
      px(ctx, x + 40, y + 28, 4, 24, "#888");
      px(ctx, x + 6, y + 44, 16, 4, "#888");
      px(ctx, x + 30, y + 44, 16, 4, "#888");
      // Seat
      px(ctx, x + 6, y + 26, 40, 8, "#2244cc");
      // Backrest
      px(ctx, x + 6, y + 10, 8, 18, "#2244cc");
      px(ctx, x + 38, y + 10, 8, 18, "#2244cc");
      px(ctx, x + 6, y + 10, 40, 8, "#2244cc");
      // Stripes
      for (let i = 0; i < 4; i++) {
        px(ctx, x + 6 + i * 10, y + 10, 4, 26, "#4466ee");
      }
      outline(ctx, x + 6, y + 10, 40, 24, "#1133aa", 2);
      break;
    }
    case "hoa_rep": {
      // Shadow
      ctx.fillStyle = "rgba(0,0,0,0.2)";
      ctx.beginPath(); ctx.ellipse(cx, cy + 24, 14, 4, 0, 0, Math.PI * 2); ctx.fill();
      // Legs
      px(ctx, cx - 10, cy + 6, 8, 18, "#2a2a6a");
      px(ctx, cx + 2, cy + 6, 8, 18, "#2a2a6a");
      // Shoes
      px(ctx, cx - 12, cy + 22, 10, 5, "#1a1a1a");
      px(ctx, cx + 2, cy + 22, 10, 5, "#1a1a1a");
      // Body (khaki polo)
      px(ctx, cx - 12, cy - 12, 24, 20, "#c8a860");
      outline(ctx, cx - 12, cy - 12, 24, 20, "#8a7040", 2);
      // Clipboard
      px(ctx, cx + 10, cy - 8, 12, 16, "#f5f5dc");
      outline(ctx, cx + 10, cy - 8, 12, 16, "#888", 2);
      px(ctx, cx + 12, cy - 4, 8, 2, "#aaa");
      px(ctx, cx + 12, cy, 8, 2, "#aaa");
      px(ctx, cx + 12, cy + 4, 8, 2, "#aaa");
      // Clip
      px(ctx, cx + 14, cy - 10, 4, 4, "#888");
      // Head
      px(ctx, cx - 8, cy - 26, 16, 16, "#f4c07a");
      outline(ctx, cx - 8, cy - 26, 16, 16, "#c8843a", 1);
      // Angry eyes
      px(ctx, cx - 5, cy - 21, 3, 3, "#1a1a1a");
      px(ctx, cx + 2, cy - 21, 3, 3, "#1a1a1a");
      // Frown
      px(ctx, cx - 4, cy - 14, 8, 2, "#c8843a");
      px(ctx, cx - 5, cy - 13, 2, 2, "#c8843a");
      px(ctx, cx + 3, cy - 13, 2, 2, "#c8843a");
      // Hat (inspector hat)
      px(ctx, cx - 10, cy - 30, 20, 6, "#2a2a6a");
      px(ctx, cx - 8, cy - 36, 16, 8, "#2a2a6a");
      // Speech bubble
      const bob = Math.sin(frame * 0.1) * 2;
      px(ctx, cx - 28, cy - 48 + bob, 52, 18, "#fffde7");
      outline(ctx, cx - 28, cy - 48 + bob, 52, 18, "#888", 2);
      px(ctx, cx - 4, cy - 30 + bob, 8, 6, "#fffde7");
      const msgs = ["VIOLATION!", "RULE #47!", "TOO LOUD!", "CALL HOA!"];
      const msg = msgs[Math.floor(frame / 40) % msgs.length];
      ctx.font = "bold 6px 'Courier New', monospace";
      ctx.textAlign = "center"; ctx.textBaseline = "middle";
      ctx.fillStyle = "#cc0000";
      ctx.fillText(msg, cx, cy - 39 + bob);
      break;
    }
    case "violation_sign": {
      // Post
      px(ctx, cx - 3, y + 20, 6, 32, "#888");
      // Sign board
      px(ctx, x + 2, y + 4, 48, 20, "#cc1111");
      outline(ctx, x + 2, y + 4, 48, 20, "#880000", 3);
      // White border
      px(ctx, x + 4, y + 6, 44, 16, "#cc1111");
      px(ctx, x + 6, y + 7, 40, 14, "#ee2222");
      // Text
      ctx.font = "bold 6px 'Courier New', monospace";
      ctx.textAlign = "center"; ctx.textBaseline = "middle";
      ctx.fillStyle = "#ffffff";
      ctx.fillText("NO LOUD", cx, y + 11);
      ctx.fillText("NOISES", cx, y + 18);
      // Sub text
      ctx.font = "bold 4px 'Courier New', monospace";
      ctx.fillText("PAST 10PM", cx, y + 24);
      break;
    }
    case "measuring_tape": {
      // Case
      ctx.fillStyle = "#f4c430";
      ctx.beginPath(); ctx.arc(cx, cy, 22, 0, Math.PI * 2); ctx.fill();
      outline(ctx, cx - 22, cy - 22, 44, 44, "#c8a000", 2);
      // Center hub
      ctx.fillStyle = "#888";
      ctx.beginPath(); ctx.arc(cx, cy, 8, 0, Math.PI * 2); ctx.fill();
      // Tape extending
      px(ctx, cx + 8, cy - 3, 28, 6, "#f5f5dc");
      outline(ctx, cx + 8, cy - 3, 28, 6, "#888", 1);
      // Measurements
      for (let i = 0; i < 5; i++) {
        px(ctx, cx + 12 + i * 5, cy - 3, 1, 6, "#888");
      }
      // HOA label
      ctx.font = "bold 5px 'Courier New', monospace";
      ctx.textAlign = "center"; ctx.textBaseline = "middle";
      ctx.fillStyle = "#1a1a1a";
      ctx.fillText("HOA", cx, cy);
      break;
    }
    case "angry_neighbor": {
      // Shadow
      ctx.fillStyle = "rgba(0,0,0,0.2)";
      ctx.beginPath(); ctx.ellipse(cx, cy + 24, 12, 4, 0, 0, Math.PI * 2); ctx.fill();
      // Bathrobe
      px(ctx, cx - 12, cy - 10, 24, 22, "#c8c8c8");
      outline(ctx, cx - 12, cy - 10, 24, 22, "#888", 2);
      // Robe lapels
      px(ctx, cx - 4, cy - 10, 8, 22, "#aaa");
      // Legs
      px(ctx, cx - 8, cy + 12, 8, 14, "#c8c8c8");
      px(ctx, cx, cy + 12, 8, 14, "#c8c8c8");
      // Slippers
      px(ctx, cx - 10, cy + 24, 12, 5, "#e8c880");
      px(ctx, cx, cy + 24, 12, 5, "#e8c880");
      // Head
      px(ctx, cx - 8, cy - 26, 16, 16, "#f4c07a");
      outline(ctx, cx - 8, cy - 26, 16, 16, "#c8843a", 1);
      // Angry face
      px(ctx, cx - 5, cy - 21, 3, 3, "#1a1a1a");
      px(ctx, cx + 2, cy - 21, 3, 3, "#1a1a1a");
      px(ctx, cx - 5, cy - 23, 6, 2, "#c8843a");
      px(ctx, cx + 1, cy - 23, 6, 2, "#c8843a");
      px(ctx, cx - 4, cy - 14, 8, 2, "#c8843a");
      // Messy hair
      px(ctx, cx - 8, cy - 32, 16, 8, "#888");
      px(ctx, cx - 10, cy - 30, 4, 6, "#888");
      px(ctx, cx + 6, cy - 30, 4, 6, "#888");
      // Coffee mug
      px(ctx, cx + 10, cy - 4, 10, 12, "#ffffff");
      outline(ctx, cx + 10, cy - 4, 10, 12, "#888", 2);
      ctx.strokeStyle = "#888"; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.arc(cx + 22, cy + 2, 4, -Math.PI/2, Math.PI/2); ctx.stroke();
      // Steam
      if (frame % 8 < 4) {
        ctx.strokeStyle = "rgba(200,200,200,0.6)"; ctx.lineWidth = 1;
        ctx.beginPath(); ctx.moveTo(cx + 14, cy - 6); ctx.lineTo(cx + 12, cy - 14); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(cx + 18, cy - 6); ctx.lineTo(cx + 20, cy - 14); ctx.stroke();
      }
      break;
    }
    case "lumber_pile": {
      // Stack of lumber
      for (let i = 0; i < 4; i++) {
        const ly = y + 38 - i * 8;
        px(ctx, x + 4 + i * 2, ly, 44 - i * 4, 7, i % 2 === 0 ? "#c8a060" : "#b08040");
        outline(ctx, x + 4 + i * 2, ly, 44 - i * 4, 7, "#7a5020", 1);
        // Wood grain
        for (let j = 0; j < 3; j++) {
          px(ctx, x + 10 + j * 12 + i * 2, ly + 2, 2, 3, "rgba(0,0,0,0.15)");
        }
      }
      // End grain circles
      ctx.fillStyle = "#8a5c20";
      ctx.beginPath(); ctx.arc(x + 8, y + 22, 5, 0, Math.PI * 2); ctx.fill();
      ctx.beginPath(); ctx.arc(x + 8, y + 30, 5, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = "#c8a060";
      ctx.beginPath(); ctx.arc(x + 8, y + 22, 2, 0, Math.PI * 2); ctx.fill();
      ctx.beginPath(); ctx.arc(x + 8, y + 30, 2, 0, Math.PI * 2); ctx.fill();
      break;
    }
    case "porta_potty": {
      // Main body
      px(ctx, x + 8, y + 8, 36, 44, "#4488cc");
      outline(ctx, x + 8, y + 8, 36, 44, "#2255aa", 3);
      // Roof
      px(ctx, x + 6, y + 4, 40, 8, "#3366bb");
      // Door
      px(ctx, x + 18, y + 24, 16, 28, "#3366bb");
      outline(ctx, x + 18, y + 24, 16, 28, "#2255aa", 2);
      // Door handle
      px(ctx, x + 30, y + 36, 3, 6, "#f4c430");
      // Vent
      px(ctx, x + 12, y + 12, 8, 8, "#2255aa");
      for (let i = 0; i < 3; i++) {
        px(ctx, x + 13, y + 13 + i * 2, 6, 1, "#88aadd");
      }
      // Sign
      ctx.font = "bold 5px 'Courier New', monospace";
      ctx.textAlign = "center"; ctx.textBaseline = "middle";
      ctx.fillStyle = "#ffffff";
      ctx.fillText("OCCUPIED", cx, y + 18);
      // Smell lines
      if (frame % 10 < 5) {
        ctx.strokeStyle = "rgba(150,200,50,0.5)"; ctx.lineWidth = 1;
        for (let i = 0; i < 3; i++) {
          ctx.beginPath();
          ctx.moveTo(x + 14 + i * 8, y + 4);
          ctx.bezierCurveTo(x + 10 + i * 8, y - 4, x + 18 + i * 8, y - 8, x + 14 + i * 8, y - 14);
          ctx.stroke();
        }
      }
      break;
    }
    case "hard_hat": {
      // Hat dome
      ctx.fillStyle = "#f4c430";
      ctx.beginPath();
      ctx.arc(cx, cy + 4, 22, Math.PI, 0);
      ctx.fill();
      // Brim
      px(ctx, x + 2, cy + 4, 48, 6, "#f4c430");
      outline(ctx, x + 2, cy + 4, 48, 6, "#c8a000", 2);
      // Dome outline
      ctx.strokeStyle = "#c8a000"; ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(cx, cy + 4, 22, Math.PI, 0);
      ctx.stroke();
      // Suspension ridge
      px(ctx, cx - 16, cy + 2, 32, 4, "#e8b800");
      // Ground shadow
      ctx.fillStyle = "rgba(0,0,0,0.2)";
      ctx.beginPath(); ctx.ellipse(cx, cy + 26, 20, 5, 0, 0, Math.PI * 2); ctx.fill();
      break;
    }
    case "cone_row": {
      for (let i = 0; i < 3; i++) {
        const cx2 = x + 8 + i * 16;
        // Cone body
        ctx.fillStyle = "#ff6600";
        ctx.beginPath();
        ctx.moveTo(cx2, y + 8);
        ctx.lineTo(cx2 - 10, y + 44);
        ctx.lineTo(cx2 + 10, y + 44);
        ctx.closePath();
        ctx.fill();
        // White stripe
        ctx.fillStyle = "#ffffff";
        ctx.beginPath();
        ctx.moveTo(cx2 - 5, y + 24);
        ctx.lineTo(cx2 + 5, y + 24);
        ctx.lineTo(cx2 + 7, y + 32);
        ctx.lineTo(cx2 - 7, y + 32);
        ctx.closePath();
        ctx.fill();
        // Base
        px(ctx, cx2 - 12, y + 42, 24, 5, "#ff6600");
        // Outline
        ctx.strokeStyle = "#cc4400"; ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(cx2, y + 8);
        ctx.lineTo(cx2 - 10, y + 44);
        ctx.lineTo(cx2 + 10, y + 44);
        ctx.closePath();
        ctx.stroke();
      }
      break;
    }
    case "mud_puddle": {
      // Puddle
      ctx.fillStyle = "#6b4423";
      ctx.beginPath(); ctx.ellipse(cx, cy + 14, 26, 14, 0, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = "#7a5030";
      ctx.beginPath(); ctx.ellipse(cx - 4, cy + 10, 18, 9, -0.2, 0, Math.PI * 2); ctx.fill();
      // Ripples
      if (frame % 20 < 10) {
        ctx.strokeStyle = "rgba(100,60,20,0.4)"; ctx.lineWidth = 1;
        ctx.beginPath(); ctx.ellipse(cx, cy + 14, 20 + (frame % 20), 10 + (frame % 20) * 0.5, 0, 0, Math.PI * 2); ctx.stroke();
      }
      // Splash drops
      ctx.fillStyle = "#8a6040";
      for (let i = 0; i < 4; i++) {
        const a = (i * 90 + frame * 5) * Math.PI / 180;
        ctx.beginPath(); ctx.arc(cx + Math.cos(a) * 22, cy + 14 + Math.sin(a) * 10, 3, 0, Math.PI * 2); ctx.fill();
      }
      break;
    }
    case "fire_ants": {
      // Mound
      ctx.fillStyle = "#c8703a";
      ctx.beginPath(); ctx.arc(cx, cy + 14, 24, Math.PI, 0); ctx.fill();
      ctx.fillStyle = "#b05c28";
      ctx.beginPath(); ctx.arc(cx, cy + 14, 24, Math.PI, 0); ctx.stroke();
      // Mound texture
      for (let i = 0; i < 6; i++) {
        ctx.fillStyle = "#a04c18";
        ctx.beginPath(); ctx.arc(cx - 16 + i * 6, cy + 10, 3, 0, Math.PI * 2); ctx.fill();
      }
      // Ants crawling
      ctx.fillStyle = "#1a0a00";
      const antPositions = [
        [cx - 20, cy + 4], [cx + 18, cy + 6], [cx - 8, cy - 2],
        [cx + 6, cy - 4], [cx - 14, cy + 14], [cx + 20, cy + 12],
      ];
      antPositions.forEach(([ax, ay], i) => {
        const offset = Math.sin(frame * 0.2 + i) * 3;
        ctx.beginPath(); ctx.arc(ax + offset, ay, 2, 0, Math.PI * 2); ctx.fill();
        ctx.beginPath(); ctx.arc(ax + offset + 4, ay + 1, 1.5, 0, Math.PI * 2); ctx.fill();
        ctx.beginPath(); ctx.arc(ax + offset - 4, ay + 1, 1.5, 0, Math.PI * 2); ctx.fill();
      });
      // Warning
      ctx.font = "bold 8px 'Courier New', monospace";
      ctx.textAlign = "center"; ctx.textBaseline = "middle";
      ctx.fillStyle = "#ff4400";
      ctx.fillText("!", cx, cy - 8);
      break;
    }
    case "dead_stump": {
      // Roots
      ctx.fillStyle = "#5a3010";
      ctx.beginPath();
      ctx.moveTo(cx - 20, cy + 24);
      ctx.bezierCurveTo(cx - 14, cy + 14, cx - 8, cy + 18, cx, cy + 20);
      ctx.bezierCurveTo(cx + 8, cy + 18, cx + 14, cy + 14, cx + 20, cy + 24);
      ctx.fill();
      // Stump body
      ctx.fillStyle = "#6b4020";
      ctx.beginPath();
      ctx.moveTo(cx - 18, cy + 22);
      ctx.lineTo(cx - 14, cy - 8);
      ctx.lineTo(cx + 14, cy - 8);
      ctx.lineTo(cx + 18, cy + 22);
      ctx.closePath();
      ctx.fill();
      outline(ctx, cx - 18, cy - 8, 36, 30, "#3a1a00", 2);
      // Tree rings
      ctx.strokeStyle = "#5a3010"; ctx.lineWidth = 1;
      ctx.beginPath(); ctx.ellipse(cx, cy - 8, 14, 5, 0, 0, Math.PI * 2); ctx.stroke();
      ctx.beginPath(); ctx.ellipse(cx, cy - 8, 9, 3, 0, 0, Math.PI * 2); ctx.stroke();
      ctx.beginPath(); ctx.ellipse(cx, cy - 8, 4, 2, 0, 0, Math.PI * 2); ctx.stroke();
      // Top cap
      ctx.fillStyle = "#7a5030";
      ctx.beginPath(); ctx.ellipse(cx, cy - 8, 14, 5, 0, 0, Math.PI * 2); ctx.fill();
      ctx.strokeStyle = "#3a1a00"; ctx.lineWidth = 1;
      ctx.beginPath(); ctx.ellipse(cx, cy - 8, 14, 5, 0, 0, Math.PI * 2); ctx.stroke();
      break;
    }
    case "cracked_earth": {
      // Base
      px(ctx, x + 2, y + 16, 48, 32, "#c8903a");
      // Cracks
      ctx.strokeStyle = "#8a5a1a"; ctx.lineWidth = 2;
      const cracks = [
        [[cx - 20, cy + 10], [cx - 8, cy + 20], [cx - 16, cy + 30]],
        [[cx + 10, cy + 8], [cx + 20, cy + 18], [cx + 12, cy + 28]],
        [[cx - 4, cy + 14], [cx + 8, cy + 22], [cx + 2, cy + 32]],
        [[cx - 18, cy + 22], [cx - 6, cy + 28], [cx - 14, cy + 36]],
      ];
      cracks.forEach(pts => {
        ctx.beginPath();
        ctx.moveTo(pts[0][0], pts[0][1]);
        pts.slice(1).forEach(p => ctx.lineTo(p[0], p[1]));
        ctx.stroke();
      });
      // Dried grass tufts
      ctx.strokeStyle = "#a07830"; ctx.lineWidth = 1;
      [[cx - 16, cy + 16], [cx + 14, cy + 20], [cx, cy + 30]].forEach(([gx, gy]) => {
        for (let i = -2; i <= 2; i++) {
          ctx.beginPath();
          ctx.moveTo(gx, gy);
          ctx.lineTo(gx + i * 3, gy - 8);
          ctx.stroke();
        }
      });
      break;
    }
    case "sprinkler_head": {
      // Pipe
      px(ctx, cx - 3, y + 20, 6, 32, "#888");
      // Head
      ctx.fillStyle = "#aaa";
      ctx.beginPath(); ctx.arc(cx, y + 20, 8, 0, Math.PI * 2); ctx.fill();
      outline(ctx, cx - 8, y + 12, 16, 16, "#666", 2);
      // Broken spray (irregular)
      if (frame % 6 < 3) {
        ctx.strokeStyle = "#4488ff"; ctx.lineWidth = 2;
        for (let i = 0; i < 5; i++) {
          const a = (-60 + i * 30) * Math.PI / 180;
          ctx.beginPath();
          ctx.moveTo(cx, y + 20);
          ctx.lineTo(cx + Math.cos(a) * (12 + Math.sin(frame * 0.3 + i) * 6), y + 20 + Math.sin(a) * (12 + Math.cos(frame * 0.3 + i) * 6));
          ctx.stroke();
        }
      }
      break;
    }
    case "tumbleweed": {
      const roll = (frame * 4) % 360;
      ctx.save();
      ctx.translate(cx, cy + 8);
      ctx.rotate(roll * Math.PI / 180);
      ctx.strokeStyle = "#8a6020"; ctx.lineWidth = 2;
      for (let i = 0; i < 6; i++) {
        const a = (i * 60) * Math.PI / 180;
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.bezierCurveTo(
          Math.cos(a) * 8, Math.sin(a) * 8,
          Math.cos(a + 0.5) * 18, Math.sin(a + 0.5) * 18,
          Math.cos(a) * 22, Math.sin(a) * 22
        );
        ctx.stroke();
      }
      ctx.strokeStyle = "#a07830";
      ctx.beginPath(); ctx.arc(0, 0, 18, 0, Math.PI * 2); ctx.stroke();
      ctx.beginPath(); ctx.arc(0, 0, 10, 0, Math.PI * 2); ctx.stroke();
      ctx.restore();
      // Shadow
      ctx.fillStyle = "rgba(0,0,0,0.2)";
      ctx.beginPath(); ctx.ellipse(cx, cy + 30, 18, 5, 0, 0, Math.PI * 2); ctx.fill();
      break;
    }
  }
  ctx.restore();
}

function drawCollectible(ctx: CanvasRenderingContext2D, cx: number, cy: number, frame: number) {
  const bob = Math.sin(frame * 0.15) * 3;
  // Leaf bag
  ctx.fillStyle = "#2a7a2a";
  ctx.beginPath();
  ctx.moveTo(cx - 12, cy + 14 + bob);
  ctx.bezierCurveTo(cx - 14, cy - 4 + bob, cx + 14, cy - 4 + bob, cx + 12, cy + 14 + bob);
  ctx.closePath();
  ctx.fill();
  outline(ctx, cx - 12, cy - 4 + bob, 24, 18, "#1a5a1a", 2);
  // Tie
  px(ctx, cx - 4, cy - 6 + bob, 8, 4, "#8B4513");
  // Leaf
  ctx.fillStyle = "#f4c430";
  ctx.beginPath();
  ctx.moveTo(cx, cy + 2 + bob);
  ctx.bezierCurveTo(cx - 8, cy - 8 + bob, cx + 8, cy - 8 + bob, cx, cy + 2 + bob);
  ctx.fill();
  // Glow
  ctx.strokeStyle = "rgba(255,220,0,0.4)";
  ctx.lineWidth = 2;
  ctx.beginPath(); ctx.arc(cx, cy + 4 + bob, 16, 0, Math.PI * 2); ctx.stroke();
}

// ============================================================
// BACKGROUND DRAWING
// ============================================================

function drawBackground(ctx: CanvasRenderingContext2D, level: number, scrollX: number, frame: number) {
  const lv = LEVELS[level - 1];

  if (level === 1) {
    // Sky
    const skyGrad = ctx.createLinearGradient(0, 0, 0, H * 0.45);
    skyGrad.addColorStop(0, "#5ba3e8");
    skyGrad.addColorStop(1, "#a8d4f5");
    ctx.fillStyle = skyGrad;
    ctx.fillRect(0, 0, W, H * 0.45);

    // Clouds
    ctx.fillStyle = "rgba(255,255,255,0.9)";
    const clouds = [[80, 30, 40, 18], [220, 20, 50, 20], [380, 35, 35, 15]];
    clouds.forEach(([cx2, cy2, w2, h2]) => {
      const ox = ((scrollX * 0.3) % (W + 100)) - 50;
      const cx3 = ((cx2 - ox) % (W + 100) + W + 100) % (W + 100) - 50;
      ctx.beginPath(); ctx.ellipse(cx3, cy2, w2, h2, 0, 0, Math.PI * 2); ctx.fill();
      ctx.beginPath(); ctx.ellipse(cx3 - 20, cy2 + 5, w2 * 0.7, h2 * 0.8, 0, 0, Math.PI * 2); ctx.fill();
      ctx.beginPath(); ctx.ellipse(cx3 + 20, cy2 + 5, w2 * 0.7, h2 * 0.8, 0, 0, Math.PI * 2); ctx.fill();
    });

    // Lawn gradient
    const lawnGrad = ctx.createLinearGradient(0, H * 0.45, 0, H);
    lawnGrad.addColorStop(0, "#5aaf3c");
    lawnGrad.addColorStop(1, "#3a8a20");
    ctx.fillStyle = lawnGrad;
    ctx.fillRect(0, H * 0.45, W, H * 0.55);

    // Mow stripes
    for (let i = 0; i < 4; i++) {
      const sy = H * 0.45 + i * (H * 0.55 / 4);
      ctx.fillStyle = i % 2 === 0 ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)";
      ctx.fillRect(0, sy, W, H * 0.55 / 4);
    }

    // Houses in background
    const houseX = [40, 160, 310, 430];
    houseX.forEach(hx => {
      const ox = ((hx - scrollX * 0.5) % (W + 120) + W + 120) % (W + 120) - 60;
      // House body
      px(ctx, ox, H * 0.25, 60, 40, "#f5e6d0");
      outline(ctx, ox, H * 0.25, 60, 40, "#c8a880", 1);
      // Roof
      ctx.fillStyle = "#8B4513";
      ctx.beginPath();
      ctx.moveTo(ox - 4, H * 0.25);
      ctx.lineTo(ox + 30, H * 0.12);
      ctx.lineTo(ox + 64, H * 0.25);
      ctx.closePath();
      ctx.fill();
      // Door
      px(ctx, ox + 22, H * 0.45, 16, 20, "#8B4513");
      // Windows
      px(ctx, ox + 6, H * 0.3, 14, 12, "#87ceeb");
      outline(ctx, ox + 6, H * 0.3, 14, 12, "#888", 1);
      px(ctx, ox + 40, H * 0.3, 14, 12, "#87ceeb");
      outline(ctx, ox + 40, H * 0.3, 14, 12, "#888", 1);
    });

    // Fence
    const fenceY = H * 0.45;
    for (let i = 0; i < 20; i++) {
      const fx = ((i * 28 - scrollX * 0.7) % (W + 56) + W + 56) % (W + 56) - 28;
      px(ctx, fx, fenceY - 14, 4, 18, "#f5f5f5");
      px(ctx, fx + 4, fenceY - 10, 20, 4, "#f5f5f5");
    }

    // NAL yard sign
    const signX = ((200 - scrollX * 0.8) % (W + 80) + W + 80) % (W + 80) - 40;
    px(ctx, signX, H * 0.38, 36, 20, "#cc1111");
    outline(ctx, signX, H * 0.38, 36, 20, "#880000", 2);
    ctx.font = "bold 5px 'Courier New', monospace";
    ctx.textAlign = "center"; ctx.textBaseline = "middle";
    ctx.fillStyle = "#ffffff";
    ctx.fillText("NAL", signX + 18, H * 0.38 + 7);
    ctx.fillText("CREW", signX + 18, H * 0.38 + 14);
    px(ctx, signX + 16, H * 0.58, 4, 20, "#888");

    // Lane dividers (grass path lines)
    ctx.strokeStyle = "rgba(255,255,255,0.15)";
    ctx.setLineDash([20, 10]);
    ctx.lineWidth = 1;
    for (let i = 1; i < LANE_COUNT; i++) {
      ctx.beginPath();
      ctx.moveTo(0, LANE_H * i);
      ctx.lineTo(W, LANE_H * i);
      ctx.stroke();
    }
    ctx.setLineDash([]);

  } else if (level === 2) {
    // HOA sky
    const skyGrad = ctx.createLinearGradient(0, 0, 0, H * 0.4);
    skyGrad.addColorStop(0, "#7ab8e8");
    skyGrad.addColorStop(1, "#c8e0f8");
    ctx.fillStyle = skyGrad;
    ctx.fillRect(0, 0, W, H * 0.4);

    // Manicured lawn
    const lawnGrad = ctx.createLinearGradient(0, H * 0.4, 0, H);
    lawnGrad.addColorStop(0, "#4a9e30");
    lawnGrad.addColorStop(1, "#2a7a18");
    ctx.fillStyle = lawnGrad;
    ctx.fillRect(0, H * 0.4, W, H * 0.6);

    // Tall grass in lanes (HOA overgrown)
    for (let lane = 0; lane < LANE_COUNT; lane++) {
      const grassY = LANE_H * lane + LANE_H * 0.6;
      for (let i = 0; i < 30; i++) {
        const gx = ((i * 16 - scrollX * 0.9) % (W + 32) + W + 32) % (W + 32) - 16;
        const gh = 18 + Math.sin(i * 1.7 + frame * 0.05) * 6;
        const sway = Math.sin(frame * 0.08 + i * 0.5) * 3;
        ctx.strokeStyle = lane % 2 === 0 ? "#3a8a20" : "#2a7a18";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(gx, grassY);
        ctx.quadraticCurveTo(gx + sway, grassY - gh * 0.5, gx + sway * 2, grassY - gh);
        ctx.stroke();
      }
    }

    // Identical HOA houses
    [30, 170, 320].forEach(hx => {
      const ox = ((hx - scrollX * 0.4) % (W + 100) + W + 100) % (W + 100) - 50;
      px(ctx, ox, H * 0.18, 70, 44, "#e8dcc8");
      outline(ctx, ox, H * 0.18, 70, 44, "#c8b898", 1);
      ctx.fillStyle = "#6a3a1a";
      ctx.beginPath();
      ctx.moveTo(ox - 4, H * 0.18);
      ctx.lineTo(ox + 35, H * 0.05);
      ctx.lineTo(ox + 74, H * 0.18);
      ctx.closePath();
      ctx.fill();
      px(ctx, ox + 27, H * 0.38, 16, 24, "#6a3a1a");
      px(ctx, ox + 8, H * 0.22, 14, 12, "#87ceeb");
      outline(ctx, ox + 8, H * 0.22, 14, 12, "#888", 1);
      px(ctx, ox + 48, H * 0.22, 14, 12, "#87ceeb");
      outline(ctx, ox + 48, H * 0.22, 14, 12, "#888", 1);
    });

    // HOA sign
    const hoaX = ((100 - scrollX * 0.6) % (W + 80) + W + 80) % (W + 80) - 40;
    px(ctx, hoaX, H * 0.32, 60, 24, "#2a2a6a");
    outline(ctx, hoaX, H * 0.32, 60, 24, "#1a1a4a", 2);
    ctx.font = "bold 5px 'Courier New', monospace";
    ctx.textAlign = "center"; ctx.textBaseline = "middle";
    ctx.fillStyle = "#f4c430";
    ctx.fillText("QUIET HOURS", hoaX + 30, H * 0.32 + 8);
    ctx.fillText("10PM - 8AM", hoaX + 30, H * 0.32 + 16);
    px(ctx, hoaX + 28, H * 0.56, 4, 16, "#888");

    // Lane dividers
    ctx.strokeStyle = "rgba(255,255,255,0.2)";
    ctx.setLineDash([16, 8]);
    ctx.lineWidth = 1;
    for (let i = 1; i < LANE_COUNT; i++) {
      ctx.beginPath();
      ctx.moveTo(0, LANE_H * i);
      ctx.lineTo(W, LANE_H * i);
      ctx.stroke();
    }
    ctx.setLineDash([]);

  } else if (level === 3) {
    // Construction sky
    const skyGrad = ctx.createLinearGradient(0, 0, 0, H * 0.4);
    skyGrad.addColorStop(0, "#c4b090");
    skyGrad.addColorStop(1, "#d8c8a8");
    ctx.fillStyle = skyGrad;
    ctx.fillRect(0, 0, W, H * 0.4);

    // Dirt/gravel ground
    const dirtGrad = ctx.createLinearGradient(0, H * 0.4, 0, H);
    dirtGrad.addColorStop(0, "#c8a060");
    dirtGrad.addColorStop(1, "#a07840");
    ctx.fillStyle = dirtGrad;
    ctx.fillRect(0, H * 0.4, W, H * 0.6);

    // Gravel texture
    for (let i = 0; i < 40; i++) {
      const gx = ((i * 13 + 7 - scrollX * 0.95) % (W + 26) + W + 26) % (W + 26) - 13;
      const gy = H * 0.4 + (i * 17 % (H * 0.6));
      ctx.fillStyle = `rgba(${100 + i % 40},${80 + i % 30},${40 + i % 20},0.4)`;
      ctx.beginPath(); ctx.arc(gx, gy, 2 + i % 3, 0, Math.PI * 2); ctx.fill();
    }

    // Building frame in background
    const bldX = ((60 - scrollX * 0.3) % (W + 120) + W + 120) % (W + 120) - 60;
    ctx.strokeStyle = "#888"; ctx.lineWidth = 3;
    // Vertical beams
    for (let i = 0; i < 4; i++) {
      ctx.beginPath();
      ctx.moveTo(bldX + i * 30, H * 0.05);
      ctx.lineTo(bldX + i * 30, H * 0.4);
      ctx.stroke();
    }
    // Horizontal beams
    for (let i = 0; i < 4; i++) {
      ctx.beginPath();
      ctx.moveTo(bldX, H * 0.05 + i * (H * 0.35 / 3));
      ctx.lineTo(bldX + 90, H * 0.05 + i * (H * 0.35 / 3));
      ctx.stroke();
    }

    // Chain link fence
    const fenceY = H * 0.4;
    ctx.strokeStyle = "#888"; ctx.lineWidth = 1;
    for (let i = 0; i < 25; i++) {
      const fx = ((i * 20 - scrollX * 0.8) % (W + 40) + W + 40) % (W + 40) - 20;
      ctx.beginPath();
      ctx.moveTo(fx, fenceY);
      ctx.lineTo(fx + 10, fenceY - 12);
      ctx.lineTo(fx + 20, fenceY);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(fx, fenceY - 12);
      ctx.lineTo(fx + 10, fenceY);
      ctx.lineTo(fx + 20, fenceY - 12);
      ctx.stroke();
    }
    // Fence posts
    for (let i = 0; i < 8; i++) {
      const fx = ((i * 60 - scrollX * 0.8) % (W + 120) + W + 120) % (W + 120) - 60;
      px(ctx, fx - 2, fenceY - 16, 4, 20, "#666");
    }

    // Lane dividers (tire tracks)
    ctx.strokeStyle = "rgba(100,70,30,0.4)";
    ctx.setLineDash([24, 8]);
    ctx.lineWidth = 2;
    for (let i = 1; i < LANE_COUNT; i++) {
      ctx.beginPath();
      ctx.moveTo(0, LANE_H * i);
      ctx.lineTo(W, LANE_H * i);
      ctx.stroke();
    }
    ctx.setLineDash([]);

  } else if (level === 4) {
    // Drought orange sky
    const skyGrad = ctx.createLinearGradient(0, 0, 0, H * 0.45);
    skyGrad.addColorStop(0, "#e87820");
    skyGrad.addColorStop(0.5, "#f4a840");
    skyGrad.addColorStop(1, "#f8c860");
    ctx.fillStyle = skyGrad;
    ctx.fillRect(0, 0, W, H * 0.45);

    // Heat shimmer
    if (frame % 4 < 2) {
      ctx.fillStyle = "rgba(255,200,100,0.04)";
      ctx.fillRect(0, H * 0.3, W, H * 0.2);
    }

    // Dead brown ground
    const groundGrad = ctx.createLinearGradient(0, H * 0.45, 0, H);
    groundGrad.addColorStop(0, "#c4a050");
    groundGrad.addColorStop(1, "#8a6020");
    ctx.fillStyle = groundGrad;
    ctx.fillRect(0, H * 0.45, W, H * 0.55);

    // Cracked ground pattern
    ctx.strokeStyle = "rgba(100,60,10,0.3)"; ctx.lineWidth = 1;
    for (let i = 0; i < 8; i++) {
      const cx2 = ((i * 60 + 20 - scrollX * 0.9) % (W + 120) + W + 120) % (W + 120) - 60;
      const cy2 = H * 0.5 + (i * 23 % (H * 0.4));
      ctx.beginPath();
      ctx.moveTo(cx2, cy2);
      ctx.lineTo(cx2 + 20, cy2 + 10);
      ctx.lineTo(cx2 + 10, cy2 + 20);
      ctx.stroke();
    }

    // Dead trees
    [80, 240, 400].forEach(tx => {
      const ox = ((tx - scrollX * 0.5) % (W + 80) + W + 80) % (W + 80) - 40;
      // Trunk
      px(ctx, ox - 4, H * 0.2, 8, H * 0.25, "#5a3010");
      // Dead branches
      ctx.strokeStyle = "#5a3010"; ctx.lineWidth = 2;
      [[ox - 16, H * 0.22, ox, H * 0.28], [ox + 16, H * 0.25, ox, H * 0.3],
       [ox - 12, H * 0.32, ox, H * 0.36], [ox + 14, H * 0.34, ox, H * 0.38]].forEach(([x1, y1, x2, y2]) => {
        ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke();
      });
    });

    // NAL saves lawns sign
    const signX = ((150 - scrollX * 0.7) % (W + 80) + W + 80) % (W + 80) - 40;
    px(ctx, signX, H * 0.3, 70, 22, "#2a7a2a");
    outline(ctx, signX, H * 0.3, 70, 22, "#1a5a1a", 2);
    ctx.font = "bold 5px 'Courier New', monospace";
    ctx.textAlign = "center"; ctx.textBaseline = "middle";
    ctx.fillStyle = "#ffffff";
    ctx.fillText("NAL SAVES", signX + 35, H * 0.3 + 8);
    ctx.fillText("LAWNS!", signX + 35, H * 0.3 + 16);
    px(ctx, signX + 33, H * 0.52, 4, 16, "#888");

    // Lane dividers
    ctx.strokeStyle = "rgba(180,140,60,0.3)";
    ctx.setLineDash([20, 10]);
    ctx.lineWidth = 1;
    for (let i = 1; i < LANE_COUNT; i++) {
      ctx.beginPath();
      ctx.moveTo(0, LANE_H * i);
      ctx.lineTo(W, LANE_H * i);
      ctx.stroke();
    }
    ctx.setLineDash([]);
  }
}

function drawHUD(ctx: CanvasRenderingContext2D, level: number, score: number, lives: number, lb: LeaderEntry[], frame: number, boost: boolean) {
  // Top bar background
  ctx.fillStyle = "rgba(0,0,0,0.65)";
  ctx.fillRect(0, 0, W, 28);

  // Level name
  text(ctx, `LVL ${level}: ${LEVELS[level-1].name.toUpperCase()}`, 6, 14, 8, "#f4c430", "left", false);

  // Score
  text(ctx, `${score}ft`, W / 2, 14, 10, "#ffffff", "center", false);

  // Lives
  for (let i = 0; i < lives; i++) {
    ctx.fillStyle = "#cc1111";
    ctx.beginPath();
    const hx = W - 14 - i * 18;
    ctx.arc(hx, 10, 5, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#ee2222";
    ctx.beginPath();
    ctx.arc(hx - 2, 8, 2, 0, Math.PI * 2);
    ctx.fill();
  }

  // Boost indicator
  if (boost) {
    ctx.fillStyle = "rgba(255,100,0,0.85)";
    ctx.fillRect(W / 2 - 40, 28, 80, 14);
    text(ctx, "TURBO!", W / 2, 35, 8, "#ffffff", "center", false);
  }

  // Top-5 leaderboard (right side, semi-transparent)
  const lbX = W - 90;
  const lbY = 42;
  ctx.fillStyle = "rgba(0,0,0,0.55)";
  ctx.fillRect(lbX - 4, lbY - 2, 94, 76);
  text(ctx, "TOP 5", lbX + 43, lbY + 6, 7, "#f4c430", "center", false);
  const top5 = lb.slice(0, 5);
  top5.forEach((e, i) => {
    const ey = lbY + 18 + i * 12;
    text(ctx, `${i+1}.${e.initials}`, lbX + 4, ey, 7, "#ffffff", "left", false);
    text(ctx, `${e.score}`, lbX + 88, ey, 7, "#f4c430", "right", false);
  });
  if (top5.length === 0) {
    text(ctx, "BE FIRST!", lbX + 43, lbY + 40, 7, "#888", "center", false);
  }
}

// ============================================================
// SCREEN DRAWERS
// ============================================================

function drawIdleScreen(ctx: CanvasRenderingContext2D, lb: LeaderEntry[], frame: number) {
  // Dark overlay
  const grad = ctx.createLinearGradient(0, 0, 0, H);
  grad.addColorStop(0, "rgba(0,20,0,0.92)");
  grad.addColorStop(1, "rgba(0,10,0,0.96)");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, W, H);

  // Pixel border
  ctx.strokeStyle = "#cc1111";
  ctx.lineWidth = 3;
  ctx.strokeRect(6, 6, W - 12, H - 12);
  ctx.strokeStyle = "#f4c430";
  ctx.lineWidth = 1;
  ctx.strokeRect(10, 10, W - 20, H - 20);

  // Title
  const titlePulse = 1 + Math.sin(frame * 0.05) * 0.03;
  ctx.save();
  ctx.translate(W / 2, 40);
  ctx.scale(titlePulse, titlePulse);
  text(ctx, "LAWN MOWER DASH", 0, 0, 18, "#f4c430", "center");
  ctx.restore();

  // NAL subtitle
  text(ctx, "NEWPORT AVENUE LANDSCAPING", W / 2, 58, 7, "#cc1111", "center");

  // Tagline
  text(ctx, "Can you survive one day at NAL", W / 2, 74, 7, "#ffffff", "center");
  text(ctx, "and mow your entire route?", W / 2, 84, 7, "#ffffff", "center");

  // Level cards
  const cardW = 96;
  const cardH = 50;
  const startX = (W - (cardW * 4 + 6 * 3)) / 2;
  LEVELS.forEach((lv, i) => {
    const cx2 = startX + i * (cardW + 6);
    const cy2 = 98;
    const hover = Math.sin(frame * 0.08 + i * 0.8) * 2;
    ctx.fillStyle = i === 0 ? "#1a4a1a" : i === 1 ? "#1a1a4a" : i === 2 ? "#3a2a0a" : "#3a1a0a";
    ctx.fillRect(cx2, cy2 + hover, cardW, cardH);
    ctx.strokeStyle = i === 0 ? "#2a8a2a" : i === 1 ? "#2a2a8a" : i === 2 ? "#8a6a1a" : "#8a3a1a";
    ctx.lineWidth = 2;
    ctx.strokeRect(cx2, cy2 + hover, cardW, cardH);
    text(ctx, `LVL ${lv.id}`, cx2 + cardW / 2, cy2 + 12 + hover, 8, "#f4c430", "center");
    // Wrap level name
    const words = lv.name.split(" ");
    if (words.length <= 2) {
      text(ctx, lv.name.toUpperCase(), cx2 + cardW / 2, cy2 + 26 + hover, 6, "#ffffff", "center");
    } else {
      text(ctx, words.slice(0, 2).join(" ").toUpperCase(), cx2 + cardW / 2, cy2 + 24 + hover, 6, "#ffffff", "center");
      text(ctx, words.slice(2).join(" ").toUpperCase(), cx2 + cardW / 2, cy2 + 32 + hover, 6, "#ffffff", "center");
    }
    text(ctx, lv.tagline.length > 22 ? lv.tagline.slice(0, 22) + ".." : lv.tagline, cx2 + cardW / 2, cy2 + 44 + hover, 5, "#aaa", "center");
  });

  // Controls
  text(ctx, "SPACE / TAP = START & JUMP LANE", W / 2, 162, 7, "#888", "center");

  // Prize teaser
  ctx.fillStyle = "rgba(200,17,17,0.15)";
  ctx.fillRect(W / 2 - 120, 172, 240, 28);
  ctx.strokeStyle = "#cc1111"; ctx.lineWidth = 1;
  ctx.strokeRect(W / 2 - 120, 172, 240, 28);
  text(ctx, "BEAT ALL 4 LEVELS:", W / 2, 182, 8, "#f4c430", "center");
  text(ctx, "WIN $100 OFF YOUR SERVICE!", W / 2, 194, 8, "#cc1111", "center");

  // Leaderboard
  const lbY = 210;
  text(ctx, "HALL OF FAME", W / 2, lbY, 8, "#f4c430", "center");
  const top5 = lb.slice(0, 5);
  if (top5.length === 0) {
    text(ctx, "No scores yet. Be the first!", W / 2, lbY + 16, 7, "#888", "center");
  } else {
    top5.forEach((e, i) => {
      const ey = lbY + 14 + i * 10;
      const color = i === 0 ? "#f4c430" : i === 1 ? "#c0c0c0" : i === 2 ? "#cd7f32" : "#aaa";
      text(ctx, `${i+1}. ${e.initials}`, W / 2 - 60, ey, 7, color, "left");
      text(ctx, `${e.score}ft`, W / 2 + 20, ey, 7, color, "left");
      text(ctx, `LVL${e.level}`, W / 2 + 70, ey, 7, color, "left");
    });
  }

  // Blink start
  if (frame % 40 < 28) {
    text(ctx, "PRESS SPACE OR TAP TO START", W / 2, H - 14, 8, "#ffffff", "center");
  }
}

function drawLevelIntro(ctx: CanvasRenderingContext2D, level: number, frame: number) {
  ctx.fillStyle = "rgba(0,0,0,0.75)";
  ctx.fillRect(0, H / 2 - 40, W, 80);
  ctx.strokeStyle = "#f4c430"; ctx.lineWidth = 2;
  ctx.strokeRect(0, H / 2 - 40, W, 80);
  text(ctx, `LEVEL ${level}`, W / 2, H / 2 - 22, 16, "#f4c430", "center");
  text(ctx, LEVELS[level - 1].name.toUpperCase(), W / 2, H / 2, 10, "#ffffff", "center");
  text(ctx, LEVELS[level - 1].tagline, W / 2, H / 2 + 18, 7, "#aaa", "center");
  if (frame % 30 < 20) {
    text(ctx, "GET READY!", W / 2, H / 2 + 32, 8, "#cc1111", "center");
  }
}

function drawLevelComplete(ctx: CanvasRenderingContext2D, level: number, score: number, frame: number) {
  ctx.fillStyle = "rgba(0,30,0,0.85)";
  ctx.fillRect(0, H / 2 - 50, W, 100);
  ctx.strokeStyle = "#2a8a2a"; ctx.lineWidth = 2;
  ctx.strokeRect(0, H / 2 - 50, W, 100);
  text(ctx, `LEVEL ${level} COMPLETE!`, W / 2, H / 2 - 30, 14, "#f4c430", "center");
  text(ctx, `Score: ${score}ft`, W / 2, H / 2 - 10, 10, "#ffffff", "center");
  if (level < 4) {
    text(ctx, `NEXT: ${LEVELS[level].name.toUpperCase()}`, W / 2, H / 2 + 10, 8, "#aaa", "center");
    if (frame % 30 < 20) {
      text(ctx, "CONTINUING...", W / 2, H / 2 + 28, 8, "#2a8a2a", "center");
    }
  } else {
    text(ctx, "YOU BEAT THE ROUTE!", W / 2, H / 2 + 10, 10, "#cc1111", "center");
    if (frame % 30 < 20) {
      text(ctx, "CALCULATING REWARD...", W / 2, H / 2 + 28, 8, "#f4c430", "center");
    }
  }
}

function drawDeadScreen(ctx: CanvasRenderingContext2D, level: number, score: number, lb: LeaderEntry[], highlightRank: number, frame: number) {
  ctx.fillStyle = "rgba(30,0,0,0.88)";
  ctx.fillRect(0, 0, W, H);
  ctx.strokeStyle = "#cc1111"; ctx.lineWidth = 3;
  ctx.strokeRect(6, 6, W - 12, H - 12);

  text(ctx, "WIPED OUT!", W / 2, 30, 18, "#cc1111", "center");

  const subtitles = [
    "The HOA wins this round.",
    "Shoulda dodged that tricycle.",
    "That porta-potty came outta nowhere.",
    "Fire ants: 1. You: 0.",
  ];
  text(ctx, subtitles[(level - 1) % subtitles.length], W / 2, 50, 7, "#888", "center");

  text(ctx, `Level ${level} | Score: ${score}ft`, W / 2, 66, 9, "#ffffff", "center");

  // Leaderboard
  text(ctx, "LEADERBOARD", W / 2, 86, 9, "#f4c430", "center");
  const top5 = lb.slice(0, 5);
  top5.forEach((e, i) => {
    const ey = 100 + i * 14;
    const isNew = i === highlightRank;
    const color = isNew ? "#f4c430" : i === 0 ? "#f4c430" : "#aaa";
    if (isNew) {
      ctx.fillStyle = "rgba(200,160,0,0.2)";
      ctx.fillRect(W / 2 - 100, ey - 7, 200, 14);
    }
    text(ctx, `${i+1}. ${e.initials}`, W / 2 - 60, ey, 8, color, "left");
    text(ctx, `${e.score}ft`, W / 2 + 20, ey, 8, color, "left");
    text(ctx, `L${e.level}`, W / 2 + 80, ey, 8, color, "left");
  });

  if (frame % 40 < 28) {
    text(ctx, "SPACE / TAP TO TRY AGAIN", W / 2, H - 14, 8, "#ffffff", "center");
  }
}

function drawCelebration(ctx: CanvasRenderingContext2D, score: number, zoom: number, browWipe: number, frame: number) {
  // Sky background
  const grad = ctx.createLinearGradient(0, 0, 0, H);
  grad.addColorStop(0, "#1a4a1a");
  grad.addColorStop(1, "#0a2a0a");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, W, H);

  // Confetti
  for (let i = 0; i < 30; i++) {
    const cx2 = (i * 47 + frame * (2 + i % 3)) % W;
    const cy2 = (i * 31 + frame * (1 + i % 2)) % H;
    ctx.fillStyle = ["#cc1111","#f4c430","#2a8a2a","#ffffff","#4488ff"][i % 5];
    ctx.fillRect(cx2, cy2, 4, 4);
  }

  // Zoom in on mower
  const scale = 1 + zoom * 1.5;
  ctx.save();
  ctx.translate(W / 2, H / 2 + 10);
  ctx.scale(scale, scale);
  drawMower(ctx, 0, 0, frame);

  // Brow wipe arm
  if (browWipe > 0) {
    const armRaise = Math.min(browWipe * 3, 1);
    ctx.fillStyle = "#cc1111";
    ctx.save();
    ctx.translate(14, -20);
    ctx.rotate(-armRaise * 1.2);
    px(ctx, 0, 0, 6, 18, "#cc1111");
    px(ctx, 0, 0, 6, 4, "#f4c07a");
    ctx.restore();
    // Sweat drops
    if (browWipe > 0.5) {
      for (let i = 0; i < 3; i++) {
        const sx = 8 + i * 8 + Math.sin(frame * 0.3 + i) * 2;
        const sy = -32 - (browWipe * 20) + i * 6;
        ctx.fillStyle = "#4488ff";
        ctx.beginPath(); ctx.arc(sx, sy, 2, 0, Math.PI * 2); ctx.fill();
      }
    }
  }
  ctx.restore();

  // Text
  text(ctx, "ROUTE COMPLETE!", W / 2, 22, 14, "#f4c430", "center");
  text(ctx, `Total: ${score}ft mowed`, W / 2, 40, 9, "#ffffff", "center");
  text(ctx, "Sterling is proud.", W / 2, 54, 8, "#aaa", "center");
}

function drawDoubleOrNothing(ctx: CanvasRenderingContext2D, score: number, frame: number) {
  ctx.fillStyle = "rgba(0,0,0,0.92)";
  ctx.fillRect(0, 0, W, H);
  ctx.strokeStyle = "#f4c430"; ctx.lineWidth = 3;
  ctx.strokeRect(6, 6, W - 12, H - 12);

  text(ctx, "DOUBLE OR NOTHING?", W / 2, 28, 13, "#f4c430", "center");
  text(ctx, `You earned: $100 off`, W / 2, 46, 9, "#ffffff", "center");
  text(ctx, "But do you dare face...", W / 2, 60, 8, "#aaa", "center");
  text(ctx, "GIANT STERLING?", W / 2, 76, 12, "#cc1111", "center");
  text(ctx, "Win: $200 off  |  Lose: Keep $100", W / 2, 92, 7, "#888", "center");
  text(ctx, "(1 in 500 chance. He's very large.)", W / 2, 104, 6, "#666", "center");

  // Two buttons
  const pulse = Math.sin(frame * 0.1) * 4;
  ctx.fillStyle = "#cc1111";
  ctx.fillRect(20, 120, W / 2 - 26, 60);
  ctx.strokeStyle = "#880000"; ctx.lineWidth = 2;
  ctx.strokeRect(20, 120, W / 2 - 26, 60);
  text(ctx, "FIGHT", W / 4 + 10, 142, 12, "#ffffff", "center");
  text(ctx, "STERLING", W / 4 + 10, 158, 9, "#ffffff", "center");
  text(ctx, "(risk it)", W / 4 + 10, 172, 7, "#ffaaaa", "center");

  ctx.fillStyle = "#2a7a2a";
  ctx.fillRect(W / 2 + 6, 120, W / 2 - 26, 60);
  ctx.strokeStyle = "#1a5a1a"; ctx.lineWidth = 2;
  ctx.strokeRect(W / 2 + 6, 120, W / 2 - 26, 60);
  text(ctx, "TAKE", W * 3 / 4 - 10, 142, 12, "#ffffff", "center");
  text(ctx, "$100 OFF", W * 3 / 4 - 10, 158, 9, "#ffffff", "center");
  text(ctx, "(safe!)", W * 3 / 4 - 10, 172, 7, "#aaffaa", "center");

  if (frame % 30 < 20) {
    text(ctx, "TAP LEFT = FIGHT  |  TAP RIGHT = TAKE $100", W / 2, H - 14, 7, "#888", "center");
  }
}

function drawBossFight(ctx: CanvasRenderingContext2D, frame: number) {
  // Dark dramatic bg
  const grad = ctx.createLinearGradient(0, 0, 0, H);
  grad.addColorStop(0, "#0a0000");
  grad.addColorStop(1, "#200000");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, W, H);

  // Lightning flashes
  if (frame % 40 < 4) {
    ctx.fillStyle = "rgba(255,200,100,0.15)";
    ctx.fillRect(0, 0, W, H);
  }

  // Giant Sterling
  const shake = Math.sin(frame * 0.3) * 3;
  const bob = Math.sin(frame * 0.08) * 4;
  const sx = W * 0.62 + shake;
  const sy = H * 0.1 + bob;
  const sc = 2.8;

  ctx.save();
  ctx.translate(sx, sy);
  ctx.scale(sc, sc);

  // Body (suit)
  px(ctx, -18, 20, 36, 50, "#1a1a3a");
  outline(ctx, -18, 20, 36, 50, "#0a0a2a", 2);
  // Tie
  px(ctx, -4, 22, 8, 30, "#cc1111");
  px(ctx, -2, 22, 4, 10, "#ee2222");
  // Lapels
  ctx.fillStyle = "#2a2a4a";
  ctx.beginPath(); ctx.moveTo(-18, 20); ctx.lineTo(-4, 36); ctx.lineTo(-18, 70); ctx.closePath(); ctx.fill();
  ctx.beginPath(); ctx.moveTo(18, 20); ctx.lineTo(4, 36); ctx.lineTo(18, 70); ctx.closePath(); ctx.fill();
  // Arms
  px(ctx, -28, 24, 12, 36, "#1a1a3a");
  px(ctx, 16, 24, 12, 36, "#1a1a3a");
  // Hands
  px(ctx, -30, 58, 14, 10, "#f4c07a");
  px(ctx, 16, 58, 14, 10, "#f4c07a");
  // Legs
  px(ctx, -16, 70, 14, 24, "#1a1a3a");
  px(ctx, 2, 70, 14, 24, "#1a1a3a");
  // Shoes
  px(ctx, -18, 92, 16, 6, "#0a0a0a");
  px(ctx, 2, 92, 16, 6, "#0a0a0a");
  // Head
  px(ctx, -14, -4, 28, 26, "#f4c07a");
  outline(ctx, -14, -4, 28, 26, "#c8843a", 2);
  // Hair (silver)
  px(ctx, -14, -8, 28, 8, "#c8c8c8");
  px(ctx, -16, -6, 4, 10, "#c8c8c8");
  px(ctx, 12, -6, 4, 10, "#c8c8c8");
  // Eyes (angry)
  px(ctx, -8, 4, 4, 4, "#1a1a1a");
  px(ctx, 4, 4, 4, 4, "#1a1a1a");
  px(ctx, -10, 2, 8, 2, "#c8843a");
  px(ctx, 2, 2, 8, 2, "#c8843a");
  // Mouth
  px(ctx, -6, 14, 12, 3, "#c8843a");
  px(ctx, -8, 13, 2, 2, "#c8843a");
  px(ctx, 6, 13, 2, 2, "#c8843a");

  ctx.restore();

  // Speech bubble
  const bubX = W * 0.3;
  const bubY = H * 0.08;
  const bubW = 160;
  const bubH = 36;
  ctx.fillStyle = "#fffde7";
  ctx.beginPath();
  ctx.roundRect(bubX, bubY, bubW, bubH, 6);
  ctx.fill();
  ctx.strokeStyle = "#cc1111"; ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.roundRect(bubX, bubY, bubW, bubH, 6);
  ctx.stroke();
  // Tail
  ctx.fillStyle = "#fffde7";
  ctx.beginPath();
  ctx.moveTo(bubX + bubW * 0.7, bubY + bubH);
  ctx.lineTo(bubX + bubW * 0.8, bubY + bubH + 14);
  ctx.lineTo(bubX + bubW * 0.85, bubY + bubH);
  ctx.fill();
  text(ctx, "YOU'RE FIRED!", bubX + bubW / 2, bubY + 14, 12, "#cc1111", "center");
  text(ctx, "(and mowed)", bubX + bubW / 2, bubY + 28, 7, "#888", "center");

  // Tiny player mower
  ctx.save();
  ctx.translate(W * 0.15, H * 0.72);
  ctx.scale(0.5, 0.5);
  drawMower(ctx, 0, 0, frame);
  ctx.restore();

  // Dramatic text
  text(ctx, "BOSS FIGHT!", W / 2, H - 30, 12, "#cc1111", "center");
  if (frame % 30 < 20) {
    text(ctx, "Deciding your fate...", W / 2, H - 14, 8, "#888", "center");
  }
}

function drawWonScreen(ctx: CanvasRenderingContext2D, code: string, isBossWin: boolean, frame: number) {
  const grad = ctx.createLinearGradient(0, 0, 0, H);
  grad.addColorStop(0, "#0a2a0a");
  grad.addColorStop(1, "#1a4a1a");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, W, H);
  ctx.strokeStyle = "#f4c430"; ctx.lineWidth = 3;
  ctx.strokeRect(6, 6, W - 12, H - 12);

  // Confetti
  for (let i = 0; i < 40; i++) {
    const cx2 = (i * 47 + frame * (2 + i % 3)) % W;
    const cy2 = (i * 31 + frame * (1 + i % 2)) % H;
    ctx.fillStyle = ["#cc1111","#f4c430","#2a8a2a","#ffffff","#4488ff"][i % 5];
    ctx.fillRect(cx2, cy2, 4, 4);
  }

  text(ctx, isBossWin ? "YOU BEAT STERLING!" : "YOU DID IT!", W / 2, 28, 14, "#f4c430", "center");
  text(ctx, isBossWin ? "IMPOSSIBLE. Absolutely impossible." : "Sterling is proud. (Yes, really.)", W / 2, 46, 7, "#aaa", "center");

  text(ctx, "YOUR DISCOUNT CODE:", W / 2, 68, 9, "#ffffff", "center");

  // Code box
  const pulse = 1 + Math.sin(frame * 0.1) * 0.02;
  ctx.save();
  ctx.translate(W / 2, 92);
  ctx.scale(pulse, pulse);
  ctx.fillStyle = "#cc1111";
  ctx.fillRect(-80, -16, 160, 32);
  ctx.strokeStyle = "#f4c430"; ctx.lineWidth = 2;
  ctx.strokeRect(-80, -16, 160, 32);
  text(ctx, code, 0, 0, 16, "#ffffff", "center");
  ctx.restore();

  text(ctx, isBossWin ? "$200 OFF any service!" : "$100 OFF any service!", W / 2, 116, 9, "#f4c430", "center");
  text(ctx, "(Yes, it's real. We're serious.)", W / 2, 130, 7, "#888", "center");
  text(ctx, "Call (541) 617-8873 to redeem", W / 2, 144, 7, "#ffffff", "center");
  text(ctx, "newportavelandscaping.com", W / 2, 158, 7, "#4488ff", "center");

  if (frame % 40 < 28) {
    text(ctx, "SPACE / TAP TO PLAY AGAIN", W / 2, H - 14, 8, "#888", "center");
  }
}

function drawBossLostScreen(ctx: CanvasRenderingContext2D, code: string, frame: number) {
  ctx.fillStyle = "rgba(10,0,0,0.94)";
  ctx.fillRect(0, 0, W, H);
  ctx.strokeStyle = "#cc1111"; ctx.lineWidth = 3;
  ctx.strokeRect(6, 6, W - 12, H - 12);

  text(ctx, "STERLING WINS.", W / 2, 28, 14, "#cc1111", "center");
  text(ctx, "He's very large. It was always unlikely.", W / 2, 46, 7, "#888", "center");
  text(ctx, "But you beat the route, so...", W / 2, 60, 7, "#aaa", "center");
  text(ctx, "YOUR $100 CODE:", W / 2, 78, 9, "#ffffff", "center");

  const pulse = 1 + Math.sin(frame * 0.1) * 0.02;
  ctx.save();
  ctx.translate(W / 2, 102);
  ctx.scale(pulse, pulse);
  ctx.fillStyle = "#2a7a2a";
  ctx.fillRect(-80, -16, 160, 32);
  ctx.strokeStyle = "#f4c430"; ctx.lineWidth = 2;
  ctx.strokeRect(-80, -16, 160, 32);
  text(ctx, code, 0, 0, 16, "#ffffff", "center");
  ctx.restore();

  text(ctx, "$100 OFF any service!", W / 2, 126, 9, "#f4c430", "center");
  text(ctx, "Call (541) 617-8873 to redeem", W / 2, 142, 7, "#ffffff", "center");
  text(ctx, "newportavelandscaping.com", W / 2, 158, 7, "#4488ff", "center");

  if (frame % 40 < 28) {
    text(ctx, "SPACE / TAP TO PLAY AGAIN", W / 2, H - 14, 8, "#888", "center");
  }
}

// ============================================================
// MAIN COMPONENT
// ============================================================
export default function LawnMowerDash() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stateRef = useRef<GameState>("idle");
  const frameRef = useRef(0);
  const rafId = useRef<number>(0);
  const scoreRef = useRef(0);
  const livesRef = useRef(3);
  const scrollRef = useRef(0);
  const speedRef = useRef(0);
  const spawnCounterRef = useRef(0);
  const playerLaneRef = useRef(1);
  const targetLaneRef = useRef(1);
  const playerYRef = useRef(LANE_CENTERS[1]);
  const obstaclesRef = useRef<Obstacle[]>([]);
  const collectiblesRef = useRef<Collectible[]>([]);
  const bgElementsRef = useRef<BgElement[]>([]);
  const boostRef = useRef(false);
  const celebTimerRef = useRef(0);
  const celebZoomRef = useRef(0);
  const celebBrowRef = useRef(0);
  const sessionId = useRef(`s_${Date.now()}_${Math.random().toString(36).slice(2)}`);
  const lbRef = useRef<LeaderEntry[]>(loadLB());

  const [displayState, setDisplayState] = useState<GameState>("idle");
  const [currentLevel, setCurrentLevel] = useState(1);
  const [score, setScore] = useState(0);
  const [wonCode, setWonCode] = useState("");
  const [copied, setCopied] = useState(false);
  const [initials, setInitials] = useState(["A","A","A"]);
  const [initialsPos, setInitialsPos] = useState(0);
  const [newEntryRank, setNewEntryRank] = useState(-1);
  const currentLevelRef = useRef(1);
  const deviceType = /Mobi|Android/i.test(navigator.userAgent) ? "mobile" : "desktop";

  const trackEvent = trpc.game.trackEvent.useMutation();

  const resetGame = useCallback((level = 1) => {
    stateRef.current = "playing";
    frameRef.current = 0;
    scoreRef.current = 0;
    livesRef.current = 3;
    scrollRef.current = 0;
    speedRef.current = LEVELS[level - 1].baseSpeed;
    spawnCounterRef.current = 0;
    playerLaneRef.current = 1;
    targetLaneRef.current = 1;
    playerYRef.current = LANE_CENTERS[1];
    obstaclesRef.current = [];
    collectiblesRef.current = [];
    bgElementsRef.current = [];
    boostRef.current = false;
    celebTimerRef.current = 0;
    celebZoomRef.current = 0;
    celebBrowRef.current = 0;
    currentLevelRef.current = level;
    setCurrentLevel(level);
    setScore(0);
    setWonCode("");
    setCopied(false);
  }, []);

  const startGame = useCallback(() => {
    sessionId.current = `s_${Date.now()}_${Math.random().toString(36).slice(2)}`;
    resetGame(1);
    setDisplayState("playing");
    trackEvent.mutate({ sessionId: sessionId.current, event: "start", level: 1, score: 0, device: deviceType });
  }, [resetGame, trackEvent, deviceType]);

  const submitInitials = useCallback(() => {
    const ini = initials.join("");
    const entry: LeaderEntry = { initials: ini, score: scoreRef.current, level: currentLevelRef.current };
    const lb = loadLB();
    lb.push(entry);
    lb.sort((a, b) => b.score - a.score);
    const top10 = lb.slice(0, 10);
    saveLB(top10);
    lbRef.current = top10;
    const rank = top10.findIndex(e => e.initials === ini && e.score === entry.score);
    setNewEntryRank(rank);
    trackEvent.mutate({ sessionId: sessionId.current, event: "death", level: currentLevelRef.current, score: scoreRef.current, device: deviceType });
    setDisplayState("dead");
  }, [initials, trackEvent, deviceType]);

  // Game loop
  const gameLoop = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const state = stateRef.current;
    const frame = frameRef.current;
    const level = currentLevelRef.current;
    const lv = LEVELS[level - 1];

    // Static screens
    if (state === "idle") {
      drawBackground(ctx, 1, scrollRef.current, frame);
      drawIdleScreen(ctx, lbRef.current, frame);
      frameRef.current++;
      rafId.current = requestAnimationFrame(gameLoop);
      return;
    }

    if (state === "enter_initials") {
      drawBackground(ctx, level, scrollRef.current, frame);
      frameRef.current++;
      rafId.current = requestAnimationFrame(gameLoop);
      return;
    }

    if (state === "dead") {
      drawBackground(ctx, level, scrollRef.current, frame);
      drawDeadScreen(ctx, level, scoreRef.current, lbRef.current, newEntryRank, frame);
      frameRef.current++;
      rafId.current = requestAnimationFrame(gameLoop);
      return;
    }

    if (state === "level_complete") {
      drawBackground(ctx, level, scrollRef.current, frame);
      drawLevelComplete(ctx, level, scoreRef.current, frame);
      if (frame > 100) {
        if (level < 4) {
          const nextLevel = level + 1;
          resetGame(nextLevel);
          setDisplayState("playing");
        } else {
          stateRef.current = "celebration";
          setDisplayState("celebration");
          frameRef.current = 0;
        }
        return;
      }
      frameRef.current++;
      rafId.current = requestAnimationFrame(gameLoop);
      return;
    }

    if (state === "celebration") {
      celebTimerRef.current++;
      const t = celebTimerRef.current;
      celebZoomRef.current = Math.min(t / 60, 1) * 0.4;
      celebBrowRef.current = t > 60 ? Math.min((t - 60) / 40, 1) : 0;
      drawCelebration(ctx, scoreRef.current, celebZoomRef.current, celebBrowRef.current, frame);
      if (t > 160) {
        stateRef.current = "double_or_nothing";
        setDisplayState("double_or_nothing");
        frameRef.current = 0;
        return;
      }
      frameRef.current++;
      rafId.current = requestAnimationFrame(gameLoop);
      return;
    }

    if (state === "double_or_nothing") {
      drawDoubleOrNothing(ctx, scoreRef.current, frame);
      frameRef.current++;
      rafId.current = requestAnimationFrame(gameLoop);
      return;
    }

    if (state === "boss_fight") {
      drawBossFight(ctx, frame);
      if (frame > 180) {
        const playerWins = Math.random() < 0.002;
        if (playerWins) {
          stateRef.current = "won";
          setWonCode(DOUBLE_CODE);
          setDisplayState("won");
          trackEvent.mutate({ sessionId: sessionId.current, event: "boss_win", level: 4, score: scoreRef.current, device: deviceType });
        } else {
          stateRef.current = "boss_lost";
          setWonCode(DISCOUNT_CODE);
          setDisplayState("boss_lost");
          trackEvent.mutate({ sessionId: sessionId.current, event: "boss_loss", level: 4, score: scoreRef.current, device: deviceType });
        }
        return;
      }
      frameRef.current++;
      rafId.current = requestAnimationFrame(gameLoop);
      return;
    }

    if (state === "won") {
      drawWonScreen(ctx, wonCode || DOUBLE_CODE, wonCode === DOUBLE_CODE, frame);
      frameRef.current++;
      rafId.current = requestAnimationFrame(gameLoop);
      return;
    }

    if (state === "boss_lost") {
      drawBossLostScreen(ctx, wonCode || DISCOUNT_CODE, frame);
      frameRef.current++;
      rafId.current = requestAnimationFrame(gameLoop);
      return;
    }

    if (state !== "playing") return;

    // ---- PLAYING ----
    const boost = boostRef.current;
    const speedMult = boost ? 1.6 : 1;
    speedRef.current = Math.min(lv.baseSpeed + (frame / 60) * lv.speedPerSec, lv.baseSpeed * 2.5) * speedMult;
    scrollRef.current += speedRef.current;
    scoreRef.current = Math.floor(scrollRef.current / 10);
    setScore(scoreRef.current);

    // Lane transition
    const targetY = LANE_CENTERS[targetLaneRef.current];
    const dy = targetY - playerYRef.current;
    playerYRef.current += dy * 0.18;

    // Spawn obstacles
    spawnCounterRef.current++;
    if (spawnCounterRef.current >= lv.spawnInterval) {
      spawnCounterRef.current = 0;
      const lane = Math.floor(Math.random() * LANE_COUNT);
      const type = lv.obstacleTypes[Math.floor(Math.random() * lv.obstacleTypes.length)];
      obstaclesRef.current.push({ x: W + OBS_W, lane, type });
      // Occasionally spawn collectible
      if (Math.random() < 0.35) {
        const cLane = (lane + 1 + Math.floor(Math.random() * (LANE_COUNT - 1))) % LANE_COUNT;
        collectiblesRef.current.push({ x: W + COLL_W, lane: cLane });
      }
    }

    // Move obstacles
    obstaclesRef.current = obstaclesRef.current
      .map(o => ({ ...o, x: o.x - speedRef.current }))
      .filter(o => o.x > -OBS_W);

    // Move collectibles
    collectiblesRef.current = collectiblesRef.current
      .map(c => ({ ...c, x: c.x - speedRef.current }))
      .filter(c => c.x > -COLL_W);

    // Draw
    drawBackground(ctx, level, scrollRef.current, frame);

    // Draw collectibles
    collectiblesRef.current.forEach(c => {
      drawCollectible(ctx, c.x, LANE_CENTERS[c.lane], frame);
    });

    // Draw obstacles
    obstaclesRef.current.forEach(o => {
      drawObstacle(ctx, o.type, o.x, LANE_CENTERS[o.lane], frame);
    });

    // Draw player
    drawMower(ctx, PLAYER_X, playerYRef.current, frame);

    // HUD
    drawHUD(ctx, level, scoreRef.current, livesRef.current, lbRef.current, frame, boost);

    // Level intro overlay
    if (frame < 90) {
      drawLevelIntro(ctx, level, frame);
    }

    // Collision detection
    const px2 = PLAYER_X;
    const py2 = playerYRef.current;
    const hitW = PLAYER_W * 0.55;
    const hitH = PLAYER_H * 0.55;

    for (const o of obstaclesRef.current) {
      if (Math.abs(o.x - px2) < (hitW + OBS_W * 0.45) &&
          Math.abs(LANE_CENTERS[o.lane] - py2) < (hitH + OBS_H * 0.45)) {
        // Hit!
        obstaclesRef.current = obstaclesRef.current.filter(ob => ob !== o);
        livesRef.current--;
        if (livesRef.current <= 0) {
          stateRef.current = "enter_initials";
          setDisplayState("enter_initials");
          setInitials(["A","A","A"]);
          setInitialsPos(0);
          return;
        }
        // Flash effect
        ctx.fillStyle = "rgba(255,0,0,0.3)";
        ctx.fillRect(0, 0, W, H);
        break;
      }
    }

    // Collectible pickup
    for (const c of collectiblesRef.current) {
      if (Math.abs(c.x - px2) < (hitW + COLL_W * 0.5) &&
          Math.abs(LANE_CENTERS[c.lane] - py2) < (hitH + COLL_H * 0.5)) {
        collectiblesRef.current = collectiblesRef.current.filter(cb => cb !== c);
        livesRef.current = Math.min(livesRef.current + 1, 3);
        break;
      }
    }

    // Level complete
    if (frame >= lv.duration) {
      stateRef.current = "level_complete";
      setDisplayState("level_complete");
      frameRef.current = 0;
      return;
    }

    frameRef.current++;
    rafId.current = requestAnimationFrame(gameLoop);
  }, [resetGame, newEntryRank, wonCode, trackEvent, deviceType]);

  // Start/restart the loop when displayState changes
  useEffect(() => {
    cancelAnimationFrame(rafId.current);
    if (displayState === "idle" || displayState === "playing" ||
        displayState === "level_complete" || displayState === "dead" ||
        displayState === "enter_initials" || displayState === "celebration" ||
        displayState === "double_or_nothing" || displayState === "boss_fight" ||
        displayState === "won" || displayState === "boss_lost") {
      rafId.current = requestAnimationFrame(gameLoop);
    }
    return () => cancelAnimationFrame(rafId.current);
  }, [displayState, gameLoop]);

  // Input handlers
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.code === "ArrowDown" || e.code === "KeyS") boostRef.current = true;
      if (e.code === "ArrowUp" || e.code === "KeyW") {
        if (stateRef.current === "playing") {
          targetLaneRef.current = Math.max(0, targetLaneRef.current - 1);
          playerLaneRef.current = targetLaneRef.current;
        }
      }
      if (e.code === "Space" || e.code === "ArrowUp" || e.code === "KeyW") {
        e.preventDefault();
        const state = stateRef.current;
        if (state === "idle") { startGame(); return; }
        if (state === "dead" || state === "won" || state === "boss_lost") { startGame(); return; }
        if (state === "playing") {
          targetLaneRef.current = Math.max(0, targetLaneRef.current - 1);
          playerLaneRef.current = targetLaneRef.current;
        }
      }
    };
    const onKeyUp = (e: KeyboardEvent) => {
      if (e.code === "ArrowDown" || e.code === "KeyS") boostRef.current = false;
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("keyup", onKeyUp);
    return () => { window.removeEventListener("keydown", onKey); window.removeEventListener("keyup", onKeyUp); };
  }, [startGame]);

  // Touch handler
  const handleTouch = useCallback((e: React.TouchEvent) => {
    e.preventDefault();
    const state = stateRef.current;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const touch = e.changedTouches[0];
    const relY = (touch.clientY - rect.top) / rect.height;
    const relX = (touch.clientX - rect.left) / rect.width;

    if (state === "idle") { startGame(); return; }
    if (state === "dead" || state === "won" || state === "boss_lost") { startGame(); return; }
    if (state === "double_or_nothing") {
      if (relX < 0.5) {
        stateRef.current = "boss_fight";
        setDisplayState("boss_fight");
        frameRef.current = 0;
      } else {
        stateRef.current = "boss_lost";
        setWonCode(DISCOUNT_CODE);
        setDisplayState("boss_lost");
      }
      return;
    }
    if (state === "playing") {
      if (relY < 0.5) {
        targetLaneRef.current = Math.max(0, targetLaneRef.current - 1);
        playerLaneRef.current = targetLaneRef.current;
      } else {
        targetLaneRef.current = Math.min(LANE_COUNT - 1, targetLaneRef.current + 1);
        playerLaneRef.current = targetLaneRef.current;
        boostRef.current = true;
        setTimeout(() => { boostRef.current = false; }, 300);
      }
    }
  }, [startGame]);

  const handleTouchEnd = useCallback(() => {
    boostRef.current = false;
  }, []);

  const handleClick = useCallback((e: React.MouseEvent) => {
    const state = stateRef.current;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const relX = (e.clientX - rect.left) / rect.width;

    if (state === "idle") { startGame(); return; }
    if (state === "dead" || state === "won" || state === "boss_lost") { startGame(); return; }
    if (state === "double_or_nothing") {
      if (relX < 0.5) {
        stateRef.current = "boss_fight";
        setDisplayState("boss_fight");
        frameRef.current = 0;
      } else {
        stateRef.current = "boss_lost";
        setWonCode(DISCOUNT_CODE);
        setDisplayState("boss_lost");
      }
    }
  }, [startGame]);

  // Initials letter cycling
  const cycleInitial = (pos: number, dir: number) => {
    setInitials(prev => {
      const next = [...prev];
      const code = next[pos].charCodeAt(0) + dir;
      next[pos] = String.fromCharCode(code < 65 ? 90 : code > 90 ? 65 : code);
      return next;
    });
  };

  return (
    <div className="min-h-screen bg-black flex flex-col">
      <Navbar />
      <div className="flex-1 flex flex-col items-center justify-center py-4 px-0 sm:px-4">
        {/* Canvas wrapper */}
        <div
          className="relative w-full"
          style={{ maxWidth: "min(100vw, calc(100dvh * 16/9 - 120px))" }}
        >
          <canvas
            ref={canvasRef}
            width={W}
            height={H}
            style={{ width: "100%", height: "auto", display: "block", imageRendering: "pixelated", cursor: "pointer" }}
            onTouchStart={handleTouch}
            onTouchEnd={handleTouchEnd}
            onClick={handleClick}
          />

          {/* Initials entry overlay */}
          {displayState === "enter_initials" && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/85">
              <div className="bg-gray-900 border-2 border-yellow-400 rounded-lg p-6 text-center max-w-xs w-full mx-4">
                <div className="text-yellow-400 font-mono font-bold text-lg mb-1">ENTER YOUR INITIALS</div>
                <div className="text-gray-400 font-mono text-sm mb-4">Score: {score}ft — Level {currentLevel}</div>
                <div className="flex justify-center gap-3 mb-5">
                  {[0,1,2].map(pos => (
                    <div key={pos} className="flex flex-col items-center gap-1">
                      <button onClick={() => cycleInitial(pos, 1)} className="w-12 h-10 bg-red-700 hover:bg-red-600 text-white font-mono font-bold text-xl rounded">^</button>
                      <div className={`w-12 h-12 flex items-center justify-center font-mono font-bold text-2xl rounded border-2 ${initialsPos === pos ? "border-yellow-400 bg-gray-700 text-yellow-400" : "border-gray-600 bg-gray-800 text-white"}`}
                           onClick={() => setInitialsPos(pos)}>
                        {initials[pos]}
                      </div>
                      <button onClick={() => cycleInitial(pos, -1)} className="w-12 h-10 bg-red-700 hover:bg-red-600 text-white font-mono font-bold text-xl rounded">v</button>
                    </div>
                  ))}
                </div>
                <button onClick={submitInitials} className="w-full py-3 bg-red-700 hover:bg-red-600 text-white font-mono font-bold text-lg rounded border-2 border-red-500">
                  SUBMIT
                </button>
              </div>
            </div>
          )}

          {/* Won code copy button */}
          {(displayState === "won" || displayState === "boss_lost") && wonCode && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
              <button
                onClick={() => { navigator.clipboard.writeText(wonCode); setCopied(true); }}
                className="px-6 py-2 bg-yellow-500 hover:bg-yellow-400 text-black font-mono font-bold rounded border-2 border-yellow-300 text-sm"
              >
                {copied ? "COPIED!" : "COPY CODE"}
              </button>
            </div>
          )}
        </div>

        {/* Controls hint */}
        <div className="mt-3 text-center text-gray-500 font-mono text-xs hidden sm:block">
          SPACE/UP = move up lane &nbsp;|&nbsp; DOWN = turbo &nbsp;|&nbsp; Collect leaf bags to restore lives
        </div>
        <div className="mt-2 text-center text-gray-500 font-mono text-xs sm:hidden">
          TAP TOP = move up &nbsp;|&nbsp; TAP BOTTOM = move down + turbo
        </div>
      </div>
      <Footer />
    </div>
  );
}
