import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  AUTH_LAYOUT_ROUTE,
  CACHE_KEY_GROUP,
  GROUP_CREATE_ROUTE,
} from "../cacheKeysAndRoutes";
import apiClient from "../services/httpService";
import ms from "ms";
import { useNavigate } from "react-router-dom";

const GROUP_ENDPOINT = "/core/groups/";
interface GetGroup {
  id: number;
  name: string;
  permissions: { id: number; name: string }[];
}

const apiClientGet = apiClient<GetGroup>(GROUP_ENDPOINT);

export const useGroups = () => {
  return useQuery<GetGroup[], Error>({
    queryKey: [CACHE_KEY_GROUP],
    queryFn: apiClientGet.getAll,
    staleTime: ms("24h"),
  });
};

interface PostGroup {
  name: string;
}

export const useGroup = (groupId: number) => {
  return useQuery<GetGroup, Error>({
    queryKey: [CACHE_KEY_GROUP, groupId],
    queryFn: () => apiClientGet.get(groupId),
    staleTime: ms("24h"),
  });
};

const apiClientPost = apiClient<PostGroup>(GROUP_ENDPOINT);

export const useCreateGroup = (onCreate: () => void, reset: () => void) => {
  const queryClient = useQueryClient();
  return useMutation<void, Error, PostGroup[]>({
    mutationFn: (data: PostGroup[]) => apiClientPost.postAll(data),

    // existingData, and newData can be MdRemoveDone.
    // onSuccess: (existingData, newData) => {}
    onSuccess: () => {
      onCreate();
      reset();
      return queryClient.invalidateQueries({
        queryKey: [CACHE_KEY_GROUP],
      });
    },
  });
};

interface EditGroup {
  id: number;
  name: string;
}

const apiClientEdit = apiClient<EditGroup>(GROUP_ENDPOINT);

export const useEditGroup = (onUpdate: () => void) => {
  const queryClient = useQueryClient();

  return useMutation<EditGroup, Error, EditGroup>({
    mutationFn: (data: EditGroup) => apiClientEdit.patch<EditGroup>(data),

    onSuccess: () => {
      onUpdate();

      return queryClient.invalidateQueries({
        queryKey: [CACHE_KEY_GROUP],
      });
    },
  });
};

export const useDeleteGroup = (onDelete: () => void) => {
  const navigate = useNavigate();

  const queryClient = useQueryClient();
  return useMutation<number, Error, number>({
    mutationFn: (id: number) => apiClientGet.delete(id),

    onSuccess: () => {
      navigate(`${AUTH_LAYOUT_ROUTE}/${GROUP_CREATE_ROUTE}`);
      onDelete();

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
        await apiClientGet.delete(id);
      }
      onDeleteAll();
      queryClient.invalidateQueries({ queryKey: [CACHE_KEY_GROUP] });
      onDeleSelectedItemsArray();
    } catch (error) {
      throw error;
    }
  };

  return handleDeleteAll;
};

export const useUpdateGroupPermissions = (
  data: { id: number; permission_ids_to_remove: number[] },
  onDeleteSelectedItems: () => void
) => {
  const queryClient = useQueryClient();
  const handlePermissionsRemoval = async () => {
    try {
      await apiClientGet.patchJsonData(JSON.stringify(data), data.id);
      onDeleteSelectedItems();
      queryClient.invalidateQueries({ queryKey: [CACHE_KEY_GROUP] });
    } catch (error) {
      throw error;
    }
  };

  return handlePermissionsRemoval;
};

export const useAddGroupPermissions = (
  data: { id: number; permission_ids_to_add: number[] },
  onDeleteSelectedItems: () => void
) => {
  const queryClient = useQueryClient();
  const handlePermissionsRemoval = async () => {
    try {
      await apiClientGet.patchJsonData(JSON.stringify(data), data.id);
      onDeleteSelectedItems();
      queryClient.invalidateQueries({ queryKey: [CACHE_KEY_GROUP] });
    } catch (error) {
      throw error;
    }
  };

  return handlePermissionsRemoval;
};
