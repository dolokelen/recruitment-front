import { Container, Heading, List, ListItem } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import {
  AUTH_LAYOUT_ROUTE,
  EMPLOYEE_CONTACT_EDIT_ROUTE,
} from "../../cacheKeysAndRoutes";
import { useEmployeeContacts } from "../../hooks/useEmpContacts";

const EmployeeContactsEditList = () => {
  const navigate = useNavigate();
  const selectedEmpId = parseInt(localStorage.getItem("bugId")!);
  const { data: contacts } = useEmployeeContacts(selectedEmpId);
  return (
    <Container centerContent mt={4}>
      <Heading textDecoration="underline">Select number to update</Heading>
      <List>
        {contacts?.map((cont) => (
          <ListItem
            m={2}
            _hover={{
              cursor: "pointer",
              textDecoration: "underline",
              color: "blue",
            }}
            key={cont.id}
            onClick={() =>
              navigate(
                `${AUTH_LAYOUT_ROUTE}/${EMPLOYEE_CONTACT_EDIT_ROUTE}?contactId=${cont.id}`
              )
            }
          >
            {cont.phone}
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default EmployeeContactsEditList;
