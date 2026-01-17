import { ILocation } from "@/app/page";
import { instance } from "@/utils/axiosInstance";

export const futsalApiRepository = {
  getFutsals: async (userLocation?:ILocation) => {
    try {
      console.log(userLocation)
      return userLocation ? await instance.get(`futsal/futsals/?lat=${userLocation.lat}&log=${userLocation.lng}`) : await instance.get("futsal/futsals/");
    } catch (e) {
      console.error("Failed to get futsals: ", e);
      throw e;
    }
  },

  retrieveFutsal: async (id: string) => {
    try {
      return await instance.get(`futsal/futsals/${id}/`);
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
