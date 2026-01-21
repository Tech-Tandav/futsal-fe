"use client"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { ITimeSlot } from "@/domain/interfaces/timeSlotInterface"


interface TimeSlotGridProps {
  timeSlots: ITimeSlot[]
  onSlotClick: (slot: ITimeSlot, date:string) => void
  selectedSlotId?: number
  isStaff: boolean
}


const DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

const TIME_SLOTS = [
  "06:00:00",
  "07:00:00",
  "08:00:00",
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

export function TimeSlotGrid({ timeSlots, onSlotClick, selectedSlotId, isStaff }: TimeSlotGridProps) {
  const today = new Date()
  console.log("today date",today)
  const todayIndex = today.getDay()
  const currentHour = today.getHours()
  const orderedDays = Array.from({ length: 7 }, (_, i) => {
    const date = new Date()
    date.setDate(today.getDate() + i)
    return {
      index: date.getDay(),
      label: DAYS[date.getDay()],
      dateStr: date.toLocaleDateString("en-CA", { month: "short", day: "numeric"}),
      currentDate: date.toLocaleDateString("en-CA")
    }
  })

  const getSlotByDayAndTime = (day: number, time: string) => {
    return timeSlots.find((slot) => slot.dayOfWeek === day && slot.startTime === time)
  }

  const getSlotStatus = (slot?: ITimeSlot, isPast?: boolean) => {
    if (!slot) return "unavailable"
    if (isPast) return "past"
    return slot.status
  }

  const getSlotVariant = (slot?: ITimeSlot, isSelected?: boolean, isPast?: boolean) => {
    if (isSelected) return "default"
    if (!slot || isPast) return "ghost"

    switch (slot.status) {
      case "available":
        return "outline"
      case "booked":
        return "secondary"
      case "in_queue":
        return "outline"
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
          <div className="h-4 w-4 rounded border-2 border-primary/50 bg-primary/10" />
          <span className="text-sm text-muted-foreground">In Queue (Can Book)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-4 w-4 rounded bg-muted" />
          <span className="text-sm text-muted-foreground">Unavailable/Past</span>
        </div>
      </div>

      <div className="overflow-x-auto rounded-lg border ">
        <table className="w-full">
          <thead>
            <tr className="border-b bg-muted/50">
              <th className="sticky left-0 z-10 bg-muted/50 px-4 py-3 text-left text-sm font-semibold">Time</th>
              {orderedDays.map((day, i) => (
                <th
                  key={day.index + i}
                  className={cn(
                    " min-w-30 px-2 py-3 text-center text-sm font-semibold z-50",
                    i === 0 && "bg-primary/10 text-primary",
                  )}
                >
                  <div className="flex flex-col items-center">
                    {i === 0 && <span className="text-[10px] font-bold uppercase tracking-wider">Today</span>}
                    <span>{day.label}</span>
                    <span className="text-[10px] opacity-70">{day.dateStr}</span>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {TIME_SLOTS.map((time, timeIndex) => (
              <tr key={time} className={cn("border-b", timeIndex % 2 === 0 && "bg-muted/20")}>
                <td className="sticky left-0 z-10 bg-background px-4 py-2 text-sm font-medium">{time}</td>
                {orderedDays.map((day, colIndex) => {
                  const slot = getSlotByDayAndTime(day.index, time)
                  const slotHour = Number.parseInt(time.split(":")[0])
                  const isPast = colIndex === 0 && slotHour < currentHour
                  const isSelected = slot?.id === selectedSlotId
                  const status = getSlotStatus(slot, isPast)
                  
                  return (
                    <td key={day.index} className={cn("px-2 py-2", colIndex === 0 && "bg-primary/5")}>
                      <Button
                        variant={getSlotVariant(slot, isSelected, isPast)}
                        size="sm"
                        className={cn(
                          "h-10 w-full text-xs",
                          status === "past" && "cursor-not-allowed opacity-60",
                          status === "booked" && !isStaff &&  "cursor-not-allowed opacity-60", 
                          status === "unavailable" && "cursor-not-allowed opacity-40",
                          isSelected && "ring-2 ring-ring",
                          status === "in_queue" && "bg-primary/5 border-primary/30",
                        )}
                        onClick={() => {
                          if (isStaff && slot && status !== "unavailable") 
                            return onSlotClick(slot, day.currentDate)
                          else if (slot && (status === "available" || status === "in_queue"))
                            return onSlotClick(slot, day.currentDate)
                        }}
                        
                      >
                        {slot ? (
                          <>
                            {status === "available" && "Book"}
                            {status === "booked" && "Booked"}
                            {status === "in_queue" && "Join Queue"}
                            {status === "past" && "Past"}
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