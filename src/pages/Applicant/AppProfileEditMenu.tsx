import { Box, Container, Flex, Text } from "@chakra-ui/react";
import { GiRotaryPhone } from "react-icons/gi";
import { PiMapPinLine } from "react-icons/pi";
import { RxAvatar } from "react-icons/rx";
import { useNavigate } from "react-router-dom";
import {
  APP_PROFILE_EDIT_ROUTE,
  APP_ADDRESS_EDIT_ROUTE,
  APP_CONTACTS_EDIT_LIST_ROUTE,
  AUTH_LAYOUT_ROUTE,
  APP_CONTACT_CREATE_ROUTE,
  APP_DOCUMENT_CREATE_ROUTE,
  APP_ADDRESS_CREATE_ROUTE,
  APP_PROFILE_ROUTE,
} from "../../cacheKeysAndRoutes";
import { useApplicant } from "../../hooks/useApplicants";
import getUserId from "../../utilities/getUserId";
import { GrDocumentPdf } from "react-icons/gr";

const ApplicantProfileEditMenu = () => {
  const navigate = useNavigate();
  const { data: applicant } = useApplicant(getUserId()!);

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
              navigate(`${AUTH_LAYOUT_ROUTE}/${APP_PROFILE_EDIT_ROUTE}`)
            }
          />
          <Text ml={leftMargin}>Image</Text>
        </Box>

        <Box>
          <GiRotaryPhone
            size={iconSize}
            onClick={() =>
              navigate(
                `${AUTH_LAYOUT_ROUTE}/${
                  applicant?.contacts.length !== 0
                    ? APP_CONTACTS_EDIT_LIST_ROUTE
                    : APP_CONTACT_CREATE_ROUTE
                }`
              )
            }
          />
          <Text ml={leftMargin}>Phone</Text>
        </Box>

        <Box>
          <PiMapPinLine
            size={iconSize}
            onClick={() =>
              navigate(
                `${AUTH_LAYOUT_ROUTE}/${
                  applicant?.address
                    ? APP_ADDRESS_EDIT_ROUTE
                    : APP_ADDRESS_CREATE_ROUTE
                }`
              )
            }
          />
          <Text ml={leftMargin}>Address</Text>
        </Box>

        <Box>
          <GrDocumentPdf
            size={iconSize}
            onClick={() =>
              navigate(
                `${AUTH_LAYOUT_ROUTE}/${
                  applicant?.document
                    ? APP_PROFILE_ROUTE
                    : APP_DOCUMENT_CREATE_ROUTE
                }`
              )
            }
          />
          <Text ml={leftMargin}>Documents</Text>
        </Box>
      </Flex>
    </Container>
  );
};

export default ApplicantProfileEditMenu;
