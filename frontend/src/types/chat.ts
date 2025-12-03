export interface Participant {
  userId: string
  displayName: string
  avatarUrl?: string | null
  joinedAt: string
}

export interface SeenUser {
  _id: string
  displayName?: string
  avatarUrl?: string | null
}

export interface Group {
  name: string
  createdBy: string
  createdAt: string
}

export interface LastMessage {
  _id: string
  content: string
  createdAt: string
  senderId: {
    _id: string
    displayName: string
    avatarUrl?: string | null
  }
}

export interface Conversation {
  _id: string
  type: "direct" | "group"
  group?: Group
  participants: Participant[]
  lastMessageAt: string
  seenBy: SeenUser[]
  lastMessage: LastMessage | null
  unreadCount: Record<string, number> // key = userId, value = unread count
  createdAt: string
  updatedAt: string
}

export interface ConversationResponse {
  conversations: Conversation[]
}

export interface Message {
  _id: string
  conversationId: string
  senderId: {
    _id: string
    displayName: string
    avatarUrl?: string | null
  }
  content: string | null
  imgUrl?: string | null
  updatedAt?: string | null
  createdAt: string
  isOwn?: boolean
}

export interface Friend {
  _id: string
  displayName: string
  avatarUrl?: string | null
}

export interface FriendRequest {
  _id: string
  senderId: {
    _id: string
    username: string
    displayName: string
    avatarUrl?: string | null
  }
  receiverId: {
    _id: string
    username: string
    displayName: string
    avatarUrl?: string | null
  }
  message?: string
  createdAt: string
}

export interface CreateConversationPayload {
  type: "direct" | "group"
  name?: string
  memberIds: string[]
}

export interface SendMessagePayload {
  recipientId?: string
  conversationId?: string
  content: string
}

export interface SendGroupMessagePayload {
  conversationId: string
  content: string
}
