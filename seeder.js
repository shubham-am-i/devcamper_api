import fs from 'fs'
import mongoose from 'mongoose'
import colors from 'colors'
import dotenv from 'dotenv'

// Load env vars
dotenv.config({ path: './config/config.env' })

import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Load models
import Bootcamp from './models/Bootcamp.js'

// connect to DB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

// Read JSON files
const bootcamps = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/bootcamps.json`, 'utf-8')
)

const importData = async () => {
  try {
    await Bootcamp.create(bootcamps)

    console.log('Data Imported!'.green.inverse)
    process.exit()
  } catch (error) {
    console.log(`${error}`.red.inverse)
    process.exit(1)
  }
}

const destroyData = async () => {
  try {
    await Bootcamp.deleteMany() //if we don't pass anything, it will delete everything

    console.log('Data Destroyed!'.red.inverse)
    process.exit()
  } catch (error) {
    console.log(`${error}`.red.inverse)
    process.exit(1)
  }
}

if (process.argv[2] === '-d') {
  destroyData()
} else {
  importData()
}
