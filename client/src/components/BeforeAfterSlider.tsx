/* ============================================================
   BEFORE / AFTER SLIDER — Newport Avenue Landscaping
   Drag the divider to reveal before vs after photos.
   Uses pointer events for mouse + touch support.
   ============================================================ */
import { useRef, useState, useCallback, useEffect } from "react";
import { MoveHorizontal } from "lucide-react";

export interface BeforeAfterSliderProps {
  beforeSrc: string;
  afterSrc: string;
  beforeAlt?: string;
  afterAlt?: string;
  /** Optional caption shown below the slider */
  caption?: string;
  /** Initial split position 0–100, default 50 */
  initialPosition?: number;
  /** Aspect ratio of the container, default "56.25%" (16:9) */
  aspectRatio?: string;
}

export default function BeforeAfterSlider({
  beforeSrc,
  afterSrc,
  beforeAlt = "Before landscaping",
  afterAlt = "After landscaping",
  caption,
  initialPosition = 50,
  aspectRatio = "56.25%",
}: BeforeAfterSliderProps) {
  const [position, setPosition] = useState(initialPosition);
  const containerRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const updatePosition = useCallback((clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const pct = Math.min(100, Math.max(0, ((clientX - rect.left) / rect.width) * 100));
    setPosition(pct);
  }, []);

  const onPointerDown = useCallback((e: React.PointerEvent) => {
    dragging.current = true;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    updatePosition(e.clientX);
  }, [updatePosition]);

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    if (!dragging.current) return;
    updatePosition(e.clientX);
  }, [updatePosition]);

  const onPointerUp = useCallback(() => {
    dragging.current = false;
  }, []);

  // Keyboard accessibility
  const onKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") setPosition(p => Math.max(0, p - 2));
    if (e.key === "ArrowRight") setPosition(p => Math.min(100, p + 2));
  }, []);

  return (
    <div>
      {/* Slider container */}
      <div
        ref={containerRef}
        style={{
          position: "relative",
          width: "100%",
          paddingBottom: aspectRatio,
          overflow: "hidden",
          borderRadius: "2px",
          cursor: "ew-resize",
          userSelect: "none",
          touchAction: "none",
        }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        tabIndex={0}
        onKeyDown={onKeyDown}
        role="slider"
        aria-label="Before and after comparison slider"
        aria-valuenow={Math.round(position)}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        {/* AFTER image — full width, underneath */}
        <img
          src={afterSrc}
          alt={afterAlt}
          loading="lazy"
          width="1200"
          height="800"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            pointerEvents: "none",
            draggable: false,
          } as React.CSSProperties}
          draggable={false}
        />

        {/* BEFORE image — clipped to left side */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            width: `${position}%`,
            overflow: "hidden",
          }}
        >
          <img
            src={beforeSrc}
            alt={beforeAlt}
            loading="lazy"
            width="1200"
            height="800"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: containerRef.current ? `${containerRef.current.offsetWidth}px` : "100%",
              height: "100%",
              objectFit: "cover",
              pointerEvents: "none",
            } as React.CSSProperties}
            draggable={false}
          />
        </div>

        {/* Divider line */}
        <div
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            left: `${position}%`,
            transform: "translateX(-50%)",
            width: "2px",
            backgroundColor: "oklch(1 0 0)",
            boxShadow: "0 0 8px oklch(0 0 0 / 0.5)",
            pointerEvents: "none",
          }}
        />

        {/* Handle circle */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: `${position}%`,
            transform: "translate(-50%, -50%)",
            width: "44px",
            height: "44px",
            borderRadius: "50%",
            backgroundColor: "oklch(1 0 0)",
            boxShadow: "0 2px 12px oklch(0 0 0 / 0.35)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            pointerEvents: "none",
          }}
        >
          <MoveHorizontal size={18} style={{ color: "oklch(0.18 0.005 0)" }} />
        </div>

        {/* BEFORE label */}
        <div
          style={{
            position: "absolute",
            top: "12px",
            left: "12px",
            backgroundColor: "oklch(0.12 0.005 0 / 0.75)",
            color: "#fff",
            fontSize: "0.60rem",
            letterSpacing: "0.14em",
            fontFamily: "var(--font-label, sans-serif)",
            padding: "4px 10px",
            borderRadius: "2px",
            pointerEvents: "none",
            opacity: position > 15 ? 1 : 0,
            transition: "opacity 0.2s",
          }}
        >
          BEFORE
        </div>

        {/* AFTER label */}
        <div
          style={{
            position: "absolute",
            top: "12px",
            right: "12px",
            backgroundColor: "oklch(0.46 0.20 25 / 0.85)",
            color: "#fff",
            fontSize: "0.60rem",
            letterSpacing: "0.14em",
            fontFamily: "var(--font-label, sans-serif)",
            padding: "4px 10px",
            borderRadius: "2px",
            pointerEvents: "none",
            opacity: position < 85 ? 1 : 0,
            transition: "opacity 0.2s",
          }}
        >
          AFTER
        </div>
      </div>

      {/* Caption */}
      {caption && (
        <p
          style={{
            marginTop: "0.75rem",
            fontSize: "0.80rem",
            color: "oklch(0.48 0.005 0)",
            fontFamily: "var(--font-body, sans-serif)",
            lineHeight: 1.5,
            textAlign: "center",
          }}
        >
          {caption}
        </p>
      )}
    </div>
  );
}
