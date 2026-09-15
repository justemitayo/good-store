import express from 'express'
import { handleLogout, handleRefresh, registerUser, handeLogin } from '../../controller/authController.js'

const userRouter = express.Router()

userRouter.route('/register').post(registerUser)
userRouter.route('/login').post(handeLogin)
userRouter.route('/refresh').get(handleRefresh)
userRouter.route('/logout').post(handleLogout)

export default userRouter