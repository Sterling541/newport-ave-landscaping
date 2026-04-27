import Navbar from '@/components/Navbar';
import SEO from '@/components/SEO';
import { BreadcrumbSchema, FAQSchema } from '@/components/SchemaMarkup';
import { Link } from 'wouter';

export default function HowToMaintainPaverPatioBend() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: 'oklch(0.97 0.003 0)' }}>
      <SEO
        title="How to Maintain a Paver Patio in Bend, OR | Newport Ave"
        description="How to maintain a paver patio in Bend, Oregon. Sealing, cleaning, weed prevention, and re-leveling tips for Central Oregon homeowners."
        canonical="https://www.newportavelandscaping.com/resources/how-to-maintain-paver-patio-bend-oregon"
      />
      <BreadcrumbSchema items={[
        { name: 'Home', url: '/' },
        { name: 'Resources', url: '/resources' },
        { name: 'How to Maintain a Paver Patio in Bend, Oregon', url: '/resources/how-to-maintain-paver-patio-bend-oregon' },
      ]} />
      <FAQSchema faqs={[
        { question: `How do Bend's freeze-thaw cycles affect paver patios?`, answer: `Bend's climate, with its significant freeze-thaw cycles, can put stress on paver patios. Water can seep into cracks and crevices, freeze, and expand, potentially causing pavers to shift or crack over time. Proper installation with a well-drained base is crucial to mitigate these effects.` },
        { question: `What is the best way to clean a paver patio in Bend, Oregon?`, answer: `For general cleaning in Bend, a simple sweep and rinse with water is often sufficient. For tougher stains or moss common in our 11-inch annual rainfall, a mild detergent and a stiff brush can be used. Avoid harsh chemicals that could damage the pavers or surrounding landscaping.` },
        { question: `Do I need to seal my paver patio in Bend's climate?`, answer: `Sealing your paver patio in Bend is highly recommended. A good quality sealer can protect against staining, inhibit weed growth, and enhance the pavers' color, while also providing an extra layer of defense against the elements and volcanic soil. Newport Avenue Landscaping can advise on the best sealing products for your specific pavers.` },
        { question: `How often should I re-sand my paver patio joints in Bend?`, answer: `Re-sanding paver joints is an important maintenance task, especially in Bend where freeze-thaw cycles can dislodge sand. It helps maintain the structural integrity of your patio and prevents weed growth. Typically, re-sanding every 1-3 years, or as needed, will keep your patio looking its best.` },
        { question: `What kind of base is best for paver patios in Bend's volcanic soil?`, answer: `Given Bend's unique volcanic soil, a robust and well-compacted base is essential for paver patios. This ensures proper drainage and stability, preventing shifting and settling over time. Newport Avenue Landscaping specializes in preparing durable bases that can withstand local conditions.` },
        { question: `How can I prevent weeds from growing in my paver patio in Bend?`, answer: `To prevent weeds in your Bend paver patio, ensure proper joint filling with polymeric sand, which hardens to create a barrier. Regular sweeping and prompt removal of any sprouting weeds will also help. Maintaining a clean and sealed surface can significantly reduce weed intrusion.` },
      ]} />
      <Navbar />
      <div style={{ paddingTop: '204px' }}>
        <div className="relative flex items-center justify-center" style={{ height:'380px',backgroundImage:'url(https://files.manuscdn.com/user_upload_by_module/session_file/310519663503028182/DsCDLoIMQbfZSjuQ.jpg',backgroundSize:'cover',backgroundPosition:'center 50%' }}>
          <div className="absolute inset-0" style={{ backgroundColor: 'oklch(0 0 0 / 0.55)' }} />
          <div className="relative text-center container">
            <p className="font-label mb-3" style={{ color:'oklch(0.72 0.12 25)',fontSize:'0.7rem',letterSpacing:'0.18em' }}>HARDSCAPE GUIDE · BEND, OREGON &middot; 2024</p>
            <h1 className="font-display text-white" style={{ fontSize:'clamp(1.8rem, 4vw, 3rem)',maxWidth:'700px',margin:'0 auto' }}>How to Maintain a Paver Patio in Bend, Oregon</h1>
          </div>
        </div>
        <div className="container py-16 max-w-3xl mx-auto">
          <div style={{ color: 'oklch(0.25 0.005 0)' }}>
            <p className="mb-8" style={{ fontSize:'1.05rem',lineHeight:1.85,color:'oklch(0.35 0.005 0)' }}>A well-maintained paver patio can last 30–50 years in Bend's climate. The good news is that paver maintenance is straightforward and inexpensive — especially compared to the cost of replacing a cracked concrete patio. Here's what you need to do to keep your patio looking great.</p>

            <h2 className="text-3xl font-bold mb-4" style={{ color: 'oklch(0.25 0.005 0)' }}>Annual Paver Maintenance Tasks</h2>
            <ul className="list-disc pl-5 mb-8 space-y-1">
              <li>Spring: Inspect for any pavers that shifted or heaved over winter</li>
              <li>Spring: Power wash to remove winter grime and organic buildup</li>
              <li>Spring: Check joint sand and refill any areas where it washed out</li>
              <li>Summer: Spot-treat any weeds growing in joints</li>
              <li>Fall: Apply polymeric sand to joints if needed</li>
              <li>Every 2–3 years: Apply paver sealer to protect surface and enhance color</li>
            </ul>

            <h2 className="text-3xl font-bold mb-4" style={{ color: 'oklch(0.25 0.005 0)' }}>Sealing Your Paver Patio in Bend</h2>
            <p className="mb-4">Sealing is optional but recommended for Bend patios. A quality sealer protects the surface from UV fading, oil stains, and freeze-thaw damage. It also makes cleaning easier and enhances the color of the pavers.</p>
            <p className="mb-4">We recommend sealing every 2–3 years. Apply sealer in dry weather when temperatures are between 50°F and 90°F — typically May through September in Bend.</p>
            <div className="bg-gray-100 p-6 rounded-lg mb-8 border-l-4" style={{ borderColor: 'oklch(0.46 0.20 25)' }}>
              <p className="font-bold text-lg mb-2" style={{ color: 'oklch(0.25 0.005 0)' }}>PRO TIP</p>
              <p>Use a penetrating sealer rather than a film-forming sealer for Bend's climate. Penetrating sealers allow moisture vapor to escape from the paver, preventing the bubbling and peeling that can occur with film-forming products in freeze-thaw conditions.</p>
            </div>

            <h2 className="text-3xl font-bold mb-4" style={{ color: 'oklch(0.25 0.005 0)' }}>Dealing with Weeds and Ants</h2>
            <p className="mb-4">Weeds in paver joints are the most common maintenance complaint. The best prevention is polymeric sand — it hardens when wet and creates a barrier that resists weed growth and ant colonization.</p>
            <p className="mb-8">If weeds do appear, pull them by hand or use a targeted herbicide. Avoid using broad-spectrum herbicides that can damage nearby plants.</p>
            <div className="p-8 text-center mt-12" style={{ backgroundColor: 'oklch(0.18 0.008 0)' }}>
              <p className="font-label text-xs mb-3" style={{ color:'oklch(0.46 0.20 25)',letterSpacing:'0.18em' }}>GET STARTED TODAY</p>
              <h3 className="font-display text-white mb-4" style={{ fontSize:'1.6rem' }}>Need Paver Maintenance or Repair in Bend?</h3>
              <p className="font-body mb-6" style={{ color:'oklch(0.72 0.005 0)',lineHeight:1.7 }}>We offer paver sealing, re-leveling, and repair services throughout Central Oregon. Contact us for a free assessment.</p>
              <Link href="/contact"><span className="btn-red inline-block">Schedule a Paver Assessment →</span></Link>
              <p className="mt-4 text-sm" style={{ color:'oklch(0.60 0.005 0)' }}>Or call us: (541) 617-8873</p>
            </div>

            <div className="mt-12 pt-10" style={{ borderTop: '1px solid oklch(0.88 0.005 0)' }}>
              <p className="font-label mb-2" style={{ color: 'oklch(0.46 0.20 25)', fontSize: '0.62rem', letterSpacing: '0.18em' }}>YOU MIGHT ALSO LIKE</p>
              <h2 className="font-display font-light mb-6" style={{ fontSize: 'clamp(1.3rem, 2vw, 1.8rem)', color: 'oklch(0.15 0.005 0)' }}>More Helpful Guides</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Link href="/resources/paver-patio-cost-bend-oregon"><span style={{ display:'block',padding:'1.1rem 1.25rem',backgroundColor:'oklch(1 0 0)',borderLeft:'3px solid oklch(0.46 0.20 25)',textDecoration:'none' }}><div className="font-body" style={{ color:'oklch(0.22 0.008 30)',fontWeight:600,fontSize:'0.85rem',marginBottom:'0.3rem' }}>Paver Patio Cost in Bend</div><div className="font-body" style={{ color:'oklch(0.50 0.008 30)',fontSize:'0.75rem',fontWeight:300,lineHeight:1.5 }}>Detailed cost breakdown for paver patios in Central Oregon.</div></span></Link>
                <Link href="/resources/faq-paver-patio-bend-oregon"><span style={{ display:'block',padding:'1.1rem 1.25rem',backgroundColor:'oklch(1 0 0)',borderLeft:'3px solid oklch(0.46 0.20 25)',textDecoration:'none' }}><div className="font-body" style={{ color:'oklch(0.22 0.008 30)',fontWeight:600,fontSize:'0.85rem',marginBottom:'0.3rem' }}>Paver Patio FAQ</div><div className="font-body" style={{ color:'oklch(0.50 0.008 30)',fontSize:'0.75rem',fontWeight:300,lineHeight:1.5 }}>Common questions about paver patios in Bend.</div></span></Link>
                <Link href="/resources/pavers-vs-concrete-bend-oregon"><span style={{ display:'block',padding:'1.1rem 1.25rem',backgroundColor:'oklch(1 0 0)',borderLeft:'3px solid oklch(0.46 0.20 25)',textDecoration:'none' }}><div className="font-body" style={{ color:'oklch(0.22 0.008 30)',fontWeight:600,fontSize:'0.85rem',marginBottom:'0.3rem' }}>Pavers vs. Concrete in Bend</div><div className="font-body" style={{ color:'oklch(0.50 0.008 30)',fontSize:'0.75rem',fontWeight:300,lineHeight:1.5 }}>Which is better for Bend's climate?</div></span></Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
