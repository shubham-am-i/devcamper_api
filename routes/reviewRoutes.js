import express from 'express'
import {
  getReviews,
  getReview,
  addReview,
  updateReview,
  deleteReview,
} from '../controllers/reviewController.js'

const router = express.Router({ mergeParams: true })

import { protect, authorize } from '../middleware/authmiddleware.js'

router.route('/').get(getReviews).post(protect, authorize, addReview)
router
  .route('/:id')
  .get(getReview)
  .put(protect, authorize, updateReview)
  .delete(protect, authorize, deleteReview)

export default router
