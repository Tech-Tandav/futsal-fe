"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Calendar, Clock, User } from "lucide-react"
import { IBooking } from "@/domain/interfaces/bookingInterface"
import { bookingService } from "@/domain/services/bookingService"
import { Spinner } from "@/components/ui/spinner"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import MyPagination from "@/components/global/MyPagination"
import { toast } from "sonner"


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

export default function MyBooking() {
  const router = useRouter()
  const [bookings, setBookings] = useState<IBooking[]>([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState<number>(1)
  const [totalPages, settotalPages] = useState<number>(1)
  const [pageSize, setpageSize] = useState<number>(1)
  useEffect(() => {

    const loadBookings = async (page:number) => {
      try {
        setLoading(true)
        const data = await bookingService.getBookings(page)
        setBookings(data.results)
        setPage(data.current_page)
        settotalPages(data.total_pages)
        setpageSize(data.page_size)
      } catch (error:any) {
        for (const e of error.response.data.errors){
          toast.error(e.detail, { position: "top-right" })
        }
      } finally {
        setLoading(false)
      }
    }

    loadBookings(page)
  }, [router, page])

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
                    <td className="px-2 py-2 text-muted-foreground">{(page - 1) * pageSize + index + 1}</td>
                    <td className="px-3 py-2 font-medium">{booking.customerName}</td>
                    <td className="px-3 py-2 font-medium"> {booking.futsalName}</td>
                    <td className="px-3 py-2 font-medium">{booking.date}</td>
                    <td className="px-3 py-2 font-medium"> {booking.startTime}</td>
                    <td className="px-3 py-2 font-medium"> {getStatusBadge(booking.status)}</td>
                    <td className="px-3 py-2 font-medium"> {new Date(date).toLocaleString("en-CA")}</td>
                  </tr>
                )})}
              </tbody>
            </table>
            <div className="mt-4 flex justify-start">
              <MyPagination
                currentPage={page}
                totalPages={totalPages}
                onPageChange={setPage}
              />
            </div>
          </div>
        </div>
      </>
  
  )
}