import { createFileRoute } from "@tanstack/react-router";
import { i18n } from "@/libs/i18n";
import { DoctorsListingPage } from "@/pages/DoctorsListing.page";

export const Route = createFileRoute("/_app/doctors/listing/")({
  head: () => ({
    meta: [
      { title: i18n.t("doctors:listing.title") },
      { name: "description", content: i18n.t("doctors:listing.description") },
    ],
  }),
  component: DoctorsListingPage,
});
