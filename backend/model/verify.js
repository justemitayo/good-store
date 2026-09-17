import mongoose, { Schema } from "mongoose";

const VerifyOTPSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  otp: {
    type: String,
    required: true 
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  expiresAt: {
    type: Date,
    default: () => new Date(Date.now() + 5 * 60 * 1000),
    expires: 0
  }

})

export default mongoose.model('verify', VerifyOTPSchema)