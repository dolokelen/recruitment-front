import { Grid, GridItem } from "@chakra-ui/react";
import { useEffect } from "react";
import { Outlet, useSearchParams } from "react-router-dom";
import UnAuthLayout from "./UnAuthLayout";
import getUserId from "../utilities/getUserId";
import LoginPage from "../accounts/LoginPage";
import { authmainAreaBgColor, navbarColor, whiteFFF } from "../colors";
import AuthNavBar from "./AuthNavBar";

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
        templateAreas={`"header"
                  "main"
                  `}
        gridTemplateRows={"100px 1fr"}
        gridTemplateColumns={"1fr"}
        h="100vh"
      >
        <GridItem p={[2, 4]} bg={navbarColor} color={whiteFFF} area={"header"}>
          <AuthNavBar />
        </GridItem>

        <GridItem bg={authmainAreaBgColor} area={"main"}>
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
