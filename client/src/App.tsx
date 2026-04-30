import { lazy, Suspense, useEffect } from 'react';
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
const ScheduleServices = lazy(() => import("./pages/ScheduleServices"));
const AdminSubmissions = lazy(() => import("./pages/AdminSubmissions"));
const DailyPulse = lazy(() => import("./pages/admin/DailyPulse"));
const LeadVolumeTrends = lazy(() => import("./pages/admin/LeadVolumeTrends"));
const CsvImport = lazy(() => import("./pages/admin/CsvImport"));
const GeoIntelligence = lazy(() => import("./pages/admin/GeoIntelligence"));
const Reminders = lazy(() => import("./pages/admin/Reminders"));
const AdminOptOutRequests = lazy(() => import("./pages/admin/AdminOptOutRequests"));
const QuoteRequest = lazy(() => import("./pages/QuoteRequest"));
const AdminQuoteLeads = lazy(() => import("./pages/admin/AdminQuoteLeads"));
const GameAnalytics = lazy(() => import("./pages/admin/GameAnalytics"));
const ImageTracker = lazy(() => import("./pages/admin/ImageTracker"));
const SmartScheduler = lazy(() => import("./pages/admin/SmartScheduler"));
const SalesReps = lazy(() => import("./pages/admin/SalesReps"));
const OptOut = lazy(() => import("./pages/OptOut"));
const LawnMowerDash = lazy(() => import("./pages/LawnMowerDash"));

// Main pages
const About = lazy(() => import("./pages/About"));
const Commercial = lazy(() => import("./pages/Commercial"));
const Maintenance = lazy(() => import("./pages/Maintenance"));
const Services = lazy(() => import("./pages/Services"));
const OurWork = lazy(() => import("./pages/OurWork"));
const Contact = lazy(() => import("./pages/Contact"));
const Blog = lazy(() => import("./pages/Blog"));
const Resources = lazy(() => import("./pages/Resources"));
const ServiceAreas = lazy(() => import("./pages/ServiceAreas"));
const BendNeighborhoods = lazy(() => import("./pages/BendNeighborhoods"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const Membership = lazy(() => import("./pages/Membership"));
const Terms = lazy(() => import("./pages/Terms"));
const Careers = lazy(() => import("./pages/Careers"));

// Maintenance sub-pages
const LawnService = lazy(() => import("./pages/services/LawnService"));
const CommercialMaintenance = lazy(() => import("./pages/services/CommercialMaintenance"));
const CommercialHOAMaintenance = lazy(() => import("./pages/maintenance/CommercialHOAMaintenance"));
const Aeration = lazy(() => import("./pages/services/Aeration"));
const SprinklerActivation = lazy(() => import("./pages/services/SprinklerActivation"));
const SprinklerBlowout = lazy(() => import("./pages/services/SprinklerBlowout"));
const SnowRemoval = lazy(() => import("./pages/services/SnowRemoval"));
const LawnFungus = lazy(() => import("./pages/services/LawnFungus"));

// Installation / service sub-pages
const LandscapeDesign = lazy(() => import("./pages/services/LandscapeDesign"));
const Irrigation = lazy(() => import("./pages/services/Irrigation"));
const SprinklerRepair = lazy(() => import("./pages/services/SprinklerRepair"));
const Pavers = lazy(() => import("./pages/services/Pavers"));
const WaterFeatures = lazy(() => import("./pages/services/WaterFeatures"));
const OutdoorLiving = lazy(() => import("./pages/services/OutdoorLiving"));
const FireFeatures = lazy(() => import("./pages/services/FireFeatures"));
const LandscapeLighting = lazy(() => import("./pages/services/LandscapeLighting"));
const Xeriscaping = lazy(() => import("./pages/services/Xeriscaping"));
const RetainingWalls = lazy(() => import("./pages/services/RetainingWalls"));
const Drainage = lazy(() => import("./pages/services/Drainage"));
const FirewiseLandscaping = lazy(() => import("./pages/services/FirewiseLandscaping"));
const FirewiseLandingPage = lazy(() => import("./pages/FirewiseLandingPage"));

// City landing pages
const BendPage = lazy(() => import("./pages/cities/Bend"));
const RedmondPage = lazy(() => import("./pages/cities/Redmond"));
const SistersPage = lazy(() => import("./pages/cities/Sisters"));
const SunriverPage = lazy(() => import("./pages/cities/Sunriver"));
const TumaloPage = lazy(() => import("./pages/cities/Tumalo"));
const PrinevillePage = lazy(() => import("./pages/cities/Prineville"));
const LaPinePage = lazy(() => import("./pages/cities/LaPine"));
const MadrasPage = lazy(() => import("./pages/cities/Madras"));
const EagleCrestPage = lazy(() => import("./pages/cities/EagleCrest"));
const PowellButtePage = lazy(() => import("./pages/cities/PowellButte"));
const TerrebonnePage = lazy(() => import("./pages/cities/Terrebonne"));
const CrookedRiverRanchPage = lazy(() => import("./pages/cities/CrookedRiverRanch"));
const AlfalfaPage = lazy(() => import("./pages/cities/Alfalfa"));
const ClineFallsPage = lazy(() => import("./pages/cities/ClineFalls"));

// Blog posts
const ClimateChange = lazy(() => import("./pages/blog/ClimateChange"));
const SeasonalGuide = lazy(() => import("./pages/blog/SeasonalGuide"));
const XeriscapeBend = lazy(() => import("./pages/blog/XeriscapeBend"));
const SprinklerWinterizationBend = lazy(() => import("./pages/blog/SprinklerWinterizationBend"));
const PaverPatioIdeasBend = lazy(() => import("./pages/blog/PaverPatioIdeasBend"));
const LawnCareBendOregon = lazy(() => import("./pages/blog/LawnCareBendOregon"));

// SEO Resource pages
const PaverPatioCostBend = lazy(() => import("./pages/resources/PaverPatioCostBend"));
const SprinklerSystemCostBend = lazy(() => import("./pages/resources/SprinklerSystemCostBend"));
const XeriscapeCostBend = lazy(() => import("./pages/resources/XeriscapeCostBend"));
const LandscapeDesignCostBend = lazy(() => import("./pages/resources/LandscapeDesignCostBend"));
const RetainingWallCostBend = lazy(() => import("./pages/resources/RetainingWallCostBend"));
const SodInstallationCostBend = lazy(() => import("./pages/resources/SodInstallationCostBend"));
const OutdoorLightingCostBend = lazy(() => import("./pages/resources/OutdoorLightingCostBend"));
const WaterFeatureCostBend = lazy(() => import("./pages/resources/WaterFeatureCostBend"));
const LawnMaintenanceCostBend = lazy(() => import("./pages/resources/LawnMaintenanceCostBend"));
const FirePitPatioCostBend = lazy(() => import("./pages/resources/FirePitPatioCostBend"));
const BestPlantsXeriscapeCentralOregon = lazy(() => import("./pages/resources/BestPlantsXeriscapeCentralOregon"));
const WhenToAerateLawnBend = lazy(() => import("./pages/resources/WhenToAerateLawnBend"));
const SprinklerWinterizationGuideBend = lazy(() => import("./pages/resources/SprinklerWinterizationGuideBend"));
const HowToChooseLandscaperBend = lazy(() => import("./pages/resources/HowToChooseLandscaperBend"));
const BendTurfRebateProgram = lazy(() => import("./pages/resources/BendTurfRebateProgram"));
const IrrigationRepairBend = lazy(() => import("./pages/resources/IrrigationRepairBend"));
const CommercialLandscapingBend = lazy(() => import("./pages/resources/CommercialLandscapingBend"));
const SnowRemovalBendResource = lazy(() => import("./pages/resources/SnowRemovalBend"));
const LandscapeLightingBend = lazy(() => import("./pages/resources/LandscapeLightingBend"));

// Core SEO sub-pages
const ConcretePaversBend = lazy(() => import("./pages/seo/ConcretePayersBend"));
const HOALandscapeDesignBend = lazy(() => import("./pages/seo/HOALandscapeDesignBend"));
const ModernLandscapeDesignBend = lazy(() => import("./pages/seo/ModernLandscapeDesignBend"));

// Core SEO landing pages
const LandscapingBendOregon = lazy(() => import("./pages/seo/LandscapingBendOregon"));
const PaverPatiosBend = lazy(() => import("./pages/seo/PaverPatiosBend"));
const IrrigationBendOregon = lazy(() => import("./pages/seo/IrrigationBendOregon"));
const LandscapeDesignBend = lazy(() => import("./pages/seo/LandscapeDesignBend"));
const CommercialLandscapingBendSeo = lazy(() => import("./pages/seo/CommercialLandscapingBend"));
const LandscapeInstallationBend = lazy(() => import("./pages/seo/LandscapeInstallationBend"));

// SEO Neighborhood / Service Area pages
const AwbreyButteNeighborhood = lazy(() => import("./pages/service-areas/AwbreyButteNeighborhood"));
const NorthwestCrossingNeighborhood = lazy(() => import("./pages/service-areas/NorthwestCrossingNeighborhood"));
const BrokenTopNeighborhood = lazy(() => import("./pages/service-areas/BrokenTopNeighborhood"));
const DiscoveryWestNeighborhood = lazy(() => import("./pages/service-areas/DiscoveryWestNeighborhood"));
const SunriverLandscaping = lazy(() => import("./pages/service-areas/SunriverLandscaping"));
const RedmondLandscaping = lazy(() => import("./pages/service-areas/RedmondLandscaping"));
const PowellButteNeighborhood = lazy(() => import("./pages/service-areas/PowellButteNeighborhood"));
const EagleCrestNeighborhood = lazy(() => import("./pages/service-areas/EagleCrestNeighborhood"));

// Portfolio project pages
const BendFullYardTransformation = lazy(() => import("./pages/portfolio/BendFullYardTransformation"));
const AwbreyButteXeriscape = lazy(() => import("./pages/portfolio/AwbreyButteXeriscape"));
const AwbreyGlennFlagstone = lazy(() => import("./pages/portfolio/AwbreyGlennFlagstone"));
const BackyardRenovation = lazy(() => import("./pages/portfolio/BackyardRenovation"));
const BrokenTopWaterFeature = lazy(() => import("./pages/portfolio/BrokenTopWaterFeature"));
const BrokenTopXeriscape = lazy(() => import("./pages/portfolio/BrokenTopXeriscape"));
const CenturyDrive = lazy(() => import("./pages/portfolio/CenturyDrive"));
const EastBendLandscape = lazy(() => import("./pages/portfolio/EastBendLandscape"));
const NWBendBackyard = lazy(() => import("./pages/portfolio/NWBendBackyard"));
const PaverPatioFirepit = lazy(() => import("./pages/portfolio/PaverPatioFirepit"));
const SWBendBackyard = lazy(() => import("./pages/portfolio/SWBendBackyard"));
const AwbreyButtePatio = lazy(() => import("./pages/portfolio/AwbreyButtePatio"));
const NWBendLighting = lazy(() => import("./pages/portfolio/NWBendLighting"));
const WestsideOutdoorLiving = lazy(() => import("./pages/portfolio/WestsideOutdoorLiving"));

// Lazy-loaded service-area pages (already lazy)
const RedmondPavers = lazy(() => import("@/pages/service-areas/RedmondPavers"));
const RedmondIrrigation = lazy(() => import("@/pages/service-areas/RedmondIrrigation"));
const RedmondXeriscaping = lazy(() => import("@/pages/service-areas/RedmondXeriscaping"));
const RedmondLandscapeDesign = lazy(() => import("@/pages/service-areas/RedmondLandscapeDesign"));
const RedmondLawnService = lazy(() => import("@/pages/service-areas/RedmondLawnService"));
const RedmondSnowRemoval = lazy(() => import("@/pages/service-areas/RedmondSnowRemoval"));
const SistersPavers = lazy(() => import("@/pages/service-areas/SistersPavers"));
const SistersIrrigation = lazy(() => import("@/pages/service-areas/SistersIrrigation"));
const SistersXeriscaping = lazy(() => import("@/pages/service-areas/SistersXeriscaping"));
const SistersLandscapeDesign = lazy(() => import("@/pages/service-areas/SistersLandscapeDesign"));
const SistersLawnService = lazy(() => import("@/pages/service-areas/SistersLawnService"));
const SistersSnowRemoval = lazy(() => import("@/pages/service-areas/SistersSnowRemoval"));
const SunriverPavers = lazy(() => import("@/pages/service-areas/SunriverPavers"));
const SunriverIrrigation = lazy(() => import("@/pages/service-areas/SunriverIrrigation"));
const SunriverXeriscaping = lazy(() => import("@/pages/service-areas/SunriverXeriscaping"));
const SunriverLandscapeDesign = lazy(() => import("@/pages/service-areas/SunriverLandscapeDesign"));
const SunriverLawnService = lazy(() => import("@/pages/service-areas/SunriverLawnService"));
const SunriverSnowRemoval = lazy(() => import("@/pages/service-areas/SunriverSnowRemoval"));
const LaPinePavers = lazy(() => import("@/pages/service-areas/LaPinePavers"));
const LaPineIrrigation = lazy(() => import("@/pages/service-areas/LaPineIrrigation"));
const LaPineXeriscaping = lazy(() => import("@/pages/service-areas/LaPineXeriscaping"));
const LaPineLandscapeDesign = lazy(() => import("@/pages/service-areas/LaPineLandscapeDesign"));
const LaPineLawnService = lazy(() => import("@/pages/service-areas/LaPineLawnService"));
const LaPineSnowRemoval = lazy(() => import("@/pages/service-areas/LaPineSnowRemoval"));
const PrinevillePavers = lazy(() => import("@/pages/service-areas/PrinevillePavers"));
const PrinevilleIrrigation = lazy(() => import("@/pages/service-areas/PrinevilleIrrigation"));
const PrinevilleXeriscaping = lazy(() => import("@/pages/service-areas/PrinevilleXeriscaping"));
const PrinevilleLandscapeDesign = lazy(() => import("@/pages/service-areas/PrinevilleLandscapeDesign"));
const PrinevilleLawnService = lazy(() => import("@/pages/service-areas/PrinevilleLawnService"));
const PrinevilleSnowRemoval = lazy(() => import("@/pages/service-areas/PrinevilleSnowRemoval"));
const MadrasPavers = lazy(() => import("@/pages/service-areas/MadrasPavers"));
const MadrasIrrigation = lazy(() => import("@/pages/service-areas/MadrasIrrigation"));
const MadrasXeriscaping = lazy(() => import("@/pages/service-areas/MadrasXeriscaping"));
const MadrasLandscapeDesign = lazy(() => import("@/pages/service-areas/MadrasLandscapeDesign"));
const MadrasLawnService = lazy(() => import("@/pages/service-areas/MadrasLawnService"));
const MadrasSnowRemoval = lazy(() => import("@/pages/service-areas/MadrasSnowRemoval"));
const TumaloPavers = lazy(() => import("@/pages/service-areas/TumaloPavers"));
const TumaloIrrigation = lazy(() => import("@/pages/service-areas/TumaloIrrigation"));
const TumaloXeriscaping = lazy(() => import("@/pages/service-areas/TumaloXeriscaping"));
const TumaloLandscapeDesign = lazy(() => import("@/pages/service-areas/TumaloLandscapeDesign"));
const TumaloLawnService = lazy(() => import("@/pages/service-areas/TumaloLawnService"));
const TumaloSnowRemoval = lazy(() => import("@/pages/service-areas/TumaloSnowRemoval"));
const TerrebonnePavers = lazy(() => import("@/pages/service-areas/TerrebonnePavers"));
const TerrebonneIrrigation = lazy(() => import("@/pages/service-areas/TerrebonneIrrigation"));
const TerrebonneXeriscaping = lazy(() => import("@/pages/service-areas/TerrebonneXeriscaping"));
const TerrebonneLandscapeDesign = lazy(() => import("@/pages/service-areas/TerrebonneLandscapeDesign"));
const TerrebonneLawnService = lazy(() => import("@/pages/service-areas/TerrebonneLawnService"));
const TerrebonneSnowRemoval = lazy(() => import("@/pages/service-areas/TerrebonneSnowRemoval"));
const NaturalStoneVsConcretePayersBend = lazy(() => import("@/pages/resources/NaturalStoneVsConcretePayersBend"));
const GasVsPropaneFirePitBend = lazy(() => import("@/pages/resources/GasVsPropaneFirePitBend"));
const OldBendLandscaping = lazy(() => import("@/pages/service-areas/OldBendLandscaping"));
const IrrigationFAQBend = lazy(() => import("@/pages/resources/IrrigationFAQBend"));
const PaverFAQBend = lazy(() => import("@/pages/resources/PaverFAQBend"));
const XeriscapeFAQBend = lazy(() => import('@/pages/resources/XeriscapeFAQBend'));

// Badge Scan System
const BadgeScan = lazy(() => import('./pages/BadgeScan'));
const AdminEmployees = lazy(() => import('./pages/admin/AdminEmployees'));
const AdminBadgeScans = lazy(() => import('./pages/admin/AdminBadgeScans'));
const AdminEmployeePayouts = lazy(() => import('./pages/admin/AdminEmployeePayouts'));

// Configuration & Users
const Configuration = lazy(() => import('./pages/admin/Configuration'));
const AdminUsers = lazy(() => import('./pages/admin/AdminUsers'));

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
      <Route path={"/landscape-installation-bend-oregon"} component={LandscapeInstallationBend} />

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
      <Route path={"/services/decks"} component={lazy(() => import('./pages/services/Decks'))} />
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
      <Route path={"/resources/deck-cost-bend-oregon"} component={lazy(() => import('./pages/resources/DeckCostBend'))} />
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
      <Route path={"/resources/hoa-landscaping-bend-oregon"} component={lazy(() => import('./pages/resources/BendHOALandscaping'))} />
      <Route path={"/resources/landscape-transformation-bend-oregon"} component={lazy(() => import('./pages/resources/BendLandscapeBeforeAfter'))} />
      <Route path={"/resources/landscape-design-ideas-bend-oregon"} component={lazy(() => import('./pages/resources/BendLandscapeDesignIdeas'))} />
      <Route path={"/resources/landscape-maintenance-plan-bend-oregon"} component={lazy(() => import('./pages/resources/BendLandscapeMaintenancePlan'))} />
      <Route path={"/resources/landscape-warranty-bend-oregon"} component={lazy(() => import('./pages/resources/BendLandscapeWarranty'))} />
      <Route path={"/resources/landscaping-company-bend-oregon"} component={lazy(() => import('./pages/resources/BendLandscapingCompanyGuide'))} />
      <Route path={"/resources/landscaping-cost-guide-bend-oregon"} component={lazy(() => import('./pages/resources/BendLandscapingCostGuide'))} />
      <Route path={"/resources/landscaping-seasons-bend-oregon"} component={lazy(() => import('./pages/resources/BendLandscapingSeasons'))} />
      <Route path={"/resources/landscaping-tips-bend-oregon"} component={lazy(() => import('./pages/resources/BendLandscapingTips'))} />
      <Route path={"/resources/new-construction-landscaping-bend-oregon"} component={lazy(() => import('./pages/resources/BendNewConstructionLandscaping'))} />
      <Route path={"/resources/landscaping-home-value-bend-oregon"} component={lazy(() => import('./pages/resources/BendPropertyValueLandscaping'))} />
      <Route path={"/resources/bend-turf-rebate-program"} component={lazy(() => import('./pages/resources/BendTurfRebateProgram'))} />
      <Route path={"/resources/best-plants-xeriscape-central-oregon"} component={lazy(() => import('./pages/resources/BestPlantsXeriscapeCentralOregon'))} />
      <Route path={"/resources/boulder-landscaping-cost-bend-oregon"} component={lazy(() => import('./pages/resources/BoulderLandscapingCostBend'))} />
      <Route path={"/resources/central-oregon-landscaping-guide"} component={lazy(() => import('./pages/resources/CentralOregonLandscapingGuide'))} />
      <Route path={"/resources/drainage-solutions-cost-bend-oregon"} component={lazy(() => import('./pages/resources/DrainageSolutionsCostBend'))} />
      <Route path={"/resources/drip-vs-spray-irrigation-bend-oregon"} component={lazy(() => import('./pages/resources/DripVsSprayIrrigationBend'))} />
      <Route path={"/resources/driveway-paver-cost-bend-oregon"} component={lazy(() => import('./pages/resources/DrivewayPaverCostBend'))} />
      <Route path={"/resources/fall-landscaping-guide-bend-oregon"} component={lazy(() => import('./pages/resources/FallLandscapingGuideBend'))} />
      <Route path={"/resources/faq-irrigation-bend-oregon"} component={lazy(() => import('./pages/resources/FaqIrrigationBend'))} />
      <Route path={"/resources/faq-lawn-care-bend-oregon"} component={lazy(() => import('./pages/resources/FaqLawnCareBend'))} />
      <Route path={"/resources/faq-outdoor-lighting-bend-oregon"} component={lazy(() => import('./pages/resources/FaqOutdoorLightingBend'))} />
      <Route path={"/resources/faq-paver-patio-bend-oregon"} component={lazy(() => import('./pages/resources/FaqPaverPatioBend'))} />
      <Route path={"/resources/faq-retaining-wall-bend-oregon"} component={lazy(() => import('./pages/resources/FaqRetainingWallBend'))} />
      <Route path={"/resources/faq-snow-removal-bend-oregon"} component={lazy(() => import('./pages/resources/FaqSnowRemovalBend'))} />
      <Route path={"/resources/faq-water-feature-bend-oregon"} component={lazy(() => import('./pages/resources/FaqWaterFeatureBend'))} />
      <Route path={"/resources/faq-xeriscape-bend-oregon"} component={lazy(() => import('./pages/resources/FaqXeriscapeBend'))} />
      <Route path={"/resources/fencing-cost-bend-oregon"} component={lazy(() => import('./pages/resources/FencingCostBend'))} />
      <Route path={"/resources/how-to-install-drip-irrigation-bend-oregon"} component={lazy(() => import('./pages/resources/HowToInstallDripIrrigationBend'))} />
      <Route path={"/resources/how-to-maintain-paver-patio-bend-oregon"} component={lazy(() => import('./pages/resources/HowToMaintainPaverPatioBend'))} />
      <Route path={"/resources/how-to-plant-trees-bend-oregon"} component={lazy(() => import('./pages/resources/HowToPlantTreesBend'))} />
      <Route path={"/resources/how-to-prevent-lawn-fungus-bend-oregon"} component={lazy(() => import('./pages/resources/HowToPreventLawnFungusBend'))} />
      <Route path={"/resources/how-to-read-landscape-proposal-bend-oregon"} component={lazy(() => import('./pages/resources/HowToReadLandscapeProposal'))} />
      <Route path={"/resources/understanding-soil-bend-oregon"} component={lazy(() => import('./pages/resources/HowToReadSoilBend'))} />
      <Route path={"/resources/how-to-select-pavers-bend-oregon"} component={lazy(() => import('./pages/resources/HowToSelectPaversBend'))} />
      <Route path={"/resources/how-to-water-lawn-bend-oregon"} component={lazy(() => import('./pages/resources/HowToWaterLawnBend'))} />
      <Route path={"/resources/how-to-xeriscape-bend-oregon"} component={lazy(() => import('./pages/resources/HowToXeriscapeBend'))} />
      <Route path={"/resources/landscape-lighting-cost-bend-oregon"} component={lazy(() => import('./pages/resources/LandscapeLightingCostBend2'))} />
      <Route path={"/resources/landscaping-bend-oregon"} component={lazy(() => import('./pages/resources/LandscapingBendOregonGuide'))} />
      <Route path={"/resources/mulch-installation-cost-bend-oregon"} component={lazy(() => import('./pages/resources/MulchInstallationCostBend'))} />
      <Route path={"/resources/native-vs-adapted-plants-bend-oregon"} component={lazy(() => import('./pages/resources/NativeVsAdaptedPlantsBend'))} />
      <Route path={"/resources/outdoor-kitchen-cost-bend-oregon"} component={lazy(() => import('./pages/resources/OutdoorKitchenCostBend'))} />
      <Route path={"/resources/paver-walkway-cost-bend-oregon"} component={lazy(() => import('./pages/resources/PaverPatioCostBend2'))} />
      <Route path={"/resources/pavers-vs-concrete-bend-oregon"} component={lazy(() => import('./pages/resources/PaversVsConcreteBend'))} />
      <Route path={"/resources/perennial-garden-cost-bend-oregon"} component={lazy(() => import('./pages/resources/PerennialGardenCostBend'))} />
      <Route path={"/resources/pergola-cost-bend-oregon"} component={lazy(() => import('./pages/resources/PergolaCostBend'))} />
      <Route path={"/resources/professional-vs-diy-landscaping-bend-oregon"} component={lazy(() => import('./pages/resources/ProfessionalVsDIYLandscapingBend'))} />
      <Route path={"/resources/sod-vs-seed-bend-oregon"} component={lazy(() => import('./pages/resources/SodVsSeedBend'))} />
      <Route path={"/resources/spring-landscaping-guide-bend-oregon"} component={lazy(() => import('./pages/resources/SpringLandscapingGuideBend'))} />
      <Route path={"/resources/sprinkler-winterization-guide-bend-oregon"} component={lazy(() => import('./pages/resources/SprinklerWinterizationGuideBend'))} />
      <Route path={"/resources/summer-landscaping-guide-bend-oregon"} component={lazy(() => import('./pages/resources/SummerLandscapingGuideBend'))} />
      <Route path={"/resources/tree-removal-cost-bend-oregon"} component={lazy(() => import('./pages/resources/TreeRemovalCostBend'))} />
      <Route path={"/resources/winter-landscaping-guide-bend-oregon"} component={lazy(() => import('./pages/resources/WinterLandscapingGuideBend'))} />
      <Route path={"/resources/xeriscape-vs-traditional-lawn-bend-oregon"} component={lazy(() => import('./pages/resources/XeriscapeVsTraditionalLawnBend'))} />
      <Route path={"/resources/best-grass-bend-oregon"} component={lazy(() => import('./pages/resources/BestGrassBendOregon'))} />
      <Route path={"/resources/when-to-plant-bend-oregon"} component={lazy(() => import('./pages/resources/WhenToPlantBendOregon'))} />
      <Route path={"/resources/brown-lawn-bend-oregon"} component={lazy(() => import('./pages/resources/BrownLawnBendOregon'))} />
      {/* Fire-Wise Landscaping Resources */}
      <Route path={"/resources/defensible-space-bend-oregon"} component={lazy(() => import('./pages/resources/DefensibleSpaceBendOregon'))} />
      <Route path={"/resources/deschutes-county-fire-hardening-requirements"} component={lazy(() => import('./pages/resources/DeschutesFireHardeningR327'))} />
      <Route path={"/resources/fire-resistant-plants-central-oregon"} component={lazy(() => import('./pages/resources/FireResistantPlantsCentralOregon'))} />
      <Route path={"/resources/juniper-removal-bend-oregon"} component={lazy(() => import('./pages/resources/JuniperRemovalBendOregon'))} />
      {/* Water-Wise Landscaping */}
      <Route path={"/services/water-wise-landscaping"} component={lazy(() => import('./pages/services/WaterWiseLandscapingService'))} />
      <Route path={"/resources/bend-watering-restrictions"} component={lazy(() => import('./pages/resources/BendWateringRestrictions'))} />
      <Route path={"/resources/bend-turf-replacement-rebate"} component={lazy(() => import('./pages/resources/BendTurfReplacementRebate'))} />
      <Route path={"/resources/water-wise-landscaping-bend-oregon"} component={lazy(() => import('./pages/resources/WaterWiseLandscapingBend'))} />
      <Route path={"/resources/waterwise-communities-bend-hoa"} component={lazy(() => import('./pages/resources/WaterWiseCommunitiesBend'))} />
      {/* New Service Area Pages */}
      <Route path={"/service-areas/bend-country-club-landscaping"} component={lazy(() => import('./pages/service-areas/BendCountryClubLandscaping'))} />
      <Route path={"/service-areas/bend-east-side-landscaping"} component={lazy(() => import('./pages/service-areas/BendEastSideLandscaping'))} />
      <Route path={"/service-areas/bend-south-landscaping"} component={lazy(() => import('./pages/service-areas/BendSouthLandscaping'))} />
      <Route path={"/service-areas/bend-westside-landscaping"} component={lazy(() => import('./pages/service-areas/BendWestsideLandscaping'))} />
      <Route path={"/service-areas/brookswood-landscaping"} component={lazy(() => import('./pages/service-areas/BrookswoodLandscaping'))} />
      <Route path={"/service-areas/nw-crossing-landscaping"} component={lazy(() => import('./pages/service-areas/NWCrossingLandscaping'))} />
      <Route path={"/service-areas/century-drive-corridor-landscaping"} component={lazy(() => import('./pages/service-areas/CenturyDriveCorridorLandscaping'))} />
      <Route path={"/service-areas/crooked-river-ranch"} component={lazy(() => import('./pages/service-areas/CrookedRiverRanchLandscapingHub'))} />
      <Route path={"/service-areas/culver"} component={lazy(() => import('./pages/service-areas/CulverLandscapingHub'))} />
      <Route path={"/service-areas/deschutes-river-woods-landscaping"} component={lazy(() => import('./pages/service-areas/DeschutesRiverWoodsLandscaping'))} />
      <Route path={"/service-areas/hunnell-road-area-landscaping"} component={lazy(() => import('./pages/service-areas/HunnellRoadAreaLandscaping'))} />
      <Route path={"/service-areas/alfalfa-irrigation"} component={lazy(() => import('./pages/service-areas/IrrigationAlfalfa'))} />
      <Route path={"/service-areas/crooked-river-ranch-irrigation"} component={lazy(() => import('./pages/service-areas/IrrigationCrookedRiverRanch'))} />
      <Route path={"/service-areas/culver-irrigation"} component={lazy(() => import('./pages/service-areas/IrrigationCulver'))} />
      <Route path={"/service-areas/madras-irrigation"} component={lazy(() => import('./pages/service-areas/IrrigationMadras'))} />
      <Route path={"/service-areas/powell-butte-irrigation"} component={lazy(() => import('./pages/service-areas/IrrigationPowellButte'))} />
      <Route path={"/service-areas/terrebonne-irrigation"} component={lazy(() => import('./pages/service-areas/IrrigationTerrebonne'))} />
      <Route path={"/service-areas/la-pine"} component={lazy(() => import('./pages/service-areas/LaPineLandscapingHub'))} />
      <Route path={"/service-areas/la-pine-landscape-design"} component={lazy(() => import('./pages/service-areas/LandscapeDesignLaPine'))} />
      <Route path={"/service-areas/prineville-landscape-design"} component={lazy(() => import('./pages/service-areas/LandscapeDesignPrineville'))} />
      <Route path={"/service-areas/redmond-landscape-design"} component={lazy(() => import('./pages/service-areas/LandscapeDesignRedmond'))} />
      <Route path={"/service-areas/sisters-landscape-design"} component={lazy(() => import('./pages/service-areas/LandscapeDesignSisters'))} />
      <Route path={"/service-areas/sunriver-landscape-design"} component={lazy(() => import('./pages/service-areas/LandscapeDesignSunriver'))} />
      <Route path={"/service-areas/tumalo-landscape-design"} component={lazy(() => import('./pages/service-areas/LandscapeDesignTumalo'))} />
      <Route path={"/service-areas/larkspur-landscaping"} component={lazy(() => import('./pages/service-areas/LarkspurLandscaping'))} />
      <Route path={"/service-areas/lava-butte-area-landscaping"} component={lazy(() => import('./pages/service-areas/LavaButteAreaLandscaping'))} />
      <Route path={"/service-areas/alfalfa-lawn-care"} component={lazy(() => import('./pages/service-areas/LawnCareAlfalfa'))} />
      <Route path={"/service-areas/crooked-river-ranch-lawn-care"} component={lazy(() => import('./pages/service-areas/LawnCareCrookedRiverRanch'))} />
      <Route path={"/service-areas/culver-lawn-care"} component={lazy(() => import('./pages/service-areas/LawnCareCulver'))} />
      <Route path={"/service-areas/la-pine-lawn-care"} component={lazy(() => import('./pages/service-areas/LawnCareLaPine'))} />
      <Route path={"/service-areas/madras-lawn-care"} component={lazy(() => import('./pages/service-areas/LawnCareMadras'))} />
      <Route path={"/service-areas/powell-butte-lawn-care"} component={lazy(() => import('./pages/service-areas/LawnCarePowellButte'))} />
      <Route path={"/service-areas/prineville-lawn-care"} component={lazy(() => import('./pages/service-areas/LawnCarePrineville'))} />
      <Route path={"/service-areas/redmond-lawn-care"} component={lazy(() => import('./pages/service-areas/LawnCareRedmond'))} />
      <Route path={"/service-areas/sisters-lawn-care"} component={lazy(() => import('./pages/service-areas/LawnCareSisters'))} />
      <Route path={"/service-areas/sunriver-lawn-care"} component={lazy(() => import('./pages/service-areas/LawnCareSunriver'))} />
      <Route path={"/service-areas/terrebonne-lawn-care"} component={lazy(() => import('./pages/service-areas/LawnCareTerrebonne'))} />
      <Route path={"/service-areas/tumalo-lawn-care"} component={lazy(() => import('./pages/service-areas/LawnCareTumalo'))} />
      <Route path={"/service-areas/madras"} component={lazy(() => import('./pages/service-areas/MadrasLandscapingHub'))} />
      <Route path={"/service-areas/murphy-road-area-landscaping"} component={lazy(() => import('./pages/service-areas/MurphyRoadAreaLandscaping'))} />
      <Route path={"/service-areas/northeast-bend-landscaping"} component={lazy(() => import('./pages/service-areas/NortheastBendLandscaping'))} />
      <Route path={"/service-areas/old-mill-district-landscaping"} component={lazy(() => import('./pages/service-areas/OldMillDistrictLandscaping'))} />
      <Route path={"/service-areas/orion-greens-landscaping"} component={lazy(() => import('./pages/service-areas/OrionGreensLandscaping'))} />
      <Route path={"/service-areas/alfalfa-paver-patio"} component={lazy(() => import('./pages/service-areas/PaverPatioAlfalfa'))} />
      <Route path={"/service-areas/crooked-river-ranch-paver-patio"} component={lazy(() => import('./pages/service-areas/PaverPatioCrookedRiverRanch'))} />
      <Route path={"/service-areas/culver-paver-patio"} component={lazy(() => import('./pages/service-areas/PaverPatioCulver'))} />
      <Route path={"/service-areas/la-pine-paver-patio"} component={lazy(() => import('./pages/service-areas/PaverPatioLaPine'))} />
      <Route path={"/service-areas/madras-paver-patio"} component={lazy(() => import('./pages/service-areas/PaverPatioMadras'))} />
      <Route path={"/service-areas/powell-butte-paver-patio"} component={lazy(() => import('./pages/service-areas/PaverPatioPowellButte'))} />
      <Route path={"/service-areas/prineville-paver-patio"} component={lazy(() => import('./pages/service-areas/PaverPatioPrineville'))} />
      <Route path={"/service-areas/redmond-paver-patio"} component={lazy(() => import('./pages/service-areas/PaverPatioRedmond'))} />
      <Route path={"/service-areas/sisters-paver-patio"} component={lazy(() => import('./pages/service-areas/PaverPatioSisters'))} />
      <Route path={"/service-areas/sunriver-paver-patio"} component={lazy(() => import('./pages/service-areas/PaverPatioSunriver'))} />
      <Route path={"/service-areas/decks-bend-oregon"} component={lazy(() => import('./pages/service-areas/DecksBend'))} />
      <Route path={"/service-areas/decks-redmond-oregon"} component={lazy(() => import('./pages/service-areas/DecksRedmond'))} />
      <Route path={"/service-areas/decks-sisters-oregon"} component={lazy(() => import('./pages/service-areas/DecksSisters'))} />
      <Route path={"/service-areas/decks-sunriver-oregon"} component={lazy(() => import('./pages/service-areas/DecksSunriver'))} />
      <Route path={"/service-areas/terrebonne-paver-patio"} component={lazy(() => import('./pages/service-areas/PaverPatioTerrebonne'))} />
      <Route path={"/service-areas/tumalo-paver-patio"} component={lazy(() => import('./pages/service-areas/PaverPatioTumalo'))} />
      <Route path={"/service-areas/prineville"} component={lazy(() => import('./pages/service-areas/PrinevilleLandscapingHub'))} />
      <Route path={"/service-areas/redmond"} component={lazy(() => import('./pages/service-areas/RedmondLandscapingHub'))} />
      <Route path={"/service-areas/river-west-landscaping"} component={lazy(() => import('./pages/service-areas/RiverWestLandscaping'))} />
      <Route path={"/service-areas/shevlin-meadows-landscaping"} component={lazy(() => import('./pages/service-areas/ShevlinMeadowsLandscaping'))} />
      <Route path={"/service-areas/shevlin-park-area-landscaping"} component={lazy(() => import('./pages/service-areas/ShevlinParkAreaLandscaping'))} />
      <Route path={"/service-areas/sisters"} component={lazy(() => import('./pages/service-areas/SistersLandscapingHub'))} />
      <Route path={"/service-areas/skyline-ranch-landscaping"} component={lazy(() => import('./pages/service-areas/SkylineRanchLandscaping'))} />
      <Route path={"/service-areas/southeast-bend-landscaping"} component={lazy(() => import('./pages/service-areas/SoutheastBendLandscaping'))} />
      <Route path={"/service-areas/la-pine-sprinkler-system"} component={lazy(() => import('./pages/service-areas/SprinklerSystemLaPine'))} />
      <Route path={"/service-areas/prineville-sprinkler-system"} component={lazy(() => import('./pages/service-areas/SprinklerSystemPrineville'))} />
      <Route path={"/service-areas/redmond-sprinkler-system"} component={lazy(() => import('./pages/service-areas/SprinklerSystemRedmond'))} />
      <Route path={"/service-areas/sisters-sprinkler-system"} component={lazy(() => import('./pages/service-areas/SprinklerSystemSisters'))} />
      <Route path={"/service-areas/sunriver-sprinkler-system"} component={lazy(() => import('./pages/service-areas/SprinklerSystemSunriver'))} />
      <Route path={"/service-areas/tumalo-sprinkler-system"} component={lazy(() => import('./pages/service-areas/SprinklerSystemTumalo'))} />
      <Route path={"/service-areas/summit-west-landscaping"} component={lazy(() => import('./pages/service-areas/SummitWestLandscaping'))} />
      <Route path={"/service-areas/sunriver"} component={lazy(() => import('./pages/service-areas/SunriverLandscapingHub'))} />
      <Route path={"/service-areas/terrebonne"} component={lazy(() => import('./pages/service-areas/TerrebonneLandscapingHub'))} />
      <Route path={"/service-areas/tetherow-landscaping"} component={lazy(() => import('./pages/service-areas/TetherowLandscaping'))} />
      <Route path={"/service-areas/woodriver-village-landscaping"} component={lazy(() => import('./pages/service-areas/WoodriverVillageLandscaping'))} />
      <Route path={"/service-areas/la-pine-xeriscape"} component={lazy(() => import('./pages/service-areas/XeriscapeLaPine'))} />
      <Route path={"/service-areas/prineville-xeriscape"} component={lazy(() => import('./pages/service-areas/XeriscapePrineville'))} />
      <Route path={"/service-areas/redmond-xeriscape"} component={lazy(() => import('./pages/service-areas/XeriscapeRedmond'))} />
      <Route path={"/service-areas/sisters-xeriscape"} component={lazy(() => import('./pages/service-areas/XeriscapeSisters'))} />
      <Route path={"/service-areas/sunriver-xeriscape"} component={lazy(() => import('./pages/service-areas/XeriscapeSunriver'))} />
      <Route path={"/service-areas/tumalo-xeriscape"} component={lazy(() => import('./pages/service-areas/XeriscapeTumalo'))} />
      {/* Resource pages */}
      <Route path={"/resources/natural-stone-vs-concrete-pavers-bend-oregon"} component={NaturalStoneVsConcretePayersBend} />
      <Route path={"/resources/gas-vs-propane-fire-pit-bend-oregon"} component={GasVsPropaneFirePitBend} />
      <Route path={"/resources/irrigation-faq-bend-oregon"} component={IrrigationFAQBend} />
      <Route path={"/resources/paver-patio-faq-bend-oregon"} component={PaverFAQBend} />
      <Route path={"/resources/xeriscape-faq-bend-oregon"} component={XeriscapeFAQBend} />
      <Route path={"/resources/lawn-care-cost-bend-oregon"} component={lazy(() => import('./pages/resources/LawnCareCostBend'))} />
      <Route path={"/resources/lawn-aeration-cost-bend-oregon"} component={lazy(() => import('./pages/resources/AerationCostBend'))} />
      <Route path={"/resources/backflow-preventer-testing-bend-oregon"} component={lazy(() => import('./pages/resources/BackflowTestingBend'))} />
      <Route path={"/resources/snow-removal-cost-bend-oregon"} component={lazy(() => import('./pages/resources/SnowRemovalCostBend'))} />
      <Route path={"/resources/irrigation-repair-cost-bend-oregon"} component={lazy(() => import('./pages/resources/IrrigationRepairCostBend'))} />
      <Route path={"/resources/commercial-landscaping-cost-bend-oregon"} component={lazy(() => import('./pages/resources/CommercialLandscapingCostBend'))} />
      <Route path={"/resources/lawn-fungus-treatment-bend-oregon"} component={lazy(() => import('./pages/resources/LawnFungusTreatmentBend'))} />
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
      <Route path={"/admin/scheduler"} component={SmartScheduler} />
      <Route path={"/admin/sales-reps"} component={SalesReps} />

      {/* Badge Scan System */}
      <Route path={"/badge-scan"} component={BadgeScan} />
      <Route path={"/admin/employees"} component={AdminEmployees} />
      <Route path={"/admin/badge-scans"} component={AdminBadgeScans} />
      <Route path={"/admin/employee-payouts"} component={AdminEmployeePayouts} />
      <Route path={"/admin/configuration"} component={Configuration} />
      <Route path={"/admin/users"} component={AdminUsers} />
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
  const hideCTABar = location.startsWith("/schedule-services") || location.startsWith("/admin") || location.startsWith("/quote") || location.startsWith("/get-a-quote") || location.startsWith("/badge-scan");
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
