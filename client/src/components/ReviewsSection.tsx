/* ============================================================
   REVIEWS SECTION — Colossal-Inspired Editorial Pull-Quote
   Features:
   - Section number label (04) with thin rule
   - Massive pull-quote that dominates the section
   - Dark background with warm terracotta accents
   - Staggered mini-card grid below
   - Pill navigation controls
   ============================================================ */
import { useEffect, useRef, useState } from "react";

const reviews = [
  {
    name: "Michael Geers",
    text: "Great service! I had major irrigation problems and they fixed them for me way cheaper than I was quoted from 4 other businesses! Highly recommend!",
    rating: 5,
    tag: "Irrigation Repair",
  },
  {
    name: "Gary LeFebvre",
    text: "I called Janna at Newport and she was able to move heaven and earth to get me on the schedule. Aurora showed up the next day and did a very professional and thorough job. I am very grateful and have signed up for your permanent service.",
    rating: 5,
    tag: "Sprinkler Service",
  },
  {
    name: "Lisa Krynicki",
    text: "They showed up exactly when they said they would. The service technician was incredibly friendly, quick, and helpful. What we thought was going to be a huge repair job turned out to be one stuck valve — done in less than an hour.",
    rating: 5,
    tag: "Irrigation Service",
  },
  {
    name: "Kelly Meyer",
    text: "We just can't say enough about how pleased we are with the work Newport Avenue Landscaping did for us. From design to tree removal, new SOD, irrigation, pavers and plants. Our yard looks amazing!",
    rating: 5,
    tag: "Full Landscape Build",
  },
  {
    name: "Melanie Grandjacques",
    text: "Thanks to Newport Avenue Landscaping for our amazing yard transformation!! Nate, Chris, Francis and crew were so great to work with. Results are beautiful!!",
    rating: 5,
    tag: "Yard Transformation",
  },
  {
    name: "Jennifer Yarbrough",
    text: "We used Newport Landscaping for our lawn and could not be happier. The quality of grass cutting was excellent. I love their office staff! Mikaya is amazing!! Super efficient, helpful and kind.",
    rating: 5,
    tag: "Lawn Maintenance",
  },
];

export default function ReviewsSection() {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.12 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => goNext(), 7000);
    return () => clearInterval(interval);
  }, [current]);

  const goNext = () => {
    if (animating) return;
    setAnimating(true);
    setTimeout(() => { setCurrent((c) => (c + 1) % reviews.length); setAnimating(false); }, 350);
  };

  const goPrev = () => {
    if (animating) return;
    setAnimating(true);
    setTimeout(() => { setCurrent((c) => (c - 1 + reviews.length) % reviews.length); setAnimating(false); }, 350);
  };

  const review = reviews[current];

  return (
    <section
      id="reviews"
      ref={ref}
      style={{
        backgroundColor: "oklch(0.10 0.012 155)",
        padding: "clamp(4rem, 8vw, 7rem) 0",
      }}
    >
      <div className="container">

        {/* ── Section label ── */}
        <div
          className="flex items-center gap-4 mb-16"
          style={{
            opacity: visible ? 1 : 0,
            transition: "opacity 0.8s ease",
          }}
        >
          <span className="font-label" style={{ fontSize: "0.65rem", letterSpacing: "0.18em", color: "oklch(0.76 0.128 184.6)", fontWeight: 700 }}>04</span>
          <span className="flex-1 h-px" style={{ backgroundColor: "oklch(0.22 0.015 155)" }} />
          <span className="font-label" style={{ fontSize: "0.60rem", letterSpacing: "0.18em", color: "oklch(0.50 0.015 155)" }}>CLIENT STORIES</span>
        </div>

        {/* ── Asymmetric layout: label left, quote right ── */}
        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-12 lg:gap-20 items-start mb-16">

          {/* Left: section headline + controls */}
          <div
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(28px)",
              transition: "opacity 0.85s ease 0.1s, transform 0.85s ease 0.1s",
            }}
          >
            <h2
              className="font-display font-light mb-10"
              style={{
                fontSize: "clamp(2.2rem, 4vw, 3.5rem)",
                lineHeight: 0.95,
                letterSpacing: "-0.03em",
                color: "oklch(0.96 0 0)",
              }}
            >
              What Our{" "}
              <em style={{ color: "oklch(0.76 0.128 184.6)", fontStyle: "italic" }}>
                Clients Say
              </em>
            </h2>

            {/* Stars */}
            <div className="flex gap-1 mb-6">
              {Array.from({ length: 5 }).map((_, i) => (
                <span key={i} style={{ color: "oklch(0.70 0.18 55)", fontSize: "16px" }}>★</span>
              ))}
            </div>

            {/* Attribution */}
            <div
              className="transition-opacity duration-350"
              style={{ opacity: animating ? 0 : 1 }}
            >
              <div
                className="font-label mb-1"
                style={{ fontSize: "0.65rem", letterSpacing: "0.15em", color: "oklch(0.76 0.128 184.6)" }}
              >
                — {review.name}
              </div>
              <div
                className="font-label"
                style={{ fontSize: "0.55rem", letterSpacing: "0.12em", color: "oklch(0.45 0.015 155)" }}
              >
                {review.tag}
              </div>
            </div>

            {/* Pill navigation */}
            <div className="flex gap-2 mt-10">
              <button
                onClick={goPrev}
                className="flex items-center justify-center transition-all duration-200"
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "999px",
                  backgroundColor: "oklch(0.18 0.015 155)",
                  color: "oklch(0.75 0 0)",
                  border: "1px solid oklch(0.28 0.015 155)",
                  fontSize: "16px",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "oklch(0.76 0.128 184.6)")}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "oklch(0.18 0.015 155)")}
              >
                ←
              </button>
              <button
                onClick={goNext}
                className="flex items-center justify-center transition-all duration-200"
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "999px",
                  backgroundColor: "oklch(0.18 0.015 155)",
                  color: "oklch(0.75 0 0)",
                  border: "1px solid oklch(0.28 0.015 155)",
                  fontSize: "16px",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "oklch(0.76 0.128 184.6)")}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "oklch(0.18 0.015 155)")}
              >
                →
              </button>
            </div>

            {/* Counter */}
            <div
              className="font-label mt-4"
              style={{ fontSize: "0.60rem", letterSpacing: "0.15em", color: "oklch(0.40 0.015 155)" }}
            >
              <span style={{ color: "oklch(0.76 0.128 184.6)", fontSize: "0.9rem", fontWeight: 600 }}>
                {String(current + 1).padStart(2, "0")}
              </span>
              {" / "}
              {String(reviews.length).padStart(2, "0")}
            </div>
          </div>

          {/* Right: massive pull-quote */}
          <div
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(32px)",
              transition: "opacity 0.85s ease 0.22s, transform 0.85s ease 0.22s",
            }}
          >
            {/* Giant opening quote mark */}
            <div
              className="font-display"
              style={{
                fontSize: "clamp(6rem, 12vw, 10rem)",
                lineHeight: 0.7,
                color: "oklch(0.76 0.128 184.6)",
                fontWeight: 300,
                marginBottom: "-1rem",
                opacity: 0.6,
              }}
            >
              "
            </div>
            <blockquote
              className="font-display font-light transition-opacity duration-350"
              style={{
                fontSize: "clamp(1.5rem, 3.2vw, 2.6rem)",
                lineHeight: 1.35,
                letterSpacing: "-0.02em",
                color: "oklch(0.93 0 0)",
                fontStyle: "italic",
                opacity: animating ? 0 : 1,
              }}
            >
              {review.text}
            </blockquote>
          </div>
        </div>

        {/* ── Thin rule ── */}
        <div style={{ height: "1px", backgroundColor: "oklch(0.22 0.015 155)", marginBottom: "3rem" }} />

        {/* ── Mini review cards ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {reviews.slice(0, 3).map((r, i) => (
            <div
              key={r.name}
              className="p-6"
              style={{
                backgroundColor: "oklch(0.14 0.012 155)",
                border: "1px solid oklch(0.20 0.015 155)",
                borderRadius: "0.5rem",
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(20px)",
                transition: `opacity 0.7s ease ${0.4 + i * 0.1}s, transform 0.7s ease ${0.4 + i * 0.1}s`,
              }}
            >
              <div className="flex gap-1 mb-3">
                {Array.from({ length: r.rating }).map((_, j) => (
                  <span key={j} style={{ color: "oklch(0.70 0.18 55)", fontSize: "11px" }}>★</span>
                ))}
              </div>
              <p
                className="font-body text-sm leading-relaxed mb-4 line-clamp-3"
                style={{ color: "oklch(0.72 0.010 155)", fontWeight: 300 }}
              >
                "{r.text}"
              </p>
              <div className="font-label" style={{ fontSize: "0.58rem", letterSpacing: "0.12em", color: "oklch(0.76 0.128 184.6)" }}>
                — {r.name}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
