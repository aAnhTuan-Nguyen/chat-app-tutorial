import ChatWelcomeScreen from "@/components/chat/ChatWelcomeScreen"
import ChatWindowBody from "@/components/chat/ChatWindowBody"
import ChatWindowHeader from "@/components/chat/ChatWindowHeader"
import ChatWindowSkeleton from "@/components/chat/ChatWindowSekeleton"
import MessageInput from "@/components/chat/MessageInput"
import { SidebarInset } from "@/components/ui/sidebar"
import { useChatStore } from "@/stores/useChatStore"

const ChatWindowLayout = () => {
  const { activeConversationId, conversations, messageLoading, messages } =
    useChatStore()

  const selectedConvo =
    conversations.find((convo) => convo._id === activeConversationId) ?? null

  if (!selectedConvo) {
    return <ChatWelcomeScreen />
  }

  if (messageLoading) {
    return <ChatWindowSkeleton />
  }
  return (
    <SidebarInset className="flex flex-col h-full flex-1 overflow-hidden rounded-md shadow-md">
      {/* header */}
      <ChatWindowHeader />
      {/* body */}
      <div className="flex-1 overflow-y-auto bg-primary-foreground">
        <ChatWindowBody />
      </div>
      {/* footer */}
      <MessageInput />
    </SidebarInset>
  )
}

export default ChatWindowLayout
