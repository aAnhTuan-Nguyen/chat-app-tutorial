import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/sidebar/app-sidebar"
import ChatWindowLayout from "@/components/chat/ChatWindowLayout"
const ChatAppPage = () => {
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
