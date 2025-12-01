import api from "@/lib/axios"
import type { User, UserSignInData, UserSignUpData } from "@/types/user"

// sử dụng object vì nó dể
export const authService = {
  signUp: async (data: UserSignUpData): Promise<void> => {
    const response = await api.post("/auth/signup", data)
    return response.data
  },

  signIn: async (
    data: UserSignInData
  ): Promise<{ accessToken: string; user: User }> => {
    const response = await api.post("/auth/signin", data)
    return response.data
  },

  signOut: async (): Promise<void> => {
    await api.post("/auth/signout")
  },

  fetchMe: async (): Promise<User> => {
    const response = await api.get("/users/me")
    return response.data.user
  },

  refreshToken: async (): Promise<string> => {
    const response = await api.post("/auth/refresh-token")
    return response.data.accessToken
  },
}
