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
      "name": "What are the specific HOA landscaping requirements in Broken Top?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The Broken Top Owners Association (BTOA) has very strict and detailed landscaping guidelines, primarily focused on maintaining the natural volcanic landscape aesthetic and fire-wise principles. This includes specific requirements for native plant usage, basalt rock integration, irrigation efficiency, and regular maintenance schedules. All plans must be submitted and approved by the Architectural Review Committee (ARC) before any work begins."
      }
    },
    {
      "@type": "Question",
      "name": "How does Newport Avenue Landscaping ensure compliance with Broken Top's fire-wise regulations?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Newport Avenue Landscaping is highly experienced in designing and implementing fire-wise landscapes in high-risk zones like Broken Top. We prioritize the use of fire-resistant native plants, create defensible spaces around homes, manage fuel loads, and ensure proper spacing and maintenance of vegetation to minimize fire hazards, all in strict adherence to BTOA and local fire department guidelines."
      }
    },
    {
      "@type": "Question",
      "name": "What kind of native plants are recommended for Broken Top properties?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Broken Top's unique volcanic terrain and high desert climate are best complemented by native plants such as various species of sagebrush, bitterbrush, serviceberry, native grasses like Idaho fescue, and certain conifer varieties. We focus on drought-tolerant, low-maintenance options that thrive in the local ecosystem and meet HOA aesthetic standards."
      }
    },
    {
      "@type": "Question",
      "name": "Can Newport Avenue Landscaping help with landscape design and installation that complements the views of Broken Top volcano?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Absolutely. Our design philosophy in Broken Top is to create landscapes that not only meet HOA requirements but also enhance the stunning natural surroundings, including the iconic views of the Broken Top volcano. We integrate natural basalt rock, thoughtful plant placement, and strategic hardscaping to frame views and create a seamless transition between your property and the high desert environment."
      }
    },
    {
      "@type": "Question",
      "name": "What is the typical timeline for a major landscaping project in Broken Top, considering HOA approvals?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The timeline for a major landscaping project in Broken Top can vary significantly due to the detailed HOA approval process. Initial design and planning can take several weeks, followed by ARC submission and review, which can add another 2-4 weeks. Once approved, the installation phase depends on the project's scope, typically ranging from 4-12 weeks. We work closely with clients to manage expectations and streamline the approval process."
      }
    }
  ]
};

export default function BrokenTopLandscaping() {
  return (
    <>
      <SEO
        title="Broken Top Landscaping Services - Newport Avenue Landscaping"
        description="Expert landscaping services in Broken Top, Bend, Oregon. Specializing in HOA compliance, fire-wise design, and natural volcanic aesthetics for luxury homes."
        
      />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "/" },
          { name: "Neighborhoods", url: "/neighborhoods" },
          { name: "Broken Top", url: "/broken-top-landscaping" },
        ]}
      />
      <Navbar />

      {/* Hero Section */}
      <section className="relative bg-[oklch(0.12_0.008_0)] text-[oklch(0.72_0.005_0)] py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block bg-[oklch(0.46_0.20_25)] text-[oklch(0.65_0.20_25)] text-xs font-semibold px-3 py-1 rounded-full uppercase mb-4">
            Luxury Landscaping
          </span>
          <h1 className="text-5xl font-extrabold leading-tight text-[oklch(0.15_0.005_0)] mb-4">
            Broken Top Landscaping
          </h1>
          <p className="text-xl text-[oklch(0.72_0.005_0)]">
            Crafting bespoke outdoor living spaces that complement Broken Top's exclusive character.
          </p>
        </div>
      </section>

      {/* Main Content Container */}
      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-[oklch(0.30_0.008_0)]">
        {/* FAQ Schema Script Tag */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }}
        />

        {/* Intro Paragraph */}
        <p className="mb-8">
          Newport Avenue Landscaping has been a trusted partner for Broken Top homeowners since 2005, bringing unparalleled expertise to this prestigious gated community. Our deep understanding of Broken Top's unique environmental demands, stringent HOA regulations, and desire for luxury outdoor living allows us to create landscapes that are both stunning and compliant.
        </p>

        {/* HOA/Community Standards Section */}
        <div className="border border-gray-300 p-6 rounded-lg mb-8 bg-[oklch(0.97_0.003_0)]">
          <h2 className="text-2xl font-bold text-[oklch(0.15_0.005_0)] mb-4">Broken Top HOA & Architectural Review</h2>
          <p className="text-[oklch(0.30_0.008_0)] mb-4">
            The Broken Top Club and Owners Association maintains very strict Architectural Review Committee (ARC) guidelines to preserve the community's aesthetic integrity and natural beauty. All exterior modifications, including landscaping, require prior approval. Our team is intimately familiar with these CC&Rs, ensuring your project is designed and executed seamlessly within the established framework, from initial concept to final approval.
          </p>
          <p className="text-[oklch(0.30_0.008_0)]">
            Key considerations include native plant palettes, integration of natural basalt rock, fire-wise landscaping principles, and irrigation efficiency. We handle all necessary documentation and submissions to the ARC on your behalf.
          </p>
        </div>

        {/* What Makes Broken Top Landscaping Unique */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-[oklch(0.15_0.005_0)] mb-6 text-center">What Makes Broken Top Landscaping Unique?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-6 rounded-lg shadow-md bg-[oklch(0.98_0.003_0)]">
              <h3 className="font-semibold text-xl text-[oklch(0.15_0.005_0)] mb-2">Volcanic Terrain Integration</h3>
              <p className="text-[oklch(0.32_0.005_0)]">Seamlessly blending landscapes with the natural basalt rock formations and high desert character unique to Broken Top.</p>
            </div>
            <div className="p-6 rounded-lg shadow-md bg-[oklch(0.98_0.003_0)]">
              <h3 className="font-semibold text-xl text-[oklch(0.15_0.005_0)] mb-2">Strict HOA Compliance</h3>
              <p className="text-[oklch(0.32_0.005_0)]">Expert navigation and adherence to the Broken Top Owners Association's rigorous landscaping and architectural guidelines.</p>
            </div>
            <div className="p-6 rounded-lg shadow-md bg-[oklch(0.98_0.003_0)]">
              <h3 className="font-semibold text-xl text-[oklch(0.15_0.005_0)] mb-2">Fire-Wise Design</h3>
              <p className="text-[oklch(0.32_0.005_0)]">Implementing strategic fire-resistant plant choices and defensible space planning crucial for this high-risk zone.</p>
            </div>
            <div className="p-6 rounded-lg shadow-md bg-[oklch(0.98_0.003_0)]">
              <h3 className="font-semibold text-xl text-[oklch(0.15_0.005_0)] mb-2">Luxury Outdoor Living</h3>
              <p className="text-[oklch(0.32_0.005_0)]">Creating sophisticated outdoor spaces that enhance the value and resort-style living of Broken Top homes.</p>
            </div>
            <div className="p-6 rounded-lg shadow-md bg-[oklch(0.98_0.003_0)]">
              <h3 className="font-semibold text-xl text-[oklch(0.15_0.005_0)] mb-2">Native Plant Expertise</h3>
              <p className="text-[oklch(0.32_0.005_0)]">Specializing in drought-tolerant, native plant palettes that thrive in Central Oregon's climate and meet aesthetic requirements.</p>
            </div>
            <div className="p-6 rounded-lg shadow-md bg-[oklch(0.98_0.003_0)]">
              <h3 className="font-semibold text-xl text-[oklch(0.15_0.005_0)] mb-2">Views of Broken Top Volcano</h3>
              <p className="text-[oklch(0.32_0.005_0)]">Designing landscapes that thoughtfully frame and enhance the breathtaking views of the iconic Broken Top volcano.</p>
            </div>
          </div>
        </section>

        {/* Services We Provide in Broken Top */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-[oklch(0.15_0.005_0)] mb-6 text-center">Services We Provide in Broken Top</h2>
          <ul className="list-disc list-inside space-y-2 text-[oklch(0.30_0.008_0)]">
            <li>Custom Landscape Design & Master Planning (HOA ARC Submission & Approval)</li>
            <li>Fire-Wise Landscape Installation & Maintenance</li>
            <li>Native & Drought-Tolerant Plant Selection & Installation</li>
            <li>Natural Basalt Rock Walls & Features</li>
            <li>High-Efficiency Irrigation Systems (Drip & Smart Controllers)</li>
            <li>Outdoor Living Spaces: Patios, Kitchens, Fire Pits</li>
            <li>Water Features: Ponds, Streams, Basalt Fountains</li>
            <li>Landscape Lighting Design & Installation</li>
            <li>Seasonal Clean-up & Pruning</li>
            <li>Weed Control & Fertilization Programs</li>
            <li>Tree & Shrub Care</li>
            <li>Erosion Control & Drainage Solutions</li>
            <li>Private Security Landscape Integration</li>
            <li>Perimeter & Entryway Landscaping</li>
          </ul>
        </section>

        {/* Recent Projects Section */}
        <section className="bg-[oklch(0.18_0.008_0)] text-[oklch(0.72_0.005_0)] py-12 px-6 rounded-lg mb-12">
          <h2 className="text-3xl font-bold text-[oklch(0.15_0.005_0)] mb-8 text-center">Recent Projects in Broken Top</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-[oklch(0.12_0.008_0)] p-6 rounded-lg shadow-md">
              <h3 className="font-semibold text-xl text-[oklch(0.72_0.005_0)] mb-2">Volcanic Vista Garden</h3>
              <p className="text-[oklch(0.72_0.005_0)]">A stunning landscape designed to maximize views of Broken Top volcano, featuring extensive basalt rockwork and native plantings, fully compliant with HOA guidelines.</p>
            </div>
            <div className="bg-[oklch(0.12_0.008_0)] p-6 rounded-lg shadow-md">
              <h3 className="font-semibold text-xl text-[oklch(0.72_0.005_0)] mb-2">Fire-Wise Family Retreat</h3>
              <p className="text-[oklch(0.72_0.005_0)]">Created a safe, beautiful, and functional outdoor space with fire-resistant zones, a custom patio, and drought-tolerant gardens for a family home.</p>
            </div>
            <div className="bg-[oklch(0.12_0.008_0)] p-6 rounded-lg shadow-md">
              <h3 className="font-semibold text-xl text-[oklch(0.72_0.005_0)] mb-2">Modern High Desert Oasis</h3>
              <p className="text-[oklch(0.72_0.005_0)]">Integrated modern design elements with the natural high desert aesthetic, including a sleek water feature and low-maintenance native plantings.</p>
            </div>
            <div className="bg-[oklch(0.12_0.008_0)] p-6 rounded-lg shadow-md">
              <h3 className="font-semibold text-xl text-[oklch(0.72_0.005_0)] mb-2">Golf Course Adjacent Sanctuary</h3>
              <p className="text-[oklch(0.72_0.005_0)]">Designed a private sanctuary adjacent to the Broken Top Club golf course, focusing on privacy, serene planting, and seamless integration with the course's perimeter.</p>
            </div>
          </div>
        </section>

        {/* Why Broken Top Homeowners Choose Newport Avenue */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-[oklch(0.15_0.005_0)] mb-6 text-center">Why Broken Top Homeowners Choose Newport Avenue</h2>
          <p className="mb-4 text-[oklch(0.30_0.008_0)]">
            For discerning homeowners in Broken Top, Newport Avenue Landscaping stands out due to our deep-rooted local knowledge and unwavering commitment to excellence. We understand the unique challenges and opportunities presented by this exclusive community, from navigating the stringent HOA regulations to designing landscapes that thrive in the high desert volcanic terrain. Our team of 110+ experienced professionals, operating with LCB #9153 since 2005, ensures every project is executed with precision, artistry, and a keen eye for detail.
          </p>
          <p className="text-[oklch(0.30_0.008_0)]">
            We pride ourselves on creating outdoor environments that not only enhance the beauty and value of your luxury home but also respect and complement the natural character of Broken Top. Our proactive approach to fire-wise landscaping and sustainable practices provides peace of mind, knowing your investment is protected and your property is a harmonious extension of Central Oregon's stunning landscape.
          </p>
        </section>

        {/* Pro Tip Callout Box */}
        <div className="border-l-4 border-[oklch(0.46_0.20_25)] pl-4 py-2 mb-12 bg-[oklch(0.97_0.003_0)]">
          <p className="font-bold text-[oklch(0.15_0.005_0)]">Pro Tip for Broken Top Homeowners:</p>
          <p className="text-[oklch(0.30_0.008_0)]">When planning any landscape changes, always begin by consulting the Broken Top Owners Association's Architectural Review Committee (ARC) guidelines. Early engagement with the ARC and a landscape partner familiar with their requirements, like Newport Avenue Landscaping, can save significant time and ensure a smooth project approval process.</p>
        </div>

        {/* FAQ Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-[oklch(0.15_0.005_0)] mb-6 text-center">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {FAQ_SCHEMA.mainEntity.map((faq, index) => (
              <div key={index} className="bg-[oklch(0.98_0.003_0)] p-6 rounded-lg shadow-md">
                <h3 className="font-semibold text-xl text-[oklch(0.15_0.005_0)] mb-2">{faq.name}</h3>
                <p className="text-[oklch(0.32_0.005_0)]">{faq.acceptedAnswer.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-[oklch(0.12_0.008_0)] text-[oklch(0.72_0.005_0)] py-16 text-center rounded-lg mb-12">
          <h2 className="text-4xl font-extrabold text-[oklch(0.15_0.005_0)] mb-4">Ready to Transform Your Broken Top Landscape?</h2>
          <p className="text-xl text-[oklch(0.72_0.005_0)] mb-8">
            Contact Newport Avenue Landscaping today for a personalized consultation.
          </p>
          <a
            href="tel:+15415551234" // Placeholder phone number
            className="inline-block bg-[oklch(0.46_0.20_25)] text-white font-bold py-3 px-8 rounded-full text-lg hover:bg-[oklch(0.50_0.22_25)] transition duration-300"
          >
            Call Us Today: (541) 555-1234
          </a>
        </section>

        {/* Related Links Section */}
        <section>
          <h2 className="text-2xl font-bold text-[oklch(0.15_0.005_0)] mb-4">Explore More Resources</h2>
          <ul className="list-disc list-inside space-y-2 text-[oklch(0.30_0.008_0)]">
            <li>
              <Link href="/services/fire-wise-landscaping" className="text-[oklch(0.46_0.20_25)] hover:underline">
                Fire-Wise Landscaping Solutions
              </Link>
            </li>
            <li>
              <Link href="/about/our-process" className="text-[oklch(0.46_0.20_25)] hover:underline">
                Our Landscape Design & Build Process
              </Link>
            </li>
            <li>
              <Link href="/contact" className="text-[oklch(0.46_0.20_25)] hover:underline">
                Request a Consultation
              </Link>
            </li>
          </ul>
        </section>
      </main>
    </>
  );
}
