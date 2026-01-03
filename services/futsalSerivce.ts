import { futsalApiRepository } from "@/apiRepository/futsalApiRepository";
// import { IfutsalGet , IfutsalPost } from "@/interface/futsalInterface";


export const futsalServices = {
    getfutsal : async()=>{
        try{
            
            const apiResponse = await futsalApiRepository.getfutsal()
            console.log(apiResponse)
            if (apiResponse?.status!=200){
                return []
            }
            const rawData = apiResponse?.data
            console.log(rawData)
            const mappedData = rawData?.map((item:any)=>({
                id:item?.id,
                slug:item?.slug,
                name:item?.name,
                description:item?.description,
                image_url:item?.image
            }))
            return mappedData
        }catch(e){
            console.error("Failed to get student service: ",e)
            throw e
        }
    },
    postfutsal : async(data:any)=>{
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
    retrievefutsal : async(id:any)=>{
        try{
            
            const apiResponse = await futsalApiRepository.retrievefutsal(id)
            if (apiResponse?.status!=200){
                return
            }
            const rawData = apiResponse?.data
            const mappedData = {
                id:rawData.id,
                name:rawData.name,
                image_url:rawData.string,
                address:rawData.string,
                city:rawData.string,
                price_per_hour:rawData.number,
                amenities:rawData.number,
                timeSlots:rawData.time_slots
            }
            return mappedData
        }catch(e){
            console.error("Failed to get student service: ",e)
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
    editfutsal : async(slug:any ,data:any)=>{
        try{
            console.log("THis is data on service", data)
            const formData = new FormData()
            formData.append("name", data.name)
            formData.append("description", data.description)
            formData.append("file", data.file)
            const apiResponse = await futsalApiRepository.editfutsal(slug,formData)
            console.log("THis is data on service after ",apiResponse)
            return apiResponse?.data
        }catch(e){
            console.error("Failed to post futsal service: ",e)
        }
    },
}