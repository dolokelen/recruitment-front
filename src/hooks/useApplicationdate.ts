import { useQuery } from "@tanstack/react-query";
import ms from "ms";
import { CACHE_KEY_APPLICATIONDATE } from "../cacheKeysAndRoutes";
import apiClient from "../services/httpService";

export interface ApplicationDate {
  id: number;
  open_year: number;
  open_month: number;
  open_date: number;
  close_year: number;
  close_month: number;
  close_date: number;
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
