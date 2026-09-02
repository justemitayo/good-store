import mongoose, {Schema} from "mongoose";


const productSchema = new Schema({
  name:{
    type: String,
    required: true
  }, 
  category: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  description: {
    type: String,
  },
  quantity: {
    type: Number,
  },
  image: {
    url: String,
    publicId: String
  },
  option: [
    {
      title: String, 
      value: [String]
    }
  ]
}, {timestamps: true})

export default mongoose.model('product', productSchema)