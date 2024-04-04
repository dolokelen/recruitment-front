import { Grid, GridItem } from "@chakra-ui/react";
import { useEffect } from "react";
import { Outlet, useSearchParams } from "react-router-dom";
import UnAuthLayout from "./UnAuthLayout";
import getUserId from "../utilities/getUserId";
import LoginPage from "../accounts/LoginPage";
import {
  authSideBarBgColor,
  authmainAreaBgColor,
  navbarColor,
  white,
} from "../colors";
import AuthNavBar from "./AuthNavBar";
import AuthSideBar from "./AuthSideBar";

const AuthLayout = () => {
  // const location = useLocation();
  const [params, setParams] = useSearchParams();
  const userId = params.get("userId");

  const removeUserIdQueryParam = () => {
    if (userId) {
      params.delete("userId");
      setParams(params);
    }
  };

  useEffect(() => {
    if (userId) {
      removeUserIdQueryParam();
    }
  }, [userId]);

  if (getUserId())
    return (
      <Grid
        templateAreas={`"header header"
                  "sidebar main"
                  `}
        gridTemplateRows={"auto 1fr"}
        gridTemplateColumns={"auto 1fr"}
        h="100vh"
      >
        <GridItem p={[2, 4]} bg={navbarColor} color={white} area={"header"}>
          <AuthNavBar />
        </GridItem>

        <GridItem p="1" bg={authSideBarBgColor} area={"sidebar"}>
          <AuthSideBar />
        </GridItem>

        <GridItem bg={authmainAreaBgColor} area={"main"} mr={4}>
          <Outlet />
        </GridItem>
      </Grid>
    );
  return <UnAuthLayout children={<LoginPage />} />;

  //   <Grid
  //     templateAreas={{
  //       base: `"nav nav" "main"`,
  //       sm: `"nav nav" "aside main"`,
  //     }}

  //     templateColumns={{
  //       base: `auto 1fr`,
  //       sm: `auto 1fr`,
  //     }}
  //   >
  //     <GridItem area="nav" backgroundColor="gold">
  //       <AuthNavBar />
  //     </GridItem>

  //     {/* <Show above="sm"> */}
  //     <GridItem area="aside" backgroundColor="green">
  //       {children ? <></> : <AuthSideBar />}
  //     </GridItem>
  //     {/* </Show> */}
  //     <GridItem mx={3} area="main" backgroundColor="red">
  //       {/* {children ? children : <AuthHomePage />} */}
  //       {location.pathname === AUTH_LAYOUT_ROUTE ||
  //       location.pathname === `${AUTH_LAYOUT_ROUTE}/` ? (
  //         <AuthHomePage />
  //       ) : (
  //         <Outlet />
  //       )}
  //     </GridItem>
  //   </Grid>
};

export default AuthLayout;
