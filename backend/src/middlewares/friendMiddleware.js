import Conversation from "../models/Conversation.js"
import Friend from "../models/Friend.js"

const pair = (a, b) => (a < b ? [a, b] : [b, a])

export const checkFriendship = async (req, res, next) => {
  try {
    const userId = req.user._id.toString()
    const { recipientId, memberIds } = req.body

    // Trường hợp 1: Direct chat (tin nhắn trực tiếp)
    if (recipientId) {
      const [smallerId, largerId] = pair(userId, recipientId.toString())

      const friendship = await Friend.findOne({
        userId: smallerId,
        friendId: largerId,
      })

      if (!friendship) {
        return res
          .status(403)
          .json({ message: "Bạn chưa kết bạn với người này" })
      }

      return next()
    }

    // Trường hợp 2: Group chat (nhóm)
    if (memberIds && memberIds.length > 0) {
      for (const memberId of memberIds) {
        if (memberId.toString() === userId) continue

        const [smallerId, largerId] = pair(userId, memberId.toString())
        const friendship = await Friend.findOne({
          userId: smallerId,
          friendId: largerId,
        })

        if (!friendship) {
          return res.status(403).json({
            message: `Bạn chưa kết bạn với người dùng ${memberId}`,
          })
        }
      }

      return next()
    }

    // Không có recipientId hoặc memberIds
    return res
      .status(400)
      .json({ message: "Thiếu thông tin recipientId hoặc memberIds" })
  } catch (error) {
    console.error("Lỗi trong middleware xác minh bạn bè:", error)
    res
      .status(500)
      .json({ message: "Lỗi máy chủ trong quá trình xác minh bạn bè" })
  }
}

export const checkGroupMembership = async (req, res, next) => {
  try {
    const userId = req.user._id.toString()
    const { conversationId } = req.body

    if (!conversationId) {
      return res.status(400).json({ message: "Thiếu conversationId" })
    }

    const conversation = await Conversation.findById(conversationId)
    if (!conversation) {
      return res.status(404).json({ message: "Cuộc trò chuyện không tồn tại" })
    }

    if (conversation.type !== "group") {
      return res
        .status(400)
        .json({ message: "Không phải cuộc trò chuyện nhóm" })
    }

    const isMember = conversation.participants.some(
      (p) => p.userId.toString() === userId
    )

    if (!isMember) {
      return res
        .status(403)
        .json({ message: "Bạn không phải là thành viên của nhóm" })
    }

    req.conversation = conversation
    next()
  } catch (error) {
    console.error("Lỗi trong middleware kiểm tra thành viên nhóm:", error)
    res
      .status(500)
      .json({ message: "Lỗi máy chủ trong quá trình kiểm tra thành viên nhóm" })
  }
}
