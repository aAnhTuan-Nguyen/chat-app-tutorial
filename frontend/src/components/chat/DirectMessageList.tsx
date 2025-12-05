import DirectMessageCard from "@/components/chat/DirectMessageCard"
import { useChatStore } from "@/stores/useChatStore"

const DirectMessageList = () => {
  const { conversations } = useChatStore()

  if (!conversations) return null

  const directConversations = conversations.filter(
    (convo) => convo.type === "direct"
  )

  return (
    <div className="flex-1 overflow-y-auto p-2 space-y-2">
      {directConversations.length > 0 ? (
        directConversations.map((convo) => (
          <DirectMessageCard convo={convo} key={convo._id} />
        ))
      ) : (
        <p className="p-4 text-center text-muted-foreground">
          Chưa có tin nhắn trực tiếp
        </p>
      )}
    </div>
  )
}

export default DirectMessageList
