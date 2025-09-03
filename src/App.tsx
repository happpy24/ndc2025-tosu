import { StartScreen } from "./Startscreen";
import { StandbyScreen } from "./Standby";
import { VersusScreen } from "./Versus";
import { MappoolScreen } from "./Mappools";
import { SchedulingScreen } from "./Scheduling";
import { WinnerScreen } from "./Winner";
import { TosuProvider } from "./state/tosu";

var state = 0;
if (state === 0) {
  var loadstate = <StartScreen />;
} else if (state === 1) {
  var loadstate = <StandbyScreen />;
} else if (state === 2) {
  var loadstate = <VersusScreen />;
} else if (state === 3) {
  var loadstate = <MappoolScreen />;
} else if (state === 4) {
  var loadstate = <SchedulingScreen />;
} else if (state === 5) {
  var loadstate = <WinnerScreen />;
}

export function App() {
  return <TosuProvider>{loadstate}</TosuProvider>;
}
