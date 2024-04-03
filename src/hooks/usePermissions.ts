import { useQuery } from "@tanstack/react-query";
import apiClient from "../services/httpService";
import ms from "ms";
import { CACHE_KEY_PERMISSION } from "../cacheKeysAndRoutes";

export interface Permission {
  id: number;
  name: string;
}

const apiClients = apiClient<Permission>("/core/permissions/");

export const usePermissions = () => {
  return useQuery<Permission[], Error>({
    queryKey: [CACHE_KEY_PERMISSION],
    queryFn: apiClients.getAll,
    staleTime: ms('24h')
  });
};

