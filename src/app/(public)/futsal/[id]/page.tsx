"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Header } from "@/components/custom/Header"
import { TimeSlotGrid } from "@/components/custom/Time-Slot-Grid"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, DollarSign, ArrowLeft, Calendar } from "lucide-react"
import { Spinner } from "@/components/ui/spinner"
import { IFutsal } from "@/domain/interfaces/futsalInterface"
import { ITimeSlot } from "@/domain/interfaces/timeSlotInterface"
import { futsalService } from "@/domain/services/futsalService"
import { timeSlotService } from "@/domain/services/timeSlotService"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib/utils"


const statusColorMap: Record<string, string> = {
  confirmed: "bg-green-500/10 text-green-600 border-green-500/20",
  pending: "bg-yellow-500/10 text-yellow-600 border-yellow-500/20",
  cancelled: "bg-red-500/10 text-red-600 border-red-500/20",
}


export default function FutsalDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [futsal, setFutsal] = useState<IFutsal | null>(null)
  const [timeSlots, setTimeSlots] = useState<ITimeSlot[]>([])
  const [selectedSlot, setSelectedSlot] = useState<ITimeSlot | null>(null)
  const [loading, setLoading] = useState(true)
  const [isStaff, setStaff] = useState(false)

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true)
        const futsalId = String(params.id)
        const [futsalData, slotsData] = await Promise.all([
          futsalService.retrieveFutsal(futsalId),
          timeSlotService.filterTimeSlotByFutsalID(futsalId)
        ])

        setFutsal(futsalData)
        setTimeSlots(slotsData)
        const user = localStorage.getItem("user")
        if (user){
          const isStaff = JSON.parse(user).is_staff
          console.log("user is ",isStaff)
          setStaff(isStaff)
        }

      } catch (error) {
        console.error("Failed to load futsal details:", error)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [params.id])

  const handleSlotClick = (slot:any) => {
    setSelectedSlot(slot)
  }

  const handleBooking = () => {
    if (selectedSlot) {
      router.push(`/booking/${futsal?.id}/${selectedSlot.id}`)
    }
  }

  if (loading) {
    return (
      
      <div className="flex min-h-150 items-center justify-center">
        <div className="text-center space-y-3">
          <Spinner className="mx-auto h-8 w-8" />
          <p className="text-muted-foreground">Loading futsal details...</p>
        </div>
      </div>

    )
  }

  if (!futsal) {
    return (
      
      <div className="container mx-auto px-4 py-8">
        <p className="text-center text-muted-foreground">Futsal not found</p>
      </div>

    )
  }


  

  return (
    
      <main className="container mx-auto px-4 py-8">
        <Button variant="ghost" onClick={() => router.back()} className="mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Listings
        </Button>

        <div className="grid gap-8 grid-cols-1 lg:grid-cols-3">
          <div className="lg:col-span-1">
            <Card>
              <div className="relative h-64 w-full overflow-hidden rounded-t-lg bg-muted">
                {futsal?.images ? (
                  <img
                    src={futsal.imageUrl || "/placeholder.svg"}
                    alt={futsal.name}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center bg-linear-to-br from-primary/20 to-accent/20">
                    <span className="text-8xl font-bold text-primary/30">F</span>
                  </div>
                )}
              </div>

              <CardHeader>
                <CardTitle className="text-2xl">{futsal.name}</CardTitle>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="flex items-start gap-2 text-muted-foreground">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
                  <div>
                    <p>{futsal.address}</p>
                    <p>{futsal.city}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-lg font-semibold text-primary">
                  {/* <DollarSign className="h-5 w-5" /> */}
                  <span>Rs. {futsal.pricePerHour}/hour</span>
                </div>

                {futsal.amenities && futsal.amenities.length > 0 && (
                  <div>
                    <p className="mb-2 text-sm font-medium">Amenities</p>
                    <div className="flex flex-wrap gap-1">
                      {futsal.amenities.map((amenity:any, index:any) => (
                        <Badge key={index} variant="secondary">
                          {amenity}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    <CardTitle>Available Time Slots</CardTitle>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  Select a time slot to book. Weekdays are in columns, time slots are in rows.
                </p>
              </CardHeader>

              <CardContent className="space-y-4 ">
                <TimeSlotGrid timeSlots={timeSlots} onSlotClick={handleSlotClick} selectedSlotId={selectedSlot?.id} isStaff={isStaff}/>

                {selectedSlot && (
                  <Dialog open={!!selectedSlot} onOpenChange={(v) => !v && setSelectedSlot(null)}>
                    <DialogContent className="max-h-screen">
                      <DialogHeader>
                        <DialogTitle className="text-lg sm:text-xl">
                          Confirm Booking
                        </DialogTitle>
                        <DialogDescription />
                      </DialogHeader>
                      {isStaff && selectedSlot.booking.length > 0 && (
                        <div className="mt-4 rounded-xl border bg-muted/40 p-4 shadow-sm max-h-80 overflow-auto">
                          <h4 className="mb-3 text-sm font-semibold text-muted-foreground">
                            Booking Details
                          </h4>

                          <div className="overflow-x-auto">
                            <table className="w-full border-collapse text-xs">
                              <thead>
                                <tr className="border-b text-muted-foreground">
                                  <th className="w-8 px-2 py-2 text-left font-medium">#</th>
                                  <th className="px-3 py-2 text-left font-medium">Customer</th>
                                  <th className="px-3 py-2 text-left font-medium">Phone</th>
                                  <th className="px-3 py-2 text-left font-medium">Booked At</th>
                                  <th className="px-3 py-2 text-left font-medium">Status</th>
                                </tr>
                              </thead>

                              <tbody>
                                {selectedSlot.booking.map((book, index) => (
                                  <tr key={book.id} className="border-b last:border-0 hover:bg-background/60 transition">
                                    {/* Row number */}
                                    <td className="px-2 py-2 text-muted-foreground">{index + 1}</td>
                                    <td className="px-3 py-2 font-medium">{book.customerName}</td>
                                    <td className="px-3 py-2 text-muted-foreground"> {book.customerPhone}</td>
                                    <td className="px-3 py-2 text-muted-foreground whitespace-nowrap">{book.created_at}</td>

                                    {/* Status */}
                                    <td className="px-3 py-2">
                                      <Select
                                        defaultValue={book.status}
                                        // onValueChange={(value) => handleStatusChange(book.id, value)}
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
                                          <SelectItem value="cancelled">Cancelled</SelectItem>
                                        </SelectContent>
                                      </Select>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      )}                        
                      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between rounded-lg border bg-muted/50 p-4">
                        <div>
                          <p className="font-medium text-sm sm:text-base">
                            Selected Time Slot
                          </p>
                          <p className="text-xs sm:text-sm text-muted-foreground">
                            {
                              ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][
                                selectedSlot.dayOfWeek
                              ]
                            }{" "}
                            at {selectedSlot.startTime} - {selectedSlot.endTime}
                          </p>
                        </div>

                        <Button
                          onClick={handleBooking}
                          size="lg"
                          className="w-full sm:w-auto"
                        >
                          Continue to Booking
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
   
  )
}