import { VersusScreen } from "./Versus";
import { TosuProvider } from "./state/tosu";

export function App() {
  return (
    <TosuProvider>
      <VersusScreen />
    </TosuProvider>
  );
}
