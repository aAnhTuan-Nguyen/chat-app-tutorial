import Logout from "@/components/auth/Logout"
import { useAuthStore } from "@/stores/useAuthStore"

const ChatAppPage = () => {
  const user = useAuthStore((state) => state.user)
  return (
    <div className="flex h-svh bg-background">
      ChatAppPage
      <div>Welcome, {user?.displayName}!</div>
      <Logout />
    </div>
  )
}

export default ChatAppPage
