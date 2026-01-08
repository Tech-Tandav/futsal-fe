import {
  ITimeSlotApi,
  ITimeSlot,
} from "../interfaces/timeSlotInterface";


// TimeSlot mapping
export const mapTimeSlot = (slot: ITimeSlotApi): ITimeSlot => ({
  id: slot.id,
  futsalId: slot.futsal,
  futsalName: slot.futsal_name,
  dayOfWeek: slot.day_of_week,
  startTime: slot.start_time,
  endTime: slot.end_time,
  status: slot.status,
  dayName: slot.day_name,
});

