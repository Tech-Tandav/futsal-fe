import { ILogin, IRegister } from "@/domain/interfaces/authInterface";
import { authInstance } from "@/utils/authAxiosInstance";


export const authApiRepository = {
    register : async(data:IRegister)=>{
        try{
            return await authInstance.post("register/", data)
        }catch(e){
            console.error("Failed in register api repo: ", e)
        }
    },
    login : async(data:ILogin)=>{
        try{
            return await authInstance.post("login/", data)
        }catch(e){
            console.error("Failed in login api repo: ", e)
            throw e
        }
    },

}