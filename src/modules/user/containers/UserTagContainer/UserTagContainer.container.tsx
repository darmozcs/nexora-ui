import { UserTag } from "@/modules/user/components";
import { useUserTagContainer } from "@/modules/user/hooks";

export const UserTagContainer = () => {
  const { user } = useUserTagContainer();

  return <UserTag user={user} />;
};
