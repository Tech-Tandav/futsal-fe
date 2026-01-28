import Login from "@/components/project/Login";
import { Suspense } from "react";

export default function page() {
  return (
    <Suspense fallback={null}>
      <Login/>
    </Suspense>
    
  )
}
