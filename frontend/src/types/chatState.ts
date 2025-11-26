import type { Conversation, Message } from "@/types/chat"

type ChatState = {
  conversations: Conversation[]
  message: Record<
    string,
    {
      items: Message[]
      hasMore: boolean
      nextCursor: string | null
    }
  >
  activeConversationId: string | null
  loading: boolean
}

type ChatAction = {
  reset: () => void
  setActiveConversationId: (Id: string | null) => void
}

export type ChatStore = ChatState & ChatAction
