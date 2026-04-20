/* ============================================================
   SUB-PAGE — Modern Landscape Design Bend Oregon
   Target keyword: "modern landscape design Bend Oregon"
   ============================================================ */
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Helmet } from "react-helmet-async";
import { Link } from "wouter";

const HERO_IMG = "/manus-storage/brokentop-xeriscape-01_064e5008.jpg";

const ELEMENTS = [
  { title: "Clean Lines & Geometry", desc: "Rectangular patios, linear planting beds, and structured hardscape that complement Bend's modern architecture." },
  { title: "Native & Adaptive Plants", desc: "Low-water native grasses, ornamental grasses, and drought-tolerant perennials that thrive in Bend's climate." },
  { title: "Natural Stone & Basalt", desc: "Local basalt boulders, flagstone, and crushed rock mulch that connect the design to Central Oregon's landscape." },
  { title: "Architectural Lighting", desc: "Integrated LED landscape lighting that highlights architectural features and extends outdoor living into the evening." },
  { title: "Minimalist Water Features", desc: "Sleek pondless waterfalls, basalt column fountains, and recirculating streams for modern outdoor spaces." },
  { title: "Outdoor Living Integration", desc: "Modern fire pits, pergolas, and outdoor kitchens designed as architectural extensions of the home." },
];

const FAQS = [
  { q: "What is modern landscape design in Bend?", a: "Modern landscape design in Bend emphasizes clean lines, low-water plant palettes, natural materials (basalt, flagstone, native grasses), and architectural integration with the home. It avoids overly formal or fussy designs in favor of restrained, intentional compositions that complement Bend's high-desert setting." },
  { q: "What plants work in modern Bend landscapes?", a: "Popular plants for modern Bend landscapes include Blue Oat Grass, Karl Foerster Feather Reed Grass, Russian Sage, Lavender, Penstemon, Agastache, Desert Willow, and Serviceberry. These plants are drought-tolerant, low-maintenance, and provide year-round interest in Bend's Zone 6b climate." },
  { q: "How much does modern landscape design cost in Bend?", a: "Modern landscape design and installation in Bend typically ranges from $15,000–$60,000+ for a full residential project, depending on property size, hardscape complexity, and plant selection. Design fees range from $800–$3,000 and are often applied toward the installation cost. Prices shown are typical market ranges for planning purposes only and are not a binding quote. Contact us for a free consultation." },
];

const SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Modern Landscape Design — Bend, Oregon",
  "provider": {
    "@type": "LocalBusiness",
    "name": "Newport Avenue Landscaping",
    "telephone": "(541) 604-1337",
    "address": { "@type": "PostalAddress", "addressLocality": "Bend", "addressRegion": "OR" }
  },
  "areaServed": ["Bend", "Redmond", "Sisters", "Sunriver", "Tumalo"],
  "description": "Modern landscape design in Bend, Oregon. Clean lines, native plants, natural stone, and architectural lighting for contemporary Bend homes.",
};

const FAQ_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": FAQS.map(f => ({
    "@type": "Question",
    "name": f.q,
    "acceptedAnswer": { "@type": "Answer", "text": f.a }
  }))
};

export default function ModernLandscapeDesignBend() {
  return (
    <div style={{ backgroundColor: "oklch(0.97 0.012 85)" }}>
      <Helmet>
        <title>Modern Landscape Design Bend Oregon | Newport Avenue Landscaping</title>
        <meta name="description" content="Modern landscape design in Bend, Oregon. Clean lines, native plants, natural stone & architectural lighting for contemporary Bend homes. Free consultation." />
        <link rel="canonical" href="https://newportavelandscaping.com/landscape-design-bend/modern-design" />
        <script type="application/ld+json">{JSON.stringify(SCHEMA)}</script>
        <script type="application/ld+json">{JSON.stringify(FAQ_SCHEMA)}</script>
      </Helmet>
      <Navbar />

      {/* BREADCRUMB */}
      <div style={{ background: "oklch(0.97 0.012 85)", padding: "0.75rem 0", borderBottom: "1px solid oklch(0.90 0.008 0)" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 1.5rem" }}>
          <p style={{ fontFamily: "var(--font-label)", fontSize: "0.6rem", letterSpacing: "0.12em", color: "oklch(0.55 0.008 0)" }}>
            <Link href="/">HOME</Link> &nbsp;/&nbsp; <Link href="/landscape-design-bend">LANDSCAPE DESIGN BEND</Link> &nbsp;/&nbsp; <span style={{ color: "oklch(0.46 0.20 25)" }}>MODERN DESIGN</span>
          </p>
        </div>
      </div>

      {/* HERO */}
      <section style={{
        background: `linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.55)), url(${HERO_IMG}) center/cover no-repeat`,
        padding: "5rem 0 3.5rem",
      }}>
        <div style={{ maxWidth: "860px", margin: "0 auto", padding: "0 1.5rem", textAlign: "center" }}>
          <p style={{ fontFamily: "var(--font-label)", fontSize: "0.65rem", letterSpacing: "0.18em", color: "oklch(0.72 0.12 25)", marginBottom: "1rem" }}>
            BEND, OREGON · CONTEMPORARY DESIGN · FREE CONSULTATION
          </p>
          <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 300, color: "#fff", fontSize: "clamp(1.8rem, 4.5vw, 3rem)", lineHeight: 1.1, marginBottom: "1.25rem" }}>
            Modern Landscape Design in Bend, Oregon
          </h1>
          <p style={{ color: "oklch(0.88 0.008 0)", fontWeight: 300, fontSize: "1.05rem", maxWidth: "600px", margin: "0 auto 2rem", lineHeight: 1.7 }}>
            Clean lines, native plants, natural stone, and architectural lighting — modern landscape design that complements Bend's contemporary homes and high-desert setting.
          </p>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/contact">
              <span style={{ display: "inline-block", background: "oklch(0.46 0.20 25)", color: "#fff", padding: "0.85rem 2rem", fontFamily: "var(--font-label)", fontSize: "0.7rem", letterSpacing: "0.14em", cursor: "pointer", textDecoration: "none" }}>
                FREE CONSULTATION →
              </span>
            </Link>
            <Link href="/our-work">
              <span style={{ display: "inline-block", border: "1px solid rgba(255,255,255,0.4)", color: "#fff", padding: "0.85rem 2rem", fontFamily: "var(--font-label)", fontSize: "0.7rem", letterSpacing: "0.14em", cursor: "pointer", textDecoration: "none" }}>
                SEE OUR WORK
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* ELEMENTS */}
      <section style={{ background: "oklch(1 0 0)", padding: "4rem 0" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 1.5rem" }}>
          <p style={{ fontFamily: "var(--font-label)", fontSize: "0.65rem", letterSpacing: "0.18em", color: "oklch(0.46 0.20 25)", marginBottom: "0.75rem" }}>DESIGN ELEMENTS</p>
          <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 300, color: "oklch(0.15 0.005 0)", fontSize: "clamp(1.4rem, 3vw, 2rem)", marginBottom: "2.5rem" }}>
            Elements of Modern Bend Landscape Design
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "1.5rem" }}>
            {ELEMENTS.map(e => (
              <div key={e.title} style={{ background: "oklch(0.97 0.012 85)", padding: "1.5rem", borderLeft: "3px solid oklch(0.46 0.20 25)" }}>
                <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 400, color: "oklch(0.15 0.005 0)", fontSize: "1.05rem", marginBottom: "0.5rem" }}>{e.title}</h3>
                <p style={{ color: "oklch(0.45 0.008 0)", fontSize: "0.88rem", lineHeight: 1.6, fontWeight: 300 }}>{e.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ background: "oklch(0.97 0.012 85)", padding: "4rem 0" }}>
        <div style={{ maxWidth: "860px", margin: "0 auto", padding: "0 1.5rem" }}>
          <p style={{ fontFamily: "var(--font-label)", fontSize: "0.65rem", letterSpacing: "0.18em", color: "oklch(0.46 0.20 25)", marginBottom: "0.75rem" }}>FAQ</p>
          <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 300, color: "oklch(0.15 0.005 0)", fontSize: "clamp(1.4rem, 3vw, 2rem)", marginBottom: "2rem" }}>
            Modern Landscape Design in Bend — Common Questions
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            {FAQS.map(f => (
              <div key={f.q} style={{ borderLeft: "3px solid oklch(0.46 0.20 25)", paddingLeft: "1.25rem" }}>
                <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 400, color: "oklch(0.15 0.005 0)", fontSize: "1rem", marginBottom: "0.5rem" }}>{f.q}</h3>
                <p style={{ color: "oklch(0.38 0.008 0)", lineHeight: 1.7, fontWeight: 300, fontSize: "0.92rem" }}>{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: "oklch(0.15 0.005 0)", padding: "3.5rem 0", textAlign: "center" }}>
        <div style={{ maxWidth: "700px", margin: "0 auto", padding: "0 1.5rem" }}>
          <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 300, color: "#fff", fontSize: "clamp(1.4rem, 3vw, 2.2rem)", marginBottom: "1rem" }}>
            Start Your Modern Bend Landscape
          </h2>
          <p style={{ color: "oklch(0.72 0.008 0)", fontWeight: 300, marginBottom: "2rem", lineHeight: 1.7 }}>
            Call <a href="tel:5416041337" style={{ color: "oklch(0.72 0.12 25)", textDecoration: "none" }}>(541) 604-1337</a> or request a free consultation. We serve Bend, Redmond, Sisters, Sunriver, and all of Central Oregon.
          </p>
          <Link href="/contact">
            <span style={{ display: "inline-block", background: "oklch(0.46 0.20 25)", color: "#fff", padding: "0.9rem 2.5rem", fontFamily: "var(--font-label)", fontSize: "0.7rem", letterSpacing: "0.14em", cursor: "pointer", textDecoration: "none" }}>
              REQUEST CONSULTATION →
            </span>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
