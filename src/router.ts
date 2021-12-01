import express, { Router } from 'express'
import { usersRoutes } from './routes/users.route'
import { postsRoutes } from './routes/posts.route'
import { commentsRoutes } from './routes/comments.route'
import { authRoutes } from './routes/auth.route'

const expressRouter = express.Router()

export function router(app: Router): Router {
  app.use('/api/v1/users', usersRoutes())
  app.use('/api/v1/posts', postsRoutes())
  app.use('/api/v1/posts/:id', commentsRoutes())
  app.use('/api/v1/auth', authRoutes())

  return expressRouter
}
