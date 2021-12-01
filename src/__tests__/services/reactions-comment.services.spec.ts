import { Prisma, PrismaClient, Comment } from '@prisma/client'
import cases from 'jest-in-case'
import { mocked } from 'ts-jest/utils'
import { classToPlain, plainToClass } from 'class-transformer'
import { CreateCommentReactionDto } from '../../dtos/reactions/comments/request/create-comment-reaction.dto'
import { CommentReactionsService } from '../../services/reactions-comment.service'
import { app } from '../../app'
import { UpdateCommentReactionDto } from '../../dtos/reactions/comments/request/update-comment-reaction.dto'

const prisma = new PrismaClient()
const internalConfig: any = {}

beforeAll(() => {
  //process.env.DATABASE_URL = process.env.TEST_DATABASE_URL
})
afterAll(() => {})

describe('CommentsServices', () => {
  it('should insert a valid reaction to a comment, verifying that it does exists previously', async () => {
    const reactionsCommentId = 9144443
    const reactionSt = true

    const toBeInserted = {
      id: reactionsCommentId,
      userId: 1,
      commentId: 1,
      reaction: reactionSt,
    }

    const data = plainToClass(CreateCommentReactionDto, toBeInserted)
    const result = await CommentReactionsService.create(data)

    expect(result.id).toEqual(reactionsCommentId)
    expect(result.reaction).toEqual(reactionSt)

    const newContent = 'changeComment'
    const toBeUpdated = {
      id: reactionsCommentId,
      reaction: !reactionSt,
    }

    const dataUpdate = plainToClass(UpdateCommentReactionDto, toBeUpdated)

    const updatedResult = await CommentReactionsService.update(
      reactionsCommentId,
      dataUpdate,
    )

    expect(updatedResult.id).toEqual(reactionsCommentId)
    expect(updatedResult.reaction).toEqual(dataUpdate.reaction)
  })
})
