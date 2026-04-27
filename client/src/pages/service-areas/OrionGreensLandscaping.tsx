import Navbar from '@/components/Navbar';
import SEO from '@/components/SEO';
import { BreadcrumbSchema } from '@/components/SchemaMarkup';
import { Link } from 'wouter';

export default function OrionGreensLandscaping() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: 'oklch(0.97 0.003 0)' }}>
      <SEO
        title="Landscaping in Orion Greens, Bend, OR | Newport Ave Landscaping"
        description="Professional landscaping, paver patios, irrigation, and lawn care in Orion Greens, Bend, Oregon. Newport Avenue Landscaping — licensed, bonded, 21+ years. Free consultations."
        canonical="https://www.newportavelandscaping.com/service-areas/orion-greens-landscaping"
      />
      <BreadcrumbSchema items={[
        { name: 'Home', url: '/' },
        { name: 'Service Areas', url: '/service-areas' },
        { name: 'Orion Greens Landscaping', url: '/service-areas/orion-greens-landscaping' },
      ]} />
      <Navbar />
      <div style={{ paddingTop: '204px' }}>
        <div className="relative flex items-center justify-center" style={{ height:'380px',backgroundImage:'url(/manus-storage/westside-living-01_30518074.jpg)',backgroundSize:'cover',backgroundPosition:'center 50%' }}>
          <div className="absolute inset-0" style={{ backgroundColor: 'oklch(0 0 0 / 0.55)' }} />
          <div className="relative text-center container">
            <p className="font-label mb-3" style={{ color:'oklch(0.72 0.12 25)',fontSize:'0.7rem',letterSpacing:'0.18em' }}>ORION GREENS · BEND, OREGON &middot; 2024</p>
            <h1 className="font-display text-white" style={{ fontSize:'clamp(1.8rem, 4vw, 3rem)',maxWidth:'700px',margin:'0 auto' }}>Landscaping Services in Orion Greens, Bend, Oregon</h1>
          </div>
        </div>
        <div className="container py-16 max-w-3xl mx-auto">
          <div style={{ color: 'oklch(0.25 0.005 0)' }}>
            <p className="mb-8" style={{ fontSize:'1.05rem',lineHeight:1.85,color:'oklch(0.35 0.005 0)' }}>Newport Avenue Landscaping has worked in Orion Greens for over 21 years. We know the soil conditions, the HOA requirements, and the aesthetic that fits this part of Bend. Whether you're looking for a new paver patio, a full landscape renovation, irrigation installation, or ongoing lawn maintenance, our team brings the same craftsmanship and 1-year workmanship warranty on hardscape installations and a 90-day plant warranty on all plantings to every project.</p>

            <h2 className="text-3xl font-bold mb-4" style={{ color: 'oklch(0.25 0.005 0)' }}>Services We Provide in Orion Greens</h2>
            <ul className="list-disc pl-5 mb-8 space-y-1">
              <li>Custom paver patios, walkways, and driveways</li>
              <li>Landscape design and full-yard installation</li>
              <li>Sprinkler system design, installation, and repair</li>
              <li>Xeriscape and drought-tolerant landscaping</li>
              <li>Lawn care, mowing, aeration, and fertilization</li>
              <li>Retaining walls and grading</li>
              <li>Water features and fire features</li>
              <li>Outdoor lighting installation</li>
              <li>Spring and fall cleanups</li>
              <li>Snow removal (commercial and residential)</li>
            </ul>

            <h2 className="text-3xl font-bold mb-4" style={{ color: 'oklch(0.25 0.005 0)' }}>Why Orion Greens Homeowners Choose Newport Avenue</h2>
            <p className="mb-4">We've built a reputation in Orion Greens for showing up on time, communicating clearly, and delivering work that holds up. Our 1-year workmanship warranty on hardscape installations and a 90-day plant warranty on all plantings is unique in Central Oregon.</p>
            <p className="mb-4">We're licensed with the Oregon Landscape Contractors Board (LCB #9153), fully insured, and have a team of 150+ employees. We're large enough to handle any project, but local enough to care about every detail.</p>
            <div className="bg-gray-100 p-6 rounded-lg mb-8 border-l-4" style={{ borderColor: 'oklch(0.46 0.20 25)' }}>
              <p className="font-bold text-lg mb-2" style={{ color: 'oklch(0.25 0.005 0)' }}>PRO TIP</p>
              <p>We offer free on-site consultations throughout Orion Greens. Our design team will walk your property, discuss your goals, and provide a detailed proposal — no pressure, no obligation.</p>
            </div>

            <h2 className="text-3xl font-bold mb-4" style={{ color: 'oklch(0.25 0.005 0)' }}>Pricing for Landscaping in Orion Greens</h2>
            <p className="mb-4">Landscaping costs in Orion Greens vary widely based on project scope. A simple patio starts around $8,000–$15,000. Full landscape renovations range from $25,000 to $80,000+. Ongoing lawn maintenance starts at $45/visit or $388/month for our Everything Plan.</p>
            <p className="mb-8">We provide detailed, itemized proposals for every project. No surprises, no hidden fees.</p>
            <div className="p-8 text-center mt-12" style={{ backgroundColor: 'oklch(0.18 0.008 0)' }}>
              <p className="font-label text-xs mb-3" style={{ color:'oklch(0.46 0.20 25)',letterSpacing:'0.18em' }}>GET STARTED TODAY</p>
              <h3 className="font-display text-white mb-4" style={{ fontSize:'1.6rem' }}>Get a Free Landscaping Quote in Orion Greens</h3>
              <p className="font-body mb-6" style={{ color:'oklch(0.72 0.005 0)',lineHeight:1.7 }}>Our team works regularly in Orion Greens. Contact us for a free on-site consultation and detailed proposal.</p>
              <Link href="/contact"><span className="btn-red inline-block">Schedule Your Free Consultation →</span></Link>
              <p className="mt-4 text-sm" style={{ color:'oklch(0.60 0.005 0)' }}>Or call us: (541) 617-8873</p>
            </div>

            <div className="mt-12 pt-10" style={{ borderTop: '1px solid oklch(0.88 0.005 0)' }}>
              <p className="font-label mb-2" style={{ color: 'oklch(0.46 0.20 25)', fontSize: '0.62rem', letterSpacing: '0.18em' }}>YOU MIGHT ALSO LIKE</p>
              <h2 className="font-display font-light mb-6" style={{ fontSize: 'clamp(1.3rem, 2vw, 1.8rem)', color: 'oklch(0.15 0.005 0)' }}>More Helpful Guides</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Link href="/resources/paver-patio-cost-bend-oregon"><span style={{ display:'block',padding:'1.1rem 1.25rem',backgroundColor:'oklch(1 0 0)',borderLeft:'3px solid oklch(0.46 0.20 25)',textDecoration:'none' }}><div className="font-body" style={{ color:'oklch(0.22 0.008 30)',fontWeight:600,fontSize:'0.85rem',marginBottom:'0.3rem' }}>Paver Patio Cost in Bend</div><div className="font-body" style={{ color:'oklch(0.50 0.008 30)',fontSize:'0.75rem',fontWeight:300,lineHeight:1.5 }}>Detailed cost breakdown for paver patios in Central Oregon.</div></span></Link>
                <Link href="/resources/landscape-design-cost-bend-oregon"><span style={{ display:'block',padding:'1.1rem 1.25rem',backgroundColor:'oklch(1 0 0)',borderLeft:'3px solid oklch(0.46 0.20 25)',textDecoration:'none' }}><div className="font-body" style={{ color:'oklch(0.22 0.008 30)',fontWeight:600,fontSize:'0.85rem',marginBottom:'0.3rem' }}>Landscape Design Cost in Bend</div><div className="font-body" style={{ color:'oklch(0.50 0.008 30)',fontSize:'0.75rem',fontWeight:300,lineHeight:1.5 }}>Full-yard design and installation pricing.</div></span></Link>
                <Link href="/resources/sprinkler-system-cost-bend-oregon"><span style={{ display:'block',padding:'1.1rem 1.25rem',backgroundColor:'oklch(1 0 0)',borderLeft:'3px solid oklch(0.46 0.20 25)',textDecoration:'none' }}><div className="font-body" style={{ color:'oklch(0.22 0.008 30)',fontWeight:600,fontSize:'0.85rem',marginBottom:'0.3rem' }}>Sprinkler System Cost in Bend</div><div className="font-body" style={{ color:'oklch(0.50 0.008 30)',fontSize:'0.75rem',fontWeight:300,lineHeight:1.5 }}>Irrigation system pricing for Bend homes.</div></span></Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
