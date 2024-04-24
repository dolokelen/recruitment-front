import { useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient, { formDataConfig } from "../services/httpService";
import { CACHE_KEY_APPLICANT } from "../cacheKeysAndRoutes";

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
  id: number; //Not included in the applicant create form
  id_number: string; //Not included in the applicant create form
  gender: string;
  birth_date: string;
  county: string;
  religion: string;
  image: string;
  status: string; //Not included in the applicant create form
  rejection_reason: string; //Not included in the applicant create form
  app_document: ApplicantDocument;
  app_address: ApplicantAddress;
  app_contact: ApplicantContact;
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
