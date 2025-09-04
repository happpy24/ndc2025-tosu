import { createRoot } from "react-dom/client";
import { Dashboard } from "./Dashboard.tsx";
import { StrictMode } from "react";
import "./dashboard.css";

function start() {
  const rootEl = document.getElementById("root");

  if (!rootEl) {
    throw "root element missing";
  }

  const root = (import.meta.hot.data.root ??= createRoot(rootEl));
  root.render(
    <StrictMode>
      <Dashboard />
    </StrictMode>,
  );
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", start);
} else {
  start();
}
