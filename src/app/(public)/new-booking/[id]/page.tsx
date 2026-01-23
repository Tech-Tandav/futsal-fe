"use client"
import { Header } from '@/components/custom/Header'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Spinner } from '@/components/ui/spinner'
import { IBooking } from '@/domain/interfaces/bookingInterface'
import { bookingService } from '@/domain/services/bookingService'
import {  Calendar, Clock, User } from 'lucide-react'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const page = () => {
    const params = useParams()
    const bookingId = String(params.id)
    const [booking, setBooking] = useState<IBooking | null>(null)
    const [loading, setLoading] = useState(true)
    useEffect(()=>{
      try {
        setLoading(true)
        const booking = async()=>{
          const book = await bookingService.retrieveBooking(bookingId)
          setBooking(book)
        }
        booking()
      } catch (error) {
        console.log("Failed to load booking details")
      } finally {
        setLoading(false)
      }
    }, [])
    
  return (
    

      <>
        <h1 className="mb-6 text-3xl font-bold">My Booking</h1>

          {booking === null ? (
          <Card>
            <CardContent className="flex min-h-43 items-center justify-center">
              
              <div className="text-center space-y-3">
                <Spinner className="mx-auto h-8 w-8" />
                <p className="text-muted-foreground">Loading booking details...</p>
              </div>
              
            </CardContent>
          </Card>
        ) : (
          
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

              {booking.startTime && (
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span>{booking.startTime}</span>
                </div>
              )}

              <div className="text-xs text-muted-foreground">
                Booked on {new Date(booking.createdAt).toLocaleDateString()}
              </div>
            </CardContent>
          </Card>
          )}
          
        
      </>
    
  )
}

export default page



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