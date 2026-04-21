import Navbar from '@/components/Navbar';
import SEO from '@/components/SEO';
import { BreadcrumbSchema, FAQSchema } from '@/components/SchemaMarkup';
import { Link } from 'wouter';

export default function OutdoorLightingBend() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: 'oklch(0.97 0.003 0)' }}>
      <SEO
        title="Landscape Lighting Ideas for Bend, OR | Newport Ave Landscaping"
        description="Landscape lighting ideas and design tips for Bend, Oregon homes. How to light your outdoor space for beauty and safety."
        canonical="https://newportavelandscaping.com/resources/landscape-lighting-bend-oregon"
      />
      <BreadcrumbSchema items={[
        { name: 'Home', url: '/' },
        { name: 'Resources', url: '/resources' },
        { name: 'Landscape Lighting Ideas for Bend, Oregon Homes', url: '/resources/landscape-lighting-bend-oregon' },
      ]} />
      <FAQSchema faqs={[
        { question: `What types of outdoor lighting are best suited for Bend's climate and volcanic soil?`, answer: `For Bend's unique climate, characterized by cold winters, hot summers, and volcanic soil, durable and weather-resistant outdoor lighting fixtures are essential. Low-voltage LED lighting is highly recommended due to its energy efficiency and longevity, performing well despite freeze-thaw cycles. Materials like brass, copper, or marine-grade aluminum can withstand the elements and resist corrosion from the soil.` },
        { question: `How can outdoor lighting enhance safety and security around my Bend home?`, answer: `Strategically placed outdoor lighting can significantly improve safety and security by illuminating pathways, entry points, and dark areas around your Bend property. Motion-sensor lights deter potential intruders, while well-lit steps and walkways prevent trips and falls, especially during icy conditions common in winter. It also allows for better visibility of wildlife that might wander into your yard.` },
        { question: `What are the considerations for outdoor lighting design in Bend, given its natural landscape?`, answer: `Designing outdoor lighting in Bend requires careful consideration of the high desert landscape and dark night skies. Uplighting on native trees like Ponderosa pines, path lighting that blends with natural rock features, and subtle accent lighting can highlight your home's architecture and garden without creating light pollution. Newport Avenue Landscaping specializes in designs that complement Bend's natural beauty.` },
        { question: `How does Bend's 11 inches of annual rainfall affect outdoor lighting installation and maintenance?`, answer: `While Bend receives only about 11 inches of annual rainfall, proper installation is crucial to protect outdoor lighting systems from moisture and ensure longevity. Fixtures should be rated for outdoor use (IP65 or higher), and all wiring connections must be waterproofed to prevent shorts and corrosion. Regular checks for debris and proper drainage around fixtures will minimize maintenance needs.` },
        { question: `Can outdoor lighting be customized to fit my specific landscaping style in Bend?`, answer: `Absolutely. Outdoor lighting can be fully customized to complement any landscaping style, from rustic high desert to modern minimalist, prevalent in Bend. Options include various fixture styles, beam spreads, and color temperatures to create the desired ambiance. Newport Avenue Landscaping works closely with clients to design bespoke lighting solutions that enhance their outdoor living spaces.` },
        { question: `What are the benefits of professional outdoor lighting installation in Bend versus a DIY approach?`, answer: `Professional outdoor lighting installation in Bend ensures optimal performance, safety, and aesthetic appeal. Experts understand local electrical codes, proper wiring techniques for volcanic soil, and how to design a system that withstands Bend's weather. A professional installation by Newport Avenue Landscaping also typically comes with warranties and guarantees, providing peace of mind and avoiding costly mistakes.` },
      ]} />
      <Navbar />
      <div style={{ paddingTop: '204px' }}>
        <div className="relative flex items-center justify-center" style={{ height:'380px',backgroundImage:'url(/manus-storage/hero-landscape-lighting-wide_fc474dee.jpg',backgroundSize:'cover',backgroundPosition:'center 50%' }}>
          <div className="absolute inset-0" style={{ backgroundColor: 'oklch(0 0 0 / 0.55)' }} />
          <div className="relative text-center container">
            <p className="font-label mb-3" style={{ color:'oklch(0.72 0.12 25)',fontSize:'0.7rem',letterSpacing:'0.18em' }}>OUTDOOR LIGHTING · BEND, OREGON &middot; 2024</p>
            <h1 className="font-display text-white" style={{ fontSize:'clamp(1.8rem, 4vw, 3rem)',maxWidth:'700px',margin:'0 auto' }}>Landscape Lighting Ideas for Bend, Oregon Homes</h1>
          </div>
        </div>
        <div className="container py-16 max-w-3xl mx-auto">
          <div style={{ color: 'oklch(0.25 0.005 0)' }}>
            <p className="mb-8" style={{ fontSize:'1.05rem',lineHeight:1.85,color:'oklch(0.35 0.005 0)' }}>Landscape lighting transforms a Bend property after dark — creating ambiance, improving safety, and extending the usable hours of your outdoor space. Here are the lighting ideas and design principles we use most often in Central Oregon.</p>

            <h2 className="text-3xl font-bold mb-4" style={{ color: 'oklch(0.25 0.005 0)' }}>Lighting Techniques That Work in Bend</h2>
            <ul className="list-disc pl-5 mb-8 space-y-1">
              <li>Uplighting: Place fixtures at the base of trees, boulders, or architectural features and aim upward. Creates drama and highlights the natural texture of Bend's basalt and ponderosa pines.</li>
              <li>Path lighting: Low-profile fixtures along walkways and driveways. Essential for safety and creates a welcoming arrival experience.</li>
              <li>Moonlighting: Mount fixtures high in trees and aim downward. Creates a natural, dappled light effect that mimics moonlight filtering through branches.</li>
              <li>Accent lighting: Spotlights on specific plants, garden art, or water features. Creates focal points and visual interest.</li>
              <li>Step lighting: Integrated into risers or walls alongside steps. Critical for safety on Bend's often-icy winter steps.</li>
            </ul>

            <h2 className="text-3xl font-bold mb-4" style={{ color: 'oklch(0.25 0.005 0)' }}>Lighting for Bend's Natural Landscape</h2>
            <p className="mb-4">Bend's landscape features — ponderosa pines, basalt boulders, ornamental grasses, and native shrubs — are particularly beautiful when lit from below. The texture of bark, rock, and foliage creates dramatic shadows and depth.</p>
            <p className="mb-4">We design lighting systems that highlight these natural features while maintaining a warm, inviting atmosphere. The goal is lighting that looks intentional but not theatrical.</p>
            <div className="bg-gray-100 p-6 rounded-lg mb-8 border-l-4" style={{ borderColor: 'oklch(0.46 0.20 25)' }}>
              <p className="font-bold text-lg mb-2" style={{ color: 'oklch(0.25 0.005 0)' }}>PRO TIP</p>
              <p>Less is more with landscape lighting. A few well-placed fixtures create more impact than many poorly placed ones. We recommend starting with key focal points — a specimen tree, the front entry, the patio — and adding from there.</p>
            </div>

            <h2 className="text-3xl font-bold mb-4" style={{ color: 'oklch(0.25 0.005 0)' }}>Smart Landscape Lighting Systems</h2>
            <p className="mb-4">Modern landscape lighting systems can be controlled from your smartphone — adjusting brightness, color temperature, and schedules from anywhere. Smart systems also integrate with home automation platforms like Google Home and Amazon Alexa.</p>
            <p className="mb-8">We install smart landscape lighting systems throughout Bend, using quality fixtures from VOLT, Kichler, and FX Luminaire that are designed for outdoor use in our climate.</p>
            <div className="p-8 text-center mt-12" style={{ backgroundColor: 'oklch(0.18 0.008 0)' }}>
              <p className="font-label text-xs mb-3" style={{ color:'oklch(0.46 0.20 25)',letterSpacing:'0.18em' }}>GET STARTED TODAY</p>
              <h3 className="font-display text-white mb-4" style={{ fontSize:'1.6rem' }}>Get a Free Landscape Lighting Consultation in Bend</h3>
              <p className="font-body mb-6" style={{ color:'oklch(0.72 0.005 0)',lineHeight:1.7 }}>Our lighting design team will walk your property and create a lighting plan that transforms your landscape after dark.</p>
              <Link href="/contact"><span className="btn-red inline-block">Schedule Your Free Lighting Consultation →</span></Link>
              <p className="mt-4 text-sm" style={{ color:'oklch(0.60 0.005 0)' }}>Or call us: (541) 617-8873</p>
            </div>

            <div className="mt-12 pt-10" style={{ borderTop: '1px solid oklch(0.88 0.005 0)' }}>
              <p className="font-label mb-2" style={{ color: 'oklch(0.46 0.20 25)', fontSize: '0.62rem', letterSpacing: '0.18em' }}>YOU MIGHT ALSO LIKE</p>
              <h2 className="font-display font-light mb-6" style={{ fontSize: 'clamp(1.3rem, 2vw, 1.8rem)', color: 'oklch(0.15 0.005 0)' }}>More Helpful Guides</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Link href="/resources/landscape-lighting-cost-bend-oregon"><span style={{ display:'block',padding:'1.1rem 1.25rem',backgroundColor:'oklch(1 0 0)',borderLeft:'3px solid oklch(0.46 0.20 25)',textDecoration:'none' }}><div className="font-body" style={{ color:'oklch(0.22 0.008 30)',fontWeight:600,fontSize:'0.85rem',marginBottom:'0.3rem' }}>Landscape Lighting Cost in Bend</div><div className="font-body" style={{ color:'oklch(0.50 0.008 30)',fontSize:'0.75rem',fontWeight:300,lineHeight:1.5 }}>Landscape lighting installation pricing in Bend.</div></span></Link>
                <Link href="/resources/faq-outdoor-lighting-bend-oregon"><span style={{ display:'block',padding:'1.1rem 1.25rem',backgroundColor:'oklch(1 0 0)',borderLeft:'3px solid oklch(0.46 0.20 25)',textDecoration:'none' }}><div className="font-body" style={{ color:'oklch(0.22 0.008 30)',fontWeight:600,fontSize:'0.85rem',marginBottom:'0.3rem' }}>Outdoor Lighting FAQ</div><div className="font-body" style={{ color:'oklch(0.50 0.008 30)',fontSize:'0.75rem',fontWeight:300,lineHeight:1.5 }}>Common questions about landscape lighting in Bend.</div></span></Link>
                <Link href="/resources/paver-patio-cost-bend-oregon"><span style={{ display:'block',padding:'1.1rem 1.25rem',backgroundColor:'oklch(1 0 0)',borderLeft:'3px solid oklch(0.46 0.20 25)',textDecoration:'none' }}><div className="font-body" style={{ color:'oklch(0.22 0.008 30)',fontWeight:600,fontSize:'0.85rem',marginBottom:'0.3rem' }}>Paver Patio Cost in Bend</div><div className="font-body" style={{ color:'oklch(0.50 0.008 30)',fontSize:'0.75rem',fontWeight:300,lineHeight:1.5 }}>Hardscape pricing for Central Oregon projects.</div></span></Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
