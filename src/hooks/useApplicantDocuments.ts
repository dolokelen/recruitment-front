import { useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient, { formDataConfig } from "../services/httpService";
import {
  APP_PROFILE_ROUTE,
  AUTH_LAYOUT_ROUTE,
  CACHE_KEY_APPLICANT,
} from "../cacheKeysAndRoutes";
import { useNavigate } from "react-router-dom";

export interface ApplicantDocument {
  applicant: number;
  cgpa: string;
  major: string;
  manor: string;
  county: string;
  resume: string;
  degree: string;
  country: string;
  institution: string;
  qualification: string;
  graduation_year: number;
  application_letter: string;
  community_letter: string;
  reference_letter: string;
  police_clearance: string;
}

const APP_DOCUMENT_URL = "/recruitment/applicant-documents/";

const apiClients = apiClient<Data>(APP_DOCUMENT_URL);
type Data = FormData;

export const useCreateApplicantDocument = (
  onCreate: () => void,
  reset: () => void
) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation<Data, Error, Data>({
    mutationFn: (data: Data) => apiClients.post(data, formDataConfig),

    onSuccess: () => {
      onCreate();
      reset();
      navigate(`${AUTH_LAYOUT_ROUTE}/${APP_PROFILE_ROUTE}`);

      return queryClient.invalidateQueries({
        // Applicant is fetching document
        queryKey: [CACHE_KEY_APPLICANT],
      });
    },
  });
};
