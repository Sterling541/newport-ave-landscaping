/* ============================================================
   LAWN MOWER DASH — Multi-Level Retro Runner
   Newport Avenue Landscaping
   Controls: Tap top/bottom · Swipe · arrow keys
   ============================================================ */
import { useEffect, useRef, useState, useCallback } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const W = 640;
const H = 360;
const PLAYER_X = 110;
const PLAYER_R = 22;
const LANE_COUNT = 5;
const LANE_H = H / LANE_COUNT;
const LANE_CENTERS = Array.from({ length: LANE_COUNT }, (_, i) => LANE_H * i + LANE_H / 2);

const DISCOUNT_CODE = "MOWMONEY100";
const DOUBLE_CODE   = "MOWMONEY200";
const HIGH_SCORE_KEY = "nal_mower_hs_v4";

const LEVELS = [
  { id: 1, name: "THE NEIGHBORHOOD",     subtitle: "Dodge the sprinklers & keep the NAL signs upright!", targetDist: 600,  tagline: "Just another Tuesday in the 'hood." },
  { id: 2, name: "THE HOA GAUNTLET",     subtitle: "They HATE us. We mow anyway.",                       targetDist: 800,  tagline: "HOA Rule #312: No fun allowed." },
  { id: 3, name: "THE CONSTRUCTION SITE",subtitle: "Navigate the chaos — NAL builds through it!",        targetDist: 1000, tagline: "Hard hats required. Complaints not." },
  { id: 4, name: "THE DROUGHT ZONE",     subtitle: "Dead lawns? Not on Sterling's watch.",                targetDist: 1200, tagline: "Central Oregon summer. Pray for rain." },
];

const BRAND_GREEN = "#1a5c2a";
const BRAND_RED   = "#c0392b";
const BRAND_GOLD  = "#c8a84b";
const BRAND_LIGHT = "#e8f5e9";
const BRAND_DARK  = "#0f3518";
const NAL_RED     = "#c0392b";

interface Obstacle {
  id: number; x: number; lane: number; type: string;
  y?: number; angle?: number; arcSpeed?: number; arcWidth?: number; arcLen?: number;
  phase?: number; speed?: number;
}
interface Collectible { id: number; x: number; lane: number; type: string; collected: boolean; bobOffset: number; }
interface Particle { x: number; y: number; vx: number; vy: number; life: number; color: string; r: number; }
interface PopText { x: number; y: number; text: string; color: string; life: number; size: number; }
type GameState = "idle"|"playing"|"level_complete"|"dead"|"celebration"|"double_or_nothing"|"boss_fight"|"won"|"boss_lost";

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const clamp = (v: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, v));
const rand = (lo: number, hi: number) => lo + Math.random() * (hi - lo);
const randInt = (lo: number, hi: number) => Math.floor(rand(lo, hi + 1));

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

  const playerLane    = useRef(2);
  const playerY       = useRef(LANE_CENTERS[2]);
  const targetLane    = useRef(2);
  const obstacles     = useRef<Obstacle[]>([]);
  const collectibles  = useRef<Collectible[]>([]);
  const particles     = useRef<Particle[]>([]);
  const popTexts      = useRef<PopText[]>([]);
  const distance      = useRef(0);
  const baseSpeed     = useRef(3.2);
  const playerSpeedMult = useRef(1.0);
  const slowTimer     = useRef(0);
  const fastTimer     = useRef(0);
  const nextObstacleDist   = useRef(180);
  const nextCollectibleDist = useRef(350);
  const idCounter     = useRef(0);
  const rafId         = useRef<number>(0);
  const scrollX       = useRef(0);
  const lives         = useRef(3);
  const invincible    = useRef(0);
  const frameCount    = useRef(0);
  const touchStartY   = useRef<number | null>(null);
  const scoreRef      = useRef(0);
  const highScoreRef  = useRef(highScore);
  const combo         = useRef(0);
  const lastObstaclePassed = useRef(-1);
  const levelRef      = useRef(1);
  const levelIntroTimer = useRef(0);
  const screenShake   = useRef(0);
  const stripeToggle  = useRef(false);
  const lastStripeX   = useRef(0);
  const mowStripes    = useRef<{x:number;lane:number;dark:boolean}[]>([]);
  // Celebration state
  const celebTimer    = useRef(0);
  const CELEB_DURATION = 180; // 3 seconds at 60fps
  // Boss fight state
  const bossResult    = useRef<"pending"|"won"|"lost">("pending");

  const nextId = () => ++idCounter.current;

  const resetGame = useCallback((level = 1) => {
    playerLane.current = 2; playerY.current = LANE_CENTERS[2]; targetLane.current = 2;
    obstacles.current = []; collectibles.current = []; particles.current = []; popTexts.current = [];
    mowStripes.current = []; distance.current = 0; baseSpeed.current = 3.2;
    playerSpeedMult.current = 1.0; slowTimer.current = 0; fastTimer.current = 0;
    nextObstacleDist.current = 180; nextCollectibleDist.current = 350;
    scrollX.current = 0; lives.current = 3; invincible.current = 0;
    frameCount.current = 0; scoreRef.current = 0; combo.current = 0;
    lastObstaclePassed.current = -1; levelRef.current = level;
    levelIntroTimer.current = 120; screenShake.current = 0;
    stripeToggle.current = false; lastStripeX.current = PLAYER_X;
    setScore(0); setWonCode(""); setCopied(false); setCurrentLevel(level);
  }, []);

  //
  function spawnObstacle(level: number) {
    const lane = randInt(0, LANE_COUNT - 1);
    const id = nextId();
    if (level === 1) {
      const t = Math.random() < 0.65 ? "sprinkler" : "gnome";
      obstacles.current.push({ id, x: W + 50, lane, type: t,
        angle: rand(0, Math.PI * 2), arcSpeed: rand(0.022, 0.05) * (Math.random() < 0.5 ? 1 : -1),
        arcWidth: rand(0.5, 1.2), arcLen: rand(50, 85), phase: 0 });
    } else if (level === 2) {
      const types = ["hoa_member","hoa_member","hoa_sign","hoa_group"];
      const t = types[randInt(0, types.length - 1)];
      obstacles.current.push({ id, x: W + 50, lane, type: t, phase: 0, speed: rand(0.9, 1.6) });
      if (t === "hoa_group" && lane > 0)
        obstacles.current.push({ id: nextId(), x: W + 80, lane: lane - 1, type: "hoa_member", phase: Math.PI * 0.5, speed: rand(0.9, 1.6) });
    } else if (level === 3) {
      const types = ["boulder","boulder","mud_puddle","skid_steer","cone_row"];
      const t = types[randInt(0, types.length - 1)];
      obstacles.current.push({ id, x: W + 60, lane, type: t, speed: t === "skid_steer" ? rand(1.8, 3.0) : 0 });
    } else {
      const types = ["tumbleweed","tumbleweed","water_inspector","dead_patch","fire_ants"];
      const t = types[randInt(0, types.length - 1)];
      obstacles.current.push({ id, x: W + 50, lane, type: t, phase: 0, speed: t === "water_inspector" ? rand(1.4, 2.2) : rand(0.6, 1.6) });
    }
  }

  function spawnCollectible(level: number) {
    const lane = randInt(0, LANE_COUNT - 1);
    const types =
      level === 1 ? ["nal_sign","coffee","star","leaf_bag"] :
      level === 2 ? ["permit","star","coffee","nal_flag"] :
      level === 3 ? ["hard_hat","star","coffee","nal_truck"] :
                    ["water_bottle","star","nal_hose","cactus"];
    const type = types[randInt(0, types.length - 1)];
    collectibles.current.push({ id: nextId(), x: W + 20, lane, type, collected: false, bobOffset: rand(0, Math.PI * 2) });
  }

  function spawnParticles(x: number, y: number, color: string, count = 14) {
    for (let i = 0; i < count; i++) {
      const a = rand(0, Math.PI * 2), s = rand(2, 6);
      particles.current.push({ x, y, vx: Math.cos(a)*s, vy: Math.sin(a)*s, life: 1, color, r: rand(3, 9) });
    }
  }
  function spawnPopText(x: number, y: number, text: string, color: string, size = 14) {
    popTexts.current.push({ x, y, text, color, life: 1, size });
  }

  //
  function drawBackground(ctx: CanvasRenderingContext2D, level: number, frame: number) {
    if (level === 1) {
      for (let i = 0; i < LANE_COUNT; i++) {
        ctx.fillStyle = i % 2 === 0 ? "#3a8c3a" : "#358035";
        ctx.fillRect(0, i * LANE_H, W, LANE_H);
      }
      for (const s of mowStripes.current) {
        ctx.fillStyle = s.dark ? "#2e7a2e" : "#4db84d";
        ctx.fillRect(s.x, s.lane * LANE_H, 30, LANE_H);
      }
      drawNeighborhoodBg(ctx, frame);
    } else if (level === 2) {
      for (let i = 0; i < LANE_COUNT; i++) {
        ctx.fillStyle = i % 2 === 0 ? "#4a7c4a" : "#427042";
        ctx.fillRect(0, i * LANE_H, W, LANE_H);
      }
      drawHOABg(ctx, frame);
    } else if (level === 3) {
      for (let i = 0; i < LANE_COUNT; i++) {
        ctx.fillStyle = i % 2 === 0 ? "#8b7355" : "#7a6548";
        ctx.fillRect(0, i * LANE_H, W, LANE_H);
      }
      ctx.fillStyle = "rgba(0,0,0,0.06)";
      for (let x = -(scrollX.current % 20); x < W; x += 20)
        for (let y = 0; y < H; y += 20)
          if (Math.random() < 0.2) ctx.fillRect(x + rand(0,8), y + rand(0,8), 3, 3);
      drawConstructionBg(ctx, frame);
    } else {
      for (let i = 0; i < LANE_COUNT; i++) {
        ctx.fillStyle = i % 2 === 0 ? "#c8a96e" : "#b8996e";
        ctx.fillRect(0, i * LANE_H, W, LANE_H);
      }
      drawDroughtBg(ctx, frame);
    }
    ctx.setLineDash([8, 12]);
    ctx.strokeStyle = "rgba(0,0,0,0.12)"; ctx.lineWidth = 1;
    for (let i = 1; i < LANE_COUNT; i++) {
      ctx.beginPath(); ctx.moveTo(0, i * LANE_H); ctx.lineTo(W, i * LANE_H); ctx.stroke();
    }
    ctx.setLineDash([]);
  }

  function drawNeighborhoodBg(ctx: CanvasRenderingContext2D, _frame: number) {
    const houseX = -(scrollX.current % 240);
    for (let x = houseX; x < W + 240; x += 240) {
      const idx = Math.floor((x + scrollX.current) / 240) & 3;
      ctx.fillStyle = ["#e8d5b0","#d4c5a0","#c8b89a","#ddd0b8"][idx];
      ctx.fillRect(x + 10, 2, 55, 24);
      ctx.fillStyle = ["#8b4513","#6b3410","#a0522d","#7a3b10"][idx];
      ctx.beginPath(); ctx.moveTo(x+5,2); ctx.lineTo(x+38,-12); ctx.lineTo(x+70,2); ctx.closePath(); ctx.fill();
      ctx.fillStyle = "#87ceeb"; ctx.fillRect(x+18, 8, 14, 12);
      ctx.strokeStyle = "#fff"; ctx.lineWidth = 0.5; ctx.strokeRect(x+18, 8, 14, 12);
      ctx.fillStyle = BRAND_GREEN; ctx.fillRect(x+38, 14, 9, 12);
      // NAL yard sign
      ctx.strokeStyle = "#5c3d1e"; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.moveTo(x+76, 22); ctx.lineTo(x+76, 10); ctx.stroke();
      ctx.fillStyle = BRAND_GREEN;
      ctx.beginPath(); ctx.roundRect(x+62, 4, 28, 14, 3); ctx.fill();
      ctx.fillStyle = BRAND_GOLD; ctx.font = "bold 6px sans-serif"; ctx.textAlign = "center";
      ctx.fillText("NAL", x+76, 13);
      ctx.fillStyle = "#fff"; ctx.font = "4px sans-serif"; ctx.fillText("LANDSCAPING", x+76, 18);
      // Tiny mailbox
      ctx.fillStyle = "#888"; ctx.fillRect(x+85, 14, 10, 7);
      ctx.fillStyle = "#666"; ctx.beginPath(); ctx.arc(x+90, 14, 3.5, Math.PI, 0); ctx.fill();
      // Flower bed
      ctx.fillStyle = "#4ade80"; ctx.fillRect(x+10, 24, 55, 4);
      for (let fi = 0; fi < 5; fi++) {
        ctx.fillStyle = ["#f87171","#fbbf24","#a78bfa","#fb923c","#f472b6"][fi];
        ctx.beginPath(); ctx.arc(x+15+fi*10, 22, 3, 0, Math.PI*2); ctx.fill();
      }
    }
  }

  function drawHOABg(ctx: CanvasRenderingContext2D, _frame: number) {
    const signX = -(scrollX.current % 280) + 220;
    for (let x = signX; x < W + 280; x += 280) {
      ctx.fillStyle = "#fff"; ctx.fillRect(x, 3, 90, 26);
      ctx.strokeStyle = BRAND_RED; ctx.lineWidth = 2; ctx.strokeRect(x, 3, 90, 26);
      ctx.fillStyle = BRAND_RED; ctx.font = "bold 7px sans-serif"; ctx.textAlign = "center";
      ctx.fillText("HOA NOTICE", x+45, 14);
      ctx.fillStyle = "#333"; ctx.font = "5.5px sans-serif"; ctx.fillText("NO NAL ALLOWED", x+45, 24);
      // Tiny perfect house
      ctx.fillStyle = "#f0ead6"; ctx.fillRect(x+100, 2, 50, 22);
      ctx.fillStyle = "#5a3a1a";
      ctx.beginPath(); ctx.moveTo(x+96,2); ctx.lineTo(x+125,-10); ctx.lineTo(x+154,2); ctx.closePath(); ctx.fill();
      ctx.fillStyle = "#b0d4f1"; ctx.fillRect(x+108, 8, 12, 10);
    }
    const hedgeX = -(scrollX.current % 60);
    for (let x = hedgeX; x < W + 60; x += 60) {
      ctx.fillStyle = "#2d6a2d";
      ctx.beginPath(); ctx.arc(x+15, 4, 10, Math.PI, 0); ctx.fill();
      ctx.beginPath(); ctx.arc(x+35, 4, 10, Math.PI, 0); ctx.fill();
      ctx.beginPath(); ctx.arc(x+55, 4, 10, Math.PI, 0); ctx.fill();
    }
  }

  function drawConstructionBg(ctx: CanvasRenderingContext2D, _frame: number) {
    const tapeOff = -(scrollX.current % 40);
    for (let x = tapeOff; x < W + 40; x += 40) {
      ctx.fillStyle = x % 80 < 40 ? "#f59e0b" : "#1a1a1a";
      ctx.fillRect(x, 0, 40, 8);
      ctx.fillStyle = x % 80 < 40 ? "#1a1a1a" : "#f59e0b";
      ctx.fillRect(x, H-8, 40, 8);
    }
    const trailX = -(scrollX.current % 500) + 400;
    for (let x = trailX; x < W + 500; x += 500) {
      ctx.fillStyle = BRAND_GREEN; ctx.fillRect(x, 2, 90, 20);
      ctx.fillStyle = BRAND_GOLD; ctx.font = "bold 6px sans-serif"; ctx.textAlign = "center";
      ctx.fillText("NEWPORT AVE LANDSCAPING", x+45, 15);
      // Tiny porta-potty
      ctx.fillStyle = "#1e40af"; ctx.fillRect(x+100, 2, 18, 24);
      ctx.fillStyle = "#fff"; ctx.font = "4px sans-serif"; ctx.textAlign = "center";
      ctx.fillText("WC", x+109, 16);
    }
  }

  function drawDroughtBg(ctx: CanvasRenderingContext2D, frame: number) {
    ctx.strokeStyle = "rgba(100,60,0,0.4)"; ctx.lineWidth = 1;
    const off = -(scrollX.current % 160);
    for (let x = off; x < W + 160; x += 160)
      for (let y = 20; y < H-20; y += 60) {
        ctx.beginPath(); ctx.moveTo(x+20,y); ctx.lineTo(x+35,y+15); ctx.lineTo(x+28,y+28); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(x+35,y+15); ctx.lineTo(x+50,y+10); ctx.stroke();
      }
    const nalX = -(scrollX.current % 380) + 300;
    for (let x = nalX; x < W + 380; x += 380) {
      ctx.fillStyle = BRAND_GREEN; ctx.fillRect(x, 3, 100, 22);
      ctx.fillStyle = BRAND_GOLD; ctx.font = "bold 6px sans-serif"; ctx.textAlign = "center";
      ctx.fillText("NAL SAVES LAWNS! 🌿", x+50, 17);
    }
    if (frame % 3 === 0) {
      ctx.strokeStyle = "rgba(255,200,100,0.08)"; ctx.lineWidth = 2;
      for (let y = 30; y < H-30; y += 40) {
        ctx.beginPath();
        for (let x = 0; x < W; x += 8) {
          const wy = y + Math.sin((x + frame*2)*0.05)*3;
          if (x===0) ctx.moveTo(x,wy); else ctx.lineTo(x,wy);
        }
        ctx.stroke();
      }
    }
  }

  //
  function drawPlayer(ctx: CanvasRenderingContext2D, frame: number, isInvincible: boolean, zoom = 1, cx = PLAYER_X, cy?: number) {
    const blinking = isInvincible && Math.floor(invincible.current / 5) % 2 === 0;
    if (blinking) return;
    const py = cy ?? playerY.current;
    ctx.save();
    ctx.translate(cx, py);
    ctx.scale(zoom, zoom);

    const legSwing = Math.sin(frame * 0.3) * 8;
    const bounce   = Math.abs(Math.sin(frame * 0.3)) * -2;
    ctx.translate(0, bounce);

    // Shadow
    ctx.beginPath(); ctx.ellipse(5, 30, 22, 6, 0, 0, Math.PI*2);
    ctx.fillStyle = "rgba(0,0,0,0.22)"; ctx.fill();

    //
    // Main red deck (wide, low profile)
    ctx.fillStyle = "#cc2200";
    ctx.beginPath(); ctx.roundRect(-4, 8, 58, 20, 4); ctx.fill();
    // Deck highlight
    ctx.fillStyle = "#e03010";
    ctx.beginPath(); ctx.roundRect(-2, 9, 50, 7, 3); ctx.fill();
    // NAVIGATOR text on deck
    ctx.fillStyle = "#fff"; ctx.font = "bold 5px sans-serif"; ctx.textAlign = "center";
    ctx.fillText("NAVIGATOR", 25, 22);
    // Exmark X logo (small)
    ctx.fillStyle = "#fff"; ctx.font = "bold 7px sans-serif";
    ctx.fillText("X", 48, 22);

    // White grass catcher / hopper (the big distinctive box on back)
    ctx.fillStyle = "#f0f0f0";
    ctx.beginPath(); ctx.roundRect(48, -10, 30, 36, 5); ctx.fill();
    ctx.strokeStyle = "#ccc"; ctx.lineWidth = 1;
    ctx.strokeRect(48, -10, 30, 36);
    // Hopper vent lines
    ctx.strokeStyle = "#bbb"; ctx.lineWidth = 0.8;
    for (let i = 0; i < 5; i++) {
      ctx.beginPath(); ctx.moveTo(50, -5 + i*6); ctx.lineTo(76, -5 + i*6); ctx.stroke();
    }
    // Hopper label
    ctx.fillStyle = "#cc2200"; ctx.font = "bold 5px sans-serif"; ctx.textAlign = "center";
    ctx.fillText("EXMARK", 63, 5);
    // Hopper handle
    ctx.strokeStyle = "#999"; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(55, -10); ctx.lineTo(55, -16); ctx.lineTo(71, -16); ctx.lineTo(71, -10); ctx.stroke();

    // Engine block (under hopper area)
    ctx.fillStyle = "#1a1a1a";
    ctx.beginPath(); ctx.roundRect(38, -8, 14, 14, 3); ctx.fill();
    // Engine fins
    ctx.strokeStyle = "#444"; ctx.lineWidth = 1;
    for (let i = 0; i < 3; i++) {
      ctx.beginPath(); ctx.moveTo(41+i*3, -7); ctx.lineTo(41+i*3, 4); ctx.stroke();
    }
    // Exhaust pipe
    ctx.fillStyle = "#555"; ctx.beginPath(); ctx.roundRect(36, -14, 4, 8, 1); ctx.fill();
    if (frame % 12 < 6) {
      ctx.fillStyle = "rgba(160,160,160,0.45)";
      ctx.beginPath(); ctx.arc(38, -16, 4, 0, Math.PI*2); ctx.fill();
    }

    // Rear large drive wheels
    ctx.fillStyle = "#1e293b";
    ctx.beginPath(); ctx.arc(10, 30, 11, 0, Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.arc(42, 30, 11, 0, Math.PI*2); ctx.fill();
    // Tire tread
    ctx.strokeStyle = "#374151"; ctx.lineWidth = 2;
    for (let a = 0; a < Math.PI*2; a += Math.PI/4) {
      const ra = a + frame*0.3;
      ctx.beginPath();
      ctx.moveTo(10+Math.cos(ra)*5, 30+Math.sin(ra)*5);
      ctx.lineTo(10+Math.cos(ra)*11, 30+Math.sin(ra)*11);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(42+Math.cos(ra)*5, 30+Math.sin(ra)*5);
      ctx.lineTo(42+Math.cos(ra)*11, 30+Math.sin(ra)*11);
      ctx.stroke();
    }
    // Wheel hubs (red)
    ctx.fillStyle = "#cc2200";
    ctx.beginPath(); ctx.arc(10, 30, 4, 0, Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.arc(42, 30, 4, 0, Math.PI*2); ctx.fill();
    ctx.fillStyle = "#fff";
    ctx.beginPath(); ctx.arc(10, 30, 1.5, 0, Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.arc(42, 30, 1.5, 0, Math.PI*2); ctx.fill();

    // Small front caster wheels
    ctx.fillStyle = "#374151";
    ctx.beginPath(); ctx.arc(-2, 26, 5, 0, Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.arc(56, 26, 5, 0, Math.PI*2); ctx.fill();
    ctx.fillStyle = "#555";
    ctx.beginPath(); ctx.arc(-2, 26, 2, 0, Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.arc(56, 26, 2, 0, Math.PI*2); ctx.fill();

    // Spinning blade indicator under deck
    ctx.save(); ctx.translate(24, 18); ctx.rotate(frame * 0.7);
    ctx.strokeStyle = "rgba(200,255,200,0.6)"; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(-10, 0); ctx.lineTo(10, 0); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(0, -10); ctx.lineTo(0, 10); ctx.stroke();
    ctx.restore();

    // Grass clippings discharge (left side)
    ctx.fillStyle = "#86efac";
    for (let i = 0; i < 6; i++) {
      const gx = -4 - 7 - i*6;
      const gy = 18 + Math.sin(frame*0.35 + i*1.2)*7;
      ctx.beginPath(); ctx.ellipse(gx, gy, 3, 1.5, 0.5, 0, Math.PI*2); ctx.fill();
    }

    // Operator platform / seat area
    ctx.fillStyle = "#2d2d2d";
    ctx.beginPath(); ctx.roundRect(14, -4, 22, 14, 3); ctx.fill();
    // Seat cushion (black)
    ctx.fillStyle = "#1a1a1a";
    ctx.beginPath(); ctx.roundRect(16, -6, 18, 10, 3); ctx.fill();
    ctx.fillStyle = "#333";
    ctx.beginPath(); ctx.roundRect(17, -5, 16, 4, 2); ctx.fill();

    // Lap bar / control levers
    ctx.strokeStyle = "#555"; ctx.lineWidth = 3; ctx.lineCap = "round";
    ctx.beginPath(); ctx.moveTo(16, -6); ctx.lineTo(10, -16); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(32, -6); ctx.lineTo(38, -16); ctx.stroke();
    // Grip handles
    ctx.fillStyle = "#222";
    ctx.beginPath(); ctx.roundRect(7, -20, 6, 8, 2); ctx.fill();
    ctx.beginPath(); ctx.roundRect(35, -20, 6, 8, 2); ctx.fill();

    // Hour meter / display panel
    ctx.fillStyle = "#111"; ctx.fillRect(20, -18, 14, 8);
    ctx.fillStyle = "#4ade80"; ctx.font = "bold 4px monospace"; ctx.textAlign = "center";
    ctx.fillText("NAL", 27, -12);

    //
    // Legs (dark work pants)
    ctx.strokeStyle = "#1a1a2e"; ctx.lineWidth = 8; ctx.lineCap = "round";
    ctx.beginPath(); ctx.moveTo(22, 2); ctx.lineTo(14 + legSwing, 16); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(30, 2); ctx.lineTo(36 - legSwing, 16); ctx.stroke();
    // Work boots
    ctx.fillStyle = "#3d2b1f";
    ctx.beginPath(); ctx.ellipse(14+legSwing, 18, 9, 4, 0.3, 0, Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.ellipse(36-legSwing, 18, 9, 4, -0.3, 0, Math.PI*2); ctx.fill();
    // Boot laces
    ctx.strokeStyle = "#f5c5a3"; ctx.lineWidth = 0.8;
    ctx.beginPath(); ctx.moveTo(11+legSwing, 16); ctx.lineTo(17+legSwing, 16); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(33-legSwing, 16); ctx.lineTo(39-legSwing, 16); ctx.stroke();

    // Torso — NAL RED uniform shirt
    ctx.save(); ctx.translate(24, -8); ctx.rotate(0.05);
    ctx.fillStyle = NAL_RED;
    ctx.beginPath(); ctx.roundRect(-11, -18, 22, 24, 5); ctx.fill();
    // Shirt collar / yoke
    ctx.fillStyle = "#a02020";
    ctx.beginPath(); ctx.roundRect(-9, -18, 18, 7, 3); ctx.fill();
    // NAL logo patch (white on red)
    ctx.fillStyle = "#fff";
    ctx.beginPath(); ctx.roundRect(-7, -10, 14, 8, 2); ctx.fill();
    ctx.fillStyle = NAL_RED; ctx.font = "bold 5px sans-serif"; ctx.textAlign = "center";
    ctx.fillText("NAL", 0, -4);
    // Arms (red sleeves)
    ctx.strokeStyle = NAL_RED; ctx.lineWidth = 7; ctx.lineCap = "round";
    ctx.beginPath(); ctx.moveTo(-10, -10); ctx.lineTo(-16, 0); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(10, -10); ctx.lineTo(16, 0); ctx.stroke();
    // Work gloves (gold/yellow)
    ctx.fillStyle = "#f59e0b";
    ctx.beginPath(); ctx.arc(-16, 0, 5, 0, Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.arc(16, 0, 5, 0, Math.PI*2); ctx.fill();
    // Glove fingers hint
    ctx.strokeStyle = "#d97706"; ctx.lineWidth = 1;
    for (let f = -1; f <= 1; f++) {
      ctx.beginPath(); ctx.moveTo(-16+f*2, -2); ctx.lineTo(-16+f*2, -5); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(16+f*2, -2); ctx.lineTo(16+f*2, -5); ctx.stroke();
    }
    ctx.restore();

    // Head (skin tone)
    ctx.fillStyle = "#f5c5a3";
    ctx.beginPath(); ctx.arc(24, -30, 12, 0, Math.PI*2); ctx.fill();
    // Hair (short dark)
    ctx.fillStyle = "#3d2b1f";
    ctx.beginPath(); ctx.arc(24, -37, 10, Math.PI, 0); ctx.fill();
    // Sunglasses
    ctx.fillStyle = "#1a1a1a";
    ctx.beginPath(); ctx.roundRect(16, -33, 8, 5, 2); ctx.fill();
    ctx.beginPath(); ctx.roundRect(26, -33, 8, 5, 2); ctx.fill();
    ctx.strokeStyle = "#333"; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(24, -31); ctx.lineTo(26, -31); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(16, -31); ctx.lineTo(12, -30); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(34, -31); ctx.lineTo(38, -30); ctx.stroke();
    // Confident smirk
    ctx.strokeStyle = "#c97b5a"; ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.arc(24, -27, 5, 0.3, Math.PI-0.3); ctx.stroke();

    // NAL red cap with gold logo
    ctx.fillStyle = NAL_RED;
    ctx.beginPath(); ctx.roundRect(13, -44, 24, 13, 3); ctx.fill();
    ctx.fillStyle = "#a02020";
    ctx.beginPath(); ctx.roundRect(11, -33, 28, 4, 2); ctx.fill();
    // Cap brim
    ctx.fillStyle = "#a02020";
    ctx.beginPath(); ctx.roundRect(10, -32, 30, 4, 1); ctx.fill();
    // Cap logo
    ctx.fillStyle = BRAND_GOLD; ctx.font = "bold 6px sans-serif"; ctx.textAlign = "center";
    ctx.fillText("NAL", 25, -36);
    // Cap button
    ctx.fillStyle = BRAND_GOLD;
    ctx.beginPath(); ctx.arc(25, -44, 2.5, 0, Math.PI*2); ctx.fill();

    ctx.restore();
  }

  //
  function drawObstacle(ctx: CanvasRenderingContext2D, obs: Obstacle, frame: number) {
    const y = LANE_CENTERS[obs.lane];
    ctx.save(); ctx.translate(obs.x, y);

    if (obs.type === "sprinkler") {
      ctx.fillStyle = "#475569"; ctx.beginPath(); ctx.arc(0,0,12,0,Math.PI*2); ctx.fill();
      ctx.fillStyle = BRAND_GREEN; ctx.beginPath(); ctx.arc(0,0,8,0,Math.PI*2); ctx.fill();
      ctx.fillStyle = BRAND_GOLD; ctx.font = "bold 5px sans-serif"; ctx.textAlign = "center"; ctx.fillText("H2O",0,2);
      ctx.save(); ctx.rotate(obs.angle!);
      ctx.strokeStyle = "rgba(59,130,246,0.85)"; ctx.lineWidth = 4.5; ctx.lineCap = "round";
      ctx.beginPath(); ctx.arc(0,0,obs.arcLen!,-obs.arcWidth!/2,obs.arcWidth!/2); ctx.stroke();
      ctx.fillStyle = "rgba(147,197,253,0.95)";
      for (let i=0;i<7;i++) {
        const a = -obs.arcWidth!/2+(obs.arcWidth!/6)*i, r=obs.arcLen!+rand(-4,4);
        ctx.beginPath(); ctx.arc(Math.cos(a)*r,Math.sin(a)*r,3.5,0,Math.PI*2); ctx.fill();
      }
      ctx.restore();
      ctx.fillStyle = "rgba(186,230,253,0.22)";
      ctx.beginPath(); ctx.arc(0,0,obs.arcLen!+12,obs.angle!-obs.arcWidth!/2,obs.angle!+obs.arcWidth!/2);
      ctx.lineTo(0,0); ctx.closePath(); ctx.fill();

    } else if (obs.type === "gnome") {
      ctx.fillStyle = "rgba(0,0,0,0.18)"; ctx.beginPath(); ctx.ellipse(0,22,14,4,0,0,Math.PI*2); ctx.fill();
      ctx.fillStyle = "#dc2626"; ctx.beginPath(); ctx.roundRect(-10,-12,20,26,5); ctx.fill();
      ctx.fillStyle = "#f5f5f5"; ctx.beginPath(); ctx.arc(0,2,10,0,Math.PI); ctx.fill();
      ctx.fillStyle = "#dc2626";
      ctx.beginPath(); ctx.moveTo(-9,-12); ctx.lineTo(0,-34); ctx.lineTo(9,-12); ctx.closePath(); ctx.fill();
      ctx.fillStyle = "#f5c5a3"; ctx.beginPath(); ctx.arc(0,-15,9,0,Math.PI*2); ctx.fill();
      ctx.fillStyle = "#1a1a2e"; ctx.beginPath(); ctx.arc(-3,-16,2,0,Math.PI*2); ctx.fill();
      ctx.beginPath(); ctx.arc(3,-16,2,0,Math.PI*2); ctx.fill();
      ctx.fillStyle = "rgba(255,100,100,0.45)"; ctx.beginPath(); ctx.arc(-5,-12,3.5,0,Math.PI*2); ctx.fill();
      ctx.beginPath(); ctx.arc(5,-12,3.5,0,Math.PI*2); ctx.fill();
      if (Math.floor(frame/35)%2===0) {
        ctx.fillStyle = "#fff"; ctx.beginPath(); ctx.roundRect(10,-44,50,16,4); ctx.fill();
        ctx.strokeStyle = "#dc2626"; ctx.lineWidth = 1; ctx.strokeRect(10,-44,50,16);
        ctx.fillStyle = "#dc2626"; ctx.font = "bold 7px sans-serif"; ctx.textAlign = "center";
        ctx.fillText("MY LAWN!", 35,-33);
      }

    } else if (obs.type === "hoa_member" || obs.type === "hoa_group") {
      const ls = Math.sin((obs.phase||0)+frame*0.25)*10;
      ctx.beginPath(); ctx.ellipse(0,24,14,4,0,0,Math.PI*2); ctx.fillStyle="rgba(0,0,0,0.2)"; ctx.fill();
      ctx.strokeStyle = "#c8a84b"; ctx.lineWidth = 7; ctx.lineCap = "round";
      ctx.beginPath(); ctx.moveTo(0,10); ctx.lineTo(-9+ls,26); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(0,10); ctx.lineTo(7-ls,26); ctx.stroke();
      ctx.fillStyle = "#5c3d1e";
      ctx.beginPath(); ctx.ellipse(-9+ls,28,7,3.5,0.3,0,Math.PI*2); ctx.fill();
      ctx.beginPath(); ctx.ellipse(7-ls,28,7,3.5,-0.3,0,Math.PI*2); ctx.fill();
      ctx.fillStyle = "#1e3a5f"; ctx.beginPath(); ctx.roundRect(-11,-16,22,26,5); ctx.fill();
      ctx.fillStyle = "#2563eb"; ctx.beginPath(); ctx.roundRect(-9,-16,18,6,2); ctx.fill();
      ctx.fillStyle = "#fbbf24"; ctx.beginPath(); ctx.roundRect(-5,-9,10,6,1); ctx.fill();
      ctx.fillStyle = "#1a1a2e"; ctx.font = "bold 4px sans-serif"; ctx.textAlign = "center"; ctx.fillText("HOA",0,-5);
      ctx.fillStyle = BRAND_RED; ctx.beginPath(); ctx.arc(6,-2,5,0,Math.PI*2); ctx.fill();
      ctx.fillStyle = "#fff"; ctx.font = "bold 3.5px sans-serif"; ctx.textAlign = "center";
      ctx.fillText("NO",6,-3); ctx.fillText("NAL",6,2);
      ctx.strokeStyle = "#1e3a5f"; ctx.lineWidth = 6; ctx.lineCap = "round";
      ctx.beginPath(); ctx.moveTo(-9,-8); ctx.lineTo(-16,5); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(9,-8); ctx.lineTo(16,-1); ctx.stroke();
      ctx.fillStyle = "#f5f5dc"; ctx.beginPath(); ctx.roundRect(12,-10,16,22,2); ctx.fill();
      ctx.strokeStyle = "#8b7355"; ctx.lineWidth = 1; ctx.strokeRect(12,-10,16,22);
      ctx.strokeStyle = "#999"; ctx.lineWidth = 0.8;
      for (let i=0;i<6;i++) { ctx.beginPath(); ctx.moveTo(14,-6+i*3); ctx.lineTo(26,-6+i*3); ctx.stroke(); }
      ctx.fillStyle = "#888"; ctx.beginPath(); ctx.roundRect(15,-12,10,4,1); ctx.fill();
      ctx.fillStyle = "#f5c5a3"; ctx.beginPath(); ctx.arc(0,-22,12,0,Math.PI*2); ctx.fill();
      ctx.fillStyle = "#9ca3af"; ctx.beginPath(); ctx.arc(0,-29,9,Math.PI,0); ctx.fill();
      ctx.strokeStyle = "#1a1a2e"; ctx.lineWidth = 2.5;
      ctx.beginPath(); ctx.moveTo(-7,-28); ctx.lineTo(-2,-24); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(7,-28); ctx.lineTo(2,-24); ctx.stroke();
      ctx.fillStyle = "#1a1a2e"; ctx.beginPath(); ctx.arc(-4,-23,2,0,Math.PI*2); ctx.fill();
      ctx.beginPath(); ctx.arc(4,-23,2,0,Math.PI*2); ctx.fill();
      ctx.strokeStyle = BRAND_RED; ctx.lineWidth = 1.5;
      ctx.beginPath(); ctx.arc(0,-18,5,Math.PI+0.3,-0.3); ctx.stroke();
      const msgs = ["VIOLATION!","NO NAL HERE!","CALL MY LAWYER!","RULE #312!","UNACCEPTABLE!"];
      if (Math.floor(frame/28)%2===0) {
        const msg = msgs[Math.floor(frame/90)%msgs.length];
        const bw = msg.length*5+12;
        ctx.fillStyle = "#fff"; ctx.beginPath(); ctx.roundRect(14,-46,bw,16,4); ctx.fill();
        ctx.strokeStyle = BRAND_RED; ctx.lineWidth = 1; ctx.strokeRect(14,-46,bw,16);
        ctx.fillStyle = BRAND_RED; ctx.font = "bold 6px sans-serif"; ctx.textAlign = "center";
        ctx.fillText(msg, 14+bw/2,-35);
      }

    } else if (obs.type === "hoa_sign") {
      ctx.strokeStyle = "#5c3d1e"; ctx.lineWidth = 3.5;
      ctx.beginPath(); ctx.moveTo(0,-35); ctx.lineTo(0,22); ctx.stroke();
      ctx.fillStyle = BRAND_RED; ctx.beginPath(); ctx.roundRect(-32,-35,64,26,5); ctx.fill();
      ctx.strokeStyle = "#fff"; ctx.lineWidth = 2; ctx.strokeRect(-32,-35,64,26);
      ctx.strokeStyle = "#fff"; ctx.lineWidth = 2.5;
      ctx.beginPath(); ctx.arc(-16,-22,8,0,Math.PI*2); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(-22,-28); ctx.lineTo(-10,-16); ctx.stroke();
      ctx.fillStyle = "#fff"; ctx.font = "bold 8px sans-serif"; ctx.textAlign = "center";
      ctx.fillText("NO NAL",10,-26); ctx.fillText("ALLOWED",10,-15);

    } else if (obs.type === "boulder") {
      ctx.fillStyle = "rgba(0,0,0,0.2)"; ctx.beginPath(); ctx.ellipse(4,26,24,6,0,0,Math.PI*2); ctx.fill();
      ctx.fillStyle = "#78716c"; ctx.beginPath(); ctx.arc(0,0,24,0,Math.PI*2); ctx.fill();
      ctx.fillStyle = "#a8a29e"; ctx.beginPath(); ctx.arc(-7,-7,11,0,Math.PI*2); ctx.fill();
      ctx.fillStyle = "#57534e"; ctx.beginPath(); ctx.arc(8,6,7,0,Math.PI*2); ctx.fill();
      ctx.fillStyle = "#d6d3d1"; ctx.beginPath(); ctx.arc(-9,-9,5,0,Math.PI*2); ctx.fill();
      ctx.fillStyle = "rgba(180,160,120,0.35)"; ctx.beginPath(); ctx.ellipse(0,22,26,8,0,0,Math.PI*2); ctx.fill();

    } else if (obs.type === "mud_puddle") {
      ctx.fillStyle = "rgba(101,67,33,0.9)"; ctx.beginPath(); ctx.ellipse(0,0,36,18,0,0,Math.PI*2); ctx.fill();
      ctx.fillStyle = "rgba(139,90,43,0.6)"; ctx.beginPath(); ctx.ellipse(-5,-3,22,11,0.3,0,Math.PI*2); ctx.fill();
      ctx.fillStyle = "rgba(101,67,33,0.7)";
      for (let i=0;i<7;i++) { ctx.beginPath(); ctx.arc(rand(-44,44),rand(-22,22),rand(2,6),0,Math.PI*2); ctx.fill(); }
      ctx.fillStyle = "#fff"; ctx.font = "bold 10px sans-serif"; ctx.textAlign = "center"; ctx.fillText("MUD!",0,5);

    } else if (obs.type === "skid_steer") {
      ctx.fillStyle = "rgba(0,0,0,0.2)"; ctx.beginPath(); ctx.ellipse(0,22,28,7,0,0,Math.PI*2); ctx.fill();
      ctx.fillStyle = "#f59e0b"; ctx.beginPath(); ctx.roundRect(-26,-16,52,36,5); ctx.fill();
      ctx.fillStyle = BRAND_GREEN; ctx.fillRect(-26,-3,52,8);
      ctx.fillStyle = BRAND_GOLD; ctx.font = "bold 6px sans-serif"; ctx.textAlign = "center"; ctx.fillText("NAL",0,4);
      ctx.fillStyle = "#d97706"; ctx.beginPath(); ctx.roundRect(-14,-30,28,18,3); ctx.fill();
      ctx.fillStyle = "rgba(147,197,253,0.75)"; ctx.beginPath(); ctx.roundRect(-11,-28,22,14,2); ctx.fill();
      ctx.fillStyle = "#1a1a2e"; ctx.beginPath(); ctx.arc(0,-22,5,0,Math.PI*2); ctx.fill();
      ctx.fillStyle = "#1e293b"; ctx.beginPath(); ctx.roundRect(-28,-12,10,26,3); ctx.fill();
      ctx.beginPath(); ctx.roundRect(18,-12,10,26,3); ctx.fill();
      ctx.strokeStyle = "#374151"; ctx.lineWidth = 1.2;
      for (let i=0;i<5;i++) {
        ctx.beginPath(); ctx.moveTo(-28,-8+i*5); ctx.lineTo(-18,-8+i*5); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(18,-8+i*5); ctx.lineTo(28,-8+i*5); ctx.stroke();
      }
      ctx.fillStyle = "#b45309"; ctx.beginPath(); ctx.roundRect(-28,12,56,12,2); ctx.fill();
      if (frame%8<4) {
        ctx.fillStyle = "rgba(100,100,100,0.4)";
        ctx.beginPath(); ctx.arc(16,-38,5,0,Math.PI*2); ctx.fill();
        ctx.beginPath(); ctx.arc(20,-46,4,0,Math.PI*2); ctx.fill();
      }

    } else if (obs.type === "cone_row") {
      for (let i=-1;i<=1;i++) {
        ctx.save(); ctx.translate(i*22,0);
        ctx.fillStyle = "#f97316";
        ctx.beginPath(); ctx.moveTo(-8,16); ctx.lineTo(8,16); ctx.lineTo(4,-16); ctx.lineTo(-4,-16); ctx.closePath(); ctx.fill();
        ctx.fillStyle = "#fff"; ctx.fillRect(-6,0,12,5);
        ctx.fillStyle = "#ea580c"; ctx.fillRect(-10,14,20,6);
        ctx.restore();
      }

    } else if (obs.type === "tumbleweed") {
      ctx.save(); ctx.rotate(frame*0.09);
      ctx.strokeStyle = "#a16207"; ctx.lineWidth = 3;
      for (let a=0;a<Math.PI*2;a+=Math.PI/4) { ctx.beginPath(); ctx.arc(0,0,22,a,a+Math.PI/3); ctx.stroke(); }
      ctx.strokeStyle = "#ca8a04"; ctx.lineWidth = 2;
      for (let a=Math.PI/8;a<Math.PI*2;a+=Math.PI/4) { ctx.beginPath(); ctx.arc(0,0,14,a,a+Math.PI/4); ctx.stroke(); }
      ctx.strokeStyle = "#d97706"; ctx.lineWidth = 1.2;
      for (let a=Math.PI/6;a<Math.PI*2;a+=Math.PI/3) { ctx.beginPath(); ctx.arc(0,0,7,a,a+Math.PI/5); ctx.stroke(); }
      ctx.restore();

    } else if (obs.type === "water_inspector") {
      const ls = Math.sin((obs.phase||0)+frame*0.3)*10;
      ctx.beginPath(); ctx.ellipse(0,24,14,4,0,0,Math.PI*2); ctx.fillStyle="rgba(0,0,0,0.2)"; ctx.fill();
      ctx.strokeStyle = "#1e3a5f"; ctx.lineWidth = 7; ctx.lineCap = "round";
      ctx.beginPath(); ctx.moveTo(0,10); ctx.lineTo(-9+ls,26); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(0,10); ctx.lineTo(7-ls,26); ctx.stroke();
      ctx.fillStyle = "#1e293b"; ctx.beginPath(); ctx.ellipse(-9+ls,28,7,3.5,0.3,0,Math.PI*2); ctx.fill();
      ctx.beginPath(); ctx.ellipse(7-ls,28,7,3.5,-0.3,0,Math.PI*2); ctx.fill();
      ctx.fillStyle = "#92400e"; ctx.beginPath(); ctx.roundRect(-11,-16,22,26,5); ctx.fill();
      ctx.fillStyle = "#b45309"; ctx.beginPath(); ctx.roundRect(-9,-16,18,6,2); ctx.fill();
      ctx.fillStyle = "#fbbf24"; ctx.beginPath(); ctx.arc(0,-7,6,0,Math.PI*2); ctx.fill();
      ctx.fillStyle = "#1a1a2e"; ctx.font = "bold 4px sans-serif"; ctx.textAlign = "center"; ctx.fillText("H2O",0,-5);
      ctx.strokeStyle = "#92400e"; ctx.lineWidth = 6; ctx.lineCap = "round";
      ctx.beginPath(); ctx.moveTo(-9,-8); ctx.lineTo(-16,5); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(9,-8); ctx.lineTo(16,-1); ctx.stroke();
      ctx.fillStyle = "#f5f5dc"; ctx.beginPath(); ctx.roundRect(12,-10,16,22,2); ctx.fill();
      ctx.strokeStyle = "#8b7355"; ctx.lineWidth = 1; ctx.strokeRect(12,-10,16,22);
      ctx.strokeStyle = "#999"; ctx.lineWidth = 0.8;
      for (let i=0;i<6;i++) { ctx.beginPath(); ctx.moveTo(14,-6+i*3); ctx.lineTo(26,-6+i*3); ctx.stroke(); }
      ctx.fillStyle = "#f5c5a3"; ctx.beginPath(); ctx.arc(0,-22,12,0,Math.PI*2); ctx.fill();
      ctx.fillStyle = "#92400e"; ctx.beginPath(); ctx.roundRect(-12,-36,24,12,2); ctx.fill();
      ctx.fillStyle = "#78350f"; ctx.beginPath(); ctx.roundRect(-15,-26,30,5,1); ctx.fill();
      ctx.fillStyle = "#1a1a2e"; ctx.beginPath(); ctx.arc(-4,-23,2,0,Math.PI*2); ctx.fill();
      ctx.beginPath(); ctx.arc(4,-23,2,0,Math.PI*2); ctx.fill();
      ctx.strokeStyle = "#1a1a2e"; ctx.lineWidth = 1.5;
      ctx.beginPath(); ctx.moveTo(-8,-26); ctx.lineTo(-1,-23); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(8,-26); ctx.lineTo(1,-23); ctx.stroke();
      const im = ["WATER AUDIT!","SPRINKLER FINE!","VIOLATION!","CALL THE COUNTY!"];
      if (Math.floor(frame/25)%2===0) {
        const msg = im[Math.floor(frame/80)%im.length], bw=msg.length*5+12;
        ctx.fillStyle = "#fff"; ctx.beginPath(); ctx.roundRect(14,-50,bw,16,4); ctx.fill();
        ctx.strokeStyle = "#1e3a5f"; ctx.lineWidth = 1; ctx.strokeRect(14,-50,bw,16);
        ctx.fillStyle = "#1e3a5f"; ctx.font = "bold 6px sans-serif"; ctx.textAlign = "center";
        ctx.fillText(msg, 14+bw/2,-39);
      }

    } else if (obs.type === "dead_patch") {
      ctx.fillStyle = "rgba(120,80,20,0.85)"; ctx.beginPath(); ctx.ellipse(0,0,34,17,0,0,Math.PI*2); ctx.fill();
      ctx.strokeStyle = "#a16207"; ctx.lineWidth = 2;
      for (let i=-4;i<=4;i++) {
        ctx.beginPath(); ctx.moveTo(i*7,0); ctx.lineTo(i*7+rand(-3,3),-12+rand(0,5)); ctx.stroke();
      }
      ctx.fillStyle = "#fff"; ctx.font = "bold 8px sans-serif"; ctx.textAlign = "center"; ctx.fillText("DEAD",0,5);

    } else if (obs.type === "fire_ants") {
      ctx.fillStyle = "#c2410c"; ctx.beginPath(); ctx.arc(0,5,20,Math.PI,0); ctx.fill();
      ctx.fillStyle = "#ea580c"; ctx.beginPath(); ctx.arc(0,5,13,Math.PI,0); ctx.fill();
      ctx.fillStyle = "#7c2d12";
      for (let i=0;i<8;i++) {
        const ax=Math.cos(frame*0.1+i*0.785)*26, ay=Math.sin(frame*0.1+i*0.785)*10+5;
        ctx.beginPath(); ctx.arc(ax,ay,2.5,0,Math.PI*2); ctx.fill();
      }
      ctx.fillStyle = "#fff"; ctx.font = "bold 8px sans-serif"; ctx.textAlign = "center"; ctx.fillText("ANTS!",0,-4);
    }
    ctx.restore();
  }

  //
  function drawCollectible(ctx: CanvasRenderingContext2D, col: Collectible, frame: number) {
    if (col.collected) return;
    const y = LANE_CENTERS[col.lane] + Math.sin(col.bobOffset + frame*0.08)*5;
    ctx.save(); ctx.translate(col.x, y);
    const gc = col.type==="star"?"#fbbf24":col.type==="cactus"?"#ef4444":col.type.startsWith("nal")?BRAND_GOLD:"#4ade80";
    ctx.shadowColor = gc; ctx.shadowBlur = 12;

    if (col.type==="nal_sign") {
      ctx.strokeStyle="#5c3d1e"; ctx.lineWidth=2.5; ctx.beginPath(); ctx.moveTo(0,8); ctx.lineTo(0,22); ctx.stroke();
      ctx.fillStyle=BRAND_GREEN; ctx.beginPath(); ctx.roundRect(-16,-8,32,18,4); ctx.fill();
      ctx.fillStyle=BRAND_GOLD; ctx.font="bold 8px sans-serif"; ctx.textAlign="center"; ctx.fillText("NAL",0,2);
      ctx.fillStyle="#fff"; ctx.font="5px sans-serif"; ctx.fillText("LANDSCAPING",0,10);
    } else if (col.type==="nal_flag") {
      ctx.strokeStyle="#5c3d1e"; ctx.lineWidth=2.5; ctx.beginPath(); ctx.moveTo(-4,-20); ctx.lineTo(-4,20); ctx.stroke();
      ctx.fillStyle=BRAND_GREEN; ctx.beginPath(); ctx.moveTo(-4,-20); ctx.lineTo(22,-12); ctx.lineTo(-4,-4); ctx.closePath(); ctx.fill();
      ctx.fillStyle=BRAND_GOLD; ctx.font="bold 6px sans-serif"; ctx.textAlign="center"; ctx.fillText("NAL",8,-10);
    } else if (col.type==="nal_truck") {
      ctx.fillStyle=BRAND_GREEN; ctx.beginPath(); ctx.roundRect(-18,-10,36,20,4); ctx.fill();
      ctx.fillStyle="#2a7a3a"; ctx.beginPath(); ctx.roundRect(-5,-18,16,12,2); ctx.fill();
      ctx.fillStyle="rgba(147,197,253,0.7)"; ctx.beginPath(); ctx.roundRect(-3,-16,12,9,1); ctx.fill();
      ctx.fillStyle="#1e293b"; ctx.beginPath(); ctx.arc(-12,10,5,0,Math.PI*2); ctx.fill();
      ctx.beginPath(); ctx.arc(12,10,5,0,Math.PI*2); ctx.fill();
      ctx.fillStyle=BRAND_GOLD; ctx.font="bold 6px sans-serif"; ctx.textAlign="center"; ctx.fillText("NAL",0,2);
    } else if (col.type==="nal_hose") {
      ctx.strokeStyle=BRAND_GREEN; ctx.lineWidth=5; ctx.lineCap="round";
      for (let i=0;i<3;i++) { ctx.beginPath(); ctx.arc(0,0,9+i*4,0,Math.PI*1.8); ctx.stroke(); }
      ctx.fillStyle="#fbbf24"; ctx.beginPath(); ctx.arc(12,-2,4,0,Math.PI*2); ctx.fill();
    } else if (col.type==="leaf_bag") {
      ctx.fillStyle="#f59e0b"; ctx.beginPath(); ctx.roundRect(-10,-14,20,26,5); ctx.fill();
      ctx.fillStyle="#d97706"; ctx.beginPath(); ctx.roundRect(-10,-14,20,10,5); ctx.fill();
      ctx.strokeStyle="#1a1a2e"; ctx.lineWidth=2; ctx.beginPath(); ctx.moveTo(-6,-4); ctx.lineTo(6,-4); ctx.stroke();
      ctx.fillStyle=BRAND_GREEN; ctx.font="bold 6px sans-serif"; ctx.textAlign="center"; ctx.fillText("NAL",0,5);
      ctx.fillStyle="#4ade80"; ctx.beginPath(); ctx.ellipse(0,12,6,8,0.3,0,Math.PI*2); ctx.fill();
    } else if (col.type==="star") {
      ctx.font="26px sans-serif"; ctx.textAlign="center"; ctx.fillText("⭐",0,9);
    } else if (col.type==="coffee") {
      ctx.fillStyle="#92400e"; ctx.beginPath(); ctx.roundRect(-9,-10,18,22,4); ctx.fill();
      ctx.fillStyle="#6b2d0e"; ctx.beginPath(); ctx.arc(0,-3,7,0,Math.PI*2); ctx.fill();
      ctx.fillStyle="#d4a574"; ctx.beginPath(); ctx.arc(0,-3,5,0,Math.PI*2); ctx.fill();
      if (frame%20<10) {
        ctx.strokeStyle="rgba(255,255,255,0.5)"; ctx.lineWidth=1.5;
        ctx.beginPath(); ctx.moveTo(-2,-12); ctx.quadraticCurveTo(2,-18,-2,-22); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(2,-12); ctx.quadraticCurveTo(-2,-18,2,-22); ctx.stroke();
      }
    } else if (col.type==="permit") {
      ctx.fillStyle="#fff"; ctx.beginPath(); ctx.roundRect(-12,-14,24,28,3); ctx.fill();
      ctx.strokeStyle="#22c55e"; ctx.lineWidth=2; ctx.strokeRect(-12,-14,24,28);
      ctx.fillStyle="#22c55e"; ctx.font="bold 8px sans-serif"; ctx.textAlign="center";
      ctx.fillText("PERMIT",0,-5); ctx.fillText("✓",0,8);
    } else if (col.type==="hard_hat") {
      ctx.fillStyle="#f59e0b"; ctx.beginPath(); ctx.arc(0,-5,15,Math.PI,0); ctx.fill();
      ctx.fillStyle="#d97706"; ctx.beginPath(); ctx.roundRect(-17,-5,34,6,2); ctx.fill();
      ctx.fillStyle=BRAND_GREEN; ctx.font="bold 6px sans-serif"; ctx.textAlign="center"; ctx.fillText("NAL",0,-7);
    } else if (col.type==="water_bottle") {
      ctx.fillStyle="#93c5fd"; ctx.beginPath(); ctx.roundRect(-7,-14,14,26,5); ctx.fill();
      ctx.fillStyle="#bfdbfe"; ctx.beginPath(); ctx.roundRect(-5,-12,10,12,2); ctx.fill();
      ctx.fillStyle="#1e40af"; ctx.beginPath(); ctx.roundRect(-6,-16,12,6,2); ctx.fill();
      ctx.fillStyle="#fff"; ctx.font="bold 5px sans-serif"; ctx.textAlign="center"; ctx.fillText("H2O",0,-1);
    } else if (col.type==="cactus") {
      ctx.fillStyle="#4d7c0f"; ctx.beginPath(); ctx.roundRect(-6,-18,12,28,4); ctx.fill();
      ctx.beginPath(); ctx.roundRect(-16,-10,12,7,3); ctx.fill();
      ctx.beginPath(); ctx.roundRect(4,-12,12,7,3); ctx.fill();
      ctx.strokeStyle=BRAND_RED; ctx.lineWidth=2.5;
      ctx.beginPath(); ctx.moveTo(-5,-5); ctx.lineTo(5,5); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(5,-5); ctx.lineTo(-5,5); ctx.stroke();
    }
    ctx.shadowBlur=0; ctx.restore();
  }

  //
  function drawHUD(ctx: CanvasRenderingContext2D, level: number, dist: number, lvDist: number) {
    const pct = Math.min(dist/(lvDist*10),1);
    ctx.fillStyle = "rgba(0,0,0,0.62)"; ctx.beginPath(); ctx.roundRect(0,0,W,48,0); ctx.fill();
    ctx.fillStyle = BRAND_RED; ctx.fillRect(0,46,W,2);
    ctx.fillStyle = BRAND_RED; ctx.beginPath(); ctx.roundRect(8,5,96,36,6); ctx.fill();
    ctx.strokeStyle = BRAND_GOLD; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.roundRect(8,5,96,36,6); ctx.stroke();
    ctx.fillStyle = BRAND_GOLD; ctx.font = "bold 8px sans-serif"; ctx.textAlign = "center";
    ctx.fillText(`LEVEL ${level}`, 56,18);
    ctx.fillStyle = "#fff"; ctx.font = "bold 7px sans-serif";
    const sn = ["NEIGHBORHOOD","HOA GAUNTLET","CONSTRUCTION","DROUGHT ZONE"];
    ctx.fillText(sn[level-1], 56,32);
    ctx.fillStyle = "#fff"; ctx.font = "bold 16px sans-serif"; ctx.textAlign = "center";
    ctx.fillText(`${Math.floor(dist/10)} ft`, W/2,30);
    for (let i=0;i<3;i++) {
      ctx.fillStyle = i<lives.current?"#ef4444":"rgba(255,255,255,0.2)";
      ctx.font = "20px sans-serif"; ctx.fillText("❤",W-84+i*24,32);
    }
    ctx.fillStyle = BRAND_GOLD; ctx.font = "bold 9px sans-serif"; ctx.textAlign = "right";
    ctx.fillText(`🏆 ${highScoreRef.current} ft`, W-8,15);
    ctx.fillStyle = "rgba(255,255,255,0.12)"; ctx.beginPath(); ctx.roundRect(8,H-20,W-16,12,5); ctx.fill();
    const bc = ["#4ade80","#fbbf24","#f97316","#ef4444"];
    ctx.fillStyle = bc[level-1]; ctx.beginPath(); ctx.roundRect(8,H-20,(W-16)*pct,12,5); ctx.fill();
    if (pct>0.02) { ctx.fillStyle="#fff"; ctx.beginPath(); ctx.arc(8+(W-16)*pct,H-14,5,0,Math.PI*2); ctx.fill(); }
    ctx.fillStyle="#fff"; ctx.font="bold 7px sans-serif"; ctx.textAlign="left";
    ctx.fillText(`${Math.floor(pct*100)}% complete`,12,H-9);
    if (combo.current>=2) {
      ctx.fillStyle="rgba(251,191,36,0.95)"; ctx.beginPath(); ctx.roundRect(8,54,110,24,5); ctx.fill();
      ctx.fillStyle="#1a1a2e"; ctx.font="bold 13px sans-serif"; ctx.textAlign="left";
      ctx.fillText(`${combo.current}x COMBO! 🔥`,14,70);
    }
    if (slowTimer.current>0) {
      ctx.fillStyle="rgba(124,58,237,0.92)"; ctx.beginPath(); ctx.roundRect(W/2-70,H-44,140,24,6); ctx.fill();
      ctx.fillStyle="#fff"; ctx.font="bold 12px sans-serif"; ctx.textAlign="center"; ctx.fillText("SLOWED! 🌵",W/2,H-27);
    } else if (fastTimer.current>0) {
      ctx.fillStyle="rgba(217,119,6,0.92)"; ctx.beginPath(); ctx.roundRect(W/2-75,H-44,150,24,6); ctx.fill();
      ctx.fillStyle="#fff"; ctx.font="bold 12px sans-serif"; ctx.textAlign="center"; ctx.fillText("SPEED BOOST! ☕",W/2,H-27);
    }
  }

  //
  function drawLevelIntro(ctx: CanvasRenderingContext2D, level: number, timer: number) {
    const lv = LEVELS[level-1];
    const alpha = Math.min(1,timer/30)*Math.min(1,(timer-20)/20+1);
    ctx.fillStyle = `rgba(0,0,0,${0.8*alpha})`; ctx.fillRect(0,0,W,H);
    ctx.save(); ctx.globalAlpha = alpha;
    ctx.fillStyle=BRAND_RED; ctx.beginPath(); ctx.roundRect(W/2-130,H/2-88,260,32,6); ctx.fill();
    ctx.fillStyle=BRAND_GOLD; ctx.font="bold 11px sans-serif"; ctx.textAlign="center";
    ctx.fillText("NEWPORT AVENUE LANDSCAPING",W/2,H/2-66);
    ctx.fillStyle=BRAND_GOLD; ctx.font="bold 18px sans-serif"; ctx.fillText(`LEVEL ${level} OF 4`,W/2,H/2-24);
    ctx.fillStyle="#fff"; ctx.font="bold 32px sans-serif"; ctx.fillText(lv.name,W/2,H/2+16);
    ctx.fillStyle=BRAND_LIGHT; ctx.font="13px sans-serif"; ctx.fillText(lv.subtitle,W/2,H/2+42);
    ctx.fillStyle=BRAND_GOLD; ctx.font="italic 11px sans-serif"; ctx.fillText(`"${lv.tagline}"`,W/2,H/2+62);
    if (timer<60) {
      ctx.fillStyle="#4ade80"; ctx.font="bold 22px sans-serif"; ctx.fillText("LET'S MOW! 🌿",W/2,H/2+92);
    } else {
      ctx.fillStyle="rgba(255,255,255,0.7)"; ctx.font="14px sans-serif"; ctx.fillText("GET READY...",W/2,H/2+92);
    }
    ctx.restore();
  }

  //
  function drawLevelComplete(ctx: CanvasRenderingContext2D, level: number) {
    ctx.fillStyle="rgba(0,0,0,0.75)"; ctx.fillRect(0,0,W,H);
    ctx.fillStyle="#4ade80"; ctx.font="bold 40px sans-serif"; ctx.textAlign="center";
    ctx.fillText("✅ LEVEL CLEAR!",W/2,H/2-44);
    ctx.fillStyle=BRAND_GOLD; ctx.font="bold 17px sans-serif"; ctx.fillText(LEVELS[level-1].name,W/2,H/2-8);
    ctx.fillStyle="#fff"; ctx.font="13px sans-serif";
    if (level<4) {
      ctx.fillText(`Next: Level ${level+1} — ${LEVELS[level].name}`,W/2,H/2+20);
      ctx.fillStyle="rgba(255,255,255,0.6)"; ctx.font="italic 11px sans-serif";
      ctx.fillText(`"${LEVELS[level].tagline}"`,W/2,H/2+40);
    } else {
      ctx.fillText("You beat the game! 🎉 Claim your reward!",W/2,H/2+20);
    }
    ctx.fillStyle=BRAND_RED; ctx.beginPath(); ctx.roundRect(W/2-100,H/2+58,200,48,10); ctx.fill();
    ctx.strokeStyle=BRAND_GOLD; ctx.lineWidth=2; ctx.beginPath(); ctx.roundRect(W/2-100,H/2+58,200,48,10); ctx.stroke();
    ctx.fillStyle="#fff"; ctx.font="bold 18px sans-serif";
    ctx.fillText(level<4?"▶  NEXT LEVEL":"🎉  CLAIM REWARD",W/2,H/2+89);
  }

  //
  function drawCelebration(ctx: CanvasRenderingContext2D, timer: number) {
    const progress = 1 - timer / CELEB_DURATION; // 0→1 as animation plays
    // Grass background
    for (let i=0;i<LANE_COUNT;i++) {
      ctx.fillStyle = i%2===0?"#3a8c3a":"#358035";
      ctx.fillRect(0,i*LANE_H,W,LANE_H);
    }
    ctx.fillStyle="rgba(0,0,0,0.45)"; ctx.fillRect(0,0,W,H);

    // Zoom level: starts at 1, zooms to 2.5 centered on mower
    const zoom = 1 + progress * 1.5;
    const cx = W/2 - 30;
    const cy = H/2 + 20;

    ctx.save();
    ctx.translate(cx, cy);
    ctx.scale(zoom, zoom);
    ctx.translate(-cx, -cy);

    // Draw the player (mower + operator) at center
    drawPlayer(ctx, Math.floor(progress * 60), false, 1, cx - 24, cy);

    // Brow wipe arm — appears after 40% of animation
    if (progress > 0.4) {
      const wipeAlpha = Math.min(1, (progress - 0.4) / 0.3);
      ctx.save();
      ctx.globalAlpha = wipeAlpha;
      ctx.translate(cx + 24, cy - 38);
      // Arm raised to forehead
      ctx.strokeStyle = NAL_RED; ctx.lineWidth = 7; ctx.lineCap = "round";
      ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(16, -14); ctx.stroke();
      // Glove at forehead
      ctx.fillStyle = "#f59e0b";
      ctx.beginPath(); ctx.arc(16, -14, 6, 0, Math.PI*2); ctx.fill();
      // Sweat drops
      if (progress > 0.6) {
        ctx.fillStyle = "rgba(147,197,253,0.9)";
        ctx.beginPath(); ctx.arc(26, -8, 3, 0, Math.PI*2); ctx.fill();
        ctx.beginPath(); ctx.arc(30, -2, 2, 0, Math.PI*2); ctx.fill();
        ctx.beginPath(); ctx.arc(22, -4, 2.5, 0, Math.PI*2); ctx.fill();
      }
      ctx.restore();
    }
    ctx.restore();

    // Text overlay
    if (progress > 0.55) {
      const ta = Math.min(1, (progress-0.55)/0.2);
      ctx.save(); ctx.globalAlpha = ta;
      ctx.fillStyle = BRAND_GOLD; ctx.font = "bold 28px sans-serif"; ctx.textAlign = "center";
      ctx.fillText("ALL 4 LEVELS DONE!", W/2, 52);
      ctx.fillStyle = "#fff"; ctx.font = "16px sans-serif";
      ctx.fillText("Sterling is proud. Probably.", W/2, 78);
      ctx.restore();
    }

    // "TAP TO CONTINUE" pulse at end
    if (progress > 0.82) {
      const pa = Math.abs(Math.sin(timer * 0.15));
      ctx.save(); ctx.globalAlpha = pa;
      ctx.fillStyle = BRAND_GREEN; ctx.beginPath(); ctx.roundRect(W/2-120, H-68, 240, 46, 10); ctx.fill();
      ctx.strokeStyle = BRAND_GOLD; ctx.lineWidth = 2; ctx.beginPath(); ctx.roundRect(W/2-120, H-68, 240, 46, 10); ctx.stroke();
      ctx.fillStyle = "#fff"; ctx.font = "bold 18px sans-serif"; ctx.textAlign = "center";
      ctx.fillText("TAP TO CLAIM REWARD!", W/2, H-39);
      ctx.restore();
    }
  }

  //
  function drawDoubleOrNothing(ctx: CanvasRenderingContext2D, frame: number) {
    ctx.fillStyle = "rgba(0,0,0,0.88)"; ctx.fillRect(0,0,W,H);
    // Pulsing gold border
    const pulse = 0.7 + Math.sin(frame*0.08)*0.3;
    ctx.strokeStyle = BRAND_GOLD; ctx.lineWidth = 3*pulse;
    ctx.beginPath(); ctx.roundRect(8,8,W-16,H-16,12); ctx.stroke();

    ctx.fillStyle = BRAND_RED; ctx.beginPath(); ctx.roundRect(W/2-160,12,320,36,8); ctx.fill();
    ctx.fillStyle = BRAND_GOLD; ctx.font = "bold 11px sans-serif"; ctx.textAlign = "center";
    ctx.fillText("NEWPORT AVENUE LANDSCAPING", W/2, 28);
    ctx.fillStyle = "#fff"; ctx.font = "bold 13px sans-serif"; ctx.fillText("🌿 LAWN MOWER DASH", W/2, 42);

    ctx.fillStyle = "#fbbf24"; ctx.font = "bold 32px sans-serif"; ctx.textAlign = "center";
    ctx.fillText("💰 DOUBLE OR NOTHING? 💰", W/2, 90);

    ctx.fillStyle = "#fff"; ctx.font = "16px sans-serif";
    ctx.fillText("You earned $100 off. But are you feeling lucky?", W/2, 118);

    // The offer
    ctx.fillStyle = "rgba(255,255,255,0.08)"; ctx.beginPath(); ctx.roundRect(W/2-200,130,400,60,10); ctx.fill();
    ctx.strokeStyle = BRAND_GOLD; ctx.lineWidth = 1; ctx.beginPath(); ctx.roundRect(W/2-200,130,400,60,10); ctx.stroke();
    ctx.fillStyle = BRAND_GOLD; ctx.font = "bold 14px sans-serif"; ctx.textAlign = "center";
    ctx.fillText("Face Giant Sterling in a 1-on-1 showdown.", W/2, 152);
    ctx.fillStyle = "#4ade80"; ctx.font = "bold 13px sans-serif";
    ctx.fillText("WIN → $200 off your next service", W/2, 172);
    ctx.fillStyle = "#f87171"; ctx.font = "13px sans-serif";
    ctx.fillText("LOSE → still keep your $100 code 😅", W/2, 186);

    // Warning
    ctx.fillStyle = "rgba(239,68,68,0.85)"; ctx.beginPath(); ctx.roundRect(W/2-160,196,320,26,6); ctx.fill();
    ctx.fillStyle = "#fff"; ctx.font = "bold 11px sans-serif"; ctx.textAlign = "center";
    ctx.fillText("⚠️  Sterling has NEVER been beaten. Good luck.", W/2, 213);

    // YES button
    ctx.fillStyle = BRAND_RED; ctx.beginPath(); ctx.roundRect(W/2-180,232,160,44,10); ctx.fill();
    ctx.strokeStyle = BRAND_GOLD; ctx.lineWidth = 2; ctx.beginPath(); ctx.roundRect(W/2-180,232,160,44,10); ctx.stroke();
    ctx.fillStyle = "#fff"; ctx.font = "bold 16px sans-serif"; ctx.textAlign = "center";
    ctx.fillText("⚔️  FIGHT STERLING", W/2-100, 259);

    // NO button
    ctx.fillStyle = BRAND_GREEN; ctx.beginPath(); ctx.roundRect(W/2+20,232,160,44,10); ctx.fill();
    ctx.strokeStyle = BRAND_GOLD; ctx.lineWidth = 2; ctx.beginPath(); ctx.roundRect(W/2+20,232,160,44,10); ctx.stroke();
    ctx.fillStyle = "#fff"; ctx.font = "bold 16px sans-serif"; ctx.textAlign = "center";
    ctx.fillText("💰 TAKE $100", W/2+100, 259);

    ctx.fillStyle = "rgba(255,255,255,0.35)"; ctx.font = "italic 10px sans-serif"; ctx.textAlign = "center";
    ctx.fillText("Odds of beating Sterling: classified. Rumored to be 1 in 500.", W/2, 292);
    ctx.fillText("(Sterling has been mowing since 1987. He does not lose.)", W/2, 306);
  }

  //
  function drawBossFight(ctx: CanvasRenderingContext2D, frame: number) {
    // Dramatic red sky background
    const grad = ctx.createLinearGradient(0,0,0,H);
    grad.addColorStop(0,"#1a0000"); grad.addColorStop(0.5,"#4a0000"); grad.addColorStop(1,"#1a0000");
    ctx.fillStyle = grad; ctx.fillRect(0,0,W,H);

    // Lightning flashes
    if (frame%45 < 3) {
      ctx.fillStyle = "rgba(255,255,200,0.15)"; ctx.fillRect(0,0,W,H);
    }

    // Dramatic ground
    ctx.fillStyle = "#2d1a00"; ctx.fillRect(0,H*0.72,W,H*0.28);
    ctx.fillStyle = "#3d2a00"; ctx.fillRect(0,H*0.72,W,8);

    // Tiny player mower at bottom left (small, dwarfed)
    ctx.save();
    ctx.translate(80, H*0.72-20);
    ctx.scale(0.7, 0.7);
    drawPlayer(ctx, frame, false, 1, 0, 0);
    ctx.restore();

    //
    const sx = W/2 + 60;
    const sy = H*0.72;
    const bobY = Math.sin(frame*0.04)*6;
    const scale = 3.2;

    ctx.save();
    ctx.translate(sx, sy + bobY);
    ctx.scale(scale, scale);

    // Shadow (massive)
    ctx.fillStyle = "rgba(0,0,0,0.5)";
    ctx.beginPath(); ctx.ellipse(0, 2, 55, 12, 0, 0, Math.PI*2); ctx.fill();

    // Legs (giant dark pants)
    ctx.strokeStyle = "#0f0f1e"; ctx.lineWidth = 16; ctx.lineCap = "round";
    const lswing = Math.sin(frame*0.06)*8;
    ctx.beginPath(); ctx.moveTo(-12,0); ctx.lineTo(-18+lswing,40); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(12,0); ctx.lineTo(18-lswing,40); ctx.stroke();
    // Giant boots
    ctx.fillStyle = "#1a0a00";
    ctx.beginPath(); ctx.ellipse(-18+lswing,44,18,7,0.3,0,Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.ellipse(18-lswing,44,18,7,-0.3,0,Math.PI*2); ctx.fill();

    // Torso — NAL red shirt (GIANT)
    ctx.fillStyle = NAL_RED;
    ctx.beginPath(); ctx.roundRect(-26,-50,52,52,10); ctx.fill();
    // Shirt detail
    ctx.fillStyle = "#a02020";
    ctx.beginPath(); ctx.roundRect(-24,-50,48,14,6); ctx.fill();
    // Big NAL chest patch
    ctx.fillStyle = "#fff";
    ctx.beginPath(); ctx.roundRect(-16,-36,32,18,4); ctx.fill();
    ctx.fillStyle = NAL_RED; ctx.font = "bold 12px sans-serif"; ctx.textAlign = "center";
    ctx.fillText("NAL", 0, -22);
    ctx.fillStyle = BRAND_GOLD; ctx.font = "bold 5px sans-serif";
    ctx.fillText("NEWPORT AVE", 0, -15);
    // Arms (massive)
    ctx.strokeStyle = NAL_RED; ctx.lineWidth = 14; ctx.lineCap = "round";
    const armSwing = Math.sin(frame*0.05)*12;
    ctx.beginPath(); ctx.moveTo(-24,-30); ctx.lineTo(-44,-10+armSwing); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(24,-30); ctx.lineTo(44,-10-armSwing); ctx.stroke();
    // Giant fists (gold gloves)
    ctx.fillStyle = "#f59e0b";
    ctx.beginPath(); ctx.arc(-44,-10+armSwing,12,0,Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.arc(44,-10-armSwing,12,0,Math.PI*2); ctx.fill();
    // Fist knuckle lines
    ctx.strokeStyle = "#d97706"; ctx.lineWidth = 2;
    for (let f=-1;f<=1;f++) {
      ctx.beginPath(); ctx.moveTo(-44+f*4,-14+armSwing); ctx.lineTo(-44+f*4,-6+armSwing); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(44+f*4,-14-armSwing); ctx.lineTo(44+f*4,-6-armSwing); ctx.stroke();
    }

    // Head (giant)
    ctx.fillStyle = "#f5c5a3";
    ctx.beginPath(); ctx.arc(0,-70,28,0,Math.PI*2); ctx.fill();
    // Stern expression — furrowed brow
    ctx.fillStyle = "#3d2b1f";
    ctx.beginPath(); ctx.arc(0,-80,24,Math.PI,0); ctx.fill();
    // Angry eyebrows
    ctx.strokeStyle = "#3d2b1f"; ctx.lineWidth = 4; ctx.lineCap = "round";
    ctx.beginPath(); ctx.moveTo(-18,-74); ctx.lineTo(-8,-68); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(18,-74); ctx.lineTo(8,-68); ctx.stroke();
    // Eyes (intense)
    ctx.fillStyle = "#1a1a2e";
    ctx.beginPath(); ctx.arc(-10,-66,5,0,Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.arc(10,-66,5,0,Math.PI*2); ctx.fill();
    ctx.fillStyle = "#fff";
    ctx.beginPath(); ctx.arc(-8,-67,2,0,Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.arc(12,-67,2,0,Math.PI*2); ctx.fill();
    // Angry mouth
    ctx.strokeStyle = "#8b4513"; ctx.lineWidth = 3;
    ctx.beginPath(); ctx.arc(0,-60,10,Math.PI+0.4,2*Math.PI-0.4); ctx.stroke();
    // Teeth
    ctx.fillStyle = "#fff";
    ctx.beginPath(); ctx.roundRect(-8,-62,6,5,1); ctx.fill();
    ctx.beginPath(); ctx.roundRect(-1,-62,6,5,1); ctx.fill();
    ctx.beginPath(); ctx.roundRect(6,-62,6,5,1); ctx.fill();

    // Giant NAL red cap
    ctx.fillStyle = NAL_RED;
    ctx.beginPath(); ctx.roundRect(-28,-104,56,28,6); ctx.fill();
    ctx.fillStyle = "#a02020";
    ctx.beginPath(); ctx.roundRect(-32,-78,64,8,3); ctx.fill();
    ctx.fillStyle = BRAND_GOLD; ctx.font = "bold 14px sans-serif"; ctx.textAlign = "center";
    ctx.fillText("NAL", 0, -88);
    ctx.fillStyle = BRAND_GOLD;
    ctx.beginPath(); ctx.arc(0,-104,5,0,Math.PI*2); ctx.fill();

    ctx.restore();

    // "YOU'RE FIRED" speech bubble (huge, dramatic)
    const bubbleX = W/2 - 60;
    const bubbleY = 30;
    const bw = 280, bh = 60;
    ctx.fillStyle = "#fff";
    ctx.beginPath(); ctx.roundRect(bubbleX-bw/2, bubbleY, bw, bh, 10); ctx.fill();
    ctx.strokeStyle = BRAND_RED; ctx.lineWidth = 3;
    ctx.beginPath(); ctx.roundRect(bubbleX-bw/2, bubbleY, bw, bh, 10); ctx.stroke();
    // Bubble tail
    ctx.fillStyle = "#fff";
    ctx.beginPath(); ctx.moveTo(bubbleX+40,bubbleY+bh); ctx.lineTo(bubbleX+60,bubbleY+bh+20); ctx.lineTo(bubbleX+20,bubbleY+bh); ctx.closePath(); ctx.fill();
    ctx.strokeStyle = BRAND_RED; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(bubbleX+40,bubbleY+bh); ctx.lineTo(bubbleX+60,bubbleY+bh+20); ctx.lineTo(bubbleX+20,bubbleY+bh); ctx.stroke();

    // Animated text — shake on odd frames
    const shakeX = frame%4<2?2:-2;
    ctx.save(); ctx.translate(shakeX, 0);
    ctx.fillStyle = BRAND_RED; ctx.font = "bold 28px sans-serif"; ctx.textAlign = "center";
    ctx.fillText("YOU'RE FIRED! 🔥", bubbleX, bubbleY+40);
    ctx.restore();

    // Smaller sub-text
    ctx.fillStyle = "#333"; ctx.font = "11px sans-serif"; ctx.textAlign = "center";
    ctx.fillText("(Just kidding. But you still can't beat me.)", bubbleX, bubbleY+56);

    // Player's mower label
    ctx.fillStyle = "#fff"; ctx.font = "bold 9px sans-serif"; ctx.textAlign = "center";
    ctx.fillText("YOU", 80, H*0.72-48);

    // STERLING label
    ctx.fillStyle = BRAND_GOLD; ctx.font = "bold 16px sans-serif"; ctx.textAlign = "center";
    ctx.fillText("STERLING", W/2+60, 22);
    ctx.fillStyle = BRAND_RED; ctx.font = "bold 10px sans-serif";
    ctx.fillText("BOSS", W/2+60, 36);

    // "DECIDING FATE..." spinner
    const dotCount = (Math.floor(frame/15)%4);
    const dots = ".".repeat(dotCount);
    ctx.fillStyle = BRAND_GOLD; ctx.font = "bold 14px sans-serif"; ctx.textAlign = "center";
    ctx.fillText(`Deciding your fate${dots}`, W/2, H-20);
  }

  //
  function drawIdleScreen(ctx: CanvasRenderingContext2D) {
    for (let i=0;i<LANE_COUNT;i++) {
      ctx.fillStyle = i%2===0?"#3a8c3a":"#358035";
      ctx.fillRect(0,i*LANE_H,W,LANE_H);
    }
    ctx.fillStyle = "rgba(0,0,0,0.68)"; ctx.fillRect(0,0,W,H);
    ctx.fillStyle = BRAND_RED; ctx.fillRect(0,0,W,54);
    ctx.strokeStyle = BRAND_GOLD; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(0,54); ctx.lineTo(W,54); ctx.stroke();
    ctx.fillStyle = BRAND_GOLD; ctx.font = "bold 11px sans-serif"; ctx.textAlign = "center";
    ctx.fillText("NEWPORT AVENUE LANDSCAPING", W/2, 17);
    ctx.fillStyle = "#fff"; ctx.font = "bold 26px sans-serif";
    ctx.fillText("🌿  LAWN MOWER DASH", W/2, 44);
    ctx.fillStyle = BRAND_LIGHT; ctx.font = "bold 12px sans-serif";
    ctx.fillText("4 LEVELS OF CENTRAL OREGON CHAOS", W/2, 72);
    const lc = ["#4ade80","#fbbf24","#f97316","#ef4444"];
    const li = ["🌊","📋","🚧","☀️"];
    const ls = ["HOOD","HOA","SITE","DROUGHT"];
    for (let i=0;i<4;i++) {
      const x = W/2-130+i*68;
      ctx.fillStyle = lc[i]+"33";
      ctx.beginPath(); ctx.roundRect(x-22,82,44,44,6); ctx.fill();
      ctx.strokeStyle = lc[i]; ctx.lineWidth = 1.5;
      ctx.beginPath(); ctx.roundRect(x-22,82,44,44,6); ctx.stroke();
      ctx.font = "20px sans-serif"; ctx.textAlign = "center"; ctx.fillText(li[i],x,110);
      ctx.fillStyle = "#fff"; ctx.font = "bold 7px sans-serif"; ctx.fillText(`LVL ${i+1}`,x,122);
      ctx.fillStyle = lc[i]; ctx.font = "6px sans-serif"; ctx.fillText(ls[i],x,132);
    }
    ctx.fillStyle = BRAND_GOLD; ctx.font = "bold 13px sans-serif"; ctx.textAlign = "center";
    ctx.fillText("🏆  Beat all 4 levels → unlock a $100 discount code!", W/2, 154);
    ctx.fillStyle = "rgba(255,255,255,0.45)"; ctx.font = "10px sans-serif";
    ctx.fillText("Dare to face Giant Sterling for $200? Find out inside.", W/2, 168);
    ctx.fillStyle = "rgba(255,255,255,0.6)"; ctx.font = "11px sans-serif";
    ctx.fillText("Tap top/bottom · Swipe up/down · ↑↓ arrow keys", W/2, 186);
    ctx.fillStyle = BRAND_RED;
    ctx.beginPath(); ctx.roundRect(W/2-100,198,200,52,12); ctx.fill();
    ctx.strokeStyle = BRAND_GOLD; ctx.lineWidth = 2.5;
    ctx.beginPath(); ctx.roundRect(W/2-100,198,200,52,12); ctx.stroke();
    ctx.fillStyle = "#fff"; ctx.font = "bold 22px sans-serif"; ctx.textAlign = "center";
    ctx.fillText("▶  TAP TO PLAY", W/2, 230);
    if (highScoreRef.current>0) {
      ctx.fillStyle = BRAND_GOLD; ctx.font = "bold 12px sans-serif";
      ctx.fillText(`🏆 Best: ${highScoreRef.current} ft`, W/2, 268);
    }
  }

  //
  function drawDeadScreen(ctx: CanvasRenderingContext2D, s: number, hs: number, level: number) {
    for (let i=0;i<LANE_COUNT;i++) {
      ctx.fillStyle = i%2===0?"#3a8c3a":"#358035";
      ctx.fillRect(0,i*LANE_H,W,LANE_H);
    }
    ctx.fillStyle = "rgba(0,0,0,0.72)"; ctx.fillRect(0,0,W,H);
    ctx.fillStyle = BRAND_RED; ctx.fillRect(0,0,W,54);
    ctx.strokeStyle = BRAND_GOLD; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(0,54); ctx.lineTo(W,54); ctx.stroke();
    ctx.fillStyle = BRAND_GOLD; ctx.font = "bold 11px sans-serif"; ctx.textAlign = "center";
    ctx.fillText("NEWPORT AVENUE LANDSCAPING", W/2, 17);
    ctx.fillStyle = "#fff"; ctx.font = "bold 22px sans-serif"; ctx.fillText("🌿  LAWN MOWER DASH", W/2, 44);
    const dm = ["SOAKED! 💦","CITED BY THE HOA! 📋","BURIED IN MUD! 🚧","DEHYDRATED! ☀️"];
    const ds = ["The sprinkler got you. Classic.","The HOA wins this round. For now.","Construction chaos: 1, NAL: 0.","The drought inspector got your plates."];
    ctx.fillStyle = "#ef4444"; ctx.font = "bold 28px sans-serif"; ctx.textAlign = "center";
    ctx.fillText(dm[level-1]||"GAME OVER!", W/2, 90);
    ctx.fillStyle = "rgba(255,255,255,0.6)"; ctx.font = "italic 12px sans-serif";
    ctx.fillText(ds[level-1]||"", W/2, 110);
    ctx.fillStyle = "#fff"; ctx.font = "bold 20px sans-serif"; ctx.fillText(`Distance: ${s} ft`, W/2, 136);
    ctx.fillStyle = BRAND_GOLD; ctx.font = "bold 15px sans-serif"; ctx.fillText(`🏆 Best: ${hs} ft`, W/2, 158);
    ctx.fillStyle = BRAND_LIGHT; ctx.font = "13px sans-serif"; ctx.fillText(`Reached Level ${level} — ${LEVELS[level-1].name}`, W/2, 178);
    ctx.fillStyle = BRAND_RED; ctx.beginPath(); ctx.roundRect(W/2-100,196,200,48,10); ctx.fill();
    ctx.strokeStyle = BRAND_GOLD; ctx.lineWidth = 2; ctx.beginPath(); ctx.roundRect(W/2-100,196,200,48,10); ctx.stroke();
    ctx.fillStyle = "#fff"; ctx.font = "bold 18px sans-serif"; ctx.textAlign = "center"; ctx.fillText("🔄  TRY AGAIN", W/2, 225);
    ctx.fillStyle = BRAND_GOLD; ctx.font = "italic 11px sans-serif";
    ctx.fillText("Sterling believes in you. Probably.", W/2, 262);
  }

  //
  function drawBossLostScreen(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = "rgba(0,0,0,0.88)"; ctx.fillRect(0,0,W,H);
    ctx.fillStyle = BRAND_RED; ctx.fillRect(0,0,W,54);
    ctx.strokeStyle = BRAND_GOLD; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(0,54); ctx.lineTo(W,54); ctx.stroke();
    ctx.fillStyle = BRAND_GOLD; ctx.font = "bold 11px sans-serif"; ctx.textAlign = "center";
    ctx.fillText("NEWPORT AVENUE LANDSCAPING", W/2, 17);
    ctx.fillStyle = "#fff"; ctx.font = "bold 22px sans-serif"; ctx.fillText("🌿  LAWN MOWER DASH", W/2, 44);
    ctx.fillStyle = "#f87171"; ctx.font = "bold 28px sans-serif"; ctx.textAlign = "center";
    ctx.fillText("💼 STERLING WINS. AGAIN.", W/2, 88);
    ctx.fillStyle = "rgba(255,255,255,0.7)"; ctx.font = "italic 12px sans-serif";
    ctx.fillText("He's been mowing since 1987. He does not lose.", W/2, 110);
    ctx.fillStyle = "#4ade80"; ctx.font = "bold 15px sans-serif";
    ctx.fillText("BUT — your $100 code is still yours! 🎉", W/2, 140);
    // Code box
    ctx.fillStyle = BRAND_DARK; ctx.beginPath(); ctx.roundRect(W/2-110,152,220,40,8); ctx.fill();
    ctx.strokeStyle = BRAND_GOLD; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.roundRect(W/2-110,152,220,40,8); ctx.stroke();
    ctx.fillStyle = BRAND_GOLD; ctx.font = "bold 24px monospace"; ctx.textAlign = "center";
    ctx.fillText(DISCOUNT_CODE, W/2, 179);
    ctx.fillStyle = "rgba(255,255,255,0.55)"; ctx.font = "10px sans-serif";
    ctx.fillText("One-time use. $100 off any service.", W/2, 204);
    ctx.fillStyle = BRAND_RED; ctx.beginPath(); ctx.roundRect(W/2-100,218,200,46,10); ctx.fill();
    ctx.strokeStyle = BRAND_GOLD; ctx.lineWidth = 2; ctx.beginPath(); ctx.roundRect(W/2-100,218,200,46,10); ctx.stroke();
    ctx.fillStyle = "#fff"; ctx.font = "bold 16px sans-serif"; ctx.textAlign = "center";
    ctx.fillText("🔄  PLAY AGAIN", W/2, 246);
    ctx.fillStyle = BRAND_GOLD; ctx.font = "italic 10px sans-serif";
    ctx.fillText("(Nobody beats Sterling. This is known.)", W/2, 278);
  }

  //
  function drawWonScreen(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = "rgba(0,0,0,0.88)"; ctx.fillRect(0,0,W,H);
    ctx.fillStyle = BRAND_RED; ctx.fillRect(0,0,W,54);
    ctx.strokeStyle = BRAND_GOLD; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(0,54); ctx.lineTo(W,54); ctx.stroke();
    ctx.fillStyle = BRAND_GOLD; ctx.font = "bold 11px sans-serif"; ctx.textAlign = "center";
    ctx.fillText("NEWPORT AVENUE LANDSCAPING", W/2, 17);
    ctx.fillStyle = "#fff"; ctx.font = "bold 22px sans-serif"; ctx.fillText("🌿  LAWN MOWER DASH", W/2, 44);
    ctx.fillStyle = "#fbbf24"; ctx.font = "bold 26px sans-serif"; ctx.textAlign = "center";
    ctx.fillText("🏆 YOU BEAT STERLING!!! 🏆", W/2, 84);
    ctx.fillStyle = "#fff"; ctx.font = "14px sans-serif";
    ctx.fillText("IMPOSSIBLE. Sterling is shook.", W/2, 106);
    ctx.fillStyle = "#4ade80"; ctx.font = "bold 13px sans-serif";
    ctx.fillText("Your $200 off code:", W/2, 132);
    ctx.fillStyle = BRAND_DARK; ctx.beginPath(); ctx.roundRect(W/2-115,140,230,42,8); ctx.fill();
    ctx.strokeStyle = BRAND_GOLD; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.roundRect(W/2-115,140,230,42,8); ctx.stroke();
    ctx.fillStyle = BRAND_GOLD; ctx.font = "bold 26px monospace"; ctx.textAlign = "center";
    ctx.fillText(DOUBLE_CODE, W/2, 168);
    ctx.fillStyle = "rgba(255,255,255,0.55)"; ctx.font = "10px sans-serif";
    ctx.fillText("One-time use. $200 off any service. You earned it.", W/2, 196);
    ctx.fillStyle = "rgba(255,255,255,0.4)"; ctx.font = "italic 10px sans-serif";
    ctx.fillText("(Sterling is currently questioning all his life choices.)", W/2, 210);
    ctx.fillStyle = BRAND_RED; ctx.beginPath(); ctx.roundRect(W/2-100,222,200,46,10); ctx.fill();
    ctx.strokeStyle = BRAND_GOLD; ctx.lineWidth = 2; ctx.beginPath(); ctx.roundRect(W/2-100,222,200,46,10); ctx.stroke();
    ctx.fillStyle = "#fff"; ctx.font = "bold 16px sans-serif"; ctx.textAlign = "center";
    ctx.fillText("🔄  PLAY AGAIN", W/2, 250);
  }

  //
  const gameLoop = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const frame = frameCount.current++;
    const level = levelRef.current;
    const lv = LEVELS[level-1];

    // Level intro
    if (levelIntroTimer.current > 0) {
      drawBackground(ctx, level, frame);
      drawLevelIntro(ctx, level, levelIntroTimer.current);
      levelIntroTimer.current--;
      rafId.current = requestAnimationFrame(gameLoop);
      return;
    }

    // Celebration animation
    if (stateRef.current === "celebration") {
      drawBackground(ctx, 4, frame);
      drawCelebration(ctx, celebTimer.current);
      celebTimer.current--;
      if (celebTimer.current <= 0) {
        // Auto-advance to double or nothing
        stateRef.current = "double_or_nothing";
        setDisplayState("double_or_nothing");
        return;
      }
      rafId.current = requestAnimationFrame(gameLoop);
      return;
    }

    // Boss fight animation
    if (stateRef.current === "boss_fight") {
      drawBossFight(ctx, frame);
      // After 3 seconds (180 frames), decide fate
      if (frame > 180) {
        const playerWins = Math.random() < 0.002; // 1 in 500
        if (playerWins) {
          stateRef.current = "won";
          setWonCode(DOUBLE_CODE);
          setDisplayState("won");
        } else {
          stateRef.current = "boss_lost";
          setWonCode(DISCOUNT_CODE);
          setDisplayState("boss_lost");
        }
        return;
      }
      rafId.current = requestAnimationFrame(gameLoop);
      return;
    }

    if (stateRef.current !== "playing") return;

    // Speed ramp — harder than before
    baseSpeed.current = Math.min(3.6 + distance.current / 6000, 10);
    if (slowTimer.current > 0) { slowTimer.current--; if (slowTimer.current===0) playerSpeedMult.current=1.0; }
    if (fastTimer.current > 0) { fastTimer.current--; if (fastTimer.current===0) playerSpeedMult.current=1.0; }
    if (invincible.current > 0) invincible.current--;
    if (screenShake.current > 0) screenShake.current--;

    const scrollSpeed = baseSpeed.current * playerSpeedMult.current;
    distance.current += scrollSpeed;
    scrollX.current += scrollSpeed;

    playerY.current = lerp(playerY.current, LANE_CENTERS[targetLane.current], 0.18);
    playerLane.current = targetLane.current;

    // Tighter obstacle spacing for harder gameplay
    if (distance.current > nextObstacleDist.current) {
      spawnObstacle(level);
      nextObstacleDist.current = distance.current + rand(120, 260);
    }
    if (distance.current > nextCollectibleDist.current) {
      spawnCollectible(level);
      nextCollectibleDist.current = distance.current + rand(280, 520);
    }

    if (level===1 && PLAYER_X - lastStripeX.current > 28) {
      mowStripes.current.push({ x: PLAYER_X, lane: playerLane.current, dark: stripeToggle.current });
      stripeToggle.current = !stripeToggle.current;
      lastStripeX.current = PLAYER_X;
    }
    for (const s of mowStripes.current) s.x -= scrollSpeed;
    mowStripes.current = mowStripes.current.filter(s => s.x > -30);

    for (const obs of obstacles.current) {
      obs.x -= scrollSpeed;
      if (obs.type==="sprinkler") obs.angle! += obs.arcSpeed!;
      if (obs.type==="skid_steer") obs.x -= (obs.speed||0);
      if (obs.type==="water_inspector" && obs.x < W*0.65) {
        obs.y = lerp(obs.y??LANE_CENTERS[obs.lane], playerY.current, 0.04);
        obs.x -= (obs.speed||0)*0.5;
      }
      if (obs.phase!==undefined) obs.phase += 0.05;
      if (obs.x < PLAYER_X-25 && lastObstaclePassed.current !== obs.id) {
        lastObstaclePassed.current = obs.id;
        combo.current++;
        if (combo.current>=2) spawnPopText(PLAYER_X+30, playerY.current-35, `${combo.current}x COMBO!`, "#fbbf24", 14);
      }
    }
    obstacles.current = obstacles.current.filter(o => o.x > -80);

    for (const col of collectibles.current) {
      col.x -= scrollSpeed;
      if (col.collected) continue;
      const cy = LANE_CENTERS[col.lane];
      const dx = PLAYER_X-col.x, dy = playerY.current-cy;
      if (Math.sqrt(dx*dx+dy*dy) < PLAYER_R+16) {
        col.collected = true;
        if (col.type==="cactus") {
          playerSpeedMult.current=0.45; slowTimer.current=140; fastTimer.current=0;
          spawnParticles(col.x,cy,"#ef4444",12);
          spawnPopText(col.x,cy-25,"OUCH! CACTUS! 🌵","#ef4444",14);
          combo.current=0;
        } else if (col.type==="coffee"||col.type==="hard_hat") {
          playerSpeedMult.current=1.6; fastTimer.current=140; slowTimer.current=0;
          spawnParticles(col.x,cy,"#f59e0b",12);
          spawnPopText(col.x,cy-25,col.type==="coffee"?"CAFFEINATED! ☕":"HARD HAT! 🪖","#f59e0b",13);
        } else if (col.type==="star") {
          spawnParticles(col.x,cy,"#fbbf24",18);
          spawnPopText(col.x,cy-25,"+STAR! ⭐","#fbbf24",15);
          combo.current+=2;
        } else if (col.type==="permit") {
          invincible.current=130;
          spawnParticles(col.x,cy,"#22c55e",16);
          spawnPopText(col.x,cy-25,"PERMIT! INVINCIBLE! 📋","#22c55e",13);
        } else if (col.type==="water_bottle"||col.type==="nal_hose") {
          playerSpeedMult.current=1.4; fastTimer.current=110; slowTimer.current=0;
          spawnParticles(col.x,cy,"#93c5fd",12);
          spawnPopText(col.x,cy-25,col.type==="water_bottle"?"HYDRATED! 💧":"NAL HOSE! 💦","#93c5fd",13);
        } else if (col.type==="nal_sign"||col.type==="nal_flag"||col.type==="leaf_bag") {
          spawnParticles(col.x,cy,BRAND_GOLD,14);
          spawnPopText(col.x,cy-25,"NAL POWER! 🌿",BRAND_GOLD,14);
          combo.current++;
        } else if (col.type==="nal_truck") {
          playerSpeedMult.current=1.8; fastTimer.current=160; slowTimer.current=0;
          spawnParticles(col.x,cy,BRAND_GREEN,18);
          spawnPopText(col.x,cy-25,"NAL TRUCK! TURBO! 🚛",BRAND_GREEN,14);
        }
      }
    }
    collectibles.current = collectibles.current.filter(c => c.x > -40 && !c.collected);

    // Collision
    if (invincible.current===0) {
      for (const obs of obstacles.current) {
        const oy = obs.y!==undefined ? obs.y : LANE_CENTERS[obs.lane];
        const dx = PLAYER_X-obs.x, dy = playerY.current-oy;
        const dist = Math.sqrt(dx*dx+dy*dy);
        let hit = false;
        if (obs.type==="sprinkler") {
          if (dist < obs.arcLen!+PLAYER_R && dist > 10) {
            let diff = Math.atan2(dy,dx)-obs.angle!;
            while (diff>Math.PI) diff-=Math.PI*2;
            while (diff<-Math.PI) diff+=Math.PI*2;
            if (Math.abs(diff) < obs.arcWidth!/2) hit=true;
          }
        } else if (obs.type==="gnome"||obs.type==="hoa_member"||obs.type==="hoa_group"||obs.type==="boulder") {
          if (dist < PLAYER_R+22) hit=true;
        } else if (obs.type==="hoa_sign") {
          if (Math.abs(dx)<30 && Math.abs(dy)<22) hit=true;
        } else if (obs.type==="mud_puddle"||obs.type==="dead_patch") {
          if (Math.abs(dx)<34 && Math.abs(dy)<18) {
            playerSpeedMult.current=0.35; slowTimer.current=110;
            spawnParticles(PLAYER_X,playerY.current,"#92400e",10);
            spawnPopText(PLAYER_X,playerY.current-30,obs.type==="mud_puddle"?"STUCK IN MUD! 🟤":"DEAD GRASS! 🟫","#92400e",13);
            obs.x=-200;
          }
        } else if (obs.type==="fire_ants") {
          if (Math.abs(dx)<22 && Math.abs(dy)<20) {
            playerSpeedMult.current=0.4; slowTimer.current=120;
            spawnParticles(PLAYER_X,playerY.current,"#c2410c",12);
            spawnPopText(PLAYER_X,playerY.current-30,"FIRE ANTS! 🐜","#c2410c",14);
            obs.x=-200;
          }
        } else if (obs.type==="skid_steer"||obs.type==="water_inspector"||obs.type==="tumbleweed") {
          if (dist < PLAYER_R+24) hit=true;
        } else if (obs.type==="cone_row") {
          if (Math.abs(dx)<30 && Math.abs(dy)<20) hit=true;
        }
        if (hit) {
          lives.current--;
          invincible.current=100;
          combo.current=0;
          screenShake.current=14;
          spawnParticles(PLAYER_X,playerY.current,"#3b82f6",22);
          const hm = ["SOAKED! 💦","CITED! 📋","CRUSHED! 🪨","CAUGHT! 🚰"];
          spawnPopText(PLAYER_X,playerY.current-35,hm[level-1]||"HIT!","#ef4444",17);
          if (lives.current<=0) {
            stateRef.current="dead";
            const fs = Math.floor(distance.current/10);
            scoreRef.current=fs; setScore(fs);
            setHighScore(prev => {
              const nh = Math.max(prev,fs); highScoreRef.current=nh;
              try { localStorage.setItem(HIGH_SCORE_KEY,String(nh)); } catch {}
              return nh;
            });
            setDisplayState("dead");
            return;
          }
        }
      }
    }

    // Level complete check
    if (distance.current >= lv.targetDist*10) {
      if (level >= 4) {
        // Start celebration animation
        stateRef.current = "celebration";
        celebTimer.current = CELEB_DURATION;
        frameCount.current = 0;
        rafId.current = requestAnimationFrame(gameLoop);
        return;
      } else {
        stateRef.current = "level_complete";
        setDisplayState("level_complete");
        setCurrentLevel(level);
        return;
      }
    }

    particles.current = particles.current.filter(p => p.life>0);
    for (const p of particles.current) { p.x+=p.vx; p.y+=p.vy; p.vy+=0.1; p.life-=0.022; }
    popTexts.current = popTexts.current.filter(t => t.life>0);
    for (const t of popTexts.current) { t.y-=0.9; t.life-=0.016; }

    ctx.save();
    if (screenShake.current>0) {
      ctx.translate(rand(-3,3)*(screenShake.current/14), rand(-2,2)*(screenShake.current/14));
    }
    drawBackground(ctx, level, frame);
    for (const col of collectibles.current) drawCollectible(ctx, col, frame);
    for (const obs of obstacles.current) drawObstacle(ctx, obs, frame);
    drawPlayer(ctx, frame, invincible.current>0);
    for (const p of particles.current) {
      ctx.save(); ctx.globalAlpha=p.life;
      ctx.beginPath(); ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
      ctx.fillStyle=p.color; ctx.fill(); ctx.restore();
    }
    for (const t of popTexts.current) {
      ctx.save(); ctx.globalAlpha=t.life;
      ctx.font=`bold ${t.size}px sans-serif`; ctx.textAlign="center";
      ctx.fillStyle="#000"; ctx.fillText(t.text,t.x+1,t.y+1);
      ctx.fillStyle=t.color; ctx.fillText(t.text,t.x,t.y);
      ctx.restore();
    }
    drawHUD(ctx, level, distance.current, lv.targetDist);
    ctx.restore();
    setScore(Math.floor(distance.current/10));
    rafId.current = requestAnimationFrame(gameLoop);
  }, [wonCode]);

  //
  const moveUp = useCallback(() => {
    if (stateRef.current!=="playing") return;
    targetLane.current = clamp(targetLane.current-1, 0, LANE_COUNT-1);
  }, []);
  const moveDown = useCallback(() => {
    if (stateRef.current!=="playing") return;
    targetLane.current = clamp(targetLane.current+1, 0, LANE_COUNT-1);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key==="ArrowUp"||e.key==="w"||e.key==="W") { e.preventDefault(); moveUp(); }
      if (e.key==="ArrowDown"||e.key==="s"||e.key==="S") { e.preventDefault(); moveDown(); }
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
    const state = stateRef.current;

    // Celebration: tap to skip to double or nothing
    if (state==="celebration") {
      celebTimer.current = 0;
      stateRef.current = "double_or_nothing";
      setDisplayState("double_or_nothing");
      cancelAnimationFrame(rafId.current);
      return;
    }

    // Double or nothing: tap left half = fight, right half = take $100
    if (state==="double_or_nothing") {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const tapX = e.changedTouches[0].clientX - rect.left;
      const scaleX = W / rect.width;
      const canvasTapX = tapX * scaleX;
      if (canvasTapX < W/2) {
        // Fight Sterling
        stateRef.current = "boss_fight";
        frameCount.current = 0;
        setDisplayState("boss_fight");
        rafId.current = requestAnimationFrame(gameLoop);
      } else {
        // Take $100
        stateRef.current = "boss_lost";
        setWonCode(DISCOUNT_CODE);
        setDisplayState("boss_lost");
      }
      return;
    }

    if (state==="level_complete") {
      const nextLevel = levelRef.current+1;
      resetGame(nextLevel);
      stateRef.current = "playing";
      setDisplayState("playing");
      rafId.current = requestAnimationFrame(gameLoop);
      return;
    }
    if (state==="won"||state==="boss_lost"||state==="dead") {
      startGame(); return;
    }
    if (state!=="playing") { startGame(); return; }
    if (touchStartY.current===null) return;
    const dy = e.changedTouches[0].clientY - touchStartY.current;
    if (Math.abs(dy) < 15) {
      const canvas = canvasRef.current;
      if (canvas) {
        const rect = canvas.getBoundingClientRect();
        const tapY = e.changedTouches[0].clientY - rect.top;
        const tapLane = clamp(Math.floor((tapY/rect.height)*LANE_COUNT), 0, LANE_COUNT-1);
        targetLane.current = tapLane;
      }
    } else if (dy<0) { moveUp(); } else { moveDown(); }
    touchStartY.current = null;
  }, [moveUp, moveDown, gameLoop, resetGame]);

  const startGame = useCallback(() => {
    cancelAnimationFrame(rafId.current);
    resetGame(1);
    stateRef.current = "playing";
    setDisplayState("playing");
    rafId.current = requestAnimationFrame(gameLoop);
  }, [resetGame, gameLoop]);

  useEffect(() => () => cancelAnimationFrame(rafId.current), []);

  const handleCanvasClick = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    const state = stateRef.current;

    if (state==="celebration") {
      celebTimer.current = 0;
      stateRef.current = "double_or_nothing";
      setDisplayState("double_or_nothing");
      cancelAnimationFrame(rafId.current);
      return;
    }

    if (state==="double_or_nothing") {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const tapX = e.clientX - rect.left;
      const scaleX = W / rect.width;
      const canvasTapX = tapX * scaleX;
      if (canvasTapX < W/2) {
        stateRef.current = "boss_fight";
        frameCount.current = 0;
        setDisplayState("boss_fight");
        rafId.current = requestAnimationFrame(gameLoop);
      } else {
        stateRef.current = "boss_lost";
        setWonCode(DISCOUNT_CODE);
        setDisplayState("boss_lost");
      }
      return;
    }

    if (state==="level_complete") {
      const nextLevel = levelRef.current+1;
      resetGame(nextLevel);
      stateRef.current = "playing";
      setDisplayState("playing");
      rafId.current = requestAnimationFrame(gameLoop);
    } else if (state==="won"||state==="boss_lost"||state==="dead") {
      startGame();
    } else if (state!=="playing") {
      startGame();
    }
  }, [startGame, resetGame, gameLoop]);

  // Draw static screens
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    if (displayState==="idle") drawIdleScreen(ctx);
    else if (displayState==="dead") drawDeadScreen(ctx, score, highScore, currentLevel);
    else if (displayState==="won") drawWonScreen(ctx);
    else if (displayState==="boss_lost") drawBossLostScreen(ctx);
    else if (displayState==="level_complete") drawLevelComplete(ctx, currentLevel);
    else if (displayState==="double_or_nothing") {
      // Animate the double or nothing screen
      let f = 0;
      const animate = () => {
        if (stateRef.current!=="double_or_nothing") return;
        drawDoubleOrNothing(ctx, f++);
        rafId.current = requestAnimationFrame(animate);
      };
      cancelAnimationFrame(rafId.current);
      animate();
    }
  }, [displayState, score, highScore, currentLevel]);

  return (
    <>
      <Navbar />
      <div className="min-h-screen" style={{ backgroundColor: "oklch(0.97 0.01 140)", paddingTop: "120px", paddingBottom: "60px" }}>
        <div className="container">
          <div className="text-center mb-8">
            <div className="font-label mb-2 text-xs tracking-widest" style={{ color: BRAND_RED }}>
              🎮 MINI GAME
            </div>
            <h1 className="font-display font-light text-4xl mb-3" style={{ color: "oklch(0.22 0.005 0)" }}>
              Lawn Mower Dash
            </h1>
            <p className="font-body text-sm max-w-lg mx-auto" style={{ color: "oklch(0.45 0.005 30)" }}>
              Push your NAL Exmark Navigator through <strong>4 levels of Central Oregon chaos</strong>.
              Beat all 4 levels to unlock a <strong>$100 discount</strong> — then dare to face
              <strong> Giant Sterling</strong> for $200. Nobody beats Sterling.
            </p>
          </div>

          <div className="flex justify-center gap-3 mb-6 flex-wrap">
            {LEVELS.map((lv, i) => {
              const icons = ["🌊","📋","🚧","☀️"];
              const colors = ["#4ade80","#fbbf24","#f97316","#ef4444"];
              return (
                <div key={lv.id} className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold"
                  style={{ backgroundColor: `${colors[i]}22`, border: `1.5px solid ${colors[i]}`, color: "oklch(0.25 0.005 0)" }}>
                  <span>{icons[i]}</span>
                  <span>Level {lv.id}: {lv.name}</span>
                </div>
              );
            })}
          </div>

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
                  cursor: displayState!=="playing" ? "pointer" : "default",
                  touchAction: "none",
                  userSelect: "none",
                  boxShadow: "0 12px 40px rgba(0,0,0,0.25)",
                  border: `3px solid ${BRAND_RED}`,
                  display: "block",
                }}
              />
            </div>
          </div>

          {/* Code reveal — shown after boss fight or taking $100 */}
          {wonCode && (
            <div className="mt-8 mx-auto max-w-sm text-center p-6 rounded-2xl"
              style={{ backgroundColor: wonCode===DOUBLE_CODE?BRAND_RED:BRAND_GREEN, color: "#fff" }}>
              <div className="text-3xl mb-2">{wonCode===DOUBLE_CODE?"🏆":"🎉"}</div>
              <div className="font-display text-xl font-semibold mb-1">
                {wonCode===DOUBLE_CODE?"You beat Sterling!!":"You beat all 4 levels!"}
              </div>
              <div className="text-xs font-semibold tracking-widest mb-3" style={{ color: BRAND_GOLD }}>
                NEWPORT AVENUE LANDSCAPING
              </div>
              <div className="text-sm mb-3" style={{ color: "rgba(255,255,255,0.8)" }}>
                Your {wonCode===DOUBLE_CODE?"$200":"$100"} off discount code:
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
                Use at checkout on your next service booking.
              </div>
              <div className="text-xs mt-1" style={{ color: "rgba(255,255,255,0.45)" }}>
                One-time use per person. Cannot be combined with other offers.
              </div>
            </div>
          )}

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
