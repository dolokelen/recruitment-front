import { Box } from "@chakra-ui/react";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  maxH?: string;
  w?: string;
}

const OverflowYContainer = ({ children, maxH, w }: Props) => {
  return (
    <Box maxH={maxH ? maxH : "300px"} overflowY="auto" w={w}>
      {children}
    </Box>
  );
};

export default OverflowYContainer;
