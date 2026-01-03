import { authApiRepository } from "@/apiRepository/authApiRepository";
import { ILogin, IRegister } from "@/interface/authInterface";


export const authServices = {
    postRegister : async(data:IRegister)=>{
        try{
            console.log("THis is data on service", data)
            const apiResponse = await authApiRepository.postRegister(data)
            if (apiResponse?.status!=201){
                return
            }
            console.log("THis is data on service after", data)
            return apiResponse.data
        }catch(e){
            console.error("Failed to get student service: ",e)
        }
    },
    postLogin : async(data:ILogin)=>{
        try{
            console.log("THis is data on service", data)
            const apiResponse = await authApiRepository.postLogin(data)
            console.log("THis is data on service after", apiResponse)
            if (apiResponse?.status!=200){
                return
            }
            return apiResponse.data
        }catch(e){
            console.error("Failed to post blog service: ",e)
        }
    }
}