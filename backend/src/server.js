import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import cookieParser from "cookie-parser"
import { connectDB } from "./libs/db.js"
import { protectedRoute } from "./middlewares/authMiddleware.js"
import authRoute from "./routes/authRoute.js"
import userRoute from "./routes/userRoute.js"
import friendRouter from "./routes/friendRoute.js"
import messageRouter from "./routes/messageRoute.js"
import conversationRouter from "./routes/conversationRoute.js"

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5001

// Middleware
app.use(express.json())
app.use(cookieParser())
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true, // cho phép gửi cookie từ client đến server
  })
)

// public routes
app.use("/api/auth", authRoute)

// private routes
app.use(protectedRoute) // đặt ở đây vì các route sau đều cần xác thực
app.use("/api/users", userRoute)
app.use("/api/friends", friendRouter)
app.use("/api/messages", messageRouter)
app.use("/api/conversations", conversationRouter)

connectDB(process.env.MONGODB_CONNECTION_STRING).then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
  })
})
