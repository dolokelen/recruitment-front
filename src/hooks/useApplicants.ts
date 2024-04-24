import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import apiClient, { formDataConfig } from "../services/httpService";
import { CACHE_KEY_APPLICANT } from "../cacheKeysAndRoutes";
import { User } from "./useUsers";
import ms from "ms";

interface ApplicantDocument {
  id: number;
  cgpa: string;
  major: string;
  manor: string;
  county: string;
  resume: string; //
  degree: string; //
  country: string;
  institution: string;
  qualification: string;
  graduation_year: number;
  application_letter: string; //
  community_letter: string; //
  reference_letter: string; //
  police_clearance: string; //
}

interface ApplicantAddress {
  id: number;
  country: string;
  county: string;
  district: number;
  community: string;
  house_address: string;
}

interface ApplicantContact {
  id: number;
  phone: string;
}

interface Applicant {
  user: User;
  id_number: string;
  gender: string;
  birth_date: string;
  county: string;
  religion: string;
  image: string;
  status: string;
  full_name: string;
  rejection_reason: string;
  // app_document: ApplicantDocument;
  // app_address: ApplicantAddress;
  // app_contact: ApplicantContact;
}

const APPLICANT_URL = "/recruitment/applicants/";

type Data = FormData;
export const useCreateApplication = (
  onCreate: () => void,
  reset: () => void
) => {
  const apiClients = apiClient<Data>(APPLICANT_URL);
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