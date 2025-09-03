import { serve } from "bun";
import index from "./index.html";

const server = serve({
  port: "7270",
  routes: {
    "/*": index,
  },
  fetch(req, server) {
    if (server.upgrade(req)) {
      return;
    }
    return new Response("websocket upgrade error", { status: 400 });
  },
  websocket: {
    open(ws) {
      ws.subscribe("messages");
      console.log("client connected to websocket");
    },
    message(ws, message) {
      // rebroadcast incoming messages to all clients https://bun.com/docs/api/websockets#pub-sub
      server.publish("messages", message);
    },
    close(ws) {
      ws.unsubscribe("messages");
      console.log("client disconnected from websocket");
    },
  },
  development: process.env.NODE_ENV !== "production" && {
    hmr: true,
    console: true,
  },
});

console.log(`Server listening at ${server.url}`);
