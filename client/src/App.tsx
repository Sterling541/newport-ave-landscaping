import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";

// Main pages
import Home from "./pages/Home";
import About from "./pages/About";
import Maintenance from "./pages/Maintenance";
import Services from "./pages/Services";
import OurWork from "./pages/OurWork";
import Contact from "./pages/Contact";
import Blog from "./pages/Blog";
import PrivacyPolicy from "./pages/PrivacyPolicy";
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

// Blog posts
import ClimateChange from "./pages/blog/ClimateChange";
import SeasonalGuide from "./pages/blog/SeasonalGuide";

function Router() {
  return (
    <Switch>
      {/* Main pages */}
      <Route path={"/"} component={Home} />
      <Route path={"/about"} component={About} />
      <Route path={"/maintenance"} component={Maintenance} />
      <Route path={"/services"} component={Services} />
      <Route path={"/install"} component={Services} />
      <Route path={"/our-work"} component={OurWork} />
      <Route path={"/contact"} component={Contact} />
      <Route path={"/blog"} component={Blog} />
      <Route path={"/privacy-policy"} component={PrivacyPolicy} />
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

      {/* Blog posts */}
      <Route path={"/blog/climate-change-landscaping"} component={ClimateChange} />
      <Route path={"/blog/seasonal-landscaping-guide"} component={SeasonalGuide} />

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
