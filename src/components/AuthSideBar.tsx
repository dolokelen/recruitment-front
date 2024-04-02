import { Flex } from "@chakra-ui/react";
import SideBarItems from "./SideBarItems";

const AuthSideBar = () => {
  return (
    <Flex
      bg="dark"
      pos="sticky"
      h="95vh"
      marginTop="-0.8vh"
      flexDir="column"
      justifyContent="space-between"
    >
      <Flex>
        <SideBarItems />
      </Flex>
    </Flex>
  );
};

export default AuthSideBar;
