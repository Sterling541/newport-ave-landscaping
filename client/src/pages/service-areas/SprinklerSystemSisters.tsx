import Navbar from '@/components/Navbar';
import SEO from '@/components/SEO';
import { BreadcrumbSchema } from '@/components/SchemaMarkup';
import { Link } from 'wouter';

export default function SprinklerSystemSisters() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: 'oklch(0.97 0.003 0)' }}>
      <SEO
        title="Sprinkler System Installation in Sisters, OR | Newport Ave Landscaping"
        description="Professional sprinkler system installation in Sisters, Oregon. Newport Avenue Landscaping — licensed, bonded, 21+ years serving Central Oregon. Free consultations."
        canonical="https://www.newportavelandscaping.com/service-areas/sisters-sprinkler-system"
      />
      <BreadcrumbSchema items={[
        { name: 'Home', url: '/' },
        { name: 'Service Areas', url: '/service-areas' },
        { name: 'Sprinkler System Installation in Sisters', url: '/service-areas/sisters-sprinkler-system' },
      ]} />
      <Navbar />
      <div style={{ paddingTop: '204px' }}>
        <div className="relative flex items-center justify-center" style={{ height:'380px',backgroundImage:'url(/manus-storage/safe-hero-irrigation-wide_7d00acf6.jpg)',backgroundSize:'cover',backgroundPosition:'center 50%' }}>
          <div className="absolute inset-0" style={{ backgroundColor: 'oklch(0 0 0 / 0.55)' }} />
          <div className="relative text-center container">
            <p className="font-label mb-3" style={{ color:'oklch(0.72 0.12 25)',fontSize:'0.7rem',letterSpacing:'0.18em' }}>SISTERS · CENTRAL OREGON &middot; 2024</p>
            <h1 className="font-display text-white" style={{ fontSize:'clamp(1.8rem, 4vw, 3rem)',maxWidth:'700px',margin:'0 auto' }}>Sprinkler System Installation in Sisters, Oregon</h1>
          </div>
        </div>
        <div className="container py-16 max-w-3xl mx-auto">
          <div style={{ color: 'oklch(0.25 0.005 0)' }}>
            <p className="mb-8" style={{ fontSize:'1.05rem',lineHeight:1.85,color:'oklch(0.35 0.005 0)' }}>A properly designed sprinkler system is the foundation of a healthy landscape in Central Oregon's high desert climate. Newport Avenue Landscaping installs custom irrigation systems throughout Sisters, designing each system around your specific soil conditions, plant types, and water pressure. Our certified irrigation technicians are licensed with the Oregon Landscape Contractors Board.</p>

            <h2 className="text-3xl font-bold mb-4" style={{ color: 'oklch(0.25 0.005 0)' }}>Irrigation Design for Sisters Properties</h2>
            <p className="mb-4">Every property in Sisters is different — lot size, soil type, plant selection, and water pressure all affect system design. We start every project with a thorough site assessment and water pressure test before designing your zone layout.</p>
            <p className="mb-4">A typical residential system in Sisters costs between $2,500 and $6,000 for 5–10 zones. We provide detailed, itemized proposals so you know exactly what you're getting.</p>
            <div className="overflow-x-auto mb-8"><table className="min-w-full bg-white border border-gray-300"><thead><tr><th className="py-2 px-4 border-b text-left">System Type</th><th className="py-2 px-4 border-b text-left">Typical Cost</th><th className="py-2 px-4 border-b text-left">Best For</th></tr></thead><tbody><tr><td className="py-2 px-4 border-b">Spray zones (lawn)</td><td className="py-2 px-4 border-b">$500–$700/zone</td><td className="py-2 px-4 border-b">Turf areas</td></tr>
                  <tr><td className="py-2 px-4 border-b">Drip irrigation</td><td className="py-2 px-4 border-b">$400–$650/zone</td><td className="py-2 px-4 border-b">Planting beds, shrubs</td></tr>
                  <tr><td className="py-2 px-4 border-b">Smart controller</td><td className="py-2 px-4 border-b">$200–$500</td><td className="py-2 px-4 border-b">Water savings, automation</td></tr>
                  <tr><td className="py-2 px-4 border-b">Full residential system</td><td className="py-2 px-4 border-b">$2,500–$6,000</td><td className="py-2 px-4 border-b">Average home in Sisters</td></tr></tbody></table></div>

            <h2 className="text-3xl font-bold mb-4" style={{ color: 'oklch(0.25 0.005 0)' }}>Winterization Is Essential in Central Oregon</h2>
            <p className="mb-4">Sisters experiences hard freezes every winter. Without proper winterization, water left in your irrigation lines will freeze, expand, and crack pipes and fittings — repairs that can cost $500–$2,000 or more.</p>
            <p className="mb-4">We offer fall blowout service throughout Sisters and recommend scheduling before October 15th — the average first hard freeze date in Central Oregon.</p>
            <div className="bg-gray-100 p-6 rounded-lg mb-8 border-l-4" style={{ borderColor: 'oklch(0.46 0.20 25)' }}>
              <p className="font-bold text-lg mb-2" style={{ color: 'oklch(0.25 0.005 0)' }}>PRO TIP</p>
              <p>Book your Sisters sprinkler blowout before September 30th to guarantee a spot on our schedule. We fill up fast once the first cold snap is forecast.</p>
            </div>
            <div className="p-8 text-center mt-12" style={{ backgroundColor: 'oklch(0.18 0.008 0)' }}>
              <p className="font-label text-xs mb-3" style={{ color:'oklch(0.46 0.20 25)',letterSpacing:'0.18em' }}>GET STARTED TODAY</p>
              <h3 className="font-display text-white mb-4" style={{ fontSize:'1.6rem' }}>Free Irrigation Consultation in Sisters</h3>
              <p className="font-body mb-6" style={{ color:'oklch(0.72 0.005 0)',lineHeight:1.7 }}>Our certified irrigation team serves Sisters year-round. Get a free system design and quote — no obligation.</p>
              <Link href="/contact"><span className="btn-red inline-block">Get Your Free Irrigation Quote →</span></Link>
              <p className="mt-4 text-sm" style={{ color:'oklch(0.60 0.005 0)' }}>Or call us: (541) 617-8873</p>
            </div>

            <div className="mt-12 pt-10" style={{ borderTop: '1px solid oklch(0.88 0.005 0)' }}>
              <p className="font-label mb-2" style={{ color: 'oklch(0.46 0.20 25)', fontSize: '0.62rem', letterSpacing: '0.18em' }}>YOU MIGHT ALSO LIKE</p>
              <h2 className="font-display font-light mb-6" style={{ fontSize: 'clamp(1.3rem, 2vw, 1.8rem)', color: 'oklch(0.15 0.005 0)' }}>More Helpful Guides</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Link href="/resources/sprinkler-system-cost-bend-oregon"><span style={{ display:'block',padding:'1.1rem 1.25rem',backgroundColor:'oklch(1 0 0)',borderLeft:'3px solid oklch(0.46 0.20 25)',textDecoration:'none' }}><div className="font-body" style={{ color:'oklch(0.22 0.008 30)',fontWeight:600,fontSize:'0.85rem',marginBottom:'0.3rem' }}>Sprinkler System Cost in Bend</div><div className="font-body" style={{ color:'oklch(0.50 0.008 30)',fontSize:'0.75rem',fontWeight:300,lineHeight:1.5 }}>Full pricing breakdown for irrigation in Central Oregon.</div></span></Link>
                <Link href="/resources/sprinkler-winterization-guide-bend-oregon"><span style={{ display:'block',padding:'1.1rem 1.25rem',backgroundColor:'oklch(1 0 0)',borderLeft:'3px solid oklch(0.46 0.20 25)',textDecoration:'none' }}><div className="font-body" style={{ color:'oklch(0.22 0.008 30)',fontWeight:600,fontSize:'0.85rem',marginBottom:'0.3rem' }}>Sprinkler Winterization Guide</div><div className="font-body" style={{ color:'oklch(0.50 0.008 30)',fontSize:'0.75rem',fontWeight:300,lineHeight:1.5 }}>How to protect your system before the first freeze.</div></span></Link>
                <Link href="/resources/drip-vs-spray-irrigation-bend-oregon"><span style={{ display:'block',padding:'1.1rem 1.25rem',backgroundColor:'oklch(1 0 0)',borderLeft:'3px solid oklch(0.46 0.20 25)',textDecoration:'none' }}><div className="font-body" style={{ color:'oklch(0.22 0.008 30)',fontWeight:600,fontSize:'0.85rem',marginBottom:'0.3rem' }}>Drip vs. Spray Irrigation</div><div className="font-body" style={{ color:'oklch(0.50 0.008 30)',fontSize:'0.75rem',fontWeight:300,lineHeight:1.5 }}>Which irrigation type is right for your landscape?</div></span></Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
