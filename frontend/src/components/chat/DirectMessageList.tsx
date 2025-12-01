import DirectMessageCard from "@/components/chat/DirectMessageCard"
import { useChatStore } from "@/stores/useChatStore"
import React from "react"

const DirectMessageList = () => {
  const { conversations } = useChatStore()

  if (!conversations) return

  const directConversations = conversations.filter(
    (conver) => conver.type === "direct"
  )

  return (
    <div className="flex-1 overflow-y-auto p-2 space-y-2">
      {directConversations.map((conve) => (
        <DirectMessageCard conve={conve} />
      ))}
    </div>
  )
}

export default DirectMessageList
