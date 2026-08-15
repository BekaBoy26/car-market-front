import { brandsApi } from "@/api/api";
import { IBrandsRes } from "@/types/brandsTypes";
import { useQuery } from "@tanstack/react-query";

export const useGetBrands = () =>
  useQuery({
    queryKey: ["brands"],
    queryFn: async () => {
      const result = await brandsApi.get<IBrandsRes>("");
      return result.data.data;
    },
  });
