import Navbar from '@/components/Navbar';
import SEO from '@/components/SEO';
import { BreadcrumbSchema, FAQSchema } from '@/components/SchemaMarkup';
import { Link } from 'wouter';

export default function BendLandscapeWarranty() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: 'oklch(0.97 0.003 0)' }}>
      <SEO
        title="Landscape Warranty in Bend, Oregon | Newport Ave Landscaping"
        description="What landscape warranties cover in Bend, Oregon. Newport Avenue's 5-year workmanship warranty explained."
        canonical="https://newportavelandscaping.com/resources/landscape-warranty-bend-oregon"
      />
      <BreadcrumbSchema items={[
        { name: 'Home', url: '/' },
        { name: 'Resources', url: '/resources' },
        { name: 'Our 5-Year Landscape Warranty: What It Covers', url: '/resources/landscape-warranty-bend-oregon' },
      ]} />
      <FAQSchema faqs={[
        { question: `What does a typical landscape warranty cover in Bend, Oregon?`, answer: `A comprehensive landscape warranty in Bend typically covers the installation of plants, trees, and shrubs, as well as hardscaping elements like pavers and retaining walls. Given Bend's climate zone 6a and volcanic soil, it's crucial that plants are installed correctly to withstand local conditions. Warranties usually address issues arising from improper installation or material defects.` },
        { question: `How long do landscape warranties usually last for plants and hardscaping in Central Oregon?`, answer: `Warranty durations can vary, but for plants and trees in Central Oregon's high desert climate, a common period is 90 days to one year, often requiring proper irrigation. Hardscaping, such as patios and walkways, typically carries a longer warranty, often one to two years, covering workmanship against issues caused by freeze-thaw cycles.` },
        { question: `Are there specific considerations for warranties due to Bend's climate and soil?`, answer: `Absolutely. Bend's climate zone 6a, with its cold winters and freeze-thaw cycles, can impact plant survival and hardscape stability. Volcanic soil also presents unique challenges for drainage and nutrient availability. A good warranty will account for these local conditions, ensuring plants are suitable for the environment and hardscaping is built to last.` },
        { question: `What might void my landscape warranty with a company like Newport Avenue Landscaping?`, answer: `Most landscape warranties, including those from Newport Avenue Landscaping, require adherence to certain conditions to remain valid. This often includes ensuring proper irrigation and care for plant material, as well as timely payment of all invoices. Neglecting these aspects can unfortunately void your coverage.` },
        { question: `Does Newport Avenue Landscaping's warranty cover plants that die due to lack of water in Bend's dry climate?`, answer: `Newport Avenue Landscaping's warranty focuses on the health and proper installation of plants, ensuring they are viable upon planting. However, in Bend's dry climate with only 11 inches of annual rainfall, ongoing proper irrigation and care are essential. The warranty typically covers defects in installation, not neglect or lack of watering after installation.` },
        { question: `What should I look for in a landscape warranty to protect my investment in Bend?`, answer: `When reviewing a landscape warranty in Bend, look for clear terms specifying coverage periods for different elements like plants and hardscaping. Ensure it addresses local challenges such as volcanic soil and freeze-thaw cycles. A transparent warranty from a reputable company like Newport Avenue Landscaping provides peace of mind and protects your investment.` },
      ]} />
      <Navbar />
      <div style={{ paddingTop: '204px' }}>
        <div className="relative flex items-center justify-center" style={{ height:'380px',backgroundImage:'url(https://d2xsxph8kpxj0f.cloudfront.net/310519663503028182/g3pw3MRUapabcDUbhBEFxx/ITP_7558_e52a40c9.jpg',backgroundSize:'cover',backgroundPosition:'center 50%' }}>
          <div className="absolute inset-0" style={{ backgroundColor: 'oklch(0 0 0 / 0.55)' }} />
          <div className="relative text-center container">
            <p className="font-label mb-3" style={{ color:'oklch(0.72 0.12 25)',fontSize:'0.7rem',letterSpacing:'0.18em' }}>WARRANTY · NEWPORT AVE LANDSCAPING &middot; 2024</p>
            <h1 className="font-display text-white" style={{ fontSize:'clamp(1.8rem, 4vw, 3rem)',maxWidth:'700px',margin:'0 auto' }}>Our 5-Year Landscape Warranty: What It Covers</h1>
          </div>
        </div>
        <div className="container py-16 max-w-3xl mx-auto">
          <div style={{ color: 'oklch(0.25 0.005 0)' }}>
            <p className="mb-8" style={{ fontSize:'1.05rem',lineHeight:1.85,color:'oklch(0.35 0.005 0)' }}>Newport Avenue Landscaping is the only landscaping company in Central Oregon to offer a 5-year workmanship warranty on all hardscape projects. Here's exactly what our warranty covers, what it doesn't cover, and why it matters for Bend homeowners.</p>

            <h2 className="text-3xl font-bold mb-4" style={{ color: 'oklch(0.25 0.005 0)' }}>What Our 5-Year Warranty Covers</h2>
            <p className="mb-4">Our warranty covers any settling, shifting, or failure of hardscape work (patios, walkways, driveways, retaining walls) that results from workmanship defects — including base preparation, edge restraint installation, and paver placement.</p>
            <p className="mb-8">If any pavers shift, a wall leans, or a walkway settles due to our workmanship in the first 5 years, we come back and fix it at no cost to you. No questions asked.</p>

            <h2 className="text-3xl font-bold mb-4" style={{ color: 'oklch(0.25 0.005 0)' }}>What Our Warranty Doesn't Cover</h2>
            <ul className="list-disc pl-5 mb-8 space-y-1">
              <li>Damage caused by tree roots growing under hardscape</li>
              <li>Damage from vehicles driving on areas not designed for vehicle traffic</li>
              <li>Normal wear and surface weathering</li>
              <li>Damage from acts of nature (flooding, earthquakes)</li>
              <li>Changes made by the homeowner or another contractor after installation</li>
            </ul>

            <h2 className="text-3xl font-bold mb-4" style={{ color: 'oklch(0.25 0.005 0)' }}>Why Our Warranty Matters in Bend's Climate</h2>
            <p className="mb-4">Bend's freeze-thaw climate is one of the most demanding for hardscape. Patios, walkways, and retaining walls that aren't installed with proper base preparation will fail — often within 3–5 years.</p>
            <p className="mb-4">Our warranty is backed by our installation standards: minimum 6-inch compacted gravel base for patios, proper drainage behind retaining walls, and quality materials from reputable manufacturers. We stand behind our work because we know it's done right.</p>
            <div className="bg-gray-100 p-6 rounded-lg mb-8 border-l-4" style={{ borderColor: 'oklch(0.46 0.20 25)' }}>
              <p className="font-bold text-lg mb-2" style={{ color: 'oklch(0.25 0.005 0)' }}>PRO TIP</p>
              <p>When comparing landscaping bids in Bend, always ask about the warranty. A company that doesn't offer a workmanship warranty is telling you something about their confidence in their own work.</p>
            </div>
            <div className="p-8 text-center mt-12" style={{ backgroundColor: 'oklch(0.18 0.008 0)' }}>
              <p className="font-label text-xs mb-3" style={{ color:'oklch(0.46 0.20 25)',letterSpacing:'0.18em' }}>GET STARTED TODAY</p>
              <h3 className="font-display text-white mb-4" style={{ fontSize:'1.6rem' }}>Get a Free Quote Backed by Our 5-Year Warranty</h3>
              <p className="font-body mb-6" style={{ color:'oklch(0.72 0.005 0)',lineHeight:1.7 }}>Every hardscape project we install is backed by our 5-year workmanship warranty. Contact us for a free consultation and detailed proposal.</p>
              <Link href="/contact"><span className="btn-red inline-block">Schedule Your Free Consultation →</span></Link>
              <p className="mt-4 text-sm" style={{ color:'oklch(0.60 0.005 0)' }}>Or call us: (541) 617-8873</p>
            </div>

            <div className="mt-12 pt-10" style={{ borderTop: '1px solid oklch(0.88 0.005 0)' }}>
              <p className="font-label mb-2" style={{ color: 'oklch(0.46 0.20 25)', fontSize: '0.62rem', letterSpacing: '0.18em' }}>YOU MIGHT ALSO LIKE</p>
              <h2 className="font-display font-light mb-6" style={{ fontSize: 'clamp(1.3rem, 2vw, 1.8rem)', color: 'oklch(0.15 0.005 0)' }}>More Helpful Guides</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Link href="/resources/how-to-choose-landscaper-bend-oregon"><span style={{ display:'block',padding:'1.1rem 1.25rem',backgroundColor:'oklch(1 0 0)',borderLeft:'3px solid oklch(0.46 0.20 25)',textDecoration:'none' }}><div className="font-body" style={{ color:'oklch(0.22 0.008 30)',fontWeight:600,fontSize:'0.85rem',marginBottom:'0.3rem' }}>How to Choose a Landscaper in Bend</div><div className="font-body" style={{ color:'oklch(0.50 0.008 30)',fontSize:'0.75rem',fontWeight:300,lineHeight:1.5 }}>Questions to ask and red flags to avoid.</div></span></Link>
                <Link href="/resources/paver-patio-cost-bend-oregon"><span style={{ display:'block',padding:'1.1rem 1.25rem',backgroundColor:'oklch(1 0 0)',borderLeft:'3px solid oklch(0.46 0.20 25)',textDecoration:'none' }}><div className="font-body" style={{ color:'oklch(0.22 0.008 30)',fontWeight:600,fontSize:'0.85rem',marginBottom:'0.3rem' }}>Paver Patio Cost in Bend</div><div className="font-body" style={{ color:'oklch(0.50 0.008 30)',fontSize:'0.75rem',fontWeight:300,lineHeight:1.5 }}>Hardscape pricing for Central Oregon projects.</div></span></Link>
                <Link href="/resources/pavers-vs-concrete-bend-oregon"><span style={{ display:'block',padding:'1.1rem 1.25rem',backgroundColor:'oklch(1 0 0)',borderLeft:'3px solid oklch(0.46 0.20 25)',textDecoration:'none' }}><div className="font-body" style={{ color:'oklch(0.22 0.008 30)',fontWeight:600,fontSize:'0.85rem',marginBottom:'0.3rem' }}>Pavers vs. Concrete in Bend</div><div className="font-body" style={{ color:'oklch(0.50 0.008 30)',fontSize:'0.75rem',fontWeight:300,lineHeight:1.5 }}>Which is better for Bend's climate?</div></span></Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
