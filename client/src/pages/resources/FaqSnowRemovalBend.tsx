import Navbar from '@/components/Navbar';
import SEO from '@/components/SEO';
import { BreadcrumbSchema, FAQSchema } from '@/components/SchemaMarkup';
import { Link } from 'wouter';

export default function FaqSnowRemovalBend() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: 'oklch(0.97 0.003 0)' }}>
      <SEO
        title="Snow Removal FAQ — Bend, Oregon | Newport Ave Landscaping"
        description="Common questions about commercial and residential snow removal in Bend, Oregon. Pricing, contracts, and what to expect."
        canonical="https://newportavelandscaping.com/resources/faq-snow-removal-bend-oregon"
      />
      <BreadcrumbSchema items={[
        { name: 'Home', url: '/' },
        { name: 'Resources', url: '/resources' },
        { name: 'Snow Removal FAQ: Bend, Oregon Homeowners and Businesses Ask', url: '/resources/faq-snow-removal-bend-oregon' },
      ]} />
      <FAQSchema faqs={[
        { question: 'How much does snow removal cost in Bend, Oregon?', answer: 'Residential snow removal in Bend typically costs $50 to $150 per visit for a standard driveway and walkways. Seasonal contracts for residential properties run $500 to $1,500 per season depending on property size and service level. Commercial snow removal is priced by property size and service requirements. Newport Avenue offers per-event pricing, seasonal contracts, and priority service agreements for both residential and commercial clients.' },
        { question: 'When does snow removal season start in Bend?', answer: 'Snow removal season in Bend typically runs from November through March, with the heaviest snowfall months being December, January, and February. Bend averages 30 or more inches of snow per year, with some winters bringing 60 or more inches. Newport Avenue activates snow removal crews and equipment in late October and remains on call through April for late-season storms.' },
        { question: 'How quickly does Newport Avenue respond to snow events in Bend?', answer: 'Newport Avenue monitors weather forecasts 24 hours a day during winter and pre-positions equipment before major storms. Priority contract clients are served first, typically within 2 to 4 hours of significant accumulation. Our goal is to have all contract clients cleared before the start of the business day. Per-event clients are served as quickly as possible after priority clients are complete.' },
        { question: 'Does Newport Avenue offer commercial snow removal in Bend?', answer: 'Yes. Newport Avenue provides commercial snow removal services for office parks, retail centers, HOAs, medical facilities, and other commercial properties throughout Bend and Central Oregon. Commercial services include plowing, shoveling, ice treatment, and sand application. We offer seasonal contracts with guaranteed response times for commercial clients.' },
        { question: 'What is included in a residential snow removal service in Bend?', answer: 'A standard residential snow removal service in Bend includes driveway plowing or shoveling, front walkway clearing, porch and entry steps, and ice treatment on high-risk surfaces. We can also clear back patios, side gates, and secondary walkways on request. Newport Avenue uses professional-grade equipment and ice melt products that are safe for concrete, pavers, and landscaping.' },
        { question: 'Do I need a seasonal snow removal contract in Bend?', answer: 'A seasonal contract is the best option if you want guaranteed service and priority response during storms. Per-event pricing is available for homeowners who prefer flexibility, but availability cannot be guaranteed during major storm events when all crews are committed to contract clients. Newport Avenue recommends seasonal contracts for elderly homeowners, rental properties, and anyone who cannot be without access during a storm.' },
      ]} />
      <Navbar />
      <div style={{ paddingTop: '204px' }}>
        <div className="relative flex items-center justify-center" style={{ height:'380px',backgroundImage:'url(/manus-storage/safe-hero-snow-removal_64a25ebe.jpg',backgroundSize:'cover',backgroundPosition:'center 50%' }}>
          <div className="absolute inset-0" style={{ backgroundColor: 'oklch(0 0 0 / 0.55)' }} />
          <div className="relative text-center container">
            <p className="font-label mb-3" style={{ color:'oklch(0.72 0.12 25)',fontSize:'0.7rem',letterSpacing:'0.18em' }}>SNOW REMOVAL · BEND, OREGON &middot; 2024</p>
            <h1 className="font-display text-white" style={{ fontSize:'clamp(1.8rem, 4vw, 3rem)',maxWidth:'700px',margin:'0 auto' }}>Snow Removal FAQ: Bend, Oregon Homeowners and Businesses Ask</h1>
          </div>
        </div>
        <div className="container py-16 max-w-3xl mx-auto">
          <div style={{ color: 'oklch(0.25 0.005 0)' }}>
            <p className="mb-8" style={{ fontSize:'1.05rem',lineHeight:1.85,color:'oklch(0.35 0.005 0)' }}>Bend averages 30+ inches of snow per year, and our winters can bring heavy, wet snow that accumulates quickly. Here are the questions we hear most often about snow removal services in Central Oregon.</p>

            <h2 className="text-3xl font-bold mb-4" style={{ color: 'oklch(0.25 0.005 0)' }}>How much does snow removal cost in Bend?</h2>
            <p className="mb-4">Residential snow removal in Bend typically costs $50–$150 per visit for a standard driveway and walkways. Seasonal contracts for residential properties run $500–$1,500 per season depending on property size and service level.</p>
            <p className="mb-8">Commercial snow removal is priced by property size and service requirements. We offer per-event pricing, seasonal contracts, and priority service agreements for commercial clients.</p>

            <h2 className="text-3xl font-bold mb-4" style={{ color: 'oklch(0.25 0.005 0)' }}>What's included in a snow removal service?</h2>
            <ul className="list-disc pl-5 mb-8 space-y-1">
              <li>Driveway plowing or shoveling</li>
              <li>Walkway and pathway clearing</li>
              <li>Entry and porch clearing</li>
              <li>Ice treatment (sand or ice melt)</li>
              <li>Roof snow removal (heavy accumulation)</li>
              <li>24/7 availability during snow events</li>
            </ul>

            <h2 className="text-3xl font-bold mb-4" style={{ color: 'oklch(0.25 0.005 0)' }}>How quickly do you respond to snow events in Bend?</h2>
            <p className="mb-4">Our snow removal crews are on call 24/7 during winter weather events. Priority contract clients are served first, typically within 2–4 hours of significant accumulation. Per-event clients are served as quickly as possible.</p>
            <p className="mb-4">We monitor weather forecasts and pre-position equipment before major storms. Our goal is to have all contract clients cleared before the start of the business day.</p>
            <div className="bg-gray-100 p-6 rounded-lg mb-8 border-l-4" style={{ borderColor: 'oklch(0.46 0.20 25)' }}>
              <p className="font-bold text-lg mb-2" style={{ color: 'oklch(0.25 0.005 0)' }}>PRO TIP</p>
              <p>Signing a seasonal contract before the first snow of the season guarantees your spot on our route. Per-event clients may face longer wait times during major storms when demand is highest.</p>
            </div>
            <div className="p-8 text-center mt-12" style={{ backgroundColor: 'oklch(0.18 0.008 0)' }}>
              <p className="font-label text-xs mb-3" style={{ color:'oklch(0.46 0.20 25)',letterSpacing:'0.18em' }}>GET STARTED TODAY</p>
              <h3 className="font-display text-white mb-4" style={{ fontSize:'1.6rem' }}>Get a Free Snow Removal Quote in Bend</h3>
              <p className="font-body mb-6" style={{ color:'oklch(0.72 0.005 0)',lineHeight:1.7 }}>Our snow removal team serves Bend and all of Central Oregon. Contact us before the first snow to get on our schedule.</p>
              <Link href="/contact"><span className="btn-red inline-block">Get Your Free Snow Removal Quote →</span></Link>
              <p className="mt-4 text-sm" style={{ color:'oklch(0.60 0.005 0)' }}>Or call us: (541) 617-8873</p>
            </div>

            <div className="mt-12 pt-10" style={{ borderTop: '1px solid oklch(0.88 0.005 0)' }}>
              <p className="font-label mb-2" style={{ color: 'oklch(0.46 0.20 25)', fontSize: '0.62rem', letterSpacing: '0.18em' }}>YOU MIGHT ALSO LIKE</p>
              <h2 className="font-display font-light mb-6" style={{ fontSize: 'clamp(1.3rem, 2vw, 1.8rem)', color: 'oklch(0.15 0.005 0)' }}>More Helpful Guides</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Link href="/resources/snow-removal-bend-oregon"><span style={{ display:'block',padding:'1.1rem 1.25rem',backgroundColor:'oklch(1 0 0)',borderLeft:'3px solid oklch(0.46 0.20 25)',textDecoration:'none' }}><div className="font-body" style={{ color:'oklch(0.22 0.008 30)',fontWeight:600,fontSize:'0.85rem',marginBottom:'0.3rem' }}>Snow Removal Cost in Bend</div><div className="font-body" style={{ color:'oklch(0.50 0.008 30)',fontSize:'0.75rem',fontWeight:300,lineHeight:1.5 }}>What commercial and residential snow removal costs.</div></span></Link>
                <Link href="/services/snow-removal"><span style={{ display:'block',padding:'1.1rem 1.25rem',backgroundColor:'oklch(1 0 0)',borderLeft:'3px solid oklch(0.46 0.20 25)',textDecoration:'none' }}><div className="font-body" style={{ color:'oklch(0.22 0.008 30)',fontWeight:600,fontSize:'0.85rem',marginBottom:'0.3rem' }}>Snow Removal Service</div><div className="font-body" style={{ color:'oklch(0.50 0.008 30)',fontSize:'0.75rem',fontWeight:300,lineHeight:1.5 }}>Our snow removal service for Bend properties.</div></span></Link>
                <Link href="/resources/commercial-landscaping-bend-oregon"><span style={{ display:'block',padding:'1.1rem 1.25rem',backgroundColor:'oklch(1 0 0)',borderLeft:'3px solid oklch(0.46 0.20 25)',textDecoration:'none' }}><div className="font-body" style={{ color:'oklch(0.22 0.008 30)',fontWeight:600,fontSize:'0.85rem',marginBottom:'0.3rem' }}>Commercial Landscaping in Bend</div><div className="font-body" style={{ color:'oklch(0.50 0.008 30)',fontSize:'0.75rem',fontWeight:300,lineHeight:1.5 }}>Commercial landscape maintenance in Central Oregon.</div></span></Link>
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
