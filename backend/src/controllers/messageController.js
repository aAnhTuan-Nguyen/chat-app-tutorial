import Conversation from "../models/Conversation.js"
import Message from "../models/Message.js"
import { updateConversationAfterCreateMessage } from "../utils/messageHelper.js"
export const sendDirectMessage = async (req, res) => {
  try {
    const { recipientId, content, conversationId } = req.body
    const senderId = req.user.id

    if (!content || !recipientId) {
      return res.status(400).json({ message: "Thiếu thông tin tin nhắn" })
    }

    let conversation = null

    // Nếu có conversationId, tìm conversation đó
    if (conversationId) {
      conversation = await Conversation.findById(conversationId)
    }

    // Nếu không có conversationId hoặc không tìm thấy, tìm conversation hiện có
    if (!conversation) {
      conversation = await Conversation.findOne({
        type: "direct",
        "participants.userId": { $all: [senderId, recipientId] },
      })
    }

    // Nếu vẫn không có, tạo mới
    if (!conversation) {
      conversation = await Conversation.create({
        type: "direct",
        participants: [
          { userId: senderId, joinedAt: new Date() },
          { userId: recipientId, joinedAt: new Date() },
        ],
        lastMessageAt: new Date(),
        unreadCount: new Map(),
      })
    }

    // Tạo tin nhắn
    const message = await Message.create({
      conversationId: conversation._id,
      senderId,
      content,
    })

    // Cập nhật cuộc trò chuyện sau khi tạo tin nhắn
    updateConversationAfterCreateMessage(conversation, message, senderId)
    await conversation.save()

    // Populate thông tin sender
    await message.populate("senderId", "displayName avatarUrl")

    res.status(201).json({
      message,
      conversationId: conversation._id, // Trả về conversationId để frontend lưu lại
    })
  } catch (error) {
    console.error("Lỗi khi gửi tin nhắn trực tiếp:", error)
    res.status(500).json({ message: "Lỗi máy chủ khi gửi tin nhắn trực tiếp" })
  }
}

export const sendGroupMessage = async (req, res) => {
  try {
    const { content } = req.body
    const senderId = req.user.id
    const conversation = req.conversation

    if (!content) {
      return res.status(400).json({ message: "Thiếu nội dung tin nhắn" })
    }

    // Tạo tin nhắn
    const message = await Message.create({
      conversationId: conversation._id,
      senderId,
      content,
    })

    // Cập nhật cuộc trò chuyện sau khi tạo tin nhắn
    updateConversationAfterCreateMessage(conversation, message, senderId)
    await conversation.save()

    // Populate thông tin sender
    await message.populate("senderId", "displayName avatarUrl")

    res.status(201).json({
      message,
      conversationId: conversation._id,
    })
  } catch (error) {
    console.error("Lỗi khi gửi tin nhắn nhóm:", error)
    res.status(500).json({ message: "Lỗi máy chủ khi gửi tin nhắn nhóm" })
  }
}
