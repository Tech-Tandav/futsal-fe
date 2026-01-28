import Register from "@/components/project/Register";
import { Suspense } from "react";

export default function page() {
  return (
    <Suspense fallback={null}>
      <Register/>
    </Suspense>
  )
}
