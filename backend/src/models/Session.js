import mongoose from "mongoose"

// session schema để lưu thông tin phiên đăng nhập
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
