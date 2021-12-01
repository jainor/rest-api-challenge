import bcrypt from 'bcrypt'

const SALT_ROUNDS = 10

export async function hashPassword(password: string) {
  const hashedPassword = await new Promise((resolve, reject) => {
    bcrypt.hash(password, SALT_ROUNDS, function (err: any, hash: string) {
      if (err) reject(err)
      resolve(hash)
    })
  })

  return hashedPassword
}
