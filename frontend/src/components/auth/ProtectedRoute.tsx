import { useAuthStore } from "@/stores/useAuthStore"
import { useEffect, useState } from "react"
import { Navigate } from "react-router"

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { accessToken, user, loading, refreshToken, fetchMe } = useAuthStore()
  const [started, setStarted] = useState(true)
  const init = async () => {
    // có thể xảy ra khi load lại trang

    if (!accessToken) {
      try {
        await refreshToken()
      } catch (error) {
        console.error("Lỗi làm mới token:", error)
      }
    }

    if (accessToken && !user) {
      try {
        await fetchMe()
      } catch (error) {
        console.error("Lỗi lấy thông tin người dùng:", error)
      }
    }
    setStarted(false)
  }

  useEffect(() => {
    init()
  }, [])

  if (loading || started) {
    return (
      <div className="flex h-screen items-center justify-center">
        Loading...
      </div>
    )
  }
  if (!accessToken) {
    return <Navigate to="/signin" replace />
  }
  // c1 dùng outlet vì outlet sẽ render các route con bên trong
  //   return <Outlet />

  // c2 dùng children props
  return <>{children}</>
}

export default ProtectedRoute
