import { VersusScreen } from "./Versus";
import { TosuProvider } from "./state/tosu";

var state = 2;
if (state === 0) {
	var loadstate = <div>StartScreen</div>;
} else if (state === 1) {
	var loadstate = <div>StandbyScreen</div>;
} else if (state === 2) {
	var loadstate = <VersusScreen />;
} else if (state === 3) {
	var loadstate = <div>MappoolScreen</div>;
} else if (state === 4) {
	var loadstate = <div>SchedulingScreeen</div>;
} else if (state === 5) {
	var loadstate = <div>WinnerScreen</div>;
}

export function App() {
	return <TosuProvider>{loadstate}</TosuProvider>;
}
