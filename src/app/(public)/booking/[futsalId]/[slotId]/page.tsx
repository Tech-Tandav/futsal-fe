"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { redirect, useParams, useRouter, useSearchParams } from "next/navigation"
import { ArrowLeft, CheckCircle, Calendar, Clock, MapPin } from "lucide-react"
import { IFutsal } from "@/domain/interfaces/futsalInterface"
import { ITimeSlot } from "@/domain/interfaces/timeSlotInterface"
import { futsalService } from "@/domain/services/futsalService"
import { timeSlotService } from "@/domain/services/timeSlotService"
import { bookingService } from "@/domain/services/bookingService"
import { Spinner } from "@/components/ui/spinner"
import { Card,  CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"



export default function BookingPage() {
  const params = useParams()
  const router = useRouter()
  const searchParams = useSearchParams();
  const [futsal, setFutsal] = useState<IFutsal | null>(null)
  const [timeSlot, setTimeSlot] = useState<ITimeSlot | null>(null)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState("")
  const [formData, setFormData] = useState({
    customerName: "",
    customerPhone: "",
    customerEmail: "",
  })
  const [token, setToken] = useState< string|null>(null)

  const futsalId = String(params.futsalId)
  const slotId = String(params.slotId)
  
  
  const [responseId, setResponseId] = useState("")
  useEffect(() => {
    const token = localStorage.getItem("token")
    console.log(window.location.pathname)
    if (!token){
      const currentPath = window.location.pathname; 
      console.log(currentPath)
      router.push(`/register?redirect=booking/${futsalId}/${slotId}?data=${searchParams.get("date")}`);
    }
    setToken(token)
    const userStr = localStorage.getItem("user")
    const loadData = async () => {
      try {
        setLoading(true)
        

        const [futsalData, slotsData] = await Promise.all([
          futsalService.retrieveFutsal(futsalId),
          timeSlotService.retrieveTimeSlot(slotId),
        ])

        const selectedSlot = slotsData

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
            customerName: `${user.username}`,
            customerPhone: "",
            customerEmail: user.email,
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
      const response = await bookingService.createBooking({
        futsal_id: params.futsalId,
        time_slot: params.slotId,
        customer_name: formData.customerName,
        customer_phone: formData.customerPhone,
        customer_email: formData.customerEmail,
        date:searchParams.get("date")
      })
      setResponseId(response.id)
      setSuccess(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create booking")
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return (
      
        <div className="flex min-h-150 items-center justify-center">
          <div className="text-center space-y-3">
            <Spinner className="mx-auto h-8 w-8" />
            <p className="text-muted-foreground">Loading booking details...</p>
          </div>
        </div>
      
    )
  }

  if (success) {
    return (
      
        <>
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
                { token && (
                  <Button onClick={() => {
                    router.push("/my-bookings")
                  }
                }  
                className="w-full">
                  View My Bookings
                </Button>
                )}
                <Button onClick={() => router.back()} variant="outline" className="w-full">
                  Back
                </Button>
              </div>
            </CardContent>
          </Card>
        </>
    
    )
  }

  return (
    

      <>
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
                      <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
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
                              timeSlot.dayOfWeek
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
                          {timeSlot.startTime} - {timeSlot.endTime}
                        </p>
                      </div>
                    </div>
                  </>
                )}

                <div className="rounded-lg border bg-primary/5 p-4">
                  <p className="text-sm font-medium text-muted-foreground">Total Price</p>
                  <p className="text-2xl font-bold text-primary">Rs. {futsal?.pricePerHour}</p>
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
                      value={formData.customerName}
                      onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="customer_email">Email</Label>
                    <Input
                      id="customer_email"
                      type="email"
                      value={formData.customerEmail}
                      onChange={(e) => setFormData({ ...formData, customerEmail: e.target.value })}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="customer_phone">Phone Number</Label>
                    <Input
                      id="customer_phone"
                      type="tel"
                      placeholder="+1 (555) 000-0000"
                      value={formData.customerPhone}
                      onChange={(e) => setFormData({ ...formData, customerPhone: e.target.value })}
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
      </>
    
  )
}
