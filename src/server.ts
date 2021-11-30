import 'reflect-metadata'
import dotenv from 'dotenv'
import express, { NextFunction, Request, Response } from 'express'
import cors, { CorsOptions } from 'cors'
import createHttpError, { HttpError } from 'http-errors'
import { PrismaClient } from '@prisma/client'
import { router } from './router'

import swaggerUi from 'swagger-ui-express'
import YAML from 'yamljs'
const swaggerDocument = YAML.load('./swagger.yaml')

dotenv.config()

export const prisma = new PrismaClient({
  rejectOnNotFound: (error) => new createHttpError.NotFound(error.message),
})

const app = express()
const PORT = process.env.API_PORT || 8080
const ENVIROMENT = process.env.NODE_ENV || 'development'

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const whiteList = ['http://localhost:8080']
const corsOptionsDelegate = function handler(
  req: Request,
  callback: (err: Error | null, options?: CorsOptions) => void,
) {
  const corsOptions: { origin: boolean } = { origin: false }

  if (whiteList.indexOf(req.header('Origin') ?? '') !== -1) {
    corsOptions.origin = true
  }

  callback(null, corsOptions)
}

function errorHandler(
  err: HttpError,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction,
): void {
  if (ENVIROMENT !== 'development') {
    // eslint-disable-next-line no-console
    console.error(err.message)
    // eslint-disable-next-line no-console
    console.error(err.stack || '')
  }

  res.status(err.status ?? 500)
  res.json(err)
}
app.use(cors(corsOptionsDelegate))

app.get('/api/v1/status', (req: Request, res: Response) => {
  res.json({ time: new Date() })
})

app.use('/api/v1/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

app.use('/', router(app))
//app.use(errorHandler)

app.listen(PORT, async () => {
  // eslint-disable-next-line no-console
  console.log(`Server listening on port %d, env: %s`, PORT, ENVIROMENT)
})
