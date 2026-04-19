/* ============================================================
   BEND NEIGHBORHOODS HUB PAGE
   ============================================================ */
import { Link } from "wouter";
import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingCTA from "@/components/FloatingCTA";
import ContactSection from "@/components/ContactSection";
import { BreadcrumbSchema } from "@/components/SchemaMarkup";

const DOMAIN = "https://newportavelandscaping.com";

type NeighborhoodItem = { label: string; href: string; desc: string };
type NeighborhoodSection = { section: string; color: string; items: NeighborhoodItem[] };

const neighborhoods: NeighborhoodSection[] = [
  {
    section: "West Side & Northwest",
    color: "oklch(0.46 0.20 25)",
    items: [
      { label: "NorthWest Crossing", href: "/service-areas/northwest-crossing-landscaping", desc: "Newer homes, HOA-friendly designs, and lush front yards in NW Crossing." },
      { label: "Summit West", href: "/service-areas/summit-west-landscaping", desc: "Elevated lots with mountain views and high-desert landscaping needs." },
      { label: "Awbrey Butte", href: "/service-areas/awbrey-butte-landscaping", desc: "Upscale estates with dramatic terrain, rock gardens, and fire features." },
      { label: "Bend Westside", href: "/service-areas/bend-westside-landscaping", desc: "Established neighborhoods with mature trees and irrigation upgrades." },
      { label: "Shevlin Meadows", href: "/service-areas/shevlin-meadows-landscaping", desc: "Quiet residential streets near Shevlin Park with low-water landscaping." },
      { label: "Shevlin Park Area", href: "/service-areas/shevlin-park-area-landscaping", desc: "Properties bordering Shevlin Park with natural, wildlife-friendly designs." },
      { label: "Hunnell Road Area", href: "/service-areas/hunnell-road-area-landscaping", desc: "Rural-residential properties along Hunnell Road with acreage landscaping." },
    ],
  },
  {
    section: "South & Southeast",
    color: "oklch(0.38 0.16 155)",
    items: [
      { label: "Brookswood", href: "/service-areas/brookswood-landscaping", desc: "Family-friendly south Bend neighborhood with large lots and lawn care." },
      { label: "Discovery West", href: "/service-areas/discovery-west-landscaping", desc: "Master-planned community with xeriscape-forward design requirements." },
      { label: "Bend South", href: "/service-areas/bend-south-landscaping", desc: "South Bend properties near Sunriver Road with irrigation and lawn service." },
      { label: "Southeast Bend", href: "/service-areas/southeast-bend-landscaping", desc: "Growing southeast corridor with new construction and landscape installs." },
      { label: "Lava Butte Area", href: "/service-areas/lava-butte-area-landscaping", desc: "Volcanic soil challenges met with expert soil prep and native plantings." },
      { label: "Murphy Road Area", href: "/service-areas/murphy-road-area-landscaping", desc: "Semi-rural south Bend with acreage maintenance and irrigation systems." },
    ],
  },
  {
    section: "East Side & Northeast",
    color: "oklch(0.42 0.18 240)",
    items: [
      { label: "Bend East Side", href: "/service-areas/bend-east-side-landscaping", desc: "Affordable neighborhoods east of 3rd St with full-service lawn care." },
      { label: "Northeast Bend", href: "/service-areas/northeast-bend-landscaping", desc: "Rapidly growing NE Bend with new builds and irrigation installs." },
      { label: "Larkspur", href: "/service-areas/larkspur-landscaping", desc: "Established east-side neighborhood with mature landscape maintenance." },
      { label: "Orion Greens", href: "/service-areas/orion-greens-landscaping", desc: "Newer subdivision with fresh installs, sod, and drip irrigation." },
      { label: "Skyline Ranch", href: "/service-areas/skyline-ranch-landscaping", desc: "Large-lot properties with open space and natural landscape integration." },
    ],
  },
  {
    section: "Central Bend & Historic Districts",
    color: "oklch(0.50 0.14 50)",
    items: [
      { label: "Old Bend", href: "/service-areas/old-bend-landscaping-oregon", desc: "Historic Bend with character homes, mature trees, and classic lawn care." },
      { label: "Old Mill District", href: "/service-areas/old-mill-district-landscaping", desc: "Commercial and residential landscaping near the Old Mill retail district." },
      { label: "River West", href: "/service-areas/river-west-landscaping", desc: "Riverfront properties along the Deschutes with riparian-friendly designs." },
      { label: "Deschutes River Woods", href: "/service-areas/deschutes-river-woods-landscaping", desc: "Wooded lots along the river with natural design, irrigation, and maintenance." },
    ],
  },
  {
    section: "Gated Communities & Golf Course Properties",
    color: "oklch(0.35 0.12 300)",
    items: [
      { label: "Tetherow", href: "/service-areas/tetherow-landscaping", desc: "Luxury resort community with high-end landscape design and maintenance." },
      { label: "Broken Top", href: "/service-areas/broken-top-landscaping", desc: "Gated golf community with HOA standards and premium landscape care." },
      { label: "Bend Country Club", href: "/service-areas/bend-country-club-landscaping", desc: "Golf course-adjacent properties with manicured lawn and irrigation service." },
      { label: "Woodriver Village", href: "/service-areas/woodriver-village-landscaping", desc: "Upscale community near the Deschutes with custom landscape installs." },
    ],
  },
  {
    section: "Corridors & Rural Fringe",
    color: "oklch(0.44 0.16 100)",
    items: [
      { label: "Century Drive Corridor", href: "/service-areas/century-drive-corridor-landscaping", desc: "Properties along Century Drive with mountain-view lots and xeriscape." },
    ],
  },
];

export default function BendNeighborhoods() {
  const totalNeighborhoods = neighborhoods.reduce((sum, s) => sum + s.items.length, 0);

  return (
    <div className="min-h-screen" style={{ backgroundColor: "oklch(1 0 0)" }}>
      <Helmet>
        <title>Landscaping by Bend Neighborhood | Newport Avenue Landscaping</title>
        <meta
          name="description"
          content={`Newport Avenue Landscaping serves all ${totalNeighborhoods}+ Bend, Oregon neighborhoods. Find your neighborhood and get a free estimate.`}
        />
        <link rel="canonical" href={`${DOMAIN}/bend-neighborhoods`} />
        <meta property="og:title" content="Landscaping by Bend Neighborhood | Newport Avenue Landscaping" />
        <meta property="og:description" content="We serve every Bend neighborhood from Awbrey Butte and NW Crossing to Tetherow and Brookswood. Local landscaping experts since 2003." />
        <meta property="og:url" content={`${DOMAIN}/bend-neighborhoods`} />
        <meta property="og:type" content="website" />
      </Helmet>

      <BreadcrumbSchema
        items={[
          { name: "Home", url: "/" },
          { name: "Service Areas", url: "/service-areas" },
          { name: "Bend Neighborhoods", url: "/bend-neighborhoods" },
        ]}
      />

      <Navbar />

      {/* ── Hero ── */}
      <section
        className="pt-32 pb-20"
        style={{ background: `linear-gradient(rgba(0,0,0,0.65), rgba(0,0,0,0.65)), url(https://d2xsxph8kpxj0f.cloudfront.net/310519663503028182/g3pw3MRUapabcDUbhBEFxx/awbrey-butte-loop-02_77381709.jpg) center/cover no-repeat`, marginTop: "204px" }}
      >
        <div className="container">
          <nav className="mb-8 flex items-center gap-2" style={{ fontSize: "0.72rem" }}>
            <Link href="/" style={{ color: "oklch(0.72 0.12 25)", textDecoration: "none" }}>Home</Link>
            <span style={{ color: "oklch(0.50 0.008 30)" }}>/</span>
            <Link href="/service-areas" style={{ color: "oklch(0.72 0.12 25)", textDecoration: "none" }}>Service Areas</Link>
            <span style={{ color: "oklch(0.50 0.008 30)" }}>/</span>
            <span style={{ color: "oklch(0.85 0.05 25)" }}>Bend Neighborhoods</span>
          </nav>
          <div
            className="font-label mb-4"
            style={{ color: "oklch(0.72 0.12 25)", fontSize: "0.62rem", letterSpacing: "0.14em" }}
          >
            LOCAL LANDSCAPING EXPERTS &middot; BEND, OREGON
          </div>
          <h1
            className="font-display font-light mb-6"
            style={{ color: "oklch(0.96 0.02 25)", fontSize: "clamp(2rem, 5vw, 3.5rem)", lineHeight: 1.1, maxWidth: "700px" }}
          >
            We Know Every Corner of Bend
          </h1>
          <p
            className="font-body mb-10"
            style={{ color: "oklch(0.72 0.012 30)", fontSize: "clamp(1rem, 1.5vw, 1.15rem)", maxWidth: "600px", lineHeight: 1.7 }}
          >
            From the gated estates of Tetherow to the family yards of Brookswood, Newport Avenue
            Landscaping has been the trusted name in Bend landscaping since 2003. Find your
            neighborhood below and see how we can help.
          </p>
          <div className="flex flex-wrap gap-8">
            {[
              { value: `${totalNeighborhoods}+`, label: "Bend Neighborhoods Served" },
              { value: "21+", label: "Years in Business" },
              { value: "4.9★", label: "Google Rating" },
              { value: "Free", label: "Estimates" },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="font-display font-light" style={{ color: "oklch(0.72 0.12 25)", fontSize: "1.8rem" }}>
                  {stat.value}
                </div>
                <div className="font-label" style={{ color: "oklch(0.55 0.008 30)", fontSize: "0.62rem", letterSpacing: "0.1em" }}>
                  {stat.label.toUpperCase()}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Intro ── */}
      <section className="py-16" style={{ backgroundColor: "oklch(0.97 0.012 85)" }}>
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div>
              <div className="font-label mb-2" style={{ color: "oklch(0.46 0.20 25)", fontSize: "0.62rem", letterSpacing: "0.14em" }}>
                WHY NEIGHBORHOOD MATTERS
              </div>
              <h2 className="font-display font-light mb-5" style={{ color: "oklch(0.15 0.005 0)", fontSize: "clamp(1.4rem, 2.5vw, 2rem)" }}>
                Landscaping That Fits Your Street
              </h2>
              <p className="font-body mb-4" style={{ color: "oklch(0.35 0.008 30)", fontSize: "0.95rem", lineHeight: 1.8 }}>
                Every Bend neighborhood has its own soil conditions, HOA requirements, sun exposure,
                and aesthetic character. The volcanic pumice soils of Awbrey Butte require completely
                different drainage solutions than the clay-heavy lots in Brookswood. The xeriscape
                mandates in Discovery West differ from the lush lawn expectations in Tetherow.
              </p>
              <p className="font-body" style={{ color: "oklch(0.35 0.008 30)", fontSize: "0.95rem", lineHeight: 1.8 }}>
                We have worked in every corner of Bend for over two decades. That means we arrive
                already knowing your irrigation zone, your HOA color palette restrictions, and which
                plants thrive on your specific microclimate.
              </p>
            </div>
            <div>
              <div className="font-label mb-2" style={{ color: "oklch(0.46 0.20 25)", fontSize: "0.62rem", letterSpacing: "0.14em" }}>
                SERVICES IN ALL NEIGHBORHOODS
              </div>
              <h2 className="font-display font-light mb-5" style={{ color: "oklch(0.15 0.005 0)", fontSize: "clamp(1.4rem, 2.5vw, 2rem)" }}>
                Full-Service Landscaping, Everywhere in Bend
              </h2>
              <div className="grid grid-cols-2 gap-2">
                {[
                  "Landscape Design & Install", "Sprinkler Systems",
                  "Irrigation Repair ($140/hr)", "Sprinkler Blowouts",
                  "Spring Activation", "Backflow Testing",
                  "Paver Patios & Walkways", "Lawn Care & Maintenance",
                  "Xeriscape & Low-Water", "Aeration & Overseeding",
                  "Outdoor Lighting", "Snow Removal",
                ].map((service) => (
                  <div key={service} className="font-body flex items-center gap-2" style={{ color: "oklch(0.30 0.008 30)", fontSize: "0.82rem" }}>
                    <span style={{ color: "oklch(0.46 0.20 25)", fontWeight: 700 }}>&#10003;</span>
                    {service}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Neighborhood Sections ── */}
      {neighborhoods.map((section, si) => (
        <section
          key={section.section}
          className="py-16"
          style={{ backgroundColor: si % 2 === 0 ? "oklch(1 0 0)" : "oklch(0.97 0.012 85)" }}
        >
          <div className="container">
            <div className="font-label mb-2" style={{ color: section.color, fontSize: "0.62rem", letterSpacing: "0.14em" }}>
              BEND NEIGHBORHOODS
            </div>
            <h2
              className="font-display font-light mb-8"
              style={{ color: "oklch(0.15 0.005 0)", fontSize: "clamp(1.4rem, 2.5vw, 2rem)" }}
            >
              {section.section}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {section.items.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  style={{
                    display: "block",
                    padding: "1.4rem 1.6rem",
                    backgroundColor: "oklch(1 0 0)",
                    borderLeft: `3px solid ${section.color}`,
                    textDecoration: "none",
                    boxShadow: "0 1px 4px oklch(0.18 0.008 30 / 0.07)",
                    transition: "box-shadow 0.2s ease, transform 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 6px 24px oklch(0.18 0.008 30 / 0.14)";
                    (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-2px)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 1px 4px oklch(0.18 0.008 30 / 0.07)";
                    (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(0)";
                  }}
                >
                  <div className="font-body mb-1" style={{ color: "oklch(0.18 0.008 30)", fontWeight: 700, fontSize: "0.95rem" }}>
                    {item.label}
                  </div>
                  <div className="font-body mb-3" style={{ color: "oklch(0.48 0.008 30)", fontSize: "0.80rem", lineHeight: 1.55 }}>
                    {item.desc}
                  </div>
                  <div className="font-label" style={{ color: section.color, fontSize: "0.60rem", letterSpacing: "0.1em" }}>
                    VIEW LOCAL SERVICES &rarr;
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* ── Other Cities ── */}
      <section className="py-14" style={{ backgroundColor: "oklch(0.15 0.005 0)" }}>
        <div className="container">
          <div className="font-label mb-2" style={{ color: "oklch(0.72 0.12 25)", fontSize: "0.62rem", letterSpacing: "0.14em" }}>
            BEYOND BEND
          </div>
          <h2 className="font-display font-light mb-6" style={{ color: "oklch(0.92 0.02 25)", fontSize: "clamp(1.2rem, 2vw, 1.6rem)" }}>
            We Also Serve All of Central Oregon
          </h2>
          <div className="flex flex-wrap gap-3">
            {[
              { label: "Redmond", href: "/service-areas/redmond" },
              { label: "Sisters", href: "/service-areas/sisters" },
              { label: "Sunriver", href: "/service-areas/sunriver" },
              { label: "La Pine", href: "/service-areas/la-pine" },
              { label: "Tumalo", href: "/service-areas/tumalo" },
              { label: "Terrebonne", href: "/service-areas/terrebonne" },
              { label: "Madras", href: "/service-areas/madras" },
              { label: "Prineville", href: "/service-areas/prineville" },
              { label: "Crooked River Ranch", href: "/service-areas/crooked-river-ranch" },
              { label: "Culver", href: "/service-areas/culver" },
              { label: "All Service Areas", href: "/service-areas" },
            ].map((city) => (
              <Link
                key={city.href}
                href={city.href}
                className="font-label px-4 py-2 transition-opacity hover:opacity-75"
                style={{
                  backgroundColor: "oklch(0.25 0.005 0)",
                  color: "oklch(0.85 0.05 25)",
                  fontSize: "0.68rem",
                  letterSpacing: "0.08em",
                  textDecoration: "none",
                  borderRadius: "0.15rem",
                }}
              >
                {city.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-16" style={{ backgroundColor: "oklch(0.97 0.012 85)" }}>
        <div className="container max-w-3xl">
          <div className="font-label mb-2" style={{ color: "oklch(0.46 0.20 25)", fontSize: "0.62rem", letterSpacing: "0.14em" }}>
            FREQUENTLY ASKED
          </div>
          <h2 className="font-display font-light mb-8" style={{ color: "oklch(0.15 0.005 0)", fontSize: "clamp(1.4rem, 2.5vw, 2rem)" }}>
            Questions About Bend Neighborhood Landscaping
          </h2>
          <div className="space-y-6">
            {[
              {
                q: "Do you serve my specific Bend neighborhood?",
                a: "Yes — we serve every neighborhood in Bend, from Awbrey Butte and NorthWest Crossing to Brookswood, Tetherow, and everything in between. If you don't see your neighborhood listed, call us at (541) 617-8873 and we'll confirm coverage.",
              },
              {
                q: "Do you know the HOA landscaping requirements for my community?",
                a: "We work extensively in Bend's HOA communities including Tetherow, Broken Top, NorthWest Crossing, and Discovery West. We're familiar with common HOA plant palettes, irrigation requirements, and approval processes.",
              },
              {
                q: "What's different about landscaping in Bend vs. other Oregon cities?",
                a: "Bend's high-desert climate, volcanic soils, and extreme temperature swings require specialized knowledge. We use drought-tolerant plants, deep-root irrigation systems, and frost-resistant hardscaping materials suited to Central Oregon.",
              },
              {
                q: "How much does landscaping cost in Bend?",
                a: "Irrigation repair and service work is billed at $140/tech hour. Full landscape design and installation projects typically range from $5,000 to $50,000+ depending on lot size and scope. We provide free estimates for all projects.",
              },
              {
                q: "Do you offer maintenance plans for Bend homeowners?",
                a: "Yes — we offer seasonal maintenance plans including spring activation, summer lawn care, fall cleanup, and winter blowouts. Many Bend homeowners bundle these services for significant savings.",
              },
            ].map((faq) => (
              <div key={faq.q} style={{ borderLeft: "3px solid oklch(0.46 0.20 25)", paddingLeft: "1.25rem" }}>
                <h3 className="font-body mb-2" style={{ color: "oklch(0.18 0.008 30)", fontWeight: 700, fontSize: "0.95rem" }}>
                  {faq.q}
                </h3>
                <p className="font-body" style={{ color: "oklch(0.40 0.008 30)", fontSize: "0.88rem", lineHeight: 1.75 }}>
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ContactSection />
      <Footer />
      <FloatingCTA />
    </div>
  );
}
