import ChatCard from "@/components/chat/ChatCard"
import StatusBadge from "@/components/chat/StatusBadge"
import UnreadCountBadge from "@/components/chat/UnreadCountBadge"
import UserAvatar from "@/components/chat/UserAvatar"
import { cn } from "@/lib/utils"
import { useAuthStore } from "@/stores/useAuthStore"
import { useChatStore } from "@/stores/useChatStore"
import type { Conversation } from "@/types/chat"

const DirectMessageCard = ({ convo }: { convo: Conversation }) => {
  const { user } = useAuthStore()
  const { activeConversationId, setActiveConversation, messages } =
    useChatStore()

  if (!user) return null
  const otherParticipant = convo.participants.find(
    (participant) => participant.userId !== user._id
  )
  if (!otherParticipant) return null

  const unreadCount = convo.unreadCount?.[user._id]
  const lastMessage = convo.lastMessage?.content ?? ""

  const handleSelectConversation = async (id: string) => {
    setActiveConversation(id)
    if (!messages[id]) {
      // todo: fetch messages for this conversation
    }
  }

  return (
    <ChatCard
      convoId={convo._id}
      name={otherParticipant.displayName ?? ""}
      timestamp={
        convo.lastMessage?.createdAt
          ? new Date(convo.lastMessage.createdAt)
          : undefined
      }
      isActive={activeConversationId === convo._id}
      onSelect={handleSelectConversation}
      unreadCount={unreadCount}
      subtitle={
        <p
          className={cn(
            "text-sm truncate",
            unreadCount > 0
              ? "font-medium text-foreground"
              : "text-muted-foreground"
          )}
        >
          {lastMessage}
        </p>
      }
      leftSection={
        <>
          {/* avatar */}
          <UserAvatar
            name={otherParticipant.displayName ?? ""}
            type="sidebar"
            avatarUrl={otherParticipant.avatarUrl ?? undefined}
          />
          {/* badge */}
          <StatusBadge status="online" />
          {/* unread count */}
          {unreadCount && unreadCount > 0 && (
            <UnreadCountBadge unreadCount={unreadCount} />
          )}
        </>
      }
    />
  )
}

export default DirectMessageCard
