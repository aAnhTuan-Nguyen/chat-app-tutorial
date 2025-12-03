import { Card } from "@/components/ui/card"
import { cn, formatOnlineTime } from "@/lib/utils"
import { MoreHorizontal } from "lucide-react"
import type React from "react"

interface ChatCardProps {
  convoId: string
  name: string
  timestamp?: Date
  isActive: boolean
  onSelect: (id: string) => void
  unreadCount?: number
  leftSection: React.ReactNode
  subTitle?: React.ReactNode
}
const ChatCard = ({
  convoId,
  name,
  timestamp,
  isActive,
  onSelect,
  unreadCount,
  leftSection,
  subTitle,
}: ChatCardProps) => {
  return (
    <Card
      key={convoId}
      className={cn(
        "border-none p-3 cursor-pointer transition-all duration-500 ease-in-out glass hover:bg-muted/30 group",
        isActive && "ring-2 ring-primary/50 bg-muted/30"
      )}
      onClick={() => onSelect(convoId)}
    >
      <div className="flex items-center gap-3">
        {/* Avatar/Icon Section */}
        <div className="relative shrink-0">{leftSection}</div>

        {/* Content Section */}
        <div className="flex-1 min-w-0">
          {/* Header: Name + Time */}
          <div className="flex items-center justify-between gap-2 mb-1">
            <h3
              className={cn(
                "text-sm font-semibold truncate",
                unreadCount && unreadCount > 0 && "text-foreground"
              )}
            >
              {name}
            </h3>
            <span className="text-xs text-muted-foreground whitespace-nowrap shrink-0">
              {timestamp ? formatOnlineTime(timestamp) : ""}
            </span>
          </div>

          {/* Footer: Subtitle + More Icon */}
          <div className="flex items-center justify-between gap-2">
            <div className="flex-1 min-w-0">{subTitle}</div>
            <MoreHorizontal
              className="size-4 text-muted-foreground opacity-0 group-hover:opacity-100 
                hover:size-5 transition-all shrink-0"
            />
          </div>
        </div>
      </div>
    </Card>
  )
}

export default ChatCard
