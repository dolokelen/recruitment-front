import { Box, Button, Checkbox, Stack, Text } from "@chakra-ui/react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import {
  useAddGroupsToUser,
  useRemoveGroupsFromUser,
  useUser,
} from "../hooks/useUsers";
import { useGroups } from "../hooks/useGroups";
import OverflowYContainer from "../groupsAndPermissions/OverflowYContainer";
import { blue, red, teal } from "../colors";
import { AUTH_LAYOUT_ROUTE, GROUP_ROUTE } from "../cacheKeysAndRoutes";
import { hasPermission } from "../utilities/hasPermissions";

const UserGroupsPage = () => {
  const userId = parseInt(localStorage.getItem("bugId")!);
  const { data: user } = useUser(userId);
  const { data: groups, error } = useGroups();
  const [groupIdsToAdd, setGroupIdsToAdd] = useState<number[]>([]);
  const [groupIdsToRemove, setGroupIdsToRemove] = useState<number[]>([]);

  const handleAddUserToGroups = useAddGroupsToUser(
    { userId, group_to_add_ids: groupIdsToAdd },
    () => {
      toast.success("User successfully added to group!");
      setGroupIdsToAdd([]);
    }
  );

  const handleRemoveGroupsFromUser = useRemoveGroupsFromUser(
    { userId, group_to_remove_ids: groupIdsToRemove },
    () => {
      toast.success("User successfully from group!");
      setGroupIdsToRemove([]);
    }
  );

  const canChangePermission = hasPermission("Can change permission");

  if (error) return <Text color={red}>There was error in getting groups</Text>;

  const handleCheckboxChangeForAdd = (groupId: number) => {
    if (groupIdsToAdd.includes(groupId)) {
      setGroupIdsToAdd(groupIdsToAdd.filter((id) => id !== groupId));
    } else {
      setGroupIdsToAdd([...groupIdsToAdd, groupId]);
    }
  };

  const handleCheckboxChangeForRemove = (groupId: number) => {
    if (groupIdsToRemove.includes(groupId)) {
      setGroupIdsToRemove(groupIdsToRemove.filter((id) => id !== groupId));
    } else {
      setGroupIdsToRemove([...groupIdsToRemove, groupId]);
    }
  };

  if (canChangePermission)
    return (
      <Box
        m={{ base: "0 1rem", sm: "0 4rem", md: "0 12rem" }}
        display={{ sm: "flex" }}
        justifyContent="space-between"
      >
        <Box>
          <Box fontWeight="bold" mt={8} mb={4}>
            {user?.full_name} Group
          </Box>
          <OverflowYContainer width="15rem">
            <Stack>
              {user?.groups?.length ? (
                user?.groups.map((group) => (
                  <Checkbox
                    key={group.id}
                    isChecked={groupIdsToRemove.includes(group.id!)}
                    onChange={() => handleCheckboxChangeForRemove(group.id!)}
                  >
                    <Link
                      to={`${AUTH_LAYOUT_ROUTE}/${GROUP_ROUTE}/${group.id}`}
                    >
                      {group.name}
                    </Link>
                  </Checkbox>
                ))
              ) : (
                <Text color={red}>No assigned group</Text>
              )}
            </Stack>
          </OverflowYContainer>
          <Button
            sx={buttonSytle}
            colorScheme={teal}
            onClick={handleRemoveGroupsFromUser}
          >
            Remove
          </Button>
        </Box>
        <Box>
          <Box fontWeight="bold" mt={8} mb={4}>
            Available Groups
          </Box>
          <OverflowYContainer width="13rem">
            <Stack>
              {groups
                ?.filter((g) => !user?.groups?.some((ug) => ug.id === g.id))
                .map((group) => (
                  <Checkbox
                    key={group.id}
                    isChecked={groupIdsToAdd.includes(group.id!)}
                    onChange={() => handleCheckboxChangeForAdd(group.id!)}
                  >
                    <Link
                      to={`${AUTH_LAYOUT_ROUTE}/${GROUP_ROUTE}/${group.id}`}
                    >
                      {group.name}
                    </Link>
                  </Checkbox>
                ))}
            </Stack>
          </OverflowYContainer>
          <Button
            sx={buttonSytle}
            colorScheme={blue}
            onClick={handleAddUserToGroups}
          >
            Add To Group
          </Button>
        </Box>
      </Box>
    );

  return <></>;
};

export default UserGroupsPage;

const buttonSytle = {
  w: { base: "100%", sm: "60%" },
  mt: 30,
};
