import asyncHandler from 'express-async-handler'

import ErrorResponse from '../utils/errorResponse.js'
import Course from '../models/courseModel.js'
import Bootcamp from '../models/bootcampModel.js'
import APIFeatures from '../utils/apiFeatures.js'

// @desc    Get courses
// @route   GET /api/v1/courses
// @route   GET /api/v1/bootcamps/:bootcampId/courses
// @access  Public
export const getCourses = asyncHandler(async (req, res, next) => {
  let courses

  if (req.params.bootcampId) {
    courses = await Course.find({ bootcamp: req.params.bootcampId })
  } else {
    const features = new APIFeatures(Course.find(), req.query)
      .filter()
      .selectFields()
      .populate({ path: 'bootcamp', select: 'name description' })

    courses = await features.query
  }

  res.status(200).json({
    success: true,
    count: courses.length,
    data: courses,
  })
})

// @desc    Get single course
// @route   GET /api/v1/courses/:id
// @access  Public
export const getCourse = asyncHandler(async (req, res, next) => {
  const course = await Course.findById(req.params.id).populate({
    path: 'bootcamp',
    select: 'name description',
  })

  if (!course) {
    return next(
      new ErrorResponse(`No course with the id of ${req.params.id}`, 404)
    )
  }

  res.status(200).json({
    success: true,
    data: course,
  })
})

// @desc    Add course
// @route   POST /api/v1/bootcamps/:bootcampId/courses
// @access  Private
export const addCourse = asyncHandler(async (req, res, next) => {
  req.body.bootcamp = req.params.bootcampId

  const bootcamp = await Bootcamp.findById(req.params.bootcampId)

  if (!bootcamp) {
    return next(
      new ErrorResponse(
        `No bootcamp with the id of ${req.params.bootcampId}`,
        404
      )
    )
  }

  const course = await Course.create(req.body)

  res.status(200).json({
    success: true,
    data: course,
  })
})

// @desc    Update Course
// @route   PUT /api/v1/courses/:id
// @access  Private
export const updateCourse = asyncHandler(async (req, res, next) => {
  const course = await Course.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  })

  if (!course) {
    return next(
      new ErrorResponse(`No course with the id of ${req.params.id}`),
      404
    )
  }

  res.status(200).json({
    success: true,
    data: course,
  })
})

// @desc    Delete Course
// @route   DELETE /api/v1/courses/:id
// @access  Private
export const deleteCourse = asyncHandler(async (req, res, next) => {
  const course = await Course.findById(req.params.id)

  if (!course) {
    return next(
      new ErrorResponse(`No course with the id of ${req.params.id}`),
      404
    )
  }

  await course.remove()
  res.status(200).json({
    success: true,
    data: {},
  })
})
