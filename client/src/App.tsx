import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";

// Main pages
import Home from "./pages/Home";
import About from "./pages/About";
import Commercial from "./pages/Commercial";
import Maintenance from "./pages/Maintenance";
import Services from "./pages/Services";
import OurWork from "./pages/OurWork";
import Contact from "./pages/Contact";
import Blog from "./pages/Blog";
import Resources from "./pages/Resources";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Membership from "./pages/Membership";
import Terms from "./pages/Terms";

// Maintenance sub-pages
import LawnService from "./pages/services/LawnService";
import CommercialMaintenance from "./pages/services/CommercialMaintenance";
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
import FireFeatures from "./pages/services/FireFeatures";
import LandscapeLighting from "./pages/services/LandscapeLighting";
import Xeriscaping from "./pages/services/Xeriscaping";

// City landing pages
import BendPage from "./pages/cities/Bend";
import RedmondPage from "./pages/cities/Redmond";
import SistersPage from "./pages/cities/Sisters";
import SunriverPage from "./pages/cities/Sunriver";
import TumaloPage from "./pages/cities/Tumalo";
import PrinevillePage from "./pages/cities/Prineville";
import LaPinePage from "./pages/cities/LaPine";
import MadrasPage from "./pages/cities/Madras";

// Blog posts
import ClimateChange from "./pages/blog/ClimateChange";
import SeasonalGuide from "./pages/blog/SeasonalGuide";
import XeriscapeBend from "./pages/blog/XeriscapeBend";
import SprinklerWinterizationBend from "./pages/blog/SprinklerWinterizationBend";
import PaverPatioIdeasBend from "./pages/blog/PaverPatioIdeasBend";
import LawnCareBendOregon from "./pages/blog/LawnCareBendOregon";

// SEO Resource pages
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

// SEO Neighborhood / Service Area pages
import AwbreyButteNeighborhood from "./pages/service-areas/AwbreyButteNeighborhood";
import NorthwestCrossingNeighborhood from "./pages/service-areas/NorthwestCrossingNeighborhood";
import BrokenTopNeighborhood from "./pages/service-areas/BrokenTopNeighborhood";
import DiscoveryWestNeighborhood from "./pages/service-areas/DiscoveryWestNeighborhood";
import SunriverLandscaping from "./pages/service-areas/SunriverLandscaping";
import RedmondLandscaping from "./pages/service-areas/RedmondLandscaping";

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
function Router() {
  // make sure to consider if you need authentication for certain routes
  return (
    <Switch>
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
      <Route path={"/privacy-policy"} component={PrivacyPolicy} />
      <Route path={"/membership"} component={Membership} />
      <Route path={"/terms"} component={Terms} />

      {/* Maintenance sub-pages */}
      <Route path={"/services/lawn-service"} component={LawnService} />
      <Route path={"/services/commercial-maintenance"} component={CommercialMaintenance} />
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
      <Route path={"/services/fire-features"} component={FireFeatures} />
      <Route path={"/services/landscape-lighting"} component={LandscapeLighting} />
      <Route path={"/services/xeriscaping"} component={Xeriscaping} />

      {/* City landing pages */}
      <Route path={"/landscaping/bend"} component={BendPage} />
      <Route path={"/landscaping/redmond"} component={RedmondPage} />
      <Route path={"/landscaping/sisters"} component={SistersPage} />
      <Route path={"/landscaping/sunriver"} component={SunriverPage} />
      <Route path={"/landscaping/tumalo"} component={TumaloPage} />
      <Route path={"/landscaping/prineville"} component={PrinevillePage} />
      <Route path={"/landscaping/la-pine"} component={LaPinePage} />
      <Route path={"/landscaping/madras"} component={MadrasPage} />

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

      {/* SEO Resource pages */}
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

      {/* Fallback */}
      <Route path={"/404"} component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
