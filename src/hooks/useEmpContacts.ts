import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AUTH_LAYOUT_ROUTE, CACHE_KEY_EMPLOYEE, CACHE_KEY_EMPLOYEE_CONTACT, EMPLOYEES_ROUTE } from "../cacheKeysAndRoutes";
import apiClient from "../services/httpService";
import ms from "ms";
import { EmpContactEditFormData } from "../pages/Employee/EmployeeContactEditPage";
import { useNavigate } from "react-router-dom";

export interface EmployeeContacts {
  id: number;
  employee: number;
  phone: string;
}

interface EmpCreateContacts {
  employee: number;
  phone: string;
}

export const useCreateEmpContacts = (
  employeeId: number,
  onCreate: () => void,
  reset: () => void
) => {
  const CONTACT_URL = `/recruitment/employees/${employeeId}/contacts/`;
  const apiClients = apiClient<EmpCreateContacts>(CONTACT_URL);
  const queryClient = useQueryClient();
    const navigate = useNavigate();
  return useMutation<void, Error, EmpCreateContacts[]>({
    mutationFn: (data: EmpCreateContacts[]) => apiClients.postAll(data),

    onSuccess: () => {
      onCreate();
      reset();
        navigate(`${AUTH_LAYOUT_ROUTE}/${EMPLOYEES_ROUTE}`)

      return queryClient.invalidateQueries({
        queryKey: [CACHE_KEY_EMPLOYEE, CACHE_KEY_EMPLOYEE_CONTACT],
      });
    },
  });
};

export const useEmployeeContacts = (employeeId: number) => {
  const CONTACT_URL = `/recruitment/employees/${employeeId}/contacts/`;
  const apiClients = apiClient<EmployeeContacts>(CONTACT_URL);
  return useQuery<EmployeeContacts[], Error>({
    queryKey: [employeeId], //If you add CACHE_KEY_EMPLOYEE you'll get an error b/c useEmployeeContact has it!
    queryFn: apiClients.getAll,
    // staleTime: ms("24h"), If you do you'll have to refresh manually!!
  });
};

export const useEmployeeContact = (employeeId: number, contactId: number) => {
  const CONTACT_URL = `/recruitment/employees/${employeeId}/contacts/`;
  const apiClients = apiClient<EmployeeContacts>(CONTACT_URL);
  return useQuery<EmployeeContacts, Error>({
    queryKey: [CACHE_KEY_EMPLOYEE, contactId, employeeId],
    queryFn: () => apiClients.get(contactId),
    staleTime: ms("24h"),
  });
};

export const useEditEmployeeContact = (
  employeeId: number,
  onUpdate: () => void
) => {
  const CONTACT_URL = `/recruitment/employees/${employeeId}/contacts/`;
  const apiClients = apiClient<EmployeeContacts>(CONTACT_URL);
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation<EmpContactEditFormData, Error, EmpContactEditFormData>({
    mutationFn: (data: EmpContactEditFormData) =>
      apiClients.patch<EmpContactEditFormData>(data),

    onSuccess: () => {
      onUpdate();
      navigate(`${AUTH_LAYOUT_ROUTE}/${EMPLOYEES_ROUTE}`)

      return queryClient.invalidateQueries({
        queryKey: [CACHE_KEY_EMPLOYEE],
      });
    },
  });
};
