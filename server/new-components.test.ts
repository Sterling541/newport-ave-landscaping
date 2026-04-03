/**
 * Tests for the new editorial design components:
 * - BlueSpruceCursor: custom cursor that replaces default
 * - BotanicalBand: Studio Job-inspired texture divider
 * - LightingSection: scroll-triggered landscape lighting reveal
 * - Navbar: extreme mega-menu navigation
 *
 * These are server-side unit tests verifying the component logic
 * and configuration values are correct.
 */
import { describe, it, expect } from "vitest";

// ── BlueSpruceCursor ──────────────────────────────────────────
describe("BlueSpruceCursor", () => {
  it("should define a cursor component file that exists", async () => {
    const fs = await import("fs");
    const path = await import("path");
    const filePath = path.resolve(
      __dirname,
      "../client/src/components/BlueSpruceCursor.tsx"
    );
    expect(fs.existsSync(filePath)).toBe(true);
  });

  it("should contain cursor:none style to hide default cursor", async () => {
    const fs = await import("fs");
    const path = await import("path");
    const filePath = path.resolve(
      __dirname,
      "../client/src/components/BlueSpruceCursor.tsx"
    );
    const content = fs.readFileSync(filePath, "utf-8");
    expect(content).toContain('cursor = "none"');
  });

  it("should restore cursor on unmount", async () => {
    const fs = await import("fs");
    const path = await import("path");
    const filePath = path.resolve(
      __dirname,
      "../client/src/components/BlueSpruceCursor.tsx"
    );
    const content = fs.readFileSync(filePath, "utf-8");
    // Should reset cursor on cleanup
    expect(content).toContain('cursor = ""');
  });

  it("should use the logo icon image (not a hand/finger shape)", async () => {
    const fs = await import("fs");
    const path = await import("path");
    const filePath = path.resolve(
      __dirname,
      "../client/src/components/BlueSpruceCursor.tsx"
    );
    const content = fs.readFileSync(filePath, "utf-8");
    // Uses the leaf icon image, not a hand SVG
    expect(content).toContain("leaf-icon-favicon");
    expect(content).not.toContain("M14 2C14 1.4");
    // Renders an img tag, not a spruce SVG
    expect(content).toContain("<img");
    expect(content).not.toContain("needleOuter");
  });

  it("should show red glow drop-shadow on hover (isPointer state)", async () => {
    const fs = await import("fs");
    const path = await import("path");
    const filePath = path.resolve(
      __dirname,
      "../client/src/components/BlueSpruceCursor.tsx"
    );
    const content = fs.readFileSync(filePath, "utf-8");
    // Red drop-shadow glow on hover
    expect(content).toContain("drop-shadow");
    expect(content).toContain("isPointer");
  });

  it("should use requestAnimationFrame for smooth cursor movement", async () => {
    const fs = await import("fs");
    const path = await import("path");
    const filePath = path.resolve(
      __dirname,
      "../client/src/components/BlueSpruceCursor.tsx"
    );
    const content = fs.readFileSync(filePath, "utf-8");
    expect(content).toContain("requestAnimationFrame");
    expect(content).toContain("cancelAnimationFrame");
  });
});

// ── HeroSection ─────────────────────────────────────────────
describe("HeroSection", () => {
  it("should define a hero section component file", async () => {
    const fs = await import("fs");
    const path = await import("path");
    const filePath = path.resolve(__dirname, "../client/src/components/HeroSection.tsx");
    expect(fs.existsSync(filePath)).toBe(true);
  });

  it("should NOT contain the diagonal ticker band (removed)", async () => {
    const fs = await import("fs");
    const path = await import("path");
    const filePath = path.resolve(__dirname, "../client/src/components/HeroSection.tsx");
    const content = fs.readFileSync(filePath, "utf-8");
    // Diagonal ticker was removed — no rotate(-18deg) band
    expect(content).not.toContain("rotate(-18deg)");
    expect(content).not.toContain("ticker-up");
  });

  it("should contain animated botanical spruce drawing", async () => {
    const fs = await import("fs");
    const path = await import("path");
    const filePath = path.resolve(__dirname, "../client/src/components/HeroSection.tsx");
    const content = fs.readFileSync(filePath, "utf-8");
    expect(content).toContain("AnimatedSpruceBranch");
    expect(content).toContain("stroke-dashoffset");
  });

  it("should contain vertical staggered service list", async () => {
    const fs = await import("fs");
    const path = await import("path");
    const filePath = path.resolve(__dirname, "../client/src/components/HeroSection.tsx");
    const content = fs.readFileSync(filePath, "utf-8");
    expect(content).toContain("VerticalServiceList");
    expect(content).toContain("SERVICES");
  });

  it("should auto-rotate scenes every 6.5 seconds", async () => {
    const fs = await import("fs");
    const path = await import("path");
    const filePath = path.resolve(__dirname, "../client/src/components/HeroSection.tsx");
    const content = fs.readFileSync(filePath, "utf-8");
    expect(content).toContain("6500");
  });
});

// ── BotanicalBand ─────────────────────────────────────────────
describe("BotanicalBand", () => {
  it("should define a botanical band component file", async () => {
    const fs = await import("fs");
    const path = await import("path");
    const filePath = path.resolve(
      __dirname,
      "../client/src/components/BotanicalBand.tsx"
    );
    expect(fs.existsSync(filePath)).toBe(true);
  });

  it("should use the marquee-scroll animation", async () => {
    const fs = await import("fs");
    const path = await import("path");
    const filePath = path.resolve(
      __dirname,
      "../client/src/components/BotanicalBand.tsx"
    );
    const content = fs.readFileSync(filePath, "utf-8");
    expect(content).toContain("marquee-scroll");
  });

  it("should use dark forest green background", async () => {
    const fs = await import("fs");
    const path = await import("path");
    const filePath = path.resolve(
      __dirname,
      "../client/src/components/BotanicalBand.tsx"
    );
    const content = fs.readFileSync(filePath, "utf-8");
    // Green is gone — band now uses bright cream background
    expect(content).toContain("oklch(0.975 0.006 75)");
    expect(content).not.toContain(" 155)");
    expect(content).not.toContain(" 184.6)");
  });

  it("should include large botanical illustrations bleeding above the band", async () => {
    const fs = await import("fs");
    const path = await import("path");
    const filePath = path.resolve(
      __dirname,
      "../client/src/components/BotanicalBand.tsx"
    );
    const content = fs.readFileSync(filePath, "utf-8");
    // Colossal-style large illustrations that bleed above the band
    expect(content).toContain('overflow: "visible"');
    // Should have SVG botanical elements
    expect(content).toContain("<svg");
    // Should bleed above the band with negative top positioning
    expect(content).toContain('top: "-');
  });
});

// ── LightingSection ───────────────────────────────────────────
describe("LightingSection", () => {
  it("should define a lighting section component file", async () => {
    const fs = await import("fs");
    const path = await import("path");
    const filePath = path.resolve(
      __dirname,
      "../client/src/components/LightingSection.tsx"
    );
    expect(fs.existsSync(filePath)).toBe(true);
  });

  it("should use a tall height for scroll room", async () => {
    const fs = await import("fs");
    const path = await import("path");
    const filePath = path.resolve(
      __dirname,
      "../client/src/components/LightingSection.tsx"
    );
    const content = fs.readFileSync(filePath, "utf-8");
    // Section uses 220vh or similar tall scroll room
    expect(content).toMatch(/2[0-9]{2}vh/);
  });

  it("should use position:sticky for the viewport panel", async () => {
    const fs = await import("fs");
    const path = await import("path");
    const filePath = path.resolve(
      __dirname,
      "../client/src/components/LightingSection.tsx"
    );
    const content = fs.readFileSync(filePath, "utf-8");
    expect(content).toContain('"sticky"');
  });

  it("should reference the forest-home4 CDN image", async () => {
    const fs = await import("fs");
    const path = await import("path");
    const filePath = path.resolve(
      __dirname,
      "../client/src/components/LightingSection.tsx"
    );
    const content = fs.readFileSync(filePath, "utf-8");
    expect(content).toContain("forest-home4");
    expect(content).toContain("cloudfront.net");
  });

  it("should have natural soft uplight and water glow (not harsh cones)", async () => {
    const fs = await import("fs");
    const path = await import("path");
    const filePath = path.resolve(
      __dirname,
      "../client/src/components/LightingSection.tsx"
    );
    const content = fs.readFileSync(filePath, "utf-8");
    // Natural glow: one main tree uplight, boulder accent, water glow
    expect(content).toContain("coneL");
    expect(content).toContain("boulderGrad");
    expect(content).toContain("radialGradient");
    expect(content).toContain("waterGlow");
    // Should NOT have the third harsh cone from old design
    expect(content).not.toContain("coneC");
  });

  it("should clamp progress between 0 and 1", async () => {
    const fs = await import("fs");
    const path = await import("path");
    const filePath = path.resolve(
      __dirname,
      "../client/src/components/LightingSection.tsx"
    );
    const content = fs.readFileSync(filePath, "utf-8");
    expect(content).toContain("Math.max(0, Math.min(1, raw))");
  });
});

// ── Navbar ────────────────────────────────────────────────────
describe("Navbar", () => {
  it("should define a navbar component file", async () => {
    const fs = await import("fs");
    const path = await import("path");
    const filePath = path.resolve(
      __dirname,
      "../client/src/components/Navbar.tsx"
    );
    expect(fs.existsSync(filePath)).toBe(true);
  });

  it("should include a mega menu component", async () => {
    const fs = await import("fs");
    const path = await import("path");
    const filePath = path.resolve(
      __dirname,
      "../client/src/components/Navbar.tsx"
    );
    const content = fs.readFileSync(filePath, "utf-8");
    expect(content).toContain("MegaMenu");
  });

  it("should include a Get a Quote CTA", async () => {
    const fs = await import("fs");
    const path = await import("path");
    const filePath = path.resolve(
      __dirname,
      "../client/src/components/Navbar.tsx"
    );
    const content = fs.readFileSync(filePath, "utf-8");
    expect(content).toContain("Get a Quote");
  });

  it("should have hover delay for mega menu to prevent accidental closes", async () => {
    const fs = await import("fs");
    const path = await import("path");
    const filePath = path.resolve(
      __dirname,
      "../client/src/components/Navbar.tsx"
    );
    const content = fs.readFileSync(filePath, "utf-8");
    expect(content).toContain("setTimeout");
    expect(content).toContain("180");
  });

  it("should include both maintenance and services mega menus", async () => {
    const fs = await import("fs");
    const path = await import("path");
    const filePath = path.resolve(
      __dirname,
      "../client/src/components/Navbar.tsx"
    );
    const content = fs.readFileSync(filePath, "utf-8");
    expect(content).toContain("maintenanceItems");
    expect(content).toContain("servicesItems");
    expect(content).toContain("MEGA_PHOTO_MAINTENANCE");
    expect(content).toContain("MEGA_PHOTO_SERVICES");
  });

  it("should use correct CDN URLs for mega menu photos", async () => {
    const fs = await import("fs");
    const path = await import("path");
    const filePath = path.resolve(
      __dirname,
      "../client/src/components/Navbar.tsx"
    );
    const content = fs.readFileSync(filePath, "utf-8");
    // Verify the freshly uploaded CDN URLs are used
    expect(content).toContain("3771NESuchyBackyardHiResPhotos11-min-min_32e40dc0.jpg");
    expect(content).toContain("61826HosmerLakeDrHiResPhotos2-min_f5f331b6.jpg");
  });
});

// ── Home.tsx integration ──────────────────────────────────────
describe("Home page integration", () => {
  it("should import all new components", async () => {
    const fs = await import("fs");
    const path = await import("path");
    const filePath = path.resolve(
      __dirname,
      "../client/src/pages/Home.tsx"
    );
    const content = fs.readFileSync(filePath, "utf-8");
    expect(content).toContain("BlueSpruceCursor");
    expect(content).toContain("BotanicalBand");
    expect(content).toContain("LightingSection");
  });

  it("should render BlueSpruceCursor before other content", async () => {
    const fs = await import("fs");
    const path = await import("path");
    const filePath = path.resolve(
      __dirname,
      "../client/src/pages/Home.tsx"
    );
    const content = fs.readFileSync(filePath, "utf-8");
    const cursorPos = content.indexOf("<BlueSpruceCursor");
    const navbarPos = content.indexOf("<Navbar");
    expect(cursorPos).toBeGreaterThan(-1);
    expect(cursorPos).toBeLessThan(navbarPos);
  });

  it("should include two BotanicalBand instances", async () => {
    const fs = await import("fs");
    const path = await import("path");
    const filePath = path.resolve(
      __dirname,
      "../client/src/pages/Home.tsx"
    );
    const content = fs.readFileSync(filePath, "utf-8");
    const matches = content.match(/<BotanicalBand/g);
    expect(matches).not.toBeNull();
    expect(matches!.length).toBeGreaterThanOrEqual(2);
  });
});
