import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "@tanstack/react-router";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useLoginMutation } from "@/DAL/auth";
import { useAuthStore } from "@/store";
import { DEFAULT_VALUES } from "../../const";
import { loginSchema, type LoginFormValues } from "../../schemas";

interface UseLoginFormProps {
  onSuccess?: () => void;
}

export const useLoginForm = ({ onSuccess }: UseLoginFormProps = {}) => {
  const navigate = useNavigate();
  const setAuth = useAuthStore((state) => state.setAuth);
  const loginMutation = useLoginMutation();

  const form = useForm<LoginFormValues>({
    resolver: yupResolver(loginSchema),
    defaultValues: DEFAULT_VALUES,
  });

  const onSubmit: SubmitHandler<LoginFormValues> = async (values) => {
    await loginMutation.mutateAsync(values, {
      onSuccess: ({ user, token }) => {
        setAuth(user, token);
        onSuccess?.();
        void navigate({ to: "/dashboard" });
      },
    });
  };

  return {
    form,
    onSubmit,
    isLoading: loginMutation.isPending,
    hasError: loginMutation.isError,
  };
};
