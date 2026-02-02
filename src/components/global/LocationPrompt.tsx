"use client"

import { useState } from "react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { MapPin, X } from "lucide-react"

interface LocationPromptProps {
  onLocationGranted: (lat: number, lng: number) => void
  onDismiss: () => void
}

export function LocationPrompt({ onLocationGranted, onDismiss }: LocationPromptProps) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const requestLocation = () => {
    setLoading(true)
    setError("")

    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser")
      setLoading(false)
      return
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        onLocationGranted(position.coords.latitude, position.coords.longitude)
        setLoading(false)
      },
      (error) => {
        setError("Unable to retrieve your location. Check permissions.")
        setLoading(false)
      },
    )
  }

  return (
    <Alert className="relative border-primary/50 bg-primary/5">
      <Button variant="ghost" size="icon" className="absolute right-2 top-2 h-6 w-6" onClick={onDismiss}>
        <X className="h-4 w-4" />
      </Button>
      <MapPin className="h-4 w-4 text-primary" />
      <AlertTitle className="text-foreground font-semibold">Find Courts Near You</AlertTitle>
      <AlertDescription className="mt-2 space-y-3">
        <p className="text-sm">Enable location to see futsal courts sorted by distance from you</p>
        {error && <p className="text-destructive text-sm font-medium">{error}</p>}
        <Button onClick={requestLocation} disabled={loading} size="sm" className="bg-primary hover:bg-primary/90">
          {loading ? "Getting location..." : "Enable Location"}
        </Button>
      </AlertDescription>
    </Alert>
  )
}
