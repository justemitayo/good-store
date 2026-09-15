import express from 'express'
import { getAllProduct, getProduct, postProduct, updateProduct, deleteProduct } from '../../controller/productController.js'
import { upload } from '../../config/cloudinary.js'
import verifyJWT from '../../middleware/verifyJWT.js'

const productRouter = express.Router()




productRouter.route('/:id')
  .get(getProduct)
  .put(verifyJWT, upload.single("image"), updateProduct)
  .delete(verifyJWT, deleteProduct)

  
  productRouter.route('/')
  .get(getAllProduct)
  .post(verifyJWT, upload.single("image"), postProduct)

export default productRouter