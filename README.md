# nexora-ui

Frontend mínimo (React + TypeScript + Vite) que lista los estudios expuestos
por `nexora-be` (`GET /api/estudios`).

## Desarrollo

```bash
npm install
npm run dev
```

`vite.config.ts` proxya `/api` hacia `https://darmozsc.duckdns.org` en dev,
así que `npm run dev` ya muestra datos reales sin configurar nada más.

## Deploy

Se sirve en producción bajo `https://darmozsc.duckdns.org/nexora`, en el
mismo slot ya preparado en `/opt/infra/services/nexora` del servidor. El
workflow `.github/workflows/deploy.yml` construye la imagen, la publica en
GHCR y redeploya ese servicio vía el runner self-hosted.
