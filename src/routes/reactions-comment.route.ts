import express, { Router } from 'express'
import asyncHandler from 'express-async-handler'
import {
  find,
  create,
  findOne,
  update,
} from '../controllers/reactions-comment.controller'
import { authMiddleware } from '../middlewares/auth.middleware'

const router = express.Router()

export function usersRoutes(): Router {
  router
    .route('/')
    .get(asyncHandler(find))
    .post(authMiddleware, asyncHandler(create))
  router.route('/:id').get(asyncHandler(findOne)).patch(asyncHandler(update))
  return router
}
