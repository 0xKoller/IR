import { DashboardLayout } from "@/components/dashboard-layout"
import { Skeleton } from "@/components/ui/skeleton"

export default function AccountLoading() {
  return (
    <DashboardLayout searchPlaceholder="Search account...">
      <div className="space-y-8">
        <div>
          <Skeleton className="h-12 w-64" />
          <Skeleton className="mt-2 h-6 w-96" />
        </div>

        <div className="w-full">
          <Skeleton className="h-12 w-full" />

          <div className="mt-6 space-y-6">
            {/* Profile Section Skeleton */}
            <div className="rounded-lg border-2 border-black p-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div className="flex items-center gap-6">
                  <Skeleton className="h-24 w-24 rounded-full" />
                  <div>
                    <Skeleton className="h-8 w-48" />
                    <Skeleton className="mt-2 h-5 w-64" />
                    <div className="mt-2 flex items-center gap-4">
                      <Skeleton className="h-4 w-40" />
                      <Skeleton className="h-4 w-32" />
                    </div>
                  </div>
                </div>
                <Skeleton className="mt-4 h-10 w-32 md:mt-0" />
              </div>
            </div>

            {/* Stats Grid Skeleton */}
            <div className="grid gap-6 md:grid-cols-3">
              {/* Account Level */}
              <div className="rounded-lg border-2 border-black p-6">
                <Skeleton className="h-6 w-32" />
                <Skeleton className="mt-1 h-4 w-48" />

                <div className="mt-4">
                  <Skeleton className="h-6 w-24" />
                </div>

                <div className="mt-4 space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-2 w-full" />
                  <Skeleton className="h-3 w-48" />
                </div>

                <Skeleton className="mt-4 h-10 w-full" />
              </div>

              {/* Total Savings */}
              <div className="rounded-lg border-2 border-black p-6">
                <Skeleton className="h-6 w-32" />
                <Skeleton className="mt-1 h-4 w-48" />

                <div className="mt-4">
                  <Skeleton className="h-8 w-32" />
                  <Skeleton className="mt-1 h-3 w-24" />
                </div>

                <div className="mt-4 space-y-2">
                  <div className="flex justify-between">
                    <Skeleton className="h-4 w-16" />
                    <Skeleton className="h-4 w-16" />
                  </div>
                  <div className="flex justify-between">
                    <Skeleton className="h-4 w-16" />
                    <Skeleton className="h-4 w-16" />
                  </div>
                </div>
              </div>

              {/* Account Activity */}
              <div className="rounded-lg border-2 border-black p-6">
                <Skeleton className="h-6 w-32" />
                <Skeleton className="mt-1 h-4 w-48" />

                <div className="mt-4 space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex items-center gap-3">
                      <Skeleton className="h-8 w-8 rounded-full" />
                      <div>
                        <Skeleton className="h-4 w-32" />
                        <Skeleton className="mt-1 h-3 w-16" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
