import type { User, UserSignInData, UserSignUpData } from "@/types/user"

export type AuthState = {
  accessToken: string | null
  user: User | null
  loading: boolean
}

export type AuthAction = {
  setAccessToken: (accessToken: string | null) => void
  clearState: () => void
  signIn: (data: UserSignInData) => Promise<void>
  signUp: (data: UserSignUpData) => Promise<void>
  signOut: () => Promise<void>
  fetchMe: () => Promise<void>
  refreshToken: () => Promise<void>
}
