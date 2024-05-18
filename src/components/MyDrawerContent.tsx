import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Flex,
  Stack,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import {
  APP_DATES_ROUTE,
  EMPLOYEES_ROUTE,
  EMPLOYEE_CREATE_ROUTE,
  EMP_PROFILE_ROUTE,
  GROUP_CREATE_ROUTE,
} from "../cacheKeysAndRoutes";
import { hasPermission } from "../utilities/hasPermissions";

const MyDrawerContent = () => {
  const canViewGroup = hasPermission("Can view group");
  const canAddGroup = hasPermission("Can add group");
  const canViewApplicationDate = hasPermission("Can view application date");
  const canViewEmployee = hasPermission("Can view employee");
  const canAddEmployee = hasPermission("Can add employee");
  return (
    <Accordion
      defaultIndex={[0]}
      allowMultiple
      borderRadius="20px"
      bg="blue.900"
    >
      {/* GROUPS */}
      {canViewGroup && (
        <AccordionItem border="none">
          <h2
            style={{
              backgroundColor: "tomato",
              borderRadius: "20px",
            }}
          >
            <AccordionButton flexWrap="wrap">
              <Box as="span" flex="1" textAlign="left">
                Group
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          {canAddGroup && (
            <AccordionPanel pb={4}>
              <Link to={GROUP_CREATE_ROUTE}>Create</Link>
            </AccordionPanel>
          )}
        </AccordionItem>
      )}

      {/* EMPLOYEES */}
      {canViewEmployee && (
        <AccordionItem border="none" mt={4}>
          <h2
            style={{
              backgroundColor: "black",
              borderRadius: "20px",
            }}
          >
            <AccordionButton flexWrap="wrap">
              <Box as="span" flex="1" textAlign="left">
                Employee
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel>
            <Stack>
              <Link to={EMPLOYEES_ROUTE}>Employees</Link>
              <Link to={EMP_PROFILE_ROUTE}>Profile</Link>
            </Stack>
            </AccordionPanel>
          {canAddEmployee && (
            <AccordionPanel>
              <Link to={EMPLOYEE_CREATE_ROUTE}>Create</Link>
            </AccordionPanel>
          )}
        </AccordionItem>
      )}

      {canViewApplicationDate && (
        <AccordionItem border="none">
          <h2
            style={{
              backgroundColor: "red",
              marginTop: "1rem",
              borderRadius: "20px",
            }}
          >
            <AccordionButton>
              <Box as="span" flex="1" textAlign="left">
                App. Date
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            <Flex flexDirection="column" gap={2}>
              <Link to={APP_DATES_ROUTE}>Application Dates</Link>
            </Flex>
          </AccordionPanel>
        </AccordionItem>
      )}
    </Accordion>
  );
};

export default MyDrawerContent;
