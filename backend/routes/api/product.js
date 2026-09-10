import express from 'express'
import { getAllProduct, getProduct, postProduct, updateProduct, deleteProduct } from '../../controller/productController.js'
import { upload } from '../../config/cloudinary.js'

const productRouter = express.Router()




productRouter.route('/:id')
  .get(getProduct)
  .put(upload.single("image"), updateProduct)
  .delete(deleteProduct)

  
  productRouter.route('/')
  .get(getAllProduct)
  .post(upload.single("image"), postProduct)

export default productRouter