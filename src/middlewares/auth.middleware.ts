import { plainToClass } from 'class-transformer'
import { Request, Response, NextFunction } from 'express'
import { UsersService } from '../services/users.service'
import { verifyToken, checkPassword } from '../controllers/auth.controller'

//verify and add userId to the request
export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {

  try {
    const bearer = req.headers.authorization
    const token = bearer?.split('Bearer ')[1].trim() || ''
    let payload: any
    try {
      payload = await verifyToken(token)
    } catch (e) {
      return res.status(401).end()
    }
    const user = await UsersService.findOne(payload.id)
    const match: boolean = checkPassword(req.body.password, user.password)

    if (!match) {
      return res.status(401).end('invalid user')
    }
    req.body.userId = user.id

    next(req)
  } catch (e) {
    return res.status(401).end()
  }
}
