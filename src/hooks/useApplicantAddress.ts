

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { APPLICANT_PROFILE_ROUTE, AUTH_LAYOUT_ROUTE, CACHE_KEY_APPLICANT } from "../cacheKeysAndRoutes";
import apiClient from "../services/httpService";
import { useNavigate } from "react-router-dom";
import { AppAddressCreatePageData } from "../pages/ApplicantAddressCreatePage";

export interface ApplicantAddress {
  applicant: number;
  country: string;// It's not in the form, I assumed Liberia
  county: string;
  district: number;
  community: string;
  house_address: string;
}

const apiClients = apiClient<AppAddressCreatePageData>("/recruitment/applicant-address/");

export const useCreateApplicantAddress = (onCreate: () => void, reset: () => void) => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
  return useMutation<AppAddressCreatePageData, Error, AppAddressCreatePageData>({
    mutationFn: (data: AppAddressCreatePageData) => apiClients.post(data),

    onSuccess: () => {
      onCreate();
      reset();
      navigate(`${AUTH_LAYOUT_ROUTE}/${APPLICANT_PROFILE_ROUTE}`)
      //Applicant is fetching ApplicantAddress
      return queryClient.invalidateQueries({
        queryKey: [CACHE_KEY_APPLICANT],
      });
    },
  });
};
