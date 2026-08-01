import { createFileRoute } from "@tanstack/react-router";
import { i18n } from "@/libs/i18n";
import { PatientsDeletePage } from "@/pages/PatientsDelete.page";

export const Route = createFileRoute("/_app/patients/delete/")({
  head: () => ({
    meta: [
      { title: i18n.t("patients:delete.title") },
      { name: "description", content: i18n.t("patients:delete.description") },
    ],
  }),
  component: PatientsDeletePage,
});
