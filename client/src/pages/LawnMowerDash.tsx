/* ============================================================
   LAWN MOWER DASH — Multi-Level Retro Runner
   Newport Avenue Landscaping
   Controls: Tap top/bottom · Swipe · arrow keys
   ============================================================ */
import { useEffect, useRef, useState, useCallback } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const W = 1280;
const H = 720;
const PLAYER_X = 160;
const PLAYER_R = 40;
const LANE_COUNT = 5;
const LANE_H = H / LANE_COUNT;
const LANE_CENTERS = Array.from({ length: LANE_COUNT }, (_, i) => LANE_H * i + LANE_H / 2);

const DISCOUNT_CODE = "MOWMONEY100";
const DOUBLE_CODE   = "MOWMONEY200";
const HIGH_SCORE_KEY = "nal_mower_hs_v4";
const LEADERBOARD_KEY = "nal_mower_lb_v1";
const MAX_LB_ENTRIES = 10;
interface LBEntry { initials: string; score: number; level: number; ts: number; }
function loadLeaderboard(): LBEntry[] {
  try { return JSON.parse(localStorage.getItem(LEADERBOARD_KEY) ?? "[]") || []; } catch { return []; }
}
function saveLeaderboard(lb: LBEntry[]) {
  try { localStorage.setItem(LEADERBOARD_KEY, JSON.stringify(lb)); } catch {}
}
function addToLeaderboard(initials: string, score: number, level: number): { lb: LBEntry[]; rank: number } {
  const lb = loadLeaderboard();
  const entry: LBEntry = { initials: initials.toUpperCase().slice(0,3).padEnd(3,"_"), score, level, ts: Date.now() };
  lb.push(entry);
  lb.sort((a,b) => b.score - a.score);
  const trimmed = lb.slice(0, MAX_LB_ENTRIES);
  const rank = trimmed.findIndex(e => e.ts === entry.ts);
  saveLeaderboard(trimmed);
  return { lb: trimmed, rank };
}

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
type GameState = "idle"|"playing"|"level_complete"|"dead"|"enter_initials"|"celebration"|"double_or_nothing"|"boss_fight"|"won"|"boss_lost";

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
  const [leaderboard, setLeaderboard] = useState<LBEntry[]>(() => loadLeaderboard());
  const [pendingScore, setPendingScore] = useState(0);
  const [pendingLevel, setPendingLevel] = useState(1);
  const [initials, setInitials] = useState("");
  const [newEntryRank, setNewEntryRank] = useState(-1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const gameWrapperRef = useRef<HTMLDivElement>(null);

  // Fullscreen toggle
  const toggleFullscreen = useCallback(() => {
    const el = gameWrapperRef.current;
    if (!el) return;
    if (!document.fullscreenElement) {
      el.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen();
    }
  }, []);

  useEffect(() => {
    const onFSChange = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener("fullscreenchange", onFSChange);
    return () => document.removeEventListener("fullscreenchange", onFSChange);
  }, []);

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
  // Speed boost (hold down)
  const boostHeld     = useRef(false);

  const nextId = () => ++idCounter.current;

  const resetGame = useCallback((level = 1) => {
    playerLane.current = 2; playerY.current = LANE_CENTERS[2]; targetLane.current = 2;
    obstacles.current = []; collectibles.current = []; particles.current = []; popTexts.current = [];
    mowStripes.current = []; distance.current = 0; baseSpeed.current = 3.2;
    playerSpeedMult.current = 1.0; slowTimer.current = 0; fastTimer.current = 0; boostHeld.current = false;
    nextObstacleDist.current = 180; nextCollectibleDist.current = 350;
    scrollX.current = 0; lives.current = 3; invincible.current = 0;
    frameCount.current = 0; scoreRef.current = 0; combo.current = 0;
    lastObstaclePassed.current = -1; levelRef.current = level;
    levelIntroTimer.current = 120; screenShake.current = 0;
    stripeToggle.current = false; lastStripeX.current = PLAYER_X;
    setScore(0); setWonCode(""); setCopied(false); setCurrentLevel(level);
    setInitials(""); setNewEntryRank(-1);
  }, []);

  //
  function spawnObstacle(level: number) {
    const lane = randInt(0, LANE_COUNT - 1);
    const id = nextId();
    if (level === 1) {
      // Real residential hazards: toys, hose, sprinkler, sandbox, lawn chair
      const types1 = ["tricycle","tricycle","soccer_ball","garden_hose","sprinkler","lawn_chair","sandbox"];
      const t = types1[randInt(0, types1.length - 1)];
      obstacles.current.push({ id, x: W + 50, lane, type: t,
        angle: rand(0, Math.PI * 2), arcSpeed: rand(0.022, 0.05) * (Math.random() < 0.5 ? 1 : -1),
        arcWidth: rand(0.5, 1.2), arcLen: rand(50, 85), phase: 0 });
    } else if (level === 2) {
      // HOA hazards: HOA rep with clipboard, measuring tape, angry neighbor, violation sign
      const types = ["hoa_member","hoa_member","hoa_sign","hoa_group","measuring_tape","angry_neighbor"];
      const t = types[randInt(0, types.length - 1)];
      obstacles.current.push({ id, x: W + 50, lane, type: t, phase: 0, speed: rand(0.9, 1.6) });
      if (t === "hoa_group" && lane > 0)
        obstacles.current.push({ id: nextId(), x: W + 80, lane: lane - 1, type: "hoa_member", phase: Math.PI * 0.5, speed: rand(0.9, 1.6) });
    } else if (level === 3) {
      // Real construction site hazards: lumber pile, porta-potty, hard hat on ground, surveyor stake, mud puddle, cone row
      const types = ["lumber_pile","porta_potty","hard_hat_ground","surveyor_stake","mud_puddle","cone_row","cone_row"];
      const t = types[randInt(0, types.length - 1)];
      obstacles.current.push({ id, x: W + 60, lane, type: t, speed: 0 });
    } else {
      // Drought zone: fire ants, dead stump, cracked earth, sprinkler head, tumbleweed
      const types = ["fire_ants","fire_ants","dead_stump","cracked_earth","sprinkler_head","tumbleweed"];
      const t = types[randInt(0, types.length - 1)];
      obstacles.current.push({ id, x: W + 50, lane, type: t, phase: 0, speed: t === "tumbleweed" ? rand(0.6, 1.6) : 0 });
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
    // Tall overgrown grass blades in each lane (the HOA hates this)
    const grassOff = -(scrollX.current % 18);
    for (let lane = 0; lane < LANE_COUNT; lane++) {
      const ly = lane * LANE_H;
      for (let gx = grassOff; gx < W + 18; gx += 18) {
        const seed = (gx * 7 + lane * 31) & 255;
        const h = 22 + (seed % 18);  // tall grass 22-40px
        const lean = ((seed % 7) - 3) * 0.18;
        const shade = lane % 2 === 0 ? "#2d7a2d" : "#267326";
        ctx.strokeStyle = shade; ctx.lineWidth = 2.5; ctx.lineCap = "round";
        ctx.beginPath();
        ctx.moveTo(gx, ly + LANE_H);
        ctx.quadraticCurveTo(gx + lean * h, ly + LANE_H - h * 0.5, gx + lean * h * 1.4, ly + LANE_H - h);
        ctx.stroke();
        // Lighter tip
        ctx.strokeStyle = "#4db84d"; ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(gx + lean * h * 1.2, ly + LANE_H - h * 0.85);
        ctx.lineTo(gx + lean * h * 1.4, ly + LANE_H - h);
        ctx.stroke();
      }
    }
    // HOA notice signs
    const signX = -(scrollX.current % 280) + 220;
    for (let x = signX; x < W + 280; x += 280) {
      // Sign post
      ctx.strokeStyle = "#5c3d1e"; ctx.lineWidth = 3;
      ctx.beginPath(); ctx.moveTo(x+45, 28); ctx.lineTo(x+45, 8); ctx.stroke();
      ctx.fillStyle = "#fff"; ctx.beginPath(); ctx.roundRect(x, 0, 90, 28, 4); ctx.fill();
      ctx.strokeStyle = BRAND_RED; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.roundRect(x, 0, 90, 28, 4); ctx.stroke();
      ctx.fillStyle = BRAND_RED; ctx.font = "bold 7px sans-serif"; ctx.textAlign = "center";
      ctx.fillText("HOA NOTICE", x+45, 12);
      ctx.fillStyle = "#333"; ctx.font = "bold 5.5px sans-serif"; ctx.fillText("NO LOUD NOISES PAST 10", x+45, 23);
      // Tiny perfect house
      ctx.fillStyle = "#f0ead6"; ctx.fillRect(x+100, 2, 50, 22);
      ctx.fillStyle = "#5a3a1a";
      ctx.beginPath(); ctx.moveTo(x+96,2); ctx.lineTo(x+125,-10); ctx.lineTo(x+154,2); ctx.closePath(); ctx.fill();
      ctx.fillStyle = "#b0d4f1"; ctx.fillRect(x+108, 8, 12, 10);
      ctx.strokeStyle = "#fff"; ctx.lineWidth = 0.8; ctx.strokeRect(x+108, 8, 12, 10);
    }
    // Perfectly trimmed hedges (the HOA-approved kind)
    const hedgeX = -(scrollX.current % 60);
    for (let x = hedgeX; x < W + 60; x += 60) {
      ctx.fillStyle = "#1a5c1a";
      ctx.fillRect(x, 0, 18, 14);
      ctx.fillRect(x+20, 0, 18, 14);
      ctx.fillRect(x+40, 0, 18, 14);
      ctx.fillStyle = "#2d7a2d";
      ctx.fillRect(x, 0, 18, 10);
      ctx.fillRect(x+20, 0, 18, 10);
      ctx.fillRect(x+40, 0, 18, 10);
      ctx.fillStyle = "#4db84d";
      ctx.fillRect(x, 0, 18, 3);
      ctx.fillRect(x+20, 0, 18, 3);
      ctx.fillRect(x+40, 0, 18, 3);
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

    // No walking — operator is seated, slight mower bounce only
    const bounce = Math.abs(Math.sin(frame * 0.15)) * -1.5;
    ctx.translate(0, bounce);
    // Flip so mower faces RIGHT (direction of travel)
    ctx.scale(-1, 1);
    ctx.translate(-50, 0);  // re-center after flip (mower is ~50px wide)

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
    // Seated legs (bent at knee, no swing — operator is sitting on the mower)
    ctx.strokeStyle = "#1a1a2e"; ctx.lineWidth = 8; ctx.lineCap = "round";
    // Left thigh (horizontal, going left from seat)
    ctx.beginPath(); ctx.moveTo(22, 4); ctx.lineTo(10, 4); ctx.stroke();
    // Left shin (drops down from knee)
    ctx.beginPath(); ctx.moveTo(10, 4); ctx.lineTo(10, 18); ctx.stroke();
    // Right thigh (horizontal, going right from seat)
    ctx.beginPath(); ctx.moveTo(28, 4); ctx.lineTo(40, 4); ctx.stroke();
    // Right shin (drops down from knee)
    ctx.beginPath(); ctx.moveTo(40, 4); ctx.lineTo(40, 18); ctx.stroke();
    // Work boots (flat on footrest)
    ctx.fillStyle = "#3d2b1f";
    ctx.beginPath(); ctx.ellipse(10, 20, 9, 4, 0, 0, Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.ellipse(40, 20, 9, 4, 0, 0, Math.PI*2); ctx.fill();
    // Boot laces
    ctx.strokeStyle = "#f5c5a3"; ctx.lineWidth = 0.8;
    ctx.beginPath(); ctx.moveTo(7, 19); ctx.lineTo(13, 19); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(37, 19); ctx.lineTo(43, 19); ctx.stroke();

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
      // Rotating sprinkler with water arc
      ctx.fillStyle = "#475569"; ctx.beginPath(); ctx.arc(0,0,14,0,Math.PI*2); ctx.fill();
      ctx.fillStyle = "#64748b"; ctx.beginPath(); ctx.arc(0,0,9,0,Math.PI*2); ctx.fill();
      ctx.fillStyle = BRAND_GREEN; ctx.beginPath(); ctx.arc(0,0,6,0,Math.PI*2); ctx.fill();
      ctx.save(); ctx.rotate(obs.angle!);
      ctx.strokeStyle = "rgba(59,130,246,0.9)"; ctx.lineWidth = 5.5; ctx.lineCap = "round";
      ctx.beginPath(); ctx.arc(0,0,obs.arcLen!,-obs.arcWidth!/2,obs.arcWidth!/2); ctx.stroke();
      ctx.fillStyle = "rgba(147,197,253,0.95)";
      for (let i=0;i<9;i++) {
        const a = -obs.arcWidth!/2+(obs.arcWidth!/8)*i, r=obs.arcLen!+rand(-5,5);
        ctx.beginPath(); ctx.arc(Math.cos(a)*r,Math.sin(a)*r,4,0,Math.PI*2); ctx.fill();
      }
      ctx.restore();
      ctx.fillStyle = "rgba(186,230,253,0.25)";
      ctx.beginPath(); ctx.arc(0,0,obs.arcLen!+14,obs.angle!-obs.arcWidth!/2,obs.angle!+obs.arcWidth!/2);
      ctx.lineTo(0,0); ctx.closePath(); ctx.fill();

    } else if (obs.type === "tricycle") {
      // Kid's red tricycle
      ctx.fillStyle = "rgba(0,0,0,0.18)"; ctx.beginPath(); ctx.ellipse(0,24,28,6,0,0,Math.PI*2); ctx.fill();
      // Frame
      ctx.strokeStyle = "#dc2626"; ctx.lineWidth = 5; ctx.lineCap = "round";
      ctx.beginPath(); ctx.moveTo(-18,12); ctx.lineTo(0,0); ctx.lineTo(18,12); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(0,0); ctx.lineTo(0,-14); ctx.stroke();
      // Handlebars
      ctx.strokeStyle = "#1a1a1a"; ctx.lineWidth = 4;
      ctx.beginPath(); ctx.moveTo(-12,-14); ctx.lineTo(12,-14); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(-12,-14); ctx.lineTo(-12,-18); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(12,-14); ctx.lineTo(12,-18); ctx.stroke();
      // Seat
      ctx.fillStyle = "#1a1a1a"; ctx.beginPath(); ctx.roundRect(-8,-2,16,5,2); ctx.fill();
      // Front big wheel
      ctx.strokeStyle = "#1a1a1a"; ctx.lineWidth = 5;
      ctx.beginPath(); ctx.arc(0,18,14,0,Math.PI*2); ctx.stroke();
      ctx.strokeStyle = "#374151"; ctx.lineWidth = 2;
      for (let a=0;a<Math.PI*2;a+=Math.PI/4) { ctx.beginPath(); ctx.moveTo(0,18); ctx.lineTo(Math.cos(a)*14,18+Math.sin(a)*14); ctx.stroke(); }
      ctx.fillStyle = "#dc2626"; ctx.beginPath(); ctx.arc(0,18,4,0,Math.PI*2); ctx.fill();
      // Two back small wheels
      ctx.strokeStyle = "#1a1a1a"; ctx.lineWidth = 4;
      ctx.beginPath(); ctx.arc(-18,18,9,0,Math.PI*2); ctx.stroke();
      ctx.beginPath(); ctx.arc(18,18,9,0,Math.PI*2); ctx.stroke();
      ctx.fillStyle = "#dc2626"; ctx.beginPath(); ctx.arc(-18,18,3,0,Math.PI*2); ctx.fill();
      ctx.beginPath(); ctx.arc(18,18,3,0,Math.PI*2); ctx.fill();
      // Speech bubble
      if (Math.floor(frame/40)%2===0) {
        ctx.fillStyle="#fff"; ctx.beginPath(); ctx.roundRect(-30,-44,60,18,4); ctx.fill();
        ctx.strokeStyle="#dc2626"; ctx.lineWidth=2; ctx.strokeRect(-30,-44,60,18);
        ctx.fillStyle="#dc2626"; ctx.font="bold 9px sans-serif"; ctx.textAlign="center";
        ctx.fillText("MY BIKE!",0,-31);
      }

    } else if (obs.type === "soccer_ball") {
      // Rolling soccer ball
      ctx.save(); ctx.rotate(frame*0.12);
      ctx.fillStyle = "#fff"; ctx.beginPath(); ctx.arc(0,0,20,0,Math.PI*2); ctx.fill();
      ctx.strokeStyle = "#1a1a1a"; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.arc(0,0,20,0,Math.PI*2); ctx.stroke();
      // Pentagon patches
      ctx.fillStyle = "#1a1a1a";
      for (let i=0;i<5;i++) {
        const a=i*Math.PI*2/5-Math.PI/2;
        ctx.beginPath(); ctx.arc(Math.cos(a)*10,Math.sin(a)*10,5,0,Math.PI*2); ctx.fill();
      }
      ctx.beginPath(); ctx.arc(0,0,5,0,Math.PI*2); ctx.fill();
      ctx.restore();
      ctx.fillStyle = "rgba(0,0,0,0.18)"; ctx.beginPath(); ctx.ellipse(0,22,20,5,0,0,Math.PI*2); ctx.fill();

    } else if (obs.type === "garden_hose") {
      // Coiled garden hose
      ctx.strokeStyle = "#16a34a"; ctx.lineWidth = 7; ctx.lineCap = "round";
      for (let i=0;i<3;i++) { ctx.beginPath(); ctx.arc(0,0,12+i*9,0,Math.PI*1.75); ctx.stroke(); }
      ctx.strokeStyle = "#15803d"; ctx.lineWidth = 5;
      for (let i=0;i<3;i++) { ctx.beginPath(); ctx.arc(0,0,12+i*9,0,Math.PI*1.75); ctx.stroke(); }
      // Nozzle
      ctx.fillStyle = "#d97706"; ctx.beginPath(); ctx.roundRect(22,-4,14,8,3); ctx.fill();
      ctx.fillStyle = "#b45309"; ctx.beginPath(); ctx.roundRect(34,-3,6,6,1); ctx.fill();
      // Water drip
      if (frame%16<8) { ctx.fillStyle="rgba(59,130,246,0.8)"; ctx.beginPath(); ctx.arc(40,6,3,0,Math.PI*2); ctx.fill(); }

    } else if (obs.type === "lawn_chair") {
      // Folding lawn chair
      ctx.fillStyle = "rgba(0,0,0,0.18)"; ctx.beginPath(); ctx.ellipse(0,26,26,6,0,0,Math.PI*2); ctx.fill();
      // Back legs
      ctx.strokeStyle = "#d97706"; ctx.lineWidth = 4; ctx.lineCap = "round";
      ctx.beginPath(); ctx.moveTo(-16,-12); ctx.lineTo(-20,24); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(16,-12); ctx.lineTo(20,24); ctx.stroke();
      // Front legs
      ctx.beginPath(); ctx.moveTo(-14,2); ctx.lineTo(-10,24); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(14,2); ctx.lineTo(10,24); ctx.stroke();
      // Seat straps (alternating colors)
      const sc = ["#ef4444","#3b82f6","#fbbf24","#22c55e","#a855f7"];
      for (let i=0;i<5;i++) {
        ctx.fillStyle=sc[i]; ctx.fillRect(-18,4+i*4,36,3);
      }
      // Back straps
      for (let i=0;i<4;i++) {
        ctx.fillStyle=sc[i]; ctx.fillRect(-16,-10+i*4,32,3);
      }

    } else if (obs.type === "sandbox") {
      // Sandbox with toys in it
      ctx.fillStyle = "#f59e0b"; ctx.beginPath(); ctx.roundRect(-28,-14,56,30,4); ctx.fill();
      ctx.strokeStyle = "#d97706"; ctx.lineWidth = 3; ctx.strokeRect(-28,-14,56,30);
      // Sand texture
      ctx.fillStyle = "#fbbf24";
      ctx.beginPath(); ctx.roundRect(-25,-11,50,24,3); ctx.fill();
      // Tiny shovel
      ctx.strokeStyle = "#dc2626"; ctx.lineWidth = 3;
      ctx.beginPath(); ctx.moveTo(-10,-8); ctx.lineTo(-10,8); ctx.stroke();
      ctx.fillStyle = "#dc2626"; ctx.beginPath(); ctx.ellipse(-10,10,5,4,0,0,Math.PI*2); ctx.fill();
      // Tiny bucket
      ctx.fillStyle = "#3b82f6"; ctx.beginPath(); ctx.roundRect(4,-6,12,14,2); ctx.fill();
      ctx.strokeStyle = "#2563eb"; ctx.lineWidth = 1.5; ctx.strokeRect(4,-6,12,14);
      // "KIDS" label
      ctx.fillStyle = "#d97706"; ctx.font = "bold 8px sans-serif"; ctx.textAlign = "center";
      ctx.fillText("SANDBOX",0,22);

    } else if (obs.type === "gnome") {
      // Retro Bowl-style chunky pixel gnome
      ctx.fillStyle = "rgba(0,0,0,0.25)"; ctx.beginPath(); ctx.ellipse(2,26,16,5,0,0,Math.PI*2); ctx.fill();
      // Boots (big chunky)
      ctx.fillStyle = "#1a0a00";
      ctx.fillRect(-12, 16, 10, 10);
      ctx.fillRect(2, 16, 10, 10);
      ctx.fillStyle = "#3d1a00";
      ctx.fillRect(-12, 16, 10, 4);
      ctx.fillRect(2, 16, 10, 4);
      // Body (red coat, thick outline)
      ctx.fillStyle = "#cc0000";
      ctx.fillRect(-11, -8, 22, 26);
      ctx.strokeStyle = "#660000"; ctx.lineWidth = 2; ctx.strokeRect(-11, -8, 22, 26);
      // White beard (big block)
      ctx.fillStyle = "#f0f0f0";
      ctx.fillRect(-9, 4, 18, 14);
      ctx.strokeStyle = "#ccc"; ctx.lineWidth = 1; ctx.strokeRect(-9, 4, 18, 14);
      // Belt
      ctx.fillStyle = "#1a1a00";
      ctx.fillRect(-11, 2, 22, 5);
      ctx.fillStyle = "#f5c518";
      ctx.fillRect(-4, 3, 8, 4);
      // Head (skin, big)
      ctx.fillStyle = "#f5c5a3";
      ctx.fillRect(-9, -22, 18, 16);
      ctx.strokeStyle = "#c97b5a"; ctx.lineWidth = 2; ctx.strokeRect(-9, -22, 18, 16);
      // Eyes (pixel dots)
      ctx.fillStyle = "#1a1a2e";
      ctx.fillRect(-6, -19, 4, 4);
      ctx.fillRect(2, -19, 4, 4);
      // Rosy cheeks
      ctx.fillStyle = "rgba(220,80,80,0.5)";
      ctx.fillRect(-9, -14, 5, 4);
      ctx.fillRect(4, -14, 5, 4);
      // Hat (tall pointy red, chunky)
      ctx.fillStyle = "#cc0000";
      ctx.fillRect(-8, -38, 16, 18);
      ctx.strokeStyle = "#660000"; ctx.lineWidth = 2; ctx.strokeRect(-8, -38, 16, 18);
      // Hat brim
      ctx.fillStyle = "#cc0000";
      ctx.fillRect(-12, -22, 24, 4);
      ctx.strokeStyle = "#660000"; ctx.lineWidth = 1.5; ctx.strokeRect(-12, -22, 24, 4);
      // Hat tip
      ctx.fillStyle = "#cc0000";
      ctx.beginPath(); ctx.moveTo(-2, -38); ctx.lineTo(2, -38); ctx.lineTo(0, -50); ctx.closePath(); ctx.fill();
      ctx.strokeStyle = "#660000"; ctx.lineWidth = 1.5; ctx.stroke();
      // Arms (chunky)
      ctx.fillStyle = "#cc0000";
      ctx.fillRect(-18, -6, 8, 14);
      ctx.fillRect(10, -6, 8, 14);
      ctx.strokeStyle = "#660000"; ctx.lineWidth = 1.5;
      ctx.strokeRect(-18, -6, 8, 14);
      ctx.strokeRect(10, -6, 8, 14);
      // Fists (skin)
      ctx.fillStyle = "#f5c5a3";
      ctx.fillRect(-19, 6, 9, 8);
      ctx.fillRect(10, 6, 9, 8);
      ctx.strokeStyle = "#c97b5a"; ctx.lineWidth = 1;
      ctx.strokeRect(-19, 6, 9, 8);
      ctx.strokeRect(10, 6, 9, 8);
      // Speech bubble
      if (Math.floor(frame/35)%2===0) {
        ctx.fillStyle = "#fff"; ctx.beginPath(); ctx.roundRect(10,-52,56,18,4); ctx.fill();
        ctx.strokeStyle = "#cc0000"; ctx.lineWidth = 2; ctx.beginPath(); ctx.roundRect(10,-52,56,18,4); ctx.stroke();
        // Bubble tail
        ctx.fillStyle = "#fff";
        ctx.beginPath(); ctx.moveTo(14,-34); ctx.lineTo(20,-34); ctx.lineTo(14,-28); ctx.closePath(); ctx.fill();
        ctx.fillStyle = "#cc0000"; ctx.font = "bold 8px sans-serif"; ctx.textAlign = "center";
        ctx.fillText("MY LAWN!", 38,-40);
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
      ctx.fillText("NO",6,-3); ctx.fillText("LOUD",6,2);
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
      const msgs = ["VIOLATION!","TOO LOUD!","CALL MY LAWYER!","RULE #312!","UNACCEPTABLE!"];
      if (Math.floor(frame/28)%2===0) {
        const msg = msgs[Math.floor(frame/90)%msgs.length];
        const bw = msg.length*5+12;
        ctx.fillStyle = "#fff"; ctx.beginPath(); ctx.roundRect(14,-46,bw,16,4); ctx.fill();
        ctx.strokeStyle = BRAND_RED; ctx.lineWidth = 1; ctx.strokeRect(14,-46,bw,16);
        ctx.fillStyle = BRAND_RED; ctx.font = "bold 6px sans-serif"; ctx.textAlign = "center";
        ctx.fillText(msg, 14+bw/2,-35);
      }

    } else if (obs.type === "measuring_tape") {
      // HOA rep measuring the lawn with a tape measure
      ctx.fillStyle = "rgba(0,0,0,0.18)"; ctx.beginPath(); ctx.ellipse(0,24,18,5,0,0,Math.PI*2); ctx.fill();
      // Body (khaki HOA outfit)
      ctx.fillStyle = "#c8a84b"; ctx.beginPath(); ctx.roundRect(-10,-14,20,24,4); ctx.fill();
      ctx.strokeStyle = "#a07830"; ctx.lineWidth = 1.5; ctx.strokeRect(-10,-14,20,24);
      // HOA badge
      ctx.fillStyle = BRAND_RED; ctx.beginPath(); ctx.roundRect(-6,-12,12,8,2); ctx.fill();
      ctx.fillStyle = "#fff"; ctx.font = "bold 5px sans-serif"; ctx.textAlign = "center"; ctx.fillText("HOA",0,-7);
      // Head
      ctx.fillStyle = "#f5c5a3"; ctx.beginPath(); ctx.arc(0,-22,11,0,Math.PI*2); ctx.fill();
      ctx.strokeStyle = "#c97b5a"; ctx.lineWidth = 1.5; ctx.strokeRect(-11,-33,22,22);
      // Hat
      ctx.fillStyle = "#c8a84b"; ctx.beginPath(); ctx.roundRect(-12,-34,24,6,2); ctx.fill();
      ctx.fillStyle = "#a07830"; ctx.beginPath(); ctx.roundRect(-9,-40,18,10,2); ctx.fill();
      // Measuring tape (yellow reel)
      ctx.fillStyle = "#fbbf24"; ctx.beginPath(); ctx.arc(16,-4,10,0,Math.PI*2); ctx.fill();
      ctx.strokeStyle = "#d97706"; ctx.lineWidth = 2; ctx.strokeRect(6,-14,20,20);
      ctx.fillStyle = "#d97706"; ctx.font = "bold 5px sans-serif"; ctx.textAlign = "center"; ctx.fillText("25ft",16,-2);
      // Tape extending out
      ctx.strokeStyle = "#fbbf24"; ctx.lineWidth = 3;
      ctx.beginPath(); ctx.moveTo(-10,-4); ctx.lineTo(-30,-4); ctx.stroke();
      // Tick marks on tape
      ctx.strokeStyle = "#d97706"; ctx.lineWidth = 1;
      for (let i=0;i<4;i++) { ctx.beginPath(); ctx.moveTo(-14-i*5,-4); ctx.lineTo(-14-i*5,-8); ctx.stroke(); }
      // Speech bubble
      if (Math.floor(frame/30)%2===0) {
        ctx.fillStyle="#fff"; ctx.beginPath(); ctx.roundRect(-50,-54,60,18,4); ctx.fill();
        ctx.strokeStyle=BRAND_RED; ctx.lineWidth=2; ctx.strokeRect(-50,-54,60,18);
        ctx.fillStyle=BRAND_RED; ctx.font="bold 8px sans-serif"; ctx.textAlign="center";
        ctx.fillText("TOO LONG!",-20,-41);
      }

    } else if (obs.type === "angry_neighbor") {
      // Angry neighbor in bathrobe shaking fist
      const shake = Math.sin(frame*0.4)*3;
      ctx.fillStyle = "rgba(0,0,0,0.18)"; ctx.beginPath(); ctx.ellipse(shake,24,16,5,0,0,Math.PI*2); ctx.fill();
      ctx.translate(shake, 0);
      // Bathrobe (blue)
      ctx.fillStyle = "#1e40af"; ctx.beginPath(); ctx.roundRect(-12,-14,24,26,4); ctx.fill();
      ctx.strokeStyle = "#1e3a8a"; ctx.lineWidth = 2; ctx.strokeRect(-12,-14,24,26);
      // Robe lapels
      ctx.fillStyle = "#1e3a8a";
      ctx.beginPath(); ctx.moveTo(-12,-14); ctx.lineTo(0,-2); ctx.lineTo(0,12); ctx.lineTo(-12,12); ctx.closePath(); ctx.fill();
      ctx.beginPath(); ctx.moveTo(12,-14); ctx.lineTo(0,-2); ctx.lineTo(0,12); ctx.lineTo(12,12); ctx.closePath(); ctx.fill();
      // Belt
      ctx.fillStyle = "#93c5fd"; ctx.fillRect(-12,4,24,4);
      // Head
      ctx.fillStyle = "#f5c5a3"; ctx.beginPath(); ctx.arc(0,-22,12,0,Math.PI*2); ctx.fill();
      // Angry face
      ctx.fillStyle = "#1a1a2e"; ctx.beginPath(); ctx.arc(-4,-24,2,0,Math.PI*2); ctx.fill();
      ctx.beginPath(); ctx.arc(4,-24,2,0,Math.PI*2); ctx.fill();
      // Angry eyebrows
      ctx.strokeStyle = "#1a1a2e"; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.moveTo(-7,-28); ctx.lineTo(-1,-26); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(7,-28); ctx.lineTo(1,-26); ctx.stroke();
      // Frowning mouth
      ctx.beginPath(); ctx.arc(0,-18,5,-Math.PI+0.3,0.3-Math.PI*0.5); ctx.stroke();
      // Hair curlers
      ctx.fillStyle = "#fbbf24";
      for (let i=0;i<3;i++) { ctx.beginPath(); ctx.arc(-6+i*6,-32,3,0,Math.PI*2); ctx.fill(); }
      // Raised fist
      ctx.fillStyle = "#f5c5a3"; ctx.beginPath(); ctx.roundRect(10,-28,10,10,3); ctx.fill();
      ctx.strokeStyle = "#c97b5a"; ctx.lineWidth = 1; ctx.strokeRect(10,-28,10,10);
      // Speech bubble
      if (Math.floor(frame/25)%2===0) {
        const msgs2 = ["KEEP IT DOWN!","IT'S 7AM!","CALL THE COPS!","MY ROSES!"];
        const m2 = msgs2[Math.floor(frame/70)%msgs2.length];
        const bw2 = m2.length*6+14;
        ctx.fillStyle="#fff"; ctx.beginPath(); ctx.roundRect(14,-50,bw2,18,4); ctx.fill();
        ctx.strokeStyle="#1e40af"; ctx.lineWidth=2; ctx.strokeRect(14,-50,bw2,18);
        ctx.fillStyle="#1e40af"; ctx.font="bold 8px sans-serif"; ctx.textAlign="center";
        ctx.fillText(m2,14+bw2/2,-37);
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
      ctx.fillText("NO LOUD",10,-26); ctx.fillText("NOISES PAST 10",10,-15);

    } else if (obs.type === "lumber_pile") {
      // Stack of lumber boards
      ctx.fillStyle = "rgba(0,0,0,0.18)"; ctx.beginPath(); ctx.ellipse(0,22,36,7,0,0,Math.PI*2); ctx.fill();
      const lc = ["#92400e","#78350f","#a16207","#854d0e","#7c2d12"];
      for (let i=4;i>=0;i--) {
        ctx.fillStyle = lc[i%lc.length];
        ctx.beginPath(); ctx.roundRect(-32+i*1,-16+i*-6,64,8,1); ctx.fill();
        ctx.strokeStyle = "rgba(0,0,0,0.3)"; ctx.lineWidth = 1; ctx.strokeRect(-32+i*1,-16+i*-6,64,8);
        // Wood grain lines
        ctx.strokeStyle = "rgba(0,0,0,0.15)"; ctx.lineWidth = 0.8;
        for (let g=0;g<4;g++) { ctx.beginPath(); ctx.moveTo(-28+g*16,-14+i*-6); ctx.lineTo(-28+g*16,-8+i*-6); ctx.stroke(); }
      }
      // Caution tape across pile
      ctx.strokeStyle = "#f59e0b"; ctx.lineWidth = 3;
      ctx.beginPath(); ctx.moveTo(-32,-16); ctx.lineTo(32,4); ctx.stroke();
      ctx.fillStyle = "#f59e0b"; ctx.font = "bold 7px sans-serif"; ctx.textAlign = "center";
      ctx.fillText("CAUTION",0,-2);

    } else if (obs.type === "porta_potty") {
      // Blue porta-potty
      ctx.fillStyle = "rgba(0,0,0,0.18)"; ctx.beginPath(); ctx.ellipse(0,26,22,6,0,0,Math.PI*2); ctx.fill();
      // Main body
      ctx.fillStyle = "#1d4ed8"; ctx.beginPath(); ctx.roundRect(-18,-28,36,52,4); ctx.fill();
      ctx.strokeStyle = "#1e3a8a"; ctx.lineWidth = 2; ctx.strokeRect(-18,-28,36,52);
      // Roof
      ctx.fillStyle = "#1e3a8a"; ctx.beginPath(); ctx.roundRect(-20,-32,40,8,3); ctx.fill();
      // Door
      ctx.fillStyle = "#2563eb"; ctx.beginPath(); ctx.roundRect(-12,-22,24,40,2); ctx.fill();
      ctx.strokeStyle = "#1e3a8a"; ctx.lineWidth = 1; ctx.strokeRect(-12,-22,24,40);
      // Door handle
      ctx.fillStyle = "#fbbf24"; ctx.beginPath(); ctx.arc(8,0,3,0,Math.PI*2); ctx.fill();
      // Vent
      ctx.fillStyle = "#1e3a8a"; ctx.beginPath(); ctx.roundRect(-6,-28,12,6,2); ctx.fill();
      // "WC" sign
      ctx.fillStyle = "#fff"; ctx.font = "bold 9px sans-serif"; ctx.textAlign = "center";
      ctx.fillText("WC",-0,-10);
      // Stink lines
      if (frame%20<10) {
        ctx.strokeStyle = "rgba(100,200,100,0.5)"; ctx.lineWidth = 2;
        ctx.beginPath(); ctx.moveTo(-6,-32); ctx.quadraticCurveTo(-10,-42,-6,-50); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(6,-32); ctx.quadraticCurveTo(10,-42,6,-50); ctx.stroke();
      }

    } else if (obs.type === "hard_hat_ground") {
      // Hard hat left on the ground
      ctx.fillStyle = "rgba(0,0,0,0.18)"; ctx.beginPath(); ctx.ellipse(0,18,22,5,0,0,Math.PI*2); ctx.fill();
      // Hard hat shell
      ctx.fillStyle = "#f59e0b";
      ctx.beginPath(); ctx.arc(0,-4,20,Math.PI,0); ctx.fill();
      ctx.fillStyle = "#d97706"; ctx.beginPath(); ctx.roundRect(-22,-4,44,7,2); ctx.fill();
      ctx.strokeStyle = "#b45309"; ctx.lineWidth = 2; ctx.strokeRect(-22,-4,44,7);
      // NAL logo on hat
      ctx.fillStyle = BRAND_GREEN; ctx.beginPath(); ctx.roundRect(-10,-8,20,10,2); ctx.fill();
      ctx.fillStyle = BRAND_GOLD; ctx.font = "bold 7px sans-serif"; ctx.textAlign = "center";
      ctx.fillText("NAL",0,-1);
      // Suspension inside (visible from side)
      ctx.strokeStyle = "#92400e"; ctx.lineWidth = 1.5;
      ctx.beginPath(); ctx.moveTo(-12,-4); ctx.lineTo(0,-10); ctx.lineTo(12,-4); ctx.stroke();

    } else if (obs.type === "surveyor_stake") {
      // Orange surveyor stake with flagging tape
      ctx.fillStyle = "rgba(0,0,0,0.18)"; ctx.beginPath(); ctx.ellipse(0,20,8,3,0,0,Math.PI*2); ctx.fill();
      // Stake
      ctx.fillStyle = "#f97316"; ctx.beginPath(); ctx.roundRect(-4,-30,8,50,1); ctx.fill();
      ctx.strokeStyle = "#ea580c"; ctx.lineWidth = 1; ctx.strokeRect(-4,-30,8,50);
      // Pointed bottom
      ctx.fillStyle = "#ea580c";
      ctx.beginPath(); ctx.moveTo(-4,20); ctx.lineTo(4,20); ctx.lineTo(0,28); ctx.closePath(); ctx.fill();
      // Orange flagging tape (wavy)
      ctx.strokeStyle = "#f97316"; ctx.lineWidth = 3; ctx.lineCap = "round";
      ctx.beginPath();
      ctx.moveTo(4,-24);
      for (let i=0;i<5;i++) {
        const wx = 4+i*8, wy = -24+Math.sin((i+frame*0.08)*1.2)*6;
        ctx.lineTo(wx,wy);
      }
      ctx.stroke();
      // "SURVEY" text
      ctx.fillStyle = "#fff"; ctx.font = "bold 5px sans-serif"; ctx.textAlign = "center";
      ctx.fillText("SURVEY",0,-14);

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

    } else if (obs.type === "dead_stump") {
      // Dead tree stump
      ctx.fillStyle = "rgba(0,0,0,0.18)"; ctx.beginPath(); ctx.ellipse(0,22,28,7,0,0,Math.PI*2); ctx.fill();
      // Stump base
      ctx.fillStyle = "#78350f"; ctx.beginPath(); ctx.roundRect(-24,0,48,22,3); ctx.fill();
      ctx.strokeStyle = "#451a03"; ctx.lineWidth = 2; ctx.strokeRect(-24,0,48,22);
      // Top of stump (cross section)
      ctx.fillStyle = "#92400e"; ctx.beginPath(); ctx.ellipse(0,0,24,10,0,0,Math.PI*2); ctx.fill();
      ctx.strokeStyle = "#451a03"; ctx.lineWidth = 1.5; ctx.strokeRect(-24,-10,48,20);
      // Tree rings
      ctx.strokeStyle = "#7c2d12"; ctx.lineWidth = 1;
      for (let r=4;r<22;r+=5) { ctx.beginPath(); ctx.ellipse(0,0,r,r*0.4,0,0,Math.PI*2); ctx.stroke(); }
      // Bark cracks
      ctx.strokeStyle = "#451a03"; ctx.lineWidth = 1.5;
      ctx.beginPath(); ctx.moveTo(-8,2); ctx.lineTo(-6,12); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(5,2); ctx.lineTo(8,14); ctx.stroke();
      // Dead roots
      ctx.strokeStyle = "#78350f"; ctx.lineWidth = 3;
      ctx.beginPath(); ctx.moveTo(-20,8); ctx.quadraticCurveTo(-30,14,-28,22); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(20,8); ctx.quadraticCurveTo(30,14,28,22); ctx.stroke();

    } else if (obs.type === "cracked_earth") {
      // Cracked dry earth patch
      ctx.fillStyle = "#92400e"; ctx.beginPath(); ctx.ellipse(0,0,36,18,0,0,Math.PI*2); ctx.fill();
      ctx.fillStyle = "#78350f"; ctx.beginPath(); ctx.ellipse(0,0,30,14,0,0,Math.PI*2); ctx.fill();
      // Crack lines
      ctx.strokeStyle = "#451a03"; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.moveTo(-20,-5); ctx.lineTo(-5,0); ctx.lineTo(-12,10); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(0,-12); ctx.lineTo(5,0); ctx.lineTo(18,5); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(-5,0); ctx.lineTo(5,0); ctx.lineTo(8,12); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(-5,0); ctx.lineTo(-18,8); ctx.stroke();
      // Raised edges of cracks
      ctx.fillStyle = "#b45309";
      ctx.beginPath(); ctx.arc(-5,0,4,0,Math.PI*2); ctx.fill();
      ctx.beginPath(); ctx.arc(5,0,3,0,Math.PI*2); ctx.fill();
      ctx.fillStyle = "#fff"; ctx.font = "bold 8px sans-serif"; ctx.textAlign = "center";
      ctx.fillText("DRY!",0,6);

    } else if (obs.type === "sprinkler_head") {
      // Broken/stuck sprinkler head sticking up from ground
      ctx.fillStyle = "rgba(0,0,0,0.18)"; ctx.beginPath(); ctx.ellipse(0,16,14,4,0,0,Math.PI*2); ctx.fill();
      // Pipe
      ctx.fillStyle = "#475569"; ctx.beginPath(); ctx.roundRect(-5,-8,10,24,2); ctx.fill();
      ctx.strokeStyle = "#334155"; ctx.lineWidth = 1; ctx.strokeRect(-5,-8,10,24);
      // Head
      ctx.fillStyle = "#64748b"; ctx.beginPath(); ctx.roundRect(-8,-16,16,10,3); ctx.fill();
      ctx.strokeStyle = "#334155"; ctx.lineWidth = 1.5; ctx.strokeRect(-8,-16,16,10);
      // Nozzle
      ctx.fillStyle = "#94a3b8"; ctx.beginPath(); ctx.roundRect(-3,-22,6,8,1); ctx.fill();
      // Water spray (if active)
      if (frame%24<12) {
        ctx.strokeStyle = "rgba(59,130,246,0.8)"; ctx.lineWidth = 2;
        for (let a=-0.5;a<=0.5;a+=0.25) {
          ctx.beginPath(); ctx.moveTo(0,-22);
          ctx.lineTo(Math.sin(a)*30,-22-Math.cos(a)*25); ctx.stroke();
        }
        ctx.fillStyle = "rgba(147,197,253,0.7)";
        for (let i=0;i<5;i++) {
          ctx.beginPath(); ctx.arc(rand(-25,25),-22-rand(10,30),2.5,0,Math.PI*2); ctx.fill();
        }
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
    // HUD bar
    ctx.fillStyle = "rgba(0,0,0,0.72)"; ctx.beginPath(); ctx.roundRect(0,0,W,88,0); ctx.fill();
    ctx.fillStyle = BRAND_RED; ctx.fillRect(0,86,W,4);
    // Level badge
    ctx.fillStyle = BRAND_RED; ctx.beginPath(); ctx.roundRect(14,8,180,68,10); ctx.fill();
    ctx.strokeStyle = BRAND_GOLD; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.roundRect(14,8,180,68,10); ctx.stroke();
    ctx.fillStyle = BRAND_GOLD; ctx.font = "bold 16px sans-serif"; ctx.textAlign = "center";
    ctx.fillText(`LEVEL ${level}`, 104,32);
    ctx.fillStyle = "#fff"; ctx.font = "bold 14px sans-serif";
    const sn = ["NEIGHBORHOOD","HOA GAUNTLET","CONSTRUCTION","DROUGHT ZONE"];
    ctx.fillText(sn[level-1], 104,56);
    // Distance counter (center)
    ctx.fillStyle = "#fff"; ctx.font = "bold 36px sans-serif"; ctx.textAlign = "center";
    ctx.fillText(`${Math.floor(dist/10)} ft`, W/2,58);
    // Hearts
    for (let i=0;i<3;i++) {
      ctx.fillStyle = i<lives.current?"#ef4444":"rgba(255,255,255,0.2)";
      ctx.font = "40px sans-serif"; ctx.fillText("❤",W-200+i*56,62);
    }
    // Best score
    ctx.fillStyle = BRAND_GOLD; ctx.font = "bold 18px sans-serif"; ctx.textAlign = "right";
    ctx.fillText(`🏆 Best: ${highScoreRef.current} ft`, W-14,28);
    // Top-5 leaderboard panel
    const lb5 = loadLeaderboard().slice(0,5);
    if (lb5.length > 0) {
      const panelW = 220, panelH = 30 + lb5.length*28;
      ctx.fillStyle = "rgba(0,0,0,0.80)"; ctx.beginPath(); ctx.roundRect(W-panelW-10, 96, panelW, panelH, 10); ctx.fill();
      ctx.strokeStyle = BRAND_GOLD; ctx.lineWidth = 2; ctx.beginPath(); ctx.roundRect(W-panelW-10, 96, panelW, panelH, 10); ctx.stroke();
      ctx.fillStyle = BRAND_GOLD; ctx.font = "bold 16px sans-serif"; ctx.textAlign = "center";
      ctx.fillText("TOP 5", W-panelW/2-10, 116);
      lb5.forEach((e, i) => {
        const ry = 130 + i*28;
        ctx.fillStyle = i===0 ? "#fbbf24" : "#fff";
        ctx.font = `bold ${i===0?15:14}px sans-serif`; ctx.textAlign = "left";
        ctx.fillText(`${i+1}. ${e.initials}`, W-panelW-4, ry);
        ctx.textAlign = "right";
        ctx.fillText(`${e.score}ft`, W-14, ry);
      });
    }
    // Progress bar
    ctx.fillStyle = "rgba(255,255,255,0.12)"; ctx.beginPath(); ctx.roundRect(14,H-36,W-28,22,8); ctx.fill();
    const bc = ["#4ade80","#fbbf24","#f97316","#ef4444"];
    ctx.fillStyle = bc[level-1]; ctx.beginPath(); ctx.roundRect(14,H-36,(W-28)*pct,22,8); ctx.fill();
    if (pct>0.02) { ctx.fillStyle="#fff"; ctx.beginPath(); ctx.arc(14+(W-28)*pct,H-25,8,0,Math.PI*2); ctx.fill(); }
    ctx.fillStyle="#fff"; ctx.font="bold 14px sans-serif"; ctx.textAlign="left";
    ctx.fillText(`${Math.floor(pct*100)}% complete`,20,H-18);
    // Combo
    if (combo.current>=2) {
      ctx.fillStyle="rgba(251,191,36,0.95)"; ctx.beginPath(); ctx.roundRect(14,96,200,44,8); ctx.fill();
      ctx.fillStyle="#1a1a2e"; ctx.font="bold 22px sans-serif"; ctx.textAlign="left";
      ctx.fillText(`${combo.current}x COMBO! 🔥`,22,124);
    }
    // Status banners
    if (slowTimer.current>0) {
      ctx.fillStyle="rgba(124,58,237,0.92)"; ctx.beginPath(); ctx.roundRect(W/2-120,H-80,240,40,10); ctx.fill();
      ctx.fillStyle="#fff"; ctx.font="bold 22px sans-serif"; ctx.textAlign="center"; ctx.fillText("SLOWED! 🌵",W/2,H-53);
    } else if (boostHeld.current) {
      ctx.fillStyle="rgba(220,38,38,0.92)"; ctx.beginPath(); ctx.roundRect(W/2-150,H-80,300,40,10); ctx.fill();
      ctx.strokeStyle=BRAND_GOLD; ctx.lineWidth=2; ctx.beginPath(); ctx.roundRect(W/2-150,H-80,300,40,10); ctx.stroke();
      ctx.fillStyle="#fff"; ctx.font="bold 24px sans-serif"; ctx.textAlign="center"; ctx.fillText("TURBO MODE! 🔥",W/2,H-53);
    } else if (fastTimer.current>0) {
      ctx.fillStyle="rgba(217,119,6,0.92)"; ctx.beginPath(); ctx.roundRect(W/2-130,H-80,260,40,10); ctx.fill();
      ctx.fillStyle="#fff"; ctx.font="bold 22px sans-serif"; ctx.textAlign="center"; ctx.fillText("SPEED BOOST! ☕",W/2,H-53);
    }
  }

  //
  function drawLevelIntro(ctx: CanvasRenderingContext2D, level: number, timer: number) {
    const lv = LEVELS[level-1];
    const alpha = Math.min(1,timer/30)*Math.min(1,(timer-20)/20+1);
    ctx.fillStyle = `rgba(0,0,0,${0.8*alpha})`; ctx.fillRect(0,0,W,H);
    ctx.save(); ctx.globalAlpha = alpha;
    ctx.fillStyle=BRAND_RED; ctx.beginPath(); ctx.roundRect(W/2-280,H/2-120,560,52,10); ctx.fill();
    ctx.fillStyle=BRAND_GOLD; ctx.font="bold 22px sans-serif"; ctx.textAlign="center";
    ctx.fillText("NEWPORT AVENUE LANDSCAPING",W/2,H/2-88);
    ctx.fillStyle=BRAND_GOLD; ctx.font="bold 36px sans-serif"; ctx.fillText(`LEVEL ${level} OF 4`,W/2,H/2-28);
    ctx.fillStyle="#fff"; ctx.font="bold 56px sans-serif"; ctx.fillText(lv.name,W/2,H/2+38);
    ctx.fillStyle=BRAND_LIGHT; ctx.font="24px sans-serif"; ctx.fillText(lv.subtitle,W/2,H/2+80);
    ctx.fillStyle=BRAND_GOLD; ctx.font="italic 20px sans-serif"; ctx.fillText(`"${lv.tagline}"`,W/2,H/2+116);
    if (timer<60) {
      ctx.fillStyle="#4ade80"; ctx.font="bold 40px sans-serif"; ctx.fillText("LET'S MOW! 🌿",W/2,H/2+172);
    } else {
      ctx.fillStyle="rgba(255,255,255,0.7)"; ctx.font="28px sans-serif"; ctx.fillText("GET READY...",W/2,H/2+172);
    }
    ctx.restore();
  }

  //
  function drawLevelComplete(ctx: CanvasRenderingContext2D, level: number) {
    ctx.fillStyle="rgba(0,0,0,0.80)"; ctx.fillRect(0,0,W,H);
    ctx.fillStyle="#4ade80"; ctx.font="bold 72px sans-serif"; ctx.textAlign="center";
    ctx.fillText("✅ LEVEL CLEAR!",W/2,H/2-80);
    ctx.fillStyle=BRAND_GOLD; ctx.font="bold 32px sans-serif"; ctx.fillText(LEVELS[level-1].name,W/2,H/2-24);
    ctx.fillStyle="#fff"; ctx.font="24px sans-serif";
    if (level<4) {
      ctx.fillText(`Next: Level ${level+1} — ${LEVELS[level].name}`,W/2,H/2+20);
      ctx.fillStyle="rgba(255,255,255,0.6)"; ctx.font="italic 20px sans-serif";
      ctx.fillText(`"${LEVELS[level].tagline}"`,W/2,H/2+56);
    } else {
      ctx.fillText("You beat the game! 🎉 Claim your reward!",W/2,H/2+20);
    }
    ctx.fillStyle=BRAND_RED; ctx.beginPath(); ctx.roundRect(W/2-200,H/2+90,400,80,14); ctx.fill();
    ctx.strokeStyle=BRAND_GOLD; ctx.lineWidth=3; ctx.beginPath(); ctx.roundRect(W/2-200,H/2+90,400,80,14); ctx.stroke();
    ctx.fillStyle="#fff"; ctx.font="bold 32px sans-serif";
    ctx.fillText(level<4?"▶  NEXT LEVEL":"🎉  CLAIM REWARD",W/2,H/2+142);
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
      ctx.fillStyle = BRAND_GOLD; ctx.font = "bold 52px sans-serif"; ctx.textAlign = "center";
      ctx.fillText("ALL 4 LEVELS DONE!", W/2, 90);
      ctx.fillStyle = "#fff"; ctx.font = "28px sans-serif";
      ctx.fillText("Sterling is proud. Probably.", W/2, 138);
      ctx.restore();
    }

    // "TAP TO CONTINUE" pulse at end
    if (progress > 0.82) {
      const pa = Math.abs(Math.sin(timer * 0.15));
      ctx.save(); ctx.globalAlpha = pa;
      ctx.fillStyle = BRAND_GREEN; ctx.beginPath(); ctx.roundRect(W/2-240, H-100, 480, 72, 14); ctx.fill();
      ctx.strokeStyle = BRAND_GOLD; ctx.lineWidth = 3; ctx.beginPath(); ctx.roundRect(W/2-240, H-100, 480, 72, 14); ctx.stroke();
      ctx.fillStyle = "#fff"; ctx.font = "bold 32px sans-serif"; ctx.textAlign = "center";
      ctx.fillText("TAP TO CLAIM REWARD!", W/2, H-54);
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

    ctx.fillStyle = BRAND_RED; ctx.beginPath(); ctx.roundRect(W/2-320,14,640,60,12); ctx.fill();
    ctx.fillStyle = BRAND_GOLD; ctx.font = "bold 22px sans-serif"; ctx.textAlign = "center";
    ctx.fillText("NEWPORT AVENUE LANDSCAPING", W/2, 40);
    ctx.fillStyle = "#fff"; ctx.font = "bold 24px sans-serif"; ctx.fillText("🌿 LAWN MOWER DASH", W/2, 66);

    ctx.fillStyle = "#fbbf24"; ctx.font = "bold 56px sans-serif"; ctx.textAlign = "center";
    ctx.fillText("💰 DOUBLE OR NOTHING? 💰", W/2, 160);

    ctx.fillStyle = "#fff"; ctx.font = "28px sans-serif";
    ctx.fillText("You earned $100 off. But are you feeling lucky?", W/2, 208);

    // The offer
    ctx.fillStyle = "rgba(255,255,255,0.08)"; ctx.beginPath(); ctx.roundRect(W/2-380,224,760,110,14); ctx.fill();
    ctx.strokeStyle = BRAND_GOLD; ctx.lineWidth = 2; ctx.beginPath(); ctx.roundRect(W/2-380,224,760,110,14); ctx.stroke();
    ctx.fillStyle = BRAND_GOLD; ctx.font = "bold 26px sans-serif"; ctx.textAlign = "center";
    ctx.fillText("Face Giant Sterling in a 1-on-1 showdown.", W/2, 260);
    ctx.fillStyle = "#4ade80"; ctx.font = "bold 24px sans-serif";
    ctx.fillText("WIN → $200 off your next service", W/2, 296);
    ctx.fillStyle = "#f87171"; ctx.font = "22px sans-serif";
    ctx.fillText("LOSE → still keep your $100 code 😅", W/2, 326);

    // Warning
    ctx.fillStyle = "rgba(239,68,68,0.85)"; ctx.beginPath(); ctx.roundRect(W/2-320,344,640,46,10); ctx.fill();
    ctx.fillStyle = "#fff"; ctx.font = "bold 20px sans-serif"; ctx.textAlign = "center";
    ctx.fillText("⚠️  Sterling has NEVER been beaten. Good luck.", W/2, 374);

    // YES button (left half)
    ctx.fillStyle = BRAND_RED; ctx.beginPath(); ctx.roundRect(W/2-360,408,320,80,14); ctx.fill();
    ctx.strokeStyle = BRAND_GOLD; ctx.lineWidth = 3; ctx.beginPath(); ctx.roundRect(W/2-360,408,320,80,14); ctx.stroke();
    ctx.fillStyle = "#fff"; ctx.font = "bold 28px sans-serif"; ctx.textAlign = "center";
    ctx.fillText("⚔️  FIGHT STERLING", W/2-200, 456);

    // NO button (right half)
    ctx.fillStyle = BRAND_GREEN; ctx.beginPath(); ctx.roundRect(W/2+40,408,320,80,14); ctx.fill();
    ctx.strokeStyle = BRAND_GOLD; ctx.lineWidth = 3; ctx.beginPath(); ctx.roundRect(W/2+40,408,320,80,14); ctx.stroke();
    ctx.fillStyle = "#fff"; ctx.font = "bold 28px sans-serif"; ctx.textAlign = "center";
    ctx.fillText("💰 TAKE $100", W/2+200, 456);

    ctx.fillStyle = "rgba(255,255,255,0.45)"; ctx.font = "italic 20px sans-serif"; ctx.textAlign = "center";
    ctx.fillText("Odds of beating Sterling: classified. Rumored to be 1 in 500.", W/2, 520);
    ctx.fillText("(Sterling has been mowing since 1987. He does not lose.)", W/2, 548);
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
    const bubbleX = W/2 + 80;
    const bubbleY = 40;
    const bw = 520, bh = 110;
    ctx.fillStyle = "#fff";
    ctx.beginPath(); ctx.roundRect(bubbleX-bw/2, bubbleY, bw, bh, 16); ctx.fill();
    ctx.strokeStyle = BRAND_RED; ctx.lineWidth = 5;
    ctx.beginPath(); ctx.roundRect(bubbleX-bw/2, bubbleY, bw, bh, 16); ctx.stroke();
    // Bubble tail
    ctx.fillStyle = "#fff";
    ctx.beginPath(); ctx.moveTo(bubbleX+60,bubbleY+bh); ctx.lineTo(bubbleX+100,bubbleY+bh+36); ctx.lineTo(bubbleX+20,bubbleY+bh); ctx.closePath(); ctx.fill();
    ctx.strokeStyle = BRAND_RED; ctx.lineWidth = 4;
    ctx.beginPath(); ctx.moveTo(bubbleX+60,bubbleY+bh); ctx.lineTo(bubbleX+100,bubbleY+bh+36); ctx.lineTo(bubbleX+20,bubbleY+bh); ctx.stroke();

    // Animated text — shake on odd frames
    const shakeX = frame%4<2?3:-3;
    ctx.save(); ctx.translate(shakeX, 0);
    ctx.fillStyle = BRAND_RED; ctx.font = "bold 52px sans-serif"; ctx.textAlign = "center";
    ctx.fillText("YOU'RE FIRED! 🔥", bubbleX, bubbleY+68);
    ctx.restore();

    // Smaller sub-text
    ctx.fillStyle = "#333"; ctx.font = "20px sans-serif"; ctx.textAlign = "center";
    ctx.fillText("(Just kidding. But you still can't beat me.)", bubbleX, bubbleY+98);

    // Player's mower label
    ctx.fillStyle = "#fff"; ctx.font = "bold 18px sans-serif"; ctx.textAlign = "center";
    ctx.fillText("YOU", 120, H*0.72-80);

    // STERLING label
    ctx.fillStyle = BRAND_GOLD; ctx.font = "bold 30px sans-serif"; ctx.textAlign = "center";
    ctx.fillText("STERLING", W/2+60, 32);
    ctx.fillStyle = BRAND_RED; ctx.font = "bold 20px sans-serif";
    ctx.fillText("BOSS", W/2+60, 56);

    // "DECIDING FATE..." spinner
    const dotCount = (Math.floor(frame/15)%4);
    const dots = ".".repeat(dotCount);
    ctx.fillStyle = BRAND_GOLD; ctx.font = "bold 26px sans-serif"; ctx.textAlign = "center";
    ctx.fillText(`Deciding your fate${dots}`, W/2, H-28);
  }

  //
  function drawIdleScreen(ctx: CanvasRenderingContext2D) {
    for (let i=0;i<LANE_COUNT;i++) {
      ctx.fillStyle = i%2===0?"#3a8c3a":"#358035";
      ctx.fillRect(0,i*LANE_H,W,LANE_H);
    }
    ctx.fillStyle = "rgba(0,0,0,0.72)"; ctx.fillRect(0,0,W,H);
    // Header bar
    ctx.fillStyle = BRAND_RED; ctx.fillRect(0,0,W,96);
    ctx.strokeStyle = BRAND_GOLD; ctx.lineWidth = 3;
    ctx.beginPath(); ctx.moveTo(0,96); ctx.lineTo(W,96); ctx.stroke();
    ctx.fillStyle = BRAND_GOLD; ctx.font = "bold 22px sans-serif"; ctx.textAlign = "center";
    ctx.fillText("NEWPORT AVENUE LANDSCAPING", W/2, 30);
    ctx.fillStyle = "#fff"; ctx.font = "bold 46px sans-serif";
    ctx.fillText("🌿  LAWN MOWER DASH", W/2, 78);
    ctx.fillStyle = BRAND_LIGHT; ctx.font = "bold 22px sans-serif";
    ctx.fillText("4 LEVELS OF CENTRAL OREGON CHAOS", W/2, 128);
    // Level cards
    const lc = ["#4ade80","#fbbf24","#f97316","#ef4444"];
    const li = ["🌊","📋","🚧","☀️"];
    const ls = ["HOOD","HOA","SITE","DROUGHT"];
    for (let i=0;i<4;i++) {
      const x = W/2-230+i*154;
      ctx.fillStyle = lc[i]+"33";
      ctx.beginPath(); ctx.roundRect(x-60,148,120,100,10); ctx.fill();
      ctx.strokeStyle = lc[i]; ctx.lineWidth = 2.5;
      ctx.beginPath(); ctx.roundRect(x-60,148,120,100,10); ctx.stroke();
      ctx.font = "40px sans-serif"; ctx.textAlign = "center"; ctx.fillText(li[i],x,200);
      ctx.fillStyle = "#fff"; ctx.font = "bold 16px sans-serif"; ctx.fillText(`LVL ${i+1}`,x,224);
      ctx.fillStyle = lc[i]; ctx.font = "bold 14px sans-serif"; ctx.fillText(ls[i],x,242);
    }
    ctx.fillStyle = BRAND_GOLD; ctx.font = "bold 24px sans-serif"; ctx.textAlign = "center";
    ctx.fillText("🏆  Beat all 4 levels → unlock a $100 discount code!", W/2, 278);
    ctx.fillStyle = "rgba(255,255,255,0.55)"; ctx.font = "20px sans-serif";
    ctx.fillText("Dare to face Giant Sterling for $200? Find out inside.", W/2, 308);
    ctx.fillStyle = "rgba(255,255,255,0.7)"; ctx.font = "20px sans-serif";
    ctx.fillText("Tap top/bottom · Swipe up/down · ↑↓ arrow keys", W/2, 334);
    // Play button
    ctx.fillStyle = BRAND_RED;
    ctx.beginPath(); ctx.roundRect(W/2-200,352,400,88,16); ctx.fill();
    ctx.strokeStyle = BRAND_GOLD; ctx.lineWidth = 4;
    ctx.beginPath(); ctx.roundRect(W/2-200,352,400,88,16); ctx.stroke();
    ctx.fillStyle = "#fff"; ctx.font = "bold 40px sans-serif"; ctx.textAlign = "center";
    ctx.fillText("▶  TAP TO PLAY", W/2, 406);
    if (highScoreRef.current>0) {
      ctx.fillStyle = BRAND_GOLD; ctx.font = "bold 22px sans-serif";
      ctx.fillText(`🏆 Best: ${highScoreRef.current} ft`, W/2, 456);
    }
    // Leaderboard always shown on idle
    drawLeaderboardPanel(ctx, loadLeaderboard(), -1, 472);
  }

  function drawLeaderboardPanel(ctx: CanvasRenderingContext2D, lb: LBEntry[], highlightRank: number, yOffset: number) {
    const panelX = W/2-320, panelW = 640, rowH = 36;
    const panelH = lb.length > 0 ? 44 + lb.length*rowH + 14 : 80;
    ctx.fillStyle = "rgba(0,0,0,0.80)"; ctx.beginPath(); ctx.roundRect(panelX, yOffset, panelW, panelH, 14); ctx.fill();
    ctx.strokeStyle = BRAND_GOLD; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.roundRect(panelX, yOffset, panelW, panelH, 14); ctx.stroke();
    ctx.fillStyle = BRAND_GOLD; ctx.font = "bold 22px sans-serif"; ctx.textAlign = "center";
    ctx.fillText("🏆  HIGH SCORES  🏆", W/2, yOffset+28);
    if (lb.length === 0) {
      ctx.fillStyle = "rgba(255,255,255,0.5)"; ctx.font = "20px sans-serif";
      ctx.fillText("No scores yet — be the first!", W/2, yOffset+60);
      return;
    }
    const rankColors = ["#fbbf24","#d1d5db","#cd7c3a"];
    for (let i=0; i<lb.length; i++) {
      const e = lb[i];
      const ry = yOffset + 48 + i*rowH;
      const isNew = i === highlightRank;
      if (isNew) {
        ctx.fillStyle = "rgba(200,168,75,0.25)"; ctx.beginPath(); ctx.roundRect(panelX+6, ry-20, panelW-12, rowH, 6); ctx.fill();
        ctx.strokeStyle = BRAND_GOLD; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.roundRect(panelX+6, ry-20, panelW-12, rowH, 6); ctx.stroke();
      }
      ctx.fillStyle = i<3 ? rankColors[i] : "rgba(255,255,255,0.6)";
      ctx.font = `bold ${i<3?20:18}px sans-serif`; ctx.textAlign = "left";
      ctx.fillText(`${i+1}.`, panelX+20, ry);
      ctx.fillStyle = isNew ? BRAND_GOLD : "#fff";
      ctx.font = `bold ${isNew?20:18}px monospace`; ctx.textAlign = "left";
      ctx.fillText(e.initials, panelX+60, ry);
      ctx.fillStyle = isNew ? BRAND_GOLD : "rgba(255,255,255,0.85)";
      ctx.font = `${isNew?"bold ":""} 18px sans-serif`; ctx.textAlign = "right";
      ctx.fillText(`${e.score} ft`, panelX+panelW-100, ry);
      ctx.fillStyle = "rgba(255,255,255,0.45)"; ctx.font = "16px sans-serif";
      ctx.fillText(`Lvl ${e.level}`, panelX+panelW-16, ry);
      if (isNew) {
        ctx.fillStyle = BRAND_GOLD; ctx.font = "bold 16px sans-serif"; ctx.textAlign = "center";
        ctx.fillText("NEW!", panelX+panelW-60, ry);
      }
    }
  }

  //
  function drawDeadScreen(ctx: CanvasRenderingContext2D, s: number, hs: number, level: number, lb: LBEntry[] = [], highlightRank = -1) {
    for (let i=0;i<LANE_COUNT;i++) {
      ctx.fillStyle = i%2===0?"#3a8c3a":"#358035";
      ctx.fillRect(0,i*LANE_H,W,LANE_H);
    }
    ctx.fillStyle = "rgba(0,0,0,0.78)"; ctx.fillRect(0,0,W,H);
    ctx.fillStyle = BRAND_RED; ctx.fillRect(0,0,W,96);
    ctx.strokeStyle = BRAND_GOLD; ctx.lineWidth = 3;
    ctx.beginPath(); ctx.moveTo(0,96); ctx.lineTo(W,96); ctx.stroke();
    ctx.fillStyle = BRAND_GOLD; ctx.font = "bold 22px sans-serif"; ctx.textAlign = "center";
    ctx.fillText("NEWPORT AVENUE LANDSCAPING", W/2, 30);
    ctx.fillStyle = "#fff"; ctx.font = "bold 40px sans-serif"; ctx.fillText("🌿  LAWN MOWER DASH", W/2, 78);
    const dm = ["SOAKED! 💦","CITED BY THE HOA! 📋","BURIED IN MUD! 🚧","DEHYDRATED! ☀️"];
    const ds = ["The sprinkler got you. Classic.","The HOA wins this round. For now.","Construction chaos: 1, NAL: 0.","The drought inspector got your plates."];
    ctx.fillStyle = "#ef4444"; ctx.font = "bold 52px sans-serif"; ctx.textAlign = "center";
    ctx.fillText(dm[level-1]||"GAME OVER!", W/2, 162);
    ctx.fillStyle = "rgba(255,255,255,0.7)"; ctx.font = "italic 22px sans-serif";
    ctx.fillText(ds[level-1]||"", W/2, 196);
    ctx.fillStyle = "#fff"; ctx.font = "bold 36px sans-serif"; ctx.fillText(`Distance: ${s} ft`, W/2, 244);
    ctx.fillStyle = BRAND_GOLD; ctx.font = "bold 28px sans-serif"; ctx.fillText(`🏆 Best: ${hs} ft`, W/2, 284);
    ctx.fillStyle = BRAND_LIGHT; ctx.font = "22px sans-serif"; ctx.fillText(`Reached Level ${level} — ${LEVELS[level-1].name}`, W/2, 318);
    ctx.fillStyle = BRAND_RED; ctx.beginPath(); ctx.roundRect(W/2-200,336,400,76,14); ctx.fill();
    ctx.strokeStyle = BRAND_GOLD; ctx.lineWidth = 3; ctx.beginPath(); ctx.roundRect(W/2-200,336,400,76,14); ctx.stroke();
    ctx.fillStyle = "#fff"; ctx.font = "bold 32px sans-serif"; ctx.textAlign = "center"; ctx.fillText("🔄  TRY AGAIN", W/2, 384);
    ctx.fillStyle = BRAND_GOLD; ctx.font = "italic 20px sans-serif";
    ctx.fillText("Sterling believes in you. Probably.", W/2, 428);
    // Leaderboard on dead screen
    drawLeaderboardPanel(ctx, lb, highlightRank, 448);
  }

  //
  function drawBossLostScreen(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = "rgba(0,0,0,0.88)"; ctx.fillRect(0,0,W,H);
    ctx.fillStyle = BRAND_RED; ctx.fillRect(0,0,W,96);
    ctx.strokeStyle = BRAND_GOLD; ctx.lineWidth = 3;
    ctx.beginPath(); ctx.moveTo(0,96); ctx.lineTo(W,96); ctx.stroke();
    ctx.fillStyle = BRAND_GOLD; ctx.font = "bold 22px sans-serif"; ctx.textAlign = "center";
    ctx.fillText("NEWPORT AVENUE LANDSCAPING", W/2, 30);
    ctx.fillStyle = "#fff"; ctx.font = "bold 40px sans-serif"; ctx.fillText("🌿  LAWN MOWER DASH", W/2, 78);
    ctx.fillStyle = "#f87171"; ctx.font = "bold 52px sans-serif"; ctx.textAlign = "center";
    ctx.fillText("💼 STERLING WINS. AGAIN.", W/2, 164);
    ctx.fillStyle = "rgba(255,255,255,0.7)"; ctx.font = "italic 22px sans-serif";
    ctx.fillText("He's been mowing since 1987. He does not lose.", W/2, 202);
    ctx.fillStyle = "#4ade80"; ctx.font = "bold 28px sans-serif";
    ctx.fillText("BUT — your $100 code is still yours! 🎉", W/2, 248);
    // Code box
    ctx.fillStyle = BRAND_DARK; ctx.beginPath(); ctx.roundRect(W/2-220,264,440,72,12); ctx.fill();
    ctx.strokeStyle = BRAND_GOLD; ctx.lineWidth = 3; ctx.beginPath(); ctx.roundRect(W/2-220,264,440,72,12); ctx.stroke();
    ctx.fillStyle = BRAND_GOLD; ctx.font = "bold 44px monospace"; ctx.textAlign = "center";
    ctx.fillText(DISCOUNT_CODE, W/2, 314);
    ctx.fillStyle = "rgba(255,255,255,0.65)"; ctx.font = "20px sans-serif";
    ctx.fillText("One-time use. $100 off any service.", W/2, 356);
    ctx.fillStyle = BRAND_RED; ctx.beginPath(); ctx.roundRect(W/2-200,378,400,76,14); ctx.fill();
    ctx.strokeStyle = BRAND_GOLD; ctx.lineWidth = 3; ctx.beginPath(); ctx.roundRect(W/2-200,378,400,76,14); ctx.stroke();
    ctx.fillStyle = "#fff"; ctx.font = "bold 32px sans-serif"; ctx.textAlign = "center";
    ctx.fillText("🔄  PLAY AGAIN", W/2, 426);
    ctx.fillStyle = BRAND_GOLD; ctx.font = "italic 20px sans-serif";
    ctx.fillText("(Nobody beats Sterling. This is known.)", W/2, 472);
  }

  //
  function drawWonScreen(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = "rgba(0,0,0,0.88)"; ctx.fillRect(0,0,W,H);
    ctx.fillStyle = BRAND_RED; ctx.fillRect(0,0,W,96);
    ctx.strokeStyle = BRAND_GOLD; ctx.lineWidth = 3;
    ctx.beginPath(); ctx.moveTo(0,96); ctx.lineTo(W,96); ctx.stroke();
    ctx.fillStyle = BRAND_GOLD; ctx.font = "bold 22px sans-serif"; ctx.textAlign = "center";
    ctx.fillText("NEWPORT AVENUE LANDSCAPING", W/2, 30);
    ctx.fillStyle = "#fff"; ctx.font = "bold 40px sans-serif"; ctx.fillText("🌿  LAWN MOWER DASH", W/2, 78);
    ctx.fillStyle = "#fbbf24"; ctx.font = "bold 52px sans-serif"; ctx.textAlign = "center";
    ctx.fillText("🏆 YOU BEAT STERLING!!! 🏆", W/2, 166);
    ctx.fillStyle = "#fff"; ctx.font = "26px sans-serif";
    ctx.fillText("IMPOSSIBLE. Sterling is shook.", W/2, 208);
    ctx.fillStyle = "#4ade80"; ctx.font = "bold 24px sans-serif";
    ctx.fillText("Your $200 off code:", W/2, 252);
    ctx.fillStyle = BRAND_DARK; ctx.beginPath(); ctx.roundRect(W/2-230,268,460,76,12); ctx.fill();
    ctx.strokeStyle = BRAND_GOLD; ctx.lineWidth = 3; ctx.beginPath(); ctx.roundRect(W/2-230,268,460,76,12); ctx.stroke();
    ctx.fillStyle = BRAND_GOLD; ctx.font = "bold 48px monospace"; ctx.textAlign = "center";
    ctx.fillText(DOUBLE_CODE, W/2, 322);
    ctx.fillStyle = "rgba(255,255,255,0.65)"; ctx.font = "20px sans-serif";
    ctx.fillText("One-time use. $200 off any service. You earned it.", W/2, 368);
    ctx.fillStyle = "rgba(255,255,255,0.5)"; ctx.font = "italic 18px sans-serif";
    ctx.fillText("(Sterling is currently questioning all his life choices.)", W/2, 398);
    ctx.fillStyle = BRAND_RED; ctx.beginPath(); ctx.roundRect(W/2-200,416,400,76,14); ctx.fill();
    ctx.strokeStyle = BRAND_GOLD; ctx.lineWidth = 3; ctx.beginPath(); ctx.roundRect(W/2-200,416,400,76,14); ctx.stroke();
    ctx.fillStyle = "#fff"; ctx.font = "bold 32px sans-serif"; ctx.textAlign = "center";
    ctx.fillText("🔄  PLAY AGAIN", W/2, 464);
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
        // Use setTimeout to defer the state update so it doesn't kill the current RAF chain
        setTimeout(() => {
          stateRef.current = "double_or_nothing";
          setDisplayState("double_or_nothing");
        }, 0);
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

    // Hold-down boost: 1.6x speed while held (stacks with collectible multiplier)
    const boostMult = boostHeld.current && slowTimer.current === 0 ? 1.6 : 1.0;
    const scrollSpeed = baseSpeed.current * playerSpeedMult.current * boostMult;
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
            stateRef.current="enter_initials";
            const fs = Math.floor(distance.current/10);
            scoreRef.current=fs; setScore(fs);
            setHighScore(prev => {
              const nh = Math.max(prev,fs); highScoreRef.current=nh;
              try { localStorage.setItem(HIGH_SCORE_KEY,String(nh)); } catch {}
              return nh;
            });
            setPendingScore(fs);
            setPendingLevel(levelRef.current);
            setInitials("");
            setDisplayState("enter_initials");
            return;
          }
        }
      }
    }

    // Level complete check
    if (distance.current >= lv.targetDist*10) {
      if (level >= 4) {
        // Beat all 4 levels — start celebration animation
        // NOTE: do NOT call setDisplayState here — it triggers re-render which kills the RAF
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
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key==="ArrowUp"||e.key==="w"||e.key==="W") { e.preventDefault(); moveUp(); }
      if (e.key==="ArrowDown"||e.key==="s"||e.key==="S") {
        e.preventDefault();
        if (!e.repeat) {
          // First press: move down lane
          moveDown();
        }
        // Hold: activate boost
        boostHeld.current = true;
      }
    };
    const onKeyUp = (e: KeyboardEvent) => {
      if (e.key==="ArrowDown"||e.key==="s"||e.key==="S") {
        boostHeld.current = false;
      }
    };
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
    };
  }, [moveUp, moveDown]);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    e.preventDefault();
    touchStartY.current = e.touches[0].clientY;
    // If touch is on the bottom half of the canvas, activate boost
    if (stateRef.current === "playing") {
      const canvas = canvasRef.current;
      if (canvas) {
        const rect = canvas.getBoundingClientRect();
        const tapY = e.touches[0].clientY - rect.top;
        if (tapY > rect.height / 2) {
          boostHeld.current = true;
        }
      }
    }
  }, []);

  const handleTouchEnd = useCallback((e: React.TouchEvent) => {
    e.preventDefault();
    // Always release boost on touch end
    boostHeld.current = false;
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

  const submitInitials = useCallback((inits: string) => {
    const cleaned = inits.toUpperCase().replace(/[^A-Z]/g, "").slice(0,3).padEnd(3,"_");
    const { lb, rank } = addToLeaderboard(cleaned, pendingScore, pendingLevel);
    setLeaderboard(lb);
    setNewEntryRank(rank);
    stateRef.current = "dead";
    setDisplayState("dead");
  }, [pendingScore, pendingLevel]);

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
    else if (displayState==="dead") drawDeadScreen(ctx, score, highScore, currentLevel, leaderboard, newEntryRank);
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
    // enter_initials is rendered as React JSX overlay, not canvas
  }, [displayState, score, highScore, currentLevel]);

  return (
    <>
      <Navbar />
      <div className="min-h-screen" style={{ backgroundColor: "oklch(0.97 0.01 140)", paddingTop: "80px", paddingBottom: "40px" }}>
        <div style={{ width: "100%", maxWidth: 1280, margin: "0 auto", padding: "0" }}>
          <div className="text-center mb-4">
            <div className="font-label mb-1 text-xs tracking-widest" style={{ color: BRAND_RED }}>
              🎮 MINI GAME
            </div>
            <h1 className="font-display font-light text-2xl sm:text-4xl mb-2" style={{ color: "oklch(0.22 0.005 0)" }}>
              Lawn Mower Dash
            </h1>
            <p className="font-body text-xs sm:text-sm max-w-lg mx-auto" style={{ color: "oklch(0.45 0.005 30)" }}>
              Can you survive one day at Newport Avenue Landscaping and mow your entire route?
              Beat all <strong>4 levels</strong> to unlock a <strong>$100 discount</strong> — then dare to face
              <strong> Giant Sterling</strong> for $200.
            </p>
          </div>

          <div className="flex justify-center gap-2 mb-4 flex-wrap">
            {LEVELS.map((lv, i) => {
              const icons = ["🌊","📋","🚧","☀️"];
              const colors = ["#4ade80","#fbbf24","#f97316","#ef4444"];
              return (
                <div key={lv.id} className="flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-semibold"
                  style={{ backgroundColor: `${colors[i]}22`, border: `1.5px solid ${colors[i]}`, color: "oklch(0.25 0.005 0)" }}>
                  <span>{icons[i]}</span>
                  <span className="hidden sm:inline">Level {lv.id}: {lv.name}</span>
                  <span className="sm:hidden">Lvl {lv.id}</span>
                </div>
              );
            })}
          </div>

          <div className="flex justify-center" style={{ padding: "0" }}>
            <div ref={gameWrapperRef} style={{
              width: "100%", maxWidth: isFullscreen ? "100vw" : W,
              position: "relative", margin: "0",
              backgroundColor: isFullscreen ? "#000" : "transparent",
              display: isFullscreen ? "flex" : "block",
              alignItems: isFullscreen ? "center" : undefined,
              justifyContent: isFullscreen ? "center" : undefined,
              height: isFullscreen ? "100vh" : undefined,
            }}>
              {/* Fullscreen button — mobile only */}
              <button
                onClick={toggleFullscreen}
                style={{
                  position: "absolute", top: 10, right: 10, zIndex: 20,
                  background: "rgba(0,0,0,0.6)", border: `2px solid ${BRAND_GOLD}`,
                  color: BRAND_GOLD, borderRadius: 8, padding: "6px 12px",
                  fontSize: 13, fontWeight: "bold", cursor: "pointer",
                  display: "flex", alignItems: "center", gap: 4,
                }}
                aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
              >
                {isFullscreen ? "✕ EXIT" : "⛶ FULLSCREEN"}
              </button>
              {/* Initials entry overlay — shown after dying */}
              {displayState==="enter_initials" && (
                <div style={{
                  position: "absolute", inset: 0, borderRadius: 16,
                  background: "rgba(0,0,0,0.88)",
                  display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
                  zIndex: 10, gap: 12
                }}>
                  <div style={{ color: BRAND_RED, fontWeight: "bold", fontSize: 22 }}>GAME OVER</div>
                  <div style={{ color: BRAND_GOLD, fontWeight: "bold", fontSize: 14 }}>Score: {pendingScore} ft &nbsp;·&nbsp; Level {pendingLevel}</div>
                  <div style={{ color: "#fff", fontSize: 13, marginBottom: 4 }}>Enter your 3-letter initials:</div>
                  <input
                    autoFocus
                    maxLength={3}
                    value={initials}
                    onChange={e => setInitials(e.target.value.toUpperCase().replace(/[^A-Z]/g,"").slice(0,3))}
                    onKeyDown={e => { if (e.key==="Enter" && initials.length>0) submitInitials(initials); }}
                    style={{
                      fontFamily: "monospace", fontSize: 36, fontWeight: "bold",
                      textAlign: "center", letterSpacing: 16,
                      width: 140, padding: "8px 12px",
                      background: "rgba(255,255,255,0.1)", border: `2px solid ${BRAND_GOLD}`,
                      borderRadius: 10, color: BRAND_GOLD, outline: "none",
                      textTransform: "uppercase"
                    }}
                    placeholder="___"
                  />
                  <div style={{ display: "flex", gap: 8, marginTop: 4 }}>
                    {["A","B","C","D","E","F","G","H","I","J","K","L","M"].map(l => (
                      <button key={l} onClick={() => setInitials(p => (p+l).slice(0,3))}
                        style={{ background: "rgba(255,255,255,0.1)", border: `1px solid rgba(255,255,255,0.3)`,
                          color: "#fff", borderRadius: 6, padding: "4px 7px", fontSize: 12, cursor: "pointer", fontWeight: "bold" }}>{l}</button>
                    ))}
                  </div>
                  <div style={{ display: "flex", gap: 8 }}>
                    {["N","O","P","Q","R","S","T","U","V","W","X","Y","Z"].map(l => (
                      <button key={l} onClick={() => setInitials(p => (p+l).slice(0,3))}
                        style={{ background: "rgba(255,255,255,0.1)", border: `1px solid rgba(255,255,255,0.3)`,
                          color: "#fff", borderRadius: 6, padding: "4px 7px", fontSize: 12, cursor: "pointer", fontWeight: "bold" }}>{l}</button>
                    ))}
                  </div>
                  <div style={{ display: "flex", gap: 10, marginTop: 6 }}>
                    <button onClick={() => setInitials(p => p.slice(0,-1))}
                      style={{ background: "rgba(255,100,100,0.3)", border: `1px solid #f87171`,
                        color: "#f87171", borderRadius: 8, padding: "6px 16px", fontSize: 13, cursor: "pointer", fontWeight: "bold" }}>⌫ DEL</button>
                    <button onClick={() => { if (initials.length>0) submitInitials(initials); }}
                      disabled={initials.length===0}
                      style={{ background: initials.length>0 ? BRAND_RED : "rgba(255,255,255,0.1)",
                        border: `2px solid ${initials.length>0 ? BRAND_GOLD : "rgba(255,255,255,0.2)"}`,
                        color: initials.length>0 ? "#fff" : "rgba(255,255,255,0.3)",
                        borderRadius: 8, padding: "6px 20px", fontSize: 14, cursor: initials.length>0 ? "pointer" : "default",
                        fontWeight: "bold" }}>SUBMIT ✓</button>
                  </div>
                  <div style={{ color: "rgba(255,255,255,0.4)", fontSize: 10, marginTop: 2 }}>Or type on keyboard + press Enter</div>
                </div>
              )}
              <canvas
                ref={canvasRef}
                width={W}
                height={H}
                onClick={handleCanvasClick}
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
                style={{
                  width: "100%", height: "auto",
                  borderRadius: "clamp(0px, 2vw, 16px)",
                  cursor: displayState!=="playing" ? "pointer" : "default",
                  touchAction: "none",
                  userSelect: "none",
                  boxShadow: "0 12px 40px rgba(0,0,0,0.25)",
                  border: `3px solid ${BRAND_RED}`,
                  display: "block",
                  maxWidth: "100vw",
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

          {/* Always-visible leaderboard below the canvas */}
          <div className="mt-6 mx-auto" style={{ maxWidth: W }}>
            <div className="rounded-2xl overflow-hidden" style={{ background: "rgba(15,53,24,0.95)", border: `2px solid ${BRAND_GOLD}` }}>
              <div className="px-4 py-2 flex items-center justify-between" style={{ background: BRAND_RED, borderBottom: `1px solid ${BRAND_GOLD}` }}>
                <span style={{ color: BRAND_GOLD, fontWeight: "bold", fontSize: 13, letterSpacing: 2 }}>🏆 HIGH SCORES</span>
                <span style={{ color: "rgba(255,255,255,0.6)", fontSize: 10 }}>NEWPORT AVENUE LANDSCAPING</span>
              </div>
              {leaderboard.length === 0 ? (
                <div className="text-center py-4" style={{ color: "rgba(255,255,255,0.4)", fontSize: 12 }}>No scores yet — be the first to play!</div>
              ) : (
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
                  <thead>
                    <tr style={{ borderBottom: `1px solid rgba(200,168,75,0.3)` }}>
                      <th style={{ padding: "6px 12px", color: BRAND_GOLD, textAlign: "left", fontWeight: "bold", fontSize: 11 }}>#</th>
                      <th style={{ padding: "6px 8px", color: BRAND_GOLD, textAlign: "left", fontWeight: "bold", fontSize: 11 }}>NAME</th>
                      <th style={{ padding: "6px 8px", color: BRAND_GOLD, textAlign: "right", fontWeight: "bold", fontSize: 11 }}>SCORE</th>
                      <th style={{ padding: "6px 12px", color: BRAND_GOLD, textAlign: "right", fontWeight: "bold", fontSize: 11 }}>LEVEL</th>
                    </tr>
                  </thead>
                  <tbody>
                    {leaderboard.map((e, i) => {
                      const rankColors = ["#fbbf24","#d1d5db","#cd7c3a"];
                      const isNew = i === newEntryRank;
                      return (
                        <tr key={e.ts} style={{
                          background: isNew ? "rgba(200,168,75,0.15)" : i%2===0?"transparent":"rgba(255,255,255,0.03)",
                          borderBottom: "1px solid rgba(255,255,255,0.06)",
                          outline: isNew ? `1px solid ${BRAND_GOLD}` : "none"
                        }}>
                          <td style={{ padding: "7px 12px", color: i<3?rankColors[i]:"rgba(255,255,255,0.4)", fontWeight: "bold", fontSize: i<3?14:12 }}>
                            {i===0?"🥇":i===1?"🥈":i===2?"🥉":i+1}
                          </td>
                          <td style={{ padding: "7px 8px", fontFamily: "monospace", fontWeight: "bold", fontSize: 16,
                            color: isNew ? BRAND_GOLD : "#fff", letterSpacing: 4 }}>
                            {e.initials}
                            {isNew && <span style={{ marginLeft: 8, fontSize: 10, color: BRAND_GOLD, letterSpacing: 0 }}>NEW!</span>}
                          </td>
                          <td style={{ padding: "7px 8px", textAlign: "right", color: isNew?BRAND_GOLD:"rgba(255,255,255,0.85)", fontWeight: isNew?"bold":"normal" }}>
                            {e.score} ft
                          </td>
                          <td style={{ padding: "7px 12px", textAlign: "right", color: "rgba(255,255,255,0.4)", fontSize: 11 }}>
                            Lvl {e.level}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              )}
            </div>
          </div>

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
