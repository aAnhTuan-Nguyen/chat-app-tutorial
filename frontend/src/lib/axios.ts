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

// hiểu nè bản chất cái zustand nó tạo ra cái hook
// nếu dùng bên ngoài component thì phải dùng cách này để lấy state
// const { accessToken } = useAuthStore.getState()
// hook chỉ dùng trong component function thôi

export default api
