import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import ms from "ms";
import { CACHE_KEY_APPLICATIONDATE } from "../cacheKeysAndRoutes";
import apiClient from "../services/httpService";
import { ApplicationDateFormData } from "../pages/ApplicationDateCreatePage";

export interface ApplicationDate {
  id: number;
  open_date: string;
  close_date: string;
  is_current: boolean;
}

const APPLICATION_DATE_URL = "/recruitment/application-dates/";
const apiClients = apiClient<ApplicationDate>(APPLICATION_DATE_URL);

export const useApplicationDates = () => {
  return useQuery<ApplicationDate[], Error>({
    queryKey: [CACHE_KEY_APPLICATIONDATE],
    queryFn: apiClients.getAll,
    staleTime: ms("24h"),
  });
};

export const useApplicationDate = (applicationDateId: number) => {
  return useQuery<ApplicationDate, Error>({
    queryKey: [CACHE_KEY_APPLICATIONDATE, applicationDateId],
    queryFn: () => apiClients.get(applicationDateId),
    staleTime: ms("24h"),
  });
};

const myApiClient = apiClient<ApplicationDateFormData>(APPLICATION_DATE_URL);
export const useCreateApplicationDate = (onCreate: () => void, reset: () => void) => {
  const queryClient = useQueryClient();
  return useMutation<ApplicationDateFormData, Error, ApplicationDateFormData>({
    mutationFn: (data: ApplicationDateFormData) => myApiClient.post(data),

    onSuccess: () => {
      onCreate();
      reset();
      return queryClient.invalidateQueries({
        queryKey: [CACHE_KEY_APPLICATIONDATE],
      });
    },
  });
};

// export const useEditEmployee = (onUpdate: () => void, employeeId: number) => {
//   const queryClient = useQueryClient();

//   return useMutation<Data, Error, Data>({
//     mutationFn: (data: Data) => apiClients.patchFormData(data, employeeId),

//     onSuccess: () => {
//       onUpdate();

//       return queryClient.invalidateQueries({
//         queryKey: [CACHE_KEY_EMPLOYEE],
//       });
//     },
//   });
// };
