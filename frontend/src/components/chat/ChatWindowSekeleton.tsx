import { Skeleton } from "@/components/ui/skeleton"

const ChatWindowSkeleton = () => {
  return (
    <div className="flex flex-col h-full p-4 space-y-4">
      {/* Header skeleton */}
      <div className="flex items-center gap-3">
        <Skeleton className="size-10 rounded-full" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-3 w-24" />
        </div>
      </div>
      {/* Messages skeleton */}
      <div className="flex-1 space-y-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="flex gap-3">
            <Skeleton className="size-8 rounded-full" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-16 w-full rounded-lg" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ChatWindowSkeleton
