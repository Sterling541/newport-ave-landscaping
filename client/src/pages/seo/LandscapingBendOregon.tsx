/* ============================================================
   CORE SEO LANDING PAGE — Landscaping Bend Oregon
   Target keyword: "landscaping Bend Oregon"
   ============================================================ */
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Helmet } from "react-helmet-async";
import { Link } from "wouter";

const HERO_IMG = "/manus-storage/brokentop-xeriscape-01_064e5008.jpg";

const SERVICES = [
  { title: "Landscape Design", desc: "Full-service design from concept to installation — custom plans for Bend's high-desert climate.", href: "/services/landscape-design", img: "https://d2xsxph8kpxj0f.cloudfront.net/310519663503028182/g3pw3MRUapabcDUbhBEFxx/landscaping-native_fa3d1cfe.jpg" },
  { title: "Irrigation Systems", desc: "Smart sprinkler installation, drip systems, and seasonal activation/blowout services.", href: "/services/irrigation", img: "https://d2xsxph8kpxj0f.cloudfront.net/310519663503028182/g3pw3MRUapabcDUbhBEFxx/landscaping-native_fa3d1cfe.jpg" },
  { title: "Paver Patios", desc: "Concrete and natural stone pavers for patios, walkways, driveways, and pool decks.", href: "/services/pavers", img: "https://d2xsxph8kpxj0f.cloudfront.net/310519663503028182/g3pw3MRUapabcDUbhBEFxx/GLLPatio1_90e2e0c4.jpg" },
  { title: "Xeriscaping", desc: "Water-wise landscape transformations using drought-tolerant plants and efficient irrigation.", href: "/services/xeriscaping", img: "/manus-storage/brokentop-xeriscape-01_064e5008.jpg" },
  { title: "Retaining Walls", desc: "Boulder, block, and natural stone retaining walls for slope stabilization and terracing.", href: "/services/retaining-walls", img: "/manus-storage/awbrey-patio-wall-01_bde91632.jpg" },
  { title: "Outdoor Living", desc: "Fire pits, pergolas, outdoor kitchens, and living spaces built for Central Oregon living.", href: "/services/outdoor-living", img: "https://d2xsxph8kpxj0f.cloudfront.net/310519663503028182/g3pw3MRUapabcDUbhBEFxx/GLLPatio1_90e2e0c4.jpg" },
  { title: "Lawn Care & Maintenance", desc: "Weekly mowing, aeration, fertilization, and seasonal cleanup for residential and commercial properties.", href: "/maintenance", img: "https://d2xsxph8kpxj0f.cloudfront.net/310519663503028182/g3pw3MRUapabcDUbhBEFxx/maintenance-hero-bg_3219f29e.jpeg" },
  { title: "Firewise Landscaping", desc: "Defensible space creation, juniper removal, and fire-resistant replanting for WUI properties.", href: "/services/firewise-landscaping", img: "https://d2xsxph8kpxj0f.cloudfront.net/310519663503028182/g3pw3MRUapabcDUbhBEFxx/forest-home4_9324e5db.jpg" },
];

const FAQS = [
  { q: "What landscaping services does Newport Avenue Landscaping offer in Bend?", a: "We offer a full range of landscaping services in Bend, Oregon including landscape design and installation, irrigation systems, paver patios, xeriscaping, retaining walls, outdoor living spaces, fire features, landscape lighting, lawn care and maintenance, snow removal, and firewise landscaping. We serve residential and commercial clients throughout Central Oregon." },
  { q: "How much does landscaping cost in Bend, Oregon?", a: "Landscaping costs in Bend vary widely by project scope. A basic lawn care plan starts around $97/month. A new landscape installation typically ranges from $5,000–$50,000+ depending on size and complexity. Paver patios range from $8,000–$30,000+. We provide free on-site estimates for all projects." },
  { q: "Is Newport Avenue Landscaping licensed and insured in Oregon?", a: "Yes. Newport Avenue Landscaping is fully licensed (Oregon Landscape Contractor's Board), bonded, and insured. We carry general liability and workers' compensation insurance on all projects." },
  { q: "Do you serve areas outside of Bend?", a: "Yes — we serve all of Central Oregon including Redmond, Sisters, Sunriver, Tumalo, La Pine, Prineville, Madras, and surrounding communities." },
  { q: "How do I get a landscaping estimate in Bend?", a: "Call us at (541) 604-1337, fill out our online contact form, or email us. We offer free on-site estimates with no obligation." },
];

const SCHEMA = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Newport Avenue Landscaping",
  "description": "Full-service landscaping company in Bend, Oregon serving residential and commercial clients throughout Central Oregon.",
  "url": "https://newportavelandscaping.com/landscaping-bend-oregon",
  "telephone": "(541) 604-1337",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Newport Avenue",
    "addressLocality": "Bend",
    "addressRegion": "OR",
    "postalCode": "97701",
    "addressCountry": "US"
  },
  "geo": { "@type": "GeoCoordinates", "latitude": 44.0582, "longitude": -121.3153 },
  "areaServed": ["Bend", "Redmond", "Sisters", "Sunriver", "Tumalo", "La Pine", "Prineville", "Madras"],
  "serviceType": ["Landscaping", "Irrigation", "Paver Installation", "Xeriscaping", "Retaining Walls", "Lawn Care"],
  "priceRange": "$$-$$$",
  "openingHours": "Mo-Fr 08:00-17:00",
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

export default function LandscapingBendOregon() {
  return (
    <div style={{ backgroundColor: "oklch(0.97 0.012 85)" }}>
      <Helmet>
        <title>Landscaping Bend Oregon | Newport Avenue Landscaping | (541) 604-1337</title>
        <meta name="description" content="Newport Avenue Landscaping — Bend Oregon's premier landscaping company. Design, installation, irrigation, pavers, xeriscaping, lawn care & more. Licensed & insured. Free estimates." />
        <link rel="canonical" href="https://newportavelandscaping.com/landscaping-bend-oregon" />
        <script type="application/ld+json">{JSON.stringify(SCHEMA)}</script>
        <script type="application/ld+json">{JSON.stringify(FAQ_SCHEMA)}</script>
      </Helmet>
      <Navbar />

      {/* HERO */}
      <section style={{
        background: `linear-gradient(rgba(0,0,0,0.58), rgba(0,0,0,0.58)), url(${HERO_IMG}) center/cover no-repeat`,
        padding: "6rem 0 4rem",
        marginTop: "0",
      }}>
        <div style={{ maxWidth: "860px", margin: "0 auto", padding: "0 1.5rem", textAlign: "center" }}>
          <p style={{ fontFamily: "var(--font-label)", fontSize: "0.65rem", letterSpacing: "0.18em", color: "oklch(0.72 0.12 25)", marginBottom: "1rem" }}>
            BEND, OREGON · LICENSED & INSURED · LCB#
          </p>
          <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 300, color: "#fff", fontSize: "clamp(2rem, 5vw, 3.5rem)", lineHeight: 1.1, marginBottom: "1.25rem" }}>
            Landscaping in Bend, Oregon
          </h1>
          <p style={{ color: "oklch(0.88 0.008 0)", fontWeight: 300, fontSize: "1.1rem", maxWidth: "620px", margin: "0 auto 2rem", lineHeight: 1.7 }}>
            Newport Avenue Landscaping is Bend's full-service landscape contractor — design, installation, irrigation, pavers, xeriscaping, firewise, and year-round maintenance for residential and commercial properties throughout Central Oregon.
          </p>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/contact">
              <span style={{ display: "inline-block", background: "oklch(0.46 0.20 25)", color: "#fff", padding: "0.85rem 2rem", fontFamily: "var(--font-label)", fontSize: "0.7rem", letterSpacing: "0.14em", cursor: "pointer", textDecoration: "none" }}>
                GET A FREE ESTIMATE →
              </span>
            </Link>
            <a href="tel:5416041337" style={{ display: "inline-block", border: "1px solid rgba(255,255,255,0.4)", color: "#fff", padding: "0.85rem 2rem", fontFamily: "var(--font-label)", fontSize: "0.7rem", letterSpacing: "0.14em", textDecoration: "none" }}>
              CALL (541) 604-1337
            </a>
          </div>
        </div>
      </section>

      {/* TRUST BAR */}
      <section style={{ background: "oklch(0.15 0.005 0)", padding: "1.25rem 0" }}>
        <div style={{ maxWidth: "860px", margin: "0 auto", padding: "0 1.5rem", display: "flex", gap: "2rem", justifyContent: "center", flexWrap: "wrap" }}>
          {["21+ Years in Business", "Licensed & Bonded (LCB#)", "150+ Crew Members", "400+ Properties Served", "Free On-Site Estimates"].map(t => (
            <span key={t} style={{ fontFamily: "var(--font-label)", fontSize: "0.6rem", letterSpacing: "0.14em", color: "oklch(0.72 0.12 25)" }}>{t}</span>
          ))}
        </div>
      </section>

      {/* INTRO */}
      <section style={{ background: "oklch(1 0 0)", padding: "4rem 0" }}>
        <div style={{ maxWidth: "860px", margin: "0 auto", padding: "0 1.5rem" }}>
          <p style={{ fontFamily: "var(--font-label)", fontSize: "0.65rem", letterSpacing: "0.18em", color: "oklch(0.46 0.20 25)", marginBottom: "0.75rem" }}>ABOUT US</p>
          <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 300, color: "oklch(0.15 0.005 0)", fontSize: "clamp(1.5rem, 3vw, 2.2rem)", marginBottom: "1.25rem" }}>
            Bend's Premier Landscape Contractor
          </h2>
          <p style={{ color: "oklch(0.38 0.008 0)", lineHeight: 1.8, fontWeight: 300, marginBottom: "1rem" }}>
            Newport Avenue Landscaping has been transforming outdoor spaces in Bend and throughout Central Oregon for over 21 years. We are a full-service landscape contractor offering everything from initial design and installation through ongoing maintenance — all under one roof. Our team of 150+ crew members handles residential properties, commercial complexes, HOA communities, and government facilities.
          </p>
          <p style={{ color: "oklch(0.38 0.008 0)", lineHeight: 1.8, fontWeight: 300, marginBottom: "1rem" }}>
            Bend's unique high-desert climate at 3,600 feet elevation presents specific challenges for landscaping: extreme temperature swings, low annual precipitation (around 12 inches), volcanic pumice soil, and an increasingly fire-prone environment. We have spent two decades developing expertise in exactly these conditions — from drought-tolerant xeriscape designs and efficient drip irrigation to firewise defensible space planning and snow removal.
          </p>
          <p style={{ color: "oklch(0.38 0.008 0)", lineHeight: 1.8, fontWeight: 300 }}>
            Whether you are building a new home in NorthWest Crossing, renovating an established property in Awbrey Butte, managing a commercial complex in the Old Mill District, or protecting a rural property in Tumalo from wildfire, Newport Avenue Landscaping has the experience, licensing, and crew capacity to deliver exceptional results.
          </p>
        </div>
      </section>

      {/* SERVICES GRID */}
      <section style={{ background: "oklch(0.97 0.012 85)", padding: "4rem 0" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 1.5rem" }}>
          <p style={{ fontFamily: "var(--font-label)", fontSize: "0.65rem", letterSpacing: "0.18em", color: "oklch(0.46 0.20 25)", marginBottom: "0.75rem", textAlign: "center" }}>WHAT WE DO</p>
          <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 300, color: "oklch(0.15 0.005 0)", fontSize: "clamp(1.5rem, 3vw, 2.2rem)", marginBottom: "2.5rem", textAlign: "center" }}>
            Landscaping Services in Bend, Oregon
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "1.5rem" }}>
            {SERVICES.map(s => (
              <Link key={s.title} href={s.href}>
                <div style={{ background: "#fff", overflow: "hidden", cursor: "pointer", transition: "transform 0.2s", boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}
                  onMouseEnter={e => (e.currentTarget.style.transform = "translateY(-3px)")}
                  onMouseLeave={e => (e.currentTarget.style.transform = "translateY(0)")}>
                  <div style={{ height: "180px", backgroundImage: `url(${s.img})`, backgroundSize: "cover", backgroundPosition: "center" }} />
                  <div style={{ padding: "1.25rem" }}>
                    <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 400, color: "oklch(0.15 0.005 0)", fontSize: "1.1rem", marginBottom: "0.5rem" }}>{s.title}</h3>
                    <p style={{ color: "oklch(0.45 0.008 0)", fontSize: "0.88rem", lineHeight: 1.6, fontWeight: 300 }}>{s.desc}</p>
                    <p style={{ color: "oklch(0.46 0.20 25)", fontFamily: "var(--font-label)", fontSize: "0.6rem", letterSpacing: "0.12em", marginTop: "0.75rem" }}>LEARN MORE →</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICE AREAS */}
      <section style={{ background: "oklch(1 0 0)", padding: "3.5rem 0" }}>
        <div style={{ maxWidth: "860px", margin: "0 auto", padding: "0 1.5rem", textAlign: "center" }}>
          <p style={{ fontFamily: "var(--font-label)", fontSize: "0.65rem", letterSpacing: "0.18em", color: "oklch(0.46 0.20 25)", marginBottom: "0.75rem" }}>SERVICE AREA</p>
          <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 300, color: "oklch(0.15 0.005 0)", fontSize: "clamp(1.4rem, 3vw, 2rem)", marginBottom: "1rem" }}>
            Serving All of Central Oregon
          </h2>
          <p style={{ color: "oklch(0.38 0.008 0)", lineHeight: 1.8, fontWeight: 300, marginBottom: "2rem" }}>
            Our crews serve Bend and the surrounding communities of Central Oregon. We are locally based and know the soils, climate, and neighborhoods of each area we serve.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem", justifyContent: "center" }}>
            {[
              { name: "Bend", href: "/landscaping/bend" },
              { name: "Redmond", href: "/landscaping/redmond" },
              { name: "Sisters", href: "/landscaping/sisters" },
              { name: "Sunriver", href: "/landscaping/sunriver" },
              { name: "Tumalo", href: "/landscaping/tumalo" },
              { name: "La Pine", href: "/landscaping/la-pine" },
              { name: "Prineville", href: "/landscaping/prineville" },
              { name: "Madras", href: "/landscaping/madras" },
            ].map(c => (
              <Link key={c.name} href={c.href}>
                <span style={{ display: "inline-block", border: "1px solid oklch(0.80 0.008 0)", color: "oklch(0.38 0.008 0)", padding: "0.5rem 1.25rem", fontFamily: "var(--font-label)", fontSize: "0.65rem", letterSpacing: "0.1em", cursor: "pointer", textDecoration: "none" }}>
                  {c.name.toUpperCase()}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ background: "oklch(0.97 0.012 85)", padding: "4rem 0" }}>
        <div style={{ maxWidth: "860px", margin: "0 auto", padding: "0 1.5rem" }}>
          <p style={{ fontFamily: "var(--font-label)", fontSize: "0.65rem", letterSpacing: "0.18em", color: "oklch(0.46 0.20 25)", marginBottom: "0.75rem" }}>FAQ</p>
          <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 300, color: "oklch(0.15 0.005 0)", fontSize: "clamp(1.4rem, 3vw, 2rem)", marginBottom: "2rem" }}>
            Landscaping in Bend — Common Questions
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
          <p style={{ fontFamily: "var(--font-label)", fontSize: "0.65rem", letterSpacing: "0.18em", color: "oklch(0.46 0.20 25)", marginBottom: "0.75rem" }}>FREE CONSULTATION · NO OBLIGATION</p>
          <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 300, color: "#fff", fontSize: "clamp(1.4rem, 3vw, 2.2rem)", marginBottom: "1rem" }}>
            Ready to Transform Your Bend Property?
          </h2>
          <p style={{ color: "oklch(0.72 0.008 0)", fontWeight: 300, marginBottom: "2rem", lineHeight: 1.7 }}>
            Call us at <a href="tel:5416041337" style={{ color: "oklch(0.72 0.12 25)", textDecoration: "none" }}>(541) 604-1337</a> or request a free on-site estimate. We serve Bend and all of Central Oregon.
          </p>
          <Link href="/contact">
            <span style={{ display: "inline-block", background: "oklch(0.46 0.20 25)", color: "#fff", padding: "0.9rem 2.5rem", fontFamily: "var(--font-label)", fontSize: "0.7rem", letterSpacing: "0.14em", cursor: "pointer", textDecoration: "none" }}>
              REQUEST FREE ESTIMATE →
            </span>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
