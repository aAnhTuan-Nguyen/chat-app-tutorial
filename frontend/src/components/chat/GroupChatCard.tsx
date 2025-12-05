import ChatCard from "@/components/chat/ChatCard"
import GroupChatAvatar from "@/components/chat/GroupChatAvatar"
import UnreadCountBadge from "@/components/chat/UnreadCountBadge"
import { useAuthStore } from "@/stores/useAuthStore"
import { useChatStore } from "@/stores/useChatStore"
import type { Conversation } from "@/types/chat"

const GroupChatCard = ({ convo }: { convo: Conversation }) => {
  const { user } = useAuthStore()
  const {
    activeConversationId,
    setActiveConversation,
    messages,
    fetchMessages,
  } = useChatStore()

  if (!user) return null
  const unreadCount = convo.unreadCount?.[user._id]
  const nameGroup = convo.group?.name || ""

  const handleSelectConversation = async (id: string) => {
    setActiveConversation(id)
    if (!messages[id]) {
      await fetchMessages(id)
    }
  }

  return (
    <ChatCard
      convoId={convo._id}
      name={nameGroup}
      timestamp={
        convo.lastMessage?.createdAt
          ? new Date(convo.lastMessage.createdAt)
          : undefined
      }
      isActive={activeConversationId === convo._id}
      onSelect={handleSelectConversation}
      unreadCount={unreadCount}
      leftSection={
        <>
          {unreadCount && unreadCount > 0 && (
            <UnreadCountBadge unreadCount={unreadCount} />
          )}
          <GroupChatAvatar participants={convo.participants} type="chat" />
        </>
      }
      subtitle={
        <p className="text-sm text-muted-foreground truncate">
          {convo.participants.length} members
        </p>
      }
    />
  )
}

export default GroupChatCard
