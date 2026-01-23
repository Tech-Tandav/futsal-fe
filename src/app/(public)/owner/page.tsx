import { Suspense } from "react"
import OwnerDashboardClient from "./OwnerDashboardClient"
// import OwnerDashboardClient from "./OwnerDashboardClient"

export default function OwnerPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-150 items-center justify-center">
          <div className="text-center space-y-3">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-muted-foreground border-t-transparent mx-auto" />
            <p className="text-muted-foreground">Loading dashboard...</p>
          </div>
        </div>
      }
    >
      <OwnerDashboardClient />
    </Suspense>
  )
}
