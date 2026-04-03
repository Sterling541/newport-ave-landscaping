/* ============================================================
   DECOUPAGE SCROLL HERO — Newport Avenue Landscaping
   
   Each scene is a full-viewport sticky panel. As the user
   scrolls, the photo BLEEDS 120px above and below its section
   boundary — overlapping the Navbar above and the next
   section below — like photos layered in a physical collage.
   
   The text is minimal, typographic, editorial.
   ============================================================ */
import { useEffect, useRef, useState } from "react";

const CDN = "https://d2xsxph8kpxj0f.cloudfront.net/310519663503028182/g3pw3MRUapabcDUbhBEFxx";

const SCENES = [
  {
    image: `${CDN}/NewportAveLandcaping-13_ef32520c.jpg`,
    label: "WATER FEATURES & OUTDOOR LIVING",
    headline: ["Where Every", "Evening Feels", "Like Home."],
    italic: 2,
    position: "center 55%",
  },
  {
    image: `${CDN}/ITP_7404_28389405.jpg`,
    label: "PATIOS & HARDSCAPE",
    headline: ["Stone.", "Fire.", "Gather."],
    italic: 1,
    position: "center 45%",
  },
  {
    image: `${CDN}/NewportAveLandcaping-9_97b731b0.jpg`,
    label: "DESIGN & BUILD",
    headline: ["The Landscape", "You've Always", "Imagined."],
    italic: 1,
    position: "center 50%",
  },
  {
    image: `${CDN}/NewportLandscapingRVParkDay2Photos57_ce65cd27.jpg`,
    label: "COMMERCIAL & HOA",
    headline: ["At Scale.", "On Time.", "Every Time."],
    italic: 0,
    position: "center 40%",
  },
];

export default function HeroSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [cursor, setCursor] = useState({ x: -200, y: -200 });
  const [cursorHover, setCursorHover] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const ticking = useRef(false);

  // Custom cursor
  useEffect(() => {
    const move = (e: MouseEvent) => setCursor({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  // Scroll-driven scene switching
  useEffect(() => {
    const handleScroll = () => {
      if (!scrollRef.current || ticking.current) return;
      ticking.current = true;
      requestAnimationFrame(() => {
        if (!scrollRef.current) return;
        const rect = scrollRef.current.getBoundingClientRect();
        const scrolled = -rect.top;
        const sceneHeight = window.innerHeight;
        const newIndex = Math.max(
          0,
          Math.min(SCENES.length - 1, Math.floor(scrolled / sceneHeight))
        );
        setActiveIndex(newIndex);
        ticking.current = false;
      });
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* ── Custom cursor ── */}
      <div
        style={{
          position: "fixed",
          left: cursor.x,
          top: cursor.y,
          width: cursorHover ? "52px" : "10px",
          height: cursorHover ? "52px" : "10px",
          borderRadius: "50%",
          backgroundColor: cursorHover ? "transparent" : "oklch(0.76 0.128 184.6)",
          border: cursorHover ? "1.5px solid oklch(0.76 0.128 184.6)" : "none",
          transform: "translate(-50%, -50%)",
          pointerEvents: "none",
          zIndex: 99999,
          transition: "width 0.22s ease, height 0.22s ease",
        }}
      />

      {/* ── Scroll driver — one viewport per scene ── */}
      <div
        ref={scrollRef}
        style={{ height: `${SCENES.length * 100}vh`, position: "relative" }}
      >
        {/* ── Sticky viewport ── */}
        <div
          style={{
            position: "sticky",
            top: 0,
            height: "100vh",
            overflow: "visible", // KEY: allows photo to bleed out
          }}
        >
          {/* ── Photo bleed layers — each scene ── */}
          {SCENES.map((scene, i) => {
            const isActive = i === activeIndex;
            return (
              <div
                key={i}
                style={{
                  position: "absolute",
                  // Bleed: extend 100px above (into navbar) and 120px below (into next section)
                  top: "-100px",
                  bottom: "-120px",
                  left: 0,
                  right: 0,
                  opacity: isActive ? 1 : 0,
                  transition: "opacity 1.1s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                  zIndex: isActive ? 2 : 1,
                  pointerEvents: "none",
                }}
              >
                {/* The photo itself — fills the bleed container */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    backgroundImage: `url(${scene.image})`,
                    backgroundSize: "cover",
                    backgroundPosition: scene.position,
                    transform: isActive ? "scale(1.0)" : "scale(1.05)",
                    transition: "transform 1.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                    filter: "brightness(0.68)",
                  }}
                />
                {/* Gradient — heavier at bottom for text, lighter at top */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background:
                      "linear-gradient(170deg, oklch(0 0 0 / 0.05) 0%, oklch(0 0 0 / 0.10) 30%, oklch(0 0 0 / 0.78) 100%)",
                  }}
                />
              </div>
            );
          })}

          {/* ── UI layer — sits above photo bleed ── */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              zIndex: 10,
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
              padding: "0 clamp(1.5rem, 5vw, 4rem) clamp(3rem, 6vw, 5rem)",
            }}
          >
            {/* Scene label */}
            <div
              style={{
                fontFamily: "'Montserrat', sans-serif",
                fontSize: "0.55rem",
                fontWeight: 700,
                letterSpacing: "0.25em",
                color: "oklch(0.76 0.128 184.6)",
                marginBottom: "1.25rem",
                transition: "opacity 0.5s ease",
              }}
            >
              {SCENES[activeIndex].label}
            </div>

            {/* Massive headline */}
            <div style={{ marginBottom: "2rem" }}>
              {SCENES[activeIndex].headline.map((line, i) => (
                <div
                  key={i}
                  style={{
                    fontFamily: "'Cormorant Garamond', 'Playfair Display', Georgia, serif",
                    fontSize: "clamp(4rem, 10.5vw, 11rem)",
                    fontWeight: i === SCENES[activeIndex].italic ? 300 : 700,
                    fontStyle: i === SCENES[activeIndex].italic ? "italic" : "normal",
                    lineHeight: 0.88,
                    letterSpacing: i === SCENES[activeIndex].italic ? "0.01em" : "-0.04em",
                    color:
                      i === SCENES[activeIndex].italic
                        ? "oklch(0.76 0.128 184.6)"
                        : "oklch(0.97 0.012 75)",
                    display: "block",
                  }}
                >
                  {line}
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
              <button
                className="btn-pill-copper"
                onMouseEnter={() => setCursorHover(true)}
                onMouseLeave={() => setCursorHover(false)}
                onClick={() =>
                  document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })
                }
              >
                GET A FREE QUOTE +
              </button>
              <a
                href="/our-work"
                className="btn-pill-outline"
                onMouseEnter={() => setCursorHover(true)}
                onMouseLeave={() => setCursorHover(false)}
              >
                VIEW OUR WORK →
              </a>
            </div>
          </div>

          {/* ── Scene counter — top left ── */}
          <div
            style={{
              position: "absolute",
              top: "5.5rem",
              left: "clamp(1.5rem, 5vw, 4rem)",
              zIndex: 10,
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
            }}
          >
            <span
              style={{
                fontFamily: "'Montserrat', sans-serif",
                fontSize: "0.58rem",
                fontWeight: 700,
                letterSpacing: "0.20em",
                color: "oklch(0.76 0.128 184.6)",
              }}
            >
              {String(activeIndex + 1).padStart(2, "0")}
            </span>
            <span
              style={{
                width: "36px",
                height: "1px",
                backgroundColor: "oklch(0.35 0.008 200)",
              }}
            />
            <span
              style={{
                fontFamily: "'Montserrat', sans-serif",
                fontSize: "0.58rem",
                fontWeight: 500,
                letterSpacing: "0.20em",
                color: "oklch(0.38 0.008 200)",
              }}
            >
              {String(SCENES.length).padStart(2, "0")}
            </span>
          </div>

          {/* ── Dot progress — right edge ── */}
          <div
            style={{
              position: "absolute",
              right: "clamp(1rem, 2vw, 1.5rem)",
              top: "50%",
              transform: "translateY(-50%)",
              zIndex: 10,
              display: "flex",
              flexDirection: "column",
              gap: "0.5rem",
            }}
          >
            {SCENES.map((_, i) => (
              <button
                key={i}
                onMouseEnter={() => setCursorHover(true)}
                onMouseLeave={() => setCursorHover(false)}
                onClick={() => {
                  if (!scrollRef.current) return;
                  const targetY =
                    scrollRef.current.offsetTop + i * window.innerHeight;
                  window.scrollTo({ top: targetY, behavior: "smooth" });
                }}
                style={{
                  width: i === activeIndex ? "6px" : "4px",
                  height: i === activeIndex ? "22px" : "4px",
                  borderRadius: "999px",
                  backgroundColor:
                    i === activeIndex
                      ? "oklch(0.76 0.128 184.6)"
                      : "oklch(0.35 0.008 200)",
                  border: "none",
                  padding: 0,
                  cursor: "none",
                  transition: "all 0.3s ease",
                }}
              />
            ))}
          </div>

          {/* ── Scroll hint — visible only on first scene ── */}
          <div
            style={{
              position: "absolute",
              bottom: "clamp(1.5rem, 3vw, 2.5rem)",
              left: "50%",
              transform: "translateX(-50%)",
              zIndex: 10,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "0.4rem",
              opacity: activeIndex === 0 ? 0.7 : 0,
              transition: "opacity 0.6s ease",
              pointerEvents: "none",
            }}
          >
            <span
              style={{
                fontFamily: "'Montserrat', sans-serif",
                fontSize: "0.48rem",
                fontWeight: 600,
                letterSpacing: "0.25em",
                color: "oklch(0.50 0.008 200)",
              }}
            >
              SCROLL
            </span>
            <div
              style={{
                width: "1px",
                height: "36px",
                background:
                  "linear-gradient(to bottom, oklch(0.50 0.008 200), transparent)",
              }}
            />
          </div>
        </div>

        {/* ── Decoupage bleed panel — overlaps INTO next section ── */}
        {/* This is the key: a second sticky element that bleeds the last
            photo 120px below the scroll driver, overlapping StatsSection */}
      </div>

      {/* ── Decoupage overlap element — bleeds hero photo into next section ── */}
      <div
        style={{
          position: "relative",
          marginTop: "-120px", // Pull the next section UP under the photo
          zIndex: 0,
          height: "120px",
          background:
            "linear-gradient(to bottom, transparent 0%, oklch(0.10 0.008 200) 100%)",
          pointerEvents: "none",
        }}
      />
    </>
  );
}
