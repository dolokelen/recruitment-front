import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import ms from "ms";
import {
  APP_DATES_ROUTE,
  AUTH_LAYOUT_ROUTE,
  CACHE_KEY_APPLICATIONDATE,
} from "../cacheKeysAndRoutes";
import apiClient from "../services/httpService";
import { ApplicationDateFormData } from "../pages/ApplicationDate/ApplicationDateCreatePage";
import { ApplicationDateEditFormData } from "../pages/ApplicationDate/ApplicationDateEditPage";
import { useNavigate } from "react-router-dom";

export interface ApplicationDate {
  id: number;
  open_date: string;
  close_date: string;
  is_current: boolean;
}

const APP_DATE_URL = "/recruitment/application-dates/";
const apiClients = apiClient<ApplicationDate>(APP_DATE_URL);

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

const myApiClient = apiClient<ApplicationDateFormData>(APP_DATE_URL);
export const useCreateApplicationDate = (
  onCreate: () => void,
  reset: () => void
) => {
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

const editApiClient = apiClient<ApplicationDateEditFormData>(APP_DATE_URL);
export const useEditApplicationDate = (onUpdate: () => void) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation<
    ApplicationDateEditFormData,
    Error,
    ApplicationDateEditFormData
  >({
    mutationFn: (data: ApplicationDateEditFormData) =>
      editApiClient.patch(data),

    onSuccess: () => {
      onUpdate();
      navigate(`${AUTH_LAYOUT_ROUTE}/${APP_DATES_ROUTE}`);

      return queryClient.invalidateQueries({
        queryKey: [CACHE_KEY_APPLICATIONDATE],
      });
    },
  });
};

export const useDeleteApplicationDate = (onDelete: () => void) => {
  const navigate = useNavigate();

  const queryClient = useQueryClient();
  return useMutation<number, Error, number>({
    mutationFn: (id: number) => apiClients.delete(id),

    onSuccess: () => {
      navigate(`${AUTH_LAYOUT_ROUTE}/${APP_DATES_ROUTE}`);
      onDelete();

      return queryClient.invalidateQueries({
        queryKey: [CACHE_KEY_APPLICATIONDATE],
      });
    },
  });
};
