export interface ITimeSlot {
  id: number
  futsal_id: string
  day_of_week: number 
  start_time: string 
  end_time: string
  status: "available" | "booked" | "in_queue" | "past"
  booked_by?: string
  booking_id?: number
}
