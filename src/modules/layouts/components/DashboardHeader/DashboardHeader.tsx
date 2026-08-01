import { AppShell, Burger, Group, Text } from "@mantine/core";
import { useTranslation } from "react-i18next";

interface DashboardHeaderProps {
  opened: boolean;
  onToggle: () => void;
}

export const DashboardHeader = ({ opened, onToggle }: DashboardHeaderProps) => {
  const { t } = useTranslation(["dashboard", "common"]);

  return (
    <AppShell.Header
      bg="var(--mantine-primary-color-6)"
      withBorder={false}
      className="flex items-center px-4"
    >
      <Group>
        <Burger
          opened={opened}
          onClick={onToggle}
          hiddenFrom="sm"
          size="sm"
          color="white"
          aria-label={t("dashboard:header.toggleNavigation")}
        />
        <Text fw={700} size="lg" c="white">
          {t("common:app.title")}
        </Text>
      </Group>
    </AppShell.Header>
  );
};
