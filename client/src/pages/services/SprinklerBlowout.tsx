import ServicePageLayout from "@/components/ServicePageLayout";

const relatedLinks = [
  { label: "Irrigation Installation", href: "/services/irrigation" },
  { label: "Sprinkler Repair & Backflow", href: "/services/sprinkler-repair" },
  { label: "Spring Activation", href: "/services/sprinkler-activation" },
  { label: "Lawn Service", href: "/services/lawn-service" },
];

const resourceLinks = [
  {
    label: "How to Winterize Your Sprinklers in Bend",
    href: "/resources/sprinkler-winterization-guide-bend-oregon",
    description: "Step-by-step guide to blowout and winterization before the first freeze.",
  },
  {
    label: "Sprinkler System Cost in Bend, OR",
    href: "/resources/sprinkler-system-cost-bend-oregon",
    description: "Full pricing breakdown for irrigation systems in Central Oregon.",
  },
];

export default function SprinklerBlowout() {
  return (
    <ServicePageLayout
      category="Irrigation Services"
      title="Sprinkler Blowout"
      subtitle="Winterization Service"
      heroImage="https://files.manuscdn.com/user_upload_by_module/session_file/310519663503028182/OAhyShvnyMXUNJqn.jpg"
      heroPosition="center 40%"
      intro="Winterizing your sprinkler system is a must in Central Oregon. With the different sprinkler system setups, piping and air pressures, we suggest letting a professional handle it. We take the time to ensure the system is fully winterized — protecting your investment from freeze damage and costly spring repairs."
      pricing={[
        { label: "Standard 8-Zone System", value: "$140" },
        { label: "Each Additional Zone", value: "+ $5" },
        { label: "Season", value: "October – Thanksgiving" },
      ]}
      sections={[
        {
          heading: "Sprinkler Winterizing Explained",
          body: [
            "Our blowout service is thorough and methodical. We don't just blow air through the lines — we investigate your entire system to ensure every drop of water is removed before the ground freezes.",
            "For residential jobs, we don't need to get into your garage. We can do everything outside your home as we turn off your water supply via your water main.",
          ],
          list: [
            "Investigating the type of system, number of zones, drain and zone valves, water mains, etc.",
            "Calibrating the machinery for your specific sprinkler system",
            "Blowing out each zone of the sprinkler system",
            "Shutting off your main backflow to minimize damage to city sewer systems and water lines (required by law)",
          ],
        },
        {
          heading: "Scheduling — We Fill Up Fast",
          body: [
            "Blowouts start the first week in October and run through Thanksgiving. We fill up FAST. Get your name on the annual list or schedule your blowout early.",
            "We do things differently from other blowout companies across Central Oregon. Instead of making individual appointments, we start our season in Sunriver and work North to Redmond. This allows us to take advantage of the elevation changes across Central Oregon and maximize the number of blowouts we can complete in the season.",
            "When we complete the service, we leave a door hanger on your door letting you know service has been completed.",
          ],
        },
        {
          heading: "When to Winterize Your System",
          body: [
            "We suggest winterizing your sprinkler system no later than December 1st in Bend, Oregon. According to the Bureau of the Interior, the average low temperature for Bend starts dropping below freezing in September. However, the daily average temperature stays above freezing until November.",
            "Given the elevation change throughout Central Oregon — from 2,200 feet in Madras to 4,200 feet in La Pine — the date the ground freezes will fluctuate. Just be sure no water is left in your sprinkler system by the time the ground starts to freeze.",
            "If you play the averages, your best bet to avoid freezing ground is October through about November 15th.",
          ],
        },
      ]}
      relatedLinks={relatedLinks}
      resourceLinks={resourceLinks}
    />
  );
}
