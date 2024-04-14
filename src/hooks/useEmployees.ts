import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import ms from "ms";
import { CACHE_KEY_EMPLOYEE } from "../cacheKeysAndRoutes";
import apiClient, { formDataConfig } from "../services/httpService";

export interface Employee {
  //   user: UserProfile;
  //   employeeaddress: Address;
  phone: string;
  gender: string;
  marital_status: string;
  employment_status: string;
  birth_date: string;
  religion: string;
  salary: number;
  qualification: string;
  tor: string;
  image: string;
  department: { id: number; name: string };
  supervisor: { id: number; full_name: string };
  joined_at: string;
}

const EMPLOYEE_URL = "/school/employees/";
const apiClients = apiClient<Employee>(EMPLOYEE_URL);

export const useEmployees = () => {
  return useQuery<Employee[], Error>({
    queryKey: [CACHE_KEY_EMPLOYEE],
    queryFn: apiClients.getAll,
    staleTime: ms("24h"),
  });
};

export const useEmployee = (employeeId: number) => {
  return useQuery<Employee, Error>({
    queryKey: [CACHE_KEY_EMPLOYEE, employeeId],
    queryFn: () => apiClients.get(employeeId),
    staleTime: ms("24h"),
  });
};

export const useEmployeeProfile = (employeeId: number) => {
  const apiClients = apiClient<Employee>("/school/employee-profile/");

  return useQuery<Employee, Error>({
    queryKey: [CACHE_KEY_EMPLOYEE, employeeId],
    queryFn: () => apiClients.get(employeeId),
    staleTime: ms("24h"),
  });
};

type Data = FormData;
export const useRegisterEmployee = (
  onCreate: () => void,
  reset: () => void
) => {
  const apiClients = apiClient<Data>(EMPLOYEE_URL);
  const queryClient = useQueryClient();
  return useMutation<Data, Error, Data>({
    mutationFn: (data: Data) => apiClients.post(data, formDataConfig),

    onSuccess: (existingData, newData) => {
      onCreate();
      reset();

      return queryClient.invalidateQueries({
        queryKey: [CACHE_KEY_EMPLOYEE],
      });
    },
  });
};

export const useEditEmployee = (onUpdate: () => void, employeeId: number) => {
  const queryClient = useQueryClient();

  return useMutation<Data, Error, Data>({
    mutationFn: (data: Data) => apiClients.patchFormData(data, employeeId),

    onSuccess: (existingData, newData) => {
      onUpdate();

      return queryClient.invalidateQueries({
        queryKey: [CACHE_KEY_EMPLOYEE],
      });
    },
  });
};
