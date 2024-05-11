import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import apiClient, { formDataConfig } from "../services/httpService";
import { User } from "./useUsers";
import { AUTH_LAYOUT_ROUTE, CACHE_KEY_EMPLOYEE, EMPLOYEES_ROUTE } from "../cacheKeysAndRoutes";
import ms from "ms";
import { EmployeeDocument } from "./useEmpDocuments";
import { EmployeeAddress } from "./useEmpAddress";
import { EmployeeContacts } from "./useEmpContacts";
import { useNavigate } from "react-router-dom";

interface Employee {
  user: User;
  gender: string;
  age: number;
  supervisor: string;
  birth_date: string;
  salary: number;
  position: string;
  qualification: string;
  religion: string;
  image: string;
  employment: string;
  full_name: string;
  document: EmployeeDocument;
  address: EmployeeAddress;
  contacts: EmployeeContacts[];
}

const ENDPOINT = "/recruitment/employees/";
const apiClients = apiClient<Employee>(ENDPOINT);

export const useEmployees = () => {
    return useQuery<Employee[], Error>({
        queryKey: [CACHE_KEY_EMPLOYEE],
        queryFn: apiClients.getAll,
        staleTime: ms("24h"),
    });
};

type Data = FormData;
export const useCreateEmployee = (
    onCreate: () => void,
    reset: () => void
) => {
    const apiClients = apiClient<Data>(ENDPOINT);
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return useMutation<Data, Error, Data>({
    mutationFn: (data: Data) => apiClients.post(data, formDataConfig),

    onSuccess: () => {
      onCreate();
      reset();
      navigate(`${AUTH_LAYOUT_ROUTE}/${EMPLOYEES_ROUTE}`);

      return queryClient.invalidateQueries({
        queryKey: [CACHE_KEY_EMPLOYEE],
      });
    },
  });
};