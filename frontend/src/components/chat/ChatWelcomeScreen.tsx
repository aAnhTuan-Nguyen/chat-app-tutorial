import ChatWindowHeader from "@/components/chat/ChatWindowHeader"
import { SidebarInset } from "@/components/ui/sidebar"
import { MessageCircleMore } from "lucide-react"

const ChatWelcomeScreen = () => {
  return (
    <SidebarInset className="flex w-full h-full bg-transparent">
      <ChatWindowHeader />
      <div className="flex-1 flex bg-primary-foreground rounded-2xl items-center justify-center">
        <div className="text-center">
          <div className="size-24 mx-auto mb-6 bg-gradient-chat rounded-full flex items-center justify-center shadow-glow pulse-ring">
            <span className="text-3xl">
              <MessageCircleMore size={50} />
            </span>
          </div>
          <h2 className="text-2xl font-bold mb-2 bg-gradient-chat bg-clip-text text-transparent">
            Chào mừng bạn đến với Moji Chat!
          </h2>
          <p className="text-muted-foreground">
            Chọn một cuộc trò chuyện từ thanh bên hoặc bắt đầu cuộc trò chuyện
            mới để bắt đầu nhắn tin.
          </p>
        </div>
      </div>
    </SidebarInset>
  )
}

export default ChatWelcomeScreen
