import express from 'express'
import {
  getBootcamps,
  getBootcamp,
  createBootcamp,
  updateBootcamp,
  deleteBootcamp,
  getBootcampsInRadius,
  bootcampPhotoUpload,
} from '../controllers/bootcampController.js'
import { protect, isAuthorize } from '../middleware/authmiddleware.js'

// Include other resource router
import courseRouter from './courseRoutes.js'
import reviewRouter from './reviewRoutes.js'

const router = express.Router()

router.use('/:bootcampId/courses', courseRouter) // redirect to courseRouter
router.use('/:bootcampId/reviews', reviewRouter) // redirect to reviewRouter

router.route('/:id/photo').put(protect, isAuthorize, bootcampPhotoUpload)
router.route('/').get(getBootcamps).post(protect, isAuthorize, createBootcamp)
router
  .route('/:id')
  .get(getBootcamp)
  .put(protect, isAuthorize, updateBootcamp)
  .delete(protect, isAuthorize, deleteBootcamp)
router.route('/radius/:zipcode/:distance').get(getBootcampsInRadius)

export default router
