import mongoose from "mongoose"

export const connectDB = async (connectionString) => {
  try {
    await mongoose.connect(connectionString)
    console.log("MongoDB connected successfully")
  } catch (error) {
    console.error("MongoDB connection error:", error)
    process.exit(1)
  }
}
