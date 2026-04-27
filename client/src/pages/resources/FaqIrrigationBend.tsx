import Navbar from '@/components/Navbar';
import SEO from '@/components/SEO';
import { BreadcrumbSchema, FAQSchema } from '@/components/SchemaMarkup';
import { Link } from 'wouter';

export default function FaqIrrigationBend() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: 'oklch(0.97 0.003 0)' }}>
      <SEO
        title="Sprinkler System FAQ — Bend, Oregon | Newport Ave Landscaping"
        description="Answers to the most common questions about sprinkler system installation, repair, and winterization in Bend, Oregon."
        canonical="https://www.newportavelandscaping.com/resources/faq-irrigation-bend-oregon"
      />
      <BreadcrumbSchema items={[
        { name: 'Home', url: '/' },
        { name: 'Resources', url: '/resources' },
        { name: 'Sprinkler System FAQ: Your Questions Answered', url: '/resources/faq-irrigation-bend-oregon' },
      ]} />
      <FAQSchema faqs={[
        { question: 'How often should I run my sprinkler system in Bend, Oregon?', answer: 'In Bend, most lawns need 1 to 1.5 inches of water per week during the growing season from May through September. That typically means running each zone 2 to 3 times per week in summer, adjusting for heat waves and cooler periods. Smart controllers that use local weather data are the most efficient approach and can reduce water use by 20 to 30 percent.' },
        { question: 'When should I turn on my sprinkler system in Bend?', answer: 'The safe date to activate your sprinkler system in Bend is typically around May 1st, after the last hard frost. Turning on your system too early risks freeze damage to heads, valves, and backflow preventers. Newport Avenue offers spring activation service starting in late April, including a full inspection and adjustment of all zones.' },
        { question: 'When should I winterize my sprinkler system in Bend?', answer: 'Sprinkler systems in Bend should be winterized by October 15th to avoid freeze damage. Bend\'s first hard freeze typically arrives in mid-October. Winterization involves blowing out all water from the pipes and heads using compressed air. Newport Avenue offers fall winterization service starting in September, and we recommend scheduling early as slots fill quickly.' },
        { question: 'How much does irrigation repair cost in Bend?', answer: 'Irrigation repair in Bend is billed at $140 per technician hour, which includes diagnosis and repair. Most service calls take 1 to 2 hours. Common repairs include replacing broken heads ($15 to $40 per head plus labor), fixing valve solenoids ($30 to $80 plus labor), and repairing broken lateral lines ($50 to $150 plus labor depending on depth and access.' },
        { question: 'What is a backflow preventer and do I need one in Bend?', answer: 'A backflow preventer is a device that stops irrigation water from flowing back into your home\'s drinking water supply. In Bend, Oregon, backflow preventers are required by code on all irrigation systems connected to the municipal water supply. They must be tested annually by a certified backflow tester. Newport Avenue provides annual backflow testing and certification throughout Central Oregon.' },
        { question: 'How many zones does a typical Bend home need?', answer: 'Most residential properties in Bend need 6 to 10 irrigation zones. A typical layout includes separate zones for front lawn, back lawn, front drip beds, back drip beds, and any side yard areas. Larger properties with multiple lawn areas, vegetable gardens, or extensive planting beds may need 12 or more zones. Newport Avenue designs systems to match your property\'s specific layout and water pressure.' },
      ]} />
      <Navbar />
      <div style={{ paddingTop: '204px' }}>
        <div className="relative flex items-center justify-center" style={{ height:'380px',backgroundImage:'url(https://files.manuscdn.com/user_upload_by_module/session_file/310519663503028182/QuZbCMdvWnmWDtAV.jpg',backgroundSize:'cover',backgroundPosition:'center 50%' }}>
          <div className="absolute inset-0" style={{ backgroundColor: 'oklch(0 0 0 / 0.55)' }} />
          <div className="relative text-center container">
            <p className="font-label mb-3" style={{ color:'oklch(0.72 0.12 25)',fontSize:'0.7rem',letterSpacing:'0.18em' }}>IRRIGATION · BEND, OREGON &middot; 2024</p>
            <h1 className="font-display text-white" style={{ fontSize:'clamp(1.8rem, 4vw, 3rem)',maxWidth:'700px',margin:'0 auto' }}>Sprinkler System FAQ: Your Questions Answered</h1>
          </div>
        </div>
        <div className="container py-16 max-w-3xl mx-auto">
          <div style={{ color: 'oklch(0.25 0.005 0)' }}>
            <p className="mb-8" style={{ fontSize:'1.05rem',lineHeight:1.85,color:'oklch(0.35 0.005 0)' }}>Sprinkler systems in Bend's high desert climate require special consideration. Here are the questions we hear most often from Central Oregon homeowners, answered by our certified irrigation team.</p>

            <h2 className="text-3xl font-bold mb-4" style={{ color: 'oklch(0.25 0.005 0)' }}>How much does a sprinkler system cost in Bend?</h2>
            <p className="mb-4">A new sprinkler system in Bend typically costs $2,500–$6,000 for a standard residential property with 5–10 zones. Per-zone pricing runs $500–$700 for spray zones and $400–$650 for drip zones.</p>
            <p className="mb-8">Larger properties, complex terrain, or premium smart controllers will increase costs. We provide free, itemized estimates after a site assessment.</p>

            <h2 className="text-3xl font-bold mb-4" style={{ color: 'oklch(0.25 0.005 0)' }}>When should I winterize my sprinklers in Bend?</h2>
            <p className="mb-4">We recommend scheduling your sprinkler blowout before October 15th — the average first hard freeze date in Bend. Don't wait until a freeze is forecast; we fill up fast and can't always accommodate last-minute requests.</p>
            <p className="mb-4">Our Priority Irrigation Membership includes both spring activation and fall winterization for one annual fee, with priority scheduling so you're always protected.</p>
            <div className="bg-gray-100 p-6 rounded-lg mb-8 border-l-4" style={{ borderColor: 'oklch(0.46 0.20 25)' }}>
              <p className="font-bold text-lg mb-2" style={{ color: 'oklch(0.25 0.005 0)' }}>PRO TIP</p>
              <p>A single freeze event can crack PVC pipes and fittings throughout your system. Repair costs typically run $500–$2,000. A $140/tech hour blowout service is the best insurance you can buy.</p>
            </div>

            <h2 className="text-3xl font-bold mb-4" style={{ color: 'oklch(0.25 0.005 0)' }}>How do I know if my sprinkler system needs repair?</h2>
            <p className="mb-4">Common signs include: wet spots or puddles between zones, dry patches that don't respond to watering, unusually high water bills, visible broken heads, or a controller that won't run certain zones.</p>
            <p className="mb-8">We offer diagnostic service calls throughout Bend and Central Oregon. Our technicians can typically diagnose and repair most issues in a single visit.</p>
            <div className="p-8 text-center mt-12" style={{ backgroundColor: 'oklch(0.18 0.008 0)' }}>
              <p className="font-label text-xs mb-3" style={{ color:'oklch(0.46 0.20 25)',letterSpacing:'0.18em' }}>GET STARTED TODAY</p>
              <h3 className="font-display text-white mb-4" style={{ fontSize:'1.6rem' }}>Get a Free Irrigation Consultation in Bend</h3>
              <p className="font-body mb-6" style={{ color:'oklch(0.72 0.005 0)',lineHeight:1.7 }}>Our certified irrigation team serves all of Central Oregon. Whether you need a new system, repairs, or winterization, we're here to help.</p>
              <Link href="/contact"><span className="btn-red inline-block">Schedule Your Free Consultation →</span></Link>
              <p className="mt-4 text-sm" style={{ color:'oklch(0.60 0.005 0)' }}>Or call us: (541) 617-8873</p>
            </div>

            <div className="mt-12 pt-10" style={{ borderTop: '1px solid oklch(0.88 0.005 0)' }}>
              <p className="font-label mb-2" style={{ color: 'oklch(0.46 0.20 25)', fontSize: '0.62rem', letterSpacing: '0.18em' }}>YOU MIGHT ALSO LIKE</p>
              <h2 className="font-display font-light mb-6" style={{ fontSize: 'clamp(1.3rem, 2vw, 1.8rem)', color: 'oklch(0.15 0.005 0)' }}>More Helpful Guides</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Link href="/resources/sprinkler-system-cost-bend-oregon"><span style={{ display:'block',padding:'1.1rem 1.25rem',backgroundColor:'oklch(1 0 0)',borderLeft:'3px solid oklch(0.46 0.20 25)',textDecoration:'none' }}><div className="font-body" style={{ color:'oklch(0.22 0.008 30)',fontWeight:600,fontSize:'0.85rem',marginBottom:'0.3rem' }}>Sprinkler System Cost in Bend</div><div className="font-body" style={{ color:'oklch(0.50 0.008 30)',fontSize:'0.75rem',fontWeight:300,lineHeight:1.5 }}>Full pricing breakdown for irrigation in Central Oregon.</div></span></Link>
                <Link href="/resources/sprinkler-winterization-guide-bend-oregon"><span style={{ display:'block',padding:'1.1rem 1.25rem',backgroundColor:'oklch(1 0 0)',borderLeft:'3px solid oklch(0.46 0.20 25)',textDecoration:'none' }}><div className="font-body" style={{ color:'oklch(0.22 0.008 30)',fontWeight:600,fontSize:'0.85rem',marginBottom:'0.3rem' }}>Sprinkler Winterization Guide</div><div className="font-body" style={{ color:'oklch(0.50 0.008 30)',fontSize:'0.75rem',fontWeight:300,lineHeight:1.5 }}>Step-by-step winterization guide for Bend homeowners.</div></span></Link>
                <Link href="/resources/irrigation-repair-bend-oregon"><span style={{ display:'block',padding:'1.1rem 1.25rem',backgroundColor:'oklch(1 0 0)',borderLeft:'3px solid oklch(0.46 0.20 25)',textDecoration:'none' }}><div className="font-body" style={{ color:'oklch(0.22 0.008 30)',fontWeight:600,fontSize:'0.85rem',marginBottom:'0.3rem' }}>Irrigation Repair in Bend</div><div className="font-body" style={{ color:'oklch(0.50 0.008 30)',fontSize:'0.75rem',fontWeight:300,lineHeight:1.5 }}>Common issues and repair costs.</div></span></Link>
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
