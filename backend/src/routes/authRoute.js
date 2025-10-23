import express from "express"
import {
  signUp,
  signIn,
  signOut,
  refreshToken,
} from "../controllers/authController.js"

const authRouter = express.Router()

authRouter.post("/signup", signUp)

authRouter.post("/signin", signIn)

authRouter.post("/signout", signOut)

authRouter.post("/refresh-token", refreshToken)

export default authRouter
