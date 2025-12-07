import api from "@/lib/axios"
import type { Conversation, Message } from "@/types/chat"

interface fetchMessagesProps {
  messages: Message[]
  cursor?: string
}

const pageLimit = 50

export const chatService = {
  async fetchConversations(): Promise<Conversation[]> {
    const response = await api.get("/conversations")
    return response.data
  },

  async fetchMessages(
    id: string,
    cursor?: string
  ): Promise<fetchMessagesProps> {
    const response = await api.get(`/conversations/${id}/messages`, {
      params: { cursor, limit: pageLimit },
    })
    return {
      messages: response.data.messages,
      cursor: response.data.nextCursor,
    }
  },

  async sendDirectMessage(
    recipientId: string,
    content: string,
    imageUrl?: string,
    conversationId?: string
  ) {
    const response = await api.post("/messages/direct", {
      recipientId,
      content,
      imageUrl,
      conversationId,
    })
    return response.data
  },

  async sendGroupMessage(
    conversationId: string,
    content: string = "",
    imageUrl?: string
  ) {
    const response = await api.post("/messages/group", {
      conversationId,
      content,
      imageUrl,
    })
    return response.data.message
  },
}
