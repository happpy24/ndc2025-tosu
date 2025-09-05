import { serve } from "bun";
import index from "./index.html";
import dashboard from "./dashboard/dashboard.html";
import { type SettingsMessage } from "./schemas/settings";
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
      ws.publish("settings", message);
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
open(server.url.toString() + "dashboard");
