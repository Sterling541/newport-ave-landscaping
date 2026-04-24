import Navbar from "@/components/Navbar";
import SEO from "@/components/SEO";
import { BreadcrumbSchema, FAQSchema } from "@/components/SchemaMarkup";
import { Link } from "wouter";

export default function LandscapeLightingBend() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "oklch(0.97 0.003 0)" }}>
      <SEO
        title="Landscape Lighting Bend Oregon | Newport Ave Landscaping"
        description="Enhance your Bend home with expert landscape lighting. Discover low-voltage LED, smart controls, and Newport Ave Landscaping's 90-day plant warranty and 1-year irrigation warranty. Extend your outdoor living!"
        canonical="https://newportavelandscaping.com/resources/landscape-lighting-bend-oregon"
      />
      <BreadcrumbSchema items={[
        { name: "Home", url: "/" },
        { name: "Resources", url: "/resources" },
        { name: "Landscape Lighting", url: "/resources/landscape-lighting-bend-oregon" },
      ]} />
      <FAQSchema faqs={[
        { question: `How does Bend's climate affect landscape lighting choices?`, answer: `Bend's climate, characterized by cold winters with freeze-thaw cycles and low annual rainfall (around 11 inches), significantly impacts landscape lighting. Fixtures need to be durable and weather-resistant to withstand temperature fluctuations and occasional snow. LED lighting is particularly well-suited due to its efficiency and resilience in varying conditions.` },
        { question: `What are the best types of landscape lighting for volcanic soil in Bend?`, answer: `Volcanic soil in Bend can be challenging for traditional wiring. Low-voltage LED systems are ideal as they are easier to install and maintain in rocky terrain. Using high-quality, corrosion-resistant materials like brass or copper for fixtures ensures longevity against the elements and soil composition.` },
        { question: `How can landscape lighting enhance my home's curb appeal in Bend, Oregon?`, answer: `Thoughtfully designed landscape lighting can dramatically boost your home's curb appeal by highlighting architectural features and garden elements. It creates a warm, inviting ambiance, making your property stand out in the Bend neighborhood. This also extends the usability of your outdoor spaces into the evening hours.` },
        { question: `What maintenance is required for outdoor lighting systems in Bend's freeze-thaw cycles?`, answer: `Regular maintenance is crucial for outdoor lighting in Bend's climate Zone 6a. This includes checking for loose connections, cleaning lenses, and adjusting fixtures that may shift due to freeze-thaw cycles. Newport Avenue Landscaping offers comprehensive maintenance plans to ensure your system operates flawlessly year-round.` },
        { question: `Are there energy-efficient landscape lighting options suitable for Bend?`, answer: `Absolutely. Modern LED landscape lighting systems are highly energy-efficient, consuming significantly less power than traditional halogen bulbs. This not only reduces your electricity bills but also aligns with Bend's environmentally conscious community values. Many systems also offer smart controls for optimal energy use.` },
        { question: `Why should I choose a local company like Newport Avenue Landscaping for my lighting project in Bend?`, answer: `Choosing a local company like Newport Avenue Landscaping means working with experts who understand Bend's unique environmental challenges, from volcanic soil to harsh winters. With over 21 years in business, we provide tailored solutions that are designed to thrive in our specific climate, ensuring lasting beauty and functionality for your property.` },
      ]} />
      <Navbar />
      <div style={{ paddingTop: "204px" }}>
        {/* Hero banner */}
        <div
          className="relative flex items-center justify-center"
          style={{
            height: "380px",
            backgroundImage: "url(/manus-storage/hero-landscape-lighting-wide_fc474dee.jpg",
            backgroundSize: "cover",
            backgroundPosition: "center 50%",
          }}
        >
          <div className="absolute inset-0" style={{ backgroundColor: "oklch(0 0 0 / 0.55)" }} />
          <div className="relative text-center container">
            <p className="font-label mb-3" style={{ color: "oklch(0.72 0.12 25)", fontSize: "0.7rem", letterSpacing: "0.18em" }}>
              LANDSCAPE LIGHTING &middot; 2026
            </p>
            <h1 className="font-display text-white" style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)", maxWidth: "700px", margin: "0 auto" }}>
              Illuminate Your Bend Home: Expert Landscape Lighting Solutions
            </h1>
          </div>
        </div>

        {/* Article body */}
        <div className="container py-16 max-w-3xl mx-auto">
          <div style={{ color: "oklch(0.25 0.005 0)" }}>
            <p className="mb-6">
              As a homeowner in Bend, Oregon, you understand the unique beauty and challenges of our high desert environment. With elevations around 3,600ft and cool evenings, even in summer, maximizing your outdoor living space is key. Landscape lighting isn't just about aesthetics; it's about extending your enjoyment of your property, enhancing safety, and boosting curb appeal long after the sun sets over the Cascades. At Newport Ave Landscaping, we specialize in designing and installing custom landscape lighting systems that thrive in Central Oregon's Zone 6b climate, transforming your yard into a captivating nocturnal retreat.
            </p>

            <h2 className="font-display text-2xl mb-4" style={{ color: "oklch(0.15 0.005 0)" }}>Types of Landscape Lighting for Bend Homes</h2>
            <p className="mb-6">
              Effective landscape lighting uses a variety of techniques to highlight features, guide pathways, and create ambiance. Our designs often incorporate a blend of these styles to achieve a cohesive and stunning effect:
            </p>
            <ul className="list-disc list-inside mb-6 ml-4">
              <li className="mb-2"><strong>Path Lighting:</strong> Essential for safety and navigation, especially on uneven terrain or near water features like those along the Deschutes River. Path lights illuminate walkways and driveways, preventing trips and falls.</li>
              <li className="mb-2"><strong>Uplighting:</strong> Dramatically highlights architectural features, trees, and shrubs by placing fixtures at the base and directing light upwards. This technique adds depth and dimension to your landscape, making a statement.</li>
              <li className="mb-2"><strong>Moonlighting:</strong> Mimics the soft, natural glow of moonlight by placing fixtures high in trees and directing light downwards. This creates a gentle, dappled effect that is both beautiful and functional.</li>
              <li className="mb-2"><strong>Water Feature Lighting:</strong> For homes with ponds, fountains, or other water elements, specialized lighting can transform these features into mesmerizing focal points, adding sparkle and movement to your evening landscape.</li>
              <li className="mb-2"><strong>Accent Lighting:</strong> Used to draw attention to specific plants, sculptures, or other landscape elements, adding artistic flair and visual interest.</li>
            </ul>

            <h2 className="font-display text-2xl mb-4" style={{ color: "oklch(0.15 0.005 0)" }}>The Advantages of Low-Voltage LED Systems and Smart Controls</h2>
            <p className="mb-6">
              Modern landscape lighting has evolved significantly, and at Newport Ave Landscaping, we exclusively use low-voltage LED systems. These systems offer numerous benefits for Bend homeowners:
            </p>
            <ul className="list-disc list-inside mb-6 ml-4">
              <li className="mb-2"><strong>Energy Efficiency:</strong> LEDs consume significantly less electricity than traditional halogen bulbs, leading to substantial savings on your utility bills&mdash;a smart choice for any Central Oregon budget.</li>
              <li className="mb-2"><strong>Longevity:</strong> LED bulbs last for tens of thousands of hours, meaning fewer replacements and less maintenance, even with Bend's fluctuating temperatures.</li>
              <li className="mb-2"><strong>Durability:</strong> Designed to withstand harsh weather, LED fixtures are perfect for our high desert climate, from summer heat to winter snow.</li>
              <li className="mb-2"><strong>Smart Lighting Controls:</strong> Integrate your lighting with smart home systems for unparalleled convenience. Control brightness, color, and scheduling from your smartphone, or set up automated scenes for different occasions. Imagine your lights automatically adjusting as twilight descends over Awbrey Butte.</li>
            </ul>

            <div className="p-6 mb-6 rounded-lg" style={{ backgroundColor: "oklch(0.9 0.05 60)", borderLeft: "4px solid oklch(0.72 0.12 25)" }}>
              <h3 className="font-display text-xl mb-2" style={{ color: "oklch(0.15 0.005 0)" }}>PRO TIP: Extending Your Outdoor Living Season</h3>
              <p>
                Bend's cool evenings are perfect for enjoying your outdoor spaces, but without proper lighting, that enjoyment often ends at dusk. A well-designed landscape lighting system allows you to comfortably use your patio, deck, or garden areas well into the night, extending your outdoor living season. It creates a warm, inviting atmosphere for entertaining or simply relaxing under the stars, even when the temperature drops. Consider how lighting can transform your backyard into a year-round oasis.
              </p>
            </div>

            {/* ── MID-PAGE CTA ── */}
            <div style={{ background: "oklch(0.15 0.005 0)", padding: "2rem 1.5rem", marginBottom: "2rem", textAlign: "center" }}>
              <p style={{ fontFamily: "var(--font-label)", fontSize: "0.65rem", letterSpacing: "0.18em", color: "oklch(0.46 0.20 25)", marginBottom: "0.6rem" }}>FREE CONSULTATION · NO OBLIGATION</p>
              <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 300, color: "#fff", fontSize: "clamp(1.1rem, 2.5vw, 1.5rem)", marginBottom: "0.6rem" }}>Ready to get a free quote for landscape lighting?</h3>
              <p style={{ color: "oklch(0.72 0.005 0)", marginBottom: "1.25rem", fontSize: "0.9rem", lineHeight: 1.7 }}>LCB #9153 · 21+ years · 90-day plant warranty and 1-year irrigation warranty</p>
              <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
                <a href="/contact" className="btn-red" style={{ display: "inline-block" }}>Get My Free Quote →</a>
                <a href="tel:+15416178873" style={{ display: "inline-flex", alignItems: "center", color: "#fff", fontFamily: "var(--font-body)", fontSize: "0.9rem", fontWeight: 500, textDecoration: "none", padding: "0.6rem 1.1rem", border: "1px solid oklch(0.40 0.005 0)", borderRadius: "2px" }}>(541) 617-8873</a>
              </div>
            </div>

            <h2 className="font-display text-2xl mb-4" style={{ color: "oklch(0.15 0.005 0)" }}>Understanding Landscape Lighting Costs in Central Oregon</h2>
            <p className="mb-6">
              The cost of landscape lighting in Bend can vary widely depending on the size of your property, the complexity of the design, the number and type of fixtures, and the control system chosen. For a typical residential project in Central Oregon, homeowners can expect to invest anywhere from <strong>$3,000 to $15,000+</strong>. This range includes design, materials (fixtures, wiring, transformer), and professional installation.
            </p>
            <p className="mb-6">
              Factors influencing cost include:
            </p>
            <ul className="list-disc list-inside mb-6 ml-4">
              <li className="mb-2"><strong>Fixture Quality:</strong> Higher-quality, durable fixtures designed for our climate will have a higher upfront cost but offer superior longevity.</li>
              <li className="mb-2"><strong>Number of Fixtures:</strong> More lights mean more materials and labor.</li>
              <li className="mb-2"><strong>System Complexity:</strong> Advanced smart controls and intricate designs will increase the overall investment.</li>
              <li className="mb-2"><strong>Site Conditions:</strong> Rocky or pumice-rich soil (common in Bend) can sometimes add to installation time.</li>
            </ul>
            <p className="mb-6">
              We provide detailed, transparent quotes after an initial consultation and site assessment, ensuring you understand every aspect of your investment.
            </p>

            <h2 className="font-display text-2xl mb-4" style={{ color: "oklch(0.15 0.005 0)" }}>Why Choose Newport Ave Landscaping for Your Bend Lighting Project?</h2>
            <p className="mb-6">
              With over 21 years of experience serving Bend, Redmond, Sisters, Sunriver, and other Central Oregon communities, Newport Ave Landscaping is your trusted partner for landscape lighting. We are Licensed & Bonded (LCB #9153) and deeply familiar with the local environment, from the volcanic soil to the specific needs of homes in neighborhoods like the Old Mill District or Tetherow.
            </p>
            <p className="mb-6">
              What truly sets us apart in the Bend market is our commitment to quality and customer satisfaction, backed by our strong warranty on all landscape lighting installations. This warranty is a testament to the durability of our products and the expertise of our team, giving you peace of mind for years to come.
            </p>

            <h2 className="font-display text-2xl mb-4" style={{ color: "oklch(0.15 0.005 0)" }}>Our Design Process: Bringing Your Vision to Light</h2>
            <p className="mb-6">
              Our process is collaborative and tailored to your specific needs and property. We believe that great landscape lighting starts with a great design:
            </p>
            <ol className="list-decimal list-inside mb-6 ml-4">
              <li className="mb-2"><strong>Initial Consultation:</strong> We discuss your goals, preferences, and budget, walking through your property to identify key features and areas for illumination.</li>
              <li className="mb-2"><strong>Custom Design & Proposal:</strong> Our designers create a detailed lighting plan, often with visual renderings, showing how different lighting techniques will enhance your landscape. We provide a comprehensive proposal outlining costs and timelines.</li>
              <li className="mb-2"><strong>Professional Installation:</strong> Our skilled technicians meticulously install your low-voltage LED system, ensuring proper placement, wiring, and functionality, with minimal disruption to your existing landscape.</li>
              <li className="mb-2"><strong>System Demonstration & Adjustment:</strong> Once installed, we walk you through your new system, demonstrating its features and making any final adjustments to achieve the perfect ambiance.</li>
              <li className="mb-2"><strong>Ongoing Support:</strong> With our 90-day plant warranty and 1-year irrigation warranty and dedicated service, we're here to ensure your landscape lighting continues to perform beautifully.</li>
            </ol>

            {/* CTA BLOCK at bottom */}
            <div className="text-center mt-12 p-8 rounded-lg" style={{ backgroundColor: "oklch(0.95 0.01 0)", border: "1px solid oklch(0.85 0.01 0)" }}>
              <h3 className="font-display text-2xl mb-4" style={{ color: "oklch(0.15 0.005 0)" }}>Ready to Transform Your Bend Landscape?</h3>
              <p className="mb-6">
                Let Newport Ave Landscaping illuminate your outdoor spaces, enhance your home's beauty, and extend your enjoyment of Central Oregon's unique environment. Contact us today for a personalized consultation.
              </p>
              <Link href="/contact">
                <span className="inline-block px-8 py-3 text-lg font-semibold rounded-md text-white" style={{ backgroundColor: "oklch(0.72 0.12 25)" }}>
                  Get a Free Estimate
                </span>
              </Link>
              <p className="mt-4 text-sm" style={{ color: "oklch(0.4 0.005 0)" }}>
                Call us at <a href="tel:+15416178873" style={{ textDecoration: "underline" }}>(541) 617-8873</a>
              </p>
            </div>
          {/* ── You might also like / Related Services ── */}
            <div className="mt-12 pt-10" style={{ borderTop: "1px solid oklch(0.88 0.005 0)" }}>
              <p className="font-label mb-2" style={{ color: "oklch(0.46 0.20 25)", fontSize: "0.62rem", letterSpacing: "0.18em" }}>
                YOU MIGHT ALSO LIKE
              </p>
              <h2 className="font-display font-light mb-6" style={{ fontSize: "clamp(1.3rem, 2vw, 1.8rem)", color: "oklch(0.15 0.005 0)" }}>
                More Helpful Guides
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Link href="/resources/outdoor-lighting-cost-bend-oregon">
                  <span
                    style={{
                      display: "block",
                      padding: "1.1rem 1.25rem",
                      backgroundColor: "oklch(1 0 0)",
                      borderLeft: "3px solid oklch(0.46 0.20 25)",
                      textDecoration: "none",
                    }}
                  >
                    <div className="font-body" style={{ color: "oklch(0.22 0.008 30)", fontWeight: 600, fontSize: "0.85rem", marginBottom: "0.3rem" }}>
                      Outdoor Lighting Cost in Bend
                    </div>
                    <div className="font-body" style={{ color: "oklch(0.50 0.008 30)", fontSize: "0.75rem", fontWeight: 300, lineHeight: 1.5 }}>
                      Landscape lighting installation pricing in Bend.
                    </div>
                  </span>
                </Link>
                <Link href="/resources/fire-pit-patio-cost-bend-oregon">
                  <span
                    style={{
                      display: "block",
                      padding: "1.1rem 1.25rem",
                      backgroundColor: "oklch(1 0 0)",
                      borderLeft: "3px solid oklch(0.46 0.20 25)",
                      textDecoration: "none",
                    }}
                  >
                    <div className="font-body" style={{ color: "oklch(0.22 0.008 30)", fontWeight: 600, fontSize: "0.85rem", marginBottom: "0.3rem" }}>
                      Fire Pit & Patio Cost Guide
                    </div>
                    <div className="font-body" style={{ color: "oklch(0.50 0.008 30)", fontSize: "0.75rem", fontWeight: 300, lineHeight: 1.5 }}>
                      Budgeting for a fire pit or outdoor fireplace in Central Oregon.
                    </div>
                  </span>
                </Link>
                <Link href="/resources/paver-patio-cost-bend-oregon">
                  <span
                    style={{
                      display: "block",
                      padding: "1.1rem 1.25rem",
                      backgroundColor: "oklch(1 0 0)",
                      borderLeft: "3px solid oklch(0.46 0.20 25)",
                      textDecoration: "none",
                    }}
                  >
                    <div className="font-body" style={{ color: "oklch(0.22 0.008 30)", fontWeight: 600, fontSize: "0.85rem", marginBottom: "0.3rem" }}>
                      Paver Patio Cost in Bend
                    </div>
                    <div className="font-body" style={{ color: "oklch(0.50 0.008 30)", fontSize: "0.75rem", fontWeight: 300, lineHeight: 1.5 }}>
                      Materials, labor, and total cost for paver patios in Central Oregon.
                    </div>
                  </span>
                </Link>
              </div>
            </div>

          </div>
        </div>
      </div>
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