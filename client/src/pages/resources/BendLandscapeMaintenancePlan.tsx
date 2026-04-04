import Navbar from '@/components/Navbar';
import SEO from '@/components/SEO';
import { BreadcrumbSchema } from '@/components/SchemaMarkup';
import { Link } from 'wouter';

export default function BendLandscapeMaintenancePlan() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: 'oklch(0.97 0.003 0)' }}>
      <SEO
        title="Landscape Maintenance Plans in Bend, OR | Newport Ave"
        description="Landscape maintenance plans for Bend, Oregon homeowners. What's included, pricing, and how to choose the right plan for your property."
        canonical="https://newportavelandscaping.com/resources/landscape-maintenance-plan-bend-oregon"
      />
      <BreadcrumbSchema items={[
        { name: 'Home', url: '/' },
        { name: 'Resources', url: '/resources' },
        { name: 'Landscape Maintenance Plans for Bend, Oregon Homeowners', url: '/resources/landscape-maintenance-plan-bend-oregon' },
      ]} />
      <Navbar />
      <div style={{ paddingTop: '328px' }}>
        <div className="relative flex items-center justify-center" style={{ height:'380px',backgroundImage:'url(https://files.manuscdn.com/user_upload_by_module/session_file/310519663503028182/QuZbCMdvWnmWDtAV.jpg)',backgroundSize:'cover',backgroundPosition:'center 50%' }}>
          <div className="absolute inset-0" style={{ backgroundColor: 'oklch(0 0 0 / 0.55)' }} />
          <div className="relative text-center container">
            <p className="font-label mb-3" style={{ color:'oklch(0.72 0.12 25)',fontSize:'0.7rem',letterSpacing:'0.18em' }}>MAINTENANCE · BEND, OREGON &middot; 2024</p>
            <h1 className="font-display text-white" style={{ fontSize:'clamp(1.8rem, 4vw, 3rem)',maxWidth:'700px',margin:'0 auto' }}>Landscape Maintenance Plans for Bend, Oregon Homeowners</h1>
          </div>
        </div>
        <div className="container py-16 max-w-3xl mx-auto">
          <div style={{ color: 'oklch(0.25 0.005 0)' }}>
            <p className="mb-8" style={{ fontSize:'1.05rem',lineHeight:1.85,color:'oklch(0.35 0.005 0)' }}>A landscape maintenance plan takes the guesswork out of yard care. Instead of remembering when to aerate, when to apply pre-emergent, and when to winterize your sprinklers, we handle it all on a set schedule. Here's what our maintenance plans include and how they work.</p>

            <h2 className="text-3xl font-bold mb-4" style={{ color: 'oklch(0.25 0.005 0)' }}>Our Everything Residential Maintenance Plan</h2>
            <p className="mb-4">Our Everything Plan is our most popular offering — a comprehensive, year-round maintenance program that covers all the essential tasks for a healthy Bend landscape.</p>
            <p className="mb-4">Starting at $388/month for a typical Bend home, the Everything Plan includes: weekly mowing and edging (April–October), spring and fall cleanups, annual core aeration, a 4-application fertilization program, and pre-emergent weed control.</p>
            <div className="overflow-x-auto mb-8"><table className="min-w-full bg-white border border-gray-300"><thead><tr><th className="py-2 px-4 border-b text-left">Service</th><th className="py-2 px-4 border-b text-left">Frequency</th><th className="py-2 px-4 border-b text-left">Included in Everything Plan</th></tr></thead><tbody><tr><td className="py-2 px-4 border-b">Mowing & edging</td><td className="py-2 px-4 border-b">Weekly (Apr–Oct)</td><td className="py-2 px-4 border-b">Yes</td></tr>
                  <tr><td className="py-2 px-4 border-b">Spring cleanup</td><td className="py-2 px-4 border-b">Annual</td><td className="py-2 px-4 border-b">Yes</td></tr>
                  <tr><td className="py-2 px-4 border-b">Fall cleanup</td><td className="py-2 px-4 border-b">Annual</td><td className="py-2 px-4 border-b">Yes</td></tr>
                  <tr><td className="py-2 px-4 border-b">Core aeration</td><td className="py-2 px-4 border-b">1–2x/year</td><td className="py-2 px-4 border-b">Yes</td></tr>
                  <tr><td className="py-2 px-4 border-b">Fertilization</td><td className="py-2 px-4 border-b">4 applications/year</td><td className="py-2 px-4 border-b">Yes</td></tr>
                  <tr><td className="py-2 px-4 border-b">Pre-emergent weed control</td><td className="py-2 px-4 border-b">2x/year</td><td className="py-2 px-4 border-b">Yes</td></tr>
                  <tr><td className="py-2 px-4 border-b">Irrigation activation</td><td className="py-2 px-4 border-b">Spring</td><td className="py-2 px-4 border-b">Add-on</td></tr>
                  <tr><td className="py-2 px-4 border-b">Sprinkler winterization</td><td className="py-2 px-4 border-b">Fall</td><td className="py-2 px-4 border-b">Add-on</td></tr></tbody></table></div>

            <h2 className="text-3xl font-bold mb-4" style={{ color: 'oklch(0.25 0.005 0)' }}>A La Carte Services</h2>
            <p className="mb-4">Not everyone needs a full maintenance plan. We also offer individual services: one-time cleanups, seasonal aeration, fertilization programs, and irrigation services.</p>
            <p className="mb-8">Many clients start with a la carte services and upgrade to the Everything Plan once they see the value of consistent, professional care.</p>

            <h2 className="text-3xl font-bold mb-4" style={{ color: 'oklch(0.25 0.005 0)' }}>No Long-Term Contracts</h2>
            <p className="mb-4">We don't require long-term contracts for our maintenance plans. You can cancel with 30 days' notice. We earn your business every month by delivering consistent quality.</p>
            <p className="mb-8">That said, most of our maintenance clients have been with us for 5+ years. When you find a landscaping company you can trust, you stick with them.</p>
            <div className="p-8 text-center mt-12" style={{ backgroundColor: 'oklch(0.18 0.008 0)' }}>
              <p className="font-label text-xs mb-3" style={{ color:'oklch(0.46 0.20 25)',letterSpacing:'0.18em' }}>GET STARTED TODAY</p>
              <h3 className="font-display text-white mb-4" style={{ fontSize:'1.6rem' }}>Get a Free Maintenance Plan Quote in Bend</h3>
              <p className="font-body mb-6" style={{ color:'oklch(0.72 0.005 0)',lineHeight:1.7 }}>Tell us about your property and we'll put together a custom maintenance plan. We serve Bend and all of Central Oregon.</p>
              <Link href="/contact"><span className="btn-red inline-block">Get Your Free Maintenance Quote →</span></Link>
              <p className="mt-4 text-sm" style={{ color:'oklch(0.60 0.005 0)' }}>Or call us: (541) 617-8873</p>
            </div>

            <div className="mt-12 pt-10" style={{ borderTop: '1px solid oklch(0.88 0.005 0)' }}>
              <p className="font-label mb-2" style={{ color: 'oklch(0.46 0.20 25)', fontSize: '0.62rem', letterSpacing: '0.18em' }}>YOU MIGHT ALSO LIKE</p>
              <h2 className="font-display font-light mb-6" style={{ fontSize: 'clamp(1.3rem, 2vw, 1.8rem)', color: 'oklch(0.15 0.005 0)' }}>More Helpful Guides</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Link href="/resources/lawn-maintenance-cost-bend-oregon"><span style={{ display:'block',padding:'1.1rem 1.25rem',backgroundColor:'oklch(1 0 0)',borderLeft:'3px solid oklch(0.46 0.20 25)',textDecoration:'none' }}><div className="font-body" style={{ color:'oklch(0.22 0.008 30)',fontWeight:600,fontSize:'0.85rem',marginBottom:'0.3rem' }}>Lawn Maintenance Cost in Bend</div><div className="font-body" style={{ color:'oklch(0.50 0.008 30)',fontSize:'0.75rem',fontWeight:300,lineHeight:1.5 }}>What lawn care services cost in Central Oregon.</div></span></Link>
                <Link href="/resources/spring-landscaping-guide-bend-oregon"><span style={{ display:'block',padding:'1.1rem 1.25rem',backgroundColor:'oklch(1 0 0)',borderLeft:'3px solid oklch(0.46 0.20 25)',textDecoration:'none' }}><div className="font-body" style={{ color:'oklch(0.22 0.008 30)',fontWeight:600,fontSize:'0.85rem',marginBottom:'0.3rem' }}>Spring Landscaping Guide</div><div className="font-body" style={{ color:'oklch(0.50 0.008 30)',fontSize:'0.75rem',fontWeight:300,lineHeight:1.5 }}>Get ready for the growing season in Bend.</div></span></Link>
                <Link href="/resources/fall-landscaping-guide-bend-oregon"><span style={{ display:'block',padding:'1.1rem 1.25rem',backgroundColor:'oklch(1 0 0)',borderLeft:'3px solid oklch(0.46 0.20 25)',textDecoration:'none' }}><div className="font-body" style={{ color:'oklch(0.22 0.008 30)',fontWeight:600,fontSize:'0.85rem',marginBottom:'0.3rem' }}>Fall Landscaping Guide</div><div className="font-body" style={{ color:'oklch(0.50 0.008 30)',fontSize:'0.75rem',fontWeight:300,lineHeight:1.5 }}>Complete fall checklist for Bend homeowners.</div></span></Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
