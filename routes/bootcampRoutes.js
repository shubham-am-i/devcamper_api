import express from 'express'
import {
  getBootcamps,
  getBootcamp,
  createBootcamp,
  updateBootcamp,
  deleteBootcamp,
  getBootcampsInRadius,
} from '../controllers/bootcampController.js'

// Include other resource router
import courseRouter from './courseRoutes.js'

const router = express.Router()

router.use('/:bootcampId/courses', courseRouter)

router.route('/').get(getBootcamps).post(createBootcamp)
router.route('/:id').get(getBootcamp).put(updateBootcamp).delete(deleteBootcamp)
router.route('/radius/:zipcode/:distance').get(getBootcampsInRadius)

export default router
