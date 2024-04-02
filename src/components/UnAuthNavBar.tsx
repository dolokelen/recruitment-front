import { Flex, Link } from "@chakra-ui/react";
import { Link as RLink } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { HOME_ROUTE, LOGIN_ROUTE, REGISTER_ROUTE } from "../cacheKeysAndRoutes";
import { white } from "../colors";

const UnAuthNavBar = () => {
//   const [userId, setUserId] = useState<number | undefined>();
//   const authUserId = getUserId();

//   useEffect(() => {
//     if (authUserId) {
//       setUserId(authUserId);
//     }
//   }, [authUserId]);

  return (
    <>
    <Flex justifyContent="space-evenly" color={white}>
      <RLink to={HOME_ROUTE}>Home</RLink>
      {/* <Link>Dashboard</Link> */}
      <RLink to={LOGIN_ROUTE}>Login</RLink>
      <Link>About Us</Link>
      <Link>Programs</Link>
      <RLink to={REGISTER_ROUTE}>Apply</RLink>
      <Link>Connect</Link>
      <Link>Resources</Link>

      {/* The last "Login" route is used for the Dashboard "Logout" route.
      This dynamic btn label is for users who might use the "Website" logout btn.*/}
      {/* {authUserId ? (
        <Link
          to={LOGIN_ROUTE}
          onClick={() => {
            logoutUser();
            setUserId(undefined);
          }}
        >
          {userId ? "Logout" : "Login"}
        </Link> */}
      {/* ) : (
        <Link to={LOGIN_ROUTE}>Login</Link>
      )}
      <ColorModeSwitch /> */}
    </Flex>
    <ToastContainer />
    </>
  );
};

export default UnAuthNavBar;
