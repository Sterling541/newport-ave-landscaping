/* ============================================================
   LAWN MOWER DASH — Multi-Level Retro Runner
   Newport Avenue Landscaping

   LEVELS:
   1. The Neighborhood   — dodge sprinklers, NAL yard signs everywhere
   2. The HOA Gauntlet   — angry board members, "NO NAL ALLOWED" signs
   3. The Construction Site — NAL branded equipment, boulders, mud
   4. The Drought Zone   — dead lawns NAL is saving, water inspector, tumbleweeds

   Controls: Tap top/bottom · Swipe · ↑↓ keys
   ============================================================ */
import { useEffect, useRef, useState, useCallback } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// ── Canvas dimensions ─────────────────────────────────────────────────────
const W = 640;
const H = 360;
const PLAYER_X = 100;
const PLAYER_R = 18;
const LANE_COUNT = 5;
const LANE_H = H / LANE_COUNT;
const LANE_CENTERS = Array.from({ length: LANE_COUNT }, (_, i) => LANE_H * i + LANE_H / 2);
// Funny discount code — only revealed after beating Level 4
const DISCOUNT_CODE = "MOWMONEY100";
const HIGH_SCORE_KEY = "nal_mower_hs_v3";

// ── Level definitions ─────────────────────────────────────────────────────
const LEVELS = [
  {
    id: 1,
    name: "THE NEIGHBORHOOD",
    subtitle: "Dodge the sprinklers & keep the NAL signs upright!",
    targetDist: 1000,
    bgColor: "#3a8c3a",
    skyColor: "#87ceeb",
    tagline: "Just another Tuesday in the 'hood.",
  },
  {
    id: 2,
    name: "THE HOA GAUNTLET",
    subtitle: "They HATE us. We mow anyway.",
    targetDist: 1500,
    bgColor: "#4a7c4a",
    skyColor: "#c8e6c9",
    tagline: "HOA Rule #312: No fun allowed.",
  },
  {
    id: 3,
    name: "THE CONSTRUCTION SITE",
    subtitle: "Navigate the chaos — NAL builds through it!",
    targetDist: 2000,
    bgColor: "#8b7355",
    skyColor: "#b0bec5",
    tagline: "Hard hats required. Complaints not.",
  },
  {
    id: 4,
    name: "THE DROUGHT ZONE",
    subtitle: "Dead lawns? Not on Sterling's watch.",
    targetDist: 2500,
    bgColor: "#c8a96e",
    skyColor: "#ffe082",
    tagline: "Central Oregon summer. Pray for rain.",
  },
];

// ── Brand colors ──────────────────────────────────────────────────────────
const BRAND_GREEN  = "#1a5c2a";
const BRAND_RED    = "#c0392b";
const BRAND_GOLD   = "#c8a84b";
const BRAND_LIGHT  = "#e8f5e9";
const BRAND_DARK   = "#0f3518";

// ── Types ─────────────────────────────────────────────────────────────────
interface Obstacle {
  id: number; x: number; lane: number; type: string;
  y?: number;
  angle?: number; arcSpeed?: number; arcWidth?: number; arcLen?: number;
  phase?: number;
  speed?: number;
}
interface Collectible { id: number; x: number; lane: number; type: string; collected: boolean; bobOffset: number; }
interface Particle { x: number; y: number; vx: number; vy: number; life: number; color: string; r: number; }
interface PopText { x: number; y: number; text: string; color: string; life: number; size: number; }
type GameState = "idle" | "level_intro" | "playing" | "level_complete" | "dead" | "won";

// ── Helpers ───────────────────────────────────────────────────────────────
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const clamp = (v: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, v));
const rand = (lo: number, hi: number) => lo + Math.random() * (hi - lo);
const randInt = (lo: number, hi: number) => Math.floor(rand(lo, hi + 1));

// ── Main Component ────────────────────────────────────────────────────────
export default function LawnMowerDash() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stateRef = useRef<GameState>("idle");
  const [displayState, setDisplayState] = useState<GameState>("idle");
  const [currentLevel, setCurrentLevel] = useState(1);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(() => {
    try { return parseInt(localStorage.getItem(HIGH_SCORE_KEY) ?? "0") || 0; } catch { return 0; }
  });
  const [wonCode, setWonCode] = useState("");
  const [copied, setCopied] = useState(false);

  // Mutable game state refs
  const playerLane = useRef(2);
  const playerY = useRef(LANE_CENTERS[2]);
  const targetLane = useRef(2);
  const obstacles = useRef<Obstacle[]>([]);
  const collectibles = useRef<Collectible[]>([]);
  const particles = useRef<Particle[]>([]);
  const popTexts = useRef<PopText[]>([]);
  const distance = useRef(0);
  const baseSpeed = useRef(2.8);
  const playerSpeedMult = useRef(1.0);
  const slowTimer = useRef(0);
  const fastTimer = useRef(0);
  const nextObstacleDist = useRef(220);
  const nextCollectibleDist = useRef(400);
  const idCounter = useRef(0);
  const rafId = useRef<number>(0);
  const scrollX = useRef(0);
  const lives = useRef(3);
  const invincible = useRef(0);
  const frameCount = useRef(0);
  const touchStartY = useRef<number | null>(null);
  const scoreRef = useRef(0);
  const highScoreRef = useRef(highScore);
  const combo = useRef(0);
  const lastObstaclePassed = useRef(-1);
  const levelRef = useRef(1);
  const levelIntroTimer = useRef(0);
  const screenShake = useRef(0);
  const stripeToggle = useRef(false);
  const lastStripeX = useRef(0);
  const mowStripes = useRef<{x: number; lane: number; dark: boolean}[]>([]);

  const nextId = () => ++idCounter.current;

  // ── Reset ──────────────────────────────────────────────────────────────
  const resetGame = useCallback((level = 1) => {
    playerLane.current = 2;
    playerY.current = LANE_CENTERS[2];
    targetLane.current = 2;
    obstacles.current = [];
    collectibles.current = [];
    particles.current = [];
    popTexts.current = [];
    mowStripes.current = [];
    distance.current = 0;
    baseSpeed.current = 2.8;
    playerSpeedMult.current = 1.0;
    slowTimer.current = 0;
    fastTimer.current = 0;
    nextObstacleDist.current = 220;
    nextCollectibleDist.current = 400;
    scrollX.current = 0;
    lives.current = 3;
    invincible.current = 0;
    frameCount.current = 0;
    scoreRef.current = 0;
    combo.current = 0;
    lastObstaclePassed.current = -1;
    levelRef.current = level;
    levelIntroTimer.current = 120;
    screenShake.current = 0;
    stripeToggle.current = false;
    lastStripeX.current = PLAYER_X;
    setScore(0);
    setWonCode("");
    setCopied(false);
    setCurrentLevel(level);
  }, []);

  // ── Spawn helpers ──────────────────────────────────────────────────────
  function spawnObstacle(level: number) {
    const lane = randInt(0, LANE_COUNT - 1);
    const id = nextId();
    if (level === 1) {
      // Neighborhood: sprinklers + rogue garden gnomes
      const t = Math.random() < 0.7 ? "sprinkler" : "gnome";
      obstacles.current.push({
        id, x: W + 50, lane, type: t,
        angle: rand(0, Math.PI * 2),
        arcSpeed: rand(0.018, 0.042) * (Math.random() < 0.5 ? 1 : -1),
        arcWidth: rand(0.55, 1.15),
        arcLen: rand(55, 90),
        phase: 0,
      });
    } else if (level === 2) {
      // HOA Gauntlet: angry board members + "NO NAL ALLOWED" signs
      const types = ["hoa_member", "hoa_member", "hoa_sign", "hoa_group"];
      const t = types[randInt(0, types.length - 1)];
      obstacles.current.push({ id, x: W + 50, lane, type: t, phase: 0, speed: rand(0.8, 1.4) });
      if (t === "hoa_group" && lane > 0) {
        obstacles.current.push({ id: nextId(), x: W + 80, lane: lane - 1, type: "hoa_member", phase: Math.PI * 0.5, speed: rand(0.8, 1.4) });
      }
    } else if (level === 3) {
      // Construction: boulders, skid steer, mud puddles, orange cones
      const types = ["boulder", "boulder", "mud_puddle", "skid_steer", "cone_row"];
      const t = types[randInt(0, types.length - 1)];
      obstacles.current.push({ id, x: W + 60, lane, type: t, speed: t === "skid_steer" ? rand(1.5, 2.5) : 0 });
    } else if (level === 4) {
      // Drought: tumbleweeds, water inspector, dead lawn patches, fire ant mounds
      const types = ["tumbleweed", "tumbleweed", "water_inspector", "dead_patch", "fire_ants"];
      const t = types[randInt(0, types.length - 1)];
      obstacles.current.push({ id, x: W + 50, lane, type: t, phase: 0, speed: t === "water_inspector" ? rand(1.2, 2.0) : rand(0.5, 1.5) });
    }
  }

  function spawnCollectible(level: number) {
    const lane = randInt(0, LANE_COUNT - 1);
    // Level-specific collectibles — all landscaping themed
    const types =
      level === 1 ? ["nal_sign", "coffee", "star", "leaf_bag"] :
      level === 2 ? ["permit", "star", "coffee", "nal_flag"] :
      level === 3 ? ["hard_hat", "star", "coffee", "nal_truck"] :
                    ["water_bottle", "star", "nal_hose", "cactus"];
    const type = types[randInt(0, types.length - 1)];
    collectibles.current.push({ id: nextId(), x: W + 20, lane, type, collected: false, bobOffset: rand(0, Math.PI * 2) });
  }

  function spawnParticles(x: number, y: number, color: string, count = 14) {
    for (let i = 0; i < count; i++) {
      const a = rand(0, Math.PI * 2);
      const s = rand(2, 5);
      particles.current.push({ x, y, vx: Math.cos(a) * s, vy: Math.sin(a) * s, life: 1, color, r: rand(3, 8) });
    }
  }

  function spawnPopText(x: number, y: number, text: string, color: string, size = 14) {
    popTexts.current.push({ x, y, text, color, life: 1, size });
  }

  // ── Draw helpers ───────────────────────────────────────────────────────

  function drawBackground(ctx: CanvasRenderingContext2D, level: number, frame: number) {
    if (level === 1) {
      // Neighborhood: lush green grass, NAL yard signs, houses
      for (let i = 0; i < LANE_COUNT; i++) {
        ctx.fillStyle = i % 2 === 0 ? "#3a8c3a" : "#358035";
        ctx.fillRect(0, i * LANE_H, W, LANE_H);
      }
      // Mow stripes
      for (const stripe of mowStripes.current) {
        const ly = stripe.lane * LANE_H;
        ctx.fillStyle = stripe.dark ? "#2e7a2e" : "#4db84d";
        ctx.fillRect(stripe.x, ly, 28, LANE_H);
      }
      // Scrolling houses + NAL yard signs in background strip
      drawNeighborhoodBg(ctx, frame);
    } else if (level === 2) {
      // HOA neighborhood — manicured, oppressive, "NO NAL ALLOWED" banners
      for (let i = 0; i < LANE_COUNT; i++) {
        ctx.fillStyle = i % 2 === 0 ? "#4a7c4a" : "#427042";
        ctx.fillRect(0, i * LANE_H, W, LANE_H);
      }
      // Perfect grid lines (HOA approved)
      ctx.strokeStyle = "rgba(255,255,255,0.1)";
      ctx.lineWidth = 1;
      for (let i = 1; i < LANE_COUNT; i++) {
        ctx.beginPath(); ctx.moveTo(0, i * LANE_H); ctx.lineTo(W, i * LANE_H); ctx.stroke();
      }
      drawHOABg(ctx, frame);
    } else if (level === 3) {
      // Construction site — dirt, gravel, NAL equipment in background
      for (let i = 0; i < LANE_COUNT; i++) {
        const shade = i % 2 === 0 ? "#8b7355" : "#7a6548";
        ctx.fillStyle = shade;
        ctx.fillRect(0, i * LANE_H, W, LANE_H);
      }
      // Gravel texture dots
      ctx.fillStyle = "rgba(0,0,0,0.07)";
      for (let x = -(scrollX.current % 20); x < W; x += 20) {
        for (let y = 0; y < H; y += 20) {
          if (Math.random() < 0.25) ctx.fillRect(x + rand(0, 8), y + rand(0, 8), 3, 3);
        }
      }
      drawConstructionBg(ctx, frame);
    } else {
      // Drought zone — cracked earth, dead grass, NAL to the rescue
      for (let i = 0; i < LANE_COUNT; i++) {
        ctx.fillStyle = i % 2 === 0 ? "#c8a96e" : "#b8996e";
        ctx.fillRect(0, i * LANE_H, W, LANE_H);
      }
      drawDroughtBg(ctx, frame);
    }

    // Lane dividers
    ctx.setLineDash([8, 12]);
    ctx.strokeStyle = "rgba(0,0,0,0.12)";
    ctx.lineWidth = 1;
    for (let i = 1; i < LANE_COUNT; i++) {
      ctx.beginPath(); ctx.moveTo(0, i * LANE_H); ctx.lineTo(W, i * LANE_H); ctx.stroke();
    }
    ctx.setLineDash([]);
  }

  // Level 1 background: houses + NAL yard signs
  function drawNeighborhoodBg(ctx: CanvasRenderingContext2D, frame: number) {
    const houseX = -(scrollX.current % 240);
    for (let x = houseX; x < W + 240; x += 240) {
      // House body
      ctx.fillStyle = ["#e8d5b0", "#d4c5a0", "#c8b89a"][Math.floor(x / 240) % 3];
      ctx.fillRect(x + 10, 2, 50, 22);
      // Roof
      ctx.fillStyle = ["#8b4513", "#6b3410", "#a0522d"][Math.floor(x / 240) % 3];
      ctx.beginPath();
      ctx.moveTo(x + 5, 2); ctx.lineTo(x + 35, -10); ctx.lineTo(x + 65, 2);
      ctx.closePath(); ctx.fill();
      // Window
      ctx.fillStyle = "#87ceeb";
      ctx.fillRect(x + 18, 8, 12, 10);
      ctx.strokeStyle = "#fff"; ctx.lineWidth = 0.5;
      ctx.strokeRect(x + 18, 8, 12, 10);
      // Door
      ctx.fillStyle = BRAND_GREEN;
      ctx.fillRect(x + 34, 12, 8, 12);
      // NAL yard sign in front of house
      drawNALYardSign(ctx, x + 70, 20);
    }
  }

  // Tiny NAL yard sign
  function drawNALYardSign(ctx: CanvasRenderingContext2D, x: number, y: number) {
    // Sign stake
    ctx.strokeStyle = "#5c3d1e"; ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x, y + 14); ctx.stroke();
    // Sign board
    ctx.fillStyle = BRAND_GREEN;
    ctx.fillRect(x - 14, y - 10, 28, 12);
    ctx.fillStyle = BRAND_GOLD; ctx.font = "bold 5px sans-serif"; ctx.textAlign = "center";
    ctx.fillText("NAL", x, y - 2);
    ctx.fillStyle = "#fff"; ctx.font = "4px sans-serif";
    ctx.fillText("LANDSCAPING", x, y + 4);
  }

  // Level 2 background: HOA signs + "NO NAL ALLOWED" banners
  function drawHOABg(ctx: CanvasRenderingContext2D, frame: number) {
    const signX = -(scrollX.current % 280) + 220;
    for (let x = signX; x < W + 280; x += 280) {
      // HOA violation sign
      ctx.fillStyle = "#fff";
      ctx.fillRect(x, 4, 80, 24);
      ctx.strokeStyle = BRAND_RED; ctx.lineWidth = 2;
      ctx.strokeRect(x, 4, 80, 24);
      ctx.fillStyle = BRAND_RED; ctx.font = "bold 7px sans-serif"; ctx.textAlign = "center";
      ctx.fillText("HOA NOTICE", x + 40, 14);
      ctx.fillStyle = "#333"; ctx.font = "5.5px sans-serif";
      ctx.fillText("NO NAL ALLOWED", x + 40, 24);
    }
    // Perfectly manicured hedge row at top
    const hedgeX = -(scrollX.current % 60);
    for (let x = hedgeX; x < W + 60; x += 60) {
      ctx.fillStyle = "#2d6a2d";
      ctx.beginPath(); ctx.arc(x + 15, 4, 10, Math.PI, 0); ctx.fill();
      ctx.beginPath(); ctx.arc(x + 35, 4, 10, Math.PI, 0); ctx.fill();
      ctx.beginPath(); ctx.arc(x + 55, 4, 10, Math.PI, 0); ctx.fill();
    }
  }

  // Level 3 background: construction tape + NAL branded equipment in bg
  function drawConstructionBg(ctx: CanvasRenderingContext2D, frame: number) {
    // Yellow/black caution tape along top and bottom
    const tapeOffset = -(scrollX.current % 40);
    for (let x = tapeOffset; x < W + 40; x += 40) {
      ctx.fillStyle = x % 80 < 40 ? "#f59e0b" : "#1a1a1a";
      ctx.fillRect(x, 0, 40, 8);
      ctx.fillStyle = x % 80 < 40 ? "#1a1a1a" : "#f59e0b";
      ctx.fillRect(x, H - 8, 40, 8);
    }
    // NAL branded trailer in background
    const trailX = -(scrollX.current % 500) + 400;
    for (let x = trailX; x < W + 500; x += 500) {
      ctx.fillStyle = BRAND_GREEN;
      ctx.fillRect(x, 2, 80, 18);
      ctx.fillStyle = BRAND_GOLD; ctx.font = "bold 6px sans-serif"; ctx.textAlign = "center";
      ctx.fillText("NEWPORT AVE LANDSCAPING", x + 40, 14);
    }
  }

  // Level 4 background: cracks + dead grass patches + NAL "before/after" signs
  function drawDroughtBg(ctx: CanvasRenderingContext2D, frame: number) {
    // Crack lines
    ctx.strokeStyle = "rgba(100,60,0,0.4)"; ctx.lineWidth = 1;
    const offset = -(scrollX.current % 160);
    for (let x = offset; x < W + 160; x += 160) {
      for (let y = 20; y < H - 20; y += 60) {
        ctx.beginPath();
        ctx.moveTo(x + 20, y); ctx.lineTo(x + 35, y + 15); ctx.lineTo(x + 28, y + 28); ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(x + 35, y + 15); ctx.lineTo(x + 50, y + 10); ctx.stroke();
      }
    }
    // "NAL SAVES LAWNS" signs scrolling past
    const nalX = -(scrollX.current % 380) + 300;
    for (let x = nalX; x < W + 380; x += 380) {
      ctx.fillStyle = BRAND_GREEN;
      ctx.fillRect(x, 3, 90, 20);
      ctx.fillStyle = BRAND_GOLD; ctx.font = "bold 6px sans-serif"; ctx.textAlign = "center";
      ctx.fillText("NAL SAVES LAWNS! 🌿", x + 45, 16);
    }
    // Heat shimmer effect (wavy lines)
    if (frame % 3 === 0) {
      ctx.strokeStyle = "rgba(255,200,100,0.08)"; ctx.lineWidth = 2;
      for (let y = 30; y < H - 30; y += 40) {
        ctx.beginPath();
        for (let x = 0; x < W; x += 8) {
          const wy = y + Math.sin((x + frame * 2) * 0.05) * 3;
          if (x === 0) ctx.moveTo(x, wy); else ctx.lineTo(x, wy);
        }
        ctx.stroke();
      }
    }
  }

  // ── Player sprite (NAL branded mower + landscaper) ─────────────────────
  function drawPlayer(ctx: CanvasRenderingContext2D, frame: number, isInvincible: boolean) {
    const blinking = isInvincible && Math.floor(invincible.current / 5) % 2 === 0;
    if (blinking) return;
    ctx.save();
    ctx.translate(PLAYER_X, playerY.current);

    const legSwing = Math.sin(frame * 0.3) * 10;
    const bounce = Math.abs(Math.sin(frame * 0.3)) * -2;
    ctx.translate(0, bounce);

    // Shadow
    ctx.beginPath();
    ctx.ellipse(4, PLAYER_R + 4, 16, 4, 0, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(0,0,0,0.2)";
    ctx.fill();

    // ── NAL Commercial Mower (green branded) ──────────────────────────────
    // Mower deck — brand green
    ctx.fillStyle = BRAND_GREEN;
    ctx.beginPath(); ctx.roundRect(8, 2, 40, 18, 5); ctx.fill();
    // Deck highlight
    ctx.fillStyle = "#2a7a3a";
    ctx.beginPath(); ctx.roundRect(10, 3, 32, 7, 3); ctx.fill();
    // NAL logo on deck
    ctx.fillStyle = BRAND_GOLD;
    ctx.font = "bold 6px sans-serif"; ctx.textAlign = "center";
    ctx.fillText("NAL", 28, 14);
    // Engine block
    ctx.fillStyle = BRAND_DARK;
    ctx.beginPath(); ctx.roundRect(18, 0, 16, 9, 3); ctx.fill();
    // Engine fins
    ctx.strokeStyle = "#4a9a5a"; ctx.lineWidth = 1;
    for (let i = 0; i < 3; i++) {
      ctx.beginPath(); ctx.moveTo(21 + i * 4, 1); ctx.lineTo(21 + i * 4, 8); ctx.stroke();
    }
    // Exhaust pipe
    ctx.fillStyle = "#555";
    ctx.beginPath(); ctx.roundRect(30, -4, 4, 6, 1); ctx.fill();
    // Exhaust puff
    if (frame % 12 < 6) {
      ctx.fillStyle = "rgba(180,180,180,0.4)";
      ctx.beginPath(); ctx.arc(32, -6, 3, 0, Math.PI * 2); ctx.fill();
    }
    // Wheels — big commercial mower wheels
    ctx.fillStyle = "#1e293b";
    ctx.beginPath(); ctx.arc(14, 22, 7, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.arc(44, 22, 7, 0, Math.PI * 2); ctx.fill();
    // Wheel treads
    ctx.strokeStyle = "#475569"; ctx.lineWidth = 1.5;
    for (let a = 0; a < Math.PI * 2; a += Math.PI / 3) {
      const ra = a + frame * 0.35;
      ctx.beginPath();
      ctx.moveTo(14 + Math.cos(ra) * 3.5, 22 + Math.sin(ra) * 3.5);
      ctx.lineTo(14 + Math.cos(ra) * 7, 22 + Math.sin(ra) * 7);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(44 + Math.cos(ra) * 3.5, 22 + Math.sin(ra) * 3.5);
      ctx.lineTo(44 + Math.cos(ra) * 7, 22 + Math.sin(ra) * 7);
      ctx.stroke();
    }
    // Wheel hubs
    ctx.fillStyle = BRAND_GOLD;
    ctx.beginPath(); ctx.arc(14, 22, 2.5, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.arc(44, 22, 2.5, 0, Math.PI * 2); ctx.fill();
    // Spinning blade indicator
    ctx.save(); ctx.translate(28, 11); ctx.rotate(frame * 0.6);
    ctx.strokeStyle = "rgba(200,255,200,0.7)"; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(-8, 0); ctx.lineTo(8, 0); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(0, -8); ctx.lineTo(0, 8); ctx.stroke();
    ctx.restore();
    // Grass clippings flying out left
    ctx.fillStyle = "#86efac";
    for (let i = 0; i < 5; i++) {
      const gx = 8 - 6 - i * 5;
      const gy = 11 + Math.sin(frame * 0.35 + i * 1.2) * 6;
      ctx.beginPath(); ctx.ellipse(gx, gy, 2.5, 1.2, 0.5, 0, Math.PI * 2); ctx.fill();
    }
    // Handle bars
    ctx.strokeStyle = "#374151"; ctx.lineWidth = 3.5; ctx.lineCap = "round";
    ctx.beginPath(); ctx.moveTo(10, 5); ctx.lineTo(-5, -5); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(10, 15); ctx.lineTo(-5, 7); ctx.stroke();
    // Grip bar
    ctx.fillStyle = "#1e293b";
    ctx.beginPath(); ctx.roundRect(-9, -7, 10, 18, 3); ctx.fill();

    // ── Landscaper (Sterling-ish) ──────────────────────────────────────────
    // Legs
    ctx.strokeStyle = "#1a1a2e"; ctx.lineWidth = 6; ctx.lineCap = "round";
    ctx.beginPath(); ctx.moveTo(-2, 8); ctx.lineTo(-10 + legSwing, 22); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(-2, 8); ctx.lineTo(4 - legSwing, 22); ctx.stroke();
    // Boots (work boots)
    ctx.fillStyle = "#3d2b1f";
    ctx.beginPath(); ctx.ellipse(-10 + legSwing, 24, 7, 3.5, 0.3, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.ellipse(4 - legSwing, 24, 7, 3.5, -0.3, 0, Math.PI * 2); ctx.fill();
    // Torso — NAL green uniform shirt
    ctx.save(); ctx.translate(-2, 0); ctx.rotate(0.2);
    ctx.fillStyle = BRAND_GREEN;
    ctx.beginPath(); ctx.roundRect(-9, -16, 18, 22, 5); ctx.fill();
    // Shirt collar
    ctx.fillStyle = "#2a7a3a";
    ctx.beginPath(); ctx.roundRect(-7, -16, 14, 6, 3); ctx.fill();
    // NAL logo patch on shirt
    ctx.fillStyle = BRAND_GOLD;
    ctx.beginPath(); ctx.roundRect(-6, -10, 12, 7, 2); ctx.fill();
    ctx.fillStyle = BRAND_DARK; ctx.font = "bold 5px sans-serif"; ctx.textAlign = "center";
    ctx.fillText("NAL", 0, -5);
    // Arms
    ctx.strokeStyle = BRAND_GREEN; ctx.lineWidth = 5; ctx.lineCap = "round";
    ctx.beginPath(); ctx.moveTo(-8, -8); ctx.lineTo(-14, 2); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(8, -8); ctx.lineTo(4, 2); ctx.stroke();
    // Gloves
    ctx.fillStyle = "#f59e0b";
    ctx.beginPath(); ctx.arc(-14, 2, 4, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.arc(4, 2, 4, 0, Math.PI * 2); ctx.fill();
    ctx.restore();
    // Head
    ctx.fillStyle = "#f5c5a3";
    ctx.beginPath(); ctx.arc(-2, -22, 10, 0, Math.PI * 2); ctx.fill();
    // Hair (dark)
    ctx.fillStyle = "#3d2b1f";
    ctx.beginPath(); ctx.arc(-2, -28, 8, Math.PI, 0); ctx.fill();
    // Eyes
    ctx.fillStyle = "#1a1a2e";
    ctx.beginPath(); ctx.arc(-5, -23, 1.5, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.arc(1, -23, 1.5, 0, Math.PI * 2); ctx.fill();
    // Confident smile
    ctx.strokeStyle = "#1a1a2e"; ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.arc(-2, -21, 4, 0.2, Math.PI - 0.2); ctx.stroke();
    // NAL branded cap (green with gold logo)
    ctx.fillStyle = BRAND_GREEN;
    ctx.beginPath(); ctx.roundRect(-11, -34, 22, 11, 3); ctx.fill();
    ctx.fillStyle = BRAND_DARK;
    ctx.beginPath(); ctx.roundRect(-13, -25, 26, 4, 2); ctx.fill();
    // Cap logo
    ctx.fillStyle = BRAND_GOLD; ctx.font = "bold 5px sans-serif"; ctx.textAlign = "center";
    ctx.fillText("NAL", -2, -27);
    // Cap button
    ctx.fillStyle = BRAND_GOLD;
    ctx.beginPath(); ctx.arc(-2, -34, 2, 0, Math.PI * 2); ctx.fill();

    ctx.restore();
  }

  // ── Obstacle drawing ───────────────────────────────────────────────────
  function drawObstacle(ctx: CanvasRenderingContext2D, obs: Obstacle, frame: number) {
    const y = LANE_CENTERS[obs.lane];
    ctx.save();
    ctx.translate(obs.x, y);

    if (obs.type === "sprinkler") {
      // Improved sprinkler with NAL-branded head
      ctx.fillStyle = "#475569";
      ctx.beginPath(); ctx.arc(0, 0, 9, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = BRAND_GREEN;
      ctx.beginPath(); ctx.arc(0, 0, 6, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = BRAND_GOLD; ctx.font = "bold 4px sans-serif"; ctx.textAlign = "center";
      ctx.fillText("H2O", 0, 2);
      // Water arc
      ctx.save();
      ctx.rotate(obs.angle!);
      ctx.strokeStyle = "rgba(59,130,246,0.8)";
      ctx.lineWidth = 3.5;
      ctx.lineCap = "round";
      ctx.beginPath();
      ctx.arc(0, 0, obs.arcLen!, -obs.arcWidth! / 2, obs.arcWidth! / 2);
      ctx.stroke();
      // Water droplets along arc
      ctx.fillStyle = "rgba(147,197,253,0.95)";
      for (let i = 0; i < 6; i++) {
        const a = -obs.arcWidth! / 2 + (obs.arcWidth! / 5) * i;
        const r = obs.arcLen! + rand(-4, 4);
        ctx.beginPath();
        ctx.arc(Math.cos(a) * r, Math.sin(a) * r, 3, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
      // Mist
      ctx.fillStyle = "rgba(186,230,253,0.25)";
      ctx.beginPath();
      ctx.arc(0, 0, obs.arcLen! + 10, obs.angle! - obs.arcWidth! / 2, obs.angle! + obs.arcWidth! / 2);
      ctx.lineTo(0, 0); ctx.closePath(); ctx.fill();

    } else if (obs.type === "gnome") {
      // Garden gnome — rogue obstacle
      // Body (red coat)
      ctx.fillStyle = "#dc2626";
      ctx.beginPath(); ctx.roundRect(-8, -10, 16, 20, 4); ctx.fill();
      // White beard
      ctx.fillStyle = "#f5f5f5";
      ctx.beginPath(); ctx.arc(0, 0, 8, 0, Math.PI); ctx.fill();
      // Hat (tall pointy red)
      ctx.fillStyle = "#dc2626";
      ctx.beginPath();
      ctx.moveTo(-7, -10); ctx.lineTo(0, -28); ctx.lineTo(7, -10);
      ctx.closePath(); ctx.fill();
      // Face
      ctx.fillStyle = "#f5c5a3";
      ctx.beginPath(); ctx.arc(0, -12, 7, 0, Math.PI * 2); ctx.fill();
      // Eyes
      ctx.fillStyle = "#1a1a2e";
      ctx.beginPath(); ctx.arc(-2.5, -13, 1.5, 0, Math.PI * 2); ctx.fill();
      ctx.beginPath(); ctx.arc(2.5, -13, 1.5, 0, Math.PI * 2); ctx.fill();
      // Rosy cheeks
      ctx.fillStyle = "rgba(255,100,100,0.4)";
      ctx.beginPath(); ctx.arc(-4, -10, 3, 0, Math.PI * 2); ctx.fill();
      ctx.beginPath(); ctx.arc(4, -10, 3, 0, Math.PI * 2); ctx.fill();
      // Speech bubble
      if (Math.floor(frame / 35) % 2 === 0) {
        ctx.fillStyle = "#fff";
        ctx.beginPath(); ctx.roundRect(8, -38, 44, 14, 4); ctx.fill();
        ctx.strokeStyle = "#dc2626"; ctx.lineWidth = 1;
        ctx.strokeRect(8, -38, 44, 14);
        ctx.fillStyle = "#dc2626"; ctx.font = "bold 6px sans-serif"; ctx.textAlign = "center";
        ctx.fillText("MY LAWN!", 30, -28);
      }

    } else if (obs.type === "hoa_member" || obs.type === "hoa_group") {
      // HOA board member — angry, khakis, clipboard, "NO NAL" button
      const legSwing = Math.sin((obs.phase || 0) + frame * 0.25) * 10;
      
      ctx.beginPath(); ctx.ellipse(0, 20, 12, 4, 0, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(0,0,0,0.2)"; ctx.fill();
      
      // Legs (khaki pants)
      ctx.strokeStyle = "#c8a84b"; ctx.lineWidth = 6; ctx.lineCap = "round";
      ctx.beginPath(); ctx.moveTo(0, 8); ctx.lineTo(-8 + legSwing, 22); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(0, 8); ctx.lineTo(6 - legSwing, 22); ctx.stroke();
      // Loafers
      ctx.fillStyle = "#5c3d1e";
      ctx.beginPath(); ctx.ellipse(-8 + legSwing, 24, 6, 3, 0.3, 0, Math.PI * 2); ctx.fill();
      ctx.beginPath(); ctx.ellipse(6 - legSwing, 24, 6, 3, -0.3, 0, Math.PI * 2); ctx.fill();
      // Torso (HOA polo — navy)
      ctx.fillStyle = "#1e3a5f";
      ctx.beginPath(); ctx.roundRect(-9, -14, 18, 22, 4); ctx.fill();
      ctx.fillStyle = "#2563eb";
      ctx.beginPath(); ctx.roundRect(-7, -14, 14, 5, 2); ctx.fill();
      // HOA badge
      ctx.fillStyle = "#fbbf24";
      ctx.beginPath(); ctx.roundRect(-4, -8, 8, 5, 1); ctx.fill();
      ctx.fillStyle = "#1a1a2e"; ctx.font = "bold 4px sans-serif"; ctx.textAlign = "center";
      ctx.fillText("HOA", 0, -4);
      // "NO NAL" button pin
      ctx.fillStyle = BRAND_RED;
      ctx.beginPath(); ctx.arc(5, -2, 4, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = "#fff"; ctx.font = "bold 3px sans-serif"; ctx.textAlign = "center";
      ctx.fillText("NO", 5, -3);
      ctx.fillText("NAL", 5, 1);
      // Arms
      ctx.strokeStyle = "#1e3a5f"; ctx.lineWidth = 5; ctx.lineCap = "round";
      ctx.beginPath(); ctx.moveTo(-8, -8); ctx.lineTo(-14, 4); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(8, -8); ctx.lineTo(14, -2); ctx.stroke();
      // Clipboard (right hand)
      ctx.fillStyle = "#f5f5dc";
      ctx.beginPath(); ctx.roundRect(10, -8, 14, 18, 2); ctx.fill();
      ctx.strokeStyle = "#8b7355"; ctx.lineWidth = 1;
      ctx.strokeRect(10, -8, 14, 18);
      ctx.strokeStyle = "#999"; ctx.lineWidth = 0.8;
      for (let i = 0; i < 5; i++) {
        ctx.beginPath(); ctx.moveTo(12, -4 + i * 3); ctx.lineTo(22, -4 + i * 3); ctx.stroke();
      }
      ctx.fillStyle = "#888";
      ctx.beginPath(); ctx.roundRect(13, -10, 8, 4, 1); ctx.fill();
      // Head
      ctx.fillStyle = "#f5c5a3";
      ctx.beginPath(); ctx.arc(0, -20, 10, 0, Math.PI * 2); ctx.fill();
      // Grey hair (thinning)
      ctx.fillStyle = "#9ca3af";
      ctx.beginPath(); ctx.arc(0, -26, 8, Math.PI, 0); ctx.fill();
      // Angry eyebrows
      ctx.strokeStyle = "#1a1a2e"; ctx.lineWidth = 2.5;
      ctx.beginPath(); ctx.moveTo(-6, -25); ctx.lineTo(-2, -22); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(6, -25); ctx.lineTo(2, -22); ctx.stroke();
      // Angry eyes
      ctx.fillStyle = "#1a1a2e";
      ctx.beginPath(); ctx.arc(-4, -21, 1.5, 0, Math.PI * 2); ctx.fill();
      ctx.beginPath(); ctx.arc(4, -21, 1.5, 0, Math.PI * 2); ctx.fill();
      // Frown
      ctx.strokeStyle = BRAND_RED; ctx.lineWidth = 1.5;
      ctx.beginPath(); ctx.arc(0, -16, 4, Math.PI + 0.3, -0.3); ctx.stroke();
      // Speech bubble (alternating messages)
      const msgs = ["VIOLATION!", "NO NAL HERE!", "CALL MY LAWYER!", "RULE #312!"];
      if (Math.floor(frame / 28) % 2 === 0) {
        const msg = msgs[Math.floor(frame / 90) % msgs.length];
        const bw = msg.length * 5 + 10;
        ctx.fillStyle = "#fff";
        ctx.beginPath(); ctx.roundRect(12, -40, bw, 14, 4); ctx.fill();
        ctx.strokeStyle = BRAND_RED; ctx.lineWidth = 1;
        ctx.strokeRect(12, -40, bw, 14);
        ctx.fillStyle = BRAND_RED; ctx.font = "bold 6px sans-serif"; ctx.textAlign = "center";
        ctx.fillText(msg, 12 + bw / 2, -30);
      }

    } else if (obs.type === "hoa_sign") {
      // "NO NAL ALLOWED" sign post
      ctx.strokeStyle = "#5c3d1e"; ctx.lineWidth = 3;
      ctx.beginPath(); ctx.moveTo(0, -30); ctx.lineTo(0, 20); ctx.stroke();
      // Sign board
      ctx.fillStyle = BRAND_RED;
      ctx.beginPath(); ctx.roundRect(-28, -30, 56, 22, 4); ctx.fill();
      ctx.strokeStyle = "#fff"; ctx.lineWidth = 2;
      ctx.strokeRect(-28, -30, 56, 22);
      // Circle with slash
      ctx.strokeStyle = "#fff"; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.arc(-14, -19, 7, 0, Math.PI * 2); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(-19, -24); ctx.lineTo(-9, -14); ctx.stroke();
      // NAL text
      ctx.fillStyle = "#fff"; ctx.font = "bold 7px sans-serif"; ctx.textAlign = "center";
      ctx.fillText("NO NAL", 8, -23);
      ctx.fillText("ALLOWED", 8, -13);

    } else if (obs.type === "boulder") {
      // Big boulder with shadow
      ctx.fillStyle = "rgba(0,0,0,0.2)";
      ctx.beginPath(); ctx.ellipse(4, 22, 20, 5, 0, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = "#78716c";
      ctx.beginPath(); ctx.arc(0, 0, 20, 0, Math.PI * 2); ctx.fill();
      // Rock texture
      ctx.fillStyle = "#a8a29e";
      ctx.beginPath(); ctx.arc(-6, -6, 9, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = "#57534e";
      ctx.beginPath(); ctx.arc(7, 5, 6, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = "#d6d3d1";
      ctx.beginPath(); ctx.arc(-8, -8, 4, 0, Math.PI * 2); ctx.fill();
      // Dust cloud at base
      ctx.fillStyle = "rgba(180,160,120,0.35)";
      ctx.beginPath(); ctx.ellipse(0, 18, 22, 7, 0, 0, Math.PI * 2); ctx.fill();

    } else if (obs.type === "mud_puddle") {
      // Mud puddle with NAL boot print
      ctx.fillStyle = "rgba(101,67,33,0.9)";
      ctx.beginPath(); ctx.ellipse(0, 0, 30, 15, 0, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = "rgba(139,90,43,0.6)";
      ctx.beginPath(); ctx.ellipse(-5, -3, 18, 9, 0.3, 0, Math.PI * 2); ctx.fill();
      // Mud splatter
      ctx.fillStyle = "rgba(101,67,33,0.7)";
      for (let i = 0; i < 6; i++) {
        ctx.beginPath();
        ctx.arc(rand(-38, 38), rand(-20, 20), rand(2, 5), 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.fillStyle = "#fff"; ctx.font = "bold 9px sans-serif"; ctx.textAlign = "center";
      ctx.fillText("MUD!", 0, 4);

    } else if (obs.type === "skid_steer") {
      // NAL branded skid steer (yellow)
      ctx.fillStyle = "rgba(0,0,0,0.2)";
      ctx.beginPath(); ctx.ellipse(0, 18, 24, 6, 0, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = "#f59e0b";
      ctx.beginPath(); ctx.roundRect(-22, -14, 44, 30, 4); ctx.fill();
      // NAL stripe on body
      ctx.fillStyle = BRAND_GREEN;
      ctx.fillRect(-22, -2, 44, 6);
      ctx.fillStyle = BRAND_GOLD; ctx.font = "bold 5px sans-serif"; ctx.textAlign = "center";
      ctx.fillText("NAL", 0, 3);
      // Cab
      ctx.fillStyle = "#d97706";
      ctx.beginPath(); ctx.roundRect(-12, -26, 24, 16, 3); ctx.fill();
      // Windshield
      ctx.fillStyle = "rgba(147,197,253,0.75)";
      ctx.beginPath(); ctx.roundRect(-9, -24, 18, 12, 2); ctx.fill();
      // Operator silhouette
      ctx.fillStyle = "#1a1a2e";
      ctx.beginPath(); ctx.arc(0, -20, 4, 0, Math.PI * 2); ctx.fill();
      // Tracks
      ctx.fillStyle = "#1e293b";
      ctx.beginPath(); ctx.roundRect(-24, -10, 8, 22, 3); ctx.fill();
      ctx.beginPath(); ctx.roundRect(16, -10, 8, 22, 3); ctx.fill();
      // Track detail
      ctx.strokeStyle = "#374151"; ctx.lineWidth = 1;
      for (let i = 0; i < 4; i++) {
        ctx.beginPath(); ctx.moveTo(-24, -6 + i * 5); ctx.lineTo(-16, -6 + i * 5); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(16, -6 + i * 5); ctx.lineTo(24, -6 + i * 5); ctx.stroke();
      }
      // Bucket
      ctx.fillStyle = "#b45309";
      ctx.beginPath(); ctx.roundRect(-24, 10, 48, 10, 2); ctx.fill();
      // Exhaust puff
      if (frame % 8 < 4) {
        ctx.fillStyle = "rgba(100,100,100,0.4)";
        ctx.beginPath(); ctx.arc(14, -32, 4, 0, Math.PI * 2); ctx.fill();
        ctx.beginPath(); ctx.arc(18, -38, 3, 0, Math.PI * 2); ctx.fill();
      }

    } else if (obs.type === "cone_row") {
      // Row of orange traffic cones
      for (let i = -1; i <= 1; i++) {
        ctx.save(); ctx.translate(i * 18, 0);
        ctx.fillStyle = "#f97316";
        ctx.beginPath();
        ctx.moveTo(-7, 14); ctx.lineTo(7, 14); ctx.lineTo(3, -14); ctx.lineTo(-3, -14);
        ctx.closePath(); ctx.fill();
        // White stripe
        ctx.fillStyle = "#fff";
        ctx.fillRect(-5, 0, 10, 4);
        // Base
        ctx.fillStyle = "#ea580c";
        ctx.fillRect(-9, 12, 18, 5);
        ctx.restore();
      }

    } else if (obs.type === "tumbleweed") {
      // Tumbleweed rolling
      ctx.save(); ctx.rotate(frame * 0.08);
      ctx.strokeStyle = "#a16207"; ctx.lineWidth = 2.5;
      for (let a = 0; a < Math.PI * 2; a += Math.PI / 4) {
        ctx.beginPath();
        ctx.arc(0, 0, 18, a, a + Math.PI / 3);
        ctx.stroke();
      }
      ctx.strokeStyle = "#ca8a04"; ctx.lineWidth = 1.5;
      for (let a = Math.PI / 8; a < Math.PI * 2; a += Math.PI / 4) {
        ctx.beginPath();
        ctx.arc(0, 0, 11, a, a + Math.PI / 4);
        ctx.stroke();
      }
      // Inner detail
      ctx.strokeStyle = "#d97706"; ctx.lineWidth = 1;
      for (let a = Math.PI / 6; a < Math.PI * 2; a += Math.PI / 3) {
        ctx.beginPath();
        ctx.arc(0, 0, 6, a, a + Math.PI / 5);
        ctx.stroke();
      }
      ctx.restore();

    } else if (obs.type === "water_inspector") {
      // Water inspector — official tan uniform, clipboard, chasing the player
      const legSwing = Math.sin((obs.phase || 0) + frame * 0.3) * 10;
      
      ctx.beginPath(); ctx.ellipse(0, 20, 12, 4, 0, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(0,0,0,0.2)"; ctx.fill();
      
      // Legs (dark pants)
      ctx.strokeStyle = "#1e3a5f"; ctx.lineWidth = 6; ctx.lineCap = "round";
      ctx.beginPath(); ctx.moveTo(0, 8); ctx.lineTo(-8 + legSwing, 22); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(0, 8); ctx.lineTo(6 - legSwing, 22); ctx.stroke();
      ctx.fillStyle = "#1e293b";
      ctx.beginPath(); ctx.ellipse(-8 + legSwing, 24, 6, 3, 0.3, 0, Math.PI * 2); ctx.fill();
      ctx.beginPath(); ctx.ellipse(6 - legSwing, 24, 6, 3, -0.3, 0, Math.PI * 2); ctx.fill();
      // Torso (tan uniform)
      ctx.fillStyle = "#92400e";
      ctx.beginPath(); ctx.roundRect(-9, -14, 18, 22, 4); ctx.fill();
      ctx.fillStyle = "#b45309";
      ctx.beginPath(); ctx.roundRect(-7, -14, 14, 5, 2); ctx.fill();
      // Official badge
      ctx.fillStyle = "#fbbf24";
      ctx.beginPath(); ctx.arc(0, -6, 5, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = "#1a1a2e"; ctx.font = "bold 4px sans-serif"; ctx.textAlign = "center";
      ctx.fillText("H2O", 0, -4);
      // Arms
      ctx.strokeStyle = "#92400e"; ctx.lineWidth = 5; ctx.lineCap = "round";
      ctx.beginPath(); ctx.moveTo(-8, -8); ctx.lineTo(-14, 4); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(8, -8); ctx.lineTo(14, -2); ctx.stroke();
      // Clipboard
      ctx.fillStyle = "#f5f5dc";
      ctx.beginPath(); ctx.roundRect(10, -8, 14, 18, 2); ctx.fill();
      ctx.strokeStyle = "#8b7355"; ctx.lineWidth = 1;
      ctx.strokeRect(10, -8, 14, 18);
      ctx.strokeStyle = "#999"; ctx.lineWidth = 0.8;
      for (let i = 0; i < 5; i++) {
        ctx.beginPath(); ctx.moveTo(12, -4 + i * 3); ctx.lineTo(22, -4 + i * 3); ctx.stroke();
      }
      // Head
      ctx.fillStyle = "#f5c5a3";
      ctx.beginPath(); ctx.arc(0, -20, 10, 0, Math.PI * 2); ctx.fill();
      // Ranger hat
      ctx.fillStyle = "#92400e";
      ctx.beginPath(); ctx.roundRect(-10, -32, 20, 10, 2); ctx.fill();
      ctx.fillStyle = "#78350f";
      ctx.beginPath(); ctx.roundRect(-13, -24, 26, 4, 1); ctx.fill();
      // Suspicious squint eyes
      ctx.fillStyle = "#1a1a2e";
      ctx.beginPath(); ctx.arc(-4, -21, 1.5, 0, Math.PI * 2); ctx.fill();
      ctx.beginPath(); ctx.arc(4, -21, 1.5, 0, Math.PI * 2); ctx.fill();
      // Squint lines
      ctx.strokeStyle = "#1a1a2e"; ctx.lineWidth = 1.5;
      ctx.beginPath(); ctx.moveTo(-7, -23); ctx.lineTo(-1, -21); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(7, -23); ctx.lineTo(1, -21); ctx.stroke();
      // Speech bubble
      const inspMsgs = ["WATER AUDIT!", "SPRINKLER FINE!", "VIOLATION!", "CALL THE COUNTY!"];
      if (Math.floor(frame / 25) % 2 === 0) {
        const msg = inspMsgs[Math.floor(frame / 80) % inspMsgs.length];
        const bw = msg.length * 5 + 10;
        ctx.fillStyle = "#fff";
        ctx.beginPath(); ctx.roundRect(12, -44, bw, 14, 4); ctx.fill();
        ctx.strokeStyle = "#1e3a5f"; ctx.lineWidth = 1;
        ctx.strokeRect(12, -44, bw, 14);
        ctx.fillStyle = "#1e3a5f"; ctx.font = "bold 6px sans-serif"; ctx.textAlign = "center";
        ctx.fillText(msg, 12 + bw / 2, -34);
      }

    } else if (obs.type === "dead_patch") {
      // Dead lawn patch — brown, cracked
      ctx.fillStyle = "rgba(120,80,20,0.85)";
      ctx.beginPath(); ctx.ellipse(0, 0, 28, 14, 0, 0, Math.PI * 2); ctx.fill();
      // Dead grass blades
      ctx.strokeStyle = "#a16207"; ctx.lineWidth = 1.5;
      for (let i = -3; i <= 3; i++) {
        ctx.beginPath();
        ctx.moveTo(i * 7, 0);
        ctx.lineTo(i * 7 + rand(-3, 3), -10 + rand(0, 4));
        ctx.stroke();
      }
      ctx.fillStyle = "#fff"; ctx.font = "bold 7px sans-serif"; ctx.textAlign = "center";
      ctx.fillText("DEAD", 0, 4);

    } else if (obs.type === "fire_ants") {
      // Fire ant mound
      ctx.fillStyle = "#c2410c";
      ctx.beginPath(); ctx.arc(0, 4, 16, Math.PI, 0); ctx.fill();
      ctx.fillStyle = "#ea580c";
      ctx.beginPath(); ctx.arc(0, 4, 10, Math.PI, 0); ctx.fill();
      // Ants crawling
      ctx.fillStyle = "#7c2d12";
      for (let i = 0; i < 6; i++) {
        const ax = Math.cos(frame * 0.1 + i * 1.05) * 20;
        const ay = Math.sin(frame * 0.1 + i * 1.05) * 8 + 4;
        ctx.beginPath(); ctx.arc(ax, ay, 2, 0, Math.PI * 2); ctx.fill();
      }
      ctx.fillStyle = "#fff"; ctx.font = "bold 7px sans-serif"; ctx.textAlign = "center";
      ctx.fillText("ANTS!", 0, -6);
    }

    ctx.restore();
  }

  // ── Collectible drawing ────────────────────────────────────────────────
  function drawCollectible(ctx: CanvasRenderingContext2D, col: Collectible, frame: number) {
    if (col.collected) return;
    const y = LANE_CENTERS[col.lane] + Math.sin(col.bobOffset + frame * 0.08) * 4;
    ctx.save();
    ctx.translate(col.x, y);

    // Glow effect
    const glowColor = col.type === "star" ? "#fbbf24" :
                      col.type === "cactus" ? "#ef4444" :
                      col.type.startsWith("nal") ? BRAND_GOLD : "#4ade80";
    ctx.shadowColor = glowColor;
    ctx.shadowBlur = 10;

    if (col.type === "nal_sign") {
      // NAL yard sign collectible
      ctx.strokeStyle = "#5c3d1e"; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.moveTo(0, 6); ctx.lineTo(0, 18); ctx.stroke();
      ctx.fillStyle = BRAND_GREEN;
      ctx.beginPath(); ctx.roundRect(-14, -6, 28, 14, 3); ctx.fill();
      ctx.fillStyle = BRAND_GOLD; ctx.font = "bold 7px sans-serif"; ctx.textAlign = "center";
      ctx.fillText("NAL", 0, 2);
      ctx.fillStyle = "#fff"; ctx.font = "4px sans-serif";
      ctx.fillText("LANDSCAPING", 0, 8);

    } else if (col.type === "nal_flag") {
      // NAL branded flag
      ctx.strokeStyle = "#5c3d1e"; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.moveTo(-4, -16); ctx.lineTo(-4, 16); ctx.stroke();
      ctx.fillStyle = BRAND_GREEN;
      ctx.beginPath();
      ctx.moveTo(-4, -16); ctx.lineTo(18, -10); ctx.lineTo(-4, -4);
      ctx.closePath(); ctx.fill();
      ctx.fillStyle = BRAND_GOLD; ctx.font = "bold 5px sans-serif"; ctx.textAlign = "center";
      ctx.fillText("NAL", 6, -8);

    } else if (col.type === "nal_truck") {
      // Mini NAL truck collectible
      ctx.fillStyle = BRAND_GREEN;
      ctx.beginPath(); ctx.roundRect(-16, -8, 32, 16, 3); ctx.fill();
      ctx.fillStyle = "#2a7a3a";
      ctx.beginPath(); ctx.roundRect(-4, -14, 14, 10, 2); ctx.fill();
      ctx.fillStyle = "rgba(147,197,253,0.7)";
      ctx.beginPath(); ctx.roundRect(-2, -12, 10, 7, 1); ctx.fill();
      ctx.fillStyle = "#1e293b";
      ctx.beginPath(); ctx.arc(-10, 8, 4, 0, Math.PI * 2); ctx.fill();
      ctx.beginPath(); ctx.arc(10, 8, 4, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = BRAND_GOLD; ctx.font = "bold 5px sans-serif"; ctx.textAlign = "center";
      ctx.fillText("NAL", 0, 0);

    } else if (col.type === "nal_hose") {
      // NAL garden hose (green coil)
      ctx.strokeStyle = BRAND_GREEN; ctx.lineWidth = 4; ctx.lineCap = "round";
      ctx.beginPath();
      for (let i = 0; i < 3; i++) {
        ctx.arc(0, 0, 8 + i * 3, 0, Math.PI * 1.8);
      }
      ctx.stroke();
      ctx.fillStyle = "#fbbf24";
      ctx.beginPath(); ctx.arc(10, -2, 3, 0, Math.PI * 2); ctx.fill();

    } else if (col.type === "leaf_bag") {
      // NAL leaf bag
      ctx.fillStyle = "#f59e0b";
      ctx.beginPath(); ctx.roundRect(-9, -12, 18, 22, 4); ctx.fill();
      ctx.fillStyle = "#d97706";
      ctx.beginPath(); ctx.roundRect(-9, -12, 18, 8, 4); ctx.fill();
      // Tie
      ctx.strokeStyle = "#1a1a2e"; ctx.lineWidth = 1.5;
      ctx.beginPath(); ctx.moveTo(-5, -4); ctx.lineTo(5, -4); ctx.stroke();
      ctx.fillStyle = BRAND_GREEN; ctx.font = "bold 5px sans-serif"; ctx.textAlign = "center";
      ctx.fillText("NAL", 0, 4);
      // Leaf on bag
      ctx.fillStyle = "#4ade80";
      ctx.beginPath(); ctx.ellipse(0, 10, 5, 7, 0.3, 0, Math.PI * 2); ctx.fill();

    } else if (col.type === "star") {
      ctx.fillStyle = "#fbbf24";
      ctx.font = "22px sans-serif"; ctx.textAlign = "center";
      ctx.fillText("⭐", 0, 8);

    } else if (col.type === "coffee") {
      // Coffee cup
      ctx.fillStyle = "#92400e";
      ctx.beginPath(); ctx.roundRect(-8, -8, 16, 18, 3); ctx.fill();
      ctx.fillStyle = "#6b2d0e";
      ctx.beginPath(); ctx.arc(0, -2, 6, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = "#d4a574";
      ctx.beginPath(); ctx.arc(0, -2, 4, 0, Math.PI * 2); ctx.fill();
      // Steam
      if (frame % 20 < 10) {
        ctx.strokeStyle = "rgba(255,255,255,0.5)"; ctx.lineWidth = 1.5;
        ctx.beginPath(); ctx.moveTo(-2, -10); ctx.quadraticCurveTo(2, -16, -2, -20); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(2, -10); ctx.quadraticCurveTo(-2, -16, 2, -20); ctx.stroke();
      }

    } else if (col.type === "permit") {
      // Building permit
      ctx.fillStyle = "#fff";
      ctx.beginPath(); ctx.roundRect(-10, -12, 20, 24, 2); ctx.fill();
      ctx.strokeStyle = "#22c55e"; ctx.lineWidth = 2;
      ctx.strokeRect(-10, -12, 20, 24);
      ctx.fillStyle = "#22c55e"; ctx.font = "bold 7px sans-serif"; ctx.textAlign = "center";
      ctx.fillText("PERMIT", 0, -4);
      ctx.fillText("✓", 0, 6);

    } else if (col.type === "hard_hat") {
      // Hard hat
      ctx.fillStyle = "#f59e0b";
      ctx.beginPath(); ctx.arc(0, -4, 13, Math.PI, 0); ctx.fill();
      ctx.fillStyle = "#d97706";
      ctx.beginPath(); ctx.roundRect(-15, -4, 30, 5, 2); ctx.fill();
      ctx.fillStyle = BRAND_GREEN; ctx.font = "bold 5px sans-serif"; ctx.textAlign = "center";
      ctx.fillText("NAL", 0, -6);

    } else if (col.type === "water_bottle") {
      // Water bottle
      ctx.fillStyle = "#93c5fd";
      ctx.beginPath(); ctx.roundRect(-6, -12, 12, 22, 4); ctx.fill();
      ctx.fillStyle = "#bfdbfe";
      ctx.beginPath(); ctx.roundRect(-4, -10, 8, 10, 2); ctx.fill();
      ctx.fillStyle = "#1e40af";
      ctx.beginPath(); ctx.roundRect(-5, -14, 10, 5, 2); ctx.fill();
      ctx.fillStyle = "#fff"; ctx.font = "bold 4px sans-serif"; ctx.textAlign = "center";
      ctx.fillText("H2O", 0, -1);

    } else if (col.type === "cactus") {
      // Cactus — bad! Avoid
      ctx.fillStyle = "#4d7c0f";
      ctx.beginPath(); ctx.roundRect(-5, -16, 10, 24, 3); ctx.fill();
      ctx.beginPath(); ctx.roundRect(-14, -8, 10, 6, 3); ctx.fill();
      ctx.beginPath(); ctx.roundRect(4, -10, 10, 6, 3); ctx.fill();
      ctx.strokeStyle = "#1a1a2e"; ctx.lineWidth = 1;
      for (let i = -3; i <= 3; i++) {
        ctx.beginPath(); ctx.moveTo(i * 1.5, -16 + Math.abs(i) * 2); ctx.lineTo(i * 3, -20 + Math.abs(i) * 2); ctx.stroke();
      }
      // Warning X
      ctx.strokeStyle = BRAND_RED; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.moveTo(-4, -4); ctx.lineTo(4, 4); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(4, -4); ctx.lineTo(-4, 4); ctx.stroke();
    }

    ctx.shadowBlur = 0;
    ctx.restore();
  }

  // ── HUD ────────────────────────────────────────────────────────────────
  function drawHUD(ctx: CanvasRenderingContext2D, level: number, dist: number, lvDist: number, frame: number) {
    const currentScore = Math.floor(dist / 10);
    const pct = Math.min(dist / (lvDist * 10), 1);

    // Top bar background with gradient effect
    ctx.fillStyle = "rgba(0,0,0,0.6)";
    ctx.beginPath(); ctx.roundRect(0, 0, W, 46, 0); ctx.fill();
    // Brand green accent line
    ctx.fillStyle = BRAND_GREEN;
    ctx.fillRect(0, 44, W, 2);

    // Level badge
    ctx.fillStyle = BRAND_GREEN;
    ctx.beginPath(); ctx.roundRect(8, 5, 88, 34, 6); ctx.fill();
    ctx.strokeStyle = BRAND_GOLD; ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.roundRect(8, 5, 88, 34, 6); ctx.stroke();
    ctx.fillStyle = BRAND_GOLD; ctx.font = "bold 8px sans-serif"; ctx.textAlign = "center";
    ctx.fillText(`LEVEL ${level}`, 52, 17);
    ctx.fillStyle = "#fff"; ctx.font = "bold 8px sans-serif";
    // Short level name
    const shortNames = ["NEIGHBORHOOD", "HOA GAUNTLET", "CONSTRUCTION", "DROUGHT ZONE"];
    ctx.fillText(shortNames[level - 1], 52, 32);

    // Score (center)
    ctx.fillStyle = "#fff"; ctx.font = "bold 15px sans-serif"; ctx.textAlign = "center";
    ctx.fillText(`${currentScore} ft`, W / 2, 30);

    // Lives (hearts)
    for (let i = 0; i < 3; i++) {
      ctx.fillStyle = i < lives.current ? "#ef4444" : "rgba(255,255,255,0.2)";
      ctx.font = "18px sans-serif";
      ctx.fillText("❤", W - 80 + i * 22, 30);
    }

    // High score
    ctx.fillStyle = BRAND_GOLD; ctx.font = "bold 9px sans-serif"; ctx.textAlign = "right";
    ctx.fillText(`🏆 ${highScoreRef.current} ft`, W - 8, 14);

    // Progress bar
    ctx.fillStyle = "rgba(255,255,255,0.12)";
    ctx.beginPath(); ctx.roundRect(8, H - 18, W - 16, 11, 5); ctx.fill();
    const barColors = ["#4ade80", "#fbbf24", "#f97316", "#ef4444"];
    ctx.fillStyle = barColors[level - 1];
    ctx.beginPath(); ctx.roundRect(8, H - 18, (W - 16) * pct, 11, 5); ctx.fill();
    // Progress bar glow at tip
    if (pct > 0.02) {
      ctx.fillStyle = "#fff";
      ctx.beginPath(); ctx.arc(8 + (W - 16) * pct, H - 12, 4, 0, Math.PI * 2); ctx.fill();
    }
    ctx.fillStyle = "#fff"; ctx.font = "bold 7px sans-serif"; ctx.textAlign = "left";
    ctx.fillText(`${Math.floor(pct * 100)}% complete`, 12, H - 8);

    // Combo badge
    if (combo.current >= 2) {
      ctx.fillStyle = "rgba(251,191,36,0.95)";
      ctx.beginPath(); ctx.roundRect(8, 52, 100, 22, 5); ctx.fill();
      ctx.strokeStyle = "#d97706"; ctx.lineWidth = 1;
      ctx.beginPath(); ctx.roundRect(8, 52, 100, 22, 5); ctx.stroke();
      ctx.fillStyle = "#1a1a2e"; ctx.font = "bold 12px sans-serif"; ctx.textAlign = "left";
      ctx.fillText(`${combo.current}x COMBO! 🔥`, 14, 67);
    }

    // Status badge
    if (slowTimer.current > 0) {
      ctx.fillStyle = "rgba(124,58,237,0.92)";
      ctx.beginPath(); ctx.roundRect(W / 2 - 65, H - 40, 130, 22, 6); ctx.fill();
      ctx.fillStyle = "#fff"; ctx.font = "bold 11px sans-serif"; ctx.textAlign = "center";
      ctx.fillText("SLOWED! 🌵", W / 2, H - 24);
    } else if (fastTimer.current > 0) {
      ctx.fillStyle = "rgba(217,119,6,0.92)";
      ctx.beginPath(); ctx.roundRect(W / 2 - 70, H - 40, 140, 22, 6); ctx.fill();
      ctx.fillStyle = "#fff"; ctx.font = "bold 11px sans-serif"; ctx.textAlign = "center";
      ctx.fillText("SPEED BOOST! ☕", W / 2, H - 24);
    }
  }

  // ── Level intro screen ─────────────────────────────────────────────────
  function drawLevelIntro(ctx: CanvasRenderingContext2D, level: number, timer: number) {
    const lv = LEVELS[level - 1];
    const alpha = Math.min(1, timer / 30) * Math.min(1, (timer - 20) / 20 + 1);
    ctx.fillStyle = `rgba(0,0,0,${0.78 * alpha})`;
    ctx.fillRect(0, 0, W, H);

    ctx.save();
    ctx.globalAlpha = alpha;

    // NAL brand header
    ctx.fillStyle = BRAND_GREEN;
    ctx.beginPath(); ctx.roundRect(W / 2 - 120, H / 2 - 80, 240, 30, 6); ctx.fill();
    ctx.fillStyle = BRAND_GOLD; ctx.font = "bold 10px sans-serif"; ctx.textAlign = "center";
    ctx.fillText("NEWPORT AVENUE LANDSCAPING", W / 2, H / 2 - 60);

    // Level number
    ctx.fillStyle = BRAND_GOLD;
    ctx.font = "bold 16px sans-serif"; ctx.textAlign = "center";
    ctx.fillText(`LEVEL ${level} OF 4`, W / 2, H / 2 - 22);
    // Level name
    ctx.fillStyle = "#fff";
    ctx.font = "bold 30px sans-serif";
    ctx.fillText(lv.name, W / 2, H / 2 + 16);
    // Subtitle
    ctx.fillStyle = BRAND_LIGHT;
    ctx.font = "13px sans-serif";
    ctx.fillText(lv.subtitle, W / 2, H / 2 + 40);
    // Tagline (funny)
    ctx.fillStyle = BRAND_GOLD;
    ctx.font = "italic 11px sans-serif";
    ctx.fillText(`"${lv.tagline}"`, W / 2, H / 2 + 60);
    // Ready text
    if (timer < 60) {
      ctx.fillStyle = "#4ade80";
      ctx.font = "bold 20px sans-serif";
      ctx.fillText("LET'S MOW! 🌿", W / 2, H / 2 + 88);
    } else {
      ctx.fillStyle = "rgba(255,255,255,0.7)";
      ctx.font = "14px sans-serif";
      ctx.fillText("GET READY...", W / 2, H / 2 + 88);
    }
    ctx.restore();
  }

  // ── Level complete screen ──────────────────────────────────────────────
  function drawLevelComplete(ctx: CanvasRenderingContext2D, level: number) {
    ctx.fillStyle = "rgba(0,0,0,0.72)";
    ctx.fillRect(0, 0, W, H);

    // Green checkmark burst
    ctx.fillStyle = "#4ade80";
    ctx.font = "bold 38px sans-serif"; ctx.textAlign = "center";
    ctx.fillText("✅ LEVEL CLEAR!", W / 2, H / 2 - 42);
    ctx.fillStyle = BRAND_GOLD;
    ctx.font = "bold 16px sans-serif";
    ctx.fillText(LEVELS[level - 1].name, W / 2, H / 2 - 6);
    ctx.fillStyle = "#fff";
    ctx.font = "13px sans-serif";
    if (level < 4) {
      ctx.fillText(`Next up: Level ${level + 1} — ${LEVELS[level].name}`, W / 2, H / 2 + 22);
      ctx.fillStyle = "rgba(255,255,255,0.6)";
      ctx.font = "italic 11px sans-serif";
      ctx.fillText(`"${LEVELS[level].tagline}"`, W / 2, H / 2 + 42);
    } else {
      ctx.fillText("You beat the game! 🎉 Claim your $100 code!", W / 2, H / 2 + 22);
    }

    // Next level / claim button
    ctx.fillStyle = BRAND_GREEN;
    ctx.beginPath(); ctx.roundRect(W / 2 - 95, H / 2 + 58, 190, 46, 10); ctx.fill();
    ctx.strokeStyle = BRAND_GOLD; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.roundRect(W / 2 - 95, H / 2 + 58, 190, 46, 10); ctx.stroke();
    ctx.fillStyle = "#fff"; ctx.font = "bold 17px sans-serif";
    ctx.fillText(level < 4 ? "▶  NEXT LEVEL" : "🎉  CLAIM $100 CODE", W / 2, H / 2 + 87);
  }

  // ── Idle screen ────────────────────────────────────────────────────────
  function drawIdleScreen(ctx: CanvasRenderingContext2D) {
    // Animated grass background
    for (let i = 0; i < LANE_COUNT; i++) {
      ctx.fillStyle = i % 2 === 0 ? "#3a8c3a" : "#358035";
      ctx.fillRect(0, i * LANE_H, W, LANE_H);
    }
    ctx.fillStyle = "rgba(0,0,0,0.68)";
    ctx.fillRect(0, 0, W, H);

    // Brand header bar
    ctx.fillStyle = BRAND_GREEN;
    ctx.fillRect(0, 0, W, 52);
    ctx.strokeStyle = BRAND_GOLD; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(0, 52); ctx.lineTo(W, 52); ctx.stroke();
    ctx.fillStyle = BRAND_GOLD; ctx.font = "bold 11px sans-serif"; ctx.textAlign = "center";
    ctx.fillText("NEWPORT AVENUE LANDSCAPING", W / 2, 16);
    ctx.fillStyle = "#fff"; ctx.font = "bold 24px sans-serif";
    ctx.fillText("🌿  LAWN MOWER DASH", W / 2, 42);

    // Tagline
    ctx.fillStyle = BRAND_LIGHT; ctx.font = "bold 12px sans-serif"; ctx.textAlign = "center";
    ctx.fillText("4 LEVELS OF CENTRAL OREGON CHAOS", W / 2, 72);

    // Level preview cards
    const levelColors = ["#4ade80", "#fbbf24", "#f97316", "#ef4444"];
    const levelIcons = ["🌊", "📋", "🚧", "☀️"];
    const levelShort = ["HOOD", "HOA", "SITE", "DROUGHT"];
    for (let i = 0; i < 4; i++) {
      const x = W / 2 - 130 + i * 68;
      ctx.fillStyle = levelColors[i] + "33";
      ctx.beginPath(); ctx.roundRect(x - 22, 82, 44, 44, 6); ctx.fill();
      ctx.strokeStyle = levelColors[i]; ctx.lineWidth = 1.5;
      ctx.beginPath(); ctx.roundRect(x - 22, 82, 44, 44, 6); ctx.stroke();
      ctx.font = "20px sans-serif"; ctx.textAlign = "center";
      ctx.fillText(levelIcons[i], x, 110);
      ctx.fillStyle = "#fff"; ctx.font = "bold 7px sans-serif";
      ctx.fillText(`LVL ${i + 1}`, x, 122);
      ctx.fillStyle = levelColors[i]; ctx.font = "6px sans-serif";
      ctx.fillText(levelShort[i], x, 132);
    }

    // Prize teaser
    ctx.fillStyle = BRAND_GOLD; ctx.font = "bold 13px sans-serif"; ctx.textAlign = "center";
    ctx.fillText("🏆  Beat all 4 levels → unlock a $100 discount code!", W / 2, 152);
    ctx.fillStyle = "rgba(255,255,255,0.45)"; ctx.font = "10px sans-serif";
    ctx.fillText("One-time use per person. Valid on any service.", W / 2, 166);

    // Controls
    ctx.fillStyle = "rgba(255,255,255,0.6)"; ctx.font = "11px sans-serif";
    ctx.fillText("Tap top/bottom · Swipe up/down · ↑↓ arrow keys", W / 2, 184);

    // Play button
    ctx.fillStyle = BRAND_GREEN;
    ctx.beginPath(); ctx.roundRect(W / 2 - 95, 196, 190, 50, 12); ctx.fill();
    ctx.strokeStyle = BRAND_GOLD; ctx.lineWidth = 2.5;
    ctx.beginPath(); ctx.roundRect(W / 2 - 95, 196, 190, 50, 12); ctx.stroke();
    ctx.fillStyle = "#fff"; ctx.font = "bold 20px sans-serif"; ctx.textAlign = "center";
    ctx.fillText("▶  TAP TO PLAY", W / 2, 227);

    // High score
    if (highScoreRef.current > 0) {
      ctx.fillStyle = BRAND_GOLD; ctx.font = "bold 12px sans-serif";
      ctx.fillText(`🏆 Best: ${highScoreRef.current} ft`, W / 2, 264);
    }
  }

  // ── Dead screen ────────────────────────────────────────────────────────
  function drawDeadScreen(ctx: CanvasRenderingContext2D, s: number, hs: number, level: number) {
    for (let i = 0; i < LANE_COUNT; i++) {
      ctx.fillStyle = i % 2 === 0 ? "#3a8c3a" : "#358035";
      ctx.fillRect(0, i * LANE_H, W, LANE_H);
    }
    ctx.fillStyle = "rgba(0,0,0,0.72)";
    ctx.fillRect(0, 0, W, H);

    ctx.fillStyle = BRAND_GREEN; ctx.fillRect(0, 0, W, 52);
    ctx.strokeStyle = BRAND_GOLD; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(0, 52); ctx.lineTo(W, 52); ctx.stroke();
    ctx.fillStyle = BRAND_GOLD; ctx.font = "bold 11px sans-serif"; ctx.textAlign = "center";
    ctx.fillText("NEWPORT AVENUE LANDSCAPING", W / 2, 16);
    ctx.fillStyle = "#fff"; ctx.font = "bold 22px sans-serif";
    ctx.fillText("🌿  LAWN MOWER DASH", W / 2, 42);

    const deathMessages = [
      "SOAKED! 💦", "CITED BY THE HOA! 📋", "BURIED IN MUD! 🚧", "DEHYDRATED! ☀️"
    ];
    const deathSubtitles = [
      "The sprinkler got you. Classic.",
      "The HOA wins this round. For now.",
      "Construction chaos: 1, NAL: 0.",
      "The drought inspector got your plates.",
    ];
    ctx.fillStyle = "#ef4444"; ctx.font = "bold 26px sans-serif"; ctx.textAlign = "center";
    ctx.fillText(deathMessages[level - 1] || "GAME OVER!", W / 2, 88);
    ctx.fillStyle = "rgba(255,255,255,0.6)"; ctx.font = "italic 11px sans-serif";
    ctx.fillText(deathSubtitles[level - 1] || "", W / 2, 108);

    ctx.fillStyle = "#fff"; ctx.font = "bold 18px sans-serif";
    ctx.fillText(`Distance: ${s} ft`, W / 2, 132);
    ctx.fillStyle = BRAND_GOLD; ctx.font = "bold 14px sans-serif";
    ctx.fillText(`🏆 Best: ${hs} ft`, W / 2, 154);
    ctx.fillStyle = BRAND_LIGHT; ctx.font = "12px sans-serif";
    ctx.fillText(`Reached Level ${level} — ${LEVELS[level - 1].name}`, W / 2, 174);

    // Try again button
    ctx.fillStyle = BRAND_GREEN;
    ctx.beginPath(); ctx.roundRect(W / 2 - 95, 192, 190, 46, 10); ctx.fill();
    ctx.strokeStyle = BRAND_GOLD; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.roundRect(W / 2 - 95, 192, 190, 46, 10); ctx.stroke();
    ctx.fillStyle = "#fff"; ctx.font = "bold 17px sans-serif"; ctx.textAlign = "center";
    ctx.fillText("🔄  TRY AGAIN", W / 2, 221);

    // Encouragement
    ctx.fillStyle = BRAND_GOLD; ctx.font = "italic 11px sans-serif";
    ctx.fillText("Sterling believes in you. Probably.", W / 2, 256);
  }

  // ── Won screen ─────────────────────────────────────────────────────────
  function drawWonScreen(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = "rgba(0,0,0,0.82)"; ctx.fillRect(0, 0, W, H);
    ctx.fillStyle = BRAND_GREEN; ctx.fillRect(0, 0, W, 52);
    ctx.strokeStyle = BRAND_GOLD; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(0, 52); ctx.lineTo(W, 52); ctx.stroke();
    ctx.fillStyle = BRAND_GOLD; ctx.font = "bold 11px sans-serif"; ctx.textAlign = "center";
    ctx.fillText("NEWPORT AVENUE LANDSCAPING", W / 2, 16);
    ctx.fillStyle = "#fff"; ctx.font = "bold 22px sans-serif";
    ctx.fillText("🌿  LAWN MOWER DASH", W / 2, 42);

    ctx.fillStyle = "#4ade80"; ctx.font = "bold 30px sans-serif"; ctx.textAlign = "center";
    ctx.fillText("🎉 YOU BEAT THE GAME! 🎉", W / 2, 88);
    ctx.fillStyle = "#fff"; ctx.font = "14px sans-serif";
    ctx.fillText("All 4 levels conquered. Sterling is proud.", W / 2, 112);
    ctx.fillStyle = BRAND_GOLD; ctx.font = "bold 14px sans-serif";
    ctx.fillText("Here's your $100 off code:", W / 2, 138);

    // Code box
    ctx.fillStyle = BRAND_DARK;
    ctx.beginPath(); ctx.roundRect(W / 2 - 100, 148, 200, 38, 8); ctx.fill();
    ctx.strokeStyle = BRAND_GOLD; ctx.lineWidth = 2.5;
    ctx.beginPath(); ctx.roundRect(W / 2 - 100, 148, 200, 38, 8); ctx.stroke();
    ctx.fillStyle = BRAND_GOLD; ctx.font = "bold 26px monospace"; ctx.textAlign = "center";
    ctx.fillText(DISCOUNT_CODE, W / 2, 175);

    ctx.fillStyle = "rgba(255,255,255,0.55)"; ctx.font = "10px sans-serif";
    ctx.fillText("One-time use per person. Valid on any service.", W / 2, 202);
    ctx.fillStyle = "rgba(255,255,255,0.4)"; ctx.font = "italic 10px sans-serif";
    ctx.fillText("(Yes, it's really $100. We're serious.)", W / 2, 216);

    // Play again button
    ctx.fillStyle = BRAND_GREEN;
    ctx.beginPath(); ctx.roundRect(W / 2 - 95, 228, 190, 46, 10); ctx.fill();
    ctx.strokeStyle = BRAND_GOLD; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.roundRect(W / 2 - 95, 228, 190, 46, 10); ctx.stroke();
    ctx.fillStyle = "#fff"; ctx.font = "bold 16px sans-serif";
    ctx.fillText("🔄  PLAY AGAIN", W / 2, 257);
  }

  // ── Main game loop ─────────────────────────────────────────────────────
  const gameLoop = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const frame = frameCount.current++;
    const level = levelRef.current;
    const lv = LEVELS[level - 1];

    // Level intro
    if (levelIntroTimer.current > 0) {
      drawBackground(ctx, level, frame);
      drawLevelIntro(ctx, level, levelIntroTimer.current);
      levelIntroTimer.current--;
      rafId.current = requestAnimationFrame(gameLoop);
      return;
    }

    if (stateRef.current !== "playing") return;

    // Speed ramp
    baseSpeed.current = Math.min(3.2 + distance.current / 8000, 9);

    // Timers
    if (slowTimer.current > 0) { slowTimer.current--; if (slowTimer.current === 0) playerSpeedMult.current = 1.0; }
    if (fastTimer.current > 0) { fastTimer.current--; if (fastTimer.current === 0) playerSpeedMult.current = 1.0; }
    if (invincible.current > 0) invincible.current--;
    if (screenShake.current > 0) screenShake.current--;

    const scrollSpeed = baseSpeed.current * playerSpeedMult.current;
    distance.current += scrollSpeed;
    scrollX.current += scrollSpeed;

    // Player movement
    playerY.current = lerp(playerY.current, LANE_CENTERS[targetLane.current], 0.18);
    playerLane.current = targetLane.current;

    // Spawn obstacles
    if (distance.current > nextObstacleDist.current) {
      spawnObstacle(level);
      nextObstacleDist.current = distance.current + rand(180, 350);
    }
    // Spawn collectibles
    if (distance.current > nextCollectibleDist.current) {
      spawnCollectible(level);
      nextCollectibleDist.current = distance.current + rand(300, 600);
    }

    // Mow stripes (level 1 only)
    if (level === 1 && PLAYER_X - lastStripeX.current > 28) {
      mowStripes.current.push({ x: PLAYER_X, lane: playerLane.current, dark: stripeToggle.current });
      stripeToggle.current = !stripeToggle.current;
      lastStripeX.current = PLAYER_X;
    }
    for (const s of mowStripes.current) s.x -= scrollSpeed;
    mowStripes.current = mowStripes.current.filter(s => s.x > -30);

    // Update obstacles
    for (const obs of obstacles.current) {
      obs.x -= scrollSpeed;
      if (obs.type === "sprinkler") obs.angle! += obs.arcSpeed!;
      if (obs.type === "skid_steer") obs.x -= (obs.speed || 0);
      if (obs.type === "water_inspector" && obs.x < W * 0.65) {
        obs.y = lerp(obs.y || LANE_CENTERS[obs.lane], playerY.current, 0.04);
        obs.x -= (obs.speed || 0) * 0.5;
      }
      if (obs.phase !== undefined) obs.phase += 0.05;
      // Combo: passed an obstacle
      if (obs.x < PLAYER_X - 25 && lastObstaclePassed.current !== obs.id) {
        lastObstaclePassed.current = obs.id;
        combo.current++;
        if (combo.current >= 2) {
          spawnPopText(PLAYER_X + 30, playerY.current - 35, `${combo.current}x COMBO!`, "#fbbf24", 14);
        }
      }
    }
    obstacles.current = obstacles.current.filter(o => o.x > -80);

    // Update collectibles
    for (const col of collectibles.current) {
      col.x -= scrollSpeed;
      if (col.collected) continue;
      const cy = LANE_CENTERS[col.lane];
      const dx = PLAYER_X - col.x, dy = playerY.current - cy;
      if (Math.sqrt(dx * dx + dy * dy) < PLAYER_R + 16) {
        col.collected = true;
        if (col.type === "cactus") {
          playerSpeedMult.current = 0.45; slowTimer.current = 140; fastTimer.current = 0;
          spawnParticles(col.x, cy, "#ef4444", 12);
          spawnPopText(col.x, cy - 25, "OUCH! CACTUS! 🌵", "#ef4444", 14);
          combo.current = 0;
        } else if (col.type === "coffee" || col.type === "hard_hat") {
          playerSpeedMult.current = 1.6; fastTimer.current = 140; slowTimer.current = 0;
          spawnParticles(col.x, cy, "#f59e0b", 12);
          spawnPopText(col.x, cy - 25, col.type === "coffee" ? "CAFFEINATED! ☕" : "HARD HAT! 🪖", "#f59e0b", 13);
        } else if (col.type === "star") {
          spawnParticles(col.x, cy, "#fbbf24", 18);
          spawnPopText(col.x, cy - 25, "+STAR! ⭐", "#fbbf24", 15);
          combo.current += 2;
        } else if (col.type === "permit") {
          invincible.current = 130;
          spawnParticles(col.x, cy, "#22c55e", 16);
          spawnPopText(col.x, cy - 25, "PERMIT! INVINCIBLE! 📋", "#22c55e", 13);
        } else if (col.type === "water_bottle" || col.type === "nal_hose") {
          playerSpeedMult.current = 1.4; fastTimer.current = 110; slowTimer.current = 0;
          spawnParticles(col.x, cy, "#93c5fd", 12);
          spawnPopText(col.x, cy - 25, col.type === "water_bottle" ? "HYDRATED! 💧" : "NAL HOSE! 💦", "#93c5fd", 13);
        } else if (col.type === "nal_sign" || col.type === "nal_flag" || col.type === "leaf_bag") {
          spawnParticles(col.x, cy, BRAND_GOLD, 14);
          spawnPopText(col.x, cy - 25, "NAL POWER! 🌿", BRAND_GOLD, 14);
          combo.current++;
        } else if (col.type === "nal_truck") {
          playerSpeedMult.current = 1.8; fastTimer.current = 160; slowTimer.current = 0;
          spawnParticles(col.x, cy, BRAND_GREEN, 18);
          spawnPopText(col.x, cy - 25, "NAL TRUCK! TURBO! 🚛", BRAND_GREEN, 14);
        }
      }
    }
    collectibles.current = collectibles.current.filter(c => c.x > -40 && !c.collected);

    // Collision detection
    if (invincible.current === 0) {
      for (const obs of obstacles.current) {
        const oy = obs.y !== undefined ? obs.y : LANE_CENTERS[obs.lane];
        const dx = PLAYER_X - obs.x, dy = playerY.current - oy;
        const dist = Math.sqrt(dx * dx + dy * dy);
        let hit = false;

        if (obs.type === "sprinkler") {
          if (dist < obs.arcLen! + PLAYER_R && dist > 10) {
            let diff = Math.atan2(dy, dx) - obs.angle!;
            while (diff > Math.PI) diff -= Math.PI * 2;
            while (diff < -Math.PI) diff += Math.PI * 2;
            if (Math.abs(diff) < obs.arcWidth! / 2) hit = true;
          }
        } else if (obs.type === "gnome" || obs.type === "hoa_member" || obs.type === "hoa_group" || obs.type === "boulder") {
          if (dist < PLAYER_R + 20) hit = true;
        } else if (obs.type === "hoa_sign") {
          if (Math.abs(dx) < 28 && Math.abs(dy) < 20) hit = true;
        } else if (obs.type === "mud_puddle" || obs.type === "dead_patch") {
          if (Math.abs(dx) < 32 && Math.abs(dy) < 17) {
            playerSpeedMult.current = 0.35; slowTimer.current = 110;
            spawnParticles(PLAYER_X, playerY.current, "#92400e", 10);
            spawnPopText(PLAYER_X, playerY.current - 30, obs.type === "mud_puddle" ? "STUCK IN MUD! 🟤" : "DEAD GRASS! 🟫", "#92400e", 13);
            obs.x = -200; // remove
          }
        } else if (obs.type === "fire_ants") {
          if (Math.abs(dx) < 20 && Math.abs(dy) < 18) {
            playerSpeedMult.current = 0.4; slowTimer.current = 120;
            spawnParticles(PLAYER_X, playerY.current, "#c2410c", 12);
            spawnPopText(PLAYER_X, playerY.current - 30, "FIRE ANTS! 🐜", "#c2410c", 14);
            obs.x = -200;
          }
        } else if (obs.type === "skid_steer" || obs.type === "water_inspector" || obs.type === "tumbleweed") {
          if (dist < PLAYER_R + 22) hit = true;
        } else if (obs.type === "cone_row") {
          if (Math.abs(dx) < 28 && Math.abs(dy) < 18) hit = true;
        }

        if (hit) {
          lives.current--;
          invincible.current = 100;
          combo.current = 0;
          screenShake.current = 14;
          spawnParticles(PLAYER_X, playerY.current, "#3b82f6", 22);
          const hitMsgs = ["SOAKED! 💦", "CITED! 📋", "CRUSHED! 🪨", "CAUGHT! 🚰"];
          spawnPopText(PLAYER_X, playerY.current - 35, hitMsgs[level - 1] || "HIT!", "#ef4444", 17);
          if (lives.current <= 0) {
            stateRef.current = "dead";
            const finalScore = Math.floor(distance.current / 10);
            scoreRef.current = finalScore;
            setScore(finalScore);
            setHighScore(prev => {
              const newHS = Math.max(prev, finalScore);
              highScoreRef.current = newHS;
              try { localStorage.setItem(HIGH_SCORE_KEY, String(newHS)); } catch {}
              return newHS;
            });
            setDisplayState("dead");
            return;
          }
        }
      }
    }

    // Check level complete
    if (distance.current >= lv.targetDist * 10) {
      if (level >= 4) {
        // Only reveal code after beating Level 4
        stateRef.current = "won";
        setWonCode(DISCOUNT_CODE);
        setDisplayState("won");
        return;
      } else {
        stateRef.current = "level_complete";
        setDisplayState("level_complete");
        setCurrentLevel(level);
        return;
      }
    }

    // Update particles
    particles.current = particles.current.filter(p => p.life > 0);
    for (const p of particles.current) { p.x += p.vx; p.y += p.vy; p.vy += 0.1; p.life -= 0.022; }
    popTexts.current = popTexts.current.filter(t => t.life > 0);
    for (const t of popTexts.current) { t.y -= 0.9; t.life -= 0.016; }

    // ── DRAW ──────────────────────────────────────────────────────────────
    ctx.save();
    if (screenShake.current > 0) {
      ctx.translate(rand(-3, 3) * (screenShake.current / 14), rand(-2, 2) * (screenShake.current / 14));
    }

    drawBackground(ctx, level, frame);

    // Draw collectibles
    for (const col of collectibles.current) drawCollectible(ctx, col, frame);
    // Draw obstacles
    for (const obs of obstacles.current) drawObstacle(ctx, obs, frame);
    // Draw player
    drawPlayer(ctx, frame, invincible.current > 0);

    // Particles
    for (const p of particles.current) {
      ctx.save(); ctx.globalAlpha = p.life;
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = p.color; ctx.fill();
      ctx.restore();
    }
    // Pop texts
    for (const t of popTexts.current) {
      ctx.save(); ctx.globalAlpha = t.life;
      ctx.font = `bold ${t.size}px sans-serif`; ctx.textAlign = "center";
      ctx.fillStyle = "#000"; ctx.fillText(t.text, t.x + 1, t.y + 1);
      ctx.fillStyle = t.color; ctx.fillText(t.text, t.x, t.y);
      ctx.restore();
    }

    drawHUD(ctx, level, distance.current, lv.targetDist, frame);
    ctx.restore();

    setScore(Math.floor(distance.current / 10));
    rafId.current = requestAnimationFrame(gameLoop);
  }, [wonCode]);

  // ── Input ──────────────────────────────────────────────────────────────
  const moveUp = useCallback(() => {
    if (stateRef.current !== "playing") return;
    targetLane.current = clamp(targetLane.current - 1, 0, LANE_COUNT - 1);
  }, []);
  const moveDown = useCallback(() => {
    if (stateRef.current !== "playing") return;
    targetLane.current = clamp(targetLane.current + 1, 0, LANE_COUNT - 1);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowUp" || e.key === "w" || e.key === "W") { e.preventDefault(); moveUp(); }
      if (e.key === "ArrowDown" || e.key === "s" || e.key === "S") { e.preventDefault(); moveDown(); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [moveUp, moveDown]);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    e.preventDefault();
    touchStartY.current = e.touches[0].clientY;
  }, []);

  const handleTouchEnd = useCallback((e: React.TouchEvent) => {
    e.preventDefault();
    if (stateRef.current === "level_complete" || stateRef.current === "won") {
      if (stateRef.current === "level_complete") {
        const nextLevel = levelRef.current + 1;
        resetGame(nextLevel);
        stateRef.current = "playing";
        setDisplayState("playing");
        rafId.current = requestAnimationFrame(gameLoop);
      } else {
        resetGame(1);
        stateRef.current = "playing";
        setDisplayState("playing");
        rafId.current = requestAnimationFrame(gameLoop);
      }
      return;
    }
    if (stateRef.current !== "playing") { startGame(); return; }
    if (touchStartY.current === null) return;
    const dy = e.changedTouches[0].clientY - touchStartY.current;
    if (Math.abs(dy) < 15) {
      const canvas = canvasRef.current;
      if (canvas) {
        const rect = canvas.getBoundingClientRect();
        const tapY = e.changedTouches[0].clientY - rect.top;
        const tapLane = clamp(Math.floor((tapY / rect.height) * LANE_COUNT), 0, LANE_COUNT - 1);
        targetLane.current = tapLane;
      }
    } else if (dy < 0) { moveUp(); } else { moveDown(); }
    touchStartY.current = null;
  }, [moveUp, moveDown]);

  // ── Start / advance ────────────────────────────────────────────────────
  const startGame = useCallback(() => {
    cancelAnimationFrame(rafId.current);
    resetGame(1);
    stateRef.current = "playing";
    setDisplayState("playing");
    rafId.current = requestAnimationFrame(gameLoop);
  }, [resetGame, gameLoop]);

  useEffect(() => () => cancelAnimationFrame(rafId.current), []);

  const handleCanvasClick = useCallback(() => {
    if (stateRef.current === "level_complete") {
      const nextLevel = levelRef.current + 1;
      resetGame(nextLevel);
      stateRef.current = "playing";
      setDisplayState("playing");
      rafId.current = requestAnimationFrame(gameLoop);
    } else if (stateRef.current === "won" || stateRef.current === "dead") {
      startGame();
    } else if (stateRef.current !== "playing") {
      startGame();
    }
  }, [startGame, resetGame, gameLoop]);

  // Draw idle/dead/won screens
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    if (displayState === "idle") drawIdleScreen(ctx);
    else if (displayState === "dead") drawDeadScreen(ctx, score, highScore, currentLevel);
    else if (displayState === "won") drawWonScreen(ctx);
    else if (displayState === "level_complete") drawLevelComplete(ctx, currentLevel);
  }, [displayState, score, highScore, currentLevel]);

  return (
    <>
      <Navbar />
      <div className="min-h-screen" style={{ backgroundColor: "oklch(0.97 0.01 140)", paddingTop: "120px", paddingBottom: "60px" }}>
        <div className="container">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="font-label mb-2 text-xs tracking-widest" style={{ color: BRAND_GREEN }}>
              🎮 MINI GAME
            </div>
            <h1 className="font-display font-light text-4xl mb-3" style={{ color: "oklch(0.22 0.005 0)" }}>
              Lawn Mower Dash
            </h1>
            <p className="font-body text-sm max-w-lg mx-auto" style={{ color: "oklch(0.45 0.005 30)" }}>
              Push your NAL mower through <strong>4 levels of Central Oregon chaos</strong> — dodge sprinklers,
              outrun angry HOA board members, navigate construction sites, and survive the drought inspector.
              Beat all 4 levels to unlock a <strong>$100 discount</strong> on your next service.
            </p>
          </div>

          {/* Level badges */}
          <div className="flex justify-center gap-3 mb-6 flex-wrap">
            {LEVELS.map((lv, i) => {
              const icons = ["🌊", "📋", "🚧", "☀️"];
              const colors = ["#4ade80", "#fbbf24", "#f97316", "#ef4444"];
              return (
                <div key={lv.id} className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold"
                  style={{ backgroundColor: `${colors[i]}22`, border: `1.5px solid ${colors[i]}`, color: "oklch(0.25 0.005 0)" }}>
                  <span>{icons[i]}</span>
                  <span>Level {lv.id}: {lv.name}</span>
                </div>
              );
            })}
          </div>

          {/* Canvas */}
          <div className="flex justify-center">
            <div style={{ width: "100%", maxWidth: W, position: "relative" }}>
              <canvas
                ref={canvasRef}
                width={W}
                height={H}
                onClick={handleCanvasClick}
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
                style={{
                  width: "100%", height: "auto",
                  borderRadius: 16,
                  cursor: displayState !== "playing" ? "pointer" : "default",
                  touchAction: "none",
                  userSelect: "none",
                  boxShadow: "0 12px 40px rgba(0,0,0,0.25)",
                  border: `3px solid ${BRAND_GREEN}`,
                  display: "block",
                }}
              />
            </div>
          </div>

          {/* Discount code reveal — ONLY shown after beating Level 4 */}
          {wonCode && (
            <div className="mt-8 mx-auto max-w-sm text-center p-6 rounded-2xl"
              style={{ backgroundColor: BRAND_GREEN, color: "#fff" }}>
              <div className="text-3xl mb-2">🎉</div>
              <div className="font-display text-xl font-semibold mb-1">You beat all 4 levels!</div>
              <div className="text-xs font-semibold tracking-widest mb-3" style={{ color: BRAND_GOLD }}>
                NEWPORT AVENUE LANDSCAPING
              </div>
              <div className="text-sm mb-3" style={{ color: "rgba(255,255,255,0.8)" }}>
                Your $100 off discount code:
              </div>
              <div className="font-mono text-2xl font-bold tracking-widest mb-4 px-4 py-3 rounded-xl"
                style={{ backgroundColor: "rgba(0,0,0,0.3)", color: BRAND_GOLD, border: `1px solid ${BRAND_GOLD}` }}>
                {wonCode}
              </div>
              <button
                onClick={() => navigator.clipboard.writeText(wonCode).then(() => setCopied(true))}
                className="text-sm px-5 py-2.5 rounded-lg font-semibold mb-3"
                style={{ backgroundColor: BRAND_GOLD, color: "#1a1a2e" }}>
                {copied ? "✓ Copied!" : "Copy Code"}
              </button>
              <div className="text-xs mt-2" style={{ color: "rgba(255,255,255,0.7)" }}>
                Use at checkout on your next service booking. $100 off any service.
              </div>
              <div className="text-xs mt-1" style={{ color: "rgba(255,255,255,0.45)" }}>
                One-time use per person. Cannot be combined with other offers.
              </div>
            </div>
          )}

          {/* Controls */}
          <div className="text-center mt-6 text-xs" style={{ color: "oklch(0.55 0.005 30)" }}>
            <strong>Mobile:</strong> Tap top/bottom of screen or swipe up/down &nbsp;·&nbsp;
            <strong>Desktop:</strong> ↑↓ arrow keys or W/S
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
