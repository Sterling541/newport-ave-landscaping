import Navbar from "@/components/Navbar";
import { useLocation } from "wouter";

export default function ClimateChange() {
  const [, navigate] = useLocation();

  return (
    <div className="min-h-screen" style={{ backgroundColor: "oklch(0.97 0.003 0)" }}>
      <Navbar />
      <div style={{ paddingTop: "204px" }}>
        {/* Hero */}
        <div
          className="relative flex items-center justify-center"
          style={{
            height: "380px",
            backgroundImage: "url(https://d2xsxph8kpxj0f.cloudfront.net/310519663503028182/g3pw3MRUapabcDUbhBEFxx/landscaping-native_fa3d1cfe.jpg",
            backgroundSize: "cover",
            backgroundPosition: "center 40%",
          }}
        >
          <div className="absolute inset-0" style={{ backgroundColor: "oklch(0 0 0 / 0.55)" }} />
          <div className="relative text-center container">
            <p className="font-label mb-3" style={{ color: "oklch(0.72 0.12 25)", fontSize: "0.7rem", letterSpacing: "0.18em" }}>
              LAWN CARE TIPS &nbsp;·&nbsp; JANUARY 2024
            </p>
            <h1 className="font-display text-white" style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)", maxWidth: "700px", margin: "0 auto" }}>
              The Impact of Climate Change on Landscaping
            </h1>
          </div>
        </div>

        {/* Article */}
        <div className="container py-16 max-w-3xl mx-auto">
          <div style={{ color: "oklch(0.25 0.005 0)" }}>

            <p className="font-body mb-8" style={{ fontSize: "1.1rem", lineHeight: 1.8, color: "oklch(0.35 0.005 0)" }}>
              As global climate patterns shift, the landscape around us must adapt to new environmental stresses and weather conditions. Newport Ave Landscaping understands the critical role of landscaping and lawncare in this dynamic. Our environments are not just aesthetically pleasing spaces — they're ecosystems that contribute to our local climate resilience.
            </p>

            <h2 className="font-display text-2xl mb-4 mt-10" style={{ color: "oklch(0.15 0.005 0)" }}>Climate Change and Plant Life</h2>
            <p className="font-body mb-6" style={{ lineHeight: 1.8 }}>
              The impacts of climate change on our environment have profound implications for landscaping, with a significant environmental impact on the delicate balance of plant life that makes up our gardens and landscapes. Changes in temperature and weather patterns directly affect the ecosystem, influencing everything from seasonal cycles to soil conditions.
            </p>
            <p className="font-body mb-6" style={{ lineHeight: 1.8 }}>
              As landscape design experts at Newport Ave Landscaping, we're encountering more frequent instances where traditional gardening practices must evolve in response to these changes. The shifts in growing zones and precipitation levels lead to a domino effect, necessitating alterations in our landscaping approaches.
            </p>

            <h2 className="font-display text-2xl mb-4 mt-10" style={{ color: "oklch(0.15 0.005 0)" }}>Climate Change and Water Availability</h2>
            <p className="font-body mb-6" style={{ lineHeight: 1.8 }}>
              As landscape professionals, we're acutely aware of the challenges climate change poses to water availability. The impact of warming climates on environments worldwide can no longer be ignored, especially as we witness increasing periods of drought and heightened water scarcity. Such conditions compel us to re-evaluate and redesign our landscape and lawn care approaches, focusing on water conservation.
            </p>
            <p className="font-body mb-6" style={{ lineHeight: 1.8 }}>
              The frequency and severity of dry spells have led us to integrate drought-resistant plant species and implement irrigation systems that optimize every drop. By embracing adaptation techniques, we help mitigate the adverse impacts of climate change.
            </p>

            <h2 className="font-display text-2xl mb-4 mt-10" style={{ color: "oklch(0.15 0.005 0)" }}>5 Tips for Designing a Sustainable Landscape</h2>
            <ol className="space-y-4 mb-8 pl-6 list-decimal">
              {[
                ["Native Plants", "Native plants are better adapted to the local climate and require less water, fertilizer, and pesticides. This makes them more resilient to extreme weather events and helps conserve resources."],
                ["Drought-Tolerant Species", "With the increasing frequency of droughts, it's important to select plants that can thrive in dry conditions. Consider incorporating succulents or other low-water plants into your landscape design."],
                ["Natural Mulch", "Natural mulch, such as wood chips or shredded leaves, helps retain moisture in the soil and adds nutrients as it decomposes. It also reduces weed growth and minimizes the need for chemical herbicides."],
                ["Water-Saving Techniques", "Consider installing a drip irrigation system or using rain barrels to collect and reuse water for your plants. This can significantly reduce your water usage while still keeping your landscape healthy."],
                ["Strategic Tree Planting", "Mature trees can provide shade and reduce the need for air conditioning during hot summer months. By planting them strategically around your home, you can also create a natural barrier against wind and reduce energy consumption."],
              ].map(([title, body]) => (
                <li key={title} className="font-body" style={{ lineHeight: 1.8 }}>
                  <strong>{title}:</strong> {body}
                </li>
              ))}
            </ol>

            <h2 className="font-display text-2xl mb-4 mt-10" style={{ color: "oklch(0.15 0.005 0)" }}>Adapting Lawn Care for Changing Climates</h2>
            <p className="font-body mb-6" style={{ lineHeight: 1.8 }}>
              Seismic shifts in our climate are altering the landscape of lawn care practices. Elevated temperature ranges can stress turfgrass, affecting its growth and color, necessitating more attentive lawn care services. Sporadic temperature fluctuations can leave lawns vulnerable to diseases and pests that thrive in such changing conditions.
            </p>
            <p className="font-body mb-6" style={{ lineHeight: 1.8 }}>
              To foster a healthy and resilient lawn, Newport Ave Landscaping is adapting its strategies to account for temperature variations and the increased frequency of extreme weather events. This involves not only altering fertilization and irrigation practices but also integrating climate-resilient grass species.
            </p>

            {/* CTA */}
            <div
              className="mt-12 p-8 text-center"
              style={{ backgroundColor: "oklch(0.15 0.005 0)", borderRadius: "1.2rem 0.15rem 1.2rem 0.15rem" }}
            >
              <p className="font-label mb-2" style={{ color: "oklch(0.72 0.12 25)", fontSize: "0.7rem", letterSpacing: "0.18em" }}>
                READY TO ADAPT YOUR LANDSCAPE?
              </p>
              <h3 className="font-display text-white text-2xl mb-4">Talk to Our Team</h3>
              <p className="font-body mb-6" style={{ color: "oklch(0.70 0.003 0)" }}>
                Our landscape experts can help you design a sustainable, climate-resilient outdoor space for your Central Oregon property.
              </p>
              <button
                onClick={() => { navigate("/contact"); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                className="btn-red"
              >
                Get a Free Consultation
              </button>
            </div>

            <div className="mt-8">
              <button
                onClick={() => { navigate("/blog"); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                className="font-label transition-colors"
                style={{ color: "oklch(0.46 0.20 25)", fontSize: "0.7rem", letterSpacing: "0.12em" }}
              >
                ← BACK TO ALL ARTICLES
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
