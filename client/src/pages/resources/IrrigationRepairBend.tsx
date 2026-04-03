import Navbar from "@/components/Navbar";
import SEO from "@/components/SEO";
import { BreadcrumbSchema } from "@/components/SchemaMarkup";
import { Link } from "wouter";

export default function IrrigationRepairBend() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "oklch(0.97 0.003 0)" }}>
      <SEO
        title="Irrigation Repair Bend Oregon | Newport Ave Landscaping"
        description="Expert irrigation repair services in Bend, Oregon. We fix freeze damage, broken heads, and controller issues. Licensed & bonded. Call Newport Ave Landscaping."
        canonical="https://newportavelandscaping.com/resources/irrigation-repair-bend-oregon"
      />
      <BreadcrumbSchema items={[
        { name: "Home", url: "/" },
        { name: "Resources", url: "/resources" },
        { name: "Irrigation Repair Bend Oregon", url: "/resources/irrigation-repair-bend-oregon" },
      ]} />
      <Navbar />
      <div style={{ paddingTop: "328px" }}>
        {/* Hero banner */}
        <div
          className="relative flex items-center justify-center"
          style={{
            height: "380px",
            backgroundImage: "url(https://d2xsxph8kpxj0f.cloudfront.net/310519663503028182/g3pw3MRUapabcDUbhBEFxx/ITP_7404_28389405.jpg)",
            backgroundSize: "cover",
            backgroundPosition: "center 50%",
          }}
        >
          <div className="absolute inset-0" style={{ backgroundColor: "oklch(0 0 0 / 0.55)" }} />
          <div className="relative text-center container">
            <p className="font-label mb-3" style={{ color: "oklch(0.72 0.12 25)", fontSize: "0.7rem", letterSpacing: "0.18em" }}>
              IRRIGATION &middot; 2026
            </p>
            <h1 className="font-display text-white" style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)", maxWidth: "700px", margin: "0 auto" }}>
              Professional Irrigation Repair in Bend, Oregon
            </h1>
          </div>
        </div>

        {/* Article body */}
        <div className="container py-16 max-w-3xl mx-auto">
          <div style={{ color: "oklch(0.25 0.005 0)" }}>
            <p className="mb-6">
              For homeowners in Bend, Oregon, maintaining a healthy and vibrant landscape often hinges on a reliable irrigation system. Given our unique high desert climate, with its elevation of approximately 3,600 feet, hot summers, and freezing winters, irrigation systems are put to the test. When your system falters, it's not just an inconvenience; it can lead to significant water waste, plant damage, and costly repairs if left unaddressed. Newport Ave Landscaping, with over 21 years of experience serving Central Oregon, specializes in comprehensive irrigation repair services, ensuring your landscape thrives year-round. We're licensed and bonded (LCB #9153) and committed to providing efficient, lasting solutions for your Bend property.
            </p>

            <h2 className="font-display text-2xl mt-10 mb-4">Common Irrigation Problems in Bend, Oregon</h2>
            <p className="mb-4">
              Bend's distinct environment presents specific challenges for irrigation systems. Understanding these common issues can help you identify problems early and prevent further damage.
            </p>
            <ul className="list-disc list-inside mb-6 ml-4">
              <li className="mb-2"><strong>Freeze Damage:</strong> This is perhaps the most prevalent issue in Bend. Our cold winters, especially in Zone 6b, can cause water left in pipes to freeze and expand, leading to cracked lines, broken sprinkler heads, and damaged valves. Proper winterization is key, but sometimes damage still occurs.</li>
              <li className="mb-2"><strong>Broken Sprinkler Heads:</strong> Mowers, foot traffic, or even shifting volcanic pumice soil can lead to broken or misaligned sprinkler heads. This results in uneven watering, dry spots, and significant water loss.</li>
              <li className="mb-2"><strong>Controller Issues:</strong> The brain of your irrigation system, the controller, can malfunction due to power surges, age, or programming errors. This can lead to zones not turning on, running at incorrect times, or not shutting off.</li>
              <li className="mb-2"><strong>Zone Failures:</strong> A specific zone failing to activate can be caused by a variety of issues, including faulty solenoid valves, wiring problems, or blockages in the main line. This often results in distinct dry patches in your lawn or garden.</li>
              <li className="mb-2"><strong>Leaks and Low Pressure:</strong> Underground leaks, often undetectable without professional inspection, can waste thousands of gallons of water. Low water pressure can indicate a significant leak or a problem with your main water supply.</li>
            </ul>

            <h2 className="font-display text-2xl mt-10 mb-4">Signs You Need Irrigation Repair</h2>
            <p className="mb-4">
              Don't wait for your landscape to suffer before addressing irrigation issues. Keep an eye out for these common indicators that your system needs attention:
            </p>
            <ul className="list-disc list-inside mb-6 ml-4">
              <li className="mb-2"><strong>Puddling or Soggy Areas:</strong> Excessive water accumulation in certain spots often points to a broken sprinkler head, a leak, or a drainage issue.</li>
              <li className="mb-2"><strong>Dry or Brown Patches:</strong> Uneven watering is a clear sign that some areas aren't receiving enough moisture, possibly due to clogged or misdirected heads, or a failing zone.</li>
              <li className="mb-2"><strong>Unexplained High Water Bills:</strong> A sudden spike in your water bill without a change in usage is a strong indicator of an undetected leak in your irrigation system.</li>
              <li className="mb-2"><strong>Visible Damage:</strong> Cracked pipes, geysers of water, or sprinkler heads that don't retract are obvious signs of damage requiring immediate repair.</li>
              <li className="mb-2"><strong>System Not Activating/Deactivating:</strong> If your system isn't turning on or off according to its schedule, or if specific zones are unresponsive, it's likely a controller or valve issue.</li>
            </ul>

            <h2 className="font-display text-2xl mt-10 mb-4">Understanding Irrigation Repair Costs in Bend</h2>
            <p className="mb-4">
              The cost of irrigation repair in Bend, Oregon, can vary widely depending on the nature and extent of the damage. At Newport Ave Landscaping, we believe in transparent pricing. Our standard service rate for irrigation repair is <strong>$125 per hour, plus the cost of materials</strong>. Most common repairs, such as replacing a few sprinkler heads or fixing a minor line break, can often be completed within 1-2 hours. More complex issues, like extensive freeze damage or troubleshooting electrical controller problems, may require more time.
            </p>
            <p className="mb-6">
              Here's a general idea of what to expect for common repairs, though these are estimates and actual costs will depend on the specific situation and parts needed:
            </p>
            <div className="overflow-x-auto mb-6">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Repair Type</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estimated Time</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estimated Material Cost</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Estimated Cost (Labor + Materials)</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap">Replace Sprinkler Head</td>
                    <td className="px-6 py-4 whitespace-nowrap">0.5 - 1 hour</td>
                    <td className="px-6 py-4 whitespace-nowrap">$10 - $40</td>
                    <td className="px-6 py-4 whitespace-nowrap">$70 - $165</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap">Fix Minor Pipe Leak</td>
                    <td className="px-6 py-4 whitespace-nowrap">1 - 2 hours</td>
                    <td className="px-6 py-4 whitespace-nowrap">$20 - $70</td>
                    <td className="px-6 py-4 whitespace-nowrap">$145 - $320</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap">Replace Zone Valve/Solenoid</td>
                    <td className="px-6 py-4 whitespace-nowrap">1 - 1.5 hours</td>
                    <td className="px-6 py-4 whitespace-nowrap">$40 - $100</td>
                    <td className="px-6 py-4 whitespace-nowrap">$165 - $287.50</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap">Controller Troubleshooting/Repair</td>
                    <td className="px-6 py-4 whitespace-nowrap">1.5 - 3 hours</td>
                    <td className="px-6 py-4 whitespace-nowrap">$0 - $200+ (if replacement needed)</td>
                    <td className="px-6 py-4 whitespace-nowrap">$187.50 - $575+</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="bg-orange-50 border-l-4 border-orange-500 p-4 mb-6">
              <p className="font-bold text-orange-800">PRO TIP: Check Your Controller's Battery</p>
              <p className="text-orange-700">Before calling for service, check if your irrigation controller has a dead backup battery. A low or dead battery can cause erratic behavior, loss of programming, or prevent the system from running altogether. Replacing it is a simple, inexpensive fix that can save you a service call!</p>
            </div>

            <h2 className="font-display text-2xl mt-10 mb-4">Spring Activation: A Crucial Step for Bend Homeowners</h2>
            <p className="mb-4">
              As the snow melts and temperatures rise in Bend, proper spring activation of your irrigation system is vital. This process involves slowly repressurizing the system, checking for leaks and damage from winter freezes, and adjusting sprinkler heads for optimal coverage. Attempting this too quickly or incorrectly can cause significant damage to pipes and components. Newport Ave Landscaping offers professional spring activation services, ensuring your system is ready for the growing season and helping to identify any hidden issues before they become major problems.
            </p>

            <h2 className="font-display text-2xl mt-10 mb-4">Preventative Maintenance with Newport Ave's Priority Irrigation Membership</h2>
            <p className="mb-4">
              The best way to avoid costly emergency repairs is through proactive maintenance. Newport Ave Landscaping offers a <strong>Priority Irrigation Membership</strong> designed specifically for Bend and Central Oregon homeowners. This membership includes:
            </p>
            <ul className="list-disc list-inside mb-6 ml-4">
              <li className="mb-2">Annual spring activation and system inspection.</li>
              <li className="mb-2">Fall winterization to protect against freeze damage.</li>
              <li className="mb-2">Priority scheduling for any necessary repairs.</li>
              <li className="mb-2">Discounts on parts and additional services.</li>
            </ul>
            <p className="mb-6">
              Our membership helps extend the life of your system, optimize water usage, and provides peace of mind knowing your irrigation is in expert hands. This is especially valuable in areas like Awbrey Butte or Northwest Crossing, where maintaining a pristine landscape is a priority.
            </p>

            <div className="bg-green-50 border-l-4 border-green-500 p-6 my-10 text-center">
              <h3 className="font-display text-2xl text-green-800 mb-3">Need Irrigation Repair in Bend?</h3>
              <p className="text-green-700 mb-4">
                Don't let irrigation problems compromise your landscape. Contact Newport Ave Landscaping today for reliable, expert service. We proudly serve Bend, Redmond, Sisters, Sunriver, Tumalo, Prineville, and La Pine.
              </p>
              <Link href="/contact" className="inline-block bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300">
                Get a Free Estimate
              </Link>
              <p className="text-green-700 mt-3 text-sm">Call us: (541) 617-8873</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}