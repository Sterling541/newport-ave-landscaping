# Newport Avenue Landscaping — Site Migration Report

**Prepared by:** Manus AI  
**Date:** April 23, 2026  
**Site:** Newport Avenue Landscaping (Bend, Oregon)  
**Preview URL:** https://newportland-g3pw3mru.manus.space  
**Production Domain:** https://newportavelandscaping.com  
**Tech Stack:** React 19 + TypeScript + Vite + tRPC + Drizzle ORM + MySQL

---

## Executive Summary

The Newport Avenue Landscaping website is a large-scale React single-page application (SPA) with **271 registered routes** spanning core marketing pages, 20 service pages, 139 service-area landing pages, 95 resource/cost-guide pages, and 6 blog posts. The site is built on a modern full-stack template (React + Express + tRPC) with a MySQL database, Manus OAuth authentication, and a private admin dashboard.

This report documents every page, route, component, SEO configuration, and content section to support a clean migration to any target platform (WordPress, Webflow, Next.js, or another hosting provider).

---

## 1. Site Architecture Overview

| Category | Route Count | Page Files |
|---|---|---|
| Core / Marketing Pages | 51 | 19 |
| Service Pages | 21 | 20 |
| Service Area Landing Pages | 88 | 139 |
| Resource / Cost Guide Pages | 97 | 95 |
| Blog Posts | 7 | 6 |
| Admin Dashboard | 7 | 6 |
| **Total** | **271** | **285** |

The site uses **client-side routing** (Wouter library). All routes are defined in `client/src/App.tsx` and rendered as lazy-loaded React components. There is no server-side rendering — the server returns a single HTML shell and React hydrates the content in the browser.

---

## 2. Core Marketing Pages

These are the primary public-facing pages that form the backbone of the site's marketing funnel.

| Route | Component File | SEO Title | Has Schema |
|---|---|---|---|
| `/` | Home.tsx | Newport Avenue Landscaping | No |
| `/about` | About.tsx | About Us | No |
| `/services` | Services.tsx | Services | No |
| `/service-areas` | ServiceAreas.tsx | Service Areas | No |
| `/our-work` | OurWork.tsx | Our Work | No |
| `/commercial` | Commercial.tsx | Commercial Landscaping | No |
| `/maintenance` | Maintenance.tsx | Maintenance Services | No |
| `/resources` | Resources.tsx | Resources | No |
| `/contact` | Contact.tsx | Contact Us | No |
| `/schedule-services` | ScheduleServices.tsx | Schedule Services | No |
| `/membership` | Membership.tsx | Membership Plans | No |
| `/careers` | Careers.tsx | Careers | No |
| `/blog` | Blog.tsx | Blog | No |
| `/privacy-policy` | PrivacyPolicy.tsx | Privacy Policy | No |
| `/terms` | Terms.tsx | Terms of Service | No |
| `/404` | NotFound.tsx | 404 Not Found | No |

### Key Sections on the Homepage (`/`)

The homepage (`Home.tsx`) assembles the following section components in order:

1. **Navbar** — Top blue info bar (address, phone, schedule button) + main nav with mega-menus
2. **HeroSection** — Full-bleed rotating background photos with animated headline ("Where Every Evening Feels Like Home"), CTA buttons, and a Firewise alert banner
3. **StatsSection** — Key trust numbers (years in business, projects completed, etc.)
4. **ServicesSection** — Grid of service cards with icons
5. **AboutSection** — Company story and team intro
6. **PortfolioSection** — Before/after project gallery
7. **MembershipSection** — Maintenance plan tiers
8. **CTABanner** — Full-width call-to-action strip
9. **ReviewsSection** — Google review carousel
10. **ContactSection** — Inline contact form
11. **Footer** — Links, social, license info
12. **FloatingCTA** — Mobile sticky CTA bar

---

## 3. Service Pages (20 pages)

Each service page uses the `ServicePageLayout` component which provides a consistent structure: hero banner, service description, benefits list, FAQ accordion, and a quote CTA. All service pages include the `SEO` component with unique titles and meta descriptions.

| Route | Page Title | Canonical |
|---|---|---|
| `/services/aeration` | Aeration Services | /services/aeration |
| `/services/commercial-maintenance` | Commercial Landscape Maintenance | /services/commercial-maintenance |
| `/services/drainage` | Drainage Solutions | /services/drainage |
| `/services/fire-features` | Fire Pits & Outdoor Fireplaces | /services/fire-features |
| `/services/firewise-landscaping` | Firewise Landscaping | /services/firewise-landscaping |
| `/services/irrigation` | Sprinkler System Design & Installation | /services/irrigation |
| `/services/landscape-design` | Landscape Architecture & Design | /services/landscape-design |
| `/services/landscape-lighting` | Landscape Lighting | /services/landscape-lighting |
| `/services/lawn-fungus` | Lawn Fungus Treatment & Prevention | /services/lawn-fungus |
| `/services/lawn-service` | Residential Lawn Service | /services/lawn-service |
| `/services/outdoor-living` | Outdoor Kitchens & Living Spaces | /services/outdoor-living |
| `/services/pavers` | Paver Patios & Walkways | /services/pavers |
| `/services/retaining-walls` | Retaining Walls | /services/retaining-walls |
| `/services/snow-removal` | Snow Removal | /services/snow-removal |
| `/services/sprinkler-activation` | Spring Sprinkler System Activation | /services/sprinkler-activation |
| `/services/sprinkler-blowout` | Sprinkler Blowout Winterization | /services/sprinkler-blowout |
| `/services/sprinkler-repair` | Sprinkler Repair & Backflow Testing | /services/sprinkler-repair |
| `/services/water-features` | Water Features | /services/water-features |
| `/services/water-wise-landscaping` | Water-Wise Landscaping | /services/water-wise-landscaping |
| `/services/xeriscaping` | Xeriscaping | /services/xeriscaping |

---

## 4. Service Area Landing Pages (139 pages)

The service area section is the largest section of the site by page count, designed for local SEO targeting. Pages cover **Central Oregon cities and neighborhoods** with service-specific sub-pages for each location.

### Geographic Coverage

| City / Area | Sub-Pages | Services Covered |
|---|---|---|
| Bend (neighborhoods) | ~20 | Landscaping, design, irrigation, pavers |
| Redmond | 6 | Landscaping, design, lawn care, pavers, sprinklers, xeriscape |
| Sisters | 6 | Landscaping, design, lawn care, pavers, sprinklers, xeriscape |
| La Pine | 6 | Landscaping, design, lawn care, pavers, sprinklers, xeriscape |
| Sunriver | 6 | Landscaping, design, lawn care, pavers, sprinklers, xeriscape |
| Prineville | 6 | Landscaping, design, lawn care, pavers, sprinklers, xeriscape |
| Madras | 4 | Landscaping, irrigation, lawn care, pavers |
| Terrebonne | 4 | Landscaping, irrigation, lawn care, pavers |
| Culver | 4 | Landscaping, irrigation, lawn care, pavers |
| Tumalo | 6 | Landscaping, design, lawn care, pavers, sprinklers, xeriscape |
| Powell Butte | 5 | Landscaping, irrigation, lawn care, pavers, design |
| Crooked River Ranch | 4 | Landscaping, irrigation, lawn care, pavers |
| Alfalfa | 3 | Irrigation, lawn care, pavers |
| Bend Neighborhoods | ~15 | Awbrey Butte, Broken Top, NW Crossing, Old Mill, River West, etc. |

### Service Type Distribution Across Service Areas

| Service Type | Page Count |
|---|---|
| General Landscaping / Hub | 37 |
| Irrigation / Sprinkler Systems | 20 |
| Lawn Care | 0 |
| Paver Patios | 20 |
| Xeriscaping | 6 |
| Landscape Design | 14 |

Each service-area page uses the `CityPageLayout` component, which provides a consistent structure with a hero, service list, local testimonials, and a quote form.

---

## 5. Resource / Cost Guide Pages (95 pages)

Resource pages are long-form SEO content targeting high-intent cost and FAQ queries. They are the primary organic traffic drivers for the site.

### Content Categories

| Category | Count | Example Pages |
|---|---|---|
| Cost Guides | ~45 | Paver patio cost, sprinkler system cost, lawn care cost, xeriscape cost |
| How-To / Guides | ~20 | When to aerate, spring landscaping guide, winter guide, soil guide |
| FAQ Pages | ~10 | Irrigation FAQ, paver FAQ, xeriscape FAQ |
| Comparison Articles | ~10 | Natural stone vs. concrete, sod vs. seed, gas vs. propane fire pit |
| Seasonal Guides | ~10 | Spring, summer, fall, winter landscaping guides |

### Sample Resource Pages

| Route | Topic |
|---|---|
| `/resources/paver-patio-cost-bend-oregon` | Paver patio pricing guide |
| `/resources/sprinkler-system-cost-bend-oregon` | Irrigation system pricing |
| `/resources/xeriscape-cost-bend-oregon` | Xeriscape installation costs |
| `/resources/lawn-care-cost-bend-oregon` | Lawn service pricing |
| `/resources/natural-stone-vs-concrete-pavers-bend-oregon` | Material comparison |
| `/resources/sod-vs-seed-bend-oregon` | Lawn establishment comparison |
| `/resources/xeriscape-faq-bend-oregon` | Xeriscape FAQ |
| `/resources/irrigation-faq-bend-oregon` | Irrigation FAQ |
| `/resources/spring-landscaping-guide-bend-oregon` | Seasonal guide |
| `/resources/water-wise-landscaping-bend-oregon` | Water conservation guide |

---

## 6. Blog Posts (6 pages)

| Route | Status |
|---|---|
| `/blog` | Blog index page |
| Individual posts | 5 posts (see `/pages/blog/` directory) |

---

## 7. Admin Dashboard (Private — not indexed)

The admin dashboard is accessible via a secret code entry (code: set by owner) from the ★ icon in the top navigation bar. It is not linked publicly and is excluded from robots.txt indexing.

| Route | Page | Description |
|---|---|---|
| `/admin/daily-pulse` | DailyPulse.tsx | AI morning briefing, weather/lead chart, callbacks due |
| `/admin/submissions` | AdminSubmissions.tsx | All lead submissions with follow-up status tracking |
| `/admin/lead-trends` | LeadVolumeTrends.tsx | Lead volume analytics, service breakdown, source analysis |
| `/admin/geo-intelligence` | GeoIntelligence.tsx | Google Maps pin/heatmap with date-range filters |
| `/admin/reminders` | Reminders.tsx | Callback tickler — overdue and upcoming reminders |
| `/admin/csv-import` | CsvImport.tsx | Bulk import historical leads via CSV |

---

## 8. Component Inventory

### Layout & Navigation Components

| Component | Purpose |
|---|---|
| `Navbar.tsx` | Full site navigation with mega-menus, top info bar, mobile hamburger |
| `Footer.tsx` | Site footer with links, social, license, and contact info |
| `MobileCTABar.tsx` | Sticky bottom bar on mobile with call and quote buttons |
| `FloatingCTA.tsx` | Floating CTA button (desktop) |
| `AdminLayout.tsx` | Admin sidebar navigation with mobile drawer |

### Homepage Section Components

| Component | Purpose |
|---|---|
| `HeroSection.tsx` | Full-bleed rotating hero with animated botanical SVG |
| `StatsSection.tsx` | Trust statistics bar |
| `ServicesSection.tsx` | Service grid with icons |
| `AboutSection.tsx` | Company story section |
| `PortfolioSection.tsx` | Project gallery / before-after slider |
| `MembershipSection.tsx` | Maintenance plan tiers |
| `CTABanner.tsx` | Full-width CTA strip |
| `ReviewsSection.tsx` | Google review carousel |
| `ContactSection.tsx` | Inline contact form |

### Reusable Page Layout Components

| Component | Purpose |
|---|---|
| `ServicePageLayout.tsx` | Standard layout for all 20 service pages |
| `CityPageLayout.tsx` | Standard layout for all 139 service-area pages |
| `PortfolioProjectLayout.tsx` | Individual portfolio project page layout |
| `SEO.tsx` | Per-page SEO meta tags (title, description, canonical, OG) |
| `SchemaMarkup.tsx` | JSON-LD structured data injection |

### UI / Interactive Components

| Component | Purpose |
|---|---|
| `BeforeAfterSlider.tsx` | Drag-to-reveal before/after image comparison |
| `PhotoGallery.tsx` | Lightbox image gallery |
| `Map.tsx` | Google Maps integration (proxied, no API key needed) |
| `AIChatBox.tsx` | AI chat interface with streaming support |
| `EditorialQuote.tsx` | Styled pull-quote component |
| `TrustBar.tsx` | Credentials/trust badge strip |
| `MarqueeBand.tsx` | Scrolling marquee text band |
| `BotanicalBand.tsx` | Decorative botanical illustration band |
| `ServiceAreaBand.tsx` | Service area coverage strip |
| `WhoWeServe.tsx` | Customer type targeting section |

---

## 9. SEO Configuration

### Meta Tag System

All pages use the `SEO` component (`client/src/components/SEO.tsx`) which injects:
- `<title>` — Page title appended with "| Newport Avenue Landscaping"
- `<meta name="description">` — Unique per-page description
- `<link rel="canonical">` — Canonical URL pointing to `https://newportavelandscaping.com/` + the page path
- Open Graph tags (`og:title`, `og:description`, `og:image`, `og:type`, `og:url`)
- Twitter Card tags

**Default OG image:** `https://d2xsxph8kpxj0f.cloudfront.net/.../water-feature-sunset.jpg`  
**Base canonical domain:** `https://newportavelandscaping.com`  
**Site name:** Newport Avenue Landscaping

### Structured Data

The `SchemaMarkup` component injects JSON-LD structured data on select pages. Schema types used include:
- `LocalBusiness` — Company info, address, phone, hours
- `Service` — Individual service descriptions
- `FAQPage` — FAQ accordion content
- `Article` — Blog posts and resource guides
- `BreadcrumbList` — Navigation breadcrumbs

### robots.txt

**Current state (temporary):** `User-agent: * Allow: /` — all crawlers allowed for migration mapping.

**Production state (to restore):** Block all crawlers with `Disallow: /` until the new production domain is ready, then switch to:
```
User-agent: *
Allow: /
Sitemap: https://newportavelandscaping.com/sitemap.xml
```

### Sitemap

No `sitemap.xml` is currently generated automatically. For migration, a sitemap should be generated covering all 271 routes.

---

## 10. Image & Media Assets

All production images are hosted on **AWS CloudFront CDN** at `https://d2xsxph8kpxj0f.cloudfront.net/`. Images are referenced directly by URL in components — no local image files are stored in the repository.

### Key Image Categories

| Category | Usage |
|---|---|
| Hero/background photos | HeroSection rotating scenes (water features, patios, lawns) |
| Portfolio project photos | Before/after gallery images |
| Service page heroes | Full-width banner images per service |
| Team/about photos | About section |
| OG/social share image | Default: water-feature-sunset photo |

### Fonts

Fonts are loaded via Google Fonts CDN in `client/index.html`:
- **Cormorant Garamond** — Primary display/headline font (serif)
- **Playfair Display** — Secondary display font (serif)
- **Inter** — Body text and UI font (sans-serif)
- **Montserrat** — Navigation and label font (sans-serif)

---

## 11. Backend & Database

### API Architecture

The backend uses **tRPC** (type-safe RPC) over Express. All API calls go through `/api/trpc`. There are no traditional REST endpoints except for the OAuth callback at `/api/oauth/callback`.

### Database Schema (MySQL / TiDB)

| Table | Purpose |
|---|---|
| `users` | Admin user accounts (Manus OAuth) |
| `service_submissions` | All lead/quote form submissions |
| `weather_daily` | Historical weather data (Open-Meteo) |
| `insights` | AI-generated business insights |
| `lead_follow_ups` | Follow-up status and reminder tracking per lead |
| `csv_import_jobs` | CSV import job history |

### Key Backend Features

- **Lead capture** — All quote form submissions stored in `service_submissions`
- **Follow-up tracking** — `lead_follow_ups` table tracks status (called, voicemail, appointment set, etc.) with automatic next-business-day reminders
- **Weather integration** — Open-Meteo API fetches historical and forecast weather for Bend, OR
- **AI insights** — LLM-powered business insights generated from submission patterns
- **Geo-intelligence** — Geocoded submission addresses displayed on Google Maps with heatmap

---

## 12. Migration Checklist

The following items require attention during any platform migration:

### Critical (Must Preserve)

- [ ] All 271 URL routes must be preserved or 301-redirected to avoid SEO loss
- [ ] Canonical URLs must point to `https://newportavelandscaping.com` (not the Manus preview domain)
- [ ] All meta titles and descriptions must be migrated per-page
- [ ] JSON-LD structured data must be re-implemented on service and FAQ pages
- [ ] robots.txt must be restored to staging-block state until go-live
- [ ] All CDN image URLs (`d2xsxph8kpxj0f.cloudfront.net`) must remain accessible or be re-uploaded

### High Priority

- [ ] Google Fonts (Cormorant Garamond, Playfair Display, Inter, Montserrat) must be loaded
- [ ] Contact/quote form must submit to the same backend or a new form handler
- [ ] Admin dashboard must be migrated separately (not part of public site)
- [ ] Lead follow-up data in MySQL must be exported before migration

### Nice to Have

- [ ] Generate `sitemap.xml` covering all 271 routes
- [ ] Add `hreflang` tags if multi-language support is planned
- [ ] Implement server-side rendering (SSR) or static site generation (SSG) for improved Core Web Vitals

---

## 13. Route Inventory (Complete List)

All 271 registered routes are listed below, grouped by section.

### Core Routes (51)

- `/`
- `/404`
- `/about`
- `/bend-neighborhoods`
- `/careers`
- `/commercial`
- `/commercial-landscaping-bend`
- `/contact`
- `/install`
- `/irrigation-bend-oregon`
- `/landscape-design-bend`
- `/landscape-design-bend/hoa-design`
- `/landscape-design-bend/modern-design`
- `/landscaping-bend-oregon`
- `/landscaping/alfalfa`
- `/landscaping/bend`
- `/landscaping/cline-falls`
- `/landscaping/crooked-river-ranch`
- `/landscaping/eagle-crest`
- `/landscaping/la-pine`
- `/landscaping/madras`
- `/landscaping/powell-butte`
- `/landscaping/prineville`
- `/landscaping/redmond`
- `/landscaping/sisters`
- `/landscaping/sunriver`
- `/landscaping/terrebonne`
- `/landscaping/tumalo`
- `/maintenance`
- `/maintenance/commercial-hoa`
- `/membership`
- `/our-work`
- `/paver-patios-bend`
- `/paver-patios-bend/concrete-pavers`
- `/portfolio/awbrey-butte-patio`
- `/portfolio/awbrey-butte-xeriscape`
- `/portfolio/awbrey-glenn-flagstone`
- `/portfolio/backyard-renovation`
- `/portfolio/bend-full-yard-transformation`
- `/portfolio/broken-top-water-feature`
- `/portfolio/broken-top-xeriscape`
- `/portfolio/century-drive`
- `/portfolio/east-bend-landscape`
- `/portfolio/nw-bend-backyard`
- `/portfolio/nw-bend-lighting`
- `/portfolio/paver-patio-firepit`
- `/portfolio/sw-bend-backyard`
- `/portfolio/westside-outdoor-living`
- `/privacy-policy`
- `/schedule-services`
- `/terms`

### Service Routes (21)

- `/services`
- `/services/aeration`
- `/services/commercial-maintenance`
- `/services/drainage`
- `/services/fire-features`
- `/services/firewise-landscaping`
- `/services/irrigation`
- `/services/landscape-design`
- `/services/landscape-lighting`
- `/services/lawn-fungus`
- `/services/lawn-service`
- `/services/outdoor-living`
- `/services/pavers`
- `/services/retaining-walls`
- `/services/snow-removal`
- `/services/sprinkler-activation`
- `/services/sprinkler-blowout`
- `/services/sprinkler-repair`
- `/services/water-features`
- `/services/water-wise-landscaping`
- `/services/xeriscaping`

### Service Area Routes (88)

- `/service-areas`
- `/service-areas/alfalfa-irrigation`
- `/service-areas/alfalfa-lawn-care`
- `/service-areas/alfalfa-paver-patio`
- `/service-areas/awbrey-butte-landscaping`
- `/service-areas/bend-country-club-landscaping`
- `/service-areas/bend-east-side-landscaping`
- `/service-areas/bend-south-landscaping`
- `/service-areas/bend-westside-landscaping`
- `/service-areas/broken-top-landscaping`
- `/service-areas/brookswood-landscaping`
- `/service-areas/century-drive-corridor-landscaping`
- `/service-areas/crooked-river-ranch`
- `/service-areas/crooked-river-ranch-irrigation`
- `/service-areas/crooked-river-ranch-lawn-care`
- `/service-areas/crooked-river-ranch-paver-patio`
- `/service-areas/culver`
- `/service-areas/culver-irrigation`
- `/service-areas/culver-lawn-care`
- `/service-areas/culver-paver-patio`
- `/service-areas/deschutes-river-woods-landscaping`
- `/service-areas/discovery-west-landscaping`
- `/service-areas/eagle-crest-landscaping`
- `/service-areas/hunnell-road-area-landscaping`
- `/service-areas/la-pine`
- `/service-areas/la-pine-landscape-design`
- `/service-areas/la-pine-lawn-care`
- `/service-areas/la-pine-paver-patio`
- `/service-areas/la-pine-sprinkler-system`
- `/service-areas/la-pine-xeriscape`
- `/service-areas/larkspur-landscaping`
- `/service-areas/lava-butte-area-landscaping`
- `/service-areas/madras`
- `/service-areas/madras-irrigation`
- `/service-areas/madras-lawn-care`
- `/service-areas/madras-paver-patio`
- `/service-areas/murphy-road-area-landscaping`
- `/service-areas/northeast-bend-landscaping`
- `/service-areas/northwest-crossing-landscaping`
- `/service-areas/old-mill-district-landscaping`
- `/service-areas/orion-greens-landscaping`
- `/service-areas/powell-butte-irrigation`
- `/service-areas/powell-butte-landscaping`
- `/service-areas/powell-butte-lawn-care`
- `/service-areas/powell-butte-paver-patio`
- `/service-areas/prineville`
- `/service-areas/prineville-landscape-design`
- `/service-areas/prineville-lawn-care`
- `/service-areas/prineville-paver-patio`
- `/service-areas/prineville-sprinkler-system`
- `/service-areas/prineville-xeriscape`
- `/service-areas/redmond`
- `/service-areas/redmond-landscape-design`
- `/service-areas/redmond-landscaping`
- `/service-areas/redmond-lawn-care`
- `/service-areas/redmond-paver-patio`
- `/service-areas/redmond-sprinkler-system`
- `/service-areas/redmond-xeriscape`
- `/service-areas/river-west-landscaping`
- `/service-areas/shevlin-meadows-landscaping`
- `/service-areas/shevlin-park-area-landscaping`
- `/service-areas/sisters`
- `/service-areas/sisters-landscape-design`
- `/service-areas/sisters-lawn-care`
- `/service-areas/sisters-paver-patio`
- `/service-areas/sisters-sprinkler-system`
- `/service-areas/sisters-xeriscape`
- `/service-areas/skyline-ranch-landscaping`
- `/service-areas/southeast-bend-landscaping`
- `/service-areas/summit-west-landscaping`
- `/service-areas/sunriver`
- `/service-areas/sunriver-landscape-design`
- `/service-areas/sunriver-landscaping`
- `/service-areas/sunriver-lawn-care`
- `/service-areas/sunriver-paver-patio`
- `/service-areas/sunriver-sprinkler-system`
- `/service-areas/sunriver-xeriscape`
- `/service-areas/terrebonne`
- `/service-areas/terrebonne-irrigation`
- `/service-areas/terrebonne-lawn-care`
- `/service-areas/terrebonne-paver-patio`
- `/service-areas/tetherow-landscaping`
- `/service-areas/tumalo-landscape-design`
- `/service-areas/tumalo-lawn-care`
- `/service-areas/tumalo-paver-patio`
- `/service-areas/tumalo-sprinkler-system`
- `/service-areas/tumalo-xeriscape`
- `/service-areas/woodriver-village-landscaping`

### Resource Routes (97)

- `/resources`
- `/resources/backflow-preventer-testing-bend-oregon`
- `/resources/bend-oregon-turf-rebate-program`
- `/resources/bend-turf-rebate-program`
- `/resources/bend-turf-replacement-rebate`
- `/resources/bend-watering-restrictions`
- `/resources/best-grass-bend-oregon`
- `/resources/best-plants-central-oregon-xeriscape`
- `/resources/best-plants-xeriscape-central-oregon`
- `/resources/boulder-landscaping-cost-bend-oregon`
- `/resources/brown-lawn-bend-oregon`
- `/resources/central-oregon-landscaping-guide`
- `/resources/commercial-landscaping-bend-oregon`
- `/resources/commercial-landscaping-cost-bend-oregon`
- `/resources/defensible-space-bend-oregon`
- `/resources/deschutes-county-fire-hardening-requirements`
- `/resources/drainage-solutions-cost-bend-oregon`
- `/resources/drip-vs-spray-irrigation-bend-oregon`
- `/resources/driveway-paver-cost-bend-oregon`
- `/resources/fall-landscaping-guide-bend-oregon`
- `/resources/faq-irrigation-bend-oregon`
- `/resources/faq-lawn-care-bend-oregon`
- `/resources/faq-outdoor-lighting-bend-oregon`
- `/resources/faq-paver-patio-bend-oregon`
- `/resources/faq-retaining-wall-bend-oregon`
- `/resources/faq-snow-removal-bend-oregon`
- `/resources/faq-water-feature-bend-oregon`
- `/resources/faq-xeriscape-bend-oregon`
- `/resources/fencing-cost-bend-oregon`
- `/resources/fire-pit-patio-cost-bend-oregon`
- `/resources/fire-resistant-plants-central-oregon`
- `/resources/gas-vs-propane-fire-pit-bend-oregon`
- `/resources/hoa-landscaping-bend-oregon`
- `/resources/how-to-choose-landscaper-bend-oregon`
- `/resources/how-to-install-drip-irrigation-bend-oregon`
- `/resources/how-to-maintain-paver-patio-bend-oregon`
- `/resources/how-to-plant-trees-bend-oregon`
- `/resources/how-to-prevent-lawn-fungus-bend-oregon`
- `/resources/how-to-read-landscape-proposal-bend-oregon`
- `/resources/how-to-select-pavers-bend-oregon`
- `/resources/how-to-water-lawn-bend-oregon`
- `/resources/how-to-xeriscape-bend-oregon`
- `/resources/irrigation-faq-bend-oregon`
- `/resources/irrigation-repair-bend-oregon`
- `/resources/irrigation-repair-cost-bend-oregon`
- `/resources/juniper-removal-bend-oregon`
- `/resources/landscape-design-cost-bend-oregon`
- `/resources/landscape-design-ideas-bend-oregon`
- `/resources/landscape-lighting-bend-oregon`
- `/resources/landscape-lighting-cost-bend-oregon`
- `/resources/landscape-maintenance-plan-bend-oregon`
- `/resources/landscape-transformation-bend-oregon`
- `/resources/landscape-warranty-bend-oregon`
- `/resources/landscaping-bend-oregon`
- `/resources/landscaping-company-bend-oregon`
- `/resources/landscaping-cost-guide-bend-oregon`
- `/resources/landscaping-home-value-bend-oregon`
- `/resources/landscaping-seasons-bend-oregon`
- `/resources/landscaping-tips-bend-oregon`
- `/resources/lawn-aeration-cost-bend-oregon`
- `/resources/lawn-care-cost-bend-oregon`
- `/resources/lawn-fungus-treatment-bend-oregon`
- `/resources/lawn-maintenance-cost-bend-oregon`
- `/resources/mulch-installation-cost-bend-oregon`
- `/resources/native-vs-adapted-plants-bend-oregon`
- `/resources/natural-stone-vs-concrete-pavers-bend-oregon`
- `/resources/new-construction-landscaping-bend-oregon`
- `/resources/outdoor-kitchen-cost-bend-oregon`
- `/resources/outdoor-lighting-cost-bend-oregon`
- `/resources/paver-patio-cost-bend-oregon`
- `/resources/paver-patio-faq-bend-oregon`
- `/resources/paver-walkway-cost-bend-oregon`
- `/resources/pavers-vs-concrete-bend-oregon`
- `/resources/perennial-garden-cost-bend-oregon`
- `/resources/pergola-cost-bend-oregon`
- `/resources/professional-vs-diy-landscaping-bend-oregon`
- `/resources/retaining-wall-cost-bend-oregon`
- `/resources/snow-removal-bend-oregon`
- `/resources/snow-removal-cost-bend-oregon`
- `/resources/sod-installation-cost-bend-oregon`
- `/resources/sod-vs-seed-bend-oregon`
- `/resources/spring-landscaping-guide-bend-oregon`
- `/resources/sprinkler-system-cost-bend-oregon`
- `/resources/sprinkler-winterization-guide-bend`
- `/resources/sprinkler-winterization-guide-bend-oregon`
- `/resources/summer-landscaping-guide-bend-oregon`
- `/resources/tree-removal-cost-bend-oregon`
- `/resources/understanding-soil-bend-oregon`
- `/resources/water-feature-cost-bend-oregon`
- `/resources/water-wise-landscaping-bend-oregon`
- `/resources/waterwise-communities-bend-hoa`
- `/resources/when-to-aerate-lawn-bend-oregon`
- `/resources/when-to-plant-bend-oregon`
- `/resources/winter-landscaping-guide-bend-oregon`
- `/resources/xeriscape-cost-bend-oregon`
- `/resources/xeriscape-faq-bend-oregon`
- `/resources/xeriscape-vs-traditional-lawn-bend-oregon`

### Blog Routes (7)

- `/blog`
- `/blog/climate-change-landscaping`
- `/blog/lawn-care-bend-oregon`
- `/blog/paver-patio-ideas-bend-oregon`
- `/blog/seasonal-landscaping-guide`
- `/blog/sprinkler-winterization-bend-oregon`
- `/blog/xeriscape-landscaping-bend-oregon`

### Admin Routes (7) — Private

- `/admin/csv-import`
- `/admin/daily-pulse`
- `/admin/geo-intelligence`
- `/admin/image-tracker`
- `/admin/lead-trends`
- `/admin/reminders`
- `/admin/submissions`

---

*Report generated by Manus AI from source code analysis of the Newport Avenue Landscaping project.*
