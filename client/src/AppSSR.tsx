// AppSSR.tsx — Eagerly imports all public pages for server-side rendering.
// Generated from App.tsx. Do not edit manually — update App.tsx and regenerate.

import { Suspense, useEffect } from 'react';
import { useLocation } from 'wouter';

// Scroll to top on every route change
function ScrollToTop() {
  const [location] = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [location]);
  return null;
}
import MobileCTABar from "@/components/MobileCTABar";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";

// ── Eagerly loaded (always needed) ──────────────────────────────────────────
import Home from "./pages/Home";
import NotFound from "@/pages/NotFound";

// ── Lazy-loaded pages (code-split per route) ─────────────────────────────────

// Schedule Services + Admin
import ScheduleServices from "./pages/ScheduleServices";
import AdminSubmissions from "./pages/AdminSubmissions";
import DailyPulse from "./pages/admin/DailyPulse";
import LeadVolumeTrends from "./pages/admin/LeadVolumeTrends";
import CsvImport from "./pages/admin/CsvImport";
import GeoIntelligence from "./pages/admin/GeoIntelligence";
import Reminders from "./pages/admin/Reminders";
import AdminOptOutRequests from "./pages/admin/AdminOptOutRequests";
import QuoteRequest from "./pages/QuoteRequest";
import AdminQuoteLeads from "./pages/admin/AdminQuoteLeads";
import GameAnalytics from "./pages/admin/GameAnalytics";
import ImageTracker from "./pages/admin/ImageTracker";
import OptOut from "./pages/OptOut";
import LawnMowerDash from "./pages/LawnMowerDash";

// Main pages
import About from "./pages/About";
import Commercial from "./pages/Commercial";
import Maintenance from "./pages/Maintenance";
import Services from "./pages/Services";
import OurWork from "./pages/OurWork";
import Contact from "./pages/Contact";
import Blog from "./pages/Blog";
import Resources from "./pages/Resources";
import ServiceAreas from "./pages/ServiceAreas";
import BendNeighborhoods from "./pages/BendNeighborhoods";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Membership from "./pages/Membership";
import Terms from "./pages/Terms";
import Careers from "./pages/Careers";

// Maintenance sub-pages
import LawnService from "./pages/services/LawnService";
import CommercialMaintenance from "./pages/services/CommercialMaintenance";
import CommercialHOAMaintenance from "./pages/maintenance/CommercialHOAMaintenance";
import Aeration from "./pages/services/Aeration";
import SprinklerActivation from "./pages/services/SprinklerActivation";
import SprinklerBlowout from "./pages/services/SprinklerBlowout";
import SnowRemoval from "./pages/services/SnowRemoval";
import LawnFungus from "./pages/services/LawnFungus";

// Installation / service sub-pages
import LandscapeDesign from "./pages/services/LandscapeDesign";
import Irrigation from "./pages/services/Irrigation";
import SprinklerRepair from "./pages/services/SprinklerRepair";
import Pavers from "./pages/services/Pavers";
import WaterFeatures from "./pages/services/WaterFeatures";
import OutdoorLiving from "./pages/services/OutdoorLiving";
import Decks from "./pages/services/Decks";
import FireFeatures from "./pages/services/FireFeatures";
import LandscapeLighting from "./pages/services/LandscapeLighting";
import Xeriscaping from "./pages/services/Xeriscaping";
import RetainingWalls from "./pages/services/RetainingWalls";
import Drainage from "./pages/services/Drainage";
import FirewiseLandscaping from "./pages/services/FirewiseLandscaping";
import FirewiseLandingPage from "./pages/FirewiseLandingPage";

// City landing pages
import BendPage from "./pages/cities/Bend";
import RedmondPage from "./pages/cities/Redmond";
import SistersPage from "./pages/cities/Sisters";
import SunriverPage from "./pages/cities/Sunriver";
import TumaloPage from "./pages/cities/Tumalo";
import PrinevillePage from "./pages/cities/Prineville";
import LaPinePage from "./pages/cities/LaPine";
import MadrasPage from "./pages/cities/Madras";
import EagleCrestPage from "./pages/cities/EagleCrest";
import PowellButtePage from "./pages/cities/PowellButte";
import TerrebonnePage from "./pages/cities/Terrebonne";
import CrookedRiverRanchPage from "./pages/cities/CrookedRiverRanch";
import AlfalfaPage from "./pages/cities/Alfalfa";
import ClineFallsPage from "./pages/cities/ClineFalls";

// Blog posts
import ClimateChange from "./pages/blog/ClimateChange";
import SeasonalGuide from "./pages/blog/SeasonalGuide";
import XeriscapeBend from "./pages/blog/XeriscapeBend";
import SprinklerWinterizationBend from "./pages/blog/SprinklerWinterizationBend";
import PaverPatioIdeasBend from "./pages/blog/PaverPatioIdeasBend";
import LawnCareBendOregon from "./pages/blog/LawnCareBendOregon";

// SEO Resource pages
import DeckCostBend from "./pages/resources/DeckCostBend";
import PaverPatioCostBend from "./pages/resources/PaverPatioCostBend";
import SprinklerSystemCostBend from "./pages/resources/SprinklerSystemCostBend";
import XeriscapeCostBend from "./pages/resources/XeriscapeCostBend";
import LandscapeDesignCostBend from "./pages/resources/LandscapeDesignCostBend";
import RetainingWallCostBend from "./pages/resources/RetainingWallCostBend";
import SodInstallationCostBend from "./pages/resources/SodInstallationCostBend";
import OutdoorLightingCostBend from "./pages/resources/OutdoorLightingCostBend";
import WaterFeatureCostBend from "./pages/resources/WaterFeatureCostBend";
import LawnMaintenanceCostBend from "./pages/resources/LawnMaintenanceCostBend";
import FirePitPatioCostBend from "./pages/resources/FirePitPatioCostBend";
import BestPlantsXeriscapeCentralOregon from "./pages/resources/BestPlantsXeriscapeCentralOregon";
import WhenToAerateLawnBend from "./pages/resources/WhenToAerateLawnBend";
import SprinklerWinterizationGuideBend from "./pages/resources/SprinklerWinterizationGuideBend";
import HowToChooseLandscaperBend from "./pages/resources/HowToChooseLandscaperBend";
import BendTurfRebateProgram from "./pages/resources/BendTurfRebateProgram";
import IrrigationRepairBend from "./pages/resources/IrrigationRepairBend";
import CommercialLandscapingBend from "./pages/resources/CommercialLandscapingBend";
import SnowRemovalBendResource from "./pages/resources/SnowRemovalBend";
import LandscapeLightingBend from "./pages/resources/LandscapeLightingBend";

// Core SEO sub-pages
import ConcretePaversBend from "./pages/seo/ConcretePayersBend";
import HOALandscapeDesignBend from "./pages/seo/HOALandscapeDesignBend";
import ModernLandscapeDesignBend from "./pages/seo/ModernLandscapeDesignBend";

// Core SEO landing pages
import LandscapingBendOregon from "./pages/seo/LandscapingBendOregon";
import PaverPatiosBend from "./pages/seo/PaverPatiosBend";
import IrrigationBendOregon from "./pages/seo/IrrigationBendOregon";
import LandscapeDesignBend from "./pages/seo/LandscapeDesignBend";
import CommercialLandscapingBendSeo from "./pages/seo/CommercialLandscapingBend";

// SEO Neighborhood / Service Area pages
import AwbreyButteNeighborhood from "./pages/service-areas/AwbreyButteNeighborhood";
import NorthwestCrossingNeighborhood from "./pages/service-areas/NorthwestCrossingNeighborhood";
import BrokenTopNeighborhood from "./pages/service-areas/BrokenTopNeighborhood";
import DiscoveryWestNeighborhood from "./pages/service-areas/DiscoveryWestNeighborhood";
import SunriverLandscaping from "./pages/service-areas/SunriverLandscaping";
import RedmondLandscaping from "./pages/service-areas/RedmondLandscaping";
import PowellButteNeighborhood from "./pages/service-areas/PowellButteNeighborhood";
import EagleCrestNeighborhood from "./pages/service-areas/EagleCrestNeighborhood";

// Portfolio project pages
import BendFullYardTransformation from "./pages/portfolio/BendFullYardTransformation";
import AwbreyButteXeriscape from "./pages/portfolio/AwbreyButteXeriscape";
import AwbreyGlennFlagstone from "./pages/portfolio/AwbreyGlennFlagstone";
import BackyardRenovation from "./pages/portfolio/BackyardRenovation";
import BrokenTopWaterFeature from "./pages/portfolio/BrokenTopWaterFeature";
import BrokenTopXeriscape from "./pages/portfolio/BrokenTopXeriscape";
import CenturyDrive from "./pages/portfolio/CenturyDrive";
import EastBendLandscape from "./pages/portfolio/EastBendLandscape";
import NWBendBackyard from "./pages/portfolio/NWBendBackyard";
import PaverPatioFirepit from "./pages/portfolio/PaverPatioFirepit";
import SWBendBackyard from "./pages/portfolio/SWBendBackyard";
import AwbreyButtePatio from "./pages/portfolio/AwbreyButtePatio";
import NWBendLighting from "./pages/portfolio/NWBendLighting";
import WestsideOutdoorLiving from "./pages/portfolio/WestsideOutdoorLiving";

// Lazy-loaded service-area pages (already lazy)
import RedmondPavers from "@/pages/service-areas/RedmondPavers";
import RedmondIrrigation from "@/pages/service-areas/RedmondIrrigation";
import RedmondXeriscaping from "@/pages/service-areas/RedmondXeriscaping";
import RedmondLandscapeDesign from "@/pages/service-areas/RedmondLandscapeDesign";
import RedmondLawnService from "@/pages/service-areas/RedmondLawnService";
import RedmondSnowRemoval from "@/pages/service-areas/RedmondSnowRemoval";
import SistersPavers from "@/pages/service-areas/SistersPavers";
import SistersIrrigation from "@/pages/service-areas/SistersIrrigation";
import SistersXeriscaping from "@/pages/service-areas/SistersXeriscaping";
import SistersLandscapeDesign from "@/pages/service-areas/SistersLandscapeDesign";
import SistersLawnService from "@/pages/service-areas/SistersLawnService";
import SistersSnowRemoval from "@/pages/service-areas/SistersSnowRemoval";
import SunriverPavers from "@/pages/service-areas/SunriverPavers";
import SunriverIrrigation from "@/pages/service-areas/SunriverIrrigation";
import SunriverXeriscaping from "@/pages/service-areas/SunriverXeriscaping";
import SunriverLandscapeDesign from "@/pages/service-areas/SunriverLandscapeDesign";
import SunriverLawnService from "@/pages/service-areas/SunriverLawnService";
import SunriverSnowRemoval from "@/pages/service-areas/SunriverSnowRemoval";
import LaPinePavers from "@/pages/service-areas/LaPinePavers";
import LaPineIrrigation from "@/pages/service-areas/LaPineIrrigation";
import LaPineXeriscaping from "@/pages/service-areas/LaPineXeriscaping";
import LaPineLandscapeDesign from "@/pages/service-areas/LaPineLandscapeDesign";
import LaPineLawnService from "@/pages/service-areas/LaPineLawnService";
import LaPineSnowRemoval from "@/pages/service-areas/LaPineSnowRemoval";
import PrinevillePavers from "@/pages/service-areas/PrinevillePavers";
import PrinevilleIrrigation from "@/pages/service-areas/PrinevilleIrrigation";
import PrinevilleXeriscaping from "@/pages/service-areas/PrinevilleXeriscaping";
import PrinevilleLandscapeDesign from "@/pages/service-areas/PrinevilleLandscapeDesign";
import PrinevilleLawnService from "@/pages/service-areas/PrinevilleLawnService";
import PrinevilleSnowRemoval from "@/pages/service-areas/PrinevilleSnowRemoval";
import MadrasPavers from "@/pages/service-areas/MadrasPavers";
import MadrasIrrigation from "@/pages/service-areas/MadrasIrrigation";
import MadrasXeriscaping from "@/pages/service-areas/MadrasXeriscaping";
import MadrasLandscapeDesign from "@/pages/service-areas/MadrasLandscapeDesign";
import MadrasLawnService from "@/pages/service-areas/MadrasLawnService";
import MadrasSnowRemoval from "@/pages/service-areas/MadrasSnowRemoval";
import TumaloPavers from "@/pages/service-areas/TumaloPavers";
import TumaloIrrigation from "@/pages/service-areas/TumaloIrrigation";
import TumaloXeriscaping from "@/pages/service-areas/TumaloXeriscaping";
import TumaloLandscapeDesign from "@/pages/service-areas/TumaloLandscapeDesign";
import TumaloLawnService from "@/pages/service-areas/TumaloLawnService";
import TumaloSnowRemoval from "@/pages/service-areas/TumaloSnowRemoval";
import TerrebonnePavers from "@/pages/service-areas/TerrebonnePavers";
import TerrebonneIrrigation from "@/pages/service-areas/TerrebonneIrrigation";
import TerrebonneXeriscaping from "@/pages/service-areas/TerrebonneXeriscaping";
import TerrebonneLandscapeDesign from "@/pages/service-areas/TerrebonneLandscapeDesign";
import TerrebonneLawnService from "@/pages/service-areas/TerrebonneLawnService";
import TerrebonneSnowRemoval from "@/pages/service-areas/TerrebonneSnowRemoval";
import NaturalStoneVsConcretePayersBend from "@/pages/resources/NaturalStoneVsConcretePayersBend";
import GasVsPropaneFirePitBend from "@/pages/resources/GasVsPropaneFirePitBend";
import OldBendLandscaping from "@/pages/service-areas/OldBendLandscaping";
import IrrigationFAQBend from "@/pages/resources/IrrigationFAQBend";
import PaverFAQBend from "@/pages/resources/PaverFAQBend";
import XeriscapeFAQBend from "@/pages/resources/XeriscapeFAQBend";
import SSR_WoodriverVillageLandscaping from "./pages/service-areas/WoodriverVillageLandscaping";
import SSR_BendPropertyValueLandscaping from "./pages/resources/BendPropertyValueLandscaping";
import SSR_BendCountryClubLandscaping from "./pages/service-areas/BendCountryClubLandscaping";
import SSR_HowToReadLandscapeProposal from "./pages/resources/HowToReadLandscapeProposal";
import SSR_PrinevilleLandscapingHub from "./pages/service-areas/PrinevilleLandscapingHub";
import SSR_LawnCarePrineville from "./pages/service-areas/LawnCarePrineville";
import SSR_XeriscapeVsTraditionalLawnBend from "./pages/resources/XeriscapeVsTraditionalLawnBend";
import SSR_PaversVsConcreteBend from "./pages/resources/PaversVsConcreteBend";
import SSR_CenturyDriveCorridorLandscaping from "./pages/service-areas/CenturyDriveCorridorLandscaping";
import SSR_LandscapeDesignRedmond from "./pages/service-areas/LandscapeDesignRedmond";
import SSR_NativeVsAdaptedPlantsBend from "./pages/resources/NativeVsAdaptedPlantsBend";
import SSR_XeriscapeRedmond from "./pages/service-areas/XeriscapeRedmond";
import SSR_IrrigationCulver from "./pages/service-areas/IrrigationCulver";
import SSR_FaqOutdoorLightingBend from "./pages/resources/FaqOutdoorLightingBend";
import SSR_BendWestsideLandscaping from "./pages/service-areas/BendWestsideLandscaping";
import SSR_AerationCostBend from "./pages/resources/AerationCostBend";
import SSR_LaPineLandscapingHub from "./pages/service-areas/LaPineLandscapingHub";
import SSR_WaterWiseCommunitiesBend from "./pages/resources/WaterWiseCommunitiesBend";
import SSR_FaqWaterFeatureBend from "./pages/resources/FaqWaterFeatureBend";
import SSR_HowToSelectPaversBend from "./pages/resources/HowToSelectPaversBend";
import SSR_PerennialGardenCostBend from "./pages/resources/PerennialGardenCostBend";
import SSR_LawnCareRedmond from "./pages/service-areas/LawnCareRedmond";
import SSR_PaverPatioSunriver from "./pages/service-areas/PaverPatioSunriver";
import DecksBend from "./pages/service-areas/DecksBend";
import DecksRedmond from "./pages/service-areas/DecksRedmond";
import DecksSisters from "./pages/service-areas/DecksSisters";
import DecksSunriver from "./pages/service-areas/DecksSunriver";
import SSR_HowToXeriscapeBend from "./pages/resources/HowToXeriscapeBend";
import SSR_MulchInstallationCostBend from "./pages/resources/MulchInstallationCostBend";
import SSR_HowToMaintainPaverPatioBend from "./pages/resources/HowToMaintainPaverPatioBend";
import SSR_LandscapingBendOregonGuide from "./pages/resources/LandscapingBendOregonGuide";
import SSR_DefensibleSpaceBendOregon from "./pages/resources/DefensibleSpaceBendOregon";
import SSR_MadrasLandscapingHub from "./pages/service-areas/MadrasLandscapingHub";
import SSR_BendLandscapingSeasons from "./pages/resources/BendLandscapingSeasons";
import SSR_OutdoorKitchenCostBend from "./pages/resources/OutdoorKitchenCostBend";
import SSR_FireResistantPlantsCentralOregon from "./pages/resources/FireResistantPlantsCentralOregon";
import SSR_LawnCareCrookedRiverRanch from "./pages/service-areas/LawnCareCrookedRiverRanch";
import SSR_SkylineRanchLandscaping from "./pages/service-areas/SkylineRanchLandscaping";
import SSR_LawnCareCostBend from "./pages/resources/LawnCareCostBend";
import SSR_CulverLandscapingHub from "./pages/service-areas/CulverLandscapingHub";
import SSR_BrookswoodLandscaping from "./pages/service-areas/BrookswoodLandscaping";
import SSR_BrokenTopLandscaping from "./pages/service-areas/BrokenTopLandscaping";
import SSR_NWCrossingLandscaping from "./pages/service-areas/NWCrossingLandscaping";
import SSR_PaverPatioCulver from "./pages/service-areas/PaverPatioCulver";
import SSR_LawnCareSisters from "./pages/service-areas/LawnCareSisters";
import SSR_MurphyRoadAreaLandscaping from "./pages/service-areas/MurphyRoadAreaLandscaping";
import SSR_HowToPlantTreesBend from "./pages/resources/HowToPlantTreesBend";
import SSR_PaverPatioLaPine from "./pages/service-areas/PaverPatioLaPine";
import SSR_RedmondLandscapingHub from "./pages/service-areas/RedmondLandscapingHub";
import SSR_OrionGreensLandscaping from "./pages/service-areas/OrionGreensLandscaping";
import SSR_BestGrassBendOregon from "./pages/resources/BestGrassBendOregon";
import SSR_BendTurfRebateProgram from "./pages/resources/BendTurfRebateProgram";
import SSR_RiverWestLandscaping from "./pages/service-areas/RiverWestLandscaping";
import SSR_PaverPatioRedmond from "./pages/service-areas/PaverPatioRedmond";
import SSR_BackflowTestingBend from "./pages/resources/BackflowTestingBend";
import SSR_SnowRemovalCostBend from "./pages/resources/SnowRemovalCostBend";
import SSR_PaverPatioCostBend2 from "./pages/resources/PaverPatioCostBend2";
import SSR_XeriscapePrineville from "./pages/service-areas/XeriscapePrineville";
import SSR_TetherowLandscaping from "./pages/service-areas/TetherowLandscaping";
import SSR_FaqIrrigationBend from "./pages/resources/FaqIrrigationBend";
import SSR_BendLandscapeMaintenancePlan from "./pages/resources/BendLandscapeMaintenancePlan";
import SSR_DeschutesFireHardeningR327 from "./pages/resources/DeschutesFireHardeningR327";
import SSR_OldMillDistrictLandscaping from "./pages/service-areas/OldMillDistrictLandscaping";
import SSR_HowToWaterLawnBend from "./pages/resources/HowToWaterLawnBend";
import SSR_PaverPatioPowellButte from "./pages/service-areas/PaverPatioPowellButte";
import SSR_IrrigationPowellButte from "./pages/service-areas/IrrigationPowellButte";
import SSR_BendHOALandscaping from "./pages/resources/BendHOALandscaping";
import SSR_ProfessionalVsDIYLandscapingBend from "./pages/resources/ProfessionalVsDIYLandscapingBend";
import SSR_LarkspurLandscaping from "./pages/service-areas/LarkspurLandscaping";
import SSR_LawnCareLaPine from "./pages/service-areas/LawnCareLaPine";
import SSR_PaverPatioTerrebonne from "./pages/service-areas/PaverPatioTerrebonne";
import SSR_TreeRemovalCostBend from "./pages/resources/TreeRemovalCostBend";
import SSR_IrrigationCrookedRiverRanch from "./pages/service-areas/IrrigationCrookedRiverRanch";
import SSR_BendLandscapeDesignIdeas from "./pages/resources/BendLandscapeDesignIdeas";
import SSR_LawnCareAlfalfa from "./pages/service-areas/LawnCareAlfalfa";
import SSR_LawnCareSunriver from "./pages/service-areas/LawnCareSunriver";
import SSR_IrrigationTerrebonne from "./pages/service-areas/IrrigationTerrebonne";
import SSR_SprinklerSystemTumalo from "./pages/service-areas/SprinklerSystemTumalo";
import SSR_SoutheastBendLandscaping from "./pages/service-areas/SoutheastBendLandscaping";
import SSR_FaqLawnCareBend from "./pages/resources/FaqLawnCareBend";
import SSR_FencingCostBend from "./pages/resources/FencingCostBend";
import SSR_DeschutesRiverWoodsLandscaping from "./pages/service-areas/DeschutesRiverWoodsLandscaping";
import SSR_FaqSnowRemovalBend from "./pages/resources/FaqSnowRemovalBend";
import SSR_BendTurfReplacementRebate from "./pages/resources/BendTurfReplacementRebate";
import SSR_BendLandscapeBeforeAfter from "./pages/resources/BendLandscapeBeforeAfter";
import SSR_PaverPatioPrineville from "./pages/service-areas/PaverPatioPrineville";
import SSR_SodVsSeedBend from "./pages/resources/SodVsSeedBend";
import SSR_LawnCareTerrebonne from "./pages/service-areas/LawnCareTerrebonne";
import SSR_DripVsSprayIrrigationBend from "./pages/resources/DripVsSprayIrrigationBend";
import SSR_FaqXeriscapeBend from "./pages/resources/FaqXeriscapeBend";
import SSR_WaterWiseLandscapingService from "./pages/services/WaterWiseLandscapingService";
import SSR_LawnCareMadras from "./pages/service-areas/LawnCareMadras";
import SSR_LandscapeDesignSunriver from "./pages/service-areas/LandscapeDesignSunriver";
import SSR_WinterLandscapingGuideBend from "./pages/resources/WinterLandscapingGuideBend";
import SSR_BendLandscapingTips from "./pages/resources/BendLandscapingTips";
import SSR_BendSouthLandscaping from "./pages/service-areas/BendSouthLandscaping";
import SSR_CentralOregonLandscapingGuide from "./pages/resources/CentralOregonLandscapingGuide";
import SSR_PaverPatioTumalo from "./pages/service-areas/PaverPatioTumalo";
import SSR_BendWateringRestrictions from "./pages/resources/BendWateringRestrictions";
import SSR_LandscapeDesignTumalo from "./pages/service-areas/LandscapeDesignTumalo";
import SSR_LawnCarePowellButte from "./pages/service-areas/LawnCarePowellButte";
import SSR_IrrigationMadras from "./pages/service-areas/IrrigationMadras";
import SSR_BendLandscapingCostGuide from "./pages/resources/BendLandscapingCostGuide";
import SSR_LandscapeDesignPrineville from "./pages/service-areas/LandscapeDesignPrineville";
import SSR_SistersLandscapingHub from "./pages/service-areas/SistersLandscapingHub";
import SSR_SprinklerSystemLaPine from "./pages/service-areas/SprinklerSystemLaPine";
import SSR_LandscapeDesignLaPine from "./pages/service-areas/LandscapeDesignLaPine";
import SSR_BendLandscapeWarranty from "./pages/resources/BendLandscapeWarranty";
import SSR_HowToReadSoilBend from "./pages/resources/HowToReadSoilBend";
import SSR_PaverPatioMadras from "./pages/service-areas/PaverPatioMadras";
import SSR_SummerLandscapingGuideBend from "./pages/resources/SummerLandscapingGuideBend";
import SSR_BendNewConstructionLandscaping from "./pages/resources/BendNewConstructionLandscaping";
import SSR_HowToPreventLawnFungusBend from "./pages/resources/HowToPreventLawnFungusBend";
import SSR_JuniperRemovalBendOregon from "./pages/resources/JuniperRemovalBendOregon";
import SSR_SpringLandscapingGuideBend from "./pages/resources/SpringLandscapingGuideBend";
import SSR_SprinklerWinterizationGuideBend from "./pages/resources/SprinklerWinterizationGuideBend";
import SSR_WaterWiseLandscapingBend from "./pages/resources/WaterWiseLandscapingBend";
import SSR_BendEastSideLandscaping from "./pages/service-areas/BendEastSideLandscaping";
import SSR_LawnFungusTreatmentBend from "./pages/resources/LawnFungusTreatmentBend";
import SSR_FaqRetainingWallBend from "./pages/resources/FaqRetainingWallBend";
import SSR_TerrebonneLandscapingHub from "./pages/service-areas/TerrebonneLandscapingHub";
import SSR_ShevlinMeadowsLandscaping from "./pages/service-areas/ShevlinMeadowsLandscaping";
import SSR_SunriverLandscapingHub from "./pages/service-areas/SunriverLandscapingHub";
import SSR_IrrigationAlfalfa from "./pages/service-areas/IrrigationAlfalfa";
import SSR_PaverPatioCrookedRiverRanch from "./pages/service-areas/PaverPatioCrookedRiverRanch";
import SSR_HowToInstallDripIrrigationBend from "./pages/resources/HowToInstallDripIrrigationBend";
import SSR_XeriscapeTumalo from "./pages/service-areas/XeriscapeTumalo";
import SSR_PaverPatioAlfalfa from "./pages/service-areas/PaverPatioAlfalfa";
import SSR_SprinklerSystemRedmond from "./pages/service-areas/SprinklerSystemRedmond";
import SSR_HunnellRoadAreaLandscaping from "./pages/service-areas/HunnellRoadAreaLandscaping";
import SSR_DrainageSolutionsCostBend from "./pages/resources/DrainageSolutionsCostBend";
import SSR_SprinklerSystemSunriver from "./pages/service-areas/SprinklerSystemSunriver";
import SSR_FallLandscapingGuideBend from "./pages/resources/FallLandscapingGuideBend";
import SSR_LavaButteAreaLandscaping from "./pages/service-areas/LavaButteAreaLandscaping";
import SSR_NortheastBendLandscaping from "./pages/service-areas/NortheastBendLandscaping";
import SSR_WhenToPlantBendOregon from "./pages/resources/WhenToPlantBendOregon";
import SSR_BoulderLandscapingCostBend from "./pages/resources/BoulderLandscapingCostBend";
import SSR_CrookedRiverRanchLandscapingHub from "./pages/service-areas/CrookedRiverRanchLandscapingHub";
import SSR_DrivewayPaverCostBend from "./pages/resources/DrivewayPaverCostBend";
import SSR_PergolaCostBend from "./pages/resources/PergolaCostBend";
import SSR_SprinklerSystemPrineville from "./pages/service-areas/SprinklerSystemPrineville";
import SSR_IrrigationRepairCostBend from "./pages/resources/IrrigationRepairCostBend";
import SSR_BrownLawnBendOregon from "./pages/resources/BrownLawnBendOregon";
import SSR_FaqPaverPatioBend from "./pages/resources/FaqPaverPatioBend";
import SSR_XeriscapeLaPine from "./pages/service-areas/XeriscapeLaPine";
import SSR_LawnCareCulver from "./pages/service-areas/LawnCareCulver";
import SSR_LawnCareTumalo from "./pages/service-areas/LawnCareTumalo";
import SSR_LandscapeLightingCostBend2 from "./pages/resources/LandscapeLightingCostBend2";
import SSR_LandscapeDesignSisters from "./pages/service-areas/LandscapeDesignSisters";
import SSR_BestPlantsXeriscapeCentralOregon from "./pages/resources/BestPlantsXeriscapeCentralOregon";
import SSR_BendLandscapingCompanyGuide from "./pages/resources/BendLandscapingCompanyGuide";
import SSR_XeriscapeSisters from "./pages/service-areas/XeriscapeSisters";
import SSR_CommercialLandscapingCostBend from "./pages/resources/CommercialLandscapingCostBend";
import SSR_SprinklerSystemSisters from "./pages/service-areas/SprinklerSystemSisters";
import SSR_ShevlinParkAreaLandscaping from "./pages/service-areas/ShevlinParkAreaLandscaping";
import SSR_PaverPatioSisters from "./pages/service-areas/PaverPatioSisters";
import SSR_XeriscapeSunriver from "./pages/service-areas/XeriscapeSunriver";
import SSR_SummitWestLandscaping from "./pages/service-areas/SummitWestLandscaping";

function Router() {
  // make sure to consider if you need authentication for certain routes
  return (
    <Suspense fallback={<div />}>
    <Switch>
      {/* Core SEO Sub-pages */}
      <Route path={"/paver-patios-bend/concrete-pavers"} component={ConcretePaversBend} />
      <Route path={"/landscape-design-bend/hoa-design"} component={HOALandscapeDesignBend} />
      <Route path={"/landscape-design-bend/modern-design"} component={ModernLandscapeDesignBend} />

      {/* Core SEO Landing Pages */}
      <Route path={"/landscaping-bend-oregon"} component={LandscapingBendOregon} />
      <Route path={"/paver-patios-bend"} component={PaverPatiosBend} />
      <Route path={"/irrigation-bend-oregon"} component={IrrigationBendOregon} />
      <Route path={"/landscape-design-bend"} component={LandscapeDesignBend} />
      <Route path={"/commercial-landscaping-bend"} component={CommercialLandscapingBendSeo} />

      {/* Main pages */}
      <Route path={"/"} component={Home} />
      <Route path={"/about"} component={About} />
      <Route path={"/commercial"} component={Commercial} />
      <Route path={"/maintenance"} component={Maintenance} />
      <Route path={"/services"} component={Services} />
      <Route path={"/install"} component={Services} />
      <Route path={"/our-work"} component={OurWork} />
      <Route path={"/contact"} component={Contact} />
      <Route path={"/blog"} component={Blog} />
      <Route path={"/resources"} component={Resources} />
      <Route path={"/service-areas"} component={ServiceAreas} />
      <Route path={"/bend-neighborhoods"} component={BendNeighborhoods} />
      <Route path={"/privacy-policy"} component={PrivacyPolicy} />
      <Route path={"/membership"} component={Membership} />
      <Route path={"/terms"} component={Terms} />

      {/* Maintenance sub-pages */}
      <Route path={"/services/lawn-service"} component={LawnService} />
      <Route path={"/services/commercial-maintenance"} component={CommercialMaintenance} />
      <Route path={"/maintenance/commercial-hoa"} component={CommercialHOAMaintenance} />
      <Route path={"/services/aeration"} component={Aeration} />
      <Route path={"/services/sprinkler-activation"} component={SprinklerActivation} />
      <Route path={"/services/sprinkler-blowout"} component={SprinklerBlowout} />
      <Route path={"/services/snow-removal"} component={SnowRemoval} />
      <Route path={"/services/lawn-fungus"} component={LawnFungus} />

      {/* Installation / service sub-pages */}
      <Route path={"/services/landscape-design"} component={LandscapeDesign} />
      <Route path={"/services/irrigation"} component={Irrigation} />
      <Route path={"/services/sprinkler-repair"} component={SprinklerRepair} />
      <Route path={"/services/pavers"} component={Pavers} />
      <Route path={"/services/water-features"} component={WaterFeatures} />
      <Route path={"/services/outdoor-living"} component={OutdoorLiving} />
      <Route path={"/services/decks"} component={Decks} />
      <Route path={"/services/fire-features"} component={FireFeatures} />
      <Route path={"/services/landscape-lighting"} component={LandscapeLighting} />
      <Route path={"/services/xeriscaping"} component={Xeriscaping} />
      <Route path={"/services/retaining-walls"} component={RetainingWalls} />
      <Route path={"/services/drainage"} component={Drainage} />
      <Route path={"/services/firewise-landscaping"} component={FirewiseLandscaping} />
      <Route path={"/firewise-landscaping-bend-oregon"} component={FirewiseLandingPage} />

      {/* Careers */}
      <Route path={"/careers"} component={Careers} />

      {/* Game */}
      <Route path={"/game"} component={LawnMowerDash} />

      {/* City landing pages */}
      <Route path={"/landscaping/bend"} component={BendPage} />
      <Route path={"/landscaping/redmond"} component={RedmondPage} />
      <Route path={"/landscaping/sisters"} component={SistersPage} />
      <Route path={"/landscaping/sunriver"} component={SunriverPage} />
      <Route path={"/landscaping/tumalo"} component={TumaloPage} />
      <Route path={"/landscaping/prineville"} component={PrinevillePage} />
      <Route path={"/landscaping/la-pine"} component={LaPinePage} />
      <Route path={"/landscaping/madras"} component={MadrasPage} />
      <Route path={"/landscaping/eagle-crest"} component={EagleCrestPage} />
      <Route path={"/landscaping/powell-butte"} component={PowellButtePage} />
      <Route path={"/landscaping/terrebonne"} component={TerrebonnePage} />
      <Route path={"/landscaping/crooked-river-ranch"} component={CrookedRiverRanchPage} />
      <Route path={"/landscaping/alfalfa"} component={AlfalfaPage} />
      <Route path={"/landscaping/cline-falls"} component={ClineFallsPage} />

      {/* Blog posts */}
      <Route path={"/blog/climate-change-landscaping"} component={ClimateChange} />
      <Route path={"/blog/seasonal-landscaping-guide"} component={SeasonalGuide} />
      <Route path={"/blog/xeriscape-landscaping-bend-oregon"} component={XeriscapeBend} />
      <Route path={"/blog/sprinkler-winterization-bend-oregon"} component={SprinklerWinterizationBend} />
      <Route path={"/blog/paver-patio-ideas-bend-oregon"} component={PaverPatioIdeasBend} />
      <Route path={"/blog/lawn-care-bend-oregon"} component={LawnCareBendOregon} />

      {/* Portfolio project pages */}
      <Route path={"/portfolio/awbrey-butte-xeriscape"} component={AwbreyButteXeriscape} />
      <Route path={"/portfolio/awbrey-glenn-flagstone"} component={AwbreyGlennFlagstone} />
      <Route path={"/portfolio/backyard-renovation"} component={BackyardRenovation} />
      <Route path={"/portfolio/broken-top-water-feature"} component={BrokenTopWaterFeature} />
      <Route path={"/portfolio/broken-top-xeriscape"} component={BrokenTopXeriscape} />
      <Route path={"/portfolio/century-drive"} component={CenturyDrive} />
      <Route path={"/portfolio/east-bend-landscape"} component={EastBendLandscape} />
      <Route path={"/portfolio/nw-bend-backyard"} component={NWBendBackyard} />
      <Route path={"/portfolio/paver-patio-firepit"} component={PaverPatioFirepit} />
      <Route path={"/portfolio/sw-bend-backyard"} component={SWBendBackyard} />
      <Route path={"/portfolio/bend-full-yard-transformation"} component={BendFullYardTransformation} />
      <Route path={"/portfolio/awbrey-butte-patio"} component={AwbreyButtePatio} />
      <Route path={"/portfolio/nw-bend-lighting"} component={NWBendLighting} />
      <Route path={"/portfolio/westside-outdoor-living"} component={WestsideOutdoorLiving} />

      {/* SEO Resource pages */}
      <Route path={"/resources/deck-cost-bend-oregon"} component={DeckCostBend} />
      <Route path={"/resources/paver-patio-cost-bend-oregon"} component={PaverPatioCostBend} />
      <Route path={"/resources/sprinkler-system-cost-bend-oregon"} component={SprinklerSystemCostBend} />
      <Route path={"/resources/xeriscape-cost-bend-oregon"} component={XeriscapeCostBend} />
      <Route path={"/resources/landscape-design-cost-bend-oregon"} component={LandscapeDesignCostBend} />
      <Route path={"/resources/retaining-wall-cost-bend-oregon"} component={RetainingWallCostBend} />
      <Route path={"/resources/sod-installation-cost-bend-oregon"} component={SodInstallationCostBend} />
      <Route path={"/resources/outdoor-lighting-cost-bend-oregon"} component={OutdoorLightingCostBend} />
      <Route path={"/resources/water-feature-cost-bend-oregon"} component={WaterFeatureCostBend} />
      <Route path={"/resources/lawn-maintenance-cost-bend-oregon"} component={LawnMaintenanceCostBend} />
      <Route path={"/resources/fire-pit-patio-cost-bend-oregon"} component={FirePitPatioCostBend} />
      <Route path={"/resources/best-plants-central-oregon-xeriscape"} component={BestPlantsXeriscapeCentralOregon} />
      <Route path={"/resources/when-to-aerate-lawn-bend-oregon"} component={WhenToAerateLawnBend} />
      <Route path={"/resources/sprinkler-winterization-guide-bend"} component={SprinklerWinterizationGuideBend} />
      <Route path={"/resources/how-to-choose-landscaper-bend-oregon"} component={HowToChooseLandscaperBend} />
      <Route path={"/resources/bend-oregon-turf-rebate-program"} component={BendTurfRebateProgram} />
      <Route path={"/resources/irrigation-repair-bend-oregon"} component={IrrigationRepairBend} />
      <Route path={"/resources/commercial-landscaping-bend-oregon"} component={CommercialLandscapingBend} />
      <Route path={"/resources/snow-removal-bend-oregon"} component={SnowRemovalBendResource} />
      <Route path={"/resources/landscape-lighting-bend-oregon"} component={LandscapeLightingBend} />

      {/* SEO Neighborhood / Service Area pages */}
      <Route path={"/service-areas/awbrey-butte-landscaping"} component={AwbreyButteNeighborhood} />
      <Route path={"/service-areas/northwest-crossing-landscaping"} component={NorthwestCrossingNeighborhood} />
      <Route path={"/service-areas/broken-top-landscaping"} component={BrokenTopNeighborhood} />
      <Route path={"/service-areas/discovery-west-landscaping"} component={DiscoveryWestNeighborhood} />
      <Route path={"/service-areas/sunriver-landscaping"} component={SunriverLandscaping} />
      <Route path={"/service-areas/redmond-landscaping"} component={RedmondLandscaping} />
      <Route path={"/service-areas/powell-butte-landscaping"} component={PowellButteNeighborhood} />
      <Route path={"/service-areas/eagle-crest-landscaping"} component={EagleCrestNeighborhood} />

      {/* New SEO Resource Pages */}
      <Route path={"/resources/hoa-landscaping-bend-oregon"} component={SSR_BendHOALandscaping} />
      <Route path={"/resources/landscape-transformation-bend-oregon"} component={SSR_BendLandscapeBeforeAfter} />
      <Route path={"/resources/landscape-design-ideas-bend-oregon"} component={SSR_BendLandscapeDesignIdeas} />
      <Route path={"/resources/landscape-maintenance-plan-bend-oregon"} component={SSR_BendLandscapeMaintenancePlan} />
      <Route path={"/resources/landscape-warranty-bend-oregon"} component={SSR_BendLandscapeWarranty} />
      <Route path={"/resources/landscaping-company-bend-oregon"} component={SSR_BendLandscapingCompanyGuide} />
      <Route path={"/resources/landscaping-cost-guide-bend-oregon"} component={SSR_BendLandscapingCostGuide} />
      <Route path={"/resources/landscaping-seasons-bend-oregon"} component={SSR_BendLandscapingSeasons} />
      <Route path={"/resources/landscaping-tips-bend-oregon"} component={SSR_BendLandscapingTips} />
      <Route path={"/resources/new-construction-landscaping-bend-oregon"} component={SSR_BendNewConstructionLandscaping} />
      <Route path={"/resources/landscaping-home-value-bend-oregon"} component={SSR_BendPropertyValueLandscaping} />
      <Route path={"/resources/bend-turf-rebate-program"} component={SSR_BendTurfRebateProgram} />
      <Route path={"/resources/best-plants-xeriscape-central-oregon"} component={SSR_BestPlantsXeriscapeCentralOregon} />
      <Route path={"/resources/boulder-landscaping-cost-bend-oregon"} component={SSR_BoulderLandscapingCostBend} />
      <Route path={"/resources/central-oregon-landscaping-guide"} component={SSR_CentralOregonLandscapingGuide} />
      <Route path={"/resources/drainage-solutions-cost-bend-oregon"} component={SSR_DrainageSolutionsCostBend} />
      <Route path={"/resources/drip-vs-spray-irrigation-bend-oregon"} component={SSR_DripVsSprayIrrigationBend} />
      <Route path={"/resources/driveway-paver-cost-bend-oregon"} component={SSR_DrivewayPaverCostBend} />
      <Route path={"/resources/fall-landscaping-guide-bend-oregon"} component={SSR_FallLandscapingGuideBend} />
      <Route path={"/resources/faq-irrigation-bend-oregon"} component={SSR_FaqIrrigationBend} />
      <Route path={"/resources/faq-lawn-care-bend-oregon"} component={SSR_FaqLawnCareBend} />
      <Route path={"/resources/faq-outdoor-lighting-bend-oregon"} component={SSR_FaqOutdoorLightingBend} />
      <Route path={"/resources/faq-paver-patio-bend-oregon"} component={SSR_FaqPaverPatioBend} />
      <Route path={"/resources/faq-retaining-wall-bend-oregon"} component={SSR_FaqRetainingWallBend} />
      <Route path={"/resources/faq-snow-removal-bend-oregon"} component={SSR_FaqSnowRemovalBend} />
      <Route path={"/resources/faq-water-feature-bend-oregon"} component={SSR_FaqWaterFeatureBend} />
      <Route path={"/resources/faq-xeriscape-bend-oregon"} component={SSR_FaqXeriscapeBend} />
      <Route path={"/resources/fencing-cost-bend-oregon"} component={SSR_FencingCostBend} />
      <Route path={"/resources/how-to-install-drip-irrigation-bend-oregon"} component={SSR_HowToInstallDripIrrigationBend} />
      <Route path={"/resources/how-to-maintain-paver-patio-bend-oregon"} component={SSR_HowToMaintainPaverPatioBend} />
      <Route path={"/resources/how-to-plant-trees-bend-oregon"} component={SSR_HowToPlantTreesBend} />
      <Route path={"/resources/how-to-prevent-lawn-fungus-bend-oregon"} component={SSR_HowToPreventLawnFungusBend} />
      <Route path={"/resources/how-to-read-landscape-proposal-bend-oregon"} component={SSR_HowToReadLandscapeProposal} />
      <Route path={"/resources/understanding-soil-bend-oregon"} component={SSR_HowToReadSoilBend} />
      <Route path={"/resources/how-to-select-pavers-bend-oregon"} component={SSR_HowToSelectPaversBend} />
      <Route path={"/resources/how-to-water-lawn-bend-oregon"} component={SSR_HowToWaterLawnBend} />
      <Route path={"/resources/how-to-xeriscape-bend-oregon"} component={SSR_HowToXeriscapeBend} />
      <Route path={"/resources/landscape-lighting-cost-bend-oregon"} component={SSR_LandscapeLightingCostBend2} />
      <Route path={"/resources/landscaping-bend-oregon"} component={SSR_LandscapingBendOregonGuide} />
      <Route path={"/resources/mulch-installation-cost-bend-oregon"} component={SSR_MulchInstallationCostBend} />
      <Route path={"/resources/native-vs-adapted-plants-bend-oregon"} component={SSR_NativeVsAdaptedPlantsBend} />
      <Route path={"/resources/outdoor-kitchen-cost-bend-oregon"} component={SSR_OutdoorKitchenCostBend} />
      <Route path={"/resources/paver-walkway-cost-bend-oregon"} component={SSR_PaverPatioCostBend2} />
      <Route path={"/resources/pavers-vs-concrete-bend-oregon"} component={SSR_PaversVsConcreteBend} />
      <Route path={"/resources/perennial-garden-cost-bend-oregon"} component={SSR_PerennialGardenCostBend} />
      <Route path={"/resources/pergola-cost-bend-oregon"} component={SSR_PergolaCostBend} />
      <Route path={"/resources/professional-vs-diy-landscaping-bend-oregon"} component={SSR_ProfessionalVsDIYLandscapingBend} />
      <Route path={"/resources/sod-vs-seed-bend-oregon"} component={SSR_SodVsSeedBend} />
      <Route path={"/resources/spring-landscaping-guide-bend-oregon"} component={SSR_SpringLandscapingGuideBend} />
      <Route path={"/resources/sprinkler-winterization-guide-bend-oregon"} component={SSR_SprinklerWinterizationGuideBend} />
      <Route path={"/resources/summer-landscaping-guide-bend-oregon"} component={SSR_SummerLandscapingGuideBend} />
      <Route path={"/resources/tree-removal-cost-bend-oregon"} component={SSR_TreeRemovalCostBend} />
      <Route path={"/resources/winter-landscaping-guide-bend-oregon"} component={SSR_WinterLandscapingGuideBend} />
      <Route path={"/resources/xeriscape-vs-traditional-lawn-bend-oregon"} component={SSR_XeriscapeVsTraditionalLawnBend} />
      <Route path={"/resources/best-grass-bend-oregon"} component={SSR_BestGrassBendOregon} />
      <Route path={"/resources/when-to-plant-bend-oregon"} component={SSR_WhenToPlantBendOregon} />
      <Route path={"/resources/brown-lawn-bend-oregon"} component={SSR_BrownLawnBendOregon} />
      {/* Fire-Wise Landscaping Resources */}
      <Route path={"/resources/defensible-space-bend-oregon"} component={SSR_DefensibleSpaceBendOregon} />
      <Route path={"/resources/deschutes-county-fire-hardening-requirements"} component={SSR_DeschutesFireHardeningR327} />
      <Route path={"/resources/fire-resistant-plants-central-oregon"} component={SSR_FireResistantPlantsCentralOregon} />
      <Route path={"/resources/juniper-removal-bend-oregon"} component={SSR_JuniperRemovalBendOregon} />
      {/* Water-Wise Landscaping */}
      <Route path={"/services/water-wise-landscaping"} component={SSR_WaterWiseLandscapingService} />
      <Route path={"/resources/bend-watering-restrictions"} component={SSR_BendWateringRestrictions} />
      <Route path={"/resources/bend-turf-replacement-rebate"} component={SSR_BendTurfReplacementRebate} />
      <Route path={"/resources/water-wise-landscaping-bend-oregon"} component={SSR_WaterWiseLandscapingBend} />
      <Route path={"/resources/waterwise-communities-bend-hoa"} component={SSR_WaterWiseCommunitiesBend} />
      {/* New Service Area Pages */}
      <Route path={"/service-areas/bend-country-club-landscaping"} component={SSR_BendCountryClubLandscaping} />
      <Route path={"/service-areas/bend-east-side-landscaping"} component={SSR_BendEastSideLandscaping} />
      <Route path={"/service-areas/bend-south-landscaping"} component={SSR_BendSouthLandscaping} />
      <Route path={"/service-areas/bend-westside-landscaping"} component={SSR_BendWestsideLandscaping} />
      <Route path={"/service-areas/brookswood-landscaping"} component={SSR_BrookswoodLandscaping} />
      <Route path={"/service-areas/broken-top-landscaping"} component={SSR_BrokenTopLandscaping} />
      <Route path={"/service-areas/nw-crossing-landscaping"} component={SSR_NWCrossingLandscaping} />
      <Route path={"/service-areas/century-drive-corridor-landscaping"} component={SSR_CenturyDriveCorridorLandscaping} />
      <Route path={"/service-areas/crooked-river-ranch"} component={SSR_CrookedRiverRanchLandscapingHub} />
      <Route path={"/service-areas/culver"} component={SSR_CulverLandscapingHub} />
      <Route path={"/service-areas/deschutes-river-woods-landscaping"} component={SSR_DeschutesRiverWoodsLandscaping} />
      <Route path={"/service-areas/hunnell-road-area-landscaping"} component={SSR_HunnellRoadAreaLandscaping} />
      <Route path={"/service-areas/alfalfa-irrigation"} component={SSR_IrrigationAlfalfa} />
      <Route path={"/service-areas/crooked-river-ranch-irrigation"} component={SSR_IrrigationCrookedRiverRanch} />
      <Route path={"/service-areas/culver-irrigation"} component={SSR_IrrigationCulver} />
      <Route path={"/service-areas/madras-irrigation"} component={SSR_IrrigationMadras} />
      <Route path={"/service-areas/powell-butte-irrigation"} component={SSR_IrrigationPowellButte} />
      <Route path={"/service-areas/terrebonne-irrigation"} component={SSR_IrrigationTerrebonne} />
      <Route path={"/service-areas/la-pine"} component={SSR_LaPineLandscapingHub} />
      <Route path={"/service-areas/la-pine-landscape-design"} component={SSR_LandscapeDesignLaPine} />
      <Route path={"/service-areas/prineville-landscape-design"} component={SSR_LandscapeDesignPrineville} />
      <Route path={"/service-areas/redmond-landscape-design"} component={SSR_LandscapeDesignRedmond} />
      <Route path={"/service-areas/sisters-landscape-design"} component={SSR_LandscapeDesignSisters} />
      <Route path={"/service-areas/sunriver-landscape-design"} component={SSR_LandscapeDesignSunriver} />
      <Route path={"/service-areas/tumalo-landscape-design"} component={SSR_LandscapeDesignTumalo} />
      <Route path={"/service-areas/larkspur-landscaping"} component={SSR_LarkspurLandscaping} />
      <Route path={"/service-areas/lava-butte-area-landscaping"} component={SSR_LavaButteAreaLandscaping} />
      <Route path={"/service-areas/alfalfa-lawn-care"} component={SSR_LawnCareAlfalfa} />
      <Route path={"/service-areas/crooked-river-ranch-lawn-care"} component={SSR_LawnCareCrookedRiverRanch} />
      <Route path={"/service-areas/culver-lawn-care"} component={SSR_LawnCareCulver} />
      <Route path={"/service-areas/la-pine-lawn-care"} component={SSR_LawnCareLaPine} />
      <Route path={"/service-areas/madras-lawn-care"} component={SSR_LawnCareMadras} />
      <Route path={"/service-areas/powell-butte-lawn-care"} component={SSR_LawnCarePowellButte} />
      <Route path={"/service-areas/prineville-lawn-care"} component={SSR_LawnCarePrineville} />
      <Route path={"/service-areas/redmond-lawn-care"} component={SSR_LawnCareRedmond} />
      <Route path={"/service-areas/sisters-lawn-care"} component={SSR_LawnCareSisters} />
      <Route path={"/service-areas/sunriver-lawn-care"} component={SSR_LawnCareSunriver} />
      <Route path={"/service-areas/terrebonne-lawn-care"} component={SSR_LawnCareTerrebonne} />
      <Route path={"/service-areas/tumalo-lawn-care"} component={SSR_LawnCareTumalo} />
      <Route path={"/service-areas/madras"} component={SSR_MadrasLandscapingHub} />
      <Route path={"/service-areas/murphy-road-area-landscaping"} component={SSR_MurphyRoadAreaLandscaping} />
      <Route path={"/service-areas/northeast-bend-landscaping"} component={SSR_NortheastBendLandscaping} />
      <Route path={"/service-areas/old-mill-district-landscaping"} component={SSR_OldMillDistrictLandscaping} />
      <Route path={"/service-areas/orion-greens-landscaping"} component={SSR_OrionGreensLandscaping} />
      <Route path={"/service-areas/alfalfa-paver-patio"} component={SSR_PaverPatioAlfalfa} />
      <Route path={"/service-areas/crooked-river-ranch-paver-patio"} component={SSR_PaverPatioCrookedRiverRanch} />
      <Route path={"/service-areas/culver-paver-patio"} component={SSR_PaverPatioCulver} />
      <Route path={"/service-areas/la-pine-paver-patio"} component={SSR_PaverPatioLaPine} />
      <Route path={"/service-areas/madras-paver-patio"} component={SSR_PaverPatioMadras} />
      <Route path={"/service-areas/powell-butte-paver-patio"} component={SSR_PaverPatioPowellButte} />
      <Route path={"/service-areas/prineville-paver-patio"} component={SSR_PaverPatioPrineville} />
      <Route path={"/service-areas/redmond-paver-patio"} component={SSR_PaverPatioRedmond} />
      <Route path={"/service-areas/sisters-paver-patio"} component={SSR_PaverPatioSisters} />
      <Route path={"/service-areas/sunriver-paver-patio"} component={SSR_PaverPatioSunriver} />
      <Route path={"/service-areas/decks-bend-oregon"} component={DecksBend} />
      <Route path={"/service-areas/decks-redmond-oregon"} component={DecksRedmond} />
      <Route path={"/service-areas/decks-sisters-oregon"} component={DecksSisters} />
      <Route path={"/service-areas/decks-sunriver-oregon"} component={DecksSunriver} />
      <Route path={"/service-areas/terrebonne-paver-patio"} component={SSR_PaverPatioTerrebonne} />
      <Route path={"/service-areas/tumalo-paver-patio"} component={SSR_PaverPatioTumalo} />
      <Route path={"/service-areas/prineville"} component={SSR_PrinevilleLandscapingHub} />
      <Route path={"/service-areas/redmond"} component={SSR_RedmondLandscapingHub} />
      <Route path={"/service-areas/river-west-landscaping"} component={SSR_RiverWestLandscaping} />
      <Route path={"/service-areas/shevlin-meadows-landscaping"} component={SSR_ShevlinMeadowsLandscaping} />
      <Route path={"/service-areas/shevlin-park-area-landscaping"} component={SSR_ShevlinParkAreaLandscaping} />
      <Route path={"/service-areas/sisters"} component={SSR_SistersLandscapingHub} />
      <Route path={"/service-areas/skyline-ranch-landscaping"} component={SSR_SkylineRanchLandscaping} />
      <Route path={"/service-areas/southeast-bend-landscaping"} component={SSR_SoutheastBendLandscaping} />
      <Route path={"/service-areas/la-pine-sprinkler-system"} component={SSR_SprinklerSystemLaPine} />
      <Route path={"/service-areas/prineville-sprinkler-system"} component={SSR_SprinklerSystemPrineville} />
      <Route path={"/service-areas/redmond-sprinkler-system"} component={SSR_SprinklerSystemRedmond} />
      <Route path={"/service-areas/sisters-sprinkler-system"} component={SSR_SprinklerSystemSisters} />
      <Route path={"/service-areas/sunriver-sprinkler-system"} component={SSR_SprinklerSystemSunriver} />
      <Route path={"/service-areas/tumalo-sprinkler-system"} component={SSR_SprinklerSystemTumalo} />
      <Route path={"/service-areas/summit-west-landscaping"} component={SSR_SummitWestLandscaping} />
      <Route path={"/service-areas/sunriver"} component={SSR_SunriverLandscapingHub} />
      <Route path={"/service-areas/terrebonne"} component={SSR_TerrebonneLandscapingHub} />
      <Route path={"/service-areas/tetherow-landscaping"} component={SSR_TetherowLandscaping} />
      <Route path={"/service-areas/woodriver-village-landscaping"} component={SSR_WoodriverVillageLandscaping} />
      <Route path={"/service-areas/la-pine-xeriscape"} component={SSR_XeriscapeLaPine} />
      <Route path={"/service-areas/prineville-xeriscape"} component={SSR_XeriscapePrineville} />
      <Route path={"/service-areas/redmond-xeriscape"} component={SSR_XeriscapeRedmond} />
      <Route path={"/service-areas/sisters-xeriscape"} component={SSR_XeriscapeSisters} />
      <Route path={"/service-areas/sunriver-xeriscape"} component={SSR_XeriscapeSunriver} />
      <Route path={"/service-areas/tumalo-xeriscape"} component={SSR_XeriscapeTumalo} />
      {/* Resource pages */}
      <Route path={"/resources/natural-stone-vs-concrete-pavers-bend-oregon"} component={NaturalStoneVsConcretePayersBend} />
      <Route path={"/resources/gas-vs-propane-fire-pit-bend-oregon"} component={GasVsPropaneFirePitBend} />
      <Route path={"/resources/irrigation-faq-bend-oregon"} component={IrrigationFAQBend} />
      <Route path={"/resources/paver-patio-faq-bend-oregon"} component={PaverFAQBend} />
      <Route path={"/resources/xeriscape-faq-bend-oregon"} component={XeriscapeFAQBend} />
      <Route path={"/resources/lawn-care-cost-bend-oregon"} component={SSR_LawnCareCostBend} />
      <Route path={"/resources/lawn-aeration-cost-bend-oregon"} component={SSR_AerationCostBend} />
      <Route path={"/resources/backflow-preventer-testing-bend-oregon"} component={SSR_BackflowTestingBend} />
      <Route path={"/resources/snow-removal-cost-bend-oregon"} component={SSR_SnowRemovalCostBend} />
      <Route path={"/resources/irrigation-repair-cost-bend-oregon"} component={SSR_IrrigationRepairCostBend} />
      <Route path={"/resources/commercial-landscaping-cost-bend-oregon"} component={SSR_CommercialLandscapingCostBend} />
      <Route path={"/resources/lawn-fungus-treatment-bend-oregon"} component={SSR_LawnFungusTreatmentBend} />
      {/* Opt-Out Program */}
      <Route path={"/opt-out"} component={OptOut} />
      {/* Quick Quote */}
      <Route path={"/quote"} component={() => <QuoteRequest source="quote-page" />} />
      <Route path={"/get-a-quote"} component={() => <QuoteRequest source="get-a-quote" />} />
      {/* Schedule Services + Admin */}
      <Route path={"/schedule-services"} component={ScheduleServices} />
      <Route path={"/admin/submissions"} component={AdminSubmissions} />
      <Route path={"/admin/daily-pulse"} component={DailyPulse} />
      <Route path={"/admin/lead-trends"} component={LeadVolumeTrends} />
      <Route path={"/admin/csv-import"} component={CsvImport} />
      <Route path={"/admin/reminders"} component={Reminders} />
      <Route path={"/admin/opt-out-requests"} component={AdminOptOutRequests} />
      <Route path={"/admin/quote-leads"} component={AdminQuoteLeads} />
      <Route path={"/admin/game-analytics"} component={GameAnalytics} />
      <Route path={"/admin/geo-intelligence"} component={GeoIntelligence} />

      {/* Fallback */}
      <Route path={"/admin/image-tracker"} component={ImageTracker} />
      <Route path={"/service-areas/old-bend-landscaping"} component={OldBendLandscaping} />
      <Route path={"/service-areas/redmond-pavers"} component={RedmondPavers} />
      <Route path={"/service-areas/redmond-irrigation"} component={RedmondIrrigation} />
      <Route path={"/service-areas/redmond-xeriscaping"} component={RedmondXeriscaping} />
      <Route path={"/service-areas/redmond-landscape-design"} component={RedmondLandscapeDesign} />
      <Route path={"/service-areas/redmond-lawn-service"} component={RedmondLawnService} />
      <Route path={"/service-areas/redmond-snow-removal"} component={RedmondSnowRemoval} />
      <Route path={"/service-areas/sisters-pavers"} component={SistersPavers} />
      <Route path={"/service-areas/sisters-irrigation"} component={SistersIrrigation} />
      <Route path={"/service-areas/sisters-xeriscaping"} component={SistersXeriscaping} />
      <Route path={"/service-areas/sisters-landscape-design"} component={SistersLandscapeDesign} />
      <Route path={"/service-areas/sisters-lawn-service"} component={SistersLawnService} />
      <Route path={"/service-areas/sisters-snow-removal"} component={SistersSnowRemoval} />
      <Route path={"/service-areas/sunriver-pavers"} component={SunriverPavers} />
      <Route path={"/service-areas/sunriver-irrigation"} component={SunriverIrrigation} />
      <Route path={"/service-areas/sunriver-xeriscaping"} component={SunriverXeriscaping} />
      <Route path={"/service-areas/sunriver-landscape-design"} component={SunriverLandscapeDesign} />
      <Route path={"/service-areas/sunriver-lawn-service"} component={SunriverLawnService} />
      <Route path={"/service-areas/sunriver-snow-removal"} component={SunriverSnowRemoval} />
      <Route path={"/service-areas/la-pine-pavers"} component={LaPinePavers} />
      <Route path={"/service-areas/la-pine-irrigation"} component={LaPineIrrigation} />
      <Route path={"/service-areas/la-pine-xeriscaping"} component={LaPineXeriscaping} />
      <Route path={"/service-areas/la-pine-landscape-design"} component={LaPineLandscapeDesign} />
      <Route path={"/service-areas/la-pine-lawn-service"} component={LaPineLawnService} />
      <Route path={"/service-areas/la-pine-snow-removal"} component={LaPineSnowRemoval} />
      <Route path={"/service-areas/prineville-pavers"} component={PrinevillePavers} />
      <Route path={"/service-areas/prineville-irrigation"} component={PrinevilleIrrigation} />
      <Route path={"/service-areas/prineville-xeriscaping"} component={PrinevilleXeriscaping} />
      <Route path={"/service-areas/prineville-landscape-design"} component={PrinevilleLandscapeDesign} />
      <Route path={"/service-areas/prineville-lawn-service"} component={PrinevilleLawnService} />
      <Route path={"/service-areas/prineville-snow-removal"} component={PrinevilleSnowRemoval} />
      <Route path={"/service-areas/madras-pavers"} component={MadrasPavers} />
      <Route path={"/service-areas/madras-irrigation"} component={MadrasIrrigation} />
      <Route path={"/service-areas/madras-xeriscaping"} component={MadrasXeriscaping} />
      <Route path={"/service-areas/madras-landscape-design"} component={MadrasLandscapeDesign} />
      <Route path={"/service-areas/madras-lawn-service"} component={MadrasLawnService} />
      <Route path={"/service-areas/madras-snow-removal"} component={MadrasSnowRemoval} />
      <Route path={"/service-areas/tumalo-pavers"} component={TumaloPavers} />
      <Route path={"/service-areas/tumalo-irrigation"} component={TumaloIrrigation} />
      <Route path={"/service-areas/tumalo-xeriscaping"} component={TumaloXeriscaping} />
      <Route path={"/service-areas/tumalo-landscape-design"} component={TumaloLandscapeDesign} />
      <Route path={"/service-areas/tumalo-lawn-service"} component={TumaloLawnService} />
      <Route path={"/service-areas/tumalo-snow-removal"} component={TumaloSnowRemoval} />
      <Route path={"/service-areas/terrebonne-pavers"} component={TerrebonnePavers} />
      <Route path={"/service-areas/terrebonne-irrigation"} component={TerrebonneIrrigation} />
      <Route path={"/service-areas/terrebonne-xeriscaping"} component={TerrebonneXeriscaping} />
      <Route path={"/service-areas/terrebonne-landscape-design"} component={TerrebonneLandscapeDesign} />
      <Route path={"/service-areas/terrebonne-lawn-service"} component={TerrebonneLawnService} />
      <Route path={"/service-areas/terrebonne-snow-removal"} component={TerrebonneSnowRemoval} />
      <Route path={"/404"} component={NotFound} />
      <Route component={NotFound} />
    </Switch>
    </Suspense>
  );
}
function AppShell() {
  const [location] = useLocation();
  // Hide the floating CTA bar on pages that have their own CTAs or forms
  const hideCTABar = location.startsWith("/schedule-services") || location.startsWith("/admin") || location.startsWith("/quote") || location.startsWith("/get-a-quote");
  return (
    <>
      <ScrollToTop />
      {!hideCTABar && <MobileCTABar />}
      <Toaster />
      <Router />
    </>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <AppShell />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
