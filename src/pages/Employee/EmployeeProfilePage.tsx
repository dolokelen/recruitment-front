import { Link } from "react-router-dom";
import { red } from "../../colors";
import MySpinner from "../../components/MySpinner";
import getUserId from "../../utilities/getUserId";
import { Text, Container, Image, Heading, Box } from "@chakra-ui/react";
import {
  AUTH_LAYOUT_ROUTE,
  EMPLOYEE_EDIT_MENU_ROUTE,
} from "../../cacheKeysAndRoutes";
import { useEmployee } from "../../hooks/useEmployees";
import EmployeeContactPage from "./EmployeeContactPage";
import EmployeeDocumentPage from "./EmployeeDocumentPage";
import EmployeeAddressPage from "./EmployeeAddressPage";

const EmployeeProfilePage = () => {
  const { data: employee, isLoading, error } = useEmployee(getUserId()!);

  if (isLoading) return <MySpinner />;
  if (error) return <Text color={red}>{error.message}</Text>;

  return (
    <Box display={{ md: "flex" }} bg="blue.100" mt={4} pt={4}>
      <Container centerContent>
        <Box flexShrink={0} w="inherit">
          <Image
            borderRadius="lg"
            w="inherit"
            maxH="500px"
            src={employee?.image}
            alt={employee?.user.full_name}
          />
          <Box mt={2} mb={4} color="blue.600">
            <Link to={`${AUTH_LAYOUT_ROUTE}/${EMPLOYEE_EDIT_MENU_ROUTE}`}>
              Update Your Profile
            </Link>
          </Box>
          <Box w="inherit">
            <Heading sx={headingStyle}>{employee?.user.full_name}</Heading>
            <Text sx={textStyle}>Email: {employee?.user.email}</Text>
            <Text sx={textStyle}>Position: {employee?.position}</Text>
            <Text sx={textStyle}>Gender: {employee?.gender}</Text>
            <Text sx={textStyle}>Birth Date: {employee?.birth_date}</Text>
            <Text sx={textStyle}>Age: {employee?.age}</Text>
            <Text sx={textStyle}>Degree: {employee?.qualification}</Text>
            <Text sx={textStyle}>Employee type: {employee?.employment}</Text>
            <Text sx={textStyle}>
              Monthly salary: {`${employee?.salary.toFixed(2)} $`}
            </Text>
            <Text sx={textStyle}>Religion: {employee?.religion}</Text>
            {employee?.supervisor && (
              <Text sx={textStyle}>Supervisor: {employee?.supervisor}</Text>
            )}
            <EmployeeContactPage contacts={employee?.contacts} />
          </Box>
        </Box>
      </Container>

      <Container centerContent>
        <Box w="inherit">
          {/* Document */}
          {employee?.documents && (
            <EmployeeDocumentPage document={employee?.documents[0]} />
          )}
          {/* Address */}
          {employee?.address && (
            <EmployeeAddressPage address={employee?.address} />
          )}
        </Box>
      </Container>
    </Box>
  );
};

export default EmployeeProfilePage;

const common = {
  fontSize: { base: "1rem", sm: "1.5rem" },
  mb: 2,
};

const headingStyle = {
  fontSize: { base: "1.5rem", sm: "2rem" },
  mb: 1,
  mt: { base: 4, md: "auto" },
};

const textStyle = {
  mb: common.mb,
  fontSize: common.fontSize,
};
