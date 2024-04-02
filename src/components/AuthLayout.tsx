import {
  Box,
  Text,
  Image,
  Grid,
  GridItem,
  Link,
} from "@chakra-ui/react";
import { ReactNode, useEffect } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import UnAuthLayout from "./UnAuthLayout";
import getUserId from "../utilities/getUserId";
import LoginPage from "../accounts/LoginPage";

interface Props {
  children?: ReactNode;
}

const AuthLayout = ({ children }: Props) => {
  const location = useLocation();
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

      <Grid
        // templateAreas={`"header header"
        //           "nav main"
        //           "nav footer"`}
        templateAreas={`"header header"
                  "nav main"
                  `}
        gridTemplateRows={"auto 1fr"}
        // gridTemplateRows={"auto 1fr auto"}
        gridTemplateColumns={"auto 1fr"}
        h="100vh"
        color="blackAlpha.700"
        fontWeight="bold"
      >
        <GridItem pl="2" bg="orange.300" area={"header"}>
          Header
        </GridItem>
        <GridItem pl="2" bg="pink.300" area={"nav"}>
          Nav
        </GridItem>
        <GridItem px="2" bg="green.300" area={"main"}>
          {/* <RegistrationForm /> */}
          {/* <Button colorScheme="red" variant={["sm", "lg"]} fontSize='lg !important'>Click me</Button> */}
          {/* <Input w={[230, 400, 500]} h={[9, 10, 10]} />
          <Box bg="red.200" w={[230, 400, 500]}>
            This is a box
          </Box> */}

          <Box p={4} display={{ md: "flex" }}>
            <Box flexShrink={0}>
              <Image
                borderRadius="lg"
                width={{ md: 40 }}
                src="https://bit.ly/2jYM25F"
                alt="Woman paying for a purchase"
              />
            </Box>
            <Box mt={{ base: 4, md: 0 }} ml={{ md: 6 }}>
              <Text
                fontWeight="bold"
                textTransform="uppercase"
                fontSize="md"
                letterSpacing="wide"
                color="teal.600"
                backgroundColor="tomato"
              >
                Marketing
              </Text>
              <Link
                mt={1}
                //   display="block"
                display={{ md: "block" }}
                backgroundColor={link.colors}
                fontSize="lg"
                lineHeight="normal"
                fontWeight="semibold"
                href="#"
              >
                Finding customers for your new business
              </Link>
              <Link
                mt={1}
                //   display="block"
                fontSize="lg"
                lineHeight="normal"
                fontWeight="semibold"
                href="#"
              >
                Finding customers for your new business
              </Link>
              <Text mt={2} color="gray.500">
                Getting a new business off the ground is a lot of hard work.
                Here are five ideas you can use to find your first customers.
              </Text>
            </Box>
          </Box>
        </GridItem>
        {/* <GridItem pl="2" bg="blue.300" area={"footer"}>
          Footer
        </GridItem> */}
      </Grid>
    );
  return <UnAuthLayout children={<LoginPage />} />;
};

export default AuthLayout;

const link = {
  colors: {
    base: "blue",//all mobiles
    sm: "yellow",//all tablets and medium laptops
    md: "red",//larger laptops
    lg: "green",
    xl: "black",
    "2xl": "purple",
  },
};
