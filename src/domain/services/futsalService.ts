import { futsalApiRepository } from "@/domain/apiRepository/futsalApiRepository";
import { IFutsalApi, IFutsal, IFutsalImageApi, IFutsalImage } from "@/domain/interfaces/futsalInterface";
import { mapFutsal } from "@/domain/mappers/futsalMapper";


export const futsalService = {
  getFutsals: async (): Promise<IFutsal[]> => {
    try {
      const response = await futsalApiRepository.getFutsals();
      if (response.status !== 200) return [];
      const rawData = response.data.results;
      return rawData.map((futsal:IFutsalApi): IFutsal => ({
        id: futsal.id,
        name: futsal.name,
        address: futsal.address,
        city: futsal.city,
        latitude: futsal.latitude,
        longitude: futsal.longitude,
        pricePerHour: futsal.price_per_hour,
        amenities: futsal.amenities,
        isActive: futsal.is_active,
        imageUrl: futsal.image,
        createdAt: futsal.created_at,
        distance : 1,
        images: futsal.images.map((img:IFutsalImageApi):IFutsalImage => ({
          id: img.id,
          imageUrl: img.image,
        })),
      }));
    } catch (e) {
      console.error("Failed to get futsals: ", e);
      throw e;
    }
  },

  retrieveFutsal: async (id: string): Promise<IFutsal | null> => {
    try {
      const response = await futsalApiRepository.retrieveFutsal(id);
      console.log(response)
      if (response?.status !== 200) return null;

      const rawData = response.data;
      const  mappedData  ={
        id: rawData.id,
        name: rawData.name,
        address: rawData.address,
        city: rawData.city,
        latitude: rawData.latitude,
        longitude: rawData.longitude,
        pricePerHour: rawData.price_per_hour,
        amenities: rawData.amenities,
        isActive: rawData.is_active,
        imageUrl: rawData.image,
        createdAt: rawData.created_at,
        images: rawData.images.map((img:IFutsalImageApi):IFutsalImage => ({
          id: img.id,
          imageUrl: img.image,
        })),
        distance: 1
      }
      return mappedData

    } catch (e) {
      console.error("Failed to retrieve futsal: ", e);
      throw e
    }
  },

  // createFutsal: async (data: IFutsal): Promise<any> => {
  //   try {
  //     const formData = new FormData();
  //     Object.keys(data).forEach(key => formData.append(key, data[key]));
  //     const response = await futsalApiRepository.createFutsal(formData);
  //     return response.data;
  //   } catch (e) {
  //     console.error("Failed to create futsal: ", e);
  //   }
  // },

  // updateFutsal: async (id: number, data: any): Promise<any> => {
  //   try {
  //     const formData = new FormData();
  //     Object.keys(data).forEach(key => formData.append(key, data[key]));
  //     const response = await futsalApiRepository.updateFutsal(id, formData);
  //     return response.data;
  //   } catch (e) {
  //     console.error("Failed to update futsal: ", e);
  //   }
  // },

  deleteFutsal: async (id: string) => {
    try {
      await futsalApiRepository.deleteFutsal(id);
    } catch (e) {
      console.error("Failed to delete futsal: ", e);
    }
  },
};
