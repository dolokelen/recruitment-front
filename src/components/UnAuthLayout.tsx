import { Grid, GridItem } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import UnAuthFooter from "./UnAuthFooter";
import { ReactNode } from "react";
import MobileNav from "./MobileNav";

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
      backgroundColor="green.500"
    >
      <GridItem>
        <MobileNav />
      </GridItem>

      <GridItem>{children ? children : <Outlet />}</GridItem>

      <GridItem>
        <UnAuthFooter />
      </GridItem>
    </Grid>
  );
};

export default UnAuthLayout;
