import api from "@/lib/axios"
import type { UserSignInData, UserSignUpData } from "@/types/user"

// sử dụng object vì nó dể
export const authService = {
  signUp: async (data: UserSignUpData) => {
    const response = await api.post("/auth/signup", data)
    return response.data
  },

  signIn: async (data: UserSignInData) => {
    const response = await api.post("/auth/signin", data)
    return response.data
  },

  signOut: async () => {
    const response = await api.post("/auth/signout")
    return response.data
  },

  fetchMe: async () => {
    const response = await api.get("/users/me")
    return response.data
  },
}
