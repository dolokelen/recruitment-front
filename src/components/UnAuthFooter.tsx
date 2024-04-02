import { Box, Flex } from "@chakra-ui/react";
import { white } from "../colors";

const UnAuthFooter = () => {
  return (
    <Flex justifyContent="space-evenly" py={{base: 8, sm: 20}} px={4} color={white}>
      <Box>This is the footer</Box>
      <Box>This is the footer</Box>
      <Box>This is the footer</Box>
      <Box>This is the footer</Box>
    </Flex>
  );
};

export default UnAuthFooter;
