import express from 'express'
import {
  getCourses,
  getCourse,
  addCourse,
  updateCourse,
  deleteCourse,
} from '../controllers/courseController.js'
import { protect, isAuthorize } from '../middleware/authmiddleware.js'

const router = express.Router({ mergeParams: true })

router.route('/').get(getCourses).post(protect, isAuthorize, addCourse)
router
  .route('/:id')
  .get(getCourse)
  .put(protect, isAuthorize, updateCourse)
  .delete(protect, isAuthorize, deleteCourse)

export default router
