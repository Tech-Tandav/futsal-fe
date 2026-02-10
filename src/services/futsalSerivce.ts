import { futsalApiRepository } from "@/apiRepository/futsalApiRepository";
import { IFutsal} from "@/interface/futsalInterface"; 


export const futsalServices = {
    getfutsal : async(lat?:number, lng?:number)=>{
        try{
            
            const apiResponse = await futsalApiRepository.filteredfutsal(lat, lng)
            console.log(apiResponse)
            if (apiResponse?.status!=200){
                return []
            }
            const rawData = apiResponse?.data
            console.log(rawData)
            const mappedData = rawData?.map((item:any)=>({
                id:item?.id,
                name:item?.name,
                image:item?.image,
                address:item?.address,
                city:item?.city,
                pricePerHour:item?.price_per_hour,
                amenities:item?.amenities,
                distance:1,
                // timeSlot:item?.time_slots
            }))
            return mappedData
        }catch(e){
            console.error("Failed to get student service: ",e)
            throw e
        }
    },
    postFutsal : async(data:any)=>{
        try{
            console.log("THis is data on service", data)
            const formData = new FormData()
            formData.append("name", data.name)
            formData.append("description", data.description)
            formData.append("file", data.file)
            const apiResponse = await futsalApiRepository.postfutsal(formData)
            if (apiResponse?.status!=201){
                return
            }
            return apiResponse.data
        }catch(e){
            console.error("Failed to post futsal service: ",e)
            throw e
        }
    },
    retrievefutsal : async(id:string): Promise<IFutsal | null> => {
        try{
            const rawData = await futsalApiRepository.retrieveFutsal(id)

            if (!rawData) return null

            return {
                id: rawData.id,
                name: rawData.name,
                image: rawData.image,
                address: rawData.address,
                city: rawData.city,
                pricePerHour: rawData.price_per_hour,
                amenities: rawData.amenities,
                timeSlots: rawData.time_slots,
            }
        }catch(e){
            console.error("Failed to get student service: ",e)
            throw e 
        }
    },
    deletefutsal : async(id:any)=>{
        try{
            
            const apiResponse = await futsalApiRepository.deletefutsal(id)
            if (apiResponse?.status!=200){
                return
            }
            
        }catch(e){
            console.error("Failed to get student service: ",e)
        }
    },
    editFutsal : async(slug:any ,data:any)=>{
        try{
            console.log("THis is data on service", data)
            // const formData = new FormData()
            // formData.append("name", data.name)
            // formData.append("description", data.description)
            // formData.append("file", data.file)
            const apiResponse = await futsalApiRepository.editfutsal(slug,data)
            console.log("THis is data on service after ",apiResponse)
            return apiResponse?.data
        }catch(e){
            console.error("Failed to post futsal service: ",e)
        }
    },
}