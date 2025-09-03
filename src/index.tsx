import { createRoot } from "react-dom/client";
import { App } from "./App";
import { StrictMode } from "react";

function start() {
  console.log("start");
  const rootEl = document.getElementById("root");

  if (!rootEl) {
    throw "root element missing";
  }

  createRoot(rootEl).render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", start);
} else {
  start();
}
