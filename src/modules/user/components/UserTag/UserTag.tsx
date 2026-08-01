import type { User } from "@/models";
import { Avatar, Group, Stack, Text } from "@mantine/core";

interface UserTagProps {
  user: User;
}

export const UserTag = ({ user }: UserTagProps) => {
  return (
    <Group wrap="nowrap" gap="sm">
      <Avatar name={user.name} color="initials" radius="xl" />
      <Stack gap={0} className="min-w-0 flex-1">
        <Text fw={600} truncate>
          {user.name}
        </Text>
        <Text truncate>
          {user.email}
        </Text>
      </Stack>
    </Group>
  );
};
