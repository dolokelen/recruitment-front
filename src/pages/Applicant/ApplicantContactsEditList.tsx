import { Container, Heading, List, ListItem } from "@chakra-ui/react";
import { useApplicant } from "../../hooks/useApplicants";
import getUserId from "../../utilities/getUserId";
import { useNavigate } from "react-router-dom";
import {
  APP_CONTACT_EDIT_ROUTE,
  AUTH_LAYOUT_ROUTE,
} from "../../cacheKeysAndRoutes";

const ApplicantContactsEditList = () => {
  const navigate = useNavigate();
  const { data: applicant } = useApplicant(getUserId()!);
  return (
    <Container centerContent mt={4}>
      <Heading textDecoration="underline">Select number to edit</Heading>
      <List>
        {applicant?.contacts.map((cont) => (
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
                `${AUTH_LAYOUT_ROUTE}/${APP_CONTACT_EDIT_ROUTE}?contactId=${cont.id}`
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

export default ApplicantContactsEditList;
