export interface User {
  _id: string
  username: string
  email: string
  displayName: string
  phone?: string
  avatarUrl?: string
  bio?: string
  createdAt: string
  updatedAt: string
}

export type UserSignInData = {
  username: string
  password: string
}

export type UserSignUpData = {
  username: string
  password: string
  email: string
  firstName: string
  lastName: string
}

export interface Friend {
  _id: string
  username: string
  displayName: string
  avatarUrl?: string
}

export interface FriendRequest {
  _id: string
  senderId: string
  receiverId: string
  message?: string
  createdAt: string
  sender?: {
    username: string
    displayName: string
    avatarUrl?: string
  }
}
