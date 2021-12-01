import { Prisma, CommentReaction } from '@prisma/client'
import createError from 'http-errors'
import { CreateCommentReactionDto } from '../dtos/reactions/comments/request/create-comment-reaction.dto'
import { UpdateCommentReactionDto } from '../dtos/reactions/comments/request/update-comment-reaction.dto'
import { prisma } from '../app'

export class CommentReactionsService {
  static async find(): Promise<CommentReaction[]> {
    return prisma.commentReaction.findMany({ orderBy: { createdAt: 'desc' } })
  }

  static async create(
    input: CreateCommentReactionDto,
  ): Promise<CommentReaction> {
    if (await prisma.commentReaction.count({ where: { id: input.id } })) {
      throw new createError.UnprocessableEntity('id already taken')
    }

    return prisma.commentReaction.create({ data: input })
  }

  static async findOne(id: number): Promise<CommentReaction> {
    return prisma.commentReaction.findUnique({ where: { id } })
  }

  static async update(
    id: number,
    input: UpdateCommentReactionDto,
  ): Promise<CommentReaction> {
    try {
      const commentReaction = await prisma.commentReaction.update({
        data: input,
        where: {
          id,
        },
      })

      return commentReaction
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
