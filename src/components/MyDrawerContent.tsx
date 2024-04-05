import {
  Accordion,
  Link,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
} from "@chakra-ui/react";
import { Link as ReactLink } from "react-router-dom";
import { GROUP_CREATE_ROUTE } from "../cacheKeysAndRoutes";

const MyDrawerContent = () => {
  return (
    <Accordion
      defaultIndex={[0]}
      allowMultiple
      borderRadius="20px"
      bg="blue.900"
    >
      {/* Starts from here*/}
      <AccordionItem border="none">
        <h2
          style={{
            backgroundColor: "black",
            borderRadius: "20px",
          }}
        >
          <AccordionButton flexWrap="wrap">
            <Box as="span" flex="1" textAlign="left">
              Familys
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4}>
          <ReactLink to={GROUP_CREATE_ROUTE}>Groups</ReactLink>
          <Box>
            <Link display="inline-block">My Profile</Link>
          </Box>
          <Box>
            <Link display="inline-block">Her Profile</Link>
          </Box>
          <Box>
            <Link display="inline-block">Their Profile</Link>
          </Box>
          <Box>
            <Link display="inline-block">Family Profile</Link>
          </Box>
        </AccordionPanel>
      </AccordionItem>

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
              Register Students
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4}>
          <Box>
            <Link display="inline-block">My Profile</Link>
          </Box>
          <Box>
            <Link display="inline-block">Her Profile</Link>
          </Box>
          <Box>
            <Link display="inline-block">Their Profile</Link>
          </Box>
          <Box>
            <Link display="inline-block">Family Profile</Link>
          </Box>
        </AccordionPanel>
      </AccordionItem>

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
