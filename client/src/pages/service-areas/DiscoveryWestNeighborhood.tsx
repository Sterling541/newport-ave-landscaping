import Navbar from '@/components/Navbar';
import SEO from '@/components/SEO';
import { BreadcrumbSchema } from '@/components/SchemaMarkup';
import { Link } from 'wouter';

export default function DiscoveryWestNeighborhood() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: 'oklch(0.97 0.003 0)' }}>
      <SEO
        title="Landscaping Discovery West Bend Oregon | Newport Ave Landscaping"
        description="Discover expert landscaping services in Discovery West, Bend Oregon. Newport Ave Landscaping specializes in modern, xeriscape-friendly designs for homes and HOAs."
        canonical="https://newportavelandscaping.com/service-areas/discovery-west-landscaping"
      />
      <BreadcrumbSchema items={[
        { name: 'Home', url: '/' },
        { name: 'Service Areas', url: '/service-areas' },
        { name: 'Discovery West Landscaping', url: '/service-areas/discovery-west-landscaping' },
      ]} />
      <Navbar />
      <div style={{ paddingTop: '204px' }}>
        {/* Hero banner */}
        <div
          className="relative flex items-center justify-center"
          style={{
            height: '380px',
            backgroundImage: 'url(https://d2xsxph8kpxj0f.cloudfront.net/310519663503028182/g3pw3MRUapabcDUbhBEFxx/awbrey-butte-loop-02_77381709.jpg',
            backgroundSize: 'cover',
            backgroundPosition: 'center 50%',
          }}
        >
          <div className="absolute inset-0" style={{ backgroundColor: 'oklch(0 0 0 / 0.55)' }} />
          <div className="relative text-center container">
            <p className="font-label mb-3" style={{ color: 'oklch(0.72 0.12 25)', fontSize: '0.7rem', letterSpacing: '0.18em' }}>
              SERVICE AREAS &middot; 2026
            </p>
            <h1 className="font-display text-white" style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)', maxWidth: '700px', margin: '0 auto' }}>
              Expert Landscaping Services in Discovery West, Bend Oregon
            </h1>
          </div>
        </div>

        {/* Article body */}
        <div className="container py-16 max-w-3xl mx-auto">
          <div style={{ color: 'oklch(0.25 0.005 0)' }}>
            <p className="mb-6">
              Discovery West, nestled on Bend's west side, is renowned for its distinctive modern and contemporary architectural style, a design philosophy that extends seamlessly into its outdoor spaces. At Newport Ave Landscaping, we understand that effective <strong>landscaping in Discovery West Bend Oregon</strong> requires a nuanced approach, blending innovative design with the unique environmental challenges of Central Oregon. Our team, with over 21 years of experience in the high desert climate, is adept at creating landscapes that not only complement the neighborhood's aesthetic but also thrive in its specific conditions, including volcanic pumice soil and an elevation of 3,600ft.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">Designing for Discovery West's Modern Aesthetic</h2>
            <p className="mb-6">
              The contemporary homes of Discovery West demand landscapes that are equally sophisticated and functional. We specialize in designs that feature clean lines, thoughtful material selections, and a harmonious integration with the natural surroundings. This often involves incorporating native plants, strategic hardscaping, and innovative irrigation solutions to create outdoor living spaces that are both beautiful and sustainable. Our expertise ensures your landscape enhances your home's modern appeal while respecting the neighborhood's overall vision.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">Newport Ave Landscaping's Presence in Discovery West</h2>
            <p className="mb-6">
              Newport Ave Landscaping is proud to have contributed to the vibrant community of Discovery West, including our significant commercial installation project at the Discovery West Plaza. This project showcases our capability to deliver high-quality, aesthetically aligned landscaping solutions for both commercial and residential properties within the neighborhood. Our deep understanding of the area's specific requirements, from design preferences to ecological considerations, makes us the ideal partner for your landscaping needs.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">Residential Landscaping Services Tailored for Your Home</h2>
            <p className="mb-6">
              For homeowners in Discovery West, we offer a comprehensive suite of residential landscaping services. Whether you're looking for a complete landscape overhaul, routine maintenance, or specialized installations, our licensed and bonded team (LCB #9153) is equipped to handle projects of all sizes. We focus on creating personalized outdoor spaces that reflect your lifestyle while adhering to the modern and contemporary themes prevalent in the neighborhood. From custom patios to intricate planting schemes, we bring your vision to life.
            </p>

            <div className="bg-gray-100 p-6 rounded-lg my-8">
              <h3 className="font-bold text-lg mb-2">PRO TIP: Navigating HOA Guidelines</h3>
              <p>
                Discovery West, like many planned communities, has specific Homeowners Association (HOA) guidelines regarding landscaping. Before embarking on any significant outdoor project, it's crucial to review these regulations. Newport Ave Landscaping has extensive experience working within HOA frameworks across Bend and Central Oregon. We can help you design and implement a landscape plan that not only meets your desires but also complies fully with all Discovery West HOA requirements, ensuring a smooth approval process.
              </p>
            </div>

            <h2 className="text-2xl font-bold mt-8 mb-4">Embracing Xeriscape-Friendly Designs in the High Desert</h2>
            <p className="mb-6">
              Given Bend's high desert climate, with its Zone 6b hardiness and limited rainfall, xeriscape-friendly designs are not just a trend but a necessity. We specialize in creating beautiful, water-wise landscapes that minimize irrigation needs while maximizing visual appeal. This involves selecting drought-tolerant plants, utilizing efficient drip irrigation systems, and incorporating permeable hardscaping materials. Our xeriscape solutions are designed to thrive in Central Oregon's unique environment, offering sustainability without compromising on the modern aesthetic of Discovery West.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">Understanding Landscaping Costs in Bend, Oregon</h2>
            <p className="mb-6">
              Landscaping costs in Bend, Oregon, can vary significantly based on the scope, materials, and complexity of the project. For a typical residential landscape installation in Discovery West, homeowners can expect to invest anywhere from <strong>$15,000 to $75,000+</strong>. Smaller projects like garden bed renovations or irrigation system upgrades might range from <strong>$3,000 to $10,000</strong>. Larger, custom designs incorporating extensive hardscaping, water features, and mature plantings can easily exceed <strong>$100,000</strong>. These figures are general estimates for the Central Oregon market, and a detailed consultation with Newport Ave Landscaping will provide a precise quote tailored to your specific vision and property.
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4">Why Choose Newport Ave Landscaping for Discovery West?</h2>
            <p className="mb-6">
              With 21+ years serving Bend, Redmond, Sisters, Sunriver, Tumalo, Prineville, La Pine, and Madras, Newport Ave Landscaping brings unparalleled local expertise to every project. Our commitment to quality, sustainable practices, and client satisfaction has made us a trusted name in Central Oregon. We understand the nuances of the local ecosystem, from the Deschutes River's influence to the specific challenges of volcanic soil, ensuring your landscape is not only beautiful but also resilient. Let us transform your outdoor space into a stunning extension of your Discovery West home.
            </p>

            {/* CTA BLOCK at bottom */}
            <div className="text-center py-12 bg-gray-50 rounded-lg mt-12">
              <h3 className="text-3xl font-display mb-4" style={{ color: 'oklch(0.25 0.005 0)' }}>
                Ready to Enhance Your Discovery West Landscape?
              </h3>
              <p className="text-lg mb-6" style={{ color: 'oklch(0.25 0.005 0)' }}>
                Contact Newport Ave Landscaping today for a personalized consultation.
              </p>
              <Link href="/contact">
                <span className="inline-block bg-green-700 text-white font-bold py-3 px-8 rounded-full hover:bg-green-800 transition duration-300">
                  Get a Free Estimate
                </span>
              </Link>
              <p className="text-sm mt-4" style={{ color: 'oklch(0.25 0.005 0)' }}>
                Call us at <a href="tel:+15416178873" className="underline">(541) 617-8873</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}