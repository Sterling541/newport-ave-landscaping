/* ============================================================
   MAINTENANCE PAGE — Newport Ave Landscaping
   Design: Dark charcoal + cream. Serif display headings.
   Lawn service, irrigation, commercial, seasonal services.
   ============================================================ */
import { useEffect, useRef, useState } from "react";
import { Link } from "wouter";
import Navbar from "@/components/Navbar";
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
        transform: visible ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

const maintenanceServices = [
  {
    title: "Lawn Service",
    subtitle: "Weekly All-Inclusive Care",
    description:
      "We offer ONE all-inclusive weekly lawn service — because we want results. Weekly mowing, edging, pruning, sprinkler monitoring, weed control, and seasonal fertilization. Your yard will look so manicured the neighbors will notice.",
    includes: [
      "Weekly mowing",
      "Weekly hardscape blowing (patios, walkways, decks)",
      "Weekly trash & debris removal",
      "Weekly sprinkler system monitoring",
      "Bi-weekly edging",
      "Bi-weekly pruning (trees, shrubs, hedges)",
      "Pre/Post emergent weed control",
      "Seasonal plant fertilization",
      "Three seasonal lawn fertilizations",
    ],
    note: "$95/man hour · Seasonal contract March – November",
  },
  {
    title: "Commercial Landscape Maintenance",
    subtitle: "HOA, Office Parks & Commercial Properties",
    description:
      "Reliable, professional maintenance for commercial properties, HOA communities, and office parks throughout Central Oregon. We understand the higher standard commercial clients demand and deliver consistently.",
    includes: [
      "Scheduled weekly or bi-weekly visits",
      "Mowing, edging, and trimming",
      "Irrigation monitoring and management",
      "Weed control and fertilization",
      "Seasonal clean-ups",
      "Snow & ice management",
    ],
    note: "Custom contracts available",
  },
  {
    title: "Aeration Services",
    subtitle: "Healthier Roots, Greener Grass",
    description:
      "Core aeration breaks up compacted soil, allowing water, oxygen, and nutrients to reach the root zone. Essential for Central Oregon's volcanic soil — we recommend annual aeration every fall.",
    includes: [
      "Core aeration (removes plugs)",
      "Overseeding available",
      "Ideal in fall for Central Oregon",
      "Reduces thatch buildup",
    ],
    note: "Seasonal availability — schedule early",
  },
  {
    title: "Sprinkler System Activation",
    subtitle: "Spring Start-Up",
    description:
      "Every spring we bring your irrigation system back online safely. We check each zone, adjust heads, test the controller, and make sure everything is running efficiently before the growing season begins.",
    includes: [
      "System pressurization and leak check",
      "Zone-by-zone inspection",
      "Head adjustment and alignment",
      "Controller programming review",
      "Backflow preventer inspection",
    ],
    note: "Book early — spring slots fill fast",
  },
  {
    title: "Sprinkler Blowout Service",
    subtitle: "Fall Winterization",
    description:
      "Central Oregon winters are hard on irrigation systems. Our certified technicians use compressed air to purge every zone, protecting your pipes and heads from freeze damage.",
    includes: [
      "Full system compressed-air blowout",
      "Zone-by-zone purge",
      "Controller shutdown",
      "Backflow preventer winterization",
      "Documentation for warranty compliance",
    ],
    note: "Required for Newport Priority Irrigation Membership",
  },
  {
    title: "Sprinkler Repair",
    subtitle: "Fast, Honest Fixes",
    description:
      "Broken head? Stuck valve? Controller issues? Our full-time irrigation team diagnoses and repairs problems quickly — and we won't try to sell you parts you don't need.",
    includes: [
      "Head replacement and adjustment",
      "Valve repair and replacement",
      "Controller troubleshooting",
      "Leak detection and line repair",
      "Backflow testing and repair",
    ],
    note: "Same-week scheduling available",
  },
  {
    title: "Snow Removal",
    subtitle: "Winter Property Protection",
    description:
      "Keep your property safe and accessible all winter. We offer residential and commercial snow removal throughout the Bend area, with priority scheduling for maintenance clients.",
    includes: [
      "Driveway and walkway clearing",
      "Commercial parking lot service",
      "De-icing and sand application",
      "Priority scheduling for existing clients",
      "On-call availability during storm events",
    ],
    note: "Seasonal contracts available",
  },
];

export default function Maintenance() {
  return (
     <div style={{ backgroundColor: "oklch(0.97 0.012 85)" }}>
      <SEO
        title="Lawn Care Bend Oregon | Mowing, Cleanup & Maintenance | Newport Avenue"
        description="Bend Oregon's lawn care experts since 2005. Weekly mowing from $97/service, spring & fall cleanups, sprinkler maintenance, snow removal & full-service landscape maintenance programs. LCB #9153."
        canonical="/maintenance"
      />
      <Navbar />
      {/* ── Hero ── */}
      <section
        className="relative flex items-end"
        style={{
          height: "clamp(280px, 38vw, 440px)", marginTop: "204px",
          backgroundColor: "oklch(0.12 0.005 0)",
          backgroundImage: "url(/manus-storage/NewportLandscapingRVParkDay2Photos2_8e8d0bb1_cd405dc0.webp",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(0deg, oklch(0.10 0.005 0 / 0.92) 0%, oklch(0 0 0 / 0.30) 70%)" }}
        />
        <div className="container relative pb-14" style={{ paddingTop: "clamp(200px, 22vw, 280px)" }}>
          <div className="font-label mb-3 flex items-center gap-3" style={{ color: "oklch(0.72 0.12 25)" }}>
            <span className="inline-block h-px w-7" style={{ backgroundColor: "oklch(0.46 0.20 25)" }} />
            Maintenance Services
          </div>
          <h1
            className="font-display font-light text-white"
            style={{ fontSize: "clamp(2.4rem, 6vw, 5rem)", lineHeight: 1.0 }}
          >
            Lawn Care &amp; Landscape Maintenance<br />
            <em style={{ color: "oklch(0.75 0.10 25)" }}>Bend, Oregon</em>
          </h1>
        </div>
      </section>

      {/* ── Intro ── */}
      <section className="py-16" style={{ backgroundColor: "oklch(1 0 0)" }}>
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <FadeIn>
              <h2
                className="font-display font-light mb-5"
                style={{ fontSize: "clamp(1.6rem, 3vw, 2.6rem)", color: "oklch(0.15 0.005 0)", lineHeight: 1.1 }}
              >
                Central Oregon's Most Trusted<br />
                <em style={{ color: "oklch(0.46 0.20 25)" }}>Maintenance Team</em>
              </h2>
              <p
                className="font-body mb-5"
                style={{ color: "oklch(0.38 0.008 0)", lineHeight: 1.8, fontWeight: 300 }}
              >
                Since 2005, we've provided lawn care and landscape maintenance for thousands of homes throughout Bend, Redmond, Sisters, and the broader Central Oregon area. From La Pine to Madras and from Prineville to Sisters, our crews are seen beautifying landscapes every weekday.
              </p>
              <p
                className="font-body"
                style={{ color: "oklch(0.38 0.008 0)", lineHeight: 1.8, fontWeight: 300 }}
              >
                We believe in doing things right. That's why we offer one all-inclusive weekly service — not a menu of cut-rate options. Our standard of quality has helped us thrive for over two decades.
              </p>
            </FadeIn>
            <FadeIn delay={0.15}>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { num: "21+", label: "Years Serving Central Oregon" },
                  { num: "1000s", label: "Properties Maintained" },
                  { num: "110+", label: "Team Members" },
                  { num: "7", label: "Maintenance Services" },
                ].map((s) => (
                  <div key={s.label} className="p-6" style={{ backgroundColor: "oklch(0.97 0.012 85)" }}>
                    <div className="font-display font-light mb-1" style={{ fontSize: "2.4rem", color: "oklch(0.46 0.20 25)", lineHeight: 1 }}>
                      {s.num}
                    </div>
                    <div className="font-label" style={{ color: "oklch(0.45 0.008 0)", fontSize: "0.68rem" }}>
                      {s.label}
                    </div>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── Services List ── */}
      <section className="py-20" style={{ backgroundColor: "oklch(0.97 0.012 85)" }}>
        <div className="container">
          <FadeIn>
            <div className="font-label mb-4 flex items-center gap-3" style={{ color: "oklch(0.46 0.20 25)" }}>
              <span className="inline-block h-px w-7" style={{ backgroundColor: "oklch(0.46 0.20 25)" }} />
              What We Offer
            </div>
            <h2
              className="font-display font-light mb-14"
              style={{ fontSize: "clamp(1.8rem, 3.5vw, 3rem)", color: "oklch(0.15 0.005 0)", lineHeight: 1.1 }}
            >
              Complete Maintenance<br />
              <em style={{ color: "oklch(0.46 0.20 25)" }}>Services</em>
            </h2>
          </FadeIn>

          <div className="space-y-6">
            {maintenanceServices.map((service, i) => (
              <FadeIn key={service.title} delay={i * 0.07}>
                <div
                  className="grid grid-cols-1 lg:grid-cols-3 gap-0"
                  style={{ backgroundColor: "oklch(1 0 0)" }}
                >
                  {/* Left: title */}
                  <div
                    className="p-8 flex flex-col justify-center"
                    style={{ backgroundColor: i % 2 === 0 ? "oklch(0.15 0.005 0)" : "oklch(0.46 0.20 25)" }}
                  >
                    <div className="font-label mb-2" style={{ color: i % 2 === 0 ? "oklch(0.72 0.12 25)" : "oklch(0.92 0.05 25)", fontSize: "0.68rem" }}>
                      {service.subtitle}
                    </div>
                    <h3
                      className="font-display font-light text-white"
                      style={{ fontSize: "1.5rem", lineHeight: 1.15 }}
                    >
                      {service.title}
                    </h3>
                  </div>
                  {/* Middle: description */}
                  <div className="p-8">
                    <p
                      className="font-body mb-4"
                      style={{ color: "oklch(0.38 0.008 0)", lineHeight: 1.75, fontWeight: 300 }}
                    >
                      {service.description}
                    </p>
                    <div
                      className="font-label text-xs"
                      style={{ color: "oklch(0.46 0.20 25)" }}
                    >
                      {service.note}
                    </div>
                  </div>
                  {/* Right: includes */}
                  <div className="p-8" style={{ backgroundColor: "oklch(0.97 0.012 85)" }}>
                    <div className="font-label mb-3" style={{ color: "oklch(0.45 0.008 0)", fontSize: "0.65rem" }}>
                      WHAT'S INCLUDED
                    </div>
                    <ul className="space-y-2">
                      {service.includes.map((item) => (
                        <li key={item} className="flex items-start gap-2">
                          <span
                            className="flex-shrink-0 mt-1.5 w-1.5 h-1.5 rounded-full"
                            style={{ backgroundColor: "oklch(0.46 0.20 25)" }}
                          />
                          <span
                            className="font-body"
                            style={{ color: "oklch(0.38 0.008 0)", fontSize: "0.88rem", fontWeight: 300 }}
                          >
                            {item}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── Priority Irrigation Membership ── */}
      <section className="py-20" style={{ backgroundColor: "oklch(0.15 0.005 0)" }}>
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <FadeIn>
              <div className="font-label mb-4 flex items-center gap-3" style={{ color: "oklch(0.72 0.12 25)" }}>
                <span className="inline-block h-px w-7" style={{ backgroundColor: "oklch(0.46 0.20 25)" }} />
                Newport Priority Program
              </div>
              <h2
                className="font-display font-light text-white mb-5"
                style={{ fontSize: "clamp(1.8rem, 3.5vw, 3rem)", lineHeight: 1.1 }}
              >
                Never Worry About<br />
                <em style={{ color: "oklch(0.75 0.10 25)" }}>Your Sprinklers Again</em>
              </h2>
              <p
                className="font-body mb-6"
                style={{ color: "oklch(0.70 0.008 0)", lineHeight: 1.8, fontWeight: 300 }}
              >
                Our Newport <a href="https://newportavlandscaping.com/irrigation-program-231244" target="_blank" rel="noopener noreferrer" className="text-green-700 underline hover:text-green-900">Priority Irrigation Membership</a> covers your spring activation, fall blowout, and annual backflow test — everything you need to keep your irrigation system protected year-round and your warranty intact.
              </p>
              <Link
                href="/contact"
                className="btn-red"
              >
                SIGN UP TODAY
              </Link>
            </FadeIn>
            <FadeIn delay={0.15}>
              <div className="space-y-4">
                {[
                  { icon: "💧", title: "Spring Activation", desc: "Full system start-up, zone check, head adjustment, and controller programming." },
                  { icon: "❄️", title: "Fall Blowout", desc: "Compressed-air winterization of every zone to prevent freeze damage." },
                  { icon: "✅", title: "Annual Backflow Test", desc: "Certified backflow preventer testing to meet city requirements." },
                ].map((item) => (
                  <div key={item.title} className="flex gap-5 p-5" style={{ backgroundColor: "oklch(0.20 0.005 0)", borderRadius: "1.2rem 0.15rem 1.2rem 0.15rem" }}>
                    <div className="text-2xl flex-shrink-0">{item.icon}</div>
                    <div>
                      <div className="font-display font-light text-white mb-1" style={{ fontSize: "1.05rem" }}>
                        {item.title}
                      </div>
                      <div className="font-body" style={{ color: "oklch(0.65 0.008 0)", fontSize: "0.88rem", fontWeight: 300 }}>
                        {item.desc}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 text-center" style={{ backgroundColor: "oklch(0.46 0.20 25)" }}>
        <div className="container">
          <FadeIn>
            <h2
              className="font-display font-light text-white mb-4"
              style={{ fontSize: "clamp(1.8rem, 3.5vw, 3rem)" }}
            >
              Ready to Start Service?
            </h2>
            <p
              className="font-body mb-8 mx-auto"
              style={{ color: "oklch(0.92 0.05 25)", fontWeight: 300, maxWidth: "480px" }}
            >
              Fill out our project form and we'll get you on the schedule. Seasonal contracts are limited — reach out today.
            </p>
            <Link
              href="/contact"
              className="btn-red"
            >
              I AM READY TO START SERVICE
            </Link>
          </FadeIn>
        </div>
      </section>

    </div>
  );
}
