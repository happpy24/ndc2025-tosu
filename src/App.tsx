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
  const [activeScreen, setActiveScreen] = useState(() => {
    const stored = localStorage.getItem("activeScreen");
    return stored && stored in screens ? stored : "start";
  });
  const [previous, setPrevious] = useState<string | undefined>(undefined);

  const changeScreen = (next: string) => {
    setPrevious(activeScreen);
    setActiveScreen(next);
    localStorage.setItem("activeScreen", next);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TosuProvider>
        <div
          style={{ position: "relative", width: "1920px", height: "1080px" }}
        >
          <AnimatePresence mode="wait" initial={false}>
            {activeScreen === "start" && (
              <StartScreen key="startscreen" previous={previous} />
            )}
            {activeScreen === "standby" && (
              <StandbyScreen key="standbyscreen" previous={previous} />
            )}
            {activeScreen === "versus" && (
              <VersusScreen key="versusscreen" previous={previous} />
            )}
            {activeScreen === "mappool" && (
              <MappoolScreen key="mappoolscreen" previous={previous} />
            )}
            {activeScreen === "scheduling" && (
              <SchedulingScreen key="scheduling" previous={previous} />
            )}
            {activeScreen === "winner" && (
              <WinnerScreen key="winnerscreen" previous={previous} />
            )}
          </AnimatePresence>
        </div>

        {/* debug buttons */}
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
              onClick={() => changeScreen(screenName)}
            >
              {screenName}
            </button>
          ))}
        </div>
      </TosuProvider>
    </QueryClientProvider>
  );
}
