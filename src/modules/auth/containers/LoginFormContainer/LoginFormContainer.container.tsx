import { LoginForm } from "@/modules/auth/components";
import { useLoginForm } from "@/modules/auth/hooks";

export const LoginFormContainer = () => {
  const { form, onSubmit, isLoading, hasError } = useLoginForm();

  return <LoginForm form={form} onSubmit={onSubmit} isLoading={isLoading} hasError={hasError} />;
};
