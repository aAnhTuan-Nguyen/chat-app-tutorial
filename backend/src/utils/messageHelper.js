export const updateConversationAfterCreateMessage = (
  conversation,
  message,
  senderId
) => {
  // Cập nhật thông tin cuộc trò chuyện
  conversation.set({
    seenBy: [],
    lastMessageAt: message.createdAt,
    lastMessage: {
      _id: message._id,
      content: message.content,
      senderId,
      createdAt: message.createdAt,
    },
  })
  // Tăng unreadCount cho tất cả người tham gia trừ người gửi
  conversation.participants.forEach((participant) => {
    const userId = participant.userId.toString()
    if (userId !== senderId.toString()) {
      const currentCount = conversation.unreadCount.get(userId) || 0
      conversation.unreadCount.set(userId, currentCount + 1)
    }
  })
}
