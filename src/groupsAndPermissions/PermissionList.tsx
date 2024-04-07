import { Box, Button, Checkbox, List, ListItem, Text } from "@chakra-ui/react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useAddGroupPermissions } from "../hooks/useGroups";
import { Permission, usePermissions } from "../hooks/usePermissions";
import OverflowYContainer from "./OverflowYContainer";
import { red } from "../colors";
import MySpinner from "../components/MySpinner";
import styles from "../styles";

interface StyleSheet {
  pl?: number;
  pr?: number;
  pt?: number;
  pb?: number;
}

interface Props extends StyleSheet {
  assignPermissions?: Permission[];
}

const PermissionList = ({ assignPermissions, pl }: Props) => {
  const { data: allPermissions, isLoading, error } = usePermissions();
  const [selectedPermissions, setSelectedPermissions] = useState<number[]>([]);

  const { id } = useParams();
  const groupId = parseInt(id!);

  const handleAddPermissions = useAddGroupPermissions(
    { id: groupId, permission_ids_to_add: selectedPermissions },
    () => {
      setSelectedPermissions([]);
      toast.success("Permissions removed successfully!");
    }
  );

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
    <OverflowYContainer>
      <List>
        {allPermissions
          ?.filter((p) => !assignPermissions?.some((ap) => ap.id === p.id))
          .map((p) => (
            <ListItem pl={pl}>
              <Checkbox
                isChecked={selectedPermissions.includes(p.id)}
                onChange={() => handleCheckboxChange(p.id)}
              >
                {p.name}
              </Checkbox>
            </ListItem>
          ))}
      </List>
      {selectedPermissions.length === 0 ? (
        // This Box gives the button 100% width
        <Box sx={styles.permissionsAddButtonsWrapper}>
          <Button
            sx={styles.addButtonDisable}
            colorScheme={styles.addButtonDisable.colorScheme}
            isActive
            isDisabled
            width="inherit"
          >
            Add
          </Button>
        </Box>
      ) : (
        <Box sx={styles.permissionsAddButtonsWrapper}>
          <Button
            sx={styles.addButton}
            colorScheme={styles.addButton.colorScheme}
            isActive
            onClick={handleAddPermissions}
            width="inherit"
          >
            Add
          </Button>
        </Box>
      )}
    </OverflowYContainer>
  );
};

export default PermissionList;
