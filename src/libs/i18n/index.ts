import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import HttpBackend from "i18next-http-backend";
import { initReactI18next } from "react-i18next";

export const DEFAULT_NAMESPACE = "common";
export const SUPPORTED_LANGUAGES = ["es", "en"] as const;
export const AUTH_NAMESPACE = "auth";
export const DASHBOARD_NAMESPACE = "dashboard";
export const DOCTORS_NAMESPACE = "doctors";
export const PATIENTS_NAMESPACE = "patients";

void i18n
  .use(HttpBackend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: "es",
    supportedLngs: SUPPORTED_LANGUAGES,
    defaultNS: DEFAULT_NAMESPACE,
    ns: [
      DEFAULT_NAMESPACE,
      AUTH_NAMESPACE,
      DASHBOARD_NAMESPACE,
      DOCTORS_NAMESPACE,
      PATIENTS_NAMESPACE,
    ],
    backend: {
      loadPath: "/locales/{{lng}}/{{ns}}.json",
    },
    interpolation: {
      escapeValue: false,
    },
  });

export { i18n };
