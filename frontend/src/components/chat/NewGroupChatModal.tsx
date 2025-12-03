import { useState, useEffect } from "react"
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
import { Plus } from "lucide-react"
import { useFriendStore } from "@/stores/useFriendStore"
import { useChatStore } from "@/stores/useChatStore"
import { chatService } from "@/services/chatService"
import { toast } from "sonner"
import UserAvatar from "@/components/chat/UserAvatar"

const NewGroupChatModal = () => {
  const [open, setOpen] = useState(false)
  const [groupName, setGroupName] = useState("")
  const [selectedFriends, setSelectedFriends] = useState<string[]>([])
  const [creating, setCreating] = useState(false)
  const { friends, fetchFriends } = useFriendStore()
  const { addConversation, setActiveConversationId } = useChatStore()

  useEffect(() => {
    if (open && friends.length === 0) {
      fetchFriends()
    }
  }, [open, friends.length, fetchFriends])

  const toggleFriend = (friendId: string) => {
    setSelectedFriends((prev) =>
      prev.includes(friendId)
        ? prev.filter((id) => id !== friendId)
        : [...prev, friendId]
    )
  }

  const handleCreate = async () => {
    if (!groupName.trim()) {
      toast.error("Vui lòng nhập tên nhóm")
      return
    }

    if (selectedFriends.length < 2) {
      toast.error("Vui lòng chọn ít nhất 2 thành viên")
      return
    }

    setCreating(true)
    try {
      const conversation = await chatService.createConversation({
        type: "group",
        name: groupName,
        memberIds: selectedFriends,
      })
      addConversation(conversation)
      setActiveConversationId(conversation._id)
      toast.success("Tạo nhóm thành công")
      setOpen(false)
      setGroupName("")
      setSelectedFriends([])
    } catch (error) {
      console.error("Create group error:", error)
      toast.error("Lỗi khi tạo nhóm")
    } finally {
      setCreating(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <Plus className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Tạo nhóm chat mới</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="groupName">Tên nhóm</Label>
            <Input
              id="groupName"
              placeholder="Nhập tên nhóm..."
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label>Chọn thành viên ({selectedFriends.length} đã chọn)</Label>
            <div className="space-y-2 max-h-[300px] overflow-y-auto border rounded-lg p-2">
              {friends.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-4">
                  Chưa có bạn bè nào
                </p>
              ) : (
                friends.map((friend) => (
                  <div
                    key={friend._id}
                    className="flex items-center justify-between p-2 hover:bg-muted rounded-lg cursor-pointer"
                    onClick={() => toggleFriend(friend._id)}
                  >
                    <div className="flex items-center gap-3">
                      <UserAvatar
                        type="sidebar"
                        name={friend.displayName}
                        avatarUrl={friend.avatarUrl || undefined}
                      />
                      <p className="font-medium">{friend.displayName}</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={selectedFriends.includes(friend._id)}
                      onChange={() => toggleFriend(friend._id)}
                      className="w-4 h-4"
                    />
                  </div>
                ))
              )}
            </div>
          </div>

          <Button
            onClick={handleCreate}
            disabled={
              creating || !groupName.trim() || selectedFriends.length < 2
            }
            className="w-full"
          >
            {creating ? "Đang tạo..." : "Tạo nhóm"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default NewGroupChatModal
