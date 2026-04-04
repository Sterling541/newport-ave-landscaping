import Navbar from '@/components/Navbar';
import SEO from '@/components/SEO';
import { BreadcrumbSchema } from '@/components/SchemaMarkup';
import { Link } from 'wouter';

export default function IrrigationCrookedRiverRanch() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: 'oklch(0.97 0.003 0)' }}>
      <SEO
        title="Irrigation Installation & Repair in Crooked River Ranch, OR | Newport Ave Landscaping"
        description="Professional irrigation installation & repair in Crooked River Ranch, Oregon. Newport Avenue Landscaping — licensed, bonded, 21+ years serving Central Oregon. Free consultations."
        canonical="https://newportavelandscaping.com/service-areas/crooked-river-ranch-irrigation"
      />
      <BreadcrumbSchema items={[
        { name: 'Home', url: '/' },
        { name: 'Service Areas', url: '/service-areas' },
        { name: 'Irrigation Installation & Repair in Crooked River Ranch', url: '/service-areas/crooked-river-ranch-irrigation' },
      ]} />
      <Navbar />
      <div style={{ paddingTop: '204px' }}>
        <div className="relative flex items-center justify-center" style={{ height:'380px',backgroundImage:'url(https://files.manuscdn.com/user_upload_by_module/session_file/310519663503028182/QuZbCMdvWnmWDtAV.jpg',backgroundSize:'cover',backgroundPosition:'center 50%' }}>
          <div className="absolute inset-0" style={{ backgroundColor: 'oklch(0 0 0 / 0.55)' }} />
          <div className="relative text-center container">
            <p className="font-label mb-3" style={{ color:'oklch(0.72 0.12 25)',fontSize:'0.7rem',letterSpacing:'0.18em' }}>CROOKED RIVER RANCH · CENTRAL OREGON &middot; 2024</p>
            <h1 className="font-display text-white" style={{ fontSize:'clamp(1.8rem, 4vw, 3rem)',maxWidth:'700px',margin:'0 auto' }}>Irrigation Installation & Repair in Crooked River Ranch, Oregon</h1>
          </div>
        </div>
        <div className="container py-16 max-w-3xl mx-auto">
          <div style={{ color: 'oklch(0.25 0.005 0)' }}>
            <p className="mb-8" style={{ fontSize:'1.05rem',lineHeight:1.85,color:'oklch(0.35 0.005 0)' }}>A properly designed irrigation system is the foundation of a healthy landscape in Crooked River Ranch's high desert climate. Newport Avenue Landscaping installs and repairs custom irrigation systems throughout Central Oregon, with certified technicians and a commitment to water efficiency.</p>

            <h2 className="text-3xl font-bold mb-4" style={{ color: 'oklch(0.25 0.005 0)' }}>Irrigation Services in Crooked River Ranch</h2>
            <p className="mb-4">We design and install new sprinkler systems, repair existing systems, and provide fall winterization throughout Crooked River Ranch. Our certified irrigation technicians are licensed with the Oregon Landscape Contractors Board.</p>
            <p className="mb-8">A typical residential system in Crooked River Ranch costs $2,500–$6,000 for 5–10 zones. We provide detailed, itemized proposals after a site assessment.</p>

            <h2 className="text-3xl font-bold mb-4" style={{ color: 'oklch(0.25 0.005 0)' }}>Winterization Is Critical in Central Oregon</h2>
            <p className="mb-4">Crooked River Ranch experiences hard freezes every winter. Without proper winterization, water left in your irrigation lines will freeze and crack pipes and fittings.</p>
            <div className="bg-gray-100 p-6 rounded-lg mb-8 border-l-4" style={{ borderColor: 'oklch(0.46 0.20 25)' }}>
              <p className="font-bold text-lg mb-2" style={{ color: 'oklch(0.25 0.005 0)' }}>PRO TIP</p>
              <p>Book your Crooked River Ranch sprinkler blowout before October 15th. We fill up fast once the first cold snap is forecast.</p>
            </div>
            <div className="p-8 text-center mt-12" style={{ backgroundColor: 'oklch(0.18 0.008 0)' }}>
              <p className="font-label text-xs mb-3" style={{ color:'oklch(0.46 0.20 25)',letterSpacing:'0.18em' }}>GET STARTED TODAY</p>
              <h3 className="font-display text-white mb-4" style={{ fontSize:'1.6rem' }}>Free Irrigation Consultation in Crooked River Ranch</h3>
              <p className="font-body mb-6" style={{ color:'oklch(0.72 0.005 0)',lineHeight:1.7 }}>Our certified irrigation team serves Crooked River Ranch year-round. Get a free system design and quote.</p>
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
