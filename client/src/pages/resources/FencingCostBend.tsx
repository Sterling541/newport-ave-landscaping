import Navbar from '@/components/Navbar';
import SEO from '@/components/SEO';
import { BreadcrumbSchema, FAQSchema } from '@/components/SchemaMarkup';
import { Link } from 'wouter';

export default function FencingCostBend() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: 'oklch(0.97 0.003 0)' }}>
      <SEO
        title="Fencing Cost in Bend, OR | Newport Ave Landscaping"
        description="What fencing costs in Bend, Oregon. Wood, vinyl, and metal fence pricing for Central Oregon properties."
        canonical="https://newportavelandscaping.com/resources/fencing-cost-bend-oregon"
      />
      <BreadcrumbSchema items={[
        { name: 'Home', url: '/' },
        { name: 'Resources', url: '/resources' },
        { name: 'Fencing Cost in Bend, Oregon: What to Expect', url: '/resources/fencing-cost-bend-oregon' },
      ]} />
      <FAQSchema faqs={[
        { question: `What factors influence the cost of fencing in Bend, Oregon?`, answer: `The cost of fencing in Bend, Oregon, is influenced by several factors, including the type of material chosen, the length and height of the fence, and the complexity of the installation. Local conditions like Bend's volcanic soil can also impact labor costs due to more challenging digging. Additionally, permit requirements for taller fences can add to the overall expense.` },
        { question: `What are the best fencing materials for Bend's climate and soil?`, answer: `For Bend's climate Zone 6a, with its freeze-thaw cycles and volcanic soil, durable materials are essential. Western Red Cedar is a popular choice due to its natural resistance to rot and insects, performing well in the region's 11-inch annual rainfall. Galvanized steel is another robust option, offering longevity and minimal maintenance against the elements.` },
        { question: `Do I need a permit to build a fence in Bend, Oregon?`, answer: `In Bend, a building permit is generally required for fences exceeding 7 feet in height. There are also specific setback regulations, such as a 42-inch height limit for fences within the 20-foot front yard setback. It's always best to check with the City of Bend's planning department or consult with a professional like Newport Avenue Landscaping to ensure compliance with local codes.` },
        { question: `How does Bend's volcanic soil affect fence installation?`, answer: `Bend's volcanic soil, characterized by its rocky and often hard composition, can significantly impact fence installation. Digging post holes can be more labor-intensive and may require specialized equipment, potentially increasing installation time and cost. Proper post-setting techniques are crucial to ensure stability and longevity in these challenging ground conditions.` },
        { question: `What is the typical lifespan of a fence installed in Central Oregon?`, answer: `The lifespan of a fence in Central Oregon largely depends on the material, quality of installation, and maintenance. A well-installed Western Red Cedar fence can last 15-20 years or more with proper care, while galvanized steel fences can last even longer. Newport Avenue Landscaping ensures that all installations are built to withstand Bend's unique weather patterns and soil conditions, maximizing durability.` },
        { question: `Are there eco-friendly fencing options suitable for Bend?`, answer: `Yes, there are several eco-friendly fencing options suitable for Bend. Recycled composite materials offer a sustainable alternative to traditional wood, requiring less maintenance and having a longer lifespan. Locally sourced wood, like Western Red Cedar, can also be considered eco-friendly due to reduced transportation impacts and its natural biodegradability.` },
      ]} />
      <Navbar />
      <div style={{ paddingTop: '204px' }}>
        <div className="relative flex items-center justify-center" style={{ height:'380px',backgroundImage:'url(https://d2xsxph8kpxj0f.cloudfront.net/310519663503028182/g3pw3MRUapabcDUbhBEFxx/ITP_7558_e52a40c9.jpg',backgroundSize:'cover',backgroundPosition:'center 50%' }}>
          <div className="absolute inset-0" style={{ backgroundColor: 'oklch(0 0 0 / 0.55)' }} />
          <div className="relative text-center container">
            <p className="font-label mb-3" style={{ color:'oklch(0.72 0.12 25)',fontSize:'0.7rem',letterSpacing:'0.18em' }}>PROPERTY GUIDE · BEND, OREGON &middot; 2024</p>
            <h1 className="font-display text-white" style={{ fontSize:'clamp(1.8rem, 4vw, 3rem)',maxWidth:'700px',margin:'0 auto' }}>Fencing Cost in Bend, Oregon: What to Expect</h1>
          </div>
        </div>
        <div className="container py-16 max-w-3xl mx-auto">
          <div style={{ color: 'oklch(0.25 0.005 0)' }}>
            <p className="mb-8" style={{ fontSize:'1.05rem',lineHeight:1.85,color:'oklch(0.35 0.005 0)' }}>A new fence can transform your Bend property — adding privacy, defining spaces, and completing your landscape design. Fencing costs in Central Oregon vary widely based on material, height, and linear footage. Here's what you can expect to pay.</p>

            <h2 className="text-3xl font-bold mb-4" style={{ color: 'oklch(0.25 0.005 0)' }}>Fencing Cost in Bend by Material</h2>
            <div className="overflow-x-auto mb-8"><table className="min-w-full bg-white border border-gray-300"><thead><tr><th className="py-2 px-4 border-b text-left">Fence Type</th><th className="py-2 px-4 border-b text-left">Cost per Linear Foot</th><th className="py-2 px-4 border-b text-left">Lifespan in Bend</th></tr></thead><tbody><tr><td className="py-2 px-4 border-b">Wood (cedar)</td><td className="py-2 px-4 border-b">$25–$45</td><td className="py-2 px-4 border-b">15–25 years</td></tr>
                  <tr><td className="py-2 px-4 border-b">Vinyl/PVC</td><td className="py-2 px-4 border-b">$30–$55</td><td className="py-2 px-4 border-b">25–40 years</td></tr>
                  <tr><td className="py-2 px-4 border-b">Aluminum</td><td className="py-2 px-4 border-b">$25–$40</td><td className="py-2 px-4 border-b">30–50 years</td></tr>
                  <tr><td className="py-2 px-4 border-b">Steel/wrought iron</td><td className="py-2 px-4 border-b">$35–$75</td><td className="py-2 px-4 border-b">50+ years</td></tr>
                  <tr><td className="py-2 px-4 border-b">Composite</td><td className="py-2 px-4 border-b">$35–$60</td><td className="py-2 px-4 border-b">25–35 years</td></tr></tbody></table></div>

            <h2 className="text-3xl font-bold mb-4" style={{ color: 'oklch(0.25 0.005 0)' }}>Fencing Considerations for Bend's Climate</h2>
            <p className="mb-4">Bend's climate is tough on wood fencing. Intense UV, low humidity, and freeze-thaw cycles accelerate weathering. Cedar is the best wood choice for Central Oregon — it's naturally rot-resistant and handles our climate better than pine or fir.</p>
            <p className="mb-4">Vinyl and aluminum fencing require virtually no maintenance and hold up well in Bend's climate. They're our most popular choices for homeowners who want a long-lasting, low-maintenance fence.</p>
            <div className="bg-gray-100 p-6 rounded-lg mb-8 border-l-4" style={{ borderColor: 'oklch(0.46 0.20 25)' }}>
              <p className="font-bold text-lg mb-2" style={{ color: 'oklch(0.25 0.005 0)' }}>PRO TIP</p>
              <p>Check with your HOA before installing a fence. Many Bend neighborhoods have specific requirements for fence height, material, and color. We can help you navigate HOA approval as part of our service.</p>
            </div>

            <h2 className="text-3xl font-bold mb-4" style={{ color: 'oklch(0.25 0.005 0)' }}>What's Included in Our Fence Installation</h2>
            <ul className="list-disc pl-5 mb-8 space-y-1">
              <li>Property line verification and permit assistance</li>
              <li>Post hole digging (through Bend's rocky volcanic soil)</li>
              <li>Concrete post setting</li>
              <li>Panel or board installation</li>
              <li>Gate installation</li>
              <li>Cleanup and debris removal</li>
            </ul>
            <div className="p-8 text-center mt-12" style={{ backgroundColor: 'oklch(0.18 0.008 0)' }}>
              <p className="font-label text-xs mb-3" style={{ color:'oklch(0.46 0.20 25)',letterSpacing:'0.18em' }}>GET STARTED TODAY</p>
              <h3 className="font-display text-white mb-4" style={{ fontSize:'1.6rem' }}>Get a Free Fencing Quote in Bend</h3>
              <p className="font-body mb-6" style={{ color:'oklch(0.72 0.005 0)',lineHeight:1.7 }}>Our team installs fencing throughout Bend and Central Oregon. Contact us for a free on-site consultation and detailed proposal.</p>
              <Link href="/contact"><span className="btn-red inline-block">Get Your Free Fencing Quote →</span></Link>
              <p className="mt-4 text-sm" style={{ color:'oklch(0.60 0.005 0)' }}>Or call us: (541) 617-8873</p>
            </div>

            <div className="mt-12 pt-10" style={{ borderTop: '1px solid oklch(0.88 0.005 0)' }}>
              <p className="font-label mb-2" style={{ color: 'oklch(0.46 0.20 25)', fontSize: '0.62rem', letterSpacing: '0.18em' }}>YOU MIGHT ALSO LIKE</p>
              <h2 className="font-display font-light mb-6" style={{ fontSize: 'clamp(1.3rem, 2vw, 1.8rem)', color: 'oklch(0.15 0.005 0)' }}>More Helpful Guides</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Link href="/resources/landscape-design-cost-bend-oregon"><span style={{ display:'block',padding:'1.1rem 1.25rem',backgroundColor:'oklch(1 0 0)',borderLeft:'3px solid oklch(0.46 0.20 25)',textDecoration:'none' }}><div className="font-body" style={{ color:'oklch(0.22 0.008 30)',fontWeight:600,fontSize:'0.85rem',marginBottom:'0.3rem' }}>Landscape Design Cost in Bend</div><div className="font-body" style={{ color:'oklch(0.50 0.008 30)',fontSize:'0.75rem',fontWeight:300,lineHeight:1.5 }}>Full-yard design and installation pricing.</div></span></Link>
                <Link href="/resources/retaining-wall-cost-bend-oregon"><span style={{ display:'block',padding:'1.1rem 1.25rem',backgroundColor:'oklch(1 0 0)',borderLeft:'3px solid oklch(0.46 0.20 25)',textDecoration:'none' }}><div className="font-body" style={{ color:'oklch(0.22 0.008 30)',fontWeight:600,fontSize:'0.85rem',marginBottom:'0.3rem' }}>Retaining Wall Cost in Bend</div><div className="font-body" style={{ color:'oklch(0.50 0.008 30)',fontSize:'0.75rem',fontWeight:300,lineHeight:1.5 }}>What retaining wall installation costs.</div></span></Link>
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
