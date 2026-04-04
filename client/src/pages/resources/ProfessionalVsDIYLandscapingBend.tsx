import Navbar from '@/components/Navbar';
import SEO from '@/components/SEO';
import { BreadcrumbSchema } from '@/components/SchemaMarkup';
import { Link } from 'wouter';

export default function ProfessionalVsDIYLandscapingBend() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: 'oklch(0.97 0.003 0)' }}>
      <SEO
        title="Professional vs. DIY Landscaping in Bend, OR | Newport Ave"
        description="Professional vs. DIY landscaping in Bend, Oregon. When to hire a pro and when to do it yourself — an honest guide."
        canonical="https://newportavelandscaping.com/resources/professional-vs-diy-landscaping-bend-oregon"
      />
      <BreadcrumbSchema items={[
        { name: 'Home', url: '/' },
        { name: 'Resources', url: '/resources' },
        { name: 'Professional vs. DIY Landscaping in Bend: An Honest Guide', url: '/resources/professional-vs-diy-landscaping-bend-oregon' },
      ]} />
      <Navbar />
      <div style={{ paddingTop: '328px' }}>
        <div className="relative flex items-center justify-center" style={{ height:'380px',backgroundImage:'url(https://d2xsxph8kpxj0f.cloudfront.net/310519663503028182/g3pw3MRUapabcDUbhBEFxx/ITP_7404_28389405.jpg)',backgroundSize:'cover',backgroundPosition:'center 50%' }}>
          <div className="absolute inset-0" style={{ backgroundColor: 'oklch(0 0 0 / 0.55)' }} />
          <div className="relative text-center container">
            <p className="font-label mb-3" style={{ color:'oklch(0.72 0.12 25)',fontSize:'0.7rem',letterSpacing:'0.18em' }}>LANDSCAPE GUIDE · BEND, OREGON &middot; 2024</p>
            <h1 className="font-display text-white" style={{ fontSize:'clamp(1.8rem, 4vw, 3rem)',maxWidth:'700px',margin:'0 auto' }}>Professional vs. DIY Landscaping in Bend: An Honest Guide</h1>
          </div>
        </div>
        <div className="container py-16 max-w-3xl mx-auto">
          <div style={{ color: 'oklch(0.25 0.005 0)' }}>
            <p className="mb-8" style={{ fontSize:'1.05rem',lineHeight:1.85,color:'oklch(0.35 0.005 0)' }}>We're a landscaping company, so you might expect us to say "always hire a professional." But that's not always the right answer. Here's an honest guide to when professional installation is worth it — and when a motivated homeowner can do the work themselves.</p>

            <h2 className="text-3xl font-bold mb-4" style={{ color: 'oklch(0.25 0.005 0)' }}>When to Hire a Professional in Bend</h2>
            <ul className="list-disc pl-5 mb-8 space-y-1">
              <li>Hardscape projects (patios, retaining walls, driveways) — proper base preparation and drainage are critical and difficult to get right without experience</li>
              <li>Irrigation system design and installation — improper installation leads to uneven coverage, freeze damage, and wasted water</li>
              <li>Large grading or drainage projects — mistakes can cause serious erosion and property damage</li>
              <li>Projects requiring permits (retaining walls over 4 ft, electrical for lighting)</li>
              <li>Any project where you want a warranty on the work</li>
            </ul>

            <h2 className="text-3xl font-bold mb-4" style={{ color: 'oklch(0.25 0.005 0)' }}>When DIY Can Work Well</h2>
            <ul className="list-disc pl-5 mb-8 space-y-1">
              <li>Planting shrubs, perennials, and small trees</li>
              <li>Mulching and bed maintenance</li>
              <li>Small lawn repairs and overseeding</li>
              <li>Container gardening and raised beds</li>
              <li>Simple pathway gravel installation</li>
              <li>Seasonal cleanups</li>
            </ul>

            <h2 className="text-3xl font-bold mb-4" style={{ color: 'oklch(0.25 0.005 0)' }}>The Hidden Costs of DIY in Bend</h2>
            <p className="mb-4">DIY landscaping in Bend often costs more than expected when you factor in tool rental, material waste, and the cost of fixing mistakes. Bend's rocky volcanic soil makes digging and grading much harder than in most other regions.</p>
            <p className="mb-4">We've repaired many DIY irrigation systems, re-leveled DIY patios, and rebuilt DIY retaining walls that failed. The savings from DIY often disappear when professional repair is needed.</p>
            <div className="bg-gray-100 p-6 rounded-lg mb-8 border-l-4" style={{ borderColor: 'oklch(0.46 0.20 25)' }}>
              <p className="font-bold text-lg mb-2" style={{ color: 'oklch(0.25 0.005 0)' }}>PRO TIP</p>
              <p>A good middle ground: hire a professional for the design and hardscape, then do the planting yourself. You get the structural work done right, and you save money on the labor-intensive but forgiving task of planting.</p>
            </div>
            <div className="p-8 text-center mt-12" style={{ backgroundColor: 'oklch(0.18 0.008 0)' }}>
              <p className="font-label text-xs mb-3" style={{ color:'oklch(0.46 0.20 25)',letterSpacing:'0.18em' }}>GET STARTED TODAY</p>
              <h3 className="font-display text-white mb-4" style={{ fontSize:'1.6rem' }}>Get a Free Consultation in Bend</h3>
              <p className="font-body mb-6" style={{ color:'oklch(0.72 0.005 0)',lineHeight:1.7 }}>We'll give you an honest assessment of your project and tell you what's worth hiring out and what you can do yourself.</p>
              <Link href="/contact"><span className="btn-red inline-block">Schedule Your Free Consultation →</span></Link>
              <p className="mt-4 text-sm" style={{ color:'oklch(0.60 0.005 0)' }}>Or call us: (541) 617-8873</p>
            </div>

            <div className="mt-12 pt-10" style={{ borderTop: '1px solid oklch(0.88 0.005 0)' }}>
              <p className="font-label mb-2" style={{ color: 'oklch(0.46 0.20 25)', fontSize: '0.62rem', letterSpacing: '0.18em' }}>YOU MIGHT ALSO LIKE</p>
              <h2 className="font-display font-light mb-6" style={{ fontSize: 'clamp(1.3rem, 2vw, 1.8rem)', color: 'oklch(0.15 0.005 0)' }}>More Helpful Guides</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Link href="/resources/how-to-choose-landscaper-bend-oregon"><span style={{ display:'block',padding:'1.1rem 1.25rem',backgroundColor:'oklch(1 0 0)',borderLeft:'3px solid oklch(0.46 0.20 25)',textDecoration:'none' }}><div className="font-body" style={{ color:'oklch(0.22 0.008 30)',fontWeight:600,fontSize:'0.85rem',marginBottom:'0.3rem' }}>How to Choose a Landscaper in Bend</div><div className="font-body" style={{ color:'oklch(0.50 0.008 30)',fontSize:'0.75rem',fontWeight:300,lineHeight:1.5 }}>Questions to ask and red flags to avoid.</div></span></Link>
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
