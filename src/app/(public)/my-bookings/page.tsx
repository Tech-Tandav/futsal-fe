"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Calendar, Clock, User } from "lucide-react"
import { IBooking } from "@/src/interface/bookingInterface"
import Header from "@/src/components/common/header/header"
import { Spinner } from "@/src/components/ui/spinner"
import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/card"
import { bookingServices } from "@/src/services/bookingService"
import { Badge } from "@/src/components/ui/badge"


export default function MyBookingsPage() {
  const router = useRouter()
  const [bookings, setBookings] = useState<IBooking[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {

    const loadBookings = async () => {
      try {
        setLoading(true)
        const data = await bookingServices.getBooking()
        setBookings(data)
      } catch (error) {
        console.error("Failed to load bookings:", error)
      } finally {
        setLoading(false)
      }
    }

    loadBookings()
  }, [router])

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="flex min-h-[600px] items-center justify-center">
          <div className="text-center space-y-3">
            <Spinner className="mx-auto h-8 w-8" />
            <p className="text-muted-foreground">Loading your bookings...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <h1 className="mb-6 text-3xl font-bold">My Bookings</h1>

        {bookings.length === 0 ? (
          <Card>
            <CardContent className="flex min-h-[300px] items-center justify-center">
              <div className="text-center space-y-2">
                <p className="text-lg font-medium">No bookings yet</p>
                <p className="text-muted-foreground">Start booking futsal courts to see them here</p>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {bookings.map((booking) => (
              <Card key={booking.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-lg">{booking.futsalName || "Futsal Court"}</CardTitle>
                    {getStatusBadge(booking.status)}
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-2 text-sm">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <span>{booking.customerName}</span>
                  </div>

                  {booking.date && (
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span>{booking.date}</span>
                    </div>
                  )}

                  {booking.time && (
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span>{booking.time}</span>
                    </div>
                  )}

                  <div className="text-xs text-muted-foreground">
                    Booked on {new Date(booking.createdAt).toLocaleDateString()}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}

function getStatusBadge(status: string) {
  switch (status) {
    case "confirmed":
      return <Badge className="bg-primary">Confirmed</Badge>
    case "pending":
      return <Badge variant="secondary">Pending</Badge>
    case "rejected":
      return <Badge variant="destructive">Rejected</Badge>
    default:
      return <Badge variant="outline">{status}</Badge>
  }
}
