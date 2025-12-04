import type { Conversation, Message } from "@/types/chat"

export interface ChatState {
  conversations: Conversation[]
  messages: Record<
    string,
    {
      items: Message[] // Messages for the conversation
      hasMore: boolean
      nextCursor: string | null
    }
  >
  activeConversationId: string | null
  loading: boolean

  reset: () => void
  setActiveConversation: (conversationId: string | null) => void
  fetchConversations: () => Promise<void>
}
