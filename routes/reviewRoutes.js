import express from 'express'
import { getReviews, getReview } from '../controllers/reviewController.js'

const router = express.Router({ mergeParams: true })

import { protect, isAuthorize } from '../middleware/authmiddleware.js'

router.route('/').get(getReviews)
router.route('/:id').get(getReview)

export default router
