import mongoose from "mongoose"

// const sessionSchema = new mongoose.Schema({
//   userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
//   createdAt: { type: Date, default: Date.now, expires: "7d" }, // phiên hết hạn sau 7 ngày
//   userAgent: { type: String }, // thông tin trình duyệt hoặc thiết bị
//   ipAddress: { type: String }, // địa chỉ IP của người dùng
// })

const sessionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    refreshToken: {
      type: String,
      required: true,
      unique: true,
    },
    expiresAt: {
      type: Date,
      required: true,
    },
    ipAddress: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
)

// tự động xoá khi hết hạn
sessionSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 })

const Session = mongoose.model("Session", sessionSchema)
export default Session
