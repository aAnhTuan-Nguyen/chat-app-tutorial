import UserAvatar from "@/components/chat/UserAvatar"
import type { Participant } from "@/types/chat"
import { Ellipsis } from "lucide-react"

interface GroupChatAvatarProps {
  participants: Participant[]
  type: "chat" | "sidebar"
}

const GroupChatAvatar = ({ participants, type }: GroupChatAvatarProps) => {
  const avatarElements = []
  const limit = Math.min(participants.length, 4)
  const displayParticipants = participants.slice(0, limit)

  for (let i = 0; i < limit; i++) {
    const participant = displayParticipants[i]
    avatarElements.push(
      <UserAvatar
        avatarUrl={participant.avatarUrl ?? undefined}
        type={type}
        key={participant.userId}
        name={participant.displayName}
      />
    )
  }
  return (
    <div className="relative flex -space-x-3 *:data-[slot=avatar]:ring-background *:data-[slot=avatar]:ring-2">
      {avatarElements}
      {/* Nếu có nhiều hơn 4 thành viên thì render ... */}
      {/* {participants.length > 4 && (
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted text-xs">
          +{participants.length - 4}
        </div>
      )} */}
      {participants.length > 4 && (
        <div className="flex items-center z-10 justify-center rounded-full bg-muted text-xs ring-2 ring-background size-8">
          <Ellipsis className="size-6" />
        </div>
      )}
    </div>
  )
}

export default GroupChatAvatar
