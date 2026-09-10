export const whitelist = ['https://www.goodStore.com', 'http://localhost:3000', 'http://localhost:5500' ]

const corsOption = {
  origin: (origin, callback) => {
    if(whitelist.indexOf(origin) !== -1 || !origin){
      callback(null, true)
    }else{
      callback(new Error('Not Allowed by CORS'))
    }
  },
  credentials: true,
  optionSuccessStatus: 200
}

export default corsOption

// remove !origin in production. it there so our local host can run 