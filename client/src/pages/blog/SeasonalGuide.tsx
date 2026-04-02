import Navbar from "@/components/Navbar";
import { useLocation } from "wouter";

export default function SeasonalGuide() {
  const [, navigate] = useLocation();

  return (
    <div className="min-h-screen" style={{ backgroundColor: "oklch(0.97 0.003 0)" }}>
      <Navbar />
      <div style={{ paddingTop: "328px" }}>
        {/* Hero */}
        <div
          className="relative flex items-center justify-center"
          style={{
            height: "380px",
            backgroundImage: "url(https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=1600&q=80)",
            backgroundSize: "cover",
            backgroundPosition: "center 50%",
          }}
        >
          <div className="absolute inset-0" style={{ backgroundColor: "oklch(0 0 0 / 0.55)" }} />
          <div className="relative text-center container">
            <p className="font-label mb-3" style={{ color: "oklch(0.72 0.12 25)", fontSize: "0.7rem", letterSpacing: "0.18em" }}>
              SEASONAL TIPS &nbsp;·&nbsp; FEBRUARY 2024
            </p>
            <h1 className="font-display text-white" style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)", maxWidth: "700px", margin: "0 auto" }}>
              Your Seasonal Guide to Landscaping Maintenance
            </h1>
          </div>
        </div>

        {/* Article */}
        <div className="container py-16 max-w-3xl mx-auto">
          <div style={{ color: "oklch(0.25 0.005 0)" }}>

            <p className="font-body mb-8" style={{ fontSize: "1.1rem", lineHeight: 1.8, color: "oklch(0.35 0.005 0)" }}>
              Central Oregon's high desert climate creates unique landscaping challenges across all four seasons. From spring irrigation activation to fall blowout and winter snow management, here's your complete guide to keeping your property looking its best year-round.
            </p>

            {/* Spring */}
            <div
              className="p-6 mb-8"
              style={{ borderLeft: "3px solid oklch(0.46 0.20 25)", backgroundColor: "oklch(0.94 0.003 0)" }}
            >
              <h2 className="font-display text-2xl mb-4" style={{ color: "oklch(0.15 0.005 0)" }}>Spring (March – May)</h2>
              <p className="font-body mb-4" style={{ lineHeight: 1.8 }}>
                Spring is the most critical season for your Central Oregon landscape. As temperatures rise and the ground thaws, your lawn and irrigation system need attention after the long winter.
              </p>
              <ul className="space-y-2 pl-6 list-disc font-body" style={{ lineHeight: 1.8 }}>
                <li><strong>Sprinkler System Activation:</strong> Have your system professionally activated and inspected. Our certified technicians check every head, flush the lines, and test your backflow device.</li>
                <li><strong>Spring Aeration:</strong> Decompact your soil after winter settling. Aeration opens up the soil, allowing water and nutrients to reach the roots.</li>
                <li><strong>Pre-emergent Weed Control:</strong> Apply pre-emergent herbicide before weeds germinate to prevent the season-long battle.</li>
                <li><strong>Fertilization:</strong> Apply the first of three seasonal fertilizations to wake up your lawn after winter dormancy.</li>
                <li><strong>Pruning:</strong> Cut back ornamental grasses, dead-head perennials, and shape shrubs before new growth begins.</li>
              </ul>
            </div>

            {/* Summer */}
            <div
              className="p-6 mb-8"
              style={{ borderLeft: "3px solid oklch(0.46 0.20 25)", backgroundColor: "oklch(0.94 0.003 0)" }}
            >
              <h2 className="font-display text-2xl mb-4" style={{ color: "oklch(0.15 0.005 0)" }}>Summer (June – August)</h2>
              <p className="font-body mb-4" style={{ lineHeight: 1.8 }}>
                Central Oregon summers are hot and dry. Irrigation management becomes the top priority, and weekly maintenance keeps your property looking sharp.
              </p>
              <ul className="space-y-2 pl-6 list-disc font-body" style={{ lineHeight: 1.8 }}>
                <li><strong>Irrigation Monitoring:</strong> Check your system weekly for broken heads, leaks, and coverage gaps. Adjust run times as temperatures climb.</li>
                <li><strong>Weekly Mowing:</strong> Mow at the proper height for your grass type — never remove more than one-third of the blade at a time.</li>
                <li><strong>Weed Control:</strong> Stay ahead of weeds with regular hand-pulling and targeted herbicide applications.</li>
                <li><strong>Second Fertilization:</strong> Apply mid-season fertilizer to maintain color and density through the heat.</li>
                <li><strong>Fungus Watch:</strong> Hot, humid evenings can trigger fungal outbreaks. Watch for brown patches, powdery mildew, or dollar spot.</li>
              </ul>
            </div>

            {/* Fall */}
            <div
              className="p-6 mb-8"
              style={{ borderLeft: "3px solid oklch(0.46 0.20 25)", backgroundColor: "oklch(0.94 0.003 0)" }}
            >
              <h2 className="font-display text-2xl mb-4" style={{ color: "oklch(0.15 0.005 0)" }}>Fall (September – November)</h2>
              <p className="font-body mb-4" style={{ lineHeight: 1.8 }}>
                Fall is the second most important season for your landscape. Proper preparation now determines how well your lawn and plants survive the winter.
              </p>
              <ul className="space-y-2 pl-6 list-disc font-body" style={{ lineHeight: 1.8 }}>
                <li><strong>Fall Aeration:</strong> Aerate again to relieve summer compaction and prepare soil for winter.</li>
                <li><strong>Overseeding:</strong> Overseed thin or bare areas after aeration for a thick, healthy lawn next spring.</li>
                <li><strong>Third Fertilization:</strong> Apply a winterizer fertilizer to strengthen roots before dormancy.</li>
                <li><strong>Sprinkler Blowout:</strong> Schedule your blowout before the first hard freeze — we recommend no later than November 15th in Bend. We fill up fast, so book early.</li>
                <li><strong>Leaf Removal:</strong> Remove fallen leaves promptly to prevent smothering your lawn and creating fungal conditions.</li>
              </ul>
            </div>

            {/* Winter */}
            <div
              className="p-6 mb-8"
              style={{ borderLeft: "3px solid oklch(0.46 0.20 25)", backgroundColor: "oklch(0.94 0.003 0)" }}
            >
              <h2 className="font-display text-2xl mb-4" style={{ color: "oklch(0.15 0.005 0)" }}>Winter (December – February)</h2>
              <p className="font-body mb-4" style={{ lineHeight: 1.8 }}>
                Central Oregon winters bring snow and freezing temperatures. With your irrigation system safely winterized, focus shifts to snow management and planning for spring.
              </p>
              <ul className="space-y-2 pl-6 list-disc font-body" style={{ lineHeight: 1.8 }}>
                <li><strong>Snow Removal:</strong> The City of Bend requires residential snow removal within 24 hours and commercial within 6 hours. Our plowing teams are on call when accumulation reaches 2 inches.</li>
                <li><strong>De-icing:</strong> Apply salt or de-icer to walkways and steps to prevent slip-and-fall hazards.</li>
                <li><strong>Landscape Planning:</strong> Winter is the perfect time to plan spring installations — new patios, water features, or landscape redesigns. Schedule a consultation now before our spring calendar fills up.</li>
              </ul>
            </div>

            {/* CTA */}
            <div
              className="mt-12 p-8 text-center"
              style={{ backgroundColor: "oklch(0.15 0.005 0)", borderRadius: "0.35rem 2rem 2rem 0.35rem" }}
            >
              <p className="font-label mb-2" style={{ color: "oklch(0.72 0.12 25)", fontSize: "0.7rem", letterSpacing: "0.18em" }}>
                LET US HANDLE IT ALL
              </p>
              <h3 className="font-display text-white text-2xl mb-4">Year-Round Maintenance Service</h3>
              <p className="font-body mb-6" style={{ color: "oklch(0.70 0.003 0)" }}>
                Our weekly maintenance program covers everything — mowing, pruning, weed control, fertilization, irrigation monitoring, and seasonal services. One call, one crew, all season.
              </p>
              <button
                onClick={() => { navigate("/contact"); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                className="btn-red"
              >
                Start Service Today
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
