import { Flex, Link } from "@chakra-ui/react";

const UnAuthNavBar = () => {
//   const [userId, setUserId] = useState<number | undefined>();
//   const authUserId = getUserId();

//   useEffect(() => {
//     if (authUserId) {
//       setUserId(authUserId);
//     }
//   }, [authUserId]);

  return (
    <Flex justifyContent="space-evenly" backgroundColor='gray'>
      <Link>Home</Link>
      {/* <Link>Dashboard</Link> */}
      <Link>Login</Link>
      <Link>About Us</Link>
      <Link>Programs</Link>
      <Link>Apply</Link>
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
  );
};

export default UnAuthNavBar;
