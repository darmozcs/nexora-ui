import { createFileRoute } from "@tanstack/react-router";
import { i18n } from "@/libs/i18n";
import { DashboardPage } from "@/pages/Dashboard.page";

export const Route = createFileRoute("/_app/dashboard/")({
  head: () => ({
    meta: [
      { title: i18n.t("dashboard:title") },
      { name: "description", content: i18n.t("dashboard:description") },
    ],
  }),
  component: DashboardPage,
});
