"use client"

import { useEffect, useState } from "react"
import { Header } from "@/components/global/Header"
import { FutsalCard } from "@/components/project/futsal/FutsalCard"
import { LocationPrompt } from "@/components/global/LocationPrompt"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, MapPin, Zap } from "lucide-react"
import { Spinner } from "@/components/ui/spinner"
import { IFutsal } from "@/domain/interfaces/futsalInterface"
import { futsalService } from "@/domain/services/futsalService"
import { ILocation } from "@/domain/interfaces/location"
import MyPagination from "../global/MyPagination"




export default function Home() {
  const [futsals, setFutsals] = useState<IFutsal[]>([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState<number>(1)
  const [totalPages, settotalPages] = useState<number>(1)
  const [searchQuery, setSearchQuery] = useState("")
  const [userLocation, setUserLocation] = useState<ILocation | null>(null)
  const [showLocationPrompt, setShowLocationPrompt] = useState(true)

  const loadFutsals = async (page:number,search?:string, userLocation?:ILocation,) => {
    try {
      setLoading(true)
      const data = await futsalService.getFutsals(page,search,userLocation)
      setFutsals(data.results)
      setPage(data.current_page)
      settotalPages(data.total_pages)

    } catch (error) {
      console.error("Failed to load futsals:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const timeout = setTimeout(() => {
      loadFutsals(page, searchQuery, userLocation || undefined)
    }, 500)

    return () => clearTimeout(timeout)
  }, [page, searchQuery])



  // const handleLocationGranted = (lat: number, lng: number) => {
  //   setUserLocation({ lat, lng })
  //   setShowLocationPrompt(false)
  //   loadFutsals({lat, lng})
  // }



  return (
    <div className="min-h-screen bg-background">
      <Header />
     

      <main className="container mx-auto px-4 py-12">
        <div className="mb-12 space-y-6">
          <h1 className="text-4xl font-bold text-foreground">Find & Book Futsal Courts</h1>
          <p className="text-lg text-foreground/70 max-w-2xl">
            Discover futsal venues near you and book your slot instantly.
          </p>

          {/* {showLocationPrompt && !userLocation && (
            <LocationPrompt onLocationGranted={handleLocationGranted} onDismiss={() => setShowLocationPrompt(false)} />
          )} */}

          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search courts, cities..."
                value={searchQuery}
                onChange={(e) => {
                  setPage(1)
                  setSearchQuery(e.target.value)
                }}
                className="pl-10"
              />
            </div>
            {/* {!userLocation && (
              <Button variant="outline" onClick={() => setShowLocationPrompt(true)}>
                <MapPin className="mr-2 h-4 w-4" />
                Location
              </Button>
            )} */}
          </div>
        </div>

        {loading ? (
          <div className="flex min-h-100 items-center justify-center">
            <Spinner className="h-8 w-8" />
          </div>
        ) : futsals.length === 0 ? (
          <div className="text-center py-16">
            <h2 className="text-2xl font-bold text-foreground">No courts found</h2>
            <p className="text-foreground/60 mt-2">Try adjusting your search</p>
          </div>
        ) : (
          <>
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-foreground">{futsals.length} Venues Available</h2>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {futsals.map((futsal) => (
                  <FutsalCard key={futsal.id} futsal={futsal} />
                ))}
              </div>
            </div>
            <div className="mt-4">
                <MyPagination
                  currentPage={page}
                  totalPages={totalPages}
                  onPageChange={setPage}
                />
            </div>
            
          </>
        )}
        
      </main>
    </div>
  )
}
