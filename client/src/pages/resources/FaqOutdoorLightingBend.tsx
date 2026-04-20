import Navbar from '@/components/Navbar';
import SEO from '@/components/SEO';
import { BreadcrumbSchema, FAQSchema } from '@/components/SchemaMarkup';
import { Link } from 'wouter';

export default function FaqOutdoorLightingBend() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: 'oklch(0.97 0.003 0)' }}>
      <SEO
        title="Outdoor Lighting FAQ — Bend, Oregon | Newport Ave Landscaping"
        description="Common questions about landscape lighting installation in Bend, Oregon. Costs, LED vs. halogen, smart systems, and more."
        canonical="https://newportavelandscaping.com/resources/faq-outdoor-lighting-bend-oregon"
      />
      <BreadcrumbSchema items={[
        { name: 'Home', url: '/' },
        { name: 'Resources', url: '/resources' },
        { name: 'Outdoor Lighting FAQ: Bend, Oregon Homeowners Ask', url: '/resources/faq-outdoor-lighting-bend-oregon' },
      ]} />
      <FAQSchema faqs={[
        { question: 'How much does outdoor landscape lighting cost in Bend, Oregon?', answer: 'Outdoor landscape lighting installation in Bend typically costs $2,000 to $8,000 for a standard residential system with 10 to 20 fixtures. A basic pathway and accent package starts around $1,500. Larger systems with architectural uplighting, deck lighting, and smart controls can reach $10,000 to $20,000. Newport Avenue provides free lighting design consultations and detailed proposals for all Bend properties.' },
        { question: 'What type of outdoor lighting is best for Bend\'s climate?', answer: 'LED fixtures are the best choice for Bend\'s climate because they handle freeze-thaw cycles well, use 75 percent less energy than halogen, and last 25,000 to 50,000 hours. Brass and copper fixtures are the most durable in Bend\'s environment. Avoid zinc or aluminum fixtures in areas with irrigation overspray, as they corrode quickly. All Newport Avenue lighting installations use commercial-grade LED fixtures with a lifetime warranty.' },
        { question: 'Do outdoor lights need to be professionally installed in Bend?', answer: 'Low-voltage landscape lighting (12V systems) can technically be DIY-installed, but professional installation ensures proper transformer sizing, correct wire gauge for run length, optimal fixture placement for visual impact, and weatherproof connections that last. Line-voltage systems (120V) require a licensed electrician. Newport Avenue handles both low-voltage landscape lighting and line-voltage installations throughout Bend.' },
        { question: 'How do I maintain outdoor landscape lights in Bend?', answer: 'Landscape lighting in Bend requires minimal maintenance. We recommend cleaning fixture lenses once per year in spring, adjusting fixture aim after any landscaping changes, replacing any failed bulbs promptly to avoid transformer overload, and checking wire connections every 2 to 3 years. Newport Avenue offers annual lighting tune-up service for all systems we install.' },
        { question: 'Can outdoor lighting be added to an existing landscape in Bend?', answer: 'Yes. Outdoor lighting can be added to any existing landscape at any time. The most common approach is a low-voltage LED system with a transformer mounted near an outdoor outlet. Newport Avenue designs lighting retrofits for existing landscapes throughout Bend, and can often complete a standard residential installation in one day.' },
        { question: 'What is the best time of year to install outdoor lighting in Bend?', answer: 'Outdoor lighting can be installed year-round in Bend, but spring and fall are the most popular times. Spring installation lets you enjoy the lights all summer, and fall installation ensures your home looks its best during the holiday season. Avoid installation during frozen ground conditions in December and January, as trenching for wire burial becomes difficult.' },
      ]} />
      <Navbar />
      <div style={{ paddingTop: '204px' }}>
        <div className="relative flex items-center justify-center" style={{ height:'380px',backgroundImage:'url(/manus-storage/hero-landscape-lighting-wide_38282297.jpg',backgroundSize:'cover',backgroundPosition:'center 50%' }}>
          <div className="absolute inset-0" style={{ backgroundColor: 'oklch(0 0 0 / 0.55)' }} />
          <div className="relative text-center container">
            <p className="font-label mb-3" style={{ color:'oklch(0.72 0.12 25)',fontSize:'0.7rem',letterSpacing:'0.18em' }}>OUTDOOR LIGHTING · BEND, OREGON &middot; 2024</p>
            <h1 className="font-display text-white" style={{ fontSize:'clamp(1.8rem, 4vw, 3rem)',maxWidth:'700px',margin:'0 auto' }}>Outdoor Lighting FAQ: Bend, Oregon Homeowners Ask</h1>
          </div>
        </div>
        <div className="container py-16 max-w-3xl mx-auto">
          <div style={{ color: 'oklch(0.25 0.005 0)' }}>
            <p className="mb-8" style={{ fontSize:'1.05rem',lineHeight:1.85,color:'oklch(0.35 0.005 0)' }}>Landscape lighting is one of the most transformative additions to a Bend property — and one of the most misunderstood. Here are the questions we hear most often from Central Oregon homeowners considering a lighting system.</p>

            <h2 className="text-3xl font-bold mb-4" style={{ color: 'oklch(0.25 0.005 0)' }}>How much does landscape lighting cost in Bend?</h2>
            <p className="mb-4">A basic pathway lighting system (8–12 lights) typically costs $800–$2,000 installed. A mid-range system with 15–25 lights covering pathways, uplights, and accent features runs $2,000–$5,000. Full property systems with 25–50+ lights cost $5,000–$15,000+.</p>
            <p className="mb-8">We provide free, itemized estimates after an on-site consultation. We can also do a nighttime walkthrough to show you exactly where lights would be placed and what effect they'll create.</p>

            <h2 className="text-3xl font-bold mb-4" style={{ color: 'oklch(0.25 0.005 0)' }}>Should I choose LED or traditional halogen lighting?</h2>
            <p className="mb-4">We exclusively install LED landscape lighting. LEDs use 75% less energy than halogen, last 25,000–50,000 hours (vs. 2,000 for halogen), and produce better, more consistent light quality.</p>
            <p className="mb-8">The higher upfront cost of LED fixtures is recovered in energy savings within 2–3 years. We don't install halogen systems anymore — the long-term economics just don't make sense.</p>

            <h2 className="text-3xl font-bold mb-4" style={{ color: 'oklch(0.25 0.005 0)' }}>Can landscape lighting handle Bend's winters?</h2>
            <p className="mb-4">Yes. All fixtures we install are rated for outdoor use in freeze-thaw climates. We use quality fixtures from manufacturers like VOLT, Kichler, and FX Luminaire that are tested for temperature extremes.</p>
            <p className="mb-4">Low-voltage LED systems are very durable in Bend's climate. The main maintenance task is occasional cleaning of fixture lenses and checking connections after heavy snow or ice.</p>
            <div className="bg-gray-100 p-6 rounded-lg mb-8 border-l-4" style={{ borderColor: 'oklch(0.46 0.20 25)' }}>
              <p className="font-bold text-lg mb-2" style={{ color: 'oklch(0.25 0.005 0)' }}>PRO TIP</p>
              <p>A smart transformer with a built-in timer and photocell turns your lights on at dusk and off at dawn automatically. Adding a smart controller allows you to adjust schedules and brightness from your phone.</p>
            </div>
            <div className="p-8 text-center mt-12" style={{ backgroundColor: 'oklch(0.18 0.008 0)' }}>
              <p className="font-label text-xs mb-3" style={{ color:'oklch(0.46 0.20 25)',letterSpacing:'0.18em' }}>GET STARTED TODAY</p>
              <h3 className="font-display text-white mb-4" style={{ fontSize:'1.6rem' }}>Get a Free Lighting Consultation in Bend</h3>
              <p className="font-body mb-6" style={{ color:'oklch(0.72 0.005 0)',lineHeight:1.7 }}>Our lighting design team will walk your property and create a plan that transforms your landscape after dark.</p>
              <Link href="/contact"><span className="btn-red inline-block">Schedule Your Free Lighting Consultation →</span></Link>
              <p className="mt-4 text-sm" style={{ color:'oklch(0.60 0.005 0)' }}>Or call us: (541) 617-8873</p>
            </div>

            <div className="mt-12 pt-10" style={{ borderTop: '1px solid oklch(0.88 0.005 0)' }}>
              <p className="font-label mb-2" style={{ color: 'oklch(0.46 0.20 25)', fontSize: '0.62rem', letterSpacing: '0.18em' }}>YOU MIGHT ALSO LIKE</p>
              <h2 className="font-display font-light mb-6" style={{ fontSize: 'clamp(1.3rem, 2vw, 1.8rem)', color: 'oklch(0.15 0.005 0)' }}>More Helpful Guides</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Link href="/resources/outdoor-lighting-cost-bend-oregon"><span style={{ display:'block',padding:'1.1rem 1.25rem',backgroundColor:'oklch(1 0 0)',borderLeft:'3px solid oklch(0.46 0.20 25)',textDecoration:'none' }}><div className="font-body" style={{ color:'oklch(0.22 0.008 30)',fontWeight:600,fontSize:'0.85rem',marginBottom:'0.3rem' }}>Outdoor Lighting Cost in Bend</div><div className="font-body" style={{ color:'oklch(0.50 0.008 30)',fontSize:'0.75rem',fontWeight:300,lineHeight:1.5 }}>Landscape lighting installation pricing in Bend.</div></span></Link>
                <Link href="/resources/landscape-lighting-bend-oregon"><span style={{ display:'block',padding:'1.1rem 1.25rem',backgroundColor:'oklch(1 0 0)',borderLeft:'3px solid oklch(0.46 0.20 25)',textDecoration:'none' }}><div className="font-body" style={{ color:'oklch(0.22 0.008 30)',fontWeight:600,fontSize:'0.85rem',marginBottom:'0.3rem' }}>Landscape Lighting in Bend</div><div className="font-body" style={{ color:'oklch(0.50 0.008 30)',fontSize:'0.75rem',fontWeight:300,lineHeight:1.5 }}>Design ideas and tips for Central Oregon properties.</div></span></Link>
                <Link href="/resources/paver-patio-cost-bend-oregon"><span style={{ display:'block',padding:'1.1rem 1.25rem',backgroundColor:'oklch(1 0 0)',borderLeft:'3px solid oklch(0.46 0.20 25)',textDecoration:'none' }}><div className="font-body" style={{ color:'oklch(0.22 0.008 30)',fontWeight:600,fontSize:'0.85rem',marginBottom:'0.3rem' }}>Paver Patio Cost in Bend</div><div className="font-body" style={{ color:'oklch(0.50 0.008 30)',fontSize:'0.75rem',fontWeight:300,lineHeight:1.5 }}>Hardscape pricing for Central Oregon projects.</div></span></Link>
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
