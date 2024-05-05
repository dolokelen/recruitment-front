import { Heading, Text } from "@chakra-ui/react";
import { ApplicantAddress } from "../../hooks/useApplicantAddress";

interface Props {
  address?: ApplicantAddress;
}

const ApplicantAddressPage = ({ address }: Props) => {
  return (
    <>
      <Heading sx={headingStyle}>Current Address</Heading>
      <Text sx={textStyle}>Country: {address?.country}</Text>
      <Text sx={textStyle}>County: {address?.county}</Text>
      <Text sx={textStyle}>District: {address?.district}</Text>
      <Text sx={textStyle}>Community: {address?.community}</Text>
      <Text sx={textStyle}>House Address: {address?.house_address}</Text>
    </>
  );
};

export default ApplicantAddressPage;

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
