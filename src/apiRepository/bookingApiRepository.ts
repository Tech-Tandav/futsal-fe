import { instance } from "@/utils/axiosInstance";


export const bookingApiRepository = {
    getBooking : async()=>{
        try{
            return await instance.get("/futsal/booking/")
        }catch(e){
            console.error("Failed in get booking api repo: ", e)
            throw e
        }
    },
    postBooking : async(data:any)=>{
        try{
            return await instance.post("/futsal/booking/", data)
        }catch(e){
            console.error("Failed in post booking api repo: ", e)
            throw e
        }
    },
    retrieveBooking : async(id:any)=>{
        try{
            return await instance.get(`/futsal/booking/${id}`)
        }catch(e){
            console.error("Failed in retrieve booking api repo: ", e)
            throw e
        }
    },
    deleteBooking : async(id:any)=>{
        try{
            return await instance.delete(`/futsal/booking/${id}`)
        }catch(e){
            console.error("Failed in delete booking api repo: ", e)
            throw e
        }
    },
    editBooking : async(slug:any,data:any)=>{
        try{
            return await instance.patch(`/futsal/booking/${slug}/`, data)
        }catch(e){
            console.error("Failed in patch booking api repo: ", e)
            throw e
        }
    },
    getFilteredBooking : async(id:string)=>{
        try{
            return await instance.get(`/futsal/booking/?futsal=${id}`)
        }catch(e){
            console.error("Failed in get booking api repo: ", e)
            throw e
        }
    },

}