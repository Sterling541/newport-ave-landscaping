import Navbar from '@/components/Navbar';
import SEO from '@/components/SEO';
import { BreadcrumbSchema } from '@/components/SchemaMarkup';
import { Link } from 'wouter';

export default function BendLandscapingTips() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: 'oklch(0.97 0.003 0)' }}>
      <SEO
        title="Landscaping Tips for Bend, Oregon Homeowners | Newport Ave"
        description="Expert landscaping tips for Bend, Oregon homeowners. Practical advice for Central Oregon's high desert climate from 21+ years of experience."
        canonical="https://newportavelandscaping.com/resources/landscaping-tips-bend-oregon"
      />
      <BreadcrumbSchema items={[
        { name: 'Home', url: '/' },
        { name: 'Resources', url: '/resources' },
        { name: 'Landscaping Tips for Bend, Oregon Homeowners', url: '/resources/landscaping-tips-bend-oregon' },
      ]} />
      <Navbar />
      <div style={{ paddingTop: '204px' }}>
        <div className="relative flex items-center justify-center" style={{ height:'380px',backgroundImage:'url(/manus-storage/hero-general-landscaping_ccf2305a.jpg)',backgroundSize:'cover',backgroundPosition:'center 50%' }}>
          <div className="absolute inset-0" style={{ backgroundColor: 'oklch(0 0 0 / 0.55)' }} />
          <div className="relative text-center container">
            <p className="font-label mb-3" style={{ color:'oklch(0.72 0.12 25)',fontSize:'0.7rem',letterSpacing:'0.18em' }}>LANDSCAPE GUIDE · BEND, OREGON &middot; 2024</p>
            <h1 className="font-display text-white" style={{ fontSize:'clamp(1.8rem, 4vw, 3rem)',maxWidth:'700px',margin:'0 auto' }}>Landscaping Tips for Bend, Oregon Homeowners</h1>
          </div>
        </div>
        <div className="container py-16 max-w-3xl mx-auto">
          <div style={{ color: 'oklch(0.25 0.005 0)' }}>
            <p className="mb-8" style={{ fontSize:'1.05rem',lineHeight:1.85,color:'oklch(0.35 0.005 0)' }}>After 21 years of landscaping in Central Oregon, we've learned a lot about what works — and what doesn't — in Bend's unique climate. Here are our most practical tips for Bend homeowners, based on thousands of projects across the region.</p>

            <h2 className="text-3xl font-bold mb-4" style={{ color: 'oklch(0.25 0.005 0)' }}>Irrigation Tips for Bend Homeowners</h2>
            <ul className="list-disc pl-5 mb-8 space-y-1">
              <li>Water in the early morning (5–8 AM) to minimize evaporation and fungal disease</li>
              <li>Water deeply and infrequently — 3x/week for 20–30 min is better than daily short cycles</li>
              <li>Upgrade to a smart controller to save 15–25% of irrigation water</li>
              <li>Winterize your system before October 15th — every year, no exceptions</li>
              <li>Check your system monthly during the growing season for broken heads and coverage gaps</li>
            </ul>

            <h2 className="text-3xl font-bold mb-4" style={{ color: 'oklch(0.25 0.005 0)' }}>Lawn Care Tips for Bend</h2>
            <ul className="list-disc pl-5 mb-8 space-y-1">
              <li>Mow at 3–3.5 inches in summer to protect roots from heat stress</li>
              <li>Aerate in spring (May–June) and/or fall (August–September)</li>
              <li>Apply pre-emergent weed control before soil hits 55°F in spring</li>
              <li>Don't over-fertilize with nitrogen in summer — it promotes disease</li>
              <li>Leave grass clippings on the lawn (mulch mowing) to return nutrients</li>
            </ul>

            <h2 className="text-3xl font-bold mb-4" style={{ color: 'oklch(0.25 0.005 0)' }}>Planting Tips for Bend's Climate</h2>
            <p className="mb-4">Choose plants rated for Zone 5b or colder — Bend can surprise you with cold snaps that exceed Zone 6a expectations.</p>
            <p className="mb-4">Plant in fall (August–September) or spring (May–June). Avoid summer planting if possible.</p>
            <p className="mb-4">Water new plants regularly for their first full growing season, even drought-tolerant ones.</p>
            <p className="mb-4">Mulch everything — 3 inches of rock or organic mulch dramatically reduces water needs and weed pressure.</p>
            <div className="bg-gray-100 p-6 rounded-lg mb-8 border-l-4" style={{ borderColor: 'oklch(0.46 0.20 25)' }}>
              <p className="font-bold text-lg mb-2" style={{ color: 'oklch(0.25 0.005 0)' }}>PRO TIP</p>
              <p>The most common landscaping mistake in Bend is planting too much too fast. Start with a solid design, install irrigation first, then add plants gradually. A well-designed landscape with fewer plants looks better than an overcrowded one.</p>
            </div>
            <div className="p-8 text-center mt-12" style={{ backgroundColor: 'oklch(0.18 0.008 0)' }}>
              <p className="font-label text-xs mb-3" style={{ color:'oklch(0.46 0.20 25)',letterSpacing:'0.18em' }}>GET STARTED TODAY</p>
              <h3 className="font-display text-white mb-4" style={{ fontSize:'1.6rem' }}>Get Expert Landscaping Help in Bend</h3>
              <p className="font-body mb-6" style={{ color:'oklch(0.72 0.005 0)',lineHeight:1.7 }}>Our team has 21+ years of experience in Central Oregon's unique climate. Contact us for a free consultation.</p>
              <Link href="/contact"><span className="btn-red inline-block">Schedule Your Free Consultation →</span></Link>
              <p className="mt-4 text-sm" style={{ color:'oklch(0.60 0.005 0)' }}>Or call us: (541) 617-8873</p>
            </div>

            <div className="mt-12 pt-10" style={{ borderTop: '1px solid oklch(0.88 0.005 0)' }}>
              <p className="font-label mb-2" style={{ color: 'oklch(0.46 0.20 25)', fontSize: '0.62rem', letterSpacing: '0.18em' }}>YOU MIGHT ALSO LIKE</p>
              <h2 className="font-display font-light mb-6" style={{ fontSize: 'clamp(1.3rem, 2vw, 1.8rem)', color: 'oklch(0.15 0.005 0)' }}>More Helpful Guides</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Link href="/resources/spring-landscaping-guide-bend-oregon"><span style={{ display:'block',padding:'1.1rem 1.25rem',backgroundColor:'oklch(1 0 0)',borderLeft:'3px solid oklch(0.46 0.20 25)',textDecoration:'none' }}><div className="font-body" style={{ color:'oklch(0.22 0.008 30)',fontWeight:600,fontSize:'0.85rem',marginBottom:'0.3rem' }}>Spring Landscaping Guide</div><div className="font-body" style={{ color:'oklch(0.50 0.008 30)',fontSize:'0.75rem',fontWeight:300,lineHeight:1.5 }}>Get ready for the growing season in Bend.</div></span></Link>
                <Link href="/resources/fall-landscaping-guide-bend-oregon"><span style={{ display:'block',padding:'1.1rem 1.25rem',backgroundColor:'oklch(1 0 0)',borderLeft:'3px solid oklch(0.46 0.20 25)',textDecoration:'none' }}><div className="font-body" style={{ color:'oklch(0.22 0.008 30)',fontWeight:600,fontSize:'0.85rem',marginBottom:'0.3rem' }}>Fall Landscaping Guide</div><div className="font-body" style={{ color:'oklch(0.50 0.008 30)',fontSize:'0.75rem',fontWeight:300,lineHeight:1.5 }}>Complete fall checklist for Bend homeowners.</div></span></Link>
                <Link href="/resources/how-to-water-lawn-bend-oregon"><span style={{ display:'block',padding:'1.1rem 1.25rem',backgroundColor:'oklch(1 0 0)',borderLeft:'3px solid oklch(0.46 0.20 25)',textDecoration:'none' }}><div className="font-body" style={{ color:'oklch(0.22 0.008 30)',fontWeight:600,fontSize:'0.85rem',marginBottom:'0.3rem' }}>How to Water Your Lawn in Bend</div><div className="font-body" style={{ color:'oklch(0.50 0.008 30)',fontSize:'0.75rem',fontWeight:300,lineHeight:1.5 }}>Expert watering guide for Bend's high desert climate.</div></span></Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
