import { authApiRepository } from "@/src/apiRepository/authApiRepository";
import { ILogin, IRegister } from "@/src/interface/authInterface";


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