import { instance } from "@/src/utils/axiosInstance";
// import { IfutsalGet , IfutsalPost } from "@/interface/futsalInterface";

// futsalRepository.ts
export interface FutsalApiResponse {
  id: number
  name: string
  image: string
  address: string
  city: string
  price_per_hour: number
  amenities: string[]
  time_slots: any[]
}

export const futsalApiRepository = {
    filteredfutsal : async(lat?:number, lng?:number)=>{
        try{
            return await instance.get(`/futsal/futsals/?lat=${lat}&lng=${lng}`)
        }catch(e){
            console.error("Failed in get futsal api repo: ", e)
            throw e
        }
    },
    postfutsal : async(data:any)=>{
        try{
            return await instance.post("/futsal/futsals/", data)
        }catch(e){
            console.error("Failed in post futsal api repo: ", e)
            throw e
        }
    },
    retrieveFutsal : async (id: string): Promise<FutsalApiResponse | null> => {
        try {
            const res = await instance.get(`/futsal/futsals/${id}`)
            return res?.data ?? null
        } catch {
            return null
        }
    },
    retrievefutsal : async(id:any)=>{
        try{
            return await instance.get(`/futsal/futsals/${id}`)
        }catch(e){
            console.error("Failed in retrieve futsal api repo: ", e)
            throw e
        }
    },
    deletefutsal : async(id:any)=>{
        try{
            return await instance.delete(`/futsal/futsals/${id}`)
        }catch(e){
            console.error("Failed in delete futsal api repo: ", e)
            throw e
        }
    },
    editfutsal : async(slug:any,data:any)=>{
        try{
            return await instance.patch(`/futsal/futsals/${slug}`, data)
        }catch(e){
            console.error("Failed in patch futsal api repo: ", e)
            throw e
        }
    },

}