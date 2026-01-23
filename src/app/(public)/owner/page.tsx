"use client"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Spinner } from "@/components/ui/spinner"
import { IFutsal } from "@/domain/interfaces/futsalInterface"
import { ITimeSlot } from "@/domain/interfaces/timeSlotInterface"
import { bookingService } from "@/domain/services/bookingService"
import { futsalService } from "@/domain/services/futsalService"
import { timeSlotService } from "@/domain/services/timeSlotService"
import { cn } from "@/lib/utils"
import { useSearchParams } from "next/navigation"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"


const statusColorMap: Record<string, string> = {
  confirmed: "bg-green-500/50 text-green-600 border-green-500/20",
  pending: "bg-yellow-500/50 text-yellow-600 border-yellow-500/20",
  rejected: "bg-red-500/50 text-red-600 border-red-500/20",
}



export default function OwnerDashboardPage() {
  const [loading, setLoading] = useState(true)
  // const router = useRouter()
  const [timeSlots, setTimeSlots] = useState<ITimeSlot | null>(null)
  const searchParams = useSearchParams();
  const loadData = async () => {
      try {
        setLoading(true)
        const futsalId = searchParams.get("futsal_id");
        const timeSlotId = searchParams.get("timeSlot_id");
        console.log(timeSlotId)
        const slotsData =  timeSlotId ? await timeSlotService.retrieveTimeSlot(timeSlotId) : null
        console.log(slotsData)
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
      

        <div className="mt-4 rounded-xl border bg-muted/40 p-4 shadow-sm max-h-80 overflow-auto">
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
                {timeSlots && timeSlots.booking.map((book, index) => {
                  return (
                  <tr key={book.id} className="border-b last:border-0 hover:bg-background/60 transition">
                    {/* Row number */}
                    <td className="px-2 py-2 text-muted-foreground">{index + 1}</td>
                    <td className="px-3 py-2 font-medium">{book.customerName}</td>
                    <td className="px-3 py-2 text-muted-foreground"> {book.customerPhone}</td>
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
        </div>
    )
}