import {
  Box,
  Button,
  Checkbox,
  Heading,
  List,
  ListItem,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

import GroupEditForm from "./GroupEditForm";
import OverflowYContainer from "./OverflowYContainer";
import PermissionList from "./PermissionList";
import {
  useDeleteGroup,
  useGroup,
  useUpdateGroupPermissions,
} from "../hooks/useGroups";
import { blue, red } from "../colors";
import MySpinner from "../components/MySpinner";
import DeletionConfirmation from "../utilities/DeletionConfirmation";

const GroupDetailPage = () => {
  const { id } = useParams();
  const groupId = parseInt(id!);

  const { data: group, isLoading, error } = useGroup(groupId);

  const mutation = useDeleteGroup(() => toast.success("Deleted successfully."));
  const [selectedPermissions, setSelectedPermissions] = useState<number[]>([]);

  const handlePermissionsRemoval = useUpdateGroupPermissions(
    { id: groupId, permission_ids_to_remove: selectedPermissions },
    () => {
      setSelectedPermissions([]);
      toast.success("Permissions removed successfully!");
    }
  );

  // const canChangeGroup = hasPermission("Can change group");
  // const canChangePermission = hasPermission("Can change permission");

  // if (!hasPermission("Can view group")) return <AccessDenyPage />;
  if (error) return <Text color={red}>{error.message}</Text>;
  if (isLoading) return <MySpinner />;

  const handleCheckboxChange = (permissionId: number) => {
    if (selectedPermissions.includes(permissionId)) {
      setSelectedPermissions(
        selectedPermissions.filter((id) => id !== permissionId)
      );
    } else {
      setSelectedPermissions([...selectedPermissions, permissionId]);
    }
  };

  return (
    <>
      <GroupEditForm />

      <Box
        my={8}
        px={4}
        display={{ md: "flex" }}
        justifyContent="space-between"
      >
        <Box>
          <Heading
            textAlign={{ base: "center" }}
            fontSize={{ base: "1rem", md: "1.5rem" }}
          >
            Group Permissions
          </Heading>
          <OverflowYContainer>
            <List>
              {group?.permissions?.length ? (
                group.permissions?.map((p) => (
                  <ListItem key={p.id}>
                    <Checkbox
                      isChecked={selectedPermissions.includes(p.id)}
                      onChange={() => handleCheckboxChange(p.id)}
                    >
                      {p.name}
                    </Checkbox>
                  </ListItem>
                ))
              ) : (
                <ListItem color={red}>No assigned permissions</ListItem>
              )}
            </List>
          </OverflowYContainer>
          {selectedPermissions.length === 0 ? (
            <Button
              mt={4}
              w={{ base: "90%", sm: "40%", md: "90%" }}
              mx={2}
              isActive
              isDisabled
              colorScheme={blue}
            >
              Remove
            </Button>
          ) : (
            <Button
              mt={4}
              w={{ base: "90%", sm: "40%", md: "90%" }}
              mx={2}
              isActive
              onClick={handlePermissionsRemoval}
              colorScheme={blue}
            >
              Remove
            </Button>
          )}
        </Box>

        <Box display={{ base: "none", md: "inline-block" }}>
          <DeletionConfirmation
            entityId={groupId}
            entityName={group?.name}
            label="Delete Group"
            onMutate={() => mutation.mutate(groupId)}
          />
        </Box>

        <Box>
          <Heading
            textAlign={{ base: "center" }}
            fontSize={{ base: "1rem", md: "1.5rem" }}
            marginTop={{ base: "2rem", sm: "2rem", md: 'auto' }}
          >
            Available Permissions
          </Heading>
          <PermissionList assignPermissions={group?.permissions} />
        </Box>

        <Box mt={{ base: 6 }} display={{ md: "none" }}>
          <DeletionConfirmation
            entityId={groupId}
            entityName={group?.name}
            label="Delete Group"
            onMutate={() => mutation.mutate(groupId)}
            baseWidth="100%"
            smWidth="40%"
            mdWidth="90%"
          />
        </Box>
      </Box>
    </>
  );
};

export default GroupDetailPage;
