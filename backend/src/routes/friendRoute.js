import express from "express"

import {
  sendFriendRequest,
  acceptFriendRequest,
  declineFriendRequest,
  getAllFriends,
  getFriendRequests,
} from "../controllers/friendController.js"

const friendRouter = express.Router()

friendRouter.post("/requests", sendFriendRequest)

friendRouter.post("/requests/:requestId/accept", acceptFriendRequest)

friendRouter.post("/requests/:requestId/decline", declineFriendRequest)

friendRouter.get("/", getAllFriends)

friendRouter.get("/requests", getFriendRequests)

export default friendRouter
