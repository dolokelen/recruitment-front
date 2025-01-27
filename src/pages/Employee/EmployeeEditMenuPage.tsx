import { Box, Flex, Text } from "@chakra-ui/react";
import { GiRotaryPhone } from "react-icons/gi";
import { PiMapPinLine } from "react-icons/pi";
import { RxAvatar } from "react-icons/rx";
import { useNavigate } from "react-router-dom";
import { GrDocumentPdf } from "react-icons/gr";
import { FaLayerGroup } from "react-icons/fa6";
import {
  AUTH_LAYOUT_ROUTE,
  EMPLOYEES_ROUTE,
  EMPLOYEE_ADDR_EDIT_ROUTE,
  EMPLOYEE_CONTACT_CREATE_ROUTE,
  EMPLOYEE_PROFILE_EDIT_ROUTE,
  EMP_ADDRESS_CREATE_ROUTE,
  EMP_CONTACTS_EDIT_LIST_ROUTE,
  EMP_DOCUMENT_CREATE_ROUTE,
  USER_GROUP_ROUTE,
} from "../../cacheKeysAndRoutes";
import { useEmployee } from "../../hooks/useEmployees";
import { hasPermission } from "../../utilities/hasPermissions";
import AccessDenyPage from "../AccessDenyPage";

const EmployeeEditMenuPage = () => {
  const navigate = useNavigate();
  const selectedEmpId = localStorage.getItem("bugId");
  const { data: employee } = useEmployee(parseInt(selectedEmpId!));
  if (!hasPermission("Can change employee")) return <AccessDenyPage />;
  const iconSize = "6rem";
  const leftMargin = 6;

  return (
    <Flex
      _hover={{ cursor: "pointer" }}
      justifyContent="space-evenly"
      width="inherit"
      color="#810000"
      mt={4}
    >
      <Box>
        <RxAvatar
          size={iconSize}
          onClick={() =>
            navigate(`${AUTH_LAYOUT_ROUTE}/${EMPLOYEE_PROFILE_EDIT_ROUTE}`)
          }
        />
        <Text ml={leftMargin}>Image</Text>
      </Box>
      {/* I'm creating employee without contact that's the reason for the below condition */}
      <Box>
        <GiRotaryPhone
          size={iconSize}
          onClick={() =>
            navigate(
              `${AUTH_LAYOUT_ROUTE}/${
                employee?.contacts.length !== 0
                  ? EMP_CONTACTS_EDIT_LIST_ROUTE
                  : EMPLOYEE_CONTACT_CREATE_ROUTE
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
                employee?.address
                  ? EMPLOYEE_ADDR_EDIT_ROUTE
                  : EMP_ADDRESS_CREATE_ROUTE
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
                employee?.documents.length !== 0
                  ? EMPLOYEES_ROUTE
                  : EMP_DOCUMENT_CREATE_ROUTE
              }`
            )
          }
        />
        <Text ml={leftMargin}>Documents</Text>
      </Box>
      <Box>
        <FaLayerGroup
          size={iconSize}
          onClick={() => navigate(`${AUTH_LAYOUT_ROUTE}/${USER_GROUP_ROUTE}`)}
        />
        <Text ml={leftMargin}>Group</Text>
      </Box>
    </Flex>
  );
};

export default EmployeeEditMenuPage;
