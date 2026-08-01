import * as yup from "yup";

export const envSchema = yup.object({
  VITE_ENABLE_MOCKS: yup.boolean().default(false),
});
