import { Outlet } from "@tanstack/react-router";
import { DashboardLayoutContainer } from "@/modules/layouts/containers";
import { UserTagContainer } from "@/modules/user/containers";

export const DashboardLayoutPage = () => {
  return (
    <DashboardLayoutContainer navbarTop={<UserTagContainer />}>
      <Outlet />
    </DashboardLayoutContainer>
  );
};
