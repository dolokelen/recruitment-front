import { useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient, { formDataConfig } from "../services/httpService";
import { useNavigate } from "react-router-dom";
import { AUTH_LAYOUT_ROUTE, CACHE_KEY_EMPLOYEE, EMPLOYEES_ROUTE } from "../cacheKeysAndRoutes";


export interface EmployeeDocument {
    id: number;
    employee: number;
    cgpa: string;
    major: string;
    manor: string;
    county: string;
    resume: string;
    degree: string;
    country: string;
    institution: string;
    qualification: string;
    graduation_year: number;
    application_letter: string;
    community_letter: string;
    reference_letter: string;
  }

  const EMP_DOCUMENT_URL = "/recruitment/employee-documents/";

  const apiClients = apiClient<Data>(EMP_DOCUMENT_URL);
  type Data = FormData;
  
  export const useCreateEmployeeDocument = (
    onCreate: () => void,
    reset: () => void
  ) => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
  
    return useMutation<Data, Error, Data>({
      mutationFn: (data: Data) => apiClients.post(data, formDataConfig),
  
      onSuccess: () => {
        onCreate();
        reset();
        navigate(`${AUTH_LAYOUT_ROUTE}/${EMPLOYEES_ROUTE}`);
  
        return queryClient.invalidateQueries({
          // Employee is fetching document that's why CACHE_KEY_EMPLOYEE
          queryKey: [CACHE_KEY_EMPLOYEE],
        });
      },
    });
  };
  