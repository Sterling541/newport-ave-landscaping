import Navbar from '@/components/Navbar';
import SEO from '@/components/SEO';
import { BreadcrumbSchema, FAQSchema } from '@/components/SchemaMarkup';
import { Link } from 'wouter';

export default function FaqLawnCareBend() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: 'oklch(0.97 0.003 0)' }}>
      <SEO
        title="Lawn Care FAQ — Bend, Oregon | Newport Ave Landscaping"
        description="Common questions about lawn care, mowing, aeration, and fertilization in Bend, Oregon."
        canonical="https://www.newportavelandscaping.com/resources/faq-lawn-care-bend-oregon"
      />
      <BreadcrumbSchema items={[
        { name: 'Home', url: '/' },
        { name: 'Resources', url: '/resources' },
        { name: 'Lawn Care FAQ: Your Bend Lawn Questions Answered', url: '/resources/faq-lawn-care-bend-oregon' },
      ]} />
      <FAQSchema faqs={[
        { question: 'How often should I mow my lawn in Bend, Oregon?', answer: 'During the active growing season from May through September, most Bend lawns benefit from weekly mowing. Cool-season grasses like Kentucky bluegrass and tall fescue grow most actively in spring and fall, and may only need bi-weekly mowing during midsummer heat. Never remove more than one-third of the blade in a single mowing. The ideal mowing height for bluegrass in Bend is 3 to 3.5 inches.' },
        { question: 'When should I fertilize my lawn in Bend?', answer: 'In Bend, a 4-application fertilization program works best: early spring in April with a pre-emergent and starter fertilizer, late spring in June with a slow-release nitrogen, midsummer in July or August with a low-nitrogen summer formula, and fall in September or October with a winterizer high in potassium. Avoid fertilizing during drought stress or extreme heat above 90 degrees.' },
        { question: 'What type of grass grows best in Bend, Oregon?', answer: 'Kentucky bluegrass is the most common lawn grass in Bend and performs well in the region\'s cold winters and warm summers. Tall fescue is a good alternative for shadier areas or homeowners who want a lower-maintenance lawn. Fine fescue blends work well in drier, shadier spots. Warm-season grasses like bermuda and zoysia do not perform well in Bend\'s Zone 6a climate.' },
        { question: 'How much does lawn care cost in Bend?', answer: 'Weekly mowing and edging in Bend starts at $97 per service. Spring and fall cleanups start at $600 each. Core aeration runs $150 to $400 depending on lawn size. A full-service Everything Plan covering mowing, cleanups, aeration, and fertilization starts at $388 per month. Newport Avenue provides free estimates for all lawn care services in Bend and Central Oregon.' },
        { question: 'When should I aerate my lawn in Bend?', answer: 'The best time to aerate a lawn in Bend is early fall from late August through September, when cool-season grasses are entering their peak fall growth period and can recover quickly. Spring aeration in April is also effective. Core aeration should be done when the soil is moist but not saturated, and is most beneficial for compacted soils or lawns with heavy thatch buildup.' },
        { question: 'Does Newport Avenue Landscaping offer lawn care contracts in Bend?', answer: 'Yes. Newport Avenue offers weekly lawn care service contracts for the full season from April through October, as well as our Everything Plan which covers all aspects of lawn maintenance year-round. We serve all neighborhoods in Bend including Awbrey Butte, NorthWest Crossing, Broken Top, Discovery West, and surrounding areas, as well as Redmond, Sisters, and Sunriver.' },
      ]} />
      <Navbar />
      <div style={{ paddingTop: '204px' }}>
        <div className="relative flex items-center justify-center" style={{ height:'380px',backgroundImage:'url(https://files.manuscdn.com/user_upload_by_module/session_file/310519663503028182/QuZbCMdvWnmWDtAV.jpg',backgroundSize:'cover',backgroundPosition:'center 50%' }}>
          <div className="absolute inset-0" style={{ backgroundColor: 'oklch(0 0 0 / 0.55)' }} />
          <div className="relative text-center container">
            <p className="font-label mb-3" style={{ color:'oklch(0.72 0.12 25)',fontSize:'0.7rem',letterSpacing:'0.18em' }}>LAWN CARE · BEND, OREGON &middot; 2024</p>
            <h1 className="font-display text-white" style={{ fontSize:'clamp(1.8rem, 4vw, 3rem)',maxWidth:'700px',margin:'0 auto' }}>Lawn Care FAQ: Your Bend Lawn Questions Answered</h1>
          </div>
        </div>
        <div className="container py-16 max-w-3xl mx-auto">
          <div style={{ color: 'oklch(0.25 0.005 0)' }}>
            <p className="mb-8" style={{ fontSize:'1.05rem',lineHeight:1.85,color:'oklch(0.35 0.005 0)' }}>Maintaining a healthy lawn in Bend's high desert climate is different from lawn care in most other parts of the country. Here are the questions we hear most often from Central Oregon homeowners.</p>

            <h2 className="text-3xl font-bold mb-4" style={{ color: 'oklch(0.25 0.005 0)' }}>What grass types grow best in Bend, Oregon?</h2>
            <p className="mb-4">The most common lawn grasses in Bend are Kentucky bluegrass, tall fescue, and fine fescue blends. Kentucky bluegrass is the most popular for its appearance but requires the most water. Tall fescue is more drought-tolerant and handles Bend's temperature swings better.</p>
            <p className="mb-8">We generally recommend tall fescue or a fescue blend for new lawns in Central Oregon — it's more water-efficient and more forgiving during our hot, dry summers.</p>

            <h2 className="text-3xl font-bold mb-4" style={{ color: 'oklch(0.25 0.005 0)' }}>How often should I mow my lawn in Bend?</h2>
            <p className="mb-4">During the growing season (May–September), most Bend lawns need mowing every 7–10 days. In spring and fall when growth is slower, every 10–14 days is usually sufficient.</p>
            <p className="mb-4">Never remove more than one-third of the blade height in a single mowing. During summer heat stress, raise your mowing height to 3–3.5 inches to protect roots and reduce water demand.</p>
            <div className="bg-gray-100 p-6 rounded-lg mb-8 border-l-4" style={{ borderColor: 'oklch(0.46 0.20 25)' }}>
              <p className="font-bold text-lg mb-2" style={{ color: 'oklch(0.25 0.005 0)' }}>PRO TIP</p>
              <p>Leaving grass clippings on the lawn (mulch mowing) returns nitrogen to the soil and can reduce fertilizer needs by 25%. We recommend this practice for most Bend lawns.</p>
            </div>

            <h2 className="text-3xl font-bold mb-4" style={{ color: 'oklch(0.25 0.005 0)' }}>When is the best time to aerate in Bend?</h2>
            <p className="mb-4">The best times to aerate in Bend are late spring (May–June) and early fall (August–September). Spring aeration helps lawns recover from winter dormancy. Fall aeration prepares the lawn for winter and allows fertilizer to penetrate deeply.</p>
            <p className="mb-8">We recommend aerating twice per year for most Bend lawns, especially those with compacted soil or heavy clay content.</p>
            <div className="p-8 text-center mt-12" style={{ backgroundColor: 'oklch(0.18 0.008 0)' }}>
              <p className="font-label text-xs mb-3" style={{ color:'oklch(0.46 0.20 25)',letterSpacing:'0.18em' }}>GET STARTED TODAY</p>
              <h3 className="font-display text-white mb-4" style={{ fontSize:'1.6rem' }}>Get a Free Lawn Care Quote in Bend</h3>
              <p className="font-body mb-6" style={{ color:'oklch(0.72 0.005 0)',lineHeight:1.7 }}>Tell us about your lawn and we'll put together a custom care plan. We serve Bend, Redmond, Sisters, Sunriver, and all of Central Oregon.</p>
              <Link href="/contact"><span className="btn-red inline-block">Get Your Free Lawn Care Quote →</span></Link>
              <p className="mt-4 text-sm" style={{ color:'oklch(0.60 0.005 0)' }}>Or call us: (541) 617-8873</p>
            </div>

            <div className="mt-12 pt-10" style={{ borderTop: '1px solid oklch(0.88 0.005 0)' }}>
              <p className="font-label mb-2" style={{ color: 'oklch(0.46 0.20 25)', fontSize: '0.62rem', letterSpacing: '0.18em' }}>YOU MIGHT ALSO LIKE</p>
              <h2 className="font-display font-light mb-6" style={{ fontSize: 'clamp(1.3rem, 2vw, 1.8rem)', color: 'oklch(0.15 0.005 0)' }}>More Helpful Guides</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Link href="/resources/lawn-maintenance-cost-bend-oregon"><span style={{ display:'block',padding:'1.1rem 1.25rem',backgroundColor:'oklch(1 0 0)',borderLeft:'3px solid oklch(0.46 0.20 25)',textDecoration:'none' }}><div className="font-body" style={{ color:'oklch(0.22 0.008 30)',fontWeight:600,fontSize:'0.85rem',marginBottom:'0.3rem' }}>Lawn Maintenance Cost in Bend</div><div className="font-body" style={{ color:'oklch(0.50 0.008 30)',fontSize:'0.75rem',fontWeight:300,lineHeight:1.5 }}>What lawn care services cost in Central Oregon.</div></span></Link>
                <Link href="/resources/when-to-aerate-lawn-bend-oregon"><span style={{ display:'block',padding:'1.1rem 1.25rem',backgroundColor:'oklch(1 0 0)',borderLeft:'3px solid oklch(0.46 0.20 25)',textDecoration:'none' }}><div className="font-body" style={{ color:'oklch(0.22 0.008 30)',fontWeight:600,fontSize:'0.85rem',marginBottom:'0.3rem' }}>When to Aerate Your Lawn in Bend</div><div className="font-body" style={{ color:'oklch(0.50 0.008 30)',fontSize:'0.75rem',fontWeight:300,lineHeight:1.5 }}>Best timing for aeration in Central Oregon.</div></span></Link>
                <Link href="/resources/sod-installation-cost-bend-oregon"><span style={{ display:'block',padding:'1.1rem 1.25rem',backgroundColor:'oklch(1 0 0)',borderLeft:'3px solid oklch(0.46 0.20 25)',textDecoration:'none' }}><div className="font-body" style={{ color:'oklch(0.22 0.008 30)',fontWeight:600,fontSize:'0.85rem',marginBottom:'0.3rem' }}>Sod Installation Cost in Bend</div><div className="font-body" style={{ color:'oklch(0.50 0.008 30)',fontSize:'0.75rem',fontWeight:300,lineHeight:1.5 }}>Pricing for sod installation and lawn renovation.</div></span></Link>
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
