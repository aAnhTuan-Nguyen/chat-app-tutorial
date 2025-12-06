import UserAvatar from "@/components/chat/UserAvatar"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { cn, formatMessageTime } from "@/lib/utils"
import type { Conversation, Message, Participant } from "@/types/chat"

interface MessageItemProps {
  message: Message
  index: number
  messages: Message[]
  selectedConvo: Conversation
  lastMessageStatus: "delivered" | "seen"
}
const MessageItem = ({
  message,
  index,
  messages,
  selectedConvo,
  lastMessageStatus,
}: MessageItemProps) => {
  const prev = messages[index - 1]
  const isGroupBreak =
    index === 0 || // tin nhắn đầu tiên trong danh sách
    prev?.senderId !== message.senderId || // người gửi khác nhau
    (prev && Date.now() - new Date(prev.createdAt).getTime() > 5 * 60 * 1000) // ngắt nhóm nếu cách nhau hơn 5 phút

  const participant = selectedConvo.participants.find(
    (p: Participant) => p.userId.toString() === message.senderId.toString()
  )
  return (
    <div
      className={cn(
        "flex gap-2 px-4 message-bounce",
        message.isOwn ? "justify-end" : "justify-start"
      )}
    >
      {!message.isOwn && isGroupBreak && (
        <div className="mt-2">
          <UserAvatar
            type="chat"
            name={participant?.displayName || "Moji"}
            avatarUrl={participant?.avatarUrl || undefined}
          />
        </div>
      )}

      {/* Tin nhắn */}
      <div
        className={cn(
          "max-w-xs lg:max-w-md space-y-1 flex flex-col ",
          message.isOwn ? "items-end" : "items-start" // Căn phải nội dung của tin nhắn nếu là tin nhắn của mình, ngược lại căn trái
        )}
      >
        <Card
          className={cn(
            "p-3",
            message.isOwn ? "chat-bubble-sent border-0" : "chat-bubble-received"
          )}
        >
          <p className="text-sm leading-relaxed wrap-break-word">
            {message.content}
          </p>
        </Card>
        {/* time */}
        {isGroupBreak && (
          <span className={cn("text-xs text-muted-foreground px-1")}>
            {formatMessageTime(new Date(message.createdAt))}
          </span>
        )}

        {/* seen/delivered */}
        {message.isOwn && message._id === selectedConvo.lastMessage?._id && (
          <Badge
            variant={"outline"}
            className={cn(
              "text-xs px-1.5 py-0.5 h-4 border-0 ",
              lastMessageStatus === "seen"
                ? "bg-primary/20 text-primary"
                : "bg-muted text-muted-foreground"
            )}
          >
            {lastMessageStatus === "seen" ? "Đã xem" : "Đã gửi"}
          </Badge>
        )}
      </div>
    </div>
  )
}

export default MessageItem
