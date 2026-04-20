import Navbar from '@/components/Navbar';
import SEO from '@/components/SEO';
import { BreadcrumbSchema, FAQSchema } from '@/components/SchemaMarkup';
import { Link } from 'wouter';

export default function NativeVsAdaptedPlantsBend() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: 'oklch(0.97 0.003 0)' }}>
      <SEO
        title="Native vs. Adapted Plants for Bend, OR | Newport Ave Landscaping"
        description="Native vs. adapted plants for Bend, Oregon landscapes. Which plants thrive in Central Oregon's high desert climate?"
        canonical="https://newportavelandscaping.com/resources/native-vs-adapted-plants-bend-oregon"
      />
      <BreadcrumbSchema items={[
        { name: 'Home', url: '/' },
        { name: 'Resources', url: '/resources' },
        { name: 'Native vs. Adapted Plants: What Works Best in Bend?', url: '/resources/native-vs-adapted-plants-bend-oregon' },
      ]} />
      <FAQSchema faqs={[
        { question: `What are the main differences between native and adapted plants for landscaping in Bend, Oregon?`, answer: `Native plants are indigenous to Bend and Central Oregon, naturally thriving in our unique climate Zone 6a, volcanic soil, and 11 inches of annual rainfall without much intervention. Adapted plants, while not native, are well-suited to these conditions and can flourish with minimal extra care, offering a broader range of aesthetic choices for your landscape.` },
        { question: `How do Bend's volcanic soil and freeze-thaw cycles impact plant selection?`, answer: `Bend's volcanic soil, often sandy and low in nutrients, combined with significant freeze-thaw cycles, presents challenges for many plants. Native plants have evolved to handle these conditions, while adapted plants chosen for their resilience to such stressors will also perform well, preventing issues like root damage and nutrient deficiencies.` },
        { question: `What are the benefits of choosing native plants for a Bend landscape?`, answer: `Opting for native plants in Bend offers numerous ecological benefits, including supporting local wildlife, requiring less water once established, and generally being more resistant to regional pests and diseases. They are perfectly suited to the 11 inches of annual rainfall and the specific climate of Central Oregon, making them a sustainable choice.` },
        { question: `Can adapted plants be as low-maintenance as native plants in Bend's climate?`, answer: `Yes, many adapted plants can be very low-maintenance in Bend, provided they are selected carefully to match our climate Zone 6a and volcanic soil conditions. Newport Avenue Landscaping specializes in identifying and installing adapted species that require minimal water and care, blending seamlessly with the natural environment while offering diverse design options.` },
        { question: `Where can I find reliable information or assistance for choosing plants suitable for Bend, Oregon?`, answer: `For expert guidance on selecting the best native and adapted plants for your Bend property, considering factors like our unique volcanic soil and freeze-thaw cycles, Newport Avenue Landscaping offers comprehensive consultation and design services. We ensure your landscape thrives with plants perfectly suited to Central Oregon's environment.` },
        { question: `Do native or adapted plants help with water conservation in Bend?`, answer: `Both native and well-chosen adapted plants significantly contribute to water conservation in Bend. They are naturally more drought-tolerant and require less supplemental irrigation than conventional landscaping plants, which is crucial given our limited 11 inches of annual rainfall. This helps create a beautiful, sustainable, and water-efficient landscape.` },
      ]} />
      <Navbar />
      <div style={{ paddingTop: '204px' }}>
        <div className="relative flex items-center justify-center" style={{ height:'380px',backgroundImage:'url(https://d2xsxph8kpxj0f.cloudfront.net/310519663503028182/g3pw3MRUapabcDUbhBEFxx/brokentop-xeriscape-01_064e5008.jpg',backgroundSize:'cover',backgroundPosition:'center 50%' }}>
          <div className="absolute inset-0" style={{ backgroundColor: 'oklch(0 0 0 / 0.55)' }} />
          <div className="relative text-center container">
            <p className="font-label mb-3" style={{ color:'oklch(0.72 0.12 25)',fontSize:'0.7rem',letterSpacing:'0.18em' }}>PLANTING GUIDE · BEND, OREGON &middot; 2024</p>
            <h1 className="font-display text-white" style={{ fontSize:'clamp(1.8rem, 4vw, 3rem)',maxWidth:'700px',margin:'0 auto' }}>Native vs. Adapted Plants: What Works Best in Bend?</h1>
          </div>
        </div>
        <div className="container py-16 max-w-3xl mx-auto">
          <div style={{ color: 'oklch(0.25 0.005 0)' }}>
            <p className="mb-8" style={{ fontSize:'1.05rem',lineHeight:1.85,color:'oklch(0.35 0.005 0)' }}>When designing a water-wise landscape in Bend, one of the first questions is: should I use native plants or adapted plants? Both have a place in Central Oregon landscapes, and the best designs often use both. Here's what you need to know.</p>

            <h2 className="text-3xl font-bold mb-4" style={{ color: 'oklch(0.25 0.005 0)' }}>What Are Native Plants?</h2>
            <p className="mb-4">Native plants are species that evolved in Central Oregon's specific ecosystem — the high desert, ponderosa pine forest, and sagebrush steppe. They're perfectly adapted to our soil, climate, and rainfall patterns.</p>
            <p className="mb-8">Examples of Central Oregon natives: penstemon, rabbitbrush, sagebrush, bitterbrush, native bunch grasses (Idaho fescue, bluebunch wheatgrass), and Oregon grape.</p>

            <h2 className="text-3xl font-bold mb-4" style={{ color: 'oklch(0.25 0.005 0)' }}>What Are Adapted Plants?</h2>
            <p className="mb-4">Adapted plants are species from similar climates around the world — Mediterranean regions, the Great Basin, the Rocky Mountains, or other semi-arid areas. They're not native to Central Oregon, but they thrive in our conditions.</p>
            <p className="mb-8">Examples of adapted plants for Bend: lavender, Russian sage, catmint, salvia, yarrow, sedum, ornamental grasses (Blue Oat Grass, Karl Foerster), and many drought-tolerant shrubs.</p>

            <h2 className="text-3xl font-bold mb-4" style={{ color: 'oklch(0.25 0.005 0)' }}>Our Recommendation for Bend Landscapes</h2>
            <p className="mb-4">We typically recommend a mix of both. Natives provide ecological value — supporting pollinators, birds, and beneficial insects that are adapted to these specific plants. Adapted plants often provide more color, longer bloom times, and more design flexibility.</p>
            <p className="mb-4">The key is choosing plants that are genuinely drought-tolerant once established. Many plants marketed as "drought-tolerant" still require significant irrigation in Bend's climate. We've learned which plants actually perform well here through 21 years of experience.</p>
            <div className="bg-gray-100 p-6 rounded-lg mb-8 border-l-4" style={{ borderColor: 'oklch(0.46 0.20 25)' }}>
              <p className="font-bold text-lg mb-2" style={{ color: 'oklch(0.25 0.005 0)' }}>PRO TIP</p>
              <p>The first summer after planting is critical for establishment. Even drought-tolerant plants need regular irrigation during their first growing season. After that, most can survive on natural rainfall with minimal supplemental watering.</p>
            </div>
            <div className="p-8 text-center mt-12" style={{ backgroundColor: 'oklch(0.18 0.008 0)' }}>
              <p className="font-label text-xs mb-3" style={{ color:'oklch(0.46 0.20 25)',letterSpacing:'0.18em' }}>GET STARTED TODAY</p>
              <h3 className="font-display text-white mb-4" style={{ fontSize:'1.6rem' }}>Get a Free Planting Design Consultation in Bend</h3>
              <p className="font-body mb-6" style={{ color:'oklch(0.72 0.005 0)',lineHeight:1.7 }}>Our design team will create a plant palette that's beautiful, water-efficient, and perfectly suited to your Bend property.</p>
              <Link href="/contact"><span className="btn-red inline-block">Schedule Your Free Consultation →</span></Link>
              <p className="mt-4 text-sm" style={{ color:'oklch(0.60 0.005 0)' }}>Or call us: (541) 617-8873</p>
            </div>

            <div className="mt-12 pt-10" style={{ borderTop: '1px solid oklch(0.88 0.005 0)' }}>
              <p className="font-label mb-2" style={{ color: 'oklch(0.46 0.20 25)', fontSize: '0.62rem', letterSpacing: '0.18em' }}>YOU MIGHT ALSO LIKE</p>
              <h2 className="font-display font-light mb-6" style={{ fontSize: 'clamp(1.3rem, 2vw, 1.8rem)', color: 'oklch(0.15 0.005 0)' }}>More Helpful Guides</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Link href="/resources/best-plants-xeriscape-central-oregon"><span style={{ display:'block',padding:'1.1rem 1.25rem',backgroundColor:'oklch(1 0 0)',borderLeft:'3px solid oklch(0.46 0.20 25)',textDecoration:'none' }}><div className="font-body" style={{ color:'oklch(0.22 0.008 30)',fontWeight:600,fontSize:'0.85rem',marginBottom:'0.3rem' }}>Best Plants for Xeriscaping</div><div className="font-body" style={{ color:'oklch(0.50 0.008 30)',fontSize:'0.75rem',fontWeight:300,lineHeight:1.5 }}>Drought-tolerant plants that thrive in Central Oregon.</div></span></Link>
                <Link href="/resources/xeriscape-cost-bend-oregon"><span style={{ display:'block',padding:'1.1rem 1.25rem',backgroundColor:'oklch(1 0 0)',borderLeft:'3px solid oklch(0.46 0.20 25)',textDecoration:'none' }}><div className="font-body" style={{ color:'oklch(0.22 0.008 30)',fontWeight:600,fontSize:'0.85rem',marginBottom:'0.3rem' }}>Xeriscape Cost in Bend</div><div className="font-body" style={{ color:'oklch(0.50 0.008 30)',fontSize:'0.75rem',fontWeight:300,lineHeight:1.5 }}>What water-wise landscaping costs in Central Oregon.</div></span></Link>
                <Link href="/resources/xeriscape-vs-traditional-lawn-bend-oregon"><span style={{ display:'block',padding:'1.1rem 1.25rem',backgroundColor:'oklch(1 0 0)',borderLeft:'3px solid oklch(0.46 0.20 25)',textDecoration:'none' }}><div className="font-body" style={{ color:'oklch(0.22 0.008 30)',fontWeight:600,fontSize:'0.85rem',marginBottom:'0.3rem' }}>Xeriscape vs. Traditional Lawn</div><div className="font-body" style={{ color:'oklch(0.50 0.008 30)',fontSize:'0.75rem',fontWeight:300,lineHeight:1.5 }}>Comparing water use, cost, and maintenance.</div></span></Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
