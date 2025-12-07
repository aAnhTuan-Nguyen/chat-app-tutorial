import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Smile } from "lucide-react"
import { userThemeStore } from "@/stores/useThemeStore"
import EmojiPickerReact, { Theme } from "emoji-picker-react"

interface EmojiPickerProps {
  onChange: (emoji: string) => void
}

const EmojiPicker = ({ onChange }: EmojiPickerProps) => {
  const { isDark } = userThemeStore()

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Smile className="size-5 cursor-pointer hover:text-primary transition-smooth" />
      </PopoverTrigger>
      <PopoverContent
        sideOffset={40}
        side="top"
        align="end"
        alignOffset={-10}
        className="w-full p-0 border-none shadow-glow bg-transparent"
      >
        <EmojiPickerReact
          theme={isDark ? Theme.DARK : Theme.LIGHT}
          onEmojiClick={(emojiData) => onChange(emojiData.emoji)}
          lazyLoadEmojis
          skinTonesDisabled
          searchPlaceHolder="Tìm emoji..."
          previewConfig={{ showPreview: false }}
        />
      </PopoverContent>
    </Popover>
  )
}

export default EmojiPicker
