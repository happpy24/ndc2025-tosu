import { serve } from "bun";
import index from "./index.html";
import dashboard from "./dashboard/dashboard.html";
import {
  settingsMessageSchema,
  type SettingsMessage,
} from "./schemas/settings";
import open from "open";

let lastSettings: SettingsMessage | null = null;

const server = serve({
  port: "7270",
  routes: {
    "/dashboard": dashboard,
    "/ws": (req, server) => {
      if (server.upgrade(req)) {
        return;
      }
      return new Response("Upgrade failed", { status: 400 });
    },
    "/*": index,
  },
  websocket: {
    open(ws) {
      console.log(`client has connected`);
      ws.subscribe("settings");
      if (lastSettings) {
        ws.send(JSON.stringify(lastSettings));
      }
    },
    close(ws) {
      console.log(`client has disconnected`);
      ws.unsubscribe("settings");
    },
    message(ws, message) {
      try {
        const parsedMessage = settingsMessageSchema.parse(
          JSON.parse(message.toString()),
        );
        ws.publish("settings", JSON.stringify(parsedMessage));
        lastSettings = parsedMessage;
      } catch (e) {
        console.error(
          "failed to forward settings sent by either overlay or dashboard:",
          e,
        );
      }
    },
    idleTimeout: 30,
  },
  development: process.env.NODE_ENV !== "production" && {
    hmr: true,
    console: true,
  },
});

console.log(
  `Server listening at ${server.url}. Dashboard at ${server.url}dashboard`,
);

if (import.meta.hot.data.openedDashboard === true) {
  open(server.url.toString() + "dashboard");
  import.meta.hot.data.openedDashboard = true;
}
