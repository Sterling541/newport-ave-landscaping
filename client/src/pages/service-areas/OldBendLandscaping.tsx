import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Helmet } from "react-helmet-async";
import { Link } from "wouter";
import { CheckCircle2, Phone, MapPin, ChevronRight } from "lucide-react";

const ACCENT = "oklch(0.46 0.20 25)";
const ACCENT_LIGHT = "oklch(0.72 0.12 25)";
const DARK = "oklch(0.15 0.005 0)";
const MID = "oklch(0.38 0.008 0)";
const BG_WARM = "oklch(0.97 0.012 85)";
const BG_WHITE = "oklch(1 0 0)";

const neighborhoods = [
  {
    name: "Drake Park & Mirror Pond Area",
    description:
      "The neighborhoods immediately surrounding Drake Park and Mirror Pond represent some of the most coveted real estate in Bend. These properties benefit from the Deschutes River's moderating influence on the local microclimate, creating slightly more moisture and milder temperatures than the surrounding high desert. Mature trees, established gardens, and the park's natural beauty create a lush setting that rewards thoughtful landscape design.",
    highlights: [
      "Mature tree care, pruning, and preservation for established riverside properties",
      "Riparian-edge planting using native willows, alders, and moisture-tolerant perennials",
      "Irrigation system upgrades for older properties with aging infrastructure",
      "Paver walkway and entry improvements that complement historic home character",
    ],
    note: "Drake Park area clients often have mature trees that are 40–60 years old — we bring in a certified arborist for any significant pruning or removal work.",
  },
  {
    name: "Awbrey Butte Neighborhoods",
    description:
      "Awbrey Butte's elevated position west of downtown Bend offers sweeping views of the Cascade Range and the Bend cityscape. Properties here combine the prestige of panoramic views with the challenges of rocky volcanic terrain, steep slopes, and exposure to prevailing westerly winds. Landscape design on Awbrey Butte requires careful attention to slope stabilization, wind protection, and view preservation.",
    highlights: [
      "View-framing landscape design that highlights Cascade Range panoramas",
      "Slope stabilization and retaining wall installation for steep Awbrey terrain",
      "Windbreak design using native conifers and shrubs",
      "Drought-tolerant plant selection suited to Awbrey's exposed, rocky conditions",
    ],
    note: "Awbrey Butte properties often need engineered retaining walls — we work with structural engineers when wall heights require permits.",
  },
  {
    name: "Pill Hill & Historic Bend Bungalow Districts",
    description:
      "The historic bungalow districts of central Bend — including the Pill Hill area near St. Charles Medical Center — feature some of the city's oldest and most architecturally significant homes. These properties have established landscapes that often need thoughtful renovation rather than wholesale replacement, with an emphasis on preserving character while improving function and reducing maintenance.",
    highlights: [
      "Landscape renovation that respects and enhances historic home character",
      "Irrigation system replacement for 20–30-year-old systems common in this area",
      "Xeriscape conversion programs that reduce water use without sacrificing beauty",
      "Landscape lighting for safety, security, and curb appeal on historic properties",
    ],
    note: "Historic district properties sometimes have deed restrictions or neighborhood association guidelines — we research these before proposing any significant changes.",
  },
  {
    name: "Bend's NW & SW Established Residential Neighborhoods",
    description:
      "The established residential neighborhoods of northwest and southwest Bend — including the areas around Harmon Park, Juniper Ridge, and the older subdivisions west of 3rd Street — feature a mix of mid-century and 1980s–1990s homes with landscapes that are ready for modernization. These properties benefit from Bend's urban tree canopy and the relative shelter of their established neighborhood setting.",
    highlights: [
      "Mid-century landscape renovation with modern, water-efficient plant selections",
      "Smart irrigation controller upgrades for older in-ground systems",
      "Outdoor living space additions including patios, fire features, and pergolas",
      "Lawn care and seasonal maintenance programs for busy families",
    ],
    note: "NW/SW Bend clients frequently want to add outdoor living spaces — the mild summer climate makes patios and fire features a high-value investment in this part of the city.",
  },
];

const services = [
  { name: "Irrigation System Replacement & Upgrades", href: "/services/irrigation", desc: "Replace aging irrigation systems with modern, water-efficient designs. Smart controllers, drip conversion, and full system redesigns for older Bend properties." },
  { name: "Landscape Renovation & Replanting", href: "/services/landscape-design", desc: "Thoughtful renovation of established landscapes that honors existing character while improving function, reducing maintenance, and updating plant selections." },
  { name: "Paver Walkways & Entry Improvements", href: "/services/pavers", desc: "Concrete paver walkways, driveways, and entry improvements that complement the character of older Bend homes and improve curb appeal." },
  { name: "Xeriscape Conversion", href: "/services/xeriscaping", desc: "Convert water-intensive lawns to beautiful, drought-tolerant xeriscape designs that reduce water bills and maintenance while maintaining neighborhood character." },
  { name: "Outdoor Living Spaces & Fire Features", href: "/services/outdoor-living", desc: "Custom patios, fire pits, outdoor kitchens, and pergolas designed for Bend's mild summers and cool evenings." },
  { name: "Landscape Lighting", href: "/services/landscape-lighting", desc: "LED landscape lighting for safety, security, and curb appeal — especially valuable for older Bend properties with mature trees and established gardens." },
];

const faqs = [
  {
    q: "Do you work in Old Bend and historic Bend neighborhoods?",
    a: "Yes — we serve all of Bend including the historic central neighborhoods, Drake Park area, Awbrey Butte, Pill Hill, and the established residential districts of NW and SW Bend. We are familiar with the unique landscape characteristics and challenges of older Bend properties, including mature tree care, aging irrigation systems, and historic home character.",
  },
  {
    q: "Can you replace an old irrigation system in Old Bend?",
    a: "Yes — irrigation system replacement is one of our most common projects in older Bend neighborhoods. Many central Bend properties have irrigation systems that are 20–30 years old and in need of replacement or significant repair. We can replace aging systems with modern, water-efficient designs featuring smart controllers, drip conversion, and improved coverage — typically reducing water use by 30–50% compared to older systems.",
  },
  {
    q: "How much does landscaping cost in Old Bend?",
    a: "Landscaping costs in Old Bend vary significantly by project scope. Lawn care maintenance starts at $97 per service. Irrigation system replacement for a typical residential property runs $4,000–$12,000 depending on system size and complexity. Xeriscape conversions range from $8,000–$25,000 for a typical front yard. Full landscape renovation projects range from $15,000 to $80,000+. We provide free, detailed written estimates after a site visit — contact us to schedule.",
  },
  {
    q: "Do you work on properties with mature trees in Old Bend?",
    a: "Yes — mature tree care is a specialty for our Old Bend work. We provide pruning, health assessment, and preservation services for established trees, and we bring in a certified arborist for any significant pruning or removal work. Many central Bend properties have trees that are 40–60 years old, and preserving these trees while updating the surrounding landscape is a priority for most of our Old Bend clients.",
  },
  {
    q: "Can you help with xeriscape conversion in Old Bend?",
    a: "Absolutely — xeriscape conversion is one of the most popular projects in Old Bend's established neighborhoods. We design beautiful, low-maintenance xeriscape landscapes that replace water-intensive lawns with drought-tolerant plants, efficient drip irrigation, and attractive hardscaping. A well-designed xeriscape can reduce outdoor water use by 50–70% while actually improving the visual appeal of your property.",
  },
  {
    q: "Do you serve the Drake Park and Mirror Pond area?",
    a: "Yes — we regularly work on properties near Drake Park and Mirror Pond. These properties have some of the most beautiful settings in Bend, and we specialize in landscape designs that complement the park's natural character while creating functional, beautiful outdoor spaces for the homeowner. We are experienced with the riparian planting conditions near the Deschutes River corridor.",
  },
];

export default function OldBendLandscaping() {
  const schemaFAQ = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const schemaBreadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://newportavelandscaping.com/" },
      { "@type": "ListItem", position: 2, name: "Service Areas", item: "https://newportavelandscaping.com/service-areas" },
      { "@type": "ListItem", position: 3, name: "Old Bend Landscaping", item: "https://newportavelandscaping.com/service-areas/old-bend-landscaping" },
    ],
  };

  return (
    <div id="main-content" style={{ backgroundColor: BG_WARM }}>
      <Helmet>
        <title>Landscaping in Old Bend, Oregon | Historic Neighborhoods | Newport Avenue Landscaping</title>
        <meta name="description" content="Expert landscaping, irrigation replacement, and xeriscape services for Old Bend's historic neighborhoods — Drake Park, Awbrey Butte, Pill Hill, and NW/SW Bend. Newport Avenue Landscaping. LCB #9153. Free estimates." />
        <link rel="canonical" href="https://newportavelandscaping.com/service-areas/old-bend-landscaping" />
        <script type="application/ld+json">{JSON.stringify(schemaFAQ)}</script>
        <script type="application/ld+json">{JSON.stringify(schemaBreadcrumb)}</script>
      </Helmet>
      <Navbar />

      {/* ── Hero ── */}
      <section
        style={{
          background: `linear-gradient(rgba(0,0,0,0.58), rgba(0,0,0,0.58)), url(/manus-storage/se-bend-renovation-01_487ce10e.jpg) center/cover no-repeat`,
          padding: "5rem 0 3.5rem",
          marginTop: "204px",
        }}
      >
        <div style={{ maxWidth: "900px", margin: "0 auto", padding: "0 1.5rem" }}>
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" style={{ marginBottom: "1.5rem", display: "flex", alignItems: "center", gap: "0.4rem" }}>
            <Link href="/" style={{ color: ACCENT_LIGHT, textDecoration: "none", fontFamily: "var(--font-label)", fontSize: "0.65rem", letterSpacing: "0.08em" }}>Home</Link>
            <ChevronRight size={10} color={ACCENT_LIGHT} />
            <span style={{ color: ACCENT_LIGHT, fontFamily: "var(--font-label)", fontSize: "0.65rem", letterSpacing: "0.08em" }}>Service Areas</span>
            <ChevronRight size={10} color={ACCENT_LIGHT} />
            <span style={{ color: "oklch(0.75 0.008 0)", fontFamily: "var(--font-label)", fontSize: "0.65rem", letterSpacing: "0.08em" }}>Old Bend Landscaping</span>
          </nav>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.75rem" }}>
            <MapPin size={14} color={ACCENT_LIGHT} />
            <span style={{ color: ACCENT_LIGHT, fontFamily: "var(--font-label)", fontSize: "0.65rem", letterSpacing: "0.12em" }}>BEND, OREGON · CENTRAL OREGON</span>
          </div>
          <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 300, color: "#fff", fontSize: "clamp(1.8rem, 4vw, 3rem)", lineHeight: 1.1, marginBottom: "1rem" }}>
            Landscaping Services in Old Bend, Oregon
          </h1>
          <p style={{ color: "oklch(0.88 0.03 85)", fontWeight: 300, fontSize: "1.05rem", maxWidth: "680px", lineHeight: 1.75 }}>
            Old Bend's historic neighborhoods — Drake Park, Awbrey Butte, Pill Hill, and the established residential districts of central Bend — have a character and charm that deserves thoughtful, context-sensitive landscaping. Newport Avenue Landscaping has worked throughout Old Bend for over 21 years.
          </p>
          <div style={{ display: "flex", gap: "1rem", marginTop: "2rem", flexWrap: "wrap" }}>
            <a href="tel:+15416178873" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", background: ACCENT, color: "#fff", padding: "0.75rem 1.75rem", fontFamily: "var(--font-label)", fontSize: "0.72rem", letterSpacing: "0.1em", textDecoration: "none", fontWeight: 700 }}>
              <Phone size={13} /> CALL (541) 617-8873
            </a>
            <Link href="/contact" style={{ display: "inline-block", background: "transparent", border: "1px solid rgba(255,255,255,0.5)", color: "#fff", padding: "0.75rem 1.75rem", fontFamily: "var(--font-label)", fontSize: "0.72rem", letterSpacing: "0.1em", textDecoration: "none" }}>
              FREE ESTIMATE
            </Link>
          </div>
        </div>
      </section>

      {/* ── Intro ── */}
      <section style={{ background: BG_WHITE, padding: "3.5rem 0" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto", padding: "0 1.5rem" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3rem", alignItems: "start" }}>
            <div>
              <div style={{ fontFamily: "var(--font-label)", color: ACCENT, fontSize: "0.62rem", letterSpacing: "0.14em", marginBottom: "0.75rem" }}>SERVING HISTORIC BEND SINCE 2005</div>
              <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 300, color: DARK, fontSize: "clamp(1.4rem, 2.5vw, 2rem)", marginBottom: "1.2rem", lineHeight: 1.2 }}>
                Landscaping That Honors Old Bend's Character
              </h2>
              <p style={{ color: MID, lineHeight: 1.8, fontWeight: 300, marginBottom: "1rem" }}>
                Old Bend's established neighborhoods feature a mix of historic bungalows, craftsman homes, mid-century properties, and mature landscapes that have been growing for decades. Updating these landscapes requires sensitivity to the neighborhood's character while improving function, reducing maintenance, and incorporating modern water-efficient plants and irrigation.
              </p>
              <p style={{ color: MID, lineHeight: 1.8, fontWeight: 300 }}>
                We specialize in landscape renovations that honor the character of older Bend properties — preserving mature trees, respecting historic home architecture, and designing with plants and materials that feel at home in central Bend's established streetscapes.
              </p>
            </div>
            <div>
              <div style={{ background: BG_WARM, padding: "1.75rem", borderLeft: `3px solid ${ACCENT}` }}>
                <div style={{ fontFamily: "var(--font-label)", color: ACCENT, fontSize: "0.62rem", letterSpacing: "0.14em", marginBottom: "1rem" }}>WHY OLD BEND CLIENTS CHOOSE US</div>
                {[
                  "Over 21 years serving Bend's historic neighborhoods",
                  "Licensed, bonded & insured — LCB #9153",
                  "150+ in-house crew — no subcontractors, ever",
                  "Certified arborist available for mature tree work",
                  "Free, detailed written estimates within 24–48 hours",
                  "Industry-standard plant & irrigation warranties",
                ].map((item, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "0.6rem", marginBottom: "0.7rem" }}>
                    <CheckCircle2 size={14} color={ACCENT} style={{ flexShrink: 0, marginTop: "0.15rem" }} />
                    <span style={{ color: MID, fontSize: "0.9rem", fontWeight: 300, lineHeight: 1.5 }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Neighborhood Sections ── */}
      <section style={{ background: BG_WARM, padding: "3.5rem 0" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto", padding: "0 1.5rem" }}>
          <div style={{ fontFamily: "var(--font-label)", color: ACCENT, fontSize: "0.62rem", letterSpacing: "0.14em", marginBottom: "0.75rem" }}>OLD BEND NEIGHBORHOODS WE SERVE</div>
          <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 300, color: DARK, fontSize: "clamp(1.4rem, 2.5vw, 2rem)", marginBottom: "2.5rem", lineHeight: 1.2 }}>
            Neighborhood-Specific Landscaping Expertise
          </h2>
          <div style={{ display: "grid", gap: "2rem" }}>
            {neighborhoods.map((n, i) => (
              <div key={i} style={{ background: BG_WHITE, padding: "2rem", borderLeft: `3px solid ${ACCENT}` }}>
                <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 400, color: DARK, fontSize: "1.15rem", marginBottom: "0.75rem" }}>{n.name}</h3>
                <p style={{ color: MID, lineHeight: 1.8, fontWeight: 300, marginBottom: "1rem" }}>{n.description}</p>
                <ul style={{ listStyle: "none", padding: 0, margin: "0 0 1rem" }}>
                  {n.highlights.map((h, j) => (
                    <li key={j} style={{ display: "flex", alignItems: "flex-start", gap: "0.5rem", marginBottom: "0.45rem" }}>
                      <ChevronRight size={12} color={ACCENT} style={{ flexShrink: 0, marginTop: "0.25rem" }} />
                      <span style={{ color: MID, fontSize: "0.9rem", fontWeight: 300 }}>{h}</span>
                    </li>
                  ))}
                </ul>
                {n.note && (
                  <p style={{ color: "oklch(0.48 0.008 0)", fontSize: "0.85rem", fontStyle: "italic", fontWeight: 300, borderTop: `1px solid oklch(0.90 0.008 0)`, paddingTop: "0.75rem", margin: 0 }}>
                    {n.note}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Services ── */}
      <section style={{ background: BG_WHITE, padding: "3.5rem 0" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto", padding: "0 1.5rem" }}>
          <div style={{ fontFamily: "var(--font-label)", color: ACCENT, fontSize: "0.62rem", letterSpacing: "0.14em", marginBottom: "0.75rem" }}>WHAT WE DO IN OLD BEND</div>
          <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 300, color: DARK, fontSize: "clamp(1.4rem, 2.5vw, 2rem)", marginBottom: "2rem", lineHeight: 1.2 }}>
            Common Projects in Old Bend's Historic Neighborhoods
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "1.25rem" }}>
            {services.map((s, i) => (
              <Link key={i} href={s.href} style={{ display: "block", padding: "1.5rem", background: BG_WARM, borderLeft: `3px solid ${ACCENT}`, textDecoration: "none" }}>
                <div style={{ fontFamily: "var(--font-display)", fontWeight: 500, color: DARK, fontSize: "0.95rem", marginBottom: "0.5rem" }}>{s.name}</div>
                <p style={{ color: MID, fontSize: "0.85rem", fontWeight: 300, lineHeight: 1.6, margin: 0 }}>{s.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQs ── */}
      <section style={{ background: BG_WARM, padding: "3.5rem 0" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto", padding: "0 1.5rem" }}>
          <div style={{ fontFamily: "var(--font-label)", color: ACCENT, fontSize: "0.62rem", letterSpacing: "0.14em", marginBottom: "0.75rem" }}>FREQUENTLY ASKED QUESTIONS</div>
          <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 300, color: DARK, fontSize: "clamp(1.4rem, 2.5vw, 2rem)", marginBottom: "2rem", lineHeight: 1.2 }}>
            Old Bend Landscaping Questions
          </h2>
          <div style={{ display: "grid", gap: "1.25rem" }}>
            {faqs.map((f, i) => (
              <div key={i} style={{ background: BG_WHITE, padding: "1.5rem 1.75rem", borderLeft: `3px solid ${ACCENT}` }}>
                <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 500, color: DARK, fontSize: "1rem", marginBottom: "0.6rem" }}>{f.q}</h3>
                <p style={{ color: MID, lineHeight: 1.8, fontWeight: 300, margin: 0 }}>{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ background: ACCENT, padding: "4rem 0", textAlign: "center" }}>
        <div style={{ maxWidth: "700px", margin: "0 auto", padding: "0 1.5rem" }}>
          <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 300, color: "#fff", fontSize: "clamp(1.6rem, 3vw, 2.4rem)", marginBottom: "1rem" }}>
            Ready to Transform Your Old Bend Property?
          </h2>
          <p style={{ color: "oklch(0.92 0.05 25)", marginBottom: "2rem", fontWeight: 300, lineHeight: 1.7 }}>
            Call us at <a href="tel:+15416178873" style={{ color: "#fff", fontWeight: 600 }}>(541) 617-8873</a> or request a free quote online. We respond within 24–48 hours and offer free, detailed written estimates for all Old Bend projects.
          </p>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/contact" style={{ display: "inline-block", background: "#fff", color: ACCENT, padding: "0.85rem 2.2rem", fontFamily: "var(--font-label)", fontSize: "0.75rem", letterSpacing: "0.1em", textDecoration: "none", fontWeight: 700 }}>
              GET A FREE QUOTE
            </Link>
            <a href="tel:+15416178873" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", background: "transparent", border: "1px solid rgba(255,255,255,0.5)", color: "#fff", padding: "0.85rem 2.2rem", fontFamily: "var(--font-label)", fontSize: "0.75rem", letterSpacing: "0.1em", textDecoration: "none" }}>
              <Phone size={13} /> (541) 617-8873
            </a>
          </div>
        </div>
      </section>

      {/* ── Related Resources ── */}
      <section style={{ background: "oklch(0.12 0.005 0)", padding: "2.5rem 0" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto", padding: "0 1.5rem" }}>
          <div style={{ fontFamily: "var(--font-label)", color: ACCENT_LIGHT, fontSize: "0.62rem", marginBottom: "1rem", letterSpacing: "0.1em" }}>RELATED RESOURCES</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: "0.75rem" }}>
            {[
              { label: "Sprinkler System Cost Guide", href: "/resources/sprinkler-system-cost-bend-oregon" },
              { label: "Xeriscape Cost Guide", href: "/resources/xeriscape-cost-bend-oregon" },
              { label: "Bend Landscaping", href: "/landscaping/bend" },
              { label: "Awbrey Butte Landscaping", href: "/service-areas/awbrey-butte-landscaping" },
            ].map((r, i) => (
              <Link key={i} href={r.href} style={{ display: "block", padding: "1rem 1.25rem", background: "oklch(0.22 0.005 0)", borderLeft: `3px solid ${ACCENT}`, textDecoration: "none", color: "#fff", fontWeight: 500, fontSize: "0.88rem" }}>
                {r.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
