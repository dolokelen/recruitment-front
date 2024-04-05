import {
  Accordion,
  Link,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Flex,
} from "@chakra-ui/react";
import { Link as ReactLink } from "react-router-dom";
import { GROUP_CREATE_ROUTE } from "../cacheKeysAndRoutes";

const MyDrawerContent = () => {
  // return (
  //   <Stack color="blue.900" fontWeight="bold">
  //     <Link to={GROUP_CREATE_ROUTE}>Groups</Link>
  //   </Stack>
  // );

  return (
    <Flex
      bg="dark"
      pos="sticky"
      h="95vh"
      marginTop="-0.8vh"
      flexDir="column"
      justifyContent="space-between"
    >
      <Accordion defaultIndex={[0]} allowMultiple>
        {/* First starts here */}
        <AccordionItem>
          <h2
            style={{
              backgroundColor: "yellow",
              borderRadius: "20px",
              marginTop: "1rem",
            }}
          >
            <AccordionButton flexWrap="wrap">
              <Box as="span" flex="1" textAlign="left">
                Familys
              </Box>
              <AccordionIcon />
              {/* <MdOutlineMenu /> */}
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
        {/* First ends here */}

        <AccordionItem>
          <h2
            style={{
              backgroundColor: "red",
              marginTop: "1rem",
              borderRadius: "20px",
            }}
          >
            <AccordionButton>
              <Box as="span" flex="1" textAlign="left">
                Student
              </Box>
              <AccordionIcon />
              {/* <MdOutlineMenu /> */}
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

        {/* Another one starts */}
        <AccordionItem>
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
      </Accordion>
    </Flex>
  );
};

export default MyDrawerContent;
