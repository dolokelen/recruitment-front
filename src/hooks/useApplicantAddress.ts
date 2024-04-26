

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { APPLICANT_PROFILE_ROUTE, AUTH_LAYOUT_ROUTE, CACHE_KEY_APPLICANT } from "../cacheKeysAndRoutes";
import apiClient from "../services/httpService";
import { useNavigate } from "react-router-dom";

export interface ApplicantAddress {
  applicant: number;
  country: string;//I assumed Liberia
  county: string;
  district: number;
  community: string;
  house_address: string;
}

const apiClients = apiClient<ApplicantAddress>("/recruitment/applicant-address/");

export const useCreateApplicantAddress = (onCreate: () => void, reset: () => void) => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
  return useMutation<ApplicantAddress, Error, ApplicantAddress>({
    mutationFn: (data: ApplicantAddress) => apiClients.post(data),

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
