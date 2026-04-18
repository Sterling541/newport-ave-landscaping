import Navbar from '@/components/Navbar';
import SEO from '@/components/SEO';
import { BreadcrumbSchema } from '@/components/SchemaMarkup';
import { Link } from 'wouter';

export default function BendLandscapingCostGuide() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: 'oklch(0.97 0.003 0)' }}>
      <SEO
        title="Landscaping Cost Guide for Bend, Oregon | Newport Ave"
        description="Complete landscaping cost guide for Bend, Oregon. All services priced — patios, irrigation, xeriscape, lawn care, and more."
        canonical="https://newportavelandscaping.com/resources/landscaping-cost-guide-bend-oregon"
      />
      <BreadcrumbSchema items={[
        { name: 'Home', url: '/' },
        { name: 'Resources', url: '/resources' },
        { name: 'Landscaping Cost Guide for Bend, Oregon', url: '/resources/landscaping-cost-guide-bend-oregon' },
      ]} />
      <Navbar />
      <div style={{ paddingTop: '204px' }}>
        <div className="relative flex items-center justify-center" style={{ height:'380px',backgroundImage:'url(https://d2xsxph8kpxj0f.cloudfront.net/310519663503028182/g3pw3MRUapabcDUbhBEFxx/ITP_7558_e52a40c9.jpg',backgroundSize:'cover',backgroundPosition:'center 50%' }}>
          <div className="absolute inset-0" style={{ backgroundColor: 'oklch(0 0 0 / 0.55)' }} />
          <div className="relative text-center container">
            <p className="font-label mb-3" style={{ color:'oklch(0.72 0.12 25)',fontSize:'0.7rem',letterSpacing:'0.18em' }}>COST GUIDE · BEND, OREGON &middot; 2024</p>
            <h1 className="font-display text-white" style={{ fontSize:'clamp(1.8rem, 4vw, 3rem)',maxWidth:'700px',margin:'0 auto' }}>Landscaping Cost Guide for Bend, Oregon</h1>
          </div>
        </div>
        <div className="container py-16 max-w-3xl mx-auto">
          <div style={{ color: 'oklch(0.25 0.005 0)' }}>
            <p className="mb-8" style={{ fontSize:'1.05rem',lineHeight:1.85,color:'oklch(0.35 0.005 0)' }}>One of the most common questions we get from Bend homeowners is: "What does landscaping cost?" The answer depends enormously on what you're doing, but this guide gives you a realistic overview of what to expect for the most common landscaping services in Central Oregon.</p>

            <h2 className="text-3xl font-bold mb-4" style={{ color: 'oklch(0.25 0.005 0)' }}>Hardscape Costs in Bend</h2>
            <div className="overflow-x-auto mb-8"><table className="min-w-full bg-white border border-gray-300"><thead><tr><th className="py-2 px-4 border-b text-left">Service</th><th className="py-2 px-4 border-b text-left">Typical Cost Range</th></tr></thead><tbody><tr><td className="py-2 px-4 border-b">Paver patio (per sq ft)</td><td className="py-2 px-4 border-b">$15–$30/sq ft installed</td></tr>
                  <tr><td className="py-2 px-4 border-b">Paver walkway (per sq ft)</td><td className="py-2 px-4 border-b">$18–$35/sq ft installed</td></tr>
                  <tr><td className="py-2 px-4 border-b">Paver driveway (per sq ft)</td><td className="py-2 px-4 border-b">$20–$40/sq ft installed</td></tr>
                  <tr><td className="py-2 px-4 border-b">Retaining wall (per sq ft face)</td><td className="py-2 px-4 border-b">$30–$80/sq ft installed</td></tr>
                  <tr><td className="py-2 px-4 border-b">Outdoor kitchen</td><td className="py-2 px-4 border-b">$8,000–$50,000+</td></tr>
                  <tr><td className="py-2 px-4 border-b">Pergola</td><td className="py-2 px-4 border-b">$4,000–$30,000</td></tr></tbody></table></div>

            <h2 className="text-3xl font-bold mb-4" style={{ color: 'oklch(0.25 0.005 0)' }}>Landscape Installation Costs in Bend</h2>
            <div className="overflow-x-auto mb-8"><table className="min-w-full bg-white border border-gray-300"><thead><tr><th className="py-2 px-4 border-b text-left">Service</th><th className="py-2 px-4 border-b text-left">Typical Cost Range</th></tr></thead><tbody><tr><td className="py-2 px-4 border-b">Full landscape design + install</td><td className="py-2 px-4 border-b">$20,000–$80,000+</td></tr>
                  <tr><td className="py-2 px-4 border-b">Xeriscape conversion</td><td className="py-2 px-4 border-b">$10,000–$35,000</td></tr>
                  <tr><td className="py-2 px-4 border-b">Sod installation (per sq ft)</td><td className="py-2 px-4 border-b">$1.20–$2.35/sq ft</td></tr>
                  <tr><td className="py-2 px-4 border-b">Tree planting (per tree)</td><td className="py-2 px-4 border-b">$200–$800</td></tr>
                  <tr><td className="py-2 px-4 border-b">Shrub installation (per plant)</td><td className="py-2 px-4 border-b">$75–$250</td></tr>
                  <tr><td className="py-2 px-4 border-b">Perennial garden (per sq ft)</td><td className="py-2 px-4 border-b">$10–$25/sq ft</td></tr></tbody></table></div>

            <h2 className="text-3xl font-bold mb-4" style={{ color: 'oklch(0.25 0.005 0)' }}>Irrigation and Maintenance Costs in Bend</h2>
            <div className="overflow-x-auto mb-8"><table className="min-w-full bg-white border border-gray-300"><thead><tr><th className="py-2 px-4 border-b text-left">Service</th><th className="py-2 px-4 border-b text-left">Typical Cost Range</th></tr></thead><tbody><tr><td className="py-2 px-4 border-b">New sprinkler system</td><td className="py-2 px-4 border-b">$1,600–$2,000/zone</td></tr>
                  <tr><td className="py-2 px-4 border-b">Sprinkler repair</td><td className="py-2 px-4 border-b">$140/tech hour+</td></tr>
                  <tr><td className="py-2 px-4 border-b">Fall winterization</td><td className="py-2 px-4 border-b">$140/tech hour</td></tr>
                  <tr><td className="py-2 px-4 border-b">Weekly mowing</td><td className="py-2 px-4 border-b">From $97/service</td></tr>
                  <tr><td className="py-2 px-4 border-b">Everything Maintenance Plan</td><td className="py-2 px-4 border-b">From $388/month</td></tr>
                  <tr><td className="py-2 px-4 border-b">Spring/fall cleanup</td><td className="py-2 px-4 border-b">Starting at $600</td></tr></tbody></table></div>
            <div className="p-8 text-center mt-12" style={{ backgroundColor: 'oklch(0.18 0.008 0)' }}>
              <p className="font-label text-xs mb-3" style={{ color:'oklch(0.46 0.20 25)',letterSpacing:'0.18em' }}>GET STARTED TODAY</p>
              <h3 className="font-display text-white mb-4" style={{ fontSize:'1.6rem' }}>Get a Free Quote for Your Bend Landscaping Project</h3>
              <p className="font-body mb-6" style={{ color:'oklch(0.72 0.005 0)',lineHeight:1.7 }}>Our team will assess your property and provide a detailed, itemized proposal at no cost. We serve Bend and all of Central Oregon.</p>
              <Link href="/contact"><span className="btn-red inline-block">Get Your Free Quote →</span></Link>
              <p className="mt-4 text-sm" style={{ color:'oklch(0.60 0.005 0)' }}>Or call us: (541) 617-8873</p>
            </div>

            <div className="mt-12 pt-10" style={{ borderTop: '1px solid oklch(0.88 0.005 0)' }}>
              <p className="font-label mb-2" style={{ color: 'oklch(0.46 0.20 25)', fontSize: '0.62rem', letterSpacing: '0.18em' }}>YOU MIGHT ALSO LIKE</p>
              <h2 className="font-display font-light mb-6" style={{ fontSize: 'clamp(1.3rem, 2vw, 1.8rem)', color: 'oklch(0.15 0.005 0)' }}>More Helpful Guides</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Link href="/resources/paver-patio-cost-bend-oregon"><span style={{ display:'block',padding:'1.1rem 1.25rem',backgroundColor:'oklch(1 0 0)',borderLeft:'3px solid oklch(0.46 0.20 25)',textDecoration:'none' }}><div className="font-body" style={{ color:'oklch(0.22 0.008 30)',fontWeight:600,fontSize:'0.85rem',marginBottom:'0.3rem' }}>Paver Patio Cost in Bend</div><div className="font-body" style={{ color:'oklch(0.50 0.008 30)',fontSize:'0.75rem',fontWeight:300,lineHeight:1.5 }}>Detailed paver patio pricing.</div></span></Link>
                <Link href="/resources/landscape-design-cost-bend-oregon"><span style={{ display:'block',padding:'1.1rem 1.25rem',backgroundColor:'oklch(1 0 0)',borderLeft:'3px solid oklch(0.46 0.20 25)',textDecoration:'none' }}><div className="font-body" style={{ color:'oklch(0.22 0.008 30)',fontWeight:600,fontSize:'0.85rem',marginBottom:'0.3rem' }}>Landscape Design Cost in Bend</div><div className="font-body" style={{ color:'oklch(0.50 0.008 30)',fontSize:'0.75rem',fontWeight:300,lineHeight:1.5 }}>Full-yard design and installation pricing.</div></span></Link>
                <Link href="/resources/sprinkler-system-cost-bend-oregon"><span style={{ display:'block',padding:'1.1rem 1.25rem',backgroundColor:'oklch(1 0 0)',borderLeft:'3px solid oklch(0.46 0.20 25)',textDecoration:'none' }}><div className="font-body" style={{ color:'oklch(0.22 0.008 30)',fontWeight:600,fontSize:'0.85rem',marginBottom:'0.3rem' }}>Sprinkler System Cost in Bend</div><div className="font-body" style={{ color:'oklch(0.50 0.008 30)',fontSize:'0.75rem',fontWeight:300,lineHeight:1.5 }}>Irrigation system pricing.</div></span></Link>
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
