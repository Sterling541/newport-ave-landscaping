import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Helmet } from "react-helmet-async";

const s = {
  bg1: { background: `linear-gradient(rgba(0,0,0,0.60), rgba(0,0,0,0.60)), url(/manus-storage/maintenance-hero-bg_3219f29e_7ba0517e.webp) center/cover no-repeat`, padding: "5rem 0 3rem" },
  bg2: { background: "oklch(0.97 0.012 85)", padding: "3rem 0" },
  bg3: { background: "oklch(1 0 0)", padding: "3rem 0" },
  wrap: { maxWidth: "860px", margin: "0 auto", padding: "0 1.5rem" },
  h1: { fontFamily: "var(--font-display)", fontWeight: 300, color: "#fff", fontSize: "clamp(1.8rem, 4vw, 3rem)", lineHeight: 1.1, marginBottom: "1rem" },
  h2: { fontFamily: "var(--font-display)", fontWeight: 300, color: "oklch(0.15 0.005 0)", fontSize: "clamp(1.3rem, 2.5vw, 1.9rem)", marginBottom: "1.2rem" },
  p: { color: "oklch(0.38 0.008 0)", lineHeight: 1.8, fontWeight: 300, marginBottom: "1rem" },
  accent: { color: "oklch(0.72 0.12 25)", fontWeight: 300, fontSize: "1rem", maxWidth: "640px", lineHeight: 1.7 },
  li: { marginBottom: "0.5rem", paddingLeft: "1rem", borderLeft: "2px solid oklch(0.46 0.20 25)" },
  ul: { listStyle: "none", padding: 0, margin: "1rem 0 0" } as React.CSSProperties,
  crumb: { color: "oklch(0.72 0.12 25)", textDecoration: "none", fontFamily: "var(--font-label)", fontSize: "0.65rem", letterSpacing: "0.08em" },
  crumbSep: { color: "oklch(0.55 0.008 0)", fontFamily: "var(--font-label)", fontSize: "0.65rem" },
  cta: { display: "inline-block", background: "oklch(0.46 0.20 25)", color: "#fff", padding: "0.75rem 2rem", fontFamily: "var(--font-label)", fontSize: "0.7rem", letterSpacing: "0.1em", textDecoration: "none", marginTop: "1.5rem" },
  callout: { background: "oklch(0.46 0.20 25)", color: "#fff", padding: "1.5rem", marginBottom: "1.5rem", borderRadius: "2px" },
};

export default function BrownLawnBendOregon() {
  return (
    <div style={{ backgroundColor: "oklch(0.97 0.012 85)" }}>
      <Helmet>
        <title>Brown Lawn Bend Oregon | Why Is My Lawn Dying? How to Fix It | Newport Avenue</title>
        <meta name="description" content="Is your lawn turning brown in Bend, Oregon? Learn the 6 most common causes — drought stress, irrigation failure, fungus, grubs, and more — and how to fix each one." />
        <link rel="canonical" href="https://newportavelandscaping.com/resources/brown-lawn-bend-oregon" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: [
            {
              "@type": "Question",
              name: "Why is my lawn turning brown in Bend Oregon?",
              acceptedAnswer: { "@type": "Answer", text: "The most common causes of brown lawns in Bend are: (1) drought stress from insufficient irrigation — Bend lawns need 1–1.5 inches of water per week in summer; (2) irrigation system failure — broken heads, stuck valves, or controller programming errors; (3) lawn fungus — dollar spot and brown patch are common in Bend; (4) grub damage from crane fly larvae; (5) fertilizer burn from over-application; and (6) normal summer dormancy in unirrigated lawns. Diagnosing the cause correctly before treating is essential." }
            },
            {
              "@type": "Question",
              name: "Will a brown lawn in Bend come back?",
              acceptedAnswer: { "@type": "Answer", text: "It depends on the cause. Brown lawns caused by drought stress or summer dormancy almost always recover when watering resumes. Brown lawns caused by fungal disease, grub damage, or fertilizer burn may have dead grass that needs to be overseeded. If the crown of the grass plant (the growing point just above the soil) is still alive, the lawn will recover. If the crown is dead, those areas need reseeding. A professional diagnosis will tell you which situation you're dealing with." }
            },
            {
              "@type": "Question",
              name: "How do I know if my brown lawn is from drought or disease?",
              acceptedAnswer: { "@type": "Answer", text: "Drought stress typically causes uniform browning across the entire lawn or in areas with poor irrigation coverage. Fungal disease causes irregular brown patches with distinct edges, often with a ring pattern or tan/gray coloring at the center. Pull a handful of grass from a brown area — if the blades pull out easily with no roots attached, you likely have grub damage. If the blades are firmly rooted but brown, it's more likely drought, disease, or dormancy." }
            }
          ]
        })}</script>
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: "https://newportavelandscaping.com/" },
            { "@type": "ListItem", position: 2, name: "Resources", item: "https://newportavelandscaping.com/resources" },
            { "@type": "ListItem", position: 3, name: "Brown Lawn Bend Oregon", item: "https://newportavelandscaping.com/resources/brown-lawn-bend-oregon" }
          ]
        })}</script>
      </Helmet>
      <Navbar />

      <section style={s.bg1}>
        <div style={s.wrap}>
          <nav style={{ marginBottom: "1.5rem" }}>
            <a href="/" style={s.crumb}>Home</a>
            <span style={s.crumbSep}> / </span>
            <a href="/resources" style={s.crumb}>Resources</a>
            <span style={s.crumbSep}> / Brown Lawn Bend Oregon</span>
          </nav>
          <p style={{ ...s.accent, marginBottom: "0.75rem" }}>LAWN CARE GUIDE · BEND, OREGON</p>
          <h1 style={s.h1}>Why Is My Lawn Turning Brown in Bend?</h1>
          <p style={s.accent}>
            A brown lawn in Bend can have six different causes — and the fix is completely different for each one. Here's how to diagnose what's actually happening and what to do about it.
          </p>
        </div>
      </section>

      <section style={s.bg2}>
        <div style={s.wrap}>
          <h2 style={s.h2}>The 6 Most Common Causes of Brown Lawns in Bend</h2>
          <p style={s.p}>Bend's high-desert climate creates a specific set of lawn stress conditions that differ from wetter parts of Oregon. Before treating a brown lawn, you need to correctly identify the cause — applying fungicide to a drought-stressed lawn won't help, and increasing irrigation on a fungal-infected lawn will make it worse.</p>

          <div style={s.callout}>
            <strong style={{ fontFamily: "var(--font-label)", fontSize: "0.7rem", letterSpacing: "0.08em" }}>QUICK DIAGNOSIS GUIDE</strong>
            <p style={{ color: "#fff", marginTop: "0.5rem", marginBottom: 0, lineHeight: 1.7, fontWeight: 300 }}>
              Uniform browning across entire lawn → likely drought stress or irrigation failure<br />
              Irregular brown patches with distinct edges → likely fungal disease<br />
              Spongy, easily-pulled grass with no roots → likely grub damage<br />
              Striped or geometric brown patterns → likely irrigation coverage gaps<br />
              Bright yellow-green then brown near edges → likely fertilizer burn<br />
              Entire lawn brown but not dead → likely summer dormancy
            </p>
          </div>
        </div>
      </section>

      <section style={s.bg3}>
        <div style={s.wrap}>
          <h2 style={s.h2}>Cause 1: Drought Stress and Insufficient Irrigation</h2>
          <p style={s.p}>The most common cause of brown lawns in Bend is simply not enough water. Bend receives less than 1 inch of rainfall from June through September — essentially zero summer precipitation. Kentucky bluegrass, the dominant lawn grass in Bend, requires 1–1.5 inches of supplemental irrigation per week to stay green through summer.</p>
          <p style={s.p}>Drought stress causes grass to turn a dull blue-gray color before browning. You'll notice footprints remaining visible in the lawn long after walking on it — a classic sign of drought stress. The grass is not dead; it's dormant and will recover when watering resumes, though repeated drought cycles weaken the stand over time.</p>
          <p style={s.p}><strong>Fix:</strong> Increase irrigation frequency and duration. Run each zone long enough to deliver 0.5–0.75 inches per watering, 2–3 times per week. Check your controller programming and verify all zones are running correctly.</p>
        </div>
      </section>

      <section style={s.bg2}>
        <div style={s.wrap}>
          <h2 style={s.h2}>Cause 2: Irrigation System Failure</h2>
          <p style={s.p}>Even homeowners with irrigation systems can end up with brown lawns when the system isn't working properly. Common failures include broken or clogged sprinkler heads that aren't delivering water to their intended area, stuck or failed zone valves that prevent entire zones from running, controller programming errors after power outages or battery changes, and backflow preventer failures that reduce system pressure.</p>
          <p style={s.p}>Irrigation failures often produce geometric brown patterns that match the coverage area of a specific zone or head — a telltale sign that the problem is mechanical rather than biological.</p>
          <p style={s.p}><strong>Fix:</strong> Run each zone manually and walk the coverage area to identify missing or misdirected heads. Check the controller display for error codes. If you can't identify the problem, a professional irrigation diagnostic visit ($140/tech hour) will find it quickly.</p>
          <a href="/services/sprinkler-repair" style={s.cta}>SCHEDULE SPRINKLER REPAIR →</a>
        </div>
      </section>

      <section style={s.bg3}>
        <div style={s.wrap}>
          <h2 style={s.h2}>Cause 3: Lawn Fungus</h2>
          <p style={s.p}>Lawn fungal diseases are common in Bend, particularly during warm, humid periods in late spring and early fall. The most common fungal diseases in Central Oregon are dollar spot (small, silver-dollar-sized brown spots), brown patch (large irregular brown rings, common in hot weather), and rust (orange-yellow powder on grass blades).</p>
          <p style={s.p}>Fungal disease is distinguished from drought stress by its pattern — irregular patches with distinct edges rather than uniform browning. Dollar spot patches are typically 2–6 inches in diameter and may have a white, cobweb-like mycelium visible in early morning. Brown patch creates large rings that can be several feet in diameter.</p>
          <p style={s.p}><strong>Fix:</strong> Reduce irrigation frequency (water deeply but less often), improve air circulation by dethatching if thatch exceeds 0.5 inches, and apply a targeted fungicide. Newport Avenue offers professional lawn fungus diagnosis and treatment.</p>
          <a href="/services/lawn-fungus" style={s.cta}>LEARN ABOUT FUNGUS TREATMENT →</a>
        </div>
      </section>

      <section style={s.bg2}>
        <div style={s.wrap}>
          <h2 style={s.h2}>Cause 4: Grub Damage</h2>
          <p style={s.p}>Crane fly larvae (leatherjackets) are the most common lawn grub in Central Oregon. They feed on grass roots just below the soil surface, causing irregular brown patches that feel spongy underfoot. The key diagnostic test: grab a handful of grass from a brown area and pull. If the grass lifts easily like a loose carpet with no roots attached, you have grub damage.</p>
          <p style={s.p}>Crane fly adults lay eggs in late summer; the larvae hatch and feed through fall, overwinter in the soil, and resume feeding in spring. Damage is most visible in spring and early summer.</p>
          <p style={s.p}><strong>Fix:</strong> Apply a targeted grub control product in late summer (August–September) to kill larvae before they establish. Heavily damaged areas will need to be overseeded after treatment.</p>
        </div>
      </section>

      <section style={s.bg3}>
        <div style={s.wrap}>
          <h2 style={s.h2}>Cause 5: Fertilizer Burn</h2>
          <p style={s.p}>Applying too much nitrogen fertilizer, or applying it to dry grass, causes fertilizer burn — bright yellow-green streaks or patches that quickly turn brown. This is most common when granular fertilizer is applied unevenly or when a spreader is stopped mid-application, leaving a concentrated deposit in one spot.</p>
          <p style={s.p}><strong>Fix:</strong> Water the affected area heavily for several days to dilute and flush the excess fertilizer. Mildly burned grass will recover; severely burned areas may need overseeding. Always apply fertilizer to moist (not wet) grass and water in immediately after application.</p>
        </div>
      </section>

      <section style={s.bg2}>
        <div style={s.wrap}>
          <h2 style={s.h2}>Cause 6: Normal Summer Dormancy</h2>
          <p style={s.p}>If you have an unirrigated lawn or have reduced watering significantly, your Kentucky bluegrass lawn will go dormant and turn brown in summer. This is a normal survival mechanism — the grass is not dead, just conserving energy. A dormant lawn will recover when regular watering resumes, though it may take 2–4 weeks to green up fully.</p>
          <p style={s.p}>The risk of intentional dormancy is that repeated cycles weaken the stand over time, and dormant lawns are more vulnerable to weed invasion and disease. If you want a green lawn through Bend's summers, consistent irrigation is not optional.</p>
          <ul style={s.ul}>
            <li style={s.li}>Dormant grass: blades are brown but firmly rooted, no unusual patches</li>
            <li style={s.li}>Recovery time after resuming irrigation: 2–4 weeks</li>
            <li style={s.li}>Risk: weeds establish in dormant turf; overseed in fall to thicken stand</li>
          </ul>
        </div>
      </section>

      <section style={s.bg3}>
        <div style={s.wrap}>
          <h2 style={s.h2}>When to Call a Professional</h2>
          <p style={s.p}>If you've checked your irrigation system, adjusted watering, and the brown patches are still spreading — or if you're seeing unusual patterns, colors, or textures — it's time for a professional diagnosis. Misidentifying the cause and applying the wrong treatment wastes money and can make the problem worse.</p>
          <p style={s.p}>Newport Avenue Landscaping offers professional lawn diagnosis and treatment throughout Bend, Redmond, Sisters, and all of Central Oregon. We'll identify the cause, recommend the correct treatment, and restore your lawn to health.</p>
          <a href="/contact" style={s.cta}>SCHEDULE A LAWN DIAGNOSIS →</a>
        </div>
      </section>

      <section style={{ background: "oklch(0.15 0.005 0)", padding: "3rem 0" }}>
        <div style={{ ...s.wrap, textAlign: "center" as const }}>
          <p style={{ color: "oklch(0.72 0.12 25)", fontFamily: "var(--font-label)", fontSize: "0.65rem", letterSpacing: "0.1em", marginBottom: "0.75rem" }}>LAWN CARE · BEND, OREGON</p>
          <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 300, color: "#fff", fontSize: "clamp(1.5rem, 3vw, 2.2rem)", marginBottom: "1rem" }}>Get Your Lawn Back to Green</h2>
          <p style={{ color: "oklch(0.72 0.12 25)", fontWeight: 300, maxWidth: "520px", margin: "0 auto 1.5rem", lineHeight: 1.7 }}>Newport Avenue Landscaping provides professional lawn care, fungus treatment, irrigation repair, and overseeding throughout Central Oregon. We'll diagnose the problem and fix it right.</p>
          <a href="/contact" style={s.cta}>GET A FREE ESTIMATE →</a>
        </div>
      </section>

      <Footer />
      {/* ── Pricing Disclaimer ── */}
      <section style={{ background: "oklch(0.13 0.005 0)", padding: "1.25rem 0" }}>
        <div style={{ maxWidth: "860px", margin: "0 auto", padding: "0 1.5rem" }}>
          <p style={{ color: "oklch(0.50 0.008 0)", fontSize: "0.70rem", lineHeight: 1.6, fontWeight: 300, margin: 0 }}>
            <strong style={{ color: "oklch(0.62 0.008 0)", fontWeight: 500 }}>Pricing Disclaimer:</strong> All prices shown are typical market ranges for general planning purposes only and do not constitute a binding quote or guarantee of cost. Actual costs depend on site conditions, property size, scope of work, and materials. Advertised flat rates are firm as stated. All other estimates require a free on-site assessment. <a href="/contact" style={{ color: "oklch(0.72 0.12 25)", textDecoration: "underline" }}>Contact us for a written estimate.</a>
          </p>
        </div>
      </section>
    </div>
  );
}
