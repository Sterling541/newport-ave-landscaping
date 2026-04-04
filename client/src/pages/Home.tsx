/* ============================================================
   HOME PAGE — Newport Avenue Landscaping
   Studio Job-Inspired Editorial Experience
   ============================================================ */
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import StatsSection from "@/components/StatsSection";
import ServicesSection from "@/components/ServicesSection";
import AboutSection from "@/components/AboutSection";
import PortfolioSection from "@/components/PortfolioSection";
import MembershipSection from "@/components/MembershipSection";
import EverythingPlanSection from "@/components/EverythingPlanSection";
import MembershipBanner from "@/components/MembershipBanner";
import CTABanner from "@/components/CTABanner";
import ReviewsSection from "@/components/ReviewsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import FloatingCTA from "@/components/FloatingCTA";
import PhotoGallery from "@/components/PhotoGallery";
import WhoWeServe from "@/components/WhoWeServe";
import ServiceAreaBand from "@/components/ServiceAreaBand";
import TrustBar from "@/components/TrustBar";
import MarqueeBand from "@/components/MarqueeBand";
import BotanicalBand from "@/components/BotanicalBand";
import LightingSection from "@/components/LightingSection";
import OutdoorRoomsSection from "@/components/OutdoorRoomsSection";
import EditorialQuote from "@/components/EditorialQuote";
import SEO from "@/components/SEO";
import { LocalBusinessSchema } from "@/components/SchemaMarkup";

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
        description="Central Oregon's premier landscaping company since 2003. Custom landscape design, installation, maintenance & irrigation in Bend, Redmond, Sisters & beyond."
        canonical="/"
      />
      <LocalBusinessSchema />


      <Navbar />

      {/* Hero — photos bleed 120px below into StatsSection */}
      <HeroSection />
      <TrustBar />

      {/* StatsSection receives the bleed — sits under hero photo edge */}
      <div style={{ position: "relative", zIndex: 1 }}>
        <StatsSection />
      </div>

      {/* Red scrolling marquee band */}
      <MarqueeBand />

      {/* Botanical divider — watercolor plants */}
      <BotanicalBand variant="a" />

      <WhoWeServe />
      <ServicesSection />

      {/* Belgard-style interactive outdoor rooms section */}
      <OutdoorRoomsSection />

      {/* Editorial quote divider */}
      <EditorialQuote
        quote="Every great outdoor space starts with a vision — and ends with a place you never want to leave."
        attribution="Newport Avenue Landscaping"
      />

      {/* Botanical divider before portfolio */}
      <BotanicalBand label="PORTFOLIO  ◆  150+ PROJECTS" variant="b" />

      <AboutSection />
      <PortfolioSection />
      <PhotoGallery />

      {/* Scroll-triggered landscape lighting section */}
      <LightingSection />

      {/* Editorial quote before membership */}
      <EditorialQuote
        quote="Your sprinklers. Our responsibility. Zero worry."
        attribution="Newport Priority Irrigation Membership"
      />

      <MembershipBanner />
      <MembershipSection />
      <EverythingPlanSection />
      <CTABanner />
      <ReviewsSection />
      <ServiceAreaBand />
      <ContactSection />
      <Footer />
      <FloatingCTA />
    </div>
  );
}
