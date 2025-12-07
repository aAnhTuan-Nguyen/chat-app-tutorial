import GroupChatAvatar from "@/components/chat/GroupChatAvatar"
import StatusBadge from "@/components/chat/StatusBadge"
import UserAvatar from "@/components/chat/UserAvatar"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { useAuthStore } from "@/stores/useAuthStore"
import { useChatStore } from "@/stores/useChatStore"
import type { Conversation } from "@/types/chat"
import { Separator } from "@radix-ui/react-separator"

const ChatWindowHeader = ({ chat }: { chat?: Conversation }) => {
  const { user } = useAuthStore()
  const { conversations, activeConversationId } = useChatStore()
  let otherParticipant

  chat = chat || conversations.find((c) => c._id === activeConversationId)

  if (!chat) {
    return (
      <header className="md:hidden sticky top-0 z-10 flex items-center gap-2 px-4 py-2 w-full">
        <SidebarTrigger className="-ml-1 text-foreground" />
      </header>
    )
  }
  if (chat.type === "direct") {
    otherParticipant = chat.participants.filter(
      (p) => p.userId !== user?._id
    )[0]
    if (!otherParticipant) return null
  }

  return (
    <header className="sticky top-0 z-10 flex items-center gap-2 px-4 py-2 bg-background">
      <div className="flex items-center gap-2 w-full">
        <SidebarTrigger className="-ml-1 text-foreground" />
        <Separator
          orientation="vertical"
          className="mr-2 data-[orientation=vertical]:h-4"
        />
        <div className="p-2 w-full flex items-center gap-3">
          {/* avatar */}
          <div className="relative">
            {chat.type === "direct" ? (
              <>
                <UserAvatar
                  type="sidebar"
                  name={otherParticipant?.displayName || "Moji"}
                  avatarUrl={otherParticipant?.avatarUrl || ""}
                />
                <StatusBadge status="online" />
              </>
            ) : (
              <GroupChatAvatar
                participants={chat.participants}
                type="sidebar"
              />
            )}
          </div>
          {/* name */}
          <h2 className="font-semibold text-foreground">
            {chat.type === "direct"
              ? otherParticipant?.displayName
              : chat.group?.name || "Cuộc trò chuyện nhóm"}
          </h2>
        </div>
      </div>
    </header>
  )
}

export default ChatWindowHeader
