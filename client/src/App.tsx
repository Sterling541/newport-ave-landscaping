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

// Portfolio project pages
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
