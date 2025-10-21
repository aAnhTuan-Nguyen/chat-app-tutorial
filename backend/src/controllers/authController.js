import User from "../models/User.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import crypto from "crypto"
import Session from "../models/Session.js"

const ACCESS_TOKEN_TTL = "30m"
const REFRESH_TOKEN_TTL = 14 * 24 * 60 * 60 * 1000 // 14 ngày

export const signUp = async (req, res) => {
  try {
    const { username, password, email, firstName, lastName } = req.body
    if (!username || !password || !email || !firstName || !lastName) {
      return res.status(400).json({
        message:
          "Không thể thiếu username, password, email, first name, last name",
      })
    }
    // kiểm tra username đã tồn tại chưa
    const duplicated = await User.findOne({ username })
    if (duplicated) {
      return res.status(409).json({ message: "User name đã được sử dụng" })
    }
    // mã hoá password
    const hashedPassword = await bcrypt.hash(password, 10)

    // tạo user mới
    await User.create({
      username,
      hashedPassword,
      email,
      displayName: `${firstName} ${lastName}`,
    })

    return res.status(201).json({ message: "Tạo tài khoản thành công" })
  } catch (error) {
    console.error("Lỗi đăng ký tài khoản:", error)
    return res.status(500).json({ message: "Internal server error" })
  }
}

export const signIn = async (req, res) => {
  try {
    // Lấy thông tin đăng nhập từ req.body
    const { username, password } = req.body
    if (!username || !password) {
      return res
        .status(400)
        .json({ message: "Username và password là bắt buộc" })
    }

    // lấy hashedPassword từ database để so sánh
    const user = await User.findOne({ username })
    if (!user) {
      return res
        .status(401)
        .json({ message: "Username hoặc password không đúng" })
    }

    // so sánh password
    const isPasswordcorrect = await bcrypt.compare(
      password,
      user.hashedPassword
    )
    if (!isPasswordcorrect) {
      return res
        .status(401)
        .json({ message: "Username hoặc password không đúng" })
    }
    // nếu ok tạo accessToken
    const accessToken = jwt.sign(
      { userId: user._id },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: ACCESS_TOKEN_TTL,
      }
    )

    // tao refreshToken
    const refreshToken = crypto.randomBytes(64).toString("hex")

    await Session.create({
      userId: user._id,
      refreshToken,
      expiresAt: new Date(Date.now() + REFRESH_TOKEN_TTL), // 14 ngày
      ipAddress: req.ip,
    })
    // trả refreshToken về cho client qua cookie
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true, // process.env.NODE_ENV === "production",
      sameSite: "none",
      maxAge: REFRESH_TOKEN_TTL, // 14 ngày
    })

    // trả accessToken về cho client qua body
    return res
      .status(200)
      .json({ message: "Đăng nhập thành công", accessToken })
  } catch (error) {
    console.error("Lỗi đăng nhập:", error)
    return res.status(500).json({ message: "Internal server error" })
  }
}

export const signOut = async (req, res) => {
  try {
    const refreshToken = req.cookies?.refreshToken

    if (refreshToken) {
      // xoá session trong db
      await Session.findOneAndDelete({ refreshToken })
      // xoá cookie
      res.clearCookie("refreshToken")
    }
    return res.status(200).json({ message: "Đăng xuất thành công" })
  } catch (error) {
    console.error("Lỗi đăng xuất:", error)
    return res.status(500).json({ message: "Internal server error" })
  }
}
