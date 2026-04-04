import Navbar from '@/components/Navbar';
import SEO from '@/components/SEO';
import { BreadcrumbSchema } from '@/components/SchemaMarkup';
import { Link } from 'wouter';

export default function FaqPaverPatioBend() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: 'oklch(0.97 0.003 0)' }}>
      <SEO
        title="Paver Patio FAQ — Bend, Oregon | Newport Ave Landscaping"
        description="Answers to the most common questions about paver patio installation in Bend, Oregon. Costs, materials, timeline, warranty, and more."
        canonical="https://newportavelandscaping.com/resources/faq-paver-patio-bend-oregon"
      />
      <BreadcrumbSchema items={[
        { name: 'Home', url: '/' },
        { name: 'Resources', url: '/resources' },
        { name: 'Paver Patio FAQ: Your Questions Answered', url: '/resources/faq-paver-patio-bend-oregon' },
      ]} />
      <Navbar />
      <div style={{ paddingTop: '328px' }}>
        <div className="relative flex items-center justify-center" style={{ height:'380px',backgroundImage:'url(https://files.manuscdn.com/user_upload_by_module/session_file/310519663503028182/DsCDLoIMQbfZSjuQ.jpg)',backgroundSize:'cover',backgroundPosition:'center 50%' }}>
          <div className="absolute inset-0" style={{ backgroundColor: 'oklch(0 0 0 / 0.55)' }} />
          <div className="relative text-center container">
            <p className="font-label mb-3" style={{ color:'oklch(0.72 0.12 25)',fontSize:'0.7rem',letterSpacing:'0.18em' }}>PAVER PATIOS · BEND, OREGON &middot; 2024</p>
            <h1 className="font-display text-white" style={{ fontSize:'clamp(1.8rem, 4vw, 3rem)',maxWidth:'700px',margin:'0 auto' }}>Paver Patio FAQ: Your Questions Answered</h1>
          </div>
        </div>
        <div className="container py-16 max-w-3xl mx-auto">
          <div style={{ color: 'oklch(0.25 0.005 0)' }}>
            <p className="mb-8" style={{ fontSize:'1.05rem',lineHeight:1.85,color:'oklch(0.35 0.005 0)' }}>We get a lot of questions about paver patios. Here are the most common ones we hear from Bend homeowners, answered honestly based on 21+ years of experience installing patios throughout Central Oregon.</p>

            <h2 className="text-3xl font-bold mb-4" style={{ color: 'oklch(0.25 0.005 0)' }}>How much does a paver patio cost in Bend, Oregon?</h2>
            <p className="mb-4">Most paver patios in Bend range from $8,000 to $45,000. A simple 200 sq ft backyard patio with concrete pavers typically costs $8,000–$15,000. Larger patios with premium materials, built-in fire pits, seating walls, or outdoor kitchens can reach $40,000–$60,000.</p>
            <p className="mb-8">The biggest cost drivers are square footage, material choice (concrete vs. natural stone), base preparation complexity, and added features. We provide free, detailed estimates after an on-site consultation.</p>

            <h2 className="text-3xl font-bold mb-4" style={{ color: 'oklch(0.25 0.005 0)' }}>How long does paver patio installation take?</h2>
            <p className="mb-4">A typical residential patio takes 3–7 days from start to finish. Larger projects with multiple features may take 1–2 weeks. We schedule projects back-to-back and work full days to minimize disruption.</p>
            <p className="mb-8">Lead time from contract signing to project start is typically 2–6 weeks depending on the season. Spring and early summer are our busiest periods.</p>

            <h2 className="text-3xl font-bold mb-4" style={{ color: 'oklch(0.25 0.005 0)' }}>Do pavers crack in Bend's freeze-thaw climate?</h2>
            <p className="mb-4">When installed correctly, pavers are actually more resistant to freeze-thaw damage than poured concrete. The key is proper base preparation — we install a minimum 6-inch compacted gravel base that allows for drainage and minor ground movement without cracking.</p>
            <p className="mb-4">Individual pavers can shift or settle over time, but they can be easily lifted and re-leveled without replacing the entire patio. This is a major advantage over poured concrete.</p>
            <div className="bg-gray-100 p-6 rounded-lg mb-8 border-l-4" style={{ borderColor: 'oklch(0.46 0.20 25)' }}>
              <p className="font-bold text-lg mb-2" style={{ color: 'oklch(0.25 0.005 0)' }}>PRO TIP</p>
              <p>Our 5-year warranty covers any settling or shifting that occurs due to workmanship. If a paver shifts in the first 5 years, we come back and fix it — at no cost to you.</p>
            </div>

            <h2 className="text-3xl font-bold mb-4" style={{ color: 'oklch(0.25 0.005 0)' }}>What maintenance do paver patios require?</h2>
            <p className="mb-4">Paver patios are low-maintenance. Annual sealing (every 2–3 years) protects the surface and enhances color. Occasional power washing removes dirt and organic buildup. Weeds can grow in the joints — we recommend polymeric sand, which hardens and resists weed growth.</p>
            <p className="mb-8">We offer paver sealing and maintenance services for existing patios throughout Central Oregon.</p>
            <div className="p-8 text-center mt-12" style={{ backgroundColor: 'oklch(0.18 0.008 0)' }}>
              <p className="font-label text-xs mb-3" style={{ color:'oklch(0.46 0.20 25)',letterSpacing:'0.18em' }}>GET STARTED TODAY</p>
              <h3 className="font-display text-white mb-4" style={{ fontSize:'1.6rem' }}>Ready to Get a Paver Patio Quote?</h3>
              <p className="font-body mb-6" style={{ color:'oklch(0.72 0.005 0)',lineHeight:1.7 }}>Our design team will visit your property, discuss your vision, and provide a detailed proposal — at no cost. We serve Bend, Redmond, Sisters, Sunriver, and all of Central Oregon.</p>
              <Link href="/contact"><span className="btn-red inline-block">Get Your Free Patio Quote →</span></Link>
              <p className="mt-4 text-sm" style={{ color:'oklch(0.60 0.005 0)' }}>Or call us: (541) 617-8873</p>
            </div>

            <div className="mt-12 pt-10" style={{ borderTop: '1px solid oklch(0.88 0.005 0)' }}>
              <p className="font-label mb-2" style={{ color: 'oklch(0.46 0.20 25)', fontSize: '0.62rem', letterSpacing: '0.18em' }}>YOU MIGHT ALSO LIKE</p>
              <h2 className="font-display font-light mb-6" style={{ fontSize: 'clamp(1.3rem, 2vw, 1.8rem)', color: 'oklch(0.15 0.005 0)' }}>More Helpful Guides</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Link href="/resources/paver-patio-cost-bend-oregon"><span style={{ display:'block',padding:'1.1rem 1.25rem',backgroundColor:'oklch(1 0 0)',borderLeft:'3px solid oklch(0.46 0.20 25)',textDecoration:'none' }}><div className="font-body" style={{ color:'oklch(0.22 0.008 30)',fontWeight:600,fontSize:'0.85rem',marginBottom:'0.3rem' }}>Paver Patio Cost in Bend</div><div className="font-body" style={{ color:'oklch(0.50 0.008 30)',fontSize:'0.75rem',fontWeight:300,lineHeight:1.5 }}>Detailed cost breakdown for paver patios in Central Oregon.</div></span></Link>
                <Link href="/resources/pavers-vs-concrete-bend-oregon"><span style={{ display:'block',padding:'1.1rem 1.25rem',backgroundColor:'oklch(1 0 0)',borderLeft:'3px solid oklch(0.46 0.20 25)',textDecoration:'none' }}><div className="font-body" style={{ color:'oklch(0.22 0.008 30)',fontWeight:600,fontSize:'0.85rem',marginBottom:'0.3rem' }}>Pavers vs. Concrete in Bend</div><div className="font-body" style={{ color:'oklch(0.50 0.008 30)',fontSize:'0.75rem',fontWeight:300,lineHeight:1.5 }}>Which is better for Bend's climate?</div></span></Link>
                <Link href="/services/pavers"><span style={{ display:'block',padding:'1.1rem 1.25rem',backgroundColor:'oklch(1 0 0)',borderLeft:'3px solid oklch(0.46 0.20 25)',textDecoration:'none' }}><div className="font-body" style={{ color:'oklch(0.22 0.008 30)',fontWeight:600,fontSize:'0.85rem',marginBottom:'0.3rem' }}>Paver Patios & Walkways Service</div><div className="font-body" style={{ color:'oklch(0.50 0.008 30)',fontSize:'0.75rem',fontWeight:300,lineHeight:1.5 }}>Our paver installation service page.</div></span></Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
