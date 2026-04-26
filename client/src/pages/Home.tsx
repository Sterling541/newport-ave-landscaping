/* ============================================================
   HOME PAGE — Newport Avenue Landscaping
   Studio Job-Inspired Editorial Experience
   Below-fold sections are lazy-loaded for performance
   ============================================================ */
import { Suspense, lazy } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import TrustBar from "@/components/TrustBar";
import StatsSection from "@/components/StatsSection";
import SEO from "@/components/SEO";
import { LocalBusinessSchema } from "@/components/SchemaMarkup";
import FloatingCTA from "@/components/FloatingCTA";

// Lazy-load all below-fold sections
const MarqueeBand = lazy(() => import("@/components/MarqueeBand"));
const BotanicalBand = lazy(() => import("@/components/BotanicalBand"));
const WhoWeServe = lazy(() => import("@/components/WhoWeServe"));
const AboutSection = lazy(() => import("@/components/AboutSection"));
const PhotoGallery = lazy(() => import("@/components/PhotoGallery"));
const LightingSection = lazy(() => import("@/components/LightingSection"));
const MembershipBanner = lazy(() => import("@/components/MembershipBanner"));
const MembershipSection = lazy(() => import("@/components/MembershipSection"));
const EverythingPlanSection = lazy(() => import("@/components/EverythingPlanSection"));
const CTABanner = lazy(() => import("@/components/CTABanner"));
const ReviewsSection = lazy(() => import("@/components/ReviewsSection"));
const ServiceAreaBand = lazy(() => import("@/components/ServiceAreaBand"));
const ContactSection = lazy(() => import("@/components/ContactSection"));
const Footer = lazy(() => import("@/components/Footer"));
// const GameSection = lazy(() => import("@/components/GameSection")); // hidden

// Lightweight fallback — invisible, just holds space
const SectionFallback = () => <div style={{ minHeight: "200px" }} />;

export default function Home() {
  return (
    <div
      className="min-h-screen"
      style={{
        backgroundColor: "oklch(0.99 0.004 75)",
        overflowX: "hidden",
      }}
    >
      <SEO
        title="Landscaping Company Bend Oregon | Newport Avenue Landscaping"
        description="Central Oregon's premier landscaping company since 2005. Custom landscape design, installation, maintenance & irrigation in Bend, Redmond, Sisters & beyond."
        canonical="/"
      />
      <LocalBusinessSchema />

      {/* Critical above-fold — loaded immediately */}
      <Navbar />
      <HeroSection />
      <TrustBar />

      {/* StatsSection receives the bleed — sits under hero photo edge */}
      <div style={{ position: "relative", zIndex: 1 }}>
        <StatsSection />
      </div>

      {/* Lawn Mower Dash game — hidden for now */}
      {/* <Suspense fallback={<SectionFallback />}>
        <GameSection />
      </Suspense> */}

      {/* All below-fold sections are lazy-loaded */}
      <Suspense fallback={<SectionFallback />}>
        <MarqueeBand />
      </Suspense>

      <Suspense fallback={<SectionFallback />}>
        <BotanicalBand variant="a" />
        <WhoWeServe />
      </Suspense>

      <Suspense fallback={<SectionFallback />}>
        <BotanicalBand label="PORTFOLIO  ◆  350+ PROJECTS" variant="b" />
        <AboutSection />
        <PhotoGallery />
      </Suspense>

      <Suspense fallback={<SectionFallback />}>
        <LightingSection />
        <MembershipBanner />
        <MembershipSection />
        <EverythingPlanSection />
      </Suspense>

      <Suspense fallback={<SectionFallback />}>
        <CTABanner />
        <ReviewsSection />
        <ServiceAreaBand />
        <ContactSection />
      </Suspense>

      <Suspense fallback={<SectionFallback />}>
        <Footer />
      </Suspense>

      <FloatingCTA />
    </div>
  );
}
