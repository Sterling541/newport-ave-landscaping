import Navbar from '@/components/Navbar';
import SEO from '@/components/SEO';
import { BreadcrumbSchema } from '@/components/SchemaMarkup';
import { Link } from 'wouter';

export default function FaqRetainingWallBend() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: 'oklch(0.97 0.003 0)' }}>
      <SEO
        title="Retaining Wall FAQ — Bend, Oregon | Newport Ave Landscaping"
        description="Common questions about retaining wall installation in Bend, Oregon. Costs, materials, permits, and what to expect."
        canonical="https://newportavelandscaping.com/resources/faq-retaining-wall-bend-oregon"
      />
      <BreadcrumbSchema items={[
        { name: 'Home', url: '/' },
        { name: 'Resources', url: '/resources' },
        { name: 'Retaining Wall FAQ: Bend, Oregon Homeowners Ask', url: '/resources/faq-retaining-wall-bend-oregon' },
      ]} />
      <Navbar />
      <div style={{ paddingTop: '204px' }}>
        <div className="relative flex items-center justify-center" style={{ height:'380px',backgroundImage:'url(https://d2xsxph8kpxj0f.cloudfront.net/310519663503028182/g3pw3MRUapabcDUbhBEFxx/ITP_7558_e52a40c9.jpg',backgroundSize:'cover',backgroundPosition:'center 50%' }}>
          <div className="absolute inset-0" style={{ backgroundColor: 'oklch(0 0 0 / 0.55)' }} />
          <div className="relative text-center container">
            <p className="font-label mb-3" style={{ color:'oklch(0.72 0.12 25)',fontSize:'0.7rem',letterSpacing:'0.18em' }}>RETAINING WALLS · BEND, OREGON &middot; 2024</p>
            <h1 className="font-display text-white" style={{ fontSize:'clamp(1.8rem, 4vw, 3rem)',maxWidth:'700px',margin:'0 auto' }}>Retaining Wall FAQ: Bend, Oregon Homeowners Ask</h1>
          </div>
        </div>
        <div className="container py-16 max-w-3xl mx-auto">
          <div style={{ color: 'oklch(0.25 0.005 0)' }}>
            <p className="mb-8" style={{ fontSize:'1.05rem',lineHeight:1.85,color:'oklch(0.35 0.005 0)' }}>Retaining walls are one of the most functional and visually impactful features in a Bend landscape. Whether you're dealing with a sloped yard, erosion, or just want to create level planting areas, here are the questions we hear most often.</p>

            <h2 className="text-3xl font-bold mb-4" style={{ color: 'oklch(0.25 0.005 0)' }}>How much does a retaining wall cost in Bend?</h2>
            <p className="mb-4">Retaining wall costs in Bend range from $3,000 to $30,000+ depending on height, length, and material. A simple 2-foot-tall decorative wall in concrete block typically costs $3,000–$8,000. A structural wall 4+ feet tall in natural stone or large block can reach $15,000–$40,000.</p>
            <p className="mb-8">Walls over 4 feet in height typically require an engineered design and building permit in Bend. We handle all permitting as part of our service.</p>

            <h2 className="text-3xl font-bold mb-4" style={{ color: 'oklch(0.25 0.005 0)' }}>What materials are best for retaining walls in Bend?</h2>
            <ul className="list-disc pl-5 mb-8 space-y-1">
              <li>Concrete block (Allan Block, Versa-Lok) — most popular for cost and durability</li>
              <li>Natural basalt — beautiful, local, very durable</li>
              <li>Boulders — natural look, excellent for informal walls</li>
              <li>Timber (railroad ties) — lower cost, shorter lifespan in Bend's climate</li>
              <li>Poured concrete — strong, requires forming and permits</li>
            </ul>

            <h2 className="text-3xl font-bold mb-4" style={{ color: 'oklch(0.25 0.005 0)' }}>Do I need a permit for a retaining wall in Bend?</h2>
            <p className="mb-4">In Bend, retaining walls over 4 feet in height (measured from the bottom of the footing) typically require a building permit and an engineered design. Walls under 4 feet generally don't require a permit, but should still be built to proper standards.</p>
            <p className="mb-4">We handle all permit applications and coordinate with engineers as needed. Don't let the permit process deter you — we manage it for you.</p>
            <div className="bg-gray-100 p-6 rounded-lg mb-8 border-l-4" style={{ borderColor: 'oklch(0.46 0.20 25)' }}>
              <p className="font-bold text-lg mb-2" style={{ color: 'oklch(0.25 0.005 0)' }}>PRO TIP</p>
              <p>Even walls that don't require a permit should be built with proper drainage behind them. Without drainage, hydrostatic pressure can cause walls to lean or fail over time.</p>
            </div>
            <div className="p-8 text-center mt-12" style={{ backgroundColor: 'oklch(0.18 0.008 0)' }}>
              <p className="font-label text-xs mb-3" style={{ color:'oklch(0.46 0.20 25)',letterSpacing:'0.18em' }}>GET STARTED TODAY</p>
              <h3 className="font-display text-white mb-4" style={{ fontSize:'1.6rem' }}>Get a Free Retaining Wall Quote in Bend</h3>
              <p className="font-body mb-6" style={{ color:'oklch(0.72 0.005 0)',lineHeight:1.7 }}>Our design team will assess your slope, discuss your options, and provide a detailed proposal — at no cost.</p>
              <Link href="/contact"><span className="btn-red inline-block">Get Your Free Retaining Wall Quote →</span></Link>
              <p className="mt-4 text-sm" style={{ color:'oklch(0.60 0.005 0)' }}>Or call us: (541) 617-8873</p>
            </div>

            <div className="mt-12 pt-10" style={{ borderTop: '1px solid oklch(0.88 0.005 0)' }}>
              <p className="font-label mb-2" style={{ color: 'oklch(0.46 0.20 25)', fontSize: '0.62rem', letterSpacing: '0.18em' }}>YOU MIGHT ALSO LIKE</p>
              <h2 className="font-display font-light mb-6" style={{ fontSize: 'clamp(1.3rem, 2vw, 1.8rem)', color: 'oklch(0.15 0.005 0)' }}>More Helpful Guides</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Link href="/resources/retaining-wall-cost-bend-oregon"><span style={{ display:'block',padding:'1.1rem 1.25rem',backgroundColor:'oklch(1 0 0)',borderLeft:'3px solid oklch(0.46 0.20 25)',textDecoration:'none' }}><div className="font-body" style={{ color:'oklch(0.22 0.008 30)',fontWeight:600,fontSize:'0.85rem',marginBottom:'0.3rem' }}>Retaining Wall Cost in Bend</div><div className="font-body" style={{ color:'oklch(0.50 0.008 30)',fontSize:'0.75rem',fontWeight:300,lineHeight:1.5 }}>Detailed cost breakdown for retaining walls in Central Oregon.</div></span></Link>
                <Link href="/resources/landscape-design-cost-bend-oregon"><span style={{ display:'block',padding:'1.1rem 1.25rem',backgroundColor:'oklch(1 0 0)',borderLeft:'3px solid oklch(0.46 0.20 25)',textDecoration:'none' }}><div className="font-body" style={{ color:'oklch(0.22 0.008 30)',fontWeight:600,fontSize:'0.85rem',marginBottom:'0.3rem' }}>Landscape Design Cost in Bend</div><div className="font-body" style={{ color:'oklch(0.50 0.008 30)',fontSize:'0.75rem',fontWeight:300,lineHeight:1.5 }}>Full-yard design and installation pricing.</div></span></Link>
                <Link href="/resources/paver-patio-cost-bend-oregon"><span style={{ display:'block',padding:'1.1rem 1.25rem',backgroundColor:'oklch(1 0 0)',borderLeft:'3px solid oklch(0.46 0.20 25)',textDecoration:'none' }}><div className="font-body" style={{ color:'oklch(0.22 0.008 30)',fontWeight:600,fontSize:'0.85rem',marginBottom:'0.3rem' }}>Paver Patio Cost in Bend</div><div className="font-body" style={{ color:'oklch(0.50 0.008 30)',fontSize:'0.75rem',fontWeight:300,lineHeight:1.5 }}>Hardscape pricing for Central Oregon projects.</div></span></Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
