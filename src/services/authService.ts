import { authApiRepository } from "@/apiRepository/authApiRepository";
import { ILogin, IRegister } from "@/interface/authInterface";


export const authServices = {
    postRegister : async(data:IRegister)=>{
        try{
            const apiResponse = await authApiRepository.postRegister(data)
            return apiResponse?.data
        }catch(e){
            console.error("Failed to get student service: ",e)
        }
    },
    postLogin : async(data:ILogin)=>{
        try{
            const apiResponse = await authApiRepository.postLogin(data)
            return apiResponse?.data
        }catch(e){
            console.error("Failed to post blog service: ",e)
        }
    }
}