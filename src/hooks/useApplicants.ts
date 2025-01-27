import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import apiClient, { formDataConfig } from "../services/httpService";
import {
  APP_PROFILE_ROUTE,
  APP_DOCUMENT_CREATE_ROUTE,
  AUTH_LAYOUT_ROUTE,
  CACHE_KEY_APPLICANT,
} from "../cacheKeysAndRoutes";
import { User } from "./useUsers";
import ms from "ms";
import { useNavigate } from "react-router-dom";
import { ApplicantDocument } from "./useApplicantDocuments";
import { ApplicantAddress } from "./useApplicantAddress";
import { ApplicantContacts } from "./useApplicantContact";

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
  address: ApplicantAddress;
  contacts: ApplicantContacts[];
}

const APPLICANT_URL = "/recruitment/applicants/";

export const useApplicants = () => {
  const apiClients = apiClient<Applicant>(APPLICANT_URL);
  return useQuery<Applicant[], Error>({
    queryKey: [CACHE_KEY_APPLICANT],
    queryFn: apiClients.getAll,
    staleTime: ms("24h"),
  });
};

const apiClients = apiClient<Data>(APPLICANT_URL);
type Data = FormData;
export const useCreateApplication = (
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
      navigate(`${AUTH_LAYOUT_ROUTE}/${APP_DOCUMENT_CREATE_ROUTE}`);

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
      navigate(`${AUTH_LAYOUT_ROUTE}/${APP_PROFILE_ROUTE}`);
      onUpdate();

      return queryClient.invalidateQueries({
        queryKey: [CACHE_KEY_APPLICANT],
      });
    },
  });
};

export const useApplicantProfile = (applicantId: number) => {
  const apiClients = apiClient<Applicant>("/recruitment/applicant-profile/");

  return useQuery<Applicant, Error>({
    queryKey: [CACHE_KEY_APPLICANT, applicantId],
    queryFn: () => apiClients.get(applicantId),
    staleTime: ms("24h"),
  });
};
