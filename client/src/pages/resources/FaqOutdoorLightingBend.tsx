import Navbar from '@/components/Navbar';
import SEO from '@/components/SEO';
import { BreadcrumbSchema } from '@/components/SchemaMarkup';
import { Link } from 'wouter';

export default function FaqOutdoorLightingBend() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: 'oklch(0.97 0.003 0)' }}>
      <SEO
        title="Outdoor Lighting FAQ — Bend, Oregon | Newport Ave Landscaping"
        description="Common questions about landscape lighting installation in Bend, Oregon. Costs, LED vs. halogen, smart systems, and more."
        canonical="https://newportavelandscaping.com/resources/faq-outdoor-lighting-bend-oregon"
      />
      <BreadcrumbSchema items={[
        { name: 'Home', url: '/' },
        { name: 'Resources', url: '/resources' },
        { name: 'Outdoor Lighting FAQ: Bend, Oregon Homeowners Ask', url: '/resources/faq-outdoor-lighting-bend-oregon' },
      ]} />
      <Navbar />
      <div style={{ paddingTop: '328px' }}>
        <div className="relative flex items-center justify-center" style={{ height:'380px',backgroundImage:'url(https://d2xsxph8kpxj0f.cloudfront.net/310519663503028182/g3pw3MRUapabcDUbhBEFxx/ITP_7404_28389405.jpg)',backgroundSize:'cover',backgroundPosition:'center 50%' }}>
          <div className="absolute inset-0" style={{ backgroundColor: 'oklch(0 0 0 / 0.55)' }} />
          <div className="relative text-center container">
            <p className="font-label mb-3" style={{ color:'oklch(0.72 0.12 25)',fontSize:'0.7rem',letterSpacing:'0.18em' }}>OUTDOOR LIGHTING · BEND, OREGON &middot; 2024</p>
            <h1 className="font-display text-white" style={{ fontSize:'clamp(1.8rem, 4vw, 3rem)',maxWidth:'700px',margin:'0 auto' }}>Outdoor Lighting FAQ: Bend, Oregon Homeowners Ask</h1>
          </div>
        </div>
        <div className="container py-16 max-w-3xl mx-auto">
          <div style={{ color: 'oklch(0.25 0.005 0)' }}>
            <p className="mb-8" style={{ fontSize:'1.05rem',lineHeight:1.85,color:'oklch(0.35 0.005 0)' }}>Landscape lighting is one of the most transformative additions to a Bend property — and one of the most misunderstood. Here are the questions we hear most often from Central Oregon homeowners considering a lighting system.</p>

            <h2 className="text-3xl font-bold mb-4" style={{ color: 'oklch(0.25 0.005 0)' }}>How much does landscape lighting cost in Bend?</h2>
            <p className="mb-4">A basic pathway lighting system (8–12 lights) typically costs $800–$2,000 installed. A mid-range system with 15–25 lights covering pathways, uplights, and accent features runs $2,000–$5,000. Full property systems with 25–50+ lights cost $5,000–$15,000+.</p>
            <p className="mb-8">We provide free, itemized estimates after an on-site consultation. We can also do a nighttime walkthrough to show you exactly where lights would be placed and what effect they'll create.</p>

            <h2 className="text-3xl font-bold mb-4" style={{ color: 'oklch(0.25 0.005 0)' }}>Should I choose LED or traditional halogen lighting?</h2>
            <p className="mb-4">We exclusively install LED landscape lighting. LEDs use 75% less energy than halogen, last 25,000–50,000 hours (vs. 2,000 for halogen), and produce better, more consistent light quality.</p>
            <p className="mb-8">The higher upfront cost of LED fixtures is recovered in energy savings within 2–3 years. We don't install halogen systems anymore — the long-term economics just don't make sense.</p>

            <h2 className="text-3xl font-bold mb-4" style={{ color: 'oklch(0.25 0.005 0)' }}>Can landscape lighting handle Bend's winters?</h2>
            <p className="mb-4">Yes. All fixtures we install are rated for outdoor use in freeze-thaw climates. We use quality fixtures from manufacturers like VOLT, Kichler, and FX Luminaire that are tested for temperature extremes.</p>
            <p className="mb-4">Low-voltage LED systems are very durable in Bend's climate. The main maintenance task is occasional cleaning of fixture lenses and checking connections after heavy snow or ice.</p>
            <div className="bg-gray-100 p-6 rounded-lg mb-8 border-l-4" style={{ borderColor: 'oklch(0.46 0.20 25)' }}>
              <p className="font-bold text-lg mb-2" style={{ color: 'oklch(0.25 0.005 0)' }}>PRO TIP</p>
              <p>A smart transformer with a built-in timer and photocell turns your lights on at dusk and off at dawn automatically. Adding a smart controller allows you to adjust schedules and brightness from your phone.</p>
            </div>
            <div className="p-8 text-center mt-12" style={{ backgroundColor: 'oklch(0.18 0.008 0)' }}>
              <p className="font-label text-xs mb-3" style={{ color:'oklch(0.46 0.20 25)',letterSpacing:'0.18em' }}>GET STARTED TODAY</p>
              <h3 className="font-display text-white mb-4" style={{ fontSize:'1.6rem' }}>Get a Free Lighting Consultation in Bend</h3>
              <p className="font-body mb-6" style={{ color:'oklch(0.72 0.005 0)',lineHeight:1.7 }}>Our lighting design team will walk your property and create a plan that transforms your landscape after dark.</p>
              <Link href="/contact"><span className="btn-red inline-block">Schedule Your Free Lighting Consultation →</span></Link>
              <p className="mt-4 text-sm" style={{ color:'oklch(0.60 0.005 0)' }}>Or call us: (541) 617-8873</p>
            </div>

            <div className="mt-12 pt-10" style={{ borderTop: '1px solid oklch(0.88 0.005 0)' }}>
              <p className="font-label mb-2" style={{ color: 'oklch(0.46 0.20 25)', fontSize: '0.62rem', letterSpacing: '0.18em' }}>YOU MIGHT ALSO LIKE</p>
              <h2 className="font-display font-light mb-6" style={{ fontSize: 'clamp(1.3rem, 2vw, 1.8rem)', color: 'oklch(0.15 0.005 0)' }}>More Helpful Guides</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Link href="/resources/outdoor-lighting-cost-bend-oregon"><span style={{ display:'block',padding:'1.1rem 1.25rem',backgroundColor:'oklch(1 0 0)',borderLeft:'3px solid oklch(0.46 0.20 25)',textDecoration:'none' }}><div className="font-body" style={{ color:'oklch(0.22 0.008 30)',fontWeight:600,fontSize:'0.85rem',marginBottom:'0.3rem' }}>Outdoor Lighting Cost in Bend</div><div className="font-body" style={{ color:'oklch(0.50 0.008 30)',fontSize:'0.75rem',fontWeight:300,lineHeight:1.5 }}>Landscape lighting installation pricing in Bend.</div></span></Link>
                <Link href="/resources/landscape-lighting-bend-oregon"><span style={{ display:'block',padding:'1.1rem 1.25rem',backgroundColor:'oklch(1 0 0)',borderLeft:'3px solid oklch(0.46 0.20 25)',textDecoration:'none' }}><div className="font-body" style={{ color:'oklch(0.22 0.008 30)',fontWeight:600,fontSize:'0.85rem',marginBottom:'0.3rem' }}>Landscape Lighting in Bend</div><div className="font-body" style={{ color:'oklch(0.50 0.008 30)',fontSize:'0.75rem',fontWeight:300,lineHeight:1.5 }}>Design ideas and tips for Central Oregon properties.</div></span></Link>
                <Link href="/resources/paver-patio-cost-bend-oregon"><span style={{ display:'block',padding:'1.1rem 1.25rem',backgroundColor:'oklch(1 0 0)',borderLeft:'3px solid oklch(0.46 0.20 25)',textDecoration:'none' }}><div className="font-body" style={{ color:'oklch(0.22 0.008 30)',fontWeight:600,fontSize:'0.85rem',marginBottom:'0.3rem' }}>Paver Patio Cost in Bend</div><div className="font-body" style={{ color:'oklch(0.50 0.008 30)',fontSize:'0.75rem',fontWeight:300,lineHeight:1.5 }}>Hardscape pricing for Central Oregon projects.</div></span></Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
