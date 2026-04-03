/* ============================================================
   BLUE SPRUCE CURSOR
   
   Replaces the default cursor with a custom SVG blue spruce
   branch tip. On hover over interactive elements (a, button,
   [role="button"]) it morphs into a pointing hand with a
   spruce needle accent.
   
   Usage: Mount once in App.tsx or Home.tsx at the top level.
   ============================================================ */
import { useEffect, useRef, useState } from "react";

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

      // Check if hovering over interactive element
      const target = e.target as Element;
      const isInteractive =
        target.closest("a, button, [role='button'], input, textarea, select, label, [tabindex]") !== null;
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
        // Offset so the tip of the branch is at the cursor hotspot
        marginLeft: isPointer ? "-6px" : "-4px",
        marginTop: isPointer ? "-4px" : "-28px",
      }}
    >
      {isPointer ? (
        /* ── Pointing Hand with Spruce Needle ── */
        <svg
          width="36"
          height="44"
          viewBox="0 0 36 44"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{
            transform: isClicking ? "scale(0.88) rotate(-8deg)" : "scale(1) rotate(0deg)",
            transition: "transform 0.12s ease",
            filter: "drop-shadow(0 2px 6px rgba(0,0,0,0.5))",
          }}
        >
          {/* Hand/finger shape */}
          <path
            d="M14 2C14 1.4 14.4 1 15 1C15.6 1 16 1.4 16 2V18L17.5 16.5C18.1 15.9 19 15.9 19.6 16.5C20.2 17.1 20.2 18 19.6 18.6L16 22.2V28C16 31.3 18.7 34 22 34H24C25.1 34 26 34.9 26 36V40C26 42.2 24.2 44 22 44H10C7.8 44 6 42.2 6 40V22C6 20.9 6.9 20 8 20H14V2Z"
            fill="oklch(0.92 0.008 75)"
            stroke="oklch(0.25 0.015 155)"
            strokeWidth="1.5"
          />
          {/* Finger highlight */}
          <path
            d="M14 2C14 1.4 14.4 1 15 1C15.6 1 16 1.4 16 2V10"
            stroke="oklch(0.97 0.005 75)"
            strokeWidth="1"
            strokeLinecap="round"
          />
          {/* Spruce needle accent — small branch at top */}
          <g transform="translate(18, 0) rotate(35)">
            {/* Main stem */}
            <line x1="0" y1="0" x2="0" y2="12" stroke="oklch(0.35 0.12 155)" strokeWidth="1.2" strokeLinecap="round"/>
            {/* Needles left */}
            <line x1="0" y1="3" x2="-3" y2="1" stroke="oklch(0.40 0.14 155)" strokeWidth="0.8" strokeLinecap="round"/>
            <line x1="0" y1="5" x2="-3.5" y2="3" stroke="oklch(0.40 0.14 155)" strokeWidth="0.8" strokeLinecap="round"/>
            <line x1="0" y1="7" x2="-4" y2="5" stroke="oklch(0.40 0.14 155)" strokeWidth="0.8" strokeLinecap="round"/>
            <line x1="0" y1="9" x2="-3.5" y2="7.5" stroke="oklch(0.40 0.14 155)" strokeWidth="0.8" strokeLinecap="round"/>
            {/* Needles right */}
            <line x1="0" y1="3" x2="3" y2="1" stroke="oklch(0.40 0.14 155)" strokeWidth="0.8" strokeLinecap="round"/>
            <line x1="0" y1="5" x2="3.5" y2="3" stroke="oklch(0.40 0.14 155)" strokeWidth="0.8" strokeLinecap="round"/>
            <line x1="0" y1="7" x2="4" y2="5" stroke="oklch(0.40 0.14 155)" strokeWidth="0.8" strokeLinecap="round"/>
            <line x1="0" y1="9" x2="3.5" y2="7.5" stroke="oklch(0.40 0.14 155)" strokeWidth="0.8" strokeLinecap="round"/>
          </g>
        </svg>
      ) : (
        /* ── Blue Spruce Branch Tip ── */
        <svg
          width="32"
          height="48"
          viewBox="0 0 32 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{
            transform: isClicking ? "scale(0.9)" : "scale(1)",
            transition: "transform 0.1s ease",
            filter: "drop-shadow(0 2px 8px rgba(0,0,0,0.6))",
          }}
        >
          {/* Main central stem — tip at top (hotspot) */}
          <line x1="16" y1="2" x2="16" y2="46" stroke="oklch(0.28 0.08 155)" strokeWidth="1.8" strokeLinecap="round"/>
          
          {/* Spruce needles — arranged in whorls along the stem */}
          {/* Whorl 1 — near tip */}
          <line x1="16" y1="6" x2="10" y2="4" stroke="oklch(0.45 0.13 195)" strokeWidth="1" strokeLinecap="round"/>
          <line x1="16" y1="6" x2="22" y2="4" stroke="oklch(0.45 0.13 195)" strokeWidth="1" strokeLinecap="round"/>
          <line x1="16" y1="6" x2="13" y2="3" stroke="oklch(0.40 0.14 185)" strokeWidth="0.8" strokeLinecap="round"/>
          <line x1="16" y1="6" x2="19" y2="3" stroke="oklch(0.40 0.14 185)" strokeWidth="0.8" strokeLinecap="round"/>
          
          {/* Whorl 2 */}
          <line x1="16" y1="11" x2="8" y2="8" stroke="oklch(0.45 0.13 195)" strokeWidth="1.1" strokeLinecap="round"/>
          <line x1="16" y1="11" x2="24" y2="8" stroke="oklch(0.45 0.13 195)" strokeWidth="1.1" strokeLinecap="round"/>
          <line x1="16" y1="11" x2="11" y2="7" stroke="oklch(0.40 0.14 185)" strokeWidth="0.9" strokeLinecap="round"/>
          <line x1="16" y1="11" x2="21" y2="7" stroke="oklch(0.40 0.14 185)" strokeWidth="0.9" strokeLinecap="round"/>
          <line x1="16" y1="11" x2="16" y2="7" stroke="oklch(0.38 0.12 185)" strokeWidth="0.8" strokeLinecap="round"/>

          {/* Whorl 3 */}
          <line x1="16" y1="17" x2="6" y2="13" stroke="oklch(0.45 0.13 195)" strokeWidth="1.2" strokeLinecap="round"/>
          <line x1="16" y1="17" x2="26" y2="13" stroke="oklch(0.45 0.13 195)" strokeWidth="1.2" strokeLinecap="round"/>
          <line x1="16" y1="17" x2="9" y2="12" stroke="oklch(0.40 0.14 185)" strokeWidth="1" strokeLinecap="round"/>
          <line x1="16" y1="17" x2="23" y2="12" stroke="oklch(0.40 0.14 185)" strokeWidth="1" strokeLinecap="round"/>
          <line x1="16" y1="17" x2="16" y2="11" stroke="oklch(0.38 0.12 185)" strokeWidth="0.9" strokeLinecap="round"/>

          {/* Whorl 4 */}
          <line x1="16" y1="24" x2="4" y2="19" stroke="oklch(0.42 0.13 195)" strokeWidth="1.3" strokeLinecap="round"/>
          <line x1="16" y1="24" x2="28" y2="19" stroke="oklch(0.42 0.13 195)" strokeWidth="1.3" strokeLinecap="round"/>
          <line x1="16" y1="24" x2="7" y2="18" stroke="oklch(0.38 0.14 185)" strokeWidth="1.1" strokeLinecap="round"/>
          <line x1="16" y1="24" x2="25" y2="18" stroke="oklch(0.38 0.14 185)" strokeWidth="1.1" strokeLinecap="round"/>
          <line x1="16" y1="24" x2="16" y2="17" stroke="oklch(0.35 0.12 185)" strokeWidth="1" strokeLinecap="round"/>

          {/* Whorl 5 */}
          <line x1="16" y1="32" x2="3" y2="26" stroke="oklch(0.40 0.13 195)" strokeWidth="1.4" strokeLinecap="round"/>
          <line x1="16" y1="32" x2="29" y2="26" stroke="oklch(0.40 0.13 195)" strokeWidth="1.4" strokeLinecap="round"/>
          <line x1="16" y1="32" x2="6" y2="25" stroke="oklch(0.36 0.14 185)" strokeWidth="1.2" strokeLinecap="round"/>
          <line x1="16" y1="32" x2="26" y2="25" stroke="oklch(0.36 0.14 185)" strokeWidth="1.2" strokeLinecap="round"/>
          <line x1="16" y1="32" x2="16" y2="24" stroke="oklch(0.33 0.12 185)" strokeWidth="1.1" strokeLinecap="round"/>

          {/* Whorl 6 — base, widest */}
          <line x1="16" y1="40" x2="2" y2="33" stroke="oklch(0.38 0.13 195)" strokeWidth="1.5" strokeLinecap="round"/>
          <line x1="16" y1="40" x2="30" y2="33" stroke="oklch(0.38 0.13 195)" strokeWidth="1.5" strokeLinecap="round"/>
          <line x1="16" y1="40" x2="5" y2="32" stroke="oklch(0.34 0.14 185)" strokeWidth="1.3" strokeLinecap="round"/>
          <line x1="16" y1="40" x2="27" y2="32" stroke="oklch(0.34 0.14 185)" strokeWidth="1.3" strokeLinecap="round"/>
          <line x1="16" y1="40" x2="16" y2="32" stroke="oklch(0.31 0.12 185)" strokeWidth="1.2" strokeLinecap="round"/>

          {/* Tiny tip bud */}
          <circle cx="16" cy="2" r="1.5" fill="oklch(0.55 0.10 155)"/>
          
          {/* Blue-silver frost highlights on some needles */}
          <line x1="16" y1="11" x2="8.5" y2="8.5" stroke="oklch(0.75 0.06 220)" strokeWidth="0.4" strokeLinecap="round" opacity="0.6"/>
          <line x1="16" y1="17" x2="6.5" y2="13.5" stroke="oklch(0.75 0.06 220)" strokeWidth="0.4" strokeLinecap="round" opacity="0.6"/>
          <line x1="16" y1="24" x2="4.5" y2="19.5" stroke="oklch(0.75 0.06 220)" strokeWidth="0.4" strokeLinecap="round" opacity="0.5"/>
          <line x1="16" y1="32" x2="3.5" y2="26.5" stroke="oklch(0.75 0.06 220)" strokeWidth="0.4" strokeLinecap="round" opacity="0.5"/>
        </svg>
      )}
    </div>
  );
}
