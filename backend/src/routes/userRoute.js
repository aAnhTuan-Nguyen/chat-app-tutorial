import express from "express"
import { authMe } from "../controllers/userController.js"

const userRouter = express.Router()

userRouter.get("/me", authMe)

export default userRouter
