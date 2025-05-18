import { DashboardLayout } from "@/components/dashboard-layout"
import { Skeleton } from "@/components/ui/skeleton"

export default function SettingsLoading() {
  return (
    <DashboardLayout searchPlaceholder="Search settings...">
      <div className="space-y-8">
        <div>
          <Skeleton className="h-12 w-48" />
          <Skeleton className="mt-2 h-6 w-96" />
        </div>

        <div className="space-y-6">
          {/* Appearance Settings Skeleton */}
          <div className="rounded-lg border-2 border-black p-6">
            <Skeleton className="h-8 w-40" />
            <Skeleton className="mt-1 h-5 w-64" />

            <div className="mt-6 space-y-6">
              <div className="space-y-3">
                <Skeleton className="h-5 w-16" />
                <div className="flex gap-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex items-center space-x-2">
                      <Skeleton className="h-4 w-4 rounded-full" />
                      <Skeleton className="h-4 w-16" />
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <Skeleton className="h-5 w-24" />
                <Skeleton className="h-10 w-[240px]" />
              </div>

              <div className="space-y-3">
                <Skeleton className="h-5 w-24" />
                <Skeleton className="h-10 w-[240px]" />
              </div>
            </div>
          </div>

          {/* Notification Settings Skeleton */}
          <div className="rounded-lg border-2 border-black p-6">
            <Skeleton className="h-8 w-40" />
            <Skeleton className="mt-1 h-5 w-64" />

            <div className="mt-6 space-y-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex items-center justify-between">
                  <div>
                    <Skeleton className="h-5 w-40" />
                    <Skeleton className="mt-1 h-4 w-56" />
                  </div>
                  <Skeleton className="h-6 w-12 rounded-full" />
                </div>
              ))}
            </div>
          </div>

          {/* Privacy Settings Skeleton */}
          <div className="rounded-lg border-2 border-black p-6">
            <Skeleton className="h-8 w-24" />
            <Skeleton className="mt-1 h-5 w-64" />

            <div className="mt-6 space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center justify-between">
                  <div>
                    <Skeleton className="h-5 w-40" />
                    <Skeleton className="mt-1 h-4 w-56" />
                  </div>
                  <Skeleton className="h-6 w-12 rounded-full" />
                </div>
              ))}
            </div>

            <div className="mt-6">
              <Skeleton className="h-10 w-40" />
            </div>
          </div>

          {/* Save Button Skeleton */}
          <div className="flex justify-end">
            <Skeleton className="h-10 w-32" />
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
