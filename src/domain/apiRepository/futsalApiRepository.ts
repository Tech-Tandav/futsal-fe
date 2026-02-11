import { instance } from "@/utils/axiosInstance";
import { ILocation } from "../interfaces/location";

export const futsalApiRepository = {
  getFutsals: async (page:number, search?: string, userLocation?:ILocation) => {
    try {
      const params = new URLSearchParams()
      console.log(params)
      params.append("page", String(page))
      console.log(params)
      if (search) params.append("search", search)
      if (userLocation?.lat) params.append("lat", String(userLocation.lat))
      if (userLocation?.lng) params.append("lng", String(userLocation.lng))
      return  await instance.get(`futsal/futsals/?${params.toString()}`)
    } catch (e) {
      console.error("Failed to get futsals: ", e);
      throw e;
    }
  },

  retrieveFutsal: async (id: string, date?:string | null, time_slot?:string) => {
    try {
      return   date && time_slot ? await instance.get(`futsal/futsals/${id}/?date=${date}&time_slot=${time_slot}`) :  await instance.get(`futsal/futsals/${id}/`);
    } catch (e) {
      console.error("Failed to retrieve futsal: ", e);
      throw e;
    }
  },

  createFutsal: async (data: FormData) => {
    try {
      return await instance.post("futsals/", data);
    } catch (e) {
      console.error("Failed to create futsal: ", e);
      throw e;
    }
  },

  updateFutsal: async (id: string, data: FormData) => {
    try {
      return await instance.patch(`futsals/${id}/`, data);
    } catch (e) {
      console.error("Failed to update futsal: ", e);
      throw e;
    }
  },

  deleteFutsal: async (id: string) => {
    try {
      return await instance.delete(`futsals/${id}/`);
    } catch (e) {
      console.error("Failed to delete futsal: ", e);
      throw e;
    }
  },
};
