import { ILogin, IRegister } from "@/src/interface/authInterface";
import { authInstance } from "@/src/utils/authAxiosInstance";

export const authApiRepository = {
    postRegister : async(data:IRegister)=>{
        try{
            return await authInstance.post("api/register/", data)
        }catch(e){
            console.error("Failed in register api repo: ", e)
        }
    },
    postLogin : async(data:ILogin)=>{
        try{
            return await authInstance.post("api/login/", data)
        }catch(e){
            console.error("Failed in login api repo: ", e)
        }
    },

}