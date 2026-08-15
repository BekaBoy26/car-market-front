import { carsApi } from "@/api/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface IUpdateCar {
  id: number;
  formData: FormData;
}

export const useUpdateCar = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, formData }: IUpdateCar) => {
      const result = await carsApi.patch(`/${id}`, formData);

      return result.data;
    },

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["cars"],
      });

      queryClient.invalidateQueries({
        queryKey: ["car", variables.id],
      });
    },
  });
};