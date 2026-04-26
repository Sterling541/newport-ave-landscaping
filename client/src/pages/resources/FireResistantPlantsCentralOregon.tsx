import React from 'react';
import { Helmet } from 'react-helmet-async';
import Navbar from '@/components/Navbar';
import { FAQSchema } from '@/components/SchemaMarkup';

const FireResistantPlantsCentralOregon: React.FC = () => {
  const phoneNumber = '(541) 617-8873';
  const contactPath = '/contact';

  const faqItems = [
    {
      question: 'What is defensible space and why is it important in Central Oregon?',
      answer: 'Defensible space is the area around your home that has been modified to reduce fire hazard. In Central Oregon, with its dry climate and frequent wildfires, creating defensible space is crucial for protecting your property and ensuring firefighter safety. It involves managing vegetation in zones around your home to slow or stop the spread of wildfire.'
    },
    {
      question: 'Which plants are considered highly flammable in Bend, Oregon?',
      answer: 'Highly flammable plants in Bend and Central Oregon often contain volatile oils or resins, accumulate dry material quickly, or have papery bark. Key examples include juniper (especially dangerous due to volatile oils), manzanita, arborvitae, cedar, pine, and spruce. These should be avoided or removed, especially within the immediate defensible space zones around your home.'
    },
    {
      question: 'Can I still have a beautiful garden with fire-resistant plants?',
      answer: 'Absolutely! Many beautiful plants are also fire-resistant and thrive in Central Oregon\'s high desert climate. Examples include various sedums and stonecrops, yarrow, agastache, certain maples, and native grasses. Newport Avenue Landscaping specializes in designing stunning landscapes that are both aesthetically pleasing and fire-wise.'
    },
    {
      question: 'How often should I maintain my fire-wise landscape?',
      answer: 'Maintaining your fire-wise landscape is an ongoing process. Key tasks include pruning dead or damaged growth annually, raking leaves and clearing debris before fire season, watering drought-tolerant plants occasionally to keep them healthy, and regularly cleaning gutters and removing pine needles. Consistent maintenance ensures the effectiveness of your defensible space.'
    },
    {
      question: 'Does Newport Avenue Landscaping offer full-service fire-wise landscaping?',
      answer: 'Yes, Newport Avenue Landscaping provides comprehensive fire-wise landscaping services. This includes professional assessments of your property\'s fire risk, safe removal of highly flammable vegetation like juniper and manzanita, irrigation system upgrades to support fire-resistant plantings, and expert replanting with fire-resistant species. We offer a complete solution from removal to replanting and irrigation.'
    },
    {
      question: 'What are the new fire codes affecting homeowners in Deschutes County?',
      answer: 'Deschutes County\'s R327 fire hardening code became effective April 1, 2026, primarily for new construction. Additionally, the Oregon Fire Marshal is drafting a defensible space ordinance for local adoption in 2026. These codes emphasize the importance of fire-resistant building materials and creating defensible space around homes to mitigate wildfire risks.'
    }
  ];

  return (
    <div style={{ fontFamily: 'var(--font-label)', color: 'oklch(0.38 0.008 0)' }}>
      <Helmet>
        <title>Fire-Resistant Plants for Central Oregon | Newport Avenue Landscaping</title>
        <meta name="description" content="Discover fire-resistant plants for Central Oregon homes. Learn which plants protect your Bend property from wildfire and how to create a beautiful, fire-wise landscape. Remove juniper, plant smart!" />
        <link rel="canonical" href="https://newportavelandscaping.com/resources/fire-resistant-plants-central-oregon" />
        <script type="application/ld+json">{`          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://newportavelandscaping.com"
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "Resources",
                "item": "https://newportavelandscaping.com/resources"
              },
              {
                "@type": "ListItem",
                "position": 3,
                "name": "Fire-Resistant Plants for Central Oregon",
                "item": "https://newportavelandscaping.com/resources/fire-resistant-plants-central-oregon"
              }
            ]
          }`}</script>
</Helmet>
      <FAQSchema faqs={faqItems} />

      <Navbar />

      {/* Hero Section - Dark Background */}
      <section style={{ background: `linear-gradient(rgba(0,0,0,0.60), rgba(0,0,0,0.60)), url(/manus-storage/forest-home4_9324e5db_31f1b27d.webp) center/cover no-repeat`, color: 'oklch(1 0 0)', padding: '4rem 0' }}>
        <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1rem' }}>
          <p style={{ fontSize: '0.875rem', color: 'oklch(0.97 0.012 85)', marginBottom: '0.5rem' }}>
            Home &gt; Resources &gt; Fire-Resistant Plants for Central Oregon
          </p>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '3rem', fontWeight: 'bold', lineHeight: '1.2' }}>
            Fire-Resistant Plants for Central Oregon: Safeguarding Your Bend Home
          </h1>
        </div>
      </section>

      {/* Section 1: Introduction */}
      <section style={{ backgroundColor: 'oklch(0.97 0.012 85)', padding: '4rem 0' }}>
        <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1rem' }}>
          <p style={{ fontSize: '1.125rem', lineHeight: '1.7', marginBottom: '1.5rem' }}>
            Central Oregon is renowned for its stunning natural beauty, from the towering Cascades to the high desert landscapes. However, this beauty comes with a significant responsibility: protecting our homes and communities from the ever-present threat of wildfire. As a homeowner in Bend, understanding and implementing fire-wise landscaping practices is not just a recommendation—it's a critical step in safeguarding your property and loved ones. Newport Avenue Landscaping is dedicated to helping you create a landscape that is not only breathtaking but also resilient against fire.
          </p>
          <p style={{ fontSize: '1.125rem', lineHeight: '1.7', marginBottom: '1.5rem' }}>
            With new regulations like Deschutes County's R327 fire hardening code, effective April 1, 2026, for new construction, and the Oregon Fire Marshal drafting a defensible space ordinance for local adoption in 2026, the emphasis on fire-wise practices is growing. These measures highlight the urgent need for proactive landscaping solutions. Our team at Newport Avenue Landscaping brings over 21 years of experience (LCB #9153) to provide comprehensive fire-wise services, ensuring your property meets safety standards while enhancing its aesthetic appeal.
          </p>
        </div>
      </section>

      {/* Section 2: Understanding Defensible Space */}
      <section style={{ backgroundColor: 'oklch(1 0 0)', padding: '4rem 0' }}>
        <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1rem' }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2.25rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>
            Understanding Defensible Space: Creating Fire-Resistant Zones Around Your Home
          </h2>
          <p style={{ fontSize: '1.125rem', lineHeight: '1.7', marginBottom: '1.5rem' }}>
            Creating defensible space is the cornerstone of fire-wise landscaping. It involves establishing zones around your home where vegetation is managed to reduce fire intensity and slow its spread. Based on National Fire Protection Association (NFPA) standards, these zones are crucial for protecting your property and providing a safer environment for firefighters. Newport Avenue Landscaping can help you assess your property and implement these vital zones effectively.
          </p>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.75rem', fontWeight: 'bold', marginBottom: '1rem' }}>
            Zone 1: The Immediate Zone (0-30 feet from your home)
          </h3>
          <p style={{ fontSize: '1.125rem', lineHeight: '1.7', marginBottom: '1.5rem' }}>
            This is the most critical zone, extending 0 to 30 feet from your home. Within this area, the goal is to eliminate highly flammable materials and maintain plants with low flammability. Key practices include ensuring plants are well-irrigated, avoiding wood mulch within 5 feet of any structure, and pruning tree limbs to at least twice the height of surrounding understory brush (typically 6+ ft from ground). This zone acts as a buffer, preventing flames from directly reaching your home.
          </p>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.75rem', fontWeight: 'bold', marginBottom: '1rem' }}>
            Zone 2: The Intermediate Zone (30-100 feet from your home)
          </h3>
          <p style={{ fontSize: '1.125rem', lineHeight: '1.7', marginBottom: '1.5rem' }}>
            The intermediate zone extends from 30 to 100 feet from your home. Here, the focus shifts to using low-flammability plants and ensuring trees are well-spaced with no touching canopies. This helps to interrupt the path of a wildfire, reducing its intensity as it approaches your property. Strategic plant selection and spacing are vital in this zone.
          </p>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.75rem', fontWeight: 'bold', marginBottom: '1rem' }}>
            Zone 3: The Extended Zone (100+ feet from your home)
          </h3>
          <p style={{ fontSize: '1.125rem', lineHeight: '1.7', marginBottom: '1.5rem' }}>
            Beyond 100 feet lies the extended zone. While less intensely managed than the inner zones, it still plays a role in overall fire safety. Practices here include selectively pruning and thinning vegetation, and removing highly flammable species. This zone helps to reduce the potential for large, uncontrolled fires and provides a further buffer for your property.
          </p>
        </div>
      </section>

      {/* Section 3: Highly Flammable Plants to Avoid */}
      <section style={{ backgroundColor: 'oklch(0.97 0.012 85)', padding: '4rem 0' }}>
        <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1rem' }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2.25rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>
            Highly Flammable Plants: What to Avoid and Remove in Central Oregon
          </h2>
          <p style={{ fontSize: '1.125rem', lineHeight: '1.7', marginBottom: '1.5rem' }}>
            Not all plants are created equal when it comes to fire safety. Some species, due to their chemical composition and growth habits, act as fuel, rapidly intensifying wildfires. These highly flammable plants often contain volatile oils or resins, accumulate dry and dead material quickly, have aromatic leaves, or possess papery bark that ignites easily. Identifying and removing these plants, especially within your defensible space, is paramount for protecting your home.
          </p>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.75rem', fontWeight: 'bold', marginBottom: '1rem' }}>
            The Dangers of Juniper and Other High-Risk Species
          </h3>
          <p style={{ fontSize: '1.125rem', lineHeight: '1.7', marginBottom: '1.5rem' }}>
            In Central Oregon, certain plants pose a particularly high fire risk. <strong style={{ color: 'oklch(0.46 0.20 25)' }}>Juniper is arguably the most dangerous</strong>, primarily due to its highly volatile oils and tendency to accumulate dense, dry material. Many homeowners in Bend have beautiful, mature junipers, but their presence significantly increases wildfire risk and they should be removed, especially near structures. Other high-risk plants common in our region include manzanita, arborvitae, cedar, pine, and spruce. These conifers, while often aesthetically pleasing, contain resins and needles that are highly combustible.
          </p>
          <p style={{ fontSize: '1.125rem', lineHeight: '1.7', marginBottom: '1.5rem' }}>
            The devastating <strong style={{ color: 'oklch(0.46 0.20 25)' }}>Flat Fire of 2025</strong>, which consumed over 20,000 acres and destroyed four homes near Sisters, serves as a stark reminder of the power of wildfires in our region. In many cases, the rapid spread and intensity of such fires are fueled by flammable vegetation close to homes. Newport Avenue Landscaping specializes in the safe and efficient removal of these hazardous plants, helping you mitigate risk effectively.
          </p>
        </div>
      </section>

      {/* Section 4: Beautiful & Fire-Resistant Plants */}
      <section style={{ backgroundColor: 'oklch(1 0 0)', padding: '4rem 0' }}>
        <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1rem' }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2.25rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>
            Beautiful & Fire-Resistant Plants for Central Oregon's High Desert
          </h2>
          <p style={{ fontSize: '1.125rem', lineHeight: '1.7', marginBottom: '1.5rem' }}>
            Creating a fire-wise landscape doesn't mean sacrificing beauty. In fact, many stunning plants are naturally fire-resistant and perfectly suited for Central Oregon's unique high desert environment. These plants typically have low sap, resin, or oil content, moist and pliable leaves, and are slow to accumulate dry, dead matter. They also tend to be dense but not overly woody, making them ideal choices for your defensible space.
          </p>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.75rem', fontWeight: 'bold', marginBottom: '1rem' }}>
            Recommended Fire-Resistant Plants for Your Bend Landscape
          </h3>
          <p style={{ fontSize: '1.125rem', lineHeight: '1.7', marginBottom: '1.5rem' }}>
            Drawing from extensive research, including recommendations from Oregon State University Extension, we've compiled a list of excellent fire-resistant options that thrive in our local climate:
          </p>
          <ul style={{ listStyleType: 'disc', marginLeft: '1.5rem', marginBottom: '1.5rem' }}>
            <li style={{ marginBottom: '0.5rem' }}><strong style={{ color: 'oklch(0.46 0.20 25)' }}>Groundcovers:</strong> Sedum (Stonecrop), Wild Strawberry, Creeping Phlox, Thyme, Hens-and-Chicks. These low-growing plants help retain soil moisture and act as natural fire breaks.</li>
            <li style={{ marginBottom: '0.5rem' }}><strong style={{ color: 'oklch(0.46 0.20 25)' }}>Perennials:</strong> Yarrow, Agastache (Hummingbird Mint), Coreopsis, Penstemon, Columbine, Daylily, Coral Bells, Lavender, Salvia. These offer vibrant colors and textures while maintaining low flammability.</li>
            <li style={{ marginBottom: '0.5rem' }}><strong style={{ color: 'oklch(0.46 0.20 25)' }}>Shrubs:</strong> Snowberry, Currant (Golden Currant, Flowering Currant), Vine Maple, Red Osier Dogwood, Mock Orange, Serviceberry, Ninebark, Spirea. These provide structure and visual interest without posing a significant fire risk.</li>
            <li style={{ marginBottom: '0.5rem' }}><strong style={{ color: 'oklch(0.46 0.20 25)' }}>Trees:</strong> Aspen (Quaking Aspen), Maple (Amur Maple, Bigtooth Maple, Red Maple), Serviceberry, Birch. Deciduous trees with broad, moist leaves are generally good choices, offering shade and beauty.</li>
            <li style={{ marginBottom: '0.5rem' }}><strong style={{ color: 'oklch(0.46 0.20 25)' }}>Native Grasses:</strong> Many native grass species are excellent fire-wise choices, especially when kept short and well-maintained.</li>
          </ul>
          <p style={{ fontSize: '1.125rem', lineHeight: '1.7', marginBottom: '1.5rem' }}>
            By incorporating these plants into your landscape design, you can create a vibrant and diverse garden that enhances your property's beauty while significantly reducing its vulnerability to wildfire. Newport Avenue Landscaping can guide you through the selection process, ensuring you choose plants that thrive in our local conditions and contribute to a safer home environment.
          </p>
        </div>
      </section>

      {/* Section 5: Comparison Table */}
      <section style={{ backgroundColor: 'oklch(0.97 0.012 85)', padding: '4rem 0' }}>
        <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1rem' }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2.25rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>
            Flammable vs. Fire-Resistant Plants: A Quick Comparison
          </h2>
          <p style={{ fontSize: '1.125rem', lineHeight: '1.7', marginBottom: '1.5rem' }}>
            To help you make informed decisions for your Central Oregon landscape, here's a comparison of common flammable and fire-resistant plant types:
          </p>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '1.5rem' }}>
              <thead>
                <tr style={{ backgroundColor: 'oklch(0.15 0.005 0)', color: 'oklch(1 0 0)' }}>
                  <th style={{ padding: '1rem', border: '1px solid oklch(0.38 0.008 0)', textAlign: 'left' }}>Category</th>
                  <th style={{ padding: '1rem', border: '1px solid oklch(0.38 0.008 0)', textAlign: 'left' }}>Highly Flammable Plants (Examples)</th>
                  <th style={{ padding: '1rem', border: '1px solid oklch(0.38 0.008 0)', textAlign: 'left' }}>Fire-Resistant Plants (Examples)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ padding: '1rem', border: '1px solid oklch(0.38 0.008 0)' }}><strong style={{ color: 'oklch(0.46 0.20 25)' }}>Trees</strong></td>
                  <td style={{ padding: '1rem', border: '1px solid oklch(0.38 0.008 0)' }}>Pine, Spruce, Cedar, Arborvitae (especially those with dense, dry needles/foliage)</td>
                  <td style={{ padding: '1rem', border: '1px solid oklch(0.38 0.008 0)' }}>Quaking Aspen, Maple (Amur, Bigtooth, Red), Serviceberry, Birch</td>
                </tr>
                <tr>
                  <td style={{ padding: '1rem', border: '1px solid oklch(0.38 0.008 0)' }}><strong style={{ color: 'oklch(0.46 0.20 25)' }}>Shrubs</strong></td>
                  <td style={{ padding: '1rem', border: '1px solid oklch(0.38 0.008 0)' }}>Juniper, Manzanita, Broom, Rosemary, Ornamental Grasses (tall, dry)</td>
                  <td style={{ padding: '1rem', border: '1px solid oklch(0.38 0.008 0)' }}>Snowberry, Currant (Golden, Flowering), Mock Orange, Ninebark, Spirea, Red Osier Dogwood</td>
                </tr>
                <tr>
                  <td style={{ padding: '1rem', border: '1px solid oklch(0.38 0.008 0)' }}><strong style={{ color: 'oklch(0.46 0.20 25)' }}>Perennials & Groundcovers</strong></td>
                  <td style={{ padding: '1rem', border: '1px solid oklch(0.38 0.008 0)' }}>Dry grasses, plants with volatile oils (e.g., some sages), plants that accumulate dead material</td>
                  <td style={{ padding: '1rem', border: '1px solid oklch(0.38 0.008 0)' }}>Yarrow, Sedum (Stonecrop), Agastache, Creeping Phlox, Hens-and-Chicks, Thyme, Columbine</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p style={{ fontSize: '1.125rem', lineHeight: '1.7', marginBottom: '1.5rem' }}>
            This table provides a general guide. The flammability of any plant can increase if it is not well-maintained, becomes dry, or accumulates dead material. Regular maintenance is key to keeping even fire-resistant plants safe.
          </p>
        </div>
      </section>

      {/* Section 6: Designing Your Fire-Wise Landscape */}
      <section style={{ backgroundColor: 'oklch(1 0 0)', padding: '4rem 0' }}>
        <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1rem' }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2.25rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>
            Designing Your Fire-Wise Landscape: Beyond Plant Selection
          </h2>
          <p style={{ fontSize: '1.125rem', lineHeight: '1.7', marginBottom: '1.5rem' }}>
            While choosing the right plants is essential, a truly fire-wise landscape integrates thoughtful design and consistent maintenance. It's about creating a holistic system that protects your home year-round. Newport Avenue Landscaping considers all these factors to build a resilient and beautiful outdoor space for you.
          </p>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.75rem', fontWeight: 'bold', marginBottom: '1rem' }}>
            Smart Garden Design Principles
          </h3>
          <ul style={{ listStyleType: 'disc', marginLeft: '1.5rem', marginBottom: '1.5rem' }}>
            <li style={{ marginBottom: '0.5rem' }}><strong style={{ color: 'oklch(0.46 0.20 25)' }}>Maintenance-Friendly Choices:</strong> Opt for plants that naturally shed fewer dry leaves or branches, minimizing cleanup. Design clear pathways and avoid overcrowding to make pruning and raking easier. Utilize non-flammable mulches like gravel or crushed stone, especially within 5 feet of structures, to suppress weeds safely and reduce fuel.</li>
            <li style={{ marginBottom: '0.5rem' }}><strong style={{ color: 'oklch(0.46 0.20 25)' }}>Efficient Labor Planning:</strong> Group plants with similar water and pruning requirements to streamline your care routine. Prioritize hardy native species and perennials that return annually, reducing the need for constant replanting. Ensure easy access paths for seasonal cleaning and maintenance tasks.</li>
            <li style={{ marginBottom: '0.5rem' }}><strong style={{ color: 'oklch(0.46 0.20 25)' }}>Strategic Plant Spacing:</strong> Give shrubs and perennials ample room to prevent flames from easily spreading between them. Eliminate "ladder fuels" by maintaining vertical separation between low plants, shrubs, and trees. Establish a 3-5 foot buffer zone immediately around your home, free of dense plants, using gravel or bare soil instead.</li>
          </ul>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.75rem', fontWeight: 'bold', marginBottom: '1rem' }}>
            Keep Your Garden Fire-Ready Year-Round
          </h3>
          <p style={{ fontSize: '1.125rem', lineHeight: '1.7', marginBottom: '1.5rem' }}>
            Fire-wise landscaping is an ongoing commitment. Regular maintenance is vital to ensure your landscape remains a protective barrier against wildfire. This includes:
          </p>
          <ul style={{ listStyleType: 'disc', marginLeft: '1.5rem', marginBottom: '1.5rem' }}>
            <li style={{ marginBottom: '0.5rem' }}>Pruning dead or damaged growth from all plants, especially in spring, to remove potential fuel.</li>
            <li style={{ marginBottom: '0.5rem' }}>Raking leaves, pine needles, and clearing other debris, particularly before and during fire season.</li>
            <li style={{ marginBottom: '0.5rem' }}>Watering drought-tolerant plants occasionally during dry periods to keep them healthy and moist, as even fire-resistant plants can burn when dry.</li>
            <li style={{ marginBottom: '0.5rem' }}>Regularly checking and cleaning gutters and roofs of accumulated debris.</li>
          </ul>
          <p style={{ fontSize: '1.125rem', lineHeight: '1.7', marginBottom: '1.5rem' }}>
            By adhering to these design principles and maintenance practices, you can significantly enhance your property's fire resilience, creating a beautiful and safe outdoor living space for your family in Bend, Oregon.
          </p>
        </div>
      </section>

      {/* Section 7: Newport Avenue Landscaping Services */}
      <section style={{ backgroundColor: 'oklch(0.97 0.012 85)', padding: '4rem 0' }}>
        <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1rem' }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2.25rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>
            Newport Avenue Landscaping: Your Partner in Fire-Wise Solutions
          </h2>
          <p style={{ fontSize: '1.125rem', lineHeight: '1.7', marginBottom: '1.5rem' }}>
            At Newport Avenue Landscaping, we understand the unique challenges and needs of Central Oregon homeowners when it comes to wildfire protection. With over 21 years of experience (LCB #9153), our team provides comprehensive, full-service fire-wise landscaping solutions designed to protect your property while enhancing its natural beauty. We don't just offer a single service; we provide an integrated approach to defensible space.
          </p>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.75rem', fontWeight: 'bold', marginBottom: '1rem' }}>
            Our Integrated Fire-Wise Services Include:
          </h3>
          <ul style={{ listStyleType: 'disc', marginLeft: '1.5rem', marginBottom: '1.5rem' }}>
            <li style={{ marginBottom: '0.5rem' }}><strong style={{ color: 'oklch(0.46 0.20 25)' }}>Property Assessment:</strong> A thorough evaluation of your landscape to identify fire risks and recommend tailored solutions based on your property's specific characteristics and local regulations.</li>
            <li style={{ marginBottom: '0.5rem' }}><strong style={{ color: 'oklch(0.46 0.20 25)' }}>Hazardous Vegetation Removal:</strong> Safe and efficient removal of highly flammable plants, such as juniper and manzanita, that pose a significant threat to your home.</li>
            <li style={{ marginBottom: '0.5rem' }}><strong style={{ color: 'oklch(0.46 0.20 25)' }}>Irrigation System Upgrades:</strong> Ensuring your plants receive adequate moisture to reduce flammability, including optimizing existing systems or installing new, water-efficient irrigation.</li>
            <li style={{ marginBottom: '0.5rem' }}><strong style={{ color: 'oklch(0.46 0.20 25)' }}>Fire-Resistant Replanting:</strong> Expert selection and installation of beautiful, drought-tolerant, and fire-resistant plants that thrive in Central Oregon's climate.</li>
          </ul>
          <p style={{ fontSize: '1.125rem', lineHeight: '1.7', marginBottom: '1.5rem' }}>
            Unlike some competitors who may only offer removal (like Axe Contracting or Grantland Management) or focus solely on prevention (like SafeHaven Fire or Liberty Creek), Newport Avenue Landscaping provides a <strong style={{ color: 'oklch(0.46 0.20 25)' }}>full-service solution</strong>. We handle everything from initial assessment and removal to replanting and irrigation, ensuring a cohesive and effective fire-wise landscape. Our commitment extends to supporting community efforts like the Project Wildfire Neighborhood Coalition, which is actively working with over 80 Deschutes County communities to promote fire safety codes.
          </p>
        </div>
      </section>

      {/* Mid-Page CTA Section - Dark Background */}
      <section style={{ backgroundColor: 'oklch(0.15 0.005 0)', color: 'oklch(1 0 0)', padding: '4rem 0', textAlign: 'center' }}>
        <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1rem' }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>
            Ready to Create Your Fire-Wise Oasis?
          </h2>
          <p style={{ fontSize: '1.25rem', lineHeight: '1.7', marginBottom: '2rem' }}>
            Don't wait until wildfire season is upon us. Take proactive steps to protect your home and enhance its beauty with fire-resistant landscaping.
          </p>
          <a
            href={contactPath}
            style={{
              backgroundColor: 'oklch(0.46 0.20 25)',
              color: 'oklch(1 0 0)',
              padding: '1rem 2rem',
              fontSize: '1.25rem',
              fontWeight: 'bold',
              textDecoration: 'none',
              borderRadius: '0.375rem',
              transition: 'background-color 0.3s ease',
            }}
          >
            GET MY FREE QUOTE
          </a>
          <p style={{ fontSize: '1.125rem', marginTop: '1.5rem' }}>
            Or call us today: <a href={`tel:${phoneNumber}`} style={{ color: 'oklch(1 0 0)', textDecoration: 'underline' }}>{phoneNumber}</a>
          </p>
        </div>
      </section>

      {/* Section 8: FAQ */}
      <section style={{ backgroundColor: 'oklch(1 0 0)', padding: '4rem 0' }}>
        <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1rem' }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2.25rem', fontWeight: 'bold', marginBottom: '2rem' }}>
            Frequently Asked Questions About Fire-Resistant Landscaping
          </h2>
          <FAQSchema faqs={faqItems} />
        </div>
      </section>

      {/* Final CTA Section */}
      <section style={{ backgroundColor: 'oklch(0.97 0.012 85)', padding: '4rem 0', textAlign: 'center' }}>
        <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1rem' }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>
            Protect Your Investment. Enhance Your Home.
          </h2>
          <p style={{ fontSize: '1.25rem', lineHeight: '1.7', marginBottom: '2rem' }}>
            Newport Avenue Landscaping is your trusted partner for creating a beautiful, safe, and fire-wise landscape in Central Oregon. Contact us today for a personalized consultation.
          </p>
          <a
            href={contactPath}
            style={{
              backgroundColor: 'oklch(0.46 0.20 25)',
              color: 'oklch(1 0 0)',
              padding: '1rem 2rem',
              fontSize: '1.25rem',
              fontWeight: 'bold',
              textDecoration: 'none',
              borderRadius: '0.375rem',
              transition: 'background-color 0.3s ease',
            }}
          >
            GET YOUR FREE QUOTE
          </a>
          <p style={{ fontSize: '1.125rem', marginTop: '1.5rem' }}>
            Prefer to speak with someone? Call us directly at <a href={`tel:${phoneNumber}`} style={{ color: 'oklch(0.38 0.008 0)', textDecoration: 'underline' }}>{phoneNumber}</a>
          </p>
        </div>
      </section>
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
};

export default FireResistantPlantsCentralOregon;
