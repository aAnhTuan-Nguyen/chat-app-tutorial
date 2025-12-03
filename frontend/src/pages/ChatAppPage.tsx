import { useEffect } from "react"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/sidebar/app-sidebar"
import ChatWindowLayout from "@/components/chat/ChatWindowLayout"
import { useChatStore } from "@/stores/useChatStore"
import { useFriendStore } from "@/stores/useFriendStore"

const ChatAppPage = () => {
  const { fetchConversations } = useChatStore()
  const { fetchFriends, fetchFriendRequests } = useFriendStore()

  useEffect(() => {
    // Fetch all data when app loads
    fetchConversations()
    fetchFriends()
    fetchFriendRequests()
  }, [fetchConversations, fetchFriends, fetchFriendRequests])

  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="flex-1 bg-background p-8">
        <SidebarTrigger />
        {/* Chat application main content goes here */}
        <ChatWindowLayout />
      </main>
    </SidebarProvider>
  )
}

export default ChatAppPage
