import { futsalApiRepository } from "@/domain/apiRepository/futsalApiRepository";
import { IFutsalApi, IFutsal, IFutsalImageApi, IFutsalImage } from "@/domain/interfaces/futsalInterface";
import { mapFutsal } from "@/domain/mappers/futsalMapper";


export const futsalService = {
  getFutsals: async (): Promise<IFutsal[]> => {
    try {
      const response = await futsalApiRepository.getFutsals();
      if (response.status !== 200) return [];
      const rawData = response.data.results;
      return rawData.map(mapFutsal);
    } catch (e) {
      console.error("Failed to get futsals: ", e);
      throw e;
    }
  },

  retrieveFutsal: async (id: string): Promise<IFutsal | null> => {
    try {
      const response = await futsalApiRepository.retrieveFutsal(id);
      if (response?.status !== 200) return null;
      const rawData = response.data;
      return mapFutsal(rawData)
    } catch (e) {
      console.error("Failed to retrieve futsal: ", e);
      throw e
    }
  },

  createFutsal: async (data: any): Promise<any> => {
    try {
      const formData = new FormData();
      Object.keys(data).forEach(key => formData.append(key, data[key]));
      const response = await futsalApiRepository.createFutsal(formData);
      return response.data;
    } catch (e) {
      console.error("Failed to create futsal: ", e);
    }
  },
  updateFutsal: async (id: string, data: any): Promise<any> => {
    try {
      const formData = new FormData();
      Object.keys(data).forEach(key => formData.append(key, data[key]));
      const response = await futsalApiRepository.updateFutsal(id, formData);
      return response.data;
    } catch (e) {
      console.error("Failed to update futsal: ", e);
    }
  },
  deleteFutsal: async (id: string) => {
    try {
      await futsalApiRepository.deleteFutsal(id);
    } catch (e) {
      console.error("Failed to delete futsal: ", e);
    }
  },
};
