import Navbar from '@/components/Navbar';
import SEO from '@/components/SEO';
import { BreadcrumbSchema } from '@/components/SchemaMarkup';
import { Link } from 'wouter';

export default function LawnCareMadras() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: 'oklch(0.97 0.003 0)' }}>
      <SEO
        title="Lawn Care & Maintenance in Madras, OR | Newport Ave Landscaping"
        description="Professional lawn care & maintenance in Madras, Oregon. Newport Avenue Landscaping — licensed, bonded, 21+ years serving Central Oregon. Free consultations."
        canonical="https://newportavelandscaping.com/service-areas/madras-lawn-care"
      />
      <BreadcrumbSchema items={[
        { name: 'Home', url: '/' },
        { name: 'Service Areas', url: '/service-areas' },
        { name: 'Lawn Care & Maintenance in Madras', url: '/service-areas/madras-lawn-care' },
      ]} />
      <Navbar />
      <div style={{ paddingTop: '204px' }}>
        <div className="relative flex items-center justify-center" style={{ height:'380px',backgroundImage:'url(/manus-storage/safe-hero-lawn-service_fcba45d8.jpg)',backgroundSize:'cover',backgroundPosition:'center 50%' }}>
          <div className="absolute inset-0" style={{ backgroundColor: 'oklch(0 0 0 / 0.55)' }} />
          <div className="relative text-center container">
            <p className="font-label mb-3" style={{ color:'oklch(0.72 0.12 25)',fontSize:'0.7rem',letterSpacing:'0.18em' }}>MADRAS · CENTRAL OREGON &middot; 2024</p>
            <h1 className="font-display text-white" style={{ fontSize:'clamp(1.8rem, 4vw, 3rem)',maxWidth:'700px',margin:'0 auto' }}>Lawn Care & Maintenance in Madras, Oregon</h1>
          </div>
        </div>
        <div className="container py-16 max-w-3xl mx-auto">
          <div style={{ color: 'oklch(0.25 0.005 0)' }}>
            <p className="mb-8" style={{ fontSize:'1.05rem',lineHeight:1.85,color:'oklch(0.35 0.005 0)' }}>Newport Avenue Landscaping provides comprehensive lawn care services throughout Madras, including weekly mowing, seasonal cleanups, aeration, fertilization, and weed control. Our Everything Residential Maintenance Plan covers it all — starting at $388/month.</p>

            <h2 className="text-3xl font-bold mb-4" style={{ color: 'oklch(0.25 0.005 0)' }}>Lawn Care Services in Madras</h2>
            <ul className="list-disc pl-5 mb-8 space-y-1">
              <li>Weekly mowing, edging, and blowing</li>
              <li>Spring and fall cleanups</li>
              <li>Core aeration (spring and fall)</li>
              <li>Fertilization program (4–6 applications/year)</li>
              <li>Pre-emergent and post-emergent weed control</li>
              <li>Overseeding for thin or damaged areas</li>
              <li>Lawn fungus treatment and prevention</li>
            </ul>

            <h2 className="text-3xl font-bold mb-4" style={{ color: 'oklch(0.25 0.005 0)' }}>Lawn Care Pricing in Madras</h2>
            <p className="mb-4">Our Everything Residential Maintenance Plan starts at $388/month for a typical Madras home. We provide free consultations and will assess your lawn's current condition before recommending a care plan.</p>
            <div className="overflow-x-auto mb-8"><table className="min-w-full bg-white border border-gray-300"><thead><tr><th className="py-2 px-4 border-b text-left">Service</th><th className="py-2 px-4 border-b text-left">Typical Cost</th></tr></thead><tbody><tr><td className="py-2 px-4 border-b">Weekly mowing & edging</td><td className="py-2 px-4 border-b">From $45/visit</td></tr>
                  <tr><td className="py-2 px-4 border-b">Spring cleanup</td><td className="py-2 px-4 border-b">$200–$600</td></tr>
                  <tr><td className="py-2 px-4 border-b">Core aeration</td><td className="py-2 px-4 border-b">$150–$400</td></tr>
                  <tr><td className="py-2 px-4 border-b">Everything Plan</td><td className="py-2 px-4 border-b">From $388/month</td></tr></tbody></table></div>
            <div className="p-8 text-center mt-12" style={{ backgroundColor: 'oklch(0.18 0.008 0)' }}>
              <p className="font-label text-xs mb-3" style={{ color:'oklch(0.46 0.20 25)',letterSpacing:'0.18em' }}>GET STARTED TODAY</p>
              <h3 className="font-display text-white mb-4" style={{ fontSize:'1.6rem' }}>Get a Free Lawn Care Quote in Madras</h3>
              <p className="font-body mb-6" style={{ color:'oklch(0.72 0.005 0)',lineHeight:1.7 }}>We serve Madras and all of Central Oregon. Tell us about your lawn and we'll put together a custom care plan.</p>
              <Link href="/contact"><span className="btn-red inline-block">Get Your Free Lawn Care Quote →</span></Link>
              <p className="mt-4 text-sm" style={{ color:'oklch(0.60 0.005 0)' }}>Or call us: (541) 617-8873</p>
            </div>

            <div className="mt-12 pt-10" style={{ borderTop: '1px solid oklch(0.88 0.005 0)' }}>
              <p className="font-label mb-2" style={{ color: 'oklch(0.46 0.20 25)', fontSize: '0.62rem', letterSpacing: '0.18em' }}>YOU MIGHT ALSO LIKE</p>
              <h2 className="font-display font-light mb-6" style={{ fontSize: 'clamp(1.3rem, 2vw, 1.8rem)', color: 'oklch(0.15 0.005 0)' }}>More Helpful Guides</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Link href="/resources/lawn-maintenance-cost-bend-oregon"><span style={{ display:'block',padding:'1.1rem 1.25rem',backgroundColor:'oklch(1 0 0)',borderLeft:'3px solid oklch(0.46 0.20 25)',textDecoration:'none' }}><div className="font-body" style={{ color:'oklch(0.22 0.008 30)',fontWeight:600,fontSize:'0.85rem',marginBottom:'0.3rem' }}>Lawn Maintenance Cost in Bend</div><div className="font-body" style={{ color:'oklch(0.50 0.008 30)',fontSize:'0.75rem',fontWeight:300,lineHeight:1.5 }}>What lawn care services cost in Central Oregon.</div></span></Link>
                <Link href="/resources/when-to-aerate-lawn-bend-oregon"><span style={{ display:'block',padding:'1.1rem 1.25rem',backgroundColor:'oklch(1 0 0)',borderLeft:'3px solid oklch(0.46 0.20 25)',textDecoration:'none' }}><div className="font-body" style={{ color:'oklch(0.22 0.008 30)',fontWeight:600,fontSize:'0.85rem',marginBottom:'0.3rem' }}>When to Aerate Your Lawn in Bend</div><div className="font-body" style={{ color:'oklch(0.50 0.008 30)',fontSize:'0.75rem',fontWeight:300,lineHeight:1.5 }}>Best timing for aeration in Central Oregon.</div></span></Link>
                <Link href="/resources/faq-lawn-care-bend-oregon"><span style={{ display:'block',padding:'1.1rem 1.25rem',backgroundColor:'oklch(1 0 0)',borderLeft:'3px solid oklch(0.46 0.20 25)',textDecoration:'none' }}><div className="font-body" style={{ color:'oklch(0.22 0.008 30)',fontWeight:600,fontSize:'0.85rem',marginBottom:'0.3rem' }}>Lawn Care FAQ</div><div className="font-body" style={{ color:'oklch(0.50 0.008 30)',fontSize:'0.75rem',fontWeight:300,lineHeight:1.5 }}>Common questions about lawn care in Bend.</div></span></Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
