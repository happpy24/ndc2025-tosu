// App.tsx
import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TosuProvider } from "./state/tosu";
import { StartScreen } from "./Startscreen";
import { StandbyScreen } from "./Standby";
import { VersusScreen } from "./Versus";
import { MappoolScreen } from "./Mappools";
import { SchedulingScreen } from "./Scheduling";
import { WinnerScreen } from "./Winner";
import "./static/style.css";

const screens: Record<string, React.FC> = {
  start: StartScreen,
  standby: StandbyScreen,
  versus: VersusScreen,
  mappool: MappoolScreen,
  scheduling: SchedulingScreen,
  winner: WinnerScreen,
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      experimental_prefetchInRender: true,
      staleTime: 1000 * 60,
      gcTime: 1000 * 60 * 10,
      throwOnError: true,
    },
  },
});

export function App() {
  const [activeScreen, _setActiveScreen] = useState(() => {
    const stored = localStorage.getItem("activeScreen");
    return stored && stored in screens ? stored : "start";
  });
  const Screen = screens[activeScreen] ?? StartScreen;

  const setActiveScreen = (screen: string) => {
    localStorage.setItem("activeScreen", screen);
    _setActiveScreen(screen);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TosuProvider>
        <div
          style={{
            position: "relative",
            overflow: "hidden",
            width: "100%",
            height: "100vh",
          }}
        >
          <AnimatePresence mode="wait" initial={false}>
            <Screen />
          </AnimatePresence>
        </div>

        <div
          style={{
            position: "absolute",
            bottom: "24px",
            width: "100%",
            display: "flex",
            justifyContent: "flex-end",
            gap: "8px",
          }}
        >
          {Object.keys(screens).map((screenName) => (
            <button
              style={{ fontSize: "48px" }}
              key={screenName}
              onClick={() => setActiveScreen(screenName)}
            >
              {screenName}
            </button>
          ))}
        </div>
      </TosuProvider>
    </QueryClientProvider>
  );
}
