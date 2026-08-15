import { authApi } from "@/api/api";
import { ILoginBody, ILoginReturn } from "@/types/authTypes";
import { useMutation } from "@tanstack/react-query";




export const useLogin = ()=> useMutation({
    mutationKey: ["login"],
    mutationFn: async (body: ILoginBody)=> {
        const result = await authApi.post<ILoginReturn>("/login", body)
        return result.data
    },
    onSuccess: (res)=>{
        localStorage.setItem("token", res.token)
        window.location.href = "/";
    }
})