import { useAuthStore } from "@/store";

export const useAuthProvider = () => {
  const user = useAuthStore((state) => state.user);

  return { user };
};
