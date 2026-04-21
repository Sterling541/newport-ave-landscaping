import ServicePageLayout from "@/components/ServicePageLayout";

const relatedLinks = [
  { label: "Landscape Design", href: "/services/landscape-design" },
  { label: "Irrigation Systems", href: "/services/irrigation" },
  { label: "Drainage Solutions", href: "/services/drainage" },
  { label: "Retaining Walls", href: "/services/retaining-walls" },
];

const resourceLinks = [
  {
    label: "Defensible Space Guide for Bend Homeowners",
    href: "/resources/defensible-space-bend-oregon",
    description: "Zone-by-zone breakdown of what to remove, what to plant, and how to meet Oregon requirements.",
  },
  {
    label: "Deschutes County Fire Hardening Requirements (R327)",
    href: "/resources/deschutes-county-fire-hardening-requirements",
    description: "What the new April 2026 ordinance means for your property and landscaping.",
  },
  {
    label: "Fire-Resistant Plants for Central Oregon",
    href: "/resources/fire-resistant-plants-central-oregon",
    description: "The best low-flammability plants for Bend's high-desert climate.",
  },
  {
    label: "Juniper Removal in Bend Oregon",
    href: "/resources/juniper-removal-bend-oregon",
    description: "Why juniper is Central Oregon's #1 fire risk and how to safely remove it.",
  },
];

const faqs = [
  {
    question: "What is firewise landscaping and do I need it in Bend?",
    answer:
      "Firewise landscaping — also called defensible space landscaping — is the practice of designing and maintaining your yard to reduce the risk of wildfire igniting or spreading to your home. In Central Oregon, where wildfire risk is high and growing, it involves removing highly flammable plants like juniper and manzanita, creating zone-based vegetation buffers around your home, and replanting with fire-resistant species. Deschutes County adopted new fire hardening requirements (R327) effective April 1, 2026, and the Oregon Fire Marshal is drafting a defensible space ordinance expected for local adoption later in 2026. Even if your property isn't yet subject to a code requirement, firewise landscaping is one of the most impactful things you can do to protect your home.",
  },
  {
    question: "What does Newport Avenue do for firewise landscaping?",
    answer:
      "We offer a complete firewise transformation — not just removal. Our process starts with a site assessment to identify high-risk plants and zone violations, then we remove hazardous vegetation (junipers, manzanita, ladder fuels), regrade and prep the soil, install or upgrade your irrigation system to maintain Zone 1 moisture levels, and replant with fire-resistant, drought-tolerant species that are beautiful and appropriate for Central Oregon's high-desert climate. We handle the entire project from assessment to final planting.",
  },
  {
    question: "How much does firewise landscaping cost in Bend?",
    answer:
      "Firewise landscaping costs vary significantly based on property size, the number and size of hazardous plants to remove, and how much replanting is involved. A typical residential firewise assessment and Zone 1 cleanup (0–30 feet from the home) runs $2,500–$6,500. Full property defensible space transformations including replanting typically range from $7,500–$25,000+. Juniper removal alone is priced by the tree — small trees under 10 feet run $300–$650 each; large mature junipers can be $800–$2,500 depending on access and disposal. Contact us for a free site assessment and written estimate.",
  },
  {
    question: "Which plants are most dangerous in Central Oregon and need to be removed?",
    answer:
      "Juniper is by far the highest fire risk in Central Oregon — it contains highly volatile oils and burns intensely, and it's extremely common in Bend-area landscapes. Other high-risk plants include manzanita, arborvitae (Thuja), cedar, pine, and spruce. Any plant with high oil content, dead wood accumulation, or dense branching that creates a continuous fuel path from the ground to the tree canopy (called 'ladder fuels') is a priority for removal or pruning. We'll identify all high-risk plants during your free site assessment.",
  },
  {
    question: "What are the three defensible space zones?",
    answer:
      "Zone 1 (0–30 feet from your home) is the highest priority — this area should be well-irrigated, free of dead vegetation, and planted only with carefully spaced low-flammability species. No wood mulch within 5 feet of the structure. Zone 2 (30–100 feet) uses low-flammability, low-growing plants with well-spaced trees — no touching canopies. Zone 3 (100+ feet) is a natural area where you selectively prune, thin, and remove highly flammable vegetation to reduce fuel load. Newport Avenue can assess and address all three zones.",
  },
  {
    question: "Does Deschutes County require defensible space landscaping?",
    answer:
      "As of April 2026, Deschutes County's R327 fire hardening code applies to new construction — requiring fire-resistant building materials like cementitious siding, asphalt shingles, and noncombustible gutters. It does not yet mandate defensible space landscaping for existing homes. However, the Oregon Fire Marshal's Office is actively drafting a defensible space code expected for local adoption in late 2026, and the Project Wildfire Neighborhood Coalition (80+ Deschutes County communities) is pushing Bend, Redmond, and La Pine to adopt codes as soon as possible. Getting ahead of the requirement now protects your home and avoids a rushed, potentially more expensive compliance project later.",
  },
  {
    question: "Can you help me get my property Firewise USA certified?",
    answer:
      "Yes. Firewise USA is a national program that recognizes communities and properties that have taken proactive steps to reduce wildfire risk. While certification is typically a community-level designation, individual property owners can document their firewise improvements to support neighborhood certification efforts. We can provide documentation of all work completed, plant species installed, and zone compliance achieved to support your neighborhood's Firewise USA application.",
  },
];

export default function FirewiseLandscaping() {
  return (
    <ServicePageLayout
      category="Fire Safety & Mitigation"
      title="Firewise Landscaping"
      subtitle="Defensible Space for Bend, Oregon"
      seoTitle="Firewise Landscaping Bend Oregon | Defensible Space Contractor | Newport Avenue"
      seoDescription="Firewise landscaping and defensible space services in Bend, Oregon. Juniper removal, fire-resistant replanting, and zone-based vegetation management for Deschutes County homeowners. Free assessment. LCB #9153."
      heroImage="/manus-storage/forest-home4_9324e5db.jpg"
      heroPosition="center 40%"
      intro="Wildfire is no longer a distant threat in Central Oregon — it's a present reality. Deschutes County adopted new fire hardening requirements in April 2026, and a defensible space ordinance is actively being drafted for local adoption. Newport Avenue Landscaping offers complete firewise transformations: we assess your property's fire risk, remove hazardous vegetation like juniper and manzanita, upgrade your irrigation to maintain Zone 1 moisture levels, and replant with fire-resistant species that are beautiful, drought-tolerant, and appropriate for Central Oregon's high desert. We don't just clear brush — we rebuild your landscape to protect your home."
      pricing={[
        { label: "Zone 1 Cleanup (0–30 ft)", value: "$2,500–$6,500 typical" },
        { label: "Full Property Transformation", value: "$7,500–$25,000+" },
        { label: "Juniper Removal (small)", value: "$300–$650 per tree" },
        { label: "Juniper Removal (large)", value: "$800–$2,500 per tree" },
        { label: "Fire-Resistant Replanting", value: "Quoted per project" },
        { label: "Service Area", value: "Bend, Redmond, Sisters, Sunriver, Tumalo & all of Deschutes County" },
      ]}
      sections={[
        {
          heading: "Why Firewise Landscaping Matters in Bend Right Now",
          body: [
            "Central Oregon has experienced several near-disaster wildfire seasons in recent years. In 2025, the Flat Fire burned more than 20,000 acres and destroyed four homes as it barreled toward Sisters. Fast-moving fires forced evacuations north of Bend and in Sunriver in 2024. The Project Wildfire Neighborhood Coalition — representing 80+ communities across Deschutes County — is pushing every city in the region to adopt defensible space codes as quickly as possible.",
            "Deschutes County adopted fire hardening code R327 effective April 1, 2026, requiring fire-resistant building materials on all new construction. The Oregon Fire Marshal's Office is actively drafting a defensible space ordinance for local adoption later in 2026. Getting ahead of these requirements now means you control the timeline, choose your contractor, and avoid the rushed compliance work that will flood the market when codes take effect.",
          ],
        },
        {
          heading: "Our Firewise Process: Assessment to Completion",
          body: "We approach every firewise project with the same rigor we bring to full landscape installations — because that's exactly what a firewise transformation is. Our process begins with a thorough site assessment where we walk your entire property, identify high-risk plants and fuel accumulation zones, evaluate your irrigation coverage, and document the current state of each defensible space zone. We then provide a written scope of work with itemized pricing before any work begins.",
          list: [
            "Free site assessment and zone-by-zone risk evaluation",
            "Removal of high-risk plants: juniper, manzanita, arborvitae, ladder fuels",
            "Tree pruning to raise canopy height (lowest limbs to at least twice the height of surrounding understory vegetation, typically 6+ ft from ground)",
            "Irrigation system assessment and upgrade to cover Zone 1 and Zone 2",
            "Soil preparation and fire-resistant replanting",
            "Gravel and rock mulch installation within 5 feet of structure",
            "Ongoing maintenance programs to keep zones compliant year-round",
          ],
        },
        {
          heading: "Juniper Removal: Central Oregon's #1 Fire Risk",
          body: [
            "Western juniper is the most dangerous plant in Central Oregon landscapes. It contains highly volatile oils that cause it to burn intensely and spread embers rapidly. A single large juniper near your home can act as a torch that ignites your roof, deck, or siding before firefighters can respond. Juniper is also extremely common in Bend-area landscapes — many properties have multiple mature trees within the critical Zone 1 area.",
            "We remove junipers of all sizes, from small ornamental plantings to large mature trees. Removal includes cutting, chipping or hauling debris, and stump grinding. We can also selectively prune junipers that are located in Zone 2 or Zone 3 where complete removal isn't necessary — raising the canopy height (limbs to 2x understory height) and removing dead wood significantly reduces their fire risk without eliminating them entirely.",
          ],
          accent: true,
        },
        {
          heading: "Fire-Resistant Replanting for Central Oregon",
          body: [
            "Removing hazardous plants doesn't mean living with a bare, unattractive yard. Central Oregon has a rich palette of fire-resistant plants that thrive in the high desert climate, require minimal water, and create genuinely beautiful landscapes. We specialize in designing firewise landscapes that look intentional and polished — not stripped and defensive.",
            "Our favorite fire-resistant choices for Bend include yarrow (Achillea millefolium) for its lacy texture and long bloom season, native grasses kept mowed and irrigated, stonecrop and sedum groundcovers, snowberry (Symphoricarpos), currant (Ribes), and deciduous trees like aspen, maple, and cherry that have high moisture content and low flammability. We match plant selection to your specific zone, sun exposure, soil type, and design aesthetic.",
          ],
        },
        {
          heading: "Irrigation for Defensible Space",
          body: "Zone 1 (0–30 feet from your home) must be well-irrigated to maintain low flammability — dry, stressed plants are far more combustible than healthy, hydrated ones. Many Bend properties have irrigation systems that don't fully cover their Zone 1 area, or have systems that haven't been properly maintained. We assess your existing irrigation coverage as part of every firewise project and can extend, repair, or redesign your system to ensure complete Zone 1 coverage. A properly irrigated Zone 1 is one of the most effective fire protection investments you can make.",
          list: [
            "Irrigation coverage assessment for Zone 1 and Zone 2",
            "System extension to cover previously unirrigated areas",
            "Smart controller upgrades for efficient water management",
            "Spring activation and fall winterization to keep system operational",
          ],
        },
      ]}
      faqs={faqs}
      relatedLinks={relatedLinks}
      resourceLinks={resourceLinks}
      galleryImages={[
        { src: "/manus-storage/svc-firewise-landscaping-1_a69e597f.jpg", alt: "Firewise landscaping and defensible space clearing in Central Oregon" },
        { src: "/manus-storage/safe-hero-defensible-space_3d9d2cc5.jpg", alt: "Defensible space vegetation removal around home in Bend Oregon" },
        { src: "/manus-storage/svc-firewise-landscaping-3_365dd4de.jpg", alt: "Fire-resistant native plant landscape in Central Oregon" },
      ]}
      schemaUrl="/services/firewise-landscaping"
      schemaName="Firewise Landscaping & Defensible Space"
      schemaDescription="Firewise landscaping and defensible space services in Bend, Oregon. Juniper removal, fire-resistant replanting, and zone-based vegetation management for Deschutes County homeowners."
    />
  );
}
