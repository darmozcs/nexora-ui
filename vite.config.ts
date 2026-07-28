import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// En producción se sirve detrás de Traefik bajo /nexora (ver
// /opt/infra/services/nexora). En dev, /api se proxya al backend real
// para poder probar contra datos reales con `npm run dev`.
export default defineConfig(({ command }) => ({
  base: command === "build" ? "/nexora/" : "/",
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "https://darmozsc.duckdns.org",
        changeOrigin: true,
      },
    },
  },
}));
