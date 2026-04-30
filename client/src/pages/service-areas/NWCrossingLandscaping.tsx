import Navbar from '@/components/Navbar';
import SEO from '@/components/SEO';
import { BreadcrumbSchema } from '@/components/SchemaMarkup';
import { Link } from "wouter";

const FAQ_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What makes landscaping in NW Crossing unique?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "NW Crossing's urban village design, smaller lots, and strong community aesthetic standards encourage sustainable and eco-friendly landscaping. Rain gardens, permeable paving, and native plant selections are popular choices to complement the walkable, pedestrian-friendly environment."
      }
    },
    {
      "@type": "Question",
      "name": "Are there specific landscaping guidelines or an HOA in NW Crossing?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "While NW Crossing doesn't have a traditional Homeowners Association (HOA) with strict CC&Rs like some other communities, there are strong community aesthetic standards that guide landscaping choices. These standards promote a cohesive, sustainable, and pedestrian-friendly environment, often favoring native plants and water-wise designs."
      }
    },
    {
      "@type": "Question",
      "name": "What types of plants thrive in NW Crossing's environment?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Given NW Crossing's focus on sustainability and its Central Oregon climate, native and drought-tolerant plants are ideal. Examples include various sagebrush varieties, ponderosa pines, junipers, and resilient flowering perennials that can withstand dry summers and cold winters. Rain gardens also benefit from plants that can tolerate both wet and dry conditions."
      }
    },
    {
      "@type": "Question",
      "name": "How can I create a low-maintenance landscape in NW Crossing?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Low-maintenance landscaping in NW Crossing often involves xeriscaping principles, using native and drought-tolerant plants, efficient irrigation systems (like drip irrigation), and permeable hardscaping. Reducing lawn areas and incorporating mulched beds can also significantly cut down on maintenance needs, aligning with the neighborhood's eco-friendly ethos."
      }
    },
    {
      "@type": "Question",
      "name": "Does Newport Avenue Landscaping understand NW Crossing's unique aesthetic and community standards?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Absolutely. Newport Avenue Landscaping has been serving Central Oregon since 2005, and our team is intimately familiar with the NW Crossing neighborhood's distinct urban village aesthetic and community-driven landscaping preferences. We specialize in creating designs that are both beautiful and compliant with the sustainable and pedestrian-friendly character of NW Crossing."
      }
    }
  ]
};

export default function NWCrossingLandscaping() {
  return (
    <>
      <SEO
        title="NW Crossing Landscaping | Sustainable & Eco-Friendly Designs | Newport Avenue Landscaping"
        description="Newport Avenue Landscaping specializes in sustainable and eco-friendly landscaping solutions for NW Crossing, Bend. Enhance your urban village home with designs that complement its unique aesthetic and community standards."
        canonical="/service-areas/nw-crossing-landscaping"
      />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "/" },
          { name: "Neighborhoods", url: "/neighborhoods" },
          { name: "NW Crossing Landscaping", url: "/nw-crossing-landscaping" },
        ]}
      />
      <Navbar />

      {/* Hero Section */}
      <section className="bg-[oklch(0.12_0.008_0)] text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-[oklch(0.46_0.20_25)] uppercase tracking-widest text-sm font-bold">NW Crossing Specialists</span>
          <h1 className="text-5xl font-extrabold mt-4 leading-tight text-[oklch(0.97_0.003_0)]">
            Sustainable & Stylish Landscaping for NW Crossing Homes
          </h1>
          <p className="mt-6 text-[oklch(0.72_0.005_0)] text-lg max-w-2xl mx-auto">
            Crafting beautiful, eco-conscious outdoor spaces that perfectly blend with NW Crossing's unique urban village charm.
          </p>
        </div>
      </section>

      <main className="max-w-3xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        {/* FAQ Schema Script Tag */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }}
        />

        {/* Intro Paragraph */}
        <p className="text-[oklch(0.30_0.008_0)] mb-8">
          With nearly two decades of experience serving Central Oregon, Newport Avenue Landscaping (LCB #9153) has been a trusted partner for homeowners in NW Crossing since its early development. Our 150+ employees understand the neighborhood's commitment to walkable design, community gardens, and sustainable living, translating into outdoor spaces that are both beautiful and environmentally responsible.
        </p>

        {/* HOA/Community Standards Section */}
        <div className="border-l-4 border-[oklch(0.46_0.20_25)] pl-4 py-2 mb-8 bg-[oklch(0.97_0.003_0)] p-4 rounded-md">
          <h3 className="text-xl font-semibold text-[oklch(0.15_0.005_0)] mb-2">NW Crossing Community Aesthetic Standards</h3>
          <p className="text-[oklch(0.30_0.008_0)]">
            While NW Crossing operates without a traditional HOA, its strong community aesthetic standards guide landscaping decisions. These guidelines encourage designs that enhance walkability, promote ecological health, and maintain the neighborhood's distinctive urban village character. Our team is well-versed in these nuances, ensuring your landscape complements the community's vision.
          </p>
        </div>

        {/* What Makes NW Crossing Landscaping Unique */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-[oklch(0.15_0.005_0)] mb-6 text-center">What Makes NW Crossing Landscaping Unique</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-6 bg-[oklch(0.98_0.003_0)] rounded-lg shadow-sm">
              <h3 className="font-semibold text-[oklch(0.15_0.005_0)] mb-2">Walkable & Pedestrian-Friendly Design</h3>
              <p className="text-[oklch(0.32_0.005_0)]">Landscapes that integrate seamlessly with sidewalks and public spaces, enhancing the neighborhood's pedestrian focus.</p>
            </div>
            <div className="p-6 bg-[oklch(0.98_0.003_0)] rounded-lg shadow-sm">
              <h3 className="font-semibold text-[oklch(0.15_0.005_0)] mb-2">Sustainable & Eco-Conscious Choices</h3>
              <p className="text-[oklch(0.32_0.005_0)]">Emphasis on native plants, water-wise irrigation, and materials that support local ecosystems.</p>
            </div>
            <div className="p-6 bg-[oklch(0.98_0.003_0)] rounded-lg shadow-sm">
              <h3 className="font-semibold text-[oklch(0.15_0.005_0)] mb-2">Smaller Lot Optimization</h3>
              <p className="text-[oklch(0.32_0.005_0)]">Creative designs that maximize functionality and beauty in compact urban spaces.</p>
            </div>
            <div className="p-6 bg-[oklch(0.98_0.003_0)] rounded-lg shadow-sm">
              <h3 className="font-semibold text-[oklch(0.15_0.005_0)] mb-2">Rain Gardens & Permeable Paving</h3>
              <p className="text-[oklch(0.32_0.005_0)]">Solutions for effective stormwater management that are both functional and aesthetically pleasing.</p>
            </div>
            <div className="p-6 bg-[oklch(0.98_0.003_0)] rounded-lg shadow-sm">
              <h3 className="font-semibold text-[oklch(0.15_0.005_0)] mb-2">Craftsman & Modern Home Integration</h3>
              <p className="text-[oklch(0.32_0.005_0)]">Landscapes designed to complement the diverse architectural styles found throughout NW Crossing.</p>
            </div>
            <div className="p-6 bg-[oklch(0.98_0.003_0)] rounded-lg shadow-sm">
              <h3 className="font-semibold text-[oklch(0.15_0.005_0)] mb-2">Community Garden Inspired Elements</h3>
              <p className="text-[oklch(0.32_0.005_0)]">Incorporating edible plants, fruit trees, and communal gathering spaces into private landscapes.</p>
            </div>
          </div>
        </section>

        {/* Services We Provide in NW Crossing */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-[oklch(0.15_0.005_0)] mb-6 text-center">Services We Provide in NW Crossing</h2>
          <ul className="list-disc list-inside text-[oklch(0.30_0.008_0)] space-y-2">
            <li>Custom Landscape Design & Installation tailored to NW Crossing's aesthetic</li>
            <li>Sustainable & Drought-Tolerant Plant Selection and Planting</li>
            <li>Rain Garden Design and Implementation for Stormwater Management</li>
            <li>Permeable Paving Solutions for Driveways, Patios, and Walkways</li>
            <li>Outdoor Living Spaces: Patios, Decks, and Entertainment Areas</li>
            <li>Water-Efficient Irrigation Systems (Drip & Smart Controllers)</li>
            <li>Native Plant Gardens and Habitat Creation</li>
            <li>Edible Landscaping: Vegetable Gardens, Herb Beds, and Fruit Trees</li>
            <li>Low-Voltage Landscape Lighting for Ambiance and Safety</li>
            <li>Seasonal Clean-up and Garden Maintenance</li>
            <li>Hardscaping: Pathways, Retaining Walls, and Decorative Elements</li>
            <li>Consultation on NW Crossing Community Aesthetic Standards Compliance</li>
            <li>Tree and Shrub Care, Pruning, and Health Management</li>
            <li>Soil Amendment and Health Improvement for Urban Gardens</li>
          </ul>
        </section>

        {/* Recent Projects Section */}
        <section className="bg-[oklch(0.18_0.008_0)] text-[oklch(0.72_0.005_0)] py-12 px-6 rounded-lg mb-12">
          <h2 className="text-3xl font-bold text-[oklch(0.97_0.003_0)] mb-8 text-center">Recent Projects in NW Crossing</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-[oklch(0.12_0.008_0)] p-6 rounded-lg shadow-md">
              <h3 className="font-semibold text-[oklch(0.97_0.003_0)] mb-2">Modern Craftsman Rain Garden</h3>
              <p className="text-[oklch(0.72_0.005_0)]">Designed and installed a beautiful rain garden with native plants and permeable pathways for a modern craftsman home, effectively managing stormwater and enhancing curb appeal.</p>
            </div>
            <div className="bg-[oklch(0.12_0.008_0)] p-6 rounded-lg shadow-md">
              <h3 className="font-semibold text-[oklch(0.97_0.003_0)] mb-2">Eco-Friendly Urban Oasis</h3>
              <p className="text-[oklch(0.72_0.005_0)]">Transformed a compact backyard into a vibrant, low-maintenance urban oasis featuring drought-tolerant plantings, a small patio, and integrated edible garden elements.</p>
            </div>
            <div className="bg-[oklch(0.12_0.008_0)] p-6 rounded-lg shadow-md">
              <h3 className="font-semibold text-[oklch(0.97_0.003_0)] mb-2">Pedestrian-Friendly Front Yard Renovation</h3>
              <p className="text-[oklch(0.72_0.005_0)]">Revitalized a front yard to align with NW Crossing's walkable ethos, incorporating native groundcovers, a welcoming pathway, and subtle landscape lighting.</p>
            </div>
            <div className="bg-[oklch(0.12_0.008_0)] p-6 rounded-lg shadow-md">
              <h3 className="font-semibold text-[oklch(0.97_0.003_0)] mb-2">Community-Inspired Edible Landscape</h3>
              <p className="text-[oklch(0.72_0.005_0)]">Developed an edible landscape design for a family home, featuring raised garden beds, berry bushes, and fruit trees, reflecting the neighborhood's community garden spirit.</p>
            </div>
          </div>
        </section>

        {/* Why NW Crossing Homeowners Choose Newport Avenue */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-[oklch(0.15_0.005_0)] mb-6 text-center">Why NW Crossing Homeowners Choose Newport Avenue</h2>
          <p className="text-[oklch(0.30_0.008_0)] mb-4">
            Newport Avenue Landscaping is deeply rooted in Central Oregon, bringing unparalleled local expertise to every project in NW Crossing. Our extensive experience since 2005, coupled with a team of over 110 dedicated professionals, means we understand the unique microclimates, soil conditions, and aesthetic preferences that define this vibrant urban village. We pride ourselves on crafting landscapes that are not only visually stunning but also sustainable, functional, and perfectly aligned with the community's values.
          </p>
          <p className="text-[oklch(0.30_0.008_0)]">
            Our commitment extends beyond just design and installation; we build lasting relationships with our clients, offering ongoing support and maintenance to ensure your outdoor space thrives for years to come. For NW Crossing homeowners seeking a partner who values quality, sustainability, and local knowledge, Newport Avenue Landscaping is the clear choice to bring your landscape vision to life.
          </p>
        </section>

        {/* Pro Tip Callout Box */}
        <div className="border-l-4 border-[oklch(0.46_0.20_25)] pl-4 py-2 mb-8 bg-[oklch(0.97_0.003_0)] p-4 rounded-md">
          <h3 className="text-xl font-semibold text-[oklch(0.15_0.005_0)] mb-2">Pro Tip for NW Crossing Landscaping</h3>
          <p className="text-[oklch(0.30_0.008_0)]">
            Consider integrating a small rain garden or permeable paver section into your landscape design. This not only helps manage stormwater runoff, a key aspect of sustainable urban living, but also contributes to the overall eco-friendly ethos of NW Crossing, often enhancing the beauty and biodiversity of your yard.
          </p>
        </div>

        {/* FAQ Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-[oklch(0.15_0.005_0)] mb-6 text-center">Frequently Asked Questions About NW Crossing Landscaping</h2>
          <div className="space-y-6">
            {FAQ_SCHEMA.mainEntity.map((faq, index) => (
              <div key={index} className="bg-[oklch(0.98_0.003_0)] p-6 rounded-lg shadow-sm">
                <h3 className="font-semibold text-[oklch(0.15_0.005_0)] mb-2">{faq.name}</h3>
                <p className="text-[oklch(0.32_0.005_0)]">{faq.acceptedAnswer.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-[oklch(0.12_0.008_0)] text-[oklch(0.72_0.005_0)] py-12 px-6 rounded-lg text-center mb-12">
          <h2 className="text-3xl font-bold text-[oklch(0.97_0.003_0)] mb-4">Ready to Transform Your NW Crossing Outdoor Space?</h2>
          <p className="text-lg mb-6">Contact Newport Avenue Landscaping today for a personalized consultation.</p>
          <a
            href="tel:+15415551234" // Placeholder phone number
            className="inline-block bg-[oklch(0.46_0.20_25)] text-white font-bold py-3 px-8 rounded-full text-lg hover:bg-[oklch(0.65_0.20_25)] transition duration-300"
          >
            Call Us Today!
          </a>
        </section>

        {/* Related Links Section */}
        <section>
          <h2 className="text-2xl font-bold text-[oklch(0.15_0.005_0)] mb-4">Helpful Resources for NW Crossing Homeowners</h2>
          <ul className="list-disc list-inside text-[oklch(0.30_0.008_0)] space-y-2">
            <li><Link href="https://nwcrossing.com/" className="text-[oklch(0.46_0.20_25)] hover:underline">NW Crossing Official Website</Link></li>
            <li><Link href="https://www.bendoregon.gov/government/departments/community-development/planning/design-review" className="text-[oklch(0.46_0.20_25)] hover:underline">City of Bend Design Review Guidelines</Link></li>
            <li><Link href="https://www.oregon.gov/owrd/pages/water_conservation.aspx" className="text-[oklch(0.46_0.20_25)] hover:underline">Oregon Water Resources Department - Water Conservation</Link></li>
          </ul>
        </section>
      </main>
    </>
  );
}
