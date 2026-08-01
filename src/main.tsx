import "@mantine/core/styles.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App";
import { env } from "@/config/config";
import "./index.css";

const enableMocking = async () => {
  if (!env.VITE_ENABLE_MOCKS) return;

  const { worker } = await import("@/mocks/browser");
  await worker.start();
};

enableMocking().then(() => {
  ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  );
});
