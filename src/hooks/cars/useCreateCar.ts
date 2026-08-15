import { carsApi } from "@/api/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useCreateCar = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (formData: FormData) => {
      const result = await carsApi.post("", formData);

      return result.data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["cars"],
      });
    },
  });
};