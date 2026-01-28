import Booking from "@/components/project/Booking";
import { Suspense } from "react";

export default function page() {
  return (
    <Suspense fallback={null}>
      <Booking/>
    </Suspense>
    
  )
}
