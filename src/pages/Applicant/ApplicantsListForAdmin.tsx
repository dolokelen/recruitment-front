import { Checkbox, SimpleGrid, Text, Select } from "@chakra-ui/react";
import MySpinner from "../../components/MySpinner";
import { red } from "../../colors";
import { hasPermission } from "../../utilities/hasPermissions";
import AccessDenyPage from "../AccessDenyPage";
import { useApplicants } from "../../hooks/useApplicants";
import ApplicantCard from "./ApplicantCard";
import ApplicantDocumentPage from "./ApplicantDocumentPage";
import { useEffect, useState } from "react";
import { rejectionReasons } from "../../utilities/staticData";

const ApplicantsListForAdmin = () => {
  const [isDocumentVisible, setVisibility] = useState(false);
  const [selectedApplicants, setSelectedApplicants] = useState<number[]>([]);
  const [showSelect, setShowSelect] = useState<{ [key: number]: boolean }>({});

  //   Just in case you need array of objects
  //   const [showSelect, setShowSelect] = useState<Array<{ [key: number]: string }>>([]);

  const { data: applicant, isLoading, error } = useApplicants();

  useEffect(() => {
    console.log("SELECT ", showSelect);
  }, [showSelect]);

  const handleCheckboxChange = (applicantId: number) => {
    if (selectedApplicants.includes(applicantId)) {
      setSelectedApplicants(
        selectedApplicants.filter((id) => id !== applicantId)
      );
      setShowSelect({ ...showSelect, [applicantId]: false });
    } else {
      setSelectedApplicants([...selectedApplicants, applicantId]);
      setShowSelect({ ...showSelect, [applicantId]: true });
    }
  };

  if (!hasPermission("Can view applicant")) return <AccessDenyPage />;
  if (isLoading) return <MySpinner />;
  if (error) return <Text color={red}>{error.message}</Text>;

  return (
    <>
      {/* Employees list */}
      <SimpleGrid spacingY={4} columns={{ base: 1, sm: 2, md: 3, lg: 4 }}>
        {applicant?.map((emp) => (
          <ApplicantCard
            image={emp.image}
            fullName={emp.user.full_name}
            gender={emp.gender}
            birth_date={emp.birth_date}
            age={emp.age}
            status={emp.status}
            email={emp.user.email}
            phone={emp.contacts[0]?.phone}
            key={emp.user.id}
          >
            <Text
              color="brown"
              onClick={() => setVisibility(!isDocumentVisible)}
            >
              {isDocumentVisible ? "Hide Document" : "Show Document"}
            </Text>
            {isDocumentVisible && (
              <ApplicantDocumentPage document={emp.document} />
            )}
            <Checkbox
              color={red}
              isChecked={selectedApplicants.includes(emp.user.id)}
              onChange={() => handleCheckboxChange(emp.user.id)}
            >
              Unsuccessful
            </Checkbox>
            {showSelect[emp.user.id] && (
              <Select
                placeholder="---Select Reason---"
                onChange={(e) => console.log(e.target.value, " ", emp.user.id)}
              >
                {rejectionReasons.map((reason) => (
                  <option value={reason.name}>{reason.name}</option>
                ))}
              </Select>
            )}
          </ApplicantCard>
        ))}
      </SimpleGrid>
    </>
  );
};

export default ApplicantsListForAdmin;
