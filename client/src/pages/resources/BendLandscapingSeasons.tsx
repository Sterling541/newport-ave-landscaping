import Navbar from '@/components/Navbar';
import SEO from '@/components/SEO';
import { BreadcrumbSchema } from '@/components/SchemaMarkup';
import { Link } from 'wouter';

export default function BendLandscapingSeasons() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: 'oklch(0.97 0.003 0)' }}>
      <SEO
        title="Landscaping Seasons in Bend, Oregon | Newport Ave Landscaping"
        description="When to do what in your Bend, Oregon landscape. Month-by-month guide to landscaping tasks in Central Oregon."
        canonical="https://www.newportavelandscaping.com/resources/landscaping-seasons-bend-oregon"
      />
      <BreadcrumbSchema items={[
        { name: 'Home', url: '/' },
        { name: 'Resources', url: '/resources' },
        { name: 'Month-by-Month Landscaping Guide for Bend, Oregon', url: '/resources/landscaping-seasons-bend-oregon' },
      ]} />
      <Navbar />
      <div style={{ paddingTop: '204px' }}>
        <div className="relative flex items-center justify-center" style={{ height:'380px',backgroundImage:'url(https://files.manuscdn.com/user_upload_by_module/session_file/310519663503028182/QuZbCMdvWnmWDtAV.jpg',backgroundSize:'cover',backgroundPosition:'center 50%' }}>
          <div className="absolute inset-0" style={{ backgroundColor: 'oklch(0 0 0 / 0.55)' }} />
          <div className="relative text-center container">
            <p className="font-label mb-3" style={{ color:'oklch(0.72 0.12 25)',fontSize:'0.7rem',letterSpacing:'0.18em' }}>SEASONAL GUIDE · BEND, OREGON &middot; 2024</p>
            <h1 className="font-display text-white" style={{ fontSize:'clamp(1.8rem, 4vw, 3rem)',maxWidth:'700px',margin:'0 auto' }}>Month-by-Month Landscaping Guide for Bend, Oregon</h1>
          </div>
        </div>
        <div className="container py-16 max-w-3xl mx-auto">
          <div style={{ color: 'oklch(0.25 0.005 0)' }}>
            <p className="mb-8" style={{ fontSize:'1.05rem',lineHeight:1.85,color:'oklch(0.35 0.005 0)' }}>Timing is everything in Bend's landscape. Our short growing season, late spring frosts, and early fall freezes create a compressed window for many landscaping tasks. Here's a month-by-month guide to what to do — and when — in your Central Oregon landscape.</p>

            <h2 className="text-3xl font-bold mb-4" style={{ color: 'oklch(0.25 0.005 0)' }}>January–February: Plan and Prepare</h2>
            <p className="mb-4">Winter is the best time to plan spring projects. Our design team is less busy, we can give your project more attention, and you'll be at the front of the installation queue when spring arrives.</p>
            <p className="mb-8">Review your landscape for winter damage: frost-heaved pavers, broken irrigation heads, winter-killed plants. Document issues so you can address them in spring.</p>

            <h2 className="text-3xl font-bold mb-4" style={{ color: 'oklch(0.25 0.005 0)' }}>March–April: Early Spring Prep</h2>
            <p className="mb-4">Apply pre-emergent weed control before soil temperatures reach 55°F (typically late March to early April in Bend). This is the most important weed control timing of the year.</p>
            <p className="mb-8">Begin spring cleanup as temperatures consistently reach 40°F+. Remove dead plant material, rake thatch, edge beds. Hold off on planting until after May 15th.</p>

            <h2 className="text-3xl font-bold mb-4" style={{ color: 'oklch(0.25 0.005 0)' }}>May–June: Prime Planting and Installation Season</h2>
            <p className="mb-4">After May 15th (average last frost date), it's safe to plant annuals and tender perennials. Activate your irrigation system after nighttime temperatures are consistently above 32°F.</p>
            <p className="mb-8">May–June is the best time for sod installation, patio and hardscape projects, and landscape design and installation. Aerate your lawn in May or June.</p>

            <h2 className="text-3xl font-bold mb-4" style={{ color: 'oklch(0.25 0.005 0)' }}>July–August: Summer Maintenance</h2>
            <p className="mb-4">Focus on irrigation management — water deeply 3x/week, watch for signs of heat stress and fungal disease. Raise mowing height to 3–3.5 inches.</p>
            <p className="mb-8">Late August is the best time to begin fall aeration and overseeding. Soil is still warm enough for germination but air temperatures are cooling.</p>

            <h2 className="text-3xl font-bold mb-4" style={{ color: 'oklch(0.25 0.005 0)' }}>September–October: Critical Fall Tasks</h2>
            <p className="mb-4">Aerate and overseed in September. Apply fall fertilizer (high potassium). Schedule sprinkler winterization before October 15th.</p>
            <p className="mb-8">Plant spring bulbs in September–October. Apply 3 inches of mulch to planting beds before the ground freezes.</p>

            <h2 className="text-3xl font-bold mb-4" style={{ color: 'oklch(0.25 0.005 0)' }}>November–December: Winterize and Rest</h2>
            <p className="mb-4">Ensure irrigation is winterized. Cut back perennials (leave ornamental grasses for winter interest). Wrap newly planted trees and shrubs if needed.</p>
            <p className="mb-8">This is a great time to plan next year's projects and get on our schedule for spring services.</p>
            <div className="p-8 text-center mt-12" style={{ backgroundColor: 'oklch(0.18 0.008 0)' }}>
              <p className="font-label text-xs mb-3" style={{ color:'oklch(0.46 0.20 25)',letterSpacing:'0.18em' }}>GET STARTED TODAY</p>
              <h3 className="font-display text-white mb-4" style={{ fontSize:'1.6rem' }}>Get on Our Schedule for Spring Services</h3>
              <p className="font-body mb-6" style={{ color:'oklch(0.72 0.005 0)',lineHeight:1.7 }}>Spring slots fill up fast. Contact us now to schedule your spring irrigation activation, aeration, cleanup, and more.</p>
              <Link href="/contact"><span className="btn-red inline-block">Schedule Spring Services →</span></Link>
              <p className="mt-4 text-sm" style={{ color:'oklch(0.60 0.005 0)' }}>Or call us: (541) 617-8873</p>
            </div>

            <div className="mt-12 pt-10" style={{ borderTop: '1px solid oklch(0.88 0.005 0)' }}>
              <p className="font-label mb-2" style={{ color: 'oklch(0.46 0.20 25)', fontSize: '0.62rem', letterSpacing: '0.18em' }}>YOU MIGHT ALSO LIKE</p>
              <h2 className="font-display font-light mb-6" style={{ fontSize: 'clamp(1.3rem, 2vw, 1.8rem)', color: 'oklch(0.15 0.005 0)' }}>More Helpful Guides</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Link href="/resources/spring-landscaping-guide-bend-oregon"><span style={{ display:'block',padding:'1.1rem 1.25rem',backgroundColor:'oklch(1 0 0)',borderLeft:'3px solid oklch(0.46 0.20 25)',textDecoration:'none' }}><div className="font-body" style={{ color:'oklch(0.22 0.008 30)',fontWeight:600,fontSize:'0.85rem',marginBottom:'0.3rem' }}>Spring Landscaping Guide</div><div className="font-body" style={{ color:'oklch(0.50 0.008 30)',fontSize:'0.75rem',fontWeight:300,lineHeight:1.5 }}>Get ready for the growing season in Bend.</div></span></Link>
                <Link href="/resources/fall-landscaping-guide-bend-oregon"><span style={{ display:'block',padding:'1.1rem 1.25rem',backgroundColor:'oklch(1 0 0)',borderLeft:'3px solid oklch(0.46 0.20 25)',textDecoration:'none' }}><div className="font-body" style={{ color:'oklch(0.22 0.008 30)',fontWeight:600,fontSize:'0.85rem',marginBottom:'0.3rem' }}>Fall Landscaping Guide</div><div className="font-body" style={{ color:'oklch(0.50 0.008 30)',fontSize:'0.75rem',fontWeight:300,lineHeight:1.5 }}>Complete fall checklist for Bend homeowners.</div></span></Link>
                <Link href="/resources/sprinkler-winterization-guide-bend-oregon"><span style={{ display:'block',padding:'1.1rem 1.25rem',backgroundColor:'oklch(1 0 0)',borderLeft:'3px solid oklch(0.46 0.20 25)',textDecoration:'none' }}><div className="font-body" style={{ color:'oklch(0.22 0.008 30)',fontWeight:600,fontSize:'0.85rem',marginBottom:'0.3rem' }}>Sprinkler Winterization Guide</div><div className="font-body" style={{ color:'oklch(0.50 0.008 30)',fontSize:'0.75rem',fontWeight:300,lineHeight:1.5 }}>How to protect your system before the first freeze.</div></span></Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
