import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { EmpAddressCreatePageData } from "../pages/Employee/EmployeeAddressCreatePage";
import apiClient from "../services/httpService";
import { useNavigate } from "react-router-dom";
import {
  AUTH_LAYOUT_ROUTE,
  CACHE_KEY_EMPLOYEE,
  CACHE_KEY_EMPLOYEE_ADDRESS,
  EMPLOYEES_ROUTE,
} from "../cacheKeysAndRoutes";
import ms from "ms";
import { EmpAddressEditFormData } from "../pages/Employee/EmployeeAddressEditPage";

export interface EmployeeAddress {
  employee: number;
  country: string; // It's not in the form, I assumed Liberia
  county: string;
  district: number;
  community: string;
  house_address: string;
}

const apiClients = apiClient<EmpAddressCreatePageData>(
  "/recruitment/employee-address/"
);

export const useCreateEmployeeAddress = (
  onCreate: () => void,
  reset: () => void
) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return useMutation<EmpAddressCreatePageData, Error, EmpAddressCreatePageData>(
    {
      mutationFn: (data: EmpAddressCreatePageData) => apiClients.post(data),

      onSuccess: () => {
        onCreate();
        reset();
        navigate(`${AUTH_LAYOUT_ROUTE}/${EMPLOYEES_ROUTE}`);
        //Employee is fetching EmployeeAddress that's why CACHE_KEY_EMPLOYEE
        return queryClient.invalidateQueries({
          queryKey: [CACHE_KEY_EMPLOYEE],
        });
      },
    }
  );
};

export const useEmployeeAddress = (employeeId: number) => {
  const endpoint = "/recruitment/employee-address/";
  const apiClients = apiClient<EmployeeAddress>(endpoint);
  return useQuery<EmployeeAddress, Error>({
    queryKey: [CACHE_KEY_EMPLOYEE, CACHE_KEY_EMPLOYEE_ADDRESS, employeeId],
    queryFn: () => apiClients.get(employeeId),
    staleTime: ms("24h"),
  });
};

export const useEditEmployeeAddress = (onUpdate: () => void) => {
  const apiClients = apiClient<EmployeeAddress>(
    "/recruitment/employee-address/"
  );
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation<EmpAddressEditFormData, Error, EmpAddressEditFormData>({
    mutationFn: (data: EmpAddressEditFormData) =>
      apiClients.patch<EmpAddressEditFormData>(data),

    onSuccess: () => {
      onUpdate();
      navigate(`${AUTH_LAYOUT_ROUTE}/${EMPLOYEES_ROUTE}`);

      return queryClient.invalidateQueries({
        queryKey: [CACHE_KEY_EMPLOYEE],
      });
    },
  });
};
