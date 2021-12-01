import { Prisma, PrismaClient, Comment } from '@prisma/client'
import cases from 'jest-in-case'
import { mocked } from 'ts-jest/utils'
import { classToPlain, plainToClass } from 'class-transformer'
import { CreateCommentDto } from '../../dtos/comments/request/create-comment.dto'
import { CommentsService } from '../../services/comments.service'
import { app } from '../../app'
import { UpdateCommentDto } from '../../dtos/comments/request/update-comment.dto'

const prisma = new PrismaClient()
const internalConfig: any = {}

beforeAll(() => {
  //process.env.DATABASE_URL = process.env.TEST_DATABASE_URL
})
afterAll(() => {})

describe('CommentsServices', () => {
  it('should insert a valid comment verifying that it does exists previously', async () => {
    const commentId = 912
    const commentContent = 'contentt'

    const toBeInserted = {
      id: commentId,
      userId: 1,
      postId: 1,
      commentId: 1,
      content: commentContent,
    }

    const data = plainToClass(CreateCommentDto, toBeInserted)
    const result = await CommentsService.create(data)

    expect(result.id).toEqual(commentId)
    expect(result.content).toEqual(commentContent)

    const newContent = 'changeComment'
    const toBeUpdated = {
      id: commentId,
      content: newContent,
    }

    const dataUpdate = plainToClass(UpdateCommentDto, toBeUpdated)

    const updatedResult = await CommentsService.update(commentId, dataUpdate)

    expect(updatedResult.id).toEqual(commentId)
    expect(updatedResult.content).toEqual(newContent)
  })
})
