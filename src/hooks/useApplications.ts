import { useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "../services/httpService";

const APPLICATION_URL = 'applicants'
type Data = FormData;
export const useRegisterEmployee = (
  onCreate: () => void,
  reset: () => void
) => {
  const apiClients = apiClient<Data>(EMPLOYEE_URL);
  const queryClient = useQueryClient();
  return useMutation<Data, Error, Data>({
    mutationFn: (data: Data) => apiClients.post(data, formDataConfig),

    onSuccess: () => {
      onCreate();
      reset();

      return queryClient.invalidateQueries({
        queryKey: [CACHE_KEY_EMPLOYEE],
      });
    },
  });
};