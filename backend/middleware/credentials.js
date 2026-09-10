import { whitelist } from "../config/corsOption.js";

const credentials = (req, res, next) => {
  const origin = req.header.origin;
  if(whitelist.includes(origin)){
    res.setHeader('Access-Control-Allow-Credentials', 'true')
  }
  next()
}

export default credentials