import { Link } from "react-router-dom";
import { red } from "../colors";
import MySpinner from "../components/MySpinner";
import { useApplicant } from "../hooks/useApplicants";
import { baseURL } from "../services/httpService";
import getUserId from "../utilities/getUserId";
import { Text, Container, Image, Heading, Box, Badge } from "@chakra-ui/react";
import {
  APPLICANT_PROFILE_EDIT_ROUTE,
  AUTH_LAYOUT_ROUTE,
} from "../cacheKeysAndRoutes";
import ApplicantDocumentPage from "./ApplicantDocumentPage";

const ApplicantProfilePage = () => {
  const { data: applicant, isLoading, error } = useApplicant(getUserId()!);
  if (isLoading) return <MySpinner />;
  if (error) return <Text color={red}>{error.message}</Text>;

  const statusColor = applicant?.status === "Unsuccessful" ? "red" : "green";
  return (
    <Box display={{ md: "flex" }} bg="blue.100" mt={4} pt={4}>
      <Container centerContent>
        <Box flexShrink={0}>
          <Image
            borderRadius="lg"
            w="inherit"
            maxH="500px"
            src={baseURL + applicant?.image}
            alt={applicant?.user.full_name}
          />
          <Box mt={4} textDecoration="underline">
            <Link to={`${AUTH_LAYOUT_ROUTE}/${APPLICANT_PROFILE_EDIT_ROUTE}`}>
              Update Your Profile
            </Link>
          </Box>
        </Box>
      </Container>

      <Container centerContent>
        <Box>
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
          {/* Document */}
          {applicant?.document && (
            <ApplicantDocumentPage document={applicant?.document} />
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
