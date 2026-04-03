/* ============================================================
   BLUE SPRUCE CURSOR

   Always shows the spruce tree SVG.
   - Default state: blue-green spruce needles
   - Hover over interactive elements: needles turn red
   - Click: slight scale-down

   Usage: Mount once in Home.tsx at the top level.
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

      // Detect interactive elements for red state
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

  // Color palette — switches between green and red
  const stemColor   = isPointer ? "oklch(0.40 0.22 25)"  : "oklch(0.28 0.08 155)";
  const needleOuter = isPointer ? "oklch(0.55 0.24 25)"  : "oklch(0.45 0.13 195)";
  const needleInner = isPointer ? "oklch(0.50 0.22 25)"  : "oklch(0.40 0.14 185)";
  const needleDeep  = isPointer ? "oklch(0.42 0.20 25)"  : "oklch(0.35 0.12 185)";
  const budColor    = isPointer ? "oklch(0.65 0.22 25)"  : "oklch(0.55 0.10 155)";
  const frostColor  = isPointer ? "oklch(0.80 0.10 25)"  : "oklch(0.75 0.06 220)";

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
        // Offset so the tip bud is exactly at the cursor hotspot
        marginLeft: "-16px",
        marginTop: "-2px",
      }}
    >
      {/* ── Blue Spruce Branch Tip — always shown ── */}
      <svg
        width="32"
        height="48"
        viewBox="0 0 32 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          transform: isClicking ? "scale(0.88)" : "scale(1)",
          transition: "transform 0.1s ease, filter 0.15s ease",
          filter: isPointer
            ? "drop-shadow(0 2px 10px rgba(200,40,20,0.55))"
            : "drop-shadow(0 2px 8px rgba(0,0,0,0.6))",
        }}
      >
        {/* Main central stem — tip at top (hotspot) */}
        <line x1="16" y1="2" x2="16" y2="46" stroke={stemColor} strokeWidth="1.8" strokeLinecap="round"/>

        {/* Whorl 1 — near tip */}
        <line x1="16" y1="6"  x2="10" y2="4"  stroke={needleOuter} strokeWidth="1"   strokeLinecap="round"/>
        <line x1="16" y1="6"  x2="22" y2="4"  stroke={needleOuter} strokeWidth="1"   strokeLinecap="round"/>
        <line x1="16" y1="6"  x2="13" y2="3"  stroke={needleInner} strokeWidth="0.8" strokeLinecap="round"/>
        <line x1="16" y1="6"  x2="19" y2="3"  stroke={needleInner} strokeWidth="0.8" strokeLinecap="round"/>

        {/* Whorl 2 */}
        <line x1="16" y1="11" x2="8"  y2="8"  stroke={needleOuter} strokeWidth="1.1" strokeLinecap="round"/>
        <line x1="16" y1="11" x2="24" y2="8"  stroke={needleOuter} strokeWidth="1.1" strokeLinecap="round"/>
        <line x1="16" y1="11" x2="11" y2="7"  stroke={needleInner} strokeWidth="0.9" strokeLinecap="round"/>
        <line x1="16" y1="11" x2="21" y2="7"  stroke={needleInner} strokeWidth="0.9" strokeLinecap="round"/>
        <line x1="16" y1="11" x2="16" y2="7"  stroke={needleDeep}  strokeWidth="0.8" strokeLinecap="round"/>

        {/* Whorl 3 */}
        <line x1="16" y1="17" x2="6"  y2="13" stroke={needleOuter} strokeWidth="1.2" strokeLinecap="round"/>
        <line x1="16" y1="17" x2="26" y2="13" stroke={needleOuter} strokeWidth="1.2" strokeLinecap="round"/>
        <line x1="16" y1="17" x2="9"  y2="12" stroke={needleInner} strokeWidth="1"   strokeLinecap="round"/>
        <line x1="16" y1="17" x2="23" y2="12" stroke={needleInner} strokeWidth="1"   strokeLinecap="round"/>
        <line x1="16" y1="17" x2="16" y2="11" stroke={needleDeep}  strokeWidth="0.9" strokeLinecap="round"/>

        {/* Whorl 4 */}
        <line x1="16" y1="24" x2="4"  y2="19" stroke={needleOuter} strokeWidth="1.3" strokeLinecap="round"/>
        <line x1="16" y1="24" x2="28" y2="19" stroke={needleOuter} strokeWidth="1.3" strokeLinecap="round"/>
        <line x1="16" y1="24" x2="7"  y2="18" stroke={needleInner} strokeWidth="1.1" strokeLinecap="round"/>
        <line x1="16" y1="24" x2="25" y2="18" stroke={needleInner} strokeWidth="1.1" strokeLinecap="round"/>
        <line x1="16" y1="24" x2="16" y2="17" stroke={needleDeep}  strokeWidth="1"   strokeLinecap="round"/>

        {/* Whorl 5 */}
        <line x1="16" y1="32" x2="3"  y2="26" stroke={needleOuter} strokeWidth="1.4" strokeLinecap="round"/>
        <line x1="16" y1="32" x2="29" y2="26" stroke={needleOuter} strokeWidth="1.4" strokeLinecap="round"/>
        <line x1="16" y1="32" x2="6"  y2="25" stroke={needleInner} strokeWidth="1.2" strokeLinecap="round"/>
        <line x1="16" y1="32" x2="26" y2="25" stroke={needleInner} strokeWidth="1.2" strokeLinecap="round"/>
        <line x1="16" y1="32" x2="16" y2="24" stroke={needleDeep}  strokeWidth="1.1" strokeLinecap="round"/>

        {/* Whorl 6 — base, widest */}
        <line x1="16" y1="40" x2="2"  y2="33" stroke={needleOuter} strokeWidth="1.5" strokeLinecap="round"/>
        <line x1="16" y1="40" x2="30" y2="33" stroke={needleOuter} strokeWidth="1.5" strokeLinecap="round"/>
        <line x1="16" y1="40" x2="5"  y2="32" stroke={needleInner} strokeWidth="1.3" strokeLinecap="round"/>
        <line x1="16" y1="40" x2="27" y2="32" stroke={needleInner} strokeWidth="1.3" strokeLinecap="round"/>
        <line x1="16" y1="40" x2="16" y2="32" stroke={needleDeep}  strokeWidth="1.2" strokeLinecap="round"/>

        {/* Tiny tip bud */}
        <circle cx="16" cy="2" r="1.5" fill={budColor}/>

        {/* Frost / sheen highlights */}
        <line x1="16" y1="11" x2="8.5"  y2="8.5"  stroke={frostColor} strokeWidth="0.4" strokeLinecap="round" opacity="0.6"/>
        <line x1="16" y1="17" x2="6.5"  y2="13.5" stroke={frostColor} strokeWidth="0.4" strokeLinecap="round" opacity="0.6"/>
        <line x1="16" y1="24" x2="4.5"  y2="19.5" stroke={frostColor} strokeWidth="0.4" strokeLinecap="round" opacity="0.5"/>
        <line x1="16" y1="32" x2="3.5"  y2="26.5" stroke={frostColor} strokeWidth="0.4" strokeLinecap="round" opacity="0.5"/>
      </svg>
    </div>
  );
}
