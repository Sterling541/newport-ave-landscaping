/* ============================================================
   SPRINKLER DASH — Branded Endless Runner
   Newport Avenue Landscaping
   - Red-shirt runner, branded idle/dead screens
   - Mushroom (slow) + Bee (speed boost, chases with face)
   - Combo multiplier, pop-up feedback text
   - Touch: tap lane or swipe · Keyboard: ↑↓ / W S
   ============================================================ */
import { useEffect, useRef, useState, useCallback } from "react";

// ── Constants ──────────────────────────────────────────────────────────────
const W = 640;
const H = 320;
const PLAYER_X = 90;
const PLAYER_R = 14;
const LANE_COUNT = 5;
const LANE_H = H / LANE_COUNT;
const LANE_CENTERS = Array.from({ length: LANE_COUNT }, (_, i) => LANE_H * i + LANE_H / 2);
const DISCOUNT_CODE = "DRYDASH10";
const HIGH_SCORE_KEY = "nal_sprinkler_hs";
const WIN_DISTANCE = 1500;

// Brand colors
const BRAND_GREEN  = "#2d6a2d";
const BRAND_LIGHT  = "#e8f5e9";
const BRAND_GOLD   = "#c8a84b";
const GRASS_DARK   = "#3a8c3a";
const GRASS_LIGHT  = "#4db84d";

// ── Types ──────────────────────────────────────────────────────────────────
interface Sprinkler {
  id: number; x: number; lane: number;
  angle: number; arcSpeed: number; arcWidth: number; arcLen: number;
}
interface Mushroom { id: number; x: number; lane: number; collected: boolean; bobOffset: number; }
interface Bee { id: number; x: number; y: number; active: boolean; chasing: boolean; angry: boolean; }
interface Particle { x: number; y: number; vx: number; vy: number; life: number; color: string; r: number; }
interface PopText { x: number; y: number; text: string; color: string; life: number; size: number; }
type GameState = "idle" | "playing" | "dead";

// ── Helpers ────────────────────────────────────────────────────────────────
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const clamp = (v: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, v));
const rand = (lo: number, hi: number) => lo + Math.random() * (hi - lo);
const randInt = (lo: number, hi: number) => Math.floor(rand(lo, hi + 1));

// ── Component ──────────────────────────────────────────────────────────────
export default function SprinklerGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stateRef = useRef<GameState>("idle");
  const [displayState, setDisplayState] = useState<GameState>("idle");
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(() => {
    try { return parseInt(localStorage.getItem(HIGH_SCORE_KEY) ?? "0") || 0; } catch { return 0; }
  });
  const [wonCode, setWonCode] = useState("");
  const [copied, setCopied] = useState(false);

  // Mutable game state
  const playerLane = useRef(2);
  const playerY = useRef(LANE_CENTERS[2]);
  const targetLane = useRef(2);
  const sprinklers = useRef<Sprinkler[]>([]);
  const mushrooms = useRef<Mushroom[]>([]);
  const bees = useRef<Bee[]>([]);
  const particles = useRef<Particle[]>([]);
  const popTexts = useRef<PopText[]>([]);
  const distance = useRef(0);
  const baseSpeed = useRef(2.5);
  const playerSpeedMult = useRef(1.0);
  const slowTimer = useRef(0);
  const fastTimer = useRef(0);
  const nextSprinklerDist = useRef(200);
  const nextMushroomDist = useRef(500);
  const nextBeeDist = useRef(800);
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
  const lastSprinklerPassed = useRef(-1);

  const nextId = () => ++idCounter.current;

  // ── Reset ──────────────────────────────────────────────────────────────
  const resetGame = useCallback(() => {
    playerLane.current = 2;
    playerY.current = LANE_CENTERS[2];
    targetLane.current = 2;
    sprinklers.current = [];
    mushrooms.current = [];
    bees.current = [];
    particles.current = [];
    popTexts.current = [];
    distance.current = 0;
    baseSpeed.current = 2.5;
    playerSpeedMult.current = 1.0;
    slowTimer.current = 0;
    fastTimer.current = 0;
    nextSprinklerDist.current = 200;
    nextMushroomDist.current = 500;
    nextBeeDist.current = 800;
    scrollX.current = 0;
    lives.current = 3;
    invincible.current = 0;
    frameCount.current = 0;
    scoreRef.current = 0;
    combo.current = 0;
    lastSprinklerPassed.current = -1;
    setScore(0);
    setWonCode("");
    setCopied(false);
  }, []);

  // ── Spawn helpers ──────────────────────────────────────────────────────
  function spawnSprinkler() {
    sprinklers.current.push({
      id: nextId(), x: W + 40, lane: randInt(0, LANE_COUNT - 1),
      angle: rand(0, Math.PI * 2),
      arcSpeed: rand(0.018, 0.042) * (Math.random() < 0.5 ? 1 : -1),
      arcWidth: rand(0.55, 1.15),
      arcLen: rand(55, 92),
    });
  }

  function spawnMushroom() {
    mushrooms.current.push({
      id: nextId(), x: W + 20, lane: randInt(0, LANE_COUNT - 1),
      collected: false, bobOffset: rand(0, Math.PI * 2)
    });
  }

  function spawnBee() {
    const lane = randInt(0, LANE_COUNT - 1);
    bees.current.push({ id: nextId(), x: W + 30, y: LANE_CENTERS[lane], active: true, chasing: false, angry: false });
  }

  function spawnParticles(x: number, y: number, color: string, count = 12) {
    for (let i = 0; i < count; i++) {
      const a = rand(0, Math.PI * 2);
      const s = rand(1.5, 4);
      particles.current.push({ x, y, vx: Math.cos(a) * s, vy: Math.sin(a) * s, life: 1, color, r: rand(3, 7) });
    }
  }

  function spawnPopText(x: number, y: number, text: string, color: string, size = 14) {
    popTexts.current.push({ x, y, text, color, life: 1, size });
  }

  // ── Draw player (red shirt) ────────────────────────────────────────────
  function drawPlayer(ctx: CanvasRenderingContext2D, frame: number, isInvincible: boolean) {
    const blinking = isInvincible && Math.floor(invincible.current / 6) % 2 === 0;
    if (blinking) return;
    ctx.save();
    ctx.translate(PLAYER_X, playerY.current);

    // Shadow
    ctx.beginPath();
    ctx.ellipse(0, PLAYER_R + 2, 12, 4, 0, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(0,0,0,0.22)";
    ctx.fill();

    const legSwing = Math.sin(frame * 0.3) * 10;
    const bounce = Math.abs(Math.sin(frame * 0.3)) * -2;

    ctx.translate(0, bounce);

    // Legs (dark pants)
    ctx.strokeStyle = "#1a1a2e";
    ctx.lineWidth = 5;
    ctx.lineCap = "round";
    ctx.beginPath(); ctx.moveTo(0, 8); ctx.lineTo(-7 + legSwing, 20); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(0, 8); ctx.lineTo(7 - legSwing, 20); ctx.stroke();

    // Shoes
    ctx.fillStyle = "#1a1a2e";
    ctx.beginPath(); ctx.ellipse(-7 + legSwing, 21, 5, 3, 0.3, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.ellipse(7 - legSwing, 21, 5, 3, -0.3, 0, Math.PI * 2); ctx.fill();

    // Torso — RED SHIRT
    ctx.fillStyle = "#dc2626";
    ctx.beginPath();
    ctx.roundRect(-9, -5, 18, 15, 4);
    ctx.fill();

    // Shirt collar
    ctx.fillStyle = "#b91c1c";
    ctx.beginPath();
    ctx.moveTo(-4, -5); ctx.lineTo(0, -2); ctx.lineTo(4, -5);
    ctx.fill();

    // Newport Ave logo on shirt (small "N")
    ctx.fillStyle = "#fff";
    ctx.font = "bold 8px sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("N", 0, 5);

    // Arms
    ctx.strokeStyle = "#dc2626";
    ctx.lineWidth = 4;
    ctx.lineCap = "round";
    ctx.beginPath(); ctx.moveTo(-9, 0); ctx.lineTo(-15, 9 - legSwing * 0.5); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(9, 0); ctx.lineTo(15, 9 + legSwing * 0.5); ctx.stroke();

    // Hands
    ctx.fillStyle = "#fde68a";
    ctx.beginPath(); ctx.arc(-15, 9 - legSwing * 0.5, 3, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.arc(15, 9 + legSwing * 0.5, 3, 0, Math.PI * 2); ctx.fill();

    // Head (skin tone)
    ctx.beginPath();
    ctx.arc(0, -14, 11, 0, Math.PI * 2);
    ctx.fillStyle = "#fde68a";
    ctx.fill();
    ctx.strokeStyle = "#d97706";
    ctx.lineWidth = 1;
    ctx.stroke();

    // Hair
    ctx.fillStyle = "#92400e";
    ctx.beginPath();
    ctx.arc(0, -22, 9, Math.PI, 0);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(-8, -18, 5, Math.PI * 1.2, Math.PI * 1.8);
    ctx.fill();

    // Eyes
    ctx.fillStyle = "#1e293b";
    ctx.beginPath(); ctx.arc(4, -15, 2.2, 0, Math.PI * 2); ctx.fill();
    // Eye shine
    ctx.fillStyle = "#fff";
    ctx.beginPath(); ctx.arc(5, -16, 0.9, 0, Math.PI * 2); ctx.fill();

    // Smile
    ctx.strokeStyle = "#92400e";
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.arc(1, -12, 4, 0.2, Math.PI - 0.2);
    ctx.stroke();

    ctx.restore();
  }

  // ── Draw mushroom (goofy face) ─────────────────────────────────────────
  function drawMushroom(ctx: CanvasRenderingContext2D, m: Mushroom, frame: number) {
    if (m.collected) return;
    const my = LANE_CENTERS[m.lane];
    const bob = Math.sin(frame * 0.05 + m.bobOffset) * 3;
    ctx.save();
    ctx.translate(m.x, my + bob);

    // Stem
    ctx.fillStyle = "#fef3c7";
    ctx.beginPath();
    ctx.roundRect(-6, 2, 12, 11, 3);
    ctx.fill();

    // Spots on stem
    ctx.fillStyle = "rgba(255,255,255,0.6)";
    ctx.beginPath(); ctx.arc(-2, 7, 1.5, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.arc(3, 5, 1, 0, Math.PI * 2); ctx.fill();

    // Cap
    ctx.beginPath();
    ctx.arc(0, 2, 13, Math.PI, 0);
    ctx.fillStyle = "#dc2626";
    ctx.fill();

    // White spots on cap
    ctx.fillStyle = "#fef3c7";
    ctx.beginPath(); ctx.arc(-4, -3, 3, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.arc(5, -2, 2.5, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.arc(0, -7, 2, 0, Math.PI * 2); ctx.fill();

    // Goofy face on stem
    // Eyes (X eyes = dizzy)
    ctx.strokeStyle = "#7c3aed";
    ctx.lineWidth = 1.5;
    // Left X eye
    ctx.beginPath(); ctx.moveTo(-4, 5); ctx.lineTo(-2, 7); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(-2, 5); ctx.lineTo(-4, 7); ctx.stroke();
    // Right X eye
    ctx.beginPath(); ctx.moveTo(2, 5); ctx.lineTo(4, 7); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(4, 5); ctx.lineTo(2, 7); ctx.stroke();
    // Goofy smile
    ctx.beginPath();
    ctx.arc(0, 9, 3, 0.3, Math.PI - 0.3);
    ctx.stroke();

    // SLOW label
    ctx.font = "bold 8px sans-serif";
    ctx.fillStyle = "#7c3aed";
    ctx.textAlign = "center";
    ctx.fillText("SLOW", 0, 24);

    ctx.restore();
  }

  // ── Draw bee (expressive face) ─────────────────────────────────────────
  function drawBee(ctx: CanvasRenderingContext2D, b: Bee, frame: number) {
    if (!b.active) return;
    const wobble = Math.sin(frame * 0.35) * 3;
    ctx.save();
    ctx.translate(b.x, b.y + wobble);

    // Stinger
    ctx.beginPath();
    ctx.moveTo(13, 0); ctx.lineTo(19, 0);
    ctx.strokeStyle = "#92400e";
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(19, 0); ctx.lineTo(22, 1);
    ctx.stroke();

    // Body
    ctx.beginPath();
    ctx.ellipse(0, 0, 13, 9, 0, 0, Math.PI * 2);
    ctx.fillStyle = "#fbbf24";
    ctx.fill();
    ctx.strokeStyle = "#92400e";
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // Stripes
    ctx.strokeStyle = "#92400e";
    ctx.lineWidth = 2;
    for (const sx of [-5, 0, 5]) {
      ctx.beginPath();
      ctx.moveTo(sx, -8);
      ctx.lineTo(sx, 8);
      ctx.stroke();
    }

    // Wings
    const wingFlap = Math.sin(frame * 0.5) * 0.15;
    ctx.beginPath();
    ctx.ellipse(-5, -10, 8, 5, -0.4 + wingFlap, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(200,235,255,0.82)";
    ctx.fill();
    ctx.strokeStyle = "rgba(100,150,200,0.5)";
    ctx.lineWidth = 0.8;
    ctx.stroke();

    ctx.beginPath();
    ctx.ellipse(5, -10, 8, 5, 0.4 - wingFlap, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(200,235,255,0.82)";
    ctx.fill();
    ctx.stroke();

    // Face — angry when chasing, happy otherwise
    if (b.chasing || b.angry) {
      // Angry eyes (slanted)
      ctx.fillStyle = "#1e293b";
      ctx.beginPath(); ctx.ellipse(-5, -2, 2.5, 2, -0.4, 0, Math.PI * 2); ctx.fill();
      ctx.beginPath(); ctx.ellipse(5, -2, 2.5, 2, 0.4, 0, Math.PI * 2); ctx.fill();
      // Angry brows
      ctx.strokeStyle = "#92400e";
      ctx.lineWidth = 1.5;
      ctx.beginPath(); ctx.moveTo(-8, -5); ctx.lineTo(-3, -4); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(8, -5); ctx.lineTo(3, -4); ctx.stroke();
      // Gritted teeth
      ctx.fillStyle = "#fff";
      ctx.fillRect(-4, 2, 8, 4);
      ctx.strokeStyle = "#92400e";
      ctx.lineWidth = 0.8;
      for (let tx = -4; tx <= 2; tx += 2) {
        ctx.beginPath(); ctx.moveTo(tx, 2); ctx.lineTo(tx, 6); ctx.stroke();
      }
    } else {
      // Happy eyes
      ctx.fillStyle = "#1e293b";
      ctx.beginPath(); ctx.arc(-5, -2, 2.5, 0, Math.PI * 2); ctx.fill();
      ctx.beginPath(); ctx.arc(5, -2, 2.5, 0, Math.PI * 2); ctx.fill();
      // Eye shines
      ctx.fillStyle = "#fff";
      ctx.beginPath(); ctx.arc(-4, -3, 1, 0, Math.PI * 2); ctx.fill();
      ctx.beginPath(); ctx.arc(6, -3, 1, 0, Math.PI * 2); ctx.fill();
      // Smile
      ctx.strokeStyle = "#92400e";
      ctx.lineWidth = 1.5;
      ctx.beginPath(); ctx.arc(0, 1, 4, 0.2, Math.PI - 0.2); ctx.stroke();
    }

    // FAST label
    ctx.font = "bold 8px sans-serif";
    ctx.fillStyle = "#92400e";
    ctx.textAlign = "center";
    ctx.fillText("FAST", 0, 22);

    ctx.restore();
  }

  // ── Draw sprinkler ─────────────────────────────────────────────────────
  function drawSprinkler(ctx: CanvasRenderingContext2D, s: Sprinkler) {
    const sy = LANE_CENTERS[s.lane];
    ctx.save();
    ctx.translate(s.x, sy);

    // Water arc
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.arc(0, 0, s.arcLen, s.angle - s.arcWidth / 2, s.angle + s.arcWidth / 2);
    ctx.closePath();
    const g = ctx.createRadialGradient(0, 0, 0, 0, 0, s.arcLen);
    g.addColorStop(0, "rgba(147,210,255,0.92)");
    g.addColorStop(0.5, "rgba(100,180,255,0.55)");
    g.addColorStop(1, "rgba(100,180,255,0)");
    ctx.fillStyle = g;
    ctx.fill();

    // Water droplets along arc
    for (let d = 20; d < s.arcLen; d += 18) {
      const ax = Math.cos(s.angle) * d;
      const ay = Math.sin(s.angle) * d;
      ctx.beginPath();
      ctx.arc(ax, ay, 2, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(147,210,255,0.7)";
      ctx.fill();
    }

    // Head base
    ctx.beginPath();
    ctx.arc(0, 0, 10, 0, Math.PI * 2);
    ctx.fillStyle = "#6b7280";
    ctx.fill();
    ctx.strokeStyle = "#4b5563";
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // Rotating nozzle
    ctx.beginPath();
    ctx.arc(0, 0, 6, 0, Math.PI * 2);
    ctx.fillStyle = "#374151";
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(Math.cos(s.angle) * 10, Math.sin(s.angle) * 10);
    ctx.strokeStyle = "#60a5fa";
    ctx.lineWidth = 2.5;
    ctx.stroke();

    ctx.restore();
  }

  // ── Game loop ──────────────────────────────────────────────────────────
  const gameLoop = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx || stateRef.current !== "playing") return;

    frameCount.current++;
    const frame = frameCount.current;

    // Speed ramp every 240 frames
    if (frame % 240 === 0) baseSpeed.current = Math.min(baseSpeed.current + 0.25, 10);

    // Timers
    if (slowTimer.current > 0) { slowTimer.current--; if (slowTimer.current === 0) playerSpeedMult.current = 1.0; }
    if (fastTimer.current > 0) { fastTimer.current--; if (fastTimer.current === 0) playerSpeedMult.current = 1.0; }
    if (invincible.current > 0) invincible.current--;

    const scrollSpeed = baseSpeed.current * playerSpeedMult.current;
    distance.current += scrollSpeed;
    scrollX.current = (scrollX.current + scrollSpeed) % 80;

    // Smooth player Y
    playerY.current = lerp(playerY.current, LANE_CENTERS[targetLane.current], 0.22);

    // Spawn objects
    if (distance.current >= nextSprinklerDist.current) {
      spawnSprinkler();
      nextSprinklerDist.current = distance.current + rand(110, 250);
    }
    if (distance.current >= nextMushroomDist.current) {
      spawnMushroom();
      nextMushroomDist.current = distance.current + rand(350, 650);
    }
    if (distance.current >= nextBeeDist.current) {
      spawnBee();
      nextBeeDist.current = distance.current + rand(500, 900);
    }

    // Update sprinklers — track combo
    const prevSprinklers = sprinklers.current.length;
    sprinklers.current = sprinklers.current.filter(s => s.x > -20);
    for (const s of sprinklers.current) { s.x -= scrollSpeed; s.angle += s.arcSpeed; }

    // Combo: count sprinklers that passed the player without hitting
    if (sprinklers.current.length < prevSprinklers && invincible.current === 0) {
      combo.current++;
      if (combo.current >= 3) {
        spawnPopText(PLAYER_X + 20, playerY.current - 30, `${combo.current}x COMBO!`, "#fbbf24", 13);
      }
    }

    // Update mushrooms
    mushrooms.current = mushrooms.current.filter(m => m.x > -30 && !m.collected);
    for (const m of mushrooms.current) {
      m.x -= scrollSpeed;
      const my = LANE_CENTERS[m.lane];
      const dx = PLAYER_X - m.x, dy = playerY.current - my;
      if (Math.sqrt(dx * dx + dy * dy) < PLAYER_R + 14) {
        m.collected = true;
        playerSpeedMult.current = 0.45;
        slowTimer.current = 130; fastTimer.current = 0;
        spawnParticles(m.x, my, "#a855f7", 10);
        spawnPopText(m.x, my - 20, "SLOWED! 🍄", "#a855f7", 13);
        combo.current = 0;
      }
    }

    // Update bees
    bees.current = bees.current.filter(b => b.x > -50 && b.active);
    for (const b of bees.current) {
      b.x -= scrollSpeed;
      if (b.x < W * 0.7) { b.chasing = true; b.angry = true; }
      if (b.chasing) { b.y = lerp(b.y, playerY.current, 0.05); b.x -= 0.8; }
      const dx = PLAYER_X - b.x, dy = playerY.current - b.y;
      if (Math.sqrt(dx * dx + dy * dy) < PLAYER_R + 12) {
        b.active = false;
        playerSpeedMult.current = 1.9;
        fastTimer.current = 160; slowTimer.current = 0;
        spawnParticles(b.x, b.y, "#fbbf24", 12);
        spawnPopText(b.x, b.y - 20, "SPEED BOOST! 🐝", "#f59e0b", 13);
      }
    }

    // Collision with sprinkler arcs
    if (invincible.current === 0) {
      for (const s of sprinklers.current) {
        const sy = LANE_CENTERS[s.lane];
        const dx = PLAYER_X - s.x, dy = playerY.current - sy;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < s.arcLen + PLAYER_R && dist > 10) {
          let diff = Math.atan2(dy, dx) - s.angle;
          while (diff > Math.PI) diff -= Math.PI * 2;
          while (diff < -Math.PI) diff += Math.PI * 2;
          if (Math.abs(diff) < s.arcWidth / 2) {
            lives.current--;
            invincible.current = 90;
            combo.current = 0;
            spawnParticles(PLAYER_X, playerY.current, "#3b82f6", 18);
            spawnPopText(PLAYER_X, playerY.current - 30, "SOAKED! 💦", "#3b82f6", 15);
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
    }

    // Check win
    if (distance.current >= WIN_DISTANCE * 10 && wonCode === "") {
      setWonCode(DISCOUNT_CODE);
      spawnPopText(W / 2, H / 2, "🎉 CODE UNLOCKED!", "#fbbf24", 20);
    }

    // Update particles
    particles.current = particles.current.filter(p => p.life > 0);
    for (const p of particles.current) { p.x += p.vx; p.y += p.vy; p.vy += 0.09; p.life -= 0.025; }

    // Update pop texts
    popTexts.current = popTexts.current.filter(t => t.life > 0);
    for (const t of popTexts.current) { t.y -= 0.8; t.life -= 0.018; }

    // ── DRAW ──────────────────────────────────────────────────────────
    // Alternating grass stripes (scrolling)
    for (let i = 0; i < LANE_COUNT; i++) {
      ctx.fillStyle = i % 2 === 0 ? GRASS_DARK : GRASS_LIGHT;
      ctx.fillRect(0, i * LANE_H, W, LANE_H);
    }

    // Scrolling grass texture lines
    ctx.strokeStyle = "rgba(0,80,0,0.18)";
    ctx.lineWidth = 1;
    for (let x = -(scrollX.current % 80); x < W; x += 80) {
      ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke();
    }

    // Scrolling horizontal grass blades
    ctx.strokeStyle = "rgba(0,100,0,0.12)";
    ctx.lineWidth = 1;
    for (let i = 0; i < LANE_COUNT; i++) {
      const y = i * LANE_H + LANE_H / 2;
      for (let x = -(scrollX.current % 40); x < W; x += 40) {
        ctx.beginPath();
        ctx.moveTo(x, y - 4);
        ctx.quadraticCurveTo(x + 5, y - 8, x + 8, y - 3);
        ctx.stroke();
      }
    }

    // Lane dividers
    ctx.setLineDash([10, 10]);
    ctx.strokeStyle = "rgba(0,60,0,0.2)";
    ctx.lineWidth = 1;
    for (let i = 1; i < LANE_COUNT; i++) {
      ctx.beginPath(); ctx.moveTo(0, i * LANE_H); ctx.lineTo(W, i * LANE_H); ctx.stroke();
    }
    ctx.setLineDash([]);

    // Draw objects
    for (const s of sprinklers.current) drawSprinkler(ctx, s);
    for (const m of mushrooms.current) drawMushroom(ctx, m, frame);
    for (const b of bees.current) drawBee(ctx, b, frame);

    // Draw player
    drawPlayer(ctx, frame, invincible.current > 0);

    // Particles
    for (const p of particles.current) {
      ctx.save();
      ctx.globalAlpha = p.life;
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = p.color; ctx.fill();
      ctx.restore();
    }

    // Pop texts
    for (const t of popTexts.current) {
      ctx.save();
      ctx.globalAlpha = t.life;
      ctx.font = `bold ${t.size}px sans-serif`;
      ctx.textAlign = "center";
      ctx.fillStyle = "#000";
      ctx.fillText(t.text, t.x + 1, t.y + 1);
      ctx.fillStyle = t.color;
      ctx.fillText(t.text, t.x, t.y);
      ctx.restore();
    }

    // ── HUD ──────────────────────────────────────────────────────────
    const currentScore = Math.floor(distance.current / 10);
    scoreRef.current = currentScore;

    // Score pill
    ctx.fillStyle = "rgba(0,0,0,0.5)";
    ctx.beginPath(); ctx.roundRect(8, 8, 140, 28, 7); ctx.fill();
    ctx.fillStyle = "#fff"; ctx.font = "bold 13px sans-serif"; ctx.textAlign = "left";
    ctx.fillText(`📏 ${currentScore} ft`, 16, 27);

    // High score pill
    ctx.fillStyle = "rgba(0,0,0,0.5)";
    ctx.beginPath(); ctx.roundRect(W - 152, 8, 144, 28, 7); ctx.fill();
    ctx.fillStyle = BRAND_GOLD; ctx.font = "bold 13px sans-serif"; ctx.textAlign = "right";
    ctx.fillText(`🏆 Best: ${highScoreRef.current} ft`, W - 14, 27);

    // Lives (hearts)
    ctx.textAlign = "center";
    for (let i = 0; i < 3; i++) {
      ctx.fillStyle = i < lives.current ? "#ef4444" : "rgba(255,255,255,0.2)";
      ctx.font = "16px sans-serif";
      ctx.fillText("❤", W / 2 - 20 + i * 20, 28);
    }

    // Combo badge
    if (combo.current >= 2) {
      ctx.fillStyle = "rgba(251,191,36,0.9)";
      ctx.beginPath(); ctx.roundRect(8, 42, 80, 18, 5); ctx.fill();
      ctx.fillStyle = "#1a1a2e"; ctx.font = "bold 10px sans-serif"; ctx.textAlign = "left";
      ctx.fillText(`${combo.current}x COMBO`, 14, 55);
    }

    // Speed bar
    const speedPct = (baseSpeed.current - 2.5) / (10 - 2.5);
    ctx.fillStyle = "rgba(0,0,0,0.35)";
    ctx.beginPath(); ctx.roundRect(8, H - 22, 100, 13, 5); ctx.fill();
    const barColor = speedPct < 0.4
      ? "#4ade80"
      : speedPct < 0.7
        ? "#fbbf24"
        : "#ef4444";
    ctx.fillStyle = barColor;
    ctx.beginPath(); ctx.roundRect(8, H - 22, 100 * speedPct, 13, 5); ctx.fill();
    ctx.fillStyle = "#fff"; ctx.font = "bold 8px sans-serif"; ctx.textAlign = "left";
    ctx.fillText("SPEED", 12, H - 12);

    // Status badge
    if (slowTimer.current > 0) {
      ctx.fillStyle = "rgba(124,58,237,0.9)";
      ctx.beginPath(); ctx.roundRect(W / 2 - 52, H - 28, 104, 20, 6); ctx.fill();
      ctx.fillStyle = "#fff"; ctx.font = "bold 11px sans-serif"; ctx.textAlign = "center";
      ctx.fillText("🍄 SLOWED!", W / 2, H - 14);
    } else if (fastTimer.current > 0) {
      ctx.fillStyle = "rgba(217,119,6,0.9)";
      ctx.beginPath(); ctx.roundRect(W / 2 - 56, H - 28, 112, 20, 6); ctx.fill();
      ctx.fillStyle = "#fff"; ctx.font = "bold 11px sans-serif"; ctx.textAlign = "center";
      ctx.fillText("🐝 BOOSTED!", W / 2, H - 14);
    }

    // Progress bar to code
    if (distance.current < WIN_DISTANCE * 10) {
      const pct = distance.current / (WIN_DISTANCE * 10);
      ctx.fillStyle = "rgba(0,0,0,0.35)";
      ctx.beginPath(); ctx.roundRect(W / 2 - 65, 40, 130, 11, 5); ctx.fill();
      ctx.fillStyle = BRAND_GOLD;
      ctx.beginPath(); ctx.roundRect(W / 2 - 65, 40, 130 * pct, 11, 5); ctx.fill();
      ctx.fillStyle = "#fff"; ctx.font = "bold 8px sans-serif"; ctx.textAlign = "center";
      ctx.fillText(`${Math.floor(pct * 100)}% to $10 code`, W / 2, 38);
    }

    setScore(currentScore);
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

  // ── Start ──────────────────────────────────────────────────────────────
  const startGame = useCallback(() => {
    cancelAnimationFrame(rafId.current);
    resetGame();
    stateRef.current = "playing";
    setDisplayState("playing");
    rafId.current = requestAnimationFrame(gameLoop);
  }, [resetGame, gameLoop]);

  useEffect(() => () => cancelAnimationFrame(rafId.current), []);

  // ── Draw idle/dead screens ─────────────────────────────────────────────
  function drawIdleScreen(ctx: CanvasRenderingContext2D) {
    // Background
    ctx.fillStyle = GRASS_DARK;
    ctx.fillRect(0, 0, W, H);
    for (let i = 0; i < LANE_COUNT; i++) {
      ctx.fillStyle = i % 2 === 0 ? GRASS_DARK : GRASS_LIGHT;
      ctx.fillRect(0, i * LANE_H, W, LANE_H);
    }
    ctx.fillStyle = "rgba(0,0,0,0.62)";
    ctx.fillRect(0, 0, W, H);

    // Brand header bar
    ctx.fillStyle = BRAND_GREEN;
    ctx.fillRect(0, 0, W, 44);
    ctx.fillStyle = BRAND_GOLD;
    ctx.font = "bold 11px sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("NEWPORT AVENUE LANDSCAPING", W / 2, 16);
    ctx.fillStyle = "#fff";
    ctx.font = "bold 20px sans-serif";
    ctx.fillText("💦  SPRINKLER DASH", W / 2, 37);

    // Tagline
    ctx.fillStyle = BRAND_LIGHT;
    ctx.font = "13px sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("Dodge sprinklers — run as far as you can!", W / 2, 68);

    // Powerup hints
    ctx.fillStyle = "#a855f7";
    ctx.font = "bold 12px sans-serif";
    ctx.fillText("🍄  Mushroom = SLOW", W / 2 - 80, 95);
    ctx.fillStyle = "#f59e0b";
    ctx.fillText("🐝  Bee = SPEED BOOST", W / 2 + 80, 95);

    // Reward hint
    ctx.fillStyle = BRAND_GOLD;
    ctx.font = "bold 13px sans-serif";
    ctx.fillText(`Run ${WIN_DISTANCE} ft → unlock $10 off: DRYDASH10`, W / 2, 120);

    // Controls
    ctx.fillStyle = "rgba(255,255,255,0.65)";
    ctx.font = "12px sans-serif";
    ctx.fillText("Tap top/bottom of screen · Swipe · or ↑↓ keys", W / 2, 143);

    // Play button
    ctx.fillStyle = BRAND_GREEN;
    ctx.beginPath(); ctx.roundRect(W / 2 - 80, 156, 160, 44, 10); ctx.fill();
    ctx.strokeStyle = BRAND_GOLD;
    ctx.lineWidth = 2;
    ctx.beginPath(); ctx.roundRect(W / 2 - 80, 156, 160, 44, 10); ctx.stroke();
    ctx.fillStyle = "#fff";
    ctx.font = "bold 17px sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("▶  TAP TO PLAY", W / 2, 183);
  }

  function drawDeadScreen(ctx: CanvasRenderingContext2D, s: number, hs: number) {
    // Background
    for (let i = 0; i < LANE_COUNT; i++) {
      ctx.fillStyle = i % 2 === 0 ? GRASS_DARK : GRASS_LIGHT;
      ctx.fillRect(0, i * LANE_H, W, LANE_H);
    }
    ctx.fillStyle = "rgba(0,0,0,0.65)";
    ctx.fillRect(0, 0, W, H);

    // Brand header
    ctx.fillStyle = BRAND_GREEN;
    ctx.fillRect(0, 0, W, 44);
    ctx.fillStyle = BRAND_GOLD;
    ctx.font = "bold 11px sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("NEWPORT AVENUE LANDSCAPING", W / 2, 16);
    ctx.fillStyle = "#fff";
    ctx.font = "bold 20px sans-serif";
    ctx.fillText("💦  SPRINKLER DASH", W / 2, 37);

    // Result
    ctx.fillStyle = "#ef4444";
    ctx.font = "bold 26px sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("SOAKED! 💦", W / 2, 82);

    ctx.fillStyle = "#fff";
    ctx.font = "bold 18px sans-serif";
    ctx.fillText(`Distance: ${s} ft`, W / 2, 112);

    ctx.fillStyle = BRAND_GOLD;
    ctx.font = "bold 15px sans-serif";
    ctx.fillText(`🏆 Best: ${hs} ft`, W / 2, 136);

    if (s >= WIN_DISTANCE) {
      ctx.fillStyle = "#4ade80";
      ctx.font = "bold 14px sans-serif";
      ctx.fillText(`🎉 Code unlocked: ${DISCOUNT_CODE}`, W / 2, 160);
    } else {
      ctx.fillStyle = BRAND_LIGHT;
      ctx.font = "13px sans-serif";
      ctx.fillText(`${WIN_DISTANCE - s} ft more to unlock $10 code`, W / 2, 160);
    }

    // Try again button
    ctx.fillStyle = BRAND_GREEN;
    ctx.beginPath(); ctx.roundRect(W / 2 - 80, 174, 160, 40, 10); ctx.fill();
    ctx.strokeStyle = BRAND_GOLD;
    ctx.lineWidth = 2;
    ctx.beginPath(); ctx.roundRect(W / 2 - 80, 174, 160, 40, 10); ctx.stroke();
    ctx.fillStyle = "#fff";
    ctx.font = "bold 15px sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("🔄  TRY AGAIN", W / 2, 199);
  }

  const handleCanvasClick = useCallback(() => {
    if (stateRef.current !== "playing") startGame();
  }, [startGame]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    if (displayState === "idle") drawIdleScreen(ctx);
    else if (displayState === "dead") drawDeadScreen(ctx, score, highScore);
  }, [displayState, score, highScore]);

  return (
    <section className="py-16" style={{ backgroundColor: "oklch(0.97 0.01 140)" }}>
      <div className="container">
        <div className="text-center mb-6">
          <div className="font-label mb-2 text-xs tracking-widest" style={{ color: BRAND_GREEN }}>
            🎮 MINI GAME
          </div>
          <h2 className="font-display font-light text-3xl mb-2" style={{ color: "oklch(0.22 0.005 0)" }}>
            Sprinkler Dash
          </h2>
          <p className="font-body text-sm" style={{ color: "oklch(0.45 0.005 30)" }}>
            Run through the lawn without getting soaked. Make it{" "}
            <strong>{WIN_DISTANCE} feet</strong> to unlock a{" "}
            <strong>$10 discount</strong> on your next service.
          </p>
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
                borderRadius: 14,
                cursor: displayState !== "playing" ? "pointer" : "default",
                touchAction: "none",
                userSelect: "none",
                boxShadow: "0 8px 32px rgba(0,0,0,0.22)",
                border: `3px solid ${BRAND_GREEN}`,
                display: "block",
              }}
            />
          </div>
        </div>

        {/* Discount code reveal */}
        {wonCode && (
          <div className="mt-6 mx-auto max-w-sm text-center p-5 rounded-xl"
            style={{ backgroundColor: BRAND_GREEN, color: "#fff" }}>
            <div className="text-2xl mb-1">🎉</div>
            <div className="font-display text-lg font-semibold mb-1">You made it!</div>
            <div className="text-xs font-semibold tracking-widest mb-1" style={{ color: BRAND_GOLD }}>
              NEWPORT AVENUE LANDSCAPING
            </div>
            <div className="font-body text-sm mb-3" style={{ color: BRAND_LIGHT }}>
              Here's your $10 off code:
            </div>
            <div className="font-mono text-2xl font-bold tracking-widest mb-3 px-4 py-2 rounded-lg"
              style={{ backgroundColor: "rgba(0,0,0,0.3)", color: BRAND_GOLD, border: `1px solid ${BRAND_GOLD}` }}>
              {wonCode}
            </div>
            <button
              onClick={() => navigator.clipboard.writeText(wonCode).then(() => setCopied(true))}
              className="text-sm px-4 py-2 rounded-lg font-semibold"
              style={{ backgroundColor: BRAND_GOLD, color: "#1a1a2e" }}>
              {copied ? "✓ Copied!" : "Copy Code"}
            </button>
            <div className="mt-2 text-xs" style={{ color: "rgba(255,255,255,0.55)" }}>
              Use at checkout on your next service booking
            </div>
          </div>
        )}

        <div className="text-center mt-4 text-xs" style={{ color: "oklch(0.55 0.005 30)" }}>
          Tap top/bottom of screen to move · Swipe up/down · or ↑↓ arrow keys
        </div>
      </div>
    </section>
  );
}
