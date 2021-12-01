import { Prisma, PrismaClient, User } from '@prisma/client'
import cases from 'jest-in-case'
import { mocked } from 'ts-jest/utils'
import { classToPlain, plainToClass } from 'class-transformer'
import { CreateUserDto } from '../../dtos/users/request/create-user.dto'
import { UpdateUserDto } from '../../dtos/users/request/update-user.dto'
import { UsersService } from '../../services/users.service'
import { app } from '../../app'

const prisma = new PrismaClient()

describe('UsersServices', () => {
  it('should insert a valid user verifying that it does exists previously', async () => {
    const userId = 71184

    const toBeInserted = {
      id: userId,
      email: 'test@mail.com',
      password: 'password',
      firstName: 'firstf',
      lastName: 'lastf',
    }

    const data = plainToClass(CreateUserDto, toBeInserted)
    const result = await UsersService.create(data)

    expect(result.id).toEqual(userId)

    const changelastName = 'change lastname'

    const toBeupdated = {
      email: 'nuevyfomu4ail@gmail.com',
      password: 'passwordasdfddd',
      lastName: changelastName,
    }

    const dataUpdate = plainToClass(UpdateUserDto, toBeupdated)
    const resultUpdate = await UsersService.update(userId, dataUpdate)

    expect(resultUpdate.lastName).toEqual(changelastName)
  })
})
