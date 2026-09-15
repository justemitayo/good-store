import mongoose, { Schema } from 'mongoose'

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    trim: true
  },
  password: {
    type: String,
  },
  email: {
    type: String, 
    required: true,
    lowercase: true, 
    trim: true
  },
  RefreshToken: String
}, {timestamps: true}) //automatically adds createdAt and updatedAt 

export default mongoose.model('User', UserSchema )