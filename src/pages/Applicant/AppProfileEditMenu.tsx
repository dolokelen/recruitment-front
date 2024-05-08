import { Box, Container, Flex, Text } from "@chakra-ui/react";
import { GiRotaryPhone } from "react-icons/gi";
import { PiMapPinLine } from "react-icons/pi";
import { RxAvatar } from "react-icons/rx";
import { useNavigate } from "react-router-dom";
import {
  APPLICANT_PROFILE_EDIT_ROUTE,
  APP_ADDRESS_EDIT_ROUTE,
  APP_CONTACTS_EDIT_LIST_ROUTE,
  AUTH_LAYOUT_ROUTE,
} from "../../cacheKeysAndRoutes";

const ApplicantProfileEditMenu = () => {
  const navigate = useNavigate();

  const iconSize = "6rem";
  const leftMargin = 6;

  return (
    <Container centerContent mt={4}>
      <Flex
        _hover={{ cursor: "pointer" }}
        justifyContent="space-around"
        width="inherit"
        color="#810000"
      >
        <Box>
          <RxAvatar
            size={iconSize}
            onClick={() =>
              navigate(`${AUTH_LAYOUT_ROUTE}/${APPLICANT_PROFILE_EDIT_ROUTE}`)
            }
          />
          <Text ml={leftMargin}>Image</Text>
        </Box>

        <Box>
          <GiRotaryPhone
            size={iconSize}
            onClick={() =>
              navigate(`${AUTH_LAYOUT_ROUTE}/${APP_CONTACTS_EDIT_LIST_ROUTE}`)
            }
          />
          <Text ml={leftMargin}>Phone</Text>
        </Box>

        <Box>
          <PiMapPinLine
            size={iconSize}
            onClick={() =>
              navigate(`${AUTH_LAYOUT_ROUTE}/${APP_ADDRESS_EDIT_ROUTE}`)
            }
          />
          <Text ml={leftMargin}>Address</Text>
        </Box>
      </Flex>
    </Container>
  );
};

export default ApplicantProfileEditMenu;
