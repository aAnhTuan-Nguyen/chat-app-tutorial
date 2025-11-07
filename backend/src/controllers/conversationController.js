import Conversation from "../models/Conversation.js"
import Message from "../models/Message.js"

// Tạo cuộc trò chuyện mới có thể là cuộc trò chuyện riêng tư hoặc nhóm
export const createConversation = async (req, res) => {
  try {
    const { type, name, memberIds } = req.body
    const userId = req.user._id

    // Kiểm tra loại cuộc trò chuyện
    if (!type || (type !== "direct" && type !== "group")) {
      return res
        .status(400)
        .json({ message: "Loại cuộc trò chuyện không hợp lệ" })
    }

    // Kiểm tra memberIds
    if (!Array.isArray(memberIds) || memberIds.length === 0) {
      return res.status(400).json({ message: "Thiếu thông tin thành viên" })
    }

    // Kiểm tra riêng cho từng loại
    if (type === "direct" && memberIds.length !== 1) {
      return res
        .status(400)
        .json({ message: "Cuộc trò chuyện trực tiếp chỉ có 2 người" })
    }

    if (type === "group" && (!name || memberIds.length < 2)) {
      return res
        .status(400)
        .json({ message: "Nhóm cần có tên và ít nhất 2 thành viên" })
    }

    let conversation = null

    if (type === "direct") {
      const participantId = memberIds[0]

      conversation = await Conversation.findOne({
        type: "direct",
        "participants.userId": { $all: [userId, participantId] },
      })

      if (!conversation) {
        conversation = new Conversation({
          type: "direct",
          participants: [{ userId }, { userId: participantId }],
          lastMessageAt: new Date(),
        })
        await conversation.save()
      }
    } else if (type === "group") {
      // Tạo cuộc trò chuyện nhóm mới
      const participants = memberIds.map((id) => ({ userId: id }))
      participants.push({ userId }) // Thêm người tạo nhóm vào danh sách thành viên

      conversation = new Conversation({
        type: "group",
        participants,
        group: {
          name,
          createdBy: userId,
          createdAt: new Date(),
        },
        lastMessageAt: new Date(),
      })
      await conversation.save()
    }

    await conversation.populate([
      { path: "participants.userId", select: "displayName avatarUrl" },
      { path: "seenBy", select: "displayName avatarUrl" },
      { path: "lastMessage.senderId", select: "displayName avatarUrl" },
    ])

    res.status(201).json(conversation)
  } catch (error) {
    console.error("Lỗi khi tạo cuộc trò chuyện:", error)
    res.status(500).json({ message: "Lỗi máy chủ khi tạo cuộc trò chuyện" })
  }
}

export const getConversations = async (req, res) => {
  try {
    const userId = req.user._id
    const conversations = await Conversation.find({
      "participants.userId": userId,
    })
      .sort({ lastMessageAt: -1, updatedAt: -1 })
      .populate([
        { path: "participants.userId", select: "displayName avatarUrl" },
        { path: "lastMessage.senderId", select: "displayName avatarUrl" },
        { path: "seenBy", select: "displayName avatarUrl" },
      ])
    console.log(conversations)
    const formattedConversations = conversations.map((conv) => {
      const participants = conv.participants.map((p) => ({
        userId: p.userId._id,
        displayName: p.userId.displayName,
        avatarUrl: p.userId.avatarUrl,
        joinedAt: p.joinedAt,
      }))
      return {
        ...conv.toObject(),
        unreadCount: conv.unreadCount || {},
        participants,
      }
    })
    console.log(formattedConversations)

    res.status(200).json(formattedConversations)
  } catch (error) {
    console.error("Lỗi khi lấy danh sách cuộc trò chuyện:", error)
    res
      .status(500)
      .json({ message: "Lỗi máy chủ khi lấy danh sách cuộc trò chuyện" })
  }
}

// lấy tin nhắn trong một cuộc trò chuyện dùng phân trang
export const getMessages = async (req, res) => {
  try {
    const { conversationId } = req.params
    const { limit = 20, cursor } = req.query

    const query = { conversationId }

    // Nếu có cursor, lấy tin nhắn cũ hơn cursor
    if (cursor) {
      query.createdAt = { $lt: new Date(cursor) }
    }

    const messages = await Message.find(query)
      .sort({ createdAt: -1 })
      .limit(parseInt(limit) + 1)

    if (messages.length > limit) {
      messages.pop()
    }

    const nextCursor =
      messages.length > 0
        ? messages[messages.length - 1].createdAt.toISOString()
        : null

    messages.reverse()

    res.json({ messages, nextCursor })
  } catch (error) {
    console.error("Lỗi khi lấy tin nhắn:", error)
    res.status(500).json({ message: "Lỗi máy chủ khi lấy tin nhắn" })
  }
}
