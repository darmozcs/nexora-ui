import { Text, Title } from "@mantine/core";
import { useTranslation } from "react-i18next";

interface PagePlaceholderProps {
  titleKey: string;
  descriptionKey: string;
}

export const PagePlaceholder = ({ titleKey, descriptionKey }: PagePlaceholderProps) => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col gap-2">
      <Title order={1}>{t(titleKey)}</Title>
      <Text c="dimmed">{t(descriptionKey)}</Text>
    </div>
  );
};
