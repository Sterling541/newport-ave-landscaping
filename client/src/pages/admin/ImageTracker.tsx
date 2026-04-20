/* ============================================================
   ADMIN — Image Tracker
   Lists every page/section that needs a real Newport photo
   to replace the current AI-generated placeholder.
   ============================================================ */

const NEEDED_PHOTOS: {
  page: string;
  url: string;
  section: string;
  subject: string;
  priority: "high" | "medium" | "low";
}[] = [
  // HIGH PRIORITY — visible on most-visited pages
  {
    page: "About",
    url: "/about",
    section: "Team Hero",
    subject: "NEWPORT PHOTO NEEDED — Real team photo or crew shot. Currently using AI truck placeholder.",
    priority: "high",
  },
  {
    page: "Irrigation Service",
    url: "/services/irrigation",
    section: "Hero + Gallery",
    subject: "NEWPORT PHOTO NEEDED — Crew installing sprinkler system. Red hi-viz vest, no logo hallucination.",
    priority: "high",
  },
  {
    page: "Sprinkler Repair",
    url: "/services/sprinkler-repair",
    section: "Hero + Gallery",
    subject: "NEWPORT PHOTO NEEDED — Technician repairing irrigation head. Close-up or wide shot.",
    priority: "high",
  },
  {
    page: "Sprinkler Activation",
    url: "/services/sprinkler-activation",
    section: "Hero",
    subject: "NEWPORT PHOTO NEEDED — Crew activating sprinkler system in spring.",
    priority: "high",
  },
  {
    page: "Sprinkler Blowout",
    url: "/services/sprinkler-blowout",
    section: "Hero",
    subject: "NEWPORT PHOTO NEEDED — Crew blowing out irrigation system in fall.",
    priority: "high",
  },
  {
    page: "Snow Removal",
    url: "/services/snow-removal",
    section: "Hero + Gallery",
    subject: "NEWPORT PHOTO NEEDED — Crew clearing snow from driveway or commercial property.",
    priority: "high",
  },
  {
    page: "Lawn Service",
    url: "/services/lawn-service",
    section: "Hero + Gallery",
    subject: "NEWPORT PHOTO NEEDED — Crew mowing or maintaining a lawn. Hi-viz vest required.",
    priority: "high",
  },
  {
    page: "Aeration",
    url: "/services/aeration",
    section: "Hero + Gallery",
    subject: "NEWPORT PHOTO NEEDED — Crew operating aerator on a Central Oregon lawn.",
    priority: "high",
  },
  // MEDIUM PRIORITY — service pages
  {
    page: "Commercial Maintenance",
    url: "/services/commercial-maintenance",
    section: "Gallery",
    subject: "NEWPORT PHOTO NEEDED — Crew maintaining commercial property. Hi-viz vest.",
    priority: "medium",
  },
  {
    page: "Drainage",
    url: "/services/drainage",
    section: "Gallery",
    subject: "NEWPORT PHOTO NEEDED — Crew installing French drain or catch basin.",
    priority: "medium",
  },
  {
    page: "Firewise Landscaping",
    url: "/services/firewise-landscaping",
    section: "Gallery",
    subject: "NEWPORT PHOTO NEEDED — Crew clearing brush or creating defensible space.",
    priority: "medium",
  },
  {
    page: "Lawn Fungus",
    url: "/services/lawn-fungus",
    section: "Gallery",
    subject: "NEWPORT PHOTO NEEDED — Technician treating lawn fungus or inspecting turf.",
    priority: "medium",
  },
  // LOW PRIORITY — blog/resource pages
  {
    page: "Blog: Lawn Care Bend",
    url: "/blog/lawn-care-bend-oregon",
    section: "Hero",
    subject: "NEWPORT PHOTO NEEDED — Crew mowing or maintaining lawn in Bend.",
    priority: "low",
  },
  {
    page: "Careers",
    url: "/careers",
    section: "Team Photo",
    subject: "NEWPORT PHOTO NEEDED — Team photo or crew at job site. Hi-viz vests.",
    priority: "low",
  },
];

const PRIORITY_COLORS = {
  high: "bg-red-100 text-red-800 border-red-200",
  medium: "bg-yellow-100 text-yellow-800 border-yellow-200",
  low: "bg-green-100 text-green-800 border-green-200",
};

export default function ImageTracker() {
  const high = NEEDED_PHOTOS.filter((p) => p.priority === "high");
  const medium = NEEDED_PHOTOS.filter((p) => p.priority === "medium");
  const low = NEEDED_PHOTOS.filter((p) => p.priority === "low");

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="inline-block bg-red-600 text-white text-xs font-bold px-3 py-1 rounded mb-3 uppercase tracking-widest">
            Admin Only
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Image Tracker — Real Newport Photos Needed
          </h1>
          <p className="text-gray-600 max-w-2xl">
            This page tracks every location on the site that currently uses an AI-generated
            placeholder and needs a real Newport Avenue Landscaping photo. Upload real photos
            and share them to replace these placeholders.
          </p>
        </div>

        {/* Rules */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 mb-8 shadow-sm">
          <h2 className="font-semibold text-gray-900 mb-3 text-lg">Image Rules</h2>
          <ul className="space-y-2 text-sm text-gray-700">
            <li className="flex gap-2">
              <span className="text-green-600 font-bold">A</span>
              <span><strong>Real Newport photos (preferred)</strong> — crew in red hi-viz safety vest with reflective stripes. No AI-generated uniforms or logos.</span>
            </li>
            <li className="flex gap-2">
              <span className="text-blue-600 font-bold">B</span>
              <span><strong>AI scenery only</strong> — Central Oregon landscape, no people. Ponderosa pines, sage, basalt, Cascade peaks, Deschutes River.</span>
            </li>
            <li className="flex gap-2">
              <span className="text-purple-600 font-bold">C</span>
              <span><strong>Generic close-ups</strong> — hands installing a sprinkler head, trowel in soil, sod seam. No branded uniform visible.</span>
            </li>
          </ul>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-red-700">{high.length}</div>
            <div className="text-sm text-red-600">High Priority</div>
          </div>
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-yellow-700">{medium.length}</div>
            <div className="text-sm text-yellow-600">Medium Priority</div>
          </div>
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-green-700">{low.length}</div>
            <div className="text-sm text-green-600">Low Priority</div>
          </div>
        </div>

        {/* Photo list */}
        {[
          { label: "High Priority", items: high, color: "red" },
          { label: "Medium Priority", items: medium, color: "yellow" },
          { label: "Low Priority", items: low, color: "green" },
        ].map(({ label, items }) => (
          <div key={label} className="mb-8">
            <h2 className="text-lg font-semibold text-gray-800 mb-3">{label}</h2>
            <div className="space-y-3">
              {items.map((item) => (
                <div
                  key={item.url + item.section}
                  className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm flex flex-col sm:flex-row sm:items-start gap-3"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-semibold text-gray-900">{item.page}</span>
                      <span
                        className={`text-xs px-2 py-0.5 rounded border font-medium ${PRIORITY_COLORS[item.priority]}`}
                      >
                        {item.priority}
                      </span>
                    </div>
                    <div className="text-xs text-gray-500 mb-1">
                      Section: <span className="font-medium">{item.section}</span> &nbsp;·&nbsp;
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 underline"
                      >
                        View page →
                      </a>
                    </div>
                    <div className="text-sm text-gray-700 bg-gray-50 rounded px-3 py-2 border border-gray-100 font-mono">
                      {item.subject}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        <div className="text-center text-xs text-gray-400 mt-8 pb-4">
          Newport Avenue Landscaping · Internal Admin · Not visible to public
        </div>
      </div>
    </div>
  );
}
