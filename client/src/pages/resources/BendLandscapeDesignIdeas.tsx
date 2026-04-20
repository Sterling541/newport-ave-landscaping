import Navbar from '@/components/Navbar';
import SEO from '@/components/SEO';
import { BreadcrumbSchema, FAQSchema } from '@/components/SchemaMarkup';
import { Link } from 'wouter';

export default function BendLandscapeDesignIdeas() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: 'oklch(0.97 0.003 0)' }}>
      <SEO
        title="Landscape Design Ideas for Bend, Oregon | Newport Ave"
        description="Landscape design ideas for Bend, Oregon homes. Patio styles, plant combinations, and outdoor living concepts for Central Oregon."
        canonical="https://newportavelandscaping.com/resources/landscape-design-ideas-bend-oregon"
      />
      <BreadcrumbSchema items={[
        { name: 'Home', url: '/' },
        { name: 'Resources', url: '/resources' },
        { name: 'Landscape Design Ideas for Bend, Oregon Homes', url: '/resources/landscape-design-ideas-bend-oregon' },
      ]} />
      <FAQSchema faqs={[
        { question: `What are the best plants for landscaping in Bend, Oregon's climate?`, answer: `Given Bend's Zone 6a climate, volcanic soil, and 11 inches of annual rainfall, drought-tolerant and cold-hardy plants thrive. Consider native plants like Manzanita, Oregon Grape, and various conifer species, which are well-adapted to the freeze-thaw cycles and dry summers. Selecting the right plants ensures a beautiful and sustainable landscape.` },
        { question: `How do Bend's volcanic soil and low rainfall affect landscape design?`, answer: `Bend's unique volcanic soil drains quickly, and with only 11 inches of annual rainfall, water conservation is key. Landscape designs should prioritize xeriscaping principles, utilizing native plants and efficient irrigation systems. Newport Avenue Landscaping specializes in creating designs that flourish in these specific conditions.` },
        { question: `What are common challenges for landscaping in Bend, Oregon?`, answer: `Landscaping in Bend presents challenges such as extreme temperature fluctuations, limited rainfall, and the need to adapt to volcanic soil. Freeze-thaw cycles can also impact hardscaping and plant health. Proper planning and material selection are crucial for a resilient landscape.` },
        { question: `How can I create a water-efficient landscape in Bend?`, answer: `To create a water-efficient landscape in Bend, focus on xeriscaping, grouping plants with similar water needs, and installing drip irrigation. Mulching helps retain soil moisture, especially in our dry climate. These practices significantly reduce water consumption while maintaining an attractive outdoor space.` },
        { question: `What design elements are popular for Bend, Oregon homes?`, answer: `Popular landscape design elements in Bend often include natural stone features, fire pits for cooler evenings, and native plant gardens that blend with the high desert environment. Outdoor living spaces, such as patios and decks, are also highly sought after to enjoy Bend's beautiful scenery. Newport Avenue Landscaping can help you incorporate these elements.` },
        { question: `How do freeze-thaw cycles impact hardscaping in Bend?`, answer: `Bend's significant freeze-thaw cycles can cause expansion and contraction in hardscaping materials, leading to cracks or shifting if not properly installed. It's essential to use durable, frost-resistant materials and ensure adequate drainage. Proper base preparation is critical to prevent damage over time.` },
      ]} />
      <Navbar />
      <div style={{ paddingTop: '204px' }}>
        <div className="relative flex items-center justify-center" style={{ height:'380px',backgroundImage:'url(https://d2xsxph8kpxj0f.cloudfront.net/310519663503028182/g3pw3MRUapabcDUbhBEFxx/facility-showroom_fd5f40e4.webp',backgroundSize:'cover',backgroundPosition:'center 50%' }}>
          <div className="absolute inset-0" style={{ backgroundColor: 'oklch(0 0 0 / 0.55)' }} />
          <div className="relative text-center container">
            <p className="font-label mb-3" style={{ color:'oklch(0.72 0.12 25)',fontSize:'0.7rem',letterSpacing:'0.18em' }}>DESIGN GUIDE · BEND, OREGON &middot; 2024</p>
            <h1 className="font-display text-white" style={{ fontSize:'clamp(1.8rem, 4vw, 3rem)',maxWidth:'700px',margin:'0 auto' }}>Landscape Design Ideas for Bend, Oregon Homes</h1>
          </div>
        </div>
        <div className="container py-16 max-w-3xl mx-auto">
          <div style={{ color: 'oklch(0.25 0.005 0)' }}>
            <p className="mb-8" style={{ fontSize:'1.05rem',lineHeight:1.85,color:'oklch(0.35 0.005 0)' }}>Bend's natural setting — surrounded by ponderosa pine forests, volcanic rock, and the Cascade Mountains — provides an incredible backdrop for landscape design. The best Bend landscapes draw inspiration from this natural environment while creating functional, beautiful outdoor living spaces. Here are the design ideas we're seeing most in Central Oregon right now.</p>

            <h2 className="text-3xl font-bold mb-4" style={{ color: 'oklch(0.25 0.005 0)' }}>The Outdoor Living Room</h2>
            <p className="mb-4">The most popular landscape design concept in Bend right now is the outdoor living room — a defined space with a paver patio, comfortable seating, a fire feature, and outdoor lighting that creates an extension of the home's interior.</p>
            <p className="mb-8">In Bend's climate, a covered outdoor space (pergola, roof extension, or shade sail) extends the usable season by 2–3 months. Adding a propane heater or outdoor fireplace makes it comfortable even on cool fall evenings.</p>

            <h2 className="text-3xl font-bold mb-4" style={{ color: 'oklch(0.25 0.005 0)' }}>The Natural Xeriscape</h2>
            <p className="mb-4">Bend's most distinctive landscape style draws directly from the surrounding high desert — basalt boulders, ornamental grasses, native shrubs, and drought-tolerant perennials arranged to look like a natural rock garden.</p>
            <p className="mb-8">The key to making this look intentional rather than neglected is design: thoughtful plant placement, partially buried boulders, and clean edges between planted areas and rock mulch.</p>

            <h2 className="text-3xl font-bold mb-4" style={{ color: 'oklch(0.25 0.005 0)' }}>The Modern Minimalist</h2>
            <p className="mb-4">Clean lines, large-format pavers, ornamental grasses, and a limited plant palette create a contemporary look that's increasingly popular in Bend's newer neighborhoods.</p>
            <p className="mb-4">This style works particularly well with modern and craftsman architecture. The key is restraint — fewer, larger elements rather than many small ones.</p>
            <div className="bg-gray-100 p-6 rounded-lg mb-8 border-l-4" style={{ borderColor: 'oklch(0.46 0.20 25)' }}>
              <p className="font-bold text-lg mb-2" style={{ color: 'oklch(0.25 0.005 0)' }}>PRO TIP</p>
              <p>Whatever design style you choose, make sure it works with Bend's climate. Beautiful plants that struggle in our conditions will always look worse than simpler plants that thrive. We help clients choose plants that will look great for years, not just at installation.</p>
            </div>
            <div className="p-8 text-center mt-12" style={{ backgroundColor: 'oklch(0.18 0.008 0)' }}>
              <p className="font-label text-xs mb-3" style={{ color:'oklch(0.46 0.20 25)',letterSpacing:'0.18em' }}>GET STARTED TODAY</p>
              <h3 className="font-display text-white mb-4" style={{ fontSize:'1.6rem' }}>Get a Free Landscape Design Consultation in Bend</h3>
              <p className="font-body mb-6" style={{ color:'oklch(0.72 0.005 0)',lineHeight:1.7 }}>Our design team will visit your property, discuss your vision, and create a design that's beautiful, functional, and perfectly suited to Bend's climate.</p>
              <Link href="/contact"><span className="btn-red inline-block">Schedule Your Free Design Consultation →</span></Link>
              <p className="mt-4 text-sm" style={{ color:'oklch(0.60 0.005 0)' }}>Or call us: (541) 617-8873</p>
            </div>

            <div className="mt-12 pt-10" style={{ borderTop: '1px solid oklch(0.88 0.005 0)' }}>
              <p className="font-label mb-2" style={{ color: 'oklch(0.46 0.20 25)', fontSize: '0.62rem', letterSpacing: '0.18em' }}>YOU MIGHT ALSO LIKE</p>
              <h2 className="font-display font-light mb-6" style={{ fontSize: 'clamp(1.3rem, 2vw, 1.8rem)', color: 'oklch(0.15 0.005 0)' }}>More Helpful Guides</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Link href="/resources/landscape-design-cost-bend-oregon"><span style={{ display:'block',padding:'1.1rem 1.25rem',backgroundColor:'oklch(1 0 0)',borderLeft:'3px solid oklch(0.46 0.20 25)',textDecoration:'none' }}><div className="font-body" style={{ color:'oklch(0.22 0.008 30)',fontWeight:600,fontSize:'0.85rem',marginBottom:'0.3rem' }}>Landscape Design Cost in Bend</div><div className="font-body" style={{ color:'oklch(0.50 0.008 30)',fontSize:'0.75rem',fontWeight:300,lineHeight:1.5 }}>Full-yard design and installation pricing.</div></span></Link>
                <Link href="/resources/xeriscape-cost-bend-oregon"><span style={{ display:'block',padding:'1.1rem 1.25rem',backgroundColor:'oklch(1 0 0)',borderLeft:'3px solid oklch(0.46 0.20 25)',textDecoration:'none' }}><div className="font-body" style={{ color:'oklch(0.22 0.008 30)',fontWeight:600,fontSize:'0.85rem',marginBottom:'0.3rem' }}>Xeriscape Cost in Bend</div><div className="font-body" style={{ color:'oklch(0.50 0.008 30)',fontSize:'0.75rem',fontWeight:300,lineHeight:1.5 }}>Water-wise landscaping costs in Central Oregon.</div></span></Link>
                <Link href="/resources/paver-patio-cost-bend-oregon"><span style={{ display:'block',padding:'1.1rem 1.25rem',backgroundColor:'oklch(1 0 0)',borderLeft:'3px solid oklch(0.46 0.20 25)',textDecoration:'none' }}><div className="font-body" style={{ color:'oklch(0.22 0.008 30)',fontWeight:600,fontSize:'0.85rem',marginBottom:'0.3rem' }}>Paver Patio Cost in Bend</div><div className="font-body" style={{ color:'oklch(0.50 0.008 30)',fontSize:'0.75rem',fontWeight:300,lineHeight:1.5 }}>Hardscape pricing for Central Oregon projects.</div></span></Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
