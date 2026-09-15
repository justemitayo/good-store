import jwt from 'jsonwebtoken'

 const verifyJWT = (req, res, next) => {
  const authRequest = req.headers.authorization || req.headers.Authorization
  if(!authRequest || !authRequest.startsWith('bearer ') ) {
    return res.sendStatus(401)
  }
  const token = authRequest.split(' ')[1]

  jwt.verify(
    token, 
    process.env.ACCESS_TOKEN_SECRET,
    (err, decoded) => {
      if(err ) {
        return res.sendStatus(403)
      }
      req.email = decoded.userInfo.email
      next()
    }
    
  )
} 

export default verifyJWT