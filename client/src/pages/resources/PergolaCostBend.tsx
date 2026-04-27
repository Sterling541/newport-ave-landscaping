import Navbar from '@/components/Navbar';
import SEO from '@/components/SEO';
import { BreadcrumbSchema, FAQSchema } from '@/components/SchemaMarkup';
import { Link } from 'wouter';

export default function PergolaCostBend() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: 'oklch(0.97 0.003 0)' }}>
      <SEO
        title="Pergola Cost in Bend, OR | Newport Ave Landscaping"
        description="What a pergola costs in Bend, Oregon. Materials, installation, and design options for Central Oregon outdoor spaces."
        canonical="https://www.newportavelandscaping.com/resources/pergola-cost-bend-oregon"
      />
      <BreadcrumbSchema items={[
        { name: 'Home', url: '/' },
        { name: 'Resources', url: '/resources' },
        { name: 'Pergola Cost in Bend, Oregon: What to Expect', url: '/resources/pergola-cost-bend-oregon' },
      ]} />
      <FAQSchema faqs={[
        { question: `What factors influence pergola cost in Bend, Oregon?`, answer: `The cost of a pergola in Bend, Oregon, is influenced by several factors, including material choice (wood, vinyl, aluminum), size, design complexity, and whether it's a DIY project or professionally installed. Given Bend's climate Zone 6a and freeze-thaw cycles, durable materials and proper installation are crucial for longevity, which can impact the overall price.` },
        { question: `How does Bend's climate affect pergola material choices and cost?`, answer: `Bend's unique climate, with its high desert environment, volcanic soil, and significant temperature fluctuations, necessitates careful material selection for pergolas. Materials that can withstand intense sun, occasional heavy snow loads, and freeze-thaw cycles will be more durable, potentially increasing initial costs but saving on long-term maintenance. Newport Avenue Landscaping specializes in selecting and installing pergolas designed to thrive in these specific conditions.` },
        { question: `Are there specific permits required for building a pergola in Bend?`, answer: `Yes, depending on the size and structural characteristics of your pergola, you may need permits from the City of Bend. It's always advisable to check local building codes and regulations before starting construction. Ensuring compliance can prevent costly issues down the line.` },
        { question: `What is the typical price range for a custom pergola installation in Bend?`, answer: `For a custom pergola installation in Bend, Newport Avenue’s 2026 pricing starts at $12,000 for a simple modern 8’x14’ pergola and $16,000 for a custom build with post wraps, corbels, and decorative cut ends. Larger or more complex builds are quoted on-site, depending on the factors mentioned earlier. This range accounts for professional design, quality materials suited for Bend's climate, and expert installation. Newport Avenue Landscaping provides detailed estimates tailored to your specific vision and property.` },
        { question: `Can a pergola increase my home's value in Bend?`, answer: `A well-designed and properly installed pergola can certainly enhance your outdoor living space and potentially increase your home's value in Bend. It adds aesthetic appeal and functional outdoor square footage, which is highly desirable in the Central Oregon real estate market. Choosing a design that complements your home and withstands local weather is key.` },
        { question: `What are the best materials for a pergola in Bend's volcanic soil and low rainfall?`, answer: `Considering Bend's volcanic soil and average 11 inches of annual rainfall, materials like powder-coated aluminum, treated lumber (cedar or redwood), or high-quality vinyl are excellent choices for pergolas. These materials offer resistance to rot, pests, and weathering, ensuring your pergola remains a beautiful and functional addition to your landscape for years to come.` },
      ]} />
      <Navbar />
      <div style={{ paddingTop: '204px' }}>
        <div className="relative flex items-center justify-center" style={{ height:'380px',backgroundImage:'url(https://d2xsxph8kpxj0f.cloudfront.net/310519663503028182/g3pw3MRUapabcDUbhBEFxx/pergola-patio-central-oregon-4G6FhGkbr4iU6cJ3fYfz36.webp)',backgroundSize:'cover',backgroundPosition:'center 50%' }}>
          <div className="absolute inset-0" style={{ backgroundColor: 'oklch(0 0 0 / 0.55)' }} />
          <div className="relative text-center container">
            <p className="font-label mb-3" style={{ color:'oklch(0.72 0.12 25)',fontSize:'0.7rem',letterSpacing:'0.18em' }}>OUTDOOR LIVING · BEND, OREGON &middot; 2024</p>
            <h1 className="font-display text-white" style={{ fontSize:'clamp(1.8rem, 4vw, 3rem)',maxWidth:'700px',margin:'0 auto' }}>Pergola Cost in Bend, Oregon: What to Expect</h1>
          </div>
        </div>
        <div className="container py-16 max-w-3xl mx-auto">
          <div style={{ color: 'oklch(0.25 0.005 0)' }}>
            <p className="mb-8" style={{ fontSize:'1.05rem',lineHeight:1.85,color:'oklch(0.35 0.005 0)' }}>A pergola is one of the most versatile additions to a Bend outdoor space — providing shade, defining an outdoor room, and supporting climbing plants or string lights. Here's what a pergola costs in Central Oregon and what you need to know before you build.</p>

            <h2 className="text-3xl font-bold mb-4" style={{ color: 'oklch(0.25 0.005 0)' }}>Pergola Cost in Bend</h2>
            <div className="overflow-x-auto mb-8"><table className="min-w-full bg-white border border-gray-300"><thead><tr><th className="py-2 px-4 border-b text-left">Pergola Type</th><th className="py-2 px-4 border-b text-left">Typical Cost</th><th className="py-2 px-4 border-b text-left">Notes</th></tr></thead><tbody><tr><td className="py-2 px-4 border-b">Simple Modern Pergola (8’x14’)</td><td className="py-2 px-4 border-b">$12,000</td><td className="py-2 px-4 border-b">No post wraps, no corbels</td></tr>
                  <tr><td className="py-2 px-4 border-b">Custom Pergola with Details (8’x14’)</td><td className="py-2 px-4 border-b">$16,000</td><td className="py-2 px-4 border-b">Post wraps, custom corbels, custom cut ends</td></tr>
                  <tr><td className="py-2 px-4 border-b">Larger / More Complex Builds</td><td className="py-2 px-4 border-b">Custom Quote</td><td className="py-2 px-4 border-b">Quoted on-site based on scope</td></tr></tbody></table></div>

            <h2 className="text-3xl font-bold mb-4" style={{ color: 'oklch(0.25 0.005 0)' }}>Material Options for Bend's Climate</h2>
            <p className="mb-4">Cedar is our most recommended material for pergolas in Bend. It's naturally rot-resistant, handles UV and temperature swings well, and looks beautiful. It does require periodic staining or sealing to maintain its appearance.</p>
            <p className="mb-4">Aluminum and vinyl pergolas require no maintenance and hold up well in Bend's climate. They're available in many styles and colors, though they lack the warmth of natural wood.</p>
            <div className="bg-gray-100 p-6 rounded-lg mb-8 border-l-4" style={{ borderColor: 'oklch(0.46 0.20 25)' }}>
              <p className="font-bold text-lg mb-2" style={{ color: 'oklch(0.25 0.005 0)' }}>PRO TIP</p>
              <p>In Bend's climate, we recommend treating cedar pergolas with a UV-protective stain every 2–3 years. This prevents the wood from graying and extends the life of the structure significantly.</p>
            </div>

            <h2 className="text-3xl font-bold mb-4" style={{ color: 'oklch(0.25 0.005 0)' }}>Pergola + Patio Combinations</h2>
            <p className="mb-4">The most popular outdoor living projects in Bend combine a paver patio with a pergola — creating a defined outdoor room that's functional in all but the coldest weather. Adding a fire pit or outdoor heater extends the season even further.</p>
            <p className="mb-8">A patio + pergola combination typically costs $15,000–$40,000 depending on size and materials. We design and install both elements as a coordinated package.</p>
            <div className="p-8 text-center mt-12" style={{ backgroundColor: 'oklch(0.18 0.008 0)' }}>
              <p className="font-label text-xs mb-3" style={{ color:'oklch(0.46 0.20 25)',letterSpacing:'0.18em' }}>GET STARTED TODAY</p>
              <h3 className="font-display text-white mb-4" style={{ fontSize:'1.6rem' }}>Get a Free Pergola Quote in Bend</h3>
              <p className="font-body mb-6" style={{ color:'oklch(0.72 0.005 0)',lineHeight:1.7 }}>Our design team will visit your property, discuss your vision, and provide a detailed proposal at no cost.</p>
              <Link href="/contact"><span className="btn-red inline-block">Schedule Your Free Consultation →</span></Link>
              <p className="mt-4 text-sm" style={{ color:'oklch(0.60 0.005 0)' }}>Or call us: (541) 617-8873</p>
            </div>

            <div className="mt-12 pt-10" style={{ borderTop: '1px solid oklch(0.88 0.005 0)' }}>
              <p className="font-label mb-2" style={{ color: 'oklch(0.46 0.20 25)', fontSize: '0.62rem', letterSpacing: '0.18em' }}>YOU MIGHT ALSO LIKE</p>
              <h2 className="font-display font-light mb-6" style={{ fontSize: 'clamp(1.3rem, 2vw, 1.8rem)', color: 'oklch(0.15 0.005 0)' }}>More Helpful Guides</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Link href="/resources/paver-patio-cost-bend-oregon"><span style={{ display:'block',padding:'1.1rem 1.25rem',backgroundColor:'oklch(1 0 0)',borderLeft:'3px solid oklch(0.46 0.20 25)',textDecoration:'none' }}><div className="font-body" style={{ color:'oklch(0.22 0.008 30)',fontWeight:600,fontSize:'0.85rem',marginBottom:'0.3rem' }}>Paver Patio Cost in Bend</div><div className="font-body" style={{ color:'oklch(0.50 0.008 30)',fontSize:'0.75rem',fontWeight:300,lineHeight:1.5 }}>Hardscape pricing for Central Oregon projects.</div></span></Link>
                <Link href="/resources/outdoor-kitchen-cost-bend-oregon"><span style={{ display:'block',padding:'1.1rem 1.25rem',backgroundColor:'oklch(1 0 0)',borderLeft:'3px solid oklch(0.46 0.20 25)',textDecoration:'none' }}><div className="font-body" style={{ color:'oklch(0.22 0.008 30)',fontWeight:600,fontSize:'0.85rem',marginBottom:'0.3rem' }}>Outdoor Kitchen Cost in Bend</div><div className="font-body" style={{ color:'oklch(0.50 0.008 30)',fontSize:'0.75rem',fontWeight:300,lineHeight:1.5 }}>What an outdoor kitchen costs in Bend.</div></span></Link>
                <Link href="/resources/fire-pit-patio-cost-bend-oregon"><span style={{ display:'block',padding:'1.1rem 1.25rem',backgroundColor:'oklch(1 0 0)',borderLeft:'3px solid oklch(0.46 0.20 25)',textDecoration:'none' }}><div className="font-body" style={{ color:'oklch(0.22 0.008 30)',fontWeight:600,fontSize:'0.85rem',marginBottom:'0.3rem' }}>Fire Pit & Patio Cost Guide</div><div className="font-body" style={{ color:'oklch(0.50 0.008 30)',fontSize:'0.75rem',fontWeight:300,lineHeight:1.5 }}>Budgeting for fire features alongside your patio.</div></span></Link>
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
