import { chatService } from "@/services/chatService"
import type { ChatStore } from "@/types/chatState"
import { create } from "zustand"
import { persist } from "zustand/middleware"

export const useChatStore = create<ChatStore>()(
  persist(
    (set) => ({
      // state
      conversations: [],
      message: {},
      activeConversationId: null,
      loading: false,

      // actions
      setActiveConversationId: (Id) => {
        set({ activeConversationId: Id })
      },
      reset: () => {
        set({
          conversations: [],
          message: {},
          activeConversationId: null,
          loading: false,
        })
      },
      fetchConversations: async () => {
        try {
          set({ loading: true })
          const { conversations } = await chatService.fetchConversations()
          set({ conversations, loading: false })
        } catch (error) {
          console.error("Failed to fetch conversations:", error)
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
