import {
  type DashboardSettings,
  type SettingsMessage,
} from "@/schemas/settings";
import { useWebSocket } from "partysocket/react";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

const DashboardContext = createContext<{
  settings: DashboardSettings;
  setSettings: (settings: Partial<DashboardSettings>) => void;
} | null>(null);

export function DashboardSettingsProvider({
  children,
}: {
  children: ReactNode;
}) {
  const ws = useWebSocket("ws://localhost:7270/ws");

  const [settings, _setSettings] = useState<DashboardSettings>({
    matchId: 0,
    automaticSelect: false,
    activeScreen: "start",
    countdown: null,
    bans: { red: [], blue: [] },
    picks: { red: [], blue: [] },
  });

  function setSettings(
    settings: Partial<DashboardSettings>,
    receive?: boolean,
  ) {
    return _setSettings((currentSettings) => {
      const mergedSettings: DashboardSettings = {
        ...currentSettings,
        ...settings,
      };

      if (!receive) {
        const message = {
          type: "SETTINGS",
          settings: mergedSettings,
        } satisfies SettingsMessage;

        ws.send(JSON.stringify(message));
      }

      return mergedSettings;
    });
  }

  useEffect(() => {
    ws.addEventListener("open", () => {
      console.log("connected to the dashboard websocket server");
    });

    ws.addEventListener("close", () => {
      console.log("disconnected from the dashboard websocket server");
    });

    ws.addEventListener("error", (e) => {
      console.log(
        "error on trying to connect to the dashboard websocket server:",
        e.error,
      );
    });

    ws.addEventListener("message", (e) => {
      setSettings(JSON.parse(e.data).settings, true);
    });
  }, [ws]);

  return (
    <DashboardContext value={{ settings, setSettings }}>
      {children}
    </DashboardContext>
  );
}

export function useSettings() {
  const context = useContext(DashboardContext);

  if (!context) {
    throw new Error("useSettings must only be used within a DashboardProvider");
  }

  return [context.settings, context.setSettings] as const;
}
