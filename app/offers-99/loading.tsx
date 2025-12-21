import { Skeleton } from "@/components/ui/skeleton"

export default function Offers99Loading() {
  return (
    <div className="min-h-screen bg-background">
      <div className="pt-28 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-2">
            <Skeleton className="h-12 w-16 rounded-xl" />
            <Skeleton className="h-10 w-48" />
          </div>
          <Skeleton className="h-5 w-96 mb-8" />
          <Skeleton className="h-32 w-full rounded-2xl mb-8" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="bg-card rounded-2xl overflow-hidden border border-border">
                <Skeleton className="aspect-square" />
                <div className="p-4 space-y-3">
                  <Skeleton className="h-5 w-32" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
