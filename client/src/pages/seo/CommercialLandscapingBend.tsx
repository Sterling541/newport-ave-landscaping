/* ============================================================
   CORE SEO LANDING PAGE — Commercial Landscaping Bend Oregon
   Target keyword: "commercial landscaping Bend Oregon"
   ============================================================ */
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Helmet } from "react-helmet-async";
import { Link } from "wouter";

const HERO_IMG = "/manus-storage/GLLPatio1_90e2e0c4_166b9312.webp";

const SERVICES = [
  { title: "Commercial Landscape Maintenance", desc: "Weekly and bi-weekly maintenance programs for office parks, retail centers, and commercial properties.", href: "/services/commercial-maintenance" },
  { title: "HOA Landscape Management", desc: "Full-service HOA landscape management including common areas, entry features, and community amenities.", href: "/commercial" },
  { title: "Commercial Installation", desc: "New landscape installation for commercial developments, including design, grading, planting, and irrigation.", href: "/commercial" },
  { title: "Property Management Services", desc: "Landscape services tailored for property managers — reliable scheduling, detailed reporting, and single-point-of-contact service.", href: "/commercial" },
  { title: "Snow & Ice Management", desc: "Commercial snow removal and ice control for parking lots, walkways, and entry areas.", href: "/services/snow-removal" },
  { title: "Irrigation Management", desc: "Commercial irrigation installation, programming, spring activation, and fall winterization.", href: "/services/irrigation" },
];

const FAQS = [
  { q: "What commercial landscaping services do you offer in Bend?", a: "Newport Avenue Landscaping provides full-service commercial landscaping in Bend including landscape maintenance, HOA management, commercial installation, irrigation services, snow removal, and property management landscape programs. We serve office parks, retail centers, HOA communities, government facilities, and multi-family properties." },
  { q: "Do you offer commercial landscape maintenance contracts in Bend?", a: "Yes. We offer annual maintenance contracts for commercial properties in Bend and throughout Central Oregon. Contracts include scheduled maintenance visits, seasonal services, and priority response for issues." },
  { q: "How do I get a commercial landscaping bid in Bend?", a: "Contact us at (541) 604-1337 or through our online form. We will schedule a site visit and provide a detailed written proposal within 5–7 business days." },
  { q: "Do you work with HOA communities in Bend?", a: "Yes — HOA community management is a core part of our commercial business. We currently manage common areas and amenity landscapes for multiple HOA communities throughout Bend, Redmond, and Central Oregon." },
  { q: "Are you licensed for commercial landscaping work in Oregon?", a: "Yes. Newport Avenue Landscaping holds an Oregon Landscape Contractor's Board (LCB) license and carries full commercial general liability and workers' compensation insurance." },
];

const SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Commercial Landscaping — Bend, Oregon",
  "provider": {
    "@type": "LocalBusiness",
    "name": "Newport Avenue Landscaping",
    "telephone": "(541) 604-1337",
    "address": { "@type": "PostalAddress", "addressLocality": "Bend", "addressRegion": "OR" }
  },
  "areaServed": ["Bend", "Redmond", "Sisters", "Sunriver", "Tumalo", "La Pine", "Prineville", "Madras"],
  "description": "Commercial landscaping services in Bend, Oregon. Maintenance contracts, HOA management, commercial installation, irrigation, and snow removal.",
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

export default function CommercialLandscapingBend() {
  return (
    <div style={{ backgroundColor: "oklch(0.97 0.012 85)" }}>
      <Helmet>
        <title>Commercial Landscaping Bend Oregon | Newport Avenue Landscaping | (541) 604-1337</title>
        <meta name="description" content="Commercial landscaping services in Bend, Oregon. Maintenance contracts, HOA management, commercial installation, irrigation & snow removal. Licensed & insured." />
        <link rel="canonical" href="https://newportavelandscaping.com/commercial-landscaping-bend" />
        <script type="application/ld+json">{JSON.stringify(SCHEMA)}</script>
        <script type="application/ld+json">{JSON.stringify(FAQ_SCHEMA)}</script>
      </Helmet>
      <Navbar />

      {/* HERO */}
      <section style={{
        background: `linear-gradient(rgba(0,0,0,0.58), rgba(0,0,0,0.58)), url(${HERO_IMG}) center/cover no-repeat`,
        padding: "6rem 0 4rem",
      }}>
        <div style={{ maxWidth: "860px", margin: "0 auto", padding: "0 1.5rem", textAlign: "center" }}>
          <p style={{ fontFamily: "var(--font-label)", fontSize: "0.65rem", letterSpacing: "0.18em", color: "oklch(0.72 0.12 25)", marginBottom: "1rem" }}>
            BEND, OREGON · COMMERCIAL · LICENSED & INSURED
          </p>
          <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 300, color: "#fff", fontSize: "clamp(2rem, 5vw, 3.5rem)", lineHeight: 1.1, marginBottom: "1.25rem" }}>
            Commercial Landscaping in Bend, Oregon
          </h1>
          <p style={{ color: "oklch(0.88 0.008 0)", fontWeight: 300, fontSize: "1.1rem", maxWidth: "620px", margin: "0 auto 2rem", lineHeight: 1.7 }}>
            Newport Avenue Landscaping provides full-service commercial landscaping for Bend's office parks, retail centers, HOA communities, and property managers. Reliable, professional, and locally based.
          </p>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/contact">
              <span style={{ display: "inline-block", background: "oklch(0.46 0.20 25)", color: "#fff", padding: "0.85rem 2rem", fontFamily: "var(--font-label)", fontSize: "0.7rem", letterSpacing: "0.14em", cursor: "pointer", textDecoration: "none" }}>
                REQUEST COMMERCIAL BID →
              </span>
            </Link>
            <a href="tel:5416041337" style={{ display: "inline-block", border: "1px solid rgba(255,255,255,0.4)", color: "#fff", padding: "0.85rem 2rem", fontFamily: "var(--font-label)", fontSize: "0.7rem", letterSpacing: "0.14em", textDecoration: "none" }}>
              CALL (541) 604-1337
            </a>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section style={{ background: "oklch(1 0 0)", padding: "4rem 0" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 1.5rem" }}>
          <p style={{ fontFamily: "var(--font-label)", fontSize: "0.65rem", letterSpacing: "0.18em", color: "oklch(0.46 0.20 25)", marginBottom: "0.75rem" }}>COMMERCIAL SERVICES</p>
          <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 300, color: "oklch(0.15 0.005 0)", fontSize: "clamp(1.5rem, 3vw, 2.2rem)", marginBottom: "2.5rem" }}>
            What We Offer Commercial Clients
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "1.5rem" }}>
            {SERVICES.map(s => (
              <Link key={s.title} href={s.href}>
                <div style={{ background: "oklch(0.97 0.012 85)", padding: "1.5rem", cursor: "pointer", borderLeft: "3px solid oklch(0.46 0.20 25)", transition: "transform 0.2s" }}
                  onMouseEnter={e => (e.currentTarget.style.transform = "translateX(4px)")}
                  onMouseLeave={e => (e.currentTarget.style.transform = "translateX(0)")}>
                  <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 400, color: "oklch(0.15 0.005 0)", fontSize: "1.05rem", marginBottom: "0.5rem" }}>{s.title}</h3>
                  <p style={{ color: "oklch(0.45 0.008 0)", fontSize: "0.88rem", lineHeight: 1.6, fontWeight: 300 }}>{s.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* TRUST */}
      <section style={{ background: "oklch(0.12 0.005 0)", padding: "3.5rem 0" }}>
        <div style={{ maxWidth: "860px", margin: "0 auto", padding: "0 1.5rem", textAlign: "center" }}>
          <p style={{ fontFamily: "var(--font-label)", fontSize: "0.65rem", letterSpacing: "0.18em", color: "oklch(0.72 0.12 25)", marginBottom: "1.5rem" }}>WHY COMMERCIAL CLIENTS CHOOSE US</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "2rem" }}>
            {[
              { stat: "21+", label: "Years in Business" },
              { stat: "150+", label: "Crew Members" },
              { stat: "400+", label: "Properties Served" },
              { stat: "LCB#", label: "Licensed & Bonded" },
            ].map(s => (
              <div key={s.label}>
                <div style={{ fontFamily: "var(--font-display)", fontSize: "2.5rem", color: "#fff", marginBottom: "0.25rem" }}>{s.stat}</div>
                <div style={{ fontFamily: "var(--font-label)", fontSize: "0.6rem", letterSpacing: "0.14em", color: "oklch(0.55 0.008 0)" }}>{s.label}</div>
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
            Commercial Landscaping in Bend — Common Questions
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
          <p style={{ fontFamily: "var(--font-label)", fontSize: "0.65rem", letterSpacing: "0.18em", color: "oklch(0.46 0.20 25)", marginBottom: "0.75rem" }}>FREE SITE VISIT · DETAILED WRITTEN PROPOSAL</p>
          <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 300, color: "#fff", fontSize: "clamp(1.4rem, 3vw, 2.2rem)", marginBottom: "1rem" }}>
            Get a Commercial Landscaping Bid
          </h2>
          <p style={{ color: "oklch(0.72 0.008 0)", fontWeight: 300, marginBottom: "2rem", lineHeight: 1.7 }}>
            Call <a href="tel:5416041337" style={{ color: "oklch(0.72 0.12 25)", textDecoration: "none" }}>(541) 604-1337</a> or submit a request online. We provide detailed written proposals within 5–7 business days.
          </p>
          <Link href="/contact">
            <span style={{ display: "inline-block", background: "oklch(0.46 0.20 25)", color: "#fff", padding: "0.9rem 2.5rem", fontFamily: "var(--font-label)", fontSize: "0.7rem", letterSpacing: "0.14em", cursor: "pointer", textDecoration: "none" }}>
              REQUEST COMMERCIAL BID →
            </span>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
