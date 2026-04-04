import Navbar from '@/components/Navbar';
import SEO from '@/components/SEO';
import { BreadcrumbSchema } from '@/components/SchemaMarkup';
import { Link } from 'wouter';

export default function CentralOregonLandscapingGuide() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: 'oklch(0.97 0.003 0)' }}>
      <SEO
        title="Central Oregon Landscaping Guide | Newport Ave Landscaping"
        description="Complete guide to landscaping in Central Oregon. Climate, plants, costs, and best practices for Bend, Redmond, Sisters, and surrounding areas."
        canonical="https://newportavelandscaping.com/resources/central-oregon-landscaping-guide"
      />
      <BreadcrumbSchema items={[
        { name: 'Home', url: '/' },
        { name: 'Resources', url: '/resources' },
        { name: 'Central Oregon Landscaping Guide', url: '/resources/central-oregon-landscaping-guide' },
      ]} />
      <Navbar />
      <div style={{ paddingTop: '204px' }}>
        <div className="relative flex items-center justify-center" style={{ height:'380px',backgroundImage:'url(https://d2xsxph8kpxj0f.cloudfront.net/310519663503028182/g3pw3MRUapabcDUbhBEFxx/ITP_7558_e52a40c9.jpg',backgroundSize:'cover',backgroundPosition:'center 50%' }}>
          <div className="absolute inset-0" style={{ backgroundColor: 'oklch(0 0 0 / 0.55)' }} />
          <div className="relative text-center container">
            <p className="font-label mb-3" style={{ color:'oklch(0.72 0.12 25)',fontSize:'0.7rem',letterSpacing:'0.18em' }}>LANDSCAPE GUIDE · CENTRAL OREGON &middot; 2024</p>
            <h1 className="font-display text-white" style={{ fontSize:'clamp(1.8rem, 4vw, 3rem)',maxWidth:'700px',margin:'0 auto' }}>Central Oregon Landscaping Guide</h1>
          </div>
        </div>
        <div className="container py-16 max-w-3xl mx-auto">
          <div style={{ color: 'oklch(0.25 0.005 0)' }}>
            <p className="mb-8" style={{ fontSize:'1.05rem',lineHeight:1.85,color:'oklch(0.35 0.005 0)' }}>Central Oregon encompasses a diverse region — from Bend's urban core to the rural communities of Prineville, Madras, and La Pine. Despite their differences, these communities share a high desert climate that demands a specific approach to landscaping. This guide covers the essentials for creating and maintaining beautiful landscapes throughout the region.</p>

            <h2 className="text-3xl font-bold mb-4" style={{ color: 'oklch(0.25 0.005 0)' }}>Climate Zones in Central Oregon</h2>
            <p className="mb-4">Central Oregon spans USDA Hardiness Zones 5b to 7a, depending on elevation and location. Bend (Zone 6a) is warmer than La Pine (Zone 5b) and cooler than Madras (Zone 7a). These differences affect plant selection — what thrives in Madras may not survive La Pine's colder winters.</p>
            <p className="mb-8">All Central Oregon communities share the high desert characteristics: low rainfall (10–14 inches/year), intense summer sun, low humidity, and hard winter freezes. Irrigation is essential for any landscape beyond native sagebrush and bunchgrass.</p>

            <h2 className="text-3xl font-bold mb-4" style={{ color: 'oklch(0.25 0.005 0)' }}>Water Conservation: The Most Important Landscaping Issue in Central Oregon</h2>
            <p className="mb-4">Water is the defining constraint for Central Oregon landscapes. The region's water supply comes primarily from snowpack in the Cascades, and demand continues to grow as the population expands.</p>
            <p className="mb-8">Smart landscaping choices — xeriscape, efficient irrigation, drought-tolerant plants — aren't just good for your water bill. They're essential for the long-term sustainability of the region's water supply.</p>

            <h2 className="text-3xl font-bold mb-4" style={{ color: 'oklch(0.25 0.005 0)' }}>Best Landscaping Practices for Central Oregon</h2>
            <ul className="list-disc pl-5 mb-8 space-y-1">
              <li>Choose drought-tolerant plants adapted to high desert conditions</li>
              <li>Install efficient drip irrigation for planting beds</li>
              <li>Use smart irrigation controllers that adjust to weather</li>
              <li>Mulch all planting beds with 3 inches of rock or organic mulch</li>
              <li>Consider xeriscape for high-water areas (especially turf)</li>
              <li>Build patios and hardscape with pavers that handle freeze-thaw</li>
              <li>Winterize irrigation systems before October 15th</li>
            </ul>
            <div className="p-8 text-center mt-12" style={{ backgroundColor: 'oklch(0.18 0.008 0)' }}>
              <p className="font-label text-xs mb-3" style={{ color:'oklch(0.46 0.20 25)',letterSpacing:'0.18em' }}>GET STARTED TODAY</p>
              <h3 className="font-display text-white mb-4" style={{ fontSize:'1.6rem' }}>Get a Free Landscaping Consultation in Central Oregon</h3>
              <p className="font-body mb-6" style={{ color:'oklch(0.72 0.005 0)',lineHeight:1.7 }}>We serve Bend, Redmond, Sisters, Sunriver, La Pine, Prineville, and all of Central Oregon. Contact us for a free consultation.</p>
              <Link href="/contact"><span className="btn-red inline-block">Schedule Your Free Consultation →</span></Link>
              <p className="mt-4 text-sm" style={{ color:'oklch(0.60 0.005 0)' }}>Or call us: (541) 617-8873</p>
            </div>

            <div className="mt-12 pt-10" style={{ borderTop: '1px solid oklch(0.88 0.005 0)' }}>
              <p className="font-label mb-2" style={{ color: 'oklch(0.46 0.20 25)', fontSize: '0.62rem', letterSpacing: '0.18em' }}>YOU MIGHT ALSO LIKE</p>
              <h2 className="font-display font-light mb-6" style={{ fontSize: 'clamp(1.3rem, 2vw, 1.8rem)', color: 'oklch(0.15 0.005 0)' }}>More Helpful Guides</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Link href="/resources/landscaping-bend-oregon"><span style={{ display:'block',padding:'1.1rem 1.25rem',backgroundColor:'oklch(1 0 0)',borderLeft:'3px solid oklch(0.46 0.20 25)',textDecoration:'none' }}><div className="font-body" style={{ color:'oklch(0.22 0.008 30)',fontWeight:600,fontSize:'0.85rem',marginBottom:'0.3rem' }}>Landscaping in Bend, Oregon</div><div className="font-body" style={{ color:'oklch(0.50 0.008 30)',fontSize:'0.75rem',fontWeight:300,lineHeight:1.5 }}>Complete guide to landscaping in Bend.</div></span></Link>
                <Link href="/resources/xeriscape-cost-bend-oregon"><span style={{ display:'block',padding:'1.1rem 1.25rem',backgroundColor:'oklch(1 0 0)',borderLeft:'3px solid oklch(0.46 0.20 25)',textDecoration:'none' }}><div className="font-body" style={{ color:'oklch(0.22 0.008 30)',fontWeight:600,fontSize:'0.85rem',marginBottom:'0.3rem' }}>Xeriscape Cost in Bend</div><div className="font-body" style={{ color:'oklch(0.50 0.008 30)',fontSize:'0.75rem',fontWeight:300,lineHeight:1.5 }}>Water-wise landscaping costs in Central Oregon.</div></span></Link>
                <Link href="/resources/best-plants-xeriscape-central-oregon"><span style={{ display:'block',padding:'1.1rem 1.25rem',backgroundColor:'oklch(1 0 0)',borderLeft:'3px solid oklch(0.46 0.20 25)',textDecoration:'none' }}><div className="font-body" style={{ color:'oklch(0.22 0.008 30)',fontWeight:600,fontSize:'0.85rem',marginBottom:'0.3rem' }}>Best Plants for Xeriscaping</div><div className="font-body" style={{ color:'oklch(0.50 0.008 30)',fontSize:'0.75rem',fontWeight:300,lineHeight:1.5 }}>Drought-tolerant plants for Central Oregon.</div></span></Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
