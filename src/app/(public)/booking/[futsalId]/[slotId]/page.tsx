"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { ArrowLeft, CheckCircle, Calendar, Clock, MapPin } from "lucide-react"
import { IFutsal } from "@/src/interface/futsalInterface"
import { ITimeSlot } from "@/src/interface/timeSlotInterface"
import Header from "@/src/components/common/header/header"
import { Spinner } from "@/src/components/ui/spinner"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/src/components/ui/card"
import { Alert, AlertDescription } from "@/src/components/ui/alert"
import { Button } from "@/src/components/ui/button"
import { Label } from "@/src/components/ui/label"
import { Input } from "@/src/components/ui/input"
import { futsalServices } from '@/src/services/futsalSerivce'
import { timeSlotServices } from "@/src/services/timeSlotService"
import { bookingServices } from "@/src/services/bookingService"



export default function BookingPage() {
  const params = useParams()
  const router = useRouter()
  const [futsal, setFutsal] = useState<IFutsal | null>(null)
  const [timeSlot, setTimeSlot] = useState<ITimeSlot | null>(null)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState("")
  const [formData, setFormData] = useState({
    customer_name: "",
    customer_phone: "",
    customer_email: "",
  })
  console.log("object")

  useEffect(() => {
    const token = localStorage.getItem("access_token")
    const userStr = localStorage.getItem("user")

    const loadData = async () => {
      try {
        console.log("jfiajfilasnflai")
        setLoading(true)
        const futsalId = String(params.futsalId)
        const slotId = params.slotId

        const [futsalData, slotsData] = await Promise.all([
          futsalServices.retrievefutsal(futsalId),
          timeSlotServices.retrieveTimeSlot(slotId),
        ])
        console.log(futsalData)
        console.log(slotsData)
        const selectedSlot = slotsData
        console.log("this is " ,selectedSlot)

        if (!selectedSlot) {
          setError("Time slot not found")
          return
        }

        if (selectedSlot.status === "booked") {
          setError("This time slot is no longer available")
          return
        }
        if (futsalData) {
          setFutsal(futsalData);
        } else {
          setFutsal(null); // Or undefined, depending on your state's allowed types
        }
        if (selectedSlot) {
          setTimeSlot(selectedSlot)
        } else {
          setTimeSlot(null); // Or undefined, depending on your state's allowed types
        }


        if (userStr) {
          const user = JSON.parse(userStr)
          setFormData({
            customer_name: `${user.first_name} ${user.last_name}`,
            customer_phone: "",
            customer_email: user.email,
          })
        }
      } catch (error) {
        setError("Failed to load booking details")
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [params, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSubmitting(true)

    try {
      await bookingServices.postBooking({
        futsal_id: params.futsalId,
        time_slot_id: params.slotId,
        customer_name: formData.customer_name,
        customer_phone: formData.customer_phone,
        customer_email: formData.customer_email,
      })
      setSuccess(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create booking")
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="flex min-h-[600px] items-center justify-center">
          <div className="text-center space-y-3">
            <Spinner className="mx-auto h-8 w-8" />
            <p className="text-muted-foreground">Loading booking details...</p>
          </div>
        </div>
      </div>
    )
  }

  if (success) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-16">
          <Card className="mx-auto max-w-md text-center">
            <CardHeader>
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <CheckCircle className="h-10 w-10 text-primary" />
              </div>
              <CardTitle className="text-2xl">Booking Submitted!</CardTitle>
              <CardDescription>Your booking request has been sent to the futsal owner for verification</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Alert>
                <AlertDescription>
                  You will receive a confirmation email once the owner approves your booking. You can check the status
                  in your bookings page.
                </AlertDescription>
              </Alert>
              <div className="flex flex-col gap-2">
                <Button onClick={() => router.push("/my-bookings")} className="w-full">
                  View My Bookings
                </Button>
                <Button onClick={() => router.push("/")} variant="outline" className="w-full">
                  Browse More Courts
                </Button>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <Button variant="ghost" onClick={() => router.back()} className="mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>

        <div className="mx-auto max-w-3xl">
          <h1 className="mb-6 text-3xl font-bold">Complete Your Booking</h1>

          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Booking Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {futsal && (
                  <>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Futsal Court</p>
                      <p className="text-lg font-semibold">{futsal.name}</p>
                    </div>

                    <div className="flex items-start gap-2 text-sm text-muted-foreground">
                      <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0" />
                      <div>
                        <p>{futsal.address}</p>
                        <p>{futsal.city}</p>
                      </div>
                    </div>
                  </>
                )}

                {timeSlot && (
                  <>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Day</p>
                        <p className="font-semibold">
                          {
                            ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][
                              timeSlot.day_of_week
                            ]
                          }
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Time</p>
                        <p className="font-semibold">
                          {timeSlot.start_time} - {timeSlot.end_time}
                        </p>
                      </div>
                    </div>
                  </>
                )}

                <div className="rounded-lg border bg-primary/5 p-4">
                  <p className="text-sm font-medium text-muted-foreground">Total Price</p>
                  <p className="text-2xl font-bold text-primary">${futsal?.pricePerHour}</p>
                  <p className="text-xs text-muted-foreground">For 1 hour</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Your Information</CardTitle>
                <CardDescription>Fill in your details to complete the booking</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  {error && (
                    <Alert variant="destructive">
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="customer_name">Full Name</Label>
                    <Input
                      id="customer_name"
                      value={formData.customer_name}
                      onChange={(e) => setFormData({ ...formData, customer_name: e.target.value })}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="customer_email">Email</Label>
                    <Input
                      id="customer_email"
                      type="email"
                      value={formData.customer_email}
                      onChange={(e) => setFormData({ ...formData, customer_email: e.target.value })}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="customer_phone">Phone Number</Label>
                    <Input
                      id="customer_phone"
                      type="tel"
                      placeholder="+1 (555) 000-0000"
                      value={formData.customer_phone}
                      onChange={(e) => setFormData({ ...formData, customer_phone: e.target.value })}
                      required
                    />
                  </div>

                  <Alert>
                    <AlertDescription className="text-sm">
                      Your booking will be sent to the futsal owner for verification. You'll receive a confirmation once
                      approved.
                    </AlertDescription>
                  </Alert>

                  <Button type="submit" className="w-full" size="lg" disabled={submitting}>
                    {submitting ? "Submitting..." : "Submit Booking Request"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
