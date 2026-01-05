import { instance } from "@/src/utils/axiosInstance";
import { ITimeSlot } from "@/src/interface/timeSlotInterface";

export const timeSlotApiRepository = {
    getTimeSlot : async()=>{
        try{
            return await instance.get("/futsal/time-slot/")
        }catch(e){
            console.error("Failed in get timeSlot api repo: ", e)
            throw e
        }
    },
    postTimeSlot : async(data:any)=>{
        try{
            return await instance.post("/futsal/time-slot/", data)
        }catch(e){
            console.error("Failed in post timeSlot api repo: ", e)
            throw e
        }
    },
    retrieveTimeSlot : async(id:any)=>{
        try{
            return await instance.get(`/futsal/time-slot/${id}`)
        }catch(e){
            console.error("Failed in retrieve timeSlot api repo: ", e)
            throw e
        }
    },
    deleteTimeSlot : async(id:any)=>{
        try{
            return await instance.delete(`/futsal/time-slot/${id}`)
        }catch(e){
            console.error("Failed in delete timeSlot api repo: ", e)
            throw e
        }
    },
    editTimeSlot : async(slug:any,data:any)=>{
        try{
            return await instance.patch(`/futsal/time-slot/${slug}`, data)
        }catch(e){
            console.error("Failed in patch timeSlot api repo: ", e)
            throw e
        }
    },
    getFilteredTimeSlot : async(id:string)=>{
        try{
            return await instance.get(`/futsal/time-slot/?futsal=${id}`)
        }catch(e){
            console.error("Failed in get timeSlot api repo: ", e)
            throw e
        }
    },

}