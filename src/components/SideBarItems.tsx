import { Stack } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { CREATE_GROUP_ROUTE } from "../cacheKeysAndRoutes";

const SideBarItems = () => {
  return (
    <Stack color="blue.900" fontWeight="bold">
      <Link to={CREATE_GROUP_ROUTE}>Groups</Link>
    </Stack>
  );
};

export default SideBarItems;
