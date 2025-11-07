import express from "express"
import { apiReference } from "@scalar/express-api-reference"
import { readFileSync } from "fs"
import { fileURLToPath } from "url"
import { dirname, join } from "path"
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

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// Load OpenAPI spec
const openApiSpec = JSON.parse(
  readFileSync(join(__dirname, "config", "openapi.json"), "utf-8")
)

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

// Scalar API Documentation
app.use(
  "/api-docs",
  apiReference({
    spec: {
      content: openApiSpec,
    },
    theme: "deepSpace",
    metaData: {
      title: "Moji Chat API Documentation",
    },
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
    console.log(`Server running on port ${PORT}`)
    console.log(`API Documentation: http://localhost:${PORT}/api-docs`)
  })
})
