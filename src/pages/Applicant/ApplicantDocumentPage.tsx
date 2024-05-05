import { Text, Heading, Link } from "@chakra-ui/react";
import { ApplicantDocument } from "../../hooks/useApplicantDocuments";
import { baseURL } from "../../services/httpService";

interface Props {
  document?: ApplicantDocument;
}

const ApplicantDocumentPage = ({ document }: Props) => {
  return (
    <>
      <Heading sx={headingStyle}>Document</Heading>
      <Text sx={textStyle}>Institution of Study: {document?.institution}</Text>
      <Text sx={textStyle}>Qualification: {document?.qualification}</Text>
      <Text sx={textStyle}>Major: {document?.major}</Text>
      <Text sx={textStyle}>Manor: {document?.manor}</Text>
      <Text sx={textStyle}>Cumulative GPA: {document?.cgpa}</Text>
      <Text sx={textStyle}>Country of Study: {document?.country}</Text>
      <Text sx={textStyle}>County/State of Study: {document?.county}</Text>
      <Text sx={textStyle}>Graduation Year: {document?.graduation_year}</Text>

      <Text sx={textStyle}>
        <Link
          target="_blank"
          sx={linkStyle}
          href={baseURL + document?.degree}
          download
        >
          Degree
        </Link>
      </Text>
      <Text sx={textStyle}>
        <Link
          target="_blank"
          sx={linkStyle}
          href={baseURL + document?.police_clearance}
          download
        >
          Police Clearance
        </Link>
      </Text>
      <Text sx={textStyle}>
        <Link
          target="_blank"
          sx={linkStyle}
          href={baseURL + document?.application_letter}
          download
        >
          Application Letter
        </Link>
      </Text>
      <Text sx={textStyle}>
        <Link
          target="_blank"
          sx={linkStyle}
          href={baseURL + document?.resume}
          download
        >
          Resume
        </Link>
      </Text>
      <Text sx={textStyle}>
        <Link
          target="_blank"
          sx={linkStyle}
          href={baseURL + document?.reference_letter}
          download
        >
          Reference Letter
        </Link>
      </Text>
      <Text sx={textStyle}>
        <Link
          target="_blank"
          sx={linkStyle}
          href={baseURL + document?.community_letter}
          download
        >
          Community Letter
        </Link>
      </Text>
    </>
  );
};

export default ApplicantDocumentPage;

const common = {
  fontSize: { base: "1rem", sm: "1.5rem" },
  mb: 2,
};

const headingStyle = {
  fontSize: { base: "1rem", sm: "1.5rem" },
  mt: { base: 4, md: "auto" },
  textDecoration: "underline",
};

const textStyle = {
  mb: common.mb,
  fontSize: common.fontSize,
};

const linkStyle = {
  color: "blue.600",
};
