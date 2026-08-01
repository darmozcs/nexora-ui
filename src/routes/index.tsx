import { createFileRoute } from "@tanstack/react-router";
import { i18n } from "@/libs/i18n";
import { LoginPage } from "@/pages/Login.page";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: i18n.t("auth:login.title") },
      { name: "description", content: i18n.t("auth:login.description") },
    ],
  }),
  component: LoginPage,
});
