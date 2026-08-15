import { carsApi } from "@/api/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useDeleteCar = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
      const result = await carsApi.delete(`/${id}`);
      return result.data;
    },

    onSuccess: (_, id) => {
      queryClient.removeQueries({
        queryKey: ["car", id],
      });

      queryClient.invalidateQueries({
        queryKey: ["cars"],
      });

      queryClient.invalidateQueries({
        queryKey: ["favorites"],
      });
    },
  });
};
