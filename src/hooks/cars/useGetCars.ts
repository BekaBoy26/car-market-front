import { carsApi } from "@/api/api";
import { IGetCarsParams, IGetCarsResponse } from "@/types/carTypes";
import { useQuery } from "@tanstack/react-query";

export const useGetCars = (params?: IGetCarsParams) =>
  useQuery({
    queryKey: ["cars", params],
    queryFn: async () => {
      const result = await carsApi.get<IGetCarsResponse>("", {
        params,
      });

      return result.data.data;
    },
  });
