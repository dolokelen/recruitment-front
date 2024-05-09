import autoRouteToHome from "../utilities/getHomeRoute";
import {
  APPLICANT_BIODATA_FORM_ROUTE,
  AUTH_LAYOUT_ROUTE,
} from "../cacheKeysAndRoutes";
import { Link } from "react-router-dom";
import { HStack } from "@chakra-ui/react";
import logoutUser from "../utilities/logoutUser";
import { ToastContainer } from "react-toastify";
import { RiLogoutCircleLine } from "react-icons/ri";
import MyDrawer from "./MyDrawer";
import MyAvatar from "./MyAvatar";

const AuthNavBar = () => {
  // const { data: userProfile } = useUserProfile();

  return (
    <>
      <HStack
        bg="dark"
        h={{ base: 16, sm: 9 }}
        mb={1}
        justifyContent="space-evenly"
      >
        <MyDrawer />
        <Link to={autoRouteToHome()}>Website</Link>
        <Link to={AUTH_LAYOUT_ROUTE}>Dashboard</Link>
        <Link to={APPLICANT_BIODATA_FORM_ROUTE}>Apply</Link>
        <Link to={autoRouteToHome()} onClick={logoutUser}>
          <RiLogoutCircleLine title="Logout" size="1.6rem" />
        </Link>
        {/* <Link to={PROFILE_ROUTE}>Welcome {userProfile?.last_name}</Link> */}
        {/* <ColorModeSwitch /> */}
        <Link to="#">
          <MyAvatar />
        </Link>
      </HStack>
      <ToastContainer />
    </>
  );
};

export default AuthNavBar;
