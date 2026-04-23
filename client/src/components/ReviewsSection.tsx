/* ============================================================
   REVIEWS SECTION — Wild Editorial Pull-Quote
   - One massive quote printed at 4-5vw across full width
   - Giant opening quotation mark (decorative, red)
   - Reviewer name + stars below
   - Rotating quotes with fade transition
   - Section label: 04 / WHAT CLIENTS SAY
   - NO teal — red accents only
   ============================================================ */
import { useEffect, useRef, useState } from "react";

const REVIEWS = [
  {
    name: "Kelly Meyer",
    tag: "Full Landscape Build",
    text: "We just can't say enough about how pleased we are with the work Newport Avenue Landscaping did for us. From design to tree removal, new SOD, irrigation, pavers and plants. Our yard looks amazing!",
    stars: 5,
  },
  {
    name: "Michael Geers",
    tag: "Irrigation Repair",
    text: "Great service! I had major irrigation problems and they fixed them for me way cheaper than I was quoted from 4 other businesses! Highly recommend!",
    stars: 5,
  },
  {
    name: "Melanie Grandjacques",
    tag: "Yard Transformation",
    text: "Thanks to Newport Avenue Landscaping for our amazing yard transformation!! Nate, Chris, Francis and crew were so great to work with. Results are beautiful!!",
    stars: 5,
  },
  {
    name: "Gary LeFebvre",
    tag: "Sprinkler Service",
    text: "I called Janna at Newport and she was able to move heaven and earth to get me on the schedule. A technician showed up the next day and did a very professional and thorough job. I am very grateful and have signed up for your permanent service.",
    stars: 5,
  },
  {
    name: "Jennifer Yarbrough",
    tag: "Lawn Maintenance",
    text: "We used Newport Landscaping for our lawn and could not be happier. The quality of grass cutting was excellent. I love their office staff! Mikaya is amazing!! Super efficient, helpful and kind.",
    stars: 5,
  },
];

export default function ReviewsSection() {
  const [active, setActive] = useState(0);
  const [fading, setFading] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  // Auto-advance every 7s
  useEffect(() => {
    const t = setInterval(() => {
      setFading(true);
      setTimeout(() => {
        setActive((a) => (a + 1) % REVIEWS.length);
        setFading(false);
      }, 350);
    }, 7000);
    return () => clearInterval(t);
  }, [active]);

  const goTo = (i: number) => {
    if (i === active) return;
    setFading(true);
    setTimeout(() => { setActive(i); setFading(false); }, 350);
  };

  const review = REVIEWS[active];

  return (
    <section
      id="reviews"
      ref={sectionRef}
      style={{
        backgroundColor: "oklch(0.10 0.008 30)",
        padding: "clamp(5rem, 10vw, 9rem) clamp(1.5rem, 5vw, 5rem)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* ── Halftone dot circle — bottom-left decorative ── */}
      <svg
        style={{
          position: "absolute",
          bottom: "-60px",
          left: "-60px",
          width: "380px",
          height: "380px",
          pointerEvents: "none",
          opacity: 0.15,
          zIndex: 0,
        }}
        viewBox="0 0 380 380"
        xmlns="http://www.w3.org/2000/svg"
      >
        {Array.from({ length: 16 }, (_, row) =>
          Array.from({ length: 16 }, (_, col) => {
            const cx = 20 + col * 22;
            const cy = 20 + row * 22;
            const dist = Math.sqrt((cx - 190) ** 2 + (cy - 190) ** 2);
            if (dist > 175) return null;
            const r = Math.max(1, 5 * (1 - dist / 190));
            return <circle key={`${row}-${col}`} cx={cx} cy={cy} r={r} fill="#c0392b" />;
          })
        )}
      </svg>

      {/* ── Section label ── */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.75rem",
          marginBottom: "4rem",
          opacity: visible ? 1 : 0,
          transition: "opacity 0.8s ease",
        }}
      >
        <span style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "0.5rem", fontWeight: 700, letterSpacing: "0.3em", color: "oklch(0.46 0.20 25)" }}>
          04
        </span>
        <span style={{ width: "2rem", height: "1px", backgroundColor: "oklch(0.22 0.008 30)", display: "block" }} />
        <span style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "0.5rem", fontWeight: 600, letterSpacing: "0.25em", color: "oklch(0.35 0.008 30)" }}>
          WHAT CLIENTS SAY
        </span>
        <span style={{ flex: 1, height: "1px", backgroundColor: "oklch(0.16 0.008 30)", display: "block" }} />
      </div>

      {/* ── Giant decorative quotation mark ── */}
      <div
        style={{
          fontFamily: "'Cormorant Garamond', Georgia, serif",
          fontSize: "clamp(10rem, 25vw, 22rem)",
          fontWeight: 700,
          lineHeight: 0.7,
          color: "oklch(0.46 0.20 25)",
          opacity: 0.14,
          position: "absolute",
          top: "clamp(3rem, 8vw, 7rem)",
          left: "clamp(0.5rem, 3vw, 3rem)",
          userSelect: "none",
          pointerEvents: "none",
        }}
      >
        "
      </div>

      {/* ── Massive pull-quote ── */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          maxWidth: "1100px",
          opacity: visible ? (fading ? 0 : 1) : 0,
          transform: visible ? (fading ? "translateY(10px)" : "translateY(0)") : "translateY(30px)",
          transition: fading
            ? "opacity 0.35s ease, transform 0.35s ease"
            : "opacity 0.7s ease 0.2s, transform 0.7s ease 0.2s",
        }}
      >
        <blockquote
          style={{
            fontFamily: "'Cormorant Garamond', 'Playfair Display', Georgia, serif",
            fontSize: "clamp(1.8rem, 4vw, 4.2rem)",
            fontWeight: 300,
            fontStyle: "italic",
            lineHeight: 1.22,
            letterSpacing: "-0.02em",
            color: "oklch(0.95 0.012 75)",
            margin: 0,
            paddingLeft: "clamp(2rem, 6vw, 6rem)",
          }}
        >
          {review.text}
        </blockquote>

        {/* Attribution */}
        <div
          style={{
            marginTop: "2.5rem",
            paddingLeft: "clamp(2rem, 6vw, 6rem)",
            display: "flex",
            alignItems: "center",
            gap: "1.5rem",
          }}
        >
          <div style={{ width: "2rem", height: "1px", backgroundColor: "oklch(0.46 0.20 25)" }} />
          <div>
            <div style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "0.62rem", fontWeight: 700, letterSpacing: "0.12em", color: "oklch(0.97 0.012 75)" }}>
              {review.name}
            </div>
            <div style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "0.52rem", fontWeight: 400, letterSpacing: "0.1em", color: "oklch(0.40 0.008 30)", marginTop: "0.15rem" }}>
              {review.tag}
            </div>
          </div>
          {/* Stars */}
          <div style={{ display: "flex", gap: "0.2rem", marginLeft: "0.5rem" }}>
            {Array.from({ length: review.stars }).map((_, i) => (
              <svg key={i} width="12" height="12" viewBox="0 0 24 24" fill="oklch(0.46 0.20 25)">
                <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
              </svg>
            ))}
          </div>
        </div>
      </div>

      {/* ── Navigation ── */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "1rem",
          marginTop: "3.5rem",
          paddingLeft: "clamp(2rem, 6vw, 6rem)",
        }}
      >
        {REVIEWS.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            style={{
              width: i === active ? "2.5rem" : "0.5rem",
              height: "2px",
              backgroundColor: i === active ? "oklch(0.46 0.20 25)" : "oklch(0.25 0.008 30)",
              border: "none",
              padding: 0,
              cursor: "pointer",
              transition: "width 0.4s ease, background-color 0.3s ease",
              borderRadius: "999px",
            }}
          />
        ))}
        <span style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "0.5rem", fontWeight: 600, letterSpacing: "0.2em", color: "oklch(0.28 0.008 30)", marginLeft: "0.5rem" }}>
          {String(active + 1).padStart(2, "0")} / {String(REVIEWS.length).padStart(2, "0")}
        </span>
      </div>

      {/* ── Google badge ── */}
      <div
        style={{
          marginTop: "4rem",
          paddingLeft: "clamp(2rem, 6vw, 6rem)",
          display: "flex",
          alignItems: "center",
          gap: "1rem",
          opacity: visible ? 1 : 0,
          transition: "opacity 0.8s ease 0.5s",
        }}
      >
        <div style={{ width: "1px", height: "2.5rem", backgroundColor: "oklch(0.22 0.008 30)" }} />
        <div>
          <div style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "0.5rem", fontWeight: 600, letterSpacing: "0.2em", color: "oklch(0.35 0.008 30)" }}>
            RATED 5.0 ON GOOGLE
          </div>
          <div style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "0.5rem", fontWeight: 400, letterSpacing: "0.12em", color: "oklch(0.28 0.008 30)", marginTop: "0.15rem" }}>
            100+ VERIFIED REVIEWS
          </div>
        </div>
      </div>
    </section>
  );
}
