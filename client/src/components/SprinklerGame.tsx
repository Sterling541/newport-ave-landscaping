/* ============================================================
   SPRINKLER DODGE GAME
   Run your lawn-mower guy across the grass without getting wet!
   Win → reveal DRYDASH10 discount code ($10 off service)
   ============================================================ */
import { useEffect, useRef, useState, useCallback } from "react";

// ── Constants ──────────────────────────────────────────────────────────────────
const CANVAS_W = 700;
const CANVAS_H = 320;
const PLAYER_W = 28;
const PLAYER_H = 36;
const PLAYER_X = 48;          // fixed horizontal position
const GOAL_X = CANVAS_W - 60; // finish line x
const PLAYER_SPEED = 3.2;
const LIVES = 3;
const INVINCIBLE_MS = 1200;   // brief invincibility after hit
const DISCOUNT_CODE = "DRYDASH10";

// Sprinkler config per wave
interface SprinklerDef {
  x: number;
  y: number;
  speed: number;   // rotation speed rad/s
  arcLen: number;  // arc sweep in radians
  range: number;   // spray range px
  startAngle: number;
}

const WAVES: SprinklerDef[][] = [
  // Wave 1 – easy
  [
    { x: 220, y: 80,  speed: 1.2, arcLen: 1.4, range: 90,  startAngle: 0 },
    { x: 420, y: 240, speed: 1.0, arcLen: 1.6, range: 100, startAngle: Math.PI },
  ],
  // Wave 2 – medium
  [
    { x: 200, y: 60,  speed: 1.5, arcLen: 1.6, range: 100, startAngle: 0.3 },
    { x: 360, y: 200, speed: 1.3, arcLen: 1.8, range: 110, startAngle: 2.0 },
    { x: 520, y: 100, speed: 1.1, arcLen: 1.4, range: 95,  startAngle: 1.0 },
  ],
  // Wave 3 – hard
  [
    { x: 190, y: 70,  speed: 1.8, arcLen: 1.8, range: 110, startAngle: 0 },
    { x: 330, y: 240, speed: 1.6, arcLen: 2.0, range: 120, startAngle: 1.5 },
    { x: 470, y: 120, speed: 1.4, arcLen: 1.6, range: 105, startAngle: 3.0 },
    { x: 590, y: 230, speed: 1.2, arcLen: 1.4, range: 95,  startAngle: 0.8 },
  ],
];

// ── Helpers ────────────────────────────────────────────────────────────────────
function pointInArc(
  px: number, py: number,
  cx: number, cy: number,
  range: number,
  startAngle: number,
  arcLen: number
): boolean {
  const dx = px - cx;
  const dy = py - cy;
  const dist = Math.sqrt(dx * dx + dy * dy);
  if (dist > range || dist < 8) return false;
  let angle = Math.atan2(dy, dx);
  // normalise angle into [startAngle, startAngle+arcLen]
  let diff = angle - startAngle;
  diff = ((diff % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2);
  return diff < arcLen;
}

// ── Component ──────────────────────────────────────────────────────────────────
type GameState = "idle" | "playing" | "dead" | "won";

export default function SprinklerGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stateRef = useRef<GameState>("idle");
  const livesRef = useRef(LIVES);
  const playerYRef = useRef(CANVAS_H / 2);
  const playerXRef = useRef(PLAYER_X);
  const invincibleUntilRef = useRef(0);
  const keysRef = useRef<Set<string>>(new Set());
  const sprinklersRef = useRef<Array<SprinklerDef & { angle: number }>>([]);
  const waveRef = useRef(0);
  const rafRef = useRef<number>(0);
  const lastTimeRef = useRef<number>(0);
  const touchStartYRef = useRef<number | null>(null);
  const touchDirRef = useRef<number>(0); // -1 up, 0 none, 1 down

  const [uiState, setUiState] = useState<GameState>("idle");
  const [uiLives, setUiLives] = useState(LIVES);
  const [showCode, setShowCode] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 640);
  }, []);

  // ── Initialise wave ──────────────────────────────────────────────────────────
  const initWave = useCallback((wave: number) => {
    const defs = WAVES[Math.min(wave, WAVES.length - 1)];
    sprinklersRef.current = defs.map(d => ({ ...d, angle: d.startAngle }));
    playerXRef.current = PLAYER_X;
    playerYRef.current = CANVAS_H / 2;
  }, []);

  // ── Start game ───────────────────────────────────────────────────────────────
  const startGame = useCallback(() => {
    stateRef.current = "playing";
    livesRef.current = LIVES;
    waveRef.current = 0;
    invincibleUntilRef.current = 0;
    setUiLives(LIVES);
    setUiState("playing");
    setShowCode(false);
    initWave(0);
  }, [initWave]);

  // ── Game loop ────────────────────────────────────────────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;

    function loop(ts: number) {
      const dt = Math.min((ts - lastTimeRef.current) / 1000, 0.05);
      lastTimeRef.current = ts;

      const state = stateRef.current;

      // ── Draw background ──────────────────────────────────────────────────────
      // Sky gradient
      const sky = ctx.createLinearGradient(0, 0, 0, CANVAS_H);
      sky.addColorStop(0, "#b8e4ff");
      sky.addColorStop(1, "#e8f5e9");
      ctx.fillStyle = sky;
      ctx.fillRect(0, 0, CANVAS_W, CANVAS_H);

      // Grass
      const grass = ctx.createLinearGradient(0, 60, 0, CANVAS_H);
      grass.addColorStop(0, "#4caf50");
      grass.addColorStop(1, "#2e7d32");
      ctx.fillStyle = grass;
      ctx.fillRect(0, 60, CANVAS_W, CANVAS_H - 60);

      // Grass stripe texture
      ctx.globalAlpha = 0.07;
      for (let i = 0; i < CANVAS_W; i += 20) {
        ctx.fillStyle = i % 40 === 0 ? "#000" : "#fff";
        ctx.fillRect(i, 60, 20, CANVAS_H - 60);
      }
      ctx.globalAlpha = 1;

      // Finish line
      ctx.strokeStyle = "#fff";
      ctx.lineWidth = 3;
      ctx.setLineDash([10, 8]);
      ctx.beginPath();
      ctx.moveTo(GOAL_X, 60);
      ctx.lineTo(GOAL_X, CANVAS_H);
      ctx.stroke();
      ctx.setLineDash([]);

      // "FINISH" label
      ctx.fillStyle = "#fff";
      ctx.font = "bold 11px 'Montserrat', sans-serif";
      ctx.textAlign = "center";
      ctx.fillText("FINISH", GOAL_X, 78);

      // Start label
      ctx.fillStyle = "rgba(255,255,255,0.7)";
      ctx.font = "10px 'Montserrat', sans-serif";
      ctx.fillText("START", PLAYER_X, 78);

      if (state === "idle" || state === "dead" || state === "won") {
        drawOverlay(ctx, state);
        rafRef.current = requestAnimationFrame(loop);
        return;
      }

      // ── Update sprinklers ────────────────────────────────────────────────────
      const sprinklers = sprinklersRef.current;
      for (const s of sprinklers) {
        s.angle += s.speed * dt;
      }

      // ── Draw sprinklers ──────────────────────────────────────────────────────
      for (const s of sprinklers) {
        // Head
        ctx.fillStyle = "#888";
        ctx.beginPath();
        ctx.arc(s.x, s.y, 7, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = "#555";
        ctx.beginPath();
        ctx.arc(s.x, s.y, 4, 0, Math.PI * 2);
        ctx.fill();

        // Water arc
        const waterGrad = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, s.range);
        waterGrad.addColorStop(0, "rgba(100,180,255,0.85)");
        waterGrad.addColorStop(0.6, "rgba(100,180,255,0.4)");
        waterGrad.addColorStop(1, "rgba(100,180,255,0)");
        ctx.fillStyle = waterGrad;
        ctx.beginPath();
        ctx.moveTo(s.x, s.y);
        ctx.arc(s.x, s.y, s.range, s.angle, s.angle + s.arcLen);
        ctx.closePath();
        ctx.fill();

        // Water droplets along arc edge
        ctx.fillStyle = "rgba(150,210,255,0.9)";
        for (let i = 0; i <= 6; i++) {
          const a = s.angle + (s.arcLen / 6) * i;
          const r = s.range * (0.7 + 0.3 * Math.sin(ts * 0.003 + i));
          const dx = Math.cos(a) * r;
          const dy = Math.sin(a) * r;
          ctx.beginPath();
          ctx.arc(s.x + dx, s.y + dy, 2.5, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // ── Update player ────────────────────────────────────────────────────────
      const keys = keysRef.current;
      let dy = 0;
      if (keys.has("ArrowUp") || keys.has("w") || keys.has("W")) dy -= 1;
      if (keys.has("ArrowDown") || keys.has("s") || keys.has("S")) dy += 1;
      // Touch
      dy += touchDirRef.current;

      playerYRef.current = Math.max(
        65 + PLAYER_H / 2,
        Math.min(CANVAS_H - PLAYER_H / 2, playerYRef.current + dy * PLAYER_SPEED * 60 * dt)
      );

      // Advance player horizontally
      playerXRef.current = Math.min(GOAL_X + 10, playerXRef.current + PLAYER_SPEED * 60 * dt * 0.18);

      // ── Collision detection ──────────────────────────────────────────────────
      const now = performance.now();
      const invincible = now < invincibleUntilRef.current;
      if (!invincible) {
        const px = playerXRef.current;
        const py = playerYRef.current;
        for (const s of sprinklers) {
          // Check a few points on the player hitbox
          const pts = [
            [px, py - PLAYER_H * 0.3],
            [px - PLAYER_W * 0.3, py + PLAYER_H * 0.2],
            [px + PLAYER_W * 0.3, py + PLAYER_H * 0.2],
          ];
          for (const [qx, qy] of pts) {
            if (pointInArc(qx, qy, s.x, s.y, s.range, s.angle, s.arcLen)) {
              livesRef.current -= 1;
              invincibleUntilRef.current = now + INVINCIBLE_MS;
              setUiLives(livesRef.current);
              if (livesRef.current <= 0) {
                stateRef.current = "dead";
                setUiState("dead");
              }
              break;
            }
          }
          if (stateRef.current === "dead") break;
        }
      }

      // ── Check win ────────────────────────────────────────────────────────────
      if (playerXRef.current >= GOAL_X) {
        stateRef.current = "won";
        setUiState("won");
        setShowCode(true);
      }

      // ── Draw player ──────────────────────────────────────────────────────────
      const px = playerXRef.current;
      const py = playerYRef.current;
      const blink = invincible && Math.floor(now / 120) % 2 === 0;

      if (!blink) {
        // Body
        ctx.fillStyle = "#f5a623";
        ctx.beginPath();
        ctx.roundRect(px - PLAYER_W / 2, py - PLAYER_H * 0.4, PLAYER_W, PLAYER_H * 0.7, 4);
        ctx.fill();

        // Head
        ctx.fillStyle = "#ffd5a8";
        ctx.beginPath();
        ctx.arc(px, py - PLAYER_H * 0.45, 11, 0, Math.PI * 2);
        ctx.fill();

        // Hat (straw hat)
        ctx.fillStyle = "#c8a000";
        ctx.beginPath();
        ctx.ellipse(px, py - PLAYER_H * 0.55, 14, 4, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = "#e6b800";
        ctx.beginPath();
        ctx.ellipse(px, py - PLAYER_H * 0.62, 9, 6, 0, 0, Math.PI * 2);
        ctx.fill();

        // Legs (animated walk)
        const legPhase = ts * 0.008;
        ctx.strokeStyle = "#333";
        ctx.lineWidth = 3;
        ctx.lineCap = "round";
        ctx.beginPath();
        ctx.moveTo(px - 5, py + PLAYER_H * 0.25);
        ctx.lineTo(px - 5 + Math.sin(legPhase) * 6, py + PLAYER_H * 0.55);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(px + 5, py + PLAYER_H * 0.25);
        ctx.lineTo(px + 5 + Math.sin(legPhase + Math.PI) * 6, py + PLAYER_H * 0.55);
        ctx.stroke();
      }

      rafRef.current = requestAnimationFrame(loop);
    }

    function drawOverlay(ctx: CanvasRenderingContext2D, state: GameState) {
      if (state === "idle") {
        ctx.fillStyle = "rgba(0,0,0,0.45)";
        ctx.fillRect(0, 0, CANVAS_W, CANVAS_H);
        ctx.fillStyle = "#fff";
        ctx.font = "bold 28px 'Cormorant Garamond', serif";
        ctx.textAlign = "center";
        ctx.fillText("🌿 Sprinkler Dodge!", CANVAS_W / 2, CANVAS_H / 2 - 30);
        ctx.font = "16px 'Montserrat', sans-serif";
        ctx.fillText("Run through the lawn without getting wet.", CANVAS_W / 2, CANVAS_H / 2 + 5);
        ctx.fillText("Win and get $10 off your service!", CANVAS_W / 2, CANVAS_H / 2 + 28);
        ctx.font = "13px 'Montserrat', sans-serif";
        ctx.fillStyle = "rgba(255,255,255,0.7)";
        ctx.fillText("↑ ↓ arrow keys or W/S to move · tap buttons on mobile", CANVAS_W / 2, CANVAS_H / 2 + 58);
      } else if (state === "dead") {
        ctx.fillStyle = "rgba(0,0,0,0.55)";
        ctx.fillRect(0, 0, CANVAS_W, CANVAS_H);
        ctx.fillStyle = "#ff6b6b";
        ctx.font = "bold 30px 'Cormorant Garamond', serif";
        ctx.textAlign = "center";
        ctx.fillText("💦 You got soaked!", CANVAS_W / 2, CANVAS_H / 2 - 20);
        ctx.fillStyle = "#fff";
        ctx.font = "16px 'Montserrat', sans-serif";
        ctx.fillText("Better luck next time — try again!", CANVAS_W / 2, CANVAS_H / 2 + 15);
      } else if (state === "won") {
        ctx.fillStyle = "rgba(0,50,0,0.6)";
        ctx.fillRect(0, 0, CANVAS_W, CANVAS_H);
        ctx.fillStyle = "#a8ff78";
        ctx.font = "bold 30px 'Cormorant Garamond', serif";
        ctx.textAlign = "center";
        ctx.fillText("🎉 You made it through dry!", CANVAS_W / 2, CANVAS_H / 2 - 20);
        ctx.fillStyle = "#fff";
        ctx.font = "16px 'Montserrat', sans-serif";
        ctx.fillText("Your $10 discount code is below ↓", CANVAS_W / 2, CANVAS_H / 2 + 15);
      }
    }

    rafRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  // ── Keyboard listeners ───────────────────────────────────────────────────────
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      keysRef.current.add(e.key);
      if (["ArrowUp", "ArrowDown"].includes(e.key)) e.preventDefault();
    };
    const up = (e: KeyboardEvent) => keysRef.current.delete(e.key);
    window.addEventListener("keydown", down);
    window.addEventListener("keyup", up);
    return () => {
      window.removeEventListener("keydown", down);
      window.removeEventListener("keyup", up);
    };
  }, []);

  // ── Touch listeners ──────────────────────────────────────────────────────────
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartYRef.current = e.touches[0].clientY;
  };
  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchStartYRef.current === null) return;
    const dy = e.touches[0].clientY - touchStartYRef.current;
    touchDirRef.current = dy > 5 ? 1 : dy < -5 ? -1 : 0;
    e.preventDefault();
  };
  const handleTouchEnd = () => {
    touchDirRef.current = 0;
    touchStartYRef.current = null;
  };

  const copyCode = () => {
    navigator.clipboard.writeText(DISCOUNT_CODE).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  // Scale canvas for mobile
  const scale = isMobile ? Math.min(1, (window.innerWidth - 32) / CANVAS_W) : 1;

  return (
    <div className="flex flex-col items-center gap-4 py-8 px-4">
      {/* Header */}
      <div className="text-center mb-2">
        <h2 className="font-serif text-3xl font-bold text-stone-800 mb-1">🌿 Sprinkler Dodge</h2>
        <p className="text-stone-500 text-sm">
          Run through the lawn without getting wet — win a <strong>$10 discount</strong> on your service!
        </p>
      </div>

      {/* Lives display */}
      {uiState === "playing" && (
        <div className="flex items-center gap-2 text-sm font-semibold text-stone-700">
          <span>Lives:</span>
          {Array.from({ length: LIVES }).map((_, i) => (
            <span key={i} className={i < uiLives ? "text-red-500 text-lg" : "text-stone-300 text-lg"}>
              {i < uiLives ? "❤️" : "🖤"}
            </span>
          ))}
        </div>
      )}

      {/* Canvas */}
      <div
        className="relative rounded-xl overflow-hidden shadow-2xl border-2 border-green-200"
        style={{
          width: CANVAS_W * scale,
          height: CANVAS_H * scale,
          cursor: uiState === "playing" ? "none" : "default",
        }}
      >
        <canvas
          ref={canvasRef}
          width={CANVAS_W}
          height={CANVAS_H}
          style={{ width: CANVAS_W * scale, height: CANVAS_H * scale, display: "block" }}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        />
      </div>

      {/* Mobile controls */}
      {uiState === "playing" && (
        <div className="flex gap-6 sm:hidden mt-1">
          <button
            className="w-16 h-16 rounded-full bg-green-700 text-white text-2xl font-bold shadow-lg active:bg-green-900 select-none"
            onTouchStart={() => { keysRef.current.add("ArrowUp"); }}
            onTouchEnd={() => { keysRef.current.delete("ArrowUp"); }}
            onMouseDown={() => { keysRef.current.add("ArrowUp"); }}
            onMouseUp={() => { keysRef.current.delete("ArrowUp"); }}
          >
            ↑
          </button>
          <button
            className="w-16 h-16 rounded-full bg-green-700 text-white text-2xl font-bold shadow-lg active:bg-green-900 select-none"
            onTouchStart={() => { keysRef.current.add("ArrowDown"); }}
            onTouchEnd={() => { keysRef.current.delete("ArrowDown"); }}
            onMouseDown={() => { keysRef.current.add("ArrowDown"); }}
            onMouseUp={() => { keysRef.current.delete("ArrowDown"); }}
          >
            ↓
          </button>
        </div>
      )}

      {/* CTA buttons */}
      {uiState === "idle" && (
        <button
          onClick={startGame}
          className="mt-2 px-8 py-3 bg-green-700 hover:bg-green-800 text-white font-bold rounded-full text-base shadow-lg transition-all hover:scale-105 active:scale-95"
        >
          🏃 Start Running!
        </button>
      )}
      {uiState === "dead" && (
        <button
          onClick={startGame}
          className="mt-2 px-8 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-full text-base shadow-lg transition-all hover:scale-105 active:scale-95"
        >
          💦 Try Again
        </button>
      )}

      {/* Win state — discount code */}
      {uiState === "won" && showCode && (
        <div className="mt-2 flex flex-col items-center gap-3 bg-green-50 border-2 border-green-400 rounded-2xl px-8 py-6 shadow-xl max-w-sm w-full text-center">
          <div className="text-4xl">🎉</div>
          <p className="text-green-800 font-bold text-lg">You stayed dry!</p>
          <p className="text-stone-600 text-sm">Use this code at checkout for <strong>$10 off</strong> your service:</p>
          <div className="flex items-center gap-3 bg-white border-2 border-green-300 rounded-xl px-5 py-3 shadow-inner">
            <span className="font-mono text-2xl font-extrabold text-green-700 tracking-widest">{DISCOUNT_CODE}</span>
            <button
              onClick={copyCode}
              className="ml-2 px-3 py-1.5 bg-green-700 hover:bg-green-800 text-white text-xs font-bold rounded-lg transition-all"
            >
              {copied ? "✓ Copied!" : "Copy"}
            </button>
          </div>
          <p className="text-xs text-stone-400">Mention this code when you schedule your service.</p>
          <button
            onClick={startGame}
            className="mt-1 text-sm text-green-700 underline hover:text-green-900"
          >
            Play again
          </button>
        </div>
      )}
    </div>
  );
}
