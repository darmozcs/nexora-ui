import { SidebarMenuContainer } from "@/modules/common/containers";
import { DashboardHeader } from "@/modules/layouts/components";
import { useDashboardLayout } from "@/modules/layouts/hooks";
import { AppShell, Box } from "@mantine/core";
import { type PropsWithChildren, type ReactNode } from "react";

interface DashboardLayoutContainerProps extends PropsWithChildren {
  navbarTop?: ReactNode;
}

export const DashboardLayoutContainer = ({
  children,
  navbarTop,
}: DashboardLayoutContainerProps) => {
  const { opened, toggle, onNavigate, menuItems } = useDashboardLayout();

  return (
    <AppShell
      padding="md"
      bg="var(--mantine-primary-color-6)"
      header={{ height: 60 }}
      navbar={{
        width: 250,
        breakpoint: "sm",
        collapsed: { mobile: !opened },
      }}
    >
      <DashboardHeader opened={opened} onToggle={toggle} />
      <AppShell.Navbar bg="var(--mantine-primary-color-6)" withBorder={false}>
        {navbarTop && (
          <Box className="sticky top-0 z-10 border-b border-white/15 bg-(--mantine-primary-color-6) p-2 text-white">
            {navbarTop}
          </Box>
        )}
        <SidebarMenuContainer items={menuItems} onNavigate={onNavigate} />
      </AppShell.Navbar>
      <AppShell.Main
        bg="primary"
        pr={0}
        pl="var(--app-shell-navbar-offset)"
        pt="var(--app-shell-header-offset)"
        pb={0}
      >
        <Box
          bg="white"
          w="100%"
          h="calc(100dvh - 60px)"
          className="rounded-tl-xl rounded-tr-xl p-4"
        >
          {children}
        </Box>
      </AppShell.Main>
    </AppShell>
  );
};
