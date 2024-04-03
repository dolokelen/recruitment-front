import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CACHE_KEY_GROUP } from "../cacheKeysAndRoutes";
import apiClient from "../services/httpService";

// interface GetGroup {
//   id: number;
//   name: string;
//   permissions: { id: number; name: string }[];
// }

// const apiClients = apiClient<GetGroup>("/core/groups/");


interface PostGroup {
  name: string;
}

const apiClientB = apiClient<PostGroup>("/core/groups/");

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
