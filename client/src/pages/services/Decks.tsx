import ServicePageLayout from "@/components/ServicePageLayout";

const relatedLinks = [
  { label: "Outdoor Kitchens & Living Spaces", href: "/services/outdoor-living" },
  { label: "Paver Patios & Walkways", href: "/services/pavers" },
  { label: "Fire Pits & Fireplaces", href: "/services/fire-features" },
  { label: "Landscape Lighting", href: "/services/landscape-lighting" },
  { label: "Landscape Design", href: "/services/landscape-design" },
];

const resourceLinks = [
  {
    label: "How Much Does a Deck Cost in Bend, OR?",
    href: "/resources/deck-cost-bend-oregon",
    description: "2025 pricing guide: composite vs. wood, size, and what affects your total.",
  },
  {
    label: "Paver Patio Cost Guide — Bend",
    href: "/resources/paver-patio-cost-bend-oregon",
    description: "Compare paver patios vs. decks for your Central Oregon outdoor space.",
  },
  {
    label: "Fire Pit & Patio Cost Guide",
    href: "/resources/fire-pit-patio-cost-bend-oregon",
    description: "Budgeting for a fire pit or outdoor fireplace alongside your deck.",
  },
];

export default function Decks() {
  return (
    <ServicePageLayout
      category="Installation Services"
      title="Decks"
      subtitle="& Pergolas"
      seoTitle="Deck Builder Bend Oregon | Composite & Wood Decks | Newport Avenue Landscaping"
      seoDescription="Custom deck building and pergola installation in Bend, Oregon. Composite, Trex, cedar, and pressure-treated decks. Licensed deck contractor LCB #9153. Free estimates."
      heroImage="/manus-storage/GLLPatio2_600w_127ef46c.webp"
      heroPosition="center 40%"
      intro="A well-built deck is one of the most-used outdoor spaces a Central Oregon home can have. Whether you want a simple pressure-treated platform off your back door, a multi-level composite deck with built-in seating, or a fully covered pergola for year-round enjoyment, Newport Avenue Landscaping designs and builds decks that fit your lifestyle, your home's architecture, and Central Oregon's demanding climate."
      pricing={[
        { label: "Typical Range", value: "$8,000 – $60,000+" },
        { label: "Design Consultation", value: "Complimentary" },
        { label: "Warranty", value: "Manufacturer + 1-Yr Labor" },
      ]}
      sections={[
        {
          heading: "Composite vs. Wood Decks in Central Oregon",
          body: "Choosing between composite and natural wood is the first major decision in any deck project. Both have real advantages in Bend's high-desert climate — and we build both.",
          list: [
            "Composite Decking (Trex, TimberTech, Fiberon) — the most popular choice for Bend homeowners. Composite boards resist fading, splintering, and moisture damage from freeze-thaw cycles. They require virtually no maintenance beyond occasional washing, and most manufacturers offer 25–30 year warranties. The upfront cost is higher than pressure-treated wood, but the lifetime cost is typically lower.",
            "Cedar & Redwood — naturally rot-resistant and beautiful, cedar is a premium natural wood option that performs well in Central Oregon. It requires periodic staining or sealing (every 2–3 years) to maintain its appearance and longevity. Cedar decks have a warm, natural aesthetic that composite cannot fully replicate.",
            "Pressure-Treated Lumber — the most budget-friendly option for structural framing and decking boards. Modern pressure-treated lumber is safe and durable, though it requires more maintenance than composite and will gray over time without staining. An excellent choice for secondary decks, rental properties, or budget-conscious projects.",
            "Hardwoods (Ipe, Cumaru, Tigerwood) — premium tropical hardwoods offer exceptional durability and a striking appearance. They are extremely dense and naturally resistant to insects and rot. Hardwood decks are a premium investment that can last 40+ years with proper maintenance.",
          ],
        },
        {
          heading: "Deck Design for Central Oregon Homes",
          body: [
            "Central Oregon's outdoor lifestyle demands decks that work hard across all four seasons — from summer evenings under the stars to snowy winter mornings with a cup of coffee. Our deck designs account for Bend's intense UV exposure (which fades lower-quality materials quickly), significant snowfall in some areas, and the temperature swings that cause inferior decks to warp and split.",
            "We design decks to complement your home's existing architecture. A craftsman-style home in NW Crossing calls for different materials and details than a contemporary home in Tetherow or a rustic cabin in Sunriver. Our design process begins with understanding how you want to use the space — entertaining, dining, relaxing, or all three — and then building a deck that serves those needs beautifully.",
          ],
          accent: true,
        },
        {
          heading: "Pergolas & Covered Deck Structures",
          body: [
            "A pergola transforms a basic deck into a true outdoor room. In Bend's sunny climate, shade is not a luxury — it's a necessity for afternoon use during the summer months. We design and build freestanding and attached pergolas in wood, aluminum, and vinyl, with options for:",
            "",
          ],
          list: [
            "Open-lattice pergolas for partial shade and visual definition",
            "Solid-roof pergolas and patio covers for full weather protection",
            "Louvered pergolas with adjustable roof panels (open to the sky or fully closed)",
            "Motorized pergola systems with remote-controlled louvers and integrated LED lighting",
            "Pergolas with ceiling fans, outdoor speakers, and string light systems",
            "Attached pergolas that connect your deck seamlessly to your home",
          ],
        },
        {
          heading: "Built-In Deck Features",
          body: "The best decks are more than just a flat surface. We integrate functional and aesthetic features that make your deck more usable and more beautiful:",
          list: [
            "Built-in bench seating with storage underneath",
            "Integrated planters and privacy screens",
            "Cable railing systems for unobstructed views",
            "Glass panel railings for modern homes",
            "Deck lighting (post cap lights, step lights, under-rail LED strips)",
            "Hot tub platforms and structural reinforcement",
            "Outdoor kitchen rough-ins (gas, electrical, water)",
            "Staircase design and construction (straight, L-shaped, wraparound)",
          ],
        },
        {
          heading: "Deck Building Process",
          body: [
            "Every deck project starts with a complimentary on-site consultation. We assess your yard, discuss your vision, and take measurements. From there, we produce a detailed design with material options and a written estimate.",
            "Once you approve the design, we pull all required building permits through Deschutes County or the City of Bend — a step many contractors skip, leaving homeowners with unpermitted structures that cause problems at resale. Our crews build to code, and all work is inspected before final completion.",
            "Most residential deck projects are completed in 1–3 weeks, depending on size and complexity. We protect your landscaping during construction and leave the site clean at the end of every workday.",
          ],
        },
        {
          heading: "Why Permits Matter for Deck Construction",
          body: [
            "In Bend and Deschutes County, decks over 30 inches above grade require a building permit. Many homeowners are surprised to learn that unpermitted decks can create serious problems: they may need to be torn down before a home sale, they void homeowner's insurance coverage for deck-related incidents, and they can result in fines if discovered.",
            "Newport Avenue Landscaping pulls all required permits as a standard part of every deck project. We work with Deschutes County Building and the City of Bend's permit office regularly, and we know exactly what inspectors look for. Building to code protects your investment and gives you peace of mind.",
          ],
          accent: true,
        },
        {
          heading: "Deck Repair & Refinishing",
          body: [
            "Not every deck project is a new build. We also repair and refinish existing decks — replacing rotted boards, reinforcing loose railings, repairing structural framing, and applying fresh stain or sealant to restore a weathered deck's appearance.",
            "If your existing deck is structurally sound but looking tired, a refinishing project can add years of life at a fraction of replacement cost. If it's beyond repair, we'll give you an honest assessment and a competitive quote for a new deck built to last.",
          ],
        },
      ]}
      relatedLinks={relatedLinks}
      resourceLinks={resourceLinks}
      galleryImages={[
        { src: "/manus-storage/GLLPatio2_600w_127ef46c.webp", alt: "Custom deck and patio installation in Bend Oregon by Newport Avenue Landscaping" },
        { src: "/manus-storage/GLLPatio10_2ffabcfb_2fda87b6.webp", alt: "Composite deck with pergola and outdoor living space in Central Oregon" },
        { src: "/manus-storage/svc-outdoor-kitchen-2_234bb6f9.jpg", alt: "Covered deck with pergola and outdoor kitchen in Bend Oregon" },
      ]}
      schemaUrl="/services/decks"
      schemaName="Deck Building & Pergola Installation"
      schemaDescription="Custom deck building, pergola installation, and deck repair in Bend, Oregon. Composite, Trex, cedar, and pressure-treated decks. Licensed contractor LCB #9153."
      portfolioProjects={[
        {
          title: "Westside Outdoor Living Space",
          href: "/portfolio/westside-outdoor-living",
          image: "/manus-storage/westside-living-01_30518074.jpg",
          category: "DECK · OUTDOOR LIVING",
        },
        {
          title: "SW Bend Backyard Transformation",
          href: "/portfolio/sw-bend-backyard",
          image: "/manus-storage/sw-bend-01_45e68c0e.jpg",
          category: "DECK · PAVERS · DESIGN & BUILD",
        },
        {
          title: "Awbrey Butte Patio & Wall",
          href: "/portfolio/awbrey-butte-patio",
          image: "/manus-storage/awbrey-patio-wall-01_bde91632.jpg",
          category: "DECK · RETAINING WALLS",
        },
      ]}
      faqs={[
        {
          question: "How much does a deck cost in Bend, Oregon?",
          answer: "Deck costs in Bend range from $8,000 for a basic 200 sq ft pressure-treated deck to $60,000+ for a large multi-level composite deck with pergola, built-in seating, and lighting. The most common residential deck project — a 300–400 sq ft composite deck with cable railing — typically runs $18,000–$32,000 installed. See our full cost guide at /resources/deck-cost-bend-oregon for detailed pricing.",
        },
        {
          question: "What is the best decking material for Bend's climate?",
          answer: "Composite decking (Trex, TimberTech, or Fiberon) is the most popular choice in Bend for good reason: it handles UV exposure, freeze-thaw cycles, and occasional snow without warping, fading, or splintering. Cedar is a beautiful natural alternative that performs well but requires periodic maintenance. Pressure-treated lumber is the most affordable option and works well for secondary decks or budget-conscious projects.",
        },
        {
          question: "Do I need a permit to build a deck in Bend?",
          answer: "Yes — in Bend and Deschutes County, decks over 30 inches above grade require a building permit. Newport Avenue Landscaping pulls all required permits as a standard part of every deck project. Unpermitted decks can cause problems at resale and may void homeowner's insurance coverage for deck-related incidents.",
        },
        {
          question: "How long does it take to build a deck in Bend?",
          answer: "Most residential deck projects take 1–3 weeks from start to finish, depending on size and complexity. A simple 200–300 sq ft deck takes about 1 week. A large multi-level deck with pergola and built-in features takes 2–4 weeks. Permit approval from the City of Bend or Deschutes County typically adds 1–2 weeks to the overall timeline.",
        },
        {
          question: "Do you build pergolas and covered deck structures?",
          answer: "Yes — pergolas and covered structures are one of our most popular deck add-ons. We build open-lattice pergolas, solid-roof patio covers, and motorized louvered pergola systems. A covered deck extends your usable outdoor season significantly in Bend's climate and provides essential afternoon shade during summer.",
        },
        {
          question: "Can you repair or refinish an existing deck?",
          answer: "Yes. We repair rotted boards, reinforce loose railings, fix structural framing issues, and refinish weathered decks with fresh stain or sealant. If your deck is structurally sound but looking tired, refinishing can add years of life at a fraction of replacement cost. We'll give you an honest assessment of whether repair or replacement makes more financial sense.",
        },
      ]}
    />
  );
}
