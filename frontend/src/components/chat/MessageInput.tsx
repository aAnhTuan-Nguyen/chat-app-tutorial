import EmojiPicker from "@/components/chat/EmojiPicker"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useAuthStore } from "@/stores/useAuthStore"
import { useChatStore } from "@/stores/useChatStore"
import type { Conversation } from "@/types/chat"
import { ImagePlus, Send } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"

const MessageInput = ({ selectedConvo }: { selectedConvo: Conversation }) => {
  const [value, setValue] = useState("")
  const { user } = useAuthStore()
  const { sendDirectMessage, sendGroupMessage } = useChatStore()

  if (!user) return null

  const sendMessage = async () => {
    if (value.trim() === "") return
    const tempValue = value
    setValue("")
    try {
      if (selectedConvo.type === "direct") {
        const otherParticipant = selectedConvo.participants.find(
          (p) => p.userId !== user._id
        )
        if (otherParticipant) {
          await sendDirectMessage(otherParticipant.userId, tempValue, undefined)
        }
      } else if (selectedConvo.type === "group") {
        await sendGroupMessage(selectedConvo._id, tempValue, undefined)
      }
    } catch (error) {
      console.error("Lỗi khi gửi tin nhắn:", error)
      toast.error("Không thể gửi tin nhắn. Vui lòng thử lại.")
    }
  }
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <div className="flex items-center gap-2 p-3 min-h-[56] bg-background">
      <Button
        variant={"ghost"}
        size={"icon"}
        className="hover:bg-primary/10 transition-smooth"
      >
        <ImagePlus className="size-5" />
      </Button>

      <div className="flex-1 relative">
        <Input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Soạn tin nhắn"
          className="pr-20 h-9 border-border/50 focus:border-primary/50
          transition-smooth resize-none"
        ></Input>
        <div
          className="absolute right-2 top-1/2 -translate-y-1/2
          transform flex items-center gap-2"
        >
          <EmojiPicker onChange={(emoji) => setValue(value + emoji)} />
        </div>
      </div>
      <Button
        className="bg-gradient-chat hover:shadwo-glow transition-smooth
         hover:scale-105 active:scale-95"
        disabled={value.trim() === ""}
        onClick={sendMessage}
      >
        <Send className="size-5 text-white" />
      </Button>
    </div>
  )
}

export default MessageInput
