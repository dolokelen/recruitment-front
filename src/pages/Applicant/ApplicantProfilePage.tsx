import { Link } from "react-router-dom";
import { red } from "../../colors";
import MySpinner from "../../components/MySpinner";
import { useApplicant } from "../../hooks/useApplicants";
import getUserId from "../../utilities/getUserId";
import { Text, Container, Image, Heading, Box, Badge } from "@chakra-ui/react";
import {
  APP_PROFILE_EDIT_MENU_ROUTE,
  AUTH_LAYOUT_ROUTE,
} from "../../cacheKeysAndRoutes";
import ApplicantDocumentPage from "./ApplicantDocumentPage";
import ApplicantAddressPage from "./ApplicantAddressPage";
import ApplicantContactPage from "./ApplicantContactPage";

const ApplicantProfilePage = () => {
  const { data: applicant, isLoading, error } = useApplicant(getUserId()!);

  if (isLoading) return <MySpinner />;
  if (error) return <Text color={red}>{error.message}</Text>;
  const statusColor = applicant?.status === "Unsuccessful" ? "red" : "green";
  return (
    <Box display={{ md: "flex" }} bg="blue.100" mt={4} pt={4}>
      <Container centerContent>
        <Box flexShrink={0} w="inherit">
          <Image
            borderRadius="lg"
            w="inherit"
            maxH="500px"
            src={applicant?.image}
            alt={applicant?.user.full_name}
          />
          <Box mt={2} mb={4} color="blue.600">
            <Link to={`${AUTH_LAYOUT_ROUTE}/${APP_PROFILE_EDIT_MENU_ROUTE}`}>
              Update Your Profile
            </Link>
          </Box>
          <Box w="inherit">
            <Heading sx={headingStyle}>{applicant?.user.full_name}</Heading>
            <Text sx={textStyle}>Email: {applicant?.user.email}</Text>
            <Text sx={textStyle}>ID Number: {applicant?.id_number}</Text>
            <Badge sx={badgeStyle} colorScheme={statusColor}>
              Status: {applicant?.status}
            </Badge>
            <Text sx={textStyle}>Gender: {applicant?.gender}</Text>
            <Text sx={textStyle}>Age: {applicant?.age}</Text>
            <Text sx={textStyle}>County of Origin: {applicant?.county}</Text>
            <Text sx={textStyle}>Religion: {applicant?.religion}</Text>
            <Text sx={textStyle}>Birth Date: {applicant?.birth_date}</Text>
            {applicant?.rejection_reason && (
              <Text sx={textStyle}>
                Reason for Rejection: {applicant?.rejection_reason}
              </Text>
            )}
            <ApplicantContactPage contacts={applicant?.contacts} />
          </Box>
        </Box>
      </Container>

      <Container centerContent>
        <Box w="inherit">
          {/* Document */}
          {applicant?.document && (
            <ApplicantDocumentPage document={applicant?.document} />
          )}
          {/* Address */}
          {applicant?.address && (
            <ApplicantAddressPage address={applicant?.address} />
          )}
        </Box>
      </Container>
    </Box>
  );
};

export default ApplicantProfilePage;

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

const badgeStyle = {
  mb: common.mb,
  fontSize: common.fontSize,
  textTransform: "capitalize",
};
