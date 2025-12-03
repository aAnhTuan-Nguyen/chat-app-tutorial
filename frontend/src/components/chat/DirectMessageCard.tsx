import ChatCard from "@/components/chat/ChatCard"
import StatusBadge from "@/components/chat/StatusBadge"
import UnreadCountBadge from "@/components/chat/UnreadCountBadge"
import UserAvatar from "@/components/chat/UserAvatar"
import { cn } from "@/lib/utils"
import { useAuthStore } from "@/stores/useAuthStore"
import { useChatStore } from "@/stores/useChatStore"
import type { Conversation } from "@/types/chat"

const DirectMessageCard = ({ conve }: { conve: Conversation }) => {
  const { user } = useAuthStore()
  const { setActiveConversationId, activeConversationId, message } =
    useChatStore()

  if (!user) return null
  const otherParticipant = conve.participants.find((p) => p.userId !== user._id)
  if (!otherParticipant) return null
  const unreadCount = conve.unreadCount[user._id] || 0
  const lastMessage = conve.lastMessage?.content || ""

  const handleSelectConversation = async (id: string) => {
    setActiveConversationId(id)
    if (!message[id]) {
      // fetch messages for this conversation
      // await fetchMessages(id)
    }
  }

  return (
    <ChatCard
      convoId={conve._id}
      name={otherParticipant.displayName ?? ""}
      timestamp={
        conve.lastMessage?.createdAt
          ? new Date(conve.lastMessage.createdAt)
          : undefined
      }
      isActive={activeConversationId === conve._id}
      onSelect={handleSelectConversation}
      unreadCount={unreadCount}
      leftSection={
        <>
          {/* todo: user avatar */}
          <UserAvatar
            type="sidebar"
            name={otherParticipant.displayName ?? ""}
            avatarUrl={otherParticipant.avatarUrl || undefined}
          />
          {/* todo: status after use StocketIO*/}

          <StatusBadge status="offline" />
          {/* todo: unread count */}
          {unreadCount > 0 && <UnreadCountBadge unreadCount={unreadCount} />}
        </>
      }
      subTitle={
        <p
          className={cn(
            "text-sm text-muted-foreground truncate",
            unreadCount > 0
              ? "font-medium text-foreground"
              : "text-muted-foreground"
          )}
        >
          {lastMessage}
        </p>
      }
    />
  )
}

export default DirectMessageCard
