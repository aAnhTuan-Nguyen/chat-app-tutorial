import { chatService } from "@/services/chatService"
import { useAuthStore } from "@/stores/useAuthStore"
import type { ChatState } from "@/types/chatState"
import { create } from "zustand"
import { persist } from "zustand/middleware"

export const useChatStore = create<ChatState>()(
  persist(
    (set, get) => ({
      conversations: [],
      messages: {},
      activeConversationId: null,
      loading: false,
      messageLoading: false,

      setActiveConversation: (conversationId) => {
        set({ activeConversationId: conversationId })
      },
      reset: () => {
        set({
          conversations: [],
          messages: {},
          activeConversationId: null,
          loading: false,
          messageLoading: false,
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
      fetchMessages: async (conversationId: string) => {
        const { activeConversationId, messages } = get()
        const { user } = useAuthStore.getState()

        const convoId = conversationId ?? activeConversationId

        if (!convoId) return
        const current = messages?.[convoId]
        const nextCursor =
          current?.nextCursor === undefined ? "" : current?.nextCursor

        if (nextCursor === null) return
        set({ messageLoading: true })

        try {
          const { messages: newMessages, cursor } =
            await chatService.fetchMessages(convoId, nextCursor)

          const processed = newMessages.map((msg) => ({
            ...msg,
            isOwn: msg.senderId === user?._id,
          }))

          set((state: ChatState) => {
            const prev = state.messages[convoId]?.items || []
            const updatedMessages =
              prev.length > 0 ? [...prev, ...processed] : processed

            return {
              messages: {
                ...state.messages,
                [convoId]: {
                  items: updatedMessages,
                  hasMore: !!cursor,
                  nextCursor: cursor ?? null,
                },
              },
            }
          })
        } catch (error) {
          console.error("Lỗi khi tải tin nhắn:", error)
        } finally {
          set({ messageLoading: false })
        }
      },
      sendDirectMessage: async (recipientId, content, imageUrl) => {
        try {
          const { activeConversationId } = get()
          await chatService.sendDirectMessage(
            recipientId,
            content,
            imageUrl,
            activeConversationId || undefined
          )

          set((state) => ({
            conversations: state.conversations.map((convo) => {
              return convo._id === activeConversationId
                ? { ...convo, seenBy: [] }
                : convo
            }),
          }))
        } catch (error) {
          console.error("Lỗi khi gửi tin nhắn trực tiếp:", error)
        }
      },
      sendGroupMessage: async (conversationId, content, imageUrl) => {
        try {
          await chatService.sendGroupMessage(conversationId, content, imageUrl)
          set((state) => ({
            conversations: state.conversations.map((convo) => {
              return convo._id === conversationId
                ? { ...convo, seenBy: [] }
                : convo
            }),
          }))
        } catch (error) {
          console.error("Lỗi khi gửi tin nhắn nhóm:", error)
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
