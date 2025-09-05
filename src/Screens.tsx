import { AnimatePresence } from "framer-motion";
import { StartScreen } from "./Startscreen";
import { StandbyScreen } from "./Standby";
import { VersusScreen } from "./Versus";
import { MappoolScreen } from "./Mappools";
import { SchedulingScreen } from "./Scheduling";
import { WinnerScreen } from "./Winner";
import { useSettings } from "./state/dashboard";

export function Screens() {
  const [settings] = useSettings();
  const activeScreen = settings.activeScreen;
  const previous = settings.previousScreen;

  return (
    <div style={{ position: "relative", width: "1920px", height: "1080px" }}>
      <AnimatePresence mode="wait" initial={false}>
        {activeScreen === "start" && (
          <StartScreen key="start" from={previous} to="start" />
        )}
        {activeScreen === "standby" && (
          <StandbyScreen key="standby" from={previous} to="standby" />
        )}
        {activeScreen === "versus" && (
          <VersusScreen key="versus" from={previous} to="versus" />
        )}
        {activeScreen === "mappool" && (
          <MappoolScreen key="mappool" from={previous} to="mappool" />
        )}
        {activeScreen === "scheduling" && (
          <SchedulingScreen key="scheduling" from={previous} to="scheduling" />
        )}
        {activeScreen === "winner" && (
          <WinnerScreen key="winner" from={previous} to="winner" />
        )}
      </AnimatePresence>
    </div>
  );
}
