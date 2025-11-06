import mongoose from "mongoose"

// friend request schema để lưu thông tin lời mời kết bạn
const friendRequestSchema = new mongoose.Schema(
  {
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    receiverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    message: {
      type: String,
      maxlength: 300,
      trim: true,
    },
    // thêm status ko cần thiết vì mình có dữ lại để làm gì đâu
    // với lại xóa đi sau khi chấp nhận hoặc từ chối sẽ gọn hơn cho DB
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
)

// đảm bảo không có lời mời kết bạn trùng lặp
friendRequestSchema.index({ senderId: 1, receiverId: 1 }, { unique: true })
// giúp tìm kiếm nhanh lời mời đã gửi và lời mời nhận
friendRequestSchema.index({ receiverId: 1, status: 1 })

friendRequestSchema.index({ senderId: 1, status: 1 })

const FriendRequest = mongoose.model("FriendRequest", friendRequestSchema)
export default FriendRequest
