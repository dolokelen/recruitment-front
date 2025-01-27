import { Flex, Heading, Text } from "@chakra-ui/react";
import { isRouteErrorResponse, useRouteError } from "react-router-dom";
import { red500 } from "../colors";

const ErrorPage = () => {
  const error = useRouteError();
  return (
    <>
      <Flex backgroundColor="gold" mt="20vh" justifyContent="center">
        <Heading mr="10px">Oops!</Heading>
        {isRouteErrorResponse(error) ? (
          <Text fontSize={40} color={red500}>
            Page Does Not Exist.
          </Text>
        ) : (
          //Does not render in a component as the component won't be
          //able to display. Synth err or missing import will show this err
          <Text fontSize={40} color={red500}>
            Something is not right, the system has notified the developer.
          </Text>
        )}
      </Flex>
    </>
  );
};

export default ErrorPage;
