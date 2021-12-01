import { Prisma, PrismaClient, Post } from '@prisma/client'
import cases from 'jest-in-case'
import { mocked } from 'ts-jest/utils'
import { classToPlain, plainToClass } from 'class-transformer'
import { CreatePostDto } from '../../dtos/posts/request/create-post.dto'
import { PostsService } from '../../services/posts.service'
import { app } from '../../app'
import { UpdatePostDto } from '../../dtos/posts/request/update-post.dto'

const prisma = new PrismaClient()
const internalConfig: any = {}

beforeAll(() => {
  //process.env.DATABASE_URL = process.env.TEST_DATABASE_URL
})
afterAll(() => {})

describe('PostsServices', () => {
  it('should insert a valid post verifying that it does exists previously', async () => {
    const postId = 9890
    const postContent = 'contentt'

    const toBeInserted = {
      id: postId,
      userId: 1,
      content: postContent,
    }

    const data = plainToClass(CreatePostDto, toBeInserted)
    const result = await PostsService.create(data)

    expect(result.id).toEqual(postId)
    expect(result.content).toEqual(postContent)

    const newContent = 'change'
    const toBeUpdated = {
      id: postId,
      content: newContent,
    }

    const dataUpdate = plainToClass(UpdatePostDto, toBeUpdated)

    const updatedResult = await PostsService.update(postId, dataUpdate)

    expect(updatedResult.id).toEqual(postId)
    expect(updatedResult.content).toEqual(newContent)
  })
})
