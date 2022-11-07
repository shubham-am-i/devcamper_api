import express from 'express'
import {
  getCourses,
  getCourse,
  addCourse,
} from '../controllers/courseController.js'

const router = express.Router({ mergeParams: true })

router.route('/').get(getCourses).post(addCourse)
router.route('/:id').get(getCourse)

export default router
