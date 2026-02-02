import Booking from "@/components/project/booking/Booking";
import { Suspense } from "react";

export default function page() {
  return (
    <Suspense fallback={null}>
      <Booking/>
    </Suspense>
    
  )
}
