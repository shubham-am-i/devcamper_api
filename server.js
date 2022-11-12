import express from 'express'
import dotenv from 'dotenv'
import morgan from 'morgan'
import colors from 'colors'
import fileupload from 'express-fileupload'
import cookieParser from 'cookie-parser'
import mongoSanitize from 'express-mongo-sanitize'
import cors from 'cors'
// local import
import errorHandler from './middleware/error.js'
import connectDB from './config/db.js'

// Load env vars
dotenv.config({ path: './config/config.env' })

import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

connectDB() // Connect to Atlas

// Route files
import bootcampRouter from './routes/bootcampRoutes.js'
import courseRouter from './routes/courseRoutes.js'
import authRouter from './routes/authRoute.js'
import reviewRouter from './routes/reviewRoutes.js'
const app = express()

// Middlewares
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}
app.use(express.json()) //body parser
app.use(express.static(path.join(__dirname, 'public')))
app.use(fileupload()) // File uploading
app.use(cookieParser()) //cookie parser
app.use(mongoSanitize()) // prevent mongo operator injection
app.use(cors()) // enable cors

// Mount Routers
app.use('/api/v1/bootcamps', bootcampRouter)
app.use('/api/v1/courses', courseRouter)
app.use('/api/v1/auth', authRouter)
app.use('/api/v1/reviews', reviewRouter)

app.use(errorHandler)

const PORT = process.env.PORT || 5000
const server = app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
)

// Handle unhandled promise rejections
// If our database is isn't connected, we don't want our app to even run
// so we are crashing over server, instead of using try-catch in db.js

process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`.red)
  // close server & exit process
  server.close(() => process.exit(1))
})
