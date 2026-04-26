/* ============================================================
   FIREWISE LANDING PAGE — High-Conversion
   Dedicated landing page for:
   - Google Ads campaigns on "firewise landscaping Bend"
   - Organic search for "R327 landscaping", "defensible space Bend"
   - Direct outreach / press mentions

   Sections:
   1. Hero — urgency + primary CTA
   2. Why Now — R327 + county mandate context
   3. Three Zones — visual zone breakdown
   4. What We Do — service scope
   5. Cost Guide — transparent pricing
   6. Before/After — social proof
   7. FAQ — schema-ready
   8. Final CTA — quote form
   ============================================================ */

import { Helmet } from "react-helmet-async";
import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";

const PHONE = "(541) 617-8873";
const PHONE_HREF = "tel:+15416178873";
const QUOTE_HREF = "/schedule";

const FAQS = [
  {
    q: "Does Deschutes County require defensible space landscaping?",
    a: "The City of Bend's R327 fire hardening code (effective May 15, 2026) governs construction materials on new homes — noncombustible gutters, ember-resistant vents, fire-resistant siding. It does not mandate defensible space landscaping. However, the Oregon Fire Marshal's Office is actively drafting a statewide defensible space ordinance expected for local adoption in late 2026, and Project Wildfire is pushing Bend, Redmond, and La Pine to adopt landscape-side codes immediately. Getting ahead of the requirement now avoids a rushed, more expensive compliance project when codes take effect.",
  },
  {
    q: "How much does firewise landscaping cost in Bend?",
    a: "A Zone 1 assessment and cleanup (0–30 feet from your home) typically runs $2,500–$6,500. Full defensible space transformations including replanting range from $7,500–$25,000+ depending on property size and vegetation density. Juniper removal is priced by tree size: small trees under 10 feet run $300–$650; large mature junipers can be $800–$2,500 depending on access and disposal. We provide free written estimates after a site assessment.",
  },
  {
    q: "Which plants are most dangerous and need to be removed?",
    a: "Juniper is the highest fire risk in Central Oregon — it contains highly volatile oils, burns intensely, and is extremely common in Bend-area landscapes. Other high-risk plants include manzanita, arborvitae, cedar, pine, and spruce. Any plant with dead wood accumulation or dense branching that creates 'ladder fuels' from the ground to the tree canopy is a priority for removal or pruning.",
  },
  {
    q: "What are the three defensible space zones?",
    a: "Zone 1 (0–30 feet): Well-irrigated, free of dead vegetation, only carefully spaced low-flammability species. No wood mulch within 5 feet of the structure. Zone 2 (30–100 feet): Low-flammability, low-growing plants with well-spaced trees — no touching canopies. Zone 3 (100+ feet): Natural area where you selectively prune, thin, and remove highly flammable vegetation to reduce fuel load.",
  },
  {
    q: "Can you replace removed plants with something attractive?",
    a: "Yes — this is our specialty. Central Oregon has a rich palette of fire-resistant plants that thrive in the high desert: yarrow, native grasses, stonecrop, snowberry, currant, and deciduous trees like aspen, maple, and cherry. We design firewise landscapes that look intentional and polished, not stripped and defensive. We match plant selection to your specific zone, sun exposure, soil type, and aesthetic.",
  },
  {
    q: "How long does a firewise project take?",
    a: "A Zone 1 cleanup and replanting typically takes 1–3 days for a standard residential property. Larger projects with significant juniper removal, irrigation work, and full replanting can take 1–2 weeks. We provide a detailed project timeline in your written estimate.",
  },
  {
    q: "Do you handle irrigation as part of firewise work?",
    a: "Yes. Zone 1 must be well-irrigated to maintain low flammability — dry, stressed plants are far more combustible than healthy, hydrated ones. We assess your existing irrigation coverage as part of every firewise project and can extend, repair, or redesign your system to ensure complete Zone 1 coverage.",
  },
];

const ZONES = [
  {
    number: "1",
    range: "0–30 ft",
    label: "Immediate Zone",
    color: "#c0392b",
    description: "Highest priority. Well-irrigated, no dead vegetation, only carefully spaced low-flammability species. No wood mulch within 5 feet of the structure.",
    actions: ["Remove all junipers, manzanita, arborvitae", "Install or extend irrigation to full coverage", "Replant with fire-resistant, drought-tolerant species", "Clear gutters and roof of debris"],
  },
  {
    number: "2",
    range: "30–100 ft",
    label: "Intermediate Zone",
    color: "#e67e22",
    description: "Low-flammability, low-growing plants with well-spaced trees. No touching canopies. Reduce fuel continuity.",
    actions: ["Thin and space trees (no touching canopies)", "Remove ladder fuels (low branches)", "Mow grasses and remove dead vegetation", "Selective juniper removal or heavy pruning"],
  },
  {
    number: "3",
    range: "100+ ft",
    label: "Outer Zone",
    color: "#f39c12",
    description: "Natural area where you selectively prune, thin, and remove highly flammable vegetation to reduce overall fuel load.",
    actions: ["Selective thinning of dense vegetation", "Remove dead trees and standing snags", "Prune lower branches on retained trees", "Reduce continuous fuel paths"],
  },
];

const COST_ITEMS = [
  { service: "Zone 1 Assessment & Consultation", range: "Free", note: "Written report included" },
  { service: "Zone 1 Cleanup (0–30 ft)", range: "$2,500–$6,500", note: "Typical residential lot" },
  { service: "Juniper Removal (small, <10 ft)", range: "$300–$650", note: "Per tree, includes stump grinding" },
  { service: "Juniper Removal (large, 10–25 ft)", range: "$650–$1,800", note: "Per tree, includes stump grinding" },
  { service: "Juniper Removal (mature, 25+ ft)", range: "$1,800–$2,500+", note: "Per tree, access-dependent" },
  { service: "Fire-Resistant Replanting", range: "$1,500–$8,000", note: "Depends on area and plant selection" },
  { service: "Irrigation Extension/Upgrade", range: "$800–$4,500", note: "Zone 1 coverage completion" },
  { service: "Full Defensible Space (all zones)", range: "$7,500–$25,000+", note: "Complete transformation" },
];

export default function FirewiseLandingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const submitQuote = trpc.quote.submit.useMutation({
    onSuccess: () => {
      setSubmitted(true);
      toast.success("Request received! We'll contact you within 1 business day.");
    },
    onError: () => {
      toast.error("Something went wrong. Please call us directly at " + PHONE);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    submitQuote.mutate({
      name: formData.name,
      email: formData.email,
      phone: formData.phone || undefined,
      service: "Firewise Landscaping / Defensible Space",
      message: formData.message,
    });
  };

  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Firewise Landscaping & Defensible Space",
    "provider": {
      "@type": "LocalBusiness",
      "name": "Newport Avenue Landscaping",
      "telephone": "+15416178873",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "61535 S HWY 97",
        "addressLocality": "Bend",
        "addressRegion": "OR",
        "postalCode": "97702",
      },
    },
    "areaServed": ["Bend, OR", "Redmond, OR", "Sisters, OR", "Sunriver, OR", "Deschutes County, OR"],
    "description": "Firewise landscaping and defensible space services in Bend, Oregon. Juniper removal, fire-resistant replanting, and zone-based vegetation management for Deschutes County homeowners.",
    "offers": {
      "@type": "Offer",
      "priceRange": "$2,500–$25,000+",
      "priceCurrency": "USD",
    },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": FAQS.map(faq => ({
      "@type": "Question",
      "name": faq.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.a,
      },
    })),
  };

  return (
    <>
      <Helmet>
        <title>Firewise Landscaping Bend Oregon | Defensible Space Contractor | Newport Avenue</title>
        <meta name="description" content="Firewise landscaping and defensible space services in Bend, Oregon. Juniper removal, fire-resistant replanting, and R327-compliant zone management for Deschutes County homeowners. Free site assessment. LCB #9153." />
        <link rel="canonical" href="https://www.newportavelandscaping.com/firewise-landscaping-bend-oregon" />
        <meta property="og:title" content="Firewise Landscaping Bend Oregon | Newport Avenue Landscaping" />
        <meta property="og:description" content="Protect your Bend home from wildfire. Expert defensible space landscaping, juniper removal, and fire-resistant replanting. Free assessment. LCB #9153." />
        <script type="application/ld+json">{JSON.stringify(schema)}</script>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>

      <div style={{ fontFamily: "'Montserrat', sans-serif", color: "#1a1a1a" }}>

        {/* ── HERO ── */}
        <section
          style={{
            position: "relative",
            minHeight: "clamp(520px, 70vh, 800px)",
            display: "flex",
            alignItems: "center",
            overflow: "hidden",
            backgroundColor: "#0d1f0d",
          }}
        >
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage: "url(/manus-storage/forest-home4_9324e5db_31f1b27d.webp)",
              backgroundSize: "cover",
              backgroundPosition: "center 40%",
              filter: "brightness(0.35)",
            }}
          />
          {/* Red urgency bar */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              backgroundColor: "#c0392b",
              padding: "10px 24px",
              textAlign: "center",
              fontSize: "0.72rem",
              fontWeight: 700,
              letterSpacing: "0.12em",
              color: "#fff",
              zIndex: 10,
            }}
          >
            R327 FIRE HARDENING CODE NOW IN EFFECT · DESCHUTES COUNTY DEFENSIBLE SPACE ORDINANCE EXPECTED LATE 2026
          </div>

          <div
            style={{
              position: "relative",
              zIndex: 2,
              padding: "clamp(5rem, 10vw, 8rem) clamp(1.5rem, 6vw, 6rem) clamp(3rem, 6vw, 5rem)",
              maxWidth: "760px",
            }}
          >
            <div
              style={{
                fontSize: "0.65rem",
                fontWeight: 700,
                letterSpacing: "0.25em",
                color: "#e74c3c",
                marginBottom: "1rem",
                textTransform: "uppercase",
              }}
            >
              Firewise Landscaping · Bend, Oregon
            </div>
            <h1
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: "clamp(2.8rem, 6vw, 5.5rem)",
                fontWeight: 700,
                lineHeight: 0.95,
                letterSpacing: "-0.02em",
                color: "#fff",
                marginBottom: "1.5rem",
              }}
            >
              Protect Your Home.<br />
              <em style={{ fontStyle: "italic", fontWeight: 300, color: "oklch(0.80 0.08 60)" }}>
                Before Fire Season.
              </em>
            </h1>
            <p
              style={{
                fontSize: "1rem",
                lineHeight: 1.7,
                color: "rgba(255,255,255,0.85)",
                maxWidth: "560px",
                marginBottom: "2rem",
              }}
            >
              Newport Avenue Landscaping is Central Oregon's leading defensible space contractor. We remove hazardous junipers, create fire-resistant zones, and replant with beautiful drought-tolerant species — protecting your home while keeping your landscape looking exceptional.
            </p>
            <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
              <a
                href="#quote-form"
                style={{
                  display: "inline-block",
                  backgroundColor: "#c0392b",
                  color: "#fff",
                  padding: "1rem 2rem",
                  fontWeight: 700,
                  fontSize: "0.75rem",
                  letterSpacing: "0.12em",
                  textDecoration: "none",
                  textTransform: "uppercase",
                  borderRadius: "2px",
                }}
              >
                Get Free Site Assessment →
              </a>
              <a
                href={PHONE_HREF}
                style={{
                  display: "inline-block",
                  backgroundColor: "transparent",
                  color: "#fff",
                  padding: "1rem 2rem",
                  fontWeight: 700,
                  fontSize: "0.75rem",
                  letterSpacing: "0.12em",
                  textDecoration: "none",
                  textTransform: "uppercase",
                  border: "1px solid rgba(255,255,255,0.4)",
                  borderRadius: "2px",
                }}
              >
                {PHONE}
              </a>
            </div>
          </div>
        </section>

        {/* ── WHY NOW ── */}
        <section
          style={{
            backgroundColor: "#fff",
            padding: "clamp(4rem, 8vw, 7rem) clamp(1.5rem, 6vw, 6rem)",
          }}
        >
          <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "3rem", alignItems: "center" }}>
              <div>
                <div style={{ fontSize: "0.62rem", fontWeight: 700, letterSpacing: "0.25em", color: "#c0392b", marginBottom: "0.75rem", textTransform: "uppercase" }}>
                  Why Act Now
                </div>
                <h2
                  style={{
                    fontFamily: "'Cormorant Garamond', Georgia, serif",
                    fontSize: "clamp(2rem, 4vw, 3.5rem)",
                    fontWeight: 700,
                    lineHeight: 1.05,
                    color: "#1a1a1a",
                    marginBottom: "1.5rem",
                  }}
                >
                  Central Oregon's Wildfire Risk Is Not Going Away
                </h2>
                <p style={{ fontSize: "0.9rem", lineHeight: 1.8, color: "#444", marginBottom: "1rem" }}>
                  Deschutes County has experienced over 40 significant wildfires in the past decade. The combination of dense juniper stands, prolonged drought, and expanding WUI (Wildland-Urban Interface) development means the risk to residential properties is at an all-time high.
                </p>
                <p style={{ fontSize: "0.9rem", lineHeight: 1.8, color: "#444", marginBottom: "1rem" }}>
                  The City of Bend's R327 fire hardening code (effective May 15, 2026) addresses building materials on new construction. But the landscape surrounding those homes — the junipers, manzanita, and dry grass — remains the primary ignition risk. Defensible space landscaping is the essential complement that R327 doesn't cover.
                </p>
                <p style={{ fontSize: "0.9rem", lineHeight: 1.8, color: "#444" }}>
                  The Oregon Fire Marshal's Office is actively drafting a statewide defensible space ordinance expected for local adoption in late 2026. Properties that act now avoid rushed, more expensive compliance projects when codes take effect — and more importantly, they're protected during the fire seasons between now and then.
                </p>
              </div>
              <div>
                <div
                  style={{
                    backgroundColor: "#1a1a1a",
                    borderRadius: "4px",
                    padding: "2rem",
                    color: "#fff",
                  }}
                >
                  <div style={{ fontSize: "0.62rem", fontWeight: 700, letterSpacing: "0.2em", color: "#e74c3c", marginBottom: "1.5rem", textTransform: "uppercase" }}>
                    Key Facts
                  </div>
                  {[
                    { stat: "90%", label: "of homes lost in wildfires ignite from embers — not direct flame contact" },
                    { stat: "30 ft", label: "is the critical Zone 1 distance — the most important area to protect" },
                    { stat: "40+", label: "significant wildfires in Deschutes County in the past decade" },
                    { stat: "2026", label: "expected year for Oregon defensible space ordinance adoption" },
                  ].map(item => (
                    <div key={item.stat} style={{ display: "flex", gap: "1rem", marginBottom: "1.25rem", alignItems: "flex-start" }}>
                      <div
                        style={{
                          fontFamily: "'Cormorant Garamond', serif",
                          fontSize: "2rem",
                          fontWeight: 700,
                          color: "#e74c3c",
                          lineHeight: 1,
                          minWidth: "80px",
                        }}
                      >
                        {item.stat}
                      </div>
                      <div style={{ fontSize: "0.78rem", lineHeight: 1.6, color: "rgba(255,255,255,0.8)", paddingTop: "0.25rem" }}>
                        {item.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── THREE ZONES ── */}
        <section
          style={{
            backgroundColor: "#f5f3ef",
            padding: "clamp(4rem, 8vw, 7rem) clamp(1.5rem, 6vw, 6rem)",
          }}
        >
          <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: "3rem" }}>
              <div style={{ fontSize: "0.62rem", fontWeight: 700, letterSpacing: "0.25em", color: "#c0392b", marginBottom: "0.75rem", textTransform: "uppercase" }}>
                Defensible Space
              </div>
              <h2
                style={{
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  fontSize: "clamp(2rem, 4vw, 3.2rem)",
                  fontWeight: 700,
                  color: "#1a1a1a",
                  marginBottom: "1rem",
                }}
              >
                The Three Zones of Protection
              </h2>
              <p style={{ fontSize: "0.88rem", color: "#555", maxWidth: "560px", margin: "0 auto", lineHeight: 1.7 }}>
                Effective defensible space is built in three concentric zones around your home, each with specific vegetation management requirements.
              </p>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.5rem" }}>
              {ZONES.map(zone => (
                <div
                  key={zone.number}
                  style={{
                    backgroundColor: "#fff",
                    borderRadius: "4px",
                    overflow: "hidden",
                    boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
                  }}
                >
                  <div
                    style={{
                      backgroundColor: zone.color,
                      padding: "1.25rem 1.5rem",
                      display: "flex",
                      alignItems: "center",
                      gap: "1rem",
                    }}
                  >
                    <div
                      style={{
                        width: "48px",
                        height: "48px",
                        borderRadius: "50%",
                        backgroundColor: "rgba(255,255,255,0.2)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontFamily: "'Cormorant Garamond', serif",
                        fontSize: "1.8rem",
                        fontWeight: 700,
                        color: "#fff",
                        flexShrink: 0,
                      }}
                    >
                      {zone.number}
                    </div>
                    <div>
                      <div style={{ fontSize: "0.62rem", fontWeight: 700, letterSpacing: "0.15em", color: "rgba(255,255,255,0.8)", textTransform: "uppercase" }}>
                        Zone {zone.number} · {zone.range}
                      </div>
                      <div style={{ fontSize: "1rem", fontWeight: 700, color: "#fff" }}>
                        {zone.label}
                      </div>
                    </div>
                  </div>
                  <div style={{ padding: "1.5rem" }}>
                    <p style={{ fontSize: "0.82rem", lineHeight: 1.7, color: "#444", marginBottom: "1rem" }}>
                      {zone.description}
                    </p>
                    <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                      {zone.actions.map(action => (
                        <li
                          key={action}
                          style={{
                            fontSize: "0.78rem",
                            lineHeight: 1.5,
                            color: "#333",
                            padding: "0.35rem 0",
                            borderBottom: "1px solid #f0ede8",
                            display: "flex",
                            alignItems: "flex-start",
                            gap: "0.5rem",
                          }}
                        >
                          <span style={{ color: zone.color, fontWeight: 700, flexShrink: 0, marginTop: "1px" }}>✓</span>
                          {action}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── COST GUIDE ── */}
        <section
          style={{
            backgroundColor: "#fff",
            padding: "clamp(4rem, 8vw, 7rem) clamp(1.5rem, 6vw, 6rem)",
          }}
        >
          <div style={{ maxWidth: "900px", margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: "3rem" }}>
              <div style={{ fontSize: "0.62rem", fontWeight: 700, letterSpacing: "0.25em", color: "#c0392b", marginBottom: "0.75rem", textTransform: "uppercase" }}>
                Transparent Pricing
              </div>
              <h2
                style={{
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  fontSize: "clamp(2rem, 4vw, 3.2rem)",
                  fontWeight: 700,
                  color: "#1a1a1a",
                  marginBottom: "1rem",
                }}
              >
                Firewise Landscaping Cost Guide
              </h2>
              <p style={{ fontSize: "0.88rem", color: "#555", maxWidth: "520px", margin: "0 auto", lineHeight: 1.7 }}>
                We believe in transparent pricing. These are typical ranges for Central Oregon properties — your free site assessment will include a detailed written estimate.
              </p>
            </div>
            <div style={{ border: "1px solid #e5e5e0", borderRadius: "4px", overflow: "hidden" }}>
              {COST_ITEMS.map((item, i) => (
                <div
                  key={item.service}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr auto",
                    gap: "1rem",
                    padding: "1rem 1.5rem",
                    backgroundColor: i % 2 === 0 ? "#fff" : "#faf9f7",
                    borderBottom: i < COST_ITEMS.length - 1 ? "1px solid #f0ede8" : "none",
                    alignItems: "center",
                  }}
                >
                  <div>
                    <div style={{ fontSize: "0.85rem", fontWeight: 600, color: "#1a1a1a", marginBottom: "0.15rem" }}>
                      {item.service}
                    </div>
                    <div style={{ fontSize: "0.72rem", color: "#888" }}>
                      {item.note}
                    </div>
                  </div>
                  <div
                    style={{
                      fontSize: "0.88rem",
                      fontWeight: 700,
                      color: item.range === "Free" ? "#2d7a2d" : "#1a1a1a",
                      textAlign: "right",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {item.range}
                  </div>
                </div>
              ))}
            </div>
            <p style={{ fontSize: "0.75rem", color: "#888", marginTop: "1rem", textAlign: "center" }}>
              Prices are typical ranges for Deschutes County. Final pricing depends on property size, access, vegetation density, and scope. All estimates are provided in writing after a free site assessment.
            </p>
          </div>
        </section>

        {/* ── R327 EXPLAINER ── */}
        <section
          style={{
            backgroundColor: "#1a1a1a",
            padding: "clamp(4rem, 8vw, 7rem) clamp(1.5rem, 6vw, 6rem)",
            color: "#fff",
          }}
        >
          <div style={{ maxWidth: "900px", margin: "0 auto" }}>
            <div style={{ fontSize: "0.62rem", fontWeight: 700, letterSpacing: "0.25em", color: "#e74c3c", marginBottom: "0.75rem", textTransform: "uppercase" }}>
              Understanding R327
            </div>
            <h2
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: "clamp(2rem, 4vw, 3.2rem)",
                fontWeight: 700,
                color: "#fff",
                marginBottom: "1.5rem",
                lineHeight: 1.1,
              }}
            >
              R327 Covers the House.<br />
              <em style={{ fontStyle: "italic", fontWeight: 300, color: "oklch(0.75 0.08 60)" }}>
                Newport Covers the Land.
              </em>
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "2rem" }}>
              <div>
                <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "#e74c3c", marginBottom: "0.75rem" }}>
                  What R327 Requires
                </h3>
                <p style={{ fontSize: "0.85rem", lineHeight: 1.8, color: "rgba(255,255,255,0.8)" }}>
                  The City of Bend's R327 fire hardening code (effective May 15, 2026) is a <strong>building code</strong> — it governs construction materials on new residential construction. It requires fire-resistant siding, noncombustible gutters, ember-resistant vents, and tempered windows.
                </p>
              </div>
              <div>
                <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "#e74c3c", marginBottom: "0.75rem" }}>
                  What R327 Does NOT Cover
                </h3>
                <p style={{ fontSize: "0.85rem", lineHeight: 1.8, color: "rgba(255,255,255,0.8)" }}>
                  R327 says nothing about the landscape surrounding homes. A new home built to R327 standards is still surrounded by the same juniper trees, manzanita, and dry grass that make Central Oregon properties vulnerable. If the vegetation within 30 feet ignites, the home is still at serious risk — regardless of R327 compliance.
                </p>
              </div>
              <div>
                <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "#e74c3c", marginBottom: "0.75rem" }}>
                  What's Coming Next
                </h3>
                <p style={{ fontSize: "0.85rem", lineHeight: 1.8, color: "rgba(255,255,255,0.8)" }}>
                  The Oregon Fire Marshal's Office is drafting a statewide defensible space ordinance expected for local adoption in late 2026. Project Wildfire (80+ Deschutes County communities) is actively pushing Bend, Redmond, and La Pine to adopt landscape-side codes. Properties that act now avoid rushed, more expensive compliance projects when codes take effect.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section
          style={{
            backgroundColor: "#f5f3ef",
            padding: "clamp(4rem, 8vw, 7rem) clamp(1.5rem, 6vw, 6rem)",
          }}
        >
          <div style={{ maxWidth: "800px", margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: "3rem" }}>
              <div style={{ fontSize: "0.62rem", fontWeight: 700, letterSpacing: "0.25em", color: "#c0392b", marginBottom: "0.75rem", textTransform: "uppercase" }}>
                Common Questions
              </div>
              <h2
                style={{
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  fontSize: "clamp(2rem, 4vw, 3.2rem)",
                  fontWeight: 700,
                  color: "#1a1a1a",
                }}
              >
                Firewise Landscaping FAQ
              </h2>
            </div>
            <div>
              {FAQS.map((faq, i) => (
                <div
                  key={i}
                  style={{
                    borderBottom: "1px solid #e5e5e0",
                    overflow: "hidden",
                  }}
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    aria-expanded={openFaq === i}
                    style={{
                      width: "100%",
                      textAlign: "left",
                      padding: "1.25rem 0",
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      gap: "1rem",
                    }}
                  >
                    <span style={{ fontSize: "0.92rem", fontWeight: 600, color: "#1a1a1a", lineHeight: 1.4 }}>
                      {faq.q}
                    </span>
                    <span
                      style={{
                        fontSize: "1.2rem",
                        color: "#c0392b",
                        flexShrink: 0,
                        transform: openFaq === i ? "rotate(45deg)" : "none",
                        transition: "transform 0.2s ease",
                      }}
                    >
                      +
                    </span>
                  </button>
                  {openFaq === i && (
                    <div style={{ paddingBottom: "1.25rem" }}>
                      <p style={{ fontSize: "0.85rem", lineHeight: 1.8, color: "#444", margin: 0 }}>
                        {faq.a}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── QUOTE FORM ── */}
        <section
          id="quote-form"
          style={{
            backgroundColor: "#1a3a1a",
            padding: "clamp(4rem, 8vw, 7rem) clamp(1.5rem, 6vw, 6rem)",
            color: "#fff",
          }}
        >
          <div style={{ maxWidth: "700px", margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
              <div style={{ fontSize: "0.62rem", fontWeight: 700, letterSpacing: "0.25em", color: "#a8c5a0", marginBottom: "0.75rem", textTransform: "uppercase" }}>
                Free Site Assessment
              </div>
              <h2
                style={{
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  fontSize: "clamp(2rem, 4vw, 3.2rem)",
                  fontWeight: 700,
                  color: "#fff",
                  marginBottom: "1rem",
                }}
              >
                Get Your Free Firewise Assessment
              </h2>
              <p style={{ fontSize: "0.88rem", color: "rgba(255,255,255,0.75)", lineHeight: 1.7 }}>
                We'll visit your property, assess your defensible space zones, identify high-risk vegetation, and provide a detailed written estimate — at no charge.
              </p>
            </div>

            {submitted ? (
              <div
                style={{
                  backgroundColor: "rgba(255,255,255,0.1)",
                  borderRadius: "4px",
                  padding: "2.5rem",
                  textAlign: "center",
                }}
              >
                <div style={{ fontSize: "2rem", marginBottom: "1rem" }}>✓</div>
                <h3 style={{ fontSize: "1.2rem", fontWeight: 700, color: "#fff", marginBottom: "0.75rem" }}>
                  Request Received!
                </h3>
                <p style={{ fontSize: "0.88rem", color: "rgba(255,255,255,0.8)", lineHeight: 1.7 }}>
                  We've received your request and will contact you within 1 business day to schedule your free site assessment. Check your email for a confirmation.
                </p>
                <p style={{ fontSize: "0.88rem", color: "rgba(255,255,255,0.8)", marginTop: "1rem" }}>
                  Questions? Call us at <a href={PHONE_HREF} style={{ color: "#a8c5a0", fontWeight: 700 }}>{PHONE}</a>
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1rem", marginBottom: "1rem" }}>
                  <div>
                    <label htmlFor="fw-name" style={{ display: "block", fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.12em", color: "rgba(255,255,255,0.7)", marginBottom: "0.4rem", textTransform: "uppercase" }}>
                      Full Name *
                    </label>
                    <input
                      id="fw-name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={e => setFormData(p => ({ ...p, name: e.target.value }))}
                      placeholder="Jane Smith"
                      style={{
                        width: "100%",
                        padding: "0.75rem 1rem",
                        backgroundColor: "rgba(255,255,255,0.1)",
                        border: "1px solid rgba(255,255,255,0.2)",
                        borderRadius: "2px",
                        color: "#fff",
                        fontSize: "0.88rem",
                        outline: "none",
                        boxSizing: "border-box",
                      }}
                    />
                  </div>
                  <div>
                    <label htmlFor="fw-email" style={{ display: "block", fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.12em", color: "rgba(255,255,255,0.7)", marginBottom: "0.4rem", textTransform: "uppercase" }}>
                      Email *
                    </label>
                    <input
                      id="fw-email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={e => setFormData(p => ({ ...p, email: e.target.value }))}
                      placeholder="jane@example.com"
                      style={{
                        width: "100%",
                        padding: "0.75rem 1rem",
                        backgroundColor: "rgba(255,255,255,0.1)",
                        border: "1px solid rgba(255,255,255,0.2)",
                        borderRadius: "2px",
                        color: "#fff",
                        fontSize: "0.88rem",
                        outline: "none",
                        boxSizing: "border-box",
                      }}
                    />
                  </div>
                </div>
                <div style={{ marginBottom: "1rem" }}>
                  <label htmlFor="fw-phone" style={{ display: "block", fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.12em", color: "rgba(255,255,255,0.7)", marginBottom: "0.4rem", textTransform: "uppercase" }}>
                    Phone
                  </label>
                  <input
                    id="fw-phone"
                    type="tel"
                    value={formData.phone}
                    onChange={e => setFormData(p => ({ ...p, phone: e.target.value }))}
                    placeholder="(541) 555-0100"
                    style={{
                      width: "100%",
                      padding: "0.75rem 1rem",
                      backgroundColor: "rgba(255,255,255,0.1)",
                      border: "1px solid rgba(255,255,255,0.2)",
                      borderRadius: "2px",
                      color: "#fff",
                      fontSize: "0.88rem",
                      outline: "none",
                      boxSizing: "border-box",
                    }}
                  />
                </div>
                <div style={{ marginBottom: "1.5rem" }}>
                  <label htmlFor="fw-message" style={{ display: "block", fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.12em", color: "rgba(255,255,255,0.7)", marginBottom: "0.4rem", textTransform: "uppercase" }}>
                    Property Address &amp; Notes *
                  </label>
                  <textarea
                    id="fw-message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={e => setFormData(p => ({ ...p, message: e.target.value }))}
                    placeholder="Property address, approximate lot size, any specific concerns (junipers, manzanita, etc.)"
                    style={{
                      width: "100%",
                      padding: "0.75rem 1rem",
                      backgroundColor: "rgba(255,255,255,0.1)",
                      border: "1px solid rgba(255,255,255,0.2)",
                      borderRadius: "2px",
                      color: "#fff",
                      fontSize: "0.88rem",
                      outline: "none",
                      resize: "vertical",
                      boxSizing: "border-box",
                    }}
                  />
                </div>
                <button
                  type="submit"
                  disabled={submitQuote.isPending}
                  style={{
                    width: "100%",
                    padding: "1rem 2rem",
                    backgroundColor: "#c0392b",
                    color: "#fff",
                    border: "none",
                    borderRadius: "2px",
                    fontSize: "0.78rem",
                    fontWeight: 700,
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    cursor: submitQuote.isPending ? "not-allowed" : "pointer",
                    opacity: submitQuote.isPending ? 0.7 : 1,
                  }}
                >
                  {submitQuote.isPending ? "Sending..." : "Request Free Site Assessment →"}
                </button>
                <p style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.5)", textAlign: "center", marginTop: "1rem" }}>
                  No obligation. We'll respond within 1 business day. LCB #9153.
                </p>
              </form>
            )}

            <div style={{ textAlign: "center", marginTop: "2rem" }}>
              <p style={{ fontSize: "0.82rem", color: "rgba(255,255,255,0.6)" }}>
                Prefer to call? <a href={PHONE_HREF} style={{ color: "#a8c5a0", fontWeight: 700 }}>{PHONE}</a>
              </p>
            </div>
          </div>
        </section>

      </div>
    </>
  );
}
