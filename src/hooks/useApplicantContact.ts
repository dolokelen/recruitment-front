import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import apiClient from "../services/httpService";
import { CACHE_KEY_APPLICANT } from "../cacheKeysAndRoutes";
import ms from "ms";
import { AppContactEditFormData } from "../pages/Applicant/ApplicantContactEditPage";

export interface ApplicantContacts {
  id: number;
  applicant: number;
  phone: string;
}

interface AppCreateContact {
  phone: string;
  applicant: number;
}

const APPLICANT_URL = "/recruitment/applicant-contacts/";

const apiClients = apiClient<AppCreateContact>(APPLICANT_URL);

const constructUrl = (applicantId: number) => {
  return `/recruitment/applicants/${applicantId}/contacts/`;
};

export const useApplicantContacts = (applicantId: number) => {
  const apiClients = apiClient<ApplicantContacts>(constructUrl(applicantId));
  return useQuery<ApplicantContacts[], Error>({
    queryKey: [CACHE_KEY_APPLICANT],
    queryFn: apiClients.getAll,
    staleTime: ms("24h"),
  });
};

export const useCreateAppContacts = (
  onCreate: () => void,
  reset: () => void
) => {
  const queryClient = useQueryClient();
  //   const navigate = useNavigate();
  return useMutation<void, Error, AppCreateContact[]>({
    mutationFn: (data: AppCreateContact[]) => apiClients.postAll(data),

    onSuccess: () => {
      onCreate();
      reset();
      //   navigate(`${AUTH_LAYOUT_ROUTE}/${APP_DOCUMENT_CREATE_ROUTE}`)

      return queryClient.invalidateQueries({
        queryKey: [CACHE_KEY_APPLICANT],
      });
    },
  });
};

export const useApplicantContact = (contactId: number) => {
  const apiClients = apiClient<ApplicantContacts>(APPLICANT_URL);
  return useQuery<ApplicantContacts, Error>({
    queryKey: [CACHE_KEY_APPLICANT, contactId],
    queryFn: () => apiClients.get(contactId),
    staleTime: ms("24h"),
  });
};

export const useEditAppContact = (onUpdate: () => void) => {
  const apiClients = apiClient<ApplicantContacts>(APPLICANT_URL);
  const queryClient = useQueryClient();

  return useMutation<AppContactEditFormData, Error, AppContactEditFormData>({
    mutationFn: (data: AppContactEditFormData) =>
      apiClients.patch<AppContactEditFormData>(data),

    onSuccess: () => {
      onUpdate();

      return queryClient.invalidateQueries({
        queryKey: [CACHE_KEY_APPLICANT],
      });
    },
  });
};
