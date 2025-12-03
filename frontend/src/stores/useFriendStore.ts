import { create } from "zustand"
import { friendService } from "@/services/friendService"
import type { Friend, FriendRequest } from "@/types/chat"
import { toast } from "sonner"

interface FriendState {
  friends: Friend[]
  sentRequests: FriendRequest[]
  receivedRequests: FriendRequest[]
  loading: boolean
}

interface FriendAction {
  fetchFriends: () => Promise<void>
  fetchFriendRequests: () => Promise<void>
  sendFriendRequest: (receiverId: string, message?: string) => Promise<void>
  acceptFriendRequest: (requestId: string) => Promise<void>
  declineFriendRequest: (requestId: string) => Promise<void>
  reset: () => void
}

export const useFriendStore = create<FriendState & FriendAction>()(
  (set) => ({
    // state
    friends: [],
    sentRequests: [],
    receivedRequests: [],
    loading: false,

    // actions
    fetchFriends: async () => {
      try {
        set({ loading: true })
        const { friends } = await friendService.getAllFriends()
        set({ friends, loading: false })
      } catch (error) {
        console.error("Failed to fetch friends:", error)
        set({ loading: false })
      }
    },

    fetchFriendRequests: async () => {
      try {
        set({ loading: true })
        const { sentRequests, receivedRequests } =
          await friendService.getFriendRequests()
        set({ sentRequests, receivedRequests, loading: false })
      } catch (error) {
        console.error("Failed to fetch friend requests:", error)
        set({ loading: false })
      }
    },

    sendFriendRequest: async (receiverId: string, message?: string) => {
      try {
        const { friendRequest } = await friendService.sendFriendRequest({
          receiverId,
          message,
        })
        set((state) => ({
          sentRequests: [...state.sentRequests, friendRequest],
        }))
        toast.success("Đã gửi lời mời kết bạn")
      } catch (error) {
        console.error("Failed to send friend request:", error)
        const message = (error as { response?: { data?: { message?: string } } })?.response?.data?.message
        toast.error(message || "Lỗi khi gửi lời mời kết bạn")
      }
    },

    acceptFriendRequest: async (requestId: string) => {
      try {
        const { newFriend } = await friendService.acceptFriendRequest(requestId)
        set((state) => ({
          friends: [...state.friends, newFriend],
          receivedRequests: state.receivedRequests.filter(
            (req) => req._id !== requestId
          ),
        }))
        toast.success("Đã chấp nhận lời mời kết bạn")
      } catch (error) {
        console.error("Failed to accept friend request:", error)
        toast.error("Lỗi khi chấp nhận lời mời kết bạn")
      }
    },

    declineFriendRequest: async (requestId: string) => {
      try {
        await friendService.declineFriendRequest(requestId)
        set((state) => ({
          receivedRequests: state.receivedRequests.filter(
            (req) => req._id !== requestId
          ),
        }))
        toast.success("Đã từ chối lời mời kết bạn")
      } catch (error) {
        console.error("Failed to decline friend request:", error)
        toast.error("Lỗi khi từ chối lời mời kết bạn")
      }
    },

    reset: () => {
      set({
        friends: [],
        sentRequests: [],
        receivedRequests: [],
        loading: false,
      })
    },
  })
)
