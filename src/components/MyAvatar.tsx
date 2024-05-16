import { Avatar } from "@chakra-ui/react";
import getUserId from "../utilities/getUserId";
import { useEmployeeProfile } from "../hooks/useEmployees";
import { useApplicantProfile } from "../hooks/useApplicants";

const MyAvatar = () => {
  const userId = getUserId()!;
  const { data: employee } = useEmployeeProfile(userId);
  const { data: applicant } = useApplicantProfile(userId);

  if (employee)
    return <Avatar name={employee.user.full_name} src={employee?.image} />;
  if (applicant)
    return <Avatar name={applicant.user.full_name} src={applicant?.image} />;
};

export default MyAvatar;
