import React from "react";
import Navbar from "@/components/Navbar";
import { Helmet } from "react-helmet-async";
import { FAQSchema } from "@/components/SchemaMarkup";

const DefensibleSpaceBendOregon = () => {
  const faqItems = [
    {
      question: "What is defensible space and why is it important in Bend, Oregon?",
      answer: "Defensible space is the buffer you create between a building on your property and the grass, trees, shrubs, or any wildland area that surround it. In Bend and Central Oregon, it is crucial for slowing or stopping the spread of wildfire and protecting your home from embers, which ignite 90% of homes destroyed by wildfires."
    },
    {
      question: "What are the new Deschutes County fire hardening codes for 2026?",
      answer: "Effective April 1, 2026, Deschutes County implemented the R327 fire hardening code for all new construction. This includes mandatory defensible space standards, such as a 5-foot noncombustible zone around structures, and specific building materials designed to resist ignition from embers and radiant heat."
    },
    {
      question: "Which plants are highly flammable and should be removed in Central Oregon?",
      answer: "High-risk, highly flammable plants common in Central Oregon include Juniper (which contains volatile oils), Manzanita, Arborvitae, Cedar, Pine, and Spruce. These should be removed or heavily thinned, especially within 30 feet of your home."
    },
    {
      question: "What are some fire-resistant plants recommended for Bend landscaping?",
      answer: "Fire-resistant plants that thrive in Central Oregon include Yarrow, Stonecrop (Sedum), Snowberry, Currant, Aspen, Vine Maple, and various native grasses. These plants have high moisture content and do not readily ignite."
    },
    {
      question: "How does Newport Avenue Landscaping help with defensible space?",
      answer: "Unlike competitors who only offer partial services, Newport Avenue Landscaping provides full-service defensible space solutions. We handle property assessments, removal of high-risk plants like Juniper and Manzanita, irrigation upgrades, and fire-resistant replanting to ensure your property is both safe and beautiful."
    },
    {
      question: "What should I do in Zone 1 (0-30 feet from my home)?",
      answer: "In Zone 1, you should maintain well-irrigated, low-flammability plants. Ensure there is no wood mulch within 5 feet of any structure (Zone 0). Prune tree limbs to at least twice the height of surrounding understory vegetation (typically 6+ ft) to remove ladder fuels, and regularly clear pine needles and debris from roofs and gutters."
    }
  ];

  return (
    <>
      <Helmet>
        <title>Defensible Space Guide Bend Oregon | Wildfire Landscaping</title>
        <meta name="description" content="Comprehensive defensible space guide for Bend, Oregon homeowners. Learn about Zone 1, 2, and 3 requirements, fire-resistant plants, and 2026 fire codes." />
        <link rel="canonical" href="https://newportavelandscaping.com/resources/defensible-space-bend-oregon" />
        
      </Helmet>

      <Navbar />

      <main style={{ fontFamily: "system-ui, sans-serif", color: "oklch(0.38 0.008 0)", lineHeight: "1.6" }}>
        {/* Hero Section */}
        <section style={{ background: `linear-gradient(rgba(0,0,0,0.60), rgba(0,0,0,0.60)), url(https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1600&q=80) center/cover no-repeat`, color: "white", padding: "80px 20px", textAlign: "center" }}>
          <div className="container" style={{ maxWidth: "1200px", margin: "0 auto" }}>
            <nav style={{ marginBottom: "20px", fontSize: "0.9rem", color: "oklch(0.8 0 0)" }}>
              <a href="/" style={{ color: "inherit", textDecoration: "none" }}>Home</a> &gt; <a href="/resources" style={{ color: "inherit", textDecoration: "none" }}>Resources</a> &gt; Defensible Space Guide
            </nav>
            <h1 style={{ fontFamily: "var(--font-display)", fontSize: "3rem", marginBottom: "20px", color: "white" }}>
              The Ultimate Defensible Space Guide for Bend, Oregon
            </h1>
            <p style={{ fontSize: "1.2rem", maxWidth: "800px", margin: "0 auto", color: "oklch(0.9 0 0)" }}>
              Protect your home from Central Oregon wildfires with our comprehensive, zone-by-zone landscaping guide. Learn what to remove, what to plant, and how to comply with the latest Deschutes County fire codes.
            </p>
          </div>
        </section>

        {/* Introduction Section */}
        <section style={{ backgroundColor: "oklch(0.97 0.012 85)", padding: "60px 20px" }}>
          <div className="container" style={{ maxWidth: "1000px", margin: "0 auto" }}>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "2.5rem", marginBottom: "30px", color: "oklch(0.15 0.005 0)" }}>
              Why Defensible Space Matters in Central Oregon
            </h2>
            <p style={{ marginBottom: "20px", fontSize: "1.1rem" }}>
              Living in Bend, Oregon, means embracing the breathtaking beauty of the high desert and ponderosa pine forests. However, it also means living with the ever-present reality of wildfire risk. The devastating Flat Fire of 2025, which consumed over 20,000 acres and destroyed four homes near Sisters, serves as a stark reminder of how quickly wildfires can spread in our region.
            </p>
            <p style={{ marginBottom: "20px", fontSize: "1.1rem" }}>
              Creating a <strong>defensible space</strong> around your property is not just a recommendation; it is a critical necessity. Defensible space is the carefully managed buffer zone between your home and the surrounding vegetation. It is designed to slow or halt the spread of wildfire, protect your home from radiant heat, and provide a safe working area for firefighters.
            </p>
            <p style={{ marginBottom: "20px", fontSize: "1.1rem" }}>
              With the new Deschutes County R327 fire hardening code taking effect on April 1, 2026, for new construction, and the Oregon Fire Marshal drafting a defensible space ordinance for local adoption, the standards for wildfire preparedness are becoming stricter. The Project Wildfire Neighborhood Coalition, representing over 80 Deschutes County communities, is actively pushing for these vital codes to protect our neighborhoods.
            </p>
            <p style={{ fontSize: "1.1rem" }}>
              As a premier defensible space contractor in Bend, Newport Avenue Landscaping brings over 21 years of local experience to help you navigate these requirements. Unlike competitors such as Axe Contracting, Grantland Management, SafeHaven Fire, or Liberty Creek, who often only handle one aspect of the job, we provide a comprehensive, full-service approach. We don\'t just remove hazardous vegetation; we upgrade your irrigation and replant with beautiful, fire-resistant alternatives.
            </p>
          </div>
        </section>

        {/* Zone Guide Section */}
        <section style={{ backgroundColor: "oklch(1 0 0)", padding: "60px 20px" }}>
          <div className="container" style={{ maxWidth: "1000px", margin: "0 auto" }}>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "2.5rem", marginBottom: "30px", color: "oklch(0.15 0.005 0)" }}>
              The Zone-by-Zone Defensible Space Strategy
            </h2>
            <p style={{ marginBottom: "30px", fontSize: "1.1rem" }}>
              Effective firewise landscaping in Central Oregon is built around the concept of zones. By managing the vegetation and materials at specific distances from your home, you significantly reduce the risk of ignition, particularly from wind-blown embers, which are responsible for destroying 90% of homes during a wildfire.
            </p>

            <div style={{ marginBottom: "40px", padding: "30px", backgroundColor: "oklch(0.97 0.012 85)", borderRadius: "8px", borderLeft: "5px solid oklch(0.46 0.20 25)" }}>
              <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.8rem", marginBottom: "15px", color: "oklch(0.15 0.005 0)" }}>
                Zone 0: The Immediate Zone (0-5 feet)
              </h3>
              <p style={{ marginBottom: "15px" }}>
                The most critical area for home protection is the immediate 5-foot perimeter around your house, including decks and attachments. The goal here is to prevent embers from igniting materials right next to your home.
              </p>
              <ul style={{ paddingLeft: "20px", marginBottom: "0" }}>
                <li style={{ marginBottom: "10px" }}><strong>Remove:</strong> All combustible materials, including wood mulch, dead leaves, pine needles, and firewood.</li>
                <li style={{ marginBottom: "10px" }}><strong>Action:</strong> Clean gutters and roofs regularly. Ensure no branches overhang the roof.</li>
                <li><strong>Replace with:</strong> Non-combustible ground covers like gravel, crushed stone, river rock, or concrete pavers.</li>
              </ul>
            </div>

            <div style={{ marginBottom: "40px", padding: "30px", backgroundColor: "oklch(0.97 0.012 85)", borderRadius: "8px", borderLeft: "5px solid oklch(0.46 0.20 25)" }}>
              <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.8rem", marginBottom: "15px", color: "oklch(0.15 0.005 0)" }}>
                Zone 1: The Intermediate Zone (5-30 feet)
              </h3>
              <p style={{ marginBottom: "15px" }}>
                This zone focuses on creating a lean, clean, and green environment to slow fire spread and reduce radiant heat.
              </p>
              <ul style={{ paddingLeft: "20px", marginBottom: "0" }}>
                <li style={{ marginBottom: "10px" }}><strong>Planting:</strong> Use well-irrigated, low-flammability plants. Keep lawns mowed and hydrated.</li>
                <li style={{ marginBottom: "10px" }}><strong>Spacing:</strong> Ensure adequate spacing between plant beds to prevent fire from jumping.</li>
                <li><strong>Maintenance:</strong> Prune tree limbs to at least twice the height of surrounding understory brush (typically 6+ ft from ground) to eliminate \"ladder fuels\" that allow ground fires to climb into the tree canopy.</li>
              </ul>
            </div>

            <div style={{ padding: "30px", backgroundColor: "oklch(0.97 0.012 85)", borderRadius: "8px", borderLeft: "5px solid oklch(0.46 0.20 25)" }}>
              <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.8rem", marginBottom: "15px", color: "oklch(0.15 0.005 0)" }}>
                Zone 2 & 3: The Extended Zones (30-100+ feet)
              </h3>
              <p style={{ marginBottom: "15px" }}>
                The extended zones are about interrupting the fire\'s path and keeping flames smaller and on the ground.
              </p>
              <ul style={{ paddingLeft: "20px", marginBottom: "0" }}>
                <li style={{ marginBottom: "10px" }}><strong>Zone 2 (30-100 ft):</strong> Maintain well-spaced trees (no touching canopies) and low-flammability plants.</li>
                <li><strong>Zone 3 (100+ ft):</strong> Selectively prune and thin vegetation. Remove highly flammable underbrush and dead wood while maintaining a natural, healthy forest ecosystem.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Mid-Page CTA Section */}
        <section style={{ backgroundColor: "oklch(0.15 0.005 0)", color: "white", padding: "60px 20px", textAlign: "center" }}>
          <div className="container" style={{ maxWidth: "800px", margin: "0 auto" }}>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "2.5rem", marginBottom: "20px", color: "white" }}>
              Secure Your Property Before Wildfire Season
            </h2>
            <p style={{ fontSize: "1.2rem", marginBottom: "30px", color: "oklch(0.9 0 0)" }}>
              Don\'t wait until smoke is in the air. Contact Newport Avenue Landscaping for a comprehensive defensible space assessment and full-service mitigation.
            </p>
            <div style={{ display: "flex", justifyContent: "center", gap: "20px", flexWrap: "wrap" }}>
              <a href="/contact" style={{ backgroundColor: "oklch(0.46 0.20 25)", color: "white", padding: "15px 30px", textDecoration: "none", fontSize: "1.1rem", fontWeight: "bold", borderRadius: "4px", display: "inline-block" }}>
                GET MY FREE QUOTE
              </a>
              <a href="tel:541-617-8873" style={{ backgroundColor: "transparent", color: "white", border: "2px solid white", padding: "15px 30px", textDecoration: "none", fontSize: "1.1rem", fontWeight: "bold", borderRadius: "4px", display: "inline-block" }}>
                CALL (541) 617-8873
              </a>
            </div>
          </div>
        </section>

        {/* Plant Selection Section */}
        <section style={{ backgroundColor: "oklch(0.97 0.012 85)", padding: "60px 20px" }}>
          <div className="container" style={{ maxWidth: "1000px", margin: "0 auto" }}>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "2.5rem", marginBottom: "30px", color: "oklch(0.15 0.005 0)" }}>
              Choosing the Right Plants for Central Oregon
            </h2>
            <p style={{ marginBottom: "30px", fontSize: "1.1rem" }}>
              A common misconception is that a fire-safe landscape must be barren. In reality, you can have a lush, beautiful yard that is also highly resistant to wildfire. The key is selecting the right plants and placing them correctly.
            </p>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "30px", marginBottom: "40px" }}>
              <div style={{ backgroundColor: "oklch(1 0 0)", padding: "30px", borderRadius: "8px", boxShadow: "0 4px 6px rgba(0,0,0,0.05)" }}>
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem", marginBottom: "15px", color: "oklch(0.46 0.20 25)" }}>
                  High-Risk Plants to Remove
                </h3>
                <p style={{ marginBottom: "15px", fontSize: "0.95rem" }}>
                  These plants are highly flammable due to volatile oils, dry dead material accumulation, and low moisture content. They should be aggressively removed from Zones 1 and 2.
                </p>
                <ul style={{ paddingLeft: "20px" }}>
                  <li style={{ marginBottom: "8px" }}><strong>Juniper:</strong> The most dangerous in our area due to highly volatile oils.</li>
                  <li style={{ marginBottom: "8px" }}><strong>Manzanita:</strong> Burns extremely hot and fast.</li>
                  <li style={{ marginBottom: "8px" }}><strong>Arborvitae:</strong> Often planted near homes but acts as a Roman candle.</li>
                  <li style={{ marginBottom: "8px" }}><strong>Cedar, Pine, Spruce:</strong> High resin content makes them hazardous near structures.</li>
                </ul>
              </div>

              <div style={{ backgroundColor: "oklch(1 0 0)", padding: "30px", borderRadius: "8px", boxShadow: "0 4px 6px rgba(0,0,0,0.05)" }}>
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem", marginBottom: "15px", color: "oklch(0.2 0.5 140)" }}>
                  Fire-Resistant Plants to Add
                </h3>
                <p style={{ marginBottom: "15px", fontSize: "0.95rem" }}>
                  These plants have high moisture content, low sap/resin, and do not accumulate dead branches easily. They are excellent choices for Bend landscapes.
                </p>
                <ul style={{ paddingLeft: "20px" }}>
                  <li style={{ marginBottom: "8px" }}><strong>Groundcovers:</strong> Stonecrop (Sedum), Yarrow, native grasses (kept short).</li>
                  <li style={{ marginBottom: "8px" }}><strong>Shrubs:</strong> Snowberry, Currant, Red Osier Dogwood.</li>
                  <li style={{ marginBottom: "8px" }}><strong>Trees:</strong> Aspen, Vine Maple, and other deciduous trees that drop their leaves.</li>
                </ul>
              </div>
            </div>

            <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.8rem", marginBottom: "20px", color: "oklch(0.15 0.005 0)" }}>
              Defensible Space Requirements Summary
            </h3>
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", backgroundColor: "oklch(1 0 0)", boxShadow: "0 4px 6px rgba(0,0,0,0.05)" }}>
                <thead>
                  <tr style={{ backgroundColor: "oklch(0.15 0.005 0)", color: "white" }}>
                    <th style={{ padding: "15px", textAlign: "left", borderBottom: "2px solid oklch(0.46 0.20 25)" }}>Zone</th>
                    <th style={{ padding: "15px", textAlign: "left", borderBottom: "2px solid oklch(0.46 0.20 25)" }}>Distance</th>
                    <th style={{ padding: "15px", textAlign: "left", borderBottom: "2px solid oklch(0.46 0.20 25)" }}>Primary Requirements</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ borderBottom: "1px solid oklch(0.9 0 0)" }}>
                    <td style={{ padding: "15px", fontWeight: "bold" }}>Zone 0 (Immediate)</td>
                    <td style={{ padding: "15px" }}>0 - 5 ft</td>
                    <td style={{ padding: "15px" }}>No combustible materials. Use gravel/pavers. No wood mulch.</td>
                  </tr>
                  <tr style={{ borderBottom: "1px solid oklch(0.9 0 0)", backgroundColor: "oklch(0.97 0.012 85)" }}>
                    <td style={{ padding: "15px", fontWeight: "bold" }}>Zone 1 (Intermediate)</td>
                    <td style={{ padding: "15px" }}>5 - 30 ft</td>
                    <td style={{ padding: "15px" }}>Well-irrigated, fire-resistant plants. Prune tree limbs to 2x understory height (6+ ft).</td>
                  </tr>
                  <tr style={{ borderBottom: "1px solid oklch(0.9 0 0)" }}>
                    <td style={{ padding: "15px", fontWeight: "bold" }}>Zone 2 (Extended)</td>
                    <td style={{ padding: "15px" }}>30 - 100 ft</td>
                    <td style={{ padding: "15px" }}>Well-spaced trees (no touching canopies). Low-flammability plants.</td>
                  </tr>
                  <tr>
                    <td style={{ padding: "15px", fontWeight: "bold" }}>Zone 3 (Outer)</td>
                    <td style={{ padding: "15px" }}>100+ ft</td>
                    <td style={{ padding: "15px" }}>Selectively thin and prune. Remove highly flammable underbrush.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* The Newport Avenue Advantage Section */}
        <section style={{ backgroundColor: "oklch(1 0 0)", padding: "60px 20px" }}>
          <div className="container" style={{ maxWidth: "1000px", margin: "0 auto" }}>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "2.5rem", marginBottom: "30px", color: "oklch(0.15 0.005 0)" }}>
              The Newport Avenue Landscaping Advantage
            </h2>
            <p style={{ marginBottom: "20px", fontSize: "1.1rem" }}>
              Achieving true defensible space requires more than just a chainsaw. Many local companies, such as Axe Contracting or SafeHaven Fire, specialize only in the removal of hazardous trees and brush. While removal is crucial, it leaves your property bare and potentially vulnerable to erosion or invasive weeds.
            </p>
            <p style={{ marginBottom: "20px", fontSize: "1.1rem" }}>
              At Newport Avenue Landscaping, we offer a <strong>complete, full-service solution</strong>. With over 21 years of experience in Bend (LCB #9153), we understand the local climate, soil, and fire codes intimately.
            </p>
            <ul style={{ paddingLeft: "20px", marginBottom: "30px", fontSize: "1.1rem" }}>
              <li style={{ marginBottom: "10px" }}><strong>Expert Assessment:</strong> We evaluate your property against the latest Deschutes County R327 codes and upcoming Oregon Fire Marshal ordinances.</li>
              <li style={{ marginBottom: "10px" }}><strong>Safe Removal:</strong> We expertly remove high-risk vegetation like Juniper and Manzanita, ensuring proper disposal.</li>
              <li style={{ marginBottom: "10px" }}><strong>Irrigation Upgrades:</strong> Fire-resistant plants need proper hydration. We upgrade or install efficient irrigation systems to keep your Zone 1 and 2 green and safe.</li>
              <li style={{ marginBottom: "10px" }}><strong>Beautiful Replanting:</strong> We design and install stunning, fire-wise landscapes using native and adapted fire-resistant plants that enhance your property\'s value and safety.</li>
            </ul>
            <p style={{ fontSize: "1.1rem", fontWeight: "bold", color: "oklch(0.46 0.20 25)" }}>
              Don\'t settle for half a job. Choose the full-service experts who can protect your home and beautify your landscape simultaneously.
            </p>
          </div>
        </section>

        {/* FAQ Section */}
        <section style={{ backgroundColor: "oklch(0.97 0.012 85)", padding: "60px 20px" }}>
          <div className="container" style={{ maxWidth: "800px", margin: "0 auto" }}>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "2.5rem", marginBottom: "30px", color: "oklch(0.15 0.005 0)", textAlign: "center" }}>
              Frequently Asked Questions
            </h2>
            <FAQSchema faqs={faqItems} />
            <div style={{ marginTop: "40px" }}>
              {faqItems.map((faq, index) => (
                <div key={index} style={{ marginBottom: "20px", backgroundColor: "oklch(1 0 0)", padding: "20px", borderRadius: "8px", boxShadow: "0 2px 4px rgba(0,0,0,0.05)" }}>
                  <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.3rem", marginBottom: "10px", color: "oklch(0.15 0.005 0)" }}>
                    {faq.question}
                  </h3>
                  <p style={{ fontSize: "1rem", margin: "0" }}>
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section style={{ backgroundColor: "oklch(0.15 0.005 0)", color: "white", padding: "80px 20px", textAlign: "center" }}>
          <div className="container" style={{ maxWidth: "800px", margin: "0 auto" }}>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "2.5rem", marginBottom: "20px", color: "white" }}>
              Ready to Fire-Harden Your Bend Landscape?
            </h2>
            <p style={{ fontSize: "1.2rem", marginBottom: "40px", color: "oklch(0.9 0 0)" }}>
              Protect your family, your home, and your investment. Contact Newport Avenue Landscaping today for a professional defensible space assessment and full-service mitigation plan.
            </p>
            <div style={{ display: "flex", justifyContent: "center", gap: "20px", flexWrap: "wrap" }}>
              <a href="/contact" style={{ backgroundColor: "oklch(0.46 0.20 25)", color: "white", padding: "18px 40px", textDecoration: "none", fontSize: "1.2rem", fontWeight: "bold", borderRadius: "4px", display: "inline-block" }}>
                GET MY FREE QUOTE
              </a>
              <a href="tel:541-617-8873" style={{ backgroundColor: "transparent", color: "white", border: "2px solid white", padding: "18px 40px", textDecoration: "none", fontSize: "1.2rem", fontWeight: "bold", borderRadius: "4px", display: "inline-block" }}>
                CALL (541) 617-8873
              </a>
            </div>
            <p style={{ marginTop: "30px", fontSize: "0.9rem", color: "oklch(0.7 0 0)" }}>
              Licensed, Bonded, and Insured | LCB #9153 | Serving Bend and Central Oregon for over 21 years.
            </p>
          </div>
        </section>
      </main>
    </>
  );
};

export default DefensibleSpaceBendOregon;
