import { create } from "zustand"
import { toast } from "sonner"
import { authService } from "@/services/authService"
import type { UserSignInData, UserSignUpData } from "@/types/user"
import type { AuthAction, AuthState } from "@/types/authState"
import { persist } from "zustand/middleware"

export const useAuthStore = create<AuthState & AuthAction>()(
  persist(
    (set, get) => ({
      // Initial state
      accessToken: null,
      user: null,
      loading: false,

      // Actions
      setAccessToken: (accessToken: string | null) => set({ accessToken }),

      clearState: () => {
        set({ accessToken: null, user: null })
        localStorage.clear()
      },

      signIn: async (data: UserSignInData) => {
        set({ loading: true })

        localStorage.clear()
        try {
          const { accessToken } = await authService.signIn(data)
          get().setAccessToken(accessToken)
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
          const user = await authService.fetchMe()
          set({ user })
        } catch (error) {
          console.error("Lỗi lấy thông tin người dùng:", error)
          toast.error("Lấy thông tin người dùng thất bại.")
        } finally {
          set({ loading: false })
        }
      },

      refreshToken: async () => {
        set({ loading: true })
        const { user, fetchMe, clearState, setAccessToken } = get()
        try {
          const accessToken = await authService.refreshToken()
          setAccessToken(accessToken)
          if (!user) {
            await fetchMe()
          }
        } catch (error) {
          console.error("Lỗi làm mới token:", error)
          toast.error("Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.")
          clearState()
        } finally {
          set({ loading: false })
        }
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        user: state.user,
      }),
    }
  )
)
