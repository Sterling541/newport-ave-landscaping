/* ============================================================
   SERVICE AREAS INDEX PAGE
   Comprehensive index of all cities, neighborhoods, and
   communities served by Newport Avenue Landscaping
   — with interactive Google Map showing coverage zone
   ============================================================ */
import { useRef, useCallback } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';
import { MapView } from '@/components/Map';
import { Link } from 'wouter';

/* ── City data ─────────────────────────────────────────────── */
const CITIES = [
  {
    name: 'Bend, Oregon',
    slug: null,
    desc: 'Our home base. We serve every neighborhood in Bend — from Awbrey Butte to Southeast Bend.',
    lat: 44.0582,
    lng: -121.3153,
    neighborhoods: [
      { name: 'Awbrey Butte', href: '/service-areas/awbrey-butte-landscaping' },
      { name: 'NorthWest Crossing', href: '/service-areas/northwest-crossing-landscaping' },
      { name: 'Broken Top', href: '/service-areas/broken-top-landscaping' },
      { name: 'Discovery West', href: '/service-areas/discovery-west-landscaping' },
      { name: "Bend's Westside", href: '/service-areas/bend-westside-landscaping' },
      { name: 'Summit West', href: '/service-areas/summit-west-landscaping' },
      { name: 'Southeast Bend', href: '/service-areas/southeast-bend-landscaping' },
      { name: 'Northeast Bend', href: '/service-areas/northeast-bend-landscaping' },
      { name: 'Old Bend / Downtown', href: '/service-areas/old-bend-landscaping' },
      { name: 'River West', href: '/service-areas/river-west-landscaping' },
    ],
    services: [
      { name: 'Paver Patios in Bend', href: '/service-areas/bend-paver-patio' },
      { name: 'Xeriscape in Bend', href: '/service-areas/bend-xeriscape' },
      { name: 'Irrigation in Bend', href: '/service-areas/bend-irrigation' },
      { name: 'Lawn Care in Bend', href: '/service-areas/bend-lawn-care' },
      { name: 'Landscape Design in Bend', href: '/service-areas/bend-landscape-design' },
    ],
  },
  {
    name: 'Redmond, Oregon',
    slug: '/service-areas/redmond-landscaping',
    desc: 'Full-service landscaping, irrigation, and maintenance for Redmond homeowners and businesses.',
    lat: 44.2726,
    lng: -121.1489,
    neighborhoods: [],
    services: [
      { name: 'Paver Patios in Redmond', href: '/service-areas/paver-patio-redmond-oregon' },
      { name: 'Sprinkler Systems in Redmond', href: '/service-areas/sprinkler-system-redmond-oregon' },
      { name: 'Xeriscape in Redmond', href: '/service-areas/xeriscape-redmond-oregon' },
      { name: 'Lawn Care in Redmond', href: '/service-areas/lawn-care-redmond-oregon' },
      { name: 'Landscape Design in Redmond', href: '/service-areas/landscape-design-redmond-oregon' },
    ],
  },
  {
    name: 'Sisters, Oregon',
    slug: null,
    desc: "Landscaping services tailored to Sisters' unique high-desert setting and mountain views.",
    lat: 44.2904,
    lng: -121.5494,
    neighborhoods: [],
    services: [
      { name: 'Paver Patios in Sisters', href: '/service-areas/paver-patio-sisters-oregon' },
      { name: 'Sprinkler Systems in Sisters', href: '/service-areas/sprinkler-system-sisters-oregon' },
      { name: 'Xeriscape in Sisters', href: '/service-areas/xeriscape-sisters-oregon' },
      { name: 'Lawn Care in Sisters', href: '/service-areas/lawn-care-sisters-oregon' },
      { name: 'Landscape Design in Sisters', href: '/service-areas/landscape-design-sisters-oregon' },
    ],
  },
  {
    name: 'Sunriver, Oregon',
    slug: '/service-areas/sunriver-landscaping',
    desc: "Vacation home and full-time residence landscaping in Sunriver's resort community.",
    lat: 43.8787,
    lng: -121.4428,
    neighborhoods: [],
    services: [
      { name: 'Paver Patios in Sunriver', href: '/service-areas/paver-patio-sunriver-oregon' },
      { name: 'Sprinkler Systems in Sunriver', href: '/service-areas/sprinkler-system-sunriver-oregon' },
      { name: 'Xeriscape in Sunriver', href: '/service-areas/xeriscape-sunriver-oregon' },
      { name: 'Lawn Care in Sunriver', href: '/service-areas/lawn-care-sunriver-oregon' },
      { name: 'Landscape Design in Sunriver', href: '/service-areas/landscape-design-sunriver-oregon' },
    ],
  },
  {
    name: 'La Pine, Oregon',
    slug: '/landscaping/la-pine',
    desc: "Landscaping for La Pine's rural properties, new construction, and established homes.",
    lat: 43.6676,
    lng: -121.5047,
    neighborhoods: [],
    services: [
      { name: 'Paver Patios in La Pine', href: '/service-areas/paver-patio-la-pine-oregon' },
      { name: 'Sprinkler Systems in La Pine', href: '/service-areas/sprinkler-system-la-pine-oregon' },
      { name: 'Xeriscape in La Pine', href: '/service-areas/xeriscape-la-pine-oregon' },
      { name: 'Lawn Care in La Pine', href: '/service-areas/lawn-care-la-pine-oregon' },
      { name: 'Landscape Design in La Pine', href: '/service-areas/landscape-design-la-pine-oregon' },
    ],
  },
  {
    name: 'Tumalo, Oregon',
    slug: '/landscaping/tumalo',
    desc: "Rural acreage and residential landscaping for Tumalo's growing community.",
    lat: 44.1487,
    lng: -121.3242,
    neighborhoods: [],
    services: [
      { name: 'Paver Patios in Tumalo', href: '/service-areas/paver-patio-tumalo-oregon' },
      { name: 'Sprinkler Systems in Tumalo', href: '/service-areas/sprinkler-system-tumalo-oregon' },
      { name: 'Xeriscape in Tumalo', href: '/service-areas/xeriscape-tumalo-oregon' },
      { name: 'Lawn Care in Tumalo', href: '/service-areas/lawn-care-tumalo-oregon' },
      { name: 'Landscape Design in Tumalo', href: '/service-areas/landscape-design-tumalo-oregon' },
    ],
  },
  {
    name: 'Prineville, Oregon',
    slug: '/landscaping/prineville',
    desc: 'Landscaping services for Prineville and Crook County homeowners.',
    lat: 44.2998,
    lng: -120.8340,
    neighborhoods: [],
    services: [
      { name: 'Paver Patios in Prineville', href: '/service-areas/paver-patio-prineville-oregon' },
      { name: 'Sprinkler Systems in Prineville', href: '/service-areas/sprinkler-system-prineville-oregon' },
      { name: 'Xeriscape in Prineville', href: '/service-areas/xeriscape-prineville-oregon' },
      { name: 'Lawn Care in Prineville', href: '/service-areas/lawn-care-prineville-oregon' },
      { name: 'Landscape Design in Prineville', href: '/service-areas/landscape-design-prineville-oregon' },
    ],
  },
  {
    name: 'Madras, Oregon',
    slug: '/landscaping/madras',
    desc: 'Landscaping and irrigation services for Madras and Jefferson County.',
    lat: 44.6332,
    lng: -121.1297,
    neighborhoods: [],
    services: [
      { name: 'Paver Patios in Madras', href: '/service-areas/paver-patio-madras-oregon' },
      { name: 'Sprinkler Systems in Madras', href: '/service-areas/sprinkler-system-madras-oregon' },
      { name: 'Xeriscape in Madras', href: '/service-areas/xeriscape-madras-oregon' },
      { name: 'Lawn Care in Madras', href: '/service-areas/lawn-care-madras-oregon' },
      { name: 'Landscape Design in Madras', href: '/service-areas/landscape-design-madras-oregon' },
    ],
  },
];

/* ── Approximate Central Oregon service area polygon ───────── */
const COVERAGE_POLYGON = [
  { lat: 44.70, lng: -121.60 }, // Madras NW
  { lat: 44.70, lng: -120.70 }, // Madras NE
  { lat: 44.35, lng: -120.65 }, // Prineville E
  { lat: 44.20, lng: -120.65 }, // Prineville SE
  { lat: 43.55, lng: -121.10 }, // La Pine SE
  { lat: 43.55, lng: -121.65 }, // La Pine SW
  { lat: 43.80, lng: -121.75 }, // Sunriver W
  { lat: 44.20, lng: -121.75 }, // Sisters W
  { lat: 44.40, lng: -121.70 }, // Sisters NW
  { lat: 44.70, lng: -121.60 }, // close polygon
];

/* ── Schema ─────────────────────────────────────────────────── */
const SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'Newport Avenue Landscaping',
  url: 'https://newportavelandscaping.com',
  telephone: '+15416178873',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '64625 N. HWY 97',
    addressLocality: 'Bend',
    addressRegion: 'OR',
    postalCode: '97701',
    addressCountry: 'US',
  },
  areaServed: [
    'Bend, OR', 'Redmond, OR', 'Sisters, OR', 'Sunriver, OR',
    'La Pine, OR', 'Tumalo, OR', 'Prineville, OR', 'Madras, OR',
    'Central Oregon',
  ],
};

/* ── Map section component ──────────────────────────────────── */
function ServiceAreaMap() {
  const mapRef = useRef<google.maps.Map | null>(null);

  const handleMapReady = useCallback((map: google.maps.Map) => {
    mapRef.current = map;

    // Draw the coverage polygon
    new window.google.maps.Polygon({
      paths: COVERAGE_POLYGON,
      strokeColor: '#c0392b',
      strokeOpacity: 0.7,
      strokeWeight: 2,
      fillColor: '#c0392b',
      fillOpacity: 0.10,
      map,
    });

    // Add a marker + info window for each city
    CITIES.forEach(city => {
      const marker = new window.google.maps.marker.AdvancedMarkerElement({
        map,
        position: { lat: city.lat, lng: city.lng },
        title: city.name,
        content: (() => {
          const pin = document.createElement('div');
          pin.style.cssText = `
            width: 14px; height: 14px;
            background: #c0392b;
            border: 2.5px solid white;
            border-radius: 50%;
            box-shadow: 0 2px 6px rgba(0,0,0,0.35);
            cursor: pointer;
          `;
          return pin;
        })(),
      });

      const infoContent = `
        <div style="font-family:sans-serif;padding:4px 2px;min-width:180px">
          <p style="font-weight:700;font-size:14px;margin:0 0 4px">${city.name}</p>
          <p style="font-size:12px;color:#555;margin:0 0 8px;line-height:1.4">${city.desc}</p>
          <div style="display:flex;flex-wrap:wrap;gap:4px">
            ${city.services.slice(0, 3).map(s =>
              `<a href="${s.href}" style="font-size:11px;color:#c0392b;text-decoration:none;background:#fef2f2;padding:2px 7px;border-radius:99px;border:1px solid #fca5a5">${s.name.replace(/ in .*/, '')}</a>`
            ).join('')}
          </div>
          ${city.slug ? `<a href="${city.slug}" style="display:inline-block;margin-top:8px;font-size:11px;font-weight:600;color:#c0392b;text-decoration:none">View ${city.name.split(',')[0]} page →</a>` : ''}
        </div>
      `;

      const infoWindow = new window.google.maps.InfoWindow({ content: infoContent });

      marker.addListener('click', () => {
        infoWindow.open({ anchor: marker, map });
      });
    });

    // Newport Ave HQ marker (star pin)
    const hqPin = document.createElement('div');
    hqPin.innerHTML = `
      <div style="
        background:#c0392b;color:white;
        font-size:10px;font-weight:700;
        padding:4px 8px;border-radius:4px;
        box-shadow:0 2px 8px rgba(0,0,0,0.4);
        white-space:nowrap;cursor:pointer;
        position:relative;
      ">
        Newport Ave HQ
        <div style="
          position:absolute;bottom:-5px;left:50%;transform:translateX(-50%);
          width:0;height:0;
          border-left:5px solid transparent;
          border-right:5px solid transparent;
          border-top:5px solid #c0392b;
        "></div>
      </div>`;
    new window.google.maps.marker.AdvancedMarkerElement({
      map,
      position: { lat: 44.0582, lng: -121.3153 },
      title: 'Newport Avenue Landscaping HQ',
      content: hqPin,
    });
  }, []);

  return (
    <div className="rounded-xl overflow-hidden shadow-lg" style={{ border: '1px solid oklch(0.88 0.005 0)' }}>
      <MapView
        initialCenter={{ lat: 44.10, lng: -121.30 }}
        initialZoom={9}
        onMapReady={handleMapReady}
        className="w-full h-[480px]"
      />
      <div
        className="flex flex-wrap items-center gap-6 px-5 py-3"
        style={{ backgroundColor: 'oklch(0.97 0.003 0)', borderTop: '1px solid oklch(0.91 0.005 0)' }}
      >
        <div className="flex items-center gap-2">
          <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#c0392b', border: '2px solid white', boxShadow: '0 1px 4px rgba(0,0,0,0.3)' }} />
          <span className="font-body text-xs" style={{ color: 'oklch(0.45 0.005 0)' }}>Service city — click for details</span>
        </div>
        <div className="flex items-center gap-2">
          <div style={{ width: 28, height: 10, background: 'rgba(192,57,43,0.15)', border: '1.5px solid rgba(192,57,43,0.5)', borderRadius: 2 }} />
          <span className="font-body text-xs" style={{ color: 'oklch(0.45 0.005 0)' }}>Coverage zone</span>
        </div>
        <span className="font-body text-xs ml-auto" style={{ color: 'oklch(0.55 0.005 0)' }}>
          Serving Central Oregon since 2003 &nbsp;·&nbsp; (541) 617-8873
        </span>
      </div>
    </div>
  );
}

/* ── Page ───────────────────────────────────────────────────── */
export default function ServiceAreas() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: 'oklch(0.97 0.003 0)' }}>
      <SEO
        title="Landscaping Service Areas | Bend, Redmond, Sisters, Sunriver & Central Oregon"
        description="Newport Avenue Landscaping serves Bend, Redmond, Sisters, Sunriver, La Pine, Tumalo, Prineville, and Madras. Paver patios, xeriscape, irrigation, lawn care, and landscape design across Central Oregon."
        canonical="https://newportavelandscaping.com/service-areas"
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }}
      />
      <Navbar />
      <div style={{ paddingTop: '204px' }}>
        {/* Hero */}
        <div
          className="relative flex items-center justify-center"
          style={{
            height: '340px',
            backgroundImage: 'url(https://d2xsxph8kpxj0f.cloudfront.net/310519663503028182/g3pw3MRUapabcDUbhBEFxx/ITP_7558_e52a40c9.jpg',
            backgroundSize: 'cover',
            backgroundPosition: 'center 40%',
          }}
        >
          <div className="absolute inset-0" style={{ backgroundColor: 'oklch(0 0 0 / 0.58)' }} />
          <div className="relative text-center container">
            <p className="font-label mb-3" style={{ color: 'oklch(0.72 0.12 25)', fontSize: '0.7rem', letterSpacing: '0.18em' }}>
              CENTRAL OREGON LANDSCAPING
            </p>
            <h1 className="font-display text-white mb-4" style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)' }}>
              Landscaping Service Areas
            </h1>
            <p className="text-white/80 max-w-2xl mx-auto" style={{ fontSize: '1.05rem' }}>
              Newport Avenue Landscaping serves Bend, Redmond, Sisters, Sunriver, and the entire Central Oregon region. Licensed, bonded, and locally owned for 21+ years.
            </p>
          </div>
        </div>

        <div className="container py-16 max-w-5xl mx-auto">

          {/* ── Interactive Map ─────────────────────────────── */}
          <div className="mb-14">
            <p className="font-label mb-2" style={{ color: 'oklch(0.46 0.20 25)', fontSize: '0.62rem', letterSpacing: '0.18em' }}>OUR COVERAGE ZONE</p>
            <h2 className="font-display mb-5" style={{ fontSize: 'clamp(1.4rem, 2.5vw, 1.9rem)', color: 'oklch(0.15 0.005 0)' }}>
              Where We Work Across Central Oregon
            </h2>
            <ServiceAreaMap />
          </div>

          {/* Quick nav */}
          <div className="mb-14 p-6 rounded-xl" style={{ backgroundColor: 'oklch(0.93 0.005 0)' }}>
            <p className="font-label mb-3" style={{ color: 'oklch(0.46 0.20 25)', fontSize: '0.62rem', letterSpacing: '0.18em' }}>JUMP TO A CITY</p>
            <div className="flex flex-wrap gap-3">
              {CITIES.map(city => (
                <a
                  key={city.name}
                  href={`#${city.name.split(',')[0].toLowerCase().replace(/\s+/g, '-')}`}
                  className="font-body text-sm px-4 py-2 rounded-full transition-colors"
                  style={{ backgroundColor: 'oklch(0.18 0.008 0)', color: 'white' }}
                  onMouseEnter={e => (e.currentTarget.style.backgroundColor = 'oklch(0.46 0.20 25)')}
                  onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'oklch(0.18 0.008 0)')}
                >
                  {city.name.split(',')[0]}
                </a>
              ))}
            </div>
          </div>

          {/* City sections */}
          {CITIES.map(city => (
            <section
              key={city.name}
              id={city.name.split(',')[0].toLowerCase().replace(/\s+/g, '-')}
              className="mb-16 scroll-mt-40"
            >
              <div className="flex items-start justify-between mb-2 flex-wrap gap-3">
                <div>
                  <p className="font-label mb-1" style={{ color: 'oklch(0.46 0.20 25)', fontSize: '0.62rem', letterSpacing: '0.18em' }}>SERVICE AREA</p>
                  <h2 className="font-display" style={{ fontSize: 'clamp(1.5rem, 3vw, 2.2rem)', color: 'oklch(0.15 0.005 0)' }}>
                    {city.slug ? (
                      <Link href={city.slug}><span style={{ color: 'inherit', textDecoration: 'none' }}>{city.name}</span></Link>
                    ) : city.name}
                  </h2>
                </div>
                <Link href="/contact">
                  <span className="btn-red inline-block text-sm">Get a Free Quote →</span>
                </Link>
              </div>
              <p className="font-body mb-6" style={{ color: 'oklch(0.40 0.005 0)', lineHeight: 1.7 }}>{city.desc}</p>

              {city.services.length > 0 && (
                <div className="mb-6">
                  <p className="font-label mb-3" style={{ color: 'oklch(0.55 0.005 0)', fontSize: '0.62rem', letterSpacing: '0.14em' }}>SERVICES IN {city.name.split(',')[0].toUpperCase()}</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {city.services.map(s => (
                      <Link key={s.href} href={s.href}>
                        <span
                          className="block p-4 rounded-lg transition-all font-body text-sm font-medium"
                          style={{ backgroundColor: 'white', border: '1px solid oklch(0.88 0.005 0)', color: 'oklch(0.22 0.008 0)' }}
                          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'oklch(0.46 0.20 25)'; (e.currentTarget as HTMLElement).style.color = 'oklch(0.46 0.20 25)'; }}
                          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'oklch(0.88 0.005 0)'; (e.currentTarget as HTMLElement).style.color = 'oklch(0.22 0.008 0)'; }}
                        >
                          {s.name} →
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {city.neighborhoods.length > 0 && (
                <div>
                  <p className="font-label mb-3" style={{ color: 'oklch(0.55 0.005 0)', fontSize: '0.62rem', letterSpacing: '0.14em' }}>NEIGHBORHOODS</p>
                  <div className="flex flex-wrap gap-2">
                    {city.neighborhoods.map(n => (
                      <Link key={n.href} href={n.href}>
                        <span
                          className="inline-block px-4 py-2 rounded-full font-body text-sm transition-colors"
                          style={{ backgroundColor: 'oklch(0.93 0.005 0)', color: 'oklch(0.30 0.005 0)' }}
                          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.backgroundColor = 'oklch(0.18 0.008 0)'; (e.currentTarget as HTMLElement).style.color = 'white'; }}
                          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.backgroundColor = 'oklch(0.93 0.005 0)'; (e.currentTarget as HTMLElement).style.color = 'oklch(0.30 0.005 0)'; }}
                        >
                          {n.name}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </section>
          ))}

          {/* CTA */}
          <div className="text-center p-12 rounded-xl mt-4" style={{ backgroundColor: 'oklch(0.15 0.005 0)' }}>
            <p className="font-label mb-3" style={{ color: 'oklch(0.46 0.20 25)', fontSize: '0.62rem', letterSpacing: '0.18em' }}>SERVING CENTRAL OREGON SINCE 2003</p>
            <h3 className="font-display text-white mb-3" style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)' }}>Don't See Your City?</h3>
            <p className="text-white/70 mb-6 max-w-xl mx-auto font-body" style={{ lineHeight: 1.7 }}>
              We regularly travel throughout Central Oregon for the right project. Call us or send a message — if we can serve you, we will.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <span className="btn-red inline-block">Request a Free Estimate →</span>
              </Link>
              <a
                href="tel:5416178873"
                className="inline-block px-6 py-3 font-semibold rounded-md transition-colors font-body"
                style={{ backgroundColor: 'transparent', border: '1px solid oklch(0.45 0.005 0)', color: 'oklch(0.80 0.005 0)' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'oklch(0.72 0.12 25)'; (e.currentTarget as HTMLElement).style.color = 'oklch(0.85 0.12 28)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'oklch(0.45 0.005 0)'; (e.currentTarget as HTMLElement).style.color = 'oklch(0.80 0.005 0)'; }}
              >
                (541) 617-8873
              </a>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
