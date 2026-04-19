/* ============================================================
   CAREERS PAGE — Newport Avenue Landscaping
   Design: Cream background, charcoal + red brand colors.
   Job listings, culture, benefits, application CTA.
   ============================================================ */
import { useEffect, useRef, useState } from "react";
import { Link } from "wouter";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";

function FadeIn({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
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
        transition: `opacity 0.65s ease ${delay}s, transform 0.65s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

const openings = [
  {
    title: "Irrigation Technician",
    type: "Full-Time",
    season: "Year-Round",
    description:
      "Install, maintain, and repair residential and commercial irrigation systems throughout Central Oregon. Experience with Rainbird, Hunter, and Toro systems preferred. LCB license a plus.",
    requirements: [
      "1+ years irrigation installation or service experience",
      "Valid Oregon driver's license",
      "Ability to work outdoors in all weather conditions",
      "Strong attention to detail and customer communication skills",
    ],
  },
  {
    title: "Landscape Construction Crew Member",
    type: "Full-Time",
    season: "Seasonal (March – November)",
    description:
      "Work alongside experienced foremen on design & build projects — paver patios, retaining walls, water features, planting, and more. No experience required; we train motivated people.",
    requirements: [
      "Motivated, reliable, and team-oriented",
      "Ability to perform physical labor outdoors",
      "Valid driver's license preferred",
      "Spanish-speaking a plus",
    ],
  },
  {
    title: "Maintenance Crew Lead",
    type: "Full-Time",
    season: "Year-Round",
    description:
      "Lead a 2–3 person maintenance crew servicing residential and commercial accounts. Responsible for quality control, crew scheduling, and client communication. Experience managing crews required.",
    requirements: [
      "2+ years landscape maintenance experience",
      "Prior crew lead or supervisory experience",
      "Valid Oregon driver's license with clean record",
      "Bilingual (English/Spanish) a strong plus",
    ],
  },
  {
    title: "Landscape Designer",
    type: "Full-Time",
    season: "Year-Round",
    description:
      "Create residential and commercial landscape designs using CAD or design software. Work directly with clients from initial consultation through installation. Portfolio required.",
    requirements: [
      "Degree in Landscape Architecture, Horticulture, or related field",
      "Proficiency in AutoCAD, DynaScape, or similar design software",
      "Knowledge of Central Oregon plant palettes and climate",
      "Strong client presentation and communication skills",
    ],
  },
];

const benefits = [
  { icon: "💰", label: "Competitive Pay", detail: "Above-market wages with performance reviews" },
  { icon: "🏥", label: "Health Benefits", detail: "Medical coverage for full-time employees" },
  { icon: "🌲", label: "Work Outdoors", detail: "Central Oregon's best office — no cubicles" },
  { icon: "📈", label: "Growth Path", detail: "Promote from within — many leads started as crew" },
  { icon: "🛠️", label: "Quality Equipment", detail: "New trucks, trailers, and professional tools" },
  { icon: "🤝", label: "Stable Company", detail: "21+ years in business, growing every year" },
];

export default function Careers() {
  return (
    <div style={{ backgroundColor: "oklch(0.97 0.012 85)" }}>
      <SEO
        title="Careers at Newport Avenue Landscaping | Bend, Oregon"
        description="Join Central Oregon's most qualified landscaping team. Newport Avenue Landscaping is hiring irrigation technicians, crew leads, designers, and construction crew members in Bend, OR."
        canonical="/careers"
      />
      <Navbar />

      {/* ── Hero ── */}
      <section
        className="relative flex items-end"
        style={{
          height: "clamp(280px, 38vw, 460px)",
          marginTop: "204px",
          backgroundColor: "oklch(0.12 0.005 0)",
        }}
      >
        <img
          src="https://d2xsxph8kpxj0f.cloudfront.net/310519663503028182/g3pw3MRUapabcDUbhBEFxx/hero-about-team-9jqyeRf5YwNuFaxVeTWi3u.webp"
          alt="Newport Avenue Landscaping crew in Bend, Oregon"
          style={{
            position: "absolute", inset: 0, width: "100%", height: "100%",
            objectFit: "cover", objectPosition: "center 30%", opacity: 0.55,
          }}
        />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(0deg, oklch(0.10 0.005 0 / 0.80) 0%, oklch(0 0 0 / 0.10) 60%)" }}
        />
        <div className="container relative pb-14">
          <div className="font-label mb-3 flex items-center gap-3" style={{ color: "oklch(0.72 0.12 25)" }}>
            <span className="inline-block h-px w-7" style={{ backgroundColor: "oklch(0.46 0.20 25)" }} />
            Join Our Team
          </div>
          <h1
            className="font-display font-light text-white"
            style={{ fontSize: "clamp(2.4rem, 6vw, 5rem)", lineHeight: 1.0 }}
          >
            Build Something<br />
            <em style={{ color: "oklch(0.75 0.10 25)" }}>That Lasts</em>
          </h1>
        </div>
      </section>

      {/* ── Culture intro ── */}
      <section className="py-20" style={{ backgroundColor: "oklch(1 0 0)" }}>
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <FadeIn>
              <div className="font-label mb-4 flex items-center gap-3" style={{ color: "oklch(0.46 0.20 25)" }}>
                <span className="inline-block h-px w-7" style={{ backgroundColor: "oklch(0.46 0.20 25)" }} />
                Why Newport
              </div>
              <h2
                className="font-display font-light mb-6"
                style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", color: "oklch(0.15 0.005 0)", lineHeight: 1.1 }}
              >
                Central Oregon's<br />
                <em style={{ color: "oklch(0.46 0.20 25)" }}>Best Landscape Team</em>
              </h2>
              <div className="space-y-4 font-body" style={{ color: "oklch(0.38 0.008 0)", lineHeight: 1.8, fontWeight: 300 }}>
                <p>
                  Newport Avenue Landscaping has been Central Oregon's most qualified full-service landscape firm for over 21 years. We've grown to 150+ professionals not by cutting corners, but by investing in the people who make every project exceptional.
                </p>
                <p>
                  We promote from within. Many of our foremen and crew leads started as entry-level crew members. If you show up, work hard, and take pride in your craft, there is a long-term career here for you.
                </p>
                <p>
                  Our work has been featured in <em>Architectural Digest</em> twice. We hold ourselves to a higher standard — and we want teammates who do too.
                </p>
              </div>
            </FadeIn>
            <FadeIn delay={0.15}>
              <div className="grid grid-cols-2 gap-4">
                {benefits.map((b) => (
                  <div
                    key={b.label}
                    className="p-5 rounded-xl"
                    style={{ backgroundColor: "oklch(0.97 0.012 85)", border: "1px solid oklch(0.91 0.012 85)" }}
                  >
                    <div style={{ fontSize: "1.6rem", marginBottom: "0.5rem" }}>{b.icon}</div>
                    <div className="font-label mb-1" style={{ color: "oklch(0.46 0.20 25)", fontSize: "0.68rem" }}>
                      {b.label}
                    </div>
                    <div className="font-body" style={{ color: "oklch(0.38 0.008 0)", fontSize: "0.85rem", lineHeight: 1.5, fontWeight: 300 }}>
                      {b.detail}
                    </div>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── Open Positions ── */}
      <section className="py-20" style={{ backgroundColor: "oklch(0.97 0.012 85)" }}>
        <div className="container">
          <FadeIn>
            <div className="font-label mb-4 flex items-center gap-3" style={{ color: "oklch(0.46 0.20 25)" }}>
              <span className="inline-block h-px w-7" style={{ backgroundColor: "oklch(0.46 0.20 25)" }} />
              Open Positions
            </div>
            <h2
              className="font-display font-light mb-12"
              style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", color: "oklch(0.15 0.005 0)", lineHeight: 1.1 }}
            >
              We're Hiring<br />
              <em style={{ color: "oklch(0.46 0.20 25)" }}>in Bend, Oregon</em>
            </h2>
          </FadeIn>

          <div className="space-y-6">
            {openings.map((job, i) => (
              <FadeIn key={job.title} delay={i * 0.08}>
                <div
                  className="rounded-2xl overflow-hidden"
                  style={{ backgroundColor: "oklch(1 0 0)", border: "1px solid oklch(0.91 0.012 85)" }}
                >
                  <div className="p-8">
                    <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                      <div>
                        <h3
                          className="font-display font-medium mb-2"
                          style={{ fontSize: "clamp(1.2rem, 2.5vw, 1.5rem)", color: "oklch(0.15 0.005 0)" }}
                        >
                          {job.title}
                        </h3>
                        <div className="flex gap-3">
                          <span
                            className="font-label px-3 py-1 rounded-full"
                            style={{ backgroundColor: "oklch(0.46 0.20 25 / 0.10)", color: "oklch(0.46 0.20 25)", fontSize: "0.65rem" }}
                          >
                            {job.type}
                          </span>
                          <span
                            className="font-label px-3 py-1 rounded-full"
                            style={{ backgroundColor: "oklch(0.35 0.08 145 / 0.10)", color: "oklch(0.35 0.08 145)", fontSize: "0.65rem" }}
                          >
                            {job.season}
                          </span>
                        </div>
                      </div>
                      <Link
                        href="/contact"
                        className="font-label px-6 py-3 rounded-full text-white transition-opacity hover:opacity-80"
                        style={{ backgroundColor: "oklch(0.46 0.20 25)", fontSize: "0.72rem", whiteSpace: "nowrap" }}
                      >
                        Apply Now →
                      </Link>
                    </div>
                    <p className="font-body mb-5" style={{ color: "oklch(0.38 0.008 0)", lineHeight: 1.7, fontWeight: 300 }}>
                      {job.description}
                    </p>
                    <div>
                      <div className="font-label mb-3" style={{ color: "oklch(0.46 0.20 25)", fontSize: "0.68rem" }}>
                        Requirements
                      </div>
                      <ul className="space-y-2">
                        {job.requirements.map((req) => (
                          <li key={req} className="flex items-start gap-3 font-body" style={{ color: "oklch(0.38 0.008 0)", fontSize: "0.9rem", lineHeight: 1.6, fontWeight: 300 }}>
                            <span style={{ color: "oklch(0.46 0.20 25)", marginTop: "0.2rem", flexShrink: 0 }}>•</span>
                            {req}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>

          {/* Don't see your role CTA */}
          <FadeIn delay={0.3}>
            <div
              className="mt-10 p-8 rounded-2xl text-center"
              style={{ backgroundColor: "oklch(0.15 0.005 0)" }}
            >
              <h3
                className="font-display font-light text-white mb-3"
                style={{ fontSize: "clamp(1.4rem, 3vw, 2rem)" }}
              >
                Don't see your role?
              </h3>
              <p className="font-body mb-6" style={{ color: "oklch(0.72 0.06 85)", lineHeight: 1.7, fontWeight: 300, maxWidth: "520px", margin: "0 auto 1.5rem" }}>
                We're always looking for talented people. Send us your resume and tell us what you bring to the table — we'll reach out when the right opportunity opens.
              </p>
              <Link
                href="/contact"
                className="inline-block font-label px-8 py-4 rounded-full text-white transition-opacity hover:opacity-80"
                style={{ backgroundColor: "oklch(0.46 0.20 25)", fontSize: "0.72rem" }}
              >
                Send Your Resume →
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      <Footer />
    </div>
  );
}
