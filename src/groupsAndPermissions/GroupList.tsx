import { Checkbox, List, ListItem, Text } from "@chakra-ui/react";
import OverflowYContainer from "./OverflowYContainer";
import { MyHeading } from "../MyFormComponents";
import { useGroups } from "../hooks/useGroup";
import { red } from "../colors";
import MySpinner from "../components/MySpinner";

const GroupList = () => {
  const { data: groups, error, isLoading } = useGroups();

  if (error) return <Text color={red}>{error.message}</Text>;
  if (isLoading) return <MySpinner />;

  return (
    <>
      <MyHeading>Group List</MyHeading>
      <OverflowYContainer>
        <List>
          {groups?.map((g) => (
            <ListItem key={g.id}>
              <Checkbox>{g.name}</Checkbox>
            </ListItem>
          ))}
        </List>
      </OverflowYContainer>
    </>
  );
};

export default GroupList;
