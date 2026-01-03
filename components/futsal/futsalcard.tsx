"use client"

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MapPin, DollarSign, Navigation } from "lucide-react"
// import type { Futsal } from "@/lib/django-api"
import { useRouter } from "next/navigation"

// interface FutsalCardProps {
//   futsal: Futsal
// }

export function FutsalCard({ futsal }: any) {
  const router = useRouter()

  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg">
      <div className="relative h-48 w-full overflow-hidden bg-muted">
        {futsal.image_url ? (
          <img src={futsal.image_url || "/placeholder.svg"} alt={futsal.name} className="h-full w-full object-cover" />
        ) : (
          <div className="flex h-full items-center justify-center bg-gradient-to-br from-primary/20 to-accent/20">
            <span className="text-6xl font-bold text-primary/30">F</span>
          </div>
        )}
        {futsal.distance !== undefined && (
          <Badge className="absolute right-2 top-2 bg-background/90 text-foreground">
            <Navigation className="mr-1 h-3 w-3" />
            {futsal.distance.toFixed(1)} km
          </Badge>
        )}
      </div>

      <CardHeader>
        <CardTitle className="text-xl">{futsal.name}</CardTitle>
        <div className="flex items-center gap-1 text-sm text-muted-foreground">
          <MapPin className="h-4 w-4" />
          <span>
            {futsal.address}, {futsal.city}
          </span>
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        <div className="flex items-center gap-2 text-lg font-semibold text-primary">
          <DollarSign className="h-5 w-5" />
          <span>${futsal.price_per_hour}/hour</span>
        </div>

        {/* {futsal.amenities && futsal.amenities.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {futsal.amenities.slice(0, 3).map((amenity, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {amenity}
              </Badge>
            ))}
            {futsal.amenities.length > 3 && (
              <Badge variant="secondary" className="text-xs">
                +{futsal.amenities.length - 3} more
              </Badge>
            )}
          </div>
        )} */}
      </CardContent>

      <CardFooter>
        <Button onClick={() => router.push(`/futsal/${futsal.id}`)} className="w-full">
          View Time Slots
        </Button>
      </CardFooter>
    </Card>
  )
}
