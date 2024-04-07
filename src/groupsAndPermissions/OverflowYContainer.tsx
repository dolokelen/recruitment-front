import { Box } from "@chakra-ui/react";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  maxH?: string;
  width?: string;
  baseWidth?: string;
  smWidth?: string;
  mdWidth?: string;
  lgWidth?: string;
}

const OverflowYContainer = ({
  children,
  maxH,
  width,
  baseWidth,
  smWidth,
  mdWidth,
  lgWidth,
}: Props) => {
  return (
    <Box
      maxH={maxH ? maxH : "300px"}
      overflowY="auto"
      w={width}
      width={{ base: baseWidth, sm: smWidth, md: mdWidth, lg: lgWidth }}
    >
      {children}
    </Box>
  );
};

export default OverflowYContainer;
