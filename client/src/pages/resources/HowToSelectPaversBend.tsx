import Navbar from '@/components/Navbar';
import SEO from '@/components/SEO';
import { BreadcrumbSchema } from '@/components/SchemaMarkup';
import { Link } from 'wouter';

export default function HowToSelectPaversBend() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: 'oklch(0.97 0.003 0)' }}>
      <SEO
        title="How to Select Pavers for Your Bend, OR Patio | Newport Ave"
        description="How to choose the right pavers for your Bend, Oregon patio. Materials, colors, patterns, and what works best in Central Oregon's climate."
        canonical="https://newportavelandscaping.com/resources/how-to-select-pavers-bend-oregon"
      />
      <BreadcrumbSchema items={[
        { name: 'Home', url: '/' },
        { name: 'Resources', url: '/resources' },
        { name: 'How to Select Pavers for Your Bend Patio', url: '/resources/how-to-select-pavers-bend-oregon' },
      ]} />
      <Navbar />
      <div style={{ paddingTop: '328px' }}>
        <div className="relative flex items-center justify-center" style={{ height:'380px',backgroundImage:'url(https://files.manuscdn.com/user_upload_by_module/session_file/310519663503028182/DsCDLoIMQbfZSjuQ.jpg)',backgroundSize:'cover',backgroundPosition:'center 50%' }}>
          <div className="absolute inset-0" style={{ backgroundColor: 'oklch(0 0 0 / 0.55)' }} />
          <div className="relative text-center container">
            <p className="font-label mb-3" style={{ color:'oklch(0.72 0.12 25)',fontSize:'0.7rem',letterSpacing:'0.18em' }}>HARDSCAPE GUIDE · BEND, OREGON &middot; 2024</p>
            <h1 className="font-display text-white" style={{ fontSize:'clamp(1.8rem, 4vw, 3rem)',maxWidth:'700px',margin:'0 auto' }}>How to Select Pavers for Your Bend Patio</h1>
          </div>
        </div>
        <div className="container py-16 max-w-3xl mx-auto">
          <div style={{ color: 'oklch(0.25 0.005 0)' }}>
            <p className="mb-8" style={{ fontSize:'1.05rem',lineHeight:1.85,color:'oklch(0.35 0.005 0)' }}>Choosing pavers for a Bend patio involves more than just picking a color you like. The material, thickness, and finish all affect how well your patio holds up in Central Oregon's freeze-thaw climate. Here's our guide to selecting the right pavers for your project.</p>

            <h2 className="text-3xl font-bold mb-4" style={{ color: 'oklch(0.25 0.005 0)' }}>Paver Materials: Pros and Cons for Bend's Climate</h2>
            <p className="mb-4">Concrete pavers are the most popular choice in Bend for good reason. They're durable, available in hundreds of styles and colors, and hold up well in freeze-thaw conditions when installed correctly. Cost: $3–$8 per square foot for materials.</p>
            <p className="mb-4">Natural flagstone (bluestone, travertine, slate) is beautiful but more expensive and requires more careful installation in Bend's climate. Some natural stones are porous and can absorb water, which leads to cracking in freeze-thaw conditions. Cost: $8–$20+ per square foot for materials.</p>
            <p className="mb-8">Porcelain pavers are a newer option gaining popularity in Bend. They're non-porous (excellent for freeze-thaw resistance), very durable, and available in realistic stone and wood looks. Cost: $6–$15 per square foot for materials.</p>

            <h2 className="text-3xl font-bold mb-4" style={{ color: 'oklch(0.25 0.005 0)' }}>Paver Patterns for Bend Patios</h2>
            <ul className="list-disc pl-5 mb-8 space-y-1">
              <li>Running bond — classic, simple, works with any style</li>
              <li>Herringbone — traditional, very stable (recommended for driveways)</li>
              <li>Basketweave — traditional look, works best with square pavers</li>
              <li>Random/ashlar — natural flagstone look, great for informal spaces</li>
              <li>Circular patterns — dramatic focal point, requires more cutting</li>
              <li>Mixed sizes — modern look, creates visual interest</li>
            </ul>

            <h2 className="text-3xl font-bold mb-4" style={{ color: 'oklch(0.25 0.005 0)' }}>What We Recommend for Bend Homeowners</h2>
            <p className="mb-4">For most Bend patios, we recommend a quality concrete paver in a 2.375-inch thickness (the standard for patios). This thickness handles Bend's freeze-thaw cycles well and provides the durability you need for a long-lasting patio.</p>
            <p className="mb-4">For a more natural look, we often recommend tumbled or antiqued concrete pavers — they have the appearance of aged stone but the durability of concrete. For a contemporary look, large-format pavers (18x18 or 24x24) create a clean, modern aesthetic.</p>
            <div className="bg-gray-100 p-6 rounded-lg mb-8 border-l-4" style={{ borderColor: 'oklch(0.46 0.20 25)' }}>
              <p className="font-bold text-lg mb-2" style={{ color: 'oklch(0.25 0.005 0)' }}>PRO TIP</p>
              <p>Bring home a few paver samples and look at them in your outdoor space at different times of day. Colors look very different in Bend's intense sunlight vs. shade or evening light.</p>
            </div>
            <div className="p-8 text-center mt-12" style={{ backgroundColor: 'oklch(0.18 0.008 0)' }}>
              <p className="font-label text-xs mb-3" style={{ color:'oklch(0.46 0.20 25)',letterSpacing:'0.18em' }}>GET STARTED TODAY</p>
              <h3 className="font-display text-white mb-4" style={{ fontSize:'1.6rem' }}>Get a Free Paver Consultation in Bend</h3>
              <p className="font-body mb-6" style={{ color:'oklch(0.72 0.005 0)',lineHeight:1.7 }}>Our design team will bring material samples to your property and help you choose the perfect pavers for your project.</p>
              <Link href="/contact"><span className="btn-red inline-block">Schedule Your Free Paver Consultation →</span></Link>
              <p className="mt-4 text-sm" style={{ color:'oklch(0.60 0.005 0)' }}>Or call us: (541) 617-8873</p>
            </div>

            <div className="mt-12 pt-10" style={{ borderTop: '1px solid oklch(0.88 0.005 0)' }}>
              <p className="font-label mb-2" style={{ color: 'oklch(0.46 0.20 25)', fontSize: '0.62rem', letterSpacing: '0.18em' }}>YOU MIGHT ALSO LIKE</p>
              <h2 className="font-display font-light mb-6" style={{ fontSize: 'clamp(1.3rem, 2vw, 1.8rem)', color: 'oklch(0.15 0.005 0)' }}>More Helpful Guides</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Link href="/resources/paver-patio-cost-bend-oregon"><span style={{ display:'block',padding:'1.1rem 1.25rem',backgroundColor:'oklch(1 0 0)',borderLeft:'3px solid oklch(0.46 0.20 25)',textDecoration:'none' }}><div className="font-body" style={{ color:'oklch(0.22 0.008 30)',fontWeight:600,fontSize:'0.85rem',marginBottom:'0.3rem' }}>Paver Patio Cost in Bend</div><div className="font-body" style={{ color:'oklch(0.50 0.008 30)',fontSize:'0.75rem',fontWeight:300,lineHeight:1.5 }}>Detailed cost breakdown for paver patios in Central Oregon.</div></span></Link>
                <Link href="/resources/pavers-vs-concrete-bend-oregon"><span style={{ display:'block',padding:'1.1rem 1.25rem',backgroundColor:'oklch(1 0 0)',borderLeft:'3px solid oklch(0.46 0.20 25)',textDecoration:'none' }}><div className="font-body" style={{ color:'oklch(0.22 0.008 30)',fontWeight:600,fontSize:'0.85rem',marginBottom:'0.3rem' }}>Pavers vs. Concrete in Bend</div><div className="font-body" style={{ color:'oklch(0.50 0.008 30)',fontSize:'0.75rem',fontWeight:300,lineHeight:1.5 }}>Which is better for Bend's climate?</div></span></Link>
                <Link href="/resources/faq-paver-patio-bend-oregon"><span style={{ display:'block',padding:'1.1rem 1.25rem',backgroundColor:'oklch(1 0 0)',borderLeft:'3px solid oklch(0.46 0.20 25)',textDecoration:'none' }}><div className="font-body" style={{ color:'oklch(0.22 0.008 30)',fontWeight:600,fontSize:'0.85rem',marginBottom:'0.3rem' }}>Paver Patio FAQ</div><div className="font-body" style={{ color:'oklch(0.50 0.008 30)',fontSize:'0.75rem',fontWeight:300,lineHeight:1.5 }}>Common questions about paver patios in Bend.</div></span></Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
