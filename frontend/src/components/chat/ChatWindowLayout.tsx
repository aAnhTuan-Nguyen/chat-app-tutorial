import { useEffect, useRef, useState } from "react"
import { useChatStore } from "@/stores/useChatStore"
import { useAuthStore } from "@/stores/useAuthStore"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Send, Loader2 } from "lucide-react"
import { cn, formatOnlineTime } from "@/lib/utils"
import UserAvatar from "@/components/chat/UserAvatar"

const ChatWindowLayout = () => {
  const {
    activeConversationId,
    conversations,
    message,
    fetchMessages,
    sendDirectMessage,
    sendGroupMessage,
  } = useChatStore()
  const { user } = useAuthStore()
  const [input, setInput] = useState("")
  const [sending, setSending] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const messagesContainerRef = useRef<HTMLDivElement>(null)

  const activeConversation = conversations.find(
    (convo) => convo._id === activeConversationId
  )

  const messages = activeConversationId
    ? message[activeConversationId]?.items || []
    : []

  useEffect(() => {
    if (activeConversationId && !message[activeConversationId]) {
      fetchMessages(activeConversationId)
    }
  }, [activeConversationId, fetchMessages, message])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSend = async () => {
    if (!input.trim() || !activeConversationId || !activeConversation) return

    setSending(true)
    try {
      if (activeConversation.type === "direct") {
        const otherParticipant = activeConversation.participants.find(
          (p) => p.userId !== user?._id
        )
        if (otherParticipant) {
          await sendDirectMessage(
            otherParticipant.userId,
            input,
            activeConversationId
          )
        }
      } else {
        await sendGroupMessage(activeConversationId, input)
      }
      setInput("")
    } finally {
      setSending(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  if (!activeConversationId || !activeConversation) {
    return (
      <div className="flex-1 flex items-center justify-center text-muted-foreground">
        <div className="text-center space-y-2">
          <h3 className="text-xl font-semibold">Chọn một cuộc trò chuyện</h3>
          <p className="text-sm">Chọn bạn bè hoặc nhóm để bắt đầu chat</p>
        </div>
      </div>
    )
  }

  // Get conversation title
  const getConversationTitle = () => {
    if (activeConversation.type === "group") {
      return activeConversation.group?.name || "Nhóm chat"
    }
    const otherParticipant = activeConversation.participants.find(
      (p) => p.userId !== user?._id
    )
    return otherParticipant?.displayName || "Người dùng"
  }

  return (
    <div className="flex-1 flex flex-col h-full">
      {/* Header */}
      <Card className="border-x-0 border-t-0 rounded-none p-4 flex items-center gap-3">
        <UserAvatar
          type="chat"
          name={getConversationTitle()}
          avatarUrl={
            activeConversation.type === "direct"
              ? activeConversation.participants.find(
                  (p) => p.userId !== user?._id
                )?.avatarUrl || undefined
              : undefined
          }
        />
        <div>
          <h2 className="font-semibold">{getConversationTitle()}</h2>
          <p className="text-sm text-muted-foreground">
            {activeConversation.type === "group"
              ? `${activeConversation.participants.length} thành viên`
              : "Đang hoạt động"}
          </p>
        </div>
      </Card>

      {/* Messages */}
      <div
        ref={messagesContainerRef}
        className="flex-1 overflow-y-auto p-4 space-y-4"
      >
        {messages.length === 0 ? (
          <div className="flex items-center justify-center h-full text-muted-foreground">
            <p>Chưa có tin nhắn nào. Hãy bắt đầu cuộc trò chuyện!</p>
          </div>
        ) : (
          messages.map((msg) => {
            const isOwn = msg.senderId._id === user?._id
            return (
              <div
                key={msg._id}
                className={cn(
                  "flex gap-3",
                  isOwn ? "flex-row-reverse" : "flex-row"
                )}
              >
                <UserAvatar
                  type="chat"
                  name={msg.senderId.displayName}
                  avatarUrl={msg.senderId.avatarUrl || undefined}
                />
                <div
                  className={cn(
                    "flex flex-col",
                    isOwn ? "items-end" : "items-start"
                  )}
                >
                  {!isOwn && (
                    <span className="text-xs text-muted-foreground mb-1">
                      {msg.senderId.displayName}
                    </span>
                  )}
                  <Card
                    className={cn(
                      "p-3 max-w-[70%]",
                      isOwn ? "bg-primary text-primary-foreground" : "bg-muted"
                    )}
                  >
                    <p className="text-sm whitespace-pre-wrap wrap-break-word">
                      {msg.content}
                    </p>
                  </Card>
                  <span className="text-xs text-muted-foreground mt-1">
                    {formatOnlineTime(new Date(msg.createdAt))}
                  </span>
                </div>
              </div>
            )
          })
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <Card className="border-x-0 border-b-0 rounded-none p-4">
        <div className="flex items-center gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Nhập tin nhắn..."
            disabled={sending}
            className="flex-1"
          />
          <Button
            onClick={handleSend}
            disabled={!input.trim() || sending}
            size="icon"
          >
            {sending ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Send className="h-4 w-4" />
            )}
          </Button>
        </div>
      </Card>
    </div>
  )
}

export default ChatWindowLayout
