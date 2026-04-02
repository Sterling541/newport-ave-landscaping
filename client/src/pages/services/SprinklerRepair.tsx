import ServicePageLayout from "@/components/ServicePageLayout";

const relatedLinks = [
  { label: "Irrigation Installation", href: "/services/irrigation" },
  { label: "Sprinkler Blowout", href: "/services/sprinkler-blowout" },
  { label: "Spring Activation", href: "/services/sprinkler-activation" },
  { label: "Commercial Maintenance", href: "/services/commercial-maintenance" },
];

export default function SprinklerRepair() {
  return (
    <ServicePageLayout
      category="Irrigation Services"
      title="Sprinkler Repair"
      subtitle="& Backflow Testing"
      heroImage="https://newportavelandscaping.com/wp-content/uploads/2022/08/sprinker-system-repair-bend-oregon.jpg"
      heroPosition="center 50%"
      intro="Since 2005, we've repaired, renovated, and installed over 10,000 sprinkler systems throughout Central Oregon. If you're having a problem with your sprinkler system, one of our full-time irrigation specialists can come out today and take a look. Consultations are always free."
      pricing={[
        { label: "Repair Rate", value: "$140 / man hour (1 hr min) + materials" },
        { label: "Backflow Testing", value: "$140" },
        { label: "Emergency Service", value: "No extra cost" },
        { label: "Consultations", value: "Always Free" },
      ]}
      sections={[
        {
          heading: "Sprinkler System & Head Repair",
          body: [
            "We employ multiple fully licensed irrigation technicians and teams to handle all sprinkler system repairs and offer 24-hour emergency service at no extra cost.",
            "If you think you are having a sprinkler system or irrigation emergency, please call immediately. We've seen even small water leaks cause property damage resulting in tens of thousands of dollars of repair. It's better to catch things as early as possible.",
            "While we can usually service your irrigation system the same day, during certain times of the year we can get backed up. April–May and October–November are our heavy irrigation seasons.",
          ],
        },
        {
          heading: "Backflow Testing",
          body: [
            "Your backflow is the gateway to water and the beginning of your sprinkler system. The backflow prevents contaminants from flowing back into your potable (drinkable) water system.",
            "The City of Bend requires all residents to have their backflow inspected annually. One of our certified technicians can test your backflow and — unlike other competitors — shoulder the burden of filing the necessary paperwork with the City of Bend.",
          ],
          accent: true,
        },
        {
          heading: "Common Repairs We Handle",
          body: "Our irrigation technicians are trained to diagnose and repair a wide range of sprinkler system issues:",
          list: [
            "Broken or misaligned sprinkler heads",
            "Zone valve failures and solenoid replacement",
            "Controller and timer malfunctions",
            "Underground pipe breaks and leaks",
            "Backflow device repair and replacement",
            "Pressure regulation issues",
            "Wiring and electrical faults",
            "System winterization damage",
          ],
        },
      ]}
      relatedLinks={relatedLinks}
    />
  );
}
