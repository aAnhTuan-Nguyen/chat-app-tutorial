import type { Conversation, Message } from "@/types/chat"

type ChatState = {
  conversations: Conversation[]
  message: Record<
    string,
    {
      items: Message[]
      hasMore: boolean // infinite scroll
      nextCursor: string | null
    }
  >
  activeConversationId: string | null
  loading: boolean
}

type ChatAction = {
  reset: () => void
  setActiveConversationId: (Id: string | null) => void
  fetchConversations: () => Promise<void>
  fetchMessages: (conversationId: string, cursor?: string) => Promise<void>
  sendDirectMessage: (recipientId: string, content: string, conversationId?: string) => Promise<void>
  sendGroupMessage: (conversationId: string, content: string) => Promise<void>
  addConversation: (conversation: Conversation) => void
  addMessage: (conversationId: string, message: Message) => void
}

export type ChatStore = ChatState & ChatAction
