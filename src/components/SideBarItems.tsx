import { Stack } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { CREATE_GROUP_ROUTE } from "../cacheKeysAndRoutes";

const SideBarItems = () => {
  return (
    <Stack>
      <Link to={CREATE_GROUP_ROUTE}>Create Group</Link>
    </Stack>
  );
};

export default SideBarItems;
