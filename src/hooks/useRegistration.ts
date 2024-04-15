import { useMutation, useQueryClient } from "@tanstack/react-query";
import { RegistrationFormData } from "../accounts/RegistrationForm";
import { CACHE_KEY_USER } from "../cacheKeysAndRoutes";
import apiClient from "../services/httpService";

const apiClients = apiClient<RegistrationFormData>("auth/users/");

export const useRegistration = (onCreate: () => void, reset: () => void) => {
  const queryClient = useQueryClient();
  return useMutation<RegistrationFormData, Error, RegistrationFormData>({
    mutationFn: (data: RegistrationFormData) => apiClients.post(data),

    onSuccess: () => {
      onCreate();
      reset();
      //Investigate the cache key, should it be user or registration?
      return queryClient.invalidateQueries({
        queryKey: [CACHE_KEY_USER],
      });
    },
  });
};
