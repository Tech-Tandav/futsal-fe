"use client"

import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Spinner } from "@/components/ui/spinner"
import { IFutsal } from "@/domain/interfaces/futsalInterface"
import { ITimeSlot } from "@/domain/interfaces/timeSlotInterface"
import { bookingService } from "@/domain/services/bookingService"
import { futsalService } from "@/domain/services/futsalService"
import { timeSlotService } from "@/domain/services/timeSlotService"
import { cn } from "@/lib/utils"
import { ArrowLeft } from "lucide-react"
import { useSearchParams } from "next/navigation"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"


const statusColorMap: Record<string, string> = {
  confirmed: "bg-green-500/50 text-green-600 border-green-500/20",
  pending: "bg-yellow-500/50 text-yellow-600 border-yellow-500/20",
  rejected: "bg-red-500/50 text-red-600 border-red-500/20",
}



export default function OwnerDashboardPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [loading, setLoading] = useState(true)
  const [timeSlot, setTimeSlots] = useState<ITimeSlot | null>(null)
  
  const loadData = async () => {
      try {
        setLoading(true)
        const timeSlotId = searchParams.get("timeSlot_id");
        const slotsData =  timeSlotId ? await timeSlotService.retrieveTimeSlot(timeSlotId) : null
        setTimeSlots(slotsData)
      } catch (error) {
        console.error("Failed to load futsal details:", error)
      } finally {
        setLoading(false)
      }
    }
  
  useEffect(() => {
    loadData()
  }, [])

  const handleBooking = (timeSlots:ITimeSlot) => {
    const futsalId = searchParams.get("futsal_id");
    const date = searchParams.get("date");
    if (timeSlots) {
      router.push(`/booking/${futsalId}/${timeSlots.id}/?date=${date}`)
    }
  }
    
  const handleStatusChange = async(book_id:string, value:string)=>{
    try {
        setLoading(true)
        const response = await bookingService.updateBookingStatus(book_id, value)
        loadData()
    }catch (error) {
        console.error("Failed to load futsal details:", error)
      } finally {
        setLoading(false)
      }
  }

    if (loading) {
      return (
        
        <div className="flex min-h-150 items-center justify-center">
          <div className="text-center space-y-3">
            <Spinner className="mx-auto h-8 w-8" />
            <p className="text-muted-foreground">Loading dashboard...</p>
          </div>
        </div>
        
      )
    }

    return (
      <>
        <Button variant="ghost" onClick={() => router.back()} className="mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Time Slot List
        </Button>

        <div className="mt-4 rounded-xl border bg-muted/40 p-4 shadow-sm  overflow-auto ">
          <h4 className="mb-3 text-sm font-semibold text-muted-foreground">
            Booking Details
          </h4>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-xs">
              <thead>
                <tr className="border-b text-muted-foreground">
                  <th className="px-2 py-2 text-left font-medium">#</th>
                  <th className="px-3 py-2 text-left font-medium">Customer</th>
                  <th className="px-3 py-2 text-left font-medium">Phone</th>
                  <th className="px-3 py-2 text-left font-medium">Booked At</th>
                  <th className="px-3 py-2 text-left font-medium">Status</th>
                </tr>
              </thead>

              <tbody>
                {timeSlot && timeSlot.booking.map((book, index) => {
                  return (
                  <tr key={book.id} className="border-b last:border-0 hover:bg-background/60 transition">
                    {/* Row number */}
                    <td className="px-2 py-2 text-muted-foreground">{index + 1}</td>
                    <td className="px-3 py-2 font-medium">{book.customerName}</td>
                    <td className="min-w-40 px-3 py-2 text-muted-foreground"> {book.customerPhone}</td>
                    <td className="px-3 py-2 text-muted-foreground whitespace-nowrap">{new Date(book.created_at).toLocaleString("en-CA")}</td>

                    {/* Status */}
                    <td className="px-3 py-2">
                      <Select
                        value={book.status}
                        onValueChange={(value) => handleStatusChange(book.id, value)}
                      >
                        <SelectTrigger
                          className={cn(
                            "h-7 w-28 text-xs border",
                            statusColorMap[book.status]
                          )}
                        >
                          <SelectValue />
                        </SelectTrigger>

                        <SelectContent>
                          <SelectItem value="confirmed">Confirmed</SelectItem>
                          <SelectItem value="pending">Pending</SelectItem>
                          <SelectItem value="rejected">Rejected</SelectItem>
                        </SelectContent>
                      </Select>
                    </td>
                  </tr>
                )})}
                
              </tbody>
            </table>
          </div>
          {timeSlot && (
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between rounded-lg border bg-muted/50 p-4">
              <div>
                <p className="font-medium text-sm sm:text-base">
                  Selected Time Slot
                </p>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  {
                    ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][
                      timeSlot.dayOfWeek
                    ]
                  }{" "}
                  at {timeSlot.startTime} - {timeSlot.endTime}
                </p>
              </div>

              <Button
                onClick={()=>handleBooking(timeSlot)}
                size="lg"
                className="w-full sm:w-auto"
              >
                Continue to Booking
              </Button>
            </div>
           
          )}
          </div>
      </>
          
    )
}