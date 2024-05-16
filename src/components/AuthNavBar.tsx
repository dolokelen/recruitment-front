import autoRouteToHome from "../utilities/getHomeRoute";
import {
  APP_BIODATA_FORM_ROUTE,
  AUTH_LAYOUT_ROUTE,
  PROFILE_ROUTE,
} from "../cacheKeysAndRoutes";
import { Link } from "react-router-dom";
import { HStack } from "@chakra-ui/react";
import logoutUser from "../utilities/logoutUser";
import { ToastContainer } from "react-toastify";
import { RiLogoutCircleLine } from "react-icons/ri";
import MyDrawer from "./MyDrawer";
import MyAvatar from "./MyAvatar";

const AuthNavBar = () => {
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
        <Link to={APP_BIODATA_FORM_ROUTE}>Apply</Link>
        <Link to={autoRouteToHome()} onClick={logoutUser}>
          <RiLogoutCircleLine title="Logout" size="1.6rem" />
        </Link>
        {/* <ColorModeSwitch /> */}
        <Link to={PROFILE_ROUTE}>
          <MyAvatar />
        </Link>
      </HStack>
      <ToastContainer />
    </>
  );
};

export default AuthNavBar;
