import { favoritesApi } from "@/api/api";
import { IGetFavoritesResponse } from "@/types/favoriteTypes";
import { useQuery } from "@tanstack/react-query";

export const useGetFavorites = () =>
  useQuery({
    queryKey: ["favorites"],
    queryFn: async () => {
      const result = await favoritesApi.get<IGetFavoritesResponse>("");
      return result.data.data;
    },
  });
