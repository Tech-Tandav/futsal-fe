import Register from "@/components/global/Register";
import { Suspense } from "react";

export default function page() {
  return (
    <Suspense fallback={null}>
      <Register/>
    </Suspense>
  )
}
