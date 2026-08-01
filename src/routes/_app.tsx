import { createFileRoute } from "@tanstack/react-router";
import { DashboardLayoutPage } from "@/pages/DashboardLayout.page";

export const Route = createFileRoute("/_app")({
  component: DashboardLayoutPage,
});
