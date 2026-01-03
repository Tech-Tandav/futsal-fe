"use client"

import { FutsalCard } from '@/components/futsal/futsalcard'
import Header from '@/components/futsal/header'
import { LocationPrompt } from '@/components/futsal/location-prompt'
import { Spinner } from '@/components/ui/spinner'
import { IFutsal } from '@/interface/futsalInterface'
import { futsalServices } from '@/services/futsalSerivce'
import React, { useEffect, useState } from 'react'

const HomePage = () => {

  const [futsals, setFutsals] = useState<IFutsal[]>([]) 
  const [loading, setLoading] = useState(true)
  const [userLocation, setUserLocation] = useState<{lat:number; lng:number} | null>(null)
  const [showLocationPrompt, setShowLocationPrompt] = useState(true)

  const fetchFutsals = async(lat?:number, lng?:number)=>{
      try{
        setLoading(true)
        const response = await futsalServices.getfutsal()
        setFutsals(response)
      }catch(e:any){
        console.log(e)
        alert(e.code)
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
              {/* <p className="text-muted-foreground">
                {searchQuery ? "Try adjusting your search" : "Check back later for available courts"}
              </p> */}
            </div>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {futsals.map((futsal) => (
              <FutsalCard key={futsal.id} futsal={futsal} />
            ))}
          </div>
        )}
      </main>
    </div>
  )
}

export default HomePage
 