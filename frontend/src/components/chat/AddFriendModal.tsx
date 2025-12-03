import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { UserPlus, Search } from "lucide-react"
import { useFriendStore } from "@/stores/useFriendStore"
import { toast } from "sonner"
import api from "@/lib/axios"
import UserAvatar from "@/components/chat/UserAvatar"
import type { User } from "@/types/user"

const AddFriendModal = () => {
  const [open, setOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState<User[]>([])
  const [searching, setSearching] = useState(false)
  const { sendFriendRequest, friends } = useFriendStore()

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      toast.error("Vui lòng nhập tên người dùng")
      return
    }

    setSearching(true)
    try {
      const response = await api.get(`/users/search?query=${searchQuery}`)
      setSearchResults(response.data.users || [])
      if (response.data.users.length === 0) {
        toast.info("Không tìm thấy người dùng")
      }
    } catch (error) {
      console.error("Search error:", error)
      toast.error("Lỗi khi tìm kiếm")
    } finally {
      setSearching(false)
    }
  }

  const handleSendRequest = async (receiverId: string) => {
    await sendFriendRequest(receiverId)
    setSearchResults([])
    setSearchQuery("")
  }

  const isFriend = (userId: string) => {
    return friends.some((friend) => friend._id === userId)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <UserPlus className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Thêm bạn bè</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="search">Tìm kiếm theo tên người dùng</Label>
            <div className="flex gap-2">
              <Input
                id="search"
                placeholder="Nhập tên..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              />
              <Button onClick={handleSearch} disabled={searching}>
                <Search className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {searchResults.length > 0 && (
            <div className="space-y-2">
              <Label>Kết quả tìm kiếm</Label>
              <div className="space-y-2 max-h-[300px] overflow-y-auto">
                {searchResults.map((user) => (
                  <div
                    key={user._id}
                    className="flex items-center justify-between p-3 border rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <UserAvatar
                        type="sidebar"
                        name={user.displayName}
                        avatarUrl={user.avatarUrl || undefined}
                      />
                      <div>
                        <p className="font-medium">{user.displayName}</p>
                        <p className="text-sm text-muted-foreground">
                          @{user.username}
                        </p>
                      </div>
                    </div>
                    {isFriend(user._id) ? (
                      <Button disabled variant="outline" size="sm">
                        Đã là bạn bè
                      </Button>
                    ) : (
                      <Button
                        onClick={() => handleSendRequest(user._id)}
                        size="sm"
                      >
                        Gửi lời mời
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default AddFriendModal
