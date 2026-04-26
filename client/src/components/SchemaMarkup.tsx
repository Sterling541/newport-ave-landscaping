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
      "Central Oregon's premier landscaping company since 2005. Custom landscape design, installation, maintenance & irrigation in Bend, Redmond, Sisters & beyond.",
    url: "https://newportavelandscaping.com",
    telephone: "+15416178873",
    email: "info@newportavelandscaping.com",
    foundingDate: "2005",
    logo: "/manus-storage/logo-nav-tight_c562b49c_21958b81.webp",
    image: "/manus-storage/water-feature-sunset_f7b219d3_87f250b3.webp",
    address: {
      "@type": "PostalAddress",
      streetAddress: "61535 S Hwy 97",
      addressLocality: "Bend",
      addressRegion: "OR",
      postalCode: "97702",
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
      worstRating: "1",
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

// ── AggregateRating schema (standalone, for service pages) ──
export function AggregateRatingSchema({ serviceName, serviceUrl }: { serviceName: string; serviceUrl: string }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: serviceName,
    url: `https://newportavelandscaping.com${serviceUrl}`,
    provider: {
      "@type": "LocalBusiness",
      "@id": "https://newportavelandscaping.com/#business",
      name: "Newport Avenue Landscaping",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "127",
      bestRating: "5",
      worstRating: "1",
    },
    review: [
      {
        "@type": "Review",
        author: { "@type": "Person", name: "Sarah M." },
        datePublished: "2024-08-15",
        reviewBody: "Newport Avenue completely transformed our backyard. The design was thoughtful, the crew was professional, and the result exceeded our expectations. We've gotten so many compliments from neighbors.",
        reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5", worstRating: "1" },
      },
      {
        "@type": "Review",
        author: { "@type": "Person", name: "Tom K." },
        datePublished: "2024-06-22",
        reviewBody: "They installed our irrigation system and it has been flawless. The team was knowledgeable about Central Oregon's soil and climate, and they programmed the controller perfectly. Water bill went down noticeably.",
        reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5", worstRating: "1" },
      },
      {
        "@type": "Review",
        author: { "@type": "Person", name: "Linda R." },
        datePublished: "2024-05-10",
        reviewBody: "We hired Newport Ave for our xeriscape redesign and couldn't be happier. They used beautiful native plants, the design looks stunning, and we've cut our water use dramatically. Highly recommend.",
        reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5", worstRating: "1" },
      },
    ],
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
