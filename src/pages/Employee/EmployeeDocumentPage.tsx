import { Text, Heading, Link, Stack } from "@chakra-ui/react";
import { EmployeeDocument } from "../../hooks/useEmpDocuments";

interface Props {
  document?: EmployeeDocument;
}

const EmployeeDocumentPage = ({ document }: Props) => {
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

      <Stack sx={textStyle}>
        <Link target="_blank" sx={linkStyle} href={document?.degree} download>
          Degree
        </Link>
        <Link
          target="_blank"
          sx={linkStyle}
          href={document?.application_letter}
          download
        >
          Application Letter
        </Link>
        <Link target="_blank" sx={linkStyle} href={document?.resume} download>
          Resume
        </Link>
        <Link
          target="_blank"
          sx={linkStyle}
          href={document?.reference_letter}
          download
        >
          Reference Letter
        </Link>
        <Link
          target="_blank"
          sx={linkStyle}
          href={document?.community_letter}
          download
        >
          Community Letter
        </Link>
      </Stack>
    </>
  );
};

export default EmployeeDocumentPage;

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
