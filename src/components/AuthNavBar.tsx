import { Box } from "@chakra-ui/react";

const AuthNavBar = () => {
  return <Box>Auth Nav Bar</Box>;
  //   const { data: userProfile } = useUserProfile();

  //   return (
  //     <>
  //       <HStack bg="dark" h={9} mb={1} justifyContent="space-evenly">
  //         <Link to={authRouteToHomeRoute()}>Website</Link>
  //         <Link to={AUTH_LAYOUT_ROUTE}>Dashboard</Link>
  //         <Link to={authRouteToHomeRoute()} onClick={logoutUser}>
  //           Logout
  //         </Link>
  //         <Link to={PROFILE_ROUTE}>Welcome {userProfile?.last_name}</Link>
  //         <ColorModeSwitch />
  //       </HStack>
  //       <ToastContainer />
  //     </>
  //   );
};

export default AuthNavBar;
