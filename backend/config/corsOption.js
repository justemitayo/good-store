export const whitelist = ['https://www.goodStore.com', 'http://127.0.0.1/3000', 'http://127.0.0.1/5500' ]

const corsOption = {
  origin: (origin, callback) => {
    if(whitelist.indexOf(origin) !== -1 || !origin){
      callback(null, true)
    }else{
      callback(new Error('Not Allowed by CORS'))
    }
  },
  optionSuccessStatus: 200
}

export default corsOption