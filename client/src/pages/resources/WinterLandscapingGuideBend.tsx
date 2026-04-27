import Navbar from '@/components/Navbar';
import SEO from '@/components/SEO';
import { BreadcrumbSchema, FAQSchema } from '@/components/SchemaMarkup';
import { Link } from 'wouter';

export default function WinterLandscapingGuideBend() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: 'oklch(0.97 0.003 0)' }}>
      <SEO
        title="Winter Landscaping Guide for Bend, Oregon | Newport Ave"
        description="What to do with your Bend landscape in winter. Snow removal, protecting plants, and planning for spring."
        canonical="https://newportavelandscaping.com/resources/winter-landscaping-guide-bend-oregon"
      />
      <BreadcrumbSchema items={[
        { name: 'Home', url: '/' },
        { name: 'Resources', url: '/resources' },
        { name: 'Winter Landscaping Guide for Bend, Oregon', url: '/resources/winter-landscaping-guide-bend-oregon' },
      ]} />
      <FAQSchema faqs={[
        { question: `How do I protect my plants from freezing in Bend, Oregon's winter?`, answer: `Protecting plants from Bend's harsh winter, especially with its Zone 6a climate and freeze-thaw cycles, is crucial. Consider covering sensitive plants with burlap or frost cloth, and applying a thick layer of mulch around their base to insulate roots from extreme temperature fluctuations. For new plantings, ensure they are well-watered before the ground freezes solid.` },
        { question: `What kind of winter watering do plants need in Bend?`, answer: `Even with Bend's average 11 inches of annual rainfall, winter watering is essential, particularly during dry spells. Evergreen trees and shrubs, which continue to transpire moisture, benefit from deep watering once or twice a month when temperatures are above freezing. This helps prevent desiccation and ensures they stay hydrated through the cold, dry air.` },
        { question: `When should I winterize my irrigation system in Central Oregon?`, answer: `Winterizing your irrigation system in Central Oregon is critical before the first hard freeze to prevent costly damage from expanding ice. Newport Avenue Landscaping recommends scheduling this service in late October or early November, ensuring all water is blown out of the lines. This proactive step safeguards your system against Bend's unpredictable freeze-thaw cycles.` },
        { question: `What are the best plants for winter interest in Bend's volcanic soil?`, answer: `For winter interest in Bend's unique volcanic soil, consider plants like evergreen conifers, certain ornamental grasses, and deciduous shrubs with striking bark or persistent berries. Species adapted to Zone 6a conditions, such as certain junipers, pines, and dogwoods, can provide structure and color even when snow covers the ground. These selections are resilient to the region's low annual rainfall and temperature swings.` },
        { question: `How can I prepare my lawn for winter in Bend?`, answer: `Preparing your lawn for Bend's winter involves a few key steps to ensure a healthy spring rebound. Continue mowing until growth stops, and perform a final fertilization with a winter-specific blend to strengthen roots. Aeration can also be beneficial, especially in our volcanic soil, to improve drainage and nutrient absorption before the ground freezes solid.` },
        { question: `What are common winter landscaping mistakes to avoid in Bend?`, answer: `A common mistake in Bend's winter landscaping is neglecting proper plant hydration during dry periods, despite the cold. Another is failing to adequately protect sensitive plants from the intense freeze-thaw cycles and strong winds characteristic of our Zone 6a climate. Newport Avenue Landscaping advises against heavy pruning in late fall, as new growth can be easily damaged by early frosts.` },
      ]} />
      <Navbar />
      <div style={{ paddingTop: '204px' }}>
        <div className="relative flex items-center justify-center" style={{ height:'380px',backgroundImage:'url(/manus-storage/safe-hero-snow-removal_64a25ebe.jpg)',backgroundSize:'cover',backgroundPosition:'center 50%' }}>
          <div className="absolute inset-0" style={{ backgroundColor: 'oklch(0 0 0 / 0.55)' }} />
          <div className="relative text-center container">
            <p className="font-label mb-3" style={{ color:'oklch(0.72 0.12 25)',fontSize:'0.7rem',letterSpacing:'0.18em' }}>SEASONAL GUIDE · BEND, OREGON &middot; 2024</p>
            <h1 className="font-display text-white" style={{ fontSize:'clamp(1.8rem, 4vw, 3rem)',maxWidth:'700px',margin:'0 auto' }}>Winter Landscaping Guide for Bend, Oregon</h1>
          </div>
        </div>
        <div className="container py-16 max-w-3xl mx-auto">
          <div style={{ color: 'oklch(0.25 0.005 0)' }}>
            <p className="mb-8" style={{ fontSize:'1.05rem',lineHeight:1.85,color:'oklch(0.35 0.005 0)' }}>Bend winters are cold and snowy — average lows in January drop to 20°F, and snowfall averages 30+ inches per year. Most landscape work pauses during the winter months, but there are still important tasks to manage, and smart planning now sets you up for a great spring.</p>

            <h2 className="text-3xl font-bold mb-4" style={{ color: 'oklch(0.25 0.005 0)' }}>Snow Removal: Protecting Your Hardscape</h2>
            <p className="mb-4">Heavy snow loads can damage plants, especially arborvitae, junipers, and other evergreens with upright branching. Gently brush snow off branches after heavy snowfall to prevent breakage.</p>
            <p className="mb-4">For paver patios and walkways, use a plastic shovel or snow blower rather than a metal blade, which can scratch and chip pavers. Avoid calcium chloride ice melt — it can stain and damage concrete pavers. Use sand or kitty litter for traction instead.</p>
            <div className="bg-gray-100 p-6 rounded-lg mb-8 border-l-4" style={{ borderColor: 'oklch(0.46 0.20 25)' }}>
              <p className="font-bold text-lg mb-2" style={{ color: 'oklch(0.25 0.005 0)' }}>PRO TIP</p>
              <p>We offer commercial and residential snow removal services throughout Bend. Our crews are available 24/7 during snow events for HOAs, commercial properties, and residential clients.</p>
            </div>

            <h2 className="text-3xl font-bold mb-4" style={{ color: 'oklch(0.25 0.005 0)' }}>Protecting Plants Through Winter</h2>
            <p className="mb-4">Most established plants in Bend are cold-hardy and don't need special protection. However, newly planted trees and shrubs (installed in the past 1–2 years) benefit from a burlap wrap or windscreen during their first winter.</p>
            <p className="mb-8">Apply a 3–4 inch layer of mulch around the base of trees and shrubs before the ground freezes. This insulates roots and reduces freeze-thaw heaving.</p>

            <h2 className="text-3xl font-bold mb-4" style={{ color: 'oklch(0.25 0.005 0)' }}>Winter Planning: The Best Time to Design</h2>
            <p className="mb-4">Winter is actually the best time to plan a spring landscape project. Our design team is less busy, we can give your project more attention, and you'll be at the front of the installation queue when spring arrives.</p>
            <p className="mb-8">We offer free design consultations year-round. If you're thinking about a new patio, landscape renovation, or irrigation system for next year, contact us now to get the process started.</p>
            <div className="p-8 text-center mt-12" style={{ backgroundColor: 'oklch(0.18 0.008 0)' }}>
              <p className="font-label text-xs mb-3" style={{ color:'oklch(0.46 0.20 25)',letterSpacing:'0.18em' }}>GET STARTED TODAY</p>
              <h3 className="font-display text-white mb-4" style={{ fontSize:'1.6rem' }}>Plan Your Spring Project This Winter</h3>
              <p className="font-body mb-6" style={{ color:'oklch(0.72 0.005 0)',lineHeight:1.7 }}>Winter is the perfect time to design your spring landscape project. Contact us for a free consultation — we'll have your project ready to go the moment the ground thaws.</p>
              <Link href="/contact"><span className="btn-red inline-block">Start Planning Your Spring Project →</span></Link>
              <p className="mt-4 text-sm" style={{ color:'oklch(0.60 0.005 0)' }}>Or call us: (541) 617-8873</p>
            </div>

            <div className="mt-12 pt-10" style={{ borderTop: '1px solid oklch(0.88 0.005 0)' }}>
              <p className="font-label mb-2" style={{ color: 'oklch(0.46 0.20 25)', fontSize: '0.62rem', letterSpacing: '0.18em' }}>YOU MIGHT ALSO LIKE</p>
              <h2 className="font-display font-light mb-6" style={{ fontSize: 'clamp(1.3rem, 2vw, 1.8rem)', color: 'oklch(0.15 0.005 0)' }}>More Helpful Guides</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Link href="/resources/snow-removal-bend-oregon"><span style={{ display:'block',padding:'1.1rem 1.25rem',backgroundColor:'oklch(1 0 0)',borderLeft:'3px solid oklch(0.46 0.20 25)',textDecoration:'none' }}><div className="font-body" style={{ color:'oklch(0.22 0.008 30)',fontWeight:600,fontSize:'0.85rem',marginBottom:'0.3rem' }}>Snow Removal in Bend</div><div className="font-body" style={{ color:'oklch(0.50 0.008 30)',fontSize:'0.75rem',fontWeight:300,lineHeight:1.5 }}>What commercial and residential snow removal costs.</div></span></Link>
                <Link href="/resources/spring-landscaping-guide-bend-oregon"><span style={{ display:'block',padding:'1.1rem 1.25rem',backgroundColor:'oklch(1 0 0)',borderLeft:'3px solid oklch(0.46 0.20 25)',textDecoration:'none' }}><div className="font-body" style={{ color:'oklch(0.22 0.008 30)',fontWeight:600,fontSize:'0.85rem',marginBottom:'0.3rem' }}>Spring Landscaping Guide</div><div className="font-body" style={{ color:'oklch(0.50 0.008 30)',fontSize:'0.75rem',fontWeight:300,lineHeight:1.5 }}>Get ready for the growing season in Bend.</div></span></Link>
                <Link href="/resources/sprinkler-winterization-guide-bend-oregon"><span style={{ display:'block',padding:'1.1rem 1.25rem',backgroundColor:'oklch(1 0 0)',borderLeft:'3px solid oklch(0.46 0.20 25)',textDecoration:'none' }}><div className="font-body" style={{ color:'oklch(0.22 0.008 30)',fontWeight:600,fontSize:'0.85rem',marginBottom:'0.3rem' }}>Sprinkler Winterization Guide</div><div className="font-body" style={{ color:'oklch(0.50 0.008 30)',fontSize:'0.75rem',fontWeight:300,lineHeight:1.5 }}>How to protect your system before the first freeze.</div></span></Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
