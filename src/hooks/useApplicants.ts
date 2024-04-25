import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import apiClient, { formDataConfig } from "../services/httpService";
import { APPLICANT_PROFILE_ROUTE, AUTH_LAYOUT_ROUTE, CACHE_KEY_APPLICANT } from "../cacheKeysAndRoutes";
import { User } from "./useUsers";
import ms from "ms";
import { useNavigate } from "react-router-dom";
import { ApplicantDocument } from "./useApplicantDocuments";


// interface ApplicantAddress {
//   id: number;
//   country: string;
//   county: string;
//   district: number;
//   community: string;
//   house_address: string;
// }

// interface ApplicantContact {
//   id: number;
//   phone: string;
// }

interface Applicant {
  user: User;
  id_number: string;
  gender: string;
  age: number;
  birth_date: string;
  county: string;
  religion: string;
  image: string;
  status: string;
  full_name: string;
  rejection_reason: string;
  document: ApplicantDocument;
  // app_address: ApplicantAddress;
  // app_contact: ApplicantContact;
}

const APPLICANT_URL = "/recruitment/applicants/";

const apiClients = apiClient<Data>(APPLICANT_URL);
type Data = FormData;
export const useCreateApplication = (
  onCreate: () => void,
  reset: () => void
) => {
  const queryClient = useQueryClient();
  return useMutation<Data, Error, Data>({
    mutationFn: (data: Data) => apiClients.post(data, formDataConfig),

    onSuccess: () => {
      onCreate();
      reset();

      return queryClient.invalidateQueries({
        queryKey: [CACHE_KEY_APPLICANT],
      });
    },
  });
};

export const useApplicant = (applicantId: number) => {
  const apiClients = apiClient<Applicant>(APPLICANT_URL);
  return useQuery<Applicant, Error>({
    queryKey: [CACHE_KEY_APPLICANT, applicantId],
    queryFn: () => apiClients.get(applicantId),
    staleTime: ms("24h"),
  });
};

export const useEditApplicantImage = (
  onUpdate: () => void,
  applicantId: number
) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation<Data, Error, Data>({
    mutationFn: (data: Data) => apiClients.patchFormData(data, applicantId),

    onSuccess: () => {
      navigate(`${AUTH_LAYOUT_ROUTE}/${APPLICANT_PROFILE_ROUTE}`)
      onUpdate();
      
      return queryClient.invalidateQueries({
        queryKey: [CACHE_KEY_APPLICANT],
      });
    },
  });
};
