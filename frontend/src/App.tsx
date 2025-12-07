import { BrowserRouter, Route, Routes } from "react-router"
import ChatAppPage from "./pages/ChatAppPage"
import SignInPage from "./pages/SignInPage"
import SignUpPage from "./pages/SignUpPage"
import { Toaster } from "sonner"
import ProtectedRoute from "@/components/auth/ProtectedRoute"
import { userThemeStore } from "@/stores/useThemeStore"
import { useEffect } from "react"
import { useSocketStore } from "@/stores/useSoketStore"
import { useAuthStore } from "@/stores/useAuthStore"
import NotFoundPage from "@/pages/NotFoundPage"
function App() {
  const { isDark } = userThemeStore()
  const { accessToken } = useAuthStore()
  const { connectSocket, disconnectSocket } = useSocketStore()

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [isDark])

  useEffect(() => {
    if (accessToken) connectSocket()

    return () => disconnectSocket()
  }, [accessToken, connectSocket, disconnectSocket])

  return (
    <>
      <Toaster richColors duration={3000} position="top-right" />
      <BrowserRouter>
        <Routes>
          {/* public routes */}
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/signup" element={<SignUpPage />} />

          {/* protected routes */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <ChatAppPage />
              </ProtectedRoute>
            }
          />
          {/* 404 not found */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
