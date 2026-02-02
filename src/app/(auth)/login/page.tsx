import Login from "@/components/global/Login";
import { Suspense } from "react";

export default function page() {
  return (
    <Suspense fallback={<p>Loading....</p>}>
      <Login/>
    </Suspense>
  )
}
