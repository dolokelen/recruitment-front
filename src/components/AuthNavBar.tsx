import autoRouteToHome from "../utilities/getHomeRoute";
import { AUTH_LAYOUT_ROUTE } from "../cacheKeysAndRoutes";
import { Link } from "react-router-dom";
import { HStack } from "@chakra-ui/react";
import logoutUser from "../utilities/logoutUser";
import { ToastContainer } from "react-toastify";
import { RiLogoutCircleLine } from "react-icons/ri";

const AuthNavBar = () => {
  // const { data: userProfile } = useUserProfile();

  return (
    <>
      <HStack bg="dark" h={9} mb={1} justifyContent="space-evenly">
        <Link to={autoRouteToHome()}>Website</Link>
        <Link to={AUTH_LAYOUT_ROUTE}>Dashboard</Link>
        <Link to={autoRouteToHome()} onClick={logoutUser}>
          <RiLogoutCircleLine title="Logout" size="1.6rem" />
        </Link>
        {/* <Link to={PROFILE_ROUTE}>Welcome {userProfile?.last_name}</Link> */}
        {/* <ColorModeSwitch /> */}
      </HStack>
      <ToastContainer />
    </>
  );
};

export default AuthNavBar;
