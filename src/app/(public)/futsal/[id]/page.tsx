"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Badge } from "@/src/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/card"
import { MapPin, DollarSign, ArrowLeft, Calendar } from "lucide-react"
import { Spinner } from "@/src/components/ui/spinner"
import { IFutsal } from '@/src/interface/futsalInterface'
import { ITimeSlot } from "@/src/interface/timeSlotInterface"
import { futsalServices } from '@/src/services/futsalSerivce'
import { timeSlotServices } from "@/src/services/timeSlotService"
import Header from "@/src/components/common/header/header"
import { TimeSlotGrid } from "@/src/components/features/time-slot/time-slot-grid"
import { Button } from "@/src/components/ui/button"


export default function FutsalDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [futsal, setFutsal] = useState<IFutsal | null>(null)
  const [timeSlots, setTimeSlots] = useState<ITimeSlot[]>([])
  const [selectedSlot, setSelectedSlot] = useState<ITimeSlot | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true)
        const futsalId = String(params.id)
        const [futsalData, slotsData] = await Promise.all([
          futsalServices.retrievefutsal(futsalId),
          timeSlotServices.getFilteredTimeSlot(futsalId)
        ])

        setFutsal(futsalData)
        setTimeSlots(slotsData)

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
    // const token = localStorage.getItem("access_token")
    // if (!token) {
    //   router.push("/login")
    //   return
    // }

    if (selectedSlot) {
      router.push(`/booking/${futsal?.id}/${selectedSlot.id}`)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="flex min-h-[600px] items-center justify-center">
          <div className="text-center space-y-3">
            <Spinner className="mx-auto h-8 w-8" />
            <p className="text-muted-foreground">Loading futsal details...</p>
          </div>
        </div>
      </div>
    )
  }

  if (!futsal) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <p className="text-center text-muted-foreground">Futsal not found</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <Button variant="ghost" onClick={() => router.back()} className="mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Listings
        </Button>

        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-1">
            <Card>
              <div className="relative h-64 w-full overflow-hidden rounded-t-lg bg-muted">
                {futsal?.image ? (
                  <img
                    src={futsal.image || "/placeholder.svg"}
                    alt={futsal.name}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center bg-gradient-to-br from-primary/20 to-accent/20">
                    <span className="text-8xl font-bold text-primary/30">F</span>
                  </div>
                )}
              </div>

              <CardHeader>
                <CardTitle className="text-2xl">{futsal.name}</CardTitle>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="flex items-start gap-2 text-muted-foreground">
                  <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0" />
                  <div>
                    <p>{futsal.address}</p>
                    <p>{futsal.city}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-lg font-semibold text-primary">
                  <DollarSign className="h-5 w-5" />
                  <span>${futsal.pricePerHour}/hour</span>
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
                  {selectedSlot && (
                    <Badge variant="default" className="text-sm">
                      Selected Slot
                    </Badge>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">
                  Select a time slot to book. Weekdays are in columns, time slots are in rows.
                </p>
              </CardHeader>

              <CardContent className="space-y-4">
                <TimeSlotGrid timeSlots={timeSlots} onSlotClick={handleSlotClick} selectedSlotId={selectedSlot?.id} />

                {selectedSlot && (
                  <div className="flex items-center justify-between rounded-lg border bg-muted/50 p-4">
                    <div>
                      <p className="font-medium">Selected Time Slot</p>
                      <p className="text-sm text-muted-foreground">
                        {
                          ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][
                            selectedSlot.day_of_week
                          ]
                        }{" "}
                        at {selectedSlot.start_time} - {selectedSlot.end_time}
                      </p>
                    </div>
                    <Button onClick={handleBooking} size="lg">
                      Continue to Booking
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
