import Navbar from '@/components/Navbar';
import SEO from '@/components/SEO';
import { BreadcrumbSchema } from '@/components/SchemaMarkup';
import { Link } from 'wouter';

export default function SpringLandscapingGuideBend() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: 'oklch(0.97 0.003 0)' }}>
      <SEO
        title="Spring Landscaping Guide for Bend, Oregon | Newport Ave"
        description="Complete spring landscaping checklist for Bend, Oregon homeowners. When to aerate, activate sprinklers, plant, and clean up your yard."
        canonical="https://newportavelandscaping.com/resources/spring-landscaping-guide-bend-oregon"
      />
      <BreadcrumbSchema items={[
        { name: 'Home', url: '/' },
        { name: 'Resources', url: '/resources' },
        { name: 'Spring Landscaping Guide for Bend, Oregon', url: '/resources/spring-landscaping-guide-bend-oregon' },
      ]} />
      <Navbar />
      <div style={{ paddingTop: '328px' }}>
        <div className="relative flex items-center justify-center" style={{ height:'380px',backgroundImage:'url(https://files.manuscdn.com/user_upload_by_module/session_file/310519663503028182/QuZbCMdvWnmWDtAV.jpg',backgroundSize:'cover',backgroundPosition:'center 50%' }}>
          <div className="absolute inset-0" style={{ backgroundColor: 'oklch(0 0 0 / 0.55)' }} />
          <div className="relative text-center container">
            <p className="font-label mb-3" style={{ color:'oklch(0.72 0.12 25)',fontSize:'0.7rem',letterSpacing:'0.18em' }}>SEASONAL GUIDE · BEND, OREGON &middot; 2024</p>
            <h1 className="font-display text-white" style={{ fontSize:'clamp(1.8rem, 4vw, 3rem)',maxWidth:'700px',margin:'0 auto' }}>Spring Landscaping Guide for Bend, Oregon</h1>
          </div>
        </div>
        <div className="container py-16 max-w-3xl mx-auto">
          <div style={{ color: 'oklch(0.25 0.005 0)' }}>
            <p className="mb-8" style={{ fontSize:'1.05rem',lineHeight:1.85,color:'oklch(0.35 0.005 0)' }}>Spring in Bend arrives later than most people expect. While the calendar says March, Central Oregon's last frost typically falls in mid-May — and the soil stays cold well into April. Here's our month-by-month guide to getting your Bend landscape ready for the growing season.</p>

            <h2 className="text-3xl font-bold mb-4" style={{ color: 'oklch(0.25 0.005 0)' }}>March: Assess and Plan</h2>
            <p className="mb-4">March is the time to walk your property and assess winter damage. Look for frost-heaved pavers, broken irrigation heads, winter-killed plants, and areas where snow mold may have developed on your lawn.</p>
            <p className="mb-8">This is also the ideal time to schedule spring services — aeration, fertilization, irrigation activation, and any hardscape repairs. Our schedule fills up fast in April and May.</p>

            <h2 className="text-3xl font-bold mb-4" style={{ color: 'oklch(0.25 0.005 0)' }}>April: Cleanup and Early Prep</h2>
            <p className="mb-4">Once temperatures are consistently above 40°F, it's safe to start spring cleanup. Remove dead plant material, rake out thatch, edge beds, and apply pre-emergent weed control before soil temperatures reach 55°F.</p>
            <p className="mb-4">Hold off on planting annuals and tender perennials until after May 15th — Bend's average last frost date. Native and cold-hardy plants can go in earlier.</p>
            <div className="bg-gray-100 p-6 rounded-lg mb-8 border-l-4" style={{ borderColor: 'oklch(0.46 0.20 25)' }}>
              <p className="font-bold text-lg mb-2" style={{ color: 'oklch(0.25 0.005 0)' }}>PRO TIP</p>
              <p>Don't activate your sprinklers until nighttime temperatures are consistently above 32°F — typically late April to early May in Bend. An unexpected freeze after activation can damage your backflow preventer.</p>
            </div>

            <h2 className="text-3xl font-bold mb-4" style={{ color: 'oklch(0.25 0.005 0)' }}>May: Full Spring Mode</h2>
            <p className="mb-4">May is the busiest month for Bend landscaping. Activate your irrigation system, aerate your lawn, apply spring fertilizer, and plant after May 15th. This is also the best time to install sod if you're starting a new lawn.</p>
            <p className="mb-8">If you're planning a hardscape project (patio, retaining wall, walkway), May is a great time to get on our schedule for a summer installation.</p>

            <h2 className="text-3xl font-bold mb-4" style={{ color: 'oklch(0.25 0.005 0)' }}>Spring Landscaping Checklist</h2>
            <ul className="list-disc pl-5 mb-8 space-y-1">
              <li>Walk property and document winter damage</li>
              <li>Schedule spring irrigation activation (after last frost)</li>
              <li>Apply pre-emergent weed control (before soil hits 55°F)</li>
              <li>Spring cleanup: remove debris, edge beds, rake thatch</li>
              <li>Core aerate lawn (May–June)</li>
              <li>Apply spring fertilizer after aeration</li>
              <li>Plant after May 15th (last frost date)</li>
              <li>Inspect and repair hardscape (pavers, walls, walkways)</li>
              <li>Check and adjust irrigation heads</li>
            </ul>
            <div className="p-8 text-center mt-12" style={{ backgroundColor: 'oklch(0.18 0.008 0)' }}>
              <p className="font-label text-xs mb-3" style={{ color:'oklch(0.46 0.20 25)',letterSpacing:'0.18em' }}>GET STARTED TODAY</p>
              <h3 className="font-display text-white mb-4" style={{ fontSize:'1.6rem' }}>Schedule Your Spring Services in Bend</h3>
              <p className="font-body mb-6" style={{ color:'oklch(0.72 0.005 0)',lineHeight:1.7 }}>Spring slots fill up fast. Contact us now to get on our schedule for irrigation activation, aeration, cleanup, and more.</p>
              <Link href="/contact"><span className="btn-red inline-block">Schedule Spring Services →</span></Link>
              <p className="mt-4 text-sm" style={{ color:'oklch(0.60 0.005 0)' }}>Or call us: (541) 617-8873</p>
            </div>

            <div className="mt-12 pt-10" style={{ borderTop: '1px solid oklch(0.88 0.005 0)' }}>
              <p className="font-label mb-2" style={{ color: 'oklch(0.46 0.20 25)', fontSize: '0.62rem', letterSpacing: '0.18em' }}>YOU MIGHT ALSO LIKE</p>
              <h2 className="font-display font-light mb-6" style={{ fontSize: 'clamp(1.3rem, 2vw, 1.8rem)', color: 'oklch(0.15 0.005 0)' }}>More Helpful Guides</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Link href="/resources/sprinkler-system-cost-bend-oregon"><span style={{ display:'block',padding:'1.1rem 1.25rem',backgroundColor:'oklch(1 0 0)',borderLeft:'3px solid oklch(0.46 0.20 25)',textDecoration:'none' }}><div className="font-body" style={{ color:'oklch(0.22 0.008 30)',fontWeight:600,fontSize:'0.85rem',marginBottom:'0.3rem' }}>Sprinkler System Cost in Bend</div><div className="font-body" style={{ color:'oklch(0.50 0.008 30)',fontSize:'0.75rem',fontWeight:300,lineHeight:1.5 }}>Irrigation system pricing for Bend homes.</div></span></Link>
                <Link href="/resources/when-to-aerate-lawn-bend-oregon"><span style={{ display:'block',padding:'1.1rem 1.25rem',backgroundColor:'oklch(1 0 0)',borderLeft:'3px solid oklch(0.46 0.20 25)',textDecoration:'none' }}><div className="font-body" style={{ color:'oklch(0.22 0.008 30)',fontWeight:600,fontSize:'0.85rem',marginBottom:'0.3rem' }}>When to Aerate Your Lawn in Bend</div><div className="font-body" style={{ color:'oklch(0.50 0.008 30)',fontSize:'0.75rem',fontWeight:300,lineHeight:1.5 }}>Best timing for aeration in Central Oregon.</div></span></Link>
                <Link href="/resources/lawn-maintenance-cost-bend-oregon"><span style={{ display:'block',padding:'1.1rem 1.25rem',backgroundColor:'oklch(1 0 0)',borderLeft:'3px solid oklch(0.46 0.20 25)',textDecoration:'none' }}><div className="font-body" style={{ color:'oklch(0.22 0.008 30)',fontWeight:600,fontSize:'0.85rem',marginBottom:'0.3rem' }}>Lawn Maintenance Cost in Bend</div><div className="font-body" style={{ color:'oklch(0.50 0.008 30)',fontSize:'0.75rem',fontWeight:300,lineHeight:1.5 }}>What lawn care services cost in Central Oregon.</div></span></Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
