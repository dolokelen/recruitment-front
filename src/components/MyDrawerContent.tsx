import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Flex,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import {
  APPLICANT_BIODATA_FORM_ROUTE,
  APP_DATES_ROUTE,
  APP_DOCUMENT_CREATE_ROUTE,
  GROUP_CREATE_ROUTE,
} from "../cacheKeysAndRoutes";
import { hasPermission } from "../utilities/hasPermissions";

const MyDrawerContent = () => {
  const canViewGroup = hasPermission("Can view group");
  const canAddGroup = hasPermission("Can add group");
  const canViewApplicationDate = hasPermission("Can view application date");

  return (
    <Accordion
      defaultIndex={[0]}
      allowMultiple
      borderRadius="20px"
      bg="blue.900"
    >
      {/* Starts from here*/}
      {canViewGroup && (
        <AccordionItem border="none">
          <h2
            style={{
              backgroundColor: "black",
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
          <AccordionPanel pb={4}>
            <Link to={GROUP_CREATE_ROUTE}>Group List</Link>
          </AccordionPanel>
          {canAddGroup && (
            <AccordionPanel pb={4}>
              <Link to={GROUP_CREATE_ROUTE}>Create Group</Link>
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
                Application Date
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            <Flex flexDirection="column" gap={2}>
              <Link to={APP_DATES_ROUTE}>Application Dates</Link>
              <Link to={APPLICANT_BIODATA_FORM_ROUTE}>Applicant Biodata Form</Link>
              <Link to={APP_DOCUMENT_CREATE_ROUTE}>Applicant Document Form</Link>
            </Flex>
          </AccordionPanel>
        </AccordionItem>
      )}

      <AccordionItem border="none">
        <h2
          style={{
            backgroundColor: "green",
            marginTop: "1rem",
            borderRadius: "20px",
          }}
        >
          <AccordionButton>
            <Box as="span" flex="1" textAlign="left">
              Sitle
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4}>
          Good!
          {/* Content goes here */}
        </AccordionPanel>
      </AccordionItem>

      <AccordionItem border="none">
        <h2
          style={{
            backgroundColor: "gold",
            marginTop: "1rem",
            borderRadius: "20px",
            fontWeight: "bold",
          }}
        >
          <AccordionButton>
            <Box as="span" flex="1" textAlign="left">
              Sitle
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4}>
          Good
          {/* Content goes here */}
        </AccordionPanel>
      </AccordionItem>

      <AccordionItem border="none">
        <h2
          style={{
            backgroundColor: "orange",
            marginTop: "1rem",
            borderRadius: "20px",
            fontWeight: "bold",
          }}
        >
          <AccordionButton>
            <Box as="span" flex="1" textAlign="left">
              Sitle
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4}>
          Goods
          {/* Content goes here */}
        </AccordionPanel>
      </AccordionItem>

      <AccordionItem border="none">
        <h2
          style={{
            backgroundColor: "brown",
            marginTop: "1rem",
            borderRadius: "20px",
            fontWeight: "bold",
          }}
        >
          <AccordionButton>
            <Box as="span" flex="1" textAlign="left">
              Sitle
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4}>
          Google
          {/* Content goes here */}
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
};

export default MyDrawerContent;
