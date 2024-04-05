import {
  useDisclosure,
  Drawer,
  DrawerContent,
  DrawerCloseButton,
  DrawerBody,
  Link,
  Flex,
} from "@chakra-ui/react";
import { useRef } from "react";
import { IoIosMenu } from "react-icons/io";
import MyDrawerContent from "./MyDrawerContent";

function MyDrawer() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const linkRef = useRef<HTMLAnchorElement>(null);

  return (
    <>
      <Link ref={linkRef} onClick={onOpen}>
        <IoIosMenu size="2.5rem" color="white" />
      </Link>

      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        finalFocusRef={linkRef}
      >
        {/* Children width are determine by maxWidth */}
        {/* DrawerContent and DrawerBody are the controlers of children as well */}
        <DrawerContent maxWidth="16rem">
          <DrawerCloseButton color="white" bg="red" />

          {/* <DrawerHeader>This is the Header</DrawerHeader> */}
          <DrawerBody bg="blue.800" color="white" pl={2}>
            {/* The content goes here. Flex is meant for UI design only*/}
            <Flex bg="blue.900" borderRadius="20px" boxShadow="dark-lg" p="6">
              <MyDrawerContent />
            </Flex>
          </DrawerBody>

          {/* <DrawerFooter bg="gold">
            <Button variant="outline" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="blue">Save</Button>
          </DrawerFooter> */}
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default MyDrawer;
