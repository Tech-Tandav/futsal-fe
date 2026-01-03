export interface TimeSlot {
  id: number
  futsal_id: number
  day_of_week: number // 0-6 (Sunday-Saturday)
  start_time: string // HH:MM format
  end_time: string
  status: "available" | "booked" | "in_queue"
  booked_by?: number
  booking_id?: number
}
