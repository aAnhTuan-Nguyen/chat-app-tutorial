import GroupChatCard from "@/components/chat/GroupChatCard"
import { useChatStore } from "@/stores/useChatStore"

const GroupChatList = () => {
  const { conversations } = useChatStore()

  if (!conversations) return null

  const groupConversations = conversations.filter(
    (conver) => conver.type === "group"
  )

  return (
    <div className="flex-1 overflow-y-auto p-2 space-y-2">
      {groupConversations.map((conve) => (
        <GroupChatCard key={conve._id} conve={conve} />
      ))}
    </div>
  )
}

export default GroupChatList
