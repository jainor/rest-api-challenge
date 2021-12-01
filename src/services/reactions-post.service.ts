import { Prisma, PostReaction } from '@prisma/client'
import createError from 'http-errors'
import { CreatePostReactionDto } from '../dtos/reactions/posts/request/create-post-reaction.dto'
import { UpdatePostReactionDto } from '../dtos/reactions/posts/request/update-post-reaction.dto'
import { prisma } from '../app'

export class PostReactionsService {
  static async find(): Promise<PostReaction[]> {
    return prisma.postReaction.findMany({ orderBy: { createdAt: 'desc' } })
  }

  static async create(input: CreatePostReactionDto): Promise<PostReaction> {
    if (await prisma.postReaction.count({ where: { id: input.id } })) {
      throw new createError.UnprocessableEntity('id already taken')
    }

    return prisma.postReaction.create({ data: input })
  }

  static async findOne(id: number): Promise<PostReaction> {
    return prisma.postReaction.findUnique({ where: { id } })
  }

  static async update(
    id: number,
    input: UpdatePostReactionDto,
  ): Promise<PostReaction> {
    try {
      const postReaction = await prisma.postReaction.update({
        data: input,
        where: {
          id,
        },
      })

      return postReaction
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new createError.UnprocessableEntity('id already taken')
        }
      }

      throw error
    }
  }
}
