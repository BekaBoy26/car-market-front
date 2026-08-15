import { profileApi } from "@/api/api";
import { IProfileRes } from "@/types/profileTypes";
import { useQuery } from "@tanstack/react-query";

export const useGetProfile = (enabled: boolean) =>
  useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      const result = await profileApi.get<IProfileRes>("/");
      return result.data.data;
    },
    enabled,
  });