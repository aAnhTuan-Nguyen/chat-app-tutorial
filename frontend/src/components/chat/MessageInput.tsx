import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useAuthStore } from "@/stores/useAuthStore"
import type { Conversation } from "@/types/chat"
import { ImagePlus, Send } from "lucide-react"
import { useState } from "react"

const MessageInput = ({ selectedConvo }: { selectedConvo: Conversation }) => {
  const [value, setValue] = useState("")
  const { user } = useAuthStore()

  if (!user) return null

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
          placeholder="Soạn tin nhắn"
          className="pr-20 h-9 border-border/50 focus:border-primary/50
          transition-smooth resize-none"
        ></Input>
        <div
          className="absolute right-2 top-1/2 -translate-y-1/2
          transform flex items-center gap-2"
        >
          <Button
            asChild
            variant={"ghost"}
            size={"icon"}
            className="hover:bg-primary/10 transition-smooth"
          >
            <div>{/* emoji */}</div>
          </Button>
        </div>
      </div>
      <Button
        className="bg-gradient-chat hover:shadwo-glow transition-smooth
         hover:scale-105 active:scale-95"
        disabled={value.trim() === ""}
      >
        <Send className="size-5 text-white" />
      </Button>
    </div>
  )
}

export default MessageInput
