import Navbar from '@/components/Navbar';
import SEO from '@/components/SEO';
import { BreadcrumbSchema } from '@/components/SchemaMarkup';
import { Link } from 'wouter';

export default function HowToChooseLandscaperBend() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: 'oklch(0.97 0.003 0)' }}>
      <SEO
        title="How to Choose a Landscaper in Bend, OR | Newport Ave"
        description="How to choose a landscaping company in Bend, Oregon. Questions to ask, red flags to avoid, and what to look for in a Central Oregon landscaper."
        canonical="https://newportavelandscaping.com/resources/how-to-choose-landscaper-bend-oregon"
      />
      <BreadcrumbSchema items={[
        { name: 'Home', url: '/' },
        { name: 'Resources', url: '/resources' },
        { name: 'How to Choose a Landscaper in Bend, Oregon', url: '/resources/how-to-choose-landscaper-bend-oregon' },
      ]} />
      <Navbar />
      <div style={{ paddingTop: '328px' }}>
        <div className="relative flex items-center justify-center" style={{ height:'380px',backgroundImage:'url(https://d2xsxph8kpxj0f.cloudfront.net/310519663503028182/g3pw3MRUapabcDUbhBEFxx/ITP_7558_e52a40c9.jpg',backgroundSize:'cover',backgroundPosition:'center 50%' }}>
          <div className="absolute inset-0" style={{ backgroundColor: 'oklch(0 0 0 / 0.55)' }} />
          <div className="relative text-center container">
            <p className="font-label mb-3" style={{ color:'oklch(0.72 0.12 25)',fontSize:'0.7rem',letterSpacing:'0.18em' }}>CONSUMER GUIDE · BEND, OREGON &middot; 2024</p>
            <h1 className="font-display text-white" style={{ fontSize:'clamp(1.8rem, 4vw, 3rem)',maxWidth:'700px',margin:'0 auto' }}>How to Choose a Landscaper in Bend, Oregon</h1>
          </div>
        </div>
        <div className="container py-16 max-w-3xl mx-auto">
          <div style={{ color: 'oklch(0.25 0.005 0)' }}>
            <p className="mb-8" style={{ fontSize:'1.05rem',lineHeight:1.85,color:'oklch(0.35 0.005 0)' }}>Choosing the wrong landscaping company in Bend can cost you thousands of dollars and years of frustration. We've seen the aftermath of bad work — failed retaining walls, improperly installed irrigation, patios that heave after one winter. Here's an honest guide to finding a landscaper you can trust in Central Oregon.</p>

            <h2 className="text-3xl font-bold mb-4" style={{ color: 'oklch(0.25 0.005 0)' }}>Questions to Ask Before Hiring a Landscaper in Bend</h2>
            <ul className="list-disc pl-5 mb-8 space-y-1">
              <li>Are you licensed with the Oregon Landscape Contractors Board (LCB)?</li>
              <li>Do you carry liability insurance? How much?</li>
              <li>Do you carry workers' compensation insurance for your employees?</li>
              <li>How long have you been in business in Central Oregon?</li>
              <li>Do you use your own employees or subcontractors?</li>
              <li>What warranty do you offer on your work?</li>
              <li>Can you provide references from recent projects in Bend?</li>
              <li>Will you pull all required permits?</li>
            </ul>

            <h2 className="text-3xl font-bold mb-4" style={{ color: 'oklch(0.25 0.005 0)' }}>Red Flags to Watch For</h2>
            <ul className="list-disc pl-5 mb-8 space-y-1">
              <li>No Oregon LCB license (required for all landscaping contractors)</li>
              <li>Asking for large cash deposits upfront (more than 30%)</li>
              <li>No written contract or vague scope of work</li>
              <li>Prices dramatically lower than other bids (often means cutting corners)</li>
              <li>Can't provide proof of insurance</li>
              <li>No physical address or local presence</li>
              <li>Pressure to sign immediately without time to review</li>
            </ul>

            <h2 className="text-3xl font-bold mb-4" style={{ color: 'oklch(0.25 0.005 0)' }}>What to Look for in a Bend Landscaper</h2>
            <p className="mb-4">The best landscaping companies in Bend have been here for years, have a physical presence in the community, and can show you completed projects nearby. Ask to see work they've done in your neighborhood.</p>
            <p className="mb-4">A written contract with a detailed scope of work, material specifications, timeline, and warranty terms is non-negotiable. Never hire a landscaper who won't put everything in writing.</p>
            <div className="bg-gray-100 p-6 rounded-lg mb-8 border-l-4" style={{ borderColor: 'oklch(0.46 0.20 25)' }}>
              <p className="font-bold text-lg mb-2" style={{ color: 'oklch(0.25 0.005 0)' }}>PRO TIP</p>
              <p>Newport Avenue Landscaping is licensed with the Oregon LCB (License #9153), carries $2M in liability insurance, and offers a 5-year workmanship warranty on all hardscape projects. We're happy to provide references from projects in your neighborhood.</p>
            </div>
            <div className="p-8 text-center mt-12" style={{ backgroundColor: 'oklch(0.18 0.008 0)' }}>
              <p className="font-label text-xs mb-3" style={{ color:'oklch(0.46 0.20 25)',letterSpacing:'0.18em' }}>GET STARTED TODAY</p>
              <h3 className="font-display text-white mb-4" style={{ fontSize:'1.6rem' }}>See Why Bend Homeowners Choose Newport Avenue</h3>
              <p className="font-body mb-6" style={{ color:'oklch(0.72 0.005 0)',lineHeight:1.7 }}>We're licensed, insured, and have been serving Central Oregon for 21+ years. Contact us for a free consultation — no pressure, no obligation.</p>
              <Link href="/contact"><span className="btn-red inline-block">Schedule Your Free Consultation →</span></Link>
              <p className="mt-4 text-sm" style={{ color:'oklch(0.60 0.005 0)' }}>Or call us: (541) 617-8873</p>
            </div>

            <div className="mt-12 pt-10" style={{ borderTop: '1px solid oklch(0.88 0.005 0)' }}>
              <p className="font-label mb-2" style={{ color: 'oklch(0.46 0.20 25)', fontSize: '0.62rem', letterSpacing: '0.18em' }}>YOU MIGHT ALSO LIKE</p>
              <h2 className="font-display font-light mb-6" style={{ fontSize: 'clamp(1.3rem, 2vw, 1.8rem)', color: 'oklch(0.15 0.005 0)' }}>More Helpful Guides</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Link href="/resources/landscape-design-cost-bend-oregon"><span style={{ display:'block',padding:'1.1rem 1.25rem',backgroundColor:'oklch(1 0 0)',borderLeft:'3px solid oklch(0.46 0.20 25)',textDecoration:'none' }}><div className="font-body" style={{ color:'oklch(0.22 0.008 30)',fontWeight:600,fontSize:'0.85rem',marginBottom:'0.3rem' }}>Landscape Design Cost in Bend</div><div className="font-body" style={{ color:'oklch(0.50 0.008 30)',fontSize:'0.75rem',fontWeight:300,lineHeight:1.5 }}>Full-yard design and installation pricing.</div></span></Link>
                <Link href="/resources/paver-patio-cost-bend-oregon"><span style={{ display:'block',padding:'1.1rem 1.25rem',backgroundColor:'oklch(1 0 0)',borderLeft:'3px solid oklch(0.46 0.20 25)',textDecoration:'none' }}><div className="font-body" style={{ color:'oklch(0.22 0.008 30)',fontWeight:600,fontSize:'0.85rem',marginBottom:'0.3rem' }}>Paver Patio Cost in Bend</div><div className="font-body" style={{ color:'oklch(0.50 0.008 30)',fontSize:'0.75rem',fontWeight:300,lineHeight:1.5 }}>Hardscape pricing for Central Oregon projects.</div></span></Link>
                <Link href="/resources/professional-vs-diy-landscaping-bend-oregon"><span style={{ display:'block',padding:'1.1rem 1.25rem',backgroundColor:'oklch(1 0 0)',borderLeft:'3px solid oklch(0.46 0.20 25)',textDecoration:'none' }}><div className="font-body" style={{ color:'oklch(0.22 0.008 30)',fontWeight:600,fontSize:'0.85rem',marginBottom:'0.3rem' }}>Professional vs. DIY Landscaping</div><div className="font-body" style={{ color:'oklch(0.50 0.008 30)',fontSize:'0.75rem',fontWeight:300,lineHeight:1.5 }}>When to hire a pro and when to DIY.</div></span></Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
