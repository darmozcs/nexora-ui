import { IconDashboard, IconStethoscope, IconUsers } from "@tabler/icons-react";
import type { SidebarMenuItem } from "@/modules/common/components";

export const SIDEBAR_MENU_ITEMS: SidebarMenuItem[] = [
  {
    label: "dashboard:navigation.dashboard",
    to: "/dashboard",
    icon: IconDashboard,
  },
  {
    label: "dashboard:navigation.doctors",
    icon: IconStethoscope,
    children: [
      { label: "doctors:create.title", to: "/doctors/create" },
      { label: "doctors:delete.title", to: "/doctors/delete" },
      { label: "doctors:listing.title", to: "/doctors/listing" },
    ],
  },
  {
    label: "dashboard:navigation.patients",
    icon: IconUsers,
    children: [
      { label: "patients:create.title", to: "/patients/create" },
      { label: "patients:delete.title", to: "/patients/delete" },
      { label: "patients:listing.title", to: "/patients/listing" },
    ],
  },
];
