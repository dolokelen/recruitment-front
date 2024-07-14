import { Box, Button, Select, SimpleGrid, Text } from "@chakra-ui/react";
import {
  useProcessApplicants,
  useQualifyApplicants,
} from "./useApplicantScreening";
import { applicantStatus, rejectionReasons } from "../../utilities/staticData";
import ApplicantDocumentPage from "../Applicant/ApplicantDocumentPage";
import { useState, useEffect, FormEvent } from "react";
import ApplicantScreeningCard from "./ApplicantScreeningCard";
import { useApplicationDates } from "../../hooks/useApplicationdate";
import getUserId from "../../utilities/getUserId";

const ApplicantScreening = () => {
  //Examiners don't need to know the appliants for transparency.
  //You can distribute the 'background check', 'prove of community
  //service', and 'writen exams' to diffent examiners randomly everytime

  const { data: applicants, error } = useQualifyApplicants();
  const { data: applicationDate } = useApplicationDates();
  const processApplicants = useProcessApplicants();

  if (error) return <Text color="red">{error.message}</Text>;

  const [isDocumentVisible, setVisibility] = useState(false);
  const [showOptions, setShowOptions] = useState<{ [key: number]: boolean }>(
    {}
  );
  const [statusSelections, setStatusSelections] = useState<
    { applicantId: number; value: string }[]
  >([]);
  const [rejectionReason, setRejectionReason] = useState<
    { applicantId: number; value: string }[]
  >([]);

  useEffect(() => {
    console.log("Combination: ", { ...statusSelections, ...rejectionReason });
    console.log(statusSelections, "  ", rejectionReason);
  }, [statusSelections, rejectionReason]);

  const handleStatusChange = (applicantId: number, value: string) => {
    setStatusSelections((prevSelections) => {
      const updatedSelections = prevSelections.filter(
        (selection) => selection.applicantId !== applicantId
      );
      return [...updatedSelections, { applicantId, value }];
    });

    if (value !== "Unsuccessful") {
      setRejectionReason((prevReasons) =>
        prevReasons.filter((reason) => reason.applicantId !== applicantId)
      );
    }
  };

  const handleRejectionReasonChange = (applicantId: number, value: string) => {
    setRejectionReason((prevReasons) => {
      const updatedReasons = prevReasons.filter(
        (reason) => reason.applicantId !== applicantId
      );
      return [...updatedReasons, { applicantId, value }];
    });
  };

  const getStatusSelection = (applicantId: number) => {
    const selection = statusSelections.find(
      (selection) => selection.applicantId === applicantId
    );
    return selection ? selection.value : "";
  };

  const getRejectionReason = (applicantId: number) => {
    const reason = rejectionReason.find(
      (reason) => reason.applicantId === applicantId
    );
    return reason ? reason.value : "";
  };

  const getApplicantsStatus = () => {
    const rejectionReasonLookup = rejectionReason.reduce(
      (acc, { applicantId, value }) => {
        acc[applicantId] = value;
        return acc;
      },
      {} as { [id: number]: string }
    );

    return statusSelections.map(({ applicantId, value }) => ({
      applicant: applicantId,
      status: value,
      stage: applicants![0].stage_id,
      rejection_reason: rejectionReasonLookup[applicantId] || null,
      process_by: getUserId()!,
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    processApplicants.mutate({ applicants: getApplicantsStatus() });
  };
  return (
    <form onSubmit={handleSubmit}>
      {/* Applicants list */}
      <SimpleGrid spacingY={4} columns={{ base: 1, sm: 2, md: 3, lg: 4 }}>
        {applicants?.map((applicant) => (
          <ApplicantScreeningCard
            stageName={applicant.stage_name}
            applicationDate={
              applicationDate?.find((date) => date.is_current)?.open_date
            }
            status={applicant.status}
            applicantId={applicant.id_number}
            key={applicant.user.id}
          >
            <Text
              _hover={{ cursor: "pointer" }}
              mb={2}
              fontSize={{ base: ".5rem", sm: "1.2rem" }}
              color="brown"
              onClick={() => setVisibility(!isDocumentVisible)}
            >
              {isDocumentVisible ? "Hide Document" : "Show Document"}
            </Text>
            {isDocumentVisible && (
              <ApplicantDocumentPage document={applicant.document} />
            )}
            <Button
              onClick={() =>
                setShowOptions({
                  ...showOptions,
                  [applicant.user.id]: !showOptions[applicant.user.id],
                })
              }
            >
              Choose Status
            </Button>
            {showOptions[applicant.user.id] && (
              <Box mt={2}>
                <Select
                  placeholder="--Select--"
                  value={getStatusSelection(applicant.user.id)}
                  onChange={(e) =>
                    handleStatusChange(applicant.user.id, e.target.value)
                  }
                >
                  {applicantStatus.map((status) => (
                    <option key={status.name} value={status.name}>
                      {status.name}
                    </option>
                  ))}
                </Select>
                {getStatusSelection(applicant.user.id) === "Unsuccessful" && (
                  <Select
                    mt={2}
                    placeholder="---Select Reason---"
                    value={getRejectionReason(applicant.user.id)}
                    onChange={(e) =>
                      handleRejectionReasonChange(
                        applicant.user.id,
                        e.target.value
                      )
                    }
                  >
                    {rejectionReasons.map((reason) => (
                      <option key={reason.name} value={reason.name}>
                        {reason.name}
                      </option>
                    ))}
                  </Select>
                )}
              </Box>
            )}
          </ApplicantScreeningCard>
        ))}
      </SimpleGrid>

      <Button colorScheme="blue" type="submit">
        Submit
      </Button>
    </form>
  );
};

export default ApplicantScreening;
