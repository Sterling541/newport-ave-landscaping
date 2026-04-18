import Navbar from '@/components/Navbar';
import SEO from '@/components/SEO';
import { BreadcrumbSchema, FAQSchema } from '@/components/SchemaMarkup';
import { Link } from 'wouter';

export default function XeriscapeVsTraditionalLawnBend() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: 'oklch(0.97 0.003 0)' }}>
      <SEO
        title="Xeriscape vs. Traditional Lawn in Bend, OR | Newport Ave"
        description="Xeriscape vs. traditional lawn in Bend, Oregon. Water use, cost, maintenance, and which is right for your Central Oregon property."
        canonical="https://newportavelandscaping.com/resources/xeriscape-vs-traditional-lawn-bend-oregon"
      />
      <BreadcrumbSchema items={[
        { name: 'Home', url: '/' },
        { name: 'Resources', url: '/resources' },
        { name: "Xeriscape vs. Traditional Lawn: What's Right for Your Bend Home?", url: '/resources/xeriscape-vs-traditional-lawn-bend-oregon' },
      ]} />
      <FAQSchema faqs={[
        { question: `Why is xeriscaping a good option for Bend, Oregon?`, answer: `Xeriscaping is ideal for Bend due to its arid climate, characterized by only 11 inches of annual rainfall and frequent freeze-thaw cycles. It significantly reduces water consumption, aligning with local conservation efforts and helping homeowners save on utility bills.` },
        { question: `What are the main challenges of maintaining a traditional lawn in Bend's climate?`, answer: `Traditional lawns in Bend face several challenges, including the need for extensive irrigation due to low rainfall and the difficulty of establishing healthy turf in volcanic soil. The harsh winters and freeze-thaw cycles can also damage grass, requiring constant maintenance and reseeding.` },
        { question: `What kind of plants thrive in a xeriscape in Bend, Oregon?`, answer: `Native and drought-tolerant plants are best suited for xeriscapes in Bend. Examples include various types of sage, lavender, sedum, and certain ornamental grasses that can withstand the region's climate Zone 6a and volcanic soil conditions with minimal water.` },
        { question: `How much water can I save by switching to xeriscaping in Bend?`, answer: `Homeowners in Bend can typically save 50-75% on their outdoor water usage by converting to xeriscaping. This substantial reduction not only benefits the environment but also leads to significant cost savings on water bills, especially during the dry summer months.` },
        { question: `Does Newport Avenue Landscaping offer xeriscape design and installation services in Bend?`, answer: `Yes, Newport Avenue Landscaping specializes in creating beautiful and sustainable xeriscape designs tailored to Bend's unique environment. With over 21 years of experience, our team understands how to select plants that thrive in volcanic soil and withstand the local climate, ensuring a low-maintenance and water-efficient landscape.` },
        { question: `Is it difficult to convert an existing traditional lawn to a xeriscape in Bend?`, answer: `Converting a traditional lawn to a xeriscape can be a straightforward process with proper planning. It typically involves removing existing turf, amending the volcanic soil, and installing drought-tolerant plants and efficient irrigation systems. Newport Avenue Landscaping can guide you through every step, making the transition smooth and successful.` },
      ]} />
      <Navbar />
      <div style={{ paddingTop: '204px' }}>
        <div className="relative flex items-center justify-center" style={{ height:'380px',backgroundImage:'url(https://d2xsxph8kpxj0f.cloudfront.net/310519663503028182/g3pw3MRUapabcDUbhBEFxx/ITP_7558_e52a40c9.jpg',backgroundSize:'cover',backgroundPosition:'center 50%' }}>
          <div className="absolute inset-0" style={{ backgroundColor: 'oklch(0 0 0 / 0.55)' }} />
          <div className="relative text-center container">
            <p className="font-label mb-3" style={{ color:'oklch(0.72 0.12 25)',fontSize:'0.7rem',letterSpacing:'0.18em' }}>LANDSCAPE GUIDE · BEND, OREGON &middot; 2024</p>
            <h1 className="font-display text-white" style={{ fontSize:'clamp(1.8rem, 4vw, 3rem)',maxWidth:'700px',margin:'0 auto' }}>Xeriscape vs. Traditional Lawn: What's Right for Your Bend Home?</h1>
          </div>
        </div>
        <div className="container py-16 max-w-3xl mx-auto">
          <div style={{ color: 'oklch(0.25 0.005 0)' }}>
            <p className="mb-8" style={{ fontSize:'1.05rem',lineHeight:1.85,color:'oklch(0.35 0.005 0)' }}>The debate between xeriscape and traditional lawn is especially relevant in Bend, where water is precious and the climate is unforgiving. Here's an honest comparison to help you decide what's right for your property.</p>

            <h2 className="text-3xl font-bold mb-4" style={{ color: 'oklch(0.25 0.005 0)' }}>Water Use Comparison</h2>
            <div className="overflow-x-auto mb-8"><table className="min-w-full bg-white border border-gray-300"><thead><tr><th className="py-2 px-4 border-b text-left">Factor</th><th className="py-2 px-4 border-b text-left">Traditional Lawn</th><th className="py-2 px-4 border-b text-left">Xeriscape</th></tr></thead><tbody><tr><td className="py-2 px-4 border-b">Annual water use (1,000 sq ft)</td><td className="py-2 px-4 border-b">25,000–35,000 gal</td><td className="py-2 px-4 border-b">5,000–10,000 gal</td></tr>
                  <tr><td className="py-2 px-4 border-b">Annual water cost (est.)</td><td className="py-2 px-4 border-b">$400–$600</td><td className="py-2 px-4 border-b">$80–$150</td></tr>
                  <tr><td className="py-2 px-4 border-b">Irrigation frequency (summer)</td><td className="py-2 px-4 border-b">3x/week</td><td className="py-2 px-4 border-b">1x/week or less</td></tr>
                  <tr><td className="py-2 px-4 border-b">Drought tolerance</td><td className="py-2 px-4 border-b">Low</td><td className="py-2 px-4 border-b">High</td></tr>
                  <tr><td className="py-2 px-4 border-b">Water savings vs. lawn</td><td className="py-2 px-4 border-b">—</td><td className="py-2 px-4 border-b">50–70%</td></tr></tbody></table></div>

            <h2 className="text-3xl font-bold mb-4" style={{ color: 'oklch(0.25 0.005 0)' }}>Maintenance Comparison</h2>
            <p className="mb-4">Traditional lawns require weekly mowing, regular fertilization, aeration, weed control, and consistent irrigation. In Bend's climate, they also need careful management to prevent fungal disease and heat stress.</p>
            <p className="mb-4">Xeriscape requires significantly less maintenance once established. No mowing, minimal fertilization, and far less irrigation. The main tasks are occasional weeding, pruning, and mulch refreshing.</p>
            <div className="bg-gray-100 p-6 rounded-lg mb-8 border-l-4" style={{ borderColor: 'oklch(0.46 0.20 25)' }}>
              <p className="font-bold text-lg mb-2" style={{ color: 'oklch(0.25 0.005 0)' }}>PRO TIP</p>
              <p>The first 1–2 years after a xeriscape installation require more attention as plants establish. After that, maintenance drops dramatically — often by 60–70% compared to a traditional lawn.</p>
            </div>

            <h2 className="text-3xl font-bold mb-4" style={{ color: 'oklch(0.25 0.005 0)' }}>Which Is Right for Your Bend Property?</h2>
            <p className="mb-4">If you love the look of a traditional lawn and don't mind the cost and maintenance, there's nothing wrong with keeping it. A well-maintained lawn is beautiful and adds real value to a property.</p>
            <p className="mb-8">If you're tired of the water bills, the weekly mowing, or the constant battle against Bend's climate, xeriscape is worth serious consideration. Most of our clients who make the switch don't regret it.</p>
            <div className="p-8 text-center mt-12" style={{ backgroundColor: 'oklch(0.18 0.008 0)' }}>
              <p className="font-label text-xs mb-3" style={{ color:'oklch(0.46 0.20 25)',letterSpacing:'0.18em' }}>GET STARTED TODAY</p>
              <h3 className="font-display text-white mb-4" style={{ fontSize:'1.6rem' }}>Not Sure Which Is Right for You? Let's Talk.</h3>
              <p className="font-body mb-6" style={{ color:'oklch(0.72 0.005 0)',lineHeight:1.7 }}>Our design team will walk your property, discuss your goals, and give you an honest recommendation. No pressure, no obligation.</p>
              <Link href="/contact"><span className="btn-red inline-block">Schedule a Free Consultation →</span></Link>
              <p className="mt-4 text-sm" style={{ color:'oklch(0.60 0.005 0)' }}>Or call us: (541) 617-8873</p>
            </div>

            <div className="mt-12 pt-10" style={{ borderTop: '1px solid oklch(0.88 0.005 0)' }}>
              <p className="font-label mb-2" style={{ color: 'oklch(0.46 0.20 25)', fontSize: '0.62rem', letterSpacing: '0.18em' }}>YOU MIGHT ALSO LIKE</p>
              <h2 className="font-display font-light mb-6" style={{ fontSize: 'clamp(1.3rem, 2vw, 1.8rem)', color: 'oklch(0.15 0.005 0)' }}>More Helpful Guides</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Link href="/resources/xeriscape-cost-bend-oregon"><span style={{ display:'block',padding:'1.1rem 1.25rem',backgroundColor:'oklch(1 0 0)',borderLeft:'3px solid oklch(0.46 0.20 25)',textDecoration:'none' }}><div className="font-body" style={{ color:'oklch(0.22 0.008 30)',fontWeight:600,fontSize:'0.85rem',marginBottom:'0.3rem' }}>Xeriscape Cost in Bend</div><div className="font-body" style={{ color:'oklch(0.50 0.008 30)',fontSize:'0.75rem',fontWeight:300,lineHeight:1.5 }}>What water-wise landscaping costs in Central Oregon.</div></span></Link>
                <Link href="/resources/faq-xeriscape-bend-oregon"><span style={{ display:'block',padding:'1.1rem 1.25rem',backgroundColor:'oklch(1 0 0)',borderLeft:'3px solid oklch(0.46 0.20 25)',textDecoration:'none' }}><div className="font-body" style={{ color:'oklch(0.22 0.008 30)',fontWeight:600,fontSize:'0.85rem',marginBottom:'0.3rem' }}>Xeriscape FAQ</div><div className="font-body" style={{ color:'oklch(0.50 0.008 30)',fontSize:'0.75rem',fontWeight:300,lineHeight:1.5 }}>Common questions about xeriscape in Bend.</div></span></Link>
                <Link href="/resources/bend-turf-rebate-program"><span style={{ display:'block',padding:'1.1rem 1.25rem',backgroundColor:'oklch(1 0 0)',borderLeft:'3px solid oklch(0.46 0.20 25)',textDecoration:'none' }}><div className="font-body" style={{ color:'oklch(0.22 0.008 30)',fontWeight:600,fontSize:'0.85rem',marginBottom:'0.3rem' }}>Bend Turf Rebate Program</div><div className="font-body" style={{ color:'oklch(0.50 0.008 30)',fontSize:'0.75rem',fontWeight:300,lineHeight:1.5 }}>Get rebates for converting your lawn to xeriscape.</div></span></Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
