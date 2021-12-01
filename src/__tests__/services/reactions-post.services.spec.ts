import { Prisma, PrismaClient, Post } from '@prisma/client'
import cases from 'jest-in-case'
import { mocked } from 'ts-jest/utils'
import { classToPlain, plainToClass } from 'class-transformer'
import { CreatePostReactionDto } from '../../dtos/reactions/posts/request/create-post-reaction.dto'
import { PostReactionsService } from '../../services/reactions-post.service'
import { app } from '../../app'
import { UpdatePostReactionDto } from '../../dtos/reactions/posts/request/update-post-reaction.dto'

const prisma = new PrismaClient()
const internalConfig: any = {}

beforeAll(() => {
  //process.env.DATABASE_URL = process.env.TEST_DATABASE_URL
})
afterAll(() => {})

describe('PostsServices', () => {
  it('should insert a valid reaction to a post, verifying that it does exists previously', async () => {
    const reactionsPostId = 943
    const reactionSt = true

    const toBeInserted = {
      id: reactionsPostId,
      userId: 1,
      postId: 1,
      reaction: reactionSt,
    }

    const data = plainToClass(CreatePostReactionDto, toBeInserted)
    const result = await PostReactionsService.create(data)

    expect(result.id).toEqual(reactionsPostId)
    expect(result.reaction).toEqual(reactionSt)

    const newContent = 'changePost'
    const toBeUpdated = {
      id: reactionsPostId,
      reaction: !reactionSt,
    }

    const dataUpdate = plainToClass(UpdatePostReactionDto, toBeUpdated)

    const updatedResult = await PostReactionsService.update(
      reactionsPostId,
      dataUpdate,
    )

    expect(updatedResult.id).toEqual(reactionsPostId)
    expect(updatedResult.reaction).toEqual(dataUpdate.reaction)
  })
})
