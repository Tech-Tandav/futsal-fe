import { instance } from "@/utils/axiosInstance";

export const timeSlotApiRepository = {
  getTimeSlots: async () => {
    try {
      return await instance.get("time-slots/");
    } catch (e) {
      console.error("Failed to get time slots: ", e);
      throw e;
    }
  },

  retrieveTimeSlot: async (id: number) => {
    try {
      return await instance.get(`futsal/time-slots/${id}/`);
    } catch (e) {
      console.error("Failed to retrieve time slot: ", e);
      throw e;
    }
  },

  createTimeSlot: async (data: any) => {
    try {
      return await instance.post("time-slots/", data);
    } catch (e) {
      console.error("Failed to create time slot: ", e);
      throw e;
    }
  },

  updateTimeSlot: async (id: number, data: any) => {
    try {
      return await instance.patch(`time-slots/${id}/`, data);
    } catch (e) {
      console.error("Failed to update time slot: ", e);
      throw e;
    }
  },

  deleteTimeSlot: async (id: number) => {
    try {
      return await instance.delete(`time-slots/${id}/`);
    } catch (e) {
      console.error("Failed to delete time slot: ", e);
      throw e;
    }
  },
  filterTimeSlotByFutsalID : async (id:string) => {
    try {
      return await instance.get(`futsal/time-slots/?futsal=${id}`);
    } catch (e) {
      console.error("Failed to get time slots: ", e);
      throw e;
    }
  }, 
};
