import mongoose from "mongoose";

const connectDB = async() => {
  try{
    await mongoose.connect(process.env.DATABASE_URI)
  }catch (err) {
    console.error('MongoDB connection error:', err.message)
  }
}

export default connectDB