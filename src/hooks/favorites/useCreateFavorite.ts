import { favoritesApi } from "@/api/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useCreateFavorite = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (carId: number) => {
      const result = await favoritesApi.post(`/${carId}`);

      return result.data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["favorites"],
      });
    },
  });
};