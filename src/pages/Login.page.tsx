import { Card, Text, Title } from "@mantine/core";
import { useTranslation } from "react-i18next";
import { LoginFormContainer } from "@/modules/auth/containers";

export const LoginPage = () => {
  const { t } = useTranslation("auth");

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <Card shadow="sm" className="w-full max-w-md p-8">
        <Title order={1} className="mb-2">
          {t("login.title")}
        </Title>
        <Text c="dimmed" className="mb-6">
          {t("login.subtitle")}
        </Text>
        <LoginFormContainer />
      </Card>
    </div>
  );
};
