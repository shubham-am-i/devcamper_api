import express from 'express'
import {
  getCourses,
  getCourse,
  addCourse,
  updateCourse,
  deleteCourse,
} from '../controllers/courseController.js'
import { protect } from '../middleware/authmiddleware.js'

const router = express.Router({ mergeParams: true })

router.route('/').get(getCourses).post(protect, addCourse)
router
  .route('/:id')
  .get(getCourse)
  .put(protect, updateCourse)
  .delete(protect, deleteCourse)

export default router
