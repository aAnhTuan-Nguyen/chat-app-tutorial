import api from "@/lib/axios"
import type { Friend, FriendRequest } from "@/types/chat"

export const friendService = {
  async sendFriendRequest(payload: {
    receiverId: string
    message?: string
  }): Promise<{ message: string; friendRequest: FriendRequest }> {
    const response = await api.post("/friends/requests", payload)
    return response.data
  },

  async acceptFriendRequest(requestId: string): Promise<{
    message: string
    newFriend: Friend
  }> {
    const response = await api.post(`/friends/requests/${requestId}/accept`)
    return response.data
  },

  async declineFriendRequest(requestId: string): Promise<void> {
    await api.post(`/friends/requests/${requestId}/decline`)
  },

  async getAllFriends(): Promise<{ friends: Friend[] }> {
    const response = await api.get("/friends")
    return response.data
  },

  async getFriendRequests(): Promise<{
    sentRequests: FriendRequest[]
    receivedRequests: FriendRequest[]
  }> {
    const response = await api.get("/friends/requests")
    return response.data
  },
}
