import { createFileRoute } from "@tanstack/react-router";
import { i18n } from "@/libs/i18n";
import { PatientsListingPage } from "@/pages/PatientsListing.page";

export const Route = createFileRoute("/_app/patients/listing/")({
  head: () => ({
    meta: [
      { title: i18n.t("patients:listing.title") },
      { name: "description", content: i18n.t("patients:listing.description") },
    ],
  }),
  component: PatientsListingPage,
});
