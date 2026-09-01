import express from 'express'
import { getAllProduct, getProduct, postProduct, updateProduct, deleteProduct } from '../../controller/productController.js'
import { upload } from '../../config/cloudinary.js'

const productRouter = express.Router()

productRouter.route('/')
  .get(getAllProduct)
  .post(upload.single("image"), postProduct)
  .put(updateProduct)
  .delete(deleteProduct)

productRouter.route('/:id')
  .get(getProduct)


export default productRouter