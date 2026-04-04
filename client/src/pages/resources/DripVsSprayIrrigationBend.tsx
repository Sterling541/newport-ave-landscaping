import Navbar from '@/components/Navbar';
import SEO from '@/components/SEO';
import { BreadcrumbSchema } from '@/components/SchemaMarkup';
import { Link } from 'wouter';

export default function DripVsSprayIrrigationBend() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: 'oklch(0.97 0.003 0)' }}>
      <SEO
        title="Drip vs. Spray Irrigation in Bend, OR | Newport Ave Landscaping"
        description="Drip vs. spray irrigation for Bend, Oregon landscapes. Water efficiency, cost, and which system is right for your property."
        canonical="https://newportavelandscaping.com/resources/drip-vs-spray-irrigation-bend-oregon"
      />
      <BreadcrumbSchema items={[
        { name: 'Home', url: '/' },
        { name: 'Resources', url: '/resources' },
        { name: "Drip vs. Spray Irrigation: Which Is Right for Your Bend Landscape?", url: '/resources/drip-vs-spray-irrigation-bend-oregon' },
      ]} />
      <Navbar />
      <div style={{ paddingTop: '204px' }}>
        <div className="relative flex items-center justify-center" style={{ height:'380px',backgroundImage:'url(https://files.manuscdn.com/user_upload_by_module/session_file/310519663503028182/QuZbCMdvWnmWDtAV.jpg',backgroundSize:'cover',backgroundPosition:'center 50%' }}>
          <div className="absolute inset-0" style={{ backgroundColor: 'oklch(0 0 0 / 0.55)' }} />
          <div className="relative text-center container">
            <p className="font-label mb-3" style={{ color:'oklch(0.72 0.12 25)',fontSize:'0.7rem',letterSpacing:'0.18em' }}>IRRIGATION GUIDE · BEND, OREGON &middot; 2024</p>
            <h1 className="font-display text-white" style={{ fontSize:'clamp(1.8rem, 4vw, 3rem)',maxWidth:'700px',margin:'0 auto' }}>Drip vs. Spray Irrigation: Which Is Right for Your Bend Landscape?</h1>
          </div>
        </div>
        <div className="container py-16 max-w-3xl mx-auto">
          <div style={{ color: 'oklch(0.25 0.005 0)' }}>
            <p className="mb-8" style={{ fontSize:'1.05rem',lineHeight:1.85,color:'oklch(0.35 0.005 0)' }}>Choosing the right irrigation system for your Bend property can save thousands of gallons of water — and hundreds of dollars — every year. Here's a practical comparison of drip and spray irrigation from our certified irrigation team.</p>

            <h2 className="text-3xl font-bold mb-4" style={{ color: 'oklch(0.25 0.005 0)' }}>How Each System Works</h2>
            <p className="mb-4">Spray irrigation distributes water through rotating or fixed heads that spray water in a broad arc or circle. It's the most common system for turf areas and provides even coverage across large open spaces.</p>
            <p className="mb-8">Drip irrigation delivers water through small emitters directly to the root zone of individual plants. Water seeps slowly into the soil with minimal evaporation or runoff.</p>

            <h2 className="text-3xl font-bold mb-4" style={{ color: 'oklch(0.25 0.005 0)' }}>Water Efficiency in Bend's High Desert Climate</h2>
            <p className="mb-4">In Bend's low-humidity, often-windy climate, spray irrigation loses 20–30% of water to evaporation before it reaches the soil. Drip irrigation loses less than 5%. For planting beds, shrubs, and trees, drip is dramatically more efficient.</p>
            <p className="mb-4">The City of Bend's water utility recognizes this — drip irrigation systems may qualify for rebates under their water conservation program.</p>
            <div className="overflow-x-auto mb-8"><table className="min-w-full bg-white border border-gray-300"><thead><tr><th className="py-2 px-4 border-b text-left">Factor</th><th className="py-2 px-4 border-b text-left">Spray</th><th className="py-2 px-4 border-b text-left">Drip</th></tr></thead><tbody><tr><td className="py-2 px-4 border-b">Water efficiency</td><td className="py-2 px-4 border-b">70–80%</td><td className="py-2 px-4 border-b">90–95%</td></tr>
                  <tr><td className="py-2 px-4 border-b">Best for</td><td className="py-2 px-4 border-b">Turf, groundcover</td><td className="py-2 px-4 border-b">Beds, shrubs, trees</td></tr>
                  <tr><td className="py-2 px-4 border-b">Cost per zone</td><td className="py-2 px-4 border-b">$500–$700</td><td className="py-2 px-4 border-b">$400–$650</td></tr>
                  <tr><td className="py-2 px-4 border-b">Evaporation loss</td><td className="py-2 px-4 border-b">20–30%</td><td className="py-2 px-4 border-b">&lt; 5%</td></tr>
                  <tr><td className="py-2 px-4 border-b">Freeze risk</td><td className="py-2 px-4 border-b">Moderate</td><td className="py-2 px-4 border-b">Low (surface lines)</td></tr></tbody></table></div>

            <h2 className="text-3xl font-bold mb-4" style={{ color: 'oklch(0.25 0.005 0)' }}>Our Recommendation: Hybrid Systems</h2>
            <p className="mb-4">For most Bend properties, we design hybrid systems: spray zones for turf areas, drip zones for planting beds. This maximizes efficiency across the entire landscape.</p>
            <p className="mb-4">As more Bend homeowners convert lawns to xeriscape, we often retrofit existing spray systems with drip lines — a cost-effective upgrade that can cut outdoor water use by 40–60%.</p>
            <div className="bg-gray-100 p-6 rounded-lg mb-8 border-l-4" style={{ borderColor: 'oklch(0.46 0.20 25)' }}>
              <p className="font-bold text-lg mb-2" style={{ color: 'oklch(0.25 0.005 0)' }}>PRO TIP</p>
              <p>If you're installing a new system, budget for a smart controller from the start. Smart controllers use local weather data to automatically adjust watering schedules, saving an additional 15–25% of water compared to timer-based systems.</p>
            </div>
            <div className="p-8 text-center mt-12" style={{ backgroundColor: 'oklch(0.18 0.008 0)' }}>
              <p className="font-label text-xs mb-3" style={{ color:'oklch(0.46 0.20 25)',letterSpacing:'0.18em' }}>GET STARTED TODAY</p>
              <h3 className="font-display text-white mb-4" style={{ fontSize:'1.6rem' }}>Get a Free Irrigation Consultation in Bend</h3>
              <p className="font-body mb-6" style={{ color:'oklch(0.72 0.005 0)',lineHeight:1.7 }}>Our certified irrigation team will assess your property and recommend the most efficient system for your landscape.</p>
              <Link href="/contact"><span className="btn-red inline-block">Schedule Your Free Irrigation Consultation →</span></Link>
              <p className="mt-4 text-sm" style={{ color:'oklch(0.60 0.005 0)' }}>Or call us: (541) 617-8873</p>
            </div>

            <div className="mt-12 pt-10" style={{ borderTop: '1px solid oklch(0.88 0.005 0)' }}>
              <p className="font-label mb-2" style={{ color: 'oklch(0.46 0.20 25)', fontSize: '0.62rem', letterSpacing: '0.18em' }}>YOU MIGHT ALSO LIKE</p>
              <h2 className="font-display font-light mb-6" style={{ fontSize: 'clamp(1.3rem, 2vw, 1.8rem)', color: 'oklch(0.15 0.005 0)' }}>More Helpful Guides</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Link href="/resources/sprinkler-system-cost-bend-oregon"><span style={{ display:'block',padding:'1.1rem 1.25rem',backgroundColor:'oklch(1 0 0)',borderLeft:'3px solid oklch(0.46 0.20 25)',textDecoration:'none' }}><div className="font-body" style={{ color:'oklch(0.22 0.008 30)',fontWeight:600,fontSize:'0.85rem',marginBottom:'0.3rem' }}>Sprinkler System Cost in Bend</div><div className="font-body" style={{ color:'oklch(0.50 0.008 30)',fontSize:'0.75rem',fontWeight:300,lineHeight:1.5 }}>Full pricing breakdown for irrigation in Central Oregon.</div></span></Link>
                <Link href="/resources/irrigation-repair-bend-oregon"><span style={{ display:'block',padding:'1.1rem 1.25rem',backgroundColor:'oklch(1 0 0)',borderLeft:'3px solid oklch(0.46 0.20 25)',textDecoration:'none' }}><div className="font-body" style={{ color:'oklch(0.22 0.008 30)',fontWeight:600,fontSize:'0.85rem',marginBottom:'0.3rem' }}>Irrigation Repair in Bend</div><div className="font-body" style={{ color:'oklch(0.50 0.008 30)',fontSize:'0.75rem',fontWeight:300,lineHeight:1.5 }}>Common issues and repair costs.</div></span></Link>
                <Link href="/resources/xeriscape-cost-bend-oregon"><span style={{ display:'block',padding:'1.1rem 1.25rem',backgroundColor:'oklch(1 0 0)',borderLeft:'3px solid oklch(0.46 0.20 25)',textDecoration:'none' }}><div className="font-body" style={{ color:'oklch(0.22 0.008 30)',fontWeight:600,fontSize:'0.85rem',marginBottom:'0.3rem' }}>Xeriscape Cost in Bend</div><div className="font-body" style={{ color:'oklch(0.50 0.008 30)',fontSize:'0.75rem',fontWeight:300,lineHeight:1.5 }}>Water-wise landscaping costs in Central Oregon.</div></span></Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
