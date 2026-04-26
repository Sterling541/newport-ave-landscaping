import Navbar from '@/components/Navbar';
import SEO from '@/components/SEO';
import { BreadcrumbSchema } from '@/components/SchemaMarkup';
import { Link } from "wouter";

const FAQ_SCHEMA = [
  {
    question: "What are the specific HOA landscaping requirements in Tetherow?",
    answer: "Tetherow's HOA has stringent CC&Rs designed to maintain the community's high-end aesthetic and preserve the natural high desert character. This includes strict guidelines on plant palettes (favoring native juniper and sage), irrigation, hardscaping materials, and overall landscape design. All plans must be submitted and approved by the HOA's architectural review committee before any work begins. Newport Avenue Landscaping is intimately familiar with these requirements and can ensure full compliance.",
  },
  {
    question: "How does Newport Avenue Landscaping address fire risk in Tetherow properties?",
    answer: "Given Tetherow's location in a fire risk zone, fire-wise landscaping is paramount. We specialize in creating defensible spaces by selecting fire-resistant plants, maintaining proper spacing, managing fuel loads, and advising on hardscaping elements that reduce wildfire hazards. Our designs prioritize both safety and aesthetic appeal, integrating seamlessly with the natural environment while protecting your luxury home.",
  },
  {
    question: "Can Newport Avenue Landscaping design resort-style outdoor living spaces in Tetherow?",
    answer: "Absolutely. Tetherow homes often feature expansive outdoor living areas, and we excel at designing and installing resort-style amenities. This includes custom patios, outdoor kitchens, fire pits, water features, sophisticated lighting, and native plant gardens that enhance the luxury experience and maximize enjoyment of the Cascade mountain views, all while adhering to HOA guidelines.",
  },
  {
    question: "What kind of plants are suitable for Tetherow's juniper-sage aesthetic?",
    answer: "The Tetherow aesthetic emphasizes native and drought-tolerant plants that thrive in Central Oregon's high desert climate and complement the juniper-sage landscape. We recommend species such as various native grasses, penstemons, sedums, certain varieties of sagebrush, and carefully selected conifers. Our designs focus on creating a natural, low-maintenance landscape that respects the local ecosystem and meets HOA approval.",
  },
  {
    question: "How does Newport Avenue Landscaping ensure designs complement the Tetherow Golf Club environment?",
    answer: "Our designs for Tetherow properties are meticulously crafted to harmonize with the prestigious Tom Doak-designed golf course and the surrounding natural beauty. We consider sightlines, natural contours, and the overall resort ambiance, ensuring that your landscape enhances the property's value and integrates seamlessly with the community's unique character, from plant selection to hardscape finishes.",
  },
];

export default function TetherowLandscaping() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ_SCHEMA.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <>
      <SEO
        title="Tetherow Landscaping Services | Newport Avenue Landscaping"
        description="Newport Avenue Landscaping offers bespoke landscaping services for Tetherow, Bend. Specializing in HOA compliance, fire-wise design, and luxury outdoor living spaces that complement the high desert aesthetic."
        
      />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "/" },
          { name: "Neighborhoods", url: "/neighborhoods" },
          { name: "Tetherow", url: "/neighborhoods/tetherow" },
        ]}
      />
      <Navbar />

      {/* Hero Section */}
      <section className="relative bg-[oklch(0.12_0.008_0)] text-[oklch(0.72_0.005_0)] py-20 md:py-32">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block bg-[oklch(0.46_0.20_25)] text-[oklch(0.65_0.20_25)] text-xs font-semibold px-3 py-1 rounded-full uppercase mb-4">
            Tetherow Community
          </span>
          <h1 className="text-4xl md:text-6xl font-bold leading-tight text-[oklch(0.97_0.003_0)] mb-6">
            Exceptional Landscaping for Tetherow Homes
          </h1>
          <p className="text-xl text-[oklch(0.72_0.005_0)] max-w-2xl mx-auto">
            Crafting bespoke outdoor environments that harmonize with Tetherow's unique high desert aesthetic, strict HOA standards, and the prestigious Tom Doak golf course.
          </p>
        </div>
      </section>

      {/* Main Content Container */}
      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-[oklch(0.30_0.008_0)]">
        {/* FAQ Schema Script Tag */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        {/* Intro Paragraph */}
        <p className="mb-8 leading-relaxed">
          Newport Avenue Landscaping has been a trusted partner in the Tetherow community since its inception, bringing over two decades of Central Oregon expertise to this exclusive resort neighborhood. Our deep understanding of Tetherow's unique landscape, from its juniper-sage aesthetic to its stringent architectural guidelines, allows us to create outdoor spaces that are both breathtaking and perfectly compliant. We pride ourselves on enhancing the natural beauty of your luxury home while ensuring long-term sustainability and fire safety.
        </p>

        {/* HOA/Community Standards Section */}
        <div className="border-l-4 border-[oklch(0.46_0.20_25)] bg-[oklch(0.98_0.003_0)] p-4 mb-8 shadow-sm">
          <h3 className="text-xl font-semibold text-[oklch(0.15_0.005_0)] mb-2">Tetherow HOA & Architectural Review</h3>
          <p className="text-[oklch(0.32_0.005_0)] leading-relaxed">
            The Tetherow Owners Association (TOA) maintains rigorous Covenants, Conditions, and Restrictions (CC&Rs) to preserve the community's distinctive character and property values. All landscape modifications, from plant selection to hardscape design, require prior approval from the TOA's Architectural Review Committee. Newport Avenue Landscaping has an established track record of successful submissions and approvals, ensuring your project proceeds smoothly and meets all community standards for design, materials, and native plant integration.
          </p>
        </div>

        {/* What Makes Tetherow Landscaping Unique */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-[oklch(0.15_0.005_0)] mb-6 text-center">What Makes Tetherow Landscaping Unique</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-6 bg-[oklch(0.97_0.003_0)] rounded-lg shadow-sm">
              <h3 className="font-semibold text-lg text-[oklch(0.15_0.005_0)] mb-2">Gated Resort Exclusivity</h3>
              <p className="text-[oklch(0.32_0.005_0)]">Landscaping that respects the privacy and luxury of a premier gated community, focusing on high-end finishes and meticulous maintenance.</p>
            </div>
            <div className="p-6 bg-[oklch(0.97_0.003_0)] rounded-lg shadow-sm">
              <h3 className="font-semibold text-lg text-[oklch(0.15_0.005_0)] mb-2">Tom Doak Golf Course Integration</h3>
              <p className="text-[oklch(0.32_0.005_0)]">Designs that complement the world-class Tetherow Golf Club, ensuring seamless transitions and unobstructed views.</p>
            </div>
            <div className="p-6 bg-[oklch(0.97_0.003_0)] rounded-lg shadow-sm">
              <h3 className="font-semibold text-lg text-[oklch(0.15_0.005_0)] mb-2">Juniper-Sage Aesthetic</h3>
              <p className="text-[oklch(0.32_0.005_0)]">Embracing and enhancing the natural high desert character with native plant palettes and sustainable practices.</p>
            </div>
            <div className="p-6 bg-[oklch(0.97_0.003_0)] rounded-lg shadow-sm">
              <h3 className="font-semibold text-lg text-[oklch(0.15_0.005_0)] mb-2">Fire Risk Zone Expertise</h3>
              <p className="text-[oklch(0.32_0.005_0)]">Implementing fire-wise landscaping strategies to create defensible spaces without compromising beauty.</p>
            </div>
            <div className="p-6 bg-[oklch(0.97_0.003_0)] rounded-lg shadow-sm">
              <h3 className="font-semibold text-lg text-[oklch(0.15_0.005_0)] mb-2">Luxury Outdoor Living</h3>
              <p className="text-[oklch(0.32_0.005_0)]">Designing and installing sophisticated outdoor kitchens, patios, and water features for resort-style enjoyment.</p>
            </div>
            <div className="p-6 bg-[oklch(0.97_0.003_0)] rounded-lg shadow-sm">
              <h3 className="font-semibold text-lg text-[oklch(0.15_0.005_0)] mb-2">Cascade Mountain Views</h3>
              <p className="text-[oklch(0.32_0.005_0)]">Strategic landscape planning to frame and preserve stunning vistas of the surrounding mountains.</p>
            </div>
          </div>
        </section>

        {/* Services We Provide in Tetherow */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-[oklch(0.15_0.005_0)] mb-6 text-center">Services We Provide in Tetherow</h2>
          <ul className="list-disc list-inside space-y-2 text-[oklch(0.32_0.005_0)] leading-relaxed">
            <li>Custom Landscape Design & Master Planning tailored to Tetherow's aesthetic</li>
            <li>HOA Architectural Review Board Submission & Approval Management</li>
            <li>Fire-Wise Landscaping & Defensible Space Creation</li>
            <li>Native & Drought-Tolerant Plant Selection and Installation (Juniper-Sage Palette)</li>
            <li>High-Efficiency Irrigation Systems (Drip & Smart Controllers)</li>
            <li>Luxury Outdoor Living Spaces: Patios, Decks, Pergolas</li>
            <li>Outdoor Kitchens & Entertainment Areas</li>
            <li>Custom Water Features (Ponds, Waterfalls, Fountains)</li>
            <li>Landscape Lighting Design & Installation</li>
            <li>Hardscaping: Pavers, Natural Stone Pathways, Retaining Walls</li>
            <li>Ongoing Landscape Maintenance & Estate Management</li>
            <li>Tree & Shrub Care, Pruning, and Health Management</li>
            <li>Seasonal Color & Container Gardening</li>
            <li>Erosion Control & Slope Stabilization</li>
            <li>View Corridor Preservation & Enhancement</li>
          </ul>
        </section>

        {/* Recent Projects Section */}
        <section className="bg-[oklch(0.18_0.008_0)] text-[oklch(0.72_0.005_0)] py-12 px-6 rounded-lg mb-12">
          <h2 className="text-3xl font-bold text-[oklch(0.97_0.003_0)] mb-8 text-center">Recent Projects in Tetherow</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-[oklch(0.12_0.008_0)] rounded-lg overflow-hidden shadow-lg">
              <img src="/images/tetherow-project-1.jpg" alt="Tetherow Project 1" className="w-full h-48 object-cover" />
              <div className="p-4">
                <h3 className="font-semibold text-xl text-[oklch(0.97_0.003_0)] mb-2">Golf Course View Enhancement</h3>
                <p className="text-[oklch(0.72_0.005_0)]">A stunning landscape designed to maximize views of the Tom Doak golf course while integrating native plants.</p>
              </div>
            </div>
            <div className="bg-[oklch(0.12_0.008_0)] rounded-lg overflow-hidden shadow-lg">
              <img src="/images/tetherow-project-2.jpg" alt="Tetherow Project 2" className="w-full h-48 object-cover" />
              <div className="p-4">
                <h3 className="font-semibold text-xl text-[oklch(0.97_0.003_0)] mb-2">Fire-Wise Luxury Retreat</h3>
                <p className="text-[oklch(0.72_0.005_0)]">Creating a defensible space with elegant, fire-resistant landscaping around a luxury Tetherow home.</p>
              </div>
            </div>
            <div className="bg-[oklch(0.12_0.008_0)] rounded-lg overflow-hidden shadow-lg">
              <img src="/images/tetherow-project-3.jpg" alt="Tetherow Project 3" className="w-full h-48 object-cover" />
              <div className="p-4">
                <h3 className="font-semibold text-xl text-[oklch(0.97_0.003_0)] mb-2">Resort-Style Outdoor Oasis</h3>
                <p className="text-[oklch(0.72_0.005_0)]">Installation of an expansive outdoor kitchen and entertainment area, perfect for Tetherow living.</p>
              </div>
            </div>
            <div className="bg-[oklch(0.12_0.008_0)] rounded-lg overflow-hidden shadow-lg">
              <img src="/images/tetherow-project-4.jpg" alt="Tetherow Project 4" className="w-full h-48 object-cover" />
              <div className="p-4">
                <h3 className="font-semibold text-xl text-[oklch(0.97_0.003_0)] mb-2">Native High Desert Garden</h3>
                <p className="text-[oklch(0.72_0.005_0)]">A beautiful, low-maintenance garden designed with native juniper and sage, fully HOA compliant.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Why Tetherow Homeowners Choose Newport Avenue */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-[oklch(0.15_0.005_0)] mb-6 text-center">Why Tetherow Homeowners Choose Newport Avenue</h2>
          <p className="mb-4 leading-relaxed">
            For homeowners in Tetherow, choosing a landscaping partner means selecting a team that understands the nuances of luxury, exclusivity, and environmental stewardship. Newport Avenue Landscaping, with LCB #9153 and over 110 dedicated employees, brings unparalleled experience in navigating Tetherow's specific challenges, from strict HOA guidelines to the unique demands of high desert, fire-prone landscapes. Our commitment to quality, sustainable practices, and bespoke design ensures your outdoor space is not just beautiful, but also a valuable, compliant, and enduring asset to your property.
          </p>
          <p className="leading-relaxed">
            Our reputation in Central Oregon, built since 2005, is founded on trust, meticulous craftsmanship, and a deep respect for the natural environment that makes Tetherow so special. We work collaboratively with each homeowner, listening to your vision and translating it into a stunning reality that enhances your lifestyle and complements the architectural integrity of your home. With Newport Avenue, you gain a partner dedicated to excellence, ensuring your Tetherow landscape is a source of pride and enjoyment for years to come.
          </p>
        </section>

        {/* Pro Tip Callout Box */}
        <div className="border-l-4 border-[oklch(0.46_0.20_25)] bg-[oklch(0.98_0.003_0)] p-4 mb-8 shadow-sm">
          <h3 className="text-xl font-semibold text-[oklch(0.15_0.005_0)] mb-2">Pro Tip for Tetherow Homeowners: Fire-Wise Plant Selection</h3>
          <p className="text-[oklch(0.32_0.005_0)] leading-relaxed">
            When planning your Tetherow landscape, prioritize fire-resistant plant species and maintain adequate spacing between plants and structures. Opt for succulents, deciduous shrubs, and certain native grasses over highly flammable evergreens near your home. This not only protects your property but also aligns with Tetherow's commitment to safety and natural aesthetics. Always consult with a professional who understands local fire codes and HOA regulations.
          </p>
        </div>

        {/* FAQ Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-[oklch(0.15_0.005_0)] mb-6 text-center">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {FAQ_SCHEMA.map((item, index) => (
              <div key={index} className="p-6 bg-[oklch(0.97_0.003_0)] rounded-lg shadow-sm">
                <h3 className="font-semibold text-lg text-[oklch(0.15_0.005_0)] mb-2">{item.question}</h3>
                <p className="text-[oklch(0.32_0.005_0)] leading-relaxed">{item.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-[oklch(0.18_0.008_0)] text-[oklch(0.72_0.005_0)] py-12 px-6 rounded-lg text-center mb-12">
          <h2 className="text-3xl font-bold text-[oklch(0.97_0.003_0)] mb-4">Ready to Transform Your Tetherow Landscape?</h2>
          <p className="text-xl mb-6">Contact Newport Avenue Landscaping today for a personalized consultation.</p>
          <Link href="tel:+15415551234" className="inline-block bg-[oklch(0.46_0.20_25)] text-[oklch(0.97_0.003_0)] font-bold py-3 px-8 rounded-full hover:bg-[oklch(0.65_0.20_25)] transition duration-300">
            Call Us Today: (541) 555-1234
          </Link>
        </section>

        {/* Related Links Section */}
        <section>
          <h2 className="text-2xl font-bold text-[oklch(0.15_0.005_0)] mb-4">Explore More Resources</h2>
          <ul className="list-disc list-inside space-y-2 text-[oklch(0.32_0.005_0)]">
            <li><Link href="/services/fire-wise-landscaping" className="text-[oklch(0.46_0.20_25)] hover:underline">Fire-Wise Landscaping Solutions</Link></li>
            <li><Link href="https://www.tetherow.com/hoa" target="_blank" rel="noopener noreferrer" className="text-[oklch(0.46_0.20_25)] hover:underline">Tetherow Owners Association (External Link)</Link></li>
            <li><Link href="/portfolio/luxury-outdoor-spaces" className="text-[oklch(0.46_0.20_25)] hover:underline">Our Luxury Outdoor Living Portfolio</Link></li>
          </ul>
        </section>
      </main>
    </>
  );
}