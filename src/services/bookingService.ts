import { bookingApiRepository } from "@/apiRepository/bookingApiRepository";
import { IBooking } from "../interface/bookingInterface";


export const bookingServices = {
    getBooking : async()=>{
        try{
            const apiResponse = await bookingApiRepository.getBooking()
            console.log(apiResponse)
            if (apiResponse?.status!=200){
                return []
            }
            const rawData = apiResponse?.data
            console.log(rawData)
            const mappedData = rawData?.map((item:any)=>({
                id:item?.id,
                customerName: item?.customer_name,
                customerPhone: item?.customer_phone,
                customerEmail: item?.customer_email,
                status: item?.status,
                futsalName:item?.futsal_name,
                date:item?.date,
                time:item?.time_slot.start_time,
                createdAt:item?.created_at
            }))
            return mappedData
        }catch(e){
            console.error("Failed to get student service: ",e)
            throw e
        }
    },
    postBooking : async(data:any)=>{
        try{
            console.log("THis is data on service", data)
            // const formData = new FormData()
            // formData.append("name", data.name)
            // formData.append("description", data.description)
            // formData.append("file", data.file)
            const apiResponse = await bookingApiRepository.postBooking(data)
            if (apiResponse?.status!=201){
                return
            }
            return apiResponse.data
        }catch(e){
            console.error("Failed to post booking service: ",e)
            throw e
        }
    },
//     retrievebooking : async(id:any)=>{
//         try{
            
//             const apiResponse = await bookingApiRepository.retrievebooking(id)
//             if (apiResponse?.status!=200){
//                 return
//             }
//             const rawData = apiResponse?.data
//             const mappedData = {
//                 id:rawData?.id,
//                 futsal_id: rawData?.futsal,
//                 day_of_week: rawData?.day_of_week ,
//                 start_time: rawData?.start_time,
//                 end_time: rawData?.end_time,
//                 status: rawData?.status,
//                 booked_by: rawData?.booked_by,
//                 booking_id: rawData?.booking_id
//             }
//             return mappedData
//         }catch(e){
//             console.error("Failed to get student service: ",e)
//         }
//     },
//     deletebooking : async(id:any)=>{
//         try{
            
//             const apiResponse = await bookingApiRepository.deletebooking(id)
//             if (apiResponse?.status!=200){
//                 return
//             }
            
//         }catch(e){
//             console.error("Failed to get student service: ",e)
//         }
//     },
    editBooking : async(slug:any ,data:any)=>{
        try{
            console.log("THis is data on service", data)
            // const formData = new FormData()
            // formData.append("name", data.name)
            // formData.append("description", data.description)
            // formData.append("file", data.file)
            const apiResponse = await bookingApiRepository.editBooking(slug,data)
            console.log("THis is data on service after ",apiResponse)
            return apiResponse?.data
        }catch(e){
            console.error("Failed to post booking service: ",e)
        }
    },
//     getFilteredbooking : async(id:any)=>{
//         try{
            
//             const apiResponse = await bookingApiRepository.getFilteredbooking(id)
//             if (apiResponse?.status!=200){
//                 return
//             }
//             const rawData = apiResponse?.data
//             const mappedData = rawData?.map((item:Ibooking)=>({
//                 id:item?.id,
//                 futsal_id: item?.futsal,
//                 day_of_week: item?.day_of_week ,
//                 start_time: item?.start_time,
//                 end_time: item?.end_time,
//                 status: item?.status,
//                 booked_by: item?.booked_by,
//                 booking_id: item?.booking_id
//             }))
//             return mappedData
//         }catch(e){
//             console.error("Failed to get student service: ",e)
//         }
//     },
}