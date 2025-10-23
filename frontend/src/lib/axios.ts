import { useAuthStore } from "@/stores/useAuthStore"
import axios from "axios"

const api = axios.create({
  baseURL:
    import.meta.env.MODE === "development"
      ? `${import.meta.env.VITE_SERVER_URL}/api`
      : "/api",
  withCredentials: true, // cho phép gửi cookie cùng với các yêu cầu
})

// Thêm interceptor để tự động thêm access token vào header của mỗi yêu cầu
api.interceptors.request.use((config) => {
  const { accessToken } = useAuthStore.getState()
  if (accessToken) {
    config.headers["Authorization"] = `Bearer ${accessToken}`
  }
  return config
})

api.interceptors.response.use(undefined, async (error) => {
  const originalRequest = error.config

  // nhungwx api ko can check
  if (
    originalRequest.url.includes("/auth/signin") ||
    originalRequest.url.includes("/auth/refresh-token") ||
    originalRequest.url.includes("/auth/signup")
  ) {
    return Promise.reject(error)
  }

  originalRequest._retryCount = originalRequest._retryCount || 0
  // tự động thử làm mới token tối đa 4 lần
  if (error.response.status === 403 && originalRequest._retryCount < 4) {
    originalRequest._retryCount += 1
    try {
      const response = await api.post("/auth/refresh-token")
      const newAccessToken = response.data.accessToken
      useAuthStore.getState().setAccessToken(newAccessToken)

      // cập nhật lại header với access token mới
      originalRequest.headers.Authorization = `Bearer ${newAccessToken}`
      return api(originalRequest)
    } catch (err) {
      useAuthStore.getState().clearState()
      return Promise.reject(err)
    }
  }

  return Promise.reject(error)
})

// tự động refresh token khi access token hết hạn trừ api auth/signin và auth/refresh-token và auth/signup

// Note:
// hiểu nè bản chất cái zustand nó tạo ra cái hook
// nếu dùng bên ngoài component thì phải dùng cách này để lấy state
// const { accessToken } = useAuthStore.getState()
// hook chỉ dùng trong component function thôi

export default api
