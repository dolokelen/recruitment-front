import {
  useDisclosure,
  Button,
  Drawer,
  DrawerContent,
  DrawerCloseButton,
  DrawerBody,
  DrawerFooter,
  Link,
} from "@chakra-ui/react";
import { useRef } from "react";
import { IoIosMenu } from "react-icons/io";
import MyDrawerContent from "./MyDrawerContent";

function MyDrawer() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef<HTMLAnchorElement>(null);

  return (
    <>
      <Link ref={btnRef} color="teal" onClick={onOpen}>
        <IoIosMenu size="2.5rem" color="white" />
      </Link>
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerContent>
          <DrawerCloseButton />
          {/* <DrawerHeader>Create your account</DrawerHeader> */}
          {/* The content goes here */}
          <DrawerBody>
            <MyDrawerContent />
          </DrawerBody>

          <DrawerFooter>
            <Button variant="outline" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="blue">Save</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default MyDrawer;
