import 'dotenv/config'
import express from "express"
import cors from 'cors';
import corsOption from "./config/corsOption.js"
import credentials from "./middleware/credentials.js";
import mongoose from "mongoose";
import connectDB from './config/mongo.js';
import productRouter from './routes/api/product.js';


connectDB()

const port = process.env.PORT || 5500

const app = express()


app.use(credentials)
app.use(cors(corsOption))

app.use(express.json())
app.use(express.urlencoded({ extended: false}))

app.use('/products', productRouter)

mongoose.connection.once('open', () => {
  console.log('mongodb connected successfully');
  app.listen(port, () => {
    console.log(`app is listening on port ${port}`)
  })
})

mongoose.connection.on('error', (err) => {
  console.log(err)
})

process.on('SIGINT', async() => {
  await mongoose.connection.close()
  console.log('mongodb disconnected')
  process.exit(0)
})

