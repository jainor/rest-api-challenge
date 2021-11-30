import express, { Router } from 'express'
import asyncHandler from 'express-async-handler'
import { find, create, findOne, update } from '../controllers/posts.controller'
import { authMiddleware } from '../middlewares/auth.middleware'

const router = express.Router()

export function postsRoutes(): Router {
  router
    .route('/')
    .get(asyncHandler(find))
    .post(authMiddleware, asyncHandler(create))
  router
    .route('/:id')
    .get(asyncHandler(findOne))
    .patch(authMiddleware, asyncHandler(update))

  return router
}
