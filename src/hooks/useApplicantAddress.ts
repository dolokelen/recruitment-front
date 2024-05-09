import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  APP_PROFILE_ROUTE,
  AUTH_LAYOUT_ROUTE,
  CACHE_KEY_APPLICANT,
  CACHE_KEY_APPLICANT_ADDRESS,
} from "../cacheKeysAndRoutes";
import apiClient from "../services/httpService";
import { useNavigate } from "react-router-dom";
import { AppAddressCreatePageData } from "../pages/Applicant/ApplicantAddressCreatePage";
import ms from "ms";
import { EditAppAddressFormData } from "../pages/Applicant/ApplicantAddressEditPage";

export interface ApplicantAddress {
  applicant: number;
  country: string; // It's not in the form, I assumed Liberia
  county: string;
  district: number;
  community: string;
  house_address: string;
}

const apiClients = apiClient<AppAddressCreatePageData>(
  "/recruitment/applicant-address/"
);

export const useCreateApplicantAddress = (
  onCreate: () => void,
  reset: () => void
) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return useMutation<AppAddressCreatePageData, Error, AppAddressCreatePageData>(
    {
      mutationFn: (data: AppAddressCreatePageData) => apiClients.post(data),

      onSuccess: () => {
        onCreate();
        reset();
        navigate(`${AUTH_LAYOUT_ROUTE}/${APP_PROFILE_ROUTE}`);
        //Applicant is fetching ApplicantAddress
        return queryClient.invalidateQueries({
          queryKey: [CACHE_KEY_APPLICANT],
        });
      },
    }
  );
};

export const useApplicantAddress = (applicantId: number) => {
  const endpoint = "/recruitment/applicant-address/";
  const apiClients = apiClient<ApplicantAddress>(endpoint);
  return useQuery<ApplicantAddress, Error>({
    queryKey: [CACHE_KEY_APPLICANT, CACHE_KEY_APPLICANT_ADDRESS, applicantId],
    queryFn: () => apiClients.get(applicantId),
    staleTime: ms("24h"),
  });
};

export const useEditAppAddress = (onUpdate: () => void) => {
  const apiClients = apiClient<ApplicantAddress>(
    "/recruitment/applicant-address/"
  );
  const queryClient = useQueryClient();

  return useMutation<EditAppAddressFormData, Error, EditAppAddressFormData>({
    mutationFn: (data: EditAppAddressFormData) =>
      apiClients.patch<EditAppAddressFormData>(data),

    onSuccess: () => {
      onUpdate();

      return queryClient.invalidateQueries({
        queryKey: [CACHE_KEY_APPLICANT],
      });
    },
  });
};
