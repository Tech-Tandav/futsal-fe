"use client"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import type { TimeSlot } from "@/lib/django-api"

interface TimeSlotGridProps {
  timeSlots: TimeSlot[]
  onSlotClick: (slot: TimeSlot) => void
  selectedSlotId?: number
}

const DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

const TIME_SLOTS = [
  "06:00:00",
  "08:00:00",
  "07:00:00",
  "09:00:00",
  "10:00:00",
  "11:00:00",
  "12:00:00",
  "13:00:00",
  "14:00:00",
  "15:00:00",
  "16:00:00",
  "17:00:00",
  "18:00:00",
  "19:00:00",
  "20:00:00",
  "21:00:00",
  "22:00:00",
  "23:00:00",
]

export function TimeSlotGrid({ timeSlots, onSlotClick, selectedSlotId }: TimeSlotGridProps) {
  const getSlotByDayAndTime = (day: number, time: string) => {
    console.log(timeSlots)
    console.log(day)
    console.log(time)
    return timeSlots.find((slot) => slot.day_of_week === day && slot.start_time === time)
  }

  const getSlotStatus = (slot?: TimeSlot) => {
    if (!slot) return "unavailable"
    return slot.status
  }

  const getSlotVariant = (slot?: TimeSlot, isSelected?: boolean) => {
    if (isSelected) return "default"
    if (!slot) return "ghost"

    switch (slot.status) {
      case "available":
        return "outline"
      case "booked":
        return "secondary"
      case "in_queue":
        return "secondary"
      default:
        return "ghost"
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4 flex-wrap">
        <div className="flex items-center gap-2">
          <div className="h-4 w-4 rounded border-2 border-primary bg-primary" />
          <span className="text-sm text-muted-foreground">Selected</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-4 w-4 rounded border-2 border-input" />
          <span className="text-sm text-muted-foreground">Available</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-4 w-4 rounded bg-secondary" />
          <span className="text-sm text-muted-foreground">Booked</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-4 w-4 rounded bg-muted" />
          <span className="text-sm text-muted-foreground">Unavailable</span>
        </div>
      </div>

      <div className="overflow-x-auto rounded-lg border">
        <table className="w-full">
          <thead>
            <tr className="border-b bg-muted/50">
              <th className="sticky left-0 z-10 bg-muted/50 px-4 py-3 text-left text-sm font-semibold">Time</th>
              {DAYS.map((day) => (
                <th key={day} className="min-w-[100px] px-2 py-3 text-center text-sm font-semibold">
                  {day}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {TIME_SLOTS.map((time, timeIndex) => (
              <tr key={time} className={cn("border-b", timeIndex % 2 === 0 && "bg-muted/20")}>
                <td className="sticky left-0 z-10 bg-background px-4 py-2 text-sm font-medium">{time}</td>
                {DAYS.map((_, dayIndex) => {
                  const slot = getSlotByDayAndTime(dayIndex, time)
                  const isSelected = slot?.id === selectedSlotId
                  const status = getSlotStatus(slot)

                  return (
                    <td key={dayIndex} className="px-2 py-2">
                      <Button
                        variant={getSlotVariant(slot, isSelected)}
                        size="sm"
                        className={cn(
                          "h-10 w-full text-xs",
                          status === "booked" && "cursor-not-allowed opacity-60",
                          status === "unavailable" && "cursor-not-allowed opacity-40",
                          isSelected && "ring-2 ring-ring",
                        )}
                        onClick={() => slot && status === "available" && onSlotClick(slot)}
                        disabled={!slot || status !== "available"}
                      >
                        {slot ? (
                          <>
                            {status === "available" && "Book"}
                            {status === "booked" && "Booked"}
                            {status === "in_queue" && "Queue"}
                          </>
                        ) : (
                          "-"
                        )}
                      </Button>
                    </td>
                  )
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
