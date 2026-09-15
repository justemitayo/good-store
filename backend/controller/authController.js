import User from '../model/User.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'


export const registerUser = async(req, res) => {
  const {username, password, email} = req.body ?? {} 
  if(!username || !password || !email) {
    return res.status(400).json({success: false, message: "Username, Password and Email are required"})
  }

  const duplicate = await User.findOne({email: email}).exec()

  if(duplicate) {
    return res.sendStatus(409)
  }

  try{
    const hashedPassWord = await bcrypt.hash(password, 10)

    await User.create({
      username: username,
      password: hashedPassWord,
      email: email
    })

    res.json({success:true, message: "New User Created"})
  }catch (err) {
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

  console.log('cookies:', req.cookies)

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