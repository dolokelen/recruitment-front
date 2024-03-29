import { Flex, Heading, Text } from "@chakra-ui/react";
import { isRouteErrorResponse, useRouteError } from "react-router-dom";
import { red } from "../colors";

const ErrorPage = () => {
  const error = useRouteError();
  return (
    <>
      <Flex
        backgroundColor="gold"
        mt="20vh"
        justifyContent="center"
      >
        <Heading mr="10px">Oops!</Heading>
        {isRouteErrorResponse(error) ? (
          <Text fontSize={40} color={red}>
            Page Does Not Exist.
          </Text>
        ) : (
          <Text fontSize={40} color={red}>
            Something is not right, the system has notified the developer and it
            will be resolved soon.
          </Text>
        )}
      </Flex>
    </>
  );
};

export default ErrorPage;