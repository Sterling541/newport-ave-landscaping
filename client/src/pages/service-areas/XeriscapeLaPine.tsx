import Navbar from '@/components/Navbar';
import SEO from '@/components/SEO';
import { BreadcrumbSchema } from '@/components/SchemaMarkup';
import { Link } from 'wouter';

export default function XeriscapeLaPine() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: 'oklch(0.97 0.003 0)' }}>
      <SEO
        title="Xeriscape Landscaping in La Pine, OR | Newport Ave Landscaping"
        description="Professional xeriscape landscaping in La Pine, Oregon. Newport Avenue Landscaping — licensed, bonded, 21+ years serving Central Oregon. Free consultations."
        canonical="https://newportavelandscaping.com/service-areas/la-pine-xeriscape"
      />
      <BreadcrumbSchema items={[
        { name: 'Home', url: '/' },
        { name: 'Service Areas', url: '/service-areas' },
        { name: 'Xeriscape Landscaping in La Pine', url: '/service-areas/la-pine-xeriscape' },
      ]} />
      <Navbar />
      <div style={{ paddingTop: '204px' }}>
        <div className="relative flex items-center justify-center" style={{ height:'380px',backgroundImage:'url(/manus-storage/brokentop-xeriscape-01_064e5008.jpg)',backgroundSize:'cover',backgroundPosition:'center 50%' }}>
          <div className="absolute inset-0" style={{ backgroundColor: 'oklch(0 0 0 / 0.55)' }} />
          <div className="relative text-center container">
            <p className="font-label mb-3" style={{ color:'oklch(0.72 0.12 25)',fontSize:'0.7rem',letterSpacing:'0.18em' }}>LA PINE · CENTRAL OREGON &middot; 2024</p>
            <h1 className="font-display text-white" style={{ fontSize:'clamp(1.8rem, 4vw, 3rem)',maxWidth:'700px',margin:'0 auto' }}>Xeriscape Landscaping in La Pine, Oregon</h1>
          </div>
        </div>
        <div className="container py-16 max-w-3xl mx-auto">
          <div style={{ color: 'oklch(0.25 0.005 0)' }}>
            <p className="mb-8" style={{ fontSize:'1.05rem',lineHeight:1.85,color:'oklch(0.35 0.005 0)' }}>Xeriscape landscaping is one of the smartest investments a La Pine homeowner can make. By replacing water-hungry turf with drought-tolerant plants, decorative rock, and efficient drip irrigation, you can cut outdoor water use by 50–70% while creating a landscape that looks stunning year-round. Newport Avenue Landscaping has completed hundreds of xeriscape transformations across Central Oregon.</p>

            <h2 className="text-3xl font-bold mb-4" style={{ color: 'oklch(0.25 0.005 0)' }}>Why Xeriscape Makes Sense in La Pine</h2>
            <p className="mb-4">La Pine sits in Oregon's high desert, receiving just 10–14 inches of rain per year. Traditional lawns fight this climate constantly — demanding frequent irrigation, fertilization, and mowing just to survive. Xeriscape works with the natural environment instead of against it.</p>
            <p className="mb-8">A well-designed xeriscape in La Pine can reduce your water bill by $600–$1,500 per year. Combined with lower maintenance costs and potential rebates from local water utilities, the payback period is typically 3–5 years.</p>

            <h2 className="text-3xl font-bold mb-4" style={{ color: 'oklch(0.25 0.005 0)' }}>What We Install in a Xeriscape Transformation</h2>
            <ul className="list-disc pl-5 mb-8 space-y-1">
              <li>Drought-tolerant native and adapted plants</li>
              <li>Decorative rock, gravel, and decomposed granite</li>
              <li>Drip irrigation systems for precise water delivery</li>
              <li>Weed barrier fabric and mulch installation</li>
              <li>Boulders and natural stone accents</li>
              <li>Permeable hardscape (patios, pathways)</li>
              <li>Soil amendment and preparation</li>
              <li>Landscape lighting (optional)</li>
            </ul>

            <h2 className="text-3xl font-bold mb-4" style={{ color: 'oklch(0.25 0.005 0)' }}>Xeriscape Cost in La Pine</h2>
            <p className="mb-4">A front yard xeriscape in La Pine typically costs $8,000–$25,000 depending on square footage, design complexity, and whether existing turf needs removal.</p>
            <p className="mb-4">We provide detailed, itemized proposals after a free on-site consultation. Our design team will show you plant options, material samples, and a layout before any work begins.</p>
            <div className="bg-gray-100 p-6 rounded-lg mb-8 border-l-4" style={{ borderColor: 'oklch(0.46 0.20 25)' }}>
              <p className="font-bold text-lg mb-2" style={{ color: 'oklch(0.25 0.005 0)' }}>PRO TIP</p>
              <p>Check with your local water utility about turf replacement rebates. Many Central Oregon water providers offer $0.50–$1.00 per square foot for converting lawn to xeriscape — potentially saving you thousands on your project.</p>
            </div>
            <div className="p-8 text-center mt-12" style={{ backgroundColor: 'oklch(0.18 0.008 0)' }}>
              <p className="font-label text-xs mb-3" style={{ color:'oklch(0.46 0.20 25)',letterSpacing:'0.18em' }}>GET STARTED TODAY</p>
              <h3 className="font-display text-white mb-4" style={{ fontSize:'1.6rem' }}>Free Xeriscape Consultation in La Pine</h3>
              <p className="font-body mb-6" style={{ color:'oklch(0.72 0.005 0)',lineHeight:1.7 }}>Our xeriscape design team serves La Pine and all of Central Oregon. We'll assess your property and provide a detailed proposal at no cost.</p>
              <Link href="/contact"><span className="btn-red inline-block">Schedule Your Free Xeriscape Consultation →</span></Link>
              <p className="mt-4 text-sm" style={{ color:'oklch(0.60 0.005 0)' }}>Or call us: (541) 617-8873</p>
            </div>

            <div className="mt-12 pt-10" style={{ borderTop: '1px solid oklch(0.88 0.005 0)' }}>
              <p className="font-label mb-2" style={{ color: 'oklch(0.46 0.20 25)', fontSize: '0.62rem', letterSpacing: '0.18em' }}>YOU MIGHT ALSO LIKE</p>
              <h2 className="font-display font-light mb-6" style={{ fontSize: 'clamp(1.3rem, 2vw, 1.8rem)', color: 'oklch(0.15 0.005 0)' }}>More Helpful Guides</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Link href="/resources/xeriscape-cost-bend-oregon"><span style={{ display:'block',padding:'1.1rem 1.25rem',backgroundColor:'oklch(1 0 0)',borderLeft:'3px solid oklch(0.46 0.20 25)',textDecoration:'none' }}><div className="font-body" style={{ color:'oklch(0.22 0.008 30)',fontWeight:600,fontSize:'0.85rem',marginBottom:'0.3rem' }}>Xeriscape Cost in Bend</div><div className="font-body" style={{ color:'oklch(0.50 0.008 30)',fontSize:'0.75rem',fontWeight:300,lineHeight:1.5 }}>What water-wise landscaping costs in Central Oregon.</div></span></Link>
                <Link href="/resources/best-plants-xeriscape-central-oregon"><span style={{ display:'block',padding:'1.1rem 1.25rem',backgroundColor:'oklch(1 0 0)',borderLeft:'3px solid oklch(0.46 0.20 25)',textDecoration:'none' }}><div className="font-body" style={{ color:'oklch(0.22 0.008 30)',fontWeight:600,fontSize:'0.85rem',marginBottom:'0.3rem' }}>Best Plants for Xeriscaping</div><div className="font-body" style={{ color:'oklch(0.50 0.008 30)',fontSize:'0.75rem',fontWeight:300,lineHeight:1.5 }}>Drought-tolerant plants that thrive in Central Oregon.</div></span></Link>
                <Link href="/resources/bend-turf-rebate-program"><span style={{ display:'block',padding:'1.1rem 1.25rem',backgroundColor:'oklch(1 0 0)',borderLeft:'3px solid oklch(0.46 0.20 25)',textDecoration:'none' }}><div className="font-body" style={{ color:'oklch(0.22 0.008 30)',fontWeight:600,fontSize:'0.85rem',marginBottom:'0.3rem' }}>Bend Turf Rebate Program</div><div className="font-body" style={{ color:'oklch(0.50 0.008 30)',fontSize:'0.75rem',fontWeight:300,lineHeight:1.5 }}>Get rebates for converting your lawn to xeriscape.</div></span></Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
