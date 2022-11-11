import express from 'express'
import {
  getReviews,
  getReview,
  addReview,
} from '../controllers/reviewController.js'

const router = express.Router({ mergeParams: true })

import { protect, authorize } from '../middleware/authmiddleware.js'

router.route('/').get(getReviews).post(protect, authorize, addReview)
router.route('/:id').get(getReview)

export default router
