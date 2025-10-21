import { BrowserRouter, Route, Routes } from "react-router"
import ChatAppPage from "./pages/ChatAppPage"
import SignInPage from "./pages/SignInPage"
import SignUpPage from "./pages/SignUpPage"
import { Toaster } from "sonner"
function App() {
  return (
    <>
      <Toaster richColors duration={3000} position="top-right" />
      <BrowserRouter>
        <Routes>
          {/* public routes */}
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/signup" element={<SignUpPage />} />

          {/* protected routes */}
          <Route path="/" element={<ChatAppPage />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
