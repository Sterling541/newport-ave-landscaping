/* ============================================================
   SPRINKLER DASH — Endless Runner
   - Scrolling lawn, player dodges rotating sprinkler arcs
   - Mushroom: slows you temporarily
   - Bee: speeds you up (chases you!)
   - Speed ramps up over time — no finish line
   - High score saved to localStorage
   - Touch: tap top/bottom half or swipe to move
   - Keyboard: ArrowUp / ArrowDown / W / S
   ============================================================ */
import { useEffect, useRef, useState, useCallback } from "react";

// ── Constants ──────────────────────────────────────────────────────────────
const W = 640;
const H = 320;
const PLAYER_X = 80;
const PLAYER_R = 14;
const LANE_COUNT = 5;
const LANE_H = H / LANE_COUNT;
const LANE_CENTERS = Array.from({ length: LANE_COUNT }, (_, i) => LANE_H * i + LANE_H / 2);
const DISCOUNT_CODE = "DRYDASH10";
const HIGH_SCORE_KEY = "nal_sprinkler_hs";
const WIN_DISTANCE = 1500; // feet to unlock code

// ── Types ──────────────────────────────────────────────────────────────────
interface Sprinkler {
  id: number; x: number; lane: number;
  angle: number; arcSpeed: number; arcWidth: number; arcLen: number;
}
interface Mushroom { id: number; x: number; lane: number; collected: boolean; }
interface Bee { id: number; x: number; y: number; active: boolean; chasing: boolean; }
interface Particle { x: number; y: number; vx: number; vy: number; life: number; color: string; r: number; }
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
    mushrooms.current.push({ id: nextId(), x: W + 20, lane: randInt(0, LANE_COUNT - 1), collected: false });
  }

  function spawnBee() {
    const lane = randInt(0, LANE_COUNT - 1);
    bees.current.push({ id: nextId(), x: W + 30, y: LANE_CENTERS[lane], active: true, chasing: false });
  }

  function spawnParticles(x: number, y: number, color: string, count = 12) {
    for (let i = 0; i < count; i++) {
      const a = rand(0, Math.PI * 2);
      const s = rand(1.5, 4);
      particles.current.push({ x, y, vx: Math.cos(a) * s, vy: Math.sin(a) * s, life: 1, color, r: rand(3, 7) });
    }
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
    if (frame % 240 === 0) baseSpeed.current = Math.min(baseSpeed.current + 0.22, 9.5);

    // Timers
    if (slowTimer.current > 0) { slowTimer.current--; if (slowTimer.current === 0) playerSpeedMult.current = 1.0; }
    if (fastTimer.current > 0) { fastTimer.current--; if (fastTimer.current === 0) playerSpeedMult.current = 1.0; }
    if (invincible.current > 0) invincible.current--;

    const scrollSpeed = baseSpeed.current * playerSpeedMult.current;
    distance.current += scrollSpeed;
    scrollX.current = (scrollX.current + scrollSpeed) % 64;

    // Smooth player Y
    playerY.current = lerp(playerY.current, LANE_CENTERS[targetLane.current], 0.2);

    // Spawn objects
    if (distance.current >= nextSprinklerDist.current) {
      spawnSprinkler();
      nextSprinklerDist.current = distance.current + rand(120, 260);
    }
    if (distance.current >= nextMushroomDist.current) {
      spawnMushroom();
      nextMushroomDist.current = distance.current + rand(350, 650);
    }
    if (distance.current >= nextBeeDist.current) {
      spawnBee();
      nextBeeDist.current = distance.current + rand(550, 950);
    }

    // Update sprinklers
    sprinklers.current = sprinklers.current.filter(s => s.x > -20);
    for (const s of sprinklers.current) { s.x -= scrollSpeed; s.angle += s.arcSpeed; }

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
      }
    }

    // Update bees
    bees.current = bees.current.filter(b => b.x > -50 && b.active);
    for (const b of bees.current) {
      b.x -= scrollSpeed;
      if (b.x < W * 0.75) b.chasing = true;
      if (b.chasing) { b.y = lerp(b.y, playerY.current, 0.045); b.x -= 0.6; }
      const dx = PLAYER_X - b.x, dy = playerY.current - b.y;
      if (Math.sqrt(dx * dx + dy * dy) < PLAYER_R + 12) {
        b.active = false;
        playerSpeedMult.current = 1.85;
        fastTimer.current = 160; slowTimer.current = 0;
        spawnParticles(b.x, b.y, "#fbbf24", 10);
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
            spawnParticles(PLAYER_X, playerY.current, "#3b82f6", 16);
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

    // Check win (distance threshold)
    if (distance.current >= WIN_DISTANCE * 10 && wonCode === "") {
      setWonCode(DISCOUNT_CODE);
    }

    // Update particles
    particles.current = particles.current.filter(p => p.life > 0);
    for (const p of particles.current) { p.x += p.vx; p.y += p.vy; p.vy += 0.08; p.life -= 0.025; }

    // ── DRAW ──────────────────────────────────────────────────────────
    // Grass background
    ctx.fillStyle = "#4ade80";
    ctx.fillRect(0, 0, W, H);

    // Lane shading
    for (let i = 0; i < LANE_COUNT; i++) {
      ctx.fillStyle = i % 2 === 0 ? "rgba(0,0,0,0.04)" : "rgba(255,255,255,0.05)";
      ctx.fillRect(0, i * LANE_H, W, LANE_H);
    }

    // Scrolling vertical grass lines
    ctx.strokeStyle = "rgba(0,100,0,0.13)";
    ctx.lineWidth = 1;
    for (let x = -(scrollX.current % 64); x < W; x += 64) {
      ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke();
    }

    // Lane dividers
    ctx.setLineDash([8, 8]);
    ctx.strokeStyle = "rgba(0,80,0,0.18)";
    ctx.lineWidth = 1;
    for (let i = 1; i < LANE_COUNT; i++) {
      ctx.beginPath(); ctx.moveTo(0, i * LANE_H); ctx.lineTo(W, i * LANE_H); ctx.stroke();
    }
    ctx.setLineDash([]);

    // Sprinklers
    for (const s of sprinklers.current) {
      const sy = LANE_CENTERS[s.lane];
      ctx.save(); ctx.translate(s.x, sy);
      // Arc
      ctx.beginPath(); ctx.moveTo(0, 0);
      ctx.arc(0, 0, s.arcLen, s.angle - s.arcWidth / 2, s.angle + s.arcWidth / 2);
      ctx.closePath();
      const g = ctx.createRadialGradient(0, 0, 0, 0, 0, s.arcLen);
      g.addColorStop(0, "rgba(147,210,255,0.88)");
      g.addColorStop(0.65, "rgba(100,180,255,0.5)");
      g.addColorStop(1, "rgba(100,180,255,0)");
      ctx.fillStyle = g; ctx.fill();
      // Head
      ctx.beginPath(); ctx.arc(0, 0, 9, 0, Math.PI * 2);
      ctx.fillStyle = "#6b7280"; ctx.fill();
      ctx.beginPath(); ctx.arc(0, 0, 5, 0, Math.PI * 2);
      ctx.fillStyle = "#374151"; ctx.fill();
      ctx.beginPath(); ctx.moveTo(0, 0);
      ctx.lineTo(Math.cos(s.angle) * 9, Math.sin(s.angle) * 9);
      ctx.strokeStyle = "#60a5fa"; ctx.lineWidth = 2; ctx.stroke();
      ctx.restore();
    }

    // Mushrooms
    for (const m of mushrooms.current) {
      if (m.collected) continue;
      const my = LANE_CENTERS[m.lane];
      ctx.save(); ctx.translate(m.x, my);
      ctx.fillStyle = "#fef3c7"; ctx.fillRect(-5, 2, 10, 10);
      ctx.beginPath(); ctx.arc(0, 2, 12, Math.PI, 0);
      ctx.fillStyle = "#dc2626"; ctx.fill();
      ctx.fillStyle = "#fef3c7";
      ctx.beginPath(); ctx.arc(-4, -2, 2.5, 0, Math.PI * 2); ctx.fill();
      ctx.beginPath(); ctx.arc(4, -2, 2.5, 0, Math.PI * 2); ctx.fill();
      ctx.beginPath(); ctx.arc(0, -5, 2, 0, Math.PI * 2); ctx.fill();
      ctx.font = "bold 8px sans-serif"; ctx.fillStyle = "#7c3aed";
      ctx.textAlign = "center"; ctx.fillText("SLOW", 0, 22);
      ctx.restore();
    }

    // Bees
    for (const b of bees.current) {
      if (!b.active) continue;
      ctx.save(); ctx.translate(b.x, b.y + Math.sin(frame * 0.3) * 2);
      ctx.beginPath(); ctx.ellipse(0, 0, 12, 8, 0, 0, Math.PI * 2);
      ctx.fillStyle = "#fbbf24"; ctx.fill();
      ctx.strokeStyle = "#92400e"; ctx.lineWidth = 1.5; ctx.stroke();
      ctx.strokeStyle = "#92400e"; ctx.lineWidth = 2;
      for (const sx of [-4, 0, 4]) {
        ctx.beginPath(); ctx.moveTo(sx, -7); ctx.lineTo(sx, 7); ctx.stroke();
      }
      ctx.beginPath(); ctx.ellipse(-4, -8, 7, 4, -0.3, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(200,230,255,0.75)"; ctx.fill();
      ctx.beginPath(); ctx.ellipse(4, -8, 7, 4, 0.3, 0, Math.PI * 2); ctx.fill();
      ctx.beginPath(); ctx.moveTo(12, 0); ctx.lineTo(17, 0);
      ctx.strokeStyle = "#92400e"; ctx.lineWidth = 1.5; ctx.stroke();
      ctx.font = "bold 8px sans-serif"; ctx.fillStyle = "#92400e";
      ctx.textAlign = "center"; ctx.fillText("FAST", 0, 20);
      ctx.restore();
    }

    // Player
    const blinking = invincible.current > 0 && Math.floor(invincible.current / 6) % 2 === 0;
    if (!blinking) {
      ctx.save(); ctx.translate(PLAYER_X, playerY.current);
      // Shadow
      ctx.beginPath(); ctx.ellipse(0, PLAYER_R + 2, 12, 4, 0, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(0,0,0,0.2)"; ctx.fill();
      // Run animation
      const legSwing = Math.sin(frame * 0.28) * 9;
      // Legs
      ctx.strokeStyle = "#1e40af"; ctx.lineWidth = 4; ctx.lineCap = "round";
      ctx.beginPath(); ctx.moveTo(0, 6); ctx.lineTo(-6 + legSwing, 18); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(0, 6); ctx.lineTo(6 - legSwing, 18); ctx.stroke();
      // Torso
      ctx.fillStyle = "#2563eb";
      ctx.beginPath(); ctx.roundRect(-8, -4, 16, 14, 4); ctx.fill();
      // Arms
      ctx.strokeStyle = "#2563eb"; ctx.lineWidth = 3;
      ctx.beginPath(); ctx.moveTo(-8, 0); ctx.lineTo(-14, 8 - legSwing * 0.5); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(8, 0); ctx.lineTo(14, 8 + legSwing * 0.5); ctx.stroke();
      // Head
      ctx.beginPath(); ctx.arc(0, -12, 10, 0, Math.PI * 2);
      ctx.fillStyle = "#fbbf24"; ctx.fill();
      ctx.strokeStyle = "#92400e"; ctx.lineWidth = 1; ctx.stroke();
      // Eye
      ctx.fillStyle = "#1e293b"; ctx.beginPath(); ctx.arc(3, -13, 2, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = "#fff"; ctx.beginPath(); ctx.arc(4, -14, 0.8, 0, Math.PI * 2); ctx.fill();
      ctx.restore();
    }

    // Particles
    for (const p of particles.current) {
      ctx.save(); ctx.globalAlpha = p.life;
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = p.color; ctx.fill(); ctx.restore();
    }

    // ── HUD ──────────────────────────────────────────────────────────
    const currentScore = Math.floor(distance.current / 10);
    scoreRef.current = currentScore;

    // Score pill
    ctx.fillStyle = "rgba(0,0,0,0.42)";
    ctx.beginPath(); ctx.roundRect(8, 8, 130, 26, 6); ctx.fill();
    ctx.fillStyle = "#fff"; ctx.font = "bold 12px sans-serif"; ctx.textAlign = "left";
    ctx.fillText(`📏 ${currentScore} ft`, 14, 26);

    // High score pill
    ctx.fillStyle = "rgba(0,0,0,0.42)";
    ctx.beginPath(); ctx.roundRect(W - 148, 8, 140, 26, 6); ctx.fill();
    ctx.fillStyle = "#fbbf24"; ctx.font = "bold 12px sans-serif"; ctx.textAlign = "right";
    ctx.fillText(`🏆 Best: ${highScoreRef.current}`, W - 12, 26);

    // Lives
    ctx.textAlign = "center";
    for (let i = 0; i < 3; i++) {
      ctx.fillStyle = i < lives.current ? "#ef4444" : "rgba(255,255,255,0.18)";
      ctx.font = "15px sans-serif";
      ctx.fillText("❤", W / 2 - 18 + i * 18, 26);
    }

    // Speed bar
    const speedPct = (baseSpeed.current - 2.5) / (9.5 - 2.5);
    ctx.fillStyle = "rgba(0,0,0,0.3)";
    ctx.beginPath(); ctx.roundRect(8, H - 20, 90, 12, 4); ctx.fill();
    const barColor = `oklch(${0.65 - speedPct * 0.3} 0.25 ${140 - speedPct * 100})`;
    ctx.fillStyle = barColor;
    ctx.beginPath(); ctx.roundRect(8, H - 20, 90 * speedPct, 12, 4); ctx.fill();
    ctx.fillStyle = "#fff"; ctx.font = "8px sans-serif"; ctx.textAlign = "left";
    ctx.fillText("SPEED", 11, H - 10);

    // Status badge
    if (slowTimer.current > 0) {
      ctx.fillStyle = "rgba(124,58,237,0.88)";
      ctx.beginPath(); ctx.roundRect(W / 2 - 48, H - 26, 96, 18, 5); ctx.fill();
      ctx.fillStyle = "#fff"; ctx.font = "bold 10px sans-serif"; ctx.textAlign = "center";
      ctx.fillText("🍄 SLOWED!", W / 2, H - 13);
    } else if (fastTimer.current > 0) {
      ctx.fillStyle = "rgba(217,119,6,0.88)";
      ctx.beginPath(); ctx.roundRect(W / 2 - 48, H - 26, 96, 18, 5); ctx.fill();
      ctx.fillStyle = "#fff"; ctx.font = "bold 10px sans-serif"; ctx.textAlign = "center";
      ctx.fillText("🐝 BOOSTED!", W / 2, H - 13);
    }

    // Win hint
    if (distance.current < WIN_DISTANCE * 10) {
      const pct = distance.current / (WIN_DISTANCE * 10);
      ctx.fillStyle = "rgba(0,0,0,0.3)";
      ctx.beginPath(); ctx.roundRect(W / 2 - 60, 40, 120, 10, 4); ctx.fill();
      ctx.fillStyle = "#fbbf24";
      ctx.beginPath(); ctx.roundRect(W / 2 - 60, 40, 120 * pct, 10, 4); ctx.fill();
      ctx.fillStyle = "#fff"; ctx.font = "8px sans-serif"; ctx.textAlign = "center";
      ctx.fillText(`${Math.floor(pct * 100)}% to unlock $10 code`, W / 2, 37);
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
      // Tap: move to tapped lane
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
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    if (displayState === "idle") drawIdleScreen(ctx);
    else if (displayState === "dead") drawDeadScreen(ctx, score, highScore);
  }, [displayState, score, highScore]);

  function drawIdleScreen(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = "#4ade80"; ctx.fillRect(0, 0, W, H);
    ctx.fillStyle = "rgba(0,0,0,0.52)"; ctx.fillRect(0, 0, W, H);
    ctx.textAlign = "center";
    ctx.fillStyle = "#fff"; ctx.font = "bold 26px sans-serif";
    ctx.fillText("💦 SPRINKLER DASH", W / 2, H / 2 - 52);
    ctx.font = "14px sans-serif"; ctx.fillStyle = "#d1fae5";
    ctx.fillText("Dodge sprinklers — run as far as you can!", W / 2, H / 2 - 22);
    ctx.fillText("🍄 Mushroom = SLOW  •  🐝 Bee = SPEED BOOST", W / 2, H / 2 + 4);
    ctx.fillStyle = "#fbbf24"; ctx.font = "bold 13px sans-serif";
    ctx.fillText(`Run ${WIN_DISTANCE} ft → unlock $10 off code: DRYDASH10`, W / 2, H / 2 + 30);
    ctx.fillStyle = "#fff"; ctx.font = "13px sans-serif";
    ctx.fillText("Tap top/bottom of screen · Swipe · or ↑↓ keys", W / 2, H / 2 + 56);
    ctx.fillStyle = "oklch(0.46 0.20 25)";
    ctx.beginPath(); ctx.roundRect(W / 2 - 70, H / 2 + 68, 140, 38, 8); ctx.fill();
    ctx.fillStyle = "#fff"; ctx.font = "bold 15px sans-serif";
    ctx.fillText("▶  TAP TO PLAY", W / 2, H / 2 + 92);
  }

  function drawDeadScreen(ctx: CanvasRenderingContext2D, s: number, hs: number) {
    ctx.fillStyle = "#4ade80"; ctx.fillRect(0, 0, W, H);
    ctx.fillStyle = "rgba(0,0,0,0.56)"; ctx.fillRect(0, 0, W, H);
    ctx.textAlign = "center";
    ctx.fillStyle = "#ef4444"; ctx.font = "bold 28px sans-serif";
    ctx.fillText("💦 SOAKED!", W / 2, H / 2 - 52);
    ctx.fillStyle = "#fff"; ctx.font = "20px sans-serif";
    ctx.fillText(`Distance: ${s} ft`, W / 2, H / 2 - 18);
    ctx.fillStyle = "#fbbf24"; ctx.font = "bold 17px sans-serif";
    ctx.fillText(`🏆 Best: ${hs} ft`, W / 2, H / 2 + 12);
    if (s >= WIN_DISTANCE) {
      ctx.fillStyle = "#4ade80"; ctx.font = "bold 14px sans-serif";
      ctx.fillText(`🎉 Code unlocked: ${DISCOUNT_CODE}`, W / 2, H / 2 + 38);
    } else {
      ctx.fillStyle = "#d1fae5"; ctx.font = "13px sans-serif";
      ctx.fillText(`${WIN_DISTANCE - s} ft more to unlock $10 code`, W / 2, H / 2 + 38);
    }
    ctx.fillStyle = "oklch(0.46 0.20 25)";
    ctx.beginPath(); ctx.roundRect(W / 2 - 70, H / 2 + 54, 140, 36, 8); ctx.fill();
    ctx.fillStyle = "#fff"; ctx.font = "bold 14px sans-serif";
    ctx.fillText("🔄  TRY AGAIN", W / 2, H / 2 + 77);
  }

  const handleCanvasClick = useCallback(() => {
    if (stateRef.current !== "playing") startGame();
  }, [startGame]);

  return (
    <section className="py-16" style={{ backgroundColor: "oklch(0.97 0.01 140)" }}>
      <div className="container">
        <div className="text-center mb-6">
          <div className="font-label mb-2 text-xs tracking-widest" style={{ color: "oklch(0.46 0.20 25)" }}>
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
                borderRadius: 12,
                cursor: displayState !== "playing" ? "pointer" : "default",
                touchAction: "none",
                userSelect: "none",
                boxShadow: "0 8px 32px rgba(0,0,0,0.18)",
                border: "2px solid oklch(0.85 0.04 140)",
                display: "block",
              }}
            />
          </div>
        </div>

        {/* Discount code reveal */}
        {wonCode && (
          <div className="mt-6 mx-auto max-w-sm text-center p-5 rounded-xl"
            style={{ backgroundColor: "oklch(0.22 0.005 0)", color: "#fff" }}>
            <div className="text-2xl mb-1">🎉</div>
            <div className="font-display text-lg font-semibold mb-1">You made it!</div>
            <div className="font-body text-sm mb-3" style={{ color: "#d1fae5" }}>
              Here's your $10 off code:
            </div>
            <div className="font-mono text-2xl font-bold tracking-widest mb-3 px-4 py-2 rounded-lg"
              style={{ backgroundColor: "oklch(0.46 0.20 25)", color: "#fff" }}>
              {wonCode}
            </div>
            <button
              onClick={() => navigator.clipboard.writeText(wonCode).then(() => setCopied(true))}
              className="text-sm px-4 py-2 rounded-lg font-semibold"
              style={{ backgroundColor: "#fff", color: "oklch(0.22 0.005 0)" }}>
              {copied ? "✓ Copied!" : "Copy Code"}
            </button>
            <div className="mt-2 text-xs" style={{ color: "rgba(255,255,255,0.5)" }}>
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
