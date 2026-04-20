import Navbar from '@/components/Navbar';
import SEO from '@/components/SEO';
import { BreadcrumbSchema, FAQSchema } from '@/components/SchemaMarkup';
import { Link } from 'wouter';

export default function HowToReadLandscapeProposal() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: 'oklch(0.97 0.003 0)' }}>
      <SEO
        title="How to Read a Landscape Proposal in Bend, OR | Newport Ave"
        description="How to evaluate a landscape proposal in Bend, Oregon. What to look for, red flags, and how to compare bids from Central Oregon landscapers."
        canonical="https://newportavelandscaping.com/resources/how-to-read-landscape-proposal-bend-oregon"
      />
      <BreadcrumbSchema items={[
        { name: 'Home', url: '/' },
        { name: 'Resources', url: '/resources' },
        { name: 'How to Read and Evaluate a Landscape Proposal in Bend', url: '/resources/how-to-read-landscape-proposal-bend-oregon' },
      ]} />
      <FAQSchema faqs={[
        { question: `What should a landscape proposal for Bend, Oregon, include regarding local climate and soil?`, answer: `A comprehensive landscape proposal for Bend should detail how plant selections and irrigation systems are suited for our unique climate Zone 6a, volcanic soil, and average 11 inches of annual rainfall. It should also address strategies for managing freeze-thaw cycles to protect hardscaping and plant health.` },
        { question: `How do I ensure my landscape proposal addresses Bend's specific water conservation guidelines?`, answer: `Your proposal should clearly outline water-wise landscaping practices, such as xeriscaping principles and efficient irrigation methods like drip systems. In Bend, adhering to local water conservation guidelines is crucial, and a good proposal will reflect this commitment to sustainability.` },
        { question: `What permits are typically required for landscaping projects in Bend, and will my proposal cover them?`, answer: `For many landscaping projects in Bend, especially those involving significant changes to grading, irrigation, or structures, permits from the City of Bend may be necessary. A professional landscape proposal should specify which permits are needed and clarify who is responsible for obtaining them.` },
        { question: `How can I compare different landscape proposals effectively in the Bend area?`, answer: `When comparing proposals in Bend, look beyond just the price. Evaluate the scope of work, material quality, warranty information, and the contractor's experience with local conditions. Newport Avenue Landscaping ensures transparent and detailed proposals, making it easier for clients to understand every aspect of their project.` },
        { question: `What are common red flags to look for when reviewing a landscape proposal in Central Oregon?`, answer: `Be wary of proposals that lack detail, omit local considerations like volcanic soil or freeze-thaw cycles, or don't include a clear timeline and payment schedule. Unusually low bids might also indicate a lack of quality or hidden costs down the line.` },
        { question: `Does Newport Avenue Landscaping offer design revisions as part of their proposal process?`, answer: `Yes, Newport Avenue Landscaping understands that a landscape project is a collaborative effort. Our proposals typically include provisions for design revisions to ensure the final plan perfectly aligns with your vision and budget, while also considering Bend's specific environmental factors.` },
      ]} />
      <Navbar />
      <div style={{ paddingTop: '204px' }}>
        <div className="relative flex items-center justify-center" style={{ height:'380px',backgroundImage:'url(/manus-storage/facility-showroom_fd5f40e4.webp',backgroundSize:'cover',backgroundPosition:'center 50%' }}>
          <div className="absolute inset-0" style={{ backgroundColor: 'oklch(0 0 0 / 0.55)' }} />
          <div className="relative text-center container">
            <p className="font-label mb-3" style={{ color:'oklch(0.72 0.12 25)',fontSize:'0.7rem',letterSpacing:'0.18em' }}>CONSUMER GUIDE · BEND, OREGON &middot; 2024</p>
            <h1 className="font-display text-white" style={{ fontSize:'clamp(1.8rem, 4vw, 3rem)',maxWidth:'700px',margin:'0 auto' }}>How to Read and Evaluate a Landscape Proposal in Bend</h1>
          </div>
        </div>
        <div className="container py-16 max-w-3xl mx-auto">
          <div style={{ color: 'oklch(0.25 0.005 0)' }}>
            <p className="mb-8" style={{ fontSize:'1.05rem',lineHeight:1.85,color:'oklch(0.35 0.005 0)' }}>Getting multiple landscape proposals is smart — but only if you know how to compare them. A low bid isn't always a good deal, and a high bid isn't always better quality. Here's how to read a landscape proposal and make a confident decision.</p>

            <h2 className="text-3xl font-bold mb-4" style={{ color: 'oklch(0.25 0.005 0)' }}>What a Good Landscape Proposal Should Include</h2>
            <ul className="list-disc pl-5 mb-8 space-y-1">
              <li>Detailed scope of work — specific materials, quantities, and specifications</li>
              <li>Material specifications — brand, type, size, and color of pavers, plants, etc.</li>
              <li>Base preparation details — depth of gravel base, type of sand, edge restraints</li>
              <li>Timeline — start date, estimated completion, and milestone schedule</li>
              <li>Payment schedule — tied to project milestones, not arbitrary dates</li>
              <li>Warranty terms — what's covered, for how long, and what's excluded</li>
              <li>License and insurance information</li>
              <li>Change order process — how changes are documented and priced</li>
            </ul>

            <h2 className="text-3xl font-bold mb-4" style={{ color: 'oklch(0.25 0.005 0)' }}>Red Flags in a Landscape Proposal</h2>
            <ul className="list-disc pl-5 mb-8 space-y-1">
              <li>Vague scope ("install patio as discussed") with no specifications</li>
              <li>No material brands or specifications listed</li>
              <li>Large upfront payment required (more than 30%)</li>
              <li>No warranty or a warranty with many exclusions</li>
              <li>Timeline that seems unrealistically fast</li>
              <li>No mention of permits for work that requires them</li>
              <li>Proposal sent via text message or email with no formal document</li>
            </ul>

            <h2 className="text-3xl font-bold mb-4" style={{ color: 'oklch(0.25 0.005 0)' }}>How to Compare Multiple Bids</h2>
            <p className="mb-4">When comparing bids, make sure you're comparing the same scope of work. A bid that's $5,000 lower might be using thinner pavers, a shallower base, or cheaper plants.</p>
            <p className="mb-4">Ask each contractor to specify exactly what's included. If one bid is significantly lower, ask why — sometimes it's efficiency, but often it's corners being cut.</p>
            <div className="bg-gray-100 p-6 rounded-lg mb-8 border-l-4" style={{ borderColor: 'oklch(0.46 0.20 25)' }}>
              <p className="font-bold text-lg mb-2" style={{ color: 'oklch(0.25 0.005 0)' }}>PRO TIP</p>
              <p>The cheapest bid is rarely the best value. In landscaping, the cost of fixing poor work almost always exceeds the savings from the lower initial price. Focus on value — quality materials, experienced crew, and a solid warranty.</p>
            </div>
            <div className="p-8 text-center mt-12" style={{ backgroundColor: 'oklch(0.18 0.008 0)' }}>
              <p className="font-label text-xs mb-3" style={{ color:'oklch(0.46 0.20 25)',letterSpacing:'0.18em' }}>GET STARTED TODAY</p>
              <h3 className="font-display text-white mb-4" style={{ fontSize:'1.6rem' }}>Get a Detailed, Transparent Proposal from Newport Avenue</h3>
              <p className="font-body mb-6" style={{ color:'oklch(0.72 0.005 0)',lineHeight:1.7 }}>Our proposals include full material specifications, detailed scope, timeline, and warranty terms. No vague language, no surprises.</p>
              <Link href="/contact"><span className="btn-red inline-block">Request Your Free Proposal →</span></Link>
              <p className="mt-4 text-sm" style={{ color:'oklch(0.60 0.005 0)' }}>Or call us: (541) 617-8873</p>
            </div>

            <div className="mt-12 pt-10" style={{ borderTop: '1px solid oklch(0.88 0.005 0)' }}>
              <p className="font-label mb-2" style={{ color: 'oklch(0.46 0.20 25)', fontSize: '0.62rem', letterSpacing: '0.18em' }}>YOU MIGHT ALSO LIKE</p>
              <h2 className="font-display font-light mb-6" style={{ fontSize: 'clamp(1.3rem, 2vw, 1.8rem)', color: 'oklch(0.15 0.005 0)' }}>More Helpful Guides</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Link href="/resources/how-to-choose-landscaper-bend-oregon"><span style={{ display:'block',padding:'1.1rem 1.25rem',backgroundColor:'oklch(1 0 0)',borderLeft:'3px solid oklch(0.46 0.20 25)',textDecoration:'none' }}><div className="font-body" style={{ color:'oklch(0.22 0.008 30)',fontWeight:600,fontSize:'0.85rem',marginBottom:'0.3rem' }}>How to Choose a Landscaper in Bend</div><div className="font-body" style={{ color:'oklch(0.50 0.008 30)',fontSize:'0.75rem',fontWeight:300,lineHeight:1.5 }}>Questions to ask and red flags to avoid.</div></span></Link>
                <Link href="/resources/landscape-design-cost-bend-oregon"><span style={{ display:'block',padding:'1.1rem 1.25rem',backgroundColor:'oklch(1 0 0)',borderLeft:'3px solid oklch(0.46 0.20 25)',textDecoration:'none' }}><div className="font-body" style={{ color:'oklch(0.22 0.008 30)',fontWeight:600,fontSize:'0.85rem',marginBottom:'0.3rem' }}>Landscape Design Cost in Bend</div><div className="font-body" style={{ color:'oklch(0.50 0.008 30)',fontSize:'0.75rem',fontWeight:300,lineHeight:1.5 }}>Full-yard design and installation pricing.</div></span></Link>
                <Link href="/resources/professional-vs-diy-landscaping-bend-oregon"><span style={{ display:'block',padding:'1.1rem 1.25rem',backgroundColor:'oklch(1 0 0)',borderLeft:'3px solid oklch(0.46 0.20 25)',textDecoration:'none' }}><div className="font-body" style={{ color:'oklch(0.22 0.008 30)',fontWeight:600,fontSize:'0.85rem',marginBottom:'0.3rem' }}>Professional vs. DIY Landscaping</div><div className="font-body" style={{ color:'oklch(0.50 0.008 30)',fontSize:'0.75rem',fontWeight:300,lineHeight:1.5 }}>When to hire a pro and when to DIY.</div></span></Link>
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
