import { chatService } from "@/services/chatService"
import type { ChatStore } from "@/types/chatState"
import type { Conversation, Message } from "@/types/chat"
import { create } from "zustand"
import { persist } from "zustand/middleware"
import { toast } from "sonner"

export const useChatStore = create<ChatStore>()(
  persist(
    (set, get) => ({
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
          const conversations = await chatService.fetchConversations()
          set({ conversations, loading: false })
        } catch (error) {
          console.error("Failed to fetch conversations:", error)
          set({ loading: false })
        }
      },
      fetchMessages: async (conversationId: string, cursor?: string) => {
        try {
          const { messages, nextCursor } = await chatService.fetchMessages(
            conversationId,
            cursor
          )
          const existingData = get().message[conversationId] || {
            items: [],
            hasMore: true,
            nextCursor: null,
          }

          set((state) => ({
            message: {
              ...state.message,
              [conversationId]: {
                items: cursor
                  ? [...existingData.items, ...messages]
                  : messages,
                hasMore: !!nextCursor,
                nextCursor,
              },
            },
          }))
        } catch (error) {
          console.error("Failed to fetch messages:", error)
          toast.error("Lỗi khi tải tin nhắn")
        }
      },
      sendDirectMessage: async (
        recipientId: string,
        content: string,
        conversationId?: string
      ) => {
        try {
          const { message, conversationId: newConvoId } =
            await chatService.sendDirectMessage({
              recipientId,
              content,
              conversationId,
            })

          // Add message to store
          get().addMessage(newConvoId, message)

          // Refresh conversations to update last message
          await get().fetchConversations()
          
          toast.success("Đã gửi tin nhắn")
        } catch (error) {
          console.error("Failed to send direct message:", error)
          toast.error("Lỗi khi gửi tin nhắn")
        }
      },
      sendGroupMessage: async (conversationId: string, content: string) => {
        try {
          const { message } = await chatService.sendGroupMessage(
            conversationId,
            content
          )

          // Add message to store
          get().addMessage(conversationId, message)

          // Refresh conversations to update last message
          await get().fetchConversations()
          
          toast.success("Đã gửi tin nhắn")
        } catch (error) {
          console.error("Failed to send group message:", error)
          toast.error("Lỗi khi gửi tin nhắn")
        }
      },
      addConversation: (conversation: Conversation) => {
        set((state) => ({
          conversations: [conversation, ...state.conversations],
        }))
      },
      addMessage: (conversationId: string, message: Message) => {
        set((state) => {
          const existingData = state.message[conversationId] || {
            items: [],
            hasMore: true,
            nextCursor: null,
          }

          return {
            message: {
              ...state.message,
              [conversationId]: {
                ...existingData,
                items: [...existingData.items, message],
              },
            },
          }
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
