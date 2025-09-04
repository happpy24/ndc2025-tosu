import React, { useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AnimatePresence, motion } from "framer-motion";
import { TosuProvider } from "./state/tosu";
import { StartScreen } from "./Startscreen";
import { StandbyScreen } from "./Standby";
import { VersusScreen } from "./Versus";
import { MappoolScreen } from "./Mappools";
import { SchedulingScreen } from "./Scheduling";
import { WinnerScreen } from "./Winner";
import "./static/style.css";

type ScreenProps = { previous?: string; next?: string; isLeaving?: boolean };

const screens: Record<string, React.FC<ScreenProps>> = {
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
      staleTime: 1000 * 60,
      gcTime: 1000 * 60 * 10,
      throwOnError: true,
    },
  },
});

type Entry = { name: string; key: string };

export function App() {
  const [activeScreens, setActiveScreens] = useState<Entry[]>(() => {
    const stored = localStorage.getItem("activeScreen");
    const initial = stored && stored in screens ? stored : "start";
    return [{ name: initial, key: `${initial}-${Date.now()}` }];
  });

  const changeScreen = (next: string) => {
    setActiveScreens((prev) => {
      const current = prev[prev.length - 1];
      if (!current || current.name === next) return prev; // nothing to do

      localStorage.setItem("activeScreen", next);

      // always return a valid Entry[]
      return [current, { name: next, key: `${next}-${Date.now()}` }] as Entry[];
    });
  };

  // After rendering both, drop the old one (AnimatePresence will play exit)
  useEffect(() => {
    if (activeScreens.length === 2) {
      setActiveScreens((prev) => (prev[1] ? [prev[1]] : prev));
    }
  }, [activeScreens.length]);

  return (
    <QueryClientProvider client={queryClient}>
      <TosuProvider>
        <div
          style={{ position: "relative", width: "1920px", height: "1080px" }}
        >
          <AnimatePresence mode="sync">
            {activeScreens.map((entry, i, arr) => {
              const Screen = screens[entry.name] ?? StartScreen;
              const isTop = i === arr.length - 1;
              const previous = arr[i - 1]?.name;
              const next = arr[i + 1]?.name;
              const isLeaving = !isTop && arr.length > 1;

              return (
                <motion.div
                  key={entry.key}
                  style={{
                    position: "absolute",
                    inset: 0,
                    width: "1920px",
                    height: "1080px",
                    zIndex: isTop ? 2 : 1,
                  }}
                  initial={false}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 1 }}
                >
                  <Screen
                    previous={previous}
                    next={next}
                    isLeaving={isLeaving}
                  />
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* debug nav */}
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
