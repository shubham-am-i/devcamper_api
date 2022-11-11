import jwt from 'jsonwebtoken'
import asyncHandler from 'express-async-handler'
import ErrorResponse from '../utils/errorResponse.js'
import User from '../models/userModel.js'

// Protect routes
export const protect = asyncHandler(async (req, res, next) => {
  let token

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1]
  }
  // else if (req.cookies.token){
  //   token = req.cookies.token
  // }

  // Make sure token exists
  if (!token) {
    return next(new ErrorResponse('Not authorize to access this route', 401))
  }

  try {
    // Verfiy token
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = await User.findById(decoded.id)
  } catch (err) {
    return next(new ErrorResponse('Not authorize to access this', 401))
  }

  next()
})

export const isAuthorize = (req, res, next) => {
  if (
    (req.user && req.user.role === 'publisher') ||
    req.user.role === 'admin'
  ) {
    next()
  } else {
    res.status(401)
    throw new Error('Not authorized with a user role')
  }
}

export const authorize = (req, res, next) => {
  if ((req.user && req.user.role === 'user') || req.user.role === 'admin') {
    next()
  } else {
    res.status(401)
    throw new Error('Not authorized as a publisher')
  }
}
