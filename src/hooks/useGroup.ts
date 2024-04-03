import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CACHE_KEY_GROUP } from "../cacheKeysAndRoutes";
import apiClient from "../services/httpService";
import ms from "ms";

const GROUP_ENDPOINT = "/core/groups/";
interface GetGroup {
  id: number;
  name: string;
  permissions: { id: number; name: string }[];
}

const apiClients = apiClient<GetGroup>(GROUP_ENDPOINT);

export const useGroups = () => {
  return useQuery<GetGroup[], Error>({
    queryKey: [CACHE_KEY_GROUP],
    queryFn: apiClients.getAll,
    staleTime: ms("24h"),
  });
};

interface PostGroup {
  name: string;
}

const apiClientB = apiClient<PostGroup>(GROUP_ENDPOINT);

export const useCreateGroup = (onCreate: () => void, reset: () => void) => {
  const queryClient = useQueryClient();
  return useMutation<void, Error, PostGroup[]>({
    mutationFn: (data: PostGroup[]) => apiClientB.postAll(data),

    onSuccess: (existingData, newData) => {
      onCreate();
      reset();
      return queryClient.invalidateQueries({
        queryKey: [CACHE_KEY_GROUP],
      });
    },
  });
};

export const useDeleteAllGroup = (
  ids: number[],
  onDeleteAll: () => void,
  onDeleSelectedItemsArray: () => void
) => {
  const queryClient = useQueryClient();
  const handleDeleteAll = async () => {
    try {
      for (const id of ids) {
        await apiClients.delete(id);
      }
      onDeleteAll();
      queryClient.invalidateQueries({queryKey: [CACHE_KEY_GROUP]});
      onDeleSelectedItemsArray();
    } catch (error) {
      throw error;
    }
  };

  return handleDeleteAll;
};

