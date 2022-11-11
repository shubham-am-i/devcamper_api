import express from 'express'
import { getReviews } from '../controllers/reviewController.js'

const router = express.Router({ mergeParams: true })

import { protect, isAuthorize } from '../middleware/authmiddleware.js'

router.route('/').get(getReviews)

export default router
