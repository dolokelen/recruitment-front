import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CACHE_KEY_APPLICANT } from "../../cacheKeysAndRoutes";
import { ApplicantDocument } from "../../hooks/useApplicantDocuments";
import { User } from "../../hooks/useUsers";
import apiClient from "../../services/httpService";
import ms from "ms";

interface ApplicantScreening {
  user: User;
  id_number: string;
  stage_name: string;
  stage_id: number;
  status: string;
  document: ApplicantDocument;
}

const APPLICANT_STAGE_URL = "/recruitment/application-stages/";

export const useQualifyApplicants = () => {
  const apiClients = apiClient<ApplicantScreening>(APPLICANT_STAGE_URL);
  return useQuery<ApplicantScreening[], Error>({
    queryKey: [CACHE_KEY_APPLICANT], //Refetch anytime there's new applicant
    queryFn: apiClients.getAll,
    staleTime: ms("24h"),
  });
};

// interface AppScreening {
//   applicant: number;
//   status: string;
//   rejection_reason: string | null;
//   stage: string;
//   process_by: number;
// }
// export const useProcessApplicants = () => {
//   const queryClient = useQueryClient();
//   const APPLICANT_SCREENING_URL = "/recruitment/applicant-screenings/";
//   const apiClients = apiClient<AppScreening>(APPLICANT_SCREENING_URL)
//   return useMutation<void, Error, AppScreening[]>({
//     mutationFn: (data: AppScreening[]) => apiClients.postAll(data),

//     onSuccess: () => {
//       return queryClient.invalidateQueries({
//         queryKey: [CACHE_KEY_APPLICANT],
//       });
//     },
//   });
// };

interface AppScreening {
  applicant: number;
  status: string;
  rejection_reason: string | null;
  stage: number;
  process_by: number;
}

interface Data {
  applicants: AppScreening[];
}
export const useProcessApplicants = () => {
  const queryClient = useQueryClient();
  const APPLICANT_SCREENING_URL = "/recruitment/applicant-screenings/";
  const apiClients = apiClient<Data>(APPLICANT_SCREENING_URL);
  return useMutation<Data, Error, Data>({
    mutationFn: (applicants: Data) => apiClients.post(applicants),

    onSuccess: () => {
      return queryClient.invalidateQueries({
        queryKey: [CACHE_KEY_APPLICANT],
      });
    },
  });
};
