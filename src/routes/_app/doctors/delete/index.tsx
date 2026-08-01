import { createFileRoute } from "@tanstack/react-router";
import { i18n } from "@/libs/i18n";
import { DoctorsDeletePage } from "@/pages/DoctorsDelete.page";

export const Route = createFileRoute("/_app/doctors/delete/")({
  head: () => ({
    meta: [
      { title: i18n.t("doctors:delete.title") },
      { name: "description", content: i18n.t("doctors:delete.description") },
    ],
  }),
  component: DoctorsDeletePage,
});
