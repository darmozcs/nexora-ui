import { createFileRoute } from "@tanstack/react-router";
import { i18n } from "@/libs/i18n";
import { PatientsCreatePage } from "@/pages/PatientsCreate.page";

export const Route = createFileRoute("/_app/patients/create/")({
  head: () => ({
    meta: [
      { title: i18n.t("patients:create.title") },
      { name: "description", content: i18n.t("patients:create.description") },
    ],
  }),
  component: PatientsCreatePage,
});
