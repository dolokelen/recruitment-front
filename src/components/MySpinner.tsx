import { Spinner } from "@chakra-ui/react";

interface Props {
  ml?: number;
  mt?: number;
  size?: string;
  thickness?: string;
}
const MySpinner = ({
  ml = 12,
  mt = 12,
  size = "lg",
  thickness = "4px",
}: Props) => {
  return (
    <Spinner
      thickness={thickness}
      speed="0.65s"
      emptyColor="gray.200"
      color="blue.500"
      size={size}
      ml={ml}
      mt={mt}
    />
  );
};

export default MySpinner;
