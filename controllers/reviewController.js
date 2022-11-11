import asyncHandler from 'express-async-handler'

import ErrorResponse from '../utils/errorResponse.js'
import Review from '../models/reviewModel.js'
import APIFeatures from '../utils/apiFeatures.js'

// @desc    Get reviews
// @route   GET /api/v1/reviews
// @route   GET /api/v1/bootcamps/:bootcampId/reviews
// @access  Public
export const getReviews = asyncHandler(async (req, res, next) => {
  let reviews

  if (req.params.bootcampId) {
    reviews = await Review.find({ bootcamp: req.params.bootcampId })
  } else {
    const features = new APIFeatures(Review.find(), req.query)
      .filter()
      .selectFields()
      .populate({ path: 'bootcamp', select: 'name description' })

    reviews = await features.query
  }

  res.status(200).json({
    success: true,
    count: reviews.length,
    data: reviews,
  })
})

// @desc    Get single review
// @route   GET /api/v1/reviews/:id
// @access  Public
export const getReview = asyncHandler(async (req, res, next) => {
  const review = await Review.findById(req.params.id).populate({
    path: 'bootcamp',
    select: 'name description',
  })

  if (!review) {
    return next(
      new ErrorResponse(`No review found with the id of ${req.params.id}`, 404)
    )
  }

  res.status(200).json({
    success: true,
    data: review,
  })
})
