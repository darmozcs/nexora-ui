import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import { SIDEBAR_MENU_ITEMS } from "../../const";

export const useDashboardLayout = () => {
  const [opened, { toggle, close }] = useDisclosure();
  const isMobile = useMediaQuery("(max-width: 47.9937em)");

  const onNavigate = () => {
    if (isMobile) close();
  };

  return {
    opened,
    toggle,
    onNavigate,
    menuItems: SIDEBAR_MENU_ITEMS,
  };
};
