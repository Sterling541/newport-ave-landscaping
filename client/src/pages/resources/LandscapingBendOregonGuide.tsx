import Navbar from '@/components/Navbar';
import SEO from '@/components/SEO';
import { BreadcrumbSchema } from '@/components/SchemaMarkup';
import { Link } from 'wouter';

export default function LandscapingBendOregonGuide() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: 'oklch(0.97 0.003 0)' }}>
      <SEO
        title="Landscaping in Bend, Oregon: The Complete Guide | Newport Ave"
        description="Everything you need to know about landscaping in Bend, Oregon. Climate, soil, services, costs, and how to find the right landscaper."
        canonical="https://newportavelandscaping.com/resources/landscaping-bend-oregon"
      />
      <BreadcrumbSchema items={[
        { name: 'Home', url: '/' },
        { name: 'Resources', url: '/resources' },
        { name: 'Landscaping in Bend, Oregon: The Complete Guide', url: '/resources/landscaping-bend-oregon' },
      ]} />
      <Navbar />
      <div style={{ paddingTop: '328px' }}>
        <div className="relative flex items-center justify-center" style={{ height:'380px',backgroundImage:'url(https://d2xsxph8kpxj0f.cloudfront.net/310519663503028182/g3pw3MRUapabcDUbhBEFxx/ITP_7404_28389405.jpg)',backgroundSize:'cover',backgroundPosition:'center 50%' }}>
          <div className="absolute inset-0" style={{ backgroundColor: 'oklch(0 0 0 / 0.55)' }} />
          <div className="relative text-center container">
            <p className="font-label mb-3" style={{ color:'oklch(0.72 0.12 25)',fontSize:'0.7rem',letterSpacing:'0.18em' }}>LANDSCAPE GUIDE · BEND, OREGON &middot; 2024</p>
            <h1 className="font-display text-white" style={{ fontSize:'clamp(1.8rem, 4vw, 3rem)',maxWidth:'700px',margin:'0 auto' }}>Landscaping in Bend, Oregon: The Complete Guide</h1>
          </div>
        </div>
        <div className="container py-16 max-w-3xl mx-auto">
          <div style={{ color: 'oklch(0.25 0.005 0)' }}>
            <p className="mb-8" style={{ fontSize:'1.05rem',lineHeight:1.85,color:'oklch(0.35 0.005 0)' }}>Landscaping in Bend, Oregon is unlike landscaping anywhere else. Our high desert climate, volcanic soil, freeze-thaw winters, and intense summer sun create unique challenges — and unique opportunities. This guide covers everything you need to know about creating and maintaining a beautiful landscape in Central Oregon.</p>

            <h2 className="text-3xl font-bold mb-4" style={{ color: 'oklch(0.25 0.005 0)' }}>Bend's Climate: What It Means for Your Landscape</h2>
            <p className="mb-4">Bend sits at 3,600 feet elevation in Oregon's high desert. Annual rainfall averages 12 inches — most of it falling in winter as snow. Summers are hot and dry (highs regularly above 90°F), with low humidity and intense UV. Winters bring hard freezes and 30+ inches of snow.</p>
            <p className="mb-8">This climate eliminates many plants that thrive in western Oregon's mild, wet climate. But it's perfect for drought-tolerant natives, ornamental grasses, lavender, penstemon, and the iconic ponderosa pine.</p>

            <h2 className="text-3xl font-bold mb-4" style={{ color: 'oklch(0.25 0.005 0)' }}>The Most Popular Landscaping Projects in Bend</h2>
            <ul className="list-disc pl-5 mb-8 space-y-1">
              <li>Paver patios and outdoor living spaces</li>
              <li>Xeriscape and drought-tolerant landscaping</li>
              <li>Irrigation system installation and repair</li>
              <li>Lawn care and maintenance</li>
              <li>Retaining walls and grading</li>
              <li>Landscape design and full-yard installation</li>
              <li>Water features (pondless waterfalls, fountains)</li>
              <li>Outdoor lighting</li>
              <li>Snow removal</li>
            </ul>

            <h2 className="text-3xl font-bold mb-4" style={{ color: 'oklch(0.25 0.005 0)' }}>Choosing a Landscaper in Bend</h2>
            <p className="mb-4">The most important thing to verify is Oregon Landscape Contractors Board (LCB) licensing. All landscaping contractors in Oregon must be licensed with the LCB. Ask for the license number and verify it at the LCB website.</p>
            <p className="mb-4">Beyond licensing, look for a company with a physical presence in Bend, verifiable references from recent local projects, and a written warranty on their work.</p>
            <div className="bg-gray-100 p-6 rounded-lg mb-8 border-l-4" style={{ borderColor: 'oklch(0.46 0.20 25)' }}>
              <p className="font-bold text-lg mb-2" style={{ color: 'oklch(0.25 0.005 0)' }}>PRO TIP</p>
              <p>Newport Avenue Landscaping is licensed with the Oregon LCB (License #9153), carries $2M in liability insurance, and offers a 5-year workmanship warranty on all hardscape projects. We've been serving Central Oregon since 2003.</p>
            </div>
            <div className="p-8 text-center mt-12" style={{ backgroundColor: 'oklch(0.18 0.008 0)' }}>
              <p className="font-label text-xs mb-3" style={{ color:'oklch(0.46 0.20 25)',letterSpacing:'0.18em' }}>GET STARTED TODAY</p>
              <h3 className="font-display text-white mb-4" style={{ fontSize:'1.6rem' }}>Get a Free Landscaping Consultation in Bend</h3>
              <p className="font-body mb-6" style={{ color:'oklch(0.72 0.005 0)',lineHeight:1.7 }}>Our design team will visit your property, discuss your goals, and provide a detailed proposal at no cost. We serve Bend and all of Central Oregon.</p>
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
