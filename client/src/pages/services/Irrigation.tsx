import ServicePageLayout from "@/components/ServicePageLayout";

const relatedLinks = [
  { label: "Sprinkler Blowout", href: "/services/sprinkler-blowout" },
  { label: "Sprinkler Repair & Backflow", href: "/services/sprinkler-repair" },
  { label: "Spring Activation", href: "/services/sprinkler-activation" },
  { label: "Landscape Design", href: "/services/landscape-design" },
];

export default function Irrigation() {
  return (
    <ServicePageLayout
      category="Irrigation Services"
      title="Sprinkler System"
      subtitle="Design & Installation"
      heroImage="https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=1600&q=80"
      heroPosition="center 60%"
      intro="Our teams of sprinkler system experts are up-to-date on all certifications and are licensed as landscape construction professionals with the Oregon Landscape Contractors Board. We have installed thousands of sprinkler systems in Central Oregon and have innovated ways to save water and save you time and money when it comes to getting water to your landscape. We offer free proposals and advice."
      pricing={[
        { label: "Repair Rate", value: "$140 / man hour + materials" },
        { label: "Consultations", value: "Always Free" },
      ]}
      sections={[
        {
          heading: "New Sprinkler System Installs",
          body: "Our certified irrigation teams handle new sprinkler system installations for residential and commercial properties throughout Central Oregon. We design each system to maximize water efficiency, minimize waste, and ensure complete coverage for your specific landscape.",
        },
        {
          heading: "Sprinkler System Design",
          body: "We are the 'go-to' designers and installers for the older mill-site homes here in Bend, Oregon. Lots of these homes have old rusted galvanized pipes, old outdated utility lines, and confusing layouts. We can help minimize the cost and guesswork that goes into designing a system for your home or small commercial property.",
        },
        {
          heading: "Sprinkler System Renovation",
          body: "With rapidly advancing sprinkler system technologies, a lot of homes that are even less than a decade old in Central Oregon have sprinkler systems that use an unnecessary amount of water. Our irrigation technicians are trained to analyze your water needs and system's output, and then either adjust your system for optimum water use, or provide you with a proposal to renovate your system with the newest technologies for up to 75% water and resource savings.",
        },
        {
          heading: "Sprinkler System Repair",
          body: "We have a team of irrigation technicians who are knowledgeable and up-to-date on all new technology. They are quick to troubleshoot issues and repair irrigation breaks. We charge $140 per technician hour to repair irrigation and sprinkler systems in Bend, Oregon plus material costs.",
        },
        {
          heading: "What's Included",
          body: "Every new installation and repair comes with our thorough process:",
          list: [
            "Full system design with zone mapping and water pressure analysis",
            "Licensed installation by Oregon LCB-certified technicians",
            "Backflow prevention device installation and testing",
            "Smart controller setup and programming",
            "Water conservation optimization for Central Oregon climate",
            "Post-installation walkthrough and owner education",
          ],
        },
      ]}
      relatedLinks={relatedLinks}
    />
  );
}
