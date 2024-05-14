import { Heading, Text } from "@chakra-ui/react";
import { EmployeeContacts } from "../../hooks/useEmpContacts";

interface Props {
  contacts?: EmployeeContacts[];
}

const EmployeeContactPage = ({ contacts }: Props) => {
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

export default EmployeeContactPage;

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
