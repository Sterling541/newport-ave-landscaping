import Navbar from '@/components/Navbar';
import SEO from '@/components/SEO';
import { BreadcrumbSchema } from '@/components/SchemaMarkup';
import { Link } from 'wouter';

const FAQ_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How much does landscaping cost in Awbrey Butte, Bend?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Awbrey Butte landscaping projects typically range from $15,000\u2013$80,000+ for full-yard installations due to the neighborhood's larger lot sizes, steep topography, and high aesthetic standards. Irrigation systems run $1,600\u2013$2,000 per zone. Paver patios average $22\u2013$32 per square foot installed. Lawn care maintenance starts at $97 per visit. We provide free on-site estimates with detailed written proposals."
      }
    },
    {
      "@type": "Question",
      "name": "Does Awbrey Butte have HOA landscape requirements?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Awbrey Butte has a homeowners association with CC&Rs that govern certain aspects of landscape appearance, including requirements around maintaining the natural character of the neighborhood, restrictions on certain plant types, and standards for lawn and landscape maintenance. Newport Avenue is experienced with Awbrey Butte's HOA requirements and can help ensure your project meets all applicable standards."
      }
    },
    {
      "@type": "Question",
      "name": "What makes Awbrey Butte landscaping different from other Bend neighborhoods?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Awbrey Butte's steep terrain, rocky volcanic soil, panoramic Cascade views, and larger lot sizes create unique landscaping challenges and opportunities. The neighborhood's elevation (3,600\u20134,200 feet) means slightly cooler temperatures than lower Bend, and the west-facing slopes experience strong afternoon winds. Retaining walls, terraced plantings, and wind-resistant plant selection are common requirements."
      }
    },
    {
      "@type": "Question",
      "name": "Do you do fire-wise landscaping in Awbrey Butte?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes \u2014 Awbrey Butte is in a high fire risk zone due to its proximity to the urban-wildland interface. Newport Avenue specializes in fire-wise landscaping that creates defensible space zones while maintaining the neighborhood's upscale aesthetic. We are familiar with Deschutes County's R327 fire hardening requirements and can help homeowners achieve compliance."
      }
    },
    {
      "@type": "Question",
      "name": "Can you handle the steep slopes and rocky soil in Awbrey Butte?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Absolutely. Awbrey Butte's steep terrain and volcanic rock are among the most challenging conditions in Central Oregon, and Newport Avenue has the equipment and expertise to handle them. We regularly install retaining walls, terraced planting beds, and irrigation systems on steep Awbrey Butte slopes. Our crew has specialized equipment including compact excavators and rock saws to work effectively in these conditions."
      }
    }
  ]
};

export default function AwbreyButteLandscaping() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: 'oklch(0.97 0.003 0)' }}>
      <SEO
        title="Landscaping in Awbrey Butte, Bend, OR | Newport Ave Landscaping"
        description="Professional landscaping, paver patios, irrigation, and lawn care in Awbrey Butte, Bend, Oregon. Newport Avenue Landscaping — licensed, bonded, 21+ years. Free consultations."
        canonical="https://newportavelandscaping.com/service-areas/awbrey-butte-landscaping"
      />
      <BreadcrumbSchema items={[
        { name: 'Home', url: '/' },
        { name: 'Service Areas', url: '/service-areas' },
        { name: 'Awbrey Butte Landscaping', url: '/service-areas/awbrey-butte-landscaping' },
      ]} />
      <Navbar />
      <div style={{ paddingTop: '204px' }}>
        <div className="relative flex items-center justify-center" style={{ height:'380px',backgroundImage:'url(/manus-storage/awbrey-butte-loop-02_77381709.jpg',backgroundSize:'cover',backgroundPosition:'center 50%' }}>
          <div className="absolute inset-0" style={{ backgroundColor: 'oklch(0 0 0 / 0.55)' }} />
          <div className="relative text-center container">
            <p className="font-label mb-3" style={{ color:'oklch(0.72 0.12 25)',fontSize:'0.7rem',letterSpacing:'0.18em' }}>AWBREY BUTTE · BEND, OREGON &middot; 2024</p>
            <h1 className="font-display text-white" style={{ fontSize:'clamp(1.8rem, 4vw, 3rem)',maxWidth:'700px',margin:'0 auto' }}>Landscaping Services in Awbrey Butte, Bend, Oregon</h1>
          </div>
        </div>
        <div className="container py-16 max-w-3xl mx-auto">
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }} />
          <div style={{ color: 'oklch(0.25 0.005 0)' }}>

            {/* Intro */}
            <p className="mb-8" style={{ fontSize:'1.05rem',lineHeight:1.85,color:'oklch(0.32 0.005 0)' }}>Newport Avenue Landscaping has worked in Awbrey Butte for over 21 years. We know the specific soil conditions, HOA requirements, and design aesthetic that fits this part of Bend. Awbrey Butte's steep terrain, volcanic basalt bedrock, panoramic Cascade views, and larger lot sizes create landscaping challenges that require genuine expertise — generic approaches that work in flat Bend neighborhoods simply don't translate here.</p>

            {/* HOA Section */}
            <div style={{ backgroundColor:'oklch(0.97 0.005 0)',borderLeft:'4px solid oklch(0.46 0.20 25)',padding:'1.75rem 2rem',marginBottom:'2.5rem' }}>
              <p className="font-label" style={{ color:'oklch(0.46 0.20 25)',fontSize:'0.62rem',letterSpacing:'0.18em',marginBottom:'0.5rem' }}>HOA COMPLIANCE</p>
              <h2 className="font-display" style={{ fontSize:'1.4rem',color:'oklch(0.15 0.005 0)',fontWeight:400,marginBottom:'0.75rem' }}>Awbrey Butte HOA Landscape Standards</h2>
              <p style={{ color:'oklch(0.30 0.008 0)',lineHeight:1.8,marginBottom:'0.75rem',fontSize:'0.95rem' }}>The Awbrey Butte Homeowners Association maintains CC&Rs that govern landscape appearance and maintenance standards. Key requirements include maintaining the natural character of the neighborhood, restrictions on certain non-native plant species, standards for lawn and landscape maintenance, and requirements around preserving view corridors for neighboring properties.</p>
              <p style={{ color:'oklch(0.30 0.008 0)',lineHeight:1.8,fontSize:'0.95rem' }}>Newport Avenue is experienced with Awbrey Butte's HOA requirements. We can review your project plans against the CC&Rs before installation begins, helping you avoid costly revisions or HOA disputes. Our design team is familiar with the types of projects that typically require HOA approval and those that don't, saving you time in the approval process.</p>
            </div>

            {/* What Makes It Unique */}
            <h2 className="text-3xl font-bold mb-4" style={{ color: 'oklch(0.15 0.005 0)' }}>What Makes Awbrey Butte Landscaping Unique</h2>
            <div style={{ display:'grid',gridTemplateColumns:'repeat(auto-fit, minmax(240px, 1fr))',gap:'1.25rem',marginBottom:'2.5rem' }}>
              {[
                { title:'Steep Terrain & Rocky Soil', body:"Awbrey Butte's volcanic basalt bedrock is often just inches below the surface. Irrigation trenching, retaining wall footings, and tree planting all require rock excavation equipment. Our crew has compact excavators and rock saws to work efficiently in these conditions." },
                { title:'Panoramic View Preservation', body:'Our designs prioritize low-profile plantings in view corridors, using groundcovers, ornamental grasses, and dwarf shrubs that frame the Cascade scenery without blocking it. We also consider neighboring property view corridors.' },
                { title:'Wind Exposure', body:"The upper butte's west-facing slopes experience strong afternoon winds that can desiccate plants and topple poorly anchored trees. We select wind-tolerant species and use proper staking and guying techniques for all new tree plantings." },
                { title:'Fire-Wise Requirements', body:"Awbrey Butte is in a high fire risk zone. Deschutes County's R327 fire hardening rules require defensible space zones around structures. We design fire-wise landscapes that meet R327 requirements while maintaining the neighborhood's upscale aesthetic." },
                { title:'Irrigation Complexity', body:"Awbrey Butte's elevation and rocky terrain make irrigation system design more complex than flat Bend neighborhoods. We use pressure-compensating emitters and zone-by-zone pressure management to ensure uniform coverage across steep grades." },
                { title:'Retaining Walls', body:'Terracing is essential on steep Awbrey Butte lots. We build retaining walls in natural basalt, concrete block, and boulder engineered for the freeze-thaw cycles and soil conditions specific to this elevation. Walls over 4 feet require engineered drawings — we can coordinate this.' },
              ].map(item => (
                <div key={item.title} style={{ padding:'1.25rem',backgroundColor:'oklch(0.98 0.003 0)',borderTop:'3px solid oklch(0.46 0.20 25)' }}>
                  <h3 style={{ fontSize:'1rem',color:'oklch(0.18 0.008 0)',marginBottom:'0.5rem',fontWeight:600 }}>{item.title}</h3>
                  <p style={{ color:'oklch(0.35 0.008 0)',fontSize:'0.88rem',lineHeight:1.75 }}>{item.body}</p>
                </div>
              ))}
            </div>

            {/* Services */}
            <h2 className="text-3xl font-bold mb-4" style={{ color: 'oklch(0.15 0.005 0)' }}>Services We Provide in Awbrey Butte</h2>
            <ul className="list-disc pl-5 mb-8 space-y-1" style={{ color:'oklch(0.28 0.008 0)',lineHeight:2,fontSize:'1rem' }}>
              <li>Custom paver patios, walkways, and driveways — including steep-grade installation</li>
              <li>Full-yard landscape design and installation with CAD plans</li>
              <li>Sprinkler system design, installation, and repair — pressure-compensating for hillside grades</li>
              <li>Retaining walls in natural basalt, concrete block, and boulder</li>
              <li>Fire-wise and R327-compliant defensible space landscaping</li>
              <li>Xeriscape and drought-tolerant landscaping with native plant palettes</li>
              <li>Lawn care, mowing, aeration, fertilization, and weed control</li>
              <li>Water features and fire features — patios, fire pits, outdoor kitchens</li>
              <li>Outdoor lighting design and installation</li>
              <li>Spring and fall cleanups including leaf removal and debris hauling</li>
              <li>Tree planting, pruning, and removal</li>
              <li>Erosion control on steep slopes</li>
            </ul>

            {/* Project Examples */}
            <div style={{ backgroundColor:'oklch(0.12 0.008 0)',padding:'2.5rem 2rem',marginBottom:'2.5rem' }}>
              <p className="font-label" style={{ color:'oklch(0.65 0.20 25)',fontSize:'0.62rem',letterSpacing:'0.18em',marginBottom:'0.75rem' }}>RECENT PROJECTS</p>
              <h2 className="font-display" style={{ fontSize:'1.6rem',color:'oklch(0.97 0 0)',fontWeight:300,marginBottom:'1.5rem' }}>Awbrey Butte Project Examples</h2>
              <div style={{ display:'grid',gridTemplateColumns:'repeat(auto-fit, minmax(220px, 1fr))',gap:'1.25rem' }}>
                {[
                  { title:'Upper Butte View Terrace', desc:'Terraced paver patio system on a 30% slope — three levels connected by natural basalt steps, with a gas fire feature on the upper level framing the Three Sisters view. Drip irrigation and wind-tolerant native plantings throughout.' },
                  { title:'Mid-Slope Full-Yard Installation', desc:'Complete landscape renovation on a 0.4-acre mid-slope lot — engineered retaining walls, irrigated lawn area, ornamental garden beds, ponderosa pine-compatible understory plantings, and full sprinkler system with smart controller.' },
                  { title:'Fire-Wise Defensible Space', desc:'R327-compliant defensible space renovation — removed high-fuel juniper and sage within 30 feet of structure, replaced with fire-resistant groundcovers and low-profile shrubs, installed ember-resistant mulch zones.' },
                  { title:'Ridgeline Xeriscape Renovation', desc:'Converted a high-water-use traditional lawn to a low-maintenance xeriscape — native bunchgrasses, penstemon, sage, and rabbitbrush with decomposed granite pathways and natural basalt boulder accents.' },
                ].map(p => (
                  <div key={p.title} style={{ borderTop:'2px solid oklch(0.46 0.20 25)',paddingTop:'1rem' }}>
                    <h3 style={{ color:'oklch(0.90 0 0)',fontSize:'1rem',fontWeight:500,marginBottom:'0.5rem' }}>{p.title}</h3>
                    <p style={{ color:'oklch(0.68 0.005 0)',fontSize:'0.88rem',lineHeight:1.7 }}>{p.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Why Newport */}
            <h2 className="text-3xl font-bold mb-4" style={{ color: 'oklch(0.15 0.005 0)' }}>Why Awbrey Butte Homeowners Choose Newport Avenue</h2>
            <p className="mb-4" style={{ color:'oklch(0.30 0.008 0)',lineHeight:1.85,fontSize:'1.05rem' }}>We've built a reputation in Awbrey Butte for showing up on time, communicating clearly, and delivering work that holds up. Our industry-standard plant and irrigation warranties are backed by 21+ years of experience in Central Oregon's demanding climate. We're licensed with the Oregon Landscape Contractors Board (LCB #9153), fully insured, and have a team of 150+ employees — large enough to handle any project, local enough to care about every detail.</p>
            <p className="mb-4" style={{ color:'oklch(0.30 0.008 0)',lineHeight:1.85,fontSize:'1.05rem' }}>Unlike landscaping companies that send different crews each visit, Newport Avenue maintains consistent crews for maintenance accounts. Your Awbrey Butte property will be cared for by the same people who know your irrigation system, understand your plant palette, and recognize when something needs attention.</p>
            <div className="bg-gray-100 p-6 rounded-lg mb-8 border-l-4" style={{ borderColor: 'oklch(0.46 0.20 25)' }}>
              <p className="font-bold text-lg mb-2" style={{ color: 'oklch(0.25 0.005 0)' }}>PRO TIP</p>
              <p style={{ color:'oklch(0.30 0.008 0)',lineHeight:1.75 }}>We offer free on-site consultations throughout Awbrey Butte. Our design team will walk your property, discuss your goals, assess the terrain and soil conditions, and provide a detailed written proposal — no pressure, no obligation. We typically schedule site visits within 48 hours of your request.</p>
            </div>

            {/* FAQ */}
            <h2 className="text-3xl font-bold mb-6" style={{ color: 'oklch(0.15 0.005 0)' }}>Awbrey Butte Landscaping FAQ</h2>
            <div style={{ display:'flex',flexDirection:'column',gap:'1.25rem',marginBottom:'2.5rem' }}>
              {FAQ_SCHEMA.mainEntity.map(faq => (
                <div key={faq.name} style={{ borderBottom:'1px solid oklch(0.90 0.005 0)',paddingBottom:'1.25rem' }}>
                  <h3 style={{ fontSize:'1.05rem',color:'oklch(0.18 0.008 0)',fontWeight:600,marginBottom:'0.5rem' }}>{faq.name}</h3>
                  <p style={{ color:'oklch(0.32 0.008 0)',lineHeight:1.8,fontSize:'0.95rem' }}>{faq.acceptedAnswer.text}</p>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="p-8 text-center mt-12" style={{ backgroundColor: 'oklch(0.18 0.008 0)' }}>
              <p className="font-label text-xs mb-3" style={{ color:'oklch(0.46 0.20 25)',letterSpacing:'0.18em' }}>GET STARTED TODAY</p>
              <h3 className="font-display text-white mb-4" style={{ fontSize:'1.6rem' }}>Get a Free Landscaping Quote in Awbrey Butte</h3>
              <p className="font-body mb-6" style={{ color:'oklch(0.72 0.005 0)',lineHeight:1.7 }}>Our team works regularly in Awbrey Butte. Contact us for a free on-site consultation and detailed proposal — we typically respond within 24 hours.</p>
              <Link href="/contact"><span className="btn-red inline-block">Schedule Your Free Consultation →</span></Link>
              <p className="mt-4 text-sm" style={{ color:'oklch(0.60 0.005 0)' }}>Or call us: <a href="tel:+15416178873" style={{ color:'oklch(0.72 0.005 0)',textDecoration:'none' }}>(541) 617-8873</a></p>
            </div>

            {/* Related Links */}
            <div className="mt-12 pt-10" style={{ borderTop: '1px solid oklch(0.88 0.005 0)' }}>
              <p className="font-label mb-2" style={{ color: 'oklch(0.46 0.20 25)', fontSize: '0.62rem', letterSpacing: '0.18em' }}>YOU MIGHT ALSO LIKE</p>
              <h2 className="font-display font-light mb-6" style={{ fontSize: 'clamp(1.3rem, 2vw, 1.8rem)', color: 'oklch(0.15 0.005 0)' }}>More Helpful Guides</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Link href="/resources/paver-patio-cost-bend-oregon"><span style={{ display:'block',padding:'1.1rem 1.25rem',backgroundColor:'oklch(1 0 0)',borderLeft:'3px solid oklch(0.46 0.20 25)',textDecoration:'none' }}><div className="font-body" style={{ color:'oklch(0.22 0.008 30)',fontWeight:600,fontSize:'0.85rem',marginBottom:'0.3rem' }}>Paver Patio Cost in Bend</div><div className="font-body" style={{ color:'oklch(0.50 0.008 30)',fontSize:'0.75rem',fontWeight:300,lineHeight:1.5 }}>Detailed cost breakdown for paver patios in Central Oregon.</div></span></Link>
                <Link href="/resources/firewise-landscaping-central-oregon"><span style={{ display:'block',padding:'1.1rem 1.25rem',backgroundColor:'oklch(1 0 0)',borderLeft:'3px solid oklch(0.46 0.20 25)',textDecoration:'none' }}><div className="font-body" style={{ color:'oklch(0.22 0.008 30)',fontWeight:600,fontSize:'0.85rem',marginBottom:'0.3rem' }}>Firewise Landscaping Guide</div><div className="font-body" style={{ color:'oklch(0.50 0.008 30)',fontSize:'0.75rem',fontWeight:300,lineHeight:1.5 }}>R327 compliance and fire-wise design for Bend homeowners.</div></span></Link>
                <Link href="/resources/sprinkler-system-cost-bend-oregon"><span style={{ display:'block',padding:'1.1rem 1.25rem',backgroundColor:'oklch(1 0 0)',borderLeft:'3px solid oklch(0.46 0.20 25)',textDecoration:'none' }}><div className="font-body" style={{ color:'oklch(0.22 0.008 30)',fontWeight:600,fontSize:'0.85rem',marginBottom:'0.3rem' }}>Sprinkler System Cost in Bend</div><div className="font-body" style={{ color:'oklch(0.50 0.008 30)',fontSize:'0.75rem',fontWeight:300,lineHeight:1.5 }}>Irrigation system pricing for Bend homes.</div></span></Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
