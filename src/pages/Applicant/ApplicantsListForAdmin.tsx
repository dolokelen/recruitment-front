// import { Checkbox, SimpleGrid, Text, Select } from "@chakra-ui/react";
// import MySpinner from "../../components/MySpinner";
// import { red } from "../../colors";
// import { hasPermission } from "../../utilities/hasPermissions";
// import AccessDenyPage from "../AccessDenyPage";
// import { useApplicants } from "../../hooks/useApplicants";
// import ApplicantCard from "./ApplicantCard";
// import ApplicantDocumentPage from "./ApplicantDocumentPage";
// import { useEffect, useState } from "react";
// import { rejectionReasons } from "../../utilities/staticData";

// const ApplicantsListForAdmin = () => {
//   const [isDocumentVisible, setVisibility] = useState(false);
//   const [selectedApplicants, setSelectedApplicants] = useState<number[]>([]);
//   const [showSelect, setShowSelect] = useState<{ [key: number]: boolean }>({});

//   //   Just in case you need array of objects
//   //   const [showSelect, setShowSelect] = useState<Array<{ [key: number]: string }>>([]);

//   const { data: applicant, isLoading, error } = useApplicants();

//   useEffect(() => {
//     console.log("SELECT ", showSelect);
//   }, [showSelect]);

//   const handleCheckboxChange = (applicantId: number) => {
//     if (selectedApplicants.includes(applicantId)) {
//       setSelectedApplicants(
//         selectedApplicants.filter((id) => id !== applicantId)
//       );
//       setShowSelect({ ...showSelect, [applicantId]: false });
//     } else {
//       setSelectedApplicants([...selectedApplicants, applicantId]);
//       setShowSelect({ ...showSelect, [applicantId]: true });
//     }
//   };

//   if (!hasPermission("Can view applicant")) return <AccessDenyPage />;
//   if (isLoading) return <MySpinner />;
//   if (error) return <Text color={red}>{error.message}</Text>;

//   return (
//     <>
//       {/* Employees list */}
//       <SimpleGrid spacingY={4} columns={{ base: 1, sm: 2, md: 3, lg: 4 }}>
//         {applicant?.map((emp) => (
//           <ApplicantCard
//             image={emp.image}
//             fullName={emp.user.full_name}
//             gender={emp.gender}
//             birth_date={emp.birth_date}
//             age={emp.age}
//             status={emp.status}
//             email={emp.user.email}
//             phone={emp.contacts[0]?.phone}
//             key={emp.user.id}
//           >
//             <Text
//               color="brown"
//               onClick={() => setVisibility(!isDocumentVisible)}
//             >
//               {isDocumentVisible ? "Hide Document" : "Show Document"}
//             </Text>
//             {isDocumentVisible && (
//               <ApplicantDocumentPage document={emp.document} />
//             )}
//             <Checkbox
//               color={red}
//               isChecked={selectedApplicants.includes(emp.user.id)}
//               onChange={() => handleCheckboxChange(emp.user.id)}
//             >
//               Unsuccessful
//             </Checkbox>
//             {showSelect[emp.user.id] && (
//               <Select
//                 placeholder="---Select Reason---"
//                 onChange={(e) => console.log(e.target.value, " ", emp.user.id)}
//               >
//                 {rejectionReasons.map((reason) => (
//                   <option value={reason.name}>{reason.name}</option>
//                 ))}
//               </Select>
//             )}
//           </ApplicantCard>
//         ))}
//       </SimpleGrid>
//     </>
//   );
// };

// export default ApplicantsListForAdmin;

// import { Button, Checkbox, SimpleGrid, Text, Select, Box } from "@chakra-ui/react";
// import MySpinner from "../../components/MySpinner";
// import { red } from "../../colors";
// import { hasPermission } from "../../utilities/hasPermissions";
// import AccessDenyPage from "../AccessDenyPage";
// import { useApplicants } from "../../hooks/useApplicants";
// import ApplicantCard from "./ApplicantCard";
// import ApplicantDocumentPage from "./ApplicantDocumentPage";
// import { useEffect, useState } from "react";

// const ApplicantsListForAdmin = () => {
//   const [isDocumentVisible, setVisibility] = useState(false);
//   const [selectedApplicants, setSelectedApplicants] = useState<number[]>([]);
//   const [showOptions, setShowOptions] = useState<{ [key: number]: boolean }>({});
//   const [statusSelections, setStatusSelections] = useState<{ [key: number]: string }>({});
//   const [additionalSelections, setAdditionalSelections] = useState<{ [key: number]: string }>({});

//   const { data: applicant, isLoading, error } = useApplicants();

//   useEffect(() => {}, [selectedApplicants]);

//   const handleCheckboxChange = (applicantId: number) => {
//     if (selectedApplicants.includes(applicantId)) {
//       setSelectedApplicants(
//         selectedApplicants.filter((id) => id !== applicantId)
//       );
//       setShowOptions({ ...showOptions, [applicantId]: false });
//     } else {
//       setSelectedApplicants([...selectedApplicants, applicantId]);
//       setShowOptions({ ...showOptions, [applicantId]: true });
//     }
//   };

//   const handleStatusChange = (applicantId: number, value: string) => {
//     setStatusSelections({ ...statusSelections, [applicantId]: value });
//     if (value !== 'option3') {
//       setAdditionalSelections({ ...additionalSelections, [applicantId]: '' });
//     }
//   };

//   const handleAdditionalChange = (applicantId: number, value: string) => {
//     setAdditionalSelections({ ...additionalSelections, [applicantId]: value });
//   };

//   if (!hasPermission("Can view applicant")) return <AccessDenyPage />;
//   if (isLoading) return <MySpinner />;
//   if (error) return <Text color={red}>{error.message}</Text>;

//   return (
//     <>
//       {/* Employees list */}
//       <SimpleGrid spacingY={4} columns={{ base: 1, sm: 2, md: 3, lg: 4 }}>
//         {applicant?.map((emp) => (
//           <ApplicantCard
//             image={emp.image}
//             fullName={emp.user.full_name}
//             gender={emp.gender}
//             birth_date={emp.birth_date}
//             age={emp.age}
//             status={emp.status}
//             email={emp.user.email}
//             phone={emp.contacts[0]?.phone}
//             key={emp.user.id}
//           >
//             <Text
//               color="brown"
//               onClick={() => setVisibility(!isDocumentVisible)}
//             >
//               {isDocumentVisible ? "Hide Document" : "Show Document"}
//             </Text>
//             {isDocumentVisible && (
//               <ApplicantDocumentPage document={emp.document} />
//             )}
//             <Checkbox
//               color={red}
//               isChecked={selectedApplicants.includes(emp.user.id)}
//               onChange={() => handleCheckboxChange(emp.user.id)}
//             >
//               Unsuccessful
//             </Checkbox>
//             {showOptions[emp.user.id] && (
//               <Box mt={4}>
//                 <Button onClick={() => setShowOptions({ ...showOptions, [emp.user.id]: true })}>
//                   Choose Status
//                 </Button>
//                 {showOptions[emp.user.id] && (
//                   <Select
//                     mt={2}
//                     placeholder="Select status"
//                     value={statusSelections[emp.user.id] || ''}
//                     onChange={(e) => handleStatusChange(emp.user.id, e.target.value)}
//                   >
//                     <option value="option1">Option 1</option>
//                     <option value="option2">Option 2</option>
//                     <option value="option3">Option 3</option>
//                     <option value="option4">Option 4</option>
//                   </Select>
//                 )}
//                 {statusSelections[emp.user.id] === 'option3' && (
//                   <Select
//                     mt={2}
//                     placeholder="Additional options"
//                     value={additionalSelections[emp.user.id] || ''}
//                     onChange={(e) => handleAdditionalChange(emp.user.id, e.target.value)}
//                   >
//                     <option value="additional1">Additional 1</option>
//                     <option value="additional2">Additional 2</option>
//                     <option value="additional3">Additional 3</option>
//                   </Select>
//                 )}
//               </Box>
//             )}
//           </ApplicantCard>
//         ))}
//       </SimpleGrid>
//     </>
//   );
// };

// export default ApplicantsListForAdmin;

// import { Button, SimpleGrid, Text, Select, Box } from "@chakra-ui/react";
// import MySpinner from "../../components/MySpinner";
// import { red } from "../../colors";
// import { hasPermission } from "../../utilities/hasPermissions";
// import AccessDenyPage from "../AccessDenyPage";
// import { useApplicants } from "../../hooks/useApplicants";
// import ApplicantCard from "./ApplicantCard";
// import ApplicantDocumentPage from "./ApplicantDocumentPage";
// import { useState } from "react";
// import { applicantStatus, rejectionReasons } from "../../utilities/staticData";

// const ApplicantsListForAdmin = () => {
//   const [isDocumentVisible, setVisibility] = useState(false);
//   //   const [selectedApplicants, setSelectedApplicants] = useState<number[]>([]);
//   const [showOptions, setShowOptions] = useState<{ [key: number]: boolean }>(
//     {}
//   );
//   const [statusSelections, setStatusSelections] = useState<{
//     [key: number]: string;
//   }>({});
//   const [rejectionReason, setRejectionReason] = useState<{
//     [key: number]: string;
//   }>({});

//   const { data: applicant, isLoading, error } = useApplicants();

//   //   const handleCheckboxChange = (applicantId: number) => {
//   //     if (selectedApplicants.includes(applicantId)) {
//   //       setSelectedApplicants(
//   //         selectedApplicants.filter((id) => id !== applicantId)
//   //       );
//   //       setShowOptions({ ...showOptions, [applicantId]: false });
//   //     } else {
//   //       setSelectedApplicants([...selectedApplicants, applicantId]);
//   //       setShowOptions({ ...showOptions, [applicantId]: true });
//   //     }
//   //   };

//   const handleStatusChange = (applicantId: number, value: string) => {
//     setStatusSelections({ ...statusSelections, [applicantId]: value });
//     if (value !== "Unsuccessful") {
//       setRejectionReason({ ...rejectionReason, [applicantId]: "" });
//     }
//   };

//   const handleRejectionReasonChange = (applicantId: number, value: string) => {
//     setRejectionReason({ ...rejectionReason, [applicantId]: value });
//   };

//   if (!hasPermission("Can view applicant")) return <AccessDenyPage />;
//   if (isLoading) return <MySpinner />;
//   if (error) return <Text color={red}>{error.message}</Text>;

//   return (
//     <>
//       {/* Employees list */}
//       <SimpleGrid spacingY={4} columns={{ base: 1, sm: 2, md: 3, lg: 4 }}>
//         {applicant?.map((emp) => (
//           <ApplicantCard
//             image={emp.image}
//             fullName={emp.user.full_name}
//             gender={emp.gender}
//             birth_date={emp.birth_date}
//             age={emp.age}
//             status={emp.status}
//             email={emp.user.email}
//             phone={emp.contacts[0]?.phone}
//             key={emp.user.id}
//           >
//             <Text
//               color="brown"
//               onClick={() => setVisibility(!isDocumentVisible)}
//             >
//               {isDocumentVisible ? "Hide Document" : "Show Document"}
//             </Text>
//             {isDocumentVisible && (
//               <ApplicantDocumentPage document={emp.document} />
//             )}
//             <Button
//               onClick={() =>
//                 setShowOptions({
//                   ...showOptions,
//                   [emp.user.id]: !showOptions[emp.user.id],
//                 })
//               }
//             >
//               Choose Status
//             </Button>
//             {showOptions[emp.user.id] && (
//               <Box mt={2}>
//                 <Select
//                   placeholder="---Select Status---"
//                   value={statusSelections[emp.user.id] || ""}
//                   onChange={(e) =>
//                     handleStatusChange(emp.user.id, e.target.value)
//                   }
//                 >
//                   {applicantStatus.map((status) => (
//                     <option key={status.name}>{status.name}</option>
//                   ))}
//                 </Select>
//                 {statusSelections[emp.user.id] === "Unsuccessful" && (
//                   <Select
//                     mt={2}
//                     placeholder="---Select Reason---"
//                     value={rejectionReason[emp.user.id] || ""}
//                     onChange={(e) =>
//                       handleRejectionReasonChange(emp.user.id, e.target.value)
//                     }
//                   >
//                     {rejectionReasons.map((reason) => (
//                       <option value={reason.name}>{reason.name}</option>
//                     ))}
//                   </Select>
//                 )}
//               </Box>
//             )}
//           </ApplicantCard>
//         ))}
//       </SimpleGrid>
//     </>
//   );
// };

// export default ApplicantsListForAdmin;

import { Button, SimpleGrid, Text, Select, Box } from "@chakra-ui/react";
import MySpinner from "../../components/MySpinner";
import { red } from "../../colors";
import { hasPermission } from "../../utilities/hasPermissions";
import AccessDenyPage from "../AccessDenyPage";
import { useApplicants } from "../../hooks/useApplicants";
import ApplicantCard from "./ApplicantCard";
import ApplicantDocumentPage from "./ApplicantDocumentPage";
import { useEffect, useState } from "react";
import { applicantStatus, rejectionReasons } from "../../utilities/staticData";

const ApplicantsListForAdmin = () => {
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

  const { data: applicant, isLoading, error } = useApplicants();

  useEffect(() => {
    console.log("Combination: ", {...statusSelections, ...rejectionReason})
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
              _hover={{ cursor: "pointer" }}
              mb={4}
              color="brown"
              onClick={() => setVisibility(!isDocumentVisible)}
            >
              {isDocumentVisible ? "Hide Document" : "Show Document"}
            </Text>
            {isDocumentVisible && (
              <ApplicantDocumentPage document={emp.document} />
            )}
            <Button
              onClick={() =>
                setShowOptions({
                  ...showOptions,
                  [emp.user.id]: !showOptions[emp.user.id],
                })
              }
            >
              Choose Status
            </Button>
            {showOptions[emp.user.id] && (
              <Box mt={2}>
                <Select
                  placeholder="---Select Status---"
                  value={getStatusSelection(emp.user.id)}
                  onChange={(e) =>
                    handleStatusChange(emp.user.id, e.target.value)
                  }
                >
                  {applicantStatus.map((status) => (
                    <option key={status.name} value={status.name}>
                      {status.name}
                    </option>
                  ))}
                </Select>
                {getStatusSelection(emp.user.id) === "Unsuccessful" && (
                  <Select
                    mt={2}
                    placeholder="---Select Reason---"
                    value={getRejectionReason(emp.user.id)}
                    onChange={(e) =>
                      handleRejectionReasonChange(emp.user.id, e.target.value)
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
          </ApplicantCard>
        ))}
      </SimpleGrid>
    </>
  );
};

export default ApplicantsListForAdmin;
