import { timeSlotApiRepository } from "@/src/apiRepository/timeSlotApiRepository";
import { ITimeSlot } from "@/src/interface/timeSlotInterface";


export const timeSlotServices = {
    getTimeSlot : async()=>{
        try{
            const apiResponse = await timeSlotApiRepository.getTimeSlot()
            console.log(apiResponse)
            if (apiResponse?.status!=200){
                return []
            }
            const rawData = apiResponse?.data
            console.log(rawData)
            const mappedData = rawData?.map((item:ITimeSlot)=>({
                id:rawData?.id,
                futsal_id: rawData?.futsal,
                day_of_week: rawData?.day_of_week ,
                start_time: rawData?.start_time,
                end_time: rawData?.end_time,
                status: rawData?.status,
                booked_by: rawData?.booked_by,
                booking_id: rawData?.booking_id
            }))
            return mappedData
        }catch(e){
            console.error("Failed to get student service: ",e)
            throw e
        }
    },
    postTimeSlot : async(data:any)=>{
        try{
            console.log("THis is data on service", data)
            const formData = new FormData()
            formData.append("name", data.name)
            formData.append("description", data.description)
            formData.append("file", data.file)
            const apiResponse = await timeSlotApiRepository.postTimeSlot(formData)
            if (apiResponse?.status!=201){
                return
            }
            return apiResponse.data
        }catch(e){
            console.error("Failed to post TimeSlot service: ",e)
            throw e
        }
    },
    retrieveTimeSlot : async(id:any)=>{
        try{
            
            const apiResponse = await timeSlotApiRepository.retrieveTimeSlot(id)
            if (apiResponse?.status!=200){
                return
            }
            const rawData = apiResponse?.data
            const mappedData = {
                id:rawData?.id,
                futsal_id: rawData?.futsal,
                day_of_week: rawData?.day_of_week ,
                start_time: rawData?.start_time,
                end_time: rawData?.end_time,
                status: rawData?.status,
                booked_by: rawData?.booked_by,
                booking_id: rawData?.booking_id
            }
            return mappedData
        }catch(e){
            console.error("Failed to get student service: ",e)
        }
    },
    deleteTimeSlot : async(id:any)=>{
        try{
            
            const apiResponse = await timeSlotApiRepository.deleteTimeSlot(id)
            if (apiResponse?.status!=200){
                return
            }
            
        }catch(e){
            console.error("Failed to get student service: ",e)
        }
    },
    editTimeSlot : async(slug:any ,data:any)=>{
        try{
            console.log("THis is data on service", data)
            const formData = new FormData()
            formData.append("name", data.name)
            formData.append("description", data.description)
            formData.append("file", data.file)
            const apiResponse = await timeSlotApiRepository.editTimeSlot(slug,formData)
            console.log("THis is data on service after ",apiResponse)
            return apiResponse?.data
        }catch(e){
            console.error("Failed to post TimeSlot service: ",e)
        }
    },
    getFilteredTimeSlot : async(id:any)=>{
        try{
            
            const apiResponse = await timeSlotApiRepository.getFilteredTimeSlot(id)
            if (apiResponse?.status!=200){
                return
            }
            const rawData = apiResponse?.data
            const mappedData = rawData?.map((item:ITimeSlot)=>({
                id:item?.id,
                futsal_id: item?.futsal_id,
                day_of_week: item?.day_of_week ,
                start_time: item?.start_time,
                end_time: item?.end_time,
                status: item?.status,
                booked_by: item?.booked_by,
                booking_id: item?.booking_id
            }))
            return mappedData
        }catch(e){
            console.error("Failed to get student service: ",e)
        }
    },
}