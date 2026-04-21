import ServicePageLayout from "@/components/ServicePageLayout";

const relatedLinks = [
  { label: "Outdoor Living Spaces", href: "/services/outdoor-living" },
  { label: "Fire Pits & Fireplaces", href: "/services/fire-features" },
  { label: "Water Features", href: "/services/water-features" },
  { label: "Landscape Design", href: "/services/landscape-design" },
];

const resourceLinks = [
  {
    label: "How Much Do Pavers Cost in Bend, OR?",
    href: "/resources/paver-patio-cost-bend-oregon",
    description: "2024 pricing guide: materials, labor, and what affects your total.",
  },
  {
    label: "Fire Pit & Patio Cost Guide",
    href: "/resources/fire-pit-patio-cost-bend-oregon",
    description: "Budgeting for a fire pit or outdoor fireplace in Central Oregon.",
  },
  {
    label: "Retaining Wall Cost in Bend",
    href: "/resources/retaining-wall-cost-bend-oregon",
    description: "What to expect for retaining wall installation pricing.",
  },
];

export default function Pavers() {
  return (
    <ServicePageLayout
      category="Installation Services"
      title="Paver Patios"
      subtitle="& Walkways"
      seoTitle="Paver Patio Bend Oregon | Paver Installation & Walkways | Newport Avenue Landscaping"
      seoDescription="Custom paver patio and walkway installation in Bend, Oregon. Natural stone, concrete pavers, and retaining walls. 5-year installation warranty. LCB #9153."
      heroImage="/manus-storage/GLLPatio2_4916fcde.jpg"
      heroPosition="center 50%"
      intro="Paver patios and paver walkways are one of our favorite landscaping projects to design and build. Not only do you get instant aesthetic results, but you also get a product that, if built correctly, will last a lifetime and will vastly improve the value of your home."
      pricing={[
        { label: "Typical Range", value: "$3,000 – $50,000" },
        { label: "Design Consultation", value: "Complimentary" },
        { label: "Warranty", value: "5 Years" },
      ]}
      sections={[
        {
          heading: "5 Benefits of Patio Pavers",
          body: "Patio pavers offer a combination of durability, aesthetics, and value that no other hardscape material can match:",
          list: [
            "Durability and Longevity — patio pavers withstand harsh weather conditions, heavy foot traffic, and the test of time. Concrete pavers are manufactured to be strong and durable, making them a wise investment.",
            "Low Maintenance — pavers require minimal upkeep. They are easy to clean with simple washing and occasional sealing, and individual pavers can be replaced if damaged.",
            "Aesthetic Appeal — with a variety of materials, colors, textures, and patterns to choose from, pavers can enhance the visual appeal of your home's outdoor area.",
            "Increase in Property Value — a well-designed patio made with high-quality pavers can add significant value to your property.",
            "Versatility — patio pavers can be used in a variety of outdoor applications, from patios and walkways to driveways and pool decks.",
          ],
        },
        {
          heading: "Custom Patio Design",
          body: [
            "At Newport Avenue Landscaping, your outdoor living space should reflect your personal style and be the epitome of durability. We specialize in custom paver designs tailored to your unique vision in Bend, Oregon.",
            "Our team of experts leverages sophisticated patio design techniques to create a seamless extension of your home that thrives through the seasons. By integrating durability into the heart of our design process, we guarantee an outdoor living space that is not only visually stunning but also stands the test of time.",
          ],
          accent: true,
        },
        {
          heading: "Paver Materials & Options",
          body: "Paver patios and walkways are the foundation of your outdoor living area. Our experienced team will guide you through hundreds of options:",
          list: [
            "Natural flagstone and bluestone",
            "Concrete pavers in hundreds of colors and textures",
            "Tumbled and antiqued pavers for a classic look",
            "Large-format modern pavers",
            "Permeable pavers for drainage management",
            "Retaining wall systems",
          ],
        },
        {
          heading: "Quality & Warranty",
          body: [
            "All hardscapes are built to the highest industry and personal standards. Our landscape construction employees train every winter to stay up-to-date on the latest paver patio and driveway installation techniques and technologies.",
            "We are so confident in the outcome of what we build that we offer a five-year warranty on all paver patios, retaining walls, and hardscape projects — the only landscape company in Bend to do so.",
          ],
        },
      ]}
      relatedLinks={relatedLinks}
      resourceLinks={resourceLinks}
      galleryImages={[
        { src: "/manus-storage/svc-pavers-1_7db7ed4c.jpg", alt: "Large paver patio installation in Central Oregon backyard" },
        { src: "/manus-storage/svc-pavers-2_e93af626.jpg", alt: "Paver walkway and driveway with native plantings in Bend Oregon" },
        { src: "/manus-storage/svc-pavers-3_d274613a.jpg", alt: "Completed paver patio with fire pit and seating wall in Central Oregon" },
      ]}
      schemaUrl="/services/pavers"
      schemaName="Paver Patio Installation"
      schemaDescription="Custom paver patio and walkway installation in Bend, Oregon. Natural stone, concrete pavers, retaining walls. 5-year warranty."
      faqs={[
          { question: "How much does a paver patio cost in Bend, Oregon?", answer: "Paver patios in Bend typically cost between $3,000 and $50,000. The wide range reflects differences in size, material choice, site preparation needs, and design complexity. A simple 200 sq ft concrete paver patio starts around $3,000–$6,000, while a large natural stone patio with retaining walls and integrated lighting can reach $30,000–$50,000. We offer complimentary design consultations to give you an accurate estimate." },
          { question: "How long does paver patio installation take?", answer: "Most paver patio projects in Bend take 3–7 days from start to finish, depending on size and complexity. Larger projects with retaining walls or extensive base preparation may take up to 2 weeks. We schedule projects to minimize disruption and keep you informed throughout." },
          { question: "Do pavers hold up to Central Oregon winters?", answer: "Yes — properly installed pavers are one of the best choices for Central Oregon's freeze-thaw climate. Unlike poured concrete, individual pavers can flex slightly without cracking. We use a compacted gravel base with proper drainage to prevent frost heaving. All our paver projects come with a 5-year warranty." },
          { question: "What is the difference between concrete pavers and natural stone?", answer: "Concrete pavers are manufactured in consistent sizes, colors, and textures — they are durable, cost-effective, and come in hundreds of styles. Natural stone (flagstone, bluestone, slate) has unique organic character and is often used for a more upscale or rustic look. Natural stone typically costs 20–40% more than concrete pavers. We carry both and can help you choose based on your budget and aesthetic goals." },
          { question: "Do you offer financing for paver patio projects?", answer: "We work with several financing partners to help homeowners in Bend manage larger hardscape investments. Ask about financing options during your free consultation." },
      ]}
    />
  );
}
