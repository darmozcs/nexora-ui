import { Alert, Button, PasswordInput, TextInput } from "@mantine/core";
import { type SubmitHandler, type UseFormReturn } from "react-hook-form";
import { useTranslation } from "react-i18next";
import type { LoginFormValues } from "../../schemas";

interface LoginFormProps {
  form: UseFormReturn<LoginFormValues>;
  onSubmit: SubmitHandler<LoginFormValues>;
  isLoading: boolean;
  hasError: boolean;
}

export const LoginForm = ({ form, onSubmit, isLoading, hasError }: LoginFormProps) => {
  const { t } = useTranslation("auth");

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-4">
        <TextInput
          label={t("login.email")}
          placeholder={t("login.emailPlaceholder")}
          error={form.formState.errors.email?.message}
          {...form.register("email")}
        />
        <PasswordInput
          label={t("login.password")}
          placeholder={t("login.passwordPlaceholder")}
          error={form.formState.errors.password?.message}
          {...form.register("password")}
        />
        {hasError && <Alert color="red">{t("login.errors.invalidCredentials")}</Alert>}
        <Button type="submit" loading={isLoading} fullWidth>
          {t("login.submit")}
        </Button>
      </div>
    </form>
  );
};
