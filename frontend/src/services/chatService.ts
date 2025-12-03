import api from "@/lib/axios"
import type {
  Conversation,
  CreateConversationPayload,
  Message,
  SendMessagePayload,
} from "@/types/chat"

export const chatService = {
  async fetchConversations(): Promise<Conversation[]> {
    const response = await api.get("/conversations")
    return response.data
  },

  async createConversation(
    payload: CreateConversationPayload
  ): Promise<Conversation> {
    const response = await api.post("/conversations", payload)
    return response.data
  },

  async fetchMessages(
    conversationId: string,
    cursor?: string
  ): Promise<{ messages: Message[]; nextCursor: string | null }> {
    const response = await api.get(
      `/conversations/${conversationId}/messages`,
      {
        params: { cursor, limit: 20 },
      }
    )
    return response.data
  },

  async sendDirectMessage(payload: SendMessagePayload): Promise<{
    message: Message
    conversationId: string
  }> {
    const response = await api.post("/messages/direct", payload)
    return response.data
  },

  async sendGroupMessage(
    conversationId: string,
    content: string
  ): Promise<{
    message: Message
    conversationId: string
  }> {
    const response = await api.post("/messages/group", {
      conversationId,
      content,
    })
    return response.data
  },
}
