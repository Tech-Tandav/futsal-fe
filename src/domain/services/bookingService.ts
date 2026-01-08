import { bookingApiRepository } from "@/domain/apiRepository/bookingApiRepository";
import { IBookingApi, IBooking } from "@/domain/interfaces/bookingInterface";
import { mapBooking } from "../mappers/bookingMapper";
// import { mapBooking } from "@/mappers/bookingMapper";

export const bookingService = {
  getBookings: async (): Promise<IBooking[]> => {
    try {
      const response = await bookingApiRepository.getBookings();
      if (response?.status !== 200) return [];
      const rawData: IBookingApi[] = response.data.results;
      return rawData.map(mapBooking);
    } catch (e) {
      console.error("Failed to get bookings: ", e);
      return [];
    }
  },

  retrieveBooking: async (id: number): Promise<IBooking | undefined> => {
    try {
      const response = await bookingApiRepository.retrieveBooking(id);
      if (response?.status !== 200) return;
      return mapBooking(response.data);
    } catch (e) {
      console.error("Failed to retrieve booking: ", e);
    }
  },

  createBooking: async (data: any) => {
    try {
      const response = await bookingApiRepository.createBooking(data);
      return response.data;
    } catch (e) {
      console.error("Failed to create booking: ", e);
    }
  },

  updateBookingStatus: async (id: string, status: any) => {
    try {
      const response = await bookingApiRepository.updateBookingStatus(id, { status });
      return mapBooking(response.data);
    } catch (e) {
      console.error("Failed to update booking status: ", e);
    }
  },

  deleteBooking: async (id: number) => {
    try {
      await bookingApiRepository.deleteBooking(id);
    } catch (e) {
      console.error("Failed to delete booking: ", e);
    }
  },
};
