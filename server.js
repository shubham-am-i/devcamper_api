import express from 'express'
import dotenv from 'dotenv'
import morgan from 'morgan'
import colors from 'colors'
import errorHandler from './middleware/error.js'
import connectDB from './config/db.js'

// Load env vars
dotenv.config({ path: './config/config.env' })

// Connect to Atlas
connectDB()

// Route files
import bootcamps from './routes/bootcampRoutes.js'
import courses from './routes/courseRoutes.js'
const app = express()

// Middlewares
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}
app.use(express.json())

// Mount Routers
app.use('/api/v1/bootcamps', bootcamps)
app.use('/api/v1/courses', courses)

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
