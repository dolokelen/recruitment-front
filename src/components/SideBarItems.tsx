import { Stack } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { GROUP_CREATE_ROUTE } from "../cacheKeysAndRoutes";

const SideBarItems = () => {
  return (
    <Stack color="blue.900" fontWeight="bold">
      <Link to={GROUP_CREATE_ROUTE}>Groups</Link>
    </Stack>
  );
};

export default SideBarItems;
