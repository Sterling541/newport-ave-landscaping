import ServicePageLayout from "@/components/ServicePageLayout";

const relatedLinks = [
  { label: "Outdoor Living Spaces", href: "/services/outdoor-living" },
  { label: "Paver Patios & Walkways", href: "/services/pavers" },
  { label: "Water Features", href: "/services/water-features" },
  { label: "Landscape Design", href: "/services/landscape-design" },
];

const resourceLinks = [
  {
    label: "Fire Pit & Patio Cost Guide",
    href: "/resources/fire-pit-patio-cost-bend-oregon",
    description: "Budgeting for a fire pit or outdoor fireplace in Central Oregon.",
  },
  {
    label: "How Much Do Pavers Cost in Bend, OR?",
    href: "/resources/paver-patio-cost-bend-oregon",
    description: "2024 pricing guide: materials, labor, and what affects your total.",
  },
];

export default function FireFeatures() {
  return (
    <ServicePageLayout
      category="Installation Services"
      title="Fire Pits"
      subtitle="& Outdoor Fireplaces"
      seoTitle="Fire Pit Installation Bend Oregon | Custom Fire Pits & Outdoor Fireplaces | Newport Avenue"
      seoDescription="Custom fire pit and outdoor fireplace installation in Bend, Oregon. Natural gas, propane, and wood-burning options. Design and build by Newport Avenue Landscaping. LCB #9153."
      heroImage="https://d2xsxph8kpxj0f.cloudfront.net/310519663503028182/g3pw3MRUapabcDUbhBEFxx/fire7_f0b582ff.jpg"
      heroPosition="center 60%"
      intro="Family gatherings. Ghost stories. Roasting marshmallows with the kids. Dreaming up the future with a good glass of wine. Memories, all made around a fire. Fire pits are one of those must-haves — the non-negotiables of your backyard. The place where everyone gathers to laugh, dream, and stay warm. We'll build it, just to your specifications."
      pricing={[
        { label: "Boulder Wood Burning Pit", value: "$2,500 – $3,500" },
        { label: "Block Fire Pit Kit", value: "$5,500 – $7,000" },
        { label: "Fire Chimney (Natural Gas)", value: "$22,000+" },
        { label: "Design Consultation", value: "Complimentary" },
      ]}
      sections={[
        {
          heading: "Fire Pit & Fireplace Options",
          body: "You dream it, we will build it. Fire pits can be made to burn propane, natural gas, or wood and can be built out of just about any natural or manufactured brick, stone, or pavers.",
          list: [
            "Propane, natural gas, or wood-burning fire pits",
            "Above-ground fire features",
            "Full outdoor fireplaces with chimneys",
            "Fireplaces with integrated smokers or brick ovens",
            "Sunken fire pits",
            "Fire pit surrounded by water feature",
            "Custom stone and paver designs",
          ],
        },
        {
          heading: "Built to Last",
          body: [
            "We only use the best materials because of our five-year warranty. Building options typically depend on the size of your yard, your view, and your yard's topography.",
            "Similarly, fireplaces can be built to burn propane, natural gas, or wood and can use any brick, stone, or pavers. Fireplaces can include amenities like smokers, brick ovens, or other options as part of the build.",
          ],
          accent: true,
        },
        {
          heading: "Design Consultation",
          body: [
            "We can meet with you this week and help you start discovering your options. Our designers will walk your property, discuss your vision, and provide a detailed proposal with material options and pricing.",
            "The first step is a complimentary on-site consultation — give us a call today and we'll get something on the calendar before our schedule fills up.",
          ],
        },
      ]}
      relatedLinks={relatedLinks}
      resourceLinks={resourceLinks}
      galleryImages={[
        { src: "/manus-storage/svc-fire-features-1_163f7588.jpg", alt: "Custom fire pit with paver surround in Central Oregon backyard" },
        { src: "/manus-storage/svc-fire-features-2_0c417890.jpg", alt: "Outdoor fireplace with seating area in Bend Oregon" },
        { src: "/manus-storage/svc-fire-features-3_55534ae5.jpg", alt: "Modern concrete fire bowl on paver patio in Central Oregon" },
      ]}
      schemaUrl="/services/fire-features"
      schemaName="Fire Pits and Outdoor Fireplaces"
      schemaDescription="Custom fire pit and outdoor fireplace installation in Bend, Oregon. Natural gas, propane, and wood-burning options."
      faqs={[
          { question: "How much does a fire pit cost in Bend, Oregon?", answer: "A custom built-in fire pit in Bend typically costs $2,500–$15,000 depending on size, materials, and fuel type. A simple gas fire pit ring set in a paver patio starts around $2,500–$4,000. A full masonry fireplace with seating walls and a paver surround can reach $10,000–$20,000. Prefabricated fire pit inserts are a cost-effective option starting around $1,500 installed." },
          { question: "Natural gas vs. propane vs. wood-burning fire pit — which is best?", answer: "Natural gas is the most convenient option if you have a gas line — no refilling, instant ignition, and consistent flame. Propane offers similar convenience without needing a gas line but requires tank refills. Wood-burning fire pits provide the authentic campfire experience and are often preferred for ambiance, but require wood storage and more cleanup. We can install any type and help you choose based on your property and preferences." },
          { question: "Do I need a permit for a fire pit in Bend?", answer: "Bend does not require a permit for most residential fire pits, but there are setback requirements from structures and property lines. Gas fire pit installations that connect to your home's gas line require a licensed plumber for the gas connection. We coordinate all required trades and ensure your installation meets local codes." },
          { question: "Can a fire pit be used year-round in Central Oregon?", answer: "Yes — one of the great benefits of an outdoor fire feature in Bend is that it extends your outdoor living season well into fall and even winter. On cool spring and fall evenings, a fire pit makes outdoor entertaining comfortable when it would otherwise be too cold. We design fire features with year-round use in mind." },
      ]}
    />
  );
}
