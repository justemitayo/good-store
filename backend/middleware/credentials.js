import { whitelist } from "../config/corsOption.js";

const credentials = (req, res, next) => {
  const origin = req.headers.origin;
  if(whitelist.includes(origin)){
    res.headers('Access-Control-Allow-Credentials', true)
  }
  next()
}

export default credentials