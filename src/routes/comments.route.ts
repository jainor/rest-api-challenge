import express, { Router } from 'express'
import asyncHandler from 'express-async-handler'
import {
  find,
  create,
  findOne,
  update,
} from '../controllers/comments.controller'
import { authMiddleware } from '../middlewares/auth.middleware'

const router = express.Router()

export function commentsRoutes(): Router {
  router.route('/').get(asyncHandler(find))
  router.route('/').post(authMiddleware, asyncHandler(create))
  router
    .route('/:id')
    .get(asyncHandler(findOne))
    .patch(authMiddleware, asyncHandler(update))

  return router
}
