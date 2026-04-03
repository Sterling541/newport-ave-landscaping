/* ============================================================
   MEMBERSHIP BANNER — Matches original site design exactly
   Full-height dark section with sprinkler background photo,
   large red metallic shield badge on left, bold white headline
   on right, red SIGN UP TODAY CTA button.
   ============================================================ */
import { useEffect, useRef, useState } from "react";
import { useLocation } from "wouter";

const BADGE_URL =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663503028182/g3pw3MRUapabcDUbhBEFxx/membership-badge-nobg_51c1c18d.png";

const BG_URL =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663503028182/g3pw3MRUapabcDUbhBEFxx/sprinkler-bg2_c113104f.jpg";

export default function MembershipBanner() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [, navigate] = useLocation();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.05 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      className="relative overflow-hidden"
      style={{ minHeight: "clamp(320px, 38vw, 480px)", backgroundColor: "#0a0a0a" }}
    >
      {/* Background photo — sprinkler on lawn */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url(${BG_URL})`,
          backgroundSize: "cover",
          backgroundPosition: "center 55%",
          backgroundRepeat: "no-repeat",
        }}
      />

      {/* Dark gradient overlay — heavier on right for text legibility */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(105deg, rgba(0,0,0,0.38) 0%, rgba(0,0,0,0.62) 45%, rgba(0,0,0,0.78) 100%)",
        }}
      />

      {/* Content row */}
      <div
        ref={ref}
        className="container relative z-10 flex flex-col md:flex-row items-center justify-center md:justify-start gap-10 md:gap-16 py-16 md:py-20"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(32px)",
          transition: "opacity 0.9s ease, transform 0.9s ease",
        }}
      >
        {/* ── LEFT: Shield badge ── */}
        <div
          className="flex-shrink-0 flex items-center justify-center"
          style={{
            filter: "drop-shadow(0 12px 40px rgba(0,0,0,0.70))",
          }}
        >
          <img
            src={BADGE_URL}
            alt="Newport Avenue Priority Irrigation Membership Badge"
            style={{
              width: "clamp(240px, 30vw, 400px)",
              height: "auto",
            }}
          />
        </div>

        {/* ── RIGHT: Headline + CTA ── */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left max-w-xl">
          <h2
            className="font-display font-black text-white uppercase leading-none mb-4"
            style={{
              fontSize: "clamp(2rem, 4.5vw, 3.6rem)",
              letterSpacing: "0.02em",
              textShadow: "0 2px 20px rgba(0,0,0,0.70)",
              lineHeight: 1.05,
            }}
          >
            Newport Priority<br />
            Irrigation<br />
            Membership:
          </h2>

          <p
            className="font-body font-semibold mb-8"
            style={{
              color: "oklch(0.93 0.03 25)",
              fontSize: "clamp(1rem, 1.8vw, 1.3rem)",
              textShadow: "0 1px 8px rgba(0,0,0,0.60)",
              letterSpacing: "0.01em",
            }}
          >
            Never Worry About Your Sprinklers Again
          </p>

          <div className="flex flex-wrap gap-4 justify-center md:justify-start">
            <button
              onClick={() => {
                navigate("/contact");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="btn-red"
              style={{
                fontSize: "0.85rem",
                letterSpacing: "0.14em",
                padding: "0.85rem 2.2rem",
              }}
            >
              SIGN UP TODAY
            </button>
            <button
              onClick={() => {
                navigate("/membership");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              style={{
                background: "transparent",
                border: "2px solid rgba(255,255,255,0.70)",
                color: "#ffffff",
                fontSize: "0.85rem",
                letterSpacing: "0.14em",
                padding: "0.85rem 2.2rem",
                borderRadius: "20px 0 20px 0",
                cursor: "pointer",
                fontFamily: "inherit",
                fontWeight: 700,
                transition: "border-color 0.2s, background 0.2s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.12)";
                (e.currentTarget as HTMLButtonElement).style.borderColor = "#ffffff";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background = "transparent";
                (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.70)";
              }}
            >
              LEARN MORE
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
