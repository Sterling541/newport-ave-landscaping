import Navbar from '@/components/Navbar';
import SEO from '@/components/SEO';
import { BreadcrumbSchema } from '@/components/SchemaMarkup';
import { Link } from 'wouter';

export default function BestPlantsXeriscapeCentralOregon() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: 'oklch(0.97 0.003 0)' }}>
      <SEO
        title="Best Plants for Xeriscaping in Central Oregon | Newport Ave"
        description="The best drought-tolerant plants for xeriscaping in Central Oregon. Native and adapted plants that thrive in Bend's high desert climate."
        canonical="https://newportavelandscaping.com/resources/best-plants-xeriscape-central-oregon"
      />
      <BreadcrumbSchema items={[
        { name: 'Home', url: '/' },
        { name: 'Resources', url: '/resources' },
        { name: 'Best Plants for Xeriscaping in Central Oregon', url: '/resources/best-plants-xeriscape-central-oregon' },
      ]} />
      <Navbar />
      <div style={{ paddingTop: '328px' }}>
        <div className="relative flex items-center justify-center" style={{ height:'380px',backgroundImage:'url(https://d2xsxph8kpxj0f.cloudfront.net/310519663503028182/g3pw3MRUapabcDUbhBEFxx/ITP_7558_e52a40c9.jpg',backgroundSize:'cover',backgroundPosition:'center 50%' }}>
          <div className="absolute inset-0" style={{ backgroundColor: 'oklch(0 0 0 / 0.55)' }} />
          <div className="relative text-center container">
            <p className="font-label mb-3" style={{ color:'oklch(0.72 0.12 25)',fontSize:'0.7rem',letterSpacing:'0.18em' }}>PLANT GUIDE · CENTRAL OREGON &middot; 2024</p>
            <h1 className="font-display text-white" style={{ fontSize:'clamp(1.8rem, 4vw, 3rem)',maxWidth:'700px',margin:'0 auto' }}>Best Plants for Xeriscaping in Central Oregon</h1>
          </div>
        </div>
        <div className="container py-16 max-w-3xl mx-auto">
          <div style={{ color: 'oklch(0.25 0.005 0)' }}>
            <p className="mb-8" style={{ fontSize:'1.05rem',lineHeight:1.85,color:'oklch(0.35 0.005 0)' }}>Choosing the right plants is the most important decision in a xeriscape design. Not all "drought-tolerant" plants actually perform well in Bend's specific climate — our cold winters, intense summer sun, and alkaline volcanic soil eliminate many options that work in other dry climates. Here are the plants we've found to be the most reliable performers in Central Oregon xeriscape designs.</p>

            <h2 className="text-3xl font-bold mb-4" style={{ color: 'oklch(0.25 0.005 0)' }}>Ground Covers and Low-Growing Plants</h2>
            <ul className="list-disc pl-5 mb-8 space-y-1">
              <li>Creeping phlox (Phlox subulata) — spring flowers, very drought-tolerant once established</li>
              <li>Sedum (Stonecrop) — succulent, many varieties, excellent for rock gardens</li>
              <li>Ice plant (Delosperma) — brilliant flowers, very drought-tolerant</li>
              <li>Woolly thyme — fragrant, walkable, great between pavers</li>
              <li>Blue grama grass (Bouteloua gracilis) — native grass, very drought-tolerant</li>
              <li>Prairie smoke (Geum triflorum) — native, feathery seed heads, spring flowers</li>
            </ul>

            <h2 className="text-3xl font-bold mb-4" style={{ color: 'oklch(0.25 0.005 0)' }}>Perennials for Central Oregon Xeriscape</h2>
            <ul className="list-disc pl-5 mb-8 space-y-1">
              <li>Penstemon (Beardtongue) — native, many species, hummingbird magnet</li>
              <li>Lavender — fragrant, deer-resistant, extremely drought-tolerant once established</li>
              <li>Russian sage (Perovskia) — silvery foliage, purple flowers, very tough</li>
              <li>Yarrow (Achillea) — spreading, many colors, extremely drought-tolerant</li>
              <li>Catmint (Nepeta) — soft blue flowers, deer-resistant, long blooming</li>
              <li>Salvia — many species, excellent for pollinators</li>
              <li>Blanket flower (Gaillardia) — bright colors, native to western US</li>
              <li>Coneflower (Echinacea) — tough, pollinator magnet, good fall seed heads</li>
            </ul>

            <h2 className="text-3xl font-bold mb-4" style={{ color: 'oklch(0.25 0.005 0)' }}>Shrubs for Central Oregon Xeriscape</h2>
            <ul className="list-disc pl-5 mb-8 space-y-1">
              <li>Sagebrush (Artemisia tridentata) — iconic Central Oregon native, extremely drought-tolerant</li>
              <li>Rabbitbrush (Ericameria nauseosa) — yellow fall flowers, native, very tough</li>
              <li>Bitterbrush (Purshia tridentata) — native shrub, fragrant spring flowers</li>
              <li>Apache plume (Fallugia paradoxa) — white flowers, feathery seed heads</li>
              <li>Potentilla (Cinquefoil) — long blooming, many colors, very cold-hardy</li>
              <li>Serviceberry (Amelanchier) — spring flowers, summer berries, fall color</li>
            </ul>
            <div className="p-8 text-center mt-12" style={{ backgroundColor: 'oklch(0.18 0.008 0)' }}>
              <p className="font-label text-xs mb-3" style={{ color:'oklch(0.46 0.20 25)',letterSpacing:'0.18em' }}>GET STARTED TODAY</p>
              <h3 className="font-display text-white mb-4" style={{ fontSize:'1.6rem' }}>Get a Free Xeriscape Design Consultation in Bend</h3>
              <p className="font-body mb-6" style={{ color:'oklch(0.72 0.005 0)',lineHeight:1.7 }}>Our design team will create a plant palette that's beautiful, water-efficient, and perfectly suited to your Bend property.</p>
              <Link href="/contact"><span className="btn-red inline-block">Schedule Your Free Xeriscape Consultation →</span></Link>
              <p className="mt-4 text-sm" style={{ color:'oklch(0.60 0.005 0)' }}>Or call us: (541) 617-8873</p>
            </div>

            <div className="mt-12 pt-10" style={{ borderTop: '1px solid oklch(0.88 0.005 0)' }}>
              <p className="font-label mb-2" style={{ color: 'oklch(0.46 0.20 25)', fontSize: '0.62rem', letterSpacing: '0.18em' }}>YOU MIGHT ALSO LIKE</p>
              <h2 className="font-display font-light mb-6" style={{ fontSize: 'clamp(1.3rem, 2vw, 1.8rem)', color: 'oklch(0.15 0.005 0)' }}>More Helpful Guides</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Link href="/resources/xeriscape-cost-bend-oregon"><span style={{ display:'block',padding:'1.1rem 1.25rem',backgroundColor:'oklch(1 0 0)',borderLeft:'3px solid oklch(0.46 0.20 25)',textDecoration:'none' }}><div className="font-body" style={{ color:'oklch(0.22 0.008 30)',fontWeight:600,fontSize:'0.85rem',marginBottom:'0.3rem' }}>Xeriscape Cost in Bend</div><div className="font-body" style={{ color:'oklch(0.50 0.008 30)',fontSize:'0.75rem',fontWeight:300,lineHeight:1.5 }}>What water-wise landscaping costs in Central Oregon.</div></span></Link>
                <Link href="/resources/native-vs-adapted-plants-bend-oregon"><span style={{ display:'block',padding:'1.1rem 1.25rem',backgroundColor:'oklch(1 0 0)',borderLeft:'3px solid oklch(0.46 0.20 25)',textDecoration:'none' }}><div className="font-body" style={{ color:'oklch(0.22 0.008 30)',fontWeight:600,fontSize:'0.85rem',marginBottom:'0.3rem' }}>Native vs. Adapted Plants</div><div className="font-body" style={{ color:'oklch(0.50 0.008 30)',fontSize:'0.75rem',fontWeight:300,lineHeight:1.5 }}>Which plants work best in Bend's climate.</div></span></Link>
                <Link href="/resources/xeriscape-vs-traditional-lawn-bend-oregon"><span style={{ display:'block',padding:'1.1rem 1.25rem',backgroundColor:'oklch(1 0 0)',borderLeft:'3px solid oklch(0.46 0.20 25)',textDecoration:'none' }}><div className="font-body" style={{ color:'oklch(0.22 0.008 30)',fontWeight:600,fontSize:'0.85rem',marginBottom:'0.3rem' }}>Xeriscape vs. Traditional Lawn</div><div className="font-body" style={{ color:'oklch(0.50 0.008 30)',fontSize:'0.75rem',fontWeight:300,lineHeight:1.5 }}>Comparing water use, cost, and maintenance.</div></span></Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
