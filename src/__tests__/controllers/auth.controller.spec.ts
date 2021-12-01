import jwt from 'jsonwebtoken'
import { getMockReq, getMockRes } from '@jest-mock/express'
import {
  JWT,
  newToken,
  verifyToken,
  signup,
  signin,
  protect,
} from '../../controllers/auth.controller'

import { app } from '../../app'

describe('Authentication:', () => {
  describe('newToken', () => {
    it('should create new jwt from user', () => {
      const id = 1
      const token = newToken({ id })

      const user = jwt.verify(token, JWT)
      expect(user.hasOwnProperty('id')).toBeTruthy()
    })
  })
  describe('verifyToken', () => {
    it('should validate jwt and returns payload', async () => {
      const id = 2
      const token = jwt.sign({ id }, JWT)
      const user = await verifyToken(token)

      expect(typeof user === 'object' && user !== null).toBeTruthy()
      if (typeof user === 'object' && user !== null)
        expect(user.hasOwnProperty('id')).toBeTruthy()
    })
  })
})
