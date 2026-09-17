import User from '../model/User.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import verify from '../model/verify.js'
import transporter from '../config/nodeMailer.js'



export const SendOTP = async(req, res) => {
  const {email} = req.body ?? {}
  if( !email) {
    return res.status(400).json({success: false, message: "Email is required"})
  }

  const duplicate = await User.findOne({email: email}).exec()

  if(duplicate) {
    return res.sendStatus(409)
  }

  try{

    await verify.deleteOne({ email })
    const otp = Math.floor(100000 + Math.random()* 900000).toString();

    const newOTP = await bcrypt.hash(otp, 10)

    const mailOption = {
      from: process.env.AUTH_EMAIL,
      to: email,
      html:
       `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #f9f9f9; padding: 20px; border-radius: 10px;">
  
          <div style="background-color: #7c3aed; padding: 20px; border-radius: 10px 10px 0 0; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 28px;">Good Store</h1>
          </div>

          <div style="background-color: white; padding: 30px; border-radius: 0 0 10px 10px;">
            <h2 style="color: #333; margin-top: 0;">Verify your email</h2>
            <p style="color: #666; font-size: 16px;">Thanks for signing up! Use the OTP below to verify your email address. It expires in <strong>5 minutes.</strong></p>

            <div style="background-color: #f3f0ff; border: 2px dashed #7c3aed; border-radius: 10px; padding: 20px; text-align: center; margin: 30px 0;">
              <p style="color: #666; margin: 0 0 10px 0; font-size: 14px;">Your OTP code</p>
              <h1 style="color: #7c3aed; font-size: 48px; letter-spacing: 12px; margin: 0;">${otp}</h1>
            </div>

            <p style="color: #666; font-size: 14px;">If you didn't create an account with Good Store, you can safely ignore this email.</p>

          
            <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
            <p style="color: #999; font-size: 12px; text-align: center; margin: 0;">© 2025 Good Store. All rights reserved.</p>
          </div>

        </div>
      `
    }



    await verify.create({
      email,
      otp: newOTP,
    })

    await transporter.sendMail(mailOption)

    res.json({success:true, message: "OTP sent to your email. Please check your inbox to verify your account.", data: {email}}) 
  }catch (err) {
    res.status(500).json({success:false, message: err.message })
  }
}

export const verifyOTP = async(req, res) => {
  const {email, otp} = req.body ?? {} 

  if (!email || !otp) {
    return res.status(400).json({
      success: false,
      message: 'email and otp are required'
    })
  }


  try{
    const findOTP = await verify.findOne({email: email}).exec()
    if(!findOTP) {
      return res.status(401).json({success: false, message: `OTP not found or expired. Please request a new OTP.`})
    }

    const checkOTP = await bcrypt.compare(otp, findOTP.otp)

    if(!checkOTP){
      return res.status(400).json({success: false, message: 'Incorrect OTP'})
      


    } 
    await verify.deleteOne({email})
    res.json({ success: true, message: 'OTP verified successfully' })

  } catch(err) {
    res.status(500).json({success:false, message: err.message })
  }
}

export const registerUser = async(req, res) => {
  const {email, password, username} = req.body ?? {}

  if(!email || !password || !username) {
    return res.status(400).json({success: false, message: "Email, Username and Password is required"})
  }
  try {
    const duplicate = await User.findOne({email: email}).exec()

    if(duplicate) {
      return res.status(409).json({success: false, message: `Email ${email} already exist`})
    }

    const hashedpwd = await bcrypt.hash(password, 10)

    await User.create({
      email,
      password: hashedpwd,
      username
    })

    res.json({success:true, message: `New User ${username} joined the party!!`})

  } catch(err) {
    res.status(500).json({success:false, message: err.message })
  }
}

export const resetPasswordOTP = async(req, res) => {
  const {email} = req.body ?? {}
  if( !email) {
    return res.status(400).json({success: false, message: "Email is required"})
  }

  try{
    const findUser = await User.findOne({email: email}).exec()
    if(!findUser) {
      return res.status(404).json({success: false, message: `Email ${email} does not exist`})
    }

    await verify.deleteOne({ email })

    const otp = Math.floor(100000 + Math.random()* 900000).toString();

    const newOTP = await bcrypt.hash(otp, 10)

    const mailOption = {
      from: process.env.AUTH_EMAIL,
      to: email,
      html:
       `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #f9f9f9; padding: 20px; border-radius: 10px;">
  
          <div style="background-color: #7c3aed; padding: 20px; border-radius: 10px 10px 0 0; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 28px;">Good Store</h1>
          </div>

          <div style="background-color: white; padding: 30px; border-radius: 0 0 10px 10px;">
            <h2 style="color: #333; margin-top: 0;">Verify your email</h2>
            <p style="color: #666; font-size: 16px;">Thanks for signing up! Use the OTP below to verify your email address. It expires in <strong>5 minutes.</strong></p>

            <div style="background-color: #f3f0ff; border: 2px dashed #7c3aed; border-radius: 10px; padding: 20px; text-align: center; margin: 30px 0;">
              <p style="color: #666; margin: 0 0 10px 0; font-size: 14px;">Your OTP code</p>
              <h1 style="color: #7c3aed; font-size: 48px; letter-spacing: 12px; margin: 0;">${otp}</h1>
            </div>

            <p style="color: #666; font-size: 14px;">If you didn't create an account with Good Store, you can safely ignore this email.</p>

          
            <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
            <p style="color: #999; font-size: 12px; text-align: center; margin: 0;">© 2025 Good Store. All rights reserved.</p>
          </div>

        </div>
      `
    }

    
    await verify.create({
      email,
      otp: newOTP,
    })

    await transporter.sendMail(mailOption)

    res.json({success:true, message: "OTP sent to your email. Please check your inbox to verify your account.", data: {email}}) 
  }catch (err) {
    res.status(500).json({success:false, message: err.message })
  }
}

export const resetPassWord = async(req, res) => {
  const {email, password} = req.body ?? {}

  if(!email || !password) {
    return res.status(400).json({success: false, message: "Email and Password is required"})
  }

  try{
    const findUser = await User.findOne({email: email}).exec()

    if(!findUser) {
      return res.status(401).json({success: false, message: `Email ${email} does not exist`})
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    findUser.password = hashedPassword

    await findUser.save()

    res.status(200).json({ success: true, message: 'Password reset successfully' })


  } catch (err) {
    res.status(500).json({success:false, message: err.message })
  }
}

export const handeLogin = async(req, res) => {
  const {password, email} = req.body ?? {}

  if(!password || !email){
    return res.status(400).json({success: false, message: "Email and Password are required"})
  }

  const findUser = await User.findOne({email: email}).exec()
  if(!findUser) {
    return res.status(401).json({success:false, message:`Email ${email} does not exist`})
  }

  const checkPassword = await bcrypt.compare(password, findUser.password)

  if(checkPassword) {
    try{
      const AccessToken = jwt.sign(
        {
          userInfo: {email: findUser.email}
        },
        process.env.ACCESS_TOKEN_SECRET,
        {expiresIn: "20s"}
      )

      const RefreshToken = jwt.sign(
        {email: findUser.email},
        process.env.REFRESH_TOKEN_SECRET,
        {expiresIn: "5d"}
      )
      findUser.RefreshToken = RefreshToken
      await findUser.save()

      res.cookie('jwtUser', RefreshToken, {httpOnly: true, maxAge: 5*24*60*60*1000}) // in production environment we add secure: true, it serves only on https; sameSite:'None', secure:true,
      res.json({success: true, data:AccessToken})
    } catch(err) {
      res.status(500).json({success: false, message: err.message})
    }
  } else {
    return res.sendStatus(401)
  }
}

export const handleRefresh = async(req, res) => {
  const cookies = req.cookies


  if(!cookies?.jwtUser) {
    return res.status(401).json({success: false, message: 'This is unauthorized'})
  }

  const RefreshToken = cookies?.jwtUser

  const findUser = await User.findOne({RefreshToken: RefreshToken}).exec()
  if(!findUser) {
    return res.sendStatus(403)
  }
  try{
    jwt.verify(
      RefreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      (err, decoded) => {
        if(err || findUser.email !== decoded.email) {
          return res.sendStatus(403)
        }
        const AccessToken = jwt.sign(
          {
            userInfo: {email: decoded.email},
          },
          process.env.ACCESS_TOKEN_SECRET,
          {expiresIn: "1d"}
        )
        res.json({AccessToken})
      }
    )
  }catch(err) {
    res.status(500).json({success: false, message: err.message})
  }
}

export const handleLogout = async(req, res) => {
  const cookies = req.cookies

  if(!cookies?.jwtUser) {
    return res.sendStatus(204)
  }
  const RefreshToken = cookies?.jwtUser

  const findUser = await User.findOne({RefreshToken: RefreshToken})
  if(!findUser) {
    return res.sendStatus(204)
  }

  try{
    findUser.RefreshToken = ""
    await findUser.save()

    res.clearCookie('jwtUser', {httpOnly: true, sameSite:'None', secure:true, maxAge: 5*24*60*60*1000})
    res.sendStatus(204)
  }catch (err) {
    res.status(500).json({success:false, message:err.message})
  }
}



