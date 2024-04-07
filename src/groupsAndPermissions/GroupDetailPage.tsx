import {
  Box,
  Button,
  Checkbox,
  Grid,
  GridItem,
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
      {/* 
      The 1st GridItem colSpan={6} determines the Grid number of columns. 
      This makes margin be set on the Grid. If you use gridTemplateColumns 
      the margin property won't work for the Grid unless you set it on GridItems.  
      */}

      <Grid sx={styles.groupDetailGrid}>
        <GridItem colSpan={6}>
          <GroupEditForm />
        </GridItem>

        <GridItem colSpan={{ base: 6, sm: 3 }}>
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
              // This Box gives the button 100% width
              <Box sx={styles.groupPermissionsRemoveButtonWrapper}>
                <Button
                  sx={styles.groupPermissionsRemoveButton}
                  colorScheme={styles.groupPermissionsRemoveButton.colorScheme}
                  isActive
                  isDisabled
                  width="inherit"
                >
                  Remove
                </Button>
              </Box>
            ) : (
              <Box sx={styles.groupPermissionsRemoveButtonWrapper}>
                <Button
                  sx={styles.groupPermissionsRemoveButton}
                  onClick={handlePermissionsRemoval}
                  colorScheme={styles.groupPermissionsRemoveButton.colorScheme}
                  isActive
                  width="inherit"
                >
                  Remove
                </Button>
              </Box>
            )}
          </Box>
        </GridItem>

        <GridItem colSpan={{ base: 6, sm: 3 }}>
          <Box sx={styles.availablePermissionsHeadingBox}>
            <Heading sx={styles.availablePermissionsHeading}>
              Available Permissions
            </Heading>
            <PermissionList
              assignPermissions={group?.permissions}
              pl={styles.groupAvailablePermissionsListItems.pl}
            />
          </Box>
        </GridItem>

        {/* The mt is unneccessary all GridItems should have the 
            same gap but while it's not working in these situations? */}
        <GridItem colSpan={6} mt={{ base: 6, md: -6 }}>
          <DeletionConfirmation
            entityId={groupId}
            entityName={group?.name}
            label="Delete Group"
            baseWidth={styles.deleteGroupButtonWidth.base}
            smWidth={styles.deleteGroupButtonWidth.sm}
            mdWidth={styles.deleteGroupButtonWidth.md}
            onMutate={() => mutation.mutate(groupId)}
          />
        </GridItem>
      </Grid>
    </>
  );
};

export default GroupDetailPage;
