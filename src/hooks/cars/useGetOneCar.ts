import { carsApi } from "@/api/api";
import { IGetOneCarResponse } from "@/types/carTypes";
import { useQuery } from "@tanstack/react-query";

export const useGetOneCar = (id: number) =>
  useQuery({
    queryKey: ["car", id],
    queryFn: async () => {
      const result = await carsApi.get<IGetOneCarResponse>(`/${id}`);
      return result.data.data;
    },
    enabled: !!id,
  });