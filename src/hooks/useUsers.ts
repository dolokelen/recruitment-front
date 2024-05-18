import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Permission } from "./usePermissions";
import getUserId from "../utilities/getUserId";
import ms from "ms";
import apiClient from "../services/httpService";
import { CACHE_KEY_USER } from "../cacheKeysAndRoutes";
import { Group } from "./useGroups";

const CORE_USERS_URL = "/core/users/";

export interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  full_name: string;
  groups: Group[];
}

export interface UserSupervisor {
  id: number;
  full_name: string;
}

interface UserGroupsPermissions {
  id: number;
  name: string;
  permissions: Permission[];
}

export const useUser = (userId: number) => {
  const apiClients = apiClient<User>(CORE_USERS_URL);
  return useQuery<User, Error>({
    queryKey: [CACHE_KEY_USER, userId],
    queryFn: () => apiClients.get(userId),
    staleTime: ms("24h"),
  });
};

export const useUserGroupsPermissions = (userId: number) => {
  const apiClients = apiClient<UserGroupsPermissions>("/core/user-groups/");
  return useQuery<UserGroupsPermissions[], Error>({
    queryKey: ["userGroupsPermissions", getUserId()],
    queryFn: () => apiClients.getEntity(userId),
    staleTime: ms("24h"),
  });
};

export const useAddGroupsToUser = (
  data: { userId: number; group_to_add_ids: number[] },
  onAddSelectedGroupIds: () => void
) => {
  const apiClients = apiClient<{ userId: number; group_to_add_ids: number[] }>(
    CORE_USERS_URL
  );
  const queryClient = useQueryClient();
  const handleAddGroupsToUser = async () => {
    try {
      await apiClients.patchJsonData(JSON.stringify(data), data.userId);
      onAddSelectedGroupIds();
      return queryClient.invalidateQueries({ queryKey: [CACHE_KEY_USER] });
    } catch (error) {
      throw error;
    }
  };

  return handleAddGroupsToUser;
};

export const useRemoveGroupsFromUser = (
  data: { userId: number; group_to_remove_ids: number[] },
  onRemoveSelectedGroupIds: () => void
) => {
  const apiClients = apiClient<{
    userId: number;
    group_to_remove_ids: number[];
  }>(CORE_USERS_URL);
  const queryClient = useQueryClient();
  const handleRemoveGroupsFormUser = async () => {
    try {
      await apiClients.patchJsonData(JSON.stringify(data), data.userId);
      onRemoveSelectedGroupIds();
      return queryClient.invalidateQueries({ queryKey: [CACHE_KEY_USER] });
    } catch (error) {
      throw error;
    }
  };

  return handleRemoveGroupsFormUser;
};
