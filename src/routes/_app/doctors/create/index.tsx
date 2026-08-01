import { createFileRoute } from "@tanstack/react-router";
import { i18n } from "@/libs/i18n";
import { DoctorsCreatePage } from "@/pages/DoctorsCreate.page";

export const Route = createFileRoute("/_app/doctors/create/")({
  head: () => ({
    meta: [
      { title: i18n.t("doctors:create.title") },
      { name: "description", content: i18n.t("doctors:create.description") },
    ],
  }),
  component: DoctorsCreatePage,
});
