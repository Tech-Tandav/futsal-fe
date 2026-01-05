"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/src/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../ui/dialog"
import { Input } from "@/src/components/ui/input"
import { Label } from "@/src/components/ui/label"
// import { Textarea } from "@/src/components/ui/textarea"
import { Plus } from "lucide-react"
// import { djangoAPI } from "@/src/lib/django-api"
import { toast } from "sonner"
import { futsalServices } from '@/src/services/futsalSerivce'
import { IFutsal} from "@/src/interface/futsalInterface"; 
// import { Dialog } from "@radix-ui/react-dialog"
import { Textarea } from "../../ui/textarea"


interface AddFutsalDialogProps {
  onSuccess: () => void
}

export function AddFutsalDialog({ onSuccess }: AddFutsalDialogProps) {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    city: "",
    latitude: "",
    longitude: "",
    price_per_hour: "",
    image_url: "",
    amenities: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const amenitiesArray = formData.amenities
        .split(",")
        .map((a) => a.trim())
        .filter(Boolean)

      await futsalServices.postFutsal({
        name: formData.name,
        address: formData.address,
        city: formData.city,
        latitude: Number.parseFloat(formData.latitude),
        longitude: Number.parseFloat(formData.longitude),
        price_per_hour: Number.parseFloat(formData.price_per_hour),
        image_url: formData.image_url || undefined,
        amenities: amenitiesArray,
      })

      setOpen(false)
      setFormData({
        name: "",
        address: "",
        city: "",
        latitude: "",
        longitude: "",
        price_per_hour: "",
        image_url: "",
        amenities: "",
      })
      toast.success("Futsal court added successfully!")
      onSuccess()
    } catch (error) {
      console.error("Failed to create futsal:", error)
      toast.error("Failed to create futsal court. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add New Court
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Add New Futsal Court</DialogTitle>
          <DialogDescription>Enter the details of your futsal court to add it to the system.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Court Name *</Label>
            <Input
              id="name"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g., Green Field Futsal"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="city">City *</Label>
              <Input
                id="city"
                required
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                placeholder="e.g., San Francisco"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="price">Price per Hour ($) *</Label>
              <Input
                id="price"
                type="number"
                step="0.01"
                required
                value={formData.price_per_hour}
                onChange={(e) => setFormData({ ...formData, price_per_hour: e.target.value })}
                placeholder="e.g., 50"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="address">Address *</Label>
            <Textarea
              id="address"
              required
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              placeholder="e.g., 123 Sports Ave"
              rows={2}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="latitude">Latitude *</Label>
              <Input
                id="latitude"
                type="number"
                step="any"
                required
                value={formData.latitude}
                onChange={(e) => setFormData({ ...formData, latitude: e.target.value })}
                placeholder="e.g., 37.7749"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="longitude">Longitude *</Label>
              <Input
                id="longitude"
                type="number"
                step="any"
                required
                value={formData.longitude}
                onChange={(e) => setFormData({ ...formData, longitude: e.target.value })}
                placeholder="e.g., -122.4194"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="image">Image URL</Label>
            <Input
              id="image"
              type="url"
              value={formData.image_url}
              onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
              placeholder="https://example.com/image.jpg"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="amenities">Amenities (comma-separated)</Label>
            <Textarea
              id="amenities"
              value={formData.amenities}
              onChange={(e) => setFormData({ ...formData, amenities: e.target.value })}
              placeholder="e.g., Parking, Showers, Changing Rooms, Refreshments"
              rows={2}
            />
            <p className="text-xs text-muted-foreground">Separate each amenity with a comma</p>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setOpen(false)} disabled={loading}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Adding..." : "Add Court"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
