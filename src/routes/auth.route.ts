import express, { Router } from 'express'
import asyncHandler from 'express-async-handler'
import { signup, signin, protect, logout } from '../controllers/auth.controller'

const router = express.Router()

export function authRoutes(): Router {
  router.route('/signin').post(asyncHandler(signin))
  router.route('/signup').post(asyncHandler(signup))
  router.route('/refresh').post(asyncHandler(protect))
  router.route('/logout').post(asyncHandler(logout))

  //router.route('/:id').get(asyncHandler(findOne)).patch(asyncHandler(update))

  return router
}
