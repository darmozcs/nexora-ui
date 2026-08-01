import { useAuthContext } from "../../contexts/auth.context";

export const useUserTagContainer = () => {
  const { user } = useAuthContext();

  return { user };
};
