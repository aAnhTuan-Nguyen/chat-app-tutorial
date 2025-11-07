import express from "express"
import {
  sendDirectMessage,
  sendGroupMessage,
} from "../controllers/messageController.js"
import {
  checkFriendship,
  checkGroupMembership,
} from "../middlewares/friendMiddleware.js"

const messageRouter = express.Router()

messageRouter.post("/direct", checkFriendship, sendDirectMessage)
messageRouter.post("/group", checkGroupMembership, sendGroupMessage)

export default messageRouter
