"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Calendar, Clock, User } from "lucide-react"
import { IBooking } from "@/domain/interfaces/bookingInterface"
import { bookingService } from "@/domain/services/bookingService"
import { Spinner } from "@/components/ui/spinner"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"


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

export default function MyBookingsPage() {
  const router = useRouter()
  const [bookings, setBookings] = useState<IBooking[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {

    const loadBookings = async () => {
      try {
        setLoading(true)
        const data = await bookingService.getBookings()
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
        <div className="flex min-h-150 items-center justify-center">
          <div className="text-center space-y-3">
            <Spinner className="mx-auto h-8 w-8" />
            <p className="text-muted-foreground">Loading your bookings...</p>
          </div>
        </div>
    )
  }

  return (
    
      <>
        <Button variant="ghost" onClick={() => router.push("/")} className="mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Listings
        </Button>
        <div className="mt-4 rounded-xl border bg-muted/40 p-4 shadow-sm  overflow-auto ">
          <h1 className="mb-6 text-3xl font-bold">My Booking</h1>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-xs">
              <thead>
                <tr className="border-b text-muted-foreground">
                  <th className="px-2 py-2 text-left font-medium">ID</th>
                  <th className="px-3 py-2 text-left font-medium">Customer Name</th>
                  <th className="px-3 py-2 text-left font-medium">Futsal Name</th>
                  <th className="px-3 py-2 text-left font-medium">Date</th>
                  <th className="px-3 py-2 text-left font-medium">Start Time</th>
                  <th className="px-3 py-2 text-left font-medium">Status</th>
                  <th className="px-3 py-2 text-left font-medium">Created At</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((booking, index) => {
                  const date = new Date(booking.createdAt).toLocaleString("en-CN")
                  return (
                  <tr key={booking.id} className="border-b last:border-0 hover:bg-background/60 transition">
                    <td className="px-2 py-2 text-muted-foreground">{index + 1}</td>
                    <td className="px-3 py-2 font-medium">{booking.customerName}</td>
                    <td className="px-3 py-2 font-medium"> {booking.futsalName}</td>
                    <td className="px-3 py-2 font-medium">{booking.date}</td>
                    <td className="px-3 py-2 font-medium"> {booking.startTime}</td>
                    <td className="px-3 py-2 font-medium"> {getStatusBadge(booking.status)}</td>
                    <td className="px-3 py-2 font-medium"> {date}</td>
                  </tr>
                )})}
              </tbody>
            </table>
          </div>
        </div>
      </>
  
  )
}