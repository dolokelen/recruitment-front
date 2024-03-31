import { useEffect, useState } from "react";
import { Link as RLink } from "react-router-dom";
import {
  Box,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Link,
  Avatar,
} from "@chakra-ui/react";
import { HOME_ROUTE, REGISTER_ROUTE } from "../cacheKeysAndRoutes";
import UnAuthNavBar from "./UnAuthNavBar";

const MobileNav = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Avatar onClick={onOpen} m={2} />
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody display="flex" flexDirection="column" gap={1}>
            <RLink to={HOME_ROUTE}>Home</RLink>
            <Link>Dashboard</Link>
            <Link>Login</Link>
            <Link>About Us</Link>
            <Link>Programs</Link>
            <RLink to={REGISTER_ROUTE} onClick={onClose}>
              Apply
            </RLink>
            <Link>Connect</Link>
            <Link>Resources</Link>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

const Navbar = () => {
  const [isMobile, setIsMobile] = useState(false);

  // Update isMobile state based on screen width
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1024);
    };
    handleResize(); // Check initial screen width
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Box bg="whiteAlpha">{isMobile ? <MobileNav /> : <UnAuthNavBar />}</Box>
  );
};

export default Navbar;
