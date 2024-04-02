import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CACHE_KEY_GROUP } from "../cacheKeysAndRoutes";
import { GroupCreateFormData } from "../groupsAndPermissions/GroupCreateForm";
import apiClient from "../services/hpptService";

interface Group {
    id?: number;
    name: string;
    permissions?: {id: number, name: string}[];
  }

const apiClients = apiClient<Group>("/core/groups/");

export const useCreateGroup = (onCreate: () => void, reset: () => void) => {
    const queryClient = useQueryClient();
    return useMutation<GroupCreateFormData, Error, GroupCreateFormData>({
      mutationFn: (data: GroupCreateFormData) => apiClients.post(data),
  
      onSuccess: (existingData, newData) => {
        onCreate();
        reset();
        return queryClient.invalidateQueries({
          queryKey: [CACHE_KEY_GROUP],
        });
      },
    });
  };
  