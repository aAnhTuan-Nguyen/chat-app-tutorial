import express from "express"
import {
  signUp,
  signIn,
  signOut,
  refreshToken,
} from "../controllers/authController.js"

const authRouter = express.Router()

/**
 * Đăng ký tài khoản
 * @route POST /api/auth/signup
 * @body { username, password, email, firstName, lastName }
 * @returns 201 - Tạo tài khoản thành công
 * @returns 400 - Thiếu thông tin bắt buộc
 * @returns 409 - Username đã được sử dụng
 * @returns 500 - Lỗi hệ thống
 */
authRouter.post("/signup", signUp)

/**
 * Đăng nhập
 * @route POST /api/auth/signin
 * @body { username, password }
 * @returns 200 - Đăng nhập thành công
 * @returns 400 - Thiếu thông tin bắt buộc
 * @returns 401 - Username hoặc password không đúng
 * @returns 500 - Lỗi hệ thống
 */
authRouter.post("/signin", signIn)

/**
 * Đăng xuất
 * @route POST /api/auth/signout
 * @body { refreshToken }
 * @returns 200 - Đăng xuất thành công
 * @returns 500 - Lỗi hệ thống
 */
authRouter.post("/signout", signOut)

/**
 * Làm mới access token
 * @route POST /api/auth/refresh-token
 * @body { refreshToken }
 * @returns 200 - Làm mới token thành công
 * @returns 401 - Refresh token không hợp lệ
 * @returns 500 - Lỗi hệ thống
 */
authRouter.post("/refresh-token", refreshToken)

export default authRouter
