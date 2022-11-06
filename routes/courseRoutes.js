import express from 'express'
import { getCourses } from '../controllers/courseController.js'

const router = express.Router({ mergeParams: true })

router.route('/').get(getCourses)

export default router
