import { useApplicantProfile } from "../hooks/useApplicants";
import { useEmployeeProfile } from "../hooks/useEmployees";
import getUserId from "../utilities/getUserId";
import ApplicantProfilePage from "./Applicant/ApplicantProfilePage";
import EmployeeProfilePage from "./Employee/EmployeeProfilePage";

const ProfilesWrapper = () => {
  const userId = getUserId();
  const { data: employee } = useEmployeeProfile(userId!);
  const { data: applicant } = useApplicantProfile(userId!);

  const handleCurrentUserProfile = () => {
    let currentUser;
    if (employee && userId) {
      currentUser = employee.user.id === userId;
      if (currentUser) return <EmployeeProfilePage />;
    } else if (applicant && userId) {
      currentUser = applicant.user.id === userId;
      if (currentUser) return <ApplicantProfilePage />;
    }

    return <></>;
  };

  return handleCurrentUserProfile();
};

export default ProfilesWrapper;
