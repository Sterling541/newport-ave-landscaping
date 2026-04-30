import Navbar from '@/components/Navbar';
import SEO from '@/components/SEO';
import { BreadcrumbSchema, FAQSchema } from '@/components/SchemaMarkup';
import { Link } from 'wouter';

export default function BendLandscapeBeforeAfter() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: 'oklch(0.97 0.003 0)' }}>
      <SEO
        title="Landscape Transformations in Bend, Oregon | Newport Ave"
        description="How Newport Avenue Landscaping transforms Bend, Oregon properties. Before and after examples and what's possible in Central Oregon."
        canonical="https://www.newportavelandscaping.com/resources/landscape-transformation-bend-oregon"
      />
      <BreadcrumbSchema items={[
        { name: 'Home', url: '/' },
        { name: 'Resources', url: '/resources' },
        { name: 'Landscape Transformations in Bend, Oregon', url: '/resources/landscape-transformation-bend-oregon' },
      ]} />
      <FAQSchema faqs={[
        { question: `What are the best drought-tolerant plants for a landscape transformation in Bend, Oregon?`, answer: `For Bend's high desert climate (Zone 6a) with only 11" annual rainfall, selecting drought-tolerant plants is crucial for a successful landscape transformation. Native species like Manzanita, Sagebrush, and various ornamental grasses thrive in these conditions, conserving water and reducing maintenance. Consider plants that can withstand both hot, dry summers and cold, snowy winters.` },
        { question: `How does Bend's volcanic soil impact landscape design and plant selection?`, answer: `Bend's unique volcanic soil, often rocky and fast-draining, presents both challenges and opportunities for landscape design. It's essential to amend the soil with organic matter to improve nutrient retention and water holding capacity for many plants. Newport Avenue Landscaping specializes in understanding these soil conditions to recommend the best plant palettes and design solutions.` },
        { question: `What are common challenges when undertaking a landscape transformation in Central Oregon?`, answer: `Central Oregon's climate, characterized by significant freeze-thaw cycles and low annual rainfall, poses unique challenges for landscape transformations. Proper irrigation systems are vital, and plant choices must be resilient to temperature fluctuations. Addressing these environmental factors upfront ensures the longevity and beauty of your new landscape.` },
        { question: `How can I create a low-maintenance landscape in Bend that still looks beautiful?`, answer: `Creating a low-maintenance landscape in Bend involves strategic plant selection and thoughtful design. Focus on native and adapted plants that require less water and pruning, and consider incorporating hardscaping elements like patios and pathways. Mulching generously helps suppress weeds and retain soil moisture, reducing the need for constant attention.` },
        { question: `What landscaping styles are popular and suitable for homes in Bend, Oregon?`, answer: `Popular landscaping styles in Bend often embrace the natural beauty of Central Oregon, including xeriscaping, modern desert, and rustic mountain designs. These styles typically feature drought-tolerant plants, natural stone, and elements that blend seamlessly with the surrounding environment. They are well-suited to Bend's climate and volcanic terrain.` },
        { question: `What should I consider when planning a landscape transformation to withstand Bend's freeze-thaw cycles?`, answer: `When planning a landscape transformation in Bend, it's crucial to select plants and materials that can endure the region's intense freeze-thaw cycles. Ensure proper drainage to prevent water from freezing and expanding in critical areas, which can damage hardscaping and plant roots. Choosing hardy, cold-tolerant plant varieties is key to a resilient landscape.` },
      ]} />
      <Navbar />
      <div style={{ paddingTop: '204px' }}>
        <div className="relative flex items-center justify-center" style={{ height:'380px',backgroundImage:'url(/manus-storage/compressed_GLLPatio2_4916fcde_95c74f23_0a4c0f52.webp',backgroundSize:'cover',backgroundPosition:'center 50%' }}>
          <div className="absolute inset-0" style={{ backgroundColor: 'oklch(0 0 0 / 0.55)' }} />
          <div className="relative text-center container">
            <p className="font-label mb-3" style={{ color:'oklch(0.72 0.12 25)',fontSize:'0.7rem',letterSpacing:'0.18em' }}>PROJECT GALLERY · BEND, OREGON &middot; 2024</p>
            <h1 className="font-display text-white" style={{ fontSize:'clamp(1.8rem, 4vw, 3rem)',maxWidth:'700px',margin:'0 auto' }}>Landscape Transformations in Bend, Oregon</h1>
          </div>
        </div>
        <div className="container py-16 max-w-3xl mx-auto">
          <div style={{ color: 'oklch(0.25 0.005 0)' }}>
            <p className="mb-8" style={{ fontSize:'1.05rem',lineHeight:1.85,color:'oklch(0.35 0.005 0)' }}>The most rewarding part of our work is the transformation — taking a bare dirt lot, an overgrown yard, or a cracked concrete patio and turning it into a beautiful, functional outdoor space. Here's a look at the types of transformations we do most often in Bend and what makes them successful.</p>

            <h2 className="text-3xl font-bold mb-4" style={{ color: 'oklch(0.25 0.005 0)' }}>Turf to Xeriscape: The Most Common Transformation</h2>
            <p className="mb-4">The most common transformation we do in Bend is converting a traditional lawn to xeriscape. The before: a water-hungry lawn that's brown by August, with high water bills and weekly mowing. The after: a lush, colorful landscape of drought-tolerant plants, decorative rock, and drip irrigation that looks great year-round with minimal care.</p>
            <p className="mb-8">These projects typically take 3–5 days and cost $10,000–$30,000 for a typical Bend front or back yard. The water savings alone often pay back the investment within 5–7 years.</p>

            <h2 className="text-3xl font-bold mb-4" style={{ color: 'oklch(0.25 0.005 0)' }}>Bare Dirt to Outdoor Living Room</h2>
            <p className="mb-4">New construction homes in Bend often come with bare dirt and no landscaping. We transform these blank slates into complete outdoor living spaces — paver patio, fire feature, planting beds, irrigation, and lighting — in 1–3 weeks.</p>
            <p className="mb-8">These full-yard installations are among our most satisfying projects. Watching a family use their new outdoor space for the first time makes the work worthwhile.</p>

            <h2 className="text-3xl font-bold mb-4" style={{ color: 'oklch(0.25 0.005 0)' }}>Cracked Concrete to Paver Patio</h2>
            <p className="mb-4">Cracked, stained concrete patios are one of the most common problems we solve in Bend. We remove the old concrete, install a proper gravel base, and lay a new paver patio that will last 30–50 years.</p>
            <p className="mb-4">The difference in appearance and durability is dramatic. Pavers also add significantly more value to a property than concrete — buyers in Bend's market notice the difference.</p>
            <div className="bg-gray-100 p-6 rounded-lg mb-8 border-l-4" style={{ borderColor: 'oklch(0.46 0.20 25)' }}>
              <p className="font-bold text-lg mb-2" style={{ color: 'oklch(0.25 0.005 0)' }}>PRO TIP</p>
              <p>Before committing to a full landscape renovation, start with a design consultation. Our design team will help you prioritize projects based on your budget, goals, and the condition of your current landscape.</p>
            </div>
            <div className="p-8 text-center mt-12" style={{ backgroundColor: 'oklch(0.18 0.008 0)' }}>
              <p className="font-label text-xs mb-3" style={{ color:'oklch(0.46 0.20 25)',letterSpacing:'0.18em' }}>GET STARTED TODAY</p>
              <h3 className="font-display text-white mb-4" style={{ fontSize:'1.6rem' }}>Transform Your Bend Property</h3>
              <p className="font-body mb-6" style={{ color:'oklch(0.72 0.005 0)',lineHeight:1.7 }}>Our design team will visit your property, discuss your vision, and create a transformation plan that fits your budget. Free consultation, no obligation.</p>
              <Link href="/contact"><span className="btn-red inline-block">Schedule Your Free Consultation →</span></Link>
              <p className="mt-4 text-sm" style={{ color:'oklch(0.60 0.005 0)' }}>Or call us: (541) 617-8873</p>
            </div>

            <div className="mt-12 pt-10" style={{ borderTop: '1px solid oklch(0.88 0.005 0)' }}>
              <p className="font-label mb-2" style={{ color: 'oklch(0.46 0.20 25)', fontSize: '0.62rem', letterSpacing: '0.18em' }}>YOU MIGHT ALSO LIKE</p>
              <h2 className="font-display font-light mb-6" style={{ fontSize: 'clamp(1.3rem, 2vw, 1.8rem)', color: 'oklch(0.15 0.005 0)' }}>More Helpful Guides</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Link href="/resources/landscape-design-cost-bend-oregon"><span style={{ display:'block',padding:'1.1rem 1.25rem',backgroundColor:'oklch(1 0 0)',borderLeft:'3px solid oklch(0.46 0.20 25)',textDecoration:'none' }}><div className="font-body" style={{ color:'oklch(0.22 0.008 30)',fontWeight:600,fontSize:'0.85rem',marginBottom:'0.3rem' }}>Landscape Design Cost in Bend</div><div className="font-body" style={{ color:'oklch(0.50 0.008 30)',fontSize:'0.75rem',fontWeight:300,lineHeight:1.5 }}>Full-yard design and installation pricing.</div></span></Link>
                <Link href="/resources/xeriscape-cost-bend-oregon"><span style={{ display:'block',padding:'1.1rem 1.25rem',backgroundColor:'oklch(1 0 0)',borderLeft:'3px solid oklch(0.46 0.20 25)',textDecoration:'none' }}><div className="font-body" style={{ color:'oklch(0.22 0.008 30)',fontWeight:600,fontSize:'0.85rem',marginBottom:'0.3rem' }}>Xeriscape Cost in Bend</div><div className="font-body" style={{ color:'oklch(0.50 0.008 30)',fontSize:'0.75rem',fontWeight:300,lineHeight:1.5 }}>Water-wise landscaping costs in Central Oregon.</div></span></Link>
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
