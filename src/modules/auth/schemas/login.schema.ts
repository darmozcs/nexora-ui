import { i18n } from "@/libs/i18n";
import * as yup from "yup";

export const loginSchema = yup.object({
  email: yup
    .string()
    .required(i18n.t("auth:login.errors.emailRequired"))
    .email(i18n.t("auth:login.errors.emailInvalid")),
  password: yup
    .string()
    .required(i18n.t("auth:login.errors.passwordRequired"))
    .min(6, i18n.t("auth:login.errors.passwordMin")),
});

export type LoginFormValues = yup.InferType<typeof loginSchema>;
