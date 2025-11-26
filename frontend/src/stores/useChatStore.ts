import type { ChatStore } from "@/types/chatState"
import { create } from "zustand"
import { persist } from "zustand/middleware"

export const useChatStore = create<ChatStore>()(
  persist(
    (set) => ({
      conversations: [],
      message: {},
      activeConversationId: null,
      loading: false,

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
    }),
    {
      name: "chat-storage",
      partialize: (state) => ({
        conversations: state.conversations,
      }),
    }
  )
)
