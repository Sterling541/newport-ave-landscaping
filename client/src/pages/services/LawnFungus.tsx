import ServicePageLayout from "@/components/ServicePageLayout";

const relatedLinks = [
  { label: "Lawn Service", href: "/services/lawn-service" },
  { label: "Aeration Services", href: "/services/aeration" },
  { label: "Commercial Maintenance", href: "/services/commercial-maintenance" },
  { label: "Irrigation Installation", href: "/services/irrigation" },
];

const resourceLinks = [
  {
    label: "When to Aerate Your Lawn in Bend",
    href: "/resources/when-to-aerate-lawn-bend-oregon",
    description: "Best timing for aeration in Central Oregon's high desert climate.",
  },
  {
    label: "Lawn Maintenance Cost in Bend, OR",
    href: "/resources/lawn-maintenance-cost-bend-oregon",
    description: "What lawn care and maintenance services cost in Central Oregon.",
  },
];

export default function LawnFungus() {
  return (
    <ServicePageLayout
      category="Lawn Care"
      title="Lawn Fungus"
      subtitle="Treatment & Prevention"
      heroImage="https://newportavelandscaping.com/wp-content/uploads/2023/01/brown-patch-lawn-fungus-1024x681.jpg"
      heroPosition="center 50%"
      intro="Got lawn fungus? We can help! Fungus can be a common problem in lawns, as it can thrive in warm, damp conditions and cause unsightly blemishes on grass. Our licensed spray technicians are trained to identify, treat, and prevent the most common lawn fungus problems in Central Oregon."
      sections={[
        {
          heading: "How We Treat Lawn Fungus",
          body: "Our landscape maintenance team follows a proven process tailored to the Bend, Oregon climate:",
          list: [
            "Identify the type of fungus present — different types require different treatment methods",
            "Improve lawn health through consistent watering schedules, proper fertilization, and correct mowing height",
            "Apply a fungicide specifically designed for the type of fungus present, following all label instructions",
            "Adjust watering to avoid over-watering — fungus thrives in damp conditions",
            "Rake and remove infected grass clippings after mowing to reduce spread",
          ],
        },
        {
          heading: "Common Lawn Fungus in Bend, Oregon",
          body: "These are the most common fungal problems our technicians encounter across Central Oregon:",
          list: [
            "Brown Patch Fungus — causes circular patches of dead or dying grass, typically in areas with high humidity and poor drainage",
            "Powdery Mildew — appears as a white or gray powdery substance on grass leaves",
            "Dollar Spot — causes small, circular patches of dead or dying grass",
            "Rust — causes orange or red pustules on grass leaves",
          ],
          accent: true,
        },
        {
          heading: "Organic Fungicide Options",
          body: "For clients who prefer eco-friendly treatment, we also offer organic fungicide applications:",
          list: [
            "Neem oil — extracted from neem tree seeds, effective against a wide range of lawn fungus and pests",
            "Baking soda spray — effective for controlling powdery mildew",
            "Hydrogen peroxide solution — helps control a variety of lawn fungus",
          ],
        },
        {
          heading: "Prevention Through Aeration",
          body: [
            "One of the most effective long-term strategies for preventing lawn fungus is regular aeration. Aeration reduces thatch buildup — the layer of organic matter at the base of grass that acts like a sponge, keeping moisture near the roots and enabling fungus to thrive.",
            "We recommend aerating twice per season — once in spring and once in fall — to keep your lawn's soil healthy and resistant to fungal infection.",
          ],
        },
      ]}
      relatedLinks={relatedLinks}
      resourceLinks={resourceLinks}
      schemaUrl="/services/lawn-fungus"
      schemaName="Lawn Fungus Treatment"
      schemaDescription="Lawn fungus diagnosis and treatment in Bend, Oregon. Dollar spot, brown patch, rust, and other turf diseases."
      faqs={[
          { question: "What are the most common lawn fungus problems in Bend?", answer: "The most common turf diseases we treat in Central Oregon include dollar spot (small tan spots), brown patch (large brown circles), necrotic ring spot (dead rings in bluegrass), rust (orange powder on grass blades), and red thread (pink-red patches). Each requires a different treatment approach, which is why proper diagnosis is important." },
          { question: "How do I know if my lawn has fungus or just drought stress?", answer: "Drought stress typically causes uniform browning that follows irrigation patterns — areas farthest from sprinkler heads go brown first. Fungal disease usually creates irregular patterns: circles, rings, patches, or spots that do not follow irrigation coverage. Fungal damage often appears in the morning when dew is present. If you are unsure, we offer diagnostic visits to identify the problem." },
          { question: "How much does lawn fungus treatment cost in Bend?", answer: "Fungus treatment costs depend on the disease type, lawn size, and severity. Most residential treatments range from $150–$400 for a standard application. Severe or recurring infections may require multiple applications. We identify the specific disease before recommending a treatment plan." },
          { question: "Can I prevent lawn fungus in Bend?", answer: "Yes — most fungal diseases in Bend are preventable with good cultural practices: water in the morning (not evening) so grass dries before nightfall, avoid overwatering, maintain proper mowing height, aerate annually to reduce thatch, and fertilize appropriately. We can evaluate your lawn care program and recommend adjustments to reduce disease pressure." },
      ]}
    />
  );
}
