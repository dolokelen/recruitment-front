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
import { red } from "../colors";
import MySpinner from "../components/MySpinner";
import DeletionConfirmation from "../utilities/DeletionConfirmation";
import styles from "../styles";

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

      <Box sx={styles.groupDetailPageWrapper}>
        <Box sx={styles.groupPermissionsHeadingBox}>
          <Heading sx={styles.groupPermissionsHeading}>
            Group Permissions
          </Heading>
          <OverflowYContainer>
            <List>
              {group?.permissions?.length ? (
                group.permissions?.map((p) => (
                  <ListItem sx={styles.groupPermissionsListItems} key={p.id}>
                    <Checkbox
                      isChecked={selectedPermissions.includes(p.id)}
                      onChange={() => handleCheckboxChange(p.id)}
                    >
                      {p.name}
                    </Checkbox>
                  </ListItem>
                ))
              ) : (
                <ListItem sx={styles.noAssignPermissionsListItem}>
                  No assigned permission
                </ListItem>
              )}
            </List>
          </OverflowYContainer>
          {selectedPermissions.length === 0 ? (
            <Button
              sx={styles.groupPermissionsRemoveButton}
              colorScheme={styles.groupPermissionsRemoveButton.colorScheme}
              isActive
              isDisabled
            >
              Remove
            </Button>
          ) : (
            <Button
              sx={styles.groupPermissionsRemoveButton}
              onClick={handlePermissionsRemoval}
              colorScheme={styles.groupPermissionsRemoveButton.colorScheme}
              isActive
            >
              Remove
            </Button>
          )}
        </Box>

        <Box sx={styles.deleteGroupButtonBoxForDesktop}>
          <DeletionConfirmation
            entityId={groupId}
            entityName={group?.name}
            label="Delete Group"
            onMutate={() => mutation.mutate(groupId)}
          />
        </Box>

        <Box sx={styles.availablePermissionsHeadingBox}>
          <Heading sx={styles.availablePermissionsHeading}>
            Available Permissions
          </Heading>
          <PermissionList assignPermissions={group?.permissions} />
        </Box>

        <Box sx={styles.deleteGroupButtonBoxForMobile}>
          <DeletionConfirmation
            entityId={groupId}
            entityName={group?.name}
            label="Delete Group"
            onMutate={() => mutation.mutate(groupId)}
            baseWidth={styles.deleteGroupButtonForMobile.display.base}
            smWidth={styles.deleteGroupButtonForMobile.display.sm}
            mdWidth={styles.deleteGroupButtonForMobile.display.md}
          />
        </Box>
      </Box>
    </>
  );
};

export default GroupDetailPage;
