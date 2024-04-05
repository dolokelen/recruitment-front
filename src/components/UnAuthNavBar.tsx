import { Flex } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import {
  AUTH_LAYOUT_ROUTE,
  HOME_ROUTE,
  LOGIN_ROUTE,
  REGISTER_ROUTE,
} from "../cacheKeysAndRoutes";
import { whiteFFF } from "../colors";
import { useEffect, useState } from "react";
import getUserId from "../utilities/getUserId";
import logoutUser from "../utilities/logoutUser";

const UnAuthNavBar = () => {
  const [userId, setUserId] = useState<number | undefined>();
  const authUserId = getUserId();

  useEffect(() => {
    if (authUserId) {
      setUserId(authUserId);
    }
  }, [authUserId]);

  return (
    <>
      <Flex justifyContent="space-evenly" color={whiteFFF}>
        <Link to={HOME_ROUTE}>Home</Link>
        {/* <Link>Dashboard</Link> */}
        <Link to="#">About Us</Link>
        <Link to="#">Programs</Link>
        <Link to={REGISTER_ROUTE}>Apply</Link>
        <Link to="#">Connect</Link>
        <Link to="#">Resources</Link>

        {/* The last "Login" route is used for the Dashboard "Logout" route.
      This dynamic btn label is for users who might use the "Website" logout btn.*/}
        {authUserId ? (
          <Link
            to={LOGIN_ROUTE}
            onClick={() => {
              logoutUser();
              setUserId(undefined);
            }}
          >
            {userId && "Logout"}
          </Link>
        ) : (
          <Link to={LOGIN_ROUTE}>Login</Link>
        )}
        {authUserId && <Link to={AUTH_LAYOUT_ROUTE}>Dashboard</Link>}
        {/* <ColorModeSwitch />  */}
      </Flex>
      <ToastContainer />
    </>
  );
};

export default UnAuthNavBar;
