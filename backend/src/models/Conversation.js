import mongoose from "mongoose"

// participant schema để lưu thông tin thành viên trong cuộc trò chuyện
const participantsSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    joinedAt: { type: Date, default: Date.now },
  },
  { _id: false }
)

// group schema để lưu thông tin nhóm trò chuyện ai tạo nhóm
const groupSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    createdAt: { type: Date, default: Date.now },
  },
  { _id: false }
)

// last message schema để lưu thông tin tin nhắn cuối cùng
const lastMessageSchema = new mongoose.Schema(
  {
    _id: { type: String },
    senderId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    content: { type: String, default: null },
    createdAt: { type: Date, default: null },
  },
  { _id: false }
)

// conversation schema để lưu thông tin cuộc trò chuyện
const conversationSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["direct", "group"],
      required: true,
    },
    participants: {
      type: [participantsSchema],
      required: true,
    },
    group: { type: groupSchema },
    lastMessageAt: { type: Date },
    seenBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    lastMessage: { type: lastMessageSchema, default: null },
    unreadCount: { type: Map, of: Number, default: {} },
  },
  { timestamps: true }
)

conversationSchema.index({ "participants.userId": 1, lastMessageAt: -1 })

const Conversation = mongoose.model("Conversation", conversationSchema)
export default Conversation
