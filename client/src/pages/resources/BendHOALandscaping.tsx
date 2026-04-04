import Navbar from '@/components/Navbar';
import SEO from '@/components/SEO';
import { BreadcrumbSchema } from '@/components/SchemaMarkup';
import { Link } from 'wouter';

export default function BendHOALandscaping() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: 'oklch(0.97 0.003 0)' }}>
      <SEO
        title="HOA Landscaping in Bend, Oregon | Newport Ave Landscaping"
        description="HOA landscaping services in Bend, Oregon. Common area maintenance, seasonal color, and snow removal for Bend HOAs."
        canonical="https://newportavelandscaping.com/resources/hoa-landscaping-bend-oregon"
      />
      <BreadcrumbSchema items={[
        { name: 'Home', url: '/' },
        { name: 'Resources', url: '/resources' },
        { name: 'HOA Landscaping Services in Bend, Oregon', url: '/resources/hoa-landscaping-bend-oregon' },
      ]} />
      <Navbar />
      <div style={{ paddingTop: '328px' }}>
        <div className="relative flex items-center justify-center" style={{ height:'380px',backgroundImage:'url(https://d2xsxph8kpxj0f.cloudfront.net/310519663503028182/g3pw3MRUapabcDUbhBEFxx/ITP_7558_e52a40c9.jpg',backgroundSize:'cover',backgroundPosition:'center 50%' }}>
          <div className="absolute inset-0" style={{ backgroundColor: 'oklch(0 0 0 / 0.55)' }} />
          <div className="relative text-center container">
            <p className="font-label mb-3" style={{ color:'oklch(0.72 0.12 25)',fontSize:'0.7rem',letterSpacing:'0.18em' }}>HOA SERVICES · BEND, OREGON &middot; 2024</p>
            <h1 className="font-display text-white" style={{ fontSize:'clamp(1.8rem, 4vw, 3rem)',maxWidth:'700px',margin:'0 auto' }}>HOA Landscaping Services in Bend, Oregon</h1>
          </div>
        </div>
        <div className="container py-16 max-w-3xl mx-auto">
          <div style={{ color: 'oklch(0.25 0.005 0)' }}>
            <p className="mb-8" style={{ fontSize:'1.05rem',lineHeight:1.85,color:'oklch(0.35 0.005 0)' }}>Homeowners associations in Bend have unique landscaping needs — common areas that need to look impeccable year-round, irrigation systems that serve multiple properties, and snow removal that must happen quickly to keep residents safe. Newport Avenue Landscaping has been serving Bend HOAs for over 21 years.</p>

            <h2 className="text-3xl font-bold mb-4" style={{ color: 'oklch(0.25 0.005 0)' }}>HOA Landscaping Services We Provide</h2>
            <ul className="list-disc pl-5 mb-8 space-y-1">
              <li>Common area mowing, edging, and cleanup</li>
              <li>Seasonal color programs (annuals and containers)</li>
              <li>Irrigation system management and repair</li>
              <li>Tree and shrub care</li>
              <li>Spring and fall cleanups</li>
              <li>Snow and ice removal (24/7 availability)</li>
              <li>Landscape renovation and installation</li>
              <li>Entrance and monument area maintenance</li>
              <li>Pond and water feature maintenance</li>
            </ul>

            <h2 className="text-3xl font-bold mb-4" style={{ color: 'oklch(0.25 0.005 0)' }}>Why HOAs Choose Newport Avenue</h2>
            <p className="mb-4">We're one of the largest landscaping contractors in Central Oregon, with 150+ employees and the equipment to handle large HOA properties. We have dedicated commercial account managers who serve as a single point of contact for HOA boards.</p>
            <p className="mb-4">We provide detailed monthly reports, proactive communication about issues, and consistent service quality across all visits.</p>
            <div className="overflow-x-auto mb-8"><table className="min-w-full bg-white border border-gray-300"><thead><tr><th className="py-2 px-4 border-b text-left">Property Type</th><th className="py-2 px-4 border-b text-left">Typical Monthly Cost</th><th className="py-2 px-4 border-b text-left">Services</th></tr></thead><tbody><tr><td className="py-2 px-4 border-b">Small HOA (under 5 acres)</td><td className="py-2 px-4 border-b">$1,500–$4,000/mo</td><td className="py-2 px-4 border-b">Full maintenance</td></tr>
                  <tr><td className="py-2 px-4 border-b">Medium HOA (5–15 acres)</td><td className="py-2 px-4 border-b">$4,000–$10,000/mo</td><td className="py-2 px-4 border-b">Full maintenance + seasonal color</td></tr>
                  <tr><td className="py-2 px-4 border-b">Large HOA (15+ acres)</td><td className="py-2 px-4 border-b">Custom pricing</td><td className="py-2 px-4 border-b">Full service contract</td></tr></tbody></table></div>

            <h2 className="text-3xl font-bold mb-4" style={{ color: 'oklch(0.25 0.005 0)' }}>Snow Removal for Bend HOAs</h2>
            <p className="mb-4">Snow removal is one of the most critical services for Bend HOAs. Our crews are available 24/7 during snow events and prioritize HOA clients to ensure roads, walkways, and parking areas are cleared before residents need to leave for work.</p>
            <p className="mb-8">We offer seasonal contracts for HOA snow removal, with guaranteed response times and pre-treatment with liquid de-icer before major storms.</p>
            <div className="p-8 text-center mt-12" style={{ backgroundColor: 'oklch(0.18 0.008 0)' }}>
              <p className="font-label text-xs mb-3" style={{ color:'oklch(0.46 0.20 25)',letterSpacing:'0.18em' }}>GET STARTED TODAY</p>
              <h3 className="font-display text-white mb-4" style={{ fontSize:'1.6rem' }}>Get a Free HOA Landscaping Quote in Bend</h3>
              <p className="font-body mb-6" style={{ color:'oklch(0.72 0.005 0)',lineHeight:1.7 }}>Our commercial team will walk your HOA property and provide a detailed maintenance proposal. We serve HOAs throughout Central Oregon.</p>
              <Link href="/contact"><span className="btn-red inline-block">Request a Free HOA Quote →</span></Link>
              <p className="mt-4 text-sm" style={{ color:'oklch(0.60 0.005 0)' }}>Or call us: (541) 617-8873</p>
            </div>

            <div className="mt-12 pt-10" style={{ borderTop: '1px solid oklch(0.88 0.005 0)' }}>
              <p className="font-label mb-2" style={{ color: 'oklch(0.46 0.20 25)', fontSize: '0.62rem', letterSpacing: '0.18em' }}>YOU MIGHT ALSO LIKE</p>
              <h2 className="font-display font-light mb-6" style={{ fontSize: 'clamp(1.3rem, 2vw, 1.8rem)', color: 'oklch(0.15 0.005 0)' }}>More Helpful Guides</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Link href="/resources/commercial-landscaping-bend-oregon"><span style={{ display:'block',padding:'1.1rem 1.25rem',backgroundColor:'oklch(1 0 0)',borderLeft:'3px solid oklch(0.46 0.20 25)',textDecoration:'none' }}><div className="font-body" style={{ color:'oklch(0.22 0.008 30)',fontWeight:600,fontSize:'0.85rem',marginBottom:'0.3rem' }}>Commercial Landscaping in Bend</div><div className="font-body" style={{ color:'oklch(0.50 0.008 30)',fontSize:'0.75rem',fontWeight:300,lineHeight:1.5 }}>Commercial landscape maintenance in Central Oregon.</div></span></Link>
                <Link href="/resources/snow-removal-bend-oregon"><span style={{ display:'block',padding:'1.1rem 1.25rem',backgroundColor:'oklch(1 0 0)',borderLeft:'3px solid oklch(0.46 0.20 25)',textDecoration:'none' }}><div className="font-body" style={{ color:'oklch(0.22 0.008 30)',fontWeight:600,fontSize:'0.85rem',marginBottom:'0.3rem' }}>Snow Removal in Bend</div><div className="font-body" style={{ color:'oklch(0.50 0.008 30)',fontSize:'0.75rem',fontWeight:300,lineHeight:1.5 }}>Commercial and residential snow removal services.</div></span></Link>
                <Link href="/resources/landscape-design-cost-bend-oregon"><span style={{ display:'block',padding:'1.1rem 1.25rem',backgroundColor:'oklch(1 0 0)',borderLeft:'3px solid oklch(0.46 0.20 25)',textDecoration:'none' }}><div className="font-body" style={{ color:'oklch(0.22 0.008 30)',fontWeight:600,fontSize:'0.85rem',marginBottom:'0.3rem' }}>Landscape Design Cost in Bend</div><div className="font-body" style={{ color:'oklch(0.50 0.008 30)',fontSize:'0.75rem',fontWeight:300,lineHeight:1.5 }}>Full-yard design and installation pricing.</div></span></Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
