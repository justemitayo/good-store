import express from 'express'
import { getAllProduct, getProduct, postProduct, updateProduct, deleteProduct } from '../../controller/productController.js'
import { upload } from '../../config/cloudinary.js'
import verifyJWT from '../../middleware/verifyJWT.js'
import verifyRole from '../../middleware/verifyRole.js'
import ROLES_LIST from '../../config/Role_List.js'

const productRouter = express.Router()




productRouter.route('/:id')
  .get(getProduct)
  .put(verifyRole(ROLES_LIST.Editor), verifyJWT, upload.single("image"), updateProduct)
  .delete(verifyRole(ROLES_LIST.Editor), verifyJWT, deleteProduct)

  
  productRouter.route('/')
  .get(getAllProduct)
  .post(verifyRole(ROLES_LIST.Editor), verifyJWT, upload.single("image"), postProduct)

export default productRouter