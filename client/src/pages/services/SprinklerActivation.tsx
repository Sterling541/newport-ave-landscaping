import ServicePageLayout from "@/components/ServicePageLayout";

const relatedLinks = [
  { label: "Irrigation Installation", href: "/services/irrigation" },
  { label: "Sprinkler Blowout", href: "/services/sprinkler-blowout" },
  { label: "Sprinkler Repair & Backflow", href: "/services/sprinkler-repair" },
  { label: "Lawn Service", href: "/services/lawn-service" },
];

export default function SprinklerActivation() {
  return (
    <ServicePageLayout
      category="Irrigation Services"
      title="Spring Sprinkler"
      subtitle="System Activation"
      heroImage="https://files.manuscdn.com/user_upload_by_module/session_file/310519663503028182/XdRaSxrsEsCUxGCF.jpg"
      heroPosition="center 60%"
      intro="April marks the beginning of the watering season here in Central Oregon. At the beginning of each season, it is always wise to inspect, flush, and optimize your sprinkler system to ensure it is ready to perform at its best. We will send one of our certified Irrigation Technicians to analyze and activate your sprinkler system."
      pricing={[
        { label: "Activation Service", value: "$140 / technician hour + materials" },
        { label: "Backflow Testing", value: "$140" },
        { label: "Emergency Service", value: "No extra cost" },
      ]}
      sections={[
        {
          heading: "What's Included in Activation",
          body: "Your irrigation system will be completely flushed, optimized, and adjusted. Rest assured that when we have completed the process, you will have a finely tuned machine — optimized for water conservation, coverage, and lawn health.",
          list: [
            "Backflow turned on and tested",
            "Timer(s) adjusted for seasonal watering schedules",
            "Each sprinkler head inspected and adjusted",
            "Full system flush and pressure check",
            "Leak and break detection",
            "Water conservation optimization",
          ],
        },
        {
          heading: "Backflow Testing",
          body: [
            "The City of Bend requires all residents to have their backflow inspected annually. The backflow prevents contaminants from flowing back into your potable (drinkable) water system.",
            "One of our certified technicians can test your backflow and — unlike other competitors — shoulder the burden of filing the necessary paperwork with the City of Bend. The backflow testing service is $140.",
          ],
          accent: true,
        },
        {
          heading: "Annual Activation List",
          body: [
            "If you want to schedule the service every season, get placed on our annual Sprinkler System Activation list. Just contact us and we will make you a regular.",
            "While we can usually service your irrigation system the same day, during certain times of the year we can get backed up. April–May are our heaviest irrigation activation months — so get on the list early.",
          ],
        },
      ]}
      relatedLinks={relatedLinks}
    />
  );
}
