import { Flex } from "@chakra-ui/react";

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
        Auth Side Bar
        {/* <DashBoard /> */}
      </Flex>
    </Flex>
  );
};

export default AuthSideBar;
