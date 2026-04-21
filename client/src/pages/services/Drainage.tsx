import ServicePageLayout from "@/components/ServicePageLayout";

const relatedLinks = [
  { label: "Irrigation Systems", href: "/services/irrigation" },
  { label: "Retaining Walls", href: "/services/retaining-walls" },
  { label: "Landscape Design", href: "/services/landscape-design" },
];

const resourceLinks = [
  {
    label: "Drainage Solutions Cost in Bend",
    href: "/resources/drainage-solutions-cost-bend",
    description: "What drainage installation and correction costs in Central Oregon.",
  },
];

const faqs = [
  {
    question: "How much does drainage installation cost in Bend, Oregon?",
    answer:
      "Drainage costs in Bend vary by system type and site complexity. A basic French drain installation typically runs $1,500–$4,500 depending on length and depth. Dry creek bed installations range from $2,000–$8,000 depending on length and rock selection. Catch basin and channel drain systems are typically $800–$3,000. Full-yard grading corrections can range from $2,500–$12,000+ for larger properties. Contact us for a free site assessment — drainage problems are highly site-specific and accurate pricing requires seeing your property.",
  },
  {
    question: "What is a French drain and do I need one?",
    answer:
      "A French drain is a gravel-filled trench containing a perforated pipe that intercepts groundwater or surface runoff and redirects it to a safe discharge point — typically a drywell, street, or lower area of your property. You likely need a French drain if you have water pooling in your yard after rain or irrigation, soggy areas that stay wet for days, water seeping into your basement or crawl space, or erosion on slopes. French drains are the most common drainage solution in Central Oregon because they work with the region's clay-heavy soils.",
  },
  {
    question: "Why does water pool in my yard in Bend?",
    answer:
      "Water pooling in Bend yards is most commonly caused by one of three things: compacted or clay-heavy soil that doesn't drain well (very common in Central Oregon), negative grade — ground that slopes toward your house instead of away from it, or irrigation systems delivering more water than the soil can absorb. In newer subdivisions, improper grading during construction is the most frequent culprit. We diagnose the root cause before recommending a solution — treating symptoms without fixing the cause leads to recurring problems.",
  },
  {
    question: "Can you fix drainage problems near my foundation?",
    answer:
      "Yes — foundation drainage is one of our most common projects. We correct negative grade (ground sloping toward the house), install window well drains, route downspout extensions away from the foundation, and install French drains along foundation walls to intercept water before it reaches the structure. Addressing foundation drainage early is far less expensive than dealing with foundation damage or moisture intrusion later.",
  },
  {
    question: "How long does a drainage installation take?",
    answer:
      "A typical French drain installation in Bend takes 1–2 days for a standard residential project. Dry creek bed installations take 2–4 days depending on length and complexity. Full grading corrections may take 3–7 days. We provide a detailed timeline during your estimate. Most drainage work can be completed without disrupting your existing landscape, though some temporary disturbance to lawn or plantings is sometimes necessary.",
  },
];

export default function Drainage() {
  return (
    <ServicePageLayout
      category="Design & Installation"
      title="Drainage Solutions"
      subtitle="Bend, Oregon"
      seoTitle="Drainage Solutions Bend Oregon | French Drains, Dry Creek Beds & Grading | Newport Avenue"
      seoDescription="Drainage installation and correction in Bend, Oregon. French drains, dry creek beds, catch basins, and grading correction. Free site assessments. LCB #9153."
      heroImage="/manus-storage/hero-drainage-wide_6595b0b0.jpg"
      heroPosition="center 40%"
      intro="Water in the wrong place destroys landscapes, damages foundations, and creates liability. Newport Avenue diagnoses and corrects drainage problems throughout Central Oregon — from simple surface grading to engineered French drain systems and dry creek beds that double as landscape features. We find the root cause of your drainage problem and fix it permanently."
      pricing={[
        { label: "French Drain", value: "$1,500–$4,500 depending on length" },
        { label: "Dry Creek Bed", value: "$2,000–$8,000 depending on length & rock" },
        { label: "Catch Basin / Channel Drain", value: "$800–$3,000" },
        { label: "Service Area", value: "Bend, Redmond, Sisters, Sunriver & all of Central Oregon" },
      ]}
      sections={[
        {
          heading: "Drainage Assessment & Design",
          body: "We start every drainage project with a thorough site assessment — identifying where water enters, where it pools, and where it needs to go. Many drainage problems in Central Oregon stem from improper grading during original construction, or from irrigation systems that deliver more water than the region's clay-heavy soils can absorb. We map water flow across your entire property before recommending a solution, because treating a symptom without understanding the source leads to recurring problems.",
          list: [
            "Site assessment and water flow mapping",
            "Soil percolation testing",
            "Grading analysis and correction planning",
            "Integration with existing irrigation and landscape",
          ],
        },
        {
          heading: "French Drains & Subsurface Systems",
          body: [
            "A French drain is a perforated pipe surrounded by gravel that intercepts groundwater or surface runoff and redirects it to a safe discharge point — a drywell, street, or lower area of your property. Properly installed, a French drain is invisible in the landscape and lasts for decades with minimal maintenance.",
            "We size and route French drain systems based on your site's specific water volume and soil conditions. Central Oregon's clay-heavy soils require careful attention to pipe sizing and gravel selection — an undersized system will back up during heavy irrigation or spring snowmelt.",
          ],
          accent: true,
        },
        {
          heading: "Dry Creek Beds & Surface Drainage",
          body: [
            "Dry creek beds solve drainage problems while adding a natural, attractive landscape feature. We design creek beds using locally sourced river rock and basalt that look like they belong in the Central Oregon landscape — because they do. A well-designed dry creek bed handles significant water volume during rain events while remaining a beautiful landscape element year-round.",
            "Surface channel drains and catch basins are used where concentrated water flow requires a more engineered solution, such as driveway aprons, patio edges, and downspout discharge areas. We match the drain style and grate material to your existing hardscape for a seamless appearance.",
          ],
        },
        {
          heading: "Foundation & Slope Protection",
          body: "Water pooling near your foundation is one of the most damaging and expensive problems a homeowner can face. We correct negative grade — ground that slopes toward the house instead of away from it — install window well drains, and route downspout extensions to keep water moving away from your structure. Addressing foundation drainage proactively is far less expensive than dealing with moisture intrusion, mold, or structural damage later.",
          list: [
            "Negative grade correction and re-grading",
            "Downspout extension and discharge routing",
            "Window well drain installation",
            "Sump pump discharge management",
          ],
        },
      ]}
      faqs={faqs}
      relatedLinks={relatedLinks}
      resourceLinks={resourceLinks}
      galleryImages={[
        { src: "/manus-storage/svc-drainage-1_6887e9a6.jpg", alt: "French drain installation in Central Oregon landscape" },
        { src: "/manus-storage/safe-hero-irrigation-wide_7d00acf6.jpg", alt: "Drainage solution with river rock and catch basin in Bend Oregon" },
        { src: "/manus-storage/svc-drainage-3_8243a1ea.jpg", alt: "Decorative drainage channel with river rock in Central Oregon backyard" },
      ]}
      schemaUrl="/services/drainage"
      schemaName="Drainage Solutions"
      schemaDescription="Drainage solutions and installation in Bend, Oregon. French drains, dry creek beds, catch basins, and grading correction for residential and commercial properties."
    />
  );
}
