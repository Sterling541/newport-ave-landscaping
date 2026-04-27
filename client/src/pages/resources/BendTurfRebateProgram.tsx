import Navbar from '@/components/Navbar';
import SEO from '@/components/SEO';
import { BreadcrumbSchema, FAQSchema } from '@/components/SchemaMarkup';
import { Link } from 'wouter';

export default function BendTurfRebateProgram() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: 'oklch(0.97 0.003 0)' }}>
      <SEO
        title="Bend Turf Rebate Program | Newport Ave Landscaping"
        description="How to get rebates for converting your Bend lawn to xeriscape. The City of Bend's turf replacement program explained."
        canonical="https://newportavelandscaping.com/resources/bend-turf-rebate-program"
      />
      <BreadcrumbSchema items={[
        { name: 'Home', url: '/' },
        { name: 'Resources', url: '/resources' },
        { name: 'Bend Turf Rebate Program: Get Paid to Xeriscape', url: '/resources/bend-turf-rebate-program' },
      ]} />
      <FAQSchema faqs={[
        { question: `What is the Bend Turf Rebate Program and how can it benefit me?`, answer: `The Bend Turf Rebate Program offers City of Bend water customers $3 per square foot, up to a maximum of $3,000, to remove traditional grass lawns and replace them with water-efficient xeriscaping. This program helps conserve water in our high desert climate and provides financial incentives for creating a more sustainable landscape that thrives in Bend's unique conditions.` },
        { question: `What are the advantages of xeriscaping in Bend, Oregon's climate?`, answer: `Xeriscaping is highly beneficial for Bend's climate, characterized by USDA Hardiness Zone 6a/6b, volcanic soil, and only about 11 inches of annual rainfall. It significantly reduces water usage, requires less maintenance, and helps plants withstand our common freeze-thaw cycles. This approach creates resilient landscapes perfectly suited to Central Oregon.` },
        { question: `What types of plants are best for xeriscaping in Bend's volcanic soil?`, answer: `For xeriscaping in Bend's volcanic soil, consider native and drought-tolerant plants that are adapted to our specific conditions. Examples include various sages, lavender, penstemon, and certain ornamental grasses. These plants not only thrive with minimal water but also complement the natural beauty of the Central Oregon landscape.` },
        { question: `How does the Bend Turf Rebate Program support water conservation efforts in Central Oregon?`, answer: `The Bend Turf Rebate Program is a crucial part of Central Oregon's water conservation strategy, encouraging residents to replace thirsty lawns with low-water landscapes. Given our limited 11 inches of annual rainfall and increasing population, reducing outdoor water use is essential. This initiative helps protect our precious water resources for future generations.` },
        { question: `Can Newport Avenue Landscaping help me with my Bend Turf Rebate Program project?`, answer: `Yes, Newport Avenue Landscaping specializes in designing and installing beautiful, water-wise landscapes that qualify for the Bend Turf Rebate Program. With over 21 years of experience in Bend, we understand the local climate, volcanic soil, and freeze-thaw cycles, ensuring your xeriscape project is successful and maximizes your rebate potential.` },
        { question: `What should I consider when planning a xeriscape conversion in Bend, given the local weather patterns?`, answer: `When planning a xeriscape conversion in Bend, it's important to select plants that can tolerate our USDA Zone 6a/6b temperatures and adapt to the volcanic soil and low annual rainfall. Consider the impact of freeze-thaw cycles on plant selection and ensure proper drainage. Newport Avenue Landscaping can guide you through these considerations to create a thriving, low-maintenance landscape.` },
      ]} />
      <Navbar />
      <div style={{ paddingTop: '204px' }}>
        <div className="relative flex items-center justify-center" style={{ height:'380px',backgroundImage:'url(/manus-storage/safe-hero-lawn-service_fcba45d8.jpg)',backgroundSize:'cover',backgroundPosition:'center 50%' }}>
          <div className="absolute inset-0" style={{ backgroundColor: 'oklch(0 0 0 / 0.55)' }} />
          <div className="relative text-center container">
            <p className="font-label mb-3" style={{ color:'oklch(0.72 0.12 25)',fontSize:'0.7rem',letterSpacing:'0.18em' }}>WATER CONSERVATION · BEND, OREGON &middot; 2024</p>
            <h1 className="font-display text-white" style={{ fontSize:'clamp(1.8rem, 4vw, 3rem)',maxWidth:'700px',margin:'0 auto' }}>Bend Turf Rebate Program: Get Paid to Xeriscape</h1>
          </div>
        </div>
        <div className="container py-16 max-w-3xl mx-auto">
          <div style={{ color: 'oklch(0.25 0.005 0)' }}>
            <p className="mb-8" style={{ fontSize:'1.05rem',lineHeight:1.85,color:'oklch(0.35 0.005 0)' }}>The City of Bend's water utility offers rebates to homeowners who convert irrigated turf to water-wise landscaping. It's one of the best financial incentives available for Bend homeowners, and we help our clients navigate the application process as part of every xeriscape project. Here's everything you need to know.</p>

            <h2 className="text-3xl font-bold mb-4" style={{ color: 'oklch(0.25 0.005 0)' }}>How the Bend Turf Rebate Works</h2>
            <p className="mb-4">The program pays homeowners a per-square-foot rebate for removing irrigated turf and replacing it with water-wise landscaping. Rebate amounts vary by program year and available funding, but have historically ranged from $0.50 to $1.00 per square foot.</p>
            <p className="mb-8">On a typical front yard conversion (1,000–2,000 square feet), the rebate can be $500–$2,000 — a meaningful offset against the cost of xeriscape installation.</p>

            <h2 className="text-3xl font-bold mb-4" style={{ color: 'oklch(0.25 0.005 0)' }}>Eligibility Requirements</h2>
            <ul className="list-disc pl-5 mb-8 space-y-1">
              <li>Property must be within the City of Bend water service area</li>
              <li>Turf must be actively irrigated (not already dead)</li>
              <li>Replacement landscaping must meet program requirements (no bare soil, no invasive plants)</li>
              <li>Application must be submitted and approved BEFORE removing turf</li>
              <li>Post-installation inspection required to receive rebate payment</li>
            </ul>

            <h2 className="text-3xl font-bold mb-4" style={{ color: 'oklch(0.25 0.005 0)' }}>How Newport Avenue Helps with the Rebate Process</h2>
            <p className="mb-4">We've helped dozens of Bend homeowners successfully navigate the turf rebate program. We know the requirements, the application process, and what the inspectors look for.</p>
            <p className="mb-4">When you hire us for a xeriscape project, we handle the pre-application documentation, ensure our installation meets program requirements, and help you prepare for the post-installation inspection.</p>
            <div className="bg-gray-100 p-6 rounded-lg mb-8 border-l-4" style={{ borderColor: 'oklch(0.46 0.20 25)' }}>
              <p className="font-bold text-lg mb-2" style={{ color: 'oklch(0.25 0.005 0)' }}>PRO TIP</p>
              <p>Rebate programs have annual funding limits and close when funds run out. Apply early in the calendar year — typically January or February — for the best chance of receiving a rebate. Don't wait until summer.</p>
            </div>
            <div className="p-8 text-center mt-12" style={{ backgroundColor: 'oklch(0.18 0.008 0)' }}>
              <p className="font-label text-xs mb-3" style={{ color:'oklch(0.46 0.20 25)',letterSpacing:'0.18em' }}>GET STARTED TODAY</p>
              <h3 className="font-display text-white mb-4" style={{ fontSize:'1.6rem' }}>Get a Free Xeriscape Consultation and Rebate Guidance</h3>
              <p className="font-body mb-6" style={{ color:'oklch(0.72 0.005 0)',lineHeight:1.7 }}>We'll help you design a beautiful xeriscape and navigate the Bend turf rebate program to maximize your savings.</p>
              <Link href="/contact"><span className="btn-red inline-block">Schedule Your Free Consultation →</span></Link>
              <p className="mt-4 text-sm" style={{ color:'oklch(0.60 0.005 0)' }}>Or call us: (541) 617-8873</p>
            </div>

            <div className="mt-12 pt-10" style={{ borderTop: '1px solid oklch(0.88 0.005 0)' }}>
              <p className="font-label mb-2" style={{ color: 'oklch(0.46 0.20 25)', fontSize: '0.62rem', letterSpacing: '0.18em' }}>YOU MIGHT ALSO LIKE</p>
              <h2 className="font-display font-light mb-6" style={{ fontSize: 'clamp(1.3rem, 2vw, 1.8rem)', color: 'oklch(0.15 0.005 0)' }}>More Helpful Guides</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Link href="/resources/xeriscape-cost-bend-oregon"><span style={{ display:'block',padding:'1.1rem 1.25rem',backgroundColor:'oklch(1 0 0)',borderLeft:'3px solid oklch(0.46 0.20 25)',textDecoration:'none' }}><div className="font-body" style={{ color:'oklch(0.22 0.008 30)',fontWeight:600,fontSize:'0.85rem',marginBottom:'0.3rem' }}>Xeriscape Cost in Bend</div><div className="font-body" style={{ color:'oklch(0.50 0.008 30)',fontSize:'0.75rem',fontWeight:300,lineHeight:1.5 }}>What water-wise landscaping costs in Central Oregon.</div></span></Link>
                <Link href="/resources/faq-xeriscape-bend-oregon"><span style={{ display:'block',padding:'1.1rem 1.25rem',backgroundColor:'oklch(1 0 0)',borderLeft:'3px solid oklch(0.46 0.20 25)',textDecoration:'none' }}><div className="font-body" style={{ color:'oklch(0.22 0.008 30)',fontWeight:600,fontSize:'0.85rem',marginBottom:'0.3rem' }}>Xeriscape FAQ</div><div className="font-body" style={{ color:'oklch(0.50 0.008 30)',fontSize:'0.75rem',fontWeight:300,lineHeight:1.5 }}>Common questions about xeriscape in Bend.</div></span></Link>
                <Link href="/resources/best-plants-xeriscape-central-oregon"><span style={{ display:'block',padding:'1.1rem 1.25rem',backgroundColor:'oklch(1 0 0)',borderLeft:'3px solid oklch(0.46 0.20 25)',textDecoration:'none' }}><div className="font-body" style={{ color:'oklch(0.22 0.008 30)',fontWeight:600,fontSize:'0.85rem',marginBottom:'0.3rem' }}>Best Plants for Xeriscaping</div><div className="font-body" style={{ color:'oklch(0.50 0.008 30)',fontSize:'0.75rem',fontWeight:300,lineHeight:1.5 }}>Drought-tolerant plants for Central Oregon.</div></span></Link>
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
