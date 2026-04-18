import Navbar from '@/components/Navbar';
import SEO from '@/components/SEO';
import { BreadcrumbSchema, FAQSchema } from '@/components/SchemaMarkup';
import { Link } from 'wouter';

export default function FallLandscapingGuideBend() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: 'oklch(0.97 0.003 0)' }}>
      <SEO
        title="Fall Landscaping Guide for Bend, Oregon | Newport Ave"
        description="Complete fall landscaping checklist for Bend, Oregon. When to winterize sprinklers, aerate, overseed, and prepare your landscape for winter."
        canonical="https://newportavelandscaping.com/resources/fall-landscaping-guide-bend-oregon"
      />
      <BreadcrumbSchema items={[
        { name: 'Home', url: '/' },
        { name: 'Resources', url: '/resources' },
        { name: 'Fall Landscaping Guide for Bend, Oregon', url: '/resources/fall-landscaping-guide-bend-oregon' },
      ]} />
      <FAQSchema faqs={[
        { question: `What are the best plants for fall landscaping in Bend, Oregon?`, answer: `For fall landscaping in Bend, consider native and drought-tolerant plants that can withstand the region's cold winters and volcanic soil. Good choices include certain varieties of ornamental grasses, conifers, and deciduous shrubs that offer vibrant fall color before the first hard freeze. Newport Avenue Landscaping can help you select species perfectly suited for Bend's unique climate Zone 6a.` },
        { question: `How should I prepare my irrigation system for winter in Central Oregon?`, answer: `Properly winterizing your irrigation system is crucial in Central Oregon to prevent damage from freeze-thaw cycles. This involves blowing out the lines with an air compressor to remove all water, as residual moisture can freeze and crack pipes. It's recommended to have this done professionally before sustained freezing temperatures arrive.` },
        { question: `When is the ideal time to fertilize my lawn in Bend during the fall?`, answer: `The ideal time to fertilize your lawn in Bend during the fall is typically in late September or early October, before the ground freezes. This provides essential nutrients for root development, helping your lawn recover from summer stress and build resilience for the upcoming winter. A slow-release fertilizer is often best for sustained feeding.` },
        { question: `What fall tasks are essential for garden beds in Bend's climate?`, answer: `Essential fall tasks for garden beds in Bend include clearing spent annuals, cutting back perennials, and adding a fresh layer of mulch. Mulching helps insulate plant roots from fluctuating temperatures and conserves moisture, which is vital given Bend's average 11 inches of annual rainfall. This preparation ensures healthier growth come spring.` },
        { question: `How can I protect my trees and shrubs from winter damage in Bend, Oregon?`, answer: `Protecting trees and shrubs from winter damage in Bend involves adequate watering before the ground freezes, applying mulch around the base, and sometimes wrapping delicate evergreens. The dry, cold winds and heavy snow can be harsh on younger or less hardy plants. Newport Avenue Landscaping offers services to ensure your woody plants are winter-ready.` },
        { question: `Are there specific considerations for planting in Bend's volcanic soil during autumn?`, answer: `Yes, planting in Bend's volcanic soil during autumn requires attention to soil amendment and drainage. While volcanic soil can be nutrient-rich, it often benefits from added organic matter to improve its structure and water retention. Ensuring good drainage is also key to prevent root rot during wetter periods or snowmelt.` },
      ]} />
      <Navbar />
      <div style={{ paddingTop: '204px' }}>
        <div className="relative flex items-center justify-center" style={{ height:'380px',backgroundImage:'url(https://files.manuscdn.com/user_upload_by_module/session_file/310519663503028182/QuZbCMdvWnmWDtAV.jpg',backgroundSize:'cover',backgroundPosition:'center 50%' }}>
          <div className="absolute inset-0" style={{ backgroundColor: 'oklch(0 0 0 / 0.55)' }} />
          <div className="relative text-center container">
            <p className="font-label mb-3" style={{ color:'oklch(0.72 0.12 25)',fontSize:'0.7rem',letterSpacing:'0.18em' }}>SEASONAL GUIDE · BEND, OREGON &middot; 2024</p>
            <h1 className="font-display text-white" style={{ fontSize:'clamp(1.8rem, 4vw, 3rem)',maxWidth:'700px',margin:'0 auto' }}>Fall Landscaping Guide for Bend, Oregon</h1>
          </div>
        </div>
        <div className="container py-16 max-w-3xl mx-auto">
          <div style={{ color: 'oklch(0.25 0.005 0)' }}>
            <p className="mb-8" style={{ fontSize:'1.05rem',lineHeight:1.85,color:'oklch(0.35 0.005 0)' }}>Fall is the most important season for Bend landscape maintenance. The work you do in September and October determines how well your lawn, plants, and irrigation system survive the winter — and how quickly they bounce back in spring. Here's our complete fall guide.</p>

            <h2 className="text-3xl font-bold mb-4" style={{ color: 'oklch(0.25 0.005 0)' }}>September: Aerate, Overseed, and Fertilize</h2>
            <p className="mb-4">Early fall is the best time to aerate and overseed your Bend lawn. Soil temperatures are still warm enough for germination, but air temperatures are cooling — ideal conditions for grass establishment. Apply a fall fertilizer high in potassium to harden grass for winter.</p>
            <p className="mb-8">This is also the time to address any bare or thin areas in your lawn. Overseeding in September gives new grass 6–8 weeks to establish before the first freeze.</p>

            <h2 className="text-3xl font-bold mb-4" style={{ color: 'oklch(0.25 0.005 0)' }}>October: Winterize Your Irrigation System</h2>
            <p className="mb-4">The most critical fall task for Bend homeowners is sprinkler winterization. Schedule your blowout before October 15th — the average first hard freeze date. Don't wait until a freeze is forecast; we fill up fast.</p>
            <p className="mb-4">Our blowout service uses a commercial air compressor to force all water out of your irrigation lines, preventing freeze damage to pipes, fittings, and heads.</p>
            <div className="bg-gray-100 p-6 rounded-lg mb-8 border-l-4" style={{ borderColor: 'oklch(0.46 0.20 25)' }}>
              <p className="font-bold text-lg mb-2" style={{ color: 'oklch(0.25 0.005 0)' }}>PRO TIP</p>
              <p>A single freeze event can crack multiple PVC fittings throughout your system. Repair costs typically run $500–$2,000. A $140/tech hour blowout is the best insurance you can buy.</p>
            </div>

            <h2 className="text-3xl font-bold mb-4" style={{ color: 'oklch(0.25 0.005 0)' }}>Fall Landscaping Checklist</h2>
            <ul className="list-disc pl-5 mb-8 space-y-1">
              <li>Core aerate lawn (August–September)</li>
              <li>Overseed thin or bare areas (September)</li>
              <li>Apply fall fertilizer (high potassium)</li>
              <li>Schedule sprinkler winterization (before Oct 15)</li>
              <li>Fall cleanup: leaves, debris, bed edging</li>
              <li>Cut back perennials (leave ornamental grasses)</li>
              <li>Mulch planting beds (3 inches)</li>
              <li>Inspect hardscape for frost heaving</li>
              <li>Plant spring bulbs (September–October)</li>
            </ul>
            <div className="p-8 text-center mt-12" style={{ backgroundColor: 'oklch(0.18 0.008 0)' }}>
              <p className="font-label text-xs mb-3" style={{ color:'oklch(0.46 0.20 25)',letterSpacing:'0.18em' }}>GET STARTED TODAY</p>
              <h3 className="font-display text-white mb-4" style={{ fontSize:'1.6rem' }}>Schedule Your Fall Services in Bend</h3>
              <p className="font-body mb-6" style={{ color:'oklch(0.72 0.005 0)',lineHeight:1.7 }}>Fall slots fill up fast — especially for sprinkler winterization. Contact us now to get on our schedule.</p>
              <Link href="/contact"><span className="btn-red inline-block">Schedule Fall Services →</span></Link>
              <p className="mt-4 text-sm" style={{ color:'oklch(0.60 0.005 0)' }}>Or call us: (541) 617-8873</p>
            </div>

            <div className="mt-12 pt-10" style={{ borderTop: '1px solid oklch(0.88 0.005 0)' }}>
              <p className="font-label mb-2" style={{ color: 'oklch(0.46 0.20 25)', fontSize: '0.62rem', letterSpacing: '0.18em' }}>YOU MIGHT ALSO LIKE</p>
              <h2 className="font-display font-light mb-6" style={{ fontSize: 'clamp(1.3rem, 2vw, 1.8rem)', color: 'oklch(0.15 0.005 0)' }}>More Helpful Guides</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Link href="/resources/sprinkler-winterization-guide-bend-oregon"><span style={{ display:'block',padding:'1.1rem 1.25rem',backgroundColor:'oklch(1 0 0)',borderLeft:'3px solid oklch(0.46 0.20 25)',textDecoration:'none' }}><div className="font-body" style={{ color:'oklch(0.22 0.008 30)',fontWeight:600,fontSize:'0.85rem',marginBottom:'0.3rem' }}>Sprinkler Winterization Guide</div><div className="font-body" style={{ color:'oklch(0.50 0.008 30)',fontSize:'0.75rem',fontWeight:300,lineHeight:1.5 }}>Step-by-step winterization guide for Bend homeowners.</div></span></Link>
                <Link href="/resources/when-to-aerate-lawn-bend-oregon"><span style={{ display:'block',padding:'1.1rem 1.25rem',backgroundColor:'oklch(1 0 0)',borderLeft:'3px solid oklch(0.46 0.20 25)',textDecoration:'none' }}><div className="font-body" style={{ color:'oklch(0.22 0.008 30)',fontWeight:600,fontSize:'0.85rem',marginBottom:'0.3rem' }}>When to Aerate Your Lawn in Bend</div><div className="font-body" style={{ color:'oklch(0.50 0.008 30)',fontSize:'0.75rem',fontWeight:300,lineHeight:1.5 }}>Best timing for aeration in Central Oregon.</div></span></Link>
                <Link href="/resources/lawn-maintenance-cost-bend-oregon"><span style={{ display:'block',padding:'1.1rem 1.25rem',backgroundColor:'oklch(1 0 0)',borderLeft:'3px solid oklch(0.46 0.20 25)',textDecoration:'none' }}><div className="font-body" style={{ color:'oklch(0.22 0.008 30)',fontWeight:600,fontSize:'0.85rem',marginBottom:'0.3rem' }}>Lawn Maintenance Cost in Bend</div><div className="font-body" style={{ color:'oklch(0.50 0.008 30)',fontSize:'0.75rem',fontWeight:300,lineHeight:1.5 }}>What lawn care services cost in Central Oregon.</div></span></Link>
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
