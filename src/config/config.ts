import { envSchema } from "./env.schema";

const rawEnv = {
  VITE_ENABLE_MOCKS: import.meta.env.VITE_ENABLE_MOCKS === "true",
};

export const env = envSchema.validateSync(rawEnv, { stripUnknown: true });
