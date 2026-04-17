import Navbar from '@/components/Navbar';
import SEO from '@/components/SEO';
import { BreadcrumbSchema } from '@/components/SchemaMarkup';
import { Link } from 'wouter';

export default function LawnMaintenanceCostBend() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: 'oklch(0.97 0.003 0)' }}>
      <SEO
        title="Lawn Maintenance Cost in Bend, OR | Newport Ave Landscaping"
        description="What lawn maintenance costs in Bend, Oregon. Mowing, aeration, fertilization, and full-service lawn care pricing for Central Oregon."
        canonical="https://newportavelandscaping.com/resources/lawn-maintenance-cost-bend-oregon"
      />
      <BreadcrumbSchema items={[
        { name: 'Home', url: '/' },
        { name: 'Resources', url: '/resources' },
        { name: 'Lawn Maintenance Cost in Bend, Oregon', url: '/resources/lawn-maintenance-cost-bend-oregon' },
      ]} />
      <Navbar />
      <div style={{ paddingTop: '204px' }}>
        <div className="relative flex items-center justify-center" style={{ height:'380px',backgroundImage:'url(https://files.manuscdn.com/user_upload_by_module/session_file/310519663503028182/QuZbCMdvWnmWDtAV.jpg',backgroundSize:'cover',backgroundPosition:'center 50%' }}>
          <div className="absolute inset-0" style={{ backgroundColor: 'oklch(0 0 0 / 0.55)' }} />
          <div className="relative text-center container">
            <p className="font-label mb-3" style={{ color:'oklch(0.72 0.12 25)',fontSize:'0.7rem',letterSpacing:'0.18em' }}>LAWN CARE GUIDE · BEND, OREGON &middot; 2024</p>
            <h1 className="font-display text-white" style={{ fontSize:'clamp(1.8rem, 4vw, 3rem)',maxWidth:'700px',margin:'0 auto' }}>Lawn Maintenance Cost in Bend, Oregon</h1>
          </div>
        </div>
        <div className="container py-16 max-w-3xl mx-auto">
          <div style={{ color: 'oklch(0.25 0.005 0)' }}>
            <p className="mb-8" style={{ fontSize:'1.05rem',lineHeight:1.85,color:'oklch(0.35 0.005 0)' }}>Lawn maintenance costs in Bend vary widely depending on the services you need and the size of your property. Here's a straightforward breakdown of what lawn care services cost in Central Oregon, from basic mowing to full-service maintenance programs.</p>

            <h2 className="text-3xl font-bold mb-4" style={{ color: 'oklch(0.25 0.005 0)' }}>Lawn Maintenance Pricing in Bend</h2>
            <div className="overflow-x-auto mb-8"><table className="min-w-full bg-white border border-gray-300"><thead><tr><th className="py-2 px-4 border-b text-left">Service</th><th className="py-2 px-4 border-b text-left">Typical Cost</th><th className="py-2 px-4 border-b text-left">Frequency</th></tr></thead><tbody><tr><td className="py-2 px-4 border-b">Mowing & edging</td><td className="py-2 px-4 border-b">From $97/service</td><td className="py-2 px-4 border-b">Weekly (Apr–Oct)</td></tr>
                  <tr><td className="py-2 px-4 border-b">Spring cleanup</td><td className="py-2 px-4 border-b">Starting at $600</td><td className="py-2 px-4 border-b">Annual</td></tr>
                  <tr><td className="py-2 px-4 border-b">Fall cleanup</td><td className="py-2 px-4 border-b">Starting at $600</td><td className="py-2 px-4 border-b">Annual</td></tr>
                  <tr><td className="py-2 px-4 border-b">Core aeration</td><td className="py-2 px-4 border-b">$150–$400</td><td className="py-2 px-4 border-b">1–2x/year</td></tr>
                  <tr><td className="py-2 px-4 border-b">Fertilization (per application)</td><td className="py-2 px-4 border-b">$75–$150</td><td className="py-2 px-4 border-b">4–6x/year</td></tr>
                  <tr><td className="py-2 px-4 border-b">Pre-emergent weed control</td><td className="py-2 px-4 border-b">$75–$150</td><td className="py-2 px-4 border-b">2x/year</td></tr>
                  <tr><td className="py-2 px-4 border-b">Everything Plan</td><td className="py-2 px-4 border-b">From $388/month</td><td className="py-2 px-4 border-b">Year-round</td></tr></tbody></table></div>

            <h2 className="text-3xl font-bold mb-4" style={{ color: 'oklch(0.25 0.005 0)' }}>What's Included in Our Everything Plan</h2>
            <p className="mb-4">Our Everything Residential Maintenance Plan starts at $388/month for a typical Bend home and covers: weekly mowing and edging, spring and fall cleanups, annual core aeration, a 4-application fertilization program, and pre-emergent weed control.</p>
            <p className="mb-8">The plan is designed to be a complete solution — you don't have to think about your lawn. We handle everything on a set schedule and communicate proactively if we notice any issues.</p>

            <h2 className="text-3xl font-bold mb-4" style={{ color: 'oklch(0.25 0.005 0)' }}>Factors That Affect Lawn Care Cost in Bend</h2>
            <ul className="list-disc pl-5 mb-8 space-y-1">
              <li>Lawn size (square footage)</li>
              <li>Terrain and obstacles (slopes, trees, beds)</li>
              <li>Service frequency</li>
              <li>Condition of the lawn (neglected lawns cost more initially)</li>
              <li>Additional services (fungus treatment, overseeding, grub control)</li>
              <li>Distance from our service area</li>
            </ul>
            <div className="p-8 text-center mt-12" style={{ backgroundColor: 'oklch(0.18 0.008 0)' }}>
              <p className="font-label text-xs mb-3" style={{ color:'oklch(0.46 0.20 25)',letterSpacing:'0.18em' }}>GET STARTED TODAY</p>
              <h3 className="font-display text-white mb-4" style={{ fontSize:'1.6rem' }}>Get a Free Lawn Care Quote in Bend</h3>
              <p className="font-body mb-6" style={{ color:'oklch(0.72 0.005 0)',lineHeight:1.7 }}>Tell us about your lawn and we'll put together a custom care plan. We serve Bend, Redmond, Sisters, Sunriver, and all of Central Oregon.</p>
              <Link href="/contact"><span className="btn-red inline-block">Get Your Free Lawn Care Quote →</span></Link>
              <p className="mt-4 text-sm" style={{ color:'oklch(0.60 0.005 0)' }}>Or call us: (541) 617-8873</p>
            </div>

            <div className="mt-12 pt-10" style={{ borderTop: '1px solid oklch(0.88 0.005 0)' }}>
              <p className="font-label mb-2" style={{ color: 'oklch(0.46 0.20 25)', fontSize: '0.62rem', letterSpacing: '0.18em' }}>YOU MIGHT ALSO LIKE</p>
              <h2 className="font-display font-light mb-6" style={{ fontSize: 'clamp(1.3rem, 2vw, 1.8rem)', color: 'oklch(0.15 0.005 0)' }}>More Helpful Guides</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Link href="/resources/faq-lawn-care-bend-oregon"><span style={{ display:'block',padding:'1.1rem 1.25rem',backgroundColor:'oklch(1 0 0)',borderLeft:'3px solid oklch(0.46 0.20 25)',textDecoration:'none' }}><div className="font-body" style={{ color:'oklch(0.22 0.008 30)',fontWeight:600,fontSize:'0.85rem',marginBottom:'0.3rem' }}>Lawn Care FAQ</div><div className="font-body" style={{ color:'oklch(0.50 0.008 30)',fontSize:'0.75rem',fontWeight:300,lineHeight:1.5 }}>Common questions about lawn care in Bend.</div></span></Link>
                <Link href="/resources/when-to-aerate-lawn-bend-oregon"><span style={{ display:'block',padding:'1.1rem 1.25rem',backgroundColor:'oklch(1 0 0)',borderLeft:'3px solid oklch(0.46 0.20 25)',textDecoration:'none' }}><div className="font-body" style={{ color:'oklch(0.22 0.008 30)',fontWeight:600,fontSize:'0.85rem',marginBottom:'0.3rem' }}>When to Aerate Your Lawn in Bend</div><div className="font-body" style={{ color:'oklch(0.50 0.008 30)',fontSize:'0.75rem',fontWeight:300,lineHeight:1.5 }}>Best timing for aeration in Central Oregon.</div></span></Link>
                <Link href="/resources/sod-installation-cost-bend-oregon"><span style={{ display:'block',padding:'1.1rem 1.25rem',backgroundColor:'oklch(1 0 0)',borderLeft:'3px solid oklch(0.46 0.20 25)',textDecoration:'none' }}><div className="font-body" style={{ color:'oklch(0.22 0.008 30)',fontWeight:600,fontSize:'0.85rem',marginBottom:'0.3rem' }}>Sod Installation Cost in Bend</div><div className="font-body" style={{ color:'oklch(0.50 0.008 30)',fontSize:'0.75rem',fontWeight:300,lineHeight:1.5 }}>Pricing for sod installation and lawn renovation.</div></span></Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
