/* ============================================================
   COMMERCIAL PAGE — Property Managers & Commercial Clients
   Dedicated landing page for commercial decision-makers:
   HOA boards, property managers, government facilities.
   Features real RV Park project photos, case study format,
   service matrix, and direct bid request CTA.
   ============================================================ */
import { useEffect, useRef, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLocation } from "wouter";
import {
  Building2,
  Trees,
  Shield,
  Users,
  CheckCircle2,
  Phone,
  ChevronRight,
  Award,
  Clock,
  Wrench,
} from "lucide-react";

// ── CDN image constants ──────────────────────────────────────
// Discovery West Plaza
const DW_AERIAL_OVERVIEW = "https://d2xsxph8kpxj0f.cloudfront.net/310519663503028182/g3pw3MRUapabcDUbhBEFxx/DiscoveryWestPlazaHiResPhotos45_7e4380ec.jpg";
const DW_AERIAL_ANGLED = "https://d2xsxph8kpxj0f.cloudfront.net/310519663503028182/g3pw3MRUapabcDUbhBEFxx/DiscoveryWestPlazaHiResPhotos58_4ec582a1.jpg";
const DW_OVERHEAD_CIRCULAR = "https://d2xsxph8kpxj0f.cloudfront.net/310519663503028182/g3pw3MRUapabcDUbhBEFxx/DiscoveryWestPlazaHiResPhotos55_79ba9dd5.jpg";
const DW_CREW_PLANTING = "https://d2xsxph8kpxj0f.cloudfront.net/310519663503028182/g3pw3MRUapabcDUbhBEFxx/DiscoveryWestPlazaHiResPhotos57_fafc711f.jpg";
const NINES_CREW = "https://d2xsxph8kpxj0f.cloudfront.net/310519663503028182/g3pw3MRUapabcDUbhBEFxx/NinesProject3_602cdeb8.jpg";

const HERO_IMAGE =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663503028182/g3pw3MRUapabcDUbhBEFxx/NewportLandscapingRVParkPhotos50_5ba97805.jpg";
const CREW_PLANTING =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663503028182/g3pw3MRUapabcDUbhBEFxx/NewportLandscapingRVParkDay2Photos2_8e8d0bb1.jpg";
const CREW_ACTION =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663503028182/g3pw3MRUapabcDUbhBEFxx/NewportLandscapingRVParkDay2Photos2_8e8d0bb1.jpg";
const CREW_IRRIGATION =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663503028182/g3pw3MRUapabcDUbhBEFxx/NewportLandscapingRVParkPhotos16_5e801b45.jpg";
const CREW_SOIL =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663503028182/g3pw3MRUapabcDUbhBEFxx/NewportLandscapingRVParkPhotos16_5e801b45.jpg";
const HOA_COMMUNITY =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663503028182/g3pw3MRUapabcDUbhBEFxx/hoa-central-oregon-aerial-FqxDA5HTtAdmvC4C8zTkoF.webp";
const CREW_DAY2_11 =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663503028182/g3pw3MRUapabcDUbhBEFxx/NewportLandscapingRVParkDay2Photos11_f8570f3e.jpg";
const CREW_DAY2_25 =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663503028182/g3pw3MRUapabcDUbhBEFxx/NewportLandscapingRVParkDay2Photos25_79f2b575.jpg";

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
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
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

// ── Data ─────────────────────────────────────────────────────
const clientTypes = [
  {
    icon: Building2,
    label: "Commercial Properties",
    items: [
      "Retail centers & shopping plazas",
      "Office parks & corporate campuses",
      "Mixed-use developments",
      "Hotels & resort destinations",
      "Industrial & warehouse facilities",
    ],
  },
  {
    icon: Trees,
    label: "HOA Communities",
    items: [
      "Master-planned communities",
      "Condominium complexes",
      "Townhome associations",
      "Gated communities",
      "Common area maintenance",
    ],
  },
  {
    icon: Shield,
    label: "Government & Institutional",
    items: [
      "City & county contracts",
      "Public parks & streetscapes",
      "Schools & universities",
      "Healthcare facilities",
      "Utility & infrastructure sites",
    ],
  },
];

const services = [
  {
    icon: Wrench,
    title: "Landscape Installation",
    desc: "Full-scale commercial landscape installation — grading, irrigation, planting, hardscape, and site amenities.",
  },
  {
    icon: Clock,
    title: "Year-Round Maintenance",
    desc: "Scheduled maintenance programs with dedicated account managers. Weekly, bi-weekly, or monthly — we work around your operations.",
  },
  {
    icon: Trees,
    title: "Irrigation Management",
    desc: "Design, installation, and ongoing management of commercial irrigation systems. Water conservation programs available.",
  },
  {
    icon: Shield,
    title: "Snow & Ice Management",
    desc: "24/7 snow removal and ice management for commercial properties. Pre-treatment, plowing, and de-icing services.",
  },
  {
    icon: Award,
    title: "Seasonal Color Programs",
    desc: "Rotating seasonal color installations that keep your property looking vibrant and professional year-round.",
  },
  {
    icon: Users,
    title: "HOA Consulting",
    desc: "Landscape planning, budgeting, and advisory services for HOA boards. We help you plan for long-term property value.",
  },
];

const reasons = [
  "150+ in-house professionals — no subcontractors",
  "Dedicated commercial account managers",
  "Licensed, Bonded & Insured — LCB #9153",
  "21+ years serving Central Oregon",
  "References from property managers available",
  "Responsive communication — same-day callbacks",
  "Full fleet of commercial-grade equipment",
  "Government contract experience",
];

export default function Commercial() {
  const [, navigate] = useLocation();

  return (
    <div className="min-h-screen" style={{ backgroundColor: "oklch(1 0 0)" }}>
      <Navbar />

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section
        className="relative flex items-end"
        style={{ minHeight: "clamp(480px, 60vh, 700px)", marginTop: "204px" }}
      >
        {/* Background */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${HERO_IMAGE})`,
            backgroundSize: "cover",
            backgroundPosition: "center 40%",
          }}
        />
        {/* Gradient overlay */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, oklch(0.08 0.005 0 / 0.92) 0%, oklch(0.08 0.005 0 / 0.55) 55%, oklch(0.08 0.005 0 / 0.30) 100%)",
          }}
        />
        {/* Content */}
        <div className="relative z-10 container pb-16 pt-32">
          <div
            className="font-label mb-4 flex items-center gap-3"
            style={{ color: "oklch(0.72 0.12 25)" }}
          >
            <span
              className="inline-block w-8 h-px"
              style={{ backgroundColor: "oklch(0.72 0.12 25)" }}
            />
            Commercial & HOA Services
          </div>
          <h1
            className="font-display font-light mb-4"
            style={{
              fontSize: "clamp(2.2rem, 5vw, 4rem)",
              color: "oklch(1 0 0)",
              lineHeight: 1.05,
              maxWidth: "700px",
            }}
          >
            Central Oregon's Trusted
            <br />
            <em style={{ color: "oklch(0.72 0.12 25)", fontStyle: "italic" }}>
              Commercial Landscape Partner
            </em>
          </h1>
          <p
            className="font-body mb-8"
            style={{
              color: "oklch(0.85 0.005 0)",
              maxWidth: "520px",
              lineHeight: 1.7,
              fontSize: "1.05rem",
            }}
          >
            From large-scale commercial installations to year-round HOA
            maintenance — Newport Avenue Landscaping has the team, equipment,
            and experience to handle your property at any scale.
          </p>
          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => {
                navigate("/contact");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="btn-red"
            >
              Request a Bid
            </button>
            <a
              href="tel:5416178873"
              className="btn-outline-light"
            >
              (541) 617-8873
            </a>
          </div>
        </div>
      </section>

      {/* ── TRUST BAR ────────────────────────────────────── */}
      <div
        className="py-5"
        style={{ backgroundColor: "oklch(0.46 0.20 25)" }}
      >
        <div className="container">
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-3">
            {[
              "400+ Commercial Properties Served",
              "150+ In-House Professionals",
              "21+ Years in Business",
              "LCB #9153 — Licensed, Bonded & Insured",
              "Government Contract Experience",
            ].map((item) => (
              <div
                key={item}
                className="font-label flex items-center gap-2"
                style={{ color: "oklch(1 0 0)", fontSize: "0.65rem" }}
              >
                <CheckCircle2 size={13} strokeWidth={2} />
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── CLIENT MARQUEE ────────────────────────────────── */}
      <div
        style={{
          backgroundColor: "oklch(0.97 0.012 85)",
          borderBottom: "1px solid oklch(0.90 0.010 85)",
          overflow: "hidden",
          padding: "22px 0",
        }}
      >
        {/* Section label */}
        <div
          className="text-center mb-4 font-label"
          style={{ color: "oklch(0.55 0.005 0)", fontSize: "0.58rem", letterSpacing: "0.18em" }}
        >
          TRUSTED BY CENTRAL OREGON'S LEADING PROPERTY MANAGERS
        </div>

        {/* Marquee track */}
        <div style={{ position: "relative", overflow: "hidden" }}>
          {/* Fade edges */}
          <div
            style={{
              position: "absolute", left: 0, top: 0, bottom: 0, width: "120px", zIndex: 2,
              background: "linear-gradient(to right, oklch(0.97 0.012 85), transparent)",
              pointerEvents: "none",
            }}
          />
          <div
            style={{
              position: "absolute", right: 0, top: 0, bottom: 0, width: "120px", zIndex: 2,
              background: "linear-gradient(to left, oklch(0.97 0.012 85), transparent)",
              pointerEvents: "none",
            }}
          />

          {/* Scrolling row — duplicated for seamless loop */}
          <div
            className="flex items-center gap-0"
            style={{
              animation: "marquee-scroll 38s linear infinite",
              width: "max-content",
            }}
          >
            {[
              "Compass Commercial",
              "NAI Cascade",
              "Fratzke Commercial",
              "Northwest Key",
              "Aperion Management Group",
              "The Management Trust",
              "HOA Management Inc.",
              "High Desert Property Management",
              "Mile High Management",
              "Plus Property Management",
              // duplicate for seamless loop
              "Compass Commercial",
              "NAI Cascade",
              "Fratzke Commercial",
              "Northwest Key",
              "Aperion Management Group",
              "The Management Trust",
              "HOA Management Inc.",
              "High Desert Property Management",
              "Mile High Management",
              "Plus Property Management",
            ].map((name, i) => (
              <div
                key={i}
                className="flex items-center flex-shrink-0"
              >
                <span
                  className="font-display"
                  style={{
                    fontSize: "clamp(0.85rem, 1.5vw, 1.05rem)",
                    fontWeight: 300,
                    color: "oklch(0.35 0.005 0)",
                    letterSpacing: "0.02em",
                    whiteSpace: "nowrap",
                    padding: "0 2.5rem",
                  }}
                >
                  {name}
                </span>
                {/* Separator dot */}
                <span
                  style={{
                    width: "4px",
                    height: "4px",
                    borderRadius: "50%",
                    backgroundColor: "oklch(0.46 0.20 25)",
                    flexShrink: 0,
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── INTRO + AERIAL PHOTO ─────────────────────────── */}
      <section className="py-24" style={{ backgroundColor: "oklch(1 0 0)" }}>
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <FadeIn>
              <div
                className="font-label mb-4 flex items-center gap-3"
                style={{ color: "oklch(0.46 0.20 25)" }}
              >
                <span
                  className="inline-block w-8 h-px"
                  style={{ backgroundColor: "oklch(0.46 0.20 25)" }}
                />
                Why Property Managers Choose Us
              </div>
              <h2
                className="font-display font-light mb-6"
                style={{
                  fontSize: "clamp(1.8rem, 3.5vw, 3rem)",
                  color: "oklch(0.15 0.005 0)",
                  lineHeight: 1.1,
                }}
              >
                Scale Without
                <br />
                <em style={{ color: "oklch(0.46 0.20 25)" }}>Compromise</em>
              </h2>
              <p
                className="font-body leading-relaxed mb-4"
                style={{ color: "oklch(0.38 0.005 0)" }}
              >
                We provide landscape maintenance for over 400 commercial
                properties in Bend, Oregon and the surrounding areas. We work
                with businesses, property management companies, HOAs, and
                private investors — and have established relationships with most
                of the major property management firms throughout Central Oregon.
              </p>
              <p
                className="font-body leading-relaxed mb-8"
                style={{ color: "oklch(0.38 0.005 0)" }}
              >
                With 150+ in-house professionals and a full fleet of
                commercial-grade equipment, we bring the same standard of
                craftsmanship and accountability to every commercial project —
                from a single retail center to a 200-unit HOA community.
                References provided upon request.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {reasons.map((r) => (
                  <div key={r} className="flex items-start gap-2">
                    <CheckCircle2
                      size={16}
                      strokeWidth={2}
                      style={{ color: "oklch(0.46 0.20 25)", flexShrink: 0, marginTop: "2px" }}
                    />
                    <span
                      className="font-body text-sm"
                      style={{ color: "oklch(0.38 0.005 0)" }}
                    >
                      {r}
                    </span>
                  </div>
                ))}
              </div>
            </FadeIn>

            {/* Photo stack */}
            <FadeIn delay={0.15} className="relative">
              <div
                className="overflow-hidden"
                style={{ aspectRatio: "4/3" }}
              >
                <img
                  src={CREW_PLANTING}
                  alt="Newport Avenue crew planting trees at commercial RV park project"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Floating stat */}
              <div
                className="absolute -bottom-5 -left-5 p-5 shadow-xl"
                style={{
                  backgroundColor: "oklch(0.46 0.20 25)",
                  maxWidth: "180px",
                }}
              >
                <div
                  className="font-display font-semibold mb-1"
                  style={{ fontSize: "2.2rem", color: "oklch(1 0 0)", lineHeight: 1 }}
                >
                  400+
                </div>
                <div
                  className="font-label"
                  style={{ color: "oklch(1 0 0 / 0.80)", fontSize: "0.6rem" }}
                >
                  Commercial Properties Maintained
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── CASE STUDY: RV PARK ──────────────────────────── */}
      <section
        className="py-24"
        style={{ backgroundColor: "oklch(0.97 0.012 85)" }}
      >
        <div className="container">
          <FadeIn className="text-center mb-16">
            <div
              className="font-label mb-4 flex items-center justify-center gap-3"
              style={{ color: "oklch(0.46 0.20 25)" }}
            >
              <span
                className="inline-block w-8 h-px"
                style={{ backgroundColor: "oklch(0.46 0.20 25)" }}
              />
              Featured Project
              <span
                className="inline-block w-8 h-px"
                style={{ backgroundColor: "oklch(0.46 0.20 25)" }}
              />
            </div>
            <h2
              className="font-display font-light"
              style={{
                fontSize: "clamp(1.8rem, 3.5vw, 3rem)",
                color: "oklch(0.15 0.005 0)",
                lineHeight: 1.1,
              }}
            >
              Large-Scale{" "}
              <em style={{ color: "oklch(0.46 0.20 25)" }}>Commercial Installation</em>
            </h2>
            <p
              className="font-body mt-4 mx-auto"
              style={{
                color: "oklch(0.45 0.005 0)",
                maxWidth: "560px",
                lineHeight: 1.7,
              }}
            >
              A large-scale commercial landscape installation in Central Oregon —
              demonstrating our capacity for complex, high-volume projects
              delivered on schedule.
            </p>
          </FadeIn>

          {/* Photo grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            {/* Large aerial */}
            <FadeIn className="md:col-span-2">
              <div
                className="overflow-hidden"
                style={{ height: "380px" }}
              >
                <img
                  src={HERO_IMAGE}
                  alt="Aerial view of large commercial RV park landscape installation — Newport Avenue Landscaping"
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
            </FadeIn>
            {/* Side stack */}
            <div className="flex flex-col gap-4">
              <FadeIn delay={0.1} className="flex-1">
                <div className="overflow-hidden" style={{ height: "182px" }}>
                  <img
                    src={CREW_ACTION}
                    alt="Newport Avenue crew at commercial landscape installation"
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>
              </FadeIn>
              <FadeIn delay={0.2} className="flex-1">
                <div className="overflow-hidden" style={{ height: "182px" }}>
                  <img
                    src={CREW_IRRIGATION}
                    alt="Newport Avenue crew watering newly planted trees at commercial site"
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>
              </FadeIn>
            </div>
          </div>

          {/* Second row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <FadeIn delay={0.1}>
              <div className="overflow-hidden" style={{ height: "240px" }}>
                <img
                  src={CREW_SOIL}
                  alt="Newport Avenue crew moving soil at commercial project"
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
            </FadeIn>
            <FadeIn delay={0.15}>
              <div className="overflow-hidden" style={{ height: "240px" }}>
                <img
                  src={CREW_DAY2_11}
                  alt="Newport Avenue commercial landscape installation crew"
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
            </FadeIn>
            <FadeIn delay={0.2}>
              <div className="overflow-hidden" style={{ height: "240px" }}>
                <img
                  src={CREW_DAY2_25}
                  alt="Newport Avenue commercial landscape installation detail"
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
            </FadeIn>
          </div>

          {/* Project stats */}
          <FadeIn delay={0.1}>
            <div
              className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-px"
              style={{ backgroundColor: "oklch(0.88 0.010 85)" }}
            >
              {[
                { value: "150+", label: "Crew Members Deployed" },
                { value: "Large Scale", label: "Commercial Installation" },
                { value: "On Schedule", label: "Delivered on Time" },
                { value: "Full Service", label: "Design Through Completion" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="p-6 text-center"
                  style={{ backgroundColor: "oklch(1 0 0)" }}
                >
                  <div
                    className="font-display font-light mb-1"
                    style={{ fontSize: "1.6rem", color: "oklch(0.46 0.20 25)" }}
                  >
                    {stat.value}
                  </div>
                  <div
                    className="font-label"
                    style={{ color: "oklch(0.50 0.005 0)", fontSize: "0.6rem" }}
                  >
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── CASE STUDY: DISCOVERY WEST PLAZA ──────────────────────────── */}
      <section className="py-24" style={{ backgroundColor: "oklch(0.10 0.005 0)" }}>
        <div className="container">
          <FadeIn className="mb-12">
            <div className="font-label mb-3" style={{ color: "oklch(0.72 0.12 25)", fontSize: "0.7rem", letterSpacing: "0.15em" }}>FEATURED PROJECT</div>
            <h2 className="font-display font-light text-white mb-4" style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", lineHeight: 1.1 }}>
              Discovery West Plaza
            </h2>
            <p className="text-white/60 max-w-2xl" style={{ fontSize: "1.05rem", lineHeight: 1.7 }}>
              A landmark commercial plaza installation in Bend, Oregon — featuring a sweeping herringbone paver roundabout, central water sculpture, curved xeriscape planting beds, boulder accents, ornamental trees, and full irrigation. Newport Avenue crews completed the full landscape installation for this high-profile mixed-use development.
            </p>
          </FadeIn>

          {/* Photo grid */}
          <div className="grid gap-3" style={{ gridTemplateColumns: "2fr 1fr", gridTemplateRows: "auto auto" }}>
            {/* Hero aerial */}
            <FadeIn delay={0.1} className="row-span-2">
              <div className="overflow-hidden" style={{ borderRadius: "4px", height: "100%", minHeight: "400px" }}>
                <img src={DW_AERIAL_OVERVIEW} alt="Discovery West Plaza — full aerial overview of circular paver plaza" className="w-full h-full object-cover" style={{ transition: "transform 0.6s ease" }} onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.04)")} onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")} />
              </div>
            </FadeIn>
            {/* Side top */}
            <FadeIn delay={0.2}>
              <div className="overflow-hidden" style={{ borderRadius: "4px", height: "240px" }}>
                <img src={DW_AERIAL_ANGLED} alt="Discovery West Plaza — angled aerial with crew working" className="w-full h-full object-cover" style={{ transition: "transform 0.6s ease" }} onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.04)")} onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")} />
              </div>
            </FadeIn>
            {/* Side bottom */}
            <FadeIn delay={0.3}>
              <div className="overflow-hidden" style={{ borderRadius: "4px", height: "240px" }}>
                <img src={DW_OVERHEAD_CIRCULAR} alt="Discovery West Plaza — overhead view of circular paver pattern" className="w-full h-full object-cover" style={{ transition: "transform 0.6s ease" }} onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.04)")} onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")} />
              </div>
            </FadeIn>
          </div>

          {/* Second row — crew shots */}
          <div className="grid gap-3 mt-3" style={{ gridTemplateColumns: "1fr 1fr" }}>
            <FadeIn delay={0.4}>
              <div className="overflow-hidden" style={{ borderRadius: "4px", height: "280px" }}>
                <img src={DW_CREW_PLANTING} alt="Newport Avenue crew planting at Discovery West Plaza" className="w-full h-full object-cover" style={{ transition: "transform 0.6s ease" }} onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.04)")} onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")} />
              </div>
            </FadeIn>
            <FadeIn delay={0.5}>
              <div className="overflow-hidden" style={{ borderRadius: "4px", height: "280px" }}>
                <img src={NINES_CREW} alt="Newport Avenue crew installing plantings at The Nines commercial project" className="w-full h-full object-cover" style={{ transition: "transform 0.6s ease" }} onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.04)")} onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")} />
              </div>
            </FadeIn>
          </div>

          {/* Project stats */}
          <FadeIn delay={0.4} className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { label: "PROJECT TYPE", value: "Commercial Plaza" },
              { label: "LOCATION", value: "Bend, OR" },
              { label: "SCOPE", value: "Full Landscape Install" },
              { label: "FEATURES", value: "Pavers · Irrigation · Xeriscape" },
            ].map((stat) => (
              <div key={stat.label} className="border-t pt-4" style={{ borderColor: "oklch(1 0 0 / 0.12)" }}>
                <div className="font-label mb-1" style={{ color: "oklch(0.72 0.12 25)", fontSize: "0.6rem", letterSpacing: "0.12em" }}>{stat.label}</div>
                <div className="text-white font-light" style={{ fontSize: "0.95rem" }}>{stat.value}</div>
              </div>
            ))}
          </FadeIn>
        </div>
      </section>

      {/* ── WHO WE SERVE ──────────────────────────────────────────────────── */}
      <section
        className="py-24"
        style={{ backgroundColor: "oklch(0.97 0.006 75)" }}
      >
        <div className="container">
          <FadeIn className="text-center mb-16">
            <div
              className="font-label mb-4 flex items-center justify-center gap-3"
              style={{ color: "oklch(0.46 0.20 25)" }}
            >
              <span
                className="inline-block w-8 h-px"
                style={{ backgroundColor: "oklch(0.46 0.20 25)" }}
              />
              Commercial Client Types
              <span
                className="inline-block w-8 h-px"
                style={{ backgroundColor: "oklch(0.46 0.20 25)" }}
              />
            </div>
            <h2
              className="font-display font-light"
              style={{
                fontSize: "clamp(1.8rem, 3.5vw, 3rem)",
                color: "oklch(0.18 0.008 0)",
                lineHeight: 1.1,
              }}
            >
              Every Property Type.{" "}
              <em style={{ color: "oklch(0.46 0.20 25)" }}>Every Scale.</em>
            </h2>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4" style={{ backgroundColor: "transparent" }}>
            {clientTypes.map((type, i) => {
              const Icon = type.icon;
              return (
                <FadeIn key={type.label} delay={i * 0.1}>
                  <div
                    className="p-10"
                    style={{ backgroundColor: "oklch(1 0 0)" }}
                  >
                    <div
                      className="w-12 h-12 flex items-center justify-center mb-6"
                      style={{
                        backgroundColor: "oklch(0.46 0.20 25 / 0.12)",
                        color: "oklch(0.46 0.20 25)",
                      }}
                    >
                      <Icon size={22} strokeWidth={1.5} />
                    </div>
                    <h3
                      className="font-display font-light mb-5"
                      style={{ fontSize: "1.3rem", color: "oklch(0.18 0.008 0)" }}
                    >
                      {type.label}
                    </h3>
                    <ul className="space-y-3">
                      {type.items.map((item) => (
                        <li key={item} className="flex items-start gap-3">
                          <ChevronRight
                            size={14}
                            strokeWidth={2}
                            style={{
                              color: "oklch(0.46 0.20 25)",
                              flexShrink: 0,
                              marginTop: "3px",
                            }}
                          />
                          <span
                            className="font-body text-sm"
                            style={{ color: "oklch(0.38 0.005 0)" }}
                          >
                            {item}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── SERVICES MATRIX ──────────────────────────────── */}
      <section className="py-24" style={{ backgroundColor: "oklch(1 0 0)" }}>
        <div className="container">
          <FadeIn className="text-center mb-16">
            <div
              className="font-label mb-4 flex items-center justify-center gap-3"
              style={{ color: "oklch(0.46 0.20 25)" }}
            >
              <span
                className="inline-block w-8 h-px"
                style={{ backgroundColor: "oklch(0.46 0.20 25)" }}
              />
              Commercial Services
              <span
                className="inline-block w-8 h-px"
                style={{ backgroundColor: "oklch(0.46 0.20 25)" }}
              />
            </div>
            <h2
              className="font-display font-light"
              style={{
                fontSize: "clamp(1.8rem, 3.5vw, 3rem)",
                color: "oklch(0.15 0.005 0)",
                lineHeight: 1.1,
              }}
            >
              Full-Service{" "}
              <em style={{ color: "oklch(0.46 0.20 25)" }}>Commercial Programs</em>
            </h2>
          </FadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((svc, i) => {
              const Icon = svc.icon;
              return (
                <FadeIn key={svc.title} delay={i * 0.08}>
                  <div
                    className="p-7 h-full"
                    style={{
                      borderTop: "3px solid oklch(0.46 0.20 25)",
                      backgroundColor: "oklch(0.98 0.005 85)",
                    }}
                  >
                    <div
                      className="w-11 h-11 flex items-center justify-center mb-5"
                      style={{
                        backgroundColor: "oklch(0.46 0.20 25)",
                        color: "oklch(1 0 0)",
                      }}
                    >
                      <Icon size={20} strokeWidth={1.5} />
                    </div>
                    <h3
                      className="font-display mb-3"
                      style={{ fontSize: "1.1rem", fontWeight: 500, color: "oklch(0.15 0.005 0)" }}
                    >
                      {svc.title}
                    </h3>
                    <p
                      className="font-body text-sm leading-relaxed"
                      style={{ color: "oklch(0.45 0.005 0)" }}
                    >
                      {svc.desc}
                    </p>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── HOA PHOTO SECTION ────────────────────────────── */}
      <section
        className="py-24"
        style={{ backgroundColor: "oklch(1 0 0)" }}
      >
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <FadeIn>
              <div className="overflow-hidden" style={{ aspectRatio: "4/3" }}>
                <img
                  src={HOA_COMMUNITY}
                  alt="HOA community landscape maintenance — Newport Avenue Landscaping"
                  className="w-full h-full object-cover"
                />
              </div>
            </FadeIn>
            <FadeIn delay={0.15}>
              <div
                className="font-label mb-4 flex items-center gap-3"
                style={{ color: "oklch(0.46 0.20 25)" }}
              >
                <span
                  className="inline-block w-8 h-px"
                  style={{ backgroundColor: "oklch(0.46 0.20 25)" }}
                />
                HOA Landscape Management
              </div>
              <h2
                className="font-display font-light mb-6"
                style={{
                  fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)",
                  color: "oklch(0.15 0.005 0)",
                  lineHeight: 1.1,
                }}
              >
                Community Pride,
                <br />
                <em style={{ color: "oklch(0.46 0.20 25)" }}>Year-Round</em>
              </h2>
              <p
                className="font-body leading-relaxed mb-4"
                style={{ color: "oklch(0.38 0.005 0)" }}
              >
                Newport Avenue manages HOA landscape maintenance contracts
                throughout Central Oregon. Our teams understand the unique
                requirements of community associations — consistent appearance
                standards, responsive communication with board members, and
                reliable scheduling that minimizes disruption to residents.
              </p>
              <p
                className="font-body leading-relaxed mb-8"
                style={{ color: "oklch(0.38 0.005 0)" }}
              >
                With 150+ professionals and dedicated account managers, we have
                the capacity to maintain large HOA communities without
                sacrificing quality or attention to detail. We provide detailed
                monthly reports and are always available to address board
                concerns promptly.
              </p>
              <div className="flex gap-4 flex-wrap">
                <button
                  onClick={() => {
                    navigate("/contact");
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className="btn-red"
                >
                  Request HOA Proposal
                </button>
                <a
                  href="tel:5416178873"
                  className="btn-outline-dark flex items-center gap-2"
                >
                  <Phone size={14} strokeWidth={2} />
                  (541) 617-8873
                </a>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ──────────────────────────────────── */}
      <section
        className="py-20"
        style={{ backgroundColor: "oklch(0.30 0.08 240)" }}
      >
        <div className="container text-center">
          <h2
            className="font-display font-light mb-4"
            style={{
              fontSize: "clamp(1.8rem, 3.5vw, 3rem)",
              color: "oklch(1 0 0)",
              lineHeight: 1.1,
            }}
          >
            Ready to Partner with
            <br />
            Central Oregon's Most Qualified Landscape Firm?
          </h2>
          <p
            className="font-body mb-8 mx-auto"
            style={{
              color: "oklch(1 0 0 / 0.85)",
              maxWidth: "500px",
              lineHeight: 1.7,
            }}
          >
            Contact us for a free commercial bid. We respond within one business
            day and provide references from current property management clients.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <button
              onClick={() => {
                navigate("/contact");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              style={{
                padding: "0.85rem 2rem",
                backgroundColor: "oklch(1 0 0)",
                color: "oklch(0.30 0.08 240)",
                fontSize: "0.75rem",
                letterSpacing: "0.12em",
                fontWeight: 700,
                border: "1.5px solid oklch(0.46 0.20 25)",
                borderRadius: "12px 0 12px 0",
                cursor: "pointer",
              }}
            >
              REQUEST A FREE BID
            </button>
            <a
              href="tel:5416178873"
              style={{
                padding: "0.85rem 2rem",
                backgroundColor: "oklch(1 0 0)",
                border: "1.5px solid oklch(0.46 0.20 25)",
                borderRadius: "12px 0 12px 0",
                color: "oklch(0.30 0.08 240)",
                fontSize: "0.75rem",
                letterSpacing: "0.12em",
                fontWeight: 700,
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
              }}
            >
              <Phone size={14} strokeWidth={2} />
              (541) 617-8873
            </a>
          </div>
          <p
            className="font-label mt-6"
            style={{ color: "oklch(1 0 0 / 0.65)", fontSize: "0.6rem" }}
          >
            LCB #9153 — Licensed, Bonded & Insured · Serving Central Oregon
            since 2005
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
