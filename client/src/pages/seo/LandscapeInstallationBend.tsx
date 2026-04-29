/* ============================================================
   SEO LANDING PAGE — Landscape Installation Bend Oregon
   Target keywords:
     • "landscape installation Bend Oregon"
     • "new landscape installation Bend OR"
     • "landscaping company Bend Oregon"
     • "landscape contractor Bend Oregon"
     • "landscape install Bend"
   ============================================================ */
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Helmet } from "react-helmet-async";
import { Link } from "wouter";

const HERO_IMG = "/manus-storage/east-bend-landscape-install-finished-backyard-aeriel-view2_3758f2f5.jpg";

const INSTALL_TYPES = [
  {
    title: "New Landscape Installation",
    desc: "Complete ground-up landscape installation for new construction and bare lots — grading, soil prep, plants, sod, rock, and irrigation all in one project.",
    href: "/services/landscape-design",
    img: "/manus-storage/east-bend-install-01_5ad4daf3.jpg",
  },
  {
    title: "Landscape Renovation",
    desc: "Transform an outdated or overgrown yard into a low-maintenance, high-impact landscape designed for Bend's high-desert climate.",
    href: "/services/landscape-design",
    img: "/manus-storage/proj-bend-after-backyard1_c8556c78_33f6b99d.webp",
  },
  {
    title: "Paver Patios & Walkways",
    desc: "Concrete and natural stone paver installation for patios, walkways, driveways, and pool decks — built to last in Central Oregon's freeze-thaw cycles.",
    href: "/services/pavers",
    img: "/manus-storage/GLLPatio1_90e2e0c4_166b9312.webp",
  },
  {
    title: "Retaining Walls",
    desc: "Boulder, block, and natural stone retaining walls for slope stabilization, terracing, and raised planting beds.",
    href: "/services/retaining-walls",
    img: "/manus-storage/awbrey-patio-wall-01_bde91632.jpg",
  },
  {
    title: "Irrigation System Installation",
    desc: "Smart sprinkler systems, drip irrigation, and rain sensors designed for Bend's water restrictions and volcanic pumice soil.",
    href: "/services/irrigation",
    img: "/manus-storage/safe-hero-irrigation-wide_7d00acf6.jpg",
  },
  {
    title: "Xeriscape & Water-Wise Install",
    desc: "Drought-tolerant landscape installations using native plants, efficient drip irrigation, and decorative rock mulch — built for Bend's 12-inch annual rainfall.",
    href: "/services/xeriscaping",
    img: "/manus-storage/brokentop-xeriscape-01_064e5008.jpg",
  },
  {
    title: "Outdoor Living Spaces",
    desc: "Fire pits, pergolas, outdoor kitchens, and living areas installed to extend your usable outdoor space through Bend's long summer season.",
    href: "/services/outdoor-living",
    img: "/manus-storage/bend-oregon-westside-outdoor-living-space-finished-fireplace_7547dcca.jpg",
  },
  {
    title: "Firewise Landscape Installation",
    desc: "Defensible space installation for WUI properties — juniper removal, fire-resistant replanting, and ember-resistant ground cover.",
    href: "/services/firewise-landscaping",
    img: "/manus-storage/forest-home4_9324e5db_31f1b27d.webp",
  },
];

const PROCESS = [
  {
    step: "01",
    title: "Free On-Site Consultation",
    desc: "We visit your property, assess existing conditions, discuss your vision and budget, and answer questions. No pressure, no obligation.",
  },
  {
    step: "02",
    title: "Design & Proposal",
    desc: "Our design team develops a custom landscape plan with plant selections, hardscape layout, irrigation zones, and a detailed cost estimate.",
  },
  {
    step: "03",
    title: "Design Review & Scheduling",
    desc: "We review the plan with you, incorporate any changes, finalize the design, and schedule your installation date.",
  },
  {
    step: "04",
    title: "Installation",
    desc: "Our experienced crews handle every aspect of installation — grading, hardscape, planting, irrigation, lighting, and cleanup.",
  },
  {
    step: "05",
    title: "Walkthrough & Warranty",
    desc: "We walk through the completed project with you, explain irrigation programming, and provide a plant care guide and warranty information.",
  },
];

const FAQS = [
  {
    q: "How much does landscape installation cost in Bend, Oregon?",
    a: "Landscape installation costs in Bend vary significantly by project scope. A basic front yard installation typically ranges from $5,000–$15,000. A full backyard renovation with hardscape, irrigation, and planting runs $15,000–$60,000+. Larger design-build projects with outdoor living spaces, retaining walls, and extensive hardscape can exceed $100,000. We provide free on-site estimates for all projects — prices shown are typical market ranges for planning purposes only and are not a binding quote.",
  },
  {
    q: "What is included in a landscape installation?",
    a: "A full landscape installation from Newport Avenue Landscaping typically includes: site preparation and grading, soil amendment, irrigation system installation, plant installation (trees, shrubs, perennials, groundcovers), sod or seeding, rock or bark mulch, hardscape elements (pavers, walls, edging), and final cleanup. We can also include landscape lighting, water features, and outdoor living structures depending on your project.",
  },
  {
    q: "How long does a landscape installation take in Bend?",
    a: "Installation timelines depend on project size and complexity. A basic front yard installation takes 2–5 days. A full backyard renovation with hardscape and irrigation typically takes 1–3 weeks. Larger projects with extensive hardscape, retaining walls, and outdoor living structures may take 3–6 weeks. We provide a project timeline estimate during the design phase.",
  },
  {
    q: "What plants work best for landscape installation in Bend, Oregon?",
    a: "Bend's Zone 6b high-desert climate at 3,600 feet elevation favors drought-tolerant and cold-hardy plants. Top performers include: native sagebrush and bitterbrush, ornamental grasses (Blue Oat Grass, Karl Foerster), drought-tolerant perennials (Salvia, Penstemon, Lavender, Yarrow), conifers (Ponderosa Pine, Juniper), and deciduous trees (Aspen, Serviceberry, Chokecherry). We select plants that thrive in Bend's specific conditions — low rainfall, volcanic pumice soil, and cold winters.",
  },
  {
    q: "Do you handle both design and installation, or just one?",
    a: "Newport Avenue Landscaping is a full-service design-build firm. We handle the entire process from initial site consultation and design through installation and ongoing maintenance. You work with one team from start to finish — no coordinating between separate designers and contractors.",
  },
  {
    q: "Are you licensed for landscape installation in Oregon?",
    a: "Yes. Newport Avenue Landscaping holds an Oregon Landscape Contractor's Board (LCB) license, is fully bonded, and carries general liability and workers' compensation insurance on all projects. We are compliant with all Oregon landscape contractor licensing requirements.",
  },
  {
    q: "What neighborhoods in Bend do you install landscapes in?",
    a: "We install landscapes throughout all of Bend including NorthWest Crossing, Awbrey Butte, Awbrey Glen, Discovery West, Petrosa, Broken Top, The Highlands, Tetherow, Southeast Bend, East Bend, and all surrounding areas. We also serve Redmond, Sisters, Sunriver, Tumalo, La Pine, and all of Central Oregon.",
  },
  {
    q: "How do I get a landscape installation estimate in Bend?",
    a: "Call us at (541) 604-1337, fill out our online contact form, or use our Schedule Services form to request a free on-site estimate. We typically schedule consultations within 1–2 weeks depending on the season.",
  },
];

const SERVICE_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Landscape Installation — Bend, Oregon",
  "provider": {
    "@type": "LocalBusiness",
    "name": "Newport Avenue Landscaping",
    "telephone": "(541) 604-1337",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Bend",
      "addressRegion": "OR",
      "postalCode": "97702",
      "addressCountry": "US",
    },
  },
  "areaServed": [
    "Bend",
    "Redmond",
    "Sisters",
    "Sunriver",
    "Tumalo",
    "La Pine",
    "Prineville",
    "Madras",
    "Central Oregon",
  ],
  "description":
    "Professional landscape installation in Bend, Oregon. New landscape installs, renovations, paver patios, retaining walls, irrigation, xeriscape, and outdoor living spaces. Licensed & insured design-build contractor.",
  "serviceType": [
    "Landscape Installation",
    "Landscape Renovation",
    "Paver Installation",
    "Retaining Wall Installation",
    "Irrigation Installation",
    "Xeriscape Installation",
    "Outdoor Living Installation",
    "Firewise Landscape Installation",
  ],
};

const BREADCRUMB_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://www.newportavelandscaping.com/",
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Services",
      "item": "https://www.newportavelandscaping.com/services",
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "Landscape Installation Bend Oregon",
      "item": "https://www.newportavelandscaping.com/landscape-installation-bend-oregon",
    },
  ],
};

const FAQ_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": FAQS.map((f) => ({
    "@type": "Question",
    "name": f.q,
    "acceptedAnswer": { "@type": "Answer", "text": f.a },
  })),
};

export default function LandscapeInstallationBend() {
  return (
    <div style={{ backgroundColor: "oklch(0.97 0.012 85)" }}>
      <Helmet>
        <title>
          Landscape Installation Bend Oregon | Newport Avenue Landscaping | (541) 604-1337
        </title>
        <meta
          name="description"
          content="Expert landscape installation in Bend, Oregon. New installs, renovations, pavers, retaining walls, irrigation & xeriscape. Full design-build service. Licensed & insured. Free estimates."
        />
        <link
          rel="canonical"
          href="https://www.newportavelandscaping.com/landscape-installation-bend-oregon"
        />
        <script type="application/ld+json">{JSON.stringify(SERVICE_SCHEMA)}</script>
        <script type="application/ld+json">{JSON.stringify(BREADCRUMB_SCHEMA)}</script>
        <script type="application/ld+json">{JSON.stringify(FAQ_SCHEMA)}</script>
      </Helmet>
      <Navbar />

      {/* ── HERO ── */}
      <section
        style={{
          background: `linear-gradient(rgba(0,0,0,0.60), rgba(0,0,0,0.55)), url(${HERO_IMG}) center/cover no-repeat`,
          paddingTop: "calc(204px + 3rem)",
          paddingBottom: "4.5rem",
        }}
      >
        <div
          style={{
            maxWidth: "900px",
            margin: "0 auto",
            padding: "0 1.5rem",
            textAlign: "center",
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-label)",
              fontSize: "0.65rem",
              letterSpacing: "0.18em",
              color: "oklch(0.72 0.12 25)",
              marginBottom: "1rem",
            }}
          >
            BEND, OREGON · LICENSED & INSURED · DESIGN-BUILD
          </p>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 300,
              color: "#fff",
              fontSize: "clamp(2rem, 5vw, 3.6rem)",
              lineHeight: 1.1,
              marginBottom: "1.25rem",
            }}
          >
            Landscape Installation in Bend, Oregon
          </h1>
          <p
            style={{
              color: "oklch(0.88 0.008 0)",
              fontWeight: 300,
              fontSize: "1.1rem",
              maxWidth: "660px",
              margin: "0 auto 2rem",
              lineHeight: 1.75,
            }}
          >
            Newport Avenue Landscaping installs complete landscapes for Bend homeowners and
            commercial properties — from bare lots to full backyard renovations. Licensed landscape
            architects on staff. Design, installation, irrigation, hardscape, and ongoing care, all
            under one roof.
          </p>
          <div
            style={{
              display: "flex",
              gap: "1rem",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <Link href="/schedule-services">
              <span
                style={{
                  display: "inline-block",
                  background: "oklch(0.46 0.20 25)",
                  color: "#fff",
                  padding: "0.9rem 2.25rem",
                  fontFamily: "var(--font-label)",
                  fontSize: "0.7rem",
                  letterSpacing: "0.14em",
                  cursor: "pointer",
                  textDecoration: "none",
                }}
              >
                GET A FREE ESTIMATE →
              </span>
            </Link>
            <a
              href="tel:5416041337"
              style={{
                display: "inline-block",
                border: "1px solid rgba(255,255,255,0.45)",
                color: "#fff",
                padding: "0.9rem 2.25rem",
                fontFamily: "var(--font-label)",
                fontSize: "0.7rem",
                letterSpacing: "0.14em",
                textDecoration: "none",
              }}
            >
              CALL (541) 604-1337
            </a>
          </div>
        </div>
      </section>

      {/* ── TRUST BAR ── */}
      <section style={{ background: "oklch(0.15 0.005 0)", padding: "1.25rem 0" }}>
        <div
          style={{
            maxWidth: "900px",
            margin: "0 auto",
            padding: "0 1.5rem",
            display: "flex",
            gap: "2rem",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          {[
            "21+ Years in Business",
            "Licensed & Bonded (LCB#)",
            "150+ Crew Members",
            "400+ Projects Installed",
            "Free On-Site Estimates",
          ].map((t) => (
            <span
              key={t}
              style={{
                fontFamily: "var(--font-label)",
                fontSize: "0.6rem",
                letterSpacing: "0.14em",
                color: "oklch(0.72 0.12 25)",
              }}
            >
              {t}
            </span>
          ))}
        </div>
      </section>

      {/* ── INTRO ── */}
      <section style={{ background: "oklch(1 0 0)", padding: "4.5rem 0" }}>
        <div style={{ maxWidth: "860px", margin: "0 auto", padding: "0 1.5rem" }}>
          <p
            style={{
              fontFamily: "var(--font-label)",
              fontSize: "0.65rem",
              letterSpacing: "0.18em",
              color: "oklch(0.46 0.20 25)",
              marginBottom: "0.75rem",
            }}
          >
            BEND'S LANDSCAPE INSTALLATION CONTRACTOR
          </p>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 300,
              color: "oklch(0.15 0.005 0)",
              fontSize: "clamp(1.5rem, 3vw, 2.3rem)",
              marginBottom: "1.5rem",
              lineHeight: 1.2,
            }}
          >
            From Bare Lot to Finished Landscape — We Handle Everything
          </h2>
          <p
            style={{
              color: "oklch(0.38 0.008 0)",
              lineHeight: 1.85,
              fontWeight: 300,
              marginBottom: "1.25rem",
              fontSize: "1.02rem",
            }}
          >
            Newport Avenue Landscaping has been installing landscapes in Bend and throughout Central
            Oregon for over 21 years. We are a full-service design-build contractor with licensed
            landscape architects on staff — meaning we handle your project from the initial site
            consultation and design through complete installation and ongoing maintenance. You work
            with one team, one contract, and one point of contact from start to finish.
          </p>
          <p
            style={{
              color: "oklch(0.38 0.008 0)",
              lineHeight: 1.85,
              fontWeight: 300,
              marginBottom: "1.25rem",
              fontSize: "1.02rem",
            }}
          >
            Bend's high-desert environment at 3,600 feet elevation presents specific installation
            challenges: volcanic pumice soil that drains rapidly, extreme temperature swings between
            seasons, low annual precipitation around 12 inches, and increasingly fire-prone
            conditions in the wildland-urban interface. Our crews have spent two decades developing
            installation expertise specific to these conditions — from proper soil amendment
            techniques and efficient drip irrigation to cold-hardy plant selection and firewise
            defensible space design.
          </p>
          <p
            style={{
              color: "oklch(0.38 0.008 0)",
              lineHeight: 1.85,
              fontWeight: 300,
              fontSize: "1.02rem",
            }}
          >
            Whether you are building a new home in NorthWest Crossing and need a complete landscape
            installation, renovating an established property in Awbrey Butte, or transforming a
            bare East Bend lot into a functional outdoor living space, Newport Avenue Landscaping
            has the experience, licensing, and crew capacity to deliver. Our licensed landscape
            architects can take your project all the way from initial design concepts through
            construction and into long-term ongoing care — so your investment looks great and
            performs well for years to come.
          </p>
        </div>
      </section>

      {/* ── INSTALLATION TYPES GRID ── */}
      <section style={{ background: "oklch(0.97 0.012 85)", padding: "4.5rem 0" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 1.5rem" }}>
          <p
            style={{
              fontFamily: "var(--font-label)",
              fontSize: "0.65rem",
              letterSpacing: "0.18em",
              color: "oklch(0.46 0.20 25)",
              marginBottom: "0.75rem",
              textAlign: "center",
            }}
          >
            INSTALLATION SERVICES
          </p>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 300,
              color: "oklch(0.15 0.005 0)",
              fontSize: "clamp(1.5rem, 3vw, 2.2rem)",
              marginBottom: "2.5rem",
              textAlign: "center",
            }}
          >
            What We Install in Bend
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
              gap: "1.5rem",
            }}
          >
            {INSTALL_TYPES.map((s) => (
              <Link key={s.title} href={s.href}>
                <div
                  style={{
                    background: "#fff",
                    overflow: "hidden",
                    cursor: "pointer",
                    transition: "transform 0.2s",
                    boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-3px)")}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
                >
                  <div
                    style={{
                      height: "190px",
                      backgroundImage: `url(${s.img})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  />
                  <div style={{ padding: "1.25rem" }}>
                    <h3
                      style={{
                        fontFamily: "var(--font-display)",
                        fontWeight: 400,
                        color: "oklch(0.15 0.005 0)",
                        fontSize: "1.05rem",
                        marginBottom: "0.5rem",
                      }}
                    >
                      {s.title}
                    </h3>
                    <p
                      style={{
                        color: "oklch(0.45 0.008 0)",
                        fontSize: "0.87rem",
                        lineHeight: 1.65,
                        fontWeight: 300,
                      }}
                    >
                      {s.desc}
                    </p>
                    <p
                      style={{
                        color: "oklch(0.46 0.20 25)",
                        fontFamily: "var(--font-label)",
                        fontSize: "0.6rem",
                        letterSpacing: "0.12em",
                        marginTop: "0.75rem",
                      }}
                    >
                      LEARN MORE →
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROCESS ── */}
      <section style={{ background: "oklch(1 0 0)", padding: "4.5rem 0" }}>
        <div style={{ maxWidth: "860px", margin: "0 auto", padding: "0 1.5rem" }}>
          <p
            style={{
              fontFamily: "var(--font-label)",
              fontSize: "0.65rem",
              letterSpacing: "0.18em",
              color: "oklch(0.46 0.20 25)",
              marginBottom: "0.75rem",
              textAlign: "center",
            }}
          >
            HOW IT WORKS
          </p>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 300,
              color: "oklch(0.15 0.005 0)",
              fontSize: "clamp(1.5rem, 3vw, 2.2rem)",
              marginBottom: "2.5rem",
              textAlign: "center",
            }}
          >
            Our Installation Process
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
            {PROCESS.map((p) => (
              <div
                key={p.step}
                style={{ display: "flex", gap: "1.75rem", alignItems: "flex-start" }}
              >
                <div
                  style={{
                    flexShrink: 0,
                    width: "56px",
                    height: "56px",
                    background: "oklch(0.97 0.012 85)",
                    border: "1px solid oklch(0.88 0.012 85)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-display)",
                      fontWeight: 300,
                      fontSize: "1.1rem",
                      color: "oklch(0.46 0.20 25)",
                    }}
                  >
                    {p.step}
                  </span>
                </div>
                <div>
                  <h3
                    style={{
                      fontFamily: "var(--font-display)",
                      fontWeight: 400,
                      color: "oklch(0.15 0.005 0)",
                      fontSize: "1.05rem",
                      marginBottom: "0.4rem",
                    }}
                  >
                    {p.title}
                  </h3>
                  <p
                    style={{
                      color: "oklch(0.42 0.008 0)",
                      fontSize: "0.92rem",
                      lineHeight: 1.7,
                      fontWeight: 300,
                    }}
                  >
                    {p.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PHOTO STRIP ── */}
      <section style={{ background: "oklch(0.12 0.005 0)", padding: "0", overflow: "hidden" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            height: "260px",
          }}
        >
          {[
            "/manus-storage/east-bend-install-03_629df888.jpg",
            "/manus-storage/petrosa-backyard-03_70996f36.jpg",
            "/manus-storage/nw-bend-backyard-01_e6d82c48.jpg",
            "/manus-storage/awbrey-glen-flagstone-03_15d430c7.jpg",
          ].map((img, i) => (
            <div
              key={i}
              style={{
                backgroundImage: `url(${img})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
          ))}
        </div>
      </section>

      {/* ── WHY NEWPORT ── */}
      <section style={{ background: "oklch(0.97 0.012 85)", padding: "4.5rem 0" }}>
        <div style={{ maxWidth: "1060px", margin: "0 auto", padding: "0 1.5rem" }}>
          <p
            style={{
              fontFamily: "var(--font-label)",
              fontSize: "0.65rem",
              letterSpacing: "0.18em",
              color: "oklch(0.46 0.20 25)",
              marginBottom: "0.75rem",
              textAlign: "center",
            }}
          >
            WHY CHOOSE US
          </p>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 300,
              color: "oklch(0.15 0.005 0)",
              fontSize: "clamp(1.5rem, 3vw, 2.2rem)",
              marginBottom: "2.5rem",
              textAlign: "center",
            }}
          >
            Why Bend Homeowners Choose Newport Avenue Landscaping
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
              gap: "1.5rem",
            }}
          >
            {[
              {
                title: "21+ Years in Bend",
                body: "We have been installing landscapes in Central Oregon since the early 2000s. We know Bend's soil, climate, water restrictions, and neighborhoods better than anyone.",
              },
              {
                title: "Full Design-Build Service",
                body: "One team handles design, permits, installation, and maintenance. No coordinating between separate designers and contractors — one call, one contract.",
              },
              {
                title: "150+ Crew Members",
                body: "Our large, experienced crew means we can take on projects of any size — from a single front yard to a 1,000-unit HOA community — and complete them on schedule.",
              },
              {
                title: "Licensed, Bonded & Insured",
                body: "We hold an Oregon LCB license and carry full general liability and workers' compensation insurance. Your property and investment are protected.",
              },
              {
                title: "Climate-Specific Expertise",
                body: "Every plant we install, every irrigation system we design, and every hardscape we build is engineered for Bend's high-desert climate — not copied from a Pacific Northwest template.",
              },
              {
                title: "Free On-Site Estimates",
                body: "We visit your property, assess conditions, and provide a detailed written estimate at no charge. No pressure, no obligation.",
              },
            ].map((item) => (
              <div
                key={item.title}
                style={{
                  background: "#fff",
                  padding: "1.75rem",
                  boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
                }}
              >
                <h3
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 400,
                    color: "oklch(0.15 0.005 0)",
                    fontSize: "1rem",
                    marginBottom: "0.6rem",
                  }}
                >
                  {item.title}
                </h3>
                <p
                  style={{
                    color: "oklch(0.42 0.008 0)",
                    fontSize: "0.88rem",
                    lineHeight: 1.7,
                    fontWeight: 300,
                  }}
                >
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICE AREAS ── */}
      <section style={{ background: "oklch(1 0 0)", padding: "4rem 0" }}>
        <div
          style={{
            maxWidth: "860px",
            margin: "0 auto",
            padding: "0 1.5rem",
            textAlign: "center",
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-label)",
              fontSize: "0.65rem",
              letterSpacing: "0.18em",
              color: "oklch(0.46 0.20 25)",
              marginBottom: "0.75rem",
            }}
          >
            SERVICE AREA
          </p>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 300,
              color: "oklch(0.15 0.005 0)",
              fontSize: "clamp(1.4rem, 3vw, 2rem)",
              marginBottom: "1rem",
            }}
          >
            Landscape Installation Throughout Central Oregon
          </h2>
          <p
            style={{
              color: "oklch(0.38 0.008 0)",
              lineHeight: 1.8,
              fontWeight: 300,
              marginBottom: "2rem",
              fontSize: "1rem",
            }}
          >
            We install landscapes in Bend and all surrounding communities. Our crews travel
            throughout Central Oregon to serve residential and commercial clients.
          </p>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "0.75rem",
              justifyContent: "center",
              marginBottom: "2.5rem",
            }}
          >
            {[
              { label: "Bend", href: "/landscaping/bend" },
              { label: "Redmond", href: "/landscaping/redmond" },
              { label: "Sisters", href: "/landscaping/sisters" },
              { label: "Sunriver", href: "/landscaping/sunriver" },
              { label: "Tumalo", href: "/landscaping/tumalo" },
              { label: "La Pine", href: "/landscaping/la-pine" },
              { label: "Prineville", href: "/landscaping/prineville" },
              { label: "Madras", href: "/landscaping/madras" },
              { label: "Terrebonne", href: "/landscaping/terrebonne" },
              { label: "Powell Butte", href: "/landscaping/powell-butte" },
            ].map((area) => (
              <Link key={area.label} href={area.href}>
                <span
                  style={{
                    display: "inline-block",
                    border: "1px solid oklch(0.82 0.012 85)",
                    padding: "0.45rem 1rem",
                    fontFamily: "var(--font-label)",
                    fontSize: "0.62rem",
                    letterSpacing: "0.12em",
                    color: "oklch(0.38 0.008 0)",
                    cursor: "pointer",
                    textDecoration: "none",
                    transition: "background 0.15s",
                  }}
                  onMouseEnter={(e) =>
                    ((e.currentTarget as HTMLElement).style.background = "oklch(0.94 0.012 85)")
                  }
                  onMouseLeave={(e) =>
                    ((e.currentTarget as HTMLElement).style.background = "transparent")
                  }
                >
                  {area.label}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section style={{ background: "oklch(0.97 0.012 85)", padding: "4.5rem 0" }}>
        <div style={{ maxWidth: "860px", margin: "0 auto", padding: "0 1.5rem" }}>
          <p
            style={{
              fontFamily: "var(--font-label)",
              fontSize: "0.65rem",
              letterSpacing: "0.18em",
              color: "oklch(0.46 0.20 25)",
              marginBottom: "0.75rem",
              textAlign: "center",
            }}
          >
            FREQUENTLY ASKED QUESTIONS
          </p>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 300,
              color: "oklch(0.15 0.005 0)",
              fontSize: "clamp(1.5rem, 3vw, 2.2rem)",
              marginBottom: "2.5rem",
              textAlign: "center",
            }}
          >
            Landscape Installation FAQs — Bend, Oregon
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            {FAQS.map((faq) => (
              <div
                key={faq.q}
                style={{
                  background: "#fff",
                  padding: "1.75rem",
                  boxShadow: "0 1px 8px rgba(0,0,0,0.05)",
                }}
              >
                <h3
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 400,
                    color: "oklch(0.15 0.005 0)",
                    fontSize: "1rem",
                    marginBottom: "0.75rem",
                    lineHeight: 1.4,
                  }}
                >
                  {faq.q}
                </h3>
                <p
                  style={{
                    color: "oklch(0.42 0.008 0)",
                    fontSize: "0.9rem",
                    lineHeight: 1.75,
                    fontWeight: 300,
                  }}
                >
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section
        style={{
          background: "oklch(0.15 0.005 0)",
          padding: "5rem 0",
          textAlign: "center",
        }}
      >
        <div style={{ maxWidth: "700px", margin: "0 auto", padding: "0 1.5rem" }}>
          <p
            style={{
              fontFamily: "var(--font-label)",
              fontSize: "0.65rem",
              letterSpacing: "0.18em",
              color: "oklch(0.72 0.12 25)",
              marginBottom: "1rem",
            }}
          >
            READY TO GET STARTED?
          </p>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 300,
              color: "#fff",
              fontSize: "clamp(1.6rem, 3.5vw, 2.5rem)",
              marginBottom: "1.25rem",
              lineHeight: 1.2,
            }}
          >
            Request a Free Landscape Installation Estimate in Bend
          </h2>
          <p
            style={{
              color: "oklch(0.72 0.008 0)",
              fontWeight: 300,
              fontSize: "1rem",
              marginBottom: "2.25rem",
              lineHeight: 1.7,
            }}
          >
            Tell us about your project and we'll schedule a free on-site consultation. No pressure,
            no obligation — just an honest assessment and a detailed written estimate.
          </p>
          <div
            style={{
              display: "flex",
              gap: "1rem",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <Link href="/schedule-services">
              <span
                style={{
                  display: "inline-block",
                  background: "oklch(0.46 0.20 25)",
                  color: "#fff",
                  padding: "1rem 2.5rem",
                  fontFamily: "var(--font-label)",
                  fontSize: "0.7rem",
                  letterSpacing: "0.14em",
                  cursor: "pointer",
                  textDecoration: "none",
                }}
              >
                SCHEDULE A FREE ESTIMATE →
              </span>
            </Link>
            <a
              href="tel:5416041337"
              style={{
                display: "inline-block",
                border: "1px solid rgba(255,255,255,0.35)",
                color: "#fff",
                padding: "1rem 2.5rem",
                fontFamily: "var(--font-label)",
                fontSize: "0.7rem",
                letterSpacing: "0.14em",
                textDecoration: "none",
              }}
            >
              CALL (541) 604-1337
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
