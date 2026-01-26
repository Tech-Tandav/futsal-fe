"use client"

import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MapPin, Star } from "lucide-react"
import { useRouter } from "next/navigation"
import { IFutsal } from "@/domain/interfaces/futsalInterface"

interface FutsalCardProps {
  futsal: IFutsal
}

export function FutsalCard({ futsal }: FutsalCardProps) {
  const router = useRouter()
  return (
    <Card className="group overflow-hidden transition-all duration-300 hover:shadow-xl hover:border-primary/50 ">
      <div className="relative h-56 w-full overflow-hidden bg-linear-to-br from-primary/10 to-accent/10">
        {futsal.imageUrl ? (
          <img
            src={futsal.imageUrl || "/placeholder.svg"}
            alt={futsal.name}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-linear-to-br from-primary/20 to-accent/20">
            <span className="text-8xl">⚽</span>
          </div>
        )}
        {futsal.distance !== undefined && (
          <Badge className="absolute right-3 top-3 bg-background/95 text-foreground font-semibold shadow-lg">
            {futsal.distance.toFixed(1)} km away
          </Badge>
        )}
      </div>

      <CardHeader className="pb-3 ">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1">
            <h3 className="text-lg font-bold text-foreground line-clamp-1">{futsal.name}</h3>
            <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
              <MapPin className="h-3.5 w-3.5 shrink-0" />
              <span className="line-clamp-1">
                {futsal.address}, {futsal.city}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-1 rounded-lg bg-secondary px-2 py-1">
            <Star className="h-4 w-4 fill-primary text-primary" />
            <span className="text-sm font-semibold"></span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4 pb-4 ">
        <div className="flex items-center gap-2 text-xl font-bold text-primary">
          {/* <DollarSign className="h-5 w-5" /> */}
          <span>Rs. {futsal.pricePerHour}</span>
          <span className="text-sm font-normal text-muted-foreground">/hour</span>
        </div>

        {futsal.amenities && futsal.amenities.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {futsal.amenities.slice(0, 3).map((amenity, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {amenity}
              </Badge>
            ))}
            {futsal.amenities.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{futsal.amenities.length - 3}
              </Badge>
            )}
          </div>
        )}
      </CardContent>

      <CardFooter className="mt-auto">
        <Button
          onClick={() => router.push(`/futsal/${futsal.id}`)}
          className="w-full bg-primary hover:bg-primary/70 font-semibold"
        >
          View & Book
        </Button>
      </CardFooter>
    </Card>
  )
}
