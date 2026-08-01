import { fileURLToPath, URL } from "node:url";
import tailwindcss from "@tailwindcss/vite";
import { tanstackRouter } from "@tanstack/router-plugin/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// En producción se sirve detrás de Traefik bajo /nexora (ver
// /opt/infra/services/nexora). En dev, /api se proxya al backend real
// para poder probar contra datos reales con `npm run dev`.
export default defineConfig(({ command }) => ({
  base: command === "build" ? "/nexora/" : "/",
  plugins: [tanstackRouter(), react(), tailwindcss()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  server: {
    proxy: {
      "/api": {
        target: "https://darmozsc.duckdns.org",
        changeOrigin: true,
      },
    },
  },
}));
