import { Grid, GridItem } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import UnAuthFooter from "./UnAuthFooter";
import { ReactNode } from "react";
import MobileNav from "./MobileNav";
import {
  unAuthFooterBgColor,
  authmainAreaBgColor,
  navbarColor,
} from "../colors";

interface Props {
  children?: ReactNode;
}

const UnAuthLayout = ({ children }: Props) => {
  return (
    <Grid
      templateRows="auto 1fr auto"
      h="100vh"
      w="100vw"
      gap={0}
      overflowX="hidden"
    >
      <GridItem p={{ base: 1, sm: 2, md: 4 }} bg={navbarColor}>
        <MobileNav />
      </GridItem>

      <GridItem bg={authmainAreaBgColor}>
        {children ? children : <Outlet />}
      </GridItem>

      <GridItem bg={unAuthFooterBgColor}>
        <UnAuthFooter />
      </GridItem>
    </Grid>
  );
};

export default UnAuthLayout;
