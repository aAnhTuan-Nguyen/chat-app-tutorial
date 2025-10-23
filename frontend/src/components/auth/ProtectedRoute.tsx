import { useAuthStore } from "@/stores/useAuthStore"
import { Navigate } from "react-router"

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { accessToken } = useAuthStore()
  //   const Navigate = useNavigate()

  if (!accessToken) {
    return <Navigate to="/signin" replace />
  }
  // c1 dùng outlet vì outlet sẽ render các route con bên trong
  //   return <Outlet />

  // c2 dùng children props
  return <>{children}</>
}

export default ProtectedRoute
