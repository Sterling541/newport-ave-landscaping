/* ============================================================
   SchemaMarkup — JSON-LD structured data for Google
   Includes: LocalBusiness, Service, BreadcrumbList, FAQPage
   ============================================================ */
import { Helmet } from "react-helmet-async";

// ── LocalBusiness schema (used on homepage + contact page) ──
export function LocalBusinessSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "LandscapeService"],
    "@id": "https://newportavelandscaping.com/#business",
    name: "Newport Avenue Landscaping",
    alternateName: "Newport Ave Landscaping",
    description:
      "Central Oregon's premier landscaping company since 2003. Custom landscape design, installation, maintenance & irrigation in Bend, Redmond, Sisters & beyond.",
    url: "https://newportavelandscaping.com",
    telephone: "+15416178873",
    email: "info@newportavelandscaping.com",
    foundingDate: "2003",
    logo: "https://d2xsxph8kpxj0f.cloudfront.net/310519663503028182/g3pw3MRUapabcDUbhBEFxx/logo-nav-tight_c562b49c.png",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663503028182/g3pw3MRUapabcDUbhBEFxx/water-feature-sunset_f7b219d3.jpg",
    address: {
      "@type": "PostalAddress",
      streetAddress: "64625 N. HWY 97 #100",
      addressLocality: "Bend",
      addressRegion: "OR",
      postalCode: "97701",
      addressCountry: "US",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 44.0582,
      longitude: -121.3153,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "07:00",
        closes: "17:00",
      },
    ],
    areaServed: [
      { "@type": "City", name: "Bend", sameAs: "https://en.wikipedia.org/wiki/Bend,_Oregon" },
      { "@type": "City", name: "Redmond", sameAs: "https://en.wikipedia.org/wiki/Redmond,_Oregon" },
      { "@type": "City", name: "Sisters", sameAs: "https://en.wikipedia.org/wiki/Sisters,_Oregon" },
      { "@type": "City", name: "Sunriver" },
      { "@type": "City", name: "Tumalo" },
      { "@type": "City", name: "Prineville" },
      { "@type": "City", name: "La Pine" },
      { "@type": "City", name: "Madras" },
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Landscaping Services",
      itemListElement: [
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Lawn Maintenance" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Landscape Design & Installation" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Irrigation System Installation" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Sprinkler Winterization" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Paver Patio Installation" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Water Features" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Outdoor Living Spaces" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Xeriscape Landscaping" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Snow Removal" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Landscape Lighting" } },
      ],
    },
    sameAs: [
      "https://www.facebook.com/newportavelandscaping",
      "https://www.yelp.com/biz/newport-avenue-landscaping-bend",
    ],
    priceRange: "$$",
    currenciesAccepted: "USD",
    paymentAccepted: "Cash, Credit Card, Check",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "127",
      bestRating: "5",
    },
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  );
}

// ── Service schema (used on individual service pages) ──
interface ServiceSchemaProps {
  name: string;
  description: string;
  url: string;
  imageUrl?: string;
}

export function ServiceSchema({ name, description, url, imageUrl }: ServiceSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    url: `https://newportavelandscaping.com${url}`,
    ...(imageUrl && { image: imageUrl }),
    provider: {
      "@type": "LocalBusiness",
      "@id": "https://newportavelandscaping.com/#business",
      name: "Newport Avenue Landscaping",
      telephone: "+15416178873",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Bend",
        addressRegion: "OR",
        addressCountry: "US",
      },
    },
    areaServed: {
      "@type": "State",
      name: "Oregon",
    },
    serviceType: name,
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  );
}

// ── BreadcrumbList schema ──
interface BreadcrumbItem {
  name: string;
  url: string;
}

export function BreadcrumbSchema({ items }: { items: BreadcrumbItem[] }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `https://newportavelandscaping.com${item.url}`,
    })),
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  );
}

// ── FAQPage schema ──
interface FAQItem {
  question: string;
  answer: string;
}

export function FAQSchema({ faqs }: { faqs: FAQItem[] }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  );
}
