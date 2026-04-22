/**
 * Unit tests for the portfolio category filter logic extracted from OurWork.tsx.
 * Tests the TAG_TO_CATEGORY mapping and getProjectCategories helper.
 */
import { describe, it, expect } from "vitest";

// ── Replicate the filter logic from OurWork.tsx ──────────────
type FilterCategory =
  | "All"
  | "Outdoor Living"
  | "Design & Build"
  | "Pavers & Hardscape"
  | "Water Features"
  | "Xeriscape"
  | "Landscape Lighting"
  | "Planting & Irrigation";

const TAG_TO_CATEGORY: Record<string, FilterCategory> = {
  "Outdoor Living": "Outdoor Living",
  "Luxury Residential": "Outdoor Living",
  "Pergola": "Outdoor Living",
  "Outdoor Kitchen": "Outdoor Living",
  "Pavilion": "Outdoor Living",
  "Full Renovation": "Outdoor Living",
  "Landscape Enhancement": "Outdoor Living",
  "Design & Build": "Design & Build",
  "Landscape Installation": "Design & Build",
  "Pavers": "Pavers & Hardscape",
  "Hardscape": "Pavers & Hardscape",
  "Flagstone": "Pavers & Hardscape",
  "Walkways": "Pavers & Hardscape",
  "Stone Work": "Pavers & Hardscape",
  "Retaining Walls": "Pavers & Hardscape",
  "Boulder Terracing": "Pavers & Hardscape",
  "Concrete Steps": "Pavers & Hardscape",
  "Curb Appeal": "Pavers & Hardscape",
  "Corten Steel Fireplace": "Pavers & Hardscape",
  "Water Feature": "Water Features",
  "Water Features": "Water Features",
  "Fire Pit": "Water Features",
  "Fire Feature": "Water Features",
  "Fire Features": "Water Features",
  "Xeriscape": "Xeriscape",
  "Xeriscaping": "Xeriscape",
  "Water-Wise": "Xeriscape",
  "Landscape Lighting": "Landscape Lighting",
  "Planting Design": "Planting & Irrigation",
  "Planting": "Planting & Irrigation",
  "Irrigation": "Planting & Irrigation",
};

function getProjectCategories(tags: string[]): FilterCategory[] {
  const cats = new Set<FilterCategory>();
  for (const tag of tags) {
    const cat = TAG_TO_CATEGORY[tag];
    if (cat) cats.add(cat);
  }
  return Array.from(cats);
}

// ── Sample project data mirroring OurWork.tsx ────────────────
const SAMPLE_PROJECTS = [
  {
    id: "suchy",
    tags: ["Outdoor Living", "Corten Steel Fireplace", "Pergola", "Outdoor Kitchen", "Planting Design", "Irrigation"],
  },
  {
    id: "hosmer",
    tags: ["Landscape Installation", "Irrigation", "Stone Work"],
  },
  {
    id: "mcgrath",
    tags: ["Design & Build", "Pavers", "Fire Feature", "Irrigation"],
  },
  {
    id: "awbrey-loop",
    tags: ["Water Feature", "Fire Pit", "Pergola", "Xeriscape", "Landscape Lighting", "Awbrey Butte"],
  },
  {
    id: "brokentop-xeriscape",
    tags: ["Xeriscaping", "Design & Build", "Broken Top", "Water-Wise"],
  },
  {
    id: "nw-bend-lighting",
    tags: ["Landscape Lighting", "Water Features"],
  },
];

describe("getProjectCategories", () => {
  it("maps Outdoor Living tags correctly", () => {
    const cats = getProjectCategories(["Outdoor Living", "Pergola", "Outdoor Kitchen"]);
    expect(cats).toContain("Outdoor Living");
    expect(cats).toHaveLength(1);
  });

  it("maps Design & Build tags correctly", () => {
    const cats = getProjectCategories(["Design & Build", "Landscape Installation"]);
    expect(cats).toContain("Design & Build");
    expect(cats).toHaveLength(1);
  });

  it("maps Pavers & Hardscape tags correctly", () => {
    const cats = getProjectCategories(["Pavers", "Flagstone", "Retaining Walls"]);
    expect(cats).toContain("Pavers & Hardscape");
    expect(cats).toHaveLength(1);
  });

  it("maps Water Features tags correctly (including Fire Pit)", () => {
    const cats = getProjectCategories(["Water Feature", "Fire Pit"]);
    expect(cats).toContain("Water Features");
    expect(cats).toHaveLength(1);
  });

  it("maps Xeriscape tags correctly", () => {
    const cats = getProjectCategories(["Xeriscaping", "Water-Wise"]);
    expect(cats).toContain("Xeriscape");
    expect(cats).toHaveLength(1);
  });

  it("maps Landscape Lighting correctly", () => {
    const cats = getProjectCategories(["Landscape Lighting"]);
    expect(cats).toContain("Landscape Lighting");
    expect(cats).toHaveLength(1);
  });

  it("maps Planting & Irrigation tags correctly", () => {
    const cats = getProjectCategories(["Planting Design", "Irrigation"]);
    expect(cats).toContain("Planting & Irrigation");
    expect(cats).toHaveLength(1);
  });

  it("returns multiple categories for multi-tag projects", () => {
    // awbrey-loop has Water Feature, Fire Pit, Pergola (Outdoor Living), Xeriscape, Landscape Lighting
    const cats = getProjectCategories(["Water Feature", "Fire Pit", "Pergola", "Xeriscape", "Landscape Lighting"]);
    expect(cats).toContain("Water Features");
    expect(cats).toContain("Outdoor Living");
    expect(cats).toContain("Xeriscape");
    expect(cats).toContain("Landscape Lighting");
  });

  it("ignores unknown tags (e.g. neighborhood names)", () => {
    const cats = getProjectCategories(["Awbrey Butte", "Broken Top"]);
    expect(cats).toHaveLength(0);
  });

  it("returns empty array for empty tags", () => {
    expect(getProjectCategories([])).toHaveLength(0);
  });
});

describe("Category filtering of PROJECTS array", () => {
  it("All category returns all projects", () => {
    const filtered = SAMPLE_PROJECTS; // "All" means no filter
    expect(filtered).toHaveLength(SAMPLE_PROJECTS.length);
  });

  it("Outdoor Living filter returns projects with outdoor living tags", () => {
    const filtered = SAMPLE_PROJECTS.filter((p) =>
      getProjectCategories(p.tags).includes("Outdoor Living")
    );
    const ids = filtered.map((p) => p.id);
    expect(ids).toContain("suchy"); // has Outdoor Living, Pergola, Outdoor Kitchen
    expect(ids).toContain("awbrey-loop"); // has Pergola
    expect(ids).not.toContain("hosmer"); // no outdoor living tags
    expect(ids).not.toContain("brokentop-xeriscape"); // no outdoor living tags
  });

  it("Design & Build filter returns correct projects", () => {
    const filtered = SAMPLE_PROJECTS.filter((p) =>
      getProjectCategories(p.tags).includes("Design & Build")
    );
    const ids = filtered.map((p) => p.id);
    expect(ids).toContain("mcgrath");
    expect(ids).toContain("brokentop-xeriscape");
    expect(ids).toContain("hosmer"); // Landscape Installation maps to Design & Build
    expect(ids).not.toContain("suchy");
  });

  it("Xeriscape filter returns correct projects", () => {
    const filtered = SAMPLE_PROJECTS.filter((p) =>
      getProjectCategories(p.tags).includes("Xeriscape")
    );
    const ids = filtered.map((p) => p.id);
    expect(ids).toContain("brokentop-xeriscape");
    expect(ids).toContain("awbrey-loop"); // has Xeriscape tag
    expect(ids).not.toContain("mcgrath");
  });

  it("Landscape Lighting filter returns correct projects", () => {
    const filtered = SAMPLE_PROJECTS.filter((p) =>
      getProjectCategories(p.tags).includes("Landscape Lighting")
    );
    const ids = filtered.map((p) => p.id);
    expect(ids).toContain("awbrey-loop");
    expect(ids).toContain("nw-bend-lighting");
    expect(ids).not.toContain("suchy");
  });

  it("Planting & Irrigation filter returns correct projects", () => {
    const filtered = SAMPLE_PROJECTS.filter((p) =>
      getProjectCategories(p.tags).includes("Planting & Irrigation")
    );
    const ids = filtered.map((p) => p.id);
    expect(ids).toContain("suchy"); // has Planting Design + Irrigation
    expect(ids).toContain("hosmer"); // has Irrigation
    expect(ids).toContain("mcgrath"); // has Irrigation
    expect(ids).not.toContain("nw-bend-lighting");
  });
});
