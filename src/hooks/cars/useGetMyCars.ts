import { carsApi } from "@/api/api";
import { IGetCarsResponse } from "@/types/carTypes";
import { useQuery } from "@tanstack/react-query";

export const useGetMyCars = () =>
  useQuery({
    queryKey: ["my-cars"],
    queryFn: async () => {
      const result = await carsApi.get<IGetCarsResponse>("/my");

      return result.data.data;
    },
  });
