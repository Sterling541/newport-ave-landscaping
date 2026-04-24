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
      seoDescription="Custom paver patio and walkway installation in Bend, Oregon. Natural stone, concrete pavers, and retaining walls. 90-day plant warranty, 1-year irrigation warranty. LCB #9153."
      heroImage="https://d2xsxph8kpxj0f.cloudfront.net/310519663503028182/g3pw3MRUapabcDUbhBEFxx/GLLPatio2_4916fcde.jpg"
      heroPosition="center 50%"
      intro="Paver patios and paver walkways are one of our favorite landscaping projects to design and build. Not only do you get instant aesthetic results, but you also get a product that, if built correctly, will last a lifetime and will vastly improve the value of your home."
      pricing={[
        { label: "Typical Range", value: "$3,000 – $50,000" },
        { label: "Design Consultation", value: "Complimentary" },
        { label: "Warranty", value: "90-Day Plants / 1-Yr Irrigation" },
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
            "We are so confident in the outcome of what we build that we offer a one-year workmanship warranty on all paver patios, retaining walls, and hardscape projects, backed by our 90-day plant warranty and 1-year irrigation warranty.",
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
      schemaDescription="Custom paver patio and walkway installation in Bend, Oregon. Natural stone, concrete pavers, retaining walls. 90-day plant warranty and 1-year irrigation warranty."
      faqs={[
          { question: "How much does a paver patio cost in Bend, Oregon?", answer: "Paver patios in Bend, OR typically cost $18–$35 per square foot installed, depending on material, base preparation, and design complexity. A 300 sq ft concrete paver patio runs $5,400–$10,500. Natural stone (flagstone, basalt) costs $25–$45 per sq ft. Retaining walls add $30–$60 per linear foot. Newport Avenue Landscaping provides free on-site estimates with detailed line-item quotes — call (541) 617-8873 or request a quote online." },
          { question: "How long does paver patio installation take in Bend?", answer: "Most residential paver patio projects in Bend take 3–7 days from excavation to final compaction. A 400 sq ft patio with a simple border typically takes 3–4 days. Projects with retaining walls, steps, or integrated lighting run 7–14 days. We schedule start dates 2–4 weeks out during peak season (May–September). We keep you updated throughout and clean up completely each day." },
          { question: "Do pavers crack or shift in Central Oregon's freeze-thaw climate?", answer: "Properly installed pavers hold up exceptionally well to Bend's freeze-thaw cycles. Unlike poured concrete slabs, individual pavers flex slightly without cracking. The key is a correctly compacted crushed gravel base (typically 6–8 inches) with adequate drainage to prevent frost heaving. Newport Avenue Landscaping has installed hundreds of paver patios in Central Oregon since 2005 — we engineer every base to our local climate standards." },
          { question: "What types of pavers do you install in Bend, Oregon?", answer: "We install concrete pavers (Belgard, Boral, Pavestone), natural flagstone, basalt, slate, and tumbled travertine. Concrete pavers are the most popular choice in Bend for their durability, consistent sizing, and hundreds of color/texture options. Natural flagstone and basalt suit clients wanting a more organic, high-end look. We can show you samples at your free consultation and help you choose based on your home's architecture and budget." },
          { question: "Do you install paver patios in Redmond and Sisters, Oregon?", answer: "Yes — Newport Avenue Landscaping installs paver patios, walkways, and retaining walls throughout Central Oregon including Bend, Redmond, Sisters, Sunriver, Tumalo, and La Pine. We are a licensed Oregon LCB contractor (#9153) serving the entire Deschutes County area. Travel fees may apply for locations more than 30 miles from our Bend location." },
          { question: "What is the warranty on your paver patio work?", answer: "Newport Avenue Landscaping provides a 1-year workmanship warranty on all paver patio and hardscape installations. This covers settling, shifting, or any installation defects under normal use conditions. Manufacturer warranties on paver materials vary by brand (typically 25 years to lifetime for concrete pavers). We stand behind our work and will return to address any issues that arise within the warranty period." },
      ]}
    />
  );
}
