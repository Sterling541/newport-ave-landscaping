import ServicePageLayout from "@/components/ServicePageLayout";

const relatedLinks = [
  { label: "Paver Patios & Walkways", href: "/services/pavers" },
  { label: "Water Features", href: "/services/water-features" },
  { label: "Outdoor Living Spaces", href: "/services/outdoor-living" },
  { label: "Irrigation Installation", href: "/services/irrigation" },
];

const resourceLinks = [
  {
    label: "Landscape Design Cost in Bend, OR",
    href: "/resources/landscape-design-cost-bend-oregon",
    description: "What landscape design and installation costs in Central Oregon.",
  },
  {
    label: "How to Choose a Landscaper in Bend",
    href: "/resources/how-to-choose-landscaper-bend-oregon",
    description: "Questions to ask, red flags to avoid, and what to look for.",
  },
  {
    label: "Best Plants for Xeriscaping in Central Oregon",
    href: "/resources/best-plants-xeriscape-central-oregon",
    description: "Native and drought-tolerant plants that thrive in Bend's climate.",
  },
];

export default function LandscapeDesign() {
  return (
    <ServicePageLayout
      category="Design Services"
      title="Landscape Architecture"
      subtitle="& Design"
      seoTitle="Landscape Design Bend Oregon | Custom Landscape Design & Installation | Newport Avenue"
      seoDescription="Custom landscape design and installation in Bend, Oregon. Full-service design for residential and commercial properties in Central Oregon. Free consultations. LCB #9153."
      heroImage="https://d2xsxph8kpxj0f.cloudfront.net/310519663503028182/g3pw3MRUapabcDUbhBEFxx/facility-showroom_fd5f40e4.webp"
      heroPosition="center 40%"
      intro="Our design-build process puts forethought into your landscaping. A quality design yields fewer problems, saves time and money over the lifetime of your landscape, and produces an overall higher quality product. If you want landscaping that improves the value of your home, meet with one of our designers today and get started."
      sections={[
        {
          heading: "Step 1: Site Visit",
          body: "During your free initial site visit, one of our landscape designers will walk through your property with you to better understand your vision, budget, and timeline as well as the scope of your project. We will go over our design process, provide a design contract, and discuss any questions you may have about our qualifications or experience. You can expect this site visit to take between 30–90 minutes.",
        },
        {
          heading: "Step 2: Preliminary Design Plan",
          body: [
            "After you sign a landscape design agreement, we will schedule your project on our designer's schedule. They will begin by first creating a base map — a to-scale CAD map of your project and the existing structures. The designer may return to your property for accurate measurements and site photos.",
            "Depending on your project, we will provide preliminary options for your layout, selection of plants, and types of materials to bring your design ideas to life. We will review these concepts together to hone in on your dream landscape.",
          ],
          accent: true,
        },
        {
          heading: "Step 3: Final Design Plan",
          body: [
            "You may review the final landscape and make any final edits. We work with clients throughout the design process to capture refinements and ideas as they change. We will provide a hard copy and digital version of your landscape plans for your records.",
            "Depending on the scale and complexity of your project, your final landscape design package may include: an illustrative plan, design description, layout plans, construction details, 3D renderings, or sections (side views) to best represent your project.",
          ],
        },
        {
          heading: "Step 4: Estimate & Agreement",
          body: "Once we have a final design we can provide an accurate estimate of the cost to build your project, provide an estimated timeline, and provide our construction contract for your review. After you sign an agreement and provide a deposit, your project is put on our calendar. During peak season (April, May, September, October), it can take up to two to four weeks for construction to begin.",
        },
        {
          heading: "Step 5: Construction",
          body: [
            "One week before construction we will call and confirm the dates on our schedule. Our construction crews will never abandon someone else's project to start yours and will never disappear from your project to go work on another.",
            "While our average landscaping projects can be built in just a couple of weeks, complex projects can take a few months or more depending on the size, complexity, and weather.",
          ],
          accent: true,
        },
        {
          heading: "Step 6: Final Walk-Through",
          body: "The day your project is complete, we will schedule a guided tour of your new landscape and teach you about how you should care for it. If you have questions after your installation is complete, just call and we'll happily answer them. Our projects are backed by our 5-year warranty.",
        },
      ]}
      relatedLinks={relatedLinks}
      resourceLinks={resourceLinks}
      schemaUrl="/services/landscape-design"
      schemaName="Landscape Design"
      schemaDescription="Custom landscape design in Bend, Oregon. Full-service design and installation for residential and commercial properties."
      portfolioProjects={[
        {
          title: "Bend Full Yard Transformation",
          href: "/portfolio/bend-full-yard-transformation",
          image: "https://newportavelandscaping.com/wp-content/uploads/2022/05/bend-oregon-after-backyard1.jpg",
          category: "DESIGN & BUILD · FULL YARD",
        },
        {
          title: "NW Bend Backyard Landscaping",
          href: "/portfolio/nw-bend-backyard",
          image: "https://newportavelandscaping.com/wp-content/uploads/2022/05/NW-Bend-Backyard-After-Picture.jpg",
          category: "DESIGN & BUILD",
        },
        {
          title: "Awbrey Butte Xeriscape",
          href: "/portfolio/awbrey-butte-xeriscape",
          image: "https://newportavelandscaping.com/wp-content/uploads/2022/05/awbrey-butte-xeriscape-landscaping-renovation-day-shot.jpg",
          category: "DESIGN & BUILD · XERISCAPE",
        },
      ]}
      faqs={[
          { question: "How much does landscape design cost in Bend?", answer: "Landscape design fees in Bend vary based on project scope. We offer complimentary initial consultations to discuss your vision and budget. Full design packages for larger residential projects typically range from $500–$2,500 for the design phase, which is often credited toward installation. Many clients find the design investment pays for itself through better plant selection, reduced waste, and a cohesive final result." },
          { question: "What is included in a landscape design?", answer: "Our landscape design process includes an on-site consultation, site analysis (sun exposure, soil, drainage, existing plants), a custom design plan with plant selection and placement, material recommendations, and a detailed project estimate. We create designs that work with Central Oregon's climate, water availability, and your lifestyle." },
          { question: "How long does a landscape design project take?", answer: "The design phase typically takes 2–4 weeks from initial consultation to final plan. Installation timelines depend on project scope — smaller projects may be completed in a few days, while larger landscape transformations can take several weeks. We provide a detailed schedule before work begins." },
          { question: "Do you design xeriscapes and water-wise landscapes?", answer: "Yes — water-wise design is one of our specialties. Central Oregon's dry summers make drought-tolerant landscaping both practical and beautiful. We design landscapes using native plants, ornamental grasses, and low-water perennials that thrive without supplemental irrigation once established." },
      ]}
    />
  );
}
