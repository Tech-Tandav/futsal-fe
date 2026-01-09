"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Calendar, Clock, UserIcon, CheckCircle, XCircle, Mail, Phone, MapPin, DollarSign, Trash2 } from "lucide-react"
import { IBooking } from "@/domain/interfaces/bookingInterface"
import { IFutsal } from "@/domain/interfaces/futsalInterface"
import { bookingService } from "@/domain/services/bookingService"
import { futsalService } from "@/domain/services/futsalService"
import { toast } from "sonner"
import { Badge } from "@/components/ui/badge"
import { Header } from "@/components/custom/Header"
import { Spinner } from "@/components/ui/spinner"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger  } from "@radix-ui/react-tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"



export default function OwnerDashboardPage() {
  const router = useRouter()
  const [bookings, setBookings] = useState<IBooking[]>([])
  const [futsals, setFutsals] = useState<IFutsal[]>([])
  const [loading, setLoading] = useState(true)
  const [processingId, setProcessingId] = useState<string | null>(null)
  const [deletingId, setDeletingId] = useState<string | null>(null)

  useEffect(() => {
    // const token = localStorage.getItem("access_token")
    // const userStr = localStorage.getItem("user")

    // if (!token) {
    //   router.push("/login?redirect=/owner")
    //   return
    // }

    // if (userStr) {
    //   const user: User  = JSON.parse(userStr)
    //   if (user.user_type !== "owner") {
    //     router.push("/")
    //     return
    //   }
    // }

    loadData()
  }, [router])

  const loadData = async () => {
    try {
      setLoading(true)
      const [bookingsData, futsalsData] = await Promise.all([bookingService.getBookings(), futsalService.getFutsals()])
      setBookings(bookingsData)
      setFutsals(futsalsData)
    } catch (error) {
      console.error("Failed to load data:", error)
      toast.error("Failed to load dashboard data")
    } finally {
      setLoading(false)
    }
  }

  const handleUpdateStatus = async (bookingId: string, status: "confirmed" | "rejected") => {
    try {
      setProcessingId(bookingId)
      await bookingService.updateBookingStatus(bookingId, status)
      toast.success(`Booking ${status === "confirmed" ? "confirmed" : "rejected"} successfully`)
      await loadData()
    } catch (error) {
      console.error("Failed to update booking status:", error)
      toast.error("Failed to update booking status")
    } finally {
      setProcessingId(null)
    }
  }

  const handleDeleteFutsal = async (id: string) => {
    if (!confirm("Are you sure you want to delete this futsal court? This action cannot be undone.")) {
      return
    }

    try {
      setDeletingId(id)
      await futsalService.deleteFutsal(id)
      toast.success("Futsal court deleted successfully")
      await loadData()
    } catch (error) {
      console.error("Failed to delete futsal:", error)
      toast.error("Failed to delete futsal court")
    } finally {
      setDeletingId(null)
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "confirmed":
        return (
          <Badge className="bg-primary">
            <CheckCircle className="mr-1 h-3 w-3" />
            Confirmed
          </Badge>
        )
      case "pending":
        return <Badge variant="secondary">Pending</Badge>
      case "rejected":
        return (
          <Badge variant="destructive">
            <XCircle className="mr-1 h-3 w-3" />
            Rejected
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const pendingBookings = bookings.filter((b) => b.status === "pending")
  const confirmedBookings = bookings.filter((b) => b.status === "confirmed")
  const rejectedBookings = bookings.filter((b) => b.status === "rejected")

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="flex min-h-150 items-center justify-center">
          <div className="text-center space-y-3">
            <Spinner className="mx-auto h-8 w-8" />
            <p className="text-muted-foreground">Loading dashboard...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">Owner Dashboard</h1>
          <p className="text-muted-foreground">Manage your futsal courts and bookings</p>
        </div>

        <div className="mb-6 grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>My Courts</CardDescription>
              <CardTitle className="text-3xl">{futsals.length}</CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Pending Requests</CardDescription>
              <CardTitle className="text-3xl">{pendingBookings.length}</CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Confirmed Bookings</CardDescription>
              <CardTitle className="text-3xl">{confirmedBookings.length}</CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Rejected</CardDescription>
              <CardTitle className="text-3xl">{rejectedBookings.length}</CardTitle>
            </CardHeader>
          </Card>
        </div>

        <Tabs defaultValue="courts" className="space-y-4">
          <TabsList>
            <TabsTrigger value="courts">My Courts</TabsTrigger>
            <TabsTrigger value="pending">
              Pending
              {pendingBookings.length > 0 && (
                <Badge variant="secondary" className="ml-2 h-5 w-5 rounded-full p-0 text-xs">
                  {pendingBookings.length}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="confirmed">Confirmed</TabsTrigger>
            <TabsTrigger value="rejected">Rejected</TabsTrigger>
            <TabsTrigger value="all">All Bookings</TabsTrigger>
          </TabsList>

          <TabsContent value="courts" className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-semibold">My Futsal Courts</h2>
                <p className="text-sm text-muted-foreground">Manage your registered futsal courts</p>
              </div>
              {/* <AddFutsalDialog onSuccess={loadData} /> */}
            </div>

            {futsals.length === 0 ? (
              <Card>
                <CardContent className="flex min-h-75 flex-col items-center justify-center">
                  <p className="mb-4 text-muted-foreground">You haven't added any futsal courts yet</p>
                  {/* <AddFutsalDialog onSuccess={loadData} /> */}
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {futsals.map((futsal) => (
                  <Card key={futsal.id} className="overflow-hidden">
                    <div className="relative h-40 w-full overflow-hidden bg-muted">
                      {futsal.imageUrl ? (
                        <img
                          src={futsal.imageUrl || "/placeholder.svg"}
                          alt={futsal.name}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center bg-linear-to-br from-primary/20 to-accent/20">
                          <span className="text-5xl font-bold text-primary/30">F</span>
                        </div>
                      )}
                    </div>

                    <CardHeader>
                      <CardTitle className="text-lg">{futsal.name}</CardTitle>
                      <div className="flex items-start gap-1 text-sm text-muted-foreground">
                        <MapPin className="h-4 w-4 shrink-0 mt-0.5" />
                        <span>
                          {futsal.address}, {futsal.city}
                        </span>
                      </div>
                    </CardHeader>

                    <CardContent className="space-y-3">
                      <div className="flex items-center gap-2 text-lg font-semibold text-primary">
                        <DollarSign className="h-5 w-5" />
                        <span>${futsal.pricePerHour}/hour</span>
                      </div>

                      {futsal.amenities && futsal.amenities.length > 0 && (
                        <div className="flex flex-wrap gap-1">
                          {futsal.amenities.slice(0, 3).map((amenity, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {amenity}
                            </Badge>
                          ))}
                          {futsal.amenities.length > 3 && (
                            <Badge variant="secondary" className="text-xs">
                              +{futsal.amenities.length - 3}
                            </Badge>
                          )}
                        </div>
                      )}

                      <div className="flex gap-2 pt-2">
                        {/* <EditFutsalDialog futsal={futsal} onSuccess={loadData} /> */}
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDeleteFutsal(futsal.id)}
                          disabled={deletingId === futsal.id}
                          className="text-destructive hover:bg-destructive hover:text-destructive-foreground"
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          {deletingId === futsal.id ? "Deleting..." : "Delete"}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="pending" className="space-y-4">
            {pendingBookings.length === 0 ? (
              <Card>
                <CardContent className="flex min-h-50 items-center justify-center">
                  <p className="text-muted-foreground">No pending bookings</p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-4 md:grid-cols-2">
                {pendingBookings.map((booking) => (
                  <Card key={booking.id}>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <CardTitle className="text-lg">{booking.futsalName || "Futsal Court"}</CardTitle>
                        {getStatusBadge(booking.status)}
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm">
                          <UserIcon className="h-4 w-4 text-muted-foreground" />
                          <span className="font-medium">{booking.customerName}</span>
                        </div>

                        <div className="flex items-center gap-2 text-sm">
                          <Mail className="h-4 w-4 text-muted-foreground" />
                          <span>{booking.customerEmail}</span>
                        </div>

                        <div className="flex items-center gap-2 text-sm">
                          <Phone className="h-4 w-4 text-muted-foreground" />
                          <span>{booking.customerPhone}</span>
                        </div>

                        {booking.date && (
                          <div className="flex items-center gap-2 text-sm">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <span>{booking.date}</span>
                          </div>
                        )}

                        {booking.startTime && (
                          <div className="flex items-center gap-2 text-sm">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            <span>{booking.startTime}</span>
                          </div>
                        )}

                        <div className="text-xs text-muted-foreground">
                          Requested on {new Date(booking.createdAt).toLocaleDateString()}
                        </div>
                      </div>

                      <Alert>
                        <AlertDescription className="text-xs">
                          Review the booking details and confirm or reject the request
                        </AlertDescription>
                      </Alert>

                      <div className="grid grid-cols-2 gap-2">
                        <Button 
                          size="sm"
                          onClick={() => handleUpdateStatus(booking.id, "confirmed")}
                          disabled={processingId === booking.id}
                        >
                          <CheckCircle className="mr-1 h-4 w-4" />
                          {processingId === booking.id ? "Processing..." : "Confirm"}
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleUpdateStatus(booking.id, "rejected")}
                          disabled={processingId === booking.id}
                        >
                          <XCircle className="mr-1 h-4 w-4" />
                          Reject
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="confirmed" className="space-y-4">
            {confirmedBookings.length === 0 ? (
              <Card>
                <CardContent className="flex min-h-50 items-center justify-center">
                  <p className="text-muted-foreground">No confirmed bookings</p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {confirmedBookings.map((booking) => (
                  <Card key={booking.id}>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <CardTitle className="text-base">{booking.futsalName || "Futsal Court"}</CardTitle>
                        {getStatusBadge(booking.status)}
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <div className="flex items-center gap-2 text-sm">
                        <UserIcon className="h-4 w-4 text-muted-foreground" />
                        <span>{booking.customerName}</span>
                      </div>

                      {booking.date && (
                        <div className="flex items-center gap-2 text-sm">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span>{booking.date}</span>
                        </div>
                      )}

                      {booking.startTime && (
                        <div className="flex items-center gap-2 text-sm">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span>{booking.startTime}</span>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="rejected" className="space-y-4">
            {rejectedBookings.length === 0 ? (
              <Card>
                <CardContent className="flex min-h-50 items-center justify-center">
                  <p className="text-muted-foreground">No rejected bookings</p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {rejectedBookings.map((booking) => (
                  <Card key={booking.id}>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <CardTitle className="text-base">{booking.futsalName || "Futsal Court"}</CardTitle>
                        {getStatusBadge(booking.status)}
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <div className="flex items-center gap-2 text-sm">
                        <UserIcon className="h-4 w-4 text-muted-foreground" />
                        <span>{booking.customerName}</span>
                      </div>

                      {booking.date && (
                        <div className="flex items-center gap-2 text-sm">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span>{booking.date}</span>
                        </div>
                      )}

                      <div className="text-xs text-muted-foreground">
                        Rejected on {new Date(booking.createdAt).toLocaleDateString()}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="all" className="space-y-4">
            {bookings.length === 0 ? (
              <Card>
                <CardContent className="flex min-h-50 items-center justify-center">
                  <p className="text-muted-foreground">No bookings</p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {bookings.map((booking) => (
                  <Card key={booking.id}>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <CardTitle className="text-base">{booking.futsalName || "Futsal Court"}</CardTitle>
                        {getStatusBadge(booking.status)}
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <div className="flex items-center gap-2 text-sm">
                        <UserIcon className="h-4 w-4 text-muted-foreground" />
                        <span>{booking.customerName}</span>
                      </div>

                      {booking.date && (
                        <div className="flex items-center gap-2 text-sm">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span>{booking.date}</span>
                        </div>
                      )}

                      {booking.startTime && (
                        <div className="flex items-center gap-2 text-sm">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span>{booking.startTime}</span>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}