/* ============================================================
   MEMBERSHIP BANNER — Matches original design
   Sprinkler background photo, shield badge left, bold white
   headline right, red CTA button.
   ============================================================ */
import { useEffect, useRef, useState } from "react";
import { useLocation } from "wouter";

const BADGE_URL =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663503028182/g3pw3MRUapabcDUbhBEFxx/membership-badge-XZx4Knw2aXFm4uTKtLij98.webp";

const BG_URL =
  "https://images.unsplash.com/photo-1558618047-f4e90e8b1a3b?w=1600&auto=format&fit=crop&q=80";

export default function MembershipBanner() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [, navigate] = useLocation();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      className="relative overflow-hidden"
      style={{ minHeight: "clamp(220px, 22vw, 320px)" }}
    >
      {/* Background photo */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url(${BG_URL})`,
          backgroundSize: "cover",
          backgroundPosition: "center 60%",
        }}
      />
      {/* Dark overlay for legibility */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(90deg, oklch(0.08 0.005 0 / 0.55) 0%, oklch(0.08 0.005 0 / 0.72) 100%)",
        }}
      />

      {/* Content */}
      <div
        ref={ref}
        className="container relative z-10 flex flex-col md:flex-row items-center gap-8 md:gap-12 py-10 md:py-14"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(24px)",
          transition: "opacity 0.8s ease, transform 0.8s ease",
        }}
      >
        {/* Shield badge */}
        <div className="flex-shrink-0 flex items-center justify-center">
          <img
            src={BADGE_URL}
            alt="Newport Avenue Priority Irrigation Membership Badge"
            style={{
              width: "clamp(140px, 16vw, 220px)",
              height: "auto",
              filter: "drop-shadow(0 8px 24px oklch(0 0 0 / 0.60))",
            }}
          />
        </div>

        {/* Text + CTA */}
        <div className="text-center md:text-left">
          <h2
            className="font-display font-black text-white uppercase leading-none mb-3"
            style={{
              fontSize: "clamp(1.6rem, 3.5vw, 3rem)",
              letterSpacing: "0.02em",
              textShadow: "0 2px 12px oklch(0 0 0 / 0.60)",
            }}
          >
            Newport Priority<br />
            Irrigation<br />
            Membership:
          </h2>
          <p
            className="font-body font-semibold mb-6"
            style={{
              color: "oklch(0.92 0.04 25)",
              fontSize: "clamp(0.95rem, 1.5vw, 1.2rem)",
              textShadow: "0 1px 6px oklch(0 0 0 / 0.50)",
            }}
          >
            Never Worry About Your Sprinklers Again
          </p>
          <div className="flex flex-wrap gap-3 justify-center md:justify-start">
            <button
              onClick={() => {
                navigate("/contact");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="btn-red"
              style={{ fontSize: "0.8rem", letterSpacing: "0.12em" }}
            >
              SIGN UP TODAY
            </button>
            <button
              onClick={() => {
                navigate("/membership");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="btn-outline-white"
              style={{ fontSize: "0.8rem", letterSpacing: "0.12em" }}
            >
              LEARN MORE
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
