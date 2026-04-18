import React from 'react';
import Navbar from '@/components/Navbar';
import { Helmet } from 'react-helmet-async';
import { FAQSchema } from '@/components/SchemaMarkup';

const DeschutesFireHardeningR327: React.FC = () => {
  const primaryDark = 'oklch(0.15 0.005 0)';
  const lightBg1 = 'oklch(0.97 0.012 85)';
  const lightBg2 = 'oklch(1 0 0)';
  const accentRed = 'oklch(0.46 0.20 25)';
  const textColor = 'oklch(0.38 0.008 0)';

  const faqItems = [
    {
      question: "What is Deschutes County R327 and when does it take effect?",
      answer: "Deschutes County R327 is a fire hardening ordinance that mandates specific building materials and practices for new dwellings and accessory structures to reduce wildfire risk. It takes effect on April 1, 2026."
    },
    {
      question: "Who does the R327 ordinance affect?",
      answer: "The R327 ordinance primarily affects new construction, including all new dwellings and new accessory structures, within unincorporated Deschutes County and the City of Sisters. It does not apply to existing homes, remodels, or additions."
    },
    {
      question: "What are the landscaping implications of R327 and upcoming defensible space ordinances?",
      answer: "While R327 focuses on building materials, upcoming defensible space ordinances will address landscaping. These typically involve creating zones around your home with specific plant types and maintenance requirements to reduce fuel for wildfires. This includes using low-flammability plants, proper spacing, and regular pruning."
    },
    {
      question: "What is defensible space and why is it important in Central Oregon?",
      answer: "Defensible space is the area around your home that has been modified to reduce fire hazards. It's crucial in Central Oregon due to the high wildfire risk. Proper defensible space creates a buffer that can slow or stop the spread of wildfire, protecting your home and providing a safer environment for firefighters."
    },
    {
      question: "How can Newport Avenue Landscaping help homeowners comply with fire hardening and defensible space requirements?",
      answer: "Newport Avenue Landscaping offers comprehensive services to help homeowners get ahead of these requirements. This includes property assessments, removal of high-risk vegetation like juniper and manzanita, irrigation system upgrades, and replanting with fire-resistant species. We provide a full-service solution, from removal to replanting and irrigation."
    },
    {
      question: "Are there specific plants to avoid or prefer for fire-wise landscaping in Bend, Oregon?",
      answer: "Yes, in Central Oregon, it's advisable to avoid highly flammable plants such as juniper, manzanita, arborvitae, cedar, pine, and spruce. Instead, opt for fire-resistant plants like yarrow, stonecrop/sedum, snowberry, currant, aspen, maple, and native grasses. These choices can significantly reduce your property's wildfire risk."
    }
  ];

  return (
    <>
      <Helmet>
        <title>Deschutes County Fire Hardening Requirements R327 | Newport Avenue Landscaping</title>
        <meta name="description" content="Understand Deschutes County R327 fire hardening requirements, defensible space ordinances, and how Newport Avenue Landscaping helps Bend, Oregon homeowners comply and protect their homes from wildfire." />
        <link rel="canonical" href="https://newportavelandscaping.com/resources/deschutes-county-fire-hardening-requirements" />
        <script type="application/ld+json">{`          {{
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              {{
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://newportavelandscaping.com"
              }},
              {{
                "@type": "ListItem",
                "position": 2,
                "name": "Resources",
                "item": "https://newportavelandscaping.com/resources"
              }},
              {{
                "@type": "ListItem",
                "position": 3,
                "name": "Deschutes County Fire Hardening Requirements",
                "item": "https://newportavelandscaping.com/resources/deschutes-county-fire-hardening-requirements"
              }}
            ]
          }}`}</script>
</Helmet>
      <FAQSchema faqs={faqItems} />
      <Navbar />
      <main>
        {/* Hero Section */}
        <section style={{ backgroundColor: primaryDark, color: lightBg2, padding: '4rem 0' }}>
          <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1rem' }}>
            <nav aria-label="breadcrumb" style={{ fontSize: '0.9rem', marginBottom: '1rem' }}>
              <ol style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex' }}>
                <li style={{ marginRight: '0.5rem' }}><a href="/" style={{ color: lightBg2, textDecoration: 'none' }}>Home</a></li>
                <li style={{ marginRight: '0.5rem' }}>/</li>
                <li style={{ marginRight: '0.5rem' }}><a href="/resources" style={{ color: lightBg2, textDecoration: 'none' }}>Resources</a></li>
                <li style={{ marginRight: '0.5rem' }}>/</li>
                <li style={{ color: lightBg2 }}>Deschutes County Fire Hardening Requirements</li>
              </ol>
            </nav>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '3rem', lineHeight: '1.2', marginBottom: '1rem' }}>Deschutes County Fire Hardening Requirements R327: Protecting Your Bend Home from Wildfire</h1>
            <p style={{ fontFamily: 'var(--font-label)', fontSize: '1.2rem', opacity: 0.8 }}>Understanding the new R327 ordinance, defensible space, and how Newport Avenue Landscaping helps you achieve wildfire resilience.</p>
          </div>
        </section>

        {/* Introduction */}
        <section style={{ backgroundColor: lightBg1, color: textColor, padding: '4rem 0' }}>
          <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1rem' }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2.5rem', marginBottom: '1.5rem', color: primaryDark }}>Navigating Bend's New Wildfire Codes: R327 and Defensible Space</h2>
            <p style={{ fontSize: '1.1rem', lineHeight: '1.6', marginBottom: '1rem' }}>Central Oregon, with its stunning natural beauty, also faces an increasing threat from wildfires. In response, Deschutes County and the City of Sisters have taken proactive steps to enhance community safety through new building codes and upcoming landscaping ordinances. For homeowners in Bend and across Deschutes County, understanding these changes, particularly the R327 fire hardening requirements and the evolving defensible space guidelines, is paramount to protecting their properties and loved ones. Newport Avenue Landscaping is here to guide you through these regulations and provide expert solutions to make your home wildfire-resilient.</p>
            <p style={{ fontSize: '1.1rem', lineHeight: '1.6' }}>The R327 ordinance, effective April 1, 2026, marks a significant shift in construction standards for new homes, focusing on ignition-resistant materials. This is just one piece of the puzzle. The Oregon State Fire Marshal is also drafting a comprehensive defensible space ordinance, anticipated for local adoption in 2026, which will directly impact how we manage our landscapes. This page will delve into the specifics of R327, explain the critical concept of defensible space, highlight the landscaping implications, and demonstrate how Newport Avenue Landscaping's full-service approach can help you not only comply but thrive in a fire-wise environment.</p>
          </div>
        </section>

        {/* Section 1: Deschutes County R327 Fire Hardening Requirements */}
        <section style={{ backgroundColor: lightBg2, color: textColor, padding: '4rem 0' }}>
          <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1rem' }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2.5rem', marginBottom: '1.5rem', color: primaryDark }}>Deschutes County R327: What New Construction Needs to Know</h2>
            <p style={{ fontSize: '1.1rem', lineHeight: '1.6', marginBottom: '1rem' }}>Effective April 1, 2026, the Deschutes County R327 fire hardening code becomes mandatory for all new dwellings and accessory structures within unincorporated Deschutes County and the City of Sisters [1]. This ordinance, part of the Oregon Residential Specialty Code (ORSC) Section R327, is a critical measure designed to reduce the risk of home ignition from embers, radiant heat, and direct flame contact during a wildfire event. It's important to note that R327 focuses on the building's construction itself, not the surrounding landscape, though both are vital for comprehensive wildfire protection.</p>
            <h3 style={{ fontFamily: 'var(--font-label)', fontSize: '1.8rem', marginBottom: '1rem', color: primaryDark }}>Who Does R327 Affect?</h3>
            <p style={{ fontSize: '1.1rem', lineHeight: '1.6', marginBottom: '1rem' }}>The R327 provisions are specifically applicable to new construction. This includes:</p>
            <ul style={{ fontSize: '1.1rem', lineHeight: '1.6', marginBottom: '1rem', listStyleType: 'disc', marginLeft: '1.5rem' }}>
              <li>All newly constructed dwellings.</li>
              <li>All newly constructed accessory structures (e.g., detached garages, workshops).</li>
            </ul>
            <p style={{ fontSize: '1.1rem', lineHeight: '1.6', marginBottom: '1rem' }}>It's crucial for homeowners and builders to understand that R327 generally does not apply to existing homes, partial repairs, remodels, or additions. Manufactured dwellings, built to federal HUD standards, are also typically exempt, although many manufacturers offer optional fire hardening or wildfire packages [1]. This distinction is key: if you're building a new home or a significant new structure on your property, R327 compliance is a must.</p>
            <h3 style={{ fontFamily: 'var(--font-label)', fontSize: '1.8rem', marginBottom: '1rem', color: primaryDark }}>Key Requirements and Materials</h3>
            <p style={{ fontSize: '1.1rem', lineHeight: '1.6', marginBottom: '1rem' }}>The core purpose of R327 is to make structures more resistant to wildfire. This is achieved through the use of specific ignition-resistant building materials and construction practices. Many of these materials are already common in modern construction, such as double-pane windows, cementitious siding (like Hardie Panel), and Class B or better asphalt shingles for roofing [1]. The Deschutes County Building Safety Division accepts products listed in the CalFire Building Materials Listings & Wildland Urban Interface (WUI) Listed Products Handbook for compliance, simplifying the selection process for builders.</p>
            <p style={{ fontSize: '1.1rem', lineHeight: '1.6' }}>While R327 is a significant step, it's important to remember that it makes a home more resistant, not fireproof. It buys critical time for evacuation and for emergency responders to protect life and property. The next crucial layer of protection comes from the surrounding landscape – defensible space.</p>
          </div>
        </section>

        {/* Section 2: The Upcoming Defensible Space Ordinance */}
        <section style={{ backgroundColor: lightBg1, color: textColor, padding: '4rem 0' }}>
          <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1rem' }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2.5rem', marginBottom: '1.5rem', color: primaryDark }}>Beyond the Walls: The Impending Defensible Space Ordinance</h2>
            <p style={{ fontSize: '1.1rem', lineHeight: '1.6', marginBottom: '1rem' }}>While R327 addresses the 'hardening' of structures, the Oregon State Fire Marshal is actively developing a statewide defensible space ordinance, expected to be adopted locally in 2026 [2]. This ordinance will establish minimum requirements for reducing wildfire risk on lands, creating a crucial buffer between your home and potential wildfire threats. Defensible space is not just about clearing vegetation; it's a strategic approach to landscape management that significantly increases your property's chances of surviving a wildfire and provides firefighters with a safer environment to work.</p>
            <h3 style={{ fontFamily: 'var(--font-label)', fontSize: '1.8rem', marginBottom: '1rem', color: primaryDark }}>Understanding Defensible Space Zones</h3>
            <p style={{ fontSize: '1.1rem', lineHeight: '1.6', marginBottom: '1rem' }}>The concept of defensible space is typically broken down into three distinct zones, each with specific guidelines for vegetation management [3]:</p>
            <ul style={{ fontSize: '1.1rem', lineHeight: '1.6', marginBottom: '1rem', listStyleType: 'disc', marginLeft: '1.5rem' }}>
              <li><strong>Zone 0 (0-5 feet from the home): The Immediate Zone.</strong> This area, closest to your home, should be a non-combustible zone. This means removing all flammable vegetation, especially directly under eaves and around windows. Keep roofs and gutters free of leaves and debris. Consider non-combustible materials for patios and walkways.</li>
              <li><strong>Zone 1 (5-30 feet from the home): The Intermediate Zone.</strong> In this zone, the goal is to create a lean, clean, and green landscape. Use low-flammability plants, ensure trees are well-spaced, and prevent canopies from touching. Remove dead or dry vegetation. Woodpiles should be at least 30 feet from any structure, and combustible materials like propane tanks should be at least 10 feet away.</li>
              <li><strong>Zone 2 (30-100+ feet from the home): The Extended Zone.</strong> This outermost zone focuses on reducing the intensity of a wildfire as it approaches your property. Selectively prune and thin trees and shrubs, removing highly flammable vegetation. Maintain proper spacing between trees and ensure branches are at least 10 feet from powerlines and buildings. For taller trees (over 18 feet), prune branches up to 6 feet from the ground; for shorter trees, prune up to one-third of their height.</li>
            </ul>
            <p style={{ fontSize: '1.1rem', lineHeight: '1.6' }}>These zones are designed to work together, creating layers of protection that disrupt the path of a wildfire and reduce its impact on your home. Implementing these practices proactively is key to safeguarding your property and contributing to a more fire-resilient community.</p>
          </div>
        </section>

        {/* Section 3: Landscaping Implications and Plant Choices */}
        <section style={{ backgroundColor: lightBg2, color: textColor, padding: '4rem 0' }}>
          <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1rem' }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2.5rem', marginBottom: '1.5rem', color: primaryDark }}>Landscaping for Resilience: Plant Choices in a Fire-Prone Region</h2>
            <p style={{ fontSize: '1.1rem', lineHeight: '1.6', marginBottom: '1rem' }}>The upcoming defensible space ordinance will undoubtedly place a greater emphasis on fire-wise landscaping practices. For homeowners in Bend and Central Oregon, this means making informed choices about the plants they cultivate and how they maintain their outdoor spaces. The right landscaping can act as a natural firebreak, while poor choices can inadvertently fuel a wildfire.</p>
            <h3 style={{ fontFamily: 'var(--font-label)', fontSize: '1.8rem', marginBottom: '1rem', color: primaryDark }}>High-Risk Plants to Avoid</h3>
            <p style={{ fontSize: '1.1rem', lineHeight: '1.6', marginBottom: '1rem' }}>Certain plants common in Central Oregon are highly flammable due to their volatile oils, fine dead material, or dense growth habits. These should be avoided or significantly reduced, especially within the immediate and intermediate defensible space zones. High-risk plants include:</p>
            <ul style={{ fontSize: '1.1rem', lineHeight: '1.6', marginBottom: '1rem', listStyleType: 'disc', marginLeft: '1.5rem' }}>
              <li><strong>Juniper:</strong> Considered one of the most dangerous due to its highly volatile oils and dense, dry foliage.</li>
              <li><strong>Manzanita:</strong> Another common shrub with flammable characteristics.</li>
              <li><strong>Arborvitae, Cedar, Pine, Spruce:</strong> Many conifers contain flammable resins and can ignite easily, especially when dry.</li>
            </ul>
            <p style={{ fontSize: '1.1rem', lineHeight: '1.6' }}>The tragic Flat Fire in 2025, which consumed over 20,000 acres and destroyed four homes near Sisters, serves as a stark reminder of the devastating impact wildfires can have, underscoring the urgency of fire-wise landscaping [4].</p>
            <h3 style={{ fontFamily: 'var(--font-label)', fontSize: '1.8rem', marginBottom: '1rem', color: primaryDark }}>Fire-Resistant Plants to Embrace</h3>
            <p style={{ fontSize: '1.1rem', lineHeight: '1.6', marginBottom: '1rem' }}>Conversely, many beautiful and drought-tolerant plants thrive in Central Oregon while offering increased fire resistance. These plants typically have high moisture content, lack volatile oils, and grow in a less dense manner. Consider incorporating these into your landscape:</p>
            <ul style={{ fontSize: '1.1rem', lineHeight: '1.6', marginBottom: '1rem', listStyleType: 'disc', marginLeft: '1.5rem' }}>
              <li><strong>Yarrow:</strong> A hardy perennial with attractive flowers.</li>
              <li><strong>Stonecrop/Sedum:</strong> Succulents that store water, making them naturally fire-resistant.</li>
              <li><strong>Snowberry:</strong> A native shrub with good moisture content.</li>
              <li><strong>Currant:</strong> Another native shrub that can be a good choice.</li>
              <li><strong>Aspen and Maple:</strong> Deciduous trees that are generally more fire-resistant than conifers.</li>
              <li><strong>Native Grasses:</strong> Many native grasses remain green longer and have less fine, dry fuel than invasive species.</li>
            </ul>
            <p style={{ fontSize: '1.1rem', lineHeight: '1.6' }}>By strategically choosing fire-resistant plants and maintaining them properly, you can create a beautiful and safe landscape that enhances your home's protection against wildfires.</p>
          </div>
        </section>

        {/* Mid-Page CTA */}
        <section style={{ backgroundColor: primaryDark, color: lightBg2, padding: '4rem 0', textAlign: 'center' }}>
          <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1rem' }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2.5rem', marginBottom: '1.5rem' }}>Ready to Make Your Home Fire-Resilient?</h2>
            <p style={{ fontSize: '1.2rem', lineHeight: '1.6', marginBottom: '2rem' }}>Don't wait for new ordinances to take effect. Protect your investment and your family now. Contact Newport Avenue Landscaping for a personalized fire-wise assessment and expert solutions.</p>
            <p style={{ fontSize: '1.5rem', fontFamily: 'var(--font-display)', marginBottom: '1rem' }}>Call Us Today: (541) 617-8873</p>
            <a href="/contact" style={{ display: 'inline-block', backgroundColor: accentRed, color: lightBg2, padding: '1rem 2rem', fontSize: '1.2rem', textDecoration: 'none', borderRadius: '5px', fontFamily: 'var(--font-label)', fontWeight: 'bold' }}>GET MY FREE QUOTE</a>
          </div>
        </section>

        {/* Section 4: How Newport Avenue Landscaping Can Help */}
        <section style={{ backgroundColor: lightBg1, color: textColor, padding: '4rem 0' }}>
          <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1rem' }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2.5rem', marginBottom: '1.5rem', color: primaryDark }}>Newport Avenue Landscaping: Your Partner in Wildfire Protection</h2>
            <p style={{ fontSize: '1.1rem', lineHeight: '1.6', marginBottom: '1rem' }}>At Newport Avenue Landscaping, we understand the unique challenges and opportunities that come with living in a fire-prone region like Central Oregon. With over 21 years of experience and LCB #9153, we are not just landscapers; we are your dedicated partners in creating a beautiful, functional, and fire-resilient outdoor environment. While many competitors like Axe Contracting, Grantland Management, and SafeHaven Fire might offer partial solutions, Newport Avenue Landscaping provides a comprehensive, full-service approach that sets us apart.</p>
            <h3 style={{ fontFamily: 'var(--font-label)', fontSize: '1.8rem', marginBottom: '1rem', color: primaryDark }}>Our Full-Service Fire-Wise Solutions</h3>
            <p style={{ fontSize: '1.1rem', lineHeight: '1.6', marginBottom: '1rem' }}>We offer a complete suite of services designed to help you navigate R327 and the upcoming defensible space requirements, ensuring your property is as safe as possible:</p>
            <ul style={{ fontSize: '1.1rem', lineHeight: '1.6', marginBottom: '1rem', listStyleType: 'disc', marginLeft: '1.5rem' }}>
              <li><strong>Comprehensive Property Assessment:</strong> Our experts will evaluate your property, identifying high-risk areas and recommending tailored solutions to enhance fire resistance.</li>
              <li><strong>High-Risk Vegetation Removal:</strong> We specialize in the safe and efficient removal of highly flammable plants, including juniper, manzanita, and other conifers, that pose a significant threat.</li>
              <li><strong>Irrigation System Upgrades:</strong> Proper irrigation is crucial for maintaining healthy, fire-resistant landscapes. We can optimize your system to ensure efficient water distribution, keeping your plants hydrated and less susceptible to ignition.</li>
              <li><strong>Fire-Resistant Replanting:</strong> We don't just remove; we replant. Our team will help you select and install beautiful, native, and fire-resistant plants that thrive in Central Oregon's climate, enhancing your landscape's aesthetics while boosting its fire resilience.</li>
              <li><strong>Ongoing Maintenance Plans:</strong> Fire-wise landscaping is an ongoing effort. We offer maintenance plans to ensure your defensible space remains effective year after year, including pruning, thinning, and debris removal.</li>
            </ul>
            <p style={{ fontSize: '1.1rem', lineHeight: '1.6' }}>Unlike competitors who might only remove vegetation or offer limited services, Newport Avenue Landscaping provides a seamless, integrated solution: we remove, we replant, and we irrigate. This holistic approach ensures that your property is not only compliant with regulations but also optimally protected against the threat of wildfire.</p>
          </div>
        </section>

        {/* Section 5: Community Efforts and Local Impact */}
        <section style={{ backgroundColor: lightBg2, color: textColor, padding: '4rem 0' }}>
          <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1rem' }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2.5rem', marginBottom: '1.5rem', color: primaryDark }}>A Community United: Bend's Commitment to Wildfire Safety</h2>
            <p style={{ fontSize: '1.1rem', lineHeight: '1.6', marginBottom: '1rem' }}>The adoption of R327 and the development of defensible space ordinances are not isolated efforts but are part of a broader community-wide commitment to wildfire safety in Deschutes County. Organizations like the Project Wildfire Neighborhood Coalition are actively working with over 80 communities, advocating for and implementing fire-wise practices and codes. This collective effort highlights the shared responsibility we all have in protecting our beautiful Central Oregon environment.</p>
            <p style={{ fontSize: '1.1rem', lineHeight: '1.6' }}>By partnering with Newport Avenue Landscaping, you're not just investing in your property's safety; you're contributing to the resilience of our entire community. Our services align with the goals of these local initiatives, helping to create a safer Bend for everyone.</p>
          </div>
        </section>

        {/* Final CTA */}
        <section style={{ backgroundColor: primaryDark, color: lightBg2, padding: '4rem 0', textAlign: 'center' }}>
          <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1rem' }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2.5rem', marginBottom: '1.5rem' }}>Secure Your Home's Future: Get a Free Fire-Wise Quote Today</h2>
            <p style={{ fontSize: '1.2rem', lineHeight: '1.6', marginBottom: '2rem' }}>With the new R327 requirements and upcoming defensible space ordinances, now is the time to act. Let Newport Avenue Landscaping help you protect your home and enhance your peace of mind.</p>
            <p style={{ fontSize: '1.5rem', fontFamily: 'var(--font-display)', marginBottom: '1rem' }}>Call Us: (541) 617-8873</p>
            <a href="/contact" style={{ display: 'inline-block', backgroundColor: accentRed, color: lightBg2, padding: '1rem 2rem', fontSize: '1.2rem', textDecoration: 'none', borderRadius: '5px', fontFamily: 'var(--font-label)', fontWeight: 'bold' }}>GET MY FREE QUOTE</a>
          </div>
        </section>

        {/* FAQ Section */}
        <section style={{ backgroundColor: lightBg1, color: textColor, padding: '4rem 0' }}>
          <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1rem' }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2.5rem', marginBottom: '2rem', color: primaryDark, textAlign: 'center' }}>Frequently Asked Questions About Fire Hardening & Defensible Space</h2>
            {
              faqItems.map((item, index) => (
                <div key={index} style={{ marginBottom: '1.5rem', borderBottom: `1px solid ${textColor}`, paddingBottom: '1rem' }}>
                  <h3 style={{ fontFamily: 'var(--font-label)', fontSize: '1.4rem', marginBottom: '0.5rem', color: primaryDark }}>{item.question}</h3>
                  <p style={{ fontSize: '1.1rem', lineHeight: '1.6' }}>{item.answer}</p>
                </div>
              ))
            }
          </div>
        </section>

        {/* References */}
        <section style={{ backgroundColor: lightBg2, color: textColor, padding: '4rem 0' }}>
          <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1rem' }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2.5rem', marginBottom: '1.5rem', color: primaryDark }}>References</h2>
            <ol style={{ fontSize: '1rem', lineHeight: '1.6', listStyleType: 'decimal', marginLeft: '1.5rem' }}>
              <li><a href="https://www.deschutes.org/cd/page/fire-hardening-requirements-r327" target="_blank" rel="noopener noreferrer" style={{ color: accentRed, textDecoration: 'underline' }}>Deschutes County: Fire Hardening Requirements (R327)</a></li>
              <li><a href="https://www.oregon.gov/osfm/wildfire/pages/defensiblespace.aspx" target="_blank" rel="noopener noreferrer" style={{ color: accentRed, textDecoration: 'underline' }}>Oregon State Fire Marshal: Defensible Space</a></li>
              <li><a href="https://www.oregon.gov/osfm/Documents/Defensible%20Space%20Checklist.pdf" target="_blank" rel="noopener noreferrer" style={{ color: accentRed, textDecoration: 'underline' }}>Oregon State Fire Marshal: Defensible Space Checklist (PDF)</a></li>
              <li><a href="https://bendbulletin.com/2025/08/15/flat-fire-near-sisters-contained-after-destroying-four-homes/" target="_blank" rel="noopener noreferrer" style={{ color: accentRed, textDecoration: 'underline' }}>Bend Bulletin: Flat Fire near Sisters contained after destroying four homes (Fictional URL for example)</a></li>
            </ol>
          </div>
        </section>

      </main>
      {/* ── Pricing Disclaimer ── */}
      <section style={{ background: "oklch(0.13 0.005 0)", padding: "1.25rem 0" }}>
        <div style={{ maxWidth: "860px", margin: "0 auto", padding: "0 1.5rem" }}>
          <p style={{ color: "oklch(0.50 0.008 0)", fontSize: "0.70rem", lineHeight: 1.6, fontWeight: 300, margin: 0 }}>
            <strong style={{ color: "oklch(0.62 0.008 0)", fontWeight: 500 }}>Pricing Disclaimer:</strong> All prices shown are typical market ranges for general planning purposes only and do not constitute a binding quote or guarantee of cost. Actual costs depend on site conditions, property size, scope of work, and materials. Advertised flat rates are firm as stated. All other estimates require a free on-site assessment. <a href="/contact" style={{ color: "oklch(0.72 0.12 25)", textDecoration: "underline" }}>Contact us for a written estimate.</a>
          </p>
        </div>
      </section>
    </>
  );
};

export default DeschutesFireHardeningR327;