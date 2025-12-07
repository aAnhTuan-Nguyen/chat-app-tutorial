import ChatWindowLayout from "@/components/chat/ChatWindowLayout"
import { AppSidebar } from "@/components/sidebar/app-sidebar"
import { SidebarProvider } from "@/components/ui/sidebar"

const ChatAppPage = () => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="flex h-screen w-full p-2">
        <ChatWindowLayout />
      </main>
    </SidebarProvider>
  )
}

export default ChatAppPage
