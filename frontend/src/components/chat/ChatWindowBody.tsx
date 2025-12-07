import ChatWelcomeScreen from "@/components/chat/ChatWelcomeScreen"
import MessageItem from "@/components/chat/MessageItem"
import { useChatStore } from "@/stores/useChatStore"
import React from "react"

const ChatWindowBody = () => {
  const {
    activeConversationId,
    messages: allMessages,
    conversations,
  } = useChatStore()

  const messages = allMessages[activeConversationId!]?.items || []
  const selectedConvo =
    conversations.find((convo) => convo._id === activeConversationId) ?? null

  if (!selectedConvo) {
    return <ChatWelcomeScreen />
  }

  if (!messages.length) {
    return (
      <div className="flex h-full items-center justify-center text-muted-foreground">
        Chưa có tin nhắn nào trong cuộc trò chuyện này
      </div>
    )
  }
  return (
    <div className="p-4 bg-primary-foreground h-full flex flex-col overflow-hidden">
      <div className="flex flex-col overflow-y-auto overflow-x-hidden beautiful-scrollbar">
        {messages.map((mess, index) => (
          <MessageItem
            key={mess._id ?? index}
            message={mess}
            index={index}
            messages={messages}
            selectedConvo={selectedConvo}
            lastMessageStatus={"delivered"}
          />
        ))}
      </div>
    </div>
  )
}

export default ChatWindowBody
