/* ============================================================
   CITY PAGE LAYOUT — Newport Avenue Landscaping
   Reusable template for all city/community landing pages.
   Each city gets unique content via props.
   ============================================================ */
import { useEffect, useRef, useState } from "react";
import { useLocation } from "wouter";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  CheckCircle2,
  MapPin,
  Phone,
  ChevronRight,
  Leaf,
  Droplets,
  Wrench,
  Flame,
  Sun,
  Snowflake,
} from "lucide-react";

// ── FadeIn helper ────────────────────────────────────────────
function FadeIn({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

// ── Types ─────────────────────────────────────────────────────
export interface CityService {
  icon: "leaf" | "droplets" | "wrench" | "flame" | "sun" | "snowflake";
  name: string;
  description: string;
}

export interface CityPageProps {
  city: string;
  region: string; // e.g. "Central Oregon"
  heroImage: string;
  heroPosition?: string;
  tagline: string; // short italic hero subtitle
  intro: string; // 2-3 sentence intro paragraph
  communityNote: string; // 1-2 sentences about the community itself
  services: CityService[];
  whyUs: string[]; // 4-6 bullet points
  nearbyAreas: string[]; // neighboring communities we also serve
  ctaNote?: string; // optional extra CTA note
}

const ICON_MAP = {
  leaf: Leaf,
  droplets: Droplets,
  wrench: Wrench,
  flame: Flame,
  sun: Sun,
  snowflake: Snowflake,
};

// ── Component ─────────────────────────────────────────────────
export default function CityPageLayout(props: CityPageProps) {
  const {
    city,
    region,
    heroImage,
    heroPosition = "center center",
    tagline,
    intro,
    communityNote,
    services,
    whyUs,
    nearbyAreas,
    ctaNote,
  } = props;

  const [, navigate] = useLocation();

  return (
    <div className="min-h-screen" style={{ backgroundColor: "oklch(1 0 0)" }}>
      <Navbar />

      {/* ── HERO ──────────────────────────────────────────── */}
      <section
        className="relative flex items-end"
        style={{ minHeight: "clamp(420px, 55vh, 640px)" }}
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${heroImage})`,
            backgroundSize: "cover",
            backgroundPosition: heroPosition,
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, oklch(0.08 0.005 0 / 0.92) 0%, oklch(0.08 0.005 0 / 0.55) 55%, oklch(0.08 0.005 0 / 0.28) 100%)",
          }}
        />
        <div className="relative z-10 container pb-14 pt-28">
          <div
            className="font-label mb-3 flex items-center gap-3"
            style={{ color: "oklch(0.72 0.12 25)" }}
          >
            <MapPin size={12} strokeWidth={2} />
            Landscaping in {city}, {region}
          </div>
          <h1
            className="font-display font-light mb-3"
            style={{
              fontSize: "clamp(2rem, 5vw, 3.8rem)",
              color: "oklch(1 0 0)",
              lineHeight: 1.05,
              maxWidth: "680px",
            }}
          >
            {city} Landscaping &amp;
            <br />
            <em style={{ color: "oklch(0.72 0.12 25)", fontStyle: "italic" }}>
              {tagline}
            </em>
          </h1>
          <p
            className="font-body mb-8"
            style={{
              color: "oklch(0.85 0.005 0)",
              fontSize: "clamp(0.95rem, 1.5vw, 1.1rem)",
              maxWidth: "560px",
              lineHeight: 1.7,
            }}
          >
            Newport Avenue Landscaping — serving {city} and all of Central
            Oregon since 2005.
          </p>
          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => navigate("/contact")}
              className="btn-primary"
            >
              Get a Free Quote
            </button>
            <a href="tel:5416178873" className="btn-outline-light">
              (541) 617-8873
            </a>
          </div>
        </div>
      </section>

      {/* ── CREDENTIAL BAR ────────────────────────────────── */}
      <div className="py-4" style={{ backgroundColor: "oklch(0.46 0.20 25)" }}>
        <div className="container">
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2">
            {[
              "Serving " + city + " Since 2005",
              "150+ In-House Professionals",
              "Licensed, Bonded & Insured — LCB #9153",
              "Free Estimates",
            ].map((item) => (
              <div
                key={item}
                className="font-label flex items-center gap-2"
                style={{ color: "oklch(1 0 0)", fontSize: "0.63rem" }}
              >
                <CheckCircle2 size={12} strokeWidth={2} />
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── INTRO ─────────────────────────────────────────── */}
      <section className="py-20" style={{ backgroundColor: "oklch(1 0 0)" }}>
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <FadeIn>
              <div
                className="font-label mb-4 flex items-center gap-3"
                style={{ color: "oklch(0.46 0.20 25)" }}
              >
                <span
                  className="inline-block w-8 h-px"
                  style={{ backgroundColor: "oklch(0.46 0.20 25)" }}
                />
                Landscaping in {city}
              </div>
              <h2
                className="font-display font-light mb-6"
                style={{
                  fontSize: "clamp(1.7rem, 3vw, 2.6rem)",
                  color: "oklch(0.12 0.005 0)",
                  lineHeight: 1.1,
                }}
              >
                {city.endsWith("s") ? city : city + "'s"} Trusted{" "}
                <em
                  style={{ color: "oklch(0.46 0.20 25)", fontStyle: "italic" }}
                >
                  Landscape Partner
                </em>
              </h2>
              <p
                className="font-body mb-5"
                style={{
                  color: "oklch(0.35 0.005 0)",
                  lineHeight: 1.8,
                  fontSize: "1rem",
                }}
              >
                {intro}
              </p>
              <p
                className="font-body"
                style={{
                  color: "oklch(0.45 0.005 0)",
                  lineHeight: 1.8,
                  fontSize: "0.95rem",
                }}
              >
                {communityNote}
              </p>
            </FadeIn>

            <FadeIn delay={0.15}>
              <div
                className="rounded-sm overflow-hidden"
                style={{ border: "1px solid oklch(0.90 0.005 0)" }}
              >
                <div
                  className="p-6"
                  style={{ backgroundColor: "oklch(0.97 0.010 85)" }}
                >
                  <p
                    className="font-label mb-4"
                    style={{
                      color: "oklch(0.46 0.20 25)",
                      fontSize: "0.62rem",
                      letterSpacing: "0.16em",
                    }}
                  >
                    WHY {city.toUpperCase()} CHOOSES NEWPORT AVE
                  </p>
                  <ul className="space-y-3">
                    {whyUs.map((point) => (
                      <li key={point} className="flex items-start gap-3">
                        <CheckCircle2
                          size={15}
                          strokeWidth={2}
                          className="mt-0.5 flex-shrink-0"
                          style={{ color: "oklch(0.46 0.20 25)" }}
                        />
                        <span
                          className="font-body"
                          style={{
                            color: "oklch(0.30 0.005 0)",
                            fontSize: "0.92rem",
                            lineHeight: 1.6,
                          }}
                        >
                          {point}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── SERVICES GRID ─────────────────────────────────── */}
      <section
        className="py-20"
        style={{ backgroundColor: "oklch(0.97 0.010 85)" }}
      >
        <div className="container">
          <FadeIn>
            <div className="text-center mb-12">
              <div
                className="font-label mb-3 flex items-center justify-center gap-3"
                style={{ color: "oklch(0.46 0.20 25)", fontSize: "0.62rem", letterSpacing: "0.18em" }}
              >
                <span className="inline-block w-8 h-px" style={{ backgroundColor: "oklch(0.46 0.20 25)" }} />
                OUR SERVICES IN {city.toUpperCase()}
                <span className="inline-block w-8 h-px" style={{ backgroundColor: "oklch(0.46 0.20 25)" }} />
              </div>
              <h2
                className="font-display font-light"
                style={{
                  fontSize: "clamp(1.7rem, 3vw, 2.6rem)",
                  color: "oklch(0.12 0.005 0)",
                  lineHeight: 1.1,
                }}
              >
                Complete Landscape Services
                <br />
                <em style={{ color: "oklch(0.46 0.20 25)", fontStyle: "italic" }}>
                  for {city} Properties
                </em>
              </h2>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((svc, i) => {
              const Icon = ICON_MAP[svc.icon];
              return (
                <FadeIn key={svc.name} delay={i * 0.07}>
                  <div
                    className="h-full"
                    style={{
                      backgroundColor: "oklch(1 0 0)",
                      border: "1px solid oklch(0.90 0.005 0)",
                      borderRadius: "2px",
                      padding: "28px 24px",
                    }}
                  >
                    <div
                      className="mb-4 flex items-center justify-center"
                      style={{
                        width: "44px",
                        height: "44px",
                        backgroundColor: "oklch(0.96 0.025 25)",
                        borderRadius: "2px",
                      }}
                    >
                      <Icon size={20} strokeWidth={1.5} style={{ color: "oklch(0.46 0.20 25)" }} />
                    </div>
                    <h3
                      className="font-display font-light mb-2"
                      style={{ fontSize: "1.15rem", color: "oklch(0.12 0.005 0)" }}
                    >
                      {svc.name}
                    </h3>
                    <p
                      className="font-body"
                      style={{ color: "oklch(0.45 0.005 0)", fontSize: "0.88rem", lineHeight: 1.7 }}
                    >
                      {svc.description}
                    </p>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── NEARBY AREAS ──────────────────────────────────── */}
      <section className="py-14" style={{ backgroundColor: "oklch(0.12 0.005 0)" }}>
        <div className="container">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
            <span
              className="font-label"
              style={{ color: "oklch(0.55 0.005 0)", fontSize: "0.60rem", letterSpacing: "0.16em" }}
            >
              ALSO SERVING NEARBY:
            </span>
            {nearbyAreas.map((area) => (
              <span
                key={area}
                className="font-body"
                style={{ color: "oklch(0.75 0.005 0)", fontSize: "0.88rem" }}
              >
                {area}
                <span style={{ color: "oklch(0.46 0.20 25)", margin: "0 6px" }}>·</span>
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ────────────────────────────────────── */}
      <section
        className="py-20"
        style={{ backgroundColor: "oklch(1 0 0)" }}
      >
        <div className="container text-center">
          <FadeIn>
            <div
              className="font-label mb-4 flex items-center justify-center gap-3"
              style={{ color: "oklch(0.46 0.20 25)", fontSize: "0.62rem", letterSpacing: "0.18em" }}
            >
              <span className="inline-block w-8 h-px" style={{ backgroundColor: "oklch(0.46 0.20 25)" }} />
              GET STARTED
              <span className="inline-block w-8 h-px" style={{ backgroundColor: "oklch(0.46 0.20 25)" }} />
            </div>
            <h2
              className="font-display font-light mb-4"
              style={{
                fontSize: "clamp(1.8rem, 3.5vw, 3rem)",
                color: "oklch(0.12 0.005 0)",
                lineHeight: 1.1,
              }}
            >
              Ready to Transform Your{" "}
              <em style={{ color: "oklch(0.46 0.20 25)", fontStyle: "italic" }}>
                {city} Property?
              </em>
            </h2>
            {ctaNote && (
              <p
                className="font-body mb-8 mx-auto"
                style={{
                  color: "oklch(0.45 0.005 0)",
                  maxWidth: "520px",
                  lineHeight: 1.7,
                  fontSize: "1rem",
                }}
              >
                {ctaNote}
              </p>
            )}
            <div className="flex flex-wrap gap-4 justify-center mt-6">
              <button
                onClick={() => navigate("/contact")}
                className="btn-primary"
              >
                Request a Free Quote
                <ChevronRight size={14} className="ml-1" />
              </button>
              <a href="tel:5416178873" className="btn-outline">
                (541) 617-8873
              </a>
            </div>
          </FadeIn>
        </div>
      </section>

      <Footer />
    </div>
  );
}
