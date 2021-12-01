import bcrypt from 'bcrypt'
import { hashPassword } from '../../middlewares/util'

import { checkPassword } from '../../controllers/auth.controller'

describe('hashPassword:', () => {
  describe('verifyToken', () => {
    it('should be decrypted only by the encriptor', async () => {
      const pass1 = 'fff'
      const hashed = await hashPassword(pass1)
      expect(await checkPassword(pass1, hashed as string)).toBeTruthy()
      expect(
        (await hashPassword(pass1)) !== (await hashPassword(pass1)),
      ).toBeTruthy()
    })

    it('should different values for different strings', async () => {
      const pass1 = 'a beautiful password'
      const pass2 = 'a different password'
      const hashed = await hashPassword(pass1)
      expect(
        (await hashPassword(pass1)) !== (await hashPassword(pass2)),
      ).toBeTruthy()
      expect(await checkPassword(pass2, hashed as string)).toBeFalsy()
    })
  })
})
