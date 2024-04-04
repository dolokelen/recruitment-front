import {
  Box,
  Button,
  Checkbox,
  Heading,
  List,
  ListItem,
  Text,
} from "@chakra-ui/react";
import OverflowYContainer from "./OverflowYContainer";
import { useDeleteAllGroup, useGroups } from "../hooks/useGroups";
import { red } from "../colors";
import MySpinner from "../components/MySpinner";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import BulkDeleteButton from "../utilities/BulkDeleteButton";
import { Link } from "react-router-dom";
import { AUTH_LAYOUT_ROUTE, GROUP_ROUTE } from "../cacheKeysAndRoutes";
import styles from "../styles";

const GroupList = () => {
  const { data: groups, error, isLoading } = useGroups();
  const [selectedGroups, setSelectedGroups] = useState<number[]>([]);
  const handleDeleteAll = useDeleteAllGroup(
    selectedGroups,
    () => toast.success("All deleted successfully!"),
    () => {
      setSelectedGroups([]);
    }
  );

  useEffect(() => {
    console.log(selectedGroups);
  }, [selectedGroups]);
  // const canAddGroup = hasPermission("Can add group");
  // const canDeleteGroup = hasPermission("Can delete group");

  // if (!hasPermission("Can view group")) return <AccessDenyPage />;

  const handleCheckboxChange = (groupId: number) => {
    if (selectedGroups.includes(groupId)) {
      setSelectedGroups(selectedGroups.filter((id) => id !== groupId));
    } else {
      setSelectedGroups([...selectedGroups, groupId]);
    }
  };

  if (error) return <Text color={red}>{error.message}</Text>;
  if (isLoading) return <MySpinner />;

  return (
    <>
      <Heading sx={styles.groupListHeading}>Group List</Heading>
      <OverflowYContainer>
        <List>
          {groups?.map((group) => (
            <ListItem key={group.id} sx={styles.groupListItems}>
              <Checkbox
                isChecked={selectedGroups.includes(group.id)}
                onChange={() => handleCheckboxChange(group.id)}
              >
                <Link to={`${AUTH_LAYOUT_ROUTE}/${GROUP_ROUTE}/${group.id}`}>
                  {group.name}
                </Link>
              </Checkbox>
            </ListItem>
          ))}
        </List>
      </OverflowYContainer>

      {/* The delete all button */}
      <Box sx={styles.groupListButtonBox}>
        {selectedGroups.length === 0 ? (
          <Button
            sx={styles.groupListButtonDisable}
            colorScheme={styles.groupListButtonDisable.colorScheme}
            isActive
            isDisabled
          >
            Delete All
          </Button>
        ) : (
          <BulkDeleteButton
            mt={styles.groupListDeleteAllButton.mt}
            p={styles.groupListDeleteAllButton.p}
            mdWidth={styles.groupListDeleteAllButton.width.md}
            baseWidth={styles.groupListDeleteAllButton.width.base}
            smWidth={styles.groupListDeleteAllButton.width.sm}
            label={selectedGroups.length > 1 ? "Delete All" : "Delete"}
            onDelete={handleDeleteAll}
            selectedItem={selectedGroups.length}
            entityName="Group"
          />
        )}
      </Box>
    </>
  );
};

export default GroupList;
