import Navbar from '@/components/Navbar';
import SEO from '@/components/SEO';
import { BreadcrumbSchema, FAQSchema } from '@/components/SchemaMarkup';
import { Link } from 'wouter';

export default function SprinklerWinterizationGuideBend() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: 'oklch(0.97 0.003 0)' }}>
      <SEO
        title="Sprinkler Winterization Guide for Bend, OR | Newport Ave"
        description="How to winterize your sprinkler system in Bend, Oregon. Step-by-step guide to protecting your irrigation system from freeze damage."
        canonical="https://newportavelandscaping.com/resources/sprinkler-winterization-guide-bend-oregon"
      />
      <BreadcrumbSchema items={[
        { name: 'Home', url: '/' },
        { name: 'Resources', url: '/resources' },
        { name: 'Sprinkler Winterization Guide for Bend, Oregon', url: '/resources/sprinkler-winterization-guide-bend-oregon' },
      ]} />
      <FAQSchema faqs={[
        { question: `When should I winterize my sprinklers in Bend, Oregon?`, answer: `In Bend, Oregon, it's crucial to winterize your sprinkler system before the first hard freeze, typically by mid-October. Given Bend's climate Zone 6a and significant freeze-thaw cycles, waiting too long can lead to costly damage from frozen pipes.` },
        { question: `What happens if I don't winterize my sprinkler system in Bend?`, answer: `Failing to winterize your sprinkler system in Bend can result in severe damage due to freezing water expanding in pipes, valves, and sprinkler heads. The unique volcanic soil in Central Oregon doesn't offer much insulation, making proper winterization essential to prevent burst components and expensive repairs.` },
        { question: `Can I winterize my own sprinklers in Bend, or should I hire a professional?`, answer: `While some homeowners attempt DIY winterization, it's highly recommended to hire a professional for sprinkler blowouts in Bend. Improperly clearing all water from the system, especially with our 11" annual rainfall, can leave residual moisture that freezes and damages components. Newport Avenue Landscaping offers expert winterization services to ensure your system is protected.` },
        { question: `What is the 'blowout' method for sprinkler winterization?`, answer: `The 'blowout' method involves using an air compressor to force all water out of your sprinkler lines. This is the most effective way to prevent freeze damage in areas like Bend, where temperatures consistently drop below freezing. It's important to use the correct air pressure to avoid damaging your system.` },
        { question: `How much does sprinkler winterization cost in Bend, Oregon?`, answer: `The cost of sprinkler winterization in Bend can vary depending on the size and complexity of your system. Factors like the number of zones and accessibility of components can influence the price. It's a small investment compared to the potential repair costs of a damaged system.` },
        { question: `Does Newport Avenue Landscaping offer sprinkler winterization services in Bend?`, answer: `Yes, Newport Avenue Landscaping provides comprehensive sprinkler winterization services throughout Bend and Central Oregon. Our experienced technicians understand the local climate challenges, including the volcanic soil and freeze-thaw cycles, ensuring your irrigation system is properly prepared for winter and ready for spring.` },
      ]} />
      <Navbar />
      <div style={{ paddingTop: '204px' }}>
        <div className="relative flex items-center justify-center" style={{ height:'380px',backgroundImage:'url(https://files.manuscdn.com/user_upload_by_module/session_file/310519663503028182/QuZbCMdvWnmWDtAV.jpg',backgroundSize:'cover',backgroundPosition:'center 50%' }}>
          <div className="absolute inset-0" style={{ backgroundColor: 'oklch(0 0 0 / 0.55)' }} />
          <div className="relative text-center container">
            <p className="font-label mb-3" style={{ color:'oklch(0.72 0.12 25)',fontSize:'0.7rem',letterSpacing:'0.18em' }}>IRRIGATION GUIDE · BEND, OREGON &middot; 2024</p>
            <h1 className="font-display text-white" style={{ fontSize:'clamp(1.8rem, 4vw, 3rem)',maxWidth:'700px',margin:'0 auto' }}>Sprinkler Winterization Guide for Bend, Oregon</h1>
          </div>
        </div>
        <div className="container py-16 max-w-3xl mx-auto">
          <div style={{ color: 'oklch(0.25 0.005 0)' }}>
            <p className="mb-8" style={{ fontSize:'1.05rem',lineHeight:1.85,color:'oklch(0.35 0.005 0)' }}>Sprinkler winterization is the most important irrigation task of the year in Bend. Our hard freezes — which can hit as early as October 1st — will crack pipes, fittings, and backflow preventers if water is left in your system. Here's everything you need to know about protecting your irrigation system for winter.</p>

            <h2 className="text-3xl font-bold mb-4" style={{ color: 'oklch(0.25 0.005 0)' }}>When to Winterize Your Sprinklers in Bend</h2>
            <p className="mb-4">We recommend scheduling your sprinkler blowout before October 15th — the average first hard freeze date in Bend. Don't wait until a freeze is forecast; we fill up fast and can't always accommodate last-minute requests.</p>
            <p className="mb-8">The earliest we've seen a hard freeze in Bend is September 28th. If you have a fall trip planned, schedule your blowout before you leave — don't risk it.</p>

            <h2 className="text-3xl font-bold mb-4" style={{ color: 'oklch(0.25 0.005 0)' }}>What Happens During a Sprinkler Blowout</h2>
            <p className="mb-4">A professional blowout uses a commercial air compressor (50–100 CFM) to force all water out of your irrigation lines. We connect to your system at the backflow preventer and blow out each zone individually.</p>
            <p className="mb-4">The process takes 20–45 minutes for a typical residential system. We run each zone 2–3 times to ensure all water is expelled.</p>
            <div className="bg-gray-100 p-6 rounded-lg mb-8 border-l-4" style={{ borderColor: 'oklch(0.46 0.20 25)' }}>
              <p className="font-bold text-lg mb-2" style={{ color: 'oklch(0.25 0.005 0)' }}>PRO TIP</p>
              <p>Don't attempt to blow out your own system with a small shop compressor. Residential compressors don't have enough volume (CFM) to properly clear the lines, and over-pressurizing can damage heads and fittings. Use a professional with the right equipment.</p>
            </div>

            <h2 className="text-3xl font-bold mb-4" style={{ color: 'oklch(0.25 0.005 0)' }}>What Freeze Damage Looks Like</h2>
            <p className="mb-4">If your system wasn't properly winterized and you're seeing problems in spring, look for: wet spots in the lawn when the system isn't running, zones that won't pressurize, visible cracks in PVC pipe or fittings, or a backflow preventer that's cracked or leaking.</p>
            <p className="mb-8">Freeze damage repair costs typically run $500–$2,000 depending on the extent of damage. A $140/tech hour blowout service is the best insurance you can buy.</p>
            <div className="p-8 text-center mt-12" style={{ backgroundColor: 'oklch(0.18 0.008 0)' }}>
              <p className="font-label text-xs mb-3" style={{ color:'oklch(0.46 0.20 25)',letterSpacing:'0.18em' }}>GET STARTED TODAY</p>
              <h3 className="font-display text-white mb-4" style={{ fontSize:'1.6rem' }}>Schedule Your Sprinkler Winterization in Bend</h3>
              <p className="font-body mb-6" style={{ color:'oklch(0.72 0.005 0)',lineHeight:1.7 }}>Our irrigation team provides blowout service throughout Bend and Central Oregon. Book before October 15th to guarantee your spot.</p>
              <Link href="/contact"><span className="btn-red inline-block">Schedule Your Sprinkler Blowout →</span></Link>
              <p className="mt-4 text-sm" style={{ color:'oklch(0.60 0.005 0)' }}>Or call us: (541) 617-8873</p>
            </div>

            <div className="mt-12 pt-10" style={{ borderTop: '1px solid oklch(0.88 0.005 0)' }}>
              <p className="font-label mb-2" style={{ color: 'oklch(0.46 0.20 25)', fontSize: '0.62rem', letterSpacing: '0.18em' }}>YOU MIGHT ALSO LIKE</p>
              <h2 className="font-display font-light mb-6" style={{ fontSize: 'clamp(1.3rem, 2vw, 1.8rem)', color: 'oklch(0.15 0.005 0)' }}>More Helpful Guides</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Link href="/resources/sprinkler-system-cost-bend-oregon"><span style={{ display:'block',padding:'1.1rem 1.25rem',backgroundColor:'oklch(1 0 0)',borderLeft:'3px solid oklch(0.46 0.20 25)',textDecoration:'none' }}><div className="font-body" style={{ color:'oklch(0.22 0.008 30)',fontWeight:600,fontSize:'0.85rem',marginBottom:'0.3rem' }}>Sprinkler System Cost in Bend</div><div className="font-body" style={{ color:'oklch(0.50 0.008 30)',fontSize:'0.75rem',fontWeight:300,lineHeight:1.5 }}>New system installation pricing.</div></span></Link>
                <Link href="/resources/irrigation-repair-bend-oregon"><span style={{ display:'block',padding:'1.1rem 1.25rem',backgroundColor:'oklch(1 0 0)',borderLeft:'3px solid oklch(0.46 0.20 25)',textDecoration:'none' }}><div className="font-body" style={{ color:'oklch(0.22 0.008 30)',fontWeight:600,fontSize:'0.85rem',marginBottom:'0.3rem' }}>Irrigation Repair in Bend</div><div className="font-body" style={{ color:'oklch(0.50 0.008 30)',fontSize:'0.75rem',fontWeight:300,lineHeight:1.5 }}>Common issues and repair costs.</div></span></Link>
                <Link href="/resources/fall-landscaping-guide-bend-oregon"><span style={{ display:'block',padding:'1.1rem 1.25rem',backgroundColor:'oklch(1 0 0)',borderLeft:'3px solid oklch(0.46 0.20 25)',textDecoration:'none' }}><div className="font-body" style={{ color:'oklch(0.22 0.008 30)',fontWeight:600,fontSize:'0.85rem',marginBottom:'0.3rem' }}>Fall Landscaping Guide</div><div className="font-body" style={{ color:'oklch(0.50 0.008 30)',fontSize:'0.75rem',fontWeight:300,lineHeight:1.5 }}>Complete fall checklist for Bend homeowners.</div></span></Link>
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
