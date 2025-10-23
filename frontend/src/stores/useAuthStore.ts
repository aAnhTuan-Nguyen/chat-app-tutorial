import { create } from "zustand"
import { toast } from "sonner"
import { authService } from "@/services/authService"
import type { UserSignInData, UserSignUpData } from "@/types/user"
import type { AuthAction, AuthState } from "@/types/authState"

export const useAuthStore = create<AuthState & AuthAction>((set, get) => ({
  accessToken: null,
  user: null,
  loading: false,

  clearState: () => set({ accessToken: null, user: null }),

  signIn: async (data: UserSignInData) => {
    set({ loading: true })
    try {
      const { accessToken } = await authService.signIn(data)
      set({ accessToken })
      await get().fetchMe()
      toast.success("Chào mừng bạn quay lại với Moji!")
    } catch (error) {
      console.error("Lỗi đăng nhập:", error)
      toast.error("Đăng nhập thất bại. Vui lòng thử lại.")
    } finally {
      set({ loading: false })
    }
  },

  signUp: async (data: UserSignUpData) => {
    set({ loading: true })
    try {
      const response = await authService.signUp(data)
      set({ accessToken: response.accessToken, user: response.user })
      toast.success("Đăng ký thành công!")
    } catch (error) {
      console.error("Lỗi đăng ký:", error)
      toast.error("Đăng ký thất bại. Vui lòng thử lại.")
    } finally {
      set({ loading: false })
    }
  },

  signOut: async () => {
    set({ loading: true })
    try {
      await authService.signOut()
      get().clearState()
      toast.success("Đăng xuất thành công!")
    } catch (error) {
      console.error("Lỗi đăng xuất:", error)
      toast.error("Đăng xuất thất bại. Vui lòng thử lại.")
    } finally {
      set({ loading: false })
    }
  },

  fetchMe: async () => {
    set({ loading: true })
    try {
      const response = await authService.fetchMe()
      set({ user: response.user })
    } catch (error) {
      console.error("Lỗi lấy thông tin người dùng:", error)
      toast.error("Lấy thông tin người dùng thất bại.")
    } finally {
      set({ loading: false })
    }
  },
}))
