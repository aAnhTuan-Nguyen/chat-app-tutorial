import { useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useFriendStore } from "@/stores/useFriendStore"
import UserAvatar from "@/components/chat/UserAvatar"
import { Check, X } from "lucide-react"

const FriendRequestList = () => {
  const {
    receivedRequests,
    fetchFriendRequests,
    acceptFriendRequest,
    declineFriendRequest,
  } = useFriendStore()

  useEffect(() => {
    fetchFriendRequests()
  }, [fetchFriendRequests])

  if (receivedRequests.length === 0) {
    return null
  }

  return (
    <div className="p-4 space-y-2">
      <h3 className="font-semibold text-sm text-muted-foreground">
        Lời mời kết bạn ({receivedRequests.length})
      </h3>
      {receivedRequests.map((request) => (
        <Card key={request._id} className="p-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <UserAvatar
                type="sidebar"
                name={request.senderId.displayName}
                avatarUrl={request.senderId.avatarUrl || undefined}
              />
              <div>
                <p className="font-medium text-sm">
                  {request.senderId.displayName}
                </p>
                <p className="text-xs text-muted-foreground">
                  @{request.senderId.username}
                </p>
                {request.message && (
                  <p className="text-xs text-muted-foreground mt-1">
                    {request.message}
                  </p>
                )}
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                size="icon"
                variant="ghost"
                className="h-8 w-8 text-green-600 hover:text-green-700 hover:bg-green-100"
                onClick={() => acceptFriendRequest(request._id)}
              >
                <Check className="h-4 w-4" />
              </Button>
              <Button
                size="icon"
                variant="ghost"
                className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-100"
                onClick={() => declineFriendRequest(request._id)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
}

export default FriendRequestList
