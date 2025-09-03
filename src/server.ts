import { serve } from "bun";
import index from "./index.html";

const server = serve({
  port: "7270",
  routes: {
    "/*": index,
  },
  development: process.env.NODE_ENV !== "production" && {
    hmr: true,
    console: true,
  },
});

console.log(`Server listening at ${server.url}`);
