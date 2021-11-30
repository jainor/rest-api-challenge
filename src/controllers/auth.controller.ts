import { plainToClass } from 'class-transformer'
import { nextTick } from 'process'
import jwt from 'jsonwebtoken'
import { Request, Response } from 'express'
import { UsersService } from '../services/users.service'
import { UpdateUserDto } from '../dtos/users/request/update-user.dto'
import { UserDto } from '../dtos/users/response/user.dto'
import { CreateUserDto } from '../dtos/users/request/create-user.dto'

const JWT = process.env.JWT_SECRET || 'ANY SECRET'
const JWT_EXP = process.env.JWT_EXP || '100d'

const newToken = (user: { id: number }) => {
  return jwt.sign({ id: user.id }, JWT, {
    expiresIn: JWT_EXP,
  })
}

export const verifyToken = (token: string) =>
  new Promise((resolve, reject) => {
    jwt.verify(token, JWT, (err, payload) => {
      if (err) return reject(err)
      resolve(payload)
    })
  })

export const signup = async (req: Request, res: Response) => {
  if (!req.body.email || !req.body.password) {
    return res.status(400).send({ message: 'need email and password' })
  }

  const dto = plainToClass(CreateUserDto, req.body)
  await dto.isValid()

  const userRaw = await UsersService.create(dto)
  const user = plainToClass(UserDto, userRaw)

  try {
    const dto = plainToClass(UserDto, req.body)
    const token = newToken(dto)
    return res.status(201).send({ user, token })
  } catch (e) {
    return res.status(500).end()
  }
}

export const checkPassword = (currentValue: string, sendValue: string) => {
  return currentValue === sendValue
}

export const signin = async (req: Request, res: Response) => {
  if (!req.body.email || !req.body.password) {
    return res.status(400).send({ message: 'need email and password' })
  }

  const invalid = { message: 'Invalid email and password combination' }

  try {
    const user = await UsersService.findOneByEmail(req.body.email)

    if (!user) {
      return res.status(401).send(invalid)
    }

    const match: boolean = checkPassword(req.body.password, user.password)

    if (!match) {
      return res.status(401).send(invalid)
    }

    const token = newToken(user)
    return res.status(201).send({ token })
  } catch (e) {
    console.error(e)
    return res.status(500).end()
  }
}

export const protect = async (req: Request, res: Response) => {
  const bearer = req.headers.authorization

  if (!bearer || !bearer.startsWith('Bearer ')) {
    return res.status(401).end()
  }

  const token = bearer.split('Bearer ')[1].trim()
  let payload: any
  try {
    payload = await verifyToken(token)
  } catch (e) {
    return res.status(401).end()
  }

  const user = await UsersService.findOne(payload.id)

  if (!user) {
    return res.status(401).end()
  }

  req.body.user = user
  return res.status(200).end()
}

export const logout = async (req: Request, res: Response) => {
  const bearer = req.headers.authorization

  if (!bearer || !bearer.startsWith('Bearer ')) {
    return res.status(401).end()
  }

  const token = bearer.split('Bearer ')[1].trim()
  let payload: any
  try {
    payload = await verifyToken(token)
  } catch (e) {
    return res.status(401).end()
  }

  const user = await UsersService.findOne(payload.id)

  if (!user) {
    return res.status(401).end()
  }

  req.body.user = user
}
