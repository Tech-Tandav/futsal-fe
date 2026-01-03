import { ILogin, IRegister } from "@/interface/authInterface";
import { authInstance } from "@/utils/authAxiosInstance";

export const authApiRepository = {
    postRegister : async(data:IRegister)=>{
        try{
            return await authInstance.post("register/", data)
        }catch(e){
            console.error("Failed in register api repo: ", e)
        }
    },
    postLogin : async(data:ILogin)=>{
        try{
            return await authInstance.post("login/", data)
        }catch(e){
            console.error("Failed in login api repo: ", e)
        }
    },

}