"use client"

import { FutsalCard } from '@/src/components/features/futsal/futsalcard'
import Header from '@/src/components/common/header/header'
import { LocationPrompt } from '@/src/components/common/locationn/location-prompt'
import { Spinner } from '@/src/components/ui/spinner'
import { IFutsal } from '@/src/interface/futsalInterface'
import { futsalServices } from '@/src/services/futsalSerivce'
import { useEffect, useState } from 'react'
import { Input } from "@/src/components/ui/input"
import { Button } from "@/src/components/ui/button"
import { Search, MapPin } from "lucide-react"


const HomePage = () => {

  const [loading, setLoading] = useState(true)
  const [futsals, setFutsals] = useState<IFutsal[]>([]) 
  const [userLocation, setUserLocation] = useState<{lat:number; lng:number} | null>(null)
  const [showLocationPrompt, setShowLocationPrompt] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")

  const fetchFutsals = async(lat?:number, lng?:number)=>{
      try{
        setLoading(true)
        const response = await futsalServices.getfutsal(lat, lng)
        setFutsals(response)
      }catch(error){
        console.log("Failed to load futsals: ",error)
        // toast.warning(`Failed to load futsals: ${error}`)
      }finally {
        setLoading(false)
      }
    }

  useEffect(()=>{
      fetchFutsals()
  },[])

  const handleLocationGranted = (lat: number, lng: number) => {
    setUserLocation({ lat, lng })
    setShowLocationPrompt(false)
    fetchFutsals(lat, lng)
  }

  const filteredFutsals = futsals.filter(
    (futsal) =>
      futsal.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      futsal.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      futsal.address.toLowerCase().includes(searchQuery.toLowerCase()),
  )


  return (
    <div className="min-h-screen bg-background">
      <Header/>
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8 space-y-4">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold text-balance">Find Your Perfect Futsal Court</h1>
            <p className="text-lg text-muted-foreground text-pretty">Browse and book futsal courts in your city</p>
          </div>

          {showLocationPrompt && !userLocation &&
            <LocationPrompt onLocationGranted={handleLocationGranted} onDismiss={() => setShowLocationPrompt(false)}/>
          }

          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search by name, city, or address..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            {!userLocation && (
              <Button variant="outline" onClick={() => setShowLocationPrompt(true)}>
                <MapPin className="mr-2 h-4 w-4" />
                Near Me
              </Button>
            )}
          </div>
          
        </div>
        {loading ? (
          <div className="flex min-h-100 items-center justify-center">
            <div className="text-center space-y-3">
              <Spinner className="mx-auto h-8 w-8" />
              <p className="text-muted-foreground">Loading futsal courts...</p>
            </div>
          </div>
        ) : futsals.length === 0 ? (
          <div className="flex min-h-100 items-center justify-center">
            <div className="text-center space-y-2">
              <p className="text-lg font-medium">No futsal courts found</p>
              <p className="text-muted-foreground">
                {searchQuery ? "Try adjusting your search" : "Check back later for available courts"}
              </p>
            </div>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredFutsals.map((futsal) => (
              <FutsalCard key={futsal.id} futsal={futsal} />
            ))}
          </div>
        )}
      </main>
      
    </div>
  )
}

export default HomePage