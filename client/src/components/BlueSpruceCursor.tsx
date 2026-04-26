/* ============================================================
   LOGO ICON CURSOR

   Uses the Newport Avenue Landscaping red leaf/shield icon
   as a custom cursor.
   - Default state: full color logo icon
   - Hover over interactive elements: slight scale-up + glow
   - Click: scale-down spring

   Usage: Mount once in Home.tsx at the top level.
   ============================================================ */
import { useEffect, useRef, useState } from "react";

const LOGO_ICON_URL =
  "/manus-storage/leaf-icon-transparent_a5f29f57_15e116ee.webp";

export default function BlueSpruceCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isPointer, setIsPointer] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const posRef = useRef({ x: -100, y: -100 });
  const rafRef = useRef<number>(0);

  useEffect(() => {
    // Hide default cursor globally
    document.documentElement.style.cursor = "none";

    const moveCursor = (e: MouseEvent) => {
      posRef.current = { x: e.clientX, y: e.clientY };
      if (!isVisible) setIsVisible(true);

      // Detect interactive elements for hover state
      const target = e.target as Element;
      const isInteractive =
        target.closest(
          "a, button, [role='button'], input, textarea, select, label, [tabindex]"
        ) !== null;
      setIsPointer(isInteractive);
    };

    const animateCursor = () => {
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${posRef.current.x}px, ${posRef.current.y}px)`;
      }
      rafRef.current = requestAnimationFrame(animateCursor);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    document.documentElement.addEventListener("mouseleave", handleMouseLeave);
    document.documentElement.addEventListener("mouseenter", handleMouseEnter);

    rafRef.current = requestAnimationFrame(animateCursor);

    return () => {
      document.documentElement.style.cursor = "";
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.documentElement.removeEventListener("mouseleave", handleMouseLeave);
      document.documentElement.removeEventListener("mouseenter", handleMouseEnter);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  // Icon size: doubled from original, slightly larger on hover
  const iconSize = isPointer ? 80 : 64;

  return (
    <div
      ref={cursorRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        pointerEvents: "none",
        zIndex: 99999,
        willChange: "transform",
        opacity: isVisible ? 1 : 0,
        transition: "opacity 0.2s ease",
        // Offset so the top-left corner of the icon is at the cursor hotspot
        marginLeft: `-${iconSize / 2}px`,
        marginTop: `-${iconSize / 2}px`,
      }}
    >
      <img
        src={LOGO_ICON_URL}
        alt=""
        aria-hidden="true"
        draggable={false}
        style={{
          width: `${iconSize}px`,
          height: `${iconSize}px`,
          objectFit: "contain",
          display: "block",
          transform: isClicking ? "scale(0.82)" : "scale(1)",
          transition: "transform 0.12s ease, width 0.15s ease, height 0.15s ease, filter 0.15s ease",
          filter: isPointer
            ? "drop-shadow(0 0 3px rgba(255,255,255,0.9)) drop-shadow(0 2px 12px oklch(0.46 0.20 25 / 0.8))"
            : "drop-shadow(0 0 3px rgba(255,255,255,0.85)) drop-shadow(0 2px 8px rgba(0,0,0,0.5))",
        }}
      />
    </div>
  );
}
