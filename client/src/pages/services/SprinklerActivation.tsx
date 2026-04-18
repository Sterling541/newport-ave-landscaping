import ServicePageLayout from "@/components/ServicePageLayout";

const relatedLinks = [
  { label: "Irrigation Installation", href: "/services/irrigation" },
  { label: "Sprinkler Blowout", href: "/services/sprinkler-blowout" },
  { label: "Sprinkler Repair & Backflow", href: "/services/sprinkler-repair" },
  { label: "Lawn Service", href: "/services/lawn-service" },
];

const resourceLinks = [
  {
    label: "Sprinkler System Cost in Bend, OR",
    href: "/resources/sprinkler-system-cost-bend-oregon",
    description: "Full pricing breakdown for irrigation systems in Central Oregon.",
  },
  {
    label: "How to Winterize Your Sprinklers in Bend",
    href: "/resources/sprinkler-winterization-guide-bend-oregon",
    description: "Step-by-step guide to blowout and winterization before the first freeze.",
  },
];

export default function SprinklerActivation() {
  return (
    <ServicePageLayout
      category="Irrigation Services"
      title="Spring Sprinkler"
      subtitle="System Activation"
      seoTitle="Sprinkler Activation Bend Oregon | Spring Sprinkler Startup Service | Newport Avenue"
      seoDescription="Spring sprinkler system startup and activation in Bend, Oregon. Zone checks, head adjustments, and controller programming. $140/tech hour. Schedule now. LCB #9153."
      heroImage="https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=1600&q=80"
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
      resourceLinks={resourceLinks}
      schemaUrl="/services/sprinkler-activation"
      schemaName="Sprinkler System Spring Activation"
      schemaDescription="Spring sprinkler system startup and activation in Bend, Oregon. Zone checks, head adjustments, controller programming. $140/tech hour."
      faqs={[
          { question: "When should I turn on my sprinklers in Bend?", answer: "In Central Oregon, we recommend activating your irrigation system in late April or early May, after the risk of hard frost has passed. Turning on your system too early risks freeze damage to above-ground components. Our technicians monitor local frost forecasts and can advise on the optimal timing for your property." },
          { question: "What is included in a spring sprinkler activation?", answer: "Our spring activation service includes pressurizing the system, checking all zones for proper operation, inspecting and adjusting spray heads and rotors, testing the backflow preventer, checking for leaks or broken heads, and programming your controller for the season. We leave you with a fully operational system ready for summer." },
          { question: "How much does spring sprinkler startup cost in Bend?", answer: "Spring activation is billed at $140 per tech hour with a one-hour minimum. Most residential activations take 45–90 minutes. Any repairs needed are quoted separately before work begins." },
          { question: "My sprinklers were not blown out last fall — what should I do?", answer: "If your system was not properly winterized, there is a risk of cracked pipes or damaged heads. We recommend a full inspection before pressurizing the system in spring. Our technicians will check for damage and make any necessary repairs before activating the system." },
      ]}
    />
  );
}
