import { NAVBAR_LINK_ROOT_STYLES } from "@/modules/common/const";
import { NavLink } from "@mantine/core";
import { Link, type LinkProps } from "@tanstack/react-router";
import { type ComponentType } from "react";
import { useTranslation } from "react-i18next";

export interface SidebarMenuItem {
  label: string;
  icon?: ComponentType<{ size?: string | number }>;
  to?: LinkProps["to"];
  active?: boolean;
  children?: SidebarMenuItem[];
}

interface SidebarMenuProps {
  items: SidebarMenuItem[];
  onNavigate?: () => void;
}

export const SidebarMenu = ({ items, onNavigate }: SidebarMenuProps) => {
  const { t } = useTranslation("dashboard");

  return (
    <nav className="flex flex-col gap-1 p-2 pr-0 text-white">
      {items.map((item) =>
        item.children?.length ? (
          <NavLink
            key={item.label}
            label={t(item.label)}
            leftSection={item.icon ? <item.icon size={16} /> : undefined}
            defaultOpened
            className="sidebar-menu-link"
            styles={{ root: NAVBAR_LINK_ROOT_STYLES }}
            active={item.active}
          >
            <SidebarMenu items={item.children} onNavigate={onNavigate} />
          </NavLink>
        ) : (
          <NavLink
            key={item.label}
            component={Link}
            to={item.to}
            label={t(item.label)}
            leftSection={item.icon ? <item.icon size={16} /> : undefined}
            onClick={onNavigate}
            className="sidebar-menu-link"
            styles={{ root: NAVBAR_LINK_ROOT_STYLES }}
            active={item.active}
          />
        ),
      )}
    </nav>
  );
};
