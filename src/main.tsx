import "@mantine/core/styles.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App";
import { env } from "@/config/config";
import "./index.css";

const enableMocking = async () => {
  if (!env.VITE_ENABLE_MOCKS) return;

  const { startWorker } = await import("@/mocks/browser");
  await startWorker();
};

enableMocking()
  .catch((error) => {
    console.error("Failed to start mock service worker:", error);
  })
  .finally(() => {
    ReactDOM.createRoot(document.getElementById("root")!).render(
      <React.StrictMode>
        <App />
      </React.StrictMode>,
    );
  });
