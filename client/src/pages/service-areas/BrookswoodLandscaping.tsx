import Navbar from '@/components/Navbar';
import SEO from '@/components/SEO';
import { BreadcrumbSchema } from '@/components/SchemaMarkup';
import { Link } from 'wouter';

const FAQ_SCHEMA = [
  {
    "@type": "Question",
    "name": "What makes landscaping in Brookswood unique?",
    "acceptedAnswer": {
      "@type": "Answer",
      "text": "Brookswood, located in South Bend, is known for its newer developments and family-oriented atmosphere. Unlike some west side neighborhoods, Brookswood generally boasts good soil conditions, making it more amenable to traditional lawn-and-garden styles. Its proximity to Brookswood Meadow Park also influences landscape design, often incorporating elements that complement the park's natural beauty and family-friendly amenities."
    }
  },
  {
    "@type": "Question",
    "name": "Are there specific HOA or community standards for landscaping in Brookswood?",
    "acceptedAnswer": {
      "@type": "Answer",
      "text": "Brookswood typically has less restrictive HOA guidelines compared to some of the more exclusive gated communities in Central Oregon. While there are community standards to maintain neighborhood aesthetics, homeowners generally have more flexibility in their landscaping choices, often favoring traditional lawn-and-garden designs that suit the area's good soil conditions and family-friendly vibe."
    }
  },
  {
    "@type": "Question",
    "name": "What kind of plants thrive in Brookswood's environment?",
    "acceptedAnswer": {
      "@type": "Answer",
      "text": "Given Brookswood's good soil conditions and generally milder microclimate compared to some high-desert areas, a wide variety of plants thrive here. Traditional favorites like lush lawns, ornamental shrubs, flowering perennials, and deciduous trees do very well. Native plants that are adapted to Central Oregon's climate, such as certain varieties of conifer, sage, and drought-tolerant grasses, can also be incorporated for sustainability and local character."
    }
  },
  {
    "@type": "Question",
    "name": "How does Newport Avenue Landscaping approach fire-wise landscaping in Brookswood?",
    "acceptedAnswer": {
      "@type": "Answer",
      "text": "While Brookswood may not be in as high a fire risk zone as some communities closer to the wildland-urban interface, fire-wise landscaping is always a prudent consideration in Central Oregon. Newport Avenue Landscaping employs strategies such as creating defensible space, selecting fire-resistant plant species, proper plant spacing, and regular maintenance to reduce fuel loads. We help Brookswood homeowners balance aesthetic desires with safety, ensuring their landscapes are both beautiful and resilient."
    }
  },
  {
    "@type": "Question",
    "name": "Can Newport Avenue Landscaping help with landscape design that complements Brookswood Meadow Park?",
    "acceptedAnswer": {
      "@type": "Answer",
      "text": "Absolutely! Many Brookswood homes enjoy proximity to Brookswood Meadow Park, and we specialize in designing landscapes that extend and complement this natural amenity. Whether it's creating inviting outdoor living spaces that flow into the park's aesthetic, selecting plants that attract local wildlife, or designing pathways that connect seamlessly with neighborhood strolls, our team can craft a landscape that enhances your connection to the park and the broader Brookswood community."
    }
  }
];

export default function BrookswoodLandscaping() {
  return (
    <>
      <SEO
        title="Brookswood Landscaping Services - Newport Avenue Landscaping"
        description="Expert landscaping services in Brookswood, Bend, OR. Specializing in traditional lawn-and-garden designs, family-friendly outdoor spaces, and enhancing homes near Brookswood Meadow Park."
        canonical="/service-areas/brookswood-landscaping"
      />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "/" },
          { name: "Neighborhoods", url: "/neighborhoods" },
          { name: "Brookswood", url: "/neighborhoods/brookswood" },
        ]}
      />
      <Navbar />

      {/* Hero Section */}
      <section className="relative bg-[oklch(0.12_0.008_0)] text-[oklch(0.72_0.005_0)] py-20">
        <div className="container mx-auto text-center">
          <span className="text-[oklch(0.65_0.20_25)] uppercase tracking-widest text-sm font-bold">Neighborhood Focus</span>
          <h1 className="text-5xl font-extrabold mt-4 text-[oklch(0.97_0.003_0)]">Brookswood Landscaping</h1>
          <p className="mt-4 text-xl">Crafting beautiful and functional outdoor spaces in Brookswood, Bend.</p>
        </div>
      </section>

      {/* Main Content Container */}
      <main className="max-w-3xl mx-auto py-16 px-4">
        {/* FAQ Schema Script Tag */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": FAQ_SCHEMA
          }) }}
        />

        {/* Intro Paragraph */}
        <p className="text-lg mb-8 text-[oklch(0.30_0.008_0)]">
          Newport Avenue Landscaping has proudly served the Brookswood community since 2005, bringing over two decades of expertise to this vibrant South Bend neighborhood. Our team understands the unique characteristics of Brookswood, from its family-friendly atmosphere to its favorable soil conditions, allowing us to create landscapes that truly thrive and enhance your home. Our 150+ employees are dedicated to transforming your outdoor vision into a reality, ensuring every project reflects the quality and care Newport Avenue Landscaping is known for.
        </p>

        {/* HOA/Community Standards Section */}
        <div className="border-l-4 border-[oklch(0.46_0.20_25)] bg-[oklch(0.97_0.003_0)] p-4 mb-8 rounded-md shadow-sm">
          <p className="font-bold text-[oklch(0.15_0.005_0)]">Brookswood Community Standards</p>
          <p className="text-[oklch(0.30_0.008_0)]">While Brookswood is known for its less restrictive community standards compared to some other Bend neighborhoods, maintaining a cohesive and attractive streetscape is still valued. Homeowners generally have more flexibility in their landscaping choices, often favoring traditional lawn-and-garden designs. We work with you to ensure your landscape design complements the neighborhood's aesthetic while adhering to any applicable guidelines, ensuring your property enhances the overall community appeal.</p>
        </div>

        {/* What Makes Brookswood Landscaping Unique */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-[oklch(0.15_0.005_0)]">What Makes Brookswood Landscaping Unique</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-[oklch(0.98_0.003_0)] p-6 rounded-lg shadow-sm">
              <h3 className="font-semibold text-xl mb-2 text-[oklch(0.15_0.005_0)]">Favorable Soil Conditions</h3>
              <p className="text-[oklch(0.30_0.008_0)]">Unlike the rocky terrain of some west side areas, Brookswood often boasts good soil, making it ideal for lush lawns and diverse plantings.</p>
            </div>
            <div className="bg-[oklch(0.98_0.003_0)] p-6 rounded-lg shadow-sm">
              <h3 className="font-semibold text-xl mb-2 text-[oklch(0.15_0.005_0)]">Family-Oriented Designs</h3>
              <p className="text-[oklch(0.30_0.008_0)]">Landscapes often prioritize play areas, safe spaces, and low-maintenance designs suitable for families with children.</p>
            </div>
            <div className="bg-[oklch(0.98_0.003_0)] p-6 rounded-lg shadow-sm">
              <h3 className="font-semibold text-xl mb-2 text-[oklch(0.15_0.005_0)]">Proximity to Brookswood Meadow Park</h3>
              <p className="text-[oklch(0.30_0.008_0)]">Designs often seek to complement the natural aesthetic and recreational opportunities offered by the nearby park.</p>
            </div>
            <div className="bg-[oklch(0.98_0.003_0)] p-6 rounded-lg shadow-sm">
              <h3 className="font-semibold text-xl mb-2 text-[oklch(0.15_0.005_0)]">Traditional Aesthetic</h3>
              <p className="text-[oklch(0.30_0.008_0)]">A preference for classic lawn-and-garden styles, with vibrant flower beds and well-maintained green spaces.</p>
            </div>
            <div className="bg-[oklch(0.98_0.003_0)] p-6 rounded-lg shadow-sm">
              <h3 className="font-semibold text-xl mb-2 text-[oklch(0.15_0.005_0)]">Mix of Established & New Homes</h3>
              <p className="text-[oklch(0.30_0.008_0)]">Our services cater to both refreshing mature landscapes and designing brand-new outdoor spaces for newer constructions.</p>
            </div>
            <div className="bg-[oklch(0.98_0.003_0)] p-6 rounded-lg shadow-sm">
              <h3 className="font-semibold text-xl mb-2 text-[oklch(0.15_0.005_0)]">Community-Oriented Design</h3>
              <p className="text-[oklch(0.30_0.008_0)]">Creating inviting front yards and outdoor areas that foster neighborly connections and community spirit.</p>
            </div>
          </div>
        </section>

        {/* Services We Provide in Brookswood */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-[oklch(0.15_0.005_0)]">Services We Provide in Brookswood</h2>
          <ul className="list-disc list-inside text-[oklch(0.30_0.008_0)] space-y-2">
            <li>Custom Landscape Design & Installation</li>
            <li>Seasonal Clean-ups & Maintenance</li>
            <li>Irrigation System Installation & Repair</li>
            <li>Drought-Tolerant Landscaping Solutions</li>
            <li>Hardscaping: Patios, Walkways, Retaining Walls</li>
            <li>Outdoor Lighting Design & Installation</li>
            <li>Water Features: Ponds, Fountains, Streams</li>
            <li>Tree & Shrub Planting and Pruning</li>
            <li>Lawn Care: Mowing, Fertilization, Aeration</li>
            <li>Garden Bed Design & Planting</li>
            <li>Fire-Wise Landscaping Consultations</li>
            <li>Drainage Solutions & Erosion Control</li>
            <li>Pergolas, Arbors, and Outdoor Structures</li>
            <li>Vegetable & Herb Garden Installation</li>
          </ul>
        </section>

        {/* Recent Projects Section */}
        <section className="bg-[oklch(0.18_0.008_0)] text-[oklch(0.72_0.005_0)] py-16 mb-12 rounded-lg">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-center text-[oklch(0.97_0.003_0)]">Recent Projects in Brookswood</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Project Card 1 */}
              <div className="bg-[oklch(0.12_0.008_0)] rounded-lg shadow-lg overflow-hidden">
                <img src="/images/brookswood-project-1.jpg" alt="Brookswood Project 1" className="w-full h-48 object-cover" />
                <div className="p-4">
                  <h3 className="font-semibold text-xl mb-2 text-[oklch(0.97_0.003_0)]">Family-Friendly Backyard Oasis</h3>
                  <p className="text-[oklch(0.72_0.005_0)]">Designed a multi-functional backyard with a play area, custom patio, and vibrant garden beds for a growing Brookswood family.</p>
                </div>
              </div>
              {/* Project Card 2 */}
              <div className="bg-[oklch(0.12_0.008_0)] rounded-lg shadow-lg overflow-hidden">
                <img src="/images/brookswood-project-2.jpg" alt="Brookswood Project 2" className="w-full h-48 object-cover" />
                <div className="p-4">
                  <h3 className="font-semibold text-xl mb-2 text-[oklch(0.97_0.003_0)]">Traditional Front Yard Refresh</h3>
                  <p className="text-[oklch(0.72_0.005_0)]">Revitalized an established Brookswood home's front yard with new plantings, a manicured lawn, and inviting pathways.</p>
                </div>
              </div>
              {/* Project Card 3 */}
              <div className="bg-[oklch(0.12_0.008_0)] rounded-lg shadow-lg overflow-hidden">
                <img src="/images/brookswood-project-3.jpg" alt="Brookswood Project 3" className="w-full h-48 object-cover" />
                <div className="p-4">
                  <h3 className="font-semibold text-xl mb-2 text-[oklch(0.97_0.003_0)]">Outdoor Living Expansion</h3>
                  <p className="text-[oklch(0.72_0.005_0)]">Created an expansive outdoor living area with a fire pit, seating, and integrated garden elements for entertaining.</p>
                </div>
              </div>
              {/* Project Card 4 */}
              <div className="bg-[oklch(0.12_0.008_0)] rounded-lg shadow-lg overflow-hidden">
                <img src="/images/brookswood-project-4.jpg" alt="Brookswood Project 4" className="w-full h-48 object-cover" />
                <div className="p-4">
                  <h3 className="font-semibold text-xl mb-2 text-[oklch(0.97_0.003_0)]">Sustainable Garden for New Build</h3>
                  <p className="text-[oklch(0.72_0.005_0)]">Designed and installed a water-wise, low-maintenance garden for a newly constructed home, blending beauty with sustainability.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why Brookswood Homeowners Choose Newport Avenue */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-[oklch(0.15_0.005_0)]">Why Brookswood Homeowners Choose Newport Avenue</h2>
          <p className="text-lg mb-4 text-[oklch(0.30_0.008_0)]">
            Brookswood residents trust Newport Avenue Landscaping for our deep understanding of the local environment and community values. We pride ourselves on delivering personalized service, from initial consultation to project completion, ensuring every detail aligns with your vision and the unique character of your Brookswood home. Our experienced team, backed by LCB #9153 and over 19 years of service in Central Oregon, guarantees exceptional craftsmanship and lasting beauty.
          </p>
          <p className="text-lg text-[oklch(0.30_0.008_0)]">
            With 150+ dedicated employees, we have the resources and expertise to handle projects of any scale, from intricate garden designs to comprehensive landscape transformations. We are committed to enhancing the curb appeal and functionality of your outdoor spaces, creating environments where families can relax, play, and connect with nature, all while contributing to the charm of the Brookswood neighborhood.
          </p>
        </section>

        {/* Pro Tip Callout Box */}
        <div className="border-l-4 border-[oklch(0.46_0.20_25)] bg-[oklch(0.97_0.003_0)] p-4 mb-8 rounded-md shadow-sm">
          <p className="font-bold text-[oklch(0.15_0.005_0)]">Pro Tip for Brookswood Landscaping</p>
          <p className="text-[oklch(0.30_0.008_0)]">Leverage Brookswood's excellent soil conditions! Consider incorporating a diverse range of flowering plants and shrubs to create a vibrant, multi-seasonal garden. Don't shy away from traditional lawn areas, as they tend to thrive here, providing a perfect backdrop for family activities and enhancing the neighborhood's classic appeal.</p>
        </div>

        {/* FAQ Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-[oklch(0.15_0.005_0)]">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {FAQ_SCHEMA.map((faq, index) => (
              <div key={index} className="bg-[oklch(0.98_0.003_0)] p-6 rounded-lg shadow-sm">
                <h3 className="font-semibold text-xl mb-2 text-[oklch(0.15_0.005_0)]">{faq.name}</h3>
                <p className="text-[oklch(0.30_0.008_0)]">{faq.acceptedAnswer.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-[oklch(0.18_0.008_0)] text-[oklch(0.72_0.005_0)] py-16 text-center rounded-lg">
          <h2 className="text-4xl font-bold mb-4 text-[oklch(0.97_0.003_0)]">Ready to Transform Your Brookswood Landscape?</h2>
          <p className="text-xl mb-8">Contact Newport Avenue Landscaping today for a personalized consultation.</p>
          <a href="tel:+15413828200" className="inline-block bg-[oklch(0.46_0.20_25)] text-white font-bold py-3 px-8 rounded-full text-lg hover:bg-[oklch(0.55_0.25_25)] transition duration-300">
            Call Us: (541) 382-8200
          </a>
        </section>

        {/* Related Links Section */}
        <section className="mt-12">
          <h2 className="text-3xl font-bold mb-6 text-[oklch(0.15_0.005_0)]">Explore More</h2>
          <ul className="list-disc list-inside text-[oklch(0.30_0.008_0)] space-y-2">
            <li><Link href="/services">Our Full Range of Landscaping Services</Link></li>
            <li><Link href="/about">About Newport Avenue Landscaping</Link></li>
            <li><Link href="/contact">Request a Free Consultation</Link></li>
          </ul>
        </section>
      </main>
    </>
  );
}
