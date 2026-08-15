import { authApi } from "@/api/api";
import { IAuthReturn, IRegBody } from "@/types/authTypes";
import { useMutation } from "@tanstack/react-query";

export const useRegister = () =>
  useMutation({
    mutationKey: ["register"],
    mutationFn: async (body: IRegBody) => {
      const formData = new FormData();

      formData.append("name", body.name);
      formData.append("email", body.email);
      formData.append("password", body.password);

      if (body.avatar) {
        formData.append("avatar", body.avatar[0]);
      }
      const result = await authApi.post<IAuthReturn>("/reg", formData);
      return result.data;
    },
    onSuccess: (res) => {
      localStorage.setItem("token", res.token);
      window.location.href = "/";
    },
  });
