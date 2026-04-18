import Navbar from '@/components/Navbar';
import SEO from '@/components/SEO';
import { BreadcrumbSchema, FAQSchema } from '@/components/SchemaMarkup';
import { Link } from 'wouter';

export default function WaterFeatureCostBend() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: 'oklch(0.97 0.003 0)' }}>
      <SEO
        title="Water Feature Cost in Bend, OR | Newport Ave Landscaping"
        description="What water features cost in Bend, Oregon. Pondless waterfalls, koi ponds, fountains, and installation pricing for Central Oregon."
        canonical="https://newportavelandscaping.com/resources/water-feature-cost-bend-oregon"
      />
      <BreadcrumbSchema items={[
        { name: 'Home', url: '/' },
        { name: 'Resources', url: '/resources' },
        { name: 'Water Feature Cost in Bend, Oregon', url: '/resources/water-feature-cost-bend-oregon' },
      ]} />
      <FAQSchema faqs={[
        { question: `How much does a water feature cost in Bend, Oregon?`, answer: `Water feature costs in Bend vary by type. A bubbling boulder or container fountain costs $1,500 to $4,000 installed. A pondless waterfall, the most popular choice in Bend, typically costs $4,000 to $12,000. A full koi pond with filtration ranges from $8,000 to $30,000 or more. Newport Avenue provides free on-site consultations and detailed proposals for all water feature projects in Central Oregon.` },
        { question: `What type of water feature is best for Bend's climate?`, answer: `Pondless waterfalls are the best choice for Bend because they can be fully drained for winter, eliminating freeze damage risk. Bubbling boulders and container fountains are also excellent low-maintenance options. Traditional open ponds can be maintained year-round with a de-icer but require more winter management. All recirculating systems need to be winterized before Bend's first hard freeze around October 15th.` },
        { question: `Do water features need to be winterized in Bend?`, answer: `Yes. All water features in Bend should be winterized before the first hard freeze, typically around October 15th. This involves shutting off the pump, draining all pipes and the pump housing, and storing the pump indoors. Koi ponds can run year-round with a pond de-icer to maintain a small open area for gas exchange. Newport Avenue offers water feature winterization and spring startup services.` },
        { question: `How much water does a pondless waterfall use in Bend?`, answer: `A typical pondless waterfall in Bend uses 50 to 200 gallons per week through evaporation, equivalent to watering a small garden bed. Recirculating systems reuse the same water, so consumption is limited to evaporation and splash losses. During Bend's hot, dry summers, the reservoir may need topping off every 1 to 2 weeks.` },
        { question: `How long does water feature installation take in Bend?`, answer: `A bubbling boulder or small fountain can be installed in one day. A standard pondless waterfall takes 2 to 4 days. A full koi pond with filtration, planting shelves, and surrounding landscape takes 1 to 2 weeks. Newport Avenue handles all aspects of water feature installation including excavation, plumbing, electrical, and surrounding landscape integration.` },
        { question: `Can a water feature increase my home value in Bend?`, answer: `Yes. A professionally designed water feature can increase perceived home value and time-on-market appeal in Bend, particularly pondless waterfalls and naturalistic stream features that complement the Central Oregon aesthetic. The key is professional design and installation — poorly executed water features can actually detract from value. Newport Avenue designs water features that enhance the overall landscape and complement the property.` },
      ]} />
      <Navbar />
      <div style={{ paddingTop: '204px' }}>
        <div className="relative flex items-center justify-center" style={{ height:'380px',backgroundImage:'url(https://d2xsxph8kpxj0f.cloudfront.net/310519663503028182/g3pw3MRUapabcDUbhBEFxx/ITP_7558_e52a40c9.jpg',backgroundSize:'cover',backgroundPosition:'center 50%' }}>
          <div className="absolute inset-0" style={{ backgroundColor: 'oklch(0 0 0 / 0.55)' }} />
          <div className="relative text-center container">
            <p className="font-label mb-3" style={{ color:'oklch(0.72 0.12 25)',fontSize:'0.7rem',letterSpacing:'0.18em' }}>OUTDOOR LIVING · BEND, OREGON &middot; 2024</p>
            <h1 className="font-display text-white" style={{ fontSize:'clamp(1.8rem, 4vw, 3rem)',maxWidth:'700px',margin:'0 auto' }}>Water Feature Cost in Bend, Oregon</h1>
          </div>
        </div>
        <div className="container py-16 max-w-3xl mx-auto">
          <div style={{ color: 'oklch(0.25 0.005 0)' }}>
            <p className="mb-8" style={{ fontSize:'1.05rem',lineHeight:1.85,color:'oklch(0.35 0.005 0)' }}>A water feature adds a completely different dimension to a Bend outdoor space — the sound of moving water, the visual interest of a stream or waterfall, and the wildlife it attracts. Here's what water features cost in Central Oregon and which type is right for your property.</p>

            <h2 className="text-3xl font-bold mb-4" style={{ color: 'oklch(0.25 0.005 0)' }}>Water Feature Cost in Bend</h2>
            <div className="overflow-x-auto mb-8"><table className="min-w-full bg-white border border-gray-300"><thead><tr><th className="py-2 px-4 border-b text-left">Feature Type</th><th className="py-2 px-4 border-b text-left">Typical Cost</th><th className="py-2 px-4 border-b text-left">Notes</th></tr></thead><tbody><tr><td className="py-2 px-4 border-b">Bubbling boulder/fountain</td><td className="py-2 px-4 border-b">$1,500–$4,000</td><td className="py-2 px-4 border-b">Simple, low maintenance</td></tr>
                  <tr><td className="py-2 px-4 border-b">Pondless waterfall (small)</td><td className="py-2 px-4 border-b">$4,000–$8,000</td><td className="py-2 px-4 border-b">Most popular choice in Bend</td></tr>
                  <tr><td className="py-2 px-4 border-b">Pondless waterfall (large)</td><td className="py-2 px-4 border-b">$8,000–$20,000</td><td className="py-2 px-4 border-b">Multiple tiers, boulders</td></tr>
                  <tr><td className="py-2 px-4 border-b">Koi pond (basic)</td><td className="py-2 px-4 border-b">$8,000–$15,000</td><td className="py-2 px-4 border-b">With filtration system</td></tr>
                  <tr><td className="py-2 px-4 border-b">Koi pond (full)</td><td className="py-2 px-4 border-b">$15,000–$40,000+</td><td className="py-2 px-4 border-b">Custom design, premium filtration</td></tr>
                  <tr><td className="py-2 px-4 border-b">Stream feature</td><td className="py-2 px-4 border-b">$5,000–$15,000</td><td className="py-2 px-4 border-b">Natural-looking, great for slopes</td></tr></tbody></table></div>

            <h2 className="text-3xl font-bold mb-4" style={{ color: 'oklch(0.25 0.005 0)' }}>Why Pondless Waterfalls Are Popular in Bend</h2>
            <p className="mb-4">Pondless waterfalls are our most popular water feature in Central Oregon. They provide all the visual and auditory benefits of a waterfall without the maintenance of a pond — no algae management, no fish care, and no safety concerns for children and pets.</p>
            <p className="mb-8">The water reservoir is buried underground, so there's no standing water to attract mosquitoes or create a drowning hazard. The system recirculates water continuously, and the pump can be turned off when not in use.</p>

            <h2 className="text-3xl font-bold mb-4" style={{ color: 'oklch(0.25 0.005 0)' }}>Winterizing Water Features in Bend</h2>
            <p className="mb-4">Most water features in Bend need to be winterized before the first hard freeze (around October 15th). Pondless waterfalls and fountains should be drained and the pump stored indoors.</p>
            <p className="mb-4">Koi ponds can often run year-round with a de-icer to maintain a small open area in the ice. However, the pump and filtration system need to be monitored carefully during extreme cold.</p>
            <div className="bg-gray-100 p-6 rounded-lg mb-8 border-l-4" style={{ borderColor: 'oklch(0.46 0.20 25)' }}>
              <p className="font-bold text-lg mb-2" style={{ color: 'oklch(0.25 0.005 0)' }}>PRO TIP</p>
              <p>A water feature near your patio or outdoor seating area creates a natural sound barrier that masks traffic and neighborhood noise — a significant benefit in Bend's growing urban areas.</p>
            </div>
            <div className="p-8 text-center mt-12" style={{ backgroundColor: 'oklch(0.18 0.008 0)' }}>
              <p className="font-label text-xs mb-3" style={{ color:'oklch(0.46 0.20 25)',letterSpacing:'0.18em' }}>GET STARTED TODAY</p>
              <h3 className="font-display text-white mb-4" style={{ fontSize:'1.6rem' }}>Get a Free Water Feature Consultation in Bend</h3>
              <p className="font-body mb-6" style={{ color:'oklch(0.72 0.005 0)',lineHeight:1.7 }}>Our design team will visit your property and help you choose the right water feature for your space and budget.</p>
              <Link href="/contact"><span className="btn-red inline-block">Schedule Your Free Consultation →</span></Link>
              <p className="mt-4 text-sm" style={{ color:'oklch(0.60 0.005 0)' }}>Or call us: (541) 617-8873</p>
            </div>

            <div className="mt-12 pt-10" style={{ borderTop: '1px solid oklch(0.88 0.005 0)' }}>
              <p className="font-label mb-2" style={{ color: 'oklch(0.46 0.20 25)', fontSize: '0.62rem', letterSpacing: '0.18em' }}>YOU MIGHT ALSO LIKE</p>
              <h2 className="font-display font-light mb-6" style={{ fontSize: 'clamp(1.3rem, 2vw, 1.8rem)', color: 'oklch(0.15 0.005 0)' }}>More Helpful Guides</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Link href="/resources/faq-water-feature-bend-oregon"><span style={{ display:'block',padding:'1.1rem 1.25rem',backgroundColor:'oklch(1 0 0)',borderLeft:'3px solid oklch(0.46 0.20 25)',textDecoration:'none' }}><div className="font-body" style={{ color:'oklch(0.22 0.008 30)',fontWeight:600,fontSize:'0.85rem',marginBottom:'0.3rem' }}>Water Feature FAQ</div><div className="font-body" style={{ color:'oklch(0.50 0.008 30)',fontSize:'0.75rem',fontWeight:300,lineHeight:1.5 }}>Common questions about water features in Bend.</div></span></Link>
                <Link href="/resources/paver-patio-cost-bend-oregon"><span style={{ display:'block',padding:'1.1rem 1.25rem',backgroundColor:'oklch(1 0 0)',borderLeft:'3px solid oklch(0.46 0.20 25)',textDecoration:'none' }}><div className="font-body" style={{ color:'oklch(0.22 0.008 30)',fontWeight:600,fontSize:'0.85rem',marginBottom:'0.3rem' }}>Paver Patio Cost in Bend</div><div className="font-body" style={{ color:'oklch(0.50 0.008 30)',fontSize:'0.75rem',fontWeight:300,lineHeight:1.5 }}>Hardscape pricing for Central Oregon projects.</div></span></Link>
                <Link href="/resources/fire-pit-patio-cost-bend-oregon"><span style={{ display:'block',padding:'1.1rem 1.25rem',backgroundColor:'oklch(1 0 0)',borderLeft:'3px solid oklch(0.46 0.20 25)',textDecoration:'none' }}><div className="font-body" style={{ color:'oklch(0.22 0.008 30)',fontWeight:600,fontSize:'0.85rem',marginBottom:'0.3rem' }}>Fire Pit & Patio Cost Guide</div><div className="font-body" style={{ color:'oklch(0.50 0.008 30)',fontSize:'0.75rem',fontWeight:300,lineHeight:1.5 }}>Budgeting for fire features alongside your outdoor space.</div></span></Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
