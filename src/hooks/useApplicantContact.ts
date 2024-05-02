import { useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "../services/httpService";
import { CACHE_KEY_APPLICANT } from "../cacheKeysAndRoutes";

export interface ApplicantContacts {
  id: number;
  phone: string;
}

interface ApplicantContact {
  phone: string;
  applicant: number;
}

const APPLICANT_URL = "/recruitment/applicant-contacts/";

const apiClients = apiClient<ApplicantContact>(APPLICANT_URL);

export const useCreateAppContacts = (
  onCreate: () => void,
  reset: () => void
) => {
  const queryClient = useQueryClient();
  //   const navigate = useNavigate();
  return useMutation<void, Error, ApplicantContact[]>({
    mutationFn: (data: ApplicantContact[]) => apiClients.postAll(data),

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
