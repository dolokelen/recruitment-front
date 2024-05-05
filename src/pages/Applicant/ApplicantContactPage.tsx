import { Heading, Text } from "@chakra-ui/react";
import { ApplicantContacts } from "../../hooks/useApplicantContact";

interface Props {
  contacts?: ApplicantContacts[];
}

const ApplicantContactPage = ({ contacts }: Props) => {
  return (
    <>
      <Heading sx={headingStyle}>Contact(s)</Heading>
      {contacts?.map((contact) => (
        <Text key={contact.id} sx={textStyle}>
          {contact?.phone}
        </Text>
      ))}
    </>
  );
};

export default ApplicantContactPage;

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
