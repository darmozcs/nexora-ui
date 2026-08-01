import { Text, Title } from "@mantine/core";
import { useTranslation } from "react-i18next";

export const DashboardPage = () => {
  const { t } = useTranslation("dashboard");

  return (
    <>
      <Title order={1}>{t("title")}</Title>
      <Text c="dimmed">{t("description")}</Text>
    </>
  );
};
