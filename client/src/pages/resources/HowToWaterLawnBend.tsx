import Navbar from '@/components/Navbar';
import SEO from '@/components/SEO';
import { BreadcrumbSchema, FAQSchema } from '@/components/SchemaMarkup';
import { Link } from 'wouter';

export default function HowToWaterLawnBend() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: 'oklch(0.97 0.003 0)' }}>
      <SEO
        title="How to Water Your Lawn in Bend, Oregon | Newport Ave"
        description="Expert guide to watering your lawn in Bend, Oregon. How much water, when to water, and how to avoid common mistakes in Central Oregon's climate."
        canonical="https://newportavelandscaping.com/resources/how-to-water-lawn-bend-oregon"
      />
      <BreadcrumbSchema items={[
        { name: 'Home', url: '/' },
        { name: 'Resources', url: '/resources' },
        { name: 'How to Water Your Lawn in Bend, Oregon', url: '/resources/how-to-water-lawn-bend-oregon' },
      ]} />
      <FAQSchema faqs={[
        { question: `What is the best time of day to water my lawn in Bend, Oregon?`, answer: `The ideal time to water your lawn in Bend is early morning, between 4 AM and 8 AM. This minimizes water loss due to evaporation from the high desert sun and allows the grass blades to dry before nightfall, reducing the risk of fungal diseases common with freeze-thaw cycles.` },
        { question: `How often should I water my lawn given Bend's climate and volcanic soil?`, answer: `In Bend's arid climate (11" annual rainfall) and well-draining volcanic soil, deep and infrequent watering is key. Aim for 2-3 times per week, delivering about 1 inch of water per session, rather than daily shallow watering. This encourages deeper root growth, making your lawn more drought-resistant.` },
        { question: `What are the signs of overwatering or underwatering a lawn in Central Oregon?`, answer: `Overwatering can lead to shallow roots, yellowing grass, and increased susceptibility to disease, especially in Bend's cooler nights. Underwatering, conversely, will show as wilting, browning, and footprints remaining on the grass. Observing these signs helps you adjust your irrigation schedule effectively.` },
        { question: `How can Newport Avenue Landscaping help me optimize my lawn watering system for Bend's Zone 6a climate?`, answer: `Newport Avenue Landscaping specializes in designing and installing efficient irrigation systems tailored for Bend's unique Zone 6a climate. We can assess your current system, recommend smart controllers, and implement drip irrigation or rotor heads that deliver water precisely, conserving resources and promoting a healthier lawn.` },
        { question: `Should I adjust my watering schedule during Bend's hot summers or cold winters?`, answer: `Absolutely. During Bend's hot, dry summers, you may need to increase watering frequency slightly, always maintaining deep watering. In late fall and winter, as temperatures drop and growth slows, significantly reduce watering or turn off your system completely to prevent freezing damage to pipes and over-saturation during freeze-thaw cycles.` },
        { question: `Are there water-wise lawn alternatives suitable for Bend's volcanic soil and low rainfall?`, answer: `Yes, many water-wise alternatives thrive in Bend's conditions. Consider native grasses, drought-tolerant groundcovers, or xeriscaping with local plants that are adapted to volcanic soil and 11" annual rainfall. Newport Avenue Landscaping can help you explore these options to create a beautiful, sustainable landscape that requires less water.` },
      ]} />
      <Navbar />
      <div style={{ paddingTop: '204px' }}>
        <div className="relative flex items-center justify-center" style={{ height:'380px',backgroundImage:'url(https://files.manuscdn.com/user_upload_by_module/session_file/310519663503028182/QuZbCMdvWnmWDtAV.jpg',backgroundSize:'cover',backgroundPosition:'center 50%' }}>
          <div className="absolute inset-0" style={{ backgroundColor: 'oklch(0 0 0 / 0.55)' }} />
          <div className="relative text-center container">
            <p className="font-label mb-3" style={{ color:'oklch(0.72 0.12 25)',fontSize:'0.7rem',letterSpacing:'0.18em' }}>LAWN CARE GUIDE · BEND, OREGON &middot; 2024</p>
            <h1 className="font-display text-white" style={{ fontSize:'clamp(1.8rem, 4vw, 3rem)',maxWidth:'700px',margin:'0 auto' }}>How to Water Your Lawn in Bend, Oregon</h1>
          </div>
        </div>
        <div className="container py-16 max-w-3xl mx-auto">
          <div style={{ color: 'oklch(0.25 0.005 0)' }}>
            <p className="mb-8" style={{ fontSize:'1.05rem',lineHeight:1.85,color:'oklch(0.35 0.005 0)' }}>Watering a lawn in Bend's high desert climate is different from most other parts of the country. Too little water and your lawn goes dormant or dies. Too much and you invite fungal disease and waste expensive water. Here's our guide to getting it right.</p>

            <h2 className="text-3xl font-bold mb-4" style={{ color: 'oklch(0.25 0.005 0)' }}>How Much Water Does a Bend Lawn Need?</h2>
            <p className="mb-4">Most cool-season grasses in Bend (Kentucky bluegrass, tall fescue) need 1–1.5 inches of water per week during the growing season. With Bend's average summer rainfall near zero, that's entirely on your irrigation system.</p>
            <p className="mb-8">A simple way to measure: place a tuna can in your irrigation zone. When it's full, you've applied about 1 inch of water. Run your system until the can is full, then note the time — that's your target runtime per zone.</p>

            <h2 className="text-3xl font-bold mb-4" style={{ color: 'oklch(0.25 0.005 0)' }}>When to Water Your Bend Lawn</h2>
            <p className="mb-4">Water in the early morning — between 5 AM and 8 AM. This minimizes evaporation (Bend's low humidity means water evaporates quickly in the afternoon heat) and allows foliage to dry before evening, reducing fungal disease risk.</p>
            <p className="mb-4">Avoid evening watering. Wet grass overnight is the primary cause of lawn fungus in Bend — necrotic ring spot, brown patch, and dollar spot all thrive in moist, cool conditions.</p>
            <div className="bg-gray-100 p-6 rounded-lg mb-8 border-l-4" style={{ borderColor: 'oklch(0.46 0.20 25)' }}>
              <p className="font-bold text-lg mb-2" style={{ color: 'oklch(0.25 0.005 0)' }}>PRO TIP</p>
              <p>Set your irrigation controller to water 3 times per week for 20–30 minutes per zone rather than short daily cycles. Deep, infrequent watering encourages deep root growth that makes your lawn more drought-tolerant.</p>
            </div>

            <h2 className="text-3xl font-bold mb-4" style={{ color: 'oklch(0.25 0.005 0)' }}>Adjusting for Bend's Seasons</h2>
            <p className="mb-4">Spring (April–May): Water 1–2 times per week. Soil is still cool and evaporation is low.</p>
            <p className="mb-4">Summer (June–August): Water 3 times per week. Increase runtime during heat waves above 95°F.</p>
            <p className="mb-4">Fall (September–October): Reduce to 1–2 times per week as temperatures cool. Stop watering by mid-October.</p>
            <p className="mb-8">Winter: Shut off your system and winterize before the first hard freeze (around October 15th).</p>
            <div className="p-8 text-center mt-12" style={{ backgroundColor: 'oklch(0.18 0.008 0)' }}>
              <p className="font-label text-xs mb-3" style={{ color:'oklch(0.46 0.20 25)',letterSpacing:'0.18em' }}>GET STARTED TODAY</p>
              <h3 className="font-display text-white mb-4" style={{ fontSize:'1.6rem' }}>Get Expert Lawn Care Help in Bend</h3>
              <p className="font-body mb-6" style={{ color:'oklch(0.72 0.005 0)',lineHeight:1.7 }}>Our lawn care team can assess your irrigation system, adjust your watering schedule, and keep your lawn healthy all season. Contact us for a free consultation.</p>
              <Link href="/contact"><span className="btn-red inline-block">Get Your Free Lawn Care Quote →</span></Link>
              <p className="mt-4 text-sm" style={{ color:'oklch(0.60 0.005 0)' }}>Or call us: (541) 617-8873</p>
            </div>

            <div className="mt-12 pt-10" style={{ borderTop: '1px solid oklch(0.88 0.005 0)' }}>
              <p className="font-label mb-2" style={{ color: 'oklch(0.46 0.20 25)', fontSize: '0.62rem', letterSpacing: '0.18em' }}>YOU MIGHT ALSO LIKE</p>
              <h2 className="font-display font-light mb-6" style={{ fontSize: 'clamp(1.3rem, 2vw, 1.8rem)', color: 'oklch(0.15 0.005 0)' }}>More Helpful Guides</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Link href="/resources/sprinkler-system-cost-bend-oregon"><span style={{ display:'block',padding:'1.1rem 1.25rem',backgroundColor:'oklch(1 0 0)',borderLeft:'3px solid oklch(0.46 0.20 25)',textDecoration:'none' }}><div className="font-body" style={{ color:'oklch(0.22 0.008 30)',fontWeight:600,fontSize:'0.85rem',marginBottom:'0.3rem' }}>Sprinkler System Cost in Bend</div><div className="font-body" style={{ color:'oklch(0.50 0.008 30)',fontSize:'0.75rem',fontWeight:300,lineHeight:1.5 }}>Irrigation system pricing for Bend homes.</div></span></Link>
                <Link href="/resources/lawn-maintenance-cost-bend-oregon"><span style={{ display:'block',padding:'1.1rem 1.25rem',backgroundColor:'oklch(1 0 0)',borderLeft:'3px solid oklch(0.46 0.20 25)',textDecoration:'none' }}><div className="font-body" style={{ color:'oklch(0.22 0.008 30)',fontWeight:600,fontSize:'0.85rem',marginBottom:'0.3rem' }}>Lawn Maintenance Cost in Bend</div><div className="font-body" style={{ color:'oklch(0.50 0.008 30)',fontSize:'0.75rem',fontWeight:300,lineHeight:1.5 }}>What lawn care services cost in Central Oregon.</div></span></Link>
                <Link href="/resources/summer-landscaping-guide-bend-oregon"><span style={{ display:'block',padding:'1.1rem 1.25rem',backgroundColor:'oklch(1 0 0)',borderLeft:'3px solid oklch(0.46 0.20 25)',textDecoration:'none' }}><div className="font-body" style={{ color:'oklch(0.22 0.008 30)',fontWeight:600,fontSize:'0.85rem',marginBottom:'0.3rem' }}>Summer Landscaping Guide</div><div className="font-body" style={{ color:'oklch(0.50 0.008 30)',fontSize:'0.75rem',fontWeight:300,lineHeight:1.5 }}>Keeping your Bend landscape healthy through summer.</div></span></Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
