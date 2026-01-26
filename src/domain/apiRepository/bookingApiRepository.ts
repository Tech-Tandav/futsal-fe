import { instance } from "@/utils/axiosInstance";

export const bookingApiRepository = {
  getBookings: async (page:number) => {
    try {
      return await instance.get(`futsal/booking/?page=${page}`);
    } catch (e) {
      console.error("Failed to get bookings: ", e);
      throw e;
    }
  },

  retrieveBooking: async (id: string) => {
    try {
      return await instance.get(`futsal/booking/${id}/`);
    } catch (e) {
      console.error("Failed to retrieve booking: ", e);
      throw e;
    }
  },

  createBooking: async (data: any) => {
    try {
      return await instance.post("futsal/booking/create/", data);
    } catch (e) {
      console.error("Failed to create booking: ", e);
      throw e;
    }
  },

  updateBookingStatus: async (id: string, status:any) => {
    try {
      return await instance.patch(`futsal/booking/${id}/`, {status:status});
    } catch (e) {
      console.error("Failed to update booking: ", e);
      throw e;
    }
  },

  deleteBooking: async (id: number) => {
    try {
      return await instance.delete(`bookings/${id}/`);
    } catch (e) {
      console.error("Failed to delete booking: ", e);
      throw e;
    }
  },
};
