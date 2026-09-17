import express from 'express'
import { handleLogout, handleRefresh, registerUser, handeLogin, SendOTP, verifyOTP, resetPassWord, resetPasswordOTP } from '../../controller/authController.js'
import { loginLimit } from '../../config/loginLimit.js'

const userRouter = express.Router()


userRouter.route('/sendOTP').post(SendOTP)
userRouter.route('/verify').post(verifyOTP)
userRouter.route('/resetOTP').post(resetPasswordOTP)
userRouter.route('/resetPassword').post(resetPassWord)
userRouter.route('/register').post(registerUser)
userRouter.route('/login').post(loginLimit, handeLogin)
userRouter.route('/refresh').get(handleRefresh)
userRouter.route('/logout').post(handleLogout)

export default userRouter