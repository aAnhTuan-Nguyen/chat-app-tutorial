import { chatService } from "@/services/chatService"
import type { ChatState } from "@/types/chatState"
import { create } from "zustand"
import { persist } from "zustand/middleware"

export const useChatStore = create<ChatState>()(
  persist(
    (set) => ({
      conversations: [],
      messages: {},
      activeConversationId: null,
      loading: false,
      setActiveConversation: (conversationId) => {
        set({ activeConversationId: conversationId })
      },
      reset: () => {
        set({
          conversations: [],
          messages: {},
          activeConversationId: null,
          loading: false,
        })
      },
      fetchConversations: async () => {
        try {
          set({ loading: true })
          const conversations = await chatService.fetchConversations()
          set({ conversations, loading: false })
        } catch (error) {
          console.error("Lỗi khi tải cuộc trò chuyện:", error)
          set({ loading: false })
        }
      },
    }),
    {
      name: "chat-storage",
      partialize: (state) => ({
        conversations: state.conversations,
      }),
    }
  )
)
