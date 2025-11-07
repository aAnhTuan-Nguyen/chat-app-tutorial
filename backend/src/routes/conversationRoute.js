import express from "express"

import {
  createConversation,
  getConversations,
  getMessages,
} from "../controllers/conversationController.js"
import { checkFriendship } from "../middlewares/friendMiddleware.js"

const conversationRouter = express.Router()

conversationRouter.post("/", checkFriendship, createConversation)
conversationRouter.get("/", getConversations)
conversationRouter.get("/:conversationId/messages", getMessages)

export default conversationRouter
