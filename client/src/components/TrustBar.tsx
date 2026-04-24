/* ============================================================
   TRUST BAR — Newport Avenue Landscaping
   
   Visually dominant trust signal strip that appears:
   - Below the hero on the homepage
   - Below the hero on every service page
   - Below the hero on every city page
   
   Contains:
   - 5-star Google rating with review count (AggregateRating schema)
   - 21+ years in business
   - Licensed & Bonded in Oregon
   - 90-Day Plant Warranty
   - Free Estimates
   - BBB Accredited / A+ Rating
   
   Schema: AggregateRating injected via JSON-LD for Google rich results
   ============================================================ */

const AGGREGATE_RATING_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": "https://newportavelandscaping.com/#business",
  name: "Newport Avenue Landscaping",
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "5.0",
    bestRating: "5",
    worstRating: "1",
    reviewCount: "127",
    ratingCount: "127",
  },
};

const TRUST_ITEMS = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="oklch(0.72 0.18 60)" stroke="oklch(0.72 0.18 60)" strokeWidth="0.5"/>
      </svg>
    ),
    value: "5.0",
    label: "Google Rating",
    sub: "127 reviews",
    highlight: true,
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <circle cx="12" cy="12" r="10" stroke="oklch(0.46 0.20 25)" strokeWidth="1.5"/>
        <path d="M12 6v6l4 2" stroke="oklch(0.46 0.20 25)" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    value: "21+",
    label: "Years in Business",
    sub: "Since 2005",
    highlight: false,
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M12 2L3 7v5c0 5.25 3.75 10.15 9 11.35C17.25 22.15 21 17.25 21 12V7L12 2z" stroke="oklch(0.46 0.20 25)" strokeWidth="1.5" fill="none"/>
        <path d="M9 12l2 2 4-4" stroke="oklch(0.46 0.20 25)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    value: "Licensed",
    label: "& Bonded",
    sub: "Oregon LCB #9153",
    highlight: false,
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="3" y="11" width="18" height="11" rx="2" stroke="oklch(0.46 0.20 25)" strokeWidth="1.5"/>
        <path d="M7 11V7a5 5 0 0110 0v4" stroke="oklch(0.46 0.20 25)" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    value: "90-Day Plants",
    label: "Warranty",
    sub: "Plants: 90 days · Irrigation: 1 year",
    highlight: false,
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M9 12l2 2 4-4" stroke="oklch(0.46 0.20 25)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="12" cy="12" r="10" stroke="oklch(0.46 0.20 25)" strokeWidth="1.5"/>
      </svg>
    ),
    value: "Free",
    label: "Estimates",
    sub: "No obligation quotes",
    highlight: false,
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6L12 2z" stroke="oklch(0.46 0.20 25)" strokeWidth="1.5" fill="none"/>
      </svg>
    ),
    value: "A+",
    label: "BBB Rating",
    sub: "Accredited Business",
    highlight: false,
  },
];

export default function TrustBar() {
  return (
    <>
      {/* AggregateRating JSON-LD for Google rich results */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(AGGREGATE_RATING_SCHEMA) }}
      />

      <section
        aria-label="Trust signals and credentials"
        style={{
          backgroundColor: "oklch(0.12 0.006 30)",
          borderTop: "3px solid oklch(0.46 0.20 25)",
          borderBottom: "1px solid oklch(0.20 0.006 30)",
          padding: "0",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Subtle texture overlay */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: "radial-gradient(circle at 20% 50%, oklch(0.46 0.20 25 / 0.06) 0%, transparent 60%), radial-gradient(circle at 80% 50%, oklch(0.46 0.20 25 / 0.04) 0%, transparent 50%)",
            pointerEvents: "none",
          }}
        />

        <div
          className="container"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
            gap: "0",
            position: "relative",
          }}
        >
          {TRUST_ITEMS.map((item, i) => (
            <div
              key={item.label}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                padding: "1.4rem 1rem",
                borderRight: i < TRUST_ITEMS.length - 1 ? "1px solid oklch(0.25 0.006 30)" : "none",
                position: "relative",
                backgroundColor: item.highlight ? "oklch(0.16 0.008 30)" : "transparent",
              }}
            >
              {/* Highlight accent for star rating */}
              {item.highlight && (
                <div
                  aria-hidden="true"
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: "3px",
                    background: "linear-gradient(90deg, oklch(0.72 0.18 60), oklch(0.65 0.16 55))",
                  }}
                />
              )}

              {/* Icon */}
              <div style={{ marginBottom: "0.5rem" }}>{item.icon}</div>

              {/* Star row for rating item */}
              {item.highlight && (
                <div
                  style={{ display: "flex", gap: "2px", marginBottom: "0.3rem" }}
                  aria-label="5 out of 5 stars"
                >
                  {[1,2,3,4,5].map((s) => (
                    <svg key={s} width="11" height="11" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="oklch(0.72 0.18 60)"/>
                    </svg>
                  ))}
                </div>
              )}

              {/* Value */}
              <div
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: item.highlight ? "2rem" : "1.6rem",
                  fontWeight: 700,
                  color: item.highlight ? "oklch(0.72 0.18 60)" : "oklch(0.95 0.008 75)",
                  lineHeight: 1,
                  marginBottom: "0.2rem",
                }}
              >
                {item.value}
              </div>

              {/* Label */}
              <div
                style={{
                  fontFamily: "'Montserrat', sans-serif",
                  fontSize: "0.58rem",
                  fontWeight: 700,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: item.highlight ? "oklch(0.88 0.008 75)" : "oklch(0.72 0.008 75)",
                  marginBottom: "0.2rem",
                  textAlign: "center",
                }}
              >
                {item.label}
              </div>

              {/* Sub */}
              <div
                style={{
                  fontFamily: "'Montserrat', sans-serif",
                  fontSize: "0.52rem",
                  fontWeight: 400,
                  letterSpacing: "0.06em",
                  color: "oklch(0.52 0.008 75)",
                  textAlign: "center",
                }}
              >
                {item.sub}
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
