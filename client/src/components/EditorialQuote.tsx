/* ============================================================
   EDITORIAL QUOTE DIVIDER
   
   A full-bleed, edge-to-edge typographic statement that acts
   as a dramatic section break. Massive Cormorant Garamond
   italic text that bleeds to the viewport edges, with a thin
   red rule above and below. Studio Job-inspired.
   ============================================================ */
import { useEffect, useRef, useState } from "react";

interface EditorialQuoteProps {
  quote: string;
  attribution?: string;
}

export default function EditorialQuote({
  quote = "Every great outdoor space starts with a vision.",
  attribution,
}: EditorialQuoteProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{
        position: "relative",
        width: "100%",
        backgroundColor: "oklch(0.99 0.004 75)",
        borderTop: "1.5px solid oklch(0.46 0.20 25)",
        borderBottom: "1.5px solid oklch(0.46 0.20 25)",
        padding: "clamp(2.5rem, 5vw, 4.5rem) 0",
        overflow: "hidden",
      }}
    >
      {/* Large decorative quotation mark */}
      <div
        style={{
          position: "absolute",
          top: "-0.3em",
          left: "clamp(1rem, 4vw, 5rem)",
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: "clamp(12rem, 20vw, 22rem)",
          fontWeight: 700,
          lineHeight: 1,
          color: "oklch(0.46 0.20 25)",
          opacity: 0.06,
          pointerEvents: "none",
          userSelect: "none",
          zIndex: 0,
        }}
      >
        "
      </div>

      {/* Quote text */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          padding: "0 clamp(1.5rem, 6vw, 8rem)",
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(24px)",
          transition: "opacity 1.1s ease, transform 1.1s ease",
        }}
      >
        <p
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontStyle: "italic",
            fontWeight: 300,
            fontSize: "clamp(2.2rem, 5.5vw, 6rem)",
            lineHeight: 1.12,
            letterSpacing: "-0.02em",
            color: "oklch(0.18 0.012 30)",
            margin: 0,
            maxWidth: "none",
          }}
        >
          {quote}
        </p>

        {attribution && (
          <p
            style={{
              fontFamily: "'Montserrat', sans-serif",
              fontSize: "clamp(0.55rem, 1vw, 0.75rem)",
              fontWeight: 600,
              letterSpacing: "0.28em",
              textTransform: "uppercase",
              color: "oklch(0.46 0.20 25)",
              marginTop: "1.5rem",
              opacity: visible ? 1 : 0,
              transition: "opacity 1.1s ease 0.4s",
            }}
          >
            — {attribution}
          </p>
        )}
      </div>
    </div>
  );
}
