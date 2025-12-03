import ChatCard from "@/components/chat/ChatCard"
import { useAuthStore } from "@/stores/useAuthStore"
import { useChatStore } from "@/stores/useChatStore"
import type { Conversation } from "@/types/chat"

const GroupChatCard = ({ conve }: { conve: Conversation }) => {
  const { user } = useAuthStore()
  const { setActiveConversationId, activeConversationId, message } =
    useChatStore()
  if (!user) return null
  const unreadCount = conve.unreadCount[user._id] || 0
  const groupName = conve.group?.name || ""
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
      name={groupName}
      timestamp={
        conve.lastMessage?.createdAt
          ? new Date(conve.lastMessage.createdAt)
          : undefined
      }
      isActive={activeConversationId === conve._id}
      onSelect={handleSelectConversation}
      unreadCount={unreadCount}
      leftSection={<></>}
      subTitle={
        <p className="text-sm truncate text-muted-foreground">
          {conve.participants.length} thành viên
        </p>
      }
    />
  )
}

export default GroupChatCard
