import { useQuery } from "@tanstack/react-query";
import apiClient from "../services/httpService";
import { User } from "./useUsers";
import { CACHE_KEY_EMPLOYEE } from "../cacheKeysAndRoutes";
import ms from "ms";
import { EmployeeDocument } from "./useEmpDocuments";
import { EmployeeAddress } from "./useEmpAddress";
import { EmployeeContacts } from "./useEmpContacts";

interface Employee {
  user: User;
  gender: string;
  age: number;
  supervisor: string;
  birth_date: string;
  salary: number;
  position: string;
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
