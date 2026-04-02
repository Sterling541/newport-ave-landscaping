import ServicePageLayout from "@/components/ServicePageLayout";

const relatedLinks = [
  { label: "Lawn Service", href: "/services/lawn-service" },
  { label: "Aeration Services", href: "/services/aeration" },
  { label: "Commercial Maintenance", href: "/services/commercial-maintenance" },
  { label: "Irrigation Installation", href: "/services/irrigation" },
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
    />
  );
}
