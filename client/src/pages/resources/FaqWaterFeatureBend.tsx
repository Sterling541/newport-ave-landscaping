import Navbar from '@/components/Navbar';
import SEO from '@/components/SEO';
import { BreadcrumbSchema, FAQSchema } from '@/components/SchemaMarkup';
import { Link } from 'wouter';

export default function FaqWaterFeatureBend() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: 'oklch(0.97 0.003 0)' }}>
      <SEO
        title="Water Feature FAQ — Bend, Oregon | Newport Ave Landscaping"
        description="Common questions about water feature installation in Bend, Oregon. Ponds, fountains, waterfalls, and pondless features."
        canonical="https://newportavelandscaping.com/resources/faq-water-feature-bend-oregon"
      />
      <BreadcrumbSchema items={[
        { name: 'Home', url: '/' },
        { name: 'Resources', url: '/resources' },
        { name: 'Water Feature FAQ: Bend, Oregon Homeowners Ask', url: '/resources/faq-water-feature-bend-oregon' },
      ]} />
      <FAQSchema faqs={[
        { question: 'How much does a water feature cost in Bend, Oregon?', answer: 'Water feature costs in Bend vary widely by type. A simple bubbling boulder or container fountain costs $1,500 to $4,000 installed. A pondless waterfall, the most popular choice in Bend, typically costs $4,000 to $12,000 depending on size and complexity. A full koi pond with filtration can range from $8,000 to $30,000 or more. Newport Avenue provides free itemized estimates after an on-site consultation.' },
        { question: 'What types of water features work best in Bend\'s climate?', answer: 'Pondless waterfalls are the most popular water feature in Bend because they can be shut down and drained for winter, eliminating freeze damage risk. Bubbling boulders and container fountains are also excellent choices. Traditional open ponds require more winter management but can be maintained year-round with a de-icer. Avoid large open water features in areas with heavy deer pressure, as deer will drink from them and disturb plantings.' },
        { question: 'Do water features need to be winterized in Bend?', answer: 'Yes. Most water features in Bend should be winterized before the first hard freeze, typically around October 15th. Winterization involves shutting off the pump, draining all water from pipes and the pump housing, and storing the pump indoors. Koi ponds can often run year-round with a pond de-icer to maintain a small open area in the ice for gas exchange. Newport Avenue offers water feature winterization and spring startup services.' },
        { question: 'How much water does a water feature use in Bend?', answer: 'A typical pondless waterfall in Bend uses 50 to 200 gallons per week, primarily through evaporation. This is equivalent to watering a small garden bed. Recirculating systems reuse the same water, so consumption is limited to evaporation and splash losses. During Bend\'s hot, dry summers, evaporation increases and the reservoir may need topping off every 1 to 2 weeks.' },
        { question: 'How long does water feature installation take in Bend?', answer: 'A bubbling boulder or small fountain can be installed in 1 day. A standard pondless waterfall takes 2 to 4 days. A full koi pond with filtration, planting shelves, and surrounding landscape takes 1 to 2 weeks. Newport Avenue handles all aspects of water feature installation including excavation, plumbing, electrical, and surrounding landscape integration.' },
        { question: 'Is Newport Avenue Landscaping licensed for water feature installation in Oregon?', answer: 'Yes. Newport Avenue Landscaping holds Oregon Landscape Contractor Bond #9153 (LCB #9153) and is fully licensed, bonded, and insured for all water feature design and installation in Bend and throughout Central Oregon. Electrical connections for pump systems are handled by licensed electricians as part of our installation process.' },
      ]} />
      <Navbar />
      <div style={{ paddingTop: '204px' }}>
        <div className="relative flex items-center justify-center" style={{ height:'380px',backgroundImage:'url(/manus-storage/hero-water-features-wide_a9494b91.jpg',backgroundSize:'cover',backgroundPosition:'center 50%' }}>
          <div className="absolute inset-0" style={{ backgroundColor: 'oklch(0 0 0 / 0.55)' }} />
          <div className="relative text-center container">
            <p className="font-label mb-3" style={{ color:'oklch(0.72 0.12 25)',fontSize:'0.7rem',letterSpacing:'0.18em' }}>WATER FEATURES · BEND, OREGON &middot; 2024</p>
            <h1 className="font-display text-white" style={{ fontSize:'clamp(1.8rem, 4vw, 3rem)',maxWidth:'700px',margin:'0 auto' }}>Water Feature FAQ: Bend, Oregon Homeowners Ask</h1>
          </div>
        </div>
        <div className="container py-16 max-w-3xl mx-auto">
          <div style={{ color: 'oklch(0.25 0.005 0)' }}>
            <p className="mb-8" style={{ fontSize:'1.05rem',lineHeight:1.85,color:'oklch(0.35 0.005 0)' }}>A water feature can completely transform the atmosphere of a Bend outdoor space — adding the sound of moving water, attracting wildlife, and creating a focal point that draws the eye. Here are the questions we hear most often.</p>

            <h2 className="text-3xl font-bold mb-4" style={{ color: 'oklch(0.25 0.005 0)' }}>What types of water features do you install?</h2>
            <ul className="list-disc pl-5 mb-8 space-y-1">
              <li>Pondless waterfalls — the most popular choice in Bend</li>
              <li>Koi ponds with filtration systems</li>
              <li>Bubbling boulder and millstone fountains</li>
              <li>Stream features and dry creek beds</li>
              <li>Container water gardens</li>
              <li>Formal reflecting pools</li>
            </ul>

            <h2 className="text-3xl font-bold mb-4" style={{ color: 'oklch(0.25 0.005 0)' }}>How much does a water feature cost in Bend?</h2>
            <p className="mb-4">A simple bubbling boulder or container fountain costs $1,500–$4,000 installed. A pondless waterfall — the most popular choice in Bend — typically costs $4,000–$12,000 depending on size and complexity. A full koi pond with filtration can range from $8,000 to $30,000+.</p>
            <p className="mb-8">We provide free, itemized estimates after an on-site consultation.</p>

            <h2 className="text-3xl font-bold mb-4" style={{ color: 'oklch(0.25 0.005 0)' }}>Do water features work in Bend's cold winters?</h2>
            <p className="mb-4">Most water features need to be winterized in Bend. Pondless waterfalls and fountains should be shut down and drained before the first hard freeze (around October 15th). Koi ponds can often run year-round with a de-icer to maintain a small open area in the ice.</p>
            <p className="mb-4">We offer water feature winterization and spring startup services as part of our seasonal maintenance program.</p>
            <div className="bg-gray-100 p-6 rounded-lg mb-8 border-l-4" style={{ borderColor: 'oklch(0.46 0.20 25)' }}>
              <p className="font-bold text-lg mb-2" style={{ color: 'oklch(0.25 0.005 0)' }}>PRO TIP</p>
              <p>Pondless waterfalls are our most recommended water feature for Bend homeowners. They're easier to maintain than ponds, don't attract mosquitoes, and are safer for homes with children and pets.</p>
            </div>
            <div className="p-8 text-center mt-12" style={{ backgroundColor: 'oklch(0.18 0.008 0)' }}>
              <p className="font-label text-xs mb-3" style={{ color:'oklch(0.46 0.20 25)',letterSpacing:'0.18em' }}>GET STARTED TODAY</p>
              <h3 className="font-display text-white mb-4" style={{ fontSize:'1.6rem' }}>Get a Free Water Feature Quote in Bend</h3>
              <p className="font-body mb-6" style={{ color:'oklch(0.72 0.005 0)',lineHeight:1.7 }}>Our design team will visit your property and help you choose the right water feature for your space and budget.</p>
              <Link href="/contact"><span className="btn-red inline-block">Schedule Your Free Consultation →</span></Link>
              <p className="mt-4 text-sm" style={{ color:'oklch(0.60 0.005 0)' }}>Or call us: (541) 617-8873</p>
            </div>

            <div className="mt-12 pt-10" style={{ borderTop: '1px solid oklch(0.88 0.005 0)' }}>
              <p className="font-label mb-2" style={{ color: 'oklch(0.46 0.20 25)', fontSize: '0.62rem', letterSpacing: '0.18em' }}>YOU MIGHT ALSO LIKE</p>
              <h2 className="font-display font-light mb-6" style={{ fontSize: 'clamp(1.3rem, 2vw, 1.8rem)', color: 'oklch(0.15 0.005 0)' }}>More Helpful Guides</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Link href="/resources/water-feature-cost-bend-oregon"><span style={{ display:'block',padding:'1.1rem 1.25rem',backgroundColor:'oklch(1 0 0)',borderLeft:'3px solid oklch(0.46 0.20 25)',textDecoration:'none' }}><div className="font-body" style={{ color:'oklch(0.22 0.008 30)',fontWeight:600,fontSize:'0.85rem',marginBottom:'0.3rem' }}>Water Feature Cost in Bend</div><div className="font-body" style={{ color:'oklch(0.50 0.008 30)',fontSize:'0.75rem',fontWeight:300,lineHeight:1.5 }}>What water feature installation costs in Central Oregon.</div></span></Link>
                <Link href="/resources/paver-patio-cost-bend-oregon"><span style={{ display:'block',padding:'1.1rem 1.25rem',backgroundColor:'oklch(1 0 0)',borderLeft:'3px solid oklch(0.46 0.20 25)',textDecoration:'none' }}><div className="font-body" style={{ color:'oklch(0.22 0.008 30)',fontWeight:600,fontSize:'0.85rem',marginBottom:'0.3rem' }}>Paver Patio Cost in Bend</div><div className="font-body" style={{ color:'oklch(0.50 0.008 30)',fontSize:'0.75rem',fontWeight:300,lineHeight:1.5 }}>Hardscape pricing for Central Oregon projects.</div></span></Link>
                <Link href="/resources/landscape-design-cost-bend-oregon"><span style={{ display:'block',padding:'1.1rem 1.25rem',backgroundColor:'oklch(1 0 0)',borderLeft:'3px solid oklch(0.46 0.20 25)',textDecoration:'none' }}><div className="font-body" style={{ color:'oklch(0.22 0.008 30)',fontWeight:600,fontSize:'0.85rem',marginBottom:'0.3rem' }}>Landscape Design Cost in Bend</div><div className="font-body" style={{ color:'oklch(0.50 0.008 30)',fontSize:'0.75rem',fontWeight:300,lineHeight:1.5 }}>Full-yard design and installation pricing.</div></span></Link>
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
