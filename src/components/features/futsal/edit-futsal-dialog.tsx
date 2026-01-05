"use client"

import type React from "react"

import { useState, useEffect } from "react"
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
import { Textarea } from "../../ui/textarea"
import { Pencil } from "lucide-react"
// import { djangoAPI, type Futsal } from "@/src/lib/django-api"
import { toast } from "sonner"
import { futsalServices } from '@/src/services/futsalSerivce'
import { IFutsal} from "@/src/interface/futsalInterface"; 


interface EditFutsalDialogProps {
  futsal: IFutsal
  onSuccess: () => void
}

export function EditFutsalDialog({ futsal, onSuccess }: EditFutsalDialogProps) {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: futsal.name,
    address: futsal.address,
    city: futsal.city,
    latitude: futsal.latitude,
    longitude: futsal.longitude,
    price_per_hour: futsal.pricePerHour,
    image_url: futsal.image || "",
    amenities: futsal.amenities.join(", "),
  })

  useEffect(() => {
    setFormData({
      name: futsal.name,
      address: futsal.address,
      city: futsal.city,
      latitude: futsal.latitude,
      longitude: futsal.longitude,
      price_per_hour: futsal.pricePerHour,
      image_url: futsal.image || "",
      amenities: futsal.amenities.join(", "),
    })
  }, [futsal])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const amenitiesArray = formData.amenities
        .split(",")
        .map((a) => a.trim())
        .filter(Boolean)

      await futsalServices.editFutsal(futsal.id, {
        name: formData.name,
        address: formData.address,
        city: formData.city,
        latitude: formData.latitude,
        longitude: formData.longitude,
        price_per_hour: formData.price_per_hour,
        image_url: formData.image_url || undefined,
        amenities: amenitiesArray,
      })

      setOpen(false)
      toast.success("Futsal court updated successfully!")
      onSuccess()
    } catch (error) {
      console.error("Failed to update futsal:", error)
      toast.error("Failed to update futsal court. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Pencil className="mr-2 h-4 w-4" />
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Edit Futsal Court</DialogTitle>
          <DialogDescription>Update the details of your futsal court.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="edit-name">Court Name *</Label>
            <Input
              id="edit-name"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>

          {/* <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="edit-city">City *</Label>
              <Input
                id="edit-city"
                required
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
              />
            </div> */}
            {/* <div className="space-y-2">
              <Label htmlFor="edit-price">Price per Hour ($) *</Label>
              <Input
                id="edit-price"
                type="number"
                step="0.01"
                required
                value={formData.price_per_hour}
                onChange={(e) => setFormData({ ...formData, price_per_hour: e.target.value })}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit-address">Address *</Label>
            <Textarea
              id="edit-address"
              required
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              rows={2}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="edit-latitude">Latitude *</Label>
              <Input
                id="edit-latitude"
                type="number"
                step="any"
                required
                value={formData.latitude}
                onChange={(e) => setFormData({ ...formData, latitude: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-longitude">Longitude *</Label>
              <Input
                id="edit-longitude"
                type="number"
                step="any"
                required
                value={formData.longitude}
                onChange={(e) => setFormData({ ...formData, longitude: e.target.value })} */}
              {/* />
            </div>
          </div> */}

          <div className="space-y-2">
            <Label htmlFor="edit-image">Image URL</Label>
            <Input
              id="edit-image"
              type="url"
              value={formData.image_url}
              onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit-amenities">Amenities (comma-separated)</Label>
            <Textarea
              id="edit-amenities"
              value={formData.amenities}
              onChange={(e) => setFormData({ ...formData, amenities: e.target.value })}
              rows={2}
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setOpen(false)} disabled={loading}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Saving..." : "Save Changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
