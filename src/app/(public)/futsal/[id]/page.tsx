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


export default function FutsalDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [futsal, setFutsal] = useState<IFutsal | null>(null)
  const [timeSlots, setTimeSlots] = useState<ITimeSlot[]>([])
  const [selectedSlot, setSelectedSlot] = useState<{timeSlot:ITimeSlot, date:string} | null>(null)
  const [loading, setLoading] = useState(true)
  const [isStaff, setStaff] = useState(false)

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

  useEffect(() => {
    loadData()
  }, [params.id])

  const handleSlotClick = (timeSlot:ITimeSlot, date:string) => {
    console.log("hellloooo")
    isStaff ? router.push(`/owner?futsal_id=${String(params.id)}&timeSlot_id=${timeSlot.id}`) : setSelectedSlot({timeSlot, date})
  }

  const handleBooking = () => {
    if (selectedSlot) {
      router.push(`/booking/${futsal?.id}/${selectedSlot.timeSlot.id}/?date=${selectedSlot.date}`)
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
    
      <>
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
                <TimeSlotGrid timeSlots={timeSlots} onSlotClick={handleSlotClick} selectedSlotId={selectedSlot?.timeSlot.id} isStaff={isStaff}/>

                {selectedSlot && (
                  <Dialog open={!!selectedSlot} onOpenChange={(v) => !v && setSelectedSlot(null)}>
                    <DialogContent className="max-h-screen   max-w-3xl sm:max-w-4xl">
                      <DialogHeader>
                        <DialogTitle className="text-lg sm:text-xl">
                          Booking
                        </DialogTitle>
                        <DialogDescription />
                      </DialogHeader>
                      
                      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between rounded-lg border bg-muted/50 p-4">
                        <div>
                          <p className="font-medium text-sm sm:text-base">
                            Selected Time Slot
                          </p>
                          <p className="text-xs sm:text-sm text-muted-foreground">
                            {
                              ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][
                                selectedSlot.timeSlot.dayOfWeek
                              ]
                            }{" "}
                            at {selectedSlot.timeSlot.startTime} - {selectedSlot.timeSlot.endTime}
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
      </>
   
  )
}