import express from 'express'
const app = express()
import dotenv from 'dotenv'
dotenv.config()
import 'express-async-errors'
import morgan from 'morgan'
import fileUpload from "express-fileupload"

import {auth} from "./middleware/auth.js"

import connectDB from './db/connect.js'
import Auth from "./routes/AuthRoute.js"
import Products from "./routes/ProductRoute.js"
import Reviews from "./routes/ReviewRoute.js"
import StripeRoute from "./routes/StripeRoute.js"
import Orders from "./routes/OrderRoute.js"
// import http from "http"


import Stripe from 'stripe';



const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);

import cloudinary from "cloudinary"



cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

// import http from "http"

// let server=http.createServer(app)

import helmet from 'helmet'

import mongoSanitize from "express-mongo-sanitize"

import xssclean from "xss-clean"
import rateLimit from 'express-rate-limit'

import { dirname } from 'path'
import { fileURLToPath } from 'url'
import path from 'path'



import notFoundMiddleware from './middleware/not-found.js'
import errorHandlerMiddleware from './middleware/error-handler.js'



if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'))
}

app.use(express.json())
app.use(fileUpload({ useTempFiles: true }));

const __dirname = dirname(fileURLToPath(import.meta.url))
// only when ready to deploy
app.use(express.static(path.resolve(__dirname, './client/build')))

app.use(xssclean())
app.use(mongoSanitize())
// app.use(helmet())
// app.use(
//   helmet({
//     crossOriginEmbedderPolicy: false,
//     // ...
//   })
// );


// To loasd the cloudanary pictures correctly
// NOt for all the things in ContentSecurity Policy do
// image-src=["*","data:"]
// frame/script/font-src=["*"]
app.use(
  [
  helmet.contentSecurityPolicy({
    directives: {
      // defaultSrc: ["'self'","https://js.stripe.com/v3/controller-8ba41bf745eae7a7f261aec1c8cf4059.html#apiKey=pk_test_51LfITCSIwAzANlK4VI5XOc73CaaawmFEC0pBBPrkBJr4uVxSJsFMkE8tKEDxmnN2rr2p8wvLG7XJkoO6tCbHXyuG001db09QL2&stripeJsId=11b0294e-3476-49ef-bc70-faf4f5db8484&stripeJsLoadTime=1665340814550&referrer=http%3A%2F%2Flocalhost%3A5000%2Fcart&controllerId=__privateStripeController9071"],
      // connectSrc: ["'self'", 'https://checkout.stripe.com'],
      // frameSrc: ["'self'", 'https://checkout.stripe.com'],
      // childSrc: ["'self'", 'https://checkout.stripe.com'],
      // scriptSrc: ["'self'", 'https://checkout.stripe.com'],
      // styleSrc: [
      //   "'self'",
      //   'https://fonts.googleapis.com',
      //   'https://checkout.stripe.com',
      // ],
      // fontSrc: ["'self'", 'https://fonts.gstatic.com'],
      // defaultSrc:["'self'"],
      // imgSrc: ["'self'", 'https://*.stripe.com', 'https://res.cloudinary.com'],
      // baseUri: ["'self'"],
      // 'script-src': ["'self'", "'https://js.stripe.com/v3'"],
      // 'frame-ancestors': ["'self'",],
      // sandbox: ['allow-forms', 'allow-scripts'],
      'script-src': ["*"],
      // 'connect-src':["'self'","'https://checkout.stripe.com'"],
       imgSrc: ["*", 'data:'],
      'frame-src':["'self'",'https://*.stripe.com ']
    },
  })
  ]
)



app.use("/api/v1/auth",Auth)
app.use("/api/v1/product",Products)
app.use("/api/v1/product/reviews",auth,Reviews)
app.use("/api/v1/product/orders",auth,Orders)
app.use("/api/v1",StripeRoute)

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, './client/build', 'index.html'))
})



app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)


const port = process.env.PORT || 5000

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL)
    app.listen(port,()=>{
      console.log("The app is listining")
    })
  } catch (error) {
    console.log(error)
  }
}

start()
