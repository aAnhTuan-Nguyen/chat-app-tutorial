import mongoose from "mongoose"

// friend schema để lưu thông tin bạn bè
const friendSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    friendId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
)
// chuẩn hóa dư liệu trước khi lưu
// chỉ cần lưu một chiều (userId -> friendId)
friendSchema.pre("save", function (next) {
  const userId = this.userId.toString()
  const friendId = this.friendId.toString()
  if (userId > friendId) {
    // nếu userId > friendId thì hoán đổi
    ;[this.userId, this.friendId] = [this.friendId, this.userId]
  }
  next()
})
// đảm bảo không có bạn bè trùng lặp
friendSchema.index({ userId: 1, friendId: 1 }, { unique: true })

const Friend = mongoose.model("Friend", friendSchema)
export default Friend
